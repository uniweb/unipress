import { f as Rs } from "./fetch-Db2pAsvR.js";
import { D as Dr, r as Ns, a as Os } from "./_entry.generated-BLKCOzs3.js";
var Ps = Object.create, xi = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, Ds = Object.getOwnPropertyNames, Ls = Object.getPrototypeOf, Bs = Object.prototype.hasOwnProperty, Ei = (e, t, r) => () => {
  if (r) throw r[0];
  try {
    return e && (t = e(e = 0)), t;
  } catch (n) {
    throw r = [n], n;
  }
}, fe = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Ms = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (var a = Ds(t), i = 0, u = a.length, s; i < u; i++)
    s = a[i], !Bs.call(e, s) && s !== r && xi(e, s, {
      get: ((c) => t[c]).bind(null, s),
      enumerable: !(n = Fs(t, s)) || n.enumerable
    });
  return e;
}, fn = (e, t, r) => (r = e != null ? Ps(Ls(e)) : {}, Ms(xi(r, "default", {
  value: e,
  enumerable: !0
}), e)), ar = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function Kt(e) {
  "@babel/helpers - typeof";
  return Kt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Kt(e);
}
function Us(e, t) {
  if (Kt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Kt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ws(e) {
  var t = Us(e, "string");
  return Kt(t) == "symbol" ? t : t + "";
}
function Z(e, t, r) {
  return (t = Ws(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Vt = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    Z(
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
}, js = Object.seal({}), ae = class extends Vt {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    super(e), Z(
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
      if (n instanceof Vt) {
        const a = n.writtenAs;
        return a ? a.map((i) => i.prepForXml(e)) : n.prepForXml(e);
      }
      return n;
    }).filter((n) => n !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : js };
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
}, nt = class extends ae {
  constructor(e, t) {
    super(e), Z(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
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
function $n(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function he(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $n(Object(r), !0).forEach(function(n) {
      Z(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $n(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var ve = class extends Vt {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(e) {
    super("_attr"), Z(this, "root", void 0), Z(
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
        const a = this.xmlKeys && this.xmlKeys[r] || r;
        t[a] = n;
      }
    }), { _attr: t };
  }
}, dn = class extends Vt {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(e) {
    super("_attr"), Z(this, "root", void 0), this.root = e;
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: n }) => he(he({}, t), {}, { [r]: n }), {}) };
  }
}, Pe = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, pn = /* @__PURE__ */ fe(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, n = r && typeof r.apply == "function" ? r.apply : function(P, M, R) {
    return Function.prototype.apply.call(P, M, R);
  }, a;
  r && typeof r.ownKeys == "function" ? a = r.ownKeys : Object.getOwnPropertySymbols ? a = function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  } : a = function(P) {
    return Object.getOwnPropertyNames(P);
  };
  function i(b) {
    console && console.warn && console.warn(b);
  }
  var u = Number.isNaN || function(P) {
    return P !== P;
  };
  function s() {
    s.init.call(this);
  }
  t.exports = s, t.exports.once = T, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var c = 10;
  function h(b) {
    if (typeof b != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof b);
  }
  Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return c;
    },
    set: function(b) {
      if (typeof b != "number" || b < 0 || u(b)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + b + ".");
      c = b;
    }
  }), s.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(P) {
    if (typeof P != "number" || P < 0 || u(P)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  };
  function w(b) {
    return b._maxListeners === void 0 ? s.defaultMaxListeners : b._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return w(this);
  }, s.prototype.emit = function(P) {
    for (var M = [], R = 1; R < arguments.length; R++) M.push(arguments[R]);
    var K = P === "error", ee = this._events;
    if (ee !== void 0) K = K && ee.error === void 0;
    else if (!K) return !1;
    if (K) {
      var O;
      if (M.length > 0 && (O = M[0]), O instanceof Error) throw O;
      var z = /* @__PURE__ */ new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
      throw z.context = O, z;
    }
    var I = ee[P];
    if (I === void 0) return !1;
    if (typeof I == "function") n(I, this, M);
    else
      for (var H = I.length, Q = _(I, H), R = 0; R < H; ++R) n(Q[R], this, M);
    return !0;
  };
  function v(b, P, M, R) {
    var K, ee, O;
    if (h(M), ee = b._events, ee === void 0 ? (ee = b._events = /* @__PURE__ */ Object.create(null), b._eventsCount = 0) : (ee.newListener !== void 0 && (b.emit("newListener", P, M.listener ? M.listener : M), ee = b._events), O = ee[P]), O === void 0)
      O = ee[P] = M, ++b._eventsCount;
    else if (typeof O == "function" ? O = ee[P] = R ? [M, O] : [O, M] : R ? O.unshift(M) : O.push(M), K = w(b), K > 0 && O.length > K && !O.warned) {
      O.warned = !0;
      var z = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(P) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      z.name = "MaxListenersExceededWarning", z.emitter = b, z.type = P, z.count = O.length, i(z);
    }
    return b;
  }
  s.prototype.addListener = function(P, M) {
    return v(this, P, M, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(P, M) {
    return v(this, P, M, !0);
  };
  function E() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function m(b, P, M) {
    var R = {
      fired: !1,
      wrapFn: void 0,
      target: b,
      type: P,
      listener: M
    }, K = E.bind(R);
    return K.listener = M, R.wrapFn = K, K;
  }
  s.prototype.once = function(P, M) {
    return h(M), this.on(P, m(this, P, M)), this;
  }, s.prototype.prependOnceListener = function(P, M) {
    return h(M), this.prependListener(P, m(this, P, M)), this;
  }, s.prototype.removeListener = function(P, M) {
    var R, K, ee, O, z;
    if (h(M), K = this._events, K === void 0) return this;
    if (R = K[P], R === void 0) return this;
    if (R === M || R.listener === M)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete K[P], K.removeListener && this.emit("removeListener", P, R.listener || M));
    else if (typeof R != "function") {
      for (ee = -1, O = R.length - 1; O >= 0; O--) if (R[O] === M || R[O].listener === M) {
        z = R[O].listener, ee = O;
        break;
      }
      if (ee < 0) return this;
      ee === 0 ? R.shift() : k(R, ee), R.length === 1 && (K[P] = R[0]), K.removeListener !== void 0 && this.emit("removeListener", P, z || M);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(P) {
    var M, R = this._events, K;
    if (R === void 0) return this;
    if (R.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : R[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete R[P]), this;
    if (arguments.length === 0) {
      var ee = Object.keys(R), O;
      for (K = 0; K < ee.length; ++K)
        O = ee[K], O !== "removeListener" && this.removeAllListeners(O);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (M = R[P], typeof M == "function") this.removeListener(P, M);
    else if (M !== void 0) for (K = M.length - 1; K >= 0; K--) this.removeListener(P, M[K]);
    return this;
  };
  function d(b, P, M) {
    var R = b._events;
    if (R === void 0) return [];
    var K = R[P];
    return K === void 0 ? [] : typeof K == "function" ? M ? [K.listener || K] : [K] : M ? x(K) : _(K, K.length);
  }
  s.prototype.listeners = function(P) {
    return d(this, P, !0);
  }, s.prototype.rawListeners = function(P) {
    return d(this, P, !1);
  }, s.listenerCount = function(b, P) {
    return typeof b.listenerCount == "function" ? b.listenerCount(P) : y.call(b, P);
  }, s.prototype.listenerCount = y;
  function y(b) {
    var P = this._events;
    if (P !== void 0) {
      var M = P[b];
      if (typeof M == "function") return 1;
      if (M !== void 0) return M.length;
    }
    return 0;
  }
  s.prototype.eventNames = function() {
    return this._eventsCount > 0 ? a(this._events) : [];
  };
  function _(b, P) {
    for (var M = new Array(P), R = 0; R < P; ++R) M[R] = b[R];
    return M;
  }
  function k(b, P) {
    for (; P + 1 < b.length; P++) b[P] = b[P + 1];
    b.pop();
  }
  function x(b) {
    for (var P = new Array(b.length), M = 0; M < P.length; ++M) P[M] = b[M].listener || b[M];
    return P;
  }
  function T(b, P) {
    return new Promise(function(M, R) {
      function K(O) {
        b.removeListener(P, ee), R(O);
      }
      function ee() {
        typeof b.removeListener == "function" && b.removeListener("error", K), M([].slice.call(arguments));
      }
      A(b, P, ee, { once: !0 }), P !== "error" && S(b, K, { once: !0 });
    });
  }
  function S(b, P, M) {
    typeof b.on == "function" && A(b, "error", P, M);
  }
  function A(b, P, M, R) {
    if (typeof b.on == "function")
      R.once ? b.once(P, M) : b.on(P, M);
    else if (typeof b.addEventListener == "function") b.addEventListener(P, function K(ee) {
      R.once && b.removeEventListener(P, K), M(ee);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof b);
  }
})), lt = /* @__PURE__ */ fe(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(n, a) {
    a && (n.super_ = a, n.prototype = Object.create(a.prototype, { constructor: {
      value: n,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : t.exports = function(n, a) {
    if (a) {
      n.super_ = a;
      var i = function() {
      };
      i.prototype = a.prototype, n.prototype = new i(), n.prototype.constructor = n;
    }
  };
})), Ne, At = Ei((() => {
  Ne = globalThis || self;
}));
function zs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function rn() {
  throw new Error("setTimeout has not been defined");
}
function nn() {
  throw new Error("clearTimeout has not been defined");
}
function Ti(e) {
  if (He === setTimeout) return setTimeout(e, 0);
  if ((He === rn || !He) && setTimeout)
    return He = setTimeout, setTimeout(e, 0);
  try {
    return He(e, 0);
  } catch {
    try {
      return He.call(null, e, 0);
    } catch {
      return He.call(this, e, 0);
    }
  }
}
function Hs(e) {
  if ($e === clearTimeout) return clearTimeout(e);
  if (($e === nn || !$e) && clearTimeout)
    return $e = clearTimeout, clearTimeout(e);
  try {
    return $e(e);
  } catch {
    try {
      return $e.call(null, e);
    } catch {
      return $e.call(this, e);
    }
  }
}
function $s() {
  !wt || !pt || (wt = !1, pt.length ? Ke = pt.concat(Ke) : Ht = -1, Ke.length && Si());
}
function Si() {
  if (!wt) {
    var e = Ti($s);
    wt = !0;
    for (var t = Ke.length; t; ) {
      for (pt = Ke, Ke = []; ++Ht < t; ) pt && pt[Ht].run();
      Ht = -1, t = Ke.length;
    }
    pt = null, wt = !1, Hs(e);
  }
}
function Gn(e, t) {
  this.fun = e, this.array = t;
}
function Je() {
}
var Lr, _e, He, $e, Ke, wt, pt, Ht, Kn, ge, ut = Ei((() => {
  Lr = { exports: {} }, _e = Lr.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? He = setTimeout : He = rn;
    } catch {
      He = rn;
    }
    try {
      typeof clearTimeout == "function" ? $e = clearTimeout : $e = nn;
    } catch {
      $e = nn;
    }
  })(), Ke = [], wt = !1, Ht = -1, _e.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    Ke.push(new Gn(e, t)), Ke.length === 1 && !wt && Ti(Si);
  }, Gn.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _e.title = "browser", _e.browser = !0, _e.env = {}, _e.argv = [], _e.version = "", _e.versions = {}, _e.on = Je, _e.addListener = Je, _e.once = Je, _e.off = Je, _e.removeListener = Je, _e.removeAllListeners = Je, _e.emit = Je, _e.prependListener = Je, _e.prependOnceListener = Je, _e.listeners = function(e) {
    return [];
  }, _e.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, _e.cwd = function() {
    return "/";
  }, _e.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, _e.umask = function() {
    return 0;
  }, Kn = Lr.exports, ge = /* @__PURE__ */ zs(Kn);
})), Ai = /* @__PURE__ */ fe(((e, t) => {
  t.exports = pn().EventEmitter;
})), Gs = /* @__PURE__ */ fe(((e) => {
  e.byteLength = c, e.toByteArray = w, e.fromByteArray = m;
  for (var t = [], r = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, u = a.length; i < u; ++i)
    t[i] = a[i], r[a.charCodeAt(i)] = i;
  r[45] = 62, r[95] = 63;
  function s(d) {
    var y = d.length;
    if (y % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var _ = d.indexOf("=");
    _ === -1 && (_ = y);
    var k = _ === y ? 0 : 4 - _ % 4;
    return [_, k];
  }
  function c(d) {
    var y = s(d), _ = y[0], k = y[1];
    return (_ + k) * 3 / 4 - k;
  }
  function h(d, y, _) {
    return (y + _) * 3 / 4 - _;
  }
  function w(d) {
    for (var y, _ = s(d), k = _[0], x = _[1], T = new n(h(d, k, x)), S = 0, A = x > 0 ? k - 4 : k, b = 0; b < A; b += 4)
      y = r[d.charCodeAt(b)] << 18 | r[d.charCodeAt(b + 1)] << 12 | r[d.charCodeAt(b + 2)] << 6 | r[d.charCodeAt(b + 3)], T[S++] = y >> 16 & 255, T[S++] = y >> 8 & 255, T[S++] = y & 255;
    return x === 2 && (y = r[d.charCodeAt(b)] << 2 | r[d.charCodeAt(b + 1)] >> 4, T[S++] = y & 255), x === 1 && (y = r[d.charCodeAt(b)] << 10 | r[d.charCodeAt(b + 1)] << 4 | r[d.charCodeAt(b + 2)] >> 2, T[S++] = y >> 8 & 255, T[S++] = y & 255), T;
  }
  function v(d) {
    return t[d >> 18 & 63] + t[d >> 12 & 63] + t[d >> 6 & 63] + t[d & 63];
  }
  function E(d, y, _) {
    for (var k, x = [], T = y; T < _; T += 3)
      k = (d[T] << 16 & 16711680) + (d[T + 1] << 8 & 65280) + (d[T + 2] & 255), x.push(v(k));
    return x.join("");
  }
  function m(d) {
    for (var y, _ = d.length, k = _ % 3, x = [], T = 16383, S = 0, A = _ - k; S < A; S += T) x.push(E(d, S, S + T > A ? A : S + T));
    return k === 1 ? (y = d[_ - 1], x.push(t[y >> 2] + t[y << 4 & 63] + "==")) : k === 2 && (y = (d[_ - 2] << 8) + d[_ - 1], x.push(t[y >> 10] + t[y >> 4 & 63] + t[y << 2 & 63] + "=")), x.join("");
  }
})), Ks = /* @__PURE__ */ fe(((e) => {
  e.read = function(t, r, n, a, i) {
    var u, s, c = i * 8 - a - 1, h = (1 << c) - 1, w = h >> 1, v = -7, E = n ? i - 1 : 0, m = n ? -1 : 1, d = t[r + E];
    for (E += m, u = d & (1 << -v) - 1, d >>= -v, v += c; v > 0; u = u * 256 + t[r + E], E += m, v -= 8) ;
    for (s = u & (1 << -v) - 1, u >>= -v, v += a; v > 0; s = s * 256 + t[r + E], E += m, v -= 8) ;
    if (u === 0) u = 1 - w;
    else {
      if (u === h) return s ? NaN : (d ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, a), u = u - w;
    }
    return (d ? -1 : 1) * s * Math.pow(2, u - a);
  }, e.write = function(t, r, n, a, i, u) {
    var s, c, h, w = u * 8 - i - 1, v = (1 << w) - 1, E = v >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = a ? 0 : u - 1, y = a ? 1 : -1, _ = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (c = isNaN(r) ? 1 : 0, s = v) : (s = Math.floor(Math.log(r) / Math.LN2), r * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), s + E >= 1 ? r += m / h : r += m * Math.pow(2, 1 - E), r * h >= 2 && (s++, h /= 2), s + E >= v ? (c = 0, s = v) : s + E >= 1 ? (c = (r * h - 1) * Math.pow(2, i), s = s + E) : (c = r * Math.pow(2, E - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + d] = c & 255, d += y, c /= 256, i -= 8) ;
    for (s = s << i | c, w += i; w > 0; t[n + d] = s & 255, d += y, s /= 256, w -= 8) ;
    t[n + d - y] |= _ * 128;
  };
}));
var Er = /* @__PURE__ */ fe(((e) => {
  var t = Gs(), r = Ks(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = x, e.INSPECT_MAX_BYTES = 50;
  var a = 2147483647;
  e.kMaxLength = a, s.TYPED_ARRAY_SUPPORT = i(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i() {
    try {
      var N = /* @__PURE__ */ new Uint8Array(1), o = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(N, o), N.foo() === 42;
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
    if (N > a) throw new RangeError('The value "' + N + '" is invalid for option "size"');
    var o = new Uint8Array(N);
    return Object.setPrototypeOf(o, s.prototype), o;
  }
  function s(N, o, l) {
    if (typeof N == "number") {
      if (typeof o == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return v(N);
    }
    return c(N, o, l);
  }
  s.poolSize = 8192;
  function c(N, o, l) {
    if (typeof N == "string") return E(N, o);
    if (ArrayBuffer.isView(N)) return d(N);
    if (N == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
    if (L(N, ArrayBuffer) || N && L(N.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (L(N, SharedArrayBuffer) || N && L(N.buffer, SharedArrayBuffer))) return y(N, o, l);
    if (typeof N == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var g = N.valueOf && N.valueOf();
    if (g != null && g !== N) return s.from(g, o, l);
    var B = _(N);
    if (B) return B;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof N[Symbol.toPrimitive] == "function") return s.from(N[Symbol.toPrimitive]("string"), o, l);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
  }
  s.from = function(N, o, l) {
    return c(N, o, l);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function h(N) {
    if (typeof N != "number") throw new TypeError('"size" argument must be of type number');
    if (N < 0) throw new RangeError('The value "' + N + '" is invalid for option "size"');
  }
  function w(N, o, l) {
    return h(N), N <= 0 ? u(N) : o !== void 0 ? typeof l == "string" ? u(N).fill(o, l) : u(N).fill(o) : u(N);
  }
  s.alloc = function(N, o, l) {
    return w(N, o, l);
  };
  function v(N) {
    return h(N), u(N < 0 ? 0 : k(N) | 0);
  }
  s.allocUnsafe = function(N) {
    return v(N);
  }, s.allocUnsafeSlow = function(N) {
    return v(N);
  };
  function E(N, o) {
    if ((typeof o != "string" || o === "") && (o = "utf8"), !s.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
    var l = T(N, o) | 0, g = u(l), B = g.write(N, o);
    return B !== l && (g = g.slice(0, B)), g;
  }
  function m(N) {
    for (var o = N.length < 0 ? 0 : k(N.length) | 0, l = u(o), g = 0; g < o; g += 1) l[g] = N[g] & 255;
    return l;
  }
  function d(N) {
    if (L(N, Uint8Array)) {
      var o = new Uint8Array(N);
      return y(o.buffer, o.byteOffset, o.byteLength);
    }
    return m(N);
  }
  function y(N, o, l) {
    if (o < 0 || N.byteLength < o) throw new RangeError('"offset" is outside of buffer bounds');
    if (N.byteLength < o + (l || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var g;
    return o === void 0 && l === void 0 ? g = new Uint8Array(N) : l === void 0 ? g = new Uint8Array(N, o) : g = new Uint8Array(N, o, l), Object.setPrototypeOf(g, s.prototype), g;
  }
  function _(N) {
    if (s.isBuffer(N)) {
      var o = k(N.length) | 0, l = u(o);
      return l.length === 0 || N.copy(l, 0, 0, o), l;
    }
    if (N.length !== void 0)
      return typeof N.length != "number" || f(N.length) ? u(0) : m(N);
    if (N.type === "Buffer" && Array.isArray(N.data)) return m(N.data);
  }
  function k(N) {
    if (N >= a) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
    return N | 0;
  }
  function x(N) {
    return +N != N && (N = 0), s.alloc(+N);
  }
  s.isBuffer = function(o) {
    return o != null && o._isBuffer === !0 && o !== s.prototype;
  }, s.compare = function(o, l) {
    if (L(o, Uint8Array) && (o = s.from(o, o.offset, o.byteLength)), L(l, Uint8Array) && (l = s.from(l, l.offset, l.byteLength)), !s.isBuffer(o) || !s.isBuffer(l)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (o === l) return 0;
    for (var g = o.length, B = l.length, $ = 0, j = Math.min(g, B); $ < j; ++$) if (o[$] !== l[$]) {
      g = o[$], B = l[$];
      break;
    }
    return g < B ? -1 : B < g ? 1 : 0;
  }, s.isEncoding = function(o) {
    switch (String(o).toLowerCase()) {
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
  }, s.concat = function(o, l) {
    if (!Array.isArray(o)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (o.length === 0) return s.alloc(0);
    var g;
    if (l === void 0)
      for (l = 0, g = 0; g < o.length; ++g) l += o[g].length;
    var B = s.allocUnsafe(l), $ = 0;
    for (g = 0; g < o.length; ++g) {
      var j = o[g];
      if (L(j, Uint8Array))
        $ + j.length > B.length ? s.from(j).copy(B, $) : Uint8Array.prototype.set.call(B, j, $);
      else if (s.isBuffer(j)) j.copy(B, $);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      $ += j.length;
    }
    return B;
  };
  function T(N, o) {
    if (s.isBuffer(N)) return N.length;
    if (ArrayBuffer.isView(N) || L(N, ArrayBuffer)) return N.byteLength;
    if (typeof N != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof N);
    var l = N.length, g = arguments.length > 2 && arguments[2] === !0;
    if (!g && l === 0) return 0;
    for (var B = !1; ; ) switch (o) {
      case "ascii":
      case "latin1":
      case "binary":
        return l;
      case "utf8":
      case "utf-8":
        return p(N).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return l * 2;
      case "hex":
        return l >>> 1;
      case "base64":
        return ne(N).length;
      default:
        if (B) return g ? -1 : p(N).length;
        o = ("" + o).toLowerCase(), B = !0;
    }
  }
  s.byteLength = T;
  function S(N, o, l) {
    var g = !1;
    if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((l === void 0 || l > this.length) && (l = this.length), l <= 0) || (l >>>= 0, o >>>= 0, l <= o)) return "";
    for (N || (N = "utf8"); ; ) switch (N) {
      case "hex":
        return Y(this, o, l);
      case "utf8":
      case "utf-8":
        return I(this, o, l);
      case "ascii":
        return q(this, o, l);
      case "latin1":
      case "binary":
        return le(this, o, l);
      case "base64":
        return z(this, o, l);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return te(this, o, l);
      default:
        if (g) throw new TypeError("Unknown encoding: " + N);
        N = (N + "").toLowerCase(), g = !0;
    }
  }
  s.prototype._isBuffer = !0;
  function A(N, o, l) {
    var g = N[o];
    N[o] = N[l], N[l] = g;
  }
  s.prototype.swap16 = function() {
    var o = this.length;
    if (o % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var l = 0; l < o; l += 2) A(this, l, l + 1);
    return this;
  }, s.prototype.swap32 = function() {
    var o = this.length;
    if (o % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var l = 0; l < o; l += 4)
      A(this, l, l + 3), A(this, l + 1, l + 2);
    return this;
  }, s.prototype.swap64 = function() {
    var o = this.length;
    if (o % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var l = 0; l < o; l += 8)
      A(this, l, l + 7), A(this, l + 1, l + 6), A(this, l + 2, l + 5), A(this, l + 3, l + 4);
    return this;
  }, s.prototype.toString = function() {
    var o = this.length;
    return o === 0 ? "" : arguments.length === 0 ? I(this, 0, o) : S.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(o) {
    if (!s.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
    return this === o ? !0 : s.compare(this, o) === 0;
  }, s.prototype.inspect = function() {
    var o = "", l = e.INSPECT_MAX_BYTES;
    return o = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (o += " ... "), "<Buffer " + o + ">";
  }, n && (s.prototype[n] = s.prototype.inspect), s.prototype.compare = function(o, l, g, B, $) {
    if (L(o, Uint8Array) && (o = s.from(o, o.offset, o.byteLength)), !s.isBuffer(o)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o);
    if (l === void 0 && (l = 0), g === void 0 && (g = o ? o.length : 0), B === void 0 && (B = 0), $ === void 0 && ($ = this.length), l < 0 || g > o.length || B < 0 || $ > this.length) throw new RangeError("out of range index");
    if (B >= $ && l >= g) return 0;
    if (B >= $) return -1;
    if (l >= g) return 1;
    if (l >>>= 0, g >>>= 0, B >>>= 0, $ >>>= 0, this === o) return 0;
    for (var j = $ - B, ie = g - l, ue = Math.min(j, ie), oe = this.slice(B, $), de = o.slice(l, g), me = 0; me < ue; ++me) if (oe[me] !== de[me]) {
      j = oe[me], ie = de[me];
      break;
    }
    return j < ie ? -1 : ie < j ? 1 : 0;
  };
  function b(N, o, l, g, B) {
    if (N.length === 0) return -1;
    if (typeof l == "string" ? (g = l, l = 0) : l > 2147483647 ? l = 2147483647 : l < -2147483648 && (l = -2147483648), l = +l, f(l) && (l = B ? 0 : N.length - 1), l < 0 && (l = N.length + l), l >= N.length) {
      if (B) return -1;
      l = N.length - 1;
    } else if (l < 0)
      if (B) l = 0;
      else return -1;
    if (typeof o == "string" && (o = s.from(o, g)), s.isBuffer(o))
      return o.length === 0 ? -1 : P(N, o, l, g, B);
    if (typeof o == "number")
      return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? B ? Uint8Array.prototype.indexOf.call(N, o, l) : Uint8Array.prototype.lastIndexOf.call(N, o, l) : P(N, [o], l, g, B);
    throw new TypeError("val must be string, number or Buffer");
  }
  function P(N, o, l, g, B) {
    var $ = 1, j = N.length, ie = o.length;
    if (g !== void 0 && (g = String(g).toLowerCase(), g === "ucs2" || g === "ucs-2" || g === "utf16le" || g === "utf-16le")) {
      if (N.length < 2 || o.length < 2) return -1;
      $ = 2, j /= 2, ie /= 2, l /= 2;
    }
    function ue(Se, it) {
      return $ === 1 ? Se[it] : Se.readUInt16BE(it * $);
    }
    var oe;
    if (B) {
      var de = -1;
      for (oe = l; oe < j; oe++) if (ue(N, oe) === ue(o, de === -1 ? 0 : oe - de)) {
        if (de === -1 && (de = oe), oe - de + 1 === ie) return de * $;
      } else
        de !== -1 && (oe -= oe - de), de = -1;
    } else
      for (l + ie > j && (l = j - ie), oe = l; oe >= 0; oe--) {
        for (var me = !0, we = 0; we < ie; we++) if (ue(N, oe + we) !== ue(o, we)) {
          me = !1;
          break;
        }
        if (me) return oe;
      }
    return -1;
  }
  s.prototype.includes = function(o, l, g) {
    return this.indexOf(o, l, g) !== -1;
  }, s.prototype.indexOf = function(o, l, g) {
    return b(this, o, l, g, !0);
  }, s.prototype.lastIndexOf = function(o, l, g) {
    return b(this, o, l, g, !1);
  };
  function M(N, o, l, g) {
    l = Number(l) || 0;
    var B = N.length - l;
    g ? (g = Number(g), g > B && (g = B)) : g = B;
    var $ = o.length;
    g > $ / 2 && (g = $ / 2);
    for (var j = 0; j < g; ++j) {
      var ie = parseInt(o.substr(j * 2, 2), 16);
      if (f(ie)) return j;
      N[l + j] = ie;
    }
    return j;
  }
  function R(N, o, l, g) {
    return D(p(o, N.length - l), N, l, g);
  }
  function K(N, o, l, g) {
    return D(W(o), N, l, g);
  }
  function ee(N, o, l, g) {
    return D(ne(o), N, l, g);
  }
  function O(N, o, l, g) {
    return D(U(o, N.length - l), N, l, g);
  }
  s.prototype.write = function(o, l, g, B) {
    if (l === void 0)
      B = "utf8", g = this.length, l = 0;
    else if (g === void 0 && typeof l == "string")
      B = l, g = this.length, l = 0;
    else if (isFinite(l))
      l = l >>> 0, isFinite(g) ? (g = g >>> 0, B === void 0 && (B = "utf8")) : (B = g, g = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var $ = this.length - l;
    if ((g === void 0 || g > $) && (g = $), o.length > 0 && (g < 0 || l < 0) || l > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    B || (B = "utf8");
    for (var j = !1; ; ) switch (B) {
      case "hex":
        return M(this, o, l, g);
      case "utf8":
      case "utf-8":
        return R(this, o, l, g);
      case "ascii":
      case "latin1":
      case "binary":
        return K(this, o, l, g);
      case "base64":
        return ee(this, o, l, g);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return O(this, o, l, g);
      default:
        if (j) throw new TypeError("Unknown encoding: " + B);
        B = ("" + B).toLowerCase(), j = !0;
    }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function z(N, o, l) {
    return o === 0 && l === N.length ? t.fromByteArray(N) : t.fromByteArray(N.slice(o, l));
  }
  function I(N, o, l) {
    l = Math.min(N.length, l);
    for (var g = [], B = o; B < l; ) {
      var $ = N[B], j = null, ie = $ > 239 ? 4 : $ > 223 ? 3 : $ > 191 ? 2 : 1;
      if (B + ie <= l) {
        var ue, oe, de, me;
        switch (ie) {
          case 1:
            $ < 128 && (j = $);
            break;
          case 2:
            ue = N[B + 1], (ue & 192) === 128 && (me = ($ & 31) << 6 | ue & 63, me > 127 && (j = me));
            break;
          case 3:
            ue = N[B + 1], oe = N[B + 2], (ue & 192) === 128 && (oe & 192) === 128 && (me = ($ & 15) << 12 | (ue & 63) << 6 | oe & 63, me > 2047 && (me < 55296 || me > 57343) && (j = me));
            break;
          case 4:
            ue = N[B + 1], oe = N[B + 2], de = N[B + 3], (ue & 192) === 128 && (oe & 192) === 128 && (de & 192) === 128 && (me = ($ & 15) << 18 | (ue & 63) << 12 | (oe & 63) << 6 | de & 63, me > 65535 && me < 1114112 && (j = me));
        }
      }
      j === null ? (j = 65533, ie = 1) : j > 65535 && (j -= 65536, g.push(j >>> 10 & 1023 | 55296), j = 56320 | j & 1023), g.push(j), B += ie;
    }
    return Q(g);
  }
  var H = 4096;
  function Q(N) {
    var o = N.length;
    if (o <= H) return String.fromCharCode.apply(String, N);
    for (var l = "", g = 0; g < o; ) l += String.fromCharCode.apply(String, N.slice(g, g += H));
    return l;
  }
  function q(N, o, l) {
    var g = "";
    l = Math.min(N.length, l);
    for (var B = o; B < l; ++B) g += String.fromCharCode(N[B] & 127);
    return g;
  }
  function le(N, o, l) {
    var g = "";
    l = Math.min(N.length, l);
    for (var B = o; B < l; ++B) g += String.fromCharCode(N[B]);
    return g;
  }
  function Y(N, o, l) {
    var g = N.length;
    (!o || o < 0) && (o = 0), (!l || l < 0 || l > g) && (l = g);
    for (var B = "", $ = o; $ < l; ++$) B += G[N[$]];
    return B;
  }
  function te(N, o, l) {
    for (var g = N.slice(o, l), B = "", $ = 0; $ < g.length - 1; $ += 2) B += String.fromCharCode(g[$] + g[$ + 1] * 256);
    return B;
  }
  s.prototype.slice = function(o, l) {
    var g = this.length;
    o = ~~o, l = l === void 0 ? g : ~~l, o < 0 ? (o += g, o < 0 && (o = 0)) : o > g && (o = g), l < 0 ? (l += g, l < 0 && (l = 0)) : l > g && (l = g), l < o && (l = o);
    var B = this.subarray(o, l);
    return Object.setPrototypeOf(B, s.prototype), B;
  };
  function V(N, o, l) {
    if (N % 1 !== 0 || N < 0) throw new RangeError("offset is not uint");
    if (N + o > l) throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o], $ = 1, j = 0; ++j < l && ($ *= 256); ) B += this[o + j] * $;
    return B;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o + --l], $ = 1; l > 0 && ($ *= 256); ) B += this[o + --l] * $;
    return B;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(o, l) {
    return o = o >>> 0, l || V(o, 1, this.length), this[o];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(o, l) {
    return o = o >>> 0, l || V(o, 2, this.length), this[o] | this[o + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(o, l) {
    return o = o >>> 0, l || V(o, 2, this.length), this[o] << 8 | this[o + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
  }, s.prototype.readIntLE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o], $ = 1, j = 0; ++j < l && ($ *= 256); ) B += this[o + j] * $;
    return $ *= 128, B >= $ && (B -= Math.pow(2, 8 * l)), B;
  }, s.prototype.readIntBE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = l, $ = 1, j = this[o + --B]; B > 0 && ($ *= 256); ) j += this[o + --B] * $;
    return $ *= 128, j >= $ && (j -= Math.pow(2, 8 * l)), j;
  }, s.prototype.readInt8 = function(o, l) {
    return o = o >>> 0, l || V(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
  }, s.prototype.readInt16LE = function(o, l) {
    o = o >>> 0, l || V(o, 2, this.length);
    var g = this[o] | this[o + 1] << 8;
    return g & 32768 ? g | 4294901760 : g;
  }, s.prototype.readInt16BE = function(o, l) {
    o = o >>> 0, l || V(o, 2, this.length);
    var g = this[o + 1] | this[o] << 8;
    return g & 32768 ? g | 4294901760 : g;
  }, s.prototype.readInt32LE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
  }, s.prototype.readInt32BE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
  }, s.prototype.readFloatLE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), r.read(this, o, !0, 23, 4);
  }, s.prototype.readFloatBE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), r.read(this, o, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(o, l) {
    return o = o >>> 0, l || V(o, 8, this.length), r.read(this, o, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(o, l) {
    return o = o >>> 0, l || V(o, 8, this.length), r.read(this, o, !1, 52, 8);
  };
  function F(N, o, l, g, B, $) {
    if (!s.isBuffer(N)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > B || o < $) throw new RangeError('"value" argument is out of bounds');
    if (l + g > N.length) throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, g = g >>> 0, !B) {
      var $ = Math.pow(2, 8 * g) - 1;
      F(this, o, l, g, $, 0);
    }
    var j = 1, ie = 0;
    for (this[l] = o & 255; ++ie < g && (j *= 256); ) this[l + ie] = o / j & 255;
    return l + g;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, g = g >>> 0, !B) {
      var $ = Math.pow(2, 8 * g) - 1;
      F(this, o, l, g, $, 0);
    }
    var j = g - 1, ie = 1;
    for (this[l + j] = o & 255; --j >= 0 && (ie *= 256); ) this[l + j] = o / ie & 255;
    return l + g;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 1, 255, 0), this[l] = o & 255, l + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 65535, 0), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 65535, 0), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 4294967295, 0), this[l + 3] = o >>> 24, this[l + 2] = o >>> 16, this[l + 1] = o >>> 8, this[l] = o & 255, l + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 4294967295, 0), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  }, s.prototype.writeIntLE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, !B) {
      var $ = Math.pow(2, 8 * g - 1);
      F(this, o, l, g, $ - 1, -$);
    }
    var j = 0, ie = 1, ue = 0;
    for (this[l] = o & 255; ++j < g && (ie *= 256); )
      o < 0 && ue === 0 && this[l + j - 1] !== 0 && (ue = 1), this[l + j] = (o / ie >> 0) - ue & 255;
    return l + g;
  }, s.prototype.writeIntBE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, !B) {
      var $ = Math.pow(2, 8 * g - 1);
      F(this, o, l, g, $ - 1, -$);
    }
    var j = g - 1, ie = 1, ue = 0;
    for (this[l + j] = o & 255; --j >= 0 && (ie *= 256); )
      o < 0 && ue === 0 && this[l + j + 1] !== 0 && (ue = 1), this[l + j] = (o / ie >> 0) - ue & 255;
    return l + g;
  }, s.prototype.writeInt8 = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[l] = o & 255, l + 1;
  }, s.prototype.writeInt16LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 32767, -32768), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, s.prototype.writeInt16BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 32767, -32768), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, s.prototype.writeInt32LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 2147483647, -2147483648), this[l] = o & 255, this[l + 1] = o >>> 8, this[l + 2] = o >>> 16, this[l + 3] = o >>> 24, l + 4;
  }, s.prototype.writeInt32BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  };
  function X(N, o, l, g, B, $) {
    if (l + g > N.length) throw new RangeError("Index out of range");
    if (l < 0) throw new RangeError("Index out of range");
  }
  function J(N, o, l, g, B) {
    return o = +o, l = l >>> 0, B || X(N, o, l, 4), r.write(N, o, l, g, 23, 4), l + 4;
  }
  s.prototype.writeFloatLE = function(o, l, g) {
    return J(this, o, l, !0, g);
  }, s.prototype.writeFloatBE = function(o, l, g) {
    return J(this, o, l, !1, g);
  };
  function re(N, o, l, g, B) {
    return o = +o, l = l >>> 0, B || X(N, o, l, 8), r.write(N, o, l, g, 52, 8), l + 8;
  }
  s.prototype.writeDoubleLE = function(o, l, g) {
    return re(this, o, l, !0, g);
  }, s.prototype.writeDoubleBE = function(o, l, g) {
    return re(this, o, l, !1, g);
  }, s.prototype.copy = function(o, l, g, B) {
    if (!s.isBuffer(o)) throw new TypeError("argument should be a Buffer");
    if (g || (g = 0), !B && B !== 0 && (B = this.length), l >= o.length && (l = o.length), l || (l = 0), B > 0 && B < g && (B = g), B === g || o.length === 0 || this.length === 0) return 0;
    if (l < 0) throw new RangeError("targetStart out of bounds");
    if (g < 0 || g >= this.length) throw new RangeError("Index out of range");
    if (B < 0) throw new RangeError("sourceEnd out of bounds");
    B > this.length && (B = this.length), o.length - l < B - g && (B = o.length - l + g);
    var $ = B - g;
    return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, g, B) : Uint8Array.prototype.set.call(o, this.subarray(g, B), l), $;
  }, s.prototype.fill = function(o, l, g, B) {
    if (typeof o == "string") {
      if (typeof l == "string" ? (B = l, l = 0, g = this.length) : typeof g == "string" && (B = g, g = this.length), B !== void 0 && typeof B != "string") throw new TypeError("encoding must be a string");
      if (typeof B == "string" && !s.isEncoding(B)) throw new TypeError("Unknown encoding: " + B);
      if (o.length === 1) {
        var $ = o.charCodeAt(0);
        (B === "utf8" && $ < 128 || B === "latin1") && (o = $);
      }
    } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
    if (l < 0 || this.length < l || this.length < g) throw new RangeError("Out of range index");
    if (g <= l) return this;
    l = l >>> 0, g = g === void 0 ? this.length : g >>> 0, o || (o = 0);
    var j;
    if (typeof o == "number") for (j = l; j < g; ++j) this[j] = o;
    else {
      var ie = s.isBuffer(o) ? o : s.from(o, B), ue = ie.length;
      if (ue === 0) throw new TypeError('The value "' + o + '" is invalid for argument "value"');
      for (j = 0; j < g - l; ++j) this[j + l] = ie[j % ue];
    }
    return this;
  };
  var pe = /[^+/0-9A-Za-z-_]/g;
  function C(N) {
    if (N = N.split("=")[0], N = N.trim().replace(pe, ""), N.length < 2) return "";
    for (; N.length % 4 !== 0; ) N = N + "=";
    return N;
  }
  function p(N, o) {
    o = o || 1 / 0;
    for (var l, g = N.length, B = null, $ = [], j = 0; j < g; ++j) {
      if (l = N.charCodeAt(j), l > 55295 && l < 57344) {
        if (!B) {
          if (l > 56319) {
            (o -= 3) > -1 && $.push(239, 191, 189);
            continue;
          } else if (j + 1 === g) {
            (o -= 3) > -1 && $.push(239, 191, 189);
            continue;
          }
          B = l;
          continue;
        }
        if (l < 56320) {
          (o -= 3) > -1 && $.push(239, 191, 189), B = l;
          continue;
        }
        l = (B - 55296 << 10 | l - 56320) + 65536;
      } else B && (o -= 3) > -1 && $.push(239, 191, 189);
      if (B = null, l < 128) {
        if ((o -= 1) < 0) break;
        $.push(l);
      } else if (l < 2048) {
        if ((o -= 2) < 0) break;
        $.push(l >> 6 | 192, l & 63 | 128);
      } else if (l < 65536) {
        if ((o -= 3) < 0) break;
        $.push(l >> 12 | 224, l >> 6 & 63 | 128, l & 63 | 128);
      } else if (l < 1114112) {
        if ((o -= 4) < 0) break;
        $.push(l >> 18 | 240, l >> 12 & 63 | 128, l >> 6 & 63 | 128, l & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return $;
  }
  function W(N) {
    for (var o = [], l = 0; l < N.length; ++l) o.push(N.charCodeAt(l) & 255);
    return o;
  }
  function U(N, o) {
    for (var l, g, B, $ = [], j = 0; j < N.length && !((o -= 2) < 0); ++j)
      l = N.charCodeAt(j), g = l >> 8, B = l % 256, $.push(B), $.push(g);
    return $;
  }
  function ne(N) {
    return t.toByteArray(C(N));
  }
  function D(N, o, l, g) {
    for (var B = 0; B < g && !(B + l >= o.length || B >= N.length); ++B)
      o[B + l] = N[B];
    return B;
  }
  function L(N, o) {
    return N instanceof o || N != null && N.constructor != null && N.constructor.name != null && N.constructor.name === o.name;
  }
  function f(N) {
    return N !== N;
  }
  var G = (function() {
    for (var N = "0123456789abcdef", o = new Array(256), l = 0; l < 16; ++l)
      for (var g = l * 16, B = 0; B < 16; ++B) o[g + B] = N[l] + N[B];
    return o;
  })();
})), ki = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var n = {}, a = /* @__PURE__ */ Symbol("test"), i = Object(a);
    if (typeof a == "string" || Object.prototype.toString.call(a) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]") return !1;
    var u = 42;
    n[a] = u;
    for (var s in n) return !1;
    if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0) return !1;
    var c = Object.getOwnPropertySymbols(n);
    if (c.length !== 1 || c[0] !== a || !Object.prototype.propertyIsEnumerable.call(n, a)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var h = Object.getOwnPropertyDescriptor(n, a);
      if (h.value !== u || h.enumerable !== !0) return !1;
    }
    return !0;
  };
})), mn = /* @__PURE__ */ fe(((e, t) => {
  var r = ki();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), Ci = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Object;
})), Vs = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Error;
})), qs = /* @__PURE__ */ fe(((e, t) => {
  t.exports = EvalError;
})), Xs = /* @__PURE__ */ fe(((e, t) => {
  t.exports = RangeError;
})), Zs = /* @__PURE__ */ fe(((e, t) => {
  t.exports = ReferenceError;
})), Ii = /* @__PURE__ */ fe(((e, t) => {
  t.exports = SyntaxError;
})), Tr = /* @__PURE__ */ fe(((e, t) => {
  t.exports = TypeError;
})), Ys = /* @__PURE__ */ fe(((e, t) => {
  t.exports = URIError;
})), Js = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.abs;
})), Qs = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.floor;
})), eo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.max;
})), to = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.min;
})), ro = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.pow;
})), no = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.round;
})), io = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Number.isNaN || function(n) {
    return n !== n;
  };
})), ao = /* @__PURE__ */ fe(((e, t) => {
  var r = io();
  t.exports = function(a) {
    return r(a) || a === 0 ? a : a < 0 ? -1 : 1;
  };
})), so = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), Zt = /* @__PURE__ */ fe(((e, t) => {
  var r = so();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), Sr = /* @__PURE__ */ fe(((e, t) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  t.exports = r;
})), oo = /* @__PURE__ */ fe(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, n = ki();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : n();
  };
})), Ri = /* @__PURE__ */ fe(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Ni = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Ci().getPrototypeOf || null;
})), lo = /* @__PURE__ */ fe(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", n = Object.prototype.toString, a = Math.max, i = "[object Function]", u = function(w, v) {
    for (var E = [], m = 0; m < w.length; m += 1) E[m] = w[m];
    for (var d = 0; d < v.length; d += 1) E[d + w.length] = v[d];
    return E;
  }, s = function(w, v) {
    for (var E = [], m = v, d = 0; m < w.length; m += 1, d += 1) E[d] = w[m];
    return E;
  }, c = function(h, w) {
    for (var v = "", E = 0; E < h.length; E += 1)
      v += h[E], E + 1 < h.length && (v += w);
    return v;
  };
  t.exports = function(w) {
    var v = this;
    if (typeof v != "function" || n.apply(v) !== i) throw new TypeError(r + v);
    for (var E = s(arguments, 1), m, d = function() {
      if (this instanceof m) {
        var T = v.apply(this, u(E, arguments));
        return Object(T) === T ? T : this;
      }
      return v.apply(w, u(E, arguments));
    }, y = a(0, v.length - E.length), _ = [], k = 0; k < y; k++) _[k] = "$" + k;
    if (m = Function("binder", "return function (" + c(_, ",") + "){ return binder.apply(this,arguments); }")(d), v.prototype) {
      var x = function() {
      };
      x.prototype = v.prototype, m.prototype = new x(), x.prototype = null;
    }
    return m;
  };
})), Yt = /* @__PURE__ */ fe(((e, t) => {
  var r = lo();
  t.exports = Function.prototype.bind || r;
})), vn = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Function.prototype.call;
})), wn = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Function.prototype.apply;
})), uo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), Oi = /* @__PURE__ */ fe(((e, t) => {
  var r = Yt(), n = wn(), a = vn();
  t.exports = uo() || r.call(a, n);
})), gn = /* @__PURE__ */ fe(((e, t) => {
  var r = Yt(), n = Tr(), a = vn(), i = Oi();
  t.exports = function(s) {
    if (s.length < 1 || typeof s[0] != "function") throw new n("a function is required");
    return i(r, a, s);
  };
})), co = /* @__PURE__ */ fe(((e, t) => {
  var r = gn(), n = Zt(), a;
  try {
    a = [].__proto__ === Array.prototype;
  } catch (c) {
    if (!c || typeof c != "object" || !("code" in c) || c.code !== "ERR_PROTO_ACCESS") throw c;
  }
  var i = !!a && n && n(Object.prototype, "__proto__"), u = Object, s = u.getPrototypeOf;
  t.exports = i && typeof i.get == "function" ? r([i.get]) : typeof s == "function" ? function(h) {
    return s(h == null ? h : u(h));
  } : !1;
})), Pi = /* @__PURE__ */ fe(((e, t) => {
  var r = Ri(), n = Ni(), a = co();
  t.exports = r ? function(u) {
    return r(u);
  } : n ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function") throw new TypeError("getProto: not an object");
    return n(u);
  } : a ? function(u) {
    return a(u);
  } : null;
})), ho = /* @__PURE__ */ fe(((e, t) => {
  var r = Function.prototype.call, n = Object.prototype.hasOwnProperty;
  t.exports = Yt().call(r, n);
})), Fi = /* @__PURE__ */ fe(((e, t) => {
  var r, n = Ci(), a = Vs(), i = qs(), u = Xs(), s = Zs(), c = Ii(), h = Tr(), w = Ys(), v = Js(), E = Qs(), m = eo(), d = to(), y = ro(), _ = no(), k = ao(), x = Function, T = function(U) {
    try {
      return x('"use strict"; return (' + U + ").constructor;")();
    } catch {
    }
  }, S = Zt(), A = Sr(), b = function() {
    throw new h();
  }, P = S ? (function() {
    try {
      return arguments.callee, b;
    } catch {
      try {
        return S(arguments, "callee").get;
      } catch {
        return b;
      }
    }
  })() : b, M = oo()(), R = Pi(), K = Ni(), ee = Ri(), O = wn(), z = vn(), I = {}, H = typeof Uint8Array > "u" || !R ? r : R(Uint8Array), Q = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": M && R ? R([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": I,
    "%AsyncGenerator%": I,
    "%AsyncGeneratorFunction%": I,
    "%AsyncIteratorPrototype%": I,
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
    "%Error%": a,
    "%eval%": eval,
    "%EvalError%": i,
    "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": x,
    "%GeneratorFunction%": I,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": M && R ? R(R([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !M || !R ? r : R((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": n,
    "%Object.getOwnPropertyDescriptor%": S,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": u,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !M || !R ? r : R((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": M && R ? R(""[Symbol.iterator]()) : r,
    "%Symbol%": M ? Symbol : r,
    "%SyntaxError%": c,
    "%ThrowTypeError%": P,
    "%TypedArray%": H,
    "%TypeError%": h,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": w,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": z,
    "%Function.prototype.apply%": O,
    "%Object.defineProperty%": A,
    "%Object.getPrototypeOf%": K,
    "%Math.abs%": v,
    "%Math.floor%": E,
    "%Math.max%": m,
    "%Math.min%": d,
    "%Math.pow%": y,
    "%Math.round%": _,
    "%Math.sign%": k,
    "%Reflect.getPrototypeOf%": ee
  };
  if (R) try {
    null.error;
  } catch (U) {
    Q["%Error.prototype%"] = R(R(U));
  }
  var q = function U(ne) {
    var D;
    if (ne === "%AsyncFunction%") D = T("async function () {}");
    else if (ne === "%GeneratorFunction%") D = T("function* () {}");
    else if (ne === "%AsyncGeneratorFunction%") D = T("async function* () {}");
    else if (ne === "%AsyncGenerator%") {
      var L = U("%AsyncGeneratorFunction%");
      L && (D = L.prototype);
    } else if (ne === "%AsyncIteratorPrototype%") {
      var f = U("%AsyncGenerator%");
      f && R && (D = R(f.prototype));
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
  }, Y = Yt(), te = ho(), V = Y.call(z, Array.prototype.concat), F = Y.call(O, Array.prototype.splice), X = Y.call(z, String.prototype.replace), J = Y.call(z, String.prototype.slice), re = Y.call(z, RegExp.prototype.exec), pe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, C = /\\(\\)?/g, p = function(ne) {
    var D = J(ne, 0, 1), L = J(ne, -1);
    if (D === "%" && L !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
    if (L === "%" && D !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
    var f = [];
    return X(ne, pe, function(G, N, o, l) {
      f[f.length] = o ? X(l, C, "$1") : N || G;
    }), f;
  }, W = function(ne, D) {
    var L = ne, f;
    if (te(le, L) && (f = le[L], L = "%" + f[0] + "%"), te(Q, L)) {
      var G = Q[L];
      if (G === I && (G = q(L)), typeof G > "u" && !D) throw new h("intrinsic " + ne + " exists, but is not available. Please file an issue!");
      return {
        alias: f,
        name: L,
        value: G
      };
    }
    throw new c("intrinsic " + ne + " does not exist!");
  };
  t.exports = function(ne, D) {
    if (typeof ne != "string" || ne.length === 0) throw new h("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof D != "boolean") throw new h('"allowMissing" argument must be a boolean');
    if (re(/^%?[^%]*%?$/, ne) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(ne), f = L.length > 0 ? L[0] : "", G = W("%" + f + "%", D), N = G.name, o = G.value, l = !1, g = G.alias;
    g && (f = g[0], F(L, V([0, 1], g)));
    for (var B = 1, $ = !0; B < L.length; B += 1) {
      var j = L[B], ie = J(j, 0, 1), ue = J(j, -1);
      if ((ie === '"' || ie === "'" || ie === "`" || ue === '"' || ue === "'" || ue === "`") && ie !== ue) throw new c("property names with quotes must have matching quotes");
      if ((j === "constructor" || !$) && (l = !0), f += "." + j, N = "%" + f + "%", te(Q, N)) o = Q[N];
      else if (o != null) {
        if (!(j in o)) {
          if (!D) throw new h("base intrinsic for " + ne + " exists, but the property is not available.");
          return;
        }
        if (S && B + 1 >= L.length) {
          var oe = S(o, j);
          $ = !!oe, $ && "get" in oe && !("originalValue" in oe.get) ? o = oe.get : o = o[j];
        } else
          $ = te(o, j), o = o[j];
        $ && !l && (Q[N] = o);
      }
    }
    return o;
  };
})), Di = /* @__PURE__ */ fe(((e, t) => {
  var r = Fi(), n = gn(), a = n([r("%String.prototype.indexOf%")]);
  t.exports = function(u, s) {
    var c = r(u, !!s);
    return typeof c == "function" && a(u, ".prototype.") > -1 ? n([c]) : c;
  };
})), fo = /* @__PURE__ */ fe(((e, t) => {
  var r = mn()(), n = Di()("Object.prototype.toString"), a = function(c) {
    return r && c && typeof c == "object" && Symbol.toStringTag in c ? !1 : n(c) === "[object Arguments]";
  }, i = function(c) {
    return a(c) ? !0 : c !== null && typeof c == "object" && "length" in c && typeof c.length == "number" && c.length >= 0 && n(c) !== "[object Array]" && "callee" in c && n(c.callee) === "[object Function]";
  }, u = (function() {
    return a(arguments);
  })();
  a.isLegacyArguments = i, t.exports = u ? a : i;
})), po = /* @__PURE__ */ fe(((e, t) => {
  var r = Object.prototype.toString, n = Function.prototype.toString, a = /^\s*(?:function)?\*/, i = mn()(), u = Object.getPrototypeOf, s = function() {
    if (!i) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, c;
  t.exports = function(w) {
    if (typeof w != "function") return !1;
    if (a.test(n.call(w))) return !0;
    if (!i) return r.call(w) === "[object GeneratorFunction]";
    if (!u) return !1;
    if (typeof c > "u") {
      var v = s();
      c = v ? u(v) : !1;
    }
    return u(w) === c;
  };
})), mo = /* @__PURE__ */ fe(((e, t) => {
  var r = Function.prototype.toString, n = typeof Reflect == "object" && Reflect !== null && Reflect.apply, a, i;
  if (typeof n == "function" && typeof Object.defineProperty == "function") try {
    a = Object.defineProperty({}, "length", { get: function() {
      throw i;
    } }), i = {}, n(function() {
      throw 42;
    }, null, a);
  } catch (S) {
    S !== i && (n = null);
  }
  else n = null;
  var u = /^\s*class\b/, s = function(A) {
    try {
      var b = r.call(A);
      return u.test(b);
    } catch {
      return !1;
    }
  }, c = function(A) {
    try {
      return s(A) ? !1 : (r.call(A), !0);
    } catch {
      return !1;
    }
  }, h = Object.prototype.toString, w = "[object Object]", v = "[object Function]", E = "[object GeneratorFunction]", m = "[object HTMLAllCollection]", d = "[object HTML document.all class]", y = "[object HTMLCollection]", _ = typeof Symbol == "function" && !!Symbol.toStringTag, k = !(0 in [,]), x = function() {
    return !1;
  };
  if (typeof document == "object") {
    var T = document.all;
    h.call(T) === h.call(document.all) && (x = function(A) {
      if ((k || !A) && (typeof A > "u" || typeof A == "object")) try {
        var b = h.call(A);
        return (b === m || b === d || b === y || b === w) && A("") == null;
      } catch {
      }
      return !1;
    });
  }
  t.exports = n ? function(A) {
    if (x(A)) return !0;
    if (!A || typeof A != "function" && typeof A != "object") return !1;
    try {
      n(A, null, a);
    } catch (b) {
      if (b !== i) return !1;
    }
    return !s(A) && c(A);
  } : function(A) {
    if (x(A)) return !0;
    if (!A || typeof A != "function" && typeof A != "object") return !1;
    if (_) return c(A);
    if (s(A)) return !1;
    var b = h.call(A);
    return b !== v && b !== E && !/^\[object HTML/.test(b) ? !1 : c(A);
  };
})), vo = /* @__PURE__ */ fe(((e, t) => {
  var r = mo(), n = Object.prototype.toString, a = Object.prototype.hasOwnProperty, i = function(w, v, E) {
    for (var m = 0, d = w.length; m < d; m++) a.call(w, m) && (E == null ? v(w[m], m, w) : v.call(E, w[m], m, w));
  }, u = function(w, v, E) {
    for (var m = 0, d = w.length; m < d; m++) E == null ? v(w.charAt(m), m, w) : v.call(E, w.charAt(m), m, w);
  }, s = function(w, v, E) {
    for (var m in w) a.call(w, m) && (E == null ? v(w[m], m, w) : v.call(E, w[m], m, w));
  };
  function c(h) {
    return n.call(h) === "[object Array]";
  }
  t.exports = function(w, v, E) {
    if (!r(v)) throw new TypeError("iterator must be a function");
    var m;
    arguments.length >= 3 && (m = E), c(w) ? i(w, v, m) : typeof w == "string" ? u(w, v, m) : s(w, v, m);
  };
})), wo = /* @__PURE__ */ fe(((e, t) => {
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
})), go = /* @__PURE__ */ fe(((e, t) => {
  At();
  var r = wo(), n = typeof globalThis > "u" ? Ne : globalThis;
  t.exports = function() {
    for (var i = [], u = 0; u < r.length; u++) typeof n[r[u]] == "function" && (i[i.length] = r[u]);
    return i;
  };
})), yo = /* @__PURE__ */ fe(((e, t) => {
  var r = Sr(), n = Ii(), a = Tr(), i = Zt();
  t.exports = function(s, c, h) {
    if (!s || typeof s != "object" && typeof s != "function") throw new a("`obj` must be an object or a function`");
    if (typeof c != "string" && typeof c != "symbol") throw new a("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new a("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new a("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new a("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new a("`loose`, if provided, must be a boolean");
    var w = arguments.length > 3 ? arguments[3] : null, v = arguments.length > 4 ? arguments[4] : null, E = arguments.length > 5 ? arguments[5] : null, m = arguments.length > 6 ? arguments[6] : !1, d = !!i && i(s, c);
    if (r) r(s, c, {
      configurable: E === null && d ? d.configurable : !E,
      enumerable: w === null && d ? d.enumerable : !w,
      value: h,
      writable: v === null && d ? d.writable : !v
    });
    else if (m || !w && !v && !E) s[c] = h;
    else throw new n("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), bo = /* @__PURE__ */ fe(((e, t) => {
  var r = Sr(), n = function() {
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
})), _o = /* @__PURE__ */ fe(((e, t) => {
  var r = Fi(), n = yo(), a = bo()(), i = Zt(), u = Tr(), s = r("%Math.floor%");
  t.exports = function(h, w) {
    if (typeof h != "function") throw new u("`fn` is not a function");
    if (typeof w != "number" || w < 0 || w > 4294967295 || s(w) !== w) throw new u("`length` must be a positive 32-bit integer");
    var v = arguments.length > 2 && !!arguments[2], E = !0, m = !0;
    if ("length" in h && i) {
      var d = i(h, "length");
      d && !d.configurable && (E = !1), d && !d.writable && (m = !1);
    }
    return (E || m || !v) && (a ? n(h, "length", w, !0, !0) : n(h, "length", w)), h;
  };
})), xo = /* @__PURE__ */ fe(((e, t) => {
  var r = Yt(), n = wn(), a = Oi();
  t.exports = function() {
    return a(r, n, arguments);
  };
})), Eo = /* @__PURE__ */ fe(((e, t) => {
  var r = _o(), n = Sr(), a = gn(), i = xo();
  t.exports = function(s) {
    var c = a(arguments), h = s.length - (arguments.length - 1);
    return r(c, 1 + (h > 0 ? h : 0), !0);
  }, n ? n(t.exports, "apply", { value: i }) : t.exports.apply = i;
})), Li = /* @__PURE__ */ fe(((e, t) => {
  At();
  var r = vo(), n = go(), a = Eo(), i = Di(), u = Zt(), s = Pi(), c = i("Object.prototype.toString"), h = mn()(), w = typeof globalThis > "u" ? Ne : globalThis, v = n(), E = i("String.prototype.slice"), m = i("Array.prototype.indexOf", !0) || function(x, T) {
    for (var S = 0; S < x.length; S += 1) if (x[S] === T) return S;
    return -1;
  }, d = { __proto__: null };
  h && u && s ? r(v, function(k) {
    var x = new w[k]();
    if (Symbol.toStringTag in x && s) {
      var T = s(x), S = u(T, Symbol.toStringTag);
      !S && T && (S = u(s(T), Symbol.toStringTag)), d["$" + k] = a(S.get);
    }
  }) : r(v, function(k) {
    var x = new w[k](), T = x.slice || x.set;
    T && (d["$" + k] = a(T));
  });
  var y = function(x) {
    var T = !1;
    return r(
      d,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(S, A) {
        if (!T) try {
          "$" + S(x) === A && (T = E(A, 1));
        } catch {
        }
      }
    ), T;
  }, _ = function(x) {
    var T = !1;
    return r(
      d,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(S, A) {
        if (!T) try {
          S(x), T = E(A, 1);
        } catch {
        }
      }
    ), T;
  };
  t.exports = function(x) {
    if (!x || typeof x != "object") return !1;
    if (!h) {
      var T = E(c(x), 8, -1);
      return m(v, T) > -1 ? T : T !== "Object" ? !1 : _(x);
    }
    return u ? y(x) : null;
  };
})), To = /* @__PURE__ */ fe(((e, t) => {
  var r = Li();
  t.exports = function(a) {
    return !!r(a);
  };
})), So = /* @__PURE__ */ fe(((e) => {
  var t = fo(), r = po(), n = Li(), a = To();
  function i(g) {
    return g.call.bind(g);
  }
  var u = typeof BigInt < "u", s = typeof Symbol < "u", c = i(Object.prototype.toString), h = i(Number.prototype.valueOf), w = i(String.prototype.valueOf), v = i(Boolean.prototype.valueOf);
  if (u) var E = i(BigInt.prototype.valueOf);
  if (s) var m = i(Symbol.prototype.valueOf);
  function d(g, B) {
    if (typeof g != "object") return !1;
    try {
      return B(g), !0;
    } catch {
      return !1;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = a;
  function y(g) {
    return typeof Promise < "u" && g instanceof Promise || g !== null && typeof g == "object" && typeof g.then == "function" && typeof g.catch == "function";
  }
  e.isPromise = y;
  function _(g) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(g) : a(g) || X(g);
  }
  e.isArrayBufferView = _;
  function k(g) {
    return n(g) === "Uint8Array";
  }
  e.isUint8Array = k;
  function x(g) {
    return n(g) === "Uint8ClampedArray";
  }
  e.isUint8ClampedArray = x;
  function T(g) {
    return n(g) === "Uint16Array";
  }
  e.isUint16Array = T;
  function S(g) {
    return n(g) === "Uint32Array";
  }
  e.isUint32Array = S;
  function A(g) {
    return n(g) === "Int8Array";
  }
  e.isInt8Array = A;
  function b(g) {
    return n(g) === "Int16Array";
  }
  e.isInt16Array = b;
  function P(g) {
    return n(g) === "Int32Array";
  }
  e.isInt32Array = P;
  function M(g) {
    return n(g) === "Float32Array";
  }
  e.isFloat32Array = M;
  function R(g) {
    return n(g) === "Float64Array";
  }
  e.isFloat64Array = R;
  function K(g) {
    return n(g) === "BigInt64Array";
  }
  e.isBigInt64Array = K;
  function ee(g) {
    return n(g) === "BigUint64Array";
  }
  e.isBigUint64Array = ee;
  function O(g) {
    return c(g) === "[object Map]";
  }
  O.working = typeof Map < "u" && O(/* @__PURE__ */ new Map());
  function z(g) {
    return typeof Map > "u" ? !1 : O.working ? O(g) : g instanceof Map;
  }
  e.isMap = z;
  function I(g) {
    return c(g) === "[object Set]";
  }
  I.working = typeof Set < "u" && I(/* @__PURE__ */ new Set());
  function H(g) {
    return typeof Set > "u" ? !1 : I.working ? I(g) : g instanceof Set;
  }
  e.isSet = H;
  function Q(g) {
    return c(g) === "[object WeakMap]";
  }
  Q.working = typeof WeakMap < "u" && Q(/* @__PURE__ */ new WeakMap());
  function q(g) {
    return typeof WeakMap > "u" ? !1 : Q.working ? Q(g) : g instanceof WeakMap;
  }
  e.isWeakMap = q;
  function le(g) {
    return c(g) === "[object WeakSet]";
  }
  le.working = typeof WeakSet < "u" && le(/* @__PURE__ */ new WeakSet());
  function Y(g) {
    return le(g);
  }
  e.isWeakSet = Y;
  function te(g) {
    return c(g) === "[object ArrayBuffer]";
  }
  te.working = typeof ArrayBuffer < "u" && te(/* @__PURE__ */ new ArrayBuffer());
  function V(g) {
    return typeof ArrayBuffer > "u" ? !1 : te.working ? te(g) : g instanceof ArrayBuffer;
  }
  e.isArrayBuffer = V;
  function F(g) {
    return c(g) === "[object DataView]";
  }
  F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function X(g) {
    return typeof DataView > "u" ? !1 : F.working ? F(g) : g instanceof DataView;
  }
  e.isDataView = X;
  var J = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function re(g) {
    return c(g) === "[object SharedArrayBuffer]";
  }
  function pe(g) {
    return typeof J > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new J())), re.working ? re(g) : g instanceof J);
  }
  e.isSharedArrayBuffer = pe;
  function C(g) {
    return c(g) === "[object AsyncFunction]";
  }
  e.isAsyncFunction = C;
  function p(g) {
    return c(g) === "[object Map Iterator]";
  }
  e.isMapIterator = p;
  function W(g) {
    return c(g) === "[object Set Iterator]";
  }
  e.isSetIterator = W;
  function U(g) {
    return c(g) === "[object Generator]";
  }
  e.isGeneratorObject = U;
  function ne(g) {
    return c(g) === "[object WebAssembly.Module]";
  }
  e.isWebAssemblyCompiledModule = ne;
  function D(g) {
    return d(g, h);
  }
  e.isNumberObject = D;
  function L(g) {
    return d(g, w);
  }
  e.isStringObject = L;
  function f(g) {
    return d(g, v);
  }
  e.isBooleanObject = f;
  function G(g) {
    return u && d(g, E);
  }
  e.isBigIntObject = G;
  function N(g) {
    return s && d(g, m);
  }
  e.isSymbolObject = N;
  function o(g) {
    return D(g) || L(g) || f(g) || G(g) || N(g);
  }
  e.isBoxedPrimitive = o;
  function l(g) {
    return typeof Uint8Array < "u" && (V(g) || pe(g));
  }
  e.isAnyArrayBuffer = l, [
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
  ].forEach(function(g) {
    Object.defineProperty(e, g, {
      enumerable: !1,
      value: function() {
        throw new Error(g + " is not supported in userland");
      }
    });
  });
})), Ao = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function(n) {
    return n && typeof n == "object" && typeof n.copy == "function" && typeof n.fill == "function" && typeof n.readUInt8 == "function";
  };
})), Bi = /* @__PURE__ */ fe(((e) => {
  ut();
  var t = Object.getOwnPropertyDescriptors || function(X) {
    for (var J = Object.keys(X), re = {}, pe = 0; pe < J.length; pe++) re[J[pe]] = Object.getOwnPropertyDescriptor(X, J[pe]);
    return re;
  }, r = /%[sdj%]/g;
  e.format = function(F) {
    if (!A(F)) {
      for (var X = [], J = 0; J < arguments.length; J++) X.push(u(arguments[J]));
      return X.join(" ");
    }
    for (var J = 1, re = arguments, pe = re.length, C = String(F).replace(r, function(W) {
      if (W === "%%") return "%";
      if (J >= pe) return W;
      switch (W) {
        case "%s":
          return String(re[J++]);
        case "%d":
          return Number(re[J++]);
        case "%j":
          try {
            return JSON.stringify(re[J++]);
          } catch {
            return "[Circular]";
          }
        default:
          return W;
      }
    }), p = re[J]; J < pe; p = re[++J]) x(p) || !R(p) ? C += " " + p : C += " " + u(p);
    return C;
  }, e.deprecate = function(F, X) {
    if (typeof ge < "u" && ge.noDeprecation === !0) return F;
    if (typeof ge > "u") return function() {
      return e.deprecate(F, X).apply(this, arguments);
    };
    var J = !1;
    function re() {
      if (!J) {
        if (ge.throwDeprecation) throw new Error(X);
        ge.traceDeprecation ? console.trace(X) : console.error(X), J = !0;
      }
      return F.apply(this, arguments);
    }
    return re;
  };
  var n = {}, a = /^$/;
  if (ge.env.NODE_DEBUG) {
    var i = ge.env.NODE_DEBUG;
    i = i.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), a = new RegExp("^" + i + "$", "i");
  }
  e.debuglog = function(F) {
    if (F = F.toUpperCase(), !n[F])
      if (a.test(F)) {
        var X = ge.pid;
        n[F] = function() {
          var J = e.format.apply(e, arguments);
          console.error("%s %d: %s", F, X, J);
        };
      } else n[F] = function() {
      };
    return n[F];
  };
  function u(F, X) {
    var J = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (J.depth = arguments[2]), arguments.length >= 4 && (J.colors = arguments[3]), k(X) ? J.showHidden = X : X && e._extend(J, X), P(J.showHidden) && (J.showHidden = !1), P(J.depth) && (J.depth = 2), P(J.colors) && (J.colors = !1), P(J.customInspect) && (J.customInspect = !0), J.colors && (J.stylize = s), w(J, F, J.depth);
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
    var J = u.styles[X];
    return J ? "\x1B[" + u.colors[J][0] + "m" + F + "\x1B[" + u.colors[J][1] + "m" : F;
  }
  function c(F, X) {
    return F;
  }
  function h(F) {
    var X = {};
    return F.forEach(function(J, re) {
      X[J] = !0;
    }), X;
  }
  function w(F, X, J) {
    if (F.customInspect && X && O(X.inspect) && X.inspect !== e.inspect && !(X.constructor && X.constructor.prototype === X)) {
      var re = X.inspect(J, F);
      return A(re) || (re = w(F, re, J)), re;
    }
    var pe = v(F, X);
    if (pe) return pe;
    var C = Object.keys(X), p = h(C);
    if (F.showHidden && (C = Object.getOwnPropertyNames(X)), ee(X) && (C.indexOf("message") >= 0 || C.indexOf("description") >= 0)) return E(X);
    if (C.length === 0) {
      if (O(X)) {
        var W = X.name ? ": " + X.name : "";
        return F.stylize("[Function" + W + "]", "special");
      }
      if (M(X)) return F.stylize(RegExp.prototype.toString.call(X), "regexp");
      if (K(X)) return F.stylize(Date.prototype.toString.call(X), "date");
      if (ee(X)) return E(X);
    }
    var U = "", ne = !1, D = ["{", "}"];
    if (_(X) && (ne = !0, D = ["[", "]"]), O(X) && (U = " [Function" + (X.name ? ": " + X.name : "") + "]"), M(X) && (U = " " + RegExp.prototype.toString.call(X)), K(X) && (U = " " + Date.prototype.toUTCString.call(X)), ee(X) && (U = " " + E(X)), C.length === 0 && (!ne || X.length == 0)) return D[0] + U + D[1];
    if (J < 0)
      return M(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(X);
    var L;
    return ne ? L = m(F, X, J, p, C) : L = C.map(function(f) {
      return d(F, X, J, p, f, ne);
    }), F.seen.pop(), y(L, U, D);
  }
  function v(F, X) {
    if (P(X)) return F.stylize("undefined", "undefined");
    if (A(X)) {
      var J = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(J, "string");
    }
    if (S(X)) return F.stylize("" + X, "number");
    if (k(X)) return F.stylize("" + X, "boolean");
    if (x(X)) return F.stylize("null", "null");
  }
  function E(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function m(F, X, J, re, pe) {
    for (var C = [], p = 0, W = X.length; p < W; ++p) le(X, String(p)) ? C.push(d(F, X, J, re, String(p), !0)) : C.push("");
    return pe.forEach(function(U) {
      U.match(/^\d+$/) || C.push(d(F, X, J, re, U, !0));
    }), C;
  }
  function d(F, X, J, re, pe, C) {
    var p, W, U = Object.getOwnPropertyDescriptor(X, pe) || { value: X[pe] };
    if (U.get ? U.set ? W = F.stylize("[Getter/Setter]", "special") : W = F.stylize("[Getter]", "special") : U.set && (W = F.stylize("[Setter]", "special")), le(re, pe) || (p = "[" + pe + "]"), W || (F.seen.indexOf(U.value) < 0 ? (x(J) ? W = w(F, U.value, null) : W = w(F, U.value, J - 1), W.indexOf(`
`) > -1 && (C ? W = W.split(`
`).map(function(ne) {
      return "  " + ne;
    }).join(`
`).slice(2) : W = `
` + W.split(`
`).map(function(ne) {
      return "   " + ne;
    }).join(`
`))) : W = F.stylize("[Circular]", "special")), P(p)) {
      if (C && pe.match(/^\d+$/)) return W;
      p = JSON.stringify("" + pe), p.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (p = p.slice(1, -1), p = F.stylize(p, "name")) : (p = p.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), p = F.stylize(p, "string"));
    }
    return p + ": " + W;
  }
  function y(F, X, J) {
    return F.reduce(function(re, pe) {
      return pe.indexOf(`
`) >= 0, re + pe.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? J[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + J[1] : J[0] + X + " " + F.join(", ") + " " + J[1];
  }
  e.types = So();
  function _(F) {
    return Array.isArray(F);
  }
  e.isArray = _;
  function k(F) {
    return typeof F == "boolean";
  }
  e.isBoolean = k;
  function x(F) {
    return F === null;
  }
  e.isNull = x;
  function T(F) {
    return F == null;
  }
  e.isNullOrUndefined = T;
  function S(F) {
    return typeof F == "number";
  }
  e.isNumber = S;
  function A(F) {
    return typeof F == "string";
  }
  e.isString = A;
  function b(F) {
    return typeof F == "symbol";
  }
  e.isSymbol = b;
  function P(F) {
    return F === void 0;
  }
  e.isUndefined = P;
  function M(F) {
    return R(F) && I(F) === "[object RegExp]";
  }
  e.isRegExp = M, e.types.isRegExp = M;
  function R(F) {
    return typeof F == "object" && F !== null;
  }
  e.isObject = R;
  function K(F) {
    return R(F) && I(F) === "[object Date]";
  }
  e.isDate = K, e.types.isDate = K;
  function ee(F) {
    return R(F) && (I(F) === "[object Error]" || F instanceof Error);
  }
  e.isError = ee, e.types.isNativeError = ee;
  function O(F) {
    return typeof F == "function";
  }
  e.isFunction = O;
  function z(F) {
    return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || typeof F > "u";
  }
  e.isPrimitive = z, e.isBuffer = Ao();
  function I(F) {
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
  }, e.inherits = lt(), e._extend = function(F, X) {
    if (!X || !R(X)) return F;
    for (var J = Object.keys(X), re = J.length; re--; ) F[J[re]] = X[J[re]];
    return F;
  };
  function le(F, X) {
    return Object.prototype.hasOwnProperty.call(F, X);
  }
  var Y = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
  e.promisify = function(X) {
    if (typeof X != "function") throw new TypeError('The "original" argument must be of type Function');
    if (Y && X[Y]) {
      var J = X[Y];
      if (typeof J != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(J, Y, {
        value: J,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), J;
    }
    function J() {
      for (var re, pe, C = new Promise(function(U, ne) {
        re = U, pe = ne;
      }), p = [], W = 0; W < arguments.length; W++) p.push(arguments[W]);
      p.push(function(U, ne) {
        U ? pe(U) : re(ne);
      });
      try {
        X.apply(this, p);
      } catch (U) {
        pe(U);
      }
      return C;
    }
    return Object.setPrototypeOf(J, Object.getPrototypeOf(X)), Y && Object.defineProperty(J, Y, {
      value: J,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(J, t(X));
  }, e.promisify.custom = Y;
  function te(F, X) {
    if (!F) {
      var J = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      J.reason = F, F = J;
    }
    return X(F);
  }
  function V(F) {
    if (typeof F != "function") throw new TypeError('The "original" argument must be of type Function');
    function X() {
      for (var J = [], re = 0; re < arguments.length; re++) J.push(arguments[re]);
      var pe = J.pop();
      if (typeof pe != "function") throw new TypeError("The last argument must be of type Function");
      var C = this, p = function() {
        return pe.apply(C, arguments);
      };
      F.apply(this, J).then(function(W) {
        ge.nextTick(p.bind(null, null, W));
      }, function(W) {
        ge.nextTick(te.bind(null, W, p));
      });
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, t(F)), X;
  }
  e.callbackify = V;
})), ko = /* @__PURE__ */ fe(((e, t) => {
  function r(d, y) {
    var _ = Object.keys(d);
    if (Object.getOwnPropertySymbols) {
      var k = Object.getOwnPropertySymbols(d);
      y && (k = k.filter(function(x) {
        return Object.getOwnPropertyDescriptor(d, x).enumerable;
      })), _.push.apply(_, k);
    }
    return _;
  }
  function n(d) {
    for (var y = 1; y < arguments.length; y++) {
      var _ = arguments[y] != null ? arguments[y] : {};
      y % 2 ? r(Object(_), !0).forEach(function(k) {
        a(d, k, _[k]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(_)) : r(Object(_)).forEach(function(k) {
        Object.defineProperty(d, k, Object.getOwnPropertyDescriptor(_, k));
      });
    }
    return d;
  }
  function a(d, y, _) {
    return y = c(y), y in d ? Object.defineProperty(d, y, {
      value: _,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : d[y] = _, d;
  }
  function i(d, y) {
    if (!(d instanceof y)) throw new TypeError("Cannot call a class as a function");
  }
  function u(d, y) {
    for (var _ = 0; _ < y.length; _++) {
      var k = y[_];
      k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(d, c(k.key), k);
    }
  }
  function s(d, y, _) {
    return y && u(d.prototype, y), Object.defineProperty(d, "prototype", { writable: !1 }), d;
  }
  function c(d) {
    var y = h(d, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function h(d, y) {
    if (typeof d != "object" || d === null) return d;
    var _ = d[Symbol.toPrimitive];
    if (_ !== void 0) {
      var k = _.call(d, y);
      if (typeof k != "object") return k;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(d);
  }
  var w = Er().Buffer, v = Bi().inspect, E = v && v.custom || "inspect";
  function m(d, y, _) {
    w.prototype.copy.call(d, y, _);
  }
  t.exports = /* @__PURE__ */ (function() {
    function d() {
      i(this, d), this.head = null, this.tail = null, this.length = 0;
    }
    return s(d, [
      {
        key: "push",
        value: function(_) {
          var k = {
            data: _,
            next: null
          };
          this.length > 0 ? this.tail.next = k : this.head = k, this.tail = k, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(_) {
          var k = {
            data: _,
            next: this.head
          };
          this.length === 0 && (this.tail = k), this.head = k, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var _ = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, _;
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
        value: function(_) {
          if (this.length === 0) return "";
          for (var k = this.head, x = "" + k.data; k = k.next; ) x += _ + k.data;
          return x;
        }
      },
      {
        key: "concat",
        value: function(_) {
          if (this.length === 0) return w.alloc(0);
          for (var k = w.allocUnsafe(_ >>> 0), x = this.head, T = 0; x; )
            m(x.data, k, T), T += x.data.length, x = x.next;
          return k;
        }
      },
      {
        key: "consume",
        value: function(_, k) {
          var x;
          return _ < this.head.data.length ? (x = this.head.data.slice(0, _), this.head.data = this.head.data.slice(_)) : _ === this.head.data.length ? x = this.shift() : x = k ? this._getString(_) : this._getBuffer(_), x;
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
        value: function(_) {
          var k = this.head, x = 1, T = k.data;
          for (_ -= T.length; k = k.next; ) {
            var S = k.data, A = _ > S.length ? S.length : _;
            if (A === S.length ? T += S : T += S.slice(0, _), _ -= A, _ === 0) {
              A === S.length ? (++x, k.next ? this.head = k.next : this.head = this.tail = null) : (this.head = k, k.data = S.slice(A));
              break;
            }
            ++x;
          }
          return this.length -= x, T;
        }
      },
      {
        key: "_getBuffer",
        value: function(_) {
          var k = w.allocUnsafe(_), x = this.head, T = 1;
          for (x.data.copy(k), _ -= x.data.length; x = x.next; ) {
            var S = x.data, A = _ > S.length ? S.length : _;
            if (S.copy(k, k.length - _, 0, A), _ -= A, _ === 0) {
              A === S.length ? (++T, x.next ? this.head = x.next : this.head = this.tail = null) : (this.head = x, x.data = S.slice(A));
              break;
            }
            ++T;
          }
          return this.length -= T, k;
        }
      },
      {
        key: E,
        value: function(_, k) {
          return v(this, n(n({}, k), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), d;
  })();
})), Mi = /* @__PURE__ */ fe(((e, t) => {
  ut();
  function r(c, h) {
    var w = this, v = this._readableState && this._readableState.destroyed, E = this._writableState && this._writableState.destroyed;
    return v || E ? (h ? h(c) : c && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ge.nextTick(u, this, c)) : ge.nextTick(u, this, c)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(c || null, function(m) {
      !h && m ? w._writableState ? w._writableState.errorEmitted ? ge.nextTick(a, w) : (w._writableState.errorEmitted = !0, ge.nextTick(n, w, m)) : ge.nextTick(n, w, m) : h ? (ge.nextTick(a, w), h(m)) : ge.nextTick(a, w);
    }), this);
  }
  function n(c, h) {
    u(c, h), a(c);
  }
  function a(c) {
    c._writableState && !c._writableState.emitClose || c._readableState && !c._readableState.emitClose || c.emit("close");
  }
  function i() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function u(c, h) {
    c.emit("error", h);
  }
  function s(c, h) {
    var w = c._readableState, v = c._writableState;
    w && w.autoDestroy || v && v.autoDestroy ? c.destroy(h) : c.emit("error", h);
  }
  t.exports = {
    destroy: r,
    undestroy: i,
    errorOrDestroy: s
  };
})), kt = /* @__PURE__ */ fe(((e, t) => {
  function r(h, w) {
    h.prototype = Object.create(w.prototype), h.prototype.constructor = h, h.__proto__ = w;
  }
  var n = {};
  function a(h, w, v) {
    v || (v = Error);
    function E(d, y, _) {
      return typeof w == "string" ? w : w(d, y, _);
    }
    var m = /* @__PURE__ */ (function(d) {
      r(y, d);
      function y(_, k, x) {
        return d.call(this, E(_, k, x)) || this;
      }
      return y;
    })(v);
    m.prototype.name = v.name, m.prototype.code = h, n[h] = m;
  }
  function i(h, w) {
    if (Array.isArray(h)) {
      var v = h.length;
      return h = h.map(function(E) {
        return String(E);
      }), v > 2 ? "one of ".concat(w, " ").concat(h.slice(0, v - 1).join(", "), ", or ") + h[v - 1] : v === 2 ? "one of ".concat(w, " ").concat(h[0], " or ").concat(h[1]) : "of ".concat(w, " ").concat(h[0]);
    } else return "of ".concat(w, " ").concat(String(h));
  }
  function u(h, w, v) {
    return h.substr(0, w.length) === w;
  }
  function s(h, w, v) {
    return (v === void 0 || v > h.length) && (v = h.length), h.substring(v - w.length, v) === w;
  }
  function c(h, w, v) {
    return typeof v != "number" && (v = 0), v + w.length > h.length ? !1 : h.indexOf(w, v) !== -1;
  }
  a("ERR_INVALID_OPT_VALUE", function(h, w) {
    return 'The value "' + w + '" is invalid for option "' + h + '"';
  }, TypeError), a("ERR_INVALID_ARG_TYPE", function(h, w, v) {
    var E;
    typeof w == "string" && u(w, "not ") ? (E = "must not be", w = w.replace(/^not /, "")) : E = "must be";
    var m;
    if (s(h, " argument")) m = "The ".concat(h, " ").concat(E, " ").concat(i(w, "type"));
    else {
      var d = c(h, ".") ? "property" : "argument";
      m = 'The "'.concat(h, '" ').concat(d, " ").concat(E, " ").concat(i(w, "type"));
    }
    return m += ". Received type ".concat(typeof v), m;
  }, TypeError), a("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), a("ERR_METHOD_NOT_IMPLEMENTED", function(h) {
    return "The " + h + " method is not implemented";
  }), a("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), a("ERR_STREAM_DESTROYED", function(h) {
    return "Cannot call " + h + " after a stream was destroyed";
  }), a("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), a("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), a("ERR_STREAM_WRITE_AFTER_END", "write after end"), a("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), a("ERR_UNKNOWN_ENCODING", function(h) {
    return "Unknown encoding: " + h;
  }, TypeError), a("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
})), Ui = /* @__PURE__ */ fe(((e, t) => {
  var r = kt().codes.ERR_INVALID_OPT_VALUE;
  function n(i, u, s) {
    return i.highWaterMark != null ? i.highWaterMark : u ? i[s] : null;
  }
  function a(i, u, s, c) {
    var h = n(u, c, s);
    if (h != null) {
      if (!(isFinite(h) && Math.floor(h) === h) || h < 0) throw new r(c ? s : "highWaterMark", h);
      return Math.floor(h);
    }
    return i.objectMode ? 16 : 16384;
  }
  t.exports = { getHighWaterMark: a };
})), Co = /* @__PURE__ */ fe(((e, t) => {
  At(), t.exports = r;
  function r(a, i) {
    if (n("noDeprecation")) return a;
    var u = !1;
    function s() {
      if (!u) {
        if (n("throwDeprecation")) throw new Error(i);
        n("traceDeprecation") ? console.trace(i) : console.warn(i), u = !0;
      }
      return a.apply(this, arguments);
    }
    return s;
  }
  function n(a) {
    try {
      if (!Ne.localStorage) return !1;
    } catch {
      return !1;
    }
    var i = Ne.localStorage[a];
    return i == null ? !1 : String(i).toLowerCase() === "true";
  }
})), Wi = /* @__PURE__ */ fe(((e, t) => {
  At(), ut(), t.exports = R;
  function r(C) {
    var p = this;
    this.next = null, this.entry = null, this.finish = function() {
      pe(p, C);
    };
  }
  var n;
  R.WritableState = P;
  var a = { deprecate: Co() }, i = Ai(), u = Er().Buffer, s = (typeof Ne < "u" ? Ne : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c(C) {
    return u.from(C);
  }
  function h(C) {
    return u.isBuffer(C) || C instanceof s;
  }
  var w = Mi(), v = Ui().getHighWaterMark, E = kt().codes, m = E.ERR_INVALID_ARG_TYPE, d = E.ERR_METHOD_NOT_IMPLEMENTED, y = E.ERR_MULTIPLE_CALLBACK, _ = E.ERR_STREAM_CANNOT_PIPE, k = E.ERR_STREAM_DESTROYED, x = E.ERR_STREAM_NULL_VALUES, T = E.ERR_STREAM_WRITE_AFTER_END, S = E.ERR_UNKNOWN_ENCODING, A = w.errorOrDestroy;
  lt()(R, i);
  function b() {
  }
  function P(C, p, W) {
    n = n || Et(), C = C || {}, typeof W != "boolean" && (W = p instanceof n), this.objectMode = !!C.objectMode, W && (this.objectMode = this.objectMode || !!C.writableObjectMode), this.highWaterMark = v(this, C, "writableHighWaterMark", W), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var U = C.decodeStrings === !1;
    this.decodeStrings = !U, this.defaultEncoding = C.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ne) {
      q(p, ne);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = C.emitClose !== !1, this.autoDestroy = !!C.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  P.prototype.getBuffer = function() {
    for (var p = this.bufferedRequest, W = []; p; )
      W.push(p), p = p.next;
    return W;
  }, (function() {
    try {
      Object.defineProperty(P.prototype, "buffer", { get: a.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var M;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (M = Function.prototype[Symbol.hasInstance], Object.defineProperty(R, Symbol.hasInstance, { value: function(p) {
    return M.call(this, p) ? !0 : this !== R ? !1 : p && p._writableState instanceof P;
  } })) : M = function(p) {
    return p instanceof this;
  };
  function R(C) {
    n = n || Et();
    var p = this instanceof n;
    if (!p && !M.call(R, this)) return new R(C);
    this._writableState = new P(C, this, p), this.writable = !0, C && (typeof C.write == "function" && (this._write = C.write), typeof C.writev == "function" && (this._writev = C.writev), typeof C.destroy == "function" && (this._destroy = C.destroy), typeof C.final == "function" && (this._final = C.final)), i.call(this);
  }
  R.prototype.pipe = function() {
    A(this, new _());
  };
  function K(C, p) {
    var W = new T();
    A(C, W), ge.nextTick(p, W);
  }
  function ee(C, p, W, U) {
    var ne;
    return W === null ? ne = new x() : typeof W != "string" && !p.objectMode && (ne = new m("chunk", ["string", "Buffer"], W)), ne ? (A(C, ne), ge.nextTick(U, ne), !1) : !0;
  }
  R.prototype.write = function(C, p, W) {
    var U = this._writableState, ne = !1, D = !U.objectMode && h(C);
    return D && !u.isBuffer(C) && (C = c(C)), typeof p == "function" && (W = p, p = null), D ? p = "buffer" : p || (p = U.defaultEncoding), typeof W != "function" && (W = b), U.ending ? K(this, W) : (D || ee(this, U, C, W)) && (U.pendingcb++, ne = z(this, U, D, C, p, W)), ne;
  }, R.prototype.cork = function() {
    this._writableState.corked++;
  }, R.prototype.uncork = function() {
    var C = this._writableState;
    C.corked && (C.corked--, !C.writing && !C.corked && !C.bufferProcessing && C.bufferedRequest && te(this, C));
  }, R.prototype.setDefaultEncoding = function(p) {
    if (typeof p == "string" && (p = p.toLowerCase()), !([
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
    ].indexOf((p + "").toLowerCase()) > -1)) throw new S(p);
    return this._writableState.defaultEncoding = p, this;
  }, Object.defineProperty(R.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function O(C, p, W) {
    return !C.objectMode && C.decodeStrings !== !1 && typeof p == "string" && (p = u.from(p, W)), p;
  }
  Object.defineProperty(R.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function z(C, p, W, U, ne, D) {
    if (!W) {
      var L = O(p, U, ne);
      U !== L && (W = !0, ne = "buffer", U = L);
    }
    var f = p.objectMode ? 1 : U.length;
    p.length += f;
    var G = p.length < p.highWaterMark;
    if (G || (p.needDrain = !0), p.writing || p.corked) {
      var N = p.lastBufferedRequest;
      p.lastBufferedRequest = {
        chunk: U,
        encoding: ne,
        isBuf: W,
        callback: D,
        next: null
      }, N ? N.next = p.lastBufferedRequest : p.bufferedRequest = p.lastBufferedRequest, p.bufferedRequestCount += 1;
    } else I(C, p, !1, f, U, ne, D);
    return G;
  }
  function I(C, p, W, U, ne, D, L) {
    p.writelen = U, p.writecb = L, p.writing = !0, p.sync = !0, p.destroyed ? p.onwrite(new k("write")) : W ? C._writev(ne, p.onwrite) : C._write(ne, D, p.onwrite), p.sync = !1;
  }
  function H(C, p, W, U, ne) {
    --p.pendingcb, W ? (ge.nextTick(ne, U), ge.nextTick(J, C, p), C._writableState.errorEmitted = !0, A(C, U)) : (ne(U), C._writableState.errorEmitted = !0, A(C, U), J(C, p));
  }
  function Q(C) {
    C.writing = !1, C.writecb = null, C.length -= C.writelen, C.writelen = 0;
  }
  function q(C, p) {
    var W = C._writableState, U = W.sync, ne = W.writecb;
    if (typeof ne != "function") throw new y();
    if (Q(W), p) H(C, W, U, p, ne);
    else {
      var D = V(W) || C.destroyed;
      !D && !W.corked && !W.bufferProcessing && W.bufferedRequest && te(C, W), U ? ge.nextTick(le, C, W, D, ne) : le(C, W, D, ne);
    }
  }
  function le(C, p, W, U) {
    W || Y(C, p), p.pendingcb--, U(), J(C, p);
  }
  function Y(C, p) {
    p.length === 0 && p.needDrain && (p.needDrain = !1, C.emit("drain"));
  }
  function te(C, p) {
    p.bufferProcessing = !0;
    var W = p.bufferedRequest;
    if (C._writev && W && W.next) {
      var U = p.bufferedRequestCount, ne = new Array(U), D = p.corkedRequestsFree;
      D.entry = W;
      for (var L = 0, f = !0; W; )
        ne[L] = W, W.isBuf || (f = !1), W = W.next, L += 1;
      ne.allBuffers = f, I(C, p, !0, p.length, ne, "", D.finish), p.pendingcb++, p.lastBufferedRequest = null, D.next ? (p.corkedRequestsFree = D.next, D.next = null) : p.corkedRequestsFree = new r(p), p.bufferedRequestCount = 0;
    } else {
      for (; W; ) {
        var G = W.chunk, N = W.encoding, o = W.callback;
        if (I(C, p, !1, p.objectMode ? 1 : G.length, G, N, o), W = W.next, p.bufferedRequestCount--, p.writing) break;
      }
      W === null && (p.lastBufferedRequest = null);
    }
    p.bufferedRequest = W, p.bufferProcessing = !1;
  }
  R.prototype._write = function(C, p, W) {
    W(new d("_write()"));
  }, R.prototype._writev = null, R.prototype.end = function(C, p, W) {
    var U = this._writableState;
    return typeof C == "function" ? (W = C, C = null, p = null) : typeof p == "function" && (W = p, p = null), C != null && this.write(C, p), U.corked && (U.corked = 1, this.uncork()), U.ending || re(this, U, W), this;
  }, Object.defineProperty(R.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function V(C) {
    return C.ending && C.length === 0 && C.bufferedRequest === null && !C.finished && !C.writing;
  }
  function F(C, p) {
    C._final(function(W) {
      p.pendingcb--, W && A(C, W), p.prefinished = !0, C.emit("prefinish"), J(C, p);
    });
  }
  function X(C, p) {
    !p.prefinished && !p.finalCalled && (typeof C._final == "function" && !p.destroyed ? (p.pendingcb++, p.finalCalled = !0, ge.nextTick(F, C, p)) : (p.prefinished = !0, C.emit("prefinish")));
  }
  function J(C, p) {
    var W = V(p);
    if (W && (X(C, p), p.pendingcb === 0 && (p.finished = !0, C.emit("finish"), p.autoDestroy))) {
      var U = C._readableState;
      (!U || U.autoDestroy && U.endEmitted) && C.destroy();
    }
    return W;
  }
  function re(C, p, W) {
    p.ending = !0, J(C, p), W && (p.finished ? ge.nextTick(W) : C.once("finish", W)), p.ended = !0, C.writable = !1;
  }
  function pe(C, p, W) {
    var U = C.entry;
    for (C.entry = null; U; ) {
      var ne = U.callback;
      p.pendingcb--, ne(W), U = U.next;
    }
    p.corkedRequestsFree.next = C;
  }
  Object.defineProperty(R.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(p) {
      this._writableState && (this._writableState.destroyed = p);
    }
  }), R.prototype.destroy = w.destroy, R.prototype._undestroy = w.undestroy, R.prototype._destroy = function(C, p) {
    p(C);
  };
})), Et = /* @__PURE__ */ fe(((e, t) => {
  ut();
  var r = Object.keys || function(v) {
    var E = [];
    for (var m in v) E.push(m);
    return E;
  };
  t.exports = c;
  var n = ji(), a = Wi();
  lt()(c, n);
  for (var i = r(a.prototype), u = 0; u < i.length; u++) {
    var s = i[u];
    c.prototype[s] || (c.prototype[s] = a.prototype[s]);
  }
  function c(v) {
    if (!(this instanceof c)) return new c(v);
    n.call(this, v), a.call(this, v), this.allowHalfOpen = !0, v && (v.readable === !1 && (this.readable = !1), v.writable === !1 && (this.writable = !1), v.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", h)));
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
  function h() {
    this._writableState.ended || ge.nextTick(w, this);
  }
  function w(v) {
    v.end();
  }
  Object.defineProperty(c.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(E) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = E, this._writableState.destroyed = E);
    }
  });
})), Io = /* @__PURE__ */ fe(((e, t) => {
  var r = Er(), n = r.Buffer;
  function a(u, s) {
    for (var c in u) s[c] = u[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (a(r, e), e.Buffer = i);
  function i(u, s, c) {
    return n(u, s, c);
  }
  a(n, i), i.from = function(u, s, c) {
    if (typeof u == "number") throw new TypeError("Argument must not be a number");
    return n(u, s, c);
  }, i.alloc = function(u, s, c) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    var h = n(u);
    return s !== void 0 ? typeof c == "string" ? h.fill(s, c) : h.fill(s) : h.fill(0), h;
  }, i.allocUnsafe = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return n(u);
  }, i.allocUnsafeSlow = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(u);
  };
})), an = /* @__PURE__ */ fe(((e) => {
  var t = Io().Buffer, r = t.isEncoding || function(x) {
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
    for (var T; ; ) switch (x) {
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
        if (T) return;
        x = ("" + x).toLowerCase(), T = !0;
    }
  }
  function a(x) {
    var T = n(x);
    if (typeof T != "string" && (t.isEncoding === r || !r(x))) throw new Error("Unknown encoding: " + x);
    return T || x;
  }
  e.StringDecoder = i;
  function i(x) {
    this.encoding = a(x);
    var T;
    switch (this.encoding) {
      case "utf16le":
        this.text = E, this.end = m, T = 4;
        break;
      case "utf8":
        this.fillLast = h, T = 4;
        break;
      case "base64":
        this.text = d, this.end = y, T = 3;
        break;
      default:
        this.write = _, this.end = k;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(T);
  }
  i.prototype.write = function(x) {
    if (x.length === 0) return "";
    var T, S;
    if (this.lastNeed) {
      if (T = this.fillLast(x), T === void 0) return "";
      S = this.lastNeed, this.lastNeed = 0;
    } else S = 0;
    return S < x.length ? T ? T + this.text(x, S) : this.text(x, S) : T || "";
  }, i.prototype.end = v, i.prototype.text = w, i.prototype.fillLast = function(x) {
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, x.length), this.lastNeed -= x.length;
  };
  function u(x) {
    return x <= 127 ? 0 : x >> 5 === 6 ? 2 : x >> 4 === 14 ? 3 : x >> 3 === 30 ? 4 : x >> 6 === 2 ? -1 : -2;
  }
  function s(x, T, S) {
    var A = T.length - 1;
    if (A < S) return 0;
    var b = u(T[A]);
    return b >= 0 ? (b > 0 && (x.lastNeed = b - 1), b) : --A < S || b === -2 ? 0 : (b = u(T[A]), b >= 0 ? (b > 0 && (x.lastNeed = b - 2), b) : --A < S || b === -2 ? 0 : (b = u(T[A]), b >= 0 ? (b > 0 && (b === 2 ? b = 0 : x.lastNeed = b - 3), b) : 0));
  }
  function c(x, T, S) {
    if ((T[0] & 192) !== 128)
      return x.lastNeed = 0, "�";
    if (x.lastNeed > 1 && T.length > 1) {
      if ((T[1] & 192) !== 128)
        return x.lastNeed = 1, "�";
      if (x.lastNeed > 2 && T.length > 2 && (T[2] & 192) !== 128)
        return x.lastNeed = 2, "�";
    }
  }
  function h(x) {
    var T = this.lastTotal - this.lastNeed, S = c(this, x);
    if (S !== void 0) return S;
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, T, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, T, 0, x.length), this.lastNeed -= x.length;
  }
  function w(x, T) {
    var S = s(this, x, T);
    if (!this.lastNeed) return x.toString("utf8", T);
    this.lastTotal = S;
    var A = x.length - (S - this.lastNeed);
    return x.copy(this.lastChar, 0, A), x.toString("utf8", T, A);
  }
  function v(x) {
    var T = x && x.length ? this.write(x) : "";
    return this.lastNeed ? T + "�" : T;
  }
  function E(x, T) {
    if ((x.length - T) % 2 === 0) {
      var S = x.toString("utf16le", T);
      if (S) {
        var A = S.charCodeAt(S.length - 1);
        if (A >= 55296 && A <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1], S.slice(0, -1);
      }
      return S;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = x[x.length - 1], x.toString("utf16le", T, x.length - 1);
  }
  function m(x) {
    var T = x && x.length ? this.write(x) : "";
    if (this.lastNeed) {
      var S = this.lastTotal - this.lastNeed;
      return T + this.lastChar.toString("utf16le", 0, S);
    }
    return T;
  }
  function d(x, T) {
    var S = (x.length - T) % 3;
    return S === 0 ? x.toString("base64", T) : (this.lastNeed = 3 - S, this.lastTotal = 3, S === 1 ? this.lastChar[0] = x[x.length - 1] : (this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1]), x.toString("base64", T, x.length - S));
  }
  function y(x) {
    var T = x && x.length ? this.write(x) : "";
    return this.lastNeed ? T + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : T;
  }
  function _(x) {
    return x.toString(this.encoding);
  }
  function k(x) {
    return x && x.length ? this.write(x) : "";
  }
})), yn = /* @__PURE__ */ fe(((e, t) => {
  var r = kt().codes.ERR_STREAM_PREMATURE_CLOSE;
  function n(s) {
    var c = !1;
    return function() {
      if (!c) {
        c = !0;
        for (var h = arguments.length, w = new Array(h), v = 0; v < h; v++) w[v] = arguments[v];
        s.apply(this, w);
      }
    };
  }
  function a() {
  }
  function i(s) {
    return s.setHeader && typeof s.abort == "function";
  }
  function u(s, c, h) {
    if (typeof c == "function") return u(s, null, c);
    c || (c = {}), h = n(h || a);
    var w = c.readable || c.readable !== !1 && s.readable, v = c.writable || c.writable !== !1 && s.writable, E = function() {
      s.writable || d();
    }, m = s._writableState && s._writableState.finished, d = function() {
      v = !1, m = !0, w || h.call(s);
    }, y = s._readableState && s._readableState.endEmitted, _ = function() {
      w = !1, y = !0, v || h.call(s);
    }, k = function(A) {
      h.call(s, A);
    }, x = function() {
      var A;
      if (w && !y)
        return (!s._readableState || !s._readableState.ended) && (A = new r()), h.call(s, A);
      if (v && !m)
        return (!s._writableState || !s._writableState.ended) && (A = new r()), h.call(s, A);
    }, T = function() {
      s.req.on("finish", d);
    };
    return i(s) ? (s.on("complete", d), s.on("abort", x), s.req ? T() : s.on("request", T)) : v && !s._writableState && (s.on("end", E), s.on("close", E)), s.on("end", _), s.on("finish", d), c.error !== !1 && s.on("error", k), s.on("close", x), function() {
      s.removeListener("complete", d), s.removeListener("abort", x), s.removeListener("request", T), s.req && s.req.removeListener("finish", d), s.removeListener("end", E), s.removeListener("close", E), s.removeListener("finish", d), s.removeListener("end", _), s.removeListener("error", k), s.removeListener("close", x);
    };
  }
  t.exports = u;
})), Ro = /* @__PURE__ */ fe(((e, t) => {
  ut();
  var r;
  function n(S, A, b) {
    return A = a(A), A in S ? Object.defineProperty(S, A, {
      value: b,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : S[A] = b, S;
  }
  function a(S) {
    var A = i(S, "string");
    return typeof A == "symbol" ? A : String(A);
  }
  function i(S, A) {
    if (typeof S != "object" || S === null) return S;
    var b = S[Symbol.toPrimitive];
    if (b !== void 0) {
      var P = b.call(S, A);
      if (typeof P != "object") return P;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (A === "string" ? String : Number)(S);
  }
  var u = yn(), s = /* @__PURE__ */ Symbol("lastResolve"), c = /* @__PURE__ */ Symbol("lastReject"), h = /* @__PURE__ */ Symbol("error"), w = /* @__PURE__ */ Symbol("ended"), v = /* @__PURE__ */ Symbol("lastPromise"), E = /* @__PURE__ */ Symbol("handlePromise"), m = /* @__PURE__ */ Symbol("stream");
  function d(S, A) {
    return {
      value: S,
      done: A
    };
  }
  function y(S) {
    var A = S[s];
    if (A !== null) {
      var b = S[m].read();
      b !== null && (S[v] = null, S[s] = null, S[c] = null, A(d(b, !1)));
    }
  }
  function _(S) {
    ge.nextTick(y, S);
  }
  function k(S, A) {
    return function(b, P) {
      S.then(function() {
        if (A[w]) {
          b(d(void 0, !0));
          return;
        }
        A[E](b, P);
      }, P);
    };
  }
  var x = Object.getPrototypeOf(function() {
  }), T = Object.setPrototypeOf((r = {
    get stream() {
      return this[m];
    },
    next: function() {
      var A = this, b = this[h];
      if (b !== null) return Promise.reject(b);
      if (this[w]) return Promise.resolve(d(void 0, !0));
      if (this[m].destroyed) return new Promise(function(K, ee) {
        ge.nextTick(function() {
          A[h] ? ee(A[h]) : K(d(void 0, !0));
        });
      });
      var P = this[v], M;
      if (P) M = new Promise(k(P, this));
      else {
        var R = this[m].read();
        if (R !== null) return Promise.resolve(d(R, !1));
        M = new Promise(this[E]);
      }
      return this[v] = M, M;
    }
  }, n(r, Symbol.asyncIterator, function() {
    return this;
  }), n(r, "return", function() {
    var A = this;
    return new Promise(function(b, P) {
      A[m].destroy(null, function(M) {
        if (M) {
          P(M);
          return;
        }
        b(d(void 0, !0));
      });
    });
  }), r), x);
  t.exports = function(A) {
    var b, P = Object.create(T, (b = {}, n(b, m, {
      value: A,
      writable: !0
    }), n(b, s, {
      value: null,
      writable: !0
    }), n(b, c, {
      value: null,
      writable: !0
    }), n(b, h, {
      value: null,
      writable: !0
    }), n(b, w, {
      value: A._readableState.endEmitted,
      writable: !0
    }), n(b, E, {
      value: function(R, K) {
        var ee = P[m].read();
        ee ? (P[v] = null, P[s] = null, P[c] = null, R(d(ee, !1))) : (P[s] = R, P[c] = K);
      },
      writable: !0
    }), b));
    return P[v] = null, u(A, function(M) {
      if (M && M.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var R = P[c];
        R !== null && (P[v] = null, P[s] = null, P[c] = null, R(M)), P[h] = M;
        return;
      }
      var K = P[s];
      K !== null && (P[v] = null, P[s] = null, P[c] = null, K(d(void 0, !0))), P[w] = !0;
    }), A.on("readable", _.bind(null, P)), P;
  };
})), No = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), ji = /* @__PURE__ */ fe(((e, t) => {
  At(), ut(), t.exports = K;
  var r;
  K.ReadableState = R, pn().EventEmitter;
  var n = function(L, f) {
    return L.listeners(f).length;
  }, a = Ai(), i = Er().Buffer, u = (typeof Ne < "u" ? Ne : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(D) {
    return i.from(D);
  }
  function c(D) {
    return i.isBuffer(D) || D instanceof u;
  }
  var h = Bi(), w;
  h && h.debuglog ? w = h.debuglog("stream") : w = function() {
  };
  var v = ko(), E = Mi(), m = Ui().getHighWaterMark, d = kt().codes, y = d.ERR_INVALID_ARG_TYPE, _ = d.ERR_STREAM_PUSH_AFTER_EOF, k = d.ERR_METHOD_NOT_IMPLEMENTED, x = d.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, T, S, A;
  lt()(K, a);
  var b = E.errorOrDestroy, P = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function M(D, L, f) {
    if (typeof D.prependListener == "function") return D.prependListener(L, f);
    !D._events || !D._events[L] ? D.on(L, f) : Array.isArray(D._events[L]) ? D._events[L].unshift(f) : D._events[L] = [f, D._events[L]];
  }
  function R(D, L, f) {
    r = r || Et(), D = D || {}, typeof f != "boolean" && (f = L instanceof r), this.objectMode = !!D.objectMode, f && (this.objectMode = this.objectMode || !!D.readableObjectMode), this.highWaterMark = m(this, D, "readableHighWaterMark", f), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = D.emitClose !== !1, this.autoDestroy = !!D.autoDestroy, this.destroyed = !1, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, D.encoding && (T || (T = an().StringDecoder), this.decoder = new T(D.encoding), this.encoding = D.encoding);
  }
  function K(D) {
    if (r = r || Et(), !(this instanceof K)) return new K(D);
    var L = this instanceof r;
    this._readableState = new R(D, this, L), this.readable = !0, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), a.call(this);
  }
  Object.defineProperty(K.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(L) {
      this._readableState && (this._readableState.destroyed = L);
    }
  }), K.prototype.destroy = E.destroy, K.prototype._undestroy = E.undestroy, K.prototype._destroy = function(D, L) {
    L(D);
  }, K.prototype.push = function(D, L) {
    var f = this._readableState, G;
    return f.objectMode ? G = !0 : typeof D == "string" && (L = L || f.defaultEncoding, L !== f.encoding && (D = i.from(D, L), L = ""), G = !0), ee(this, D, L, !1, G);
  }, K.prototype.unshift = function(D) {
    return ee(this, D, null, !0, !1);
  };
  function ee(D, L, f, G, N) {
    w("readableAddChunk", L);
    var o = D._readableState;
    if (L === null)
      o.reading = !1, q(D, o);
    else {
      var l;
      if (N || (l = z(o, L)), l) b(D, l);
      else if (o.objectMode || L && L.length > 0)
        if (typeof L != "string" && !o.objectMode && Object.getPrototypeOf(L) !== i.prototype && (L = s(L)), G)
          o.endEmitted ? b(D, new x()) : O(D, o, L, !0);
        else if (o.ended) b(D, new _());
        else {
          if (o.destroyed) return !1;
          o.reading = !1, o.decoder && !f ? (L = o.decoder.write(L), o.objectMode || L.length !== 0 ? O(D, o, L, !1) : te(D, o)) : O(D, o, L, !1);
        }
      else G || (o.reading = !1, te(D, o));
    }
    return !o.ended && (o.length < o.highWaterMark || o.length === 0);
  }
  function O(D, L, f, G) {
    L.flowing && L.length === 0 && !L.sync ? (L.awaitDrain = 0, D.emit("data", f)) : (L.length += L.objectMode ? 1 : f.length, G ? L.buffer.unshift(f) : L.buffer.push(f), L.needReadable && le(D)), te(D, L);
  }
  function z(D, L) {
    var f;
    return !c(L) && typeof L != "string" && L !== void 0 && !D.objectMode && (f = new y("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], L)), f;
  }
  K.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, K.prototype.setEncoding = function(D) {
    T || (T = an().StringDecoder);
    var L = new T(D);
    this._readableState.decoder = L, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var f = this._readableState.buffer.head, G = ""; f !== null; )
      G += L.write(f.data), f = f.next;
    return this._readableState.buffer.clear(), G !== "" && this._readableState.buffer.push(G), this._readableState.length = G.length, this;
  };
  var I = 1073741824;
  function H(D) {
    return D >= I ? D = I : (D--, D |= D >>> 1, D |= D >>> 2, D |= D >>> 4, D |= D >>> 8, D |= D >>> 16, D++), D;
  }
  function Q(D, L) {
    return D <= 0 || L.length === 0 && L.ended ? 0 : L.objectMode ? 1 : D !== D ? L.flowing && L.length ? L.buffer.head.data.length : L.length : (D > L.highWaterMark && (L.highWaterMark = H(D)), D <= L.length ? D : L.ended ? L.length : (L.needReadable = !0, 0));
  }
  K.prototype.read = function(D) {
    w("read", D), D = parseInt(D, 10);
    var L = this._readableState, f = D;
    if (D !== 0 && (L.emittedReadable = !1), D === 0 && L.needReadable && ((L.highWaterMark !== 0 ? L.length >= L.highWaterMark : L.length > 0) || L.ended))
      return w("read: emitReadable", L.length, L.ended), L.length === 0 && L.ended ? W(this) : le(this), null;
    if (D = Q(D, L), D === 0 && L.ended)
      return L.length === 0 && W(this), null;
    var G = L.needReadable;
    w("need readable", G), (L.length === 0 || L.length - D < L.highWaterMark) && (G = !0, w("length less than watermark", G)), L.ended || L.reading ? (G = !1, w("reading or ended", G)) : G && (w("do read"), L.reading = !0, L.sync = !0, L.length === 0 && (L.needReadable = !0), this._read(L.highWaterMark), L.sync = !1, L.reading || (D = Q(f, L)));
    var N;
    return D > 0 ? N = p(D, L) : N = null, N === null ? (L.needReadable = L.length <= L.highWaterMark, D = 0) : (L.length -= D, L.awaitDrain = 0), L.length === 0 && (L.ended || (L.needReadable = !0), f !== D && L.ended && W(this)), N !== null && this.emit("data", N), N;
  };
  function q(D, L) {
    if (w("onEofChunk"), !L.ended) {
      if (L.decoder) {
        var f = L.decoder.end();
        f && f.length && (L.buffer.push(f), L.length += L.objectMode ? 1 : f.length);
      }
      L.ended = !0, L.sync ? le(D) : (L.needReadable = !1, L.emittedReadable || (L.emittedReadable = !0, Y(D)));
    }
  }
  function le(D) {
    var L = D._readableState;
    w("emitReadable", L.needReadable, L.emittedReadable), L.needReadable = !1, L.emittedReadable || (w("emitReadable", L.flowing), L.emittedReadable = !0, ge.nextTick(Y, D));
  }
  function Y(D) {
    var L = D._readableState;
    w("emitReadable_", L.destroyed, L.length, L.ended), !L.destroyed && (L.length || L.ended) && (D.emit("readable"), L.emittedReadable = !1), L.needReadable = !L.flowing && !L.ended && L.length <= L.highWaterMark, C(D);
  }
  function te(D, L) {
    L.readingMore || (L.readingMore = !0, ge.nextTick(V, D, L));
  }
  function V(D, L) {
    for (; !L.reading && !L.ended && (L.length < L.highWaterMark || L.flowing && L.length === 0); ) {
      var f = L.length;
      if (w("maybeReadMore read 0"), D.read(0), f === L.length) break;
    }
    L.readingMore = !1;
  }
  K.prototype._read = function(D) {
    b(this, new k("_read()"));
  }, K.prototype.pipe = function(D, L) {
    var f = this, G = this._readableState;
    switch (G.pipesCount) {
      case 0:
        G.pipes = D;
        break;
      case 1:
        G.pipes = [G.pipes, D];
        break;
      default:
        G.pipes.push(D);
    }
    G.pipesCount += 1, w("pipe count=%d opts=%j", G.pipesCount, L);
    var N = (!L || L.end !== !1) && D !== ge.stdout && D !== ge.stderr ? l : de;
    G.endEmitted ? ge.nextTick(N) : f.once("end", N), D.on("unpipe", o);
    function o(me, we) {
      w("onunpipe"), me === f && we && we.hasUnpiped === !1 && (we.hasUnpiped = !0, $());
    }
    function l() {
      w("onend"), D.end();
    }
    var g = F(f);
    D.on("drain", g);
    var B = !1;
    function $() {
      w("cleanup"), D.removeListener("close", ue), D.removeListener("finish", oe), D.removeListener("drain", g), D.removeListener("error", ie), D.removeListener("unpipe", o), f.removeListener("end", l), f.removeListener("end", de), f.removeListener("data", j), B = !0, G.awaitDrain && (!D._writableState || D._writableState.needDrain) && g();
    }
    f.on("data", j);
    function j(me) {
      w("ondata");
      var we = D.write(me);
      w("dest.write", we), we === !1 && ((G.pipesCount === 1 && G.pipes === D || G.pipesCount > 1 && ne(G.pipes, D) !== -1) && !B && (w("false write response, pause", G.awaitDrain), G.awaitDrain++), f.pause());
    }
    function ie(me) {
      w("onerror", me), de(), D.removeListener("error", ie), n(D, "error") === 0 && b(D, me);
    }
    M(D, "error", ie);
    function ue() {
      D.removeListener("finish", oe), de();
    }
    D.once("close", ue);
    function oe() {
      w("onfinish"), D.removeListener("close", ue), de();
    }
    D.once("finish", oe);
    function de() {
      w("unpipe"), f.unpipe(D);
    }
    return D.emit("pipe", f), G.flowing || (w("pipe resume"), f.resume()), D;
  };
  function F(D) {
    return function() {
      var f = D._readableState;
      w("pipeOnDrain", f.awaitDrain), f.awaitDrain && f.awaitDrain--, f.awaitDrain === 0 && n(D, "data") && (f.flowing = !0, C(D));
    };
  }
  K.prototype.unpipe = function(D) {
    var L = this._readableState, f = { hasUnpiped: !1 };
    if (L.pipesCount === 0) return this;
    if (L.pipesCount === 1)
      return D && D !== L.pipes ? this : (D || (D = L.pipes), L.pipes = null, L.pipesCount = 0, L.flowing = !1, D && D.emit("unpipe", this, f), this);
    if (!D) {
      var G = L.pipes, N = L.pipesCount;
      L.pipes = null, L.pipesCount = 0, L.flowing = !1;
      for (var o = 0; o < N; o++) G[o].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var l = ne(L.pipes, D);
    return l === -1 ? this : (L.pipes.splice(l, 1), L.pipesCount -= 1, L.pipesCount === 1 && (L.pipes = L.pipes[0]), D.emit("unpipe", this, f), this);
  }, K.prototype.on = function(D, L) {
    var f = a.prototype.on.call(this, D, L), G = this._readableState;
    return D === "data" ? (G.readableListening = this.listenerCount("readable") > 0, G.flowing !== !1 && this.resume()) : D === "readable" && !G.endEmitted && !G.readableListening && (G.readableListening = G.needReadable = !0, G.flowing = !1, G.emittedReadable = !1, w("on readable", G.length, G.reading), G.length ? le(this) : G.reading || ge.nextTick(J, this)), f;
  }, K.prototype.addListener = K.prototype.on, K.prototype.removeListener = function(D, L) {
    var f = a.prototype.removeListener.call(this, D, L);
    return D === "readable" && ge.nextTick(X, this), f;
  }, K.prototype.removeAllListeners = function(D) {
    var L = a.prototype.removeAllListeners.apply(this, arguments);
    return (D === "readable" || D === void 0) && ge.nextTick(X, this), L;
  };
  function X(D) {
    var L = D._readableState;
    L.readableListening = D.listenerCount("readable") > 0, L.resumeScheduled && !L.paused ? L.flowing = !0 : D.listenerCount("data") > 0 && D.resume();
  }
  function J(D) {
    w("readable nexttick read 0"), D.read(0);
  }
  K.prototype.resume = function() {
    var D = this._readableState;
    return D.flowing || (w("resume"), D.flowing = !D.readableListening, re(this, D)), D.paused = !1, this;
  };
  function re(D, L) {
    L.resumeScheduled || (L.resumeScheduled = !0, ge.nextTick(pe, D, L));
  }
  function pe(D, L) {
    w("resume", L.reading), L.reading || D.read(0), L.resumeScheduled = !1, D.emit("resume"), C(D), L.flowing && !L.reading && D.read(0);
  }
  K.prototype.pause = function() {
    return w("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (w("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function C(D) {
    var L = D._readableState;
    for (w("flow", L.flowing); L.flowing && D.read() !== null; ) ;
  }
  K.prototype.wrap = function(D) {
    var L = this, f = this._readableState, G = !1;
    D.on("end", function() {
      if (w("wrapped end"), f.decoder && !f.ended) {
        var l = f.decoder.end();
        l && l.length && L.push(l);
      }
      L.push(null);
    }), D.on("data", function(l) {
      w("wrapped data"), f.decoder && (l = f.decoder.write(l)), !(f.objectMode && l == null) && (!f.objectMode && (!l || !l.length) || L.push(l) || (G = !0, D.pause()));
    });
    for (var N in D) this[N] === void 0 && typeof D[N] == "function" && (this[N] = /* @__PURE__ */ (function(g) {
      return function() {
        return D[g].apply(D, arguments);
      };
    })(N));
    for (var o = 0; o < P.length; o++) D.on(P[o], this.emit.bind(this, P[o]));
    return this._read = function(l) {
      w("wrapped _read", l), G && (G = !1, D.resume());
    }, this;
  }, typeof Symbol == "function" && (K.prototype[Symbol.asyncIterator] = function() {
    return S === void 0 && (S = Ro()), S(this);
  }), Object.defineProperty(K.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(K.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(K.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(L) {
      this._readableState && (this._readableState.flowing = L);
    }
  }), K._fromList = p, Object.defineProperty(K.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function p(D, L) {
    if (L.length === 0) return null;
    var f;
    return L.objectMode ? f = L.buffer.shift() : !D || D >= L.length ? (L.decoder ? f = L.buffer.join("") : L.buffer.length === 1 ? f = L.buffer.first() : f = L.buffer.concat(L.length), L.buffer.clear()) : f = L.buffer.consume(D, L.decoder), f;
  }
  function W(D) {
    var L = D._readableState;
    w("endReadable", L.endEmitted), L.endEmitted || (L.ended = !0, ge.nextTick(U, L, D));
  }
  function U(D, L) {
    if (w("endReadableNT", D.endEmitted, D.length), !D.endEmitted && D.length === 0 && (D.endEmitted = !0, L.readable = !1, L.emit("end"), D.autoDestroy)) {
      var f = L._writableState;
      (!f || f.autoDestroy && f.finished) && L.destroy();
    }
  }
  typeof Symbol == "function" && (K.from = function(D, L) {
    return A === void 0 && (A = No()), A(K, D, L);
  });
  function ne(D, L) {
    for (var f = 0, G = D.length; f < G; f++) if (D[f] === L) return f;
    return -1;
  }
})), zi = /* @__PURE__ */ fe(((e, t) => {
  t.exports = h;
  var r = kt().codes, n = r.ERR_METHOD_NOT_IMPLEMENTED, a = r.ERR_MULTIPLE_CALLBACK, i = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = r.ERR_TRANSFORM_WITH_LENGTH_0, s = Et();
  lt()(h, s);
  function c(E, m) {
    var d = this._transformState;
    d.transforming = !1;
    var y = d.writecb;
    if (y === null) return this.emit("error", new a());
    d.writechunk = null, d.writecb = null, m != null && this.push(m), y(E);
    var _ = this._readableState;
    _.reading = !1, (_.needReadable || _.length < _.highWaterMark) && this._read(_.highWaterMark);
  }
  function h(E) {
    if (!(this instanceof h)) return new h(E);
    s.call(this, E), this._transformState = {
      afterTransform: c.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, E && (typeof E.transform == "function" && (this._transform = E.transform), typeof E.flush == "function" && (this._flush = E.flush)), this.on("prefinish", w);
  }
  function w() {
    var E = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(m, d) {
      v(E, m, d);
    }) : v(this, null, null);
  }
  h.prototype.push = function(E, m) {
    return this._transformState.needTransform = !1, s.prototype.push.call(this, E, m);
  }, h.prototype._transform = function(E, m, d) {
    d(new n("_transform()"));
  }, h.prototype._write = function(E, m, d) {
    var y = this._transformState;
    if (y.writecb = d, y.writechunk = E, y.writeencoding = m, !y.transforming) {
      var _ = this._readableState;
      (y.needTransform || _.needReadable || _.length < _.highWaterMark) && this._read(_.highWaterMark);
    }
  }, h.prototype._read = function(E) {
    var m = this._transformState;
    m.writechunk !== null && !m.transforming ? (m.transforming = !0, this._transform(m.writechunk, m.writeencoding, m.afterTransform)) : m.needTransform = !0;
  }, h.prototype._destroy = function(E, m) {
    s.prototype._destroy.call(this, E, function(d) {
      m(d);
    });
  };
  function v(E, m, d) {
    if (m) return E.emit("error", m);
    if (d != null && E.push(d), E._writableState.length) throw new u();
    if (E._transformState.transforming) throw new i();
    return E.push(null);
  }
})), Oo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = n;
  var r = zi();
  lt()(n, r);
  function n(a) {
    if (!(this instanceof n)) return new n(a);
    r.call(this, a);
  }
  n.prototype._transform = function(a, i, u) {
    u(null, a);
  };
})), Po = /* @__PURE__ */ fe(((e, t) => {
  var r;
  function n(d) {
    var y = !1;
    return function() {
      y || (y = !0, d.apply(void 0, arguments));
    };
  }
  var a = kt().codes, i = a.ERR_MISSING_ARGS, u = a.ERR_STREAM_DESTROYED;
  function s(d) {
    if (d) throw d;
  }
  function c(d) {
    return d.setHeader && typeof d.abort == "function";
  }
  function h(d, y, _, k) {
    k = n(k);
    var x = !1;
    d.on("close", function() {
      x = !0;
    }), r === void 0 && (r = yn()), r(d, {
      readable: y,
      writable: _
    }, function(S) {
      if (S) return k(S);
      x = !0, k();
    });
    var T = !1;
    return function(S) {
      if (!x && !T) {
        if (T = !0, c(d)) return d.abort();
        if (typeof d.destroy == "function") return d.destroy();
        k(S || new u("pipe"));
      }
    };
  }
  function w(d) {
    d();
  }
  function v(d, y) {
    return d.pipe(y);
  }
  function E(d) {
    return !d.length || typeof d[d.length - 1] != "function" ? s : d.pop();
  }
  function m() {
    for (var d = arguments.length, y = new Array(d), _ = 0; _ < d; _++) y[_] = arguments[_];
    var k = E(y);
    if (Array.isArray(y[0]) && (y = y[0]), y.length < 2) throw new i("streams");
    var x, T = y.map(function(S, A) {
      var b = A < y.length - 1;
      return h(S, b, A > 0, function(P) {
        x || (x = P), P && T.forEach(w), !b && (T.forEach(w), k(x));
      });
    });
    return y.reduce(v);
  }
  t.exports = m;
})), bn = /* @__PURE__ */ fe(((e, t) => {
  t.exports = n;
  var r = pn().EventEmitter;
  lt()(n, r), n.Readable = ji(), n.Writable = Wi(), n.Duplex = Et(), n.Transform = zi(), n.PassThrough = Oo(), n.finished = yn(), n.pipeline = Po(), n.Stream = n;
  function n() {
    r.call(this);
  }
  n.prototype.pipe = function(a, i) {
    var u = this;
    function s(d) {
      a.writable && a.write(d) === !1 && u.pause && u.pause();
    }
    u.on("data", s);
    function c() {
      u.readable && u.resume && u.resume();
    }
    a.on("drain", c), !a._isStdio && (!i || i.end !== !1) && (u.on("end", w), u.on("close", v));
    var h = !1;
    function w() {
      h || (h = !0, a.end());
    }
    function v() {
      h || (h = !0, typeof a.destroy == "function" && a.destroy());
    }
    function E(d) {
      if (m(), r.listenerCount(this, "error") === 0) throw d;
    }
    u.on("error", E), a.on("error", E);
    function m() {
      u.removeListener("data", s), a.removeListener("drain", c), u.removeListener("end", w), u.removeListener("close", v), u.removeListener("error", E), a.removeListener("error", E), u.removeListener("end", m), u.removeListener("close", m), a.removeListener("close", m);
    }
    return u.on("end", m), u.on("close", m), a.on("close", m), a.emit("pipe", u), a;
  };
})), Fo = /* @__PURE__ */ fe(((e) => {
  (function(t) {
    t.parser = function(C, p) {
      return new n(C, p);
    }, t.SAXParser = n, t.SAXStream = w, t.createStream = h, t.MAX_BUFFER_LENGTH = 65536;
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
    function n(C, p) {
      if (!(this instanceof n)) return new n(C, p);
      var W = this;
      i(W), W.q = W.c = "", W.bufferCheckPosition = t.MAX_BUFFER_LENGTH, W.opt = p || {}, W.opt.lowercase = W.opt.lowercase || W.opt.lowercasetags, W.looseCase = W.opt.lowercase ? "toLowerCase" : "toUpperCase", W.tags = [], W.closed = W.closedRoot = W.sawRoot = !1, W.tag = W.error = null, W.strict = !!C, W.noscript = !!(C || W.opt.noscript), W.state = R.BEGIN, W.strictEntities = W.opt.strictEntities, W.ENTITIES = W.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), W.attribList = [], W.opt.xmlns && (W.ns = Object.create(y)), W.trackPosition = W.opt.position !== !1, W.trackPosition && (W.position = W.line = W.column = 0), ee(W, "onready");
    }
    Object.create || (Object.create = function(C) {
      function p() {
      }
      return p.prototype = C, new p();
    }), Object.keys || (Object.keys = function(C) {
      var p = [];
      for (var W in C) C.hasOwnProperty(W) && p.push(W);
      return p;
    });
    function a(C) {
      for (var p = Math.max(t.MAX_BUFFER_LENGTH, 10), W = 0, U = 0, ne = r.length; U < ne; U++) {
        var D = C[r[U]].length;
        if (D > p) switch (r[U]) {
          case "textNode":
            z(C);
            break;
          case "cdata":
            O(C, "oncdata", C.cdata), C.cdata = "";
            break;
          case "script":
            O(C, "onscript", C.script), C.script = "";
            break;
          default:
            H(C, "Max buffer length exceeded: " + r[U]);
        }
        W = Math.max(W, D);
      }
      C.bufferCheckPosition = t.MAX_BUFFER_LENGTH - W + C.position;
    }
    function i(C) {
      for (var p = 0, W = r.length; p < W; p++) C[r[p]] = "";
    }
    function u(C) {
      z(C), C.cdata !== "" && (O(C, "oncdata", C.cdata), C.cdata = ""), C.script !== "" && (O(C, "onscript", C.script), C.script = "");
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
      s = bn().Stream;
    } catch {
      s = function() {
      };
    }
    var c = t.EVENTS.filter(function(C) {
      return C !== "error" && C !== "end";
    });
    function h(C, p) {
      return new w(C, p);
    }
    function w(C, p) {
      if (!(this instanceof w)) return new w(C, p);
      s.apply(this), this._parser = new n(C, p), this.writable = !0, this.readable = !0;
      var W = this;
      this._parser.onend = function() {
        W.emit("end");
      }, this._parser.onerror = function(U) {
        W.emit("error", U), W._parser.error = null;
      }, this._decoder = null, c.forEach(function(U) {
        Object.defineProperty(W, "on" + U, {
          get: function() {
            return W._parser["on" + U];
          },
          set: function(ne) {
            if (!ne)
              return W.removeAllListeners(U), W._parser["on" + U] = ne, ne;
            W.on(U, ne);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    w.prototype = Object.create(s.prototype, { constructor: { value: w } }), w.prototype.write = function(C) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(C)) {
        if (!this._decoder) {
          var p = an().StringDecoder;
          this._decoder = new p("utf8");
        }
        C = this._decoder.write(C);
      }
      return this._parser.write(C.toString()), this.emit("data", C), !0;
    }, w.prototype.end = function(C) {
      return C && C.length && this.write(C), this._parser.end(), !0;
    }, w.prototype.on = function(C, p) {
      var W = this;
      return !W._parser["on" + C] && c.indexOf(C) !== -1 && (W._parser["on" + C] = function() {
        var U = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        U.splice(0, 0, C), W.emit.apply(W, U);
      }), s.prototype.on.call(W, C, p);
    };
    var v = "[CDATA[", E = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", d = "http://www.w3.org/2000/xmlns/", y = {
      xml: m,
      xmlns: d
    }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, k = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function S(C) {
      return C === " " || C === `
` || C === "\r" || C === "	";
    }
    function A(C) {
      return C === '"' || C === "'";
    }
    function b(C) {
      return C === ">" || S(C);
    }
    function P(C, p) {
      return C.test(p);
    }
    function M(C, p) {
      return !P(C, p);
    }
    var R = 0;
    t.STATE = {
      BEGIN: R++,
      BEGIN_WHITESPACE: R++,
      TEXT: R++,
      TEXT_ENTITY: R++,
      OPEN_WAKA: R++,
      SGML_DECL: R++,
      SGML_DECL_QUOTED: R++,
      DOCTYPE: R++,
      DOCTYPE_QUOTED: R++,
      DOCTYPE_DTD: R++,
      DOCTYPE_DTD_QUOTED: R++,
      COMMENT_STARTING: R++,
      COMMENT: R++,
      COMMENT_ENDING: R++,
      COMMENT_ENDED: R++,
      CDATA: R++,
      CDATA_ENDING: R++,
      CDATA_ENDING_2: R++,
      PROC_INST: R++,
      PROC_INST_BODY: R++,
      PROC_INST_ENDING: R++,
      OPEN_TAG: R++,
      OPEN_TAG_SLASH: R++,
      ATTRIB: R++,
      ATTRIB_NAME: R++,
      ATTRIB_NAME_SAW_WHITE: R++,
      ATTRIB_VALUE: R++,
      ATTRIB_VALUE_QUOTED: R++,
      ATTRIB_VALUE_CLOSED: R++,
      ATTRIB_VALUE_UNQUOTED: R++,
      ATTRIB_VALUE_ENTITY_Q: R++,
      ATTRIB_VALUE_ENTITY_U: R++,
      CLOSE_TAG: R++,
      CLOSE_TAG_SAW_WHITE: R++,
      SCRIPT: R++,
      SCRIPT_ENDING: R++
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
    }, Object.keys(t.ENTITIES).forEach(function(C) {
      var p = t.ENTITIES[C], W = typeof p == "number" ? String.fromCharCode(p) : p;
      t.ENTITIES[C] = W;
    });
    for (var K in t.STATE) t.STATE[t.STATE[K]] = K;
    R = t.STATE;
    function ee(C, p, W) {
      C[p] && C[p](W);
    }
    function O(C, p, W) {
      C.textNode && z(C), ee(C, p, W);
    }
    function z(C) {
      C.textNode = I(C.opt, C.textNode), C.textNode && ee(C, "ontext", C.textNode), C.textNode = "";
    }
    function I(C, p) {
      return C.trim && (p = p.trim()), C.normalize && (p = p.replace(/\s+/g, " ")), p;
    }
    function H(C, p) {
      return z(C), C.trackPosition && (p += `
Line: ` + C.line + `
Column: ` + C.column + `
Char: ` + C.c), p = new Error(p), C.error = p, ee(C, "onerror", p), C;
    }
    function Q(C) {
      return C.sawRoot && !C.closedRoot && q(C, "Unclosed root tag"), C.state !== R.BEGIN && C.state !== R.BEGIN_WHITESPACE && C.state !== R.TEXT && H(C, "Unexpected end"), z(C), C.c = "", C.closed = !0, ee(C, "onend"), n.call(C, C.strict, C.opt), C;
    }
    function q(C, p) {
      if (typeof C != "object" || !(C instanceof n)) throw new Error("bad call to strictFail");
      C.strict && H(C, p);
    }
    function le(C) {
      C.strict || (C.tagName = C.tagName[C.looseCase]());
      var p = C.tags[C.tags.length - 1] || C, W = C.tag = {
        name: C.tagName,
        attributes: {}
      };
      C.opt.xmlns && (W.ns = p.ns), C.attribList.length = 0, O(C, "onopentagstart", W);
    }
    function Y(C, p) {
      var W = C.indexOf(":") < 0 ? ["", C] : C.split(":"), U = W[0], ne = W[1];
      return p && C === "xmlns" && (U = "xmlns", ne = ""), {
        prefix: U,
        local: ne
      };
    }
    function te(C) {
      if (C.strict || (C.attribName = C.attribName[C.looseCase]()), C.attribList.indexOf(C.attribName) !== -1 || C.tag.attributes.hasOwnProperty(C.attribName)) {
        C.attribName = C.attribValue = "";
        return;
      }
      if (C.opt.xmlns) {
        var p = Y(C.attribName, !0), W = p.prefix, U = p.local;
        if (W === "xmlns")
          if (U === "xml" && C.attribValue !== m) q(C, "xml: prefix must be bound to " + m + `
Actual: ` + C.attribValue);
          else if (U === "xmlns" && C.attribValue !== d) q(C, "xmlns: prefix must be bound to " + d + `
Actual: ` + C.attribValue);
          else {
            var ne = C.tag, D = C.tags[C.tags.length - 1] || C;
            ne.ns === D.ns && (ne.ns = Object.create(D.ns)), ne.ns[U] = C.attribValue;
          }
        C.attribList.push([C.attribName, C.attribValue]);
      } else
        C.tag.attributes[C.attribName] = C.attribValue, O(C, "onattribute", {
          name: C.attribName,
          value: C.attribValue
        });
      C.attribName = C.attribValue = "";
    }
    function V(C, p) {
      if (C.opt.xmlns) {
        var W = C.tag, U = Y(C.tagName);
        W.prefix = U.prefix, W.local = U.local, W.uri = W.ns[U.prefix] || "", W.prefix && !W.uri && (q(C, "Unbound namespace prefix: " + JSON.stringify(C.tagName)), W.uri = U.prefix);
        var ne = C.tags[C.tags.length - 1] || C;
        W.ns && ne.ns !== W.ns && Object.keys(W.ns).forEach(function(j) {
          O(C, "onopennamespace", {
            prefix: j,
            uri: W.ns[j]
          });
        });
        for (var D = 0, L = C.attribList.length; D < L; D++) {
          var f = C.attribList[D], G = f[0], N = f[1], o = Y(G, !0), l = o.prefix, g = o.local, B = l === "" ? "" : W.ns[l] || "", $ = {
            name: G,
            value: N,
            prefix: l,
            local: g,
            uri: B
          };
          l && l !== "xmlns" && !B && (q(C, "Unbound namespace prefix: " + JSON.stringify(l)), $.uri = l), C.tag.attributes[G] = $, O(C, "onattribute", $);
        }
        C.attribList.length = 0;
      }
      C.tag.isSelfClosing = !!p, C.sawRoot = !0, C.tags.push(C.tag), O(C, "onopentag", C.tag), p || (!C.noscript && C.tagName.toLowerCase() === "script" ? C.state = R.SCRIPT : C.state = R.TEXT, C.tag = null, C.tagName = ""), C.attribName = C.attribValue = "", C.attribList.length = 0;
    }
    function F(C) {
      if (!C.tagName) {
        q(C, "Weird empty close tag."), C.textNode += "</>", C.state = R.TEXT;
        return;
      }
      if (C.script) {
        if (C.tagName !== "script") {
          C.script += "</" + C.tagName + ">", C.tagName = "", C.state = R.SCRIPT;
          return;
        }
        O(C, "onscript", C.script), C.script = "";
      }
      var p = C.tags.length, W = C.tagName;
      C.strict || (W = W[C.looseCase]());
      for (var U = W; p-- && C.tags[p].name !== U; ) q(C, "Unexpected close tag");
      if (p < 0) {
        q(C, "Unmatched closing tag: " + C.tagName), C.textNode += "</" + C.tagName + ">", C.state = R.TEXT;
        return;
      }
      C.tagName = W;
      for (var ne = C.tags.length; ne-- > p; ) {
        var D = C.tag = C.tags.pop();
        C.tagName = C.tag.name, O(C, "onclosetag", C.tagName);
        var L = {};
        for (var f in D.ns) L[f] = D.ns[f];
        var G = C.tags[C.tags.length - 1] || C;
        C.opt.xmlns && D.ns !== G.ns && Object.keys(D.ns).forEach(function(N) {
          var o = D.ns[N];
          O(C, "onclosenamespace", {
            prefix: N,
            uri: o
          });
        });
      }
      p === 0 && (C.closedRoot = !0), C.tagName = C.attribValue = C.attribName = "", C.attribList.length = 0, C.state = R.TEXT;
    }
    function X(C) {
      var p = C.entity, W = p.toLowerCase(), U, ne = "";
      return C.ENTITIES[p] ? C.ENTITIES[p] : C.ENTITIES[W] ? C.ENTITIES[W] : (p = W, p.charAt(0) === "#" && (p.charAt(1) === "x" ? (p = p.slice(2), U = parseInt(p, 16), ne = U.toString(16)) : (p = p.slice(1), U = parseInt(p, 10), ne = U.toString(10))), p = p.replace(/^0+/, ""), isNaN(U) || ne.toLowerCase() !== p ? (q(C, "Invalid character entity"), "&" + C.entity + ";") : String.fromCodePoint(U));
    }
    function J(C, p) {
      p === "<" ? (C.state = R.OPEN_WAKA, C.startTagPosition = C.position) : S(p) || (q(C, "Non-whitespace before first tag."), C.textNode = p, C.state = R.TEXT);
    }
    function re(C, p) {
      var W = "";
      return p < C.length && (W = C.charAt(p)), W;
    }
    function pe(C) {
      var p = this;
      if (this.error) throw this.error;
      if (p.closed) return H(p, "Cannot write after close. Assign an onready handler.");
      if (C === null) return Q(p);
      typeof C == "object" && (C = C.toString());
      for (var W = 0, U = ""; U = re(C, W++), p.c = U, !!U; )
        switch (p.trackPosition && (p.position++, U === `
` ? (p.line++, p.column = 0) : p.column++), p.state) {
          case R.BEGIN:
            if (p.state = R.BEGIN_WHITESPACE, U === "\uFEFF") continue;
            J(p, U);
            continue;
          case R.BEGIN_WHITESPACE:
            J(p, U);
            continue;
          case R.TEXT:
            if (p.sawRoot && !p.closedRoot) {
              for (var ne = W - 1; U && U !== "<" && U !== "&"; )
                U = re(C, W++), U && p.trackPosition && (p.position++, U === `
` ? (p.line++, p.column = 0) : p.column++);
              p.textNode += C.substring(ne, W - 1);
            }
            U === "<" && !(p.sawRoot && p.closedRoot && !p.strict) ? (p.state = R.OPEN_WAKA, p.startTagPosition = p.position) : (!S(U) && (!p.sawRoot || p.closedRoot) && q(p, "Text data outside of root node."), U === "&" ? p.state = R.TEXT_ENTITY : p.textNode += U);
            continue;
          case R.SCRIPT:
            U === "<" ? p.state = R.SCRIPT_ENDING : p.script += U;
            continue;
          case R.SCRIPT_ENDING:
            U === "/" ? p.state = R.CLOSE_TAG : (p.script += "<" + U, p.state = R.SCRIPT);
            continue;
          case R.OPEN_WAKA:
            if (U === "!")
              p.state = R.SGML_DECL, p.sgmlDecl = "";
            else if (!S(U)) if (P(_, U))
              p.state = R.OPEN_TAG, p.tagName = U;
            else if (U === "/")
              p.state = R.CLOSE_TAG, p.tagName = "";
            else if (U === "?")
              p.state = R.PROC_INST, p.procInstName = p.procInstBody = "";
            else {
              if (q(p, "Unencoded <"), p.startTagPosition + 1 < p.position) {
                var D = p.position - p.startTagPosition;
                U = new Array(D).join(" ") + U;
              }
              p.textNode += "<" + U, p.state = R.TEXT;
            }
            continue;
          case R.SGML_DECL:
            (p.sgmlDecl + U).toUpperCase() === v ? (O(p, "onopencdata"), p.state = R.CDATA, p.sgmlDecl = "", p.cdata = "") : p.sgmlDecl + U === "--" ? (p.state = R.COMMENT, p.comment = "", p.sgmlDecl = "") : (p.sgmlDecl + U).toUpperCase() === E ? (p.state = R.DOCTYPE, (p.doctype || p.sawRoot) && q(p, "Inappropriately located doctype declaration"), p.doctype = "", p.sgmlDecl = "") : U === ">" ? (O(p, "onsgmldeclaration", p.sgmlDecl), p.sgmlDecl = "", p.state = R.TEXT) : (A(U) && (p.state = R.SGML_DECL_QUOTED), p.sgmlDecl += U);
            continue;
          case R.SGML_DECL_QUOTED:
            U === p.q && (p.state = R.SGML_DECL, p.q = ""), p.sgmlDecl += U;
            continue;
          case R.DOCTYPE:
            U === ">" ? (p.state = R.TEXT, O(p, "ondoctype", p.doctype), p.doctype = !0) : (p.doctype += U, U === "[" ? p.state = R.DOCTYPE_DTD : A(U) && (p.state = R.DOCTYPE_QUOTED, p.q = U));
            continue;
          case R.DOCTYPE_QUOTED:
            p.doctype += U, U === p.q && (p.q = "", p.state = R.DOCTYPE);
            continue;
          case R.DOCTYPE_DTD:
            p.doctype += U, U === "]" ? p.state = R.DOCTYPE : A(U) && (p.state = R.DOCTYPE_DTD_QUOTED, p.q = U);
            continue;
          case R.DOCTYPE_DTD_QUOTED:
            p.doctype += U, U === p.q && (p.state = R.DOCTYPE_DTD, p.q = "");
            continue;
          case R.COMMENT:
            U === "-" ? p.state = R.COMMENT_ENDING : p.comment += U;
            continue;
          case R.COMMENT_ENDING:
            U === "-" ? (p.state = R.COMMENT_ENDED, p.comment = I(p.opt, p.comment), p.comment && O(p, "oncomment", p.comment), p.comment = "") : (p.comment += "-" + U, p.state = R.COMMENT);
            continue;
          case R.COMMENT_ENDED:
            U !== ">" ? (q(p, "Malformed comment"), p.comment += "--" + U, p.state = R.COMMENT) : p.state = R.TEXT;
            continue;
          case R.CDATA:
            U === "]" ? p.state = R.CDATA_ENDING : p.cdata += U;
            continue;
          case R.CDATA_ENDING:
            U === "]" ? p.state = R.CDATA_ENDING_2 : (p.cdata += "]" + U, p.state = R.CDATA);
            continue;
          case R.CDATA_ENDING_2:
            U === ">" ? (p.cdata && O(p, "oncdata", p.cdata), O(p, "onclosecdata"), p.cdata = "", p.state = R.TEXT) : U === "]" ? p.cdata += "]" : (p.cdata += "]]" + U, p.state = R.CDATA);
            continue;
          case R.PROC_INST:
            U === "?" ? p.state = R.PROC_INST_ENDING : S(U) ? p.state = R.PROC_INST_BODY : p.procInstName += U;
            continue;
          case R.PROC_INST_BODY:
            if (!p.procInstBody && S(U)) continue;
            U === "?" ? p.state = R.PROC_INST_ENDING : p.procInstBody += U;
            continue;
          case R.PROC_INST_ENDING:
            U === ">" ? (O(p, "onprocessinginstruction", {
              name: p.procInstName,
              body: p.procInstBody
            }), p.procInstName = p.procInstBody = "", p.state = R.TEXT) : (p.procInstBody += "?" + U, p.state = R.PROC_INST_BODY);
            continue;
          case R.OPEN_TAG:
            P(k, U) ? p.tagName += U : (le(p), U === ">" ? V(p) : U === "/" ? p.state = R.OPEN_TAG_SLASH : (S(U) || q(p, "Invalid character in tag name"), p.state = R.ATTRIB));
            continue;
          case R.OPEN_TAG_SLASH:
            U === ">" ? (V(p, !0), F(p)) : (q(p, "Forward-slash in opening tag not followed by >"), p.state = R.ATTRIB);
            continue;
          case R.ATTRIB:
            if (S(U)) continue;
            U === ">" ? V(p) : U === "/" ? p.state = R.OPEN_TAG_SLASH : P(_, U) ? (p.attribName = U, p.attribValue = "", p.state = R.ATTRIB_NAME) : q(p, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME:
            U === "=" ? p.state = R.ATTRIB_VALUE : U === ">" ? (q(p, "Attribute without value"), p.attribValue = p.attribName, te(p), V(p)) : S(U) ? p.state = R.ATTRIB_NAME_SAW_WHITE : P(k, U) ? p.attribName += U : q(p, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME_SAW_WHITE:
            if (U === "=") p.state = R.ATTRIB_VALUE;
            else {
              if (S(U)) continue;
              q(p, "Attribute without value"), p.tag.attributes[p.attribName] = "", p.attribValue = "", O(p, "onattribute", {
                name: p.attribName,
                value: ""
              }), p.attribName = "", U === ">" ? V(p) : P(_, U) ? (p.attribName = U, p.state = R.ATTRIB_NAME) : (q(p, "Invalid attribute name"), p.state = R.ATTRIB);
            }
            continue;
          case R.ATTRIB_VALUE:
            if (S(U)) continue;
            A(U) ? (p.q = U, p.state = R.ATTRIB_VALUE_QUOTED) : (q(p, "Unquoted attribute value"), p.state = R.ATTRIB_VALUE_UNQUOTED, p.attribValue = U);
            continue;
          case R.ATTRIB_VALUE_QUOTED:
            if (U !== p.q) {
              U === "&" ? p.state = R.ATTRIB_VALUE_ENTITY_Q : p.attribValue += U;
              continue;
            }
            te(p), p.q = "", p.state = R.ATTRIB_VALUE_CLOSED;
            continue;
          case R.ATTRIB_VALUE_CLOSED:
            S(U) ? p.state = R.ATTRIB : U === ">" ? V(p) : U === "/" ? p.state = R.OPEN_TAG_SLASH : P(_, U) ? (q(p, "No whitespace between attributes"), p.attribName = U, p.attribValue = "", p.state = R.ATTRIB_NAME) : q(p, "Invalid attribute name");
            continue;
          case R.ATTRIB_VALUE_UNQUOTED:
            if (!b(U)) {
              U === "&" ? p.state = R.ATTRIB_VALUE_ENTITY_U : p.attribValue += U;
              continue;
            }
            te(p), U === ">" ? V(p) : p.state = R.ATTRIB;
            continue;
          case R.CLOSE_TAG:
            if (p.tagName)
              U === ">" ? F(p) : P(k, U) ? p.tagName += U : p.script ? (p.script += "</" + p.tagName, p.tagName = "", p.state = R.SCRIPT) : (S(U) || q(p, "Invalid tagname in closing tag"), p.state = R.CLOSE_TAG_SAW_WHITE);
            else {
              if (S(U)) continue;
              M(_, U) ? p.script ? (p.script += "</" + U, p.state = R.SCRIPT) : q(p, "Invalid tagname in closing tag.") : p.tagName = U;
            }
            continue;
          case R.CLOSE_TAG_SAW_WHITE:
            if (S(U)) continue;
            U === ">" ? F(p) : q(p, "Invalid characters in closing tag");
            continue;
          case R.TEXT_ENTITY:
          case R.ATTRIB_VALUE_ENTITY_Q:
          case R.ATTRIB_VALUE_ENTITY_U:
            var L, f;
            switch (p.state) {
              case R.TEXT_ENTITY:
                L = R.TEXT, f = "textNode";
                break;
              case R.ATTRIB_VALUE_ENTITY_Q:
                L = R.ATTRIB_VALUE_QUOTED, f = "attribValue";
                break;
              case R.ATTRIB_VALUE_ENTITY_U:
                L = R.ATTRIB_VALUE_UNQUOTED, f = "attribValue";
            }
            U === ";" ? (p[f] += X(p), p.entity = "", p.state = L) : P(p.entity.length ? T : x, U) ? p.entity += U : (q(p, "Invalid character in entity name"), p[f] += "&" + p.entity + U, p.entity = "", p.state = L);
            continue;
          default:
            throw new Error(p, "Unknown state: " + p.state);
        }
      return p.position >= p.bufferCheckPosition && a(p), p;
    }
    String.fromCodePoint || (function() {
      var C = String.fromCharCode, p = Math.floor, W = function() {
        var U = 16384, ne = [], D, L, f = -1, G = arguments.length;
        if (!G) return "";
        for (var N = ""; ++f < G; ) {
          var o = Number(arguments[f]);
          if (!isFinite(o) || o < 0 || o > 1114111 || p(o) !== o) throw RangeError("Invalid code point: " + o);
          o <= 65535 ? ne.push(o) : (o -= 65536, D = (o >> 10) + 55296, L = o % 1024 + 56320, ne.push(D, L)), (f + 1 === G || ne.length > U) && (N += C.apply(null, ne), ne.length = 0);
        }
        return N;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: W,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = W;
    })();
  })(typeof e > "u" ? e.sax = {} : e);
})), _n = /* @__PURE__ */ fe(((e, t) => {
  t.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), xn = /* @__PURE__ */ fe(((e, t) => {
  var r = _n().isArray;
  t.exports = {
    copyOptions: function(n) {
      var a, i = {};
      for (a in n) n.hasOwnProperty(a) && (i[a] = n[a]);
      return i;
    },
    ensureFlagExists: function(n, a) {
      (!(n in a) || typeof a[n] != "boolean") && (a[n] = !1);
    },
    ensureSpacesExists: function(n) {
      (!("spaces" in n) || typeof n.spaces != "number" && typeof n.spaces != "string") && (n.spaces = 0);
    },
    ensureAlwaysArrayExists: function(n) {
      (!("alwaysArray" in n) || typeof n.alwaysArray != "boolean" && !r(n.alwaysArray)) && (n.alwaysArray = !1);
    },
    ensureKeyExists: function(n, a) {
      (!(n + "Key" in a) || typeof a[n + "Key"] != "string") && (a[n + "Key"] = a.compact ? "_" + n : n);
    },
    checkFnExists: function(n, a) {
      return n + "Fn" in a;
    }
  };
})), Hi = /* @__PURE__ */ fe(((e, t) => {
  var r = Fo(), n = xn(), a = _n().isArray, i, u;
  function s(T) {
    return i = n.copyOptions(T), n.ensureFlagExists("ignoreDeclaration", i), n.ensureFlagExists("ignoreInstruction", i), n.ensureFlagExists("ignoreAttributes", i), n.ensureFlagExists("ignoreText", i), n.ensureFlagExists("ignoreComment", i), n.ensureFlagExists("ignoreCdata", i), n.ensureFlagExists("ignoreDoctype", i), n.ensureFlagExists("compact", i), n.ensureFlagExists("alwaysChildren", i), n.ensureFlagExists("addParent", i), n.ensureFlagExists("trim", i), n.ensureFlagExists("nativeType", i), n.ensureFlagExists("nativeTypeAttributes", i), n.ensureFlagExists("sanitize", i), n.ensureFlagExists("instructionHasAttributes", i), n.ensureFlagExists("captureSpacesBetweenElements", i), n.ensureAlwaysArrayExists(i), n.ensureKeyExists("declaration", i), n.ensureKeyExists("instruction", i), n.ensureKeyExists("attributes", i), n.ensureKeyExists("text", i), n.ensureKeyExists("comment", i), n.ensureKeyExists("cdata", i), n.ensureKeyExists("doctype", i), n.ensureKeyExists("type", i), n.ensureKeyExists("name", i), n.ensureKeyExists("elements", i), n.ensureKeyExists("parent", i), n.checkFnExists("doctype", i), n.checkFnExists("instruction", i), n.checkFnExists("cdata", i), n.checkFnExists("comment", i), n.checkFnExists("text", i), n.checkFnExists("instructionName", i), n.checkFnExists("elementName", i), n.checkFnExists("attributeName", i), n.checkFnExists("attributeValue", i), n.checkFnExists("attributes", i), i;
  }
  function c(T) {
    var S = Number(T);
    if (!isNaN(S)) return S;
    var A = T.toLowerCase();
    return A === "true" ? !0 : A === "false" ? !1 : T;
  }
  function h(T, S) {
    var A;
    if (i.compact) {
      if (!u[i[T + "Key"]] && (a(i.alwaysArray) ? i.alwaysArray.indexOf(i[T + "Key"]) !== -1 : i.alwaysArray) && (u[i[T + "Key"]] = []), u[i[T + "Key"]] && !a(u[i[T + "Key"]]) && (u[i[T + "Key"]] = [u[i[T + "Key"]]]), T + "Fn" in i && typeof S == "string" && (S = i[T + "Fn"](S, u)), T === "instruction" && ("instructionFn" in i || "instructionNameFn" in i)) {
        for (A in S) if (S.hasOwnProperty(A))
          if ("instructionFn" in i) S[A] = i.instructionFn(S[A], A, u);
          else {
            var b = S[A];
            delete S[A], S[i.instructionNameFn(A, b, u)] = b;
          }
      }
      a(u[i[T + "Key"]]) ? u[i[T + "Key"]].push(S) : u[i[T + "Key"]] = S;
    } else {
      u[i.elementsKey] || (u[i.elementsKey] = []);
      var P = {};
      if (P[i.typeKey] = T, T === "instruction") {
        for (A in S) if (S.hasOwnProperty(A)) break;
        P[i.nameKey] = "instructionNameFn" in i ? i.instructionNameFn(A, S, u) : A, i.instructionHasAttributes ? (P[i.attributesKey] = S[A][i.attributesKey], "instructionFn" in i && (P[i.attributesKey] = i.instructionFn(P[i.attributesKey], A, u))) : ("instructionFn" in i && (S[A] = i.instructionFn(S[A], A, u)), P[i.instructionKey] = S[A]);
      } else
        T + "Fn" in i && (S = i[T + "Fn"](S, u)), P[i[T + "Key"]] = S;
      i.addParent && (P[i.parentKey] = u), u[i.elementsKey].push(P);
    }
  }
  function w(T) {
    if ("attributesFn" in i && T && (T = i.attributesFn(T, u)), (i.trim || "attributeValueFn" in i || "attributeNameFn" in i || i.nativeTypeAttributes) && T) {
      var S;
      for (S in T) if (T.hasOwnProperty(S) && (i.trim && (T[S] = T[S].trim()), i.nativeTypeAttributes && (T[S] = c(T[S])), "attributeValueFn" in i && (T[S] = i.attributeValueFn(T[S], S, u)), "attributeNameFn" in i)) {
        var A = T[S];
        delete T[S], T[i.attributeNameFn(S, T[S], u)] = A;
      }
    }
    return T;
  }
  function v(T) {
    var S = {};
    if (T.body && (T.name.toLowerCase() === "xml" || i.instructionHasAttributes)) {
      for (var A = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, b; (b = A.exec(T.body)) !== null; ) S[b[1]] = b[2] || b[3] || b[4];
      S = w(S);
    }
    if (T.name.toLowerCase() === "xml") {
      if (i.ignoreDeclaration) return;
      u[i.declarationKey] = {}, Object.keys(S).length && (u[i.declarationKey][i.attributesKey] = S), i.addParent && (u[i.declarationKey][i.parentKey] = u);
    } else {
      if (i.ignoreInstruction) return;
      i.trim && (T.body = T.body.trim());
      var P = {};
      i.instructionHasAttributes && Object.keys(S).length ? (P[T.name] = {}, P[T.name][i.attributesKey] = S) : P[T.name] = T.body, h("instruction", P);
    }
  }
  function E(T, S) {
    var A;
    if (typeof T == "object" && (S = T.attributes, T = T.name), S = w(S), "elementNameFn" in i && (T = i.elementNameFn(T, u)), i.compact) {
      if (A = {}, !i.ignoreAttributes && S && Object.keys(S).length) {
        A[i.attributesKey] = {};
        var b;
        for (b in S) S.hasOwnProperty(b) && (A[i.attributesKey][b] = S[b]);
      }
      !(T in u) && (a(i.alwaysArray) ? i.alwaysArray.indexOf(T) !== -1 : i.alwaysArray) && (u[T] = []), u[T] && !a(u[T]) && (u[T] = [u[T]]), a(u[T]) ? u[T].push(A) : u[T] = A;
    } else
      u[i.elementsKey] || (u[i.elementsKey] = []), A = {}, A[i.typeKey] = "element", A[i.nameKey] = T, !i.ignoreAttributes && S && Object.keys(S).length && (A[i.attributesKey] = S), i.alwaysChildren && (A[i.elementsKey] = []), u[i.elementsKey].push(A);
    A[i.parentKey] = u, u = A;
  }
  function m(T) {
    i.ignoreText || !T.trim() && !i.captureSpacesBetweenElements || (i.trim && (T = T.trim()), i.nativeType && (T = c(T)), i.sanitize && (T = T.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), h("text", T));
  }
  function d(T) {
    i.ignoreComment || (i.trim && (T = T.trim()), h("comment", T));
  }
  function y(T) {
    var S = u[i.parentKey];
    i.addParent || delete u[i.parentKey], u = S;
  }
  function _(T) {
    i.ignoreCdata || (i.trim && (T = T.trim()), h("cdata", T));
  }
  function k(T) {
    i.ignoreDoctype || (T = T.replace(/^ /, ""), i.trim && (T = T.trim()), h("doctype", T));
  }
  function x(T) {
    T.note = T;
  }
  t.exports = function(T, S) {
    var A = r.parser(!0, {}), b = {};
    if (u = b, i = s(S), A.opt = { strictEntities: !0 }, A.onopentag = E, A.ontext = m, A.oncomment = d, A.onclosetag = y, A.onerror = x, A.oncdata = _, A.ondoctype = k, A.onprocessinginstruction = v, A.write(T).close(), b[i.elementsKey]) {
      var P = b[i.elementsKey];
      delete b[i.elementsKey], b[i.elementsKey] = P, delete b.text;
    }
    return b;
  };
})), Do = /* @__PURE__ */ fe(((e, t) => {
  var r = xn(), n = Hi();
  function a(i) {
    var u = r.copyOptions(i);
    return r.ensureSpacesExists(u), u;
  }
  t.exports = function(i, u) {
    var s = a(u), c = n(i, s), h, w = "compact" in s && s.compact ? "_parent" : "parent";
    return "addParent" in s && s.addParent ? h = JSON.stringify(c, function(v, E) {
      return v === w ? "_" : E;
    }, s.spaces) : h = JSON.stringify(c, null, s.spaces), h.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), $i = /* @__PURE__ */ fe(((e, t) => {
  var r = xn(), n = _n().isArray, a, i;
  function u(A) {
    var b = r.copyOptions(A);
    return r.ensureFlagExists("ignoreDeclaration", b), r.ensureFlagExists("ignoreInstruction", b), r.ensureFlagExists("ignoreAttributes", b), r.ensureFlagExists("ignoreText", b), r.ensureFlagExists("ignoreComment", b), r.ensureFlagExists("ignoreCdata", b), r.ensureFlagExists("ignoreDoctype", b), r.ensureFlagExists("compact", b), r.ensureFlagExists("indentText", b), r.ensureFlagExists("indentCdata", b), r.ensureFlagExists("indentAttributes", b), r.ensureFlagExists("indentInstruction", b), r.ensureFlagExists("fullTagEmptyElement", b), r.ensureFlagExists("noQuotesForNativeAttributes", b), r.ensureSpacesExists(b), typeof b.spaces == "number" && (b.spaces = Array(b.spaces + 1).join(" ")), r.ensureKeyExists("declaration", b), r.ensureKeyExists("instruction", b), r.ensureKeyExists("attributes", b), r.ensureKeyExists("text", b), r.ensureKeyExists("comment", b), r.ensureKeyExists("cdata", b), r.ensureKeyExists("doctype", b), r.ensureKeyExists("type", b), r.ensureKeyExists("name", b), r.ensureKeyExists("elements", b), r.checkFnExists("doctype", b), r.checkFnExists("instruction", b), r.checkFnExists("cdata", b), r.checkFnExists("comment", b), r.checkFnExists("text", b), r.checkFnExists("instructionName", b), r.checkFnExists("elementName", b), r.checkFnExists("attributeName", b), r.checkFnExists("attributeValue", b), r.checkFnExists("attributes", b), r.checkFnExists("fullTagEmptyElement", b), b;
  }
  function s(A, b, P) {
    return (!P && A.spaces ? `
` : "") + Array(b + 1).join(A.spaces);
  }
  function c(A, b, P) {
    if (b.ignoreAttributes) return "";
    "attributesFn" in b && (A = b.attributesFn(A, i, a));
    var M, R, K, ee, O = [];
    for (M in A) A.hasOwnProperty(M) && A[M] !== null && A[M] !== void 0 && (ee = b.noQuotesForNativeAttributes && typeof A[M] != "string" ? "" : '"', R = "" + A[M], R = R.replace(/"/g, "&quot;"), K = "attributeNameFn" in b ? b.attributeNameFn(M, R, i, a) : M, O.push(b.spaces && b.indentAttributes ? s(b, P + 1, !1) : " "), O.push(K + "=" + ee + ("attributeValueFn" in b ? b.attributeValueFn(R, M, i, a) : R) + ee));
    return A && Object.keys(A).length && b.spaces && b.indentAttributes && O.push(s(b, P, !1)), O.join("");
  }
  function h(A, b, P) {
    return a = A, i = "xml", b.ignoreDeclaration ? "" : "<?xml" + c(A[b.attributesKey], b, P) + "?>";
  }
  function w(A, b, P) {
    if (b.ignoreInstruction) return "";
    var M;
    for (M in A) if (A.hasOwnProperty(M)) break;
    var R = "instructionNameFn" in b ? b.instructionNameFn(M, A[M], i, a) : M;
    if (typeof A[M] == "object")
      return a = A, i = R, "<?" + R + c(A[M][b.attributesKey], b, P) + "?>";
    var K = A[M] ? A[M] : "";
    return "instructionFn" in b && (K = b.instructionFn(K, M, i, a)), "<?" + R + (K ? " " + K : "") + "?>";
  }
  function v(A, b) {
    return b.ignoreComment ? "" : "<!--" + ("commentFn" in b ? b.commentFn(A, i, a) : A) + "-->";
  }
  function E(A, b) {
    return b.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in b ? b.cdataFn(A, i, a) : A.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function m(A, b) {
    return b.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in b ? b.doctypeFn(A, i, a) : A) + ">";
  }
  function d(A, b) {
    return b.ignoreText ? "" : (A = "" + A, A = A.replace(/&amp;/g, "&"), A = A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in b ? b.textFn(A, i, a) : A);
  }
  function y(A, b) {
    var P;
    if (A.elements && A.elements.length) for (P = 0; P < A.elements.length; ++P) switch (A.elements[P][b.typeKey]) {
      case "text":
        if (b.indentText) return !0;
        break;
      case "cdata":
        if (b.indentCdata) return !0;
        break;
      case "instruction":
        if (b.indentInstruction) return !0;
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
  function _(A, b, P) {
    a = A, i = A.name;
    var M = [], R = "elementNameFn" in b ? b.elementNameFn(A.name, A) : A.name;
    M.push("<" + R), A[b.attributesKey] && M.push(c(A[b.attributesKey], b, P));
    var K = A[b.elementsKey] && A[b.elementsKey].length || A[b.attributesKey] && A[b.attributesKey]["xml:space"] === "preserve";
    return K || ("fullTagEmptyElementFn" in b ? K = b.fullTagEmptyElementFn(A.name, A) : K = b.fullTagEmptyElement), K ? (M.push(">"), A[b.elementsKey] && A[b.elementsKey].length && (M.push(k(A[b.elementsKey], b, P + 1)), a = A, i = A.name), M.push(b.spaces && y(A, b) ? `
` + Array(P + 1).join(b.spaces) : ""), M.push("</" + R + ">")) : M.push("/>"), M.join("");
  }
  function k(A, b, P, M) {
    return A.reduce(function(R, K) {
      var ee = s(b, P, M && !R);
      switch (K.type) {
        case "element":
          return R + ee + _(K, b, P);
        case "comment":
          return R + ee + v(K[b.commentKey], b);
        case "doctype":
          return R + ee + m(K[b.doctypeKey], b);
        case "cdata":
          return R + (b.indentCdata ? ee : "") + E(K[b.cdataKey], b);
        case "text":
          return R + (b.indentText ? ee : "") + d(K[b.textKey], b);
        case "instruction":
          var O = {};
          return O[K[b.nameKey]] = K[b.attributesKey] ? K : K[b.instructionKey], R + (b.indentInstruction ? ee : "") + w(O, b, P);
      }
    }, "");
  }
  function x(A, b, P) {
    var M;
    for (M in A) if (A.hasOwnProperty(M)) switch (M) {
      case b.parentKey:
      case b.attributesKey:
        break;
      case b.textKey:
        if (b.indentText || P) return !0;
        break;
      case b.cdataKey:
        if (b.indentCdata || P) return !0;
        break;
      case b.instructionKey:
        if (b.indentInstruction || P) return !0;
        break;
      case b.doctypeKey:
      case b.commentKey:
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function T(A, b, P, M, R) {
    a = A, i = b;
    var K = "elementNameFn" in P ? P.elementNameFn(b, A) : b;
    if (typeof A > "u" || A === null || A === "") return "fullTagEmptyElementFn" in P && P.fullTagEmptyElementFn(b, A) || P.fullTagEmptyElement ? "<" + K + "></" + K + ">" : "<" + K + "/>";
    var ee = [];
    if (b) {
      if (ee.push("<" + K), typeof A != "object")
        return ee.push(">" + d(A, P) + "</" + K + ">"), ee.join("");
      A[P.attributesKey] && ee.push(c(A[P.attributesKey], P, M));
      var O = x(A, P, !0) || A[P.attributesKey] && A[P.attributesKey]["xml:space"] === "preserve";
      if (O || ("fullTagEmptyElementFn" in P ? O = P.fullTagEmptyElementFn(b, A) : O = P.fullTagEmptyElement), O) ee.push(">");
      else
        return ee.push("/>"), ee.join("");
    }
    return ee.push(S(A, P, M + 1, !1)), a = A, i = b, b && ee.push((R ? s(P, M, !1) : "") + "</" + K + ">"), ee.join("");
  }
  function S(A, b, P, M) {
    var R, K, ee, O = [];
    for (K in A) if (A.hasOwnProperty(K))
      for (ee = n(A[K]) ? A[K] : [A[K]], R = 0; R < ee.length; ++R) {
        switch (K) {
          case b.declarationKey:
            O.push(h(ee[R], b, P));
            break;
          case b.instructionKey:
            O.push((b.indentInstruction ? s(b, P, M) : "") + w(ee[R], b, P));
            break;
          case b.attributesKey:
          case b.parentKey:
            break;
          case b.textKey:
            O.push((b.indentText ? s(b, P, M) : "") + d(ee[R], b));
            break;
          case b.cdataKey:
            O.push((b.indentCdata ? s(b, P, M) : "") + E(ee[R], b));
            break;
          case b.doctypeKey:
            O.push(s(b, P, M) + m(ee[R], b));
            break;
          case b.commentKey:
            O.push(s(b, P, M) + v(ee[R], b));
            break;
          default:
            O.push(s(b, P, M) + T(ee[R], K, b, P, x(ee[R], b)));
        }
        M = M && !O.length;
      }
    return O.join("");
  }
  t.exports = function(A, b) {
    b = u(b);
    var P = [];
    return a = A, i = "_root_", b.compact ? P.push(S(A, b, 0, !0)) : (A[b.declarationKey] && P.push(h(A[b.declarationKey], b, 0)), A[b.elementsKey] && A[b.elementsKey].length && P.push(k(A[b.elementsKey], b, 0, !P.length))), P.join("");
  };
})), Lo = /* @__PURE__ */ fe(((e, t) => {
  var r = $i();
  t.exports = function(n, a) {
    n instanceof Buffer && (n = n.toString());
    var i = null;
    if (typeof n == "string") try {
      i = JSON.parse(n);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else i = n;
    return r(i, a);
  };
})), Gi = (/* @__PURE__ */ fe(((e, t) => {
  t.exports = {
    xml2js: Hi(),
    xml2json: Do(),
    js2xml: $i(),
    json2xml: Lo()
  };
})))(), En = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new Mo(e.name, e.attributes), r = e.elements || [];
      for (const n of r) {
        const a = En(n);
        a !== void 0 && t.push(a);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, Bo = class extends ve {
}, Mo = class extends ae {
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
    return En((0, Gi.xml2js)(e, { compact: !1 }));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new Bo(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, Uo = class extends ae {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(e) {
    super(""), Z(this, "_attr", void 0), this._attr = e;
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
}, Ki = class extends ae {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, Te = (e) => {
  if (isNaN(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, Ar = (e) => {
  const t = Te(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, Vi = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, Vn = (e) => Vi(e, 1), Tn = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, Wo = {
  in: 1440,
  cm: 1440 / 2.54,
  mm: 1440 / 25.4,
  pt: 20,
  pc: 240,
  pi: 240
}, bt = (e) => {
  if (typeof e == "number") return e;
  const t = e.slice(-2), r = Number(e.substring(0, e.length - 2)), n = Wo[t];
  if (n === void 0 || Number.isNaN(r)) throw new Error(`Invalid universal measure '${e}'. Expected a number followed by mm, cm, in, pt, pc or pi.`);
  return r * n;
}, qi = (e) => {
  const t = Tn(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, Xi = (e) => e === "auto" ? e : Vi(e.charAt(0) === "#" ? e.substring(1) : e, 3), Ve = (e) => typeof e == "string" ? Tn(e) : Te(e), jo = (e) => typeof e == "string" ? qi(e) : Ar(e), Ce = (e) => typeof e == "string" ? qi(e) : Ar(e), zo = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Zi = (e) => typeof e == "number" ? Te(e) : e.slice(-1) === "%" ? zo(e) : Tn(e), Ho = Ar, $o = Ar, Go = (e) => e.toISOString(), ce = class extends ae {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Pe({ val: t }));
  }
}, Br = class extends ae {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Pe({ val: jo(t) }));
  }
}, Yi = class extends ae {
}, rt = class extends ae {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(e, t) {
    super(e), this.root.push(new Pe({ val: t }));
  }
}, Ot = (e, t) => new se({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), $t = class extends ae {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(e, t) {
    super(e), this.root.push(new Pe({ val: t }));
  }
}, ft = class extends ae {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, se = class extends ae {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new dn(t)), r && this.root.push(...r);
  }
}, Ee = {
  /** Align Start: the left in a left-to-right paragraph, and the right in a `bidirectional` (right-to-left) paragraph */
  START: "start",
  /** Align Center */
  CENTER: "center",
  /** Align End: the right in a left-to-right paragraph, and the left in a `bidirectional` (right-to-left) paragraph */
  END: "end",
  /** Align Left: a paragraph stays on the left of the page even when it is `bidirectional` (right-to-left) */
  LEFT: "left",
  /** Align Right: a paragraph stays on the right of the page even when it is `bidirectional` (right-to-left) */
  RIGHT: "right",
  /** Justified */
  JUSTIFIED: "both"
}, Ji = (e) => new se({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Sn = {
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
}, Qi = {
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
}, ea = {
  dark1: {
    value: "windowText",
    lastColor: "000000"
  },
  light1: {
    value: "window",
    lastColor: "FFFFFF"
  }
}, ta = (e, t) => {
  if (t === "auto") throw new Error(`Invalid theme color ${e} 'auto'. Expected 6 digit hex value`);
  return Xi(t);
}, ra = (e = {}) => Object.fromEntries(Object.keys(Sn).map((t) => {
  const r = e[t], n = t === "dark1" || t === "light1" ? ea[t].lastColor : Qi[t];
  return [t, r === void 0 ? n : ta(t, r)];
})), Ko = (e, t) => new se({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: ta(e, t)
  } }
}), Vo = (e, t) => {
  const r = t[e], n = e === "dark1" || e === "light1" ? ea[e] : void 0;
  return new se({
    name: `a:${Sn[e]}`,
    children: [r === void 0 && n ? new se({
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
    }) : Ko(e, r ?? Qi[e])]
  });
}, qo = (e, t = {}) => new se({
  name: "a:clrScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: Object.keys(Sn).map((r) => Vo(r, t))
}), qn = /* @__PURE__ */ new Set([
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
]), Xo = /* @__PURE__ */ new Map([
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
]), Xn = (e, t) => {
  if (!(e >= 0 && e <= 100)) throw new Error(`Invalid ${t} ${e}. Expected a number from 0 to 100`);
  return Math.round(255 * (1 - e / 100));
}, Zo = ({ theme: e, lighter: t, darker: r }) => {
  if (!qn.has(e)) {
    const i = Xo.get(e);
    throw new Error(`Invalid theme color "${e}". ${i ? `Did you mean "${i}"?` : `Expected one of ${[...qn].join(", ")}`}`);
  }
  if (t !== void 0 && r !== void 0) throw new Error("Invalid theme color. Expected lighter or darker, not both");
  const n = t === void 0 ? void 0 : Xn(t, "lighter"), a = r === void 0 ? void 0 : Xn(r, "darker");
  return {
    tint: n === 255 ? void 0 : n,
    shade: a === 255 ? void 0 : a
  };
}, Yo = (e) => {
  const [t, r, n] = [
    0,
    2,
    4
  ].map((c) => parseInt(e.slice(c, c + 2), 16) / 255), a = Math.max(t, r, n), i = Math.min(t, r, n), u = (a + i) / 2, s = a - i;
  return s === 0 ? {
    hue: 0,
    saturation: 0,
    lightness: u
  } : {
    hue: (a === t ? ((r - n) / s + 6) % 6 : a === r ? (n - t) / s + 2 : (t - r) / s + 4) * 60,
    saturation: s / (1 - Math.abs(2 * u - 1)),
    lightness: u
  };
}, Jo = ({ hue: e, saturation: t, lightness: r }) => {
  const n = (1 - Math.abs(2 * r - 1)) * t, a = n * (1 - Math.abs(e / 60 % 2 - 1)), [i, u, s] = e < 60 ? [
    n,
    a,
    0
  ] : e < 120 ? [
    a,
    n,
    0
  ] : e < 180 ? [
    0,
    n,
    a
  ] : e < 240 ? [
    0,
    a,
    n
  ] : e < 300 ? [
    a,
    0,
    n
  ] : [
    n,
    0,
    a
  ], c = r - n / 2;
  return [
    i,
    u,
    s
  ].map((h) => Math.floor((h + c) * 255 + 1e-9).toString(16).padStart(2, "0")).join("").toUpperCase();
}, Qo = (e, { tint: t, shade: r }) => {
  if (t === void 0 && r === void 0) return e;
  const n = Yo(e), a = t === void 0 ? n.lightness * r / 255 : n.lightness * t / 255 + (1 - t / 255);
  return Jo(he(he({}, n), {}, { lightness: a }));
}, Zn = (e) => e === void 0 ? void 0 : e.toString(16).padStart(2, "0").toUpperCase(), el = (e) => typeof e == "string" ? {
  type: "hex",
  value: Xi(e)
} : {
  type: "theme",
  color: e,
  change: Zo(e)
}, tl = (e, t) => e.type === "hex" ? { color: e.value } : {
  color: Qo(t[e.color.theme], e.change),
  theme: e.color.theme,
  tint: Zn(e.change.tint),
  shade: Zn(e.change.shade)
}, rl = ra(), An = class extends Vt {
  /**
  * @throws If a color isn't valid
  */
  constructor(e) {
    super("_attr"), Z(this, "attributes", void 0), this.attributes = e.map((t) => "keys" in t ? {
      keys: t.keys,
      color: t.color === void 0 ? void 0 : el(t.color)
    } : t);
  }
  prepForXml(e) {
    var t, r;
    const n = (t = (r = e.file) === null || r === void 0 || (r = r.Theme) === null || r === void 0 ? void 0 : r.Colors) !== null && t !== void 0 ? t : rl, a = this.attributes.flatMap((i) => {
      if (!("keys" in i)) return [[i.key, i.value]];
      if (i.color === void 0) return [];
      const { keys: u } = i, s = tl(i.color, n);
      return [
        [u.color, s.color],
        [u.theme, s.theme],
        [u.tint, s.tint],
        [u.shade, s.shade]
      ];
    });
    return { _attr: Object.fromEntries(a.filter(([, i]) => i !== void 0)) };
  }
}, nl = class extends ae {
  constructor(e, t) {
    super(e), this.root.push(new An(t));
  }
}, kn = (e, t) => new nl(e, t), Jt = {
  color: "w:color",
  theme: "w:themeColor",
  tint: "w:themeTint",
  shade: "w:themeShade"
}, Ae = (e, { color: t, size: r, space: n, style: a }) => kn(e, [
  {
    key: "w:val",
    value: a
  },
  {
    keys: Jt,
    color: t
  },
  {
    key: "w:sz",
    value: r === void 0 ? void 0 : Ho(r)
  },
  {
    key: "w:space",
    value: n === void 0 ? void 0 : $o(n)
  }
]), Le = {
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
}, il = class extends nt {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(Ae("w:top", e.top)), e.left && this.root.push(Ae("w:left", e.left)), e.bottom && this.root.push(Ae("w:bottom", e.bottom)), e.right && this.root.push(Ae("w:right", e.right)), e.between && this.root.push(Ae("w:between", e.between));
  }
}, al = class extends ae {
  constructor() {
    super("w:pBdr");
    const e = Ae("w:bottom", {
      color: "auto",
      space: 1,
      style: Le.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, sl = ({ start: e, end: t, left: r, right: n, hanging: a, firstLine: i, firstLineChars: u }) => new se({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : Ve(e)
    },
    end: {
      key: "w:end",
      value: t === void 0 ? void 0 : Ve(t)
    },
    left: {
      key: "w:left",
      value: r === void 0 ? void 0 : Ve(r)
    },
    right: {
      key: "w:right",
      value: n === void 0 ? void 0 : Ve(n)
    },
    hanging: {
      key: "w:hanging",
      value: a === void 0 ? void 0 : Ce(a)
    },
    firstLine: {
      key: "w:firstLine",
      value: i === void 0 ? void 0 : Ce(i)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: u === void 0 ? void 0 : Te(u)
    }
  }
}), ol = () => new se({ name: "w:br" }), kr = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Cn = (e, t) => new se({
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
}), Ut = (e) => Cn(kr.BEGIN, e), na = /* @__PURE__ */ new WeakSet(), ll = class extends se {
  constructor() {
    super({
      name: "w:fldChar",
      attributes: {
        type: {
          key: "w:fldCharType",
          value: kr.BEGIN
        },
        dirty: {
          key: "w:dirty",
          value: !0
        }
      }
    });
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    return na.add(t), t;
  }
}, ia = () => new ll(), ul = (e) => typeof e == "object" && e !== null && na.has(e), mt = (e) => Cn(kr.SEPARATE, e), vt = (e) => Cn(kr.END, e), cl = {
  DECIMAL: "decimal"
}, st = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, ot = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { space: "xml:space" });
  }
}, hl = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ot({ space: st.PRESERVE })), this.root.push("PAGE");
  }
}, fl = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ot({ space: st.PRESERVE })), this.root.push("NUMPAGES");
  }
}, dl = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ot({ space: st.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, pl = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ot({ space: st.PRESERVE })), this.root.push("SECTION");
  }
}, Cr = ({ fill: e, color: t, type: r }) => kn("w:shd", [
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
    keys: Jt,
    color: t
  },
  {
    key: "w:val",
    value: r ?? tt.CLEAR
  }
]), tt = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
}, Fe = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, ml = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, vl = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, wl = {
  /** Dot emphasis mark */
  DOT: "dot"
}, gl = (e = wl.DOT) => new se({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), yl = class extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(new Pe({ val: Ve(e) }));
  }
}, bl = class extends ae {
  constructor(e) {
    super("w:color"), this.root.push(new An([{
      keys: he(he({}, Jt), {}, { color: "w:val" }),
      color: e
    }]));
  }
}, _l = class extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(new Pe({ val: e }));
  }
}, xl = (e) => new se({
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
}), Mr = (e, t) => {
  if (typeof e == "string") {
    const n = e;
    return new se({
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
    return new se({
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
  return new se({
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
}, aa = (e) => new se({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), El = () => aa("superscript"), Tl = () => aa("subscript"), sa = {
  /** Single underline */
  SINGLE: "single"
}, Sl = (e = sa.SINGLE, t) => kn("w:u", [{
  key: "w:val",
  value: e
}, {
  keys: Jt,
  color: t
}]), ct = class extends nt {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new rt("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(Mr(e.font)) : "name" in e.font ? this.push(Mr(e.font.name, e.font.hint)) : this.push(Mr(e.font))), e.bold !== void 0 && this.push(new ce("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new ce("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new ce("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new ce("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new ce("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ce("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ce("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ce("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ce("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ce("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ce("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ce("w:snapToGrid", e.snapToGrid)), e.vanish !== void 0 && this.push(new ce("w:vanish", e.vanish)), e.color && this.push(new bl(e.color)), e.characterSpacing && this.push(new yl(e.characterSpacing)), e.scale !== void 0 && this.push(new $t("w:w", e.scale)), e.kern && this.push(new Br("w:kern", e.kern)), e.position && this.push(new rt("w:position", e.position)), e.size !== void 0 && this.push(new Br("w:sz", e.size));
    const n = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    n && this.push(new Br("w:szCs", n)), e.highlight && this.push(new _l(e.highlight)), e.underline && this.push(Sl(e.underline.type, e.underline.color)), e.effect && this.push(new rt("w:effect", e.effect)), e.border && this.push(Ae("w:bdr", e.border)), e.shading && this.push(Cr(e.shading)), e.subScript && this.push(Tl()), e.superScript && this.push(El()), e.rightToLeft !== void 0 && this.push(new ce("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(gl(e.emphasisMark.type)), e.language && this.push(xl(e.language)), e.specVanish !== void 0 && this.push(new ce("w:specVanish", e.specVanish)), e.math !== void 0 && this.push(new ce("w:oMath", e.math)), e.revision && this.push(new kl(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, Al = class extends ct {
  constructor(e) {
    super(e), e?.insertion && this.push(new vl(e.insertion)), e?.deletion && this.push(new ml(e.deletion));
  }
}, kl = class extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new ct(e));
  }
}, yr = class extends ae {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new ot({ space: st.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new ot({ space: (t = e.space) !== null && t !== void 0 ? t : st.DEFAULT })), this.root.push(e.text);
    }
  }
}, at = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, Cl = (e) => {
  switch (e) {
    case at.CURRENT:
      return [
        Ut(),
        new hl(),
        mt(),
        vt()
      ];
    case at.TOTAL_PAGES:
      return [
        Ut(),
        new fl(),
        mt(),
        vt()
      ];
    case at.TOTAL_PAGES_IN_SECTION:
      return [
        Ut(),
        new dl(),
        mt(),
        vt()
      ];
    case at.CURRENT_SECTION:
      return [
        Ut(),
        new pl(),
        mt(),
        vt()
      ];
    default:
      return;
  }
}, Me = class fr extends ae {
  constructor(t) {
    if (super("w:r"), Z(this, "properties", void 0), Z(this, "following", []), this.properties = new ct(t), this.root.push(this.properties), t.break) for (let r = 0; r < t.break; r++) this.root.push(ol());
    if (t.children) for (const [r, n] of t.children.entries()) {
      if (n instanceof fr) {
        const a = t.children.slice(r + 1);
        this.following = [n, ...a.length > 0 ? [new fr(he(he({}, t), {}, {
          break: void 0,
          children: a
        }))] : []];
        break;
      }
      if (typeof n == "string") {
        const a = Cl(n);
        if (a) {
          const i = t.children.slice(r + 1), u = (h) => new fr(he(he({}, t), {}, {
            break: void 0,
            children: h
          })), s = this.root.length === 1;
          s && this.root.push(a[0]);
          const c = s ? a.slice(1) : a;
          this.following = [...c.map((h) => u([h])), ...i.length > 0 ? [u(i)] : []];
          break;
        }
        this.root.push(new yr(n));
        continue;
      }
      this.root.push(n);
    }
    else t.text !== void 0 && this.root.push(new yr(t.text));
  }
  get writtenAs() {
    return this.following.length > 0 ? [this, ...this.following.flatMap((t) => {
      var r;
      return (r = t.writtenAs) !== null && r !== void 0 ? r : t;
    })] : void 0;
  }
}, Ie = class extends Me {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, Qt = /* @__PURE__ */ fe(((e, t) => {
  t.exports = r;
  function r(n, a) {
    if (!n) throw new Error(a || "Assertion failed");
  }
  r.equal = function(a, i, u) {
    if (a != i) throw new Error(u || "Assertion failed: " + a + " != " + i);
  };
})), Ze = /* @__PURE__ */ fe(((e) => {
  var t = Qt();
  e.inherits = lt();
  function r(O, z) {
    return (O.charCodeAt(z) & 64512) !== 55296 || z < 0 || z + 1 >= O.length ? !1 : (O.charCodeAt(z + 1) & 64512) === 56320;
  }
  function n(O, z) {
    if (Array.isArray(O)) return O.slice();
    if (!O) return [];
    var I = [];
    if (typeof O == "string")
      if (z) {
        if (z === "hex")
          for (O = O.replace(/[^a-z0-9]+/gi, ""), O.length % 2 !== 0 && (O = "0" + O), Q = 0; Q < O.length; Q += 2) I.push(parseInt(O[Q] + O[Q + 1], 16));
      } else for (var H = 0, Q = 0; Q < O.length; Q++) {
        var q = O.charCodeAt(Q);
        q < 128 ? I[H++] = q : q < 2048 ? (I[H++] = q >> 6 | 192, I[H++] = q & 63 | 128) : r(O, Q) ? (q = 65536 + ((q & 1023) << 10) + (O.charCodeAt(++Q) & 1023), I[H++] = q >> 18 | 240, I[H++] = q >> 12 & 63 | 128, I[H++] = q >> 6 & 63 | 128, I[H++] = q & 63 | 128) : (I[H++] = q >> 12 | 224, I[H++] = q >> 6 & 63 | 128, I[H++] = q & 63 | 128);
      }
    else for (Q = 0; Q < O.length; Q++) I[Q] = O[Q] | 0;
    return I;
  }
  e.toArray = n;
  function a(O) {
    for (var z = "", I = 0; I < O.length; I++) z += s(O[I].toString(16));
    return z;
  }
  e.toHex = a;
  function i(O) {
    return (O >>> 24 | O >>> 8 & 65280 | O << 8 & 16711680 | (O & 255) << 24) >>> 0;
  }
  e.htonl = i;
  function u(O, z) {
    for (var I = "", H = 0; H < O.length; H++) {
      var Q = O[H];
      z === "little" && (Q = i(Q)), I += c(Q.toString(16));
    }
    return I;
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
  function h(O, z, I, H) {
    var Q = I - z;
    t(Q % 4 === 0);
    for (var q = new Array(Q / 4), le = 0, Y = z; le < q.length; le++, Y += 4) {
      var te;
      H === "big" ? te = O[Y] << 24 | O[Y + 1] << 16 | O[Y + 2] << 8 | O[Y + 3] : te = O[Y + 3] << 24 | O[Y + 2] << 16 | O[Y + 1] << 8 | O[Y], q[le] = te >>> 0;
    }
    return q;
  }
  e.join32 = h;
  function w(O, z) {
    for (var I = new Array(O.length * 4), H = 0, Q = 0; H < O.length; H++, Q += 4) {
      var q = O[H];
      z === "big" ? (I[Q] = q >>> 24, I[Q + 1] = q >>> 16 & 255, I[Q + 2] = q >>> 8 & 255, I[Q + 3] = q & 255) : (I[Q + 3] = q >>> 24, I[Q + 2] = q >>> 16 & 255, I[Q + 1] = q >>> 8 & 255, I[Q] = q & 255);
    }
    return I;
  }
  e.split32 = w;
  function v(O, z) {
    return O >>> z | O << 32 - z;
  }
  e.rotr32 = v;
  function E(O, z) {
    return O << z | O >>> 32 - z;
  }
  e.rotl32 = E;
  function m(O, z) {
    return O + z >>> 0;
  }
  e.sum32 = m;
  function d(O, z, I) {
    return O + z + I >>> 0;
  }
  e.sum32_3 = d;
  function y(O, z, I, H) {
    return O + z + I + H >>> 0;
  }
  e.sum32_4 = y;
  function _(O, z, I, H, Q) {
    return O + z + I + H + Q >>> 0;
  }
  e.sum32_5 = _;
  function k(O, z, I, H) {
    var Q = O[z], q = H + O[z + 1] >>> 0;
    O[z] = (q < H ? 1 : 0) + I + Q >>> 0, O[z + 1] = q;
  }
  e.sum64 = k;
  function x(O, z, I, H) {
    return (z + H >>> 0 < z ? 1 : 0) + O + I >>> 0;
  }
  e.sum64_hi = x;
  function T(O, z, I, H) {
    return z + H >>> 0;
  }
  e.sum64_lo = T;
  function S(O, z, I, H, Q, q, le, Y) {
    var te = 0, V = z;
    return V = V + H >>> 0, te += V < z ? 1 : 0, V = V + q >>> 0, te += V < q ? 1 : 0, V = V + Y >>> 0, te += V < Y ? 1 : 0, O + I + Q + le + te >>> 0;
  }
  e.sum64_4_hi = S;
  function A(O, z, I, H, Q, q, le, Y) {
    return z + H + q + Y >>> 0;
  }
  e.sum64_4_lo = A;
  function b(O, z, I, H, Q, q, le, Y, te, V) {
    var F = 0, X = z;
    return X = X + H >>> 0, F += X < z ? 1 : 0, X = X + q >>> 0, F += X < q ? 1 : 0, X = X + Y >>> 0, F += X < Y ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0, O + I + Q + le + te + F >>> 0;
  }
  e.sum64_5_hi = b;
  function P(O, z, I, H, Q, q, le, Y, te, V) {
    return z + H + q + Y + V >>> 0;
  }
  e.sum64_5_lo = P;
  function M(O, z, I) {
    return (z << 32 - I | O >>> I) >>> 0;
  }
  e.rotr64_hi = M;
  function R(O, z, I) {
    return (O << 32 - I | z >>> I) >>> 0;
  }
  e.rotr64_lo = R;
  function K(O, z, I) {
    return O >>> I;
  }
  e.shr64_hi = K;
  function ee(O, z, I) {
    return (O << 32 - I | z >>> I) >>> 0;
  }
  e.shr64_lo = ee;
})), er = /* @__PURE__ */ fe(((e) => {
  var t = Ze(), r = Qt();
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
    for (var h = 1; h < s; h++) c[h] = 0;
    if (i <<= 3, this.endian === "big") {
      for (var w = 8; w < this.padLength; w++) c[h++] = 0;
      c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = i >>> 24 & 255, c[h++] = i >>> 16 & 255, c[h++] = i >>> 8 & 255, c[h++] = i & 255;
    } else
      for (c[h++] = i & 255, c[h++] = i >>> 8 & 255, c[h++] = i >>> 16 & 255, c[h++] = i >>> 24 & 255, c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = 0, w = 8; w < this.padLength; w++) c[h++] = 0;
    return c;
  };
})), oa = /* @__PURE__ */ fe(((e) => {
  var t = Ze().rotr32;
  function r(w, v, E, m) {
    if (w === 0) return n(v, E, m);
    if (w === 1 || w === 3) return i(v, E, m);
    if (w === 2) return a(v, E, m);
  }
  e.ft_1 = r;
  function n(w, v, E) {
    return w & v ^ ~w & E;
  }
  e.ch32 = n;
  function a(w, v, E) {
    return w & v ^ w & E ^ v & E;
  }
  e.maj32 = a;
  function i(w, v, E) {
    return w ^ v ^ E;
  }
  e.p32 = i;
  function u(w) {
    return t(w, 2) ^ t(w, 13) ^ t(w, 22);
  }
  e.s0_256 = u;
  function s(w) {
    return t(w, 6) ^ t(w, 11) ^ t(w, 25);
  }
  e.s1_256 = s;
  function c(w) {
    return t(w, 7) ^ t(w, 18) ^ w >>> 3;
  }
  e.g0_256 = c;
  function h(w) {
    return t(w, 17) ^ t(w, 19) ^ w >>> 10;
  }
  e.g1_256 = h;
})), Il = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), a = oa(), i = r.rotl32, u = r.sum32, s = r.sum32_5, c = a.ft_1, h = n.BlockHash, w = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function v() {
    if (!(this instanceof v)) return new v();
    h.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(v, h), t.exports = v, v.blockSize = 512, v.outSize = 160, v.hmacStrength = 80, v.padLength = 64, v.prototype._update = function(m, d) {
    for (var y = this.W, _ = 0; _ < 16; _++) y[_] = m[d + _];
    for (; _ < y.length; _++) y[_] = i(y[_ - 3] ^ y[_ - 8] ^ y[_ - 14] ^ y[_ - 16], 1);
    var k = this.h[0], x = this.h[1], T = this.h[2], S = this.h[3], A = this.h[4];
    for (_ = 0; _ < y.length; _++) {
      var b = ~~(_ / 20), P = s(i(k, 5), c(b, x, T, S), A, y[_], w[b]);
      A = S, S = T, T = i(x, 30), x = k, k = P;
    }
    this.h[0] = u(this.h[0], k), this.h[1] = u(this.h[1], x), this.h[2] = u(this.h[2], T), this.h[3] = u(this.h[3], S), this.h[4] = u(this.h[4], A);
  }, v.prototype._digest = function(m) {
    return m === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), la = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), a = oa(), i = Qt(), u = r.sum32, s = r.sum32_4, c = r.sum32_5, h = a.ch32, w = a.maj32, v = a.s0_256, E = a.s1_256, m = a.g0_256, d = a.g1_256, y = n.BlockHash, _ = [
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
  function k() {
    if (!(this instanceof k)) return new k();
    y.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = _, this.W = new Array(64);
  }
  r.inherits(k, y), t.exports = k, k.blockSize = 512, k.outSize = 256, k.hmacStrength = 192, k.padLength = 64, k.prototype._update = function(T, S) {
    for (var A = this.W, b = 0; b < 16; b++) A[b] = T[S + b];
    for (; b < A.length; b++) A[b] = s(d(A[b - 2]), A[b - 7], m(A[b - 15]), A[b - 16]);
    var P = this.h[0], M = this.h[1], R = this.h[2], K = this.h[3], ee = this.h[4], O = this.h[5], z = this.h[6], I = this.h[7];
    for (i(this.k.length === A.length), b = 0; b < A.length; b++) {
      var H = c(I, E(ee), h(ee, O, z), this.k[b], A[b]), Q = u(v(P), w(P, M, R));
      I = z, z = O, O = ee, ee = u(K, H), K = R, R = M, M = P, P = u(H, Q);
    }
    this.h[0] = u(this.h[0], P), this.h[1] = u(this.h[1], M), this.h[2] = u(this.h[2], R), this.h[3] = u(this.h[3], K), this.h[4] = u(this.h[4], ee), this.h[5] = u(this.h[5], O), this.h[6] = u(this.h[6], z), this.h[7] = u(this.h[7], I);
  }, k.prototype._digest = function(T) {
    return T === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), Rl = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = la();
  function a() {
    if (!(this instanceof a)) return new a();
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
  r.inherits(a, n), t.exports = a, a.blockSize = 512, a.outSize = 224, a.hmacStrength = 192, a.padLength = 64, a.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), ua = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), a = Qt(), i = r.rotr64_hi, u = r.rotr64_lo, s = r.shr64_hi, c = r.shr64_lo, h = r.sum64, w = r.sum64_hi, v = r.sum64_lo, E = r.sum64_4_hi, m = r.sum64_4_lo, d = r.sum64_5_hi, y = r.sum64_5_lo, _ = n.BlockHash, k = [
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
    _.call(this), this.h = [
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
    ], this.k = k, this.W = new Array(160);
  }
  r.inherits(x, _), t.exports = x, x.blockSize = 1024, x.outSize = 512, x.hmacStrength = 192, x.padLength = 128, x.prototype._prepareBlock = function(Q, q) {
    for (var le = this.W, Y = 0; Y < 32; Y++) le[Y] = Q[q + Y];
    for (; Y < le.length; Y += 2) {
      var te = z(le[Y - 4], le[Y - 3]), V = I(le[Y - 4], le[Y - 3]), F = le[Y - 14], X = le[Y - 13], J = ee(le[Y - 30], le[Y - 29]), re = O(le[Y - 30], le[Y - 29]), pe = le[Y - 32], C = le[Y - 31];
      le[Y] = E(te, V, F, X, J, re, pe, C), le[Y + 1] = m(te, V, F, X, J, re, pe, C);
    }
  }, x.prototype._update = function(Q, q) {
    this._prepareBlock(Q, q);
    var le = this.W, Y = this.h[0], te = this.h[1], V = this.h[2], F = this.h[3], X = this.h[4], J = this.h[5], re = this.h[6], pe = this.h[7], C = this.h[8], p = this.h[9], W = this.h[10], U = this.h[11], ne = this.h[12], D = this.h[13], L = this.h[14], f = this.h[15];
    a(this.k.length === le.length);
    for (var G = 0; G < le.length; G += 2) {
      var N = L, o = f, l = R(C, p), g = K(C, p), B = T(C, p, W, U, ne), $ = S(C, p, W, U, ne, D), j = this.k[G], ie = this.k[G + 1], ue = le[G], oe = le[G + 1], de = d(N, o, l, g, B, $, j, ie, ue, oe), me = y(N, o, l, g, B, $, j, ie, ue, oe);
      N = P(Y, te), o = M(Y, te), l = A(Y, te, V, F, X), g = b(Y, te, V, F, X, J);
      var we = w(N, o, l, g), Se = v(N, o, l, g);
      L = ne, f = D, ne = W, D = U, W = C, U = p, C = w(re, pe, de, me), p = v(pe, pe, de, me), re = X, pe = J, X = V, J = F, V = Y, F = te, Y = w(de, me, we, Se), te = v(de, me, we, Se);
    }
    h(this.h, 0, Y, te), h(this.h, 2, V, F), h(this.h, 4, X, J), h(this.h, 6, re, pe), h(this.h, 8, C, p), h(this.h, 10, W, U), h(this.h, 12, ne, D), h(this.h, 14, L, f);
  }, x.prototype._digest = function(Q) {
    return Q === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function T(H, Q, q, le, Y) {
    var te = H & q ^ ~H & Y;
    return te < 0 && (te += 4294967296), te;
  }
  function S(H, Q, q, le, Y, te) {
    var V = Q & le ^ ~Q & te;
    return V < 0 && (V += 4294967296), V;
  }
  function A(H, Q, q, le, Y) {
    var te = H & q ^ H & Y ^ q & Y;
    return te < 0 && (te += 4294967296), te;
  }
  function b(H, Q, q, le, Y, te) {
    var V = Q & le ^ Q & te ^ le & te;
    return V < 0 && (V += 4294967296), V;
  }
  function P(H, Q) {
    var q = i(H, Q, 28), le = i(Q, H, 2), Y = i(Q, H, 7), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function M(H, Q) {
    var q = u(H, Q, 28), le = u(Q, H, 2), Y = u(Q, H, 7), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function R(H, Q) {
    var q = i(H, Q, 14), le = i(H, Q, 18), Y = i(Q, H, 9), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function K(H, Q) {
    var q = u(H, Q, 14), le = u(H, Q, 18), Y = u(Q, H, 9), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function ee(H, Q) {
    var q = i(H, Q, 1), le = i(H, Q, 8), Y = s(H, Q, 7), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function O(H, Q) {
    var q = u(H, Q, 1), le = u(H, Q, 8), Y = c(H, Q, 7), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function z(H, Q) {
    var q = i(H, Q, 19), le = i(Q, H, 29), Y = s(H, Q, 6), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
  function I(H, Q) {
    var q = u(H, Q, 19), le = u(Q, H, 29), Y = c(H, Q, 6), te = q ^ le ^ Y;
    return te < 0 && (te += 4294967296), te;
  }
})), Nl = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = ua();
  function a() {
    if (!(this instanceof a)) return new a();
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
  r.inherits(a, n), t.exports = a, a.blockSize = 1024, a.outSize = 384, a.hmacStrength = 192, a.padLength = 128, a.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), Ol = /* @__PURE__ */ fe(((e) => {
  e.sha1 = Il(), e.sha224 = Rl(), e.sha256 = la(), e.sha384 = Nl(), e.sha512 = ua();
})), Pl = /* @__PURE__ */ fe(((e) => {
  var t = Ze(), r = er(), n = t.rotl32, a = t.sum32, i = t.sum32_3, u = t.sum32_4, s = r.BlockHash;
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
  t.inherits(c, s), e.ripemd160 = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 192, c.padLength = 64, c.prototype._update = function(k, x) {
    for (var T = this.h[0], S = this.h[1], A = this.h[2], b = this.h[3], P = this.h[4], M = T, R = S, K = A, ee = b, O = P, z = 0; z < 80; z++) {
      var I = a(n(u(T, h(z, S, A, b), k[E[z] + x], w(z)), d[z]), P);
      T = P, P = b, b = n(A, 10), A = S, S = I, I = a(n(u(M, h(79 - z, R, K, ee), k[m[z] + x], v(z)), y[z]), O), M = O, O = ee, ee = n(K, 10), K = R, R = I;
    }
    I = i(this.h[1], A, ee), this.h[1] = i(this.h[2], b, O), this.h[2] = i(this.h[3], P, M), this.h[3] = i(this.h[4], T, R), this.h[4] = i(this.h[0], S, K), this.h[0] = I;
  }, c.prototype._digest = function(k) {
    return k === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function h(_, k, x, T) {
    return _ <= 15 ? k ^ x ^ T : _ <= 31 ? k & x | ~k & T : _ <= 47 ? (k | ~x) ^ T : _ <= 63 ? k & T | x & ~T : k ^ (x | ~T);
  }
  function w(_) {
    return _ <= 15 ? 0 : _ <= 31 ? 1518500249 : _ <= 47 ? 1859775393 : _ <= 63 ? 2400959708 : 2840853838;
  }
  function v(_) {
    return _ <= 15 ? 1352829926 : _ <= 31 ? 1548603684 : _ <= 47 ? 1836072691 : _ <= 63 ? 2053994217 : 0;
  }
  var E = [
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
  ], d = [
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
  ], y = [
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
})), Fl = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = Qt();
  function a(i, u, s) {
    if (!(this instanceof a)) return new a(i, u, s);
    this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(u, s));
  }
  t.exports = a, a.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), n(u.length <= this.blockSize);
    for (var s = u.length; s < this.blockSize; s++) u.push(0);
    for (s = 0; s < u.length; s++) u[s] ^= 54;
    for (this.inner = new this.Hash().update(u), s = 0; s < u.length; s++) u[s] ^= 106;
    this.outer = new this.Hash().update(u);
  }, a.prototype.update = function(u, s) {
    return this.inner.update(u, s), this;
  }, a.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  };
})), Dl = /* @__PURE__ */ fn((/* @__PURE__ */ fe(((e) => {
  var t = e;
  t.utils = Ze(), t.common = er(), t.sha = Ol(), t.ripemd = Pl(), t.hmac = Fl(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})))()), Ll = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", Bl = (e, t = 21) => (r = t) => {
  let n = "", a = r | 0;
  for (; a-- > 0; ) n += e[Math.random() * e.length | 0];
  return n;
}, Ml = (e = 21) => {
  let t = "", r = e | 0;
  for (; r-- > 0; ) t += Ll[Math.random() * 64 | 0];
  return t;
}, Ue = (e) => Math.floor(e * 72 * 20), Ir = (e = 0) => {
  let t = e;
  return () => ++t;
}, Ul = () => Ir(), Wl = () => Ir(1), jl = () => Ir(), zl = jl(), Hl = () => Ir(), ca = Hl(), In = () => Ml().toLowerCase(), Yn = (e) => Dl.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), Pt = (e) => Bl("1234567890abcdef", e)(), $l = () => `${Pt(8)}-${Pt(4)}-${Pt(4)}-${Pt(4)}-${Pt(12)}`, Wt = (e) => new Uint8Array(new TextEncoder().encode(e)), Gl = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Kl = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Vl = () => new se({
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
}), ha = (e) => new se({
  name: "wp:align",
  children: [e]
}), fa = (e) => new se({
  name: "wp:posOffset",
  children: [e.toString()]
}), ql = ({ relative: e, align: t, offset: r }) => new se({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Gl.PAGE
  } },
  children: [(() => {
    if (t) return ha(t);
    if (r !== void 0) return fa(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Xl = ({ relative: e, align: t, offset: r }) => new se({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Kl.PAGE
  } },
  children: [(() => {
    if (t) return ha(t);
    if (r !== void 0) return fa(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Zl = (e = {}) => {
  var t, r, n, a;
  return new se({
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
        value: (a = e.margins) === null || a === void 0 ? void 0 : a.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new ce("a:noAutofit", e.noAutoFit)] : []]
  });
}, Yl = (e = { txBox: "1" }) => new se({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), Jl = (e) => new se({
  name: "w:txbxContent",
  children: [...e]
}), Ql = (e) => new se({
  name: "wps:txbx",
  children: [Jl(e)]
}), eu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, da = class extends ae {
  constructor(e, t) {
    super("a:ext"), Z(this, "attributes", void 0), this.attributes = new eu({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, tu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, pa = class extends ae {
  constructor(e, t) {
    super("a:off"), this.root.push(new tu({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, ru = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, nu = class extends ae {
  constructor(e) {
    var t, r, n, a;
    super("a:xfrm"), Z(this, "extents", void 0), Z(this, "offset", void 0), this.root.push(new ru({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new pa((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (a = e.offset) === null || a === void 0 || (a = a.emus) === null || a === void 0 ? void 0 : a.y), this.extents = new da(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, ma = () => new se({ name: "a:noFill" }), iu = (e) => new se({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), au = (e) => new se({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), sn = (e) => new se({
  name: "a:solidFill",
  children: [e.type === "rgb" ? iu(e) : au(e)]
}), su = {
  /** Round cap style */
  ROUND: "rnd",
  /** Square cap style */
  SQUARE: "sq",
  /** Flat cap style */
  FLAT: "flat"
}, ou = {
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
}, lu = {
  /** Center alignment */
  CENTER: "ctr",
  /** Inset alignment */
  INSET: "in"
}, uu = (e) => new se({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap === void 0 ? void 0 : su[e.cap]
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine === void 0 ? void 0 : ou[e.compoundLine]
    },
    align: {
      key: "algn",
      value: e.align === void 0 ? void 0 : lu[e.align]
    }
  },
  children: [e.type === "noFill" ? ma() : e.solidFillType === "rgb" ? sn({
    type: "rgb",
    value: e.value
  }) : sn({
    type: "scheme",
    value: e.value
  })]
}), cu = class extends ae {
  constructor() {
    super("a:avLst");
  }
}, hu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { prst: "prst" });
  }
}, fu = class extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(new hu({ prst: "rect" })), this.root.push(new cu());
  }
}, du = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, va = class extends ae {
  constructor({ element: e, outline: t, solidFill: r, transform: n }) {
    super(`${e}:spPr`), Z(this, "form", void 0), this.root.push(new du({ bwMode: "auto" })), this.form = new nu(n), this.root.push(this.form), this.root.push(new fu()), r ? this.root.push(sn(r)) : t && this.root.push(ma()), t && this.root.push(uu(t));
  }
}, Jn = (e) => new se({
  name: "wps:wsp",
  children: [
    Yl(e.nonVisualProperties),
    new va({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    Ql(e.children),
    Zl(e.bodyProperties)
  ]
}), sr = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { uri: "uri" });
  }
}, pu = (e) => new se({
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
}), mu = (e) => new se({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [pu(e)]
}), vu = (e) => new se({
  name: "a:extLst",
  children: [mu(e)]
}), wu = (e) => new se({
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
  children: e.type === "svg" ? [vu(e)] : []
}), gu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      left: "l",
      top: "t",
      right: "r",
      bottom: "b"
    });
  }
}, or = (e, t) => {
  if (e !== void 0) {
    if (!(e >= 0 && e <= 100)) throw new Error(`Invalid crop ${t} ${e}. Expected a number from 0 to 100`);
    return Math.round(e * 1e3);
  }
}, yu = class extends ae {
  constructor(e) {
    super("a:srcRect"), e && this.root.push(new gu({
      left: or(e.left, "left"),
      top: or(e.top, "top"),
      right: or(e.right, "right"),
      bottom: or(e.bottom, "bottom")
    }));
  }
}, bu = class extends ae {
  constructor() {
    super("a:fillRect");
  }
}, _u = class extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new bu());
  }
}, xu = class extends ae {
  constructor(e, t) {
    super("pic:blipFill"), this.root.push(wu(e)), this.root.push(new yu(t)), this.root.push(new _u());
  }
}, Eu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, Tu = class extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(new Eu({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, Su = class extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new Tu());
  }
}, Au = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, ku = class extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(new Au({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof Or) {
        this.root.push(n.createDrawingClick(e, !1));
        break;
      }
    }
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, Cu = class extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new ku()), this.root.push(new Su());
  }
}, Iu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, Qn = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: a }) {
    super("pic:pic"), this.root.push(new Iu({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new Cu()), this.root.push(new xu(e, a)), this.root.push(new va({
      element: "pic",
      transform: t,
      outline: r,
      solidFill: n
    }));
  }
}, Ru = (e) => {
  var t, r, n, a;
  return new se({
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
      new pa((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (a = e.offset) === null || a === void 0 || (a = a.emus) === null || a === void 0 ? void 0 : a.y),
      new da(e.emus.x, e.emus.y),
      new se({
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
      new se({
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
}, Nu = () => new se({ name: "wpg:cNvGrpSpPr" }), Ou = (e) => new se({
  name: "wpg:wgp",
  children: [
    Nu(),
    new se({
      name: "wpg:grpSpPr",
      children: [Ru(e.transformation)]
    }),
    ...e.children
  ]
}), Pu = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: a }) {
    if (super("a:graphicData"), e.type === "graphic")
      this.root.push(new sr({ uri: e.uri })), this.root.push(e.content);
    else if (e.type === "wps") {
      this.root.push(new sr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const i = Jn(he(he({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: n
      }));
      this.root.push(i);
    } else if (e.type === "wpg") {
      this.root.push(new sr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const i = Ou({
        children: e.children.map((u) => u.type === "wps" ? Jn(he(he({}, u.data), {}, {
          transformation: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })) : new Qn({
          mediaData: u,
          transform: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })),
        transformation: t
      });
      this.root.push(i);
    } else {
      this.root.push(new sr({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const i = new Qn({
        mediaData: e,
        transform: t,
        outline: r,
        solidFill: n,
        crop: a
      });
      this.root.push(i);
    }
  }
}, Fu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { a: "xmlns:a" });
  }
}, wa = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: a }) {
    super("a:graphic"), Z(this, "data", void 0), this.root.push(new Fu({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new Pu({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: n,
      crop: a
    }), this.root.push(this.data);
  }
}, Ft = {
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
}, ga = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, ei = () => new se({ name: "wp:wrapNone" }), Du = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new se({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: e.side || ga.BOTH_SIDES
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
}), lr = 21600, Dt = (e, { x: t, y: r }) => new se({
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
}), Lu = () => new se({
  name: "wp:wrapPolygon",
  attributes: { edited: {
    key: "edited",
    value: !1
  } },
  children: [
    Dt("wp:start", {
      x: 0,
      y: 0
    }),
    Dt("wp:lineTo", {
      x: 0,
      y: lr
    }),
    Dt("wp:lineTo", {
      x: lr,
      y: lr
    }),
    Dt("wp:lineTo", {
      x: lr,
      y: 0
    }),
    Dt("wp:lineTo", {
      x: 0,
      y: 0
    })
  ]
}), ya = (e, t = {}, r) => {
  var n;
  return new se({
    name: e,
    attributes: {
      wrapText: {
        key: "wrapText",
        value: (n = r?.side) !== null && n !== void 0 ? n : ga.BOTH_SIDES
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
    children: [Lu()]
  });
}, Bu = (e, t) => ya("wp:wrapTight", e, t), Mu = (e, t) => ya("wp:wrapThrough", e, t), Uu = (e = {
  top: 0,
  bottom: 0
}) => new se({
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
}), ba = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, Wu = (e, t, r, n) => new se({
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
}), _a = (e, t) => new se({
  name: "a:hlinkClick",
  attributes: he(he({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), ju = "{C183D7F6-B498-43B3-948B-1728B52AA6E4}", zu = (e) => new se({
  name: "a:extLst",
  attributes: { namespace: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } },
  children: [new se({
    name: "a:ext",
    attributes: { uri: {
      key: "uri",
      value: ju
    } },
    children: [new se({
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
}), xa = class {
  constructor(e) {
    Z(this, "link", void 0), Z(this, "linkId", In()), Z(this, "addedTo", /* @__PURE__ */ new WeakSet()), this.link = e;
  }
  createClick(e) {
    return _a(this.linkId, e);
  }
  addRelationship(e) {
    const t = e.viewWrapper.Relationships;
    this.addedTo.has(t) || (this.addedTo.add(t), t.addRelationship(this.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", this.link, ba.EXTERNAL));
  }
}, Ea = class extends ae {
  constructor({ name: e, description: t, title: r, id: n } = {
    name: "",
    description: "",
    title: ""
  }, { link: a, decorative: i } = {}) {
    super("wp:docPr"), Z(this, "link", void 0), Z(this, "decorative", void 0);
    const u = {
      id: {
        key: "id",
        value: n ?? zl()
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
    }), this.root.push(new dn(u)), this.link = a === void 0 ? void 0 : new xa(a), this.decorative = i;
  }
  prepForXml(e) {
    if (this.link)
      this.link.addRelationship(e), this.root.push(this.link.createClick(!0));
    else for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof Or) {
        this.root.push(n.createDrawingClick(e, !0));
        break;
      }
    }
    this.decorative && this.root.push(zu());
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, Ta = ({ top: e, right: t, bottom: r, left: n }) => new se({
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
}), Ur = 2147483647, ti = 9525, ri = (e, t) => {
  if (t !== void 0 && t > Ur) throw new Error(`Invalid drawing ${e} ${t} EMUs (${Math.round(t / ti)} pixels). Word won't open a drawing with a ${e} over ${Ur} EMUs (${Math.floor(Ur / ti)} pixels). Sizes such as an ImageRun's transformation are in pixels, not EMUs`);
  return t;
}, Sa = ({ x: e, y: t }) => new se({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: ri("width", e)
    },
    y: {
      key: "cy",
      value: ri("height", t)
    }
  }
}), Hu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, $u = class extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Hu({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, Aa = (e = !0) => new se({
  name: "wp:cNvGraphicFramePr",
  children: e ? [new $u()] : []
}), Gu = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, Ku = class extends ae {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    var n;
    super("wp:anchor");
    const a = he({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Gu({
      distT: a.margins && a.margins.top || 0,
      distB: a.margins && a.margins.bottom || 0,
      distL: a.margins && a.margins.left || 0,
      distR: a.margins && a.margins.right || 0,
      simplePos: "0",
      allowOverlap: a.allowOverlap === !0 ? "1" : "0",
      behindDoc: a.behindDocument === !0 ? "1" : "0",
      locked: a.lockAnchor === !0 ? "1" : "0",
      layoutInCell: a.layoutInCell === !0 ? "1" : "0",
      relativeHeight: a.zIndex ? a.zIndex : t.emus.y
    })), this.root.push(Vl()), this.root.push(ql(a.horizontalPosition)), this.root.push(Xl(a.verticalPosition)), this.root.push(Sa({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push(Ta((n = r.effectExtent) !== null && n !== void 0 ? n : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Ft.SQUARE:
        this.root.push(Du(r.floating.wrap, r.floating.margins));
        break;
      case Ft.TIGHT:
        this.root.push(Bu(r.floating.margins, r.floating.wrap));
        break;
      case Ft.THROUGH:
        this.root.push(Mu(r.floating.margins, r.floating.wrap));
        break;
      case Ft.TOP_AND_BOTTOM:
        this.root.push(Uu(r.floating.margins));
        break;
      case Ft.NONE:
      default:
        this.root.push(ei());
    }
    else this.root.push(ei());
    this.root.push(new Ea(r.docProperties, {
      link: r.link,
      decorative: r.decorative
    })), this.root.push(Aa(e.type !== "graphic" || e.lockAspectRatio !== !1)), this.root.push(new wa({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill,
      crop: r.crop
    }));
  }
}, Vu = ({ mediaData: e, transform: t, docProperties: r, outline: n, solidFill: a, crop: i, effectExtent: u, link: s, decorative: c }) => {
  var h, w, v, E;
  return new se({
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
      Sa({
        x: t.emus.x,
        y: t.emus.y
      }),
      Ta(u ?? (n ? {
        top: ((h = n.width) !== null && h !== void 0 ? h : 9525) * 2,
        right: ((w = n.width) !== null && w !== void 0 ? w : 9525) * 2,
        bottom: ((v = n.width) !== null && v !== void 0 ? v : 9525) * 2,
        left: ((E = n.width) !== null && E !== void 0 ? E : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })),
      new Ea(r, {
        link: s,
        decorative: c
      }),
      Aa(e.type !== "graphic" || e.lockAspectRatio !== !1),
      new wa({
        mediaData: e,
        transform: t,
        outline: n,
        solidFill: a,
        crop: i
      })
    ]
  });
}, qu = class extends ae {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Ku({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(Vu({
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
}, Xu = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((n) => n.charCodeAt(0)));
}, Zu = (e) => typeof e == "string" ? Xu(e) : e, Wr = (e, t) => ({
  data: Zu(e.data),
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
}), Yu = ({ id: e, author: t, date: r }, n) => new se({
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
}), Ju = class extends ae {
  constructor(e) {
    var t;
    const r = `${Yn(e.data)}.${e.type}`, n = e.type === "svg" ? he(he({ type: e.type }, Wr(e, r)), {}, { fallback: he({ type: e.fallback.type }, Wr(he(he({}, e.fallback), {}, { transformation: e.transformation }), `${Yn(e.fallback.data)}.${e.fallback.type}`)) }) : he({ type: e.type }, Wr(e, r)), a = new qu(n, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline,
      solidFill: e.solidFill,
      crop: e.crop,
      link: e.link,
      decorative: e.decorative
    }), i = new ct(e.run), u = (t = e.insertion) !== null && t !== void 0 ? t : e.deletion, s = e.insertion ? "w:ins" : e.deletion ? "w:del" : "w:r";
    if (super(s), Z(this, "imageData", void 0), u) {
      this.root.push(new Fe({
        id: u.id,
        author: u.author,
        date: u.date
      }));
      const c = new se({
        name: "w:r",
        children: [i, a]
      });
      this.addChildElement(e.insertion && e.deletion ? Yu(e.deletion, c) : c);
    } else
      this.root.push(i), this.root.push(a);
    this.imageData = n;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, Qu = 32767, ec = 780, tc = [
  [1e3, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
], rc = (e) => e <= Qu ? tc.reduce(({ rest: t, text: r }, [n, a]) => ({
  rest: t % n,
  text: r + a.repeat(Math.floor(t / n))
}), {
  rest: e,
  text: ""
}).text : void 0, nc = (e) => e === 0 ? "" : e <= ec ? String.fromCharCode(65 + (e - 1) % 26).repeat(Math.ceil(e / 26)) : void 0, ic = (e) => {
  var t;
  return `${e}${e % 100 >= 11 && e % 100 <= 13 ? "th" : (t = [
    "th",
    "st",
    "nd",
    "rd"
  ][e % 10]) !== null && t !== void 0 ? t : "th"}`;
}, Rn = (e) => {
  const t = e.charAt(0) !== e.charAt(0).toUpperCase(), r = (n) => (a) => {
    var i;
    return t ? (i = n(a)) === null || i === void 0 ? void 0 : i.toLowerCase() : n(a);
  };
  switch (e.toLowerCase()) {
    case "arabic":
      return String;
    case "roman":
      return r(rc);
    case "alphabetic":
      return r(nc);
    case "ordinal":
      return (n) => n > 0 ? ic(n) : void 0;
    case "arabicdash":
      return (n) => `- ${n} -`;
    default:
      return;
  }
}, ka = /* @__PURE__ */ new Set([
  "mergeformat",
  "charformat",
  "mergeformatinet"
]), Ca = /* @__PURE__ */ new Set([
  "upper",
  "lower",
  "firstcap",
  "caps"
]), ac = (e) => /^[#0,]*[#0][#0,]*$/.test(e), sc = (e, t) => {
  const r = [...t].filter((i) => i === "0").length, n = r + [...t].filter((i) => i === "#").length, a = String(e).padStart(r, "0");
  if (!(a.length < n || r === 0 && e === 0))
    return t.includes(",") ? a.replace(/\B(?=(\d{3})+$)/g, ",") : a;
}, oc = (e, t) => {
  switch (t) {
    case "upper":
      return e.toUpperCase();
    case "lower":
      return e.toLowerCase();
    case "firstcap":
      return e.charAt(0).toUpperCase() + e.slice(1);
    default:
      return e;
  }
}, lc = (e) => {
  var t;
  const r = new RegExp("^\\s*(PAGEREF|NUMPAGES|SECTIONPAGES)\\b(.*)$", "is").exec(e), n = r?.[1].toUpperCase() === "PAGEREF" ? new RegExp('^\\s*("?)([^\\s"\\\\]+)\\1(.*)$', "s").exec(r[2]) : void 0;
  if (!r || r[1].toUpperCase() === "PAGEREF" && !n) return;
  const a = (t = (n ? n[3] : r[2]).match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  let i, u;
  const s = [];
  let c = !1, h = !0;
  for (let m = 0; m < a.length; m++) {
    const d = a[m], y = () => {
      var _;
      return (d.length > 2 ? d.slice(2) : (_ = a[++m]) !== null && _ !== void 0 ? _ : "").replace(/^"(.*)"$/, "$1");
    };
    if (/^\\p$/i.test(d)) c = !0;
    else if (d.startsWith("\\#")) {
      var w;
      const _ = y();
      h && (h = u === void 0 && ac(_)), (w = u) !== null && w !== void 0 || (u = _);
    } else if (d.startsWith("\\*")) {
      const _ = y(), k = _.toLowerCase();
      if (Ca.has(k)) s.push(k);
      else if (_ !== "" && !ka.has(k)) {
        var v;
        h && (h = i === void 0 && Rn(_) !== void 0), (v = i) !== null && v !== void 0 || (i = _);
      }
    }
  }
  const E = he(he(he(he({}, i === void 0 ? {} : { numberFormat: i }), u === void 0 ? {} : { picture: u }), s.length === 0 ? {} : { capitals: s[0] }), {}, { written: h && s.length <= 1 && s[0] !== "caps" && (i === void 0 || u === void 0) });
  return he(n ? {
    type: "pageReference",
    bookmark: n[2],
    relative: c
  } : {
    type: "pageCount",
    scope: r[1].toUpperCase() === "NUMPAGES" ? "document" : "section"
  }, E);
}, uc = (e) => new RegExp("^\\s*TOC\\b.*\\\\s\\b", "is").test(e), Ia = (e, { enclosing: t, within: r, inTextBox: n }, { estimate: a, sectionPageCount: i, blank: u, relativeTo: s }) => {
  const c = lc(e);
  if (c === void 0) return;
  const { bookmarks: h, pageCount: w, bookmarkPageNumbers: v } = a, { numberFormat: E, picture: m, capitals: d, written: y } = c, _ = E !== void 0 || m !== void 0, k = (S) => S === void 0 ? void 0 : m === void 0 ? Rn(E ?? "arabic")(S) : sc(S, m), x = c.type === "pageReference" && c.relative && r === "counted" && !n ? s?.(c.bookmark) : void 0;
  let T;
  return y ? c.type === "pageCount" ? T = k(c.scope === "document" ? w : i) : t.some(uc) ? T = void 0 : _ ? T = k(v?.get(c.bookmark)) : T = c.relative ? x : h.get(c.bookmark) : T = void 0, T === void 0 ? u ? "" : void 0 : oc(T, d);
}, cc = (e, t) => e === "mc:Fallback" || t === "fallback" ? "fallback" : e === "w:del" || e === "w:moveFrom" ? "deleted" : t, qt = (e, t, r, n, a = "counted", i = !1) => {
  for (let h = 0; h < t.length; h++) {
    const w = t[h], v = e.nameOf(w);
    if (v === void 0) continue;
    const E = r[r.length - 1];
    if (v === "w:fldChar") {
      const m = e.attributeOf(w, "w:fldCharType");
      m === "begin" ? r.push({
        begin: w,
        instruction: "",
        inResult: !1
      }) : m === "separate" && E ? (e.writeClean(E.begin, E.instruction), E.inResult = !0, E.result = n.resultOf(E.instruction, {
        within: a,
        enclosing: r.slice(0, -1).map((d) => d.instruction),
        inTextBox: i
      }), E.result !== void 0 && (t.splice(h + 1, 0, e.textElement(E.result)), h++)) : m === "end" && r.pop();
    } else if (v === "w:instrText" && E && !E.inResult) E.instruction += e.textOf(w);
    else if ((v === "w:t" || v === "w:tab" || v === "w:br" || v === "w:cr") && E?.result !== void 0)
      t.splice(h, 1), h--;
    else if (v === "w:fldSimple") {
      const m = n.resultOf(String(e.attributeOf(w, "w:instr")), {
        within: a,
        enclosing: r.map((d) => d.instruction),
        inTextBox: i
      });
      if (m === void 0) {
        var u;
        qt(e, (u = e.contentOf(w)) !== null && u !== void 0 ? u : [], [], n, a, i);
      } else e.setSimpleFieldResult(w, m);
    } else {
      var s;
      if (v === "w:p") {
        var c;
        (c = n.beforeParagraph) === null || c === void 0 || c.call(n, w);
      }
      qt(e, (s = e.contentOf(w)) !== null && s !== void 0 ? s : [], r, n, cc(v, a), i || v === "w:txbxContent"), v === "w:p" && n.afterParagraph(w);
    }
  }
}, Ra = (e, t) => t.flatMap((r) => {
  var n;
  const a = e.nameOf(r);
  return a === void 0 ? [] : a === "w:sectPr" ? [r] : Ra(e, (n = e.contentOf(r)) !== null && n !== void 0 ? n : []);
}), hc = (e, t) => {
  var r;
  return ((r = e.contentOf(t)) !== null && r !== void 0 ? r : []).some((n) => {
    var a;
    return e.nameOf(n) === "w:pPr" && ((a = e.contentOf(n)) !== null && a !== void 0 ? a : []).some((i) => e.nameOf(i) === "w:sectPr");
  });
}, fc = (e, t, r) => {
  const n = Ra(e, [t]).reduce((a, i) => {
    var u, s;
    const c = ((u = e.contentOf(i)) !== null && u !== void 0 ? u : []).flatMap((h) => {
      const w = e.nameOf(h);
      return w === "w:headerReference" || w === "w:footerReference" ? [[`${w} ${String(e.attributeOf(h, "w:type"))}`, String(e.attributeOf(h, "r:id"))]] : [];
    });
    return [...a, new Map([...(s = a[a.length - 1]) !== null && s !== void 0 ? s : [], ...c])];
  }, []).reduce((a, i, u) => {
    for (const c of i.values()) {
      var s;
      a.set(c, [...(s = a.get(c)) !== null && s !== void 0 ? s : [], r[u]]);
    }
    return a;
  }, /* @__PURE__ */ new Map());
  return new Map([...n].flatMap(([a, [i, ...u]]) => i !== void 0 && u.every((s) => s === i) ? [[a, i]] : []));
}, dc = (e, t, r, { blank: n }) => {
  const { sectionPageCounts: a = [], relativePositions: i } = r;
  let u = 0;
  const s = /* @__PURE__ */ new Map(), c = (h) => {
    var w, v;
    const E = (w = s.get(h)) !== null && w !== void 0 ? w : 0;
    return s.set(h, E + 1), i == null || (v = i.get(h)) === null || v === void 0 ? void 0 : v[E];
  };
  return qt(e, [t], [], {
    resultOf: (h, w) => Ia(h, w, {
      estimate: r,
      sectionPageCount: a[u],
      blank: n,
      relativeTo: c
    }),
    afterParagraph: (h) => {
      u += hc(e, h) ? 1 : 0;
    }
  }), fc(e, t, a);
}, pc = (e, t, r, { blank: n, sectionPageCount: a, notes: i = !1 }) => {
  const u = (s) => {
    const c = r.bookmarks.get(s);
    return c === void 0 ? void 0 : `on page ${c}`;
  };
  qt(e, [t], [], {
    resultOf: (s, c) => Ia(s, c, he({
      estimate: r,
      sectionPageCount: a,
      blank: n
    }, i ? { relativeTo: u } : {})),
    afterParagraph: () => {
    }
  });
}, mc = (e, t, { beforeParagraph: r, resultOf: n }) => qt(e, [t], [], {
  resultOf: (a, { within: i }) => n(a, i),
  beforeParagraph: r,
  afterParagraph: () => {
  }
}), Na = class extends ae {
  constructor(e = {}) {
    super("w:instrText"), Z(this, "properties", void 0), this.properties = e, this.root.push(new ot({ space: st.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((n) => `${n.styleName},${n.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, Oa = class extends ae {
  constructor() {
    super("w:sdtContent");
  }
}, Pa = (e) => e === void 0 ? ia() : Ut(e), Nn = /* @__PURE__ */ new WeakMap(), vc = (e, t) => {
  Nn.set(e, t);
}, wc = class {
  constructor() {
    Z(this, "ids", []);
  }
  get(e) {
    var t, r;
    return (r = (t = this.ids)[e]) !== null && r !== void 0 || (t[e] = ca()), this.ids[e];
  }
}, qe = (e) => typeof e == "object" && e !== null ? Object.keys(e)[0] : void 0, Xe = (e) => {
  const t = qe(e), r = t === void 0 ? void 0 : e[t];
  return Array.isArray(r) ? r : r === void 0 ? [] : [r];
}, je = (e, t) => Xe(e).find((r) => qe(r) === t), Be = (e, t) => {
  var r;
  return (r = je(e, "_attr")) === null || r === void 0 || (r = r._attr) === null || r === void 0 ? void 0 : r[t];
}, On = (e, t) => {
  const r = Be(e, t);
  return r === void 0 ? void 0 : Number(r);
}, gc = /* @__PURE__ */ new Set([
  "w:tbl",
  "w:tr",
  "w:tc",
  "w:sdt",
  "w:sdtContent",
  "w:customXml"
]), Fa = (e) => e.flatMap((t) => {
  const r = qe(t);
  return r === "w:p" || Nn.has(t) ? [t] : r !== void 0 && gc.has(r) ? Fa(Xe(t)) : [];
}), yc = /* @__PURE__ */ new Set([
  "w:r",
  "w:hyperlink",
  "w:ins",
  "w:moveTo",
  "w:smartTag",
  "w:customXml",
  "w:sdt",
  "w:sdtContent",
  "w:fldSimple",
  "w:dir",
  "w:bdo"
]), bc = (e) => {
  switch (qe(e)) {
    case "w:t":
      return Xe(e).filter((t) => typeof t == "string").join("");
    case "w:tab":
      return "	";
    case "w:br":
      return [void 0, "textWrapping"].includes(Be(e, "w:type")) ? `
` : "";
    case "w:cr":
      return `
`;
    case "w:noBreakHyphen":
      return "-";
    default:
      return "";
  }
}, _c = (e) => {
  const t = [], r = (n) => {
    const a = qe(n);
    if (a !== void 0 && yc.has(a)) return Xe(n).map(r).join("");
    if (a === "w:fldChar") {
      const i = Be(n, "w:fldCharType");
      return i === "begin" ? t.push(!1) : i === "separate" ? t[t.length - 1] = !0 : t.pop(), "";
    }
    return t.every(Boolean) ? bc(n) : "";
  };
  return Xe(e).map(r).join("");
}, Da = (e) => {
  const t = qe(e);
  return t === "w:bookmarkStart" ? [{
    start: !0,
    id: Be(e, "w:id"),
    name: Be(e, "w:name")
  }] : t === "w:bookmarkEnd" ? [{
    start: !1,
    id: Be(e, "w:id")
  }] : t === void 0 || t === "_attr" ? [] : Xe(e).flatMap(Da);
}, xc = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.map((r) => {
    const n = Da(r), a = /* @__PURE__ */ new Set([...t.values(), ...n.flatMap((i) => i.start ? [i.name] : [])]);
    for (const i of n) i.start ? t.set(i.id, i.name) : t.delete(i.id);
    return a;
  });
}, Ec = (e, t) => {
  const r = t ? xc(e) : [];
  return e.map((n, a) => {
    var i;
    const u = je(n, "w:pPr");
    return {
      element: n,
      styleId: Be(je(u, "w:pStyle"), "w:val"),
      outlineLevel: On(je(u, "w:outlineLvl"), "w:val"),
      text: _c(n),
      bookmarks: (i = r[a]) !== null && i !== void 0 ? i : /* @__PURE__ */ new Set()
    };
  });
}, La = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 || (t = t.Styles) === null || t === void 0 ? void 0 : t.prepForXml(e);
  return new Map(Xe(r).filter((n) => qe(n) === "w:style" && ["paragraph", void 0].includes(Be(n, "w:type"))).map((n) => [Be(n, "w:styleId"), {
    name: Be(je(n, "w:name"), "w:val"),
    basedOn: Be(je(n, "w:basedOn"), "w:val"),
    outlineLevel: On(je(je(n, "w:pPr"), "w:outlineLvl"), "w:val")
  }]));
}, Ba = (e) => {
  const t = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(e);
  return t ? [Number(t[1]), Number(t[2])] : void 0;
}, on = (e, [t, r]) => e >= t && e <= r, Pn = (e, t) => {
  var r, n;
  if (e === void 0) return;
  const a = /^heading ?([1-9])$/i.exec((r = (n = t.get(e)) === null || n === void 0 ? void 0 : n.name) !== null && r !== void 0 ? r : e);
  return a ? Number(a[1]) : void 0;
}, Ma = (e, t, r = 0) => {
  var n;
  if (e === void 0 || r > t.size) return;
  const a = t.get(e), i = Pn(e, t);
  return (n = a?.outlineLevel) !== null && n !== void 0 ? n : i === void 0 ? Ma(a?.basedOn, t, r + 1) : i - 1;
}, Tc = (e) => {
  const t = La(e);
  return (r) => {
    const n = je(r, "w:pPr"), a = Be(je(n, "w:pStyle"), "w:val"), i = Pn(a, t), u = Ua({
      styleId: a,
      outlineLevel: On(je(n, "w:outlineLvl"), "w:val")
    }, t), s = u === void 0 || u >= 9 ? void 0 : u + 1;
    return i !== void 0 && (s === void 0 || s === i) ? i : s === void 0 ? void 0 : "unclear";
  };
}, Ua = (e, t) => {
  var r;
  return (r = e.outlineLevel) !== null && r !== void 0 ? r : Ma(e.styleId, t);
}, Sc = (e, t, r) => {
  var n;
  const { entriesFromBookmark: a, headingStyleRange: i, stylesWithLevels: u = [], useAppliedParagraphOutlineLevel: s } = e;
  if (t.text.trim() === "" || a && !t.bookmarks.has(a)) return;
  const c = [t.styleId, t.styleId === void 0 || (n = r.get(t.styleId)) === null || n === void 0 ? void 0 : n.name].filter((d) => d !== void 0).map((d) => d.toLowerCase()), h = u.find((d) => c.includes(d.styleName.toLowerCase()));
  if (h) return h.level;
  const w = !!i || u.length > 0 || !!s || !!e.tcFieldIdentifier || !!e.tcFieldLevelRange || !!e.captionLabel || !!e.captionLabelIncludingNumbers, v = i ? Ba(i) : w ? void 0 : [1, 9], E = Pn(t.styleId, r);
  if (v && E !== void 0 && on(E, v)) return E;
  const m = s ? Ua(t, r) : void 0;
  return m !== void 0 && on(m + 1, v ?? [1, 9]) ? m + 1 : void 0;
}, Ac = (e, t) => {
  const r = t.preserveTabInEntries ? e : e.replace(/\t/g, " ");
  return (t.preserveNewLineInEntries ? r.split(`
`) : [r.replace(/\n/g, " ")]).map((n, a) => new Ie({
    break: a > 0 ? 1 : void 0,
    children: n.split("	").flatMap((i, u) => [...u > 0 ? [new Nr()] : [], ...i === "" ? [] : [i]])
  }));
}, kc = (e, t) => {
  var r;
  const n = (r = [...t].find(([, i]) => {
    var u;
    return ((u = i.name) === null || u === void 0 ? void 0 : u.toLowerCase()) === `toc ${e}`;
  })) === null || r === void 0 ? void 0 : r[0], a = n ?? `TOC${e}`;
  return n !== void 0 || t.has(a) || e === 1 ? { id: a } : {
    id: a,
    indent: (e - 1) * 220
  };
}, Cc = ({ properties: e, beginDirty: t, textWidth: r }, n, a, i) => {
  var u;
  const s = e.pageNumbersEntryLevelsRange ? (u = Ba(e.pageNumbersEntryLevelsRange)) !== null && u !== void 0 ? u : [1, 9] : void 0, c = new Oa();
  return n.forEach((h, w) => {
    const v = s === void 0 || !on(h.level, s), E = [...Ac(h.title, e), ...v ? [new Ie({ children: [e.entryAndPageNumberSeparator || new Nr()] }), new hh(h.bookmark, { hyperlink: e.hyperlink })] : []], m = kc(h.level, a);
    c.addChildElement(new be({
      style: m.id,
      indent: m.indent === void 0 ? void 0 : { left: m.indent },
      tabStops: [{
        type: "right",
        position: r,
        leader: "dot"
      }],
      children: [...w === 0 ? [new Me({ children: [
        Pa(t),
        new Na(e),
        mt()
      ] })] : [], ...e.hyperlink ? [new Ln({
        anchor: h.bookmark,
        children: E
      })] : E]
    }));
  }), c.addChildElement(new be({ children: [new Me({ children: [vt()] })] })), c.prepForXml(i);
}, Ic = (e, t, r, n) => {
  const a = Xe(e), i = a.findIndex((u) => qe(u) === "w:pPr") + 1;
  e["w:p"] = [
    ...a.slice(0, i),
    new Ga(t, r).prepForXml(n),
    ...a.slice(i),
    new Ka(r).prepForXml(n)
  ];
}, Rc = (e, t, r) => {
  const n = Fa(Xe(e)), a = n.flatMap((c) => {
    const h = Nn.get(c);
    return h ? [[c, h]] : [];
  });
  if (a.length === 0) return;
  const i = La(t), u = a.some(([, { properties: c }]) => !!c.entriesFromBookmark), s = Ec(n.filter((c) => qe(c) === "w:p"), u).map((c) => ({
    paragraph: c,
    levels: a.map(([, { properties: h }]) => Sc(h, c, i))
  })).filter(({ levels: c }) => c.some((h) => h !== void 0)).map((c, h) => he(he({}, c), {}, { id: r.get(h) }));
  for (const { paragraph: c, id: h } of s) Ic(c.element, `_Toc${h}`, h, t);
  a.forEach(([c, h], w) => {
    const v = s.flatMap(({ paragraph: E, levels: m, id: d }) => {
      const y = m[w];
      return y === void 0 ? [] : [{
        title: E.text,
        level: y,
        bookmark: `_Toc${d}`
      }];
    });
    v.length !== 0 && (c["w:sdt"] = Xe(c).map((E) => qe(E) === "w:sdtContent" ? Cc(h, v, i, t) : E));
  });
}, Nc = new RegExp("^\\p{L}[\\p{L}\\p{N}_]*$", "u"), Oc = (e) => {
  var t, r;
  let n, a = !1, i, u = !1, s = !1;
  for (let v = 0; v < e.length; v++) {
    var c, h;
    const E = e[v], m = (c = e[v + 1]) !== null && c !== void 0 ? c : "";
    let d;
    if (v === 0 && !E.startsWith("\\")) d = { type: "bookmark" };
    else if (E === "\\c" || E === "\\n") d = { type: E === "\\c" ? "repeat" : "next" };
    else if ((E === "\\r" || E === "\\s") && /^\d+$/.test(m))
      v++, d = E === "\\r" ? {
        type: "reset",
        to: Number(m)
      } : {
        type: "heading",
        level: Number(m)
      };
    else if (E === "\\h") a = !0;
    else if (E === "\\#" && v + 1 < e.length)
      v++, s = !0;
    else if (E === "\\*" && v + 1 < e.length) {
      const y = e[++v];
      if (Ca.has(y.toLowerCase())) u = !0;
      else if (!ka.has(y.toLowerCase())) {
        if (i !== void 0) return;
        i = y;
      }
    } else return;
    if (d && n) return;
    n = (h = d) !== null && h !== void 0 ? h : n;
  }
  if (n?.type === "bookmark" && e.length > 1) return;
  const w = !s && !(u && i !== void 0 && i.toLowerCase() !== "arabic");
  return {
    step: (t = n) !== null && t !== void 0 ? t : { type: "next" },
    hidden: a && i === void 0,
    format: w ? (r = i) !== null && r !== void 0 ? r : "ARABIC" : ""
  };
}, Fn = (e) => {
  var t;
  const r = new RegExp("^\\s*SEQ\\b(.*)$", "is").exec(e);
  if (!r) return;
  const [n, ...a] = (t = r[1].match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  if (n === void 0) return {};
  const i = n.replace(/^"(.*)"$/, "$1");
  return Nc.test(i) ? {
    identifier: i,
    sequence: Oc(a)
  } : { identifier: i };
}, Pc = (e) => Fn(e) !== void 0, ln = (e) => typeof e != "object" || e === null ? [] : Array.isArray(e) ? e.flatMap(ln) : Object.entries(e).flatMap(([t, r]) => [...(t === "w:instrText" && Array.isArray(r) ? r : t === "_attr" ? [r["w:instr"]] : []).flatMap((n) => {
  const a = typeof n == "string" ? Fn(n) : void 0;
  return a?.identifier === void 0 ? [] : [a.identifier.toLowerCase()];
}), ...ln(r)]), Fc = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 ? void 0 : t.Comments;
  if (!r) return /* @__PURE__ */ new Set();
  const n = {
    View: r,
    Relationships: r.Relationships
  };
  return new Set(ln(r.prepForXml(he(he({}, e), {}, {
    viewWrapper: n,
    stack: []
  }))));
}, Dc = (e) => {
  const t = Tc(e), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = [];
  let i = -1, u = -1, s;
  const c = (h, w) => {
    var v;
    const E = Math.max(-1, ...a.slice(1, w + 1).filter((y) => y !== void 0)), m = ((v = n.get(h)) !== null && v !== void 0 ? v : []).filter((y) => y.paragraph >= E), d = m.every(({ step: y }) => y?.type === "next" || y?.type === "heading" && y.level === w);
    return i > E || !d ? void 0 : m.length + 1;
  };
  return {
    startParagraph: (h) => {
      u++;
      const w = t(h);
      w === "unclear" ? i = u : w !== void 0 && (a[w] = u);
    },
    numberOf: (h, w) => {
      var v, E, m;
      const { identifier: d, sequence: y } = Fn(h);
      if (d === void 0 || w === "fallback") return;
      (v = s) !== null && v !== void 0 || (s = Fc(e));
      const _ = d.toLowerCase();
      if (y?.step.type === "bookmark" && w === "counted" && !s.has(_)) return;
      const k = r.has(_) ? r.get(_) : 0, x = s.has(_) || w === "deleted" ? void 0 : y?.step, T = x?.type === "reset" ? x.to : x?.type === "repeat" ? k : x?.type === "heading" ? c(_, x.level) : x?.type === "next" && k !== void 0 ? k + 1 : void 0;
      return r.set(_, T), n.set(_, [...(E = n.get(_)) !== null && E !== void 0 ? E : [], he({ paragraph: u }, T === void 0 ? {} : { step: x })]), T === void 0 || y === void 0 ? void 0 : y.hidden ? "" : (m = Rn(y.format)) === null || m === void 0 ? void 0 : m(T);
    }
  };
}, jr = (e) => {
  const t = typeof e == "object" && e !== null && !Array.isArray(e) ? Object.keys(e)[0] : void 0;
  return t === "_attr" ? void 0 : t;
}, ni = (e) => ({ "w:t": [{ _attr: { "xml:space": "preserve" } }, e] }), Rr = {
  nameOf: jr,
  contentOf: (e) => {
    const t = e[jr(e)];
    return Array.isArray(t) ? t : void 0;
  },
  attributeOf: (e, t) => {
    var r;
    const n = e[jr(e)], a = Array.isArray(n) ? n.find((i) => typeof i == "object" && i !== null && "_attr" in i) : n;
    return a == null || (r = a._attr) === null || r === void 0 ? void 0 : r[t];
  },
  textOf: (e) => Rr.contentOf(e).filter((t) => typeof t == "string").join(""),
  textElement: ni,
  writeClean: (e) => {
    if (ul(e)) {
      const t = e["w:fldChar"]._attr;
      e["w:fldChar"] = { _attr: Object.fromEntries(Object.entries(t).filter(([r]) => r !== "w:dirty")) };
    }
  },
  setSimpleFieldResult: (e, t) => {
    const r = e["w:fldSimple"];
    e["w:fldSimple"] = [...(Array.isArray(r) ? r : [r]).filter((n) => typeof n == "object" && n !== null && "_attr" in n), { "w:r": [ni(t)] }];
  }
}, Wa = /* @__PURE__ */ new WeakMap(), Lc = (e, t) => {
  const { startParagraph: r, numberOf: n } = Dc(t);
  mc(Rr, e, {
    beforeParagraph: (a) => r(a),
    resultOf: (a, i) => Pc(a) ? n(a, i) : void 0
  });
}, Bc = (e, t, r) => {
  const n = r(e, t), a = dc(Rr, e, n, { blank: !1 });
  t.file && Wa.set(t.file, {
    estimate: n,
    partPageCounts: a
  });
}, tr = (e, t, r) => {
  const n = t.file && Wa.get(t.file);
  if (!e || !n) return;
  const a = r === void 0 ? void 0 : n.partPageCounts.get(`rId${r}`), i = "w:footnotes" in e || "w:endnotes" in e;
  pc(Rr, e, n.estimate, {
    blank: !1,
    sectionPageCount: a,
    notes: i
  });
}, Mc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Re = class ja extends ae {
  constructor() {
    super("Relationships"), this.root.push(new Mc({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(t, r, n, a) {
    this.root.push(Wu(`rId${t}`, r, n, a));
  }
  /**
  * Creates a copy of the relationships given. Relationships added to the copy aren't added to them, so the compiler
  * adds the ones it writes for a part, such as to its images, to a copy, and packing a document again doesn't add
  * them a second time.
  *
  * Static, as `IContext` is public and has `Relationships`, so a new instance member would change the public API.
  *
  * @param relationships - The relationships to copy
  */
  static copy(t) {
    const r = new ja();
    return r.root.push(...t.root.slice(1)), r;
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, Uc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, Wc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
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
}, ii = class extends ae {
  constructor({ id: e, initials: t, author: r, date: n = /* @__PURE__ */ new Date(), children: a }, i) {
    super("w:comment"), Z(this, "paraId", void 0), this.paraId = i, this.root.push(new Uc({
      id: e,
      initials: t,
      author: r,
      date: n.toISOString()
    }));
    for (const u of a) this.root.push(u);
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
      const a = r[n];
      if (a && typeof a == "object" && "w:p" in a) {
        const i = a["w:p"];
        Array.isArray(i) && i.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, jc = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), zc = class extends ae {
  constructor({ children: e }) {
    super("w:comments"), Z(this, "relationships", void 0), Z(this, "threadData", void 0), Z(this, "commentIdsData", void 0), Z(this, "isEmpty", void 0), this.isEmpty = e.length === 0, this.root.push(new Wc({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
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
      const n = new Map(e.map((a) => [a.id, jc(a.id)]));
      for (const a of e) this.root.push(new ii(a, n.get(a.id)));
      t && (this.threadData = e.map((a) => ({
        paraId: n.get(a.id),
        parentParaId: a.parentId !== void 0 ? n.get(a.parentId) : void 0,
        done: a.resolved
      }))), r && (this.commentIdsData = e.map((a) => {
        var i;
        return {
          paraId: n.get(a.id),
          durableId: (i = a.durableId) !== null && i !== void 0 ? i : n.get(a.id)
        };
      }));
    } else for (const n of e) this.root.push(new ii(n));
    this.relationships = new Re();
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
  /**
  * Formats the comments, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Hc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, $c = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, Gc = class extends ae {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new $c({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, Kc = class extends ae {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new Hc({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new Gc(t));
  }
}, Vc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      paraId: "w16cid:paraId",
      durableId: "w16cid:durableId"
    });
  }
}, qc = class extends ae {
  constructor(e) {
    super("w16cid:commentId"), this.root.push(new Vc({
      paraId: e.paraId,
      durableId: e.durableId
    }));
  }
}, Xc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:mc": "xmlns:mc",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Zc = class extends ae {
  constructor(e) {
    super("w16cid:commentsIds"), this.root.push(new Xc({
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "w16cid"
    }));
    for (const t of e) this.root.push(new qc(t));
  }
}, Yc = class extends Yi {
  constructor() {
    super("w:endnoteRef");
  }
}, Nr = class extends Yi {
  constructor() {
    super("w:tab");
  }
}, dr = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, un = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, dt = {
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
}, Jc = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, Qc = class extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(new Jc({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, eh = class extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}, Tt = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, th = ({ after: e, before: t, line: r, lineRule: n, beforeAutoSpacing: a, afterAutoSpacing: i }) => new se({
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
      value: a
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: i
    }
  }
}), gt = {
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
}, jt = (e) => new se({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), De = {
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
}, Lt = {
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
}, rh = ({ type: e, position: t, leader: r }) => new se({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    pos: {
      key: "w:pos",
      value: Ve(t)
    },
    leader: {
      key: "w:leader",
      value: r
    }
  }
}), nh = (e) => new se({
  name: "w:tabs",
  children: e.map((t) => rh(t))
}), zr = class extends ae {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new ih(t)), this.root.push(new ah(e));
  }
}, ih = class extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Pe({ val: e }));
  }
}, ah = class extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(new Pe({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, Dn = class extends ae {
  constructor(...e) {
    super(...e), Z(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, sh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, Or = class extends ae {
  /**
  * @param children - Inline content of the hyperlink
  * @param relationshipId - Id of the external relationship, without the rId prefix
  * @param anchor - Bookmark name or external URL fragment
  * @param externalLink - The full address of an external hyperlink, so the relationship id is kept alongside its anchor
  */
  constructor(e, t, r, n) {
    super("w:hyperlink"), Z(this, "linkId", void 0), Z(this, "drawingLink", void 0), this.linkId = t, this.drawingLink = r && n !== void 0 ? new xa(n) : void 0;
    const a = new sh({
      history: 1,
      anchor: r || void 0,
      id: !r || n !== void 0 ? `rId${this.linkId}` : void 0
    });
    this.root.push(a), e.forEach((i) => {
      this.root.push(i);
    });
  }
  /**
  * Creates the `a:hlinkClick` of a picture in the hyperlink, which links to the same address.
  *
  * The hyperlink decides which relationship its pictures use, rather than the pictures reading `linkId`, because only it
  * knows whether that relationship has lost the fragment to `w:anchor`. The picture's relationship is added as the
  * picture is written, through the context's relationships, so it lands in the part the picture is in, both when
  * packing and when patching.
  *
  * @param context - The context the picture is written in, whose relationships get the picture's link if it has its own
  * @param declareNamespace - Declares the DrawingML namespace, for elements outside `a:graphic` such as `wp:docPr`
  */
  createDrawingClick(e, t) {
    return this.drawingLink ? (this.drawingLink.addRelationship(e), this.drawingLink.createClick(t)) : _a(this.linkId, t);
  }
}, Ln = class extends Or {
  constructor(e) {
    super(e.children, In(), e.anchor);
  }
}, za = class extends ae {
  constructor(e) {
    super("w:externalHyperlink"), Z(this, "options", void 0), this.options = e;
  }
}, oh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, lh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { id: "w:id" });
  }
}, Ha = class $a {
  constructor(t) {
    Z(this, "start", void 0), Z(this, "children", void 0), Z(this, "end", void 0);
    const r = ca();
    this.start = new Ga(t.id, r), this.children = t.children, this.end = new Ka(r);
  }
  /**
  * The components written in this bookmark's place: its start, its children and its end. A bookmark in its
  * children is written the same way, so one bookmark can hold another.
  *
  * @internal
  */
  get writtenAs() {
    return [
      this.start,
      ...this.children.flatMap((t) => t instanceof $a ? t.writtenAs : [t]),
      this.end
    ];
  }
}, Ga = class extends ae {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new oh({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, Ka = class extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new lh({ id: e });
    this.root.push(t);
  }
}, uh = (e) => new se({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), ch = class extends ae {
  constructor(e, t = {}) {
    super("w:instrText"), this.root.push(new ot({ space: st.PRESERVE }));
    let r = `PAGEREF ${e}`;
    t.hyperlink && (r = `${r} \\h`), t.useRelativePosition && (r = `${r} \\p`), this.root.push(r);
  }
}, hh = class extends Me {
  constructor(e, t = {}) {
    super({ children: [
      ia(),
      new ch(e, t),
      mt(),
      vt()
    ] });
  }
}, fh = 255, dh = (e) => {
  const t = e.indexOf("#"), r = e.length - t - 1;
  return t > 0 && r > 0 && r <= fh ? {
    target: e.slice(0, t),
    anchor: e.slice(t + 1)
  } : { target: e };
}, ur = ({ id: e, fontKey: t, subsetted: r }, n) => new se({
  name: n,
  attributes: he({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t.toUpperCase()}}`
  } } : {}),
  children: [...r ? [new ce("w:subsetted", r)] : []]
}), ph = ({ name: e, altName: t, panose1: r, charset: n, family: a, notTrueType: i, pitch: u, sig: s, embedRegular: c, embedBold: h, embedItalic: w, embedBoldItalic: v }) => new se({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [Ot("w:altName", t)] : [],
    ...r ? [Ot("w:panose1", r)] : [],
    ...n ? [Ot("w:charset", n)] : [],
    Ot("w:family", a),
    ...i ? [new ce("w:notTrueType", i)] : [],
    Ot("w:pitch", u),
    ...s ? [new se({
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
    ...c ? [ur(c, "w:embedRegular")] : [],
    ...h ? [ur(h, "w:embedBold")] : [],
    ...w ? [ur(w, "w:embedItalic")] : [],
    ...v ? [ur(v, "w:embedBoldItalic")] : []
  ]
}), mh = ({ name: e, characterSet: t, embedRegular: r, embedBold: n, embedItalic: a, embedBoldItalic: i }) => ph({
  name: e,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: t,
  family: "auto",
  pitch: "variable",
  embedRegular: r,
  embedBold: n,
  embedItalic: a,
  embedBoldItalic: i
}), vh = (e) => new se({
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
  children: e.map(mh)
}), wh = [
  {
    option: "data",
    element: "embedRegular",
    bold: !1,
    italic: !1
  },
  {
    option: "bold",
    element: "embedBold",
    bold: !0,
    italic: !1
  },
  {
    option: "italic",
    element: "embedItalic",
    bold: !1,
    italic: !0
  },
  {
    option: "boldItalic",
    element: "embedBoldItalic",
    bold: !0,
    italic: !0
  }
], Va = class {
  constructor(e) {
    Z(this, "options", void 0), Z(this, "fontTable", void 0), Z(this, "relationships", void 0), Z(
      this,
      /** @deprecated Use `files`, which has the file and key of each face a font embeds, not only the regular face's key */
      "fontOptionsWithKey",
      []
    ), Z(
      this,
      /** The files of the faces the fonts embed, in order: the Nth is `fonts/font<N>.odttf`, with the relationship `rId<N>` */
      "files",
      []
    ), this.options = e;
    const t = e.map((r) => wh.flatMap(({ option: n, element: a, bold: i, italic: u }) => {
      const s = r[n];
      return s ? [{
        element: a,
        file: {
          name: r.name,
          data: s,
          bold: i,
          italic: u,
          fontKey: $l()
        }
      }] : [];
    }));
    this.files = t.flatMap((r) => r.map(({ file: n }) => n)), this.fontOptionsWithKey = e.map((r, n) => he(he({}, r), {}, { fontKey: t[n][0].file.fontKey })), this.fontTable = vh(e.map((r, n) => he({
      name: r.name,
      characterSet: r.characterSet
    }, Object.fromEntries(t[n].map(({ element: a, file: i }) => [a, {
      id: `rId${this.files.indexOf(i) + 1}`,
      fontKey: i.fontKey
    }]))))), this.relationships = new Re();
    for (let r = 0; r < this.files.length; r++) this.relationships.addRelationship(r + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${r + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, gh = () => new se({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), yh = (e) => {
  var t, r;
  return new se({
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
}, bh = {
  left: "right",
  right: "left"
}, St = class extends nt {
  /**
  * Creates paragraph properties.
  *
  * @param options - The paragraph formatting to emit
  * @param config - Controls how the element is assembled; see {@link IParagraphPropertiesConfig}
  */
  constructor(e, { implicitListParagraphStyle: t = !0 } = {}) {
    if (super("w:pPr", e?.includeIfEmpty), Z(this, "numberingReferences", []), !e) return this;
    if (e.heading && this.push(jt(e.heading)), t && (e.bullet && this.push(jt("ListParagraph")), e.numbering && !e.numbering.custom && !e.style && !e.heading && this.push(jt("ListParagraph"))), e.style && this.push(jt(e.style)), e.keepNext !== void 0 && this.push(new ce("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ce("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new eh()), e.frame && this.push(yh(e.frame)), e.widowControl !== void 0 && this.push(new ce("w:widowControl", e.widowControl)), e.bullet && this.push(new zr(1, e.bullet.level)), e.numbering) {
      const { reference: n, instance: a = 0, level: i } = e.numbering, u = typeof n == "string" ? n : n.reference;
      this.numberingReferences.push({
        reference: u,
        instance: a,
        definition: typeof n == "string" ? void 0 : n
      }), this.push(new zr(`${u}-${a}`, i));
    } else e.numbering === !1 && this.push(new zr(0, 0));
    e.border && this.push(new il(e.border)), e.thematicBreak && this.push(new al()), e.shading && this.push(Cr(e.shading)), e.wordWrap && this.push(gh()), e.overflowPunctuation && this.push(new ce("w:overflowPunct", e.overflowPunctuation));
    const r = [
      ...e.rightTabStop !== void 0 ? [{
        type: De.RIGHT,
        position: e.rightTabStop
      }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{
        type: De.LEFT,
        position: e.leftTabStop
      }] : []
    ];
    r.length > 0 && this.push(nh(r)), e.bidirectional !== void 0 && this.push(new ce("w:bidi", e.bidirectional)), e.spacing && this.push(th(e.spacing)), e.indent && this.push(sl(e.indent)), e.contextualSpacing !== void 0 && this.push(new ce("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Ji(e.bidirectional && bh[e.alignment] || e.alignment)), e.outlineLevel !== void 0 && this.push(uh(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ce("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ce("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Al(e.run)), e.revision && this.push(new ai(e.revision));
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
  * Adds the section properties (`w:sectPr`) of the section this paragraph ends.
  *
  * They go after the paragraph's run properties and before its revision (`w:pPrChange`),
  * the order CT_PPr gives them.
  *
  * @param sectionProperties - The properties of the section the paragraph ends
  */
  addSectionProperties(e) {
    const t = this.root.findIndex((r) => r instanceof ai);
    if (t === -1) {
      this.root.push(e);
      return;
    }
    this.root.splice(t, 0, e);
  }
  /**
  * Removes the section properties added with {@link addSectionProperties}.
  *
  * @param sectionProperties - The properties of the section to remove
  */
  removeSectionProperties(e) {
    const t = this.root.indexOf(e);
    t !== -1 && this.root.splice(t, 1);
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
    if (!(e.viewWrapper instanceof Va)) for (const { reference: t, instance: r, definition: n } of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t, r, n);
    return super.prepForXml(e);
  }
}, ai = class extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new St(he(he({}, e), {}, { includeIfEmpty: !0 })));
  }
}, be = class extends Dn {
  constructor(e) {
    if (super("w:p"), Z(this, "properties", void 0), typeof e == "string")
      return this.properties = new St({}), this.root.push(this.properties), this.root.push(new Ie(e)), this;
    if (this.properties = new St(e), this.root.push(this.properties), e.text && this.root.push(new Ie(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Ha) {
        this.root.push(...t.writtenAs);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof za) {
      const r = this.root.indexOf(t), { target: n, anchor: a } = dh(t.options.link), i = new Or(t.options.children, In(), a, t.options.link);
      e.viewWrapper.Relationships.addRelationship(i.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", n, ba.EXTERNAL), this.root[r] = i;
    }
    return super.prepForXml(e);
  }
  /**
  * Ends a section at this paragraph by adding the section's properties to the paragraph's properties,
  * as Word does with the last paragraph of each section but the last.
  *
  * The body adds them only while it is written and removes them afterwards with
  * {@link removeSectionProperties}, so the same paragraph can be used in other documents.
  *
  * @internal
  * @param sectionProperties - The properties of the section the paragraph ends
  */
  addSectionProperties(e) {
    this.properties.addSectionProperties(e);
  }
  /**
  * Removes the section properties added with {@link addSectionProperties}.
  *
  * @internal
  * @param sectionProperties - The properties of the section to remove
  */
  removeSectionProperties(e) {
    this.properties.removeSectionProperties(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
};
function _h(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.includes(n)) continue;
    r[n] = e[n];
  }
  return r;
}
function qa(e, t) {
  if (e == null) return {};
  var r, n, a = _h(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
var xh = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, Eh = he(he({}, xh), {}, { BOTH: "both" }), zt = Eh, Xa = (e) => new se({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), Th = ({ space: e, count: t, separate: r, equalWidth: n, children: a }) => new se({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : Ce(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : Te(t)
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
  children: !n && a ? a : void 0
}), Sh = ({ type: e, linePitch: t, charSpace: r }) => new se({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: Te(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? Te(r) : void 0
    }
  }
}), xt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, si = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, Hr = (e, t) => new se({
  name: e,
  attributes: {
    type: {
      key: "w:type",
      value: t.type || xt.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${t.id}`
    }
  }
}), Ah = ({ countBy: e, start: t, restart: r, distance: n }) => new se({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : Te(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : Te(t)
    },
    restart: {
      key: "w:restart",
      value: r
    },
    distance: {
      key: "w:distance",
      value: n === void 0 ? void 0 : Ce(n)
    }
  }
}), Za = ({ name: e, position: t, numberFormat: r, start: n, restart: a }) => new se({
  name: e,
  children: [
    ...t === void 0 ? [] : [new se({
      name: "w:pos",
      attributes: { val: {
        key: "w:val",
        value: t
      } }
    })],
    ...r ? [new se({
      name: "w:numFmt",
      attributes: {
        val: {
          key: "w:val",
          value: r.type
        },
        format: {
          key: "w:format",
          value: r.format
        }
      }
    })] : [],
    ...n === void 0 ? [] : [new se({
      name: "w:numStart",
      attributes: { val: {
        key: "w:val",
        value: Te(n)
      } }
    })],
    ...a === void 0 ? [] : [new se({
      name: "w:numRestart",
      attributes: { val: {
        key: "w:val",
        value: a
      } }
    })]
  ]
}), kh = (e) => Za(he({ name: "w:footnotePr" }, e)), Ch = (e) => Za(he({ name: "w:endnotePr" }, e)), oi = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, Ih = class extends nt {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new oi({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new oi({})), e.pageBorderTop && this.root.push(Ae("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(Ae("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(Ae("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(Ae("w:right", e.pageBorderRight));
  }
}, Rh = (e, t, r, n, a, i, u) => new se({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: Ve(e)
    },
    right: {
      key: "w:right",
      value: Ce(t)
    },
    bottom: {
      key: "w:bottom",
      value: Ve(r)
    },
    left: {
      key: "w:left",
      value: Ce(n)
    },
    header: {
      key: "w:header",
      value: Ce(a)
    },
    footer: {
      key: "w:footer",
      value: Ce(i)
    },
    gutter: {
      key: "w:gutter",
      value: Ce(u)
    }
  }
}), Nh = {
  /** En dash separator (–), written as `enDash` */
  EN_DASH: "endash"
}, Oh = ({ start: e, formatType: t, separator: r, chapterHeadingLevel: n }) => new se({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : Te(e)
    },
    formatType: {
      key: "w:fmt",
      value: t
    },
    separator: {
      key: "w:chapSep",
      value: r === Nh.EN_DASH ? "enDash" : r
    },
    chapterHeadingLevel: {
      key: "w:chapStyle",
      value: n === void 0 ? void 0 : Te(n)
    }
  }
}), br = {
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
}, Ph = ({ width: e, height: t, orientation: r, code: n }) => {
  const a = Ce(e), i = Ce(t);
  return new se({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === br.LANDSCAPE ? i : a
      },
      height: {
        key: "w:h",
        value: r === br.LANDSCAPE ? a : i
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
}, Fh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, Dh = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Fh({ val: e }));
  }
}, Lh = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Bh = (e) => new se({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Ge = {
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
}, pr = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: br.PORTRAIT
}, cn = class Ya extends ae {
  constructor({ page: { size: { width: t = pr.WIDTH, height: r = pr.HEIGHT, orientation: n = pr.ORIENTATION, code: a } = {}, margin: { top: i = Ge.TOP, right: u = Ge.RIGHT, bottom: s = Ge.BOTTOM, left: c = Ge.LEFT, header: h = Ge.HEADER, footer: w = Ge.FOOTER, gutter: v = Ge.GUTTER } = {}, pageNumbers: E = {}, borders: m, textDirection: d } = {}, grid: { linePitch: y = 360, charSpace: _, type: k } = {}, headerWrapperGroup: x = {}, footerWrapperGroup: T = {}, lineNumbers: S, titlePage: A, verticalAlign: b, column: P, type: M, footnoteProperties: R, endnoteProperties: K, revision: ee } = {}) {
    super("w:sectPr"), Z(
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
    ), this.availableTextWidth = Ya.calculateAvailableTextWidth({
      pageWidth: n === br.LANDSCAPE ? r : t,
      left: c,
      right: u,
      gutter: v,
      column: P
    }), this.addHeaderFooterGroup(si.HEADER, x), this.addHeaderFooterGroup(si.FOOTER, T), R && this.root.push(kh(R)), K && this.root.push(Ch(K)), M && this.root.push(Bh(M)), this.root.push(Ph({
      width: t,
      height: r,
      orientation: n,
      code: a
    })), this.root.push(Rh(i, u, s, c, h, w, v)), m && this.root.push(new Ih(m)), S && this.root.push(Ah(S)), this.root.push(Oh(E)), P && this.root.push(Th(P)), b && this.root.push(Xa(b)), A !== void 0 && this.root.push(new ce("w:titlePg", A)), d && this.root.push(new Dh(d)), this.root.push(Sh({
      linePitch: y,
      charSpace: _,
      type: k
    })), ee && this.root.push(new Mh(ee));
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
  static calculateAvailableTextWidth({ pageWidth: t, left: r, right: n, gutter: a, column: i }) {
    var u, s;
    const c = bt(t) - bt(r) - bt(n) - bt(a), h = (u = i?.count) !== null && u !== void 0 ? u : 1;
    return h <= 1 ? c : (c - bt((s = i?.space) !== null && s !== void 0 ? s : 720) * (h - 1)) / h;
  }
  addHeaderFooterGroup(t, r) {
    r.default && this.root.push(Hr(t, {
      type: xt.DEFAULT,
      id: r.default.View.ReferenceId
    })), r.first && this.root.push(Hr(t, {
      type: xt.FIRST,
      id: r.first.View.ReferenceId
    })), r.even && this.root.push(Hr(t, {
      type: xt.EVEN,
      id: r.even.View.ReferenceId
    }));
  }
}, Mh = class extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new cn(e));
  }
}, Ja = class extends ae {
  constructor({ pageNumbers: e } = {}) {
    super("w:body"), Z(this, "sections", []), Z(
      this,
      /**
      * Section properties that were moved into a paragraph at the end of their section
      * by {@link addSection}, keyed by that paragraph. Used to find the section that
      * governs a given child of the body, and to write each section's properties into
      * its paragraph while the body is written.
      */
      "sectionParagraphs",
      /* @__PURE__ */ new Map()
    ), Z(this, "headingBookmarkIds", new wc()), Z(this, "pageNumbers", void 0), this.pageNumbers = e;
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
    const t = e ? Math.max(this.root.indexOf(e), 0) : 0;
    for (let r = t; r < this.root.length; r++) {
      const n = this.root[r];
      if (n instanceof cn) return n;
      const a = this.sectionParagraphs.get(n);
      if (a) return a;
    }
    return this.sections[this.sections.length - 1];
  }
  /**
  * Adds new section properties to the document body.
  *
  * Creates a new section by moving the previous section's properties into the last
  * paragraph of that section, and then adding the new section as the current section.
  * When that section doesn't end with a paragraph of its own (it ends with a table, or
  * it is empty), an empty paragraph is added to hold its properties.
  *
  * According to the OOXML specification:
  * - Section properties for all sections except the last must be stored in a paragraph's
  *   properties (pPr/sectPr) at the end of each section
  * - The last section's properties are stored as a direct child of the body element (w:body/w:sectPr)
  *
  * @param options - Section properties configuration (page size, margins, headers, footers, etc.)
  */
  addSection(e) {
    const t = this.sections.pop(), r = this.lastParagraphOfSection();
    if (t && r) this.sectionParagraphs.set(r, t);
    else {
      const n = this.createSectionParagraph();
      this.root.push(n), t && this.sectionParagraphs.set(n, t);
    }
    this.sections.push(new cn(e));
  }
  /**
  * Prepares the body element for XML serialization.
  *
  * Ensures that the last section's properties are placed as a direct child of the body
  * element, as required by the OOXML specification. Once the body is written, its tables
  * of contents are filled in from its headings, and, when the body has a page number
  * estimator, its page references are given their page numbers. Its SEQ fields are given
  * their numbers after the tables of contents are filled in, as Word leaves a heading's SEQ
  * number out of its entry.
  *
  * @param context - The XML serialization context
  * @returns The prepared XML object or undefined
  */
  prepForXml(e) {
    this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop()));
    for (const [r, n] of this.sectionParagraphs) r.addSectionProperties(n);
    let t;
    try {
      t = super.prepForXml(e);
    } finally {
      for (const [r, n] of this.sectionParagraphs) r.removeSectionProperties(n);
    }
    return Rc(t, e, this.headingBookmarkIds), this.pageNumbers && (Lc(t, e), Bc(t, e, this.pageNumbers)), t;
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
    const t = e instanceof be ? this.sectionParagraphs.get(e) : void 0;
    if (t) {
      const r = this.createSectionParagraph();
      this.root.splice(this.root.indexOf(e) + 1, 0, r), this.sectionParagraphs.delete(e), this.sectionParagraphs.set(r, t);
    }
    this.root.push(e);
  }
  /**
  * The paragraph the current section ends with, which can hold its properties.
  *
  * There is none when the section ends with something other than a paragraph, or is empty:
  * its last child is then the placeholder at the start of the body (removed when the body is
  * written) or the paragraph that ends the section before, which has properties of its own.
  */
  lastParagraphOfSection() {
    const e = this.root[this.root.length - 1];
    return e instanceof be && e !== this.root[0] && !this.sectionParagraphs.has(e) && this.root.indexOf(e) === this.root.length - 1 ? e : void 0;
  }
  /**
  * An empty paragraph to end a section that has no paragraph of its own to end it. The section's
  * properties are written into it with the others, when the body is written.
  */
  createSectionParagraph() {
    return new be({});
  }
}, Oe = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
}, Xt = (e, { type: t = Oe.AUTO, size: r }) => {
  let n = r;
  return t === Oe.PERCENTAGE && typeof r == "number" && (n = Math.round(r * 50)), new se({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: Zi(n)
      }
    }
  });
}, mr = pr.WIDTH - Ge.LEFT - Ge.RIGHT - Ge.GUTTER, Qa = (e) => e.options.columnSpan || 1, Bn = (e, t) => {
  if (!e) return;
  const { type: r = Oe.AUTO, size: n } = e;
  if (r !== Oe.PERCENTAGE && r !== Oe.DXA) return;
  const a = typeof n == "number" ? r === Oe.PERCENTAGE ? n / 100 * t : n : n.endsWith("%") ? Number(n.slice(0, -1)) / 100 * t : bt(n);
  return a > 0 ? a : void 0;
}, Uh = (e, t) => {
  var r;
  return (r = Bn(e, t)) !== null && r !== void 0 ? r : t;
}, Wh = (e) => Math.max(0, ...e.map((t) => t.cells.reduce((r, n) => r + Qa(n), 0))), li = ({ rows: e, width: t, availableWidth: r }) => {
  const n = Wh(e);
  if (n === 0) return [];
  const a = Uh(t, r), i = Array.from({ length: n }, () => {
  }), u = [];
  for (const w of e) {
    let v = 0;
    for (const E of w.cells) {
      const m = Qa(E), d = Bn(E.options.width, a);
      if (d !== void 0)
        if (m === 1) {
          var s, c;
          (c = i[s = v]) !== null && c !== void 0 || (i[s] = d);
        } else u.push({
          start: v,
          span: m,
          width: d
        });
      v += m;
    }
  }
  for (const { start: w, span: v, width: E } of u) {
    const m = Array.from({ length: v }, (_, k) => w + k).filter((_) => _ < n), d = m.filter((_) => i[_] === void 0), y = E - m.reduce((_, k) => {
      var x;
      return _ + ((x = i[k]) !== null && x !== void 0 ? x : 0);
    }, 0);
    if (d.length > 0 && y > 0) for (const _ of d) i[_] = y / d.length;
  }
  const h = i.flatMap((w, v) => w === void 0 ? [v] : []);
  if (h.length > 0) {
    const w = a - i.reduce((E, m) => E + (m ?? 0), 0), v = w > 0 ? w / h.length : a / n;
    for (const E of h) i[E] = v;
  }
  return i.map((w) => Math.round(w));
}, jh = (e) => new se({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: Ce(e)
  } } : void 0
}), vr = class extends ae {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(jh(r));
    t && this.root.push(new Hh(t));
  }
}, zh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { id: "w:id" });
  }
}, Hh = class extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new zh({ id: e.id })), this.root.push(new vr(e.columnWidths));
  }
}, $h = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Gh = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Kh = class extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Vh = class extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, qh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Xh = class extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new qh(e));
  }
}, es = ({ marginUnitType: e = Oe.DXA, top: t, left: r, bottom: n, right: a }) => [
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
    size: a
  }
].filter((i) => i.size !== void 0).map(({ name: i, size: u }) => Xt(i, {
  type: e,
  size: u
})), Zh = (e) => {
  const t = es(e);
  if (t.length !== 0)
    return new se({
      name: "w:tblCellMar",
      children: t
    });
}, Yh = (e) => {
  const t = es(e);
  if (t.length !== 0)
    return new se({
      name: "w:tcMar",
      children: t
    });
}, Jh = class extends nt {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(Ae("w:top", e.top)), e.start && this.root.push(Ae("w:start", e.start)), e.left && this.root.push(Ae("w:left", e.left)), e.bottom && this.root.push(Ae("w:bottom", e.bottom)), e.end && this.root.push(Ae("w:end", e.end)), e.right && this.root.push(Ae("w:right", e.right));
  }
}, Qh = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, ef = class extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new Qh({ val: Te(e) }));
  }
}, ts = {
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
}, tf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, ui = class extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(new tf({ val: e }));
  }
}, rf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, nf = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new rf({ val: e }));
  }
}, rs = class extends nt {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), Z(this, "hasWidth", void 0), Z(this, "hasColumnWidth", !1), this.hasWidth = e.width !== void 0, e.width && this.root.push(Xt("w:tcW", e.width)), e.columnSpan && this.root.push(new ef(e.columnSpan)), e.verticalMerge ? this.root.push(new ui(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new ui(ts.RESTART)), e.borders && this.root.push(new Jh(e.borders)), e.shading && this.root.push(Cr(e.shading)), e.margins) {
      const t = Yh(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new nf(e.textDirection)), e.verticalAlign && this.root.push(Xa(e.verticalAlign)), e.insertion && this.root.push(new Kh(e.insertion)), e.deletion && this.root.push(new Vh(e.deletion)), e.cellMerge && this.root.push(new Xh(e.cellMerge)), e.revision && this.root.push(new af(e.revision));
  }
  /**
  * Gives a cell without a width of its own the width of the table's columns it spans, in twips.
  *
  * @internal
  */
  setColumnWidth(e) {
    this.hasWidth || (this.root.splice(0, this.hasColumnWidth ? 1 : 0, Xt("w:tcW", {
      size: e,
      type: Oe.DXA
    })), this.hasColumnWidth = !0);
  }
}, af = class extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new rs(he(he({}, e), {}, { includeIfEmpty: !0 })));
  }
}, _r = class extends ae {
  constructor(e) {
    super("w:tc"), Z(
      this,
      /**
      * The options the cell was created with.
      *
      * Its borders and shading are declared with hex colors, as they were before they took colors of the document's
      * theme, so that code reading them still compiles. A cell given a theme color has it here as it was given.
      */
      "options",
      void 0
    ), Z(this, "properties", void 0), this.options = e, this.properties = new rs(e), this.root.push(this.properties);
    for (const t of e.children) this.root.push(t);
  }
  /**
  * Gives the cell, unless it has a width of its own, the width of the table's columns it spans, in twips.
  *
  * @internal
  */
  setColumnWidth(e) {
    this.properties.setColumnWidth(e);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof be || this.root.push(new be({})), super.prepForXml(e);
  }
}, hn = (e, t) => t ? new ce(e) : new rt(e, "off"), yt = {
  style: Le.NONE,
  size: 0,
  color: "auto"
}, sf = {
  style: Le.SINGLE,
  size: 4,
  color: "auto"
}, ns = class extends nt {
  constructor(e, { fillMissingSides: t = !0 } = {}) {
    super("w:tblBorders");
    const r = [
      ["w:top", e.top],
      ["w:left", e.left],
      ["w:bottom", e.bottom],
      ["w:right", e.right],
      ["w:insideH", e.insideHorizontal],
      ["w:insideV", e.insideVertical]
    ];
    for (const [n, a] of r) {
      const i = a ?? (t ? sf : void 0);
      i && this.root.push(Ae(n, i));
    }
  }
};
Z(ns, "NONE", {
  top: yt,
  bottom: yt,
  left: yt,
  right: yt,
  insideHorizontal: yt,
  insideVertical: yt
});
var of = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: n, absoluteVerticalPosition: a, relativeVerticalPosition: i, bottomFromText: u, topFromText: s, leftFromText: c, rightFromText: h }) => new se({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: c === void 0 ? void 0 : Ce(c)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: h === void 0 ? void 0 : Ce(h)
    },
    topFromText: {
      key: "w:topFromText",
      value: s === void 0 ? void 0 : Ce(s)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: u === void 0 ? void 0 : Ce(u)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : Ve(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: a === void 0 ? void 0 : Ve(a)
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
}), $r = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, lf = (e) => new se({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), uf = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, is = ({ type: e = uf.DXA, value: t }) => new se({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: Zi(t)
    }
  }
}), cf = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: n, noHBand: a, noVBand: i }) => new se({
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
      value: a
    },
    noVBand: {
      key: "w:noVBand",
      value: i
    }
  }
}), hf = (e) => new se({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Mn = class extends nt {
  constructor(e) {
    var t;
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new rt("w:tblStyle", e.style)), e.float && this.root.push(of(e.float)), !((t = e.float) === null || t === void 0) && t.overlap && this.root.push(hf(e.float.overlap)), e.visuallyRightToLeft !== void 0 && this.root.push(hn("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(Xt("w:tblW", e.width)), e.alignment && this.root.push(Ji(e.alignment)), e.cellSpacing && this.root.push(is(e.cellSpacing)), e.indent && this.root.push(Xt("w:tblInd", e.indent)), e.borders && this.root.push(new ns(e.borders, { fillMissingSides: !e.style })), e.shading && this.root.push(Cr(e.shading)), e.layout && this.root.push(lf(e.layout)), e.cellMargin) {
      const r = Zh(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(cf(e.tableLook)), e.revision && this.root.push(new ff(e.revision));
  }
}, ff = class extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Mn(he(he({}, e), {}, { includeIfEmpty: !0 })));
  }
}, df = (e, t) => new se({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: Ce(e)
    },
    rule: {
      key: "w:hRule",
      value: t
    }
  }
}), as = class extends nt {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(hn("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(hn("w:tblHeader", e.tableHeader)), e.height && this.root.push(df(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(is(e.cellSpacing)), e.insertion && this.root.push(new $h(e.insertion)), e.deletion && this.root.push(new Gh(e.deletion)), e.revision && this.root.push(new pf(e.revision));
  }
}, pf = class extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new as(he(he({}, e), {}, { includeIfEmpty: !0 })));
  }
}, xr = (e, t) => {
  const r = e[t];
  return Array.isArray(r) ? r : [];
}, Gt = (e) => Object.keys(e)[0], mf = (e, t) => {
  const r = xr(e, "w:p"), n = r.find((s) => Gt(s) === "w:pPr");
  if (!n) return { "w:p": [{ "w:pPr": [t] }, ...r] };
  const a = xr(n, "w:pPr");
  if (a.some((s) => Gt(s) === "w:keepNext")) return e;
  const i = a.filter((s) => Gt(s) === "w:pStyle").length, u = { "w:pPr": [
    ...a.slice(0, i),
    t,
    ...a.slice(i)
  ] };
  return { "w:p": r.map((s) => s === n ? u : s) };
}, ss = class extends ae {
  constructor(e) {
    super("w:tr"), Z(this, "options", void 0), this.options = e, this.root.push(new as(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (!t || this.options.keepNext === void 0) return t;
    const r = new ce("w:keepNext", this.options.keepNext).prepForXml(e);
    return { "w:tr": xr(t, "w:tr").map((n) => Gt(n) === "w:tc" ? { "w:tc": xr(n, "w:tc").map((a) => Gt(a) === "w:p" ? mf(a, r) : a) } : n) };
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof _r);
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
      const a = this.root[n];
      n += 1, r += a && a.options.columnSpan || 1;
    }
    return n - 1;
  }
}, vf = class os extends Dn {
  constructor({ rows: t, width: r, columnWidths: n, columnWidthsRevision: a, margins: i, indent: u, float: s, layout: c, style: h, borders: w, alignment: v, visuallyRightToLeft: E, tableLook: m, cellSpacing: d, revision: y }) {
    super("w:tbl"), Z(this, "rows", void 0), Z(this, "width", void 0), Z(this, "columnWidths", void 0), Z(this, "columnWidthsRevision", void 0), Z(
      this,
      /**
      * Grid column widths in twips: the explicit `columnWidths`, or the widths derived
      * from the table and cell widths (re-resolved against the actual page or parent
      * cell every time the table is serialized).
      */
      "resolvedColumnWidths",
      void 0
    ), this.rows = t, this.width = r ?? { size: 100 }, this.columnWidths = n, this.columnWidthsRevision = a, t.forEach((_, k) => {
      if (k === t.length - 1) return;
      let x = 0;
      _.cells.forEach((T) => {
        if (T.options.rowSpan && T.options.rowSpan > 1) {
          const S = new _r({
            rowSpan: T.options.rowSpan - 1,
            columnSpan: T.options.columnSpan,
            borders: T.options.borders,
            children: [],
            verticalMerge: ts.CONTINUE
          });
          t[k + 1].addCellToColumnIndex(S, x);
        }
        x += T.options.columnSpan || 1;
      });
    }), this.setCellWidths(mr), this.resolvedColumnWidths = n ?? li({
      rows: t,
      width: this.width,
      availableWidth: mr
    }), this.root.push(new Mn({
      borders: h ? w : w ?? {},
      width: this.width,
      indent: u,
      float: s,
      layout: c,
      style: h,
      alignment: v,
      cellMargin: i,
      visuallyRightToLeft: E,
      tableLook: m,
      cellSpacing: d,
      revision: y
    })), this.root.push(new vr(this.resolvedColumnWidths, a));
    for (const _ of t) this.root.push(_);
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
    const { cells: n } = t, a = n.indexOf(r);
    if (a === -1) return;
    const i = n.slice(0, a).reduce((s, c) => s + (c.options.columnSpan || 1), 0), u = this.resolvedColumnWidths.slice(i, i + (r.options.columnSpan || 1));
    return u.length === 0 ? void 0 : u.reduce((s, c) => s + c, 0);
  }
  /**
  * Resolves derived grid column widths against the width actually available to the
  * table (the section's text width, or the parent cell for nested tables) before
  * serializing.
  */
  prepForXml(t) {
    if (this.setCellWidths(this.resolveAvailableWidth(t)), this.columnWidths === void 0) {
      this.resolvedColumnWidths = li({
        rows: this.rows,
        width: this.width,
        availableWidth: this.resolveAvailableWidth(t)
      });
      const r = this.root.findIndex((n) => n instanceof vr);
      this.root[r] = new vr(this.resolvedColumnWidths, this.columnWidthsRevision);
    }
    return super.prepForXml(t);
  }
  /**
  * Gives each cell without a width of its own the width of the `columnWidths` it spans, as Word sizes the columns of
  * cells without a width to their content, whatever the grid says. When the table's width is wider than the columns
  * add up to, they are scaled up to fill it, as Word and LibreOffice lay them out, so columns given as proportions
  * keep them.
  */
  setCellWidths(t) {
    var r;
    if (this.columnWidths === void 0) return;
    const n = this.columnWidths.reduce((u, s) => u + s, 0), a = (r = Bn(this.width, t)) !== null && r !== void 0 ? r : 0, i = n > 0 && a > n ? a / n : 1;
    for (const u of this.rows) {
      let s = 0;
      for (const c of u.cells) {
        const h = c.options.columnSpan || 1, w = this.columnWidths.slice(s, s + h), v = Math.round(w.reduce((E, m) => E + m, 0) * i);
        w.length === h && v > 0 && c.setColumnWidth(v), s += h;
      }
    }
  }
  /**
  * Finds the width in twips available to this table from the serialization context:
  * the parent cell for a nested table, otherwise the text width of the section the
  * table belongs to (the first section for headers, footers and other parts). Falls
  * back to the default page when the context carries no document.
  */
  resolveAvailableWidth(t) {
    var r, n, a;
    const { stack: i } = t, u = i[i.length - 1], s = i[i.length - 2], c = i[i.length - 3];
    if (u instanceof _r && s instanceof ss && c instanceof os) {
      const E = c.getCellWidth(s, u);
      if (E !== void 0) return E;
    }
    const h = i.findIndex((E) => E instanceof Ja), w = (r = t.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 ? void 0 : r.View.Body, v = h >= 0 ? i[h].getSectionPropertiesFor((n = i[h + 1]) !== null && n !== void 0 ? n : this) : w?.getSectionPropertiesFor();
    return (a = v?.AvailableTextWidth) !== null && a !== void 0 ? a : mr;
  }
}, wf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, gf = class extends ae {
  constructor() {
    super("Properties"), this.root.push(new wf({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, yf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Qe = (e, t) => new se({
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
}), ke = (e, t) => new se({
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
}), bf = class extends ae {
  constructor() {
    super("Types"), this.root.push(new yf({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(Qe("image/png", "png")), this.root.push(Qe("image/jpeg", "jpeg")), this.root.push(Qe("image/jpeg", "jpg")), this.root.push(Qe("image/bmp", "bmp")), this.root.push(Qe("image/gif", "gif")), this.root.push(Qe("image/svg+xml", "svg")), this.root.push(Qe("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Qe("application/xml", "xml")), this.root.push(Qe("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(ke("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.theme+xml", "/word/theme/theme1.xml"));
  }
  /**
  * Registers the comments part in the content types.
  */
  addComments() {
    this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers the commentsIds part in the content types.
  */
  addCommentsIds() {
    this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml", "/word/commentsIds.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(e) {
    this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  /**
  * Registers a part by its name, such as a chart or an embedded workbook that a drawing adds to the package.
  *
  * @param contentType - The part's content type
  * @param partName - The part's name, from the root of the package, such as "/word/charts/chart1.xml"
  */
  addOverride(e, t) {
    this.root.push(ke(e, t));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(e) {
    this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, ci = {
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
}, Pr = class extends ve {
  constructor(e, t) {
    super(he({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, ci[r]])))), Z(this, "xmlKeys", he({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(ci).map((r) => [r, `xmlns:${r}`]))));
  }
}, _f = class extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new Pr([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new ft("dc:title", e.title)), e.subject && this.root.push(new ft("dc:subject", e.subject)), e.creator && this.root.push(new ft("dc:creator", e.creator)), e.keywords && this.root.push(new ft("cp:keywords", e.keywords)), e.description && this.root.push(new ft("dc:description", e.description)), e.lastModifiedBy && this.root.push(new ft("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new ft("cp:revision", String(e.revision))), this.root.push(new hi("dcterms:created")), this.root.push(new hi("dcterms:modified"));
  }
}, xf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { type: "xsi:type" });
  }
}, hi = class extends ae {
  constructor(e) {
    super(e), this.root.push(new xf({ type: "dcterms:W3CDTF" })), this.root.push(Go(/* @__PURE__ */ new Date()));
  }
}, Ef = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Tf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, Sf = class extends ae {
  constructor(e, t) {
    super("property"), this.root.push(new Tf({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new Af(t.value));
  }
}, Af = class extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, kf = class extends ae {
  constructor(e) {
    super("Properties"), Z(this, "nextId", void 0), Z(this, "properties", []), this.root.push(new Ef({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.root.splice(1, this.root.length - 1, ...this.properties), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new Sf(this.nextId++, e));
  }
}, Cf = class extends ae {
  /**
  * @throws If a color isn't valid, or `color` is a theme color and `themeColor`, `themeShade` or `themeTint` is given
  */
  constructor({ color: e, themeColor: t, themeShade: r, themeTint: n }) {
    if (super("w:background"), typeof e == "object" && (t !== void 0 || r !== void 0 || n !== void 0)) throw new Error("Invalid background. Expected a theme color in color, or themeColor, themeShade and themeTint, not both");
    this.root.push(new An([
      {
        keys: Jt,
        color: e
      },
      {
        key: "w:themeColor",
        value: t
      },
      {
        key: "w:themeShade",
        value: r === void 0 ? void 0 : Vn(r)
      },
      {
        key: "w:themeTint",
        value: n === void 0 ? void 0 : Vn(n)
      }
    ]));
  }
}, If = class extends ae {
  constructor(e) {
    super("w:document"), Z(this, "body", void 0), this.root.push(new Pr([
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
    ], "w14 w15 wp14")), this.body = new Ja({ pageNumbers: e.pageNumbers }), e.background && this.root.push(new Cf(e.background)), this.root.push(this.body);
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
}, Rf = class {
  constructor(e) {
    Z(this, "document", void 0), Z(this, "relationships", void 0), this.document = new If(e), this.relationships = new Re();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, Nf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, ls = class extends ae {
  constructor(e, t) {
    super("w:p"), Z(this, "paragraph", void 0), Z(this, "mark", void 0), this.paragraph = e, this.mark = t;
  }
  prepForXml(e) {
    const t = this.paragraph.prepForXml(e)["w:p"], r = Array.isArray(t) ? t : [], n = r.length > 0 && "w:pPr" in r[0] ? 1 : 0;
    return { "w:p": [
      ...r.slice(0, n),
      this.mark.prepForXml(e),
      ...r.slice(n)
    ] };
  }
}, Of = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Pf = class extends Me {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new Yc());
  }
}, fi = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Gr = class extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(new Of({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new ls(r, new Pf()) : r);
  }
}, Ff = class extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}, us = class extends Me {
  constructor() {
    super({}), this.root.push(new Ff());
  }
}, Df = class extends ae {
  constructor() {
    super("w:separator");
  }
}, cs = class extends Me {
  constructor() {
    super({}), this.root.push(new Df());
  }
}, Lf = class extends ae {
  constructor() {
    super("w:endnotes"), Z(this, "ownNotes", /* @__PURE__ */ new Map()), Z(this, "highestId", 0), this.root.push(new Nf({
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
    const e = new Gr({
      id: -1,
      type: fi.SEPARATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: Tt.AUTO
        },
        children: [new cs()]
      })]
    });
    this.root.push(e);
    const t = new Gr({
      id: 0,
      type: fi.CONTINUATION_SEPARATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: Tt.AUTO
        },
        children: [new us()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new Gr({
      id: e,
      children: t
    });
    this.root.push(r), Number.isFinite(e) && (this.highestId = Math.max(this.highestId, Math.floor(e)));
  }
  /**
  * The id of the endnote that a reference run brings with it, which is added to the endnotes the first time the run
  * is written, with an id no other endnote has. Word has endnotes only in a document's body, so a run written
  * anywhere else, such as in a header, has none, and its endnote isn't added.
  *
  * @internal
  * @param reference - The run, which has the same endnote each time it is written
  * @param endnote - The endnote's content
  * @param context - The context the run is written in
  * @returns The endnote's id, or undefined outside the document's body
  */
  idOf(e, t, r) {
    if (r.viewWrapper !== r.file.Document) return;
    const n = this.ownNotes.get(e);
    if (n !== void 0) return n;
    const a = this.highestId + 1;
    return this.createEndnote(a, t.children), this.ownNotes.set(e, a), a;
  }
  /**
  * Formats the endnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Bf = class {
  constructor() {
    Z(this, "endnotes", void 0), Z(this, "relationships", void 0), this.endnotes = new Lf(), this.relationships = new Re();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, Mf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, Uf = class extends Ki {
  constructor(e, t) {
    super("w:ftr", t), Z(this, "refId", void 0), this.refId = e, t || this.root.push(new Mf({
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
  /**
  * Formats the footer, with the page numbers worked out for its document written into its fields, when the document's
  * body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e, this.refId), t;
  }
}, Wf = class {
  constructor(e, t, r) {
    Z(this, "media", void 0), Z(this, "footer", void 0), Z(this, "relationships", void 0), this.media = e, this.footer = new Uf(t, r), this.relationships = new Re();
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
}, jf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, zf = class extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}, Hf = class extends Me {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new zf());
  }
}, di = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, Kr = class extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(new jf({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new ls(r, new Hf()) : r);
  }
}, $f = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, Gf = class extends ae {
  constructor() {
    super("w:footnotes"), Z(this, "ownNotes", /* @__PURE__ */ new Map()), Z(this, "highestId", 0), this.root.push(new $f({
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
    const e = new Kr({
      id: -1,
      type: di.SEPERATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: Tt.AUTO
        },
        children: [new cs()]
      })]
    });
    this.root.push(e);
    const t = new Kr({
      id: 0,
      type: di.CONTINUATION_SEPERATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: Tt.AUTO
        },
        children: [new us()]
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
    const r = new Kr({
      id: e,
      children: t
    });
    this.root.push(r), Number.isFinite(e) && (this.highestId = Math.max(this.highestId, Math.floor(e)));
  }
  /**
  * The id of the footnote that a reference run brings with it, which is added to the footnotes the first time the
  * run is written, with an id no other footnote has. Word has footnotes only in a document's body, so a run written
  * anywhere else, such as in a header, has none, and its footnote isn't added.
  *
  * @internal
  * @param reference - The run, which has the same footnote each time it is written
  * @param footnote - The footnote's content
  * @param context - The context the run is written in
  * @returns The footnote's id, or undefined outside the document's body
  */
  idOf(e, t, r) {
    if (r.viewWrapper !== r.file.Document) return;
    const n = this.ownNotes.get(e);
    if (n !== void 0) return n;
    const a = this.highestId + 1;
    return this.createFootNote(a, t.children), this.ownNotes.set(e, a), a;
  }
  /**
  * Formats the footnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Kf = class {
  constructor() {
    Z(this, "footnotess", void 0), Z(this, "relationships", void 0), this.footnotess = new Gf(), this.relationships = new Re();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Vf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, qf = class extends Ki {
  constructor(e, t) {
    super("w:hdr", t), Z(this, "refId", void 0), this.refId = e, t || this.root.push(new Vf({
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
  /**
  * Formats the header, with the page numbers worked out for its document written into its fields, when the document's
  * body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e, this.refId), t;
  }
}, Xf = class {
  constructor(e, t, r) {
    Z(this, "media", void 0), Z(this, "header", void 0), Z(this, "relationships", void 0), this.media = e, this.header = new qf(t, r), this.relationships = new Re();
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
}, Zf = class {
  constructor() {
    Z(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
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
}, et = {
  /** Bullet points. */
  BULLET: "bullet"
}, Yf = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w:tentative"
    });
  }
}, Jf = class extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Pe({ val: e }));
  }
}, Qf = class extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Pe({ val: e }));
  }
}, ed = (e) => {
  switch (e) {
    case Ee.CENTER:
      return "center";
    case Ee.END:
    case Ee.RIGHT:
      return "right";
    default:
      return "left";
  }
}, td = class extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Pe({ val: ed(e) }));
  }
}, rd = class extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(new Pe({ val: e }));
  }
}, nd = class extends ae {
  constructor() {
    super("w:isLgl");
  }
}, id = class extends ae {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: n = Ee.START, start: a = 1, style: i, suffix: u, isLegalNumberingStyle: s }) {
    if (super("w:lvl"), Z(this, "paragraphProperties", void 0), Z(this, "runProperties", void 0), this.root.push(new $t("w:start", Te(a))), t && this.root.push(new Jf(t)), i?.style && this.root.push(jt(i.style)), s && this.root.push(new nd()), u && this.root.push(new rd(u)), r && this.root.push(new Qf(r)), this.root.push(new td(n)), this.paragraphProperties = new St(i && i.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new ct(i?.run && he(he({}, i.run), {}, {
      highlight: void 0,
      math: void 0,
      revision: void 0
    })), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Yf({
      ilvl: Te(e),
      tentative: 1
    }));
  }
}, ad = class extends id {
}, sd = class extends ae {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Pe({ val: e }));
  }
}, od = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, Vr = class extends ae {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(e, t) {
    super("w:abstractNum"), Z(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    ), this.root.push(new od({
      abstractNumId: Te(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new sd("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new ad(r));
  }
}, ld = class extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Pe({ val: e }));
  }
}, ud = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { numId: "w:numId" });
  }
}, pi = class extends ae {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(e) {
    if (super("w:num"), Z(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    ), Z(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    ), Z(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new ud({ numId: Te(e.numId) })), this.root.push(new ld(Te(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new hd(t.num, t.start));
  }
}, cd = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, hd = class extends ae {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new cd({ ilvl: e })), t !== void 0 && this.root.push(new dd(t));
  }
}, fd = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, dd = class extends ae {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new fd({ val: e }));
  }
}, pd = class extends ae {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), Z(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), Z(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), Z(this, "referenceConfigMap", /* @__PURE__ */ new Map()), Z(this, "abstractNumUniqueNumericId", Ul()), Z(this, "concreteNumUniqueNumericId", Wl()), this.root.push(new Pr([
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
    const t = new Vr(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: et.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Ue(0.5),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 1,
        format: et.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Ue(1),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 2,
        format: et.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 3,
        format: et.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 4,
        format: et.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 5,
        format: et.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 6,
        format: et.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 7,
        format: et.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 8,
        format: et.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: Ue(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new pi({
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
      this.abstractNumberingMap.set(r.reference, new Vr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
    return this.root.splice(1, this.root.length - 1, ...this.abstractNumberingMap.values(), ...this.concreteNumberingMap.values()), super.prepForXml(e);
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
  * @param definition - The list's definition, for a list a paragraph gives its own definition of. It is added with
  * its reference, unless the numbering already has a list with that reference, such as one of the document's
  * `numbering` option, which is kept
  */
  createConcreteNumberingInstance(e, t, r) {
    var n;
    r && !this.abstractNumberingMap.has(r.reference) && (this.abstractNumberingMap.set(r.reference, new Vr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels));
    const a = this.abstractNumberingMap.get(e);
    if (!a) return;
    const i = `${e}-${t}`;
    if (this.concreteNumberingMap.has(i)) return;
    const u = (n = this.referenceConfigMap.get(e)) !== null && n !== void 0 ? n : [{ level: 0 }], s = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: a.id,
      reference: e,
      instance: t,
      overrideLevels: u.map(({ level: c, start: h = 1 }) => ({
        num: c,
        start: Te(h)
      }))
    };
    this.concreteNumberingMap.set(i, new pi(s));
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
}, md = class {
  /**
  * @param contentTypes - Where each part's content type is added
  * @param existingPaths - The paths under word/ of the parts the package already has, such as a template's charts,
  * which new parts don't take
  */
  constructor(e, t = /* @__PURE__ */ new Set()) {
    Z(this, "contentTypes", void 0), Z(this, "existingPaths", void 0), Z(this, "paths", /* @__PURE__ */ new Map()), Z(this, "folders", /* @__PURE__ */ new WeakMap()), this.contentTypes = e, this.existingPaths = t;
  }
  /**
  * Adds a part, and its content type, once.
  *
  * @returns The part's path under word/, such as "charts/chart1.xml"
  */
  add(e) {
    const t = this.paths.get(e);
    if (t !== void 0) return t;
    const { folder: r, name: n, extension: a, contentType: i } = e.options, u = /* @__PURE__ */ new Set([...this.existingPaths, ...this.paths.values()]);
    let s = 1;
    for (; u.has(`${r}/${n}${s}.${a}`); ) s++;
    const c = `${r}/${n}${s}.${a}`;
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
    const t = new Re();
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
}, vd = (e) => new se({
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
}), wd = class extends ae {
  constructor(e) {
    super("w:compat"), e.useSingleBorderforContiguousCells && this.root.push(new ce("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ce("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ce("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ce("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ce("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ce("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ce("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ce("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ce("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ce("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ce("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ce("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ce("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ce("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ce("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ce("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ce("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ce("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ce("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ce("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ce("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ce("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ce("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ce("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ce("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ce("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ce("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ce("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ce("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ce("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ce("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ce("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ce("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ce("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ce("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ce("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ce("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ce("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ce("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ce("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ce("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ce("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ce("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ce("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ce("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ce("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ce("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ce("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ce("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ce("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ce("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ce("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ce("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ce("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ce("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ce("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ce("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ce("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ce("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ce("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ce("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ce("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ce("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ce("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ce("w:cachedColBalance", e.cachedColumnBalance)), e.version && this.root.push(vd(e.version));
  }
}, gd = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
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
}, yd = class extends ae {
  constructor(e) {
    var t, r, n, a, i, u, s, c;
    super("w:settings"), this.root.push(new gd({
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
    })), this.root.push(new ce("w:displayBackgroundShape", !0)), e.embedFonts !== void 0 && this.root.push(new ce("w:embedTrueTypeFonts", e.embedFonts)), e.trackRevisions !== void 0 && this.root.push(new ce("w:trackRevisions", e.trackRevisions)), e.defaultTabStop !== void 0 && this.root.push(new $t("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) === null || t === void 0 ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new ce("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.consecutiveHyphenLimit) !== void 0 && this.root.push(new $t("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((n = e.hyphenation) === null || n === void 0 ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new $t("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((a = e.hyphenation) === null || a === void 0 ? void 0 : a.doNotHyphenateCaps) !== void 0 && this.root.push(new ce("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), e.evenAndOddHeaders !== void 0 && this.root.push(new ce("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ce("w:updateFields", e.updateFields)), this.root.push(new wd(he(he({}, (i = e.compatibility) !== null && i !== void 0 ? i : {}), {}, { version: (u = (s = (c = e.compatibility) === null || c === void 0 ? void 0 : c.version) !== null && s !== void 0 ? s : e.compatibilityModeVersion) !== null && u !== void 0 ? u : 15 })));
  }
}, hs = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { val: "w:val" });
  }
}, bd = class extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new hs({ val: e }));
  }
}, _d = class extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new hs({ val: Te(e) }));
  }
}, xd = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, Un = class extends ae {
  constructor(e, t) {
    super("w:style"), this.root.push(new xd(e)), t.name && this.root.push(new bd(t.name)), t.basedOn && t.basedOn !== e.styleId && this.root.push(new rt("w:basedOn", t.basedOn)), t.next && this.root.push(new rt("w:next", t.next)), t.link && this.root.push(new rt("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new _d(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new ce("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new ce("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new ce("w:qFormat", t.quickFormat));
  }
}, Ct = class extends Un {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), Z(this, "paragraphProperties", void 0), Z(this, "runProperties", void 0), this.paragraphProperties = new St(e.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new ct(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, It = class extends Un {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, he({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), Z(this, "runProperties", void 0), this.runProperties = new ct(e.run), this.root.push(this.runProperties);
  }
}, ht = class extends Ct {
  constructor(e) {
    super(he({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, Ed = class extends ht {
  constructor(e) {
    super(he({
      id: "Title",
      name: "Title"
    }, e));
  }
}, Td = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, Sd = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, Ad = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, kd = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, Cd = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, Id = class extends ht {
  constructor(e) {
    super(he({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, Rd = class extends ht {
  constructor(e) {
    super(he({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, Nd = class extends Ct {
  constructor(e) {
    super(he({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, Od = class extends Ct {
  constructor(e) {
    super(he({
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
        lineRule: Tt.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Pd = class extends It {
  constructor(e) {
    super(he({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Fd = class extends It {
  constructor(e) {
    super(he({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Dd = class extends Ct {
  constructor(e) {
    super(he({
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
        lineRule: Tt.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Ld = class extends It {
  constructor(e) {
    super(he({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Bd = class extends It {
  constructor(e) {
    super(he({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Md = class extends It {
  constructor(e) {
    super(he({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: sa.SINGLE }
      }
    }, e));
  }
}, Ud = class extends Un {
  constructor() {
    super({
      type: "table",
      styleId: "TableNormal",
      default: !0
    }, {
      name: "Normal Table",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0
    }), this.root.push(new Mn({
      indent: {
        size: 0,
        type: Oe.DXA
      },
      cellMargin: {
        top: 0,
        left: 108,
        bottom: 0,
        right: 108
      }
    }));
  }
}, Bt = (e) => typeof e == "object" ? Object.keys(e)[0] : void 0, Wn = (e) => {
  var t;
  return (t = [e["w:style"]].flat().find((r) => r._attr)) === null || t === void 0 ? void 0 : t._attr;
}, mi = (e) => {
  var t;
  return (t = Wn(e)) === null || t === void 0 ? void 0 : t["w:styleId"];
}, Wd = (e) => {
  var t;
  const r = Wn(e);
  return ((t = r?.["w:type"]) !== null && t !== void 0 ? t : "paragraph") === "paragraph" && r?.["w:default"] !== void 0 && ![
    "0",
    "false",
    "off"
  ].includes(String(r["w:default"]));
}, jd = (e) => ({ "w:style": [e["w:style"]].flat().map((t) => t._attr ? { _attr: he(he({}, t._attr), {}, { "w:default": "1" }) } : t) }), qr = class extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Ct(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new It(t));
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
    const n = (s) => r.filter((c) => Bt(c) === s), a = r.map((s) => Bt(s) === "w:style" ? mi(s) : void 0), i = r.filter((s, c) => ![
      "_attr",
      "w:docDefaults",
      "w:latentStyles"
    ].includes(Bt(s)) && (a[c] === void 0 || a.lastIndexOf(a[c]) === c)), u = i.some((s) => Bt(s) === "w:style" && Wd(s)) ? i : i.map((s) => {
      var c, h;
      return Bt(s) === "w:style" && mi(s) === "Normal" && ((c = (h = Wn(s)) === null || h === void 0 ? void 0 : h["w:type"]) !== null && c !== void 0 ? c : "paragraph") === "paragraph" ? jd(s) : s;
    });
    return { "w:styles": [
      ...n("_attr"),
      ...n("w:docDefaults").slice(-1),
      ...n("w:latentStyles").slice(-1),
      ...u
    ] };
  }
}, zd = class extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new St(e, { implicitListParagraphStyle: !1 }));
  }
}, Hd = class extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new ct(e));
  }
}, $d = class extends ae {
  constructor(e) {
    super("w:docDefaults"), Z(this, "runPropertiesDefaults", void 0), Z(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new Hd(e.run), this.paragraphPropertiesDefaults = new zd(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, Gd = class {
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
    const t = (0, Gi.xml2js)(e, { compact: !1 });
    let r;
    for (const a of t.elements || []) a.name === "w:styles" && (r = a);
    if (r === void 0) throw new Error("can not find styles element");
    const n = r.elements || [];
    return {
      initialStyles: new Uo(r.attributes),
      importedStyles: n.map((a) => En(a))
    };
  }
}, fs = (e = {}) => {
  var t;
  return {
    normal: new Ct({
      id: "Normal",
      name: "Normal",
      quickFormat: !0
    }),
    normalTable: new Ud(),
    document: new $d((t = e.document) !== null && t !== void 0 ? t : {}),
    title: new Ed(he({ run: { size: 56 } }, e.title)),
    heading1: new Td(he({ run: {
      color: "2E74B5",
      size: 32
    } }, e.heading1)),
    heading2: new Sd(he({ run: {
      color: "2E74B5",
      size: 26
    } }, e.heading2)),
    heading3: new Ad(he({ run: {
      color: "1F4D78",
      size: 24
    } }, e.heading3)),
    heading4: new kd(he({ run: {
      color: "2E74B5",
      italics: !0
    } }, e.heading4)),
    heading5: new Cd(he({ run: { color: "2E74B5" } }, e.heading5)),
    heading6: new Id(he({ run: { color: "1F4D78" } }, e.heading6)),
    strong: new Rd(he({ run: { bold: !0 } }, e.strong)),
    listParagraph: new Nd(e.listParagraph || {}),
    hyperlink: new Md(e.hyperlink || {}),
    footnoteReference: new Pd(e.footnoteReference || {}),
    footnoteText: new Od(e.footnoteText || {}),
    footnoteTextChar: new Fd(e.footnoteTextChar || {}),
    endnoteReference: new Ld(e.endnoteReference || {}),
    endnoteText: new Dd(e.endnoteText || {}),
    endnoteTextChar: new Bd(e.endnoteTextChar || {})
  };
}, vi = class {
  newInstance(e = {}) {
    return {
      initialStyles: new Pr([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: Object.values(fs(e))
    };
  }
}, ds = {
  headings: {
    latin: "Calibri Light",
    panose: "020F0302020204030204"
  },
  body: {
    latin: "Calibri",
    panose: "020F0502020204030204"
  }
}, Kd = [
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
], Xr = (e, t, r) => new se({
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
}), Vd = (e, t) => {
  const r = t[e], n = typeof r == "string" ? r : r?.latin;
  return n ?? ds[e].latin;
}, wi = (e, t) => {
  const r = t[e], { eastAsia: n = "", complexScript: a = "" } = typeof r == "object" ? r : {}, i = Vd(e, t), u = ds[e];
  return new se({
    name: e === "headings" ? "a:majorFont" : "a:minorFont",
    children: [
      Xr("a:latin", i, i === u.latin ? u.panose : void 0),
      Xr("a:ea", n),
      Xr("a:cs", a),
      ...Kd.map(([s, c, h = c]) => new se({
        name: "a:font",
        attributes: {
          script: {
            key: "script",
            value: s
          },
          typeface: {
            key: "typeface",
            value: e === "headings" ? c : h
          }
        }
      }))
    ]
  });
}, qd = (e, t = {}) => new se({
  name: "a:fontScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: [wi("headings", t), wi("body", t)]
}), ps = (e = []) => new se({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: "phClr"
  } },
  children: e.map(([t, r]) => new se({
    name: `a:${t}`,
    attributes: { value: {
      key: "val",
      value: r
    } }
  }))
}), wr = (e) => new se({
  name: "a:solidFill",
  children: [ps(e)]
}), Zr = (e) => new se({
  name: "a:gradFill",
  attributes: { rotateWithShape: {
    key: "rotWithShape",
    value: !0
  } },
  children: [new se({
    name: "a:gsLst",
    children: e.map((t, r) => new se({
      name: "a:gs",
      attributes: { position: {
        key: "pos",
        value: r * 5e4
      } },
      children: [ps(t)]
    }))
  }), new se({
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
}), Yr = (e) => new se({
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
    wr(),
    new se({
      name: "a:prstDash",
      attributes: { value: {
        key: "val",
        value: "solid"
      } }
    }),
    new se({
      name: "a:miter",
      attributes: { limit: {
        key: "lim",
        value: 8e5
      } }
    })
  ]
}), Jr = (e) => new se({
  name: "a:effectStyle",
  children: [new se({
    name: "a:effectLst",
    children: e
  })]
}), Xd = () => new se({
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
  children: [new se({
    name: "a:srgbClr",
    attributes: { value: {
      key: "val",
      value: "000000"
    } },
    children: [new se({
      name: "a:alpha",
      attributes: { value: {
        key: "val",
        value: 63e3
      } }
    })]
  })]
}), Zd = () => new se({
  name: "a:fmtScheme",
  attributes: { name: {
    key: "name",
    value: "Office"
  } },
  children: [
    new se({
      name: "a:fillStyleLst",
      children: [
        wr(),
        Zr([
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
        Zr([
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
    new se({
      name: "a:lnStyleLst",
      children: [
        Yr(6350),
        Yr(12700),
        Yr(19050)
      ]
    }),
    new se({
      name: "a:effectStyleLst",
      children: [
        Jr([]),
        Jr([]),
        Jr([Xd()])
      ]
    }),
    new se({
      name: "a:bgFillStyleLst",
      children: [
        wr(),
        wr([["tint", 95e3], ["satMod", 17e4]]),
        Zr([
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
}), Yd = class extends ae {
  constructor({ name: e = "Office Theme", colors: t, fonts: r } = {}) {
    super("a:theme"), Z(this, "colors", void 0), this.colors = ra(t), this.root.push(new dn({
      namespace: {
        key: "xmlns:a",
        value: "http://schemas.openxmlformats.org/drawingml/2006/main"
      },
      name: {
        key: "name",
        value: e
      }
    })), this.root.push(new se({
      name: "a:themeElements",
      children: [
        qo(t ? e : "Office", t),
        qd(r ? e : "Office", r),
        Zd()
      ]
    })), this.root.push(new se({ name: "a:objectDefaults" })), this.root.push(new se({ name: "a:extraClrSchemeLst" }));
  }
  /**
  * The hex color of each of the theme's colors. The system's window text and window colors are black and white.
  */
  get Colors() {
    return this.colors;
  }
}, Jd = class {
  constructor(e) {
    var t, r, n, a, i, u, s, c, h, w, v, E, m;
    if (Z(this, "currentRelationshipId", 1), Z(this, "documentWrapper", void 0), Z(this, "headers", []), Z(this, "footers", []), Z(this, "coreProperties", void 0), Z(this, "numbering", void 0), Z(this, "media", void 0), Z(this, "fileRelationships", void 0), Z(this, "footnotesWrapper", void 0), Z(this, "endnotesWrapper", void 0), Z(this, "settings", void 0), Z(this, "contentTypes", void 0), Z(this, "customProperties", void 0), Z(this, "appProperties", void 0), Z(this, "styles", void 0), Z(this, "comments", void 0), Z(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    ), Z(
      this,
      /** Durable comment id mapping (word/commentsIds.xml). */
      "commentsIds",
      void 0
    ), Z(this, "fontWrapper", void 0), Z(this, "theme", void 0), Z(this, "packageParts", void 0), this.coreProperties = new _f(he(he({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (n = e.lastModifiedBy) !== null && n !== void 0 ? n : "Un-named"
    })), this.numbering = new pd(e.numbering ? e.numbering : { config: [] }), this.comments = new zc((a = e.comments) !== null && a !== void 0 ? a : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Kc(this.comments.ThreadData)), this.comments.CommentIdsData && (this.commentsIds = new Zc(this.comments.CommentIdsData)), this.fileRelationships = new Re(), this.customProperties = new kf((i = e.customProperties) !== null && i !== void 0 ? i : []), this.appProperties = new gf(), this.footnotesWrapper = new Kf(), this.endnotesWrapper = new Bf(), this.contentTypes = new bf(), this.packageParts = new md(this.contentTypes), this.documentWrapper = new Rf({
      background: e.background,
      pageNumbers: e.pageNumbers
    }), this.settings = new yd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (u = e.features) === null || u === void 0 ? void 0 : u.trackRevisions,
      updateFields: (s = e.features) === null || s === void 0 ? void 0 : s.updateFields,
      embedFonts: !((c = e.fonts) === null || c === void 0) && c.length ? !0 : void 0,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (h = e.hyphenation) === null || h === void 0 ? void 0 : h.autoHyphenation,
        hyphenationZone: (w = e.hyphenation) === null || w === void 0 ? void 0 : w.hyphenationZone,
        consecutiveHyphenLimit: (v = e.hyphenation) === null || v === void 0 ? void 0 : v.consecutiveHyphenLimit,
        doNotHyphenateCaps: (E = e.hyphenation) === null || E === void 0 ? void 0 : E.doNotHyphenateCaps
      }
    }), this.media = new Zf(), e.externalStyles !== void 0) {
      var d, y, _, k;
      const x = (d = (y = e.styles) === null || y === void 0 ? void 0 : y.default) !== null && d !== void 0 ? d : {}, T = Object.entries(fs(x)), S = ([b]) => x[b] !== void 0, A = new Gd().newInstance(e.externalStyles);
      this.styles = new qr(he(he({}, A), {}, {
        paragraphStyles: (_ = e.styles) === null || _ === void 0 ? void 0 : _.paragraphStyles,
        characterStyles: (k = e.styles) === null || k === void 0 ? void 0 : k.characterStyles,
        importedStyles: [
          ...T.filter((b) => !S(b)).map(([, b]) => b),
          ...A.importedStyles,
          ...T.filter(S).map(([, b]) => b)
        ]
      }));
    } else if (e.styles) {
      const x = new vi().newInstance(e.styles.default);
      this.styles = new qr(he(he({}, x), e.styles));
    } else {
      const x = new vi();
      this.styles = new qr(x.newInstance());
    }
    this.addDefaultRelationships();
    for (const x of e.sections) this.addSection(x);
    if (e.footnotes) for (const x in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(x), e.footnotes[x].children);
    if (e.endnotes) for (const x in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(x), e.endnotes[x].children);
    this.fontWrapper = new Va((m = e.fonts) !== null && m !== void 0 ? m : []), this.theme = new Yd(e.theme), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml");
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: n }) {
    this.documentWrapper.View.Body.addSection(he(he({}, n), {}, {
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
    for (const a of r) this.documentWrapper.View.add(a);
  }
  createHeader(e) {
    const t = new Xf(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Wf(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = xt.DEFAULT) {
    this.headers.push({
      header: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = xt.DEFAULT) {
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
}, Qd = class extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new rt("w:alias", e));
  }
}, ep = [
  "contentChildren",
  "cachedEntries",
  "beginDirty"
], tp = class extends Dn {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: n = [], beginDirty: a } = t, i = qa(t, ep);
    super("w:sdt"), Z(
      this,
      /** What it is filled in with from the headings, when it isn't given its content */
      "fromHeadings",
      void 0
    ), this.root.push(new Qd(e));
    const u = new Oa(), s = [new Me({ children: [
      Pa(a),
      new Na(i),
      mt()
    ] })], c = [new Me({ children: [vt()] })];
    if (n !== void 0 && n.length > 0) {
      const { stylesWithLevels: h } = i, w = n.map((E, m) => {
        var d, y;
        const _ = this.buildCachedContentParagraphChild(E, i), k = (d = h == null || (y = h.find((T) => T.level === E.level)) === null || y === void 0 ? void 0 : y.styleName) !== null && d !== void 0 ? d : `TOC${E.level}`, x = m === 0 ? [...s, _] : m === n.length - 1 ? [_, ...c] : [_];
        return new be({
          style: k,
          tabStops: this.getTabStopsForLevel(E.level),
          children: x
        });
      });
      let v = w;
      n.length <= 1 && (v = [...w, new be({ children: c })]);
      for (const E of v) u.addChildElement(E);
    } else {
      const h = new be({ children: s });
      u.addChildElement(h);
      for (const v of r) u.addChildElement(v);
      const w = new be({ children: c });
      u.addChildElement(w), r.length === 0 && (this.fromHeadings = {
        properties: i,
        beginDirty: a
      });
    }
    this.root.push(u);
  }
  /**
  * Written empty, and filled in from the headings once the body it is in is written, unless it was given its content.
  * The page numbers are aligned to the right of the text in its section.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return vc(t, this.fromHeadings && he(he({}, this.fromHeadings), {}, { textWidth: this.textWidthIn(e) })), t;
  }
  /** The width of the text in the section it is in */
  textWidthIn(e) {
    var t, r;
    return (t = (r = e.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 || (r = r.View.Body.getSectionPropertiesFor(this)) === null || r === void 0 ? void 0 : r.AvailableTextWidth) !== null && t !== void 0 ? t : mr;
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
    return new Me({
      style: t?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new yr({ text: e.title }),
        new Nr(),
        new yr({ text: (r = (n = e.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "" })
      ]
    });
  }
  buildCachedContentParagraphChild(e, t) {
    const r = this.buildCachedContentRun(e, t);
    return t?.hyperlink && e.href !== void 0 ? new Ln({
      anchor: e.href,
      children: [r]
    }) : r;
  }
}, ms = class {
  constructor(e = { children: [] }) {
    Z(this, "options", void 0), this.options = e;
  }
}, vs = class {
  constructor(e = { children: [] }) {
    Z(this, "options", void 0), this.options = e;
  }
}, rp = class extends ve {
  constructor(...e) {
    super(...e), Z(this, "xmlKeys", { id: "w:id" });
  }
}, gi = class extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new rp({ id: e }));
  }
}, np = class extends Me {
  /**
  * Creates a new footnote reference run.
  *
  * @param footnote - The id of one of the document's `footnotes`, or the footnote's content, for a footnote of the
  * run's own. Word has footnotes only in a document's body, so a run with its footnote's content is left out of
  * headers, footers, comments and notes
  */
  constructor(e) {
    super({ style: "FootnoteReference" }), Z(this, "footnote", void 0), typeof e == "number" ? this.root.push(new gi(e)) : this.footnote = e;
  }
  /**
  * Formats the run, with its own footnote added to the document's footnotes, and referred to by the id it has there.
  */
  prepForXml(e) {
    var t;
    if (this.footnote === void 0) return super.prepForXml(e);
    const r = (t = e.file) === null || t === void 0 ? void 0 : t.FootNotes.View.idOf(this, this.footnote, e);
    if (r !== void 0) {
      this.root.push(new gi(r));
      try {
        return super.prepForXml(e);
      } finally {
        this.root.pop();
      }
    }
  }
}, ip = /* @__PURE__ */ fe(((e, t) => {
  At(), ut();
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof Ne < "u" ? Ne : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(n, a, i) {
      function u(h, w) {
        if (!a[h]) {
          if (!n[h]) {
            var v = typeof ar == "function" && ar;
            if (!w && v) return v(h, !0);
            if (s) return s(h, !0);
            var E = /* @__PURE__ */ new Error("Cannot find module '" + h + "'");
            throw E.code = "MODULE_NOT_FOUND", E;
          }
          var m = a[h] = { exports: {} };
          n[h][0].call(m.exports, function(d) {
            var y = n[h][1][d];
            return u(y || d);
          }, m, m.exports, r, n, a, i);
        }
        return a[h].exports;
      }
      for (var s = typeof ar == "function" && ar, c = 0; c < i.length; c++) u(i[c]);
      return u;
    })({
      1: [function(r, n, a) {
        var i = r("./utils"), u = r("./support"), s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        a.encode = function(c) {
          for (var h, w, v, E, m, d, y, _ = [], k = 0, x = c.length, T = x, S = i.getTypeOf(c) !== "string"; k < c.length; ) T = x - k, v = S ? (h = c[k++], w = k < x ? c[k++] : 0, k < x ? c[k++] : 0) : (h = c.charCodeAt(k++), w = k < x ? c.charCodeAt(k++) : 0, k < x ? c.charCodeAt(k++) : 0), E = h >> 2, m = (3 & h) << 4 | w >> 4, d = 1 < T ? (15 & w) << 2 | v >> 6 : 64, y = 2 < T ? 63 & v : 64, _.push(s.charAt(E) + s.charAt(m) + s.charAt(d) + s.charAt(y));
          return _.join("");
        }, a.decode = function(c) {
          var h, w, v, E, m, d, y = 0, _ = 0, k = "data:";
          if (c.substr(0, k.length) === k) throw new Error("Invalid base64 input, it looks like a data url.");
          var x, T = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === s.charAt(64) && T--, c.charAt(c.length - 2) === s.charAt(64) && T--, T % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (x = u.uint8array ? new Uint8Array(0 | T) : new Array(0 | T); y < c.length; ) h = s.indexOf(c.charAt(y++)) << 2 | (E = s.indexOf(c.charAt(y++))) >> 4, w = (15 & E) << 4 | (m = s.indexOf(c.charAt(y++))) >> 2, v = (3 & m) << 6 | (d = s.indexOf(c.charAt(y++))), x[_++] = h, m !== 64 && (x[_++] = w), d !== 64 && (x[_++] = v);
          return x;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, n, a) {
        var i = r("./external"), u = r("./stream/DataWorker"), s = r("./stream/Crc32Probe"), c = r("./stream/DataLengthProbe");
        function h(w, v, E, m, d) {
          this.compressedSize = w, this.uncompressedSize = v, this.crc32 = E, this.compression = m, this.compressedContent = d;
        }
        h.prototype = {
          getContentWorker: function() {
            var w = new u(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), v = this;
            return w.on("end", function() {
              if (this.streamInfo.data_length !== v.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), w;
          },
          getCompressedWorker: function() {
            return new u(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, h.createWorkerFrom = function(w, v, E) {
          return w.pipe(new s()).pipe(new c("uncompressedSize")).pipe(v.compressWorker(E)).pipe(new c("compressedSize")).withStreamInfo("compression", v);
        }, n.exports = h;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, n, a) {
        var i = r("./stream/GenericWorker");
        a.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new i("STORE compression");
          },
          uncompressWorker: function() {
            return new i("STORE decompression");
          }
        }, a.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, n, a) {
        var i = r("./utils"), u = (function() {
          for (var s, c = [], h = 0; h < 256; h++) {
            s = h;
            for (var w = 0; w < 8; w++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            c[h] = s;
          }
          return c;
        })();
        n.exports = function(s, c) {
          return s !== void 0 && s.length ? i.getTypeOf(s) !== "string" ? (function(h, w, v, E) {
            var m = u, d = E + v;
            h ^= -1;
            for (var y = E; y < d; y++) h = h >>> 8 ^ m[255 & (h ^ w[y])];
            return -1 ^ h;
          })(0 | c, s, s.length, 0) : (function(h, w, v, E) {
            var m = u, d = E + v;
            h ^= -1;
            for (var y = E; y < d; y++) h = h >>> 8 ^ m[255 & (h ^ w.charCodeAt(y))];
            return -1 ^ h;
          })(0 | c, s, s.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, n, a) {
        a.base64 = !1, a.binary = !1, a.dir = !1, a.createFolders = !0, a.date = null, a.compression = null, a.compressionOptions = null, a.comment = null, a.unixPermissions = null, a.dosPermissions = null;
      }, {}],
      6: [function(r, n, a) {
        var i = null;
        i = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: i };
      }, { lie: 37 }],
      7: [function(r, n, a) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", u = r("pako"), s = r("./utils"), c = r("./stream/GenericWorker"), h = i ? "uint8array" : "array";
        function w(v, E) {
          c.call(this, "FlateWorker/" + v), this._pako = null, this._pakoAction = v, this._pakoOptions = E, this.meta = {};
        }
        a.magic = "\b\0", s.inherits(w, c), w.prototype.processChunk = function(v) {
          this.meta = v.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(h, v.data), !1);
        }, w.prototype.flush = function() {
          c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, w.prototype.cleanUp = function() {
          c.prototype.cleanUp.call(this), this._pako = null;
        }, w.prototype._createPako = function() {
          this._pako = new u[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var v = this;
          this._pako.onData = function(E) {
            v.push({
              data: E,
              meta: v.meta
            });
          };
        }, a.compressWorker = function(v) {
          return new w("Deflate", v);
        }, a.uncompressWorker = function() {
          return new w("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, n, a) {
        function i(m, d) {
          var y, _ = "";
          for (y = 0; y < d; y++) _ += String.fromCharCode(255 & m), m >>>= 8;
          return _;
        }
        function u(m, d, y, _, k, x) {
          var T, S, A = m.file, b = m.compression, P = x !== h.utf8encode, M = s.transformTo("string", x(A.name)), R = s.transformTo("string", h.utf8encode(A.name)), K = A.comment, ee = s.transformTo("string", x(K)), O = s.transformTo("string", h.utf8encode(K)), z = R.length !== A.name.length, I = O.length !== K.length, H = "", Q = "", q = "", le = A.dir, Y = A.date, te = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          d && !y || (te.crc32 = m.crc32, te.compressedSize = m.compressedSize, te.uncompressedSize = m.uncompressedSize);
          var V = 0;
          d && (V |= 8), P || !z && !I || (V |= 2048);
          var F = 0, X = 0;
          le && (F |= 16), k === "UNIX" ? (X = 798, F |= (function(re, pe) {
            var C = re;
            return re || (C = pe ? 16893 : 33204), (65535 & C) << 16;
          })(A.unixPermissions, le)) : (X = 20, F |= (function(re) {
            return 63 & (re || 0);
          })(A.dosPermissions)), T = Y.getUTCHours(), T <<= 6, T |= Y.getUTCMinutes(), T <<= 5, T |= Y.getUTCSeconds() / 2, S = Y.getUTCFullYear() - 1980, S <<= 4, S |= Y.getUTCMonth() + 1, S <<= 5, S |= Y.getUTCDate(), z && (Q = i(1, 1) + i(w(M), 4) + R, H += "up" + i(Q.length, 2) + Q), I && (q = i(1, 1) + i(w(ee), 4) + O, H += "uc" + i(q.length, 2) + q);
          var J = "";
          return J += `
\0`, J += i(V, 2), J += b.magic, J += i(T, 2), J += i(S, 2), J += i(te.crc32, 4), J += i(te.compressedSize, 4), J += i(te.uncompressedSize, 4), J += i(M.length, 2), J += i(H.length, 2), {
            fileRecord: v.LOCAL_FILE_HEADER + J + M + H,
            dirRecord: v.CENTRAL_FILE_HEADER + i(X, 2) + J + i(ee.length, 2) + "\0\0\0\0" + i(F, 4) + i(_, 4) + M + H + ee
          };
        }
        var s = r("../utils"), c = r("../stream/GenericWorker"), h = r("../utf8"), w = r("../crc32"), v = r("../signature");
        function E(m, d, y, _) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = d, this.zipPlatform = y, this.encodeFileName = _, this.streamFiles = m, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        s.inherits(E, c), E.prototype.push = function(m) {
          var d = m.meta.percent || 0, y = this.entriesCount, _ = this._sources.length;
          this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, c.prototype.push.call(this, {
            data: m.data,
            meta: {
              currentFile: this.currentFile,
              percent: y ? (d + 100 * (y - _ - 1)) / y : 100
            }
          }));
        }, E.prototype.openedSource = function(m) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = m.file.name;
          var d = this.streamFiles && !m.file.dir;
          if (d) {
            var y = u(m, d, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: y.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, E.prototype.closedSource = function(m) {
          this.accumulate = !1;
          var d = this.streamFiles && !m.file.dir, y = u(m, d, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(y.dirRecord), d) this.push({
            data: (function(_) {
              return v.DATA_DESCRIPTOR + i(_.crc32, 4) + i(_.compressedSize, 4) + i(_.uncompressedSize, 4);
            })(m),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: y.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, E.prototype.flush = function() {
          for (var m = this.bytesWritten, d = 0; d < this.dirRecords.length; d++) this.push({
            data: this.dirRecords[d],
            meta: { percent: 100 }
          });
          var y = this.bytesWritten - m, _ = (function(k, x, T, S, A) {
            var b = s.transformTo("string", A(S));
            return v.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(k, 2) + i(k, 2) + i(x, 4) + i(T, 4) + i(b.length, 2) + b;
          })(this.dirRecords.length, y, m, this.zipComment, this.encodeFileName);
          this.push({
            data: _,
            meta: { percent: 100 }
          });
        }, E.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, E.prototype.registerPrevious = function(m) {
          this._sources.push(m);
          var d = this;
          return m.on("data", function(y) {
            d.processChunk(y);
          }), m.on("end", function() {
            d.closedSource(d.previous.streamInfo), d._sources.length ? d.prepareNextSource() : d.end();
          }), m.on("error", function(y) {
            d.error(y);
          }), this;
        }, E.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, E.prototype.error = function(m) {
          var d = this._sources;
          if (!c.prototype.error.call(this, m)) return !1;
          for (var y = 0; y < d.length; y++) try {
            d[y].error(m);
          } catch {
          }
          return !0;
        }, E.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var m = this._sources, d = 0; d < m.length; d++) m[d].lock();
        }, n.exports = E;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, n, a) {
        var i = r("../compressions"), u = r("./ZipFileWorker");
        a.generateWorker = function(s, c, h) {
          var w = new u(c.streamFiles, h, c.platform, c.encodeFileName), v = 0;
          try {
            s.forEach(function(E, m) {
              v++;
              var d = (function(x, T) {
                var S = x || T, A = i[S];
                if (!A) throw new Error(S + " is not a valid compression method !");
                return A;
              })(m.options.compression, c.compression), y = m.options.compressionOptions || c.compressionOptions || {}, _ = m.dir, k = m.date;
              m._compressWorker(d, y).withStreamInfo("file", {
                name: E,
                dir: _,
                date: k,
                comment: m.comment || "",
                unixPermissions: m.unixPermissions,
                dosPermissions: m.dosPermissions
              }).pipe(w);
            }), w.entriesCount = v;
          } catch (E) {
            w.error(E);
          }
          return w;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(r, n, a) {
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
      11: [function(r, n, a) {
        var i = r("./utils"), u = r("./external"), s = r("./utf8"), c = r("./zipEntries"), h = r("./stream/Crc32Probe"), w = r("./nodejsUtils");
        function v(E) {
          return new u.Promise(function(m, d) {
            var y = E.decompressed.getContentWorker().pipe(new h());
            y.on("error", function(_) {
              d(_);
            }).on("end", function() {
              y.streamInfo.crc32 !== E.decompressed.crc32 ? d(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : m();
            }).resume();
          });
        }
        n.exports = function(E, m) {
          var d = this;
          return m = i.extend(m || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: s.utf8decode
          }), w.isNode && w.isStream(E) ? u.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", E, !0, m.optimizedBinaryString, m.base64).then(function(y) {
            var _ = new c(m);
            return _.load(y), _;
          }).then(function(y) {
            var _ = [u.Promise.resolve(y)], k = y.files;
            if (m.checkCRC32) for (var x = 0; x < k.length; x++) _.push(v(k[x]));
            return u.Promise.all(_);
          }).then(function(y) {
            for (var _ = y.shift(), k = _.files, x = 0; x < k.length; x++) {
              var T = k[x], S = T.fileNameStr, A = i.resolve(T.fileNameStr);
              d.file(A, T.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: T.date,
                dir: T.dir,
                comment: T.fileCommentStr.length ? T.fileCommentStr : null,
                unixPermissions: T.unixPermissions,
                dosPermissions: T.dosPermissions,
                createFolders: m.createFolders
              }), T.dir || (d.file(A).unsafeOriginalName = S);
            }
            return _.zipComment.length && (d.comment = _.zipComment), d;
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
      12: [function(r, n, a) {
        var i = r("../utils"), u = r("../stream/GenericWorker");
        function s(c, h) {
          u.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(h);
        }
        i.inherits(s, u), s.prototype._bindStream = function(c) {
          var h = this;
          (this._stream = c).pause(), c.on("data", function(w) {
            h.push({
              data: w,
              meta: { percent: 0 }
            });
          }).on("error", function(w) {
            h.isPaused ? this.generatedError = w : h.error(w);
          }).on("end", function() {
            h.isPaused ? h._upstreamEnded = !0 : h.end();
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
      13: [function(r, n, a) {
        var i = r("readable-stream").Readable;
        function u(s, c, h) {
          i.call(this, c), this._helper = s;
          var w = this;
          s.on("data", function(v, E) {
            w.push(v) || w._helper.pause(), h && h(E);
          }).on("error", function(v) {
            w.emit("error", v);
          }).on("end", function() {
            w.push(null);
          });
        }
        r("../utils").inherits(u, i), u.prototype._read = function() {
          this._helper.resume();
        }, n.exports = u;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(r, n, a) {
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
      15: [function(r, n, a) {
        function i(S, A, b) {
          var P, M = s.getTypeOf(A), R = s.extend(b || {}, w);
          R.date = R.date || /* @__PURE__ */ new Date(), R.compression !== null && (R.compression = R.compression.toUpperCase()), typeof R.unixPermissions == "string" && (R.unixPermissions = parseInt(R.unixPermissions, 8)), R.unixPermissions && 16384 & R.unixPermissions && (R.dir = !0), R.dosPermissions && 16 & R.dosPermissions && (R.dir = !0), R.dir && (S = k(S)), R.createFolders && (P = _(S)) && x.call(this, P, !0);
          var K = M === "string" && R.binary === !1 && R.base64 === !1;
          b && b.binary !== void 0 || (R.binary = !K), (A instanceof v && A.uncompressedSize === 0 || R.dir || !A || A.length === 0) && (R.base64 = !1, R.binary = !0, A = "", R.compression = "STORE", M = "string");
          var ee = null;
          ee = A instanceof v || A instanceof c ? A : d.isNode && d.isStream(A) ? new y(S, A) : s.prepareContent(S, A, R.binary, R.optimizedBinaryString, R.base64);
          var O = new E(S, ee, R);
          this.files[S] = O;
        }
        var u = r("./utf8"), s = r("./utils"), c = r("./stream/GenericWorker"), h = r("./stream/StreamHelper"), w = r("./defaults"), v = r("./compressedObject"), E = r("./zipObject"), m = r("./generate"), d = r("./nodejsUtils"), y = r("./nodejs/NodejsStreamInputAdapter"), _ = function(S) {
          S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
          var A = S.lastIndexOf("/");
          return 0 < A ? S.substring(0, A) : "";
        }, k = function(S) {
          return S.slice(-1) !== "/" && (S += "/"), S;
        }, x = function(S, A) {
          return A = A !== void 0 ? A : w.createFolders, S = k(S), this.files[S] || i.call(this, S, null, {
            dir: !0,
            createFolders: A
          }), this.files[S];
        };
        function T(S) {
          return Object.prototype.toString.call(S) === "[object RegExp]";
        }
        n.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(S) {
            var A, b, P;
            for (A in this.files) P = this.files[A], (b = A.slice(this.root.length, A.length)) && A.slice(0, this.root.length) === this.root && S(b, P);
          },
          filter: function(S) {
            var A = [];
            return this.forEach(function(b, P) {
              S(b, P) && A.push(P);
            }), A;
          },
          file: function(S, A, b) {
            if (arguments.length !== 1) return S = this.root + S, i.call(this, S, A, b), this;
            if (T(S)) {
              var P = S;
              return this.filter(function(R, K) {
                return !K.dir && P.test(R);
              });
            }
            var M = this.files[this.root + S];
            return M && !M.dir ? M : null;
          },
          folder: function(S) {
            if (!S) return this;
            if (T(S)) return this.filter(function(M, R) {
              return R.dir && S.test(M);
            });
            var A = this.root + S, b = x.call(this, A), P = this.clone();
            return P.root = b.name, P;
          },
          remove: function(S) {
            S = this.root + S;
            var A = this.files[S];
            if (A || (S.slice(-1) !== "/" && (S += "/"), A = this.files[S]), A && !A.dir) delete this.files[S];
            else for (var b = this.filter(function(M, R) {
              return R.name.slice(0, S.length) === S;
            }), P = 0; P < b.length; P++) delete this.files[b[P].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(S) {
            var A, b = {};
            try {
              if ((b = s.extend(S || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: u.utf8encode
              })).type = b.type.toLowerCase(), b.compression = b.compression.toUpperCase(), b.type === "binarystring" && (b.type = "string"), !b.type) throw new Error("No output type specified.");
              s.checkSupport(b.type), b.platform !== "darwin" && b.platform !== "freebsd" && b.platform !== "linux" && b.platform !== "sunos" || (b.platform = "UNIX"), b.platform === "win32" && (b.platform = "DOS");
              var P = b.comment || this.comment || "";
              A = m.generateWorker(this, b, P);
            } catch (M) {
              (A = new c("error")).error(M);
            }
            return new h(A, b.type || "string", b.mimeType);
          },
          generateAsync: function(S, A) {
            return this.generateInternalStream(S).accumulate(A);
          },
          generateNodeStream: function(S, A) {
            return (S = S || {}).type || (S.type = "nodebuffer"), this.generateInternalStream(S).toNodejsStream(A);
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
      16: [function(r, n, a) {
        n.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, n, a) {
        var i = r("./DataReader");
        function u(s) {
          i.call(this, s);
          for (var c = 0; c < this.data.length; c++) s[c] = 255 & s[c];
        }
        r("../utils").inherits(u, i), u.prototype.byteAt = function(s) {
          return this.data[this.zero + s];
        }, u.prototype.lastIndexOfSignature = function(s) {
          for (var c = s.charCodeAt(0), h = s.charCodeAt(1), w = s.charCodeAt(2), v = s.charCodeAt(3), E = this.length - 4; 0 <= E; --E) if (this.data[E] === c && this.data[E + 1] === h && this.data[E + 2] === w && this.data[E + 3] === v) return E - this.zero;
          return -1;
        }, u.prototype.readAndCheckSignature = function(s) {
          var c = s.charCodeAt(0), h = s.charCodeAt(1), w = s.charCodeAt(2), v = s.charCodeAt(3), E = this.readData(4);
          return c === E[0] && h === E[1] && w === E[2] && v === E[3];
        }, u.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, n, a) {
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
            var c, h = 0;
            for (this.checkOffset(s), c = this.index + s - 1; c >= this.index; c--) h = (h << 8) + this.byteAt(c);
            return this.index += s, h;
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
      19: [function(r, n, a) {
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
      20: [function(r, n, a) {
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
      21: [function(r, n, a) {
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
      22: [function(r, n, a) {
        var i = r("../utils"), u = r("../support"), s = r("./ArrayReader"), c = r("./StringReader"), h = r("./NodeBufferReader"), w = r("./Uint8ArrayReader");
        n.exports = function(v) {
          var E = i.getTypeOf(v);
          return i.checkSupport(E), E !== "string" || u.uint8array ? E === "nodebuffer" ? new h(v) : u.uint8array ? new w(i.transformTo("uint8array", v)) : new s(i.transformTo("array", v)) : new c(v);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, n, a) {
        a.LOCAL_FILE_HEADER = "PK", a.CENTRAL_FILE_HEADER = "PK", a.CENTRAL_DIRECTORY_END = "PK", a.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", a.ZIP64_CENTRAL_DIRECTORY_END = "PK", a.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, n, a) {
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
      25: [function(r, n, a) {
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
      26: [function(r, n, a) {
        var i = r("../utils"), u = r("./GenericWorker");
        function s(c) {
          u.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        i.inherits(s, u), s.prototype.processChunk = function(c) {
          if (c) {
            var h = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = h + c.data.length;
          }
          u.prototype.processChunk.call(this, c);
        }, n.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, n, a) {
        var i = r("../utils"), u = r("./GenericWorker");
        function s(c) {
          u.call(this, "DataWorker");
          var h = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(w) {
            h.dataIsReady = !0, h.data = w, h.max = w && w.length || 0, h.type = i.getTypeOf(w), h.isPaused || h._tickAndRepeat();
          }, function(w) {
            h.error(w);
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
          var c = null, h = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              c = this.data.substring(this.index, h);
              break;
            case "uint8array":
              c = this.data.subarray(this.index, h);
              break;
            case "array":
            case "nodebuffer":
              c = this.data.slice(this.index, h);
          }
          return this.index = h, this.push({
            data: c,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, n.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(r, n, a) {
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
      29: [function(r, n, a) {
        var i = r("../utils"), u = r("./ConvertWorker"), s = r("./GenericWorker"), c = r("../base64"), h = r("../support"), w = r("../external"), v = null;
        if (h.nodestream) try {
          v = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function E(d, y) {
          return new w.Promise(function(_, k) {
            var x = [], T = d._internalType, S = d._outputType, A = d._mimeType;
            d.on("data", function(b, P) {
              x.push(b), y && y(P);
            }).on("error", function(b) {
              x = [], k(b);
            }).on("end", function() {
              try {
                _((function(b, P, M) {
                  switch (b) {
                    case "blob":
                      return i.newBlob(i.transformTo("arraybuffer", P), M);
                    case "base64":
                      return c.encode(P);
                    default:
                      return i.transformTo(b, P);
                  }
                })(S, (function(b, P) {
                  var M, R = 0, K = null, ee = 0;
                  for (M = 0; M < P.length; M++) ee += P[M].length;
                  switch (b) {
                    case "string":
                      return P.join("");
                    case "array":
                      return Array.prototype.concat.apply([], P);
                    case "uint8array":
                      for (K = new Uint8Array(ee), M = 0; M < P.length; M++) K.set(P[M], R), R += P[M].length;
                      return K;
                    case "nodebuffer":
                      return Buffer.concat(P);
                    default:
                      throw new Error("concat : unsupported type '" + b + "'");
                  }
                })(T, x), A));
              } catch (b) {
                k(b);
              }
              x = [];
            }).resume();
          });
        }
        function m(d, y, _) {
          var k = y;
          switch (y) {
            case "blob":
            case "arraybuffer":
              k = "uint8array";
              break;
            case "base64":
              k = "string";
          }
          try {
            this._internalType = k, this._outputType = y, this._mimeType = _, i.checkSupport(k), this._worker = d.pipe(new u(k)), d.lock();
          } catch (x) {
            this._worker = new s("error"), this._worker.error(x);
          }
        }
        m.prototype = {
          accumulate: function(d) {
            return E(this, d);
          },
          on: function(d, y) {
            var _ = this;
            return d === "data" ? this._worker.on(d, function(k) {
              y.call(_, k.data, k.meta);
            }) : this._worker.on(d, function() {
              i.delay(y, arguments, _);
            }), this;
          },
          resume: function() {
            return i.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(d) {
            if (i.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new v(this, { objectMode: this._outputType !== "nodebuffer" }, d);
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
      30: [function(r, n, a) {
        if (a.base64 = !0, a.array = !0, a.string = !0, a.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", a.nodebuffer = typeof Buffer < "u", a.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") a.blob = !1;
        else {
          var i = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            a.blob = new Blob([i], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              u.append(i), a.blob = u.getBlob("application/zip").size === 0;
            } catch {
              a.blob = !1;
            }
          }
        }
        try {
          a.nodestream = !!r("readable-stream").Readable;
        } catch {
          a.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(r, n, a) {
        for (var i = r("./utils"), u = r("./support"), s = r("./nodejsUtils"), c = r("./stream/GenericWorker"), h = new Array(256), w = 0; w < 256; w++) h[w] = 252 <= w ? 6 : 248 <= w ? 5 : 240 <= w ? 4 : 224 <= w ? 3 : 192 <= w ? 2 : 1;
        h[254] = h[254] = 1;
        function v() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function E() {
          c.call(this, "utf-8 encode");
        }
        a.utf8encode = function(m) {
          return u.nodebuffer ? s.newBufferFrom(m, "utf-8") : (function(d) {
            var y, _, k, x, T, S = d.length, A = 0;
            for (x = 0; x < S; x++) (64512 & (_ = d.charCodeAt(x))) == 55296 && x + 1 < S && (64512 & (k = d.charCodeAt(x + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), x++), A += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
            for (y = u.uint8array ? new Uint8Array(A) : new Array(A), x = T = 0; T < A; x++) (64512 & (_ = d.charCodeAt(x))) == 55296 && x + 1 < S && (64512 & (k = d.charCodeAt(x + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), x++), _ < 128 ? y[T++] = _ : (_ < 2048 ? y[T++] = 192 | _ >>> 6 : (_ < 65536 ? y[T++] = 224 | _ >>> 12 : (y[T++] = 240 | _ >>> 18, y[T++] = 128 | _ >>> 12 & 63), y[T++] = 128 | _ >>> 6 & 63), y[T++] = 128 | 63 & _);
            return y;
          })(m);
        }, a.utf8decode = function(m) {
          return u.nodebuffer ? i.transformTo("nodebuffer", m).toString("utf-8") : (function(d) {
            var y, _, k, x, T = d.length, S = new Array(2 * T);
            for (y = _ = 0; y < T; ) if ((k = d[y++]) < 128) S[_++] = k;
            else if (4 < (x = h[k])) S[_++] = 65533, y += x - 1;
            else {
              for (k &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && y < T; ) k = k << 6 | 63 & d[y++], x--;
              1 < x ? S[_++] = 65533 : k < 65536 ? S[_++] = k : (k -= 65536, S[_++] = 55296 | k >> 10 & 1023, S[_++] = 56320 | 1023 & k);
            }
            return S.length !== _ && (S.subarray ? S = S.subarray(0, _) : S.length = _), i.applyFromCharCode(S);
          })(m = i.transformTo(u.uint8array ? "uint8array" : "array", m));
        }, i.inherits(v, c), v.prototype.processChunk = function(m) {
          var d = i.transformTo(u.uint8array ? "uint8array" : "array", m.data);
          if (this.leftOver && this.leftOver.length) {
            if (u.uint8array) {
              var y = d;
              (d = new Uint8Array(y.length + this.leftOver.length)).set(this.leftOver, 0), d.set(y, this.leftOver.length);
            } else d = this.leftOver.concat(d);
            this.leftOver = null;
          }
          var _ = (function(x, T) {
            var S;
            for ((T = T || x.length) > x.length && (T = x.length), S = T - 1; 0 <= S && (192 & x[S]) == 128; ) S--;
            return S < 0 || S === 0 ? T : S + h[x[S]] > T ? S : T;
          })(d), k = d;
          _ !== d.length && (u.uint8array ? (k = d.subarray(0, _), this.leftOver = d.subarray(_, d.length)) : (k = d.slice(0, _), this.leftOver = d.slice(_, d.length))), this.push({
            data: a.utf8decode(k),
            meta: m.meta
          });
        }, v.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: a.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, a.Utf8DecodeWorker = v, i.inherits(E, c), E.prototype.processChunk = function(m) {
          this.push({
            data: a.utf8encode(m.data),
            meta: m.meta
          });
        }, a.Utf8EncodeWorker = E;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, n, a) {
        var i = r("./support"), u = r("./base64"), s = r("./nodejsUtils"), c = r("./external");
        function h(y) {
          return y;
        }
        function w(y, _) {
          for (var k = 0; k < y.length; ++k) _[k] = 255 & y.charCodeAt(k);
          return _;
        }
        r("setimmediate"), a.newBlob = function(y, _) {
          a.checkSupport("blob");
          try {
            return new Blob([y], { type: _ });
          } catch {
            try {
              var k = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return k.append(y), k.getBlob(_);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var v = {
          stringifyByChunk: function(y, _, k) {
            var x = [], T = 0, S = y.length;
            if (S <= k) return String.fromCharCode.apply(null, y);
            for (; T < S; ) _ === "array" || _ === "nodebuffer" ? x.push(String.fromCharCode.apply(null, y.slice(T, Math.min(T + k, S)))) : x.push(String.fromCharCode.apply(null, y.subarray(T, Math.min(T + k, S)))), T += k;
            return x.join("");
          },
          stringifyByChar: function(y) {
            for (var _ = "", k = 0; k < y.length; k++) _ += String.fromCharCode(y[k]);
            return _;
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
        function E(y) {
          var _ = 65536, k = a.getTypeOf(y), x = !0;
          if (k === "uint8array" ? x = v.applyCanBeUsed.uint8array : k === "nodebuffer" && (x = v.applyCanBeUsed.nodebuffer), x) for (; 1 < _; ) try {
            return v.stringifyByChunk(y, k, _);
          } catch {
            _ = Math.floor(_ / 2);
          }
          return v.stringifyByChar(y);
        }
        function m(y, _) {
          for (var k = 0; k < y.length; k++) _[k] = y[k];
          return _;
        }
        a.applyFromCharCode = E;
        var d = {};
        d.string = {
          string: h,
          array: function(y) {
            return w(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return d.string.uint8array(y).buffer;
          },
          uint8array: function(y) {
            return w(y, new Uint8Array(y.length));
          },
          nodebuffer: function(y) {
            return w(y, s.allocBuffer(y.length));
          }
        }, d.array = {
          string: E,
          array: h,
          arraybuffer: function(y) {
            return new Uint8Array(y).buffer;
          },
          uint8array: function(y) {
            return new Uint8Array(y);
          },
          nodebuffer: function(y) {
            return s.newBufferFrom(y);
          }
        }, d.arraybuffer = {
          string: function(y) {
            return E(new Uint8Array(y));
          },
          array: function(y) {
            return m(new Uint8Array(y), new Array(y.byteLength));
          },
          arraybuffer: h,
          uint8array: function(y) {
            return new Uint8Array(y);
          },
          nodebuffer: function(y) {
            return s.newBufferFrom(new Uint8Array(y));
          }
        }, d.uint8array = {
          string: E,
          array: function(y) {
            return m(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return y.buffer;
          },
          uint8array: h,
          nodebuffer: function(y) {
            return s.newBufferFrom(y);
          }
        }, d.nodebuffer = {
          string: E,
          array: function(y) {
            return m(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return d.nodebuffer.uint8array(y).buffer;
          },
          uint8array: function(y) {
            return m(y, new Uint8Array(y.length));
          },
          nodebuffer: h
        }, a.transformTo = function(y, _) {
          return _ = _ || "", y ? (a.checkSupport(y), d[a.getTypeOf(_)][y](_)) : _;
        }, a.resolve = function(y) {
          for (var _ = y.split("/"), k = [], x = 0; x < _.length; x++) {
            var T = _[x];
            T === "." || T === "" && x !== 0 && x !== _.length - 1 || (T === ".." ? k.pop() : k.push(T));
          }
          return k.join("/");
        }, a.getTypeOf = function(y) {
          if (typeof y == "string") return "string";
          var _ = Object.prototype.toString.call(y);
          return _ === "[object Array]" ? "array" : i.nodebuffer && s.isBuffer(y) ? "nodebuffer" : i.uint8array && _ === "[object Uint8Array]" ? "uint8array" : i.arraybuffer && _ === "[object ArrayBuffer]" ? "arraybuffer" : void 0;
        }, a.checkSupport = function(y) {
          if (!i[y.toLowerCase()]) throw new Error(y + " is not supported by this platform");
        }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(y) {
          var _, k, x = "";
          for (k = 0; k < (y || "").length; k++) x += "\\x" + ((_ = y.charCodeAt(k)) < 16 ? "0" : "") + _.toString(16).toUpperCase();
          return x;
        }, a.delay = function(y, _, k) {
          setImmediate(function() {
            y.apply(k || null, _ || []);
          });
        }, a.inherits = function(y, _) {
          function k() {
          }
          k.prototype = _.prototype, y.prototype = new k();
        }, a.extend = function() {
          var y, _, k = {};
          for (y = 0; y < arguments.length; y++) for (_ in arguments[y]) Object.prototype.hasOwnProperty.call(arguments[y], _) && k[_] === void 0 && (k[_] = arguments[y][_]);
          return k;
        }, a.prepareContent = function(y, _, k, x, T) {
          return c.Promise.resolve(_).then(function(S) {
            return i.blob && (S instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(S)) !== -1) ? Blob.prototype.arrayBuffer !== void 0 ? S.arrayBuffer() : typeof FileReader < "u" ? new c.Promise(function(A, b) {
              var P = new FileReader();
              P.onload = function(M) {
                A(M.target.result);
              }, P.onerror = function(M) {
                b(M.target.error);
              }, P.readAsArrayBuffer(S);
            }) : c.Promise.reject(/* @__PURE__ */ new Error(y + " is a Blob, but we have no way of reading it.")) : S;
          }).then(function(S) {
            var A = a.getTypeOf(S);
            return A ? (A === "arraybuffer" ? S = a.transformTo("uint8array", S) : A === "string" && (T ? S = u.decode(S) : k && x !== !0 && (S = (function(b) {
              return w(b, i.uint8array ? new Uint8Array(b.length) : new Array(b.length));
            })(S))), S) : c.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + y + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(r, n, a) {
        var i = r("./reader/readerFor"), u = r("./utils"), s = r("./signature"), c = r("./zipEntry"), h = r("./support");
        function w(v) {
          this.files = [], this.loadOptions = v;
        }
        w.prototype = {
          checkSignature: function(v) {
            if (!this.reader.readAndCheckSignature(v)) {
              this.reader.index -= 4;
              var E = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + u.pretty(E) + ", expected " + u.pretty(v) + ")");
            }
          },
          isSignature: function(v, E) {
            var m = this.reader.index;
            this.reader.setIndex(v);
            var d = this.reader.readString(4) === E;
            return this.reader.setIndex(m), d;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var v = this.reader.readData(this.zipCommentLength), E = h.uint8array ? "uint8array" : "array", m = u.transformTo(E, v);
            this.zipComment = this.loadOptions.decodeFileName(m);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var v, E, m, d = this.zip64EndOfCentralSize - 44; 0 < d; ) v = this.reader.readInt(2), E = this.reader.readInt(4), m = this.reader.readData(E), this.zip64ExtensibleData[v] = {
              id: v,
              length: E,
              value: m
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            for (var v = 0, E; v < this.files.length; v++) E = this.files[v], this.reader.setIndex(E.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), E.readLocalPart(this.reader), E.handleUTF8(), E.processAttributes();
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
            var E = v;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === u.MAX_VALUE_16BITS || this.diskWithCentralDirStart === u.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === u.MAX_VALUE_16BITS || this.centralDirRecords === u.MAX_VALUE_16BITS || this.centralDirSize === u.MAX_VALUE_32BITS || this.centralDirOffset === u.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (v = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(v), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var m = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
            var d = E - m;
            if (0 < d) this.isSignature(E, s.CENTRAL_FILE_HEADER) || (this.reader.zero = d);
            else if (d < 0) throw new Error("Corrupted zip: missing " + Math.abs(d) + " bytes.");
          },
          prepareReader: function(v) {
            this.reader = i(v);
          },
          load: function(v) {
            this.prepareReader(v), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, n.exports = w;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(r, n, a) {
        var i = r("./reader/readerFor"), u = r("./utils"), s = r("./compressedObject"), c = r("./crc32"), h = r("./utf8"), w = r("./compressions"), v = r("./support");
        function E(m, d) {
          this.options = m, this.loadOptions = d;
        }
        E.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(m) {
            var d, y;
            if (m.skip(22), this.fileNameLength = m.readInt(2), y = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(y), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((d = (function(_) {
              for (var k in w) if (Object.prototype.hasOwnProperty.call(w, k) && w[k].magic === _) return w[k];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + u.pretty(this.compressionMethod) + " unknown (inner file : " + u.transformTo("string", this.fileName) + ")");
            this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, d, m.readData(this.compressedSize));
          },
          readCentralPart: function(m) {
            this.versionMadeBy = m.readInt(2), m.skip(2), this.bitFlag = m.readInt(2), this.compressionMethod = m.readString(2), this.date = m.readDate(), this.crc32 = m.readInt(4), this.compressedSize = m.readInt(4), this.uncompressedSize = m.readInt(4);
            var d = m.readInt(2);
            if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            m.skip(d), this.readExtraFields(m), this.parseZIP64ExtraField(m), this.fileComment = m.readData(this.fileCommentLength);
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
            var d, y, _, k = m.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); m.index + 4 < k; ) d = m.readInt(2), y = m.readInt(2), _ = m.readData(y), this.extraFields[d] = {
              id: d,
              length: y,
              value: _
            };
            m.setIndex(k);
          },
          handleUTF8: function() {
            var m = v.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = h.utf8decode(this.fileName), this.fileCommentStr = h.utf8decode(this.fileComment);
            else {
              var d = this.findExtraFieldUnicodePath();
              if (d !== null) this.fileNameStr = d;
              else {
                var y = u.transformTo(m, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(y);
              }
              var _ = this.findExtraFieldUnicodeComment();
              if (_ !== null) this.fileCommentStr = _;
              else {
                var k = u.transformTo(m, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(k);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var m = this.extraFields[28789];
            if (m) {
              var d = i(m.value);
              return d.readInt(1) !== 1 || c(this.fileName) !== d.readInt(4) ? null : h.utf8decode(d.readData(m.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var m = this.extraFields[25461];
            if (m) {
              var d = i(m.value);
              return d.readInt(1) !== 1 || c(this.fileComment) !== d.readInt(4) ? null : h.utf8decode(d.readData(m.length - 5));
            }
            return null;
          }
        }, n.exports = E;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(r, n, a) {
        function i(d, y, _) {
          this.name = d, this.dir = _.dir, this.date = _.date, this.comment = _.comment, this.unixPermissions = _.unixPermissions, this.dosPermissions = _.dosPermissions, this._data = y, this._dataBinary = _.binary, this.options = {
            compression: _.compression,
            compressionOptions: _.compressionOptions
          };
        }
        var u = r("./stream/StreamHelper"), s = r("./stream/DataWorker"), c = r("./utf8"), h = r("./compressedObject"), w = r("./stream/GenericWorker");
        i.prototype = {
          internalStream: function(d) {
            var y = null, _ = "string";
            try {
              if (!d) throw new Error("No output type specified.");
              var k = (_ = d.toLowerCase()) === "string" || _ === "text";
              _ !== "binarystring" && _ !== "text" || (_ = "string"), y = this._decompressWorker();
              var x = !this._dataBinary;
              x && !k && (y = y.pipe(new c.Utf8EncodeWorker())), !x && k && (y = y.pipe(new c.Utf8DecodeWorker()));
            } catch (T) {
              (y = new w("error")).error(T);
            }
            return new u(y, _, "");
          },
          async: function(d, y) {
            return this.internalStream(d).accumulate(y);
          },
          nodeStream: function(d, y) {
            return this.internalStream(d || "nodebuffer").toNodejsStream(y);
          },
          _compressWorker: function(d, y) {
            if (this._data instanceof h && this._data.compression.magic === d.magic) return this._data.getCompressedWorker();
            var _ = this._decompressWorker();
            return this._dataBinary || (_ = _.pipe(new c.Utf8EncodeWorker())), h.createWorkerFrom(_, d, y);
          },
          _decompressWorker: function() {
            return this._data instanceof h ? this._data.getContentWorker() : this._data instanceof w ? this._data : new s(this._data);
          }
        };
        for (var v = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], E = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, m = 0; m < v.length; m++) i.prototype[v[m]] = E;
        n.exports = i;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(r, n, a) {
        (function(i) {
          var u, s, c = i.MutationObserver || i.WebKitMutationObserver;
          if (c) {
            var h = 0, w = new c(d), v = i.document.createTextNode("");
            w.observe(v, { characterData: !0 }), u = function() {
              v.data = h = ++h % 2;
            };
          } else if (i.setImmediate || i.MessageChannel === void 0) u = "document" in i && "onreadystatechange" in i.document.createElement("script") ? function() {
            var y = i.document.createElement("script");
            y.onreadystatechange = function() {
              d(), y.onreadystatechange = null, y.parentNode.removeChild(y), y = null;
            }, i.document.documentElement.appendChild(y);
          } : function() {
            setTimeout(d, 0);
          };
          else {
            var E = new i.MessageChannel();
            E.port1.onmessage = d, u = function() {
              E.port2.postMessage(0);
            };
          }
          var m = [];
          function d() {
            var y, _;
            s = !0;
            for (var k = m.length; k; ) {
              for (_ = m, m = [], y = -1; ++y < k; ) _[y]();
              k = m.length;
            }
            s = !1;
          }
          n.exports = function(y) {
            m.push(y) !== 1 || s || u();
          };
        }).call(this, typeof Ne < "u" ? Ne : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, n, a) {
        var i = r("immediate");
        function u() {
        }
        var s = {}, c = ["REJECTED"], h = ["FULFILLED"], w = ["PENDING"];
        function v(k) {
          if (typeof k != "function") throw new TypeError("resolver must be a function");
          this.state = w, this.queue = [], this.outcome = void 0, k !== u && y(this, k);
        }
        function E(k, x, T) {
          this.promise = k, typeof x == "function" && (this.onFulfilled = x, this.callFulfilled = this.otherCallFulfilled), typeof T == "function" && (this.onRejected = T, this.callRejected = this.otherCallRejected);
        }
        function m(k, x, T) {
          i(function() {
            var S;
            try {
              S = x(T);
            } catch (A) {
              return s.reject(k, A);
            }
            S === k ? s.reject(k, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : s.resolve(k, S);
          });
        }
        function d(k) {
          var x = k && k.then;
          if (k && (typeof k == "object" || typeof k == "function") && typeof x == "function") return function() {
            x.apply(k, arguments);
          };
        }
        function y(k, x) {
          var T = !1;
          function S(P) {
            T || (T = !0, s.reject(k, P));
          }
          function A(P) {
            T || (T = !0, s.resolve(k, P));
          }
          var b = _(function() {
            x(A, S);
          });
          b.status === "error" && S(b.value);
        }
        function _(k, x) {
          var T = {};
          try {
            T.value = k(x), T.status = "success";
          } catch (S) {
            T.status = "error", T.value = S;
          }
          return T;
        }
        (n.exports = v).prototype.finally = function(k) {
          if (typeof k != "function") return this;
          var x = this.constructor;
          return this.then(function(T) {
            return x.resolve(k()).then(function() {
              return T;
            });
          }, function(T) {
            return x.resolve(k()).then(function() {
              throw T;
            });
          });
        }, v.prototype.catch = function(k) {
          return this.then(null, k);
        }, v.prototype.then = function(k, x) {
          if (typeof k != "function" && this.state === h || typeof x != "function" && this.state === c) return this;
          var T = new this.constructor(u);
          return this.state !== w ? m(T, this.state === h ? k : x, this.outcome) : this.queue.push(new E(T, k, x)), T;
        }, E.prototype.callFulfilled = function(k) {
          s.resolve(this.promise, k);
        }, E.prototype.otherCallFulfilled = function(k) {
          m(this.promise, this.onFulfilled, k);
        }, E.prototype.callRejected = function(k) {
          s.reject(this.promise, k);
        }, E.prototype.otherCallRejected = function(k) {
          m(this.promise, this.onRejected, k);
        }, s.resolve = function(k, x) {
          var T = _(d, x);
          if (T.status === "error") return s.reject(k, T.value);
          var S = T.value;
          if (S) y(k, S);
          else {
            k.state = h, k.outcome = x;
            for (var A = -1, b = k.queue.length; ++A < b; ) k.queue[A].callFulfilled(x);
          }
          return k;
        }, s.reject = function(k, x) {
          k.state = c, k.outcome = x;
          for (var T = -1, S = k.queue.length; ++T < S; ) k.queue[T].callRejected(x);
          return k;
        }, v.resolve = function(k) {
          return k instanceof this ? k : s.resolve(new this(u), k);
        }, v.reject = function(k) {
          var x = new this(u);
          return s.reject(x, k);
        }, v.all = function(k) {
          var x = this;
          if (Object.prototype.toString.call(k) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var T = k.length, S = !1;
          if (!T) return this.resolve([]);
          for (var A = new Array(T), b = 0, P = -1, M = new this(u); ++P < T; ) R(k[P], P);
          return M;
          function R(K, ee) {
            x.resolve(K).then(function(O) {
              A[ee] = O, ++b !== T || S || (S = !0, s.resolve(M, A));
            }, function(O) {
              S || (S = !0, s.reject(M, O));
            });
          }
        }, v.race = function(k) {
          var x = this;
          if (Object.prototype.toString.call(k) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var T = k.length, S = !1;
          if (!T) return this.resolve([]);
          for (var A = -1, b = new this(u); ++A < T; ) P = k[A], x.resolve(P).then(function(M) {
            S || (S = !0, s.resolve(b, M));
          }, function(M) {
            S || (S = !0, s.reject(b, M));
          });
          var P;
          return b;
        };
      }, { immediate: 36 }],
      38: [function(r, n, a) {
        var i = {};
        (0, r("./lib/utils/common").assign)(i, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = i;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, n, a) {
        var i = r("./zlib/deflate"), u = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/messages"), h = r("./zlib/zstream"), w = Object.prototype.toString, v = 0, E = -1, m = 0, d = 8;
        function y(k) {
          if (!(this instanceof y)) return new y(k);
          this.options = u.assign({
            level: E,
            method: d,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: m,
            to: ""
          }, k || {});
          var x = this.options;
          x.raw && 0 < x.windowBits ? x.windowBits = -x.windowBits : x.gzip && 0 < x.windowBits && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new h(), this.strm.avail_out = 0;
          var T = i.deflateInit2(this.strm, x.level, x.method, x.windowBits, x.memLevel, x.strategy);
          if (T !== v) throw new Error(c[T]);
          if (x.header && i.deflateSetHeader(this.strm, x.header), x.dictionary) {
            var S = typeof x.dictionary == "string" ? s.string2buf(x.dictionary) : w.call(x.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(x.dictionary) : x.dictionary;
            if ((T = i.deflateSetDictionary(this.strm, S)) !== v) throw new Error(c[T]);
            this._dict_set = !0;
          }
        }
        function _(k, x) {
          var T = new y(x);
          if (T.push(k, !0), T.err) throw T.msg || c[T.err];
          return T.result;
        }
        y.prototype.push = function(k, x) {
          var T, S, A = this.strm, b = this.options.chunkSize;
          if (this.ended) return !1;
          S = x === ~~x ? x : x === !0 ? 4 : 0, typeof k == "string" ? A.input = s.string2buf(k) : w.call(k) === "[object ArrayBuffer]" ? A.input = new Uint8Array(k) : A.input = k, A.next_in = 0, A.avail_in = A.input.length;
          do {
            if (A.avail_out === 0 && (A.output = new u.Buf8(b), A.next_out = 0, A.avail_out = b), (T = i.deflate(A, S)) !== 1 && T !== v) return this.onEnd(T), !(this.ended = !0);
            A.avail_out !== 0 && (A.avail_in !== 0 || S !== 4 && S !== 2) || (this.options.to === "string" ? this.onData(s.buf2binstring(u.shrinkBuf(A.output, A.next_out))) : this.onData(u.shrinkBuf(A.output, A.next_out)));
          } while ((0 < A.avail_in || A.avail_out === 0) && T !== 1);
          return S === 4 ? (T = i.deflateEnd(this.strm), this.onEnd(T), this.ended = !0, T === v) : S !== 2 || (this.onEnd(v), !(A.avail_out = 0));
        }, y.prototype.onData = function(k) {
          this.chunks.push(k);
        }, y.prototype.onEnd = function(k) {
          k === v && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = k, this.msg = this.strm.msg;
        }, a.Deflate = y, a.deflate = _, a.deflateRaw = function(k, x) {
          return (x = x || {}).raw = !0, _(k, x);
        }, a.gzip = function(k, x) {
          return (x = x || {}).gzip = !0, _(k, x);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, n, a) {
        var i = r("./zlib/inflate"), u = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/constants"), h = r("./zlib/messages"), w = r("./zlib/zstream"), v = r("./zlib/gzheader"), E = Object.prototype.toString;
        function m(y) {
          if (!(this instanceof m)) return new m(y);
          this.options = u.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, y || {});
          var _ = this.options;
          _.raw && 0 <= _.windowBits && _.windowBits < 16 && (_.windowBits = -_.windowBits, _.windowBits === 0 && (_.windowBits = -15)), !(0 <= _.windowBits && _.windowBits < 16) || y && y.windowBits || (_.windowBits += 32), 15 < _.windowBits && _.windowBits < 48 && (15 & _.windowBits) == 0 && (_.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new w(), this.strm.avail_out = 0;
          var k = i.inflateInit2(this.strm, _.windowBits);
          if (k !== c.Z_OK) throw new Error(h[k]);
          this.header = new v(), i.inflateGetHeader(this.strm, this.header);
        }
        function d(y, _) {
          var k = new m(_);
          if (k.push(y, !0), k.err) throw k.msg || h[k.err];
          return k.result;
        }
        m.prototype.push = function(y, _) {
          var k, x, T, S, A, b, P = this.strm, M = this.options.chunkSize, R = this.options.dictionary, K = !1;
          if (this.ended) return !1;
          x = _ === ~~_ ? _ : _ === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof y == "string" ? P.input = s.binstring2buf(y) : E.call(y) === "[object ArrayBuffer]" ? P.input = new Uint8Array(y) : P.input = y, P.next_in = 0, P.avail_in = P.input.length;
          do {
            if (P.avail_out === 0 && (P.output = new u.Buf8(M), P.next_out = 0, P.avail_out = M), (k = i.inflate(P, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && R && (b = typeof R == "string" ? s.string2buf(R) : E.call(R) === "[object ArrayBuffer]" ? new Uint8Array(R) : R, k = i.inflateSetDictionary(this.strm, b)), k === c.Z_BUF_ERROR && K === !0 && (k = c.Z_OK, K = !1), k !== c.Z_STREAM_END && k !== c.Z_OK) return this.onEnd(k), !(this.ended = !0);
            P.next_out && (P.avail_out !== 0 && k !== c.Z_STREAM_END && (P.avail_in !== 0 || x !== c.Z_FINISH && x !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (T = s.utf8border(P.output, P.next_out), S = P.next_out - T, A = s.buf2string(P.output, T), P.next_out = S, P.avail_out = M - S, S && u.arraySet(P.output, P.output, T, S, 0), this.onData(A)) : this.onData(u.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (K = !0);
          } while ((0 < P.avail_in || P.avail_out === 0) && k !== c.Z_STREAM_END);
          return k === c.Z_STREAM_END && (x = c.Z_FINISH), x === c.Z_FINISH ? (k = i.inflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === c.Z_OK) : x !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(P.avail_out = 0));
        }, m.prototype.onData = function(y) {
          this.chunks.push(y);
        }, m.prototype.onEnd = function(y) {
          y === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = y, this.msg = this.strm.msg;
        }, a.Inflate = m, a.inflate = d, a.inflateRaw = function(y, _) {
          return (_ = _ || {}).raw = !0, d(y, _);
        }, a.ungzip = d;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, n, a) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        a.assign = function(c) {
          for (var h = Array.prototype.slice.call(arguments, 1); h.length; ) {
            var w = h.shift();
            if (w) {
              if (typeof w != "object") throw new TypeError(w + "must be non-object");
              for (var v in w) w.hasOwnProperty(v) && (c[v] = w[v]);
            }
          }
          return c;
        }, a.shrinkBuf = function(c, h) {
          return c.length === h ? c : c.subarray ? c.subarray(0, h) : (c.length = h, c);
        };
        var u = {
          arraySet: function(c, h, w, v, E) {
            if (h.subarray && c.subarray) c.set(h.subarray(w, w + v), E);
            else for (var m = 0; m < v; m++) c[E + m] = h[w + m];
          },
          flattenChunks: function(c) {
            for (var h = v = 0, w = c.length, v, E, m, d; h < w; h++) v += c[h].length;
            for (d = new Uint8Array(v), h = E = 0, w = c.length; h < w; h++) m = c[h], d.set(m, E), E += m.length;
            return d;
          }
        }, s = {
          arraySet: function(c, h, w, v, E) {
            for (var m = 0; m < v; m++) c[E + m] = h[w + m];
          },
          flattenChunks: function(c) {
            return [].concat.apply([], c);
          }
        };
        a.setTyped = function(c) {
          c ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, u)) : (a.Buf8 = Array, a.Buf16 = Array, a.Buf32 = Array, a.assign(a, s));
        }, a.setTyped(i);
      }, {}],
      42: [function(r, n, a) {
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
        for (var c = new i.Buf8(256), h = 0; h < 256; h++) c[h] = 252 <= h ? 6 : 248 <= h ? 5 : 240 <= h ? 4 : 224 <= h ? 3 : 192 <= h ? 2 : 1;
        function w(v, E) {
          if (E < 65537 && (v.subarray && s || !v.subarray && u)) return String.fromCharCode.apply(null, i.shrinkBuf(v, E));
          for (var m = "", d = 0; d < E; d++) m += String.fromCharCode(v[d]);
          return m;
        }
        c[254] = c[254] = 1, a.string2buf = function(v) {
          var E, m, d, y, _, k = v.length, x = 0;
          for (y = 0; y < k; y++) (64512 & (m = v.charCodeAt(y))) == 55296 && y + 1 < k && (64512 & (d = v.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), y++), x += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (E = new i.Buf8(x), y = _ = 0; _ < x; y++) (64512 & (m = v.charCodeAt(y))) == 55296 && y + 1 < k && (64512 & (d = v.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (d - 56320), y++), m < 128 ? E[_++] = m : (m < 2048 ? E[_++] = 192 | m >>> 6 : (m < 65536 ? E[_++] = 224 | m >>> 12 : (E[_++] = 240 | m >>> 18, E[_++] = 128 | m >>> 12 & 63), E[_++] = 128 | m >>> 6 & 63), E[_++] = 128 | 63 & m);
          return E;
        }, a.buf2binstring = function(v) {
          return w(v, v.length);
        }, a.binstring2buf = function(v) {
          for (var E = new i.Buf8(v.length), m = 0, d = E.length; m < d; m++) E[m] = v.charCodeAt(m);
          return E;
        }, a.buf2string = function(v, E) {
          var m, d, y, _, k = E || v.length, x = new Array(2 * k);
          for (m = d = 0; m < k; ) if ((y = v[m++]) < 128) x[d++] = y;
          else if (4 < (_ = c[y])) x[d++] = 65533, m += _ - 1;
          else {
            for (y &= _ === 2 ? 31 : _ === 3 ? 15 : 7; 1 < _ && m < k; ) y = y << 6 | 63 & v[m++], _--;
            1 < _ ? x[d++] = 65533 : y < 65536 ? x[d++] = y : (y -= 65536, x[d++] = 55296 | y >> 10 & 1023, x[d++] = 56320 | 1023 & y);
          }
          return w(x, d);
        }, a.utf8border = function(v, E) {
          var m;
          for ((E = E || v.length) > v.length && (E = v.length), m = E - 1; 0 <= m && (192 & v[m]) == 128; ) m--;
          return m < 0 || m === 0 ? E : m + c[v[m]] > E ? m : E;
        };
      }, { "./common": 41 }],
      43: [function(r, n, a) {
        n.exports = function(i, u, s, c) {
          for (var h = 65535 & i | 0, w = i >>> 16 & 65535 | 0, v = 0; s !== 0; ) {
            for (s -= v = 2e3 < s ? 2e3 : s; w = w + (h = h + u[c++] | 0) | 0, --v; ) ;
            h %= 65521, w %= 65521;
          }
          return h | w << 16 | 0;
        };
      }, {}],
      44: [function(r, n, a) {
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
      45: [function(r, n, a) {
        var i = (function() {
          for (var u, s = [], c = 0; c < 256; c++) {
            u = c;
            for (var h = 0; h < 8; h++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
            s[c] = u;
          }
          return s;
        })();
        n.exports = function(u, s, c, h) {
          var w = i, v = h + c;
          u ^= -1;
          for (var E = h; E < v; E++) u = u >>> 8 ^ w[255 & (u ^ s[E])];
          return -1 ^ u;
        };
      }, {}],
      46: [function(r, n, a) {
        var i, u = r("../utils/common"), s = r("./trees"), c = r("./adler32"), h = r("./crc32"), w = r("./messages"), v = 0, E = 4, m = 0, d = -2, y = -1, _ = 4, k = 2, x = 8, T = 9, S = 286, A = 30, b = 19, P = 2 * S + 1, M = 15, R = 3, K = 258, ee = K + R + 1, O = 42, z = 113, I = 1, H = 2, Q = 3, q = 4;
        function le(f, G) {
          return f.msg = w[G], G;
        }
        function Y(f) {
          return (f << 1) - (4 < f ? 9 : 0);
        }
        function te(f) {
          for (var G = f.length; 0 <= --G; ) f[G] = 0;
        }
        function V(f) {
          var G = f.state, N = G.pending;
          N > f.avail_out && (N = f.avail_out), N !== 0 && (u.arraySet(f.output, G.pending_buf, G.pending_out, N, f.next_out), f.next_out += N, G.pending_out += N, f.total_out += N, f.avail_out -= N, G.pending -= N, G.pending === 0 && (G.pending_out = 0));
        }
        function F(f, G) {
          s._tr_flush_block(f, 0 <= f.block_start ? f.block_start : -1, f.strstart - f.block_start, G), f.block_start = f.strstart, V(f.strm);
        }
        function X(f, G) {
          f.pending_buf[f.pending++] = G;
        }
        function J(f, G) {
          f.pending_buf[f.pending++] = G >>> 8 & 255, f.pending_buf[f.pending++] = 255 & G;
        }
        function re(f, G) {
          var N, o, l = f.max_chain_length, g = f.strstart, B = f.prev_length, $ = f.nice_match, j = f.strstart > f.w_size - ee ? f.strstart - (f.w_size - ee) : 0, ie = f.window, ue = f.w_mask, oe = f.prev, de = f.strstart + K, me = ie[g + B - 1], we = ie[g + B];
          f.prev_length >= f.good_match && (l >>= 2), $ > f.lookahead && ($ = f.lookahead);
          do
            if (ie[(N = G) + B] === we && ie[N + B - 1] === me && ie[N] === ie[g] && ie[++N] === ie[g + 1]) {
              g += 2, N++;
              do
                ;
              while (ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && g < de);
              if (o = K - (de - g), g = de - K, B < o) {
                if (f.match_start = G, $ <= (B = o)) break;
                me = ie[g + B - 1], we = ie[g + B];
              }
            }
          while ((G = oe[G & ue]) > j && --l != 0);
          return B <= f.lookahead ? B : f.lookahead;
        }
        function pe(f) {
          var G, N, o, l, g, B, $, j, ie, ue, oe = f.w_size;
          do {
            if (l = f.window_size - f.lookahead - f.strstart, f.strstart >= oe + (oe - ee)) {
              for (u.arraySet(f.window, f.window, oe, oe, 0), f.match_start -= oe, f.strstart -= oe, f.block_start -= oe, G = N = f.hash_size; o = f.head[--G], f.head[G] = oe <= o ? o - oe : 0, --N; ) ;
              for (G = N = oe; o = f.prev[--G], f.prev[G] = oe <= o ? o - oe : 0, --N; ) ;
              l += oe;
            }
            if (f.strm.avail_in === 0) break;
            if (B = f.strm, $ = f.window, j = f.strstart + f.lookahead, ie = l, ue = void 0, ue = B.avail_in, ie < ue && (ue = ie), N = ue === 0 ? 0 : (B.avail_in -= ue, u.arraySet($, B.input, B.next_in, ue, j), B.state.wrap === 1 ? B.adler = c(B.adler, $, ue, j) : B.state.wrap === 2 && (B.adler = h(B.adler, $, ue, j)), B.next_in += ue, B.total_in += ue, ue), f.lookahead += N, f.lookahead + f.insert >= R) for (g = f.strstart - f.insert, f.ins_h = f.window[g], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[g + 1]) & f.hash_mask; f.insert && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[g + R - 1]) & f.hash_mask, f.prev[g & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = g, g++, f.insert--, !(f.lookahead + f.insert < R)); ) ;
          } while (f.lookahead < ee && f.strm.avail_in !== 0);
        }
        function C(f, G) {
          for (var N, o; ; ) {
            if (f.lookahead < ee) {
              if (pe(f), f.lookahead < ee && G === v) return I;
              if (f.lookahead === 0) break;
            }
            if (N = 0, f.lookahead >= R && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + R - 1]) & f.hash_mask, N = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), N !== 0 && f.strstart - N <= f.w_size - ee && (f.match_length = re(f, N)), f.match_length >= R) if (o = s._tr_tally(f, f.strstart - f.match_start, f.match_length - R), f.lookahead -= f.match_length, f.match_length <= f.max_lazy_match && f.lookahead >= R) {
              for (f.match_length--; f.strstart++, f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + R - 1]) & f.hash_mask, N = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart, --f.match_length != 0; ) ;
              f.strstart++;
            } else f.strstart += f.match_length, f.match_length = 0, f.ins_h = f.window[f.strstart], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + 1]) & f.hash_mask;
            else o = s._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++;
            if (o && (F(f, !1), f.strm.avail_out === 0)) return I;
          }
          return f.insert = f.strstart < R - 1 ? f.strstart : R - 1, G === E ? (F(f, !0), f.strm.avail_out === 0 ? Q : q) : f.last_lit && (F(f, !1), f.strm.avail_out === 0) ? I : H;
        }
        function p(f, G) {
          for (var N, o, l; ; ) {
            if (f.lookahead < ee) {
              if (pe(f), f.lookahead < ee && G === v) return I;
              if (f.lookahead === 0) break;
            }
            if (N = 0, f.lookahead >= R && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + R - 1]) & f.hash_mask, N = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), f.prev_length = f.match_length, f.prev_match = f.match_start, f.match_length = R - 1, N !== 0 && f.prev_length < f.max_lazy_match && f.strstart - N <= f.w_size - ee && (f.match_length = re(f, N), f.match_length <= 5 && (f.strategy === 1 || f.match_length === R && 4096 < f.strstart - f.match_start) && (f.match_length = R - 1)), f.prev_length >= R && f.match_length <= f.prev_length) {
              for (l = f.strstart + f.lookahead - R, o = s._tr_tally(f, f.strstart - 1 - f.prev_match, f.prev_length - R), f.lookahead -= f.prev_length - 1, f.prev_length -= 2; ++f.strstart <= l && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + R - 1]) & f.hash_mask, N = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), --f.prev_length != 0; ) ;
              if (f.match_available = 0, f.match_length = R - 1, f.strstart++, o && (F(f, !1), f.strm.avail_out === 0)) return I;
            } else if (f.match_available) {
              if ((o = s._tr_tally(f, 0, f.window[f.strstart - 1])) && F(f, !1), f.strstart++, f.lookahead--, f.strm.avail_out === 0) return I;
            } else f.match_available = 1, f.strstart++, f.lookahead--;
          }
          return f.match_available && (o = s._tr_tally(f, 0, f.window[f.strstart - 1]), f.match_available = 0), f.insert = f.strstart < R - 1 ? f.strstart : R - 1, G === E ? (F(f, !0), f.strm.avail_out === 0 ? Q : q) : f.last_lit && (F(f, !1), f.strm.avail_out === 0) ? I : H;
        }
        function W(f, G, N, o, l) {
          this.good_length = f, this.max_lazy = G, this.nice_length = N, this.max_chain = o, this.func = l;
        }
        function U() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(2 * P), this.dyn_dtree = new u.Buf16(2 * (2 * A + 1)), this.bl_tree = new u.Buf16(2 * (2 * b + 1)), te(this.dyn_ltree), te(this.dyn_dtree), te(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(M + 1), this.heap = new u.Buf16(2 * S + 1), te(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(2 * S + 1), te(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function ne(f) {
          var G;
          return f && f.state ? (f.total_in = f.total_out = 0, f.data_type = k, (G = f.state).pending = 0, G.pending_out = 0, G.wrap < 0 && (G.wrap = -G.wrap), G.status = G.wrap ? O : z, f.adler = G.wrap === 2 ? 0 : 1, G.last_flush = v, s._tr_init(G), m) : le(f, d);
        }
        function D(f) {
          var G = ne(f);
          return G === m && (function(N) {
            N.window_size = 2 * N.w_size, te(N.head), N.max_lazy_match = i[N.level].max_lazy, N.good_match = i[N.level].good_length, N.nice_match = i[N.level].nice_length, N.max_chain_length = i[N.level].max_chain, N.strstart = 0, N.block_start = 0, N.lookahead = 0, N.insert = 0, N.match_length = N.prev_length = R - 1, N.match_available = 0, N.ins_h = 0;
          })(f.state), G;
        }
        function L(f, G, N, o, l, g) {
          if (!f) return d;
          var B = 1;
          if (G === y && (G = 6), o < 0 ? (B = 0, o = -o) : 15 < o && (B = 2, o -= 16), l < 1 || T < l || N !== x || o < 8 || 15 < o || G < 0 || 9 < G || g < 0 || _ < g) return le(f, d);
          o === 8 && (o = 9);
          var $ = new U();
          return (f.state = $).strm = f, $.wrap = B, $.gzhead = null, $.w_bits = o, $.w_size = 1 << $.w_bits, $.w_mask = $.w_size - 1, $.hash_bits = l + 7, $.hash_size = 1 << $.hash_bits, $.hash_mask = $.hash_size - 1, $.hash_shift = ~~(($.hash_bits + R - 1) / R), $.window = new u.Buf8(2 * $.w_size), $.head = new u.Buf16($.hash_size), $.prev = new u.Buf16($.w_size), $.lit_bufsize = 1 << l + 6, $.pending_buf_size = 4 * $.lit_bufsize, $.pending_buf = new u.Buf8($.pending_buf_size), $.d_buf = 1 * $.lit_bufsize, $.l_buf = 3 * $.lit_bufsize, $.level = G, $.strategy = g, $.method = N, D(f);
        }
        i = [
          new W(0, 0, 0, 0, function(f, G) {
            var N = 65535;
            for (N > f.pending_buf_size - 5 && (N = f.pending_buf_size - 5); ; ) {
              if (f.lookahead <= 1) {
                if (pe(f), f.lookahead === 0 && G === v) return I;
                if (f.lookahead === 0) break;
              }
              f.strstart += f.lookahead, f.lookahead = 0;
              var o = f.block_start + N;
              if ((f.strstart === 0 || f.strstart >= o) && (f.lookahead = f.strstart - o, f.strstart = o, F(f, !1), f.strm.avail_out === 0) || f.strstart - f.block_start >= f.w_size - ee && (F(f, !1), f.strm.avail_out === 0)) return I;
            }
            return f.insert = 0, G === E ? (F(f, !0), f.strm.avail_out === 0 ? Q : q) : (f.strstart > f.block_start && (F(f, !1), f.strm.avail_out), I);
          }),
          new W(4, 4, 8, 4, C),
          new W(4, 5, 16, 8, C),
          new W(4, 6, 32, 32, C),
          new W(4, 4, 16, 16, p),
          new W(8, 16, 32, 32, p),
          new W(8, 16, 128, 128, p),
          new W(8, 32, 128, 256, p),
          new W(32, 128, 258, 1024, p),
          new W(32, 258, 258, 4096, p)
        ], a.deflateInit = function(f, G) {
          return L(f, G, x, 15, 8, 0);
        }, a.deflateInit2 = L, a.deflateReset = D, a.deflateResetKeep = ne, a.deflateSetHeader = function(f, G) {
          return f && f.state ? f.state.wrap !== 2 ? d : (f.state.gzhead = G, m) : d;
        }, a.deflate = function(f, G) {
          var N, o, l, g;
          if (!f || !f.state || 5 < G || G < 0) return f ? le(f, d) : d;
          if (o = f.state, !f.output || !f.input && f.avail_in !== 0 || o.status === 666 && G !== E) return le(f, f.avail_out === 0 ? -5 : d);
          if (o.strm = f, N = o.last_flush, o.last_flush = G, o.status === O) if (o.wrap === 2) f.adler = 0, X(o, 31), X(o, 139), X(o, 8), o.gzhead ? (X(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)), X(o, 255 & o.gzhead.time), X(o, o.gzhead.time >> 8 & 255), X(o, o.gzhead.time >> 16 & 255), X(o, o.gzhead.time >> 24 & 255), X(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), X(o, 255 & o.gzhead.os), o.gzhead.extra && o.gzhead.extra.length && (X(o, 255 & o.gzhead.extra.length), X(o, o.gzhead.extra.length >> 8 & 255)), o.gzhead.hcrc && (f.adler = h(f.adler, o.pending_buf, o.pending, 0)), o.gzindex = 0, o.status = 69) : (X(o, 0), X(o, 0), X(o, 0), X(o, 0), X(o, 0), X(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), X(o, 3), o.status = z);
          else {
            var B = x + (o.w_bits - 8 << 4) << 8;
            B |= (2 <= o.strategy || o.level < 2 ? 0 : o.level < 6 ? 1 : o.level === 6 ? 2 : 3) << 6, o.strstart !== 0 && (B |= 32), B += 31 - B % 31, o.status = z, J(o, B), o.strstart !== 0 && (J(o, f.adler >>> 16), J(o, 65535 & f.adler)), f.adler = 1;
          }
          if (o.status === 69) if (o.gzhead.extra) {
            for (l = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), V(f), l = o.pending, o.pending !== o.pending_buf_size)); ) X(o, 255 & o.gzhead.extra[o.gzindex]), o.gzindex++;
            o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), o.gzindex === o.gzhead.extra.length && (o.gzindex = 0, o.status = 73);
          } else o.status = 73;
          if (o.status === 73) if (o.gzhead.name) {
            l = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), V(f), l = o.pending, o.pending === o.pending_buf_size)) {
                g = 1;
                break;
              }
              g = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++) : 0, X(o, g);
            } while (g !== 0);
            o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), g === 0 && (o.gzindex = 0, o.status = 91);
          } else o.status = 91;
          if (o.status === 91) if (o.gzhead.comment) {
            l = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), V(f), l = o.pending, o.pending === o.pending_buf_size)) {
                g = 1;
                break;
              }
              g = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++) : 0, X(o, g);
            } while (g !== 0);
            o.gzhead.hcrc && o.pending > l && (f.adler = h(f.adler, o.pending_buf, o.pending - l, l)), g === 0 && (o.status = 103);
          } else o.status = 103;
          if (o.status === 103 && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && V(f), o.pending + 2 <= o.pending_buf_size && (X(o, 255 & f.adler), X(o, f.adler >> 8 & 255), f.adler = 0, o.status = z)) : o.status = z), o.pending !== 0) {
            if (V(f), f.avail_out === 0) return o.last_flush = -1, m;
          } else if (f.avail_in === 0 && Y(G) <= Y(N) && G !== E) return le(f, -5);
          if (o.status === 666 && f.avail_in !== 0) return le(f, -5);
          if (f.avail_in !== 0 || o.lookahead !== 0 || G !== v && o.status !== 666) {
            var $ = o.strategy === 2 ? (function(j, ie) {
              for (var ue; ; ) {
                if (j.lookahead === 0 && (pe(j), j.lookahead === 0)) {
                  if (ie === v) return I;
                  break;
                }
                if (j.match_length = 0, ue = s._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++, ue && (F(j, !1), j.strm.avail_out === 0)) return I;
              }
              return j.insert = 0, ie === E ? (F(j, !0), j.strm.avail_out === 0 ? Q : q) : j.last_lit && (F(j, !1), j.strm.avail_out === 0) ? I : H;
            })(o, G) : o.strategy === 3 ? (function(j, ie) {
              for (var ue, oe, de, me, we = j.window; ; ) {
                if (j.lookahead <= K) {
                  if (pe(j), j.lookahead <= K && ie === v) return I;
                  if (j.lookahead === 0) break;
                }
                if (j.match_length = 0, j.lookahead >= R && 0 < j.strstart && (oe = we[de = j.strstart - 1]) === we[++de] && oe === we[++de] && oe === we[++de]) {
                  me = j.strstart + K;
                  do
                    ;
                  while (oe === we[++de] && oe === we[++de] && oe === we[++de] && oe === we[++de] && oe === we[++de] && oe === we[++de] && oe === we[++de] && oe === we[++de] && de < me);
                  j.match_length = K - (me - de), j.match_length > j.lookahead && (j.match_length = j.lookahead);
                }
                if (j.match_length >= R ? (ue = s._tr_tally(j, 1, j.match_length - R), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (ue = s._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), ue && (F(j, !1), j.strm.avail_out === 0)) return I;
              }
              return j.insert = 0, ie === E ? (F(j, !0), j.strm.avail_out === 0 ? Q : q) : j.last_lit && (F(j, !1), j.strm.avail_out === 0) ? I : H;
            })(o, G) : i[o.level].func(o, G);
            if ($ !== Q && $ !== q || (o.status = 666), $ === I || $ === Q) return f.avail_out === 0 && (o.last_flush = -1), m;
            if ($ === H && (G === 1 ? s._tr_align(o) : G !== 5 && (s._tr_stored_block(o, 0, 0, !1), G === 3 && (te(o.head), o.lookahead === 0 && (o.strstart = 0, o.block_start = 0, o.insert = 0))), V(f), f.avail_out === 0)) return o.last_flush = -1, m;
          }
          return G !== E ? m : o.wrap <= 0 ? 1 : (o.wrap === 2 ? (X(o, 255 & f.adler), X(o, f.adler >> 8 & 255), X(o, f.adler >> 16 & 255), X(o, f.adler >> 24 & 255), X(o, 255 & f.total_in), X(o, f.total_in >> 8 & 255), X(o, f.total_in >> 16 & 255), X(o, f.total_in >> 24 & 255)) : (J(o, f.adler >>> 16), J(o, 65535 & f.adler)), V(f), 0 < o.wrap && (o.wrap = -o.wrap), o.pending !== 0 ? m : 1);
        }, a.deflateEnd = function(f) {
          var G;
          return f && f.state ? (G = f.state.status) !== O && G !== 69 && G !== 73 && G !== 91 && G !== 103 && G !== z && G !== 666 ? le(f, d) : (f.state = null, G === z ? le(f, -3) : m) : d;
        }, a.deflateSetDictionary = function(f, G) {
          var N, o, l, g, B, $, j, ie, ue = G.length;
          if (!f || !f.state || (g = (N = f.state).wrap) === 2 || g === 1 && N.status !== O || N.lookahead) return d;
          for (g === 1 && (f.adler = c(f.adler, G, ue, 0)), N.wrap = 0, ue >= N.w_size && (g === 0 && (te(N.head), N.strstart = 0, N.block_start = 0, N.insert = 0), ie = new u.Buf8(N.w_size), u.arraySet(ie, G, ue - N.w_size, N.w_size, 0), G = ie, ue = N.w_size), B = f.avail_in, $ = f.next_in, j = f.input, f.avail_in = ue, f.next_in = 0, f.input = G, pe(N); N.lookahead >= R; ) {
            for (o = N.strstart, l = N.lookahead - (R - 1); N.ins_h = (N.ins_h << N.hash_shift ^ N.window[o + R - 1]) & N.hash_mask, N.prev[o & N.w_mask] = N.head[N.ins_h], N.head[N.ins_h] = o, o++, --l; ) ;
            N.strstart = o, N.lookahead = R - 1, pe(N);
          }
          return N.strstart += N.lookahead, N.block_start = N.strstart, N.insert = N.lookahead, N.lookahead = 0, N.match_length = N.prev_length = R - 1, N.match_available = 0, f.next_in = $, f.input = j, f.avail_in = B, N.wrap = g, m;
        }, a.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, n, a) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, n, a) {
        n.exports = function(i, u) {
          var s = i.state, c = i.next_in, h, w, v, E, m, d, y, _, k, x, T, S, A, b, P, M, R, K, ee, O, z, I = i.input, H;
          h = c + (i.avail_in - 5), w = i.next_out, H = i.output, v = w - (u - i.avail_out), E = w + (i.avail_out - 257), m = s.dmax, d = s.wsize, y = s.whave, _ = s.wnext, k = s.window, x = s.hold, T = s.bits, S = s.lencode, A = s.distcode, b = (1 << s.lenbits) - 1, P = (1 << s.distbits) - 1;
          e: do {
            T < 15 && (x += I[c++] << T, T += 8, x += I[c++] << T, T += 8), M = S[x & b];
            t: for (; ; ) {
              if (x >>>= R = M >>> 24, T -= R, (R = M >>> 16 & 255) === 0) H[w++] = 65535 & M;
              else {
                if (!(16 & R)) {
                  if ((64 & R) == 0) {
                    M = S[(65535 & M) + (x & (1 << R) - 1)];
                    continue t;
                  }
                  if (32 & R) {
                    s.mode = 12;
                    break e;
                  }
                  i.msg = "invalid literal/length code", s.mode = 30;
                  break e;
                }
                K = 65535 & M, (R &= 15) && (T < R && (x += I[c++] << T, T += 8), K += x & (1 << R) - 1, x >>>= R, T -= R), T < 15 && (x += I[c++] << T, T += 8, x += I[c++] << T, T += 8), M = A[x & P];
                r: for (; ; ) {
                  if (x >>>= R = M >>> 24, T -= R, !(16 & (R = M >>> 16 & 255))) {
                    if ((64 & R) == 0) {
                      M = A[(65535 & M) + (x & (1 << R) - 1)];
                      continue r;
                    }
                    i.msg = "invalid distance code", s.mode = 30;
                    break e;
                  }
                  if (ee = 65535 & M, T < (R &= 15) && (x += I[c++] << T, (T += 8) < R && (x += I[c++] << T, T += 8)), m < (ee += x & (1 << R) - 1)) {
                    i.msg = "invalid distance too far back", s.mode = 30;
                    break e;
                  }
                  if (x >>>= R, T -= R, (R = w - v) < ee) {
                    if (y < (R = ee - R) && s.sane) {
                      i.msg = "invalid distance too far back", s.mode = 30;
                      break e;
                    }
                    if (z = k, (O = 0) === _) {
                      if (O += d - R, R < K) {
                        for (K -= R; H[w++] = k[O++], --R; ) ;
                        O = w - ee, z = H;
                      }
                    } else if (_ < R) {
                      if (O += d + _ - R, (R -= _) < K) {
                        for (K -= R; H[w++] = k[O++], --R; ) ;
                        if (O = 0, _ < K) {
                          for (K -= R = _; H[w++] = k[O++], --R; ) ;
                          O = w - ee, z = H;
                        }
                      }
                    } else if (O += _ - R, R < K) {
                      for (K -= R; H[w++] = k[O++], --R; ) ;
                      O = w - ee, z = H;
                    }
                    for (; 2 < K; ) H[w++] = z[O++], H[w++] = z[O++], H[w++] = z[O++], K -= 3;
                    K && (H[w++] = z[O++], 1 < K && (H[w++] = z[O++]));
                  } else {
                    for (O = w - ee; H[w++] = H[O++], H[w++] = H[O++], H[w++] = H[O++], 2 < (K -= 3); ) ;
                    K && (H[w++] = H[O++], 1 < K && (H[w++] = H[O++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (c < h && w < E);
          c -= K = T >> 3, x &= (1 << (T -= K << 3)) - 1, i.next_in = c, i.next_out = w, i.avail_in = c < h ? h - c + 5 : 5 - (c - h), i.avail_out = w < E ? E - w + 257 : 257 - (w - E), s.hold = x, s.bits = T;
        };
      }, {}],
      49: [function(r, n, a) {
        var i = r("../utils/common"), u = r("./adler32"), s = r("./crc32"), c = r("./inffast"), h = r("./inftrees"), w = 1, v = 2, E = 0, m = -2, d = 1, y = 852, _ = 592;
        function k(O) {
          return (O >>> 24 & 255) + (O >>> 8 & 65280) + ((65280 & O) << 8) + ((255 & O) << 24);
        }
        function x() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function T(O) {
          var z;
          return O && O.state ? (z = O.state, O.total_in = O.total_out = z.total = 0, O.msg = "", z.wrap && (O.adler = 1 & z.wrap), z.mode = d, z.last = 0, z.havedict = 0, z.dmax = 32768, z.head = null, z.hold = 0, z.bits = 0, z.lencode = z.lendyn = new i.Buf32(y), z.distcode = z.distdyn = new i.Buf32(_), z.sane = 1, z.back = -1, E) : m;
        }
        function S(O) {
          var z;
          return O && O.state ? ((z = O.state).wsize = 0, z.whave = 0, z.wnext = 0, T(O)) : m;
        }
        function A(O, z) {
          var I, H;
          return O && O.state ? (H = O.state, z < 0 ? (I = 0, z = -z) : (I = 1 + (z >> 4), z < 48 && (z &= 15)), z && (z < 8 || 15 < z) ? m : (H.window !== null && H.wbits !== z && (H.window = null), H.wrap = I, H.wbits = z, S(O))) : m;
        }
        function b(O, z) {
          var I, H;
          return O ? (H = new x(), (O.state = H).window = null, (I = A(O, z)) !== E && (O.state = null), I) : m;
        }
        var P, M, R = !0;
        function K(O) {
          if (R) {
            var z;
            for (P = new i.Buf32(512), M = new i.Buf32(32), z = 0; z < 144; ) O.lens[z++] = 8;
            for (; z < 256; ) O.lens[z++] = 9;
            for (; z < 280; ) O.lens[z++] = 7;
            for (; z < 288; ) O.lens[z++] = 8;
            for (h(w, O.lens, 0, 288, P, 0, O.work, { bits: 9 }), z = 0; z < 32; ) O.lens[z++] = 5;
            h(v, O.lens, 0, 32, M, 0, O.work, { bits: 5 }), R = !1;
          }
          O.lencode = P, O.lenbits = 9, O.distcode = M, O.distbits = 5;
        }
        function ee(O, z, I, H) {
          var Q, q = O.state;
          return q.window === null && (q.wsize = 1 << q.wbits, q.wnext = 0, q.whave = 0, q.window = new i.Buf8(q.wsize)), H >= q.wsize ? (i.arraySet(q.window, z, I - q.wsize, q.wsize, 0), q.wnext = 0, q.whave = q.wsize) : (H < (Q = q.wsize - q.wnext) && (Q = H), i.arraySet(q.window, z, I - H, Q, q.wnext), (H -= Q) ? (i.arraySet(q.window, z, I - H, H, 0), q.wnext = H, q.whave = q.wsize) : (q.wnext += Q, q.wnext === q.wsize && (q.wnext = 0), q.whave < q.wsize && (q.whave += Q))), 0;
        }
        a.inflateReset = S, a.inflateReset2 = A, a.inflateResetKeep = T, a.inflateInit = function(O) {
          return b(O, 15);
        }, a.inflateInit2 = b, a.inflate = function(O, z) {
          var I, H, Q, q, le, Y, te, V, F, X, J, re, pe, C, p, W, U, ne, D, L, f, G, N, o, l = 0, g = new i.Buf8(4), B = [
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
          (I = O.state).mode === 12 && (I.mode = 13), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Y = O.avail_in, V = I.hold, F = I.bits, X = Y, J = te, G = E;
          e: for (; ; ) switch (I.mode) {
            case d:
              if (I.wrap === 0) {
                I.mode = 13;
                break;
              }
              for (; F < 16; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if (2 & I.wrap && V === 35615) {
                g[I.check = 0] = 255 & V, g[1] = V >>> 8 & 255, I.check = s(I.check, g, 2, 0), F = V = 0, I.mode = 2;
                break;
              }
              if (I.flags = 0, I.head && (I.head.done = !1), !(1 & I.wrap) || (((255 & V) << 8) + (V >> 8)) % 31) {
                O.msg = "incorrect header check", I.mode = 30;
                break;
              }
              if ((15 & V) != 8) {
                O.msg = "unknown compression method", I.mode = 30;
                break;
              }
              if (F -= 4, f = 8 + (15 & (V >>>= 4)), I.wbits === 0) I.wbits = f;
              else if (f > I.wbits) {
                O.msg = "invalid window size", I.mode = 30;
                break;
              }
              I.dmax = 1 << f, O.adler = I.check = 1, I.mode = 512 & V ? 10 : 12, F = V = 0;
              break;
            case 2:
              for (; F < 16; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if (I.flags = V, (255 & I.flags) != 8) {
                O.msg = "unknown compression method", I.mode = 30;
                break;
              }
              if (57344 & I.flags) {
                O.msg = "unknown header flags set", I.mode = 30;
                break;
              }
              I.head && (I.head.text = V >> 8 & 1), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = s(I.check, g, 2, 0)), F = V = 0, I.mode = 3;
            case 3:
              for (; F < 32; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              I.head && (I.head.time = V), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, g[2] = V >>> 16 & 255, g[3] = V >>> 24 & 255, I.check = s(I.check, g, 4, 0)), F = V = 0, I.mode = 4;
            case 4:
              for (; F < 16; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              I.head && (I.head.xflags = 255 & V, I.head.os = V >> 8), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = s(I.check, g, 2, 0)), F = V = 0, I.mode = 5;
            case 5:
              if (1024 & I.flags) {
                for (; F < 16; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                I.length = V, I.head && (I.head.extra_len = V), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = s(I.check, g, 2, 0)), F = V = 0;
              } else I.head && (I.head.extra = null);
              I.mode = 6;
            case 6:
              if (1024 & I.flags && (Y < (re = I.length) && (re = Y), re && (I.head && (f = I.head.extra_len - I.length, I.head.extra || (I.head.extra = new Array(I.head.extra_len)), i.arraySet(I.head.extra, H, q, re, f)), 512 & I.flags && (I.check = s(I.check, H, re, q)), Y -= re, q += re, I.length -= re), I.length)) break e;
              I.length = 0, I.mode = 7;
            case 7:
              if (2048 & I.flags) {
                if (Y === 0) break e;
                for (re = 0; f = H[q + re++], I.head && f && I.length < 65536 && (I.head.name += String.fromCharCode(f)), f && re < Y; ) ;
                if (512 & I.flags && (I.check = s(I.check, H, re, q)), Y -= re, q += re, f) break e;
              } else I.head && (I.head.name = null);
              I.length = 0, I.mode = 8;
            case 8:
              if (4096 & I.flags) {
                if (Y === 0) break e;
                for (re = 0; f = H[q + re++], I.head && f && I.length < 65536 && (I.head.comment += String.fromCharCode(f)), f && re < Y; ) ;
                if (512 & I.flags && (I.check = s(I.check, H, re, q)), Y -= re, q += re, f) break e;
              } else I.head && (I.head.comment = null);
              I.mode = 9;
            case 9:
              if (512 & I.flags) {
                for (; F < 16; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                if (V !== (65535 & I.check)) {
                  O.msg = "header crc mismatch", I.mode = 30;
                  break;
                }
                F = V = 0;
              }
              I.head && (I.head.hcrc = I.flags >> 9 & 1, I.head.done = !0), O.adler = I.check = 0, I.mode = 12;
              break;
            case 10:
              for (; F < 32; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              O.adler = I.check = k(V), F = V = 0, I.mode = 11;
            case 11:
              if (I.havedict === 0) return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Y, I.hold = V, I.bits = F, 2;
              O.adler = I.check = 1, I.mode = 12;
            case 12:
              if (z === 5 || z === 6) break e;
            case 13:
              if (I.last) {
                V >>>= 7 & F, F -= 7 & F, I.mode = 27;
                break;
              }
              for (; F < 3; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              switch (I.last = 1 & V, F -= 1, 3 & (V >>>= 1)) {
                case 0:
                  I.mode = 14;
                  break;
                case 1:
                  if (K(I), I.mode = 20, z !== 6) break;
                  V >>>= 2, F -= 2;
                  break e;
                case 2:
                  I.mode = 17;
                  break;
                case 3:
                  O.msg = "invalid block type", I.mode = 30;
              }
              V >>>= 2, F -= 2;
              break;
            case 14:
              for (V >>>= 7 & F, F -= 7 & F; F < 32; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if ((65535 & V) != (V >>> 16 ^ 65535)) {
                O.msg = "invalid stored block lengths", I.mode = 30;
                break;
              }
              if (I.length = 65535 & V, F = V = 0, I.mode = 15, z === 6) break e;
            case 15:
              I.mode = 16;
            case 16:
              if (re = I.length) {
                if (Y < re && (re = Y), te < re && (re = te), re === 0) break e;
                i.arraySet(Q, H, q, re, le), Y -= re, q += re, te -= re, le += re, I.length -= re;
                break;
              }
              I.mode = 12;
              break;
            case 17:
              for (; F < 14; ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if (I.nlen = 257 + (31 & V), V >>>= 5, F -= 5, I.ndist = 1 + (31 & V), V >>>= 5, F -= 5, I.ncode = 4 + (15 & V), V >>>= 4, F -= 4, 286 < I.nlen || 30 < I.ndist) {
                O.msg = "too many length or distance symbols", I.mode = 30;
                break;
              }
              I.have = 0, I.mode = 18;
            case 18:
              for (; I.have < I.ncode; ) {
                for (; F < 3; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                I.lens[B[I.have++]] = 7 & V, V >>>= 3, F -= 3;
              }
              for (; I.have < 19; ) I.lens[B[I.have++]] = 0;
              if (I.lencode = I.lendyn, I.lenbits = 7, N = { bits: I.lenbits }, G = h(0, I.lens, 0, 19, I.lencode, 0, I.work, N), I.lenbits = N.bits, G) {
                O.msg = "invalid code lengths set", I.mode = 30;
                break;
              }
              I.have = 0, I.mode = 19;
            case 19:
              for (; I.have < I.nlen + I.ndist; ) {
                for (; W = (l = I.lencode[V & (1 << I.lenbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                if (U < 16) V >>>= p, F -= p, I.lens[I.have++] = U;
                else {
                  if (U === 16) {
                    for (o = p + 2; F < o; ) {
                      if (Y === 0) break e;
                      Y--, V += H[q++] << F, F += 8;
                    }
                    if (V >>>= p, F -= p, I.have === 0) {
                      O.msg = "invalid bit length repeat", I.mode = 30;
                      break;
                    }
                    f = I.lens[I.have - 1], re = 3 + (3 & V), V >>>= 2, F -= 2;
                  } else if (U === 17) {
                    for (o = p + 3; F < o; ) {
                      if (Y === 0) break e;
                      Y--, V += H[q++] << F, F += 8;
                    }
                    F -= p, f = 0, re = 3 + (7 & (V >>>= p)), V >>>= 3, F -= 3;
                  } else {
                    for (o = p + 7; F < o; ) {
                      if (Y === 0) break e;
                      Y--, V += H[q++] << F, F += 8;
                    }
                    F -= p, f = 0, re = 11 + (127 & (V >>>= p)), V >>>= 7, F -= 7;
                  }
                  if (I.have + re > I.nlen + I.ndist) {
                    O.msg = "invalid bit length repeat", I.mode = 30;
                    break;
                  }
                  for (; re--; ) I.lens[I.have++] = f;
                }
              }
              if (I.mode === 30) break;
              if (I.lens[256] === 0) {
                O.msg = "invalid code -- missing end-of-block", I.mode = 30;
                break;
              }
              if (I.lenbits = 9, N = { bits: I.lenbits }, G = h(w, I.lens, 0, I.nlen, I.lencode, 0, I.work, N), I.lenbits = N.bits, G) {
                O.msg = "invalid literal/lengths set", I.mode = 30;
                break;
              }
              if (I.distbits = 6, I.distcode = I.distdyn, N = { bits: I.distbits }, G = h(v, I.lens, I.nlen, I.ndist, I.distcode, 0, I.work, N), I.distbits = N.bits, G) {
                O.msg = "invalid distances set", I.mode = 30;
                break;
              }
              if (I.mode = 20, z === 6) break e;
            case 20:
              I.mode = 21;
            case 21:
              if (6 <= Y && 258 <= te) {
                O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Y, I.hold = V, I.bits = F, c(O, J), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Y = O.avail_in, V = I.hold, F = I.bits, I.mode === 12 && (I.back = -1);
                break;
              }
              for (I.back = 0; W = (l = I.lencode[V & (1 << I.lenbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if (W && (240 & W) == 0) {
                for (ne = p, D = W, L = U; W = (l = I.lencode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & l, !(ne + (p = l >>> 24) <= F); ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                V >>>= ne, F -= ne, I.back += ne;
              }
              if (V >>>= p, F -= p, I.back += p, I.length = U, W === 0) {
                I.mode = 26;
                break;
              }
              if (32 & W) {
                I.back = -1, I.mode = 12;
                break;
              }
              if (64 & W) {
                O.msg = "invalid literal/length code", I.mode = 30;
                break;
              }
              I.extra = 15 & W, I.mode = 22;
            case 22:
              if (I.extra) {
                for (o = I.extra; F < o; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                I.length += V & (1 << I.extra) - 1, V >>>= I.extra, F -= I.extra, I.back += I.extra;
              }
              I.was = I.length, I.mode = 23;
            case 23:
              for (; W = (l = I.distcode[V & (1 << I.distbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                if (Y === 0) break e;
                Y--, V += H[q++] << F, F += 8;
              }
              if ((240 & W) == 0) {
                for (ne = p, D = W, L = U; W = (l = I.distcode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & l, !(ne + (p = l >>> 24) <= F); ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                V >>>= ne, F -= ne, I.back += ne;
              }
              if (V >>>= p, F -= p, I.back += p, 64 & W) {
                O.msg = "invalid distance code", I.mode = 30;
                break;
              }
              I.offset = U, I.extra = 15 & W, I.mode = 24;
            case 24:
              if (I.extra) {
                for (o = I.extra; F < o; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                I.offset += V & (1 << I.extra) - 1, V >>>= I.extra, F -= I.extra, I.back += I.extra;
              }
              if (I.offset > I.dmax) {
                O.msg = "invalid distance too far back", I.mode = 30;
                break;
              }
              I.mode = 25;
            case 25:
              if (te === 0) break e;
              if (re = J - te, I.offset > re) {
                if ((re = I.offset - re) > I.whave && I.sane) {
                  O.msg = "invalid distance too far back", I.mode = 30;
                  break;
                }
                pe = re > I.wnext ? (re -= I.wnext, I.wsize - re) : I.wnext - re, re > I.length && (re = I.length), C = I.window;
              } else C = Q, pe = le - I.offset, re = I.length;
              for (te < re && (re = te), te -= re, I.length -= re; Q[le++] = C[pe++], --re; ) ;
              I.length === 0 && (I.mode = 21);
              break;
            case 26:
              if (te === 0) break e;
              Q[le++] = I.length, te--, I.mode = 21;
              break;
            case 27:
              if (I.wrap) {
                for (; F < 32; ) {
                  if (Y === 0) break e;
                  Y--, V |= H[q++] << F, F += 8;
                }
                if (J -= te, O.total_out += J, I.total += J, J && (O.adler = I.check = I.flags ? s(I.check, Q, J, le - J) : u(I.check, Q, J, le - J)), J = te, (I.flags ? V : k(V)) !== I.check) {
                  O.msg = "incorrect data check", I.mode = 30;
                  break;
                }
                F = V = 0;
              }
              I.mode = 28;
            case 28:
              if (I.wrap && I.flags) {
                for (; F < 32; ) {
                  if (Y === 0) break e;
                  Y--, V += H[q++] << F, F += 8;
                }
                if (V !== (4294967295 & I.total)) {
                  O.msg = "incorrect length check", I.mode = 30;
                  break;
                }
                F = V = 0;
              }
              I.mode = 29;
            case 29:
              G = 1;
              break e;
            case 30:
              G = -3;
              break e;
            case 31:
              return -4;
            default:
              return m;
          }
          return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Y, I.hold = V, I.bits = F, (I.wsize || J !== O.avail_out && I.mode < 30 && (I.mode < 27 || z !== 4)) && ee(O, O.output, O.next_out, J - O.avail_out) ? (I.mode = 31, -4) : (X -= O.avail_in, J -= O.avail_out, O.total_in += X, O.total_out += J, I.total += J, I.wrap && J && (O.adler = I.check = I.flags ? s(I.check, Q, J, O.next_out - J) : u(I.check, Q, J, O.next_out - J)), O.data_type = I.bits + (I.last ? 64 : 0) + (I.mode === 12 ? 128 : 0) + (I.mode === 20 || I.mode === 15 ? 256 : 0), (X == 0 && J === 0 || z === 4) && G === E && (G = -5), G);
        }, a.inflateEnd = function(O) {
          if (!O || !O.state) return m;
          var z = O.state;
          return z.window && (z.window = null), O.state = null, E;
        }, a.inflateGetHeader = function(O, z) {
          var I;
          return O && O.state ? (2 & (I = O.state).wrap) == 0 ? m : ((I.head = z).done = !1, E) : m;
        }, a.inflateSetDictionary = function(O, z) {
          var I, H = z.length;
          return O && O.state ? (I = O.state).wrap !== 0 && I.mode !== 11 ? m : I.mode === 11 && u(1, z, H, 0) !== I.check ? -3 : ee(O, z, H, H) ? (I.mode = 31, -4) : (I.havedict = 1, E) : m;
        }, a.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, n, a) {
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
        ], h = [
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
        n.exports = function(w, v, E, m, d, y, _, k) {
          var x, T, S, A, b, P, M, R, K, ee = k.bits, O = 0, z = 0, I = 0, H = 0, Q = 0, q = 0, le = 0, Y = 0, te = 0, V = 0, F = null, X = 0, J = new i.Buf16(16), re = new i.Buf16(16), pe = null, C = 0;
          for (O = 0; O <= 15; O++) J[O] = 0;
          for (z = 0; z < m; z++) J[v[E + z]]++;
          for (Q = ee, H = 15; 1 <= H && J[H] === 0; H--) ;
          if (H < Q && (Q = H), H === 0) return d[y++] = 20971520, d[y++] = 20971520, k.bits = 1, 0;
          for (I = 1; I < H && J[I] === 0; I++) ;
          for (Q < I && (Q = I), O = Y = 1; O <= 15; O++) if (Y <<= 1, (Y -= J[O]) < 0) return -1;
          if (0 < Y && (w === 0 || H !== 1)) return -1;
          for (re[1] = 0, O = 1; O < 15; O++) re[O + 1] = re[O] + J[O];
          for (z = 0; z < m; z++) v[E + z] !== 0 && (_[re[v[E + z]]++] = z);
          if (P = w === 0 ? (F = pe = _, 19) : w === 1 ? (F = u, X -= 257, pe = s, C -= 257, 256) : (F = c, pe = h, -1), O = I, b = y, le = z = V = 0, S = -1, A = (te = 1 << (q = Q)) - 1, w === 1 && 852 < te || w === 2 && 592 < te) return 1;
          for (; ; ) {
            for (M = O - le, K = _[z] < P ? (R = 0, _[z]) : _[z] > P ? (R = pe[C + _[z]], F[X + _[z]]) : (R = 96, 0), x = 1 << O - le, I = T = 1 << q; d[b + (V >> le) + (T -= x)] = M << 24 | R << 16 | K | 0, T !== 0; ) ;
            for (x = 1 << O - 1; V & x; ) x >>= 1;
            if (x !== 0 ? (V &= x - 1, V += x) : V = 0, z++, --J[O] == 0) {
              if (O === H) break;
              O = v[E + _[z]];
            }
            if (Q < O && (V & A) !== S) {
              for (le === 0 && (le = Q), b += I, Y = 1 << (q = O - le); q + le < H && !((Y -= J[q + le]) <= 0); ) q++, Y <<= 1;
              if (te += 1 << q, w === 1 && 852 < te || w === 2 && 592 < te) return 1;
              d[S = V & A] = Q << 24 | q << 16 | b - y | 0;
            }
          }
          return V !== 0 && (d[b + V] = O - le << 24 | 4194304), k.bits = Q, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, n, a) {
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
      52: [function(r, n, a) {
        var i = r("../utils/common"), u = 0, s = 1;
        function c(l) {
          for (var g = l.length; 0 <= --g; ) l[g] = 0;
        }
        var h = 0, w = 29, v = 256, E = v + 1 + w, m = 30, d = 19, y = 2 * E + 1, _ = 15, k = 16, x = 7, T = 256, S = 16, A = 17, b = 18, P = [
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
        ], R = [
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
        ], K = [
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
        ], ee = new Array(2 * (E + 2));
        c(ee);
        var O = new Array(2 * m);
        c(O);
        var z = new Array(512);
        c(z);
        var I = new Array(256);
        c(I);
        var H = new Array(w);
        c(H);
        var Q, q, le, Y = new Array(m);
        function te(l, g, B, $, j) {
          this.static_tree = l, this.extra_bits = g, this.extra_base = B, this.elems = $, this.max_length = j, this.has_stree = l && l.length;
        }
        function V(l, g) {
          this.dyn_tree = l, this.max_code = 0, this.stat_desc = g;
        }
        function F(l) {
          return l < 256 ? z[l] : z[256 + (l >>> 7)];
        }
        function X(l, g) {
          l.pending_buf[l.pending++] = 255 & g, l.pending_buf[l.pending++] = g >>> 8 & 255;
        }
        function J(l, g, B) {
          l.bi_valid > k - B ? (l.bi_buf |= g << l.bi_valid & 65535, X(l, l.bi_buf), l.bi_buf = g >> k - l.bi_valid, l.bi_valid += B - k) : (l.bi_buf |= g << l.bi_valid & 65535, l.bi_valid += B);
        }
        function re(l, g, B) {
          J(l, B[2 * g], B[2 * g + 1]);
        }
        function pe(l, g) {
          for (var B = 0; B |= 1 & l, l >>>= 1, B <<= 1, 0 < --g; ) ;
          return B >>> 1;
        }
        function C(l, g, B) {
          var $, j, ie = new Array(_ + 1), ue = 0;
          for ($ = 1; $ <= _; $++) ie[$] = ue = ue + B[$ - 1] << 1;
          for (j = 0; j <= g; j++) {
            var oe = l[2 * j + 1];
            oe !== 0 && (l[2 * j] = pe(ie[oe]++, oe));
          }
        }
        function p(l) {
          for (var g = 0; g < E; g++) l.dyn_ltree[2 * g] = 0;
          for (g = 0; g < m; g++) l.dyn_dtree[2 * g] = 0;
          for (g = 0; g < d; g++) l.bl_tree[2 * g] = 0;
          l.dyn_ltree[2 * T] = 1, l.opt_len = l.static_len = 0, l.last_lit = l.matches = 0;
        }
        function W(l) {
          8 < l.bi_valid ? X(l, l.bi_buf) : 0 < l.bi_valid && (l.pending_buf[l.pending++] = l.bi_buf), l.bi_buf = 0, l.bi_valid = 0;
        }
        function U(l, g, B, $) {
          var j = 2 * g, ie = 2 * B;
          return l[j] < l[ie] || l[j] === l[ie] && $[g] <= $[B];
        }
        function ne(l, g, B) {
          for (var $ = l.heap[B], j = B << 1; j <= l.heap_len && (j < l.heap_len && U(g, l.heap[j + 1], l.heap[j], l.depth) && j++, !U(g, $, l.heap[j], l.depth)); ) l.heap[B] = l.heap[j], B = j, j <<= 1;
          l.heap[B] = $;
        }
        function D(l, g, B) {
          var $, j, ie, ue, oe = 0;
          if (l.last_lit !== 0) for (; $ = l.pending_buf[l.d_buf + 2 * oe] << 8 | l.pending_buf[l.d_buf + 2 * oe + 1], j = l.pending_buf[l.l_buf + oe], oe++, $ === 0 ? re(l, j, g) : (re(l, (ie = I[j]) + v + 1, g), (ue = P[ie]) !== 0 && J(l, j -= H[ie], ue), re(l, ie = F(--$), B), (ue = M[ie]) !== 0 && J(l, $ -= Y[ie], ue)), oe < l.last_lit; ) ;
          re(l, T, g);
        }
        function L(l, g) {
          var B, $, j, ie = g.dyn_tree, ue = g.stat_desc.static_tree, oe = g.stat_desc.has_stree, de = g.stat_desc.elems, me = -1;
          for (l.heap_len = 0, l.heap_max = y, B = 0; B < de; B++) ie[2 * B] !== 0 ? (l.heap[++l.heap_len] = me = B, l.depth[B] = 0) : ie[2 * B + 1] = 0;
          for (; l.heap_len < 2; ) ie[2 * (j = l.heap[++l.heap_len] = me < 2 ? ++me : 0)] = 1, l.depth[j] = 0, l.opt_len--, oe && (l.static_len -= ue[2 * j + 1]);
          for (g.max_code = me, B = l.heap_len >> 1; 1 <= B; B--) ne(l, ie, B);
          for (j = de; B = l.heap[1], l.heap[1] = l.heap[l.heap_len--], ne(l, ie, 1), $ = l.heap[1], l.heap[--l.heap_max] = B, l.heap[--l.heap_max] = $, ie[2 * j] = ie[2 * B] + ie[2 * $], l.depth[j] = (l.depth[B] >= l.depth[$] ? l.depth[B] : l.depth[$]) + 1, ie[2 * B + 1] = ie[2 * $ + 1] = j, l.heap[1] = j++, ne(l, ie, 1), 2 <= l.heap_len; ) ;
          l.heap[--l.heap_max] = l.heap[1], (function(we, Se) {
            var it, ze, Rt, xe, nr, Fr, Ye = Se.dyn_tree, zn = Se.max_code, ks = Se.stat_desc.static_tree, Cs = Se.stat_desc.has_stree, Is = Se.stat_desc.extra_bits, Hn = Se.stat_desc.extra_base, Nt = Se.stat_desc.max_length, ir = 0;
            for (xe = 0; xe <= _; xe++) we.bl_count[xe] = 0;
            for (Ye[2 * we.heap[we.heap_max] + 1] = 0, it = we.heap_max + 1; it < y; it++) Nt < (xe = Ye[2 * Ye[2 * (ze = we.heap[it]) + 1] + 1] + 1) && (xe = Nt, ir++), Ye[2 * ze + 1] = xe, zn < ze || (we.bl_count[xe]++, nr = 0, Hn <= ze && (nr = Is[ze - Hn]), Fr = Ye[2 * ze], we.opt_len += Fr * (xe + nr), Cs && (we.static_len += Fr * (ks[2 * ze + 1] + nr)));
            if (ir !== 0) {
              do {
                for (xe = Nt - 1; we.bl_count[xe] === 0; ) xe--;
                we.bl_count[xe]--, we.bl_count[xe + 1] += 2, we.bl_count[Nt]--, ir -= 2;
              } while (0 < ir);
              for (xe = Nt; xe !== 0; xe--) for (ze = we.bl_count[xe]; ze !== 0; ) zn < (Rt = we.heap[--it]) || (Ye[2 * Rt + 1] !== xe && (we.opt_len += (xe - Ye[2 * Rt + 1]) * Ye[2 * Rt], Ye[2 * Rt + 1] = xe), ze--);
            }
          })(l, g), C(ie, me, l.bl_count);
        }
        function f(l, g, B) {
          var $, j, ie = -1, ue = g[1], oe = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), g[2 * (B + 1) + 1] = 65535, $ = 0; $ <= B; $++) j = ue, ue = g[2 * ($ + 1) + 1], ++oe < de && j === ue || (oe < me ? l.bl_tree[2 * j] += oe : j !== 0 ? (j !== ie && l.bl_tree[2 * j]++, l.bl_tree[2 * S]++) : oe <= 10 ? l.bl_tree[2 * A]++ : l.bl_tree[2 * b]++, ie = j, me = (oe = 0) === ue ? (de = 138, 3) : j === ue ? (de = 6, 3) : (de = 7, 4));
        }
        function G(l, g, B) {
          var $, j, ie = -1, ue = g[1], oe = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), $ = 0; $ <= B; $++) if (j = ue, ue = g[2 * ($ + 1) + 1], !(++oe < de && j === ue)) {
            if (oe < me) for (; re(l, j, l.bl_tree), --oe != 0; ) ;
            else j !== 0 ? (j !== ie && (re(l, j, l.bl_tree), oe--), re(l, S, l.bl_tree), J(l, oe - 3, 2)) : oe <= 10 ? (re(l, A, l.bl_tree), J(l, oe - 3, 3)) : (re(l, b, l.bl_tree), J(l, oe - 11, 7));
            ie = j, me = (oe = 0) === ue ? (de = 138, 3) : j === ue ? (de = 6, 3) : (de = 7, 4);
          }
        }
        c(Y);
        var N = !1;
        function o(l, g, B, $) {
          J(l, (h << 1) + ($ ? 1 : 0), 3), (function(j, ie, ue, oe) {
            W(j), X(j, ue), X(j, ~ue), i.arraySet(j.pending_buf, j.window, ie, ue, j.pending), j.pending += ue;
          })(l, g, B);
        }
        a._tr_init = function(l) {
          N || ((function() {
            var g, B, $, j, ie, ue = new Array(_ + 1);
            for (j = $ = 0; j < w - 1; j++) for (H[j] = $, g = 0; g < 1 << P[j]; g++) I[$++] = j;
            for (I[$ - 1] = j, j = ie = 0; j < 16; j++) for (Y[j] = ie, g = 0; g < 1 << M[j]; g++) z[ie++] = j;
            for (ie >>= 7; j < m; j++) for (Y[j] = ie << 7, g = 0; g < 1 << M[j] - 7; g++) z[256 + ie++] = j;
            for (B = 0; B <= _; B++) ue[B] = 0;
            for (g = 0; g <= 143; ) ee[2 * g + 1] = 8, g++, ue[8]++;
            for (; g <= 255; ) ee[2 * g + 1] = 9, g++, ue[9]++;
            for (; g <= 279; ) ee[2 * g + 1] = 7, g++, ue[7]++;
            for (; g <= 287; ) ee[2 * g + 1] = 8, g++, ue[8]++;
            for (C(ee, E + 1, ue), g = 0; g < m; g++) O[2 * g + 1] = 5, O[2 * g] = pe(g, 5);
            Q = new te(ee, P, v + 1, E, _), q = new te(O, M, 0, m, _), le = new te(new Array(0), R, 0, d, x);
          })(), N = !0), l.l_desc = new V(l.dyn_ltree, Q), l.d_desc = new V(l.dyn_dtree, q), l.bl_desc = new V(l.bl_tree, le), l.bi_buf = 0, l.bi_valid = 0, p(l);
        }, a._tr_stored_block = o, a._tr_flush_block = function(l, g, B, $) {
          var j, ie, ue = 0;
          0 < l.level ? (l.strm.data_type === 2 && (l.strm.data_type = (function(oe) {
            var de, me = 4093624447;
            for (de = 0; de <= 31; de++, me >>>= 1) if (1 & me && oe.dyn_ltree[2 * de] !== 0) return u;
            if (oe.dyn_ltree[18] !== 0 || oe.dyn_ltree[20] !== 0 || oe.dyn_ltree[26] !== 0) return s;
            for (de = 32; de < v; de++) if (oe.dyn_ltree[2 * de] !== 0) return s;
            return u;
          })(l)), L(l, l.l_desc), L(l, l.d_desc), ue = (function(oe) {
            var de;
            for (f(oe, oe.dyn_ltree, oe.l_desc.max_code), f(oe, oe.dyn_dtree, oe.d_desc.max_code), L(oe, oe.bl_desc), de = d - 1; 3 <= de && oe.bl_tree[2 * K[de] + 1] === 0; de--) ;
            return oe.opt_len += 3 * (de + 1) + 5 + 5 + 4, de;
          })(l), j = l.opt_len + 3 + 7 >>> 3, (ie = l.static_len + 3 + 7 >>> 3) <= j && (j = ie)) : j = ie = B + 5, B + 4 <= j && g !== -1 ? o(l, g, B, $) : l.strategy === 4 || ie === j ? (J(l, 2 + ($ ? 1 : 0), 3), D(l, ee, O)) : (J(l, 4 + ($ ? 1 : 0), 3), (function(oe, de, me, we) {
            var Se;
            for (J(oe, de - 257, 5), J(oe, me - 1, 5), J(oe, we - 4, 4), Se = 0; Se < we; Se++) J(oe, oe.bl_tree[2 * K[Se] + 1], 3);
            G(oe, oe.dyn_ltree, de - 1), G(oe, oe.dyn_dtree, me - 1);
          })(l, l.l_desc.max_code + 1, l.d_desc.max_code + 1, ue + 1), D(l, l.dyn_ltree, l.dyn_dtree)), p(l), $ && W(l);
        }, a._tr_tally = function(l, g, B) {
          return l.pending_buf[l.d_buf + 2 * l.last_lit] = g >>> 8 & 255, l.pending_buf[l.d_buf + 2 * l.last_lit + 1] = 255 & g, l.pending_buf[l.l_buf + l.last_lit] = 255 & B, l.last_lit++, g === 0 ? l.dyn_ltree[2 * B]++ : (l.matches++, g--, l.dyn_ltree[2 * (I[B] + v + 1)]++, l.dyn_dtree[2 * F(g)]++), l.last_lit === l.lit_bufsize - 1;
        }, a._tr_align = function(l) {
          J(l, 2, 3), re(l, T, ee), (function(g) {
            g.bi_valid === 16 ? (X(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : 8 <= g.bi_valid && (g.pending_buf[g.pending++] = 255 & g.bi_buf, g.bi_buf >>= 8, g.bi_valid -= 8);
          })(l);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, n, a) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, n, a) {
        (function(i) {
          (function(u, s) {
            if (!u.setImmediate) {
              var c, h, w, v, E = 1, m = {}, d = !1, y = u.document, _ = Object.getPrototypeOf && Object.getPrototypeOf(u);
              _ = _ && _.setTimeout ? _ : u, c = {}.toString.call(u.process) === "[object process]" ? function(S) {
                ge.nextTick(function() {
                  x(S);
                });
              } : (function() {
                if (u.postMessage && !u.importScripts) {
                  var S = !0, A = u.onmessage;
                  return u.onmessage = function() {
                    S = !1;
                  }, u.postMessage("", "*"), u.onmessage = A, S;
                }
              })() ? (v = "setImmediate$" + Math.random() + "$", u.addEventListener ? u.addEventListener("message", T, !1) : u.attachEvent("onmessage", T), function(S) {
                u.postMessage(v + S, "*");
              }) : u.MessageChannel ? ((w = new MessageChannel()).port1.onmessage = function(S) {
                x(S.data);
              }, function(S) {
                w.port2.postMessage(S);
              }) : y && "onreadystatechange" in y.createElement("script") ? (h = y.documentElement, function(S) {
                var A = y.createElement("script");
                A.onreadystatechange = function() {
                  x(S), A.onreadystatechange = null, h.removeChild(A), A = null;
                }, h.appendChild(A);
              }) : function(S) {
                setTimeout(x, 0, S);
              }, _.setImmediate = function(S) {
                typeof S != "function" && (S = new Function("" + S));
                for (var A = new Array(arguments.length - 1), b = 0; b < A.length; b++) A[b] = arguments[b + 1];
                return m[E] = {
                  callback: S,
                  args: A
                }, c(E), E++;
              }, _.clearImmediate = k;
            }
            function k(S) {
              delete m[S];
            }
            function x(S) {
              if (d) setTimeout(x, 0, S);
              else {
                var A = m[S];
                if (A) {
                  d = !0;
                  try {
                    (function(b) {
                      var P = b.callback, M = b.args;
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
                    })(A);
                  } finally {
                    k(S), d = !1;
                  }
                }
              }
            }
            function T(S) {
              S.source === u && typeof S.data == "string" && S.data.indexOf(v) === 0 && x(+S.data.slice(v.length));
            }
          })(typeof self > "u" ? i === void 0 ? this : i : self);
        }).call(this, typeof Ne < "u" ? Ne : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), ap = /* @__PURE__ */ fe(((e, t) => {
  var r = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function n(a) {
    return a && a.replace ? a.replace(/([&"<>'])/g, function(i, u) {
      return r[u];
    }) : a;
  }
  t.exports = n;
})), sp = /* @__PURE__ */ fe(((e, t) => {
  ut();
  var r = ap(), n = bn().Stream, a = "    ";
  function i(v, E) {
    typeof E != "object" && (E = { indent: E });
    var m = E.stream ? new n() : null, d = "", y = !1, _ = E.indent ? E.indent === !0 ? a : E.indent : "", k = !0;
    function x(P) {
      k ? ge.nextTick(P) : P();
    }
    function T(P, M) {
      if (M !== void 0 && (d += M), P && !y && (m = m || new n(), y = !0), P && y) {
        var R = d;
        x(function() {
          m.emit("data", R);
        }), d = "";
      }
    }
    function S(P, M) {
      h(T, c(P, _, _ ? 1 : 0), M);
    }
    function A() {
      if (m) {
        var P = d;
        x(function() {
          m.emit("data", P), m.emit("end"), m.readable = !1, m.emit("close");
        });
      }
    }
    function b(P) {
      var M = {
        version: "1.0",
        encoding: P.encoding || "UTF-8"
      };
      P.standalone && (M.standalone = P.standalone), S({ "?xml": { _attr: M } }), d = d.replace("/>", "?>");
    }
    return x(function() {
      k = !1;
    }), E.declaration && b(E.declaration), v && v.forEach ? v.forEach(function(P, M) {
      var R;
      M + 1 === v.length && (R = A), S(P, R);
    }) : S(v, A), m ? (m.readable = !0, m) : d;
  }
  function u() {
    var v = { _elem: c(Array.prototype.slice.call(arguments)) };
    return v.push = function(E) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var m = this, d = this._elem.indent;
      h(this.append, c(E, d, this._elem.icount + (d ? 1 : 0)), function() {
        m.append(!0);
      });
    }, v.close = function(E) {
      E !== void 0 && this.push(E), this.end && this.end();
    }, v;
  }
  function s(v, E) {
    return new Array(E || 0).join(v || "");
  }
  function c(v, E, m) {
    m = m || 0;
    var d = s(E, m), y, _ = v, k = !1;
    if (typeof v == "object" && (y = Object.keys(v)[0], _ = v[y], _ && _._elem))
      return _._elem.name = y, _._elem.icount = m, _._elem.indent = E, _._elem.indents = d, _._elem.interrupt = _, _._elem;
    var x = [], T = [], S;
    function A(b) {
      Object.keys(b).forEach(function(P) {
        x.push(w(P, b[P]));
      });
    }
    switch (typeof _) {
      case "object":
        if (_ === null) break;
        _._attr && A(_._attr), _._cdata && T.push(("<![CDATA[" + _._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), _.forEach && (S = !1, T.push(""), _.forEach(function(b) {
          typeof b == "object" ? Object.keys(b)[0] == "_attr" ? A(b._attr) : T.push(c(b, E, m + 1)) : (T.pop(), S = !0, T.push(r(b)));
        }), S || T.push(""));
        break;
      default:
        T.push(r(_));
    }
    return {
      name: y,
      interrupt: k,
      attributes: x,
      content: T,
      icount: m,
      indents: d,
      indent: E
    };
  }
  function h(v, E, m) {
    if (typeof E != "object") return v(!1, E);
    var d = E.interrupt ? 1 : E.content.length;
    function y() {
      for (; E.content.length; ) {
        var k = E.content.shift();
        if (k !== void 0) {
          if (_(k)) return;
          h(v, k);
        }
      }
      v(!1, (d > 1 ? E.indents : "") + (E.name ? "</" + E.name + ">" : "") + (E.indent && !m ? `
` : "")), m && m();
    }
    function _(k) {
      return k.interrupt ? (k.interrupt.append = v, k.interrupt.end = y, k.interrupt = !1, v(!0), !0) : !1;
    }
    if (v(!1, E.indents + (E.name ? "<" + E.name : "") + (E.attributes.length ? " " + E.attributes.join(" ") : "") + (d ? E.name ? ">" : "" : E.name ? "/>" : "") + (E.indent && d > 1 ? `
` : "")), !d) return v(!1, E.indent ? `
` : "");
    _(E) || y();
  }
  function w(v, E) {
    return v + '="' + r(E) + '"';
  }
  t.exports = i, t.exports.element = t.exports.Element = u;
})), op = bn(), ws = /* @__PURE__ */ fn(ip()), ye = /* @__PURE__ */ fn(sp()), Mt = 0, Qr = 32, lp = 32, up = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== lp) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const n = r.replace(/(..)/g, "$1 ").trim().split(" ").map((u) => parseInt(u, 16));
  n.reverse();
  const a = e.slice(Mt, Qr).map((u, s) => u ^ n[s % n.length]), i = new Uint8Array(Mt + a.length + Math.max(0, e.length - Qr));
  return i.set(e.slice(0, Mt)), i.set(a, Mt), i.set(e.slice(Qr), Mt + a.length), i;
}, gs = class {
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
}, ys = /\{([^{}]+)\}/g, bs = (e, t) => t.size === 0 ? e : e.replace(ys, (r, n) => {
  var a;
  return (a = t.get(n)) !== null && a !== void 0 ? a : r;
}), cp = (e) => new Set(Array.from(e.matchAll(ys), ([, t]) => t)), hp = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(e, t, r) {
    return bs(e, new Map(t.map((n, a) => [n.fileName, (r + a).toString()])));
  }
  /**
  * Extracts media data referenced in the XML content.
  *
  * @param xmlData - The XML string to search for media references
  * @param media - The media collection to search within
  * @returns Array of media data found in the XML
  */
  getMediaData(e, t) {
    const r = cp(e);
    return t.Array.filter((n) => r.has(n.fileName));
  }
}, fp = class {
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
    return bs(e, new Map(t.map(({ reference: r, instance: n, numId: a }) => [`${r}-${n}`, a.toString()])));
  }
}, dp = new gs(), en = (e, t, r, n, a = !0) => (0, ye.default)(dp.format(t, {
  viewWrapper: {
    View: t,
    Relationships: n
  },
  file: e,
  stack: []
}), {
  indent: r,
  declaration: a ? {
    standalone: "yes",
    encoding: "UTF-8"
  } : { encoding: "UTF-8" }
}), pp = (e, t, r, n) => {
  const { content: a } = t.options;
  if (a instanceof Uint8Array) return [{
    data: a,
    path: `word/${r}`
  }];
  if ("files" in a) {
    const h = new ws.default();
    for (const { path: w, content: v } of a.files) h.file(w, v instanceof Uint8Array ? v : Wt(en(e, v, n, new Re())));
    return [{
      data: h.generateAsync({
        type: "uint8array",
        compression: "DEFLATE"
      }),
      path: `word/${r}`
    }];
  }
  const i = e.PackageParts.createRelationships(r), u = en(e, a, n, i), s = r.slice(0, r.lastIndexOf("/")), c = r.slice(r.lastIndexOf("/") + 1);
  return [{
    data: u,
    path: `word/${r}`
  }, ...i.RelationshipCount > 0 ? [{
    data: en(e, i, n, i, !1),
    path: `word/${s}/_rels/${c}.rels`
  }] : []];
}, _s = (e, t, r = 0) => {
  const n = e.PackageParts.Array.slice(r);
  return n.length === 0 ? [] : [...n.flatMap(({ part: a, path: i }) => pp(e, a, i, t)), ..._s(e, t, r + n.length)];
}, mp = ["PackageParts"], vp = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    Z(this, "formatter", void 0), Z(this, "imageReplacer", void 0), Z(this, "numberingReplacer", void 0), this.formatter = new gs(), this.imageReplacer = new hp(), this.numberingReplacer = new fp();
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
    const n = new ws.default(), a = this.xmlifyFile(e, t), { PackageParts: i } = a, u = qa(a, mp), s = new Map(Object.entries(u));
    for (const [, c] of s) if (Array.isArray(c)) for (const h of c) n.file(h.path, Wt(h.data));
    else n.file(c.path, Wt(c.data));
    for (const { path: c, data: h } of i) n.file(c, typeof h == "string" ? Wt(h) : h);
    for (const c of r) n.file(c.path, Wt(c.data));
    for (const c of e.Media.Array) c.type !== "svg" ? n.file(`word/media/${c.fileName}`, c.data) : (n.file(`word/media/${c.fileName}`, c.data), n.file(`word/media/${c.fallback.fileName}`, c.fallback.data));
    for (const [c, { data: h, fontKey: w }] of e.FontTable.files.entries()) n.file(`word/fonts/font${c + 1}.odttf`, up(h, w));
    return n;
  }
  xmlifyFile(e, t) {
    const r = (0, ye.default)(this.formatter.format(e.Document.View, {
      viewWrapper: e.Document,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), n = (0, ye.default)(this.formatter.format(e.Comments, {
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
    }), a = (0, ye.default)(this.formatter.format(e.FootNotes.View, {
      viewWrapper: e.FootNotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), i = (0, ye.default)(this.formatter.format(e.Endnotes.View, {
      viewWrapper: e.Endnotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: { encoding: "UTF-8" }
    }), u = e.Document.Relationships.RelationshipCount + 1, s = e.Comments.Relationships.RelationshipCount + 1, c = e.FootNotes.Relationships.RelationshipCount + 1, h = e.Endnotes.Relationships.RelationshipCount + 1, w = this.imageReplacer.getMediaData(r, e.Media), v = this.imageReplacer.getMediaData(n, e.Media), E = this.imageReplacer.getMediaData(a, e.Media), m = this.imageReplacer.getMediaData(i, e.Media);
    return he(he(he(he({
      Relationships: {
        data: (() => {
          const d = Re.copy(e.Document.Relationships);
          return w.forEach((y, _) => {
            d.addRelationship(u + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), d.addRelationship(d.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, ye.default)(this.formatter.format(d, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          });
        })(),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const d = this.imageReplacer.replace(r, w, u);
          return this.numberingReplacer.replace(d, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const d = (0, ye.default)(this.formatter.format(e.Styles, {
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
          return this.numberingReplacer.replace(d, e.Numbering.ConcreteNumbering);
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
      HeaderRelationships: e.Headers.map((d, y) => {
        const _ = (0, ye.default)(this.formatter.format(d.View, {
          viewWrapper: d,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = Re.copy(d.Relationships);
        return k.forEach((T, S) => {
          x.addRelationship(S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(x, {
            viewWrapper: d,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${y + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((d, y) => {
        const _ = (0, ye.default)(this.formatter.format(d.View, {
          viewWrapper: d,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = Re.copy(d.Relationships);
        return k.forEach((T, S) => {
          x.addRelationship(S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(x, {
            viewWrapper: d,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${y + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((d, y) => {
        const _ = (0, ye.default)(this.formatter.format(d.View, {
          viewWrapper: d,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = this.imageReplacer.replace(_, k, 0);
        return {
          data: this.numberingReplacer.replace(x, e.Numbering.ConcreteNumbering),
          path: `word/header${y + 1}.xml`
        };
      }),
      Footers: e.Footers.map((d, y) => {
        const _ = (0, ye.default)(this.formatter.format(d.View, {
          viewWrapper: d,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = this.imageReplacer.replace(_, k, 0);
        return {
          data: this.numberingReplacer.replace(x, e.Numbering.ConcreteNumbering),
          path: `word/footer${y + 1}.xml`
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
          const d = this.imageReplacer.replace(a, E, c);
          return this.numberingReplacer.replace(d, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (() => {
          const d = Re.copy(e.FootNotes.Relationships);
          return E.forEach((y, _) => {
            d.addRelationship(c + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(d, {
            viewWrapper: e.FootNotes,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          });
        })(),
        path: "word/_rels/footnotes.xml.rels"
      },
      Endnotes: {
        data: (() => {
          const d = this.imageReplacer.replace(i, m, h);
          return this.numberingReplacer.replace(d, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (() => {
          const d = Re.copy(e.Endnotes.Relationships);
          return m.forEach((y, _) => {
            d.addRelationship(h + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(d, {
            viewWrapper: e.Endnotes,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          });
        })(),
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
          const d = this.imageReplacer.replace(n, v, s);
          return this.numberingReplacer.replace(d, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (() => {
          const d = Re.copy(e.Comments.Relationships);
          return v.forEach((y, _) => {
            d.addRelationship(s + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(d, {
            viewWrapper: {
              View: e.Comments,
              Relationships: e.Comments.Relationships
            },
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          });
        })(),
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
      PackageParts: _s(e, t),
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
function yi(e, t, r, n, a, i, u) {
  try {
    var s = e[i](u), c = s.value;
  } catch (h) {
    r(h);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(n, a);
}
function wp(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function u(c) {
        yi(i, n, a, u, s, "next", c);
      }
      function s(c) {
        yi(i, n, a, u, s, "throw", c);
      }
      u(void 0);
    });
  };
}
var gp = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, bi = (e) => e === !0 ? gp.WITH_2_BLANKS : e === !1 ? void 0 : e, xs = class _t {
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
    var a = this;
    return wp(function* (i, u, s, c = []) {
      return a.compiler.compile(i, bi(s), c).generateAsync({
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
    return _t.pack(t, "string", r, n);
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
    return _t.pack(t, "nodebuffer", r, n);
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
    return _t.pack(t, "base64", r, n);
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
    return _t.pack(t, "blob", r, n);
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
    return _t.pack(t, "arraybuffer", r, n);
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
    const a = new op.Stream();
    return this.compiler.compile(t, bi(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((i) => {
      a.emit("data", i), a.emit("end");
    }), a;
  }
};
Z(xs, "compiler", new vp());
const cr = {
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
function yp(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const n = Ns(e.color, t);
  n && (r.color = n);
  const a = Os(e.font, t);
  a && (r.font = a), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const i = {};
  return Object.keys(r).length && (i.run = r), e.paragraph && (i.paragraph = e.paragraph), i;
}
function bp(e = Dr, t = {}) {
  const r = e?.typography || Dr.typography, n = e?.typographyKinds || Dr.typographyKinds, a = {}, i = [], u = [];
  for (const [v, E] of Object.entries(r)) {
    const m = yp(E, e), d = cr[v];
    if (d === "document") {
      a.document = {
        ...m.run ? { run: m.run } : {},
        ...m.paragraph ? { paragraph: m.paragraph } : {}
      };
      continue;
    }
    if (d) {
      a[d] = m;
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
    const E = cr[v.id];
    if (!E) continue;
    const { id: m, name: d, basedOn: y, next: _, quickFormat: k, run: x, paragraph: T } = v;
    a[E] = {
      ...x ? { run: x } : {},
      ...T ? { paragraph: T } : {}
    };
  }
  const h = s.filter(
    (v) => !cr[v.id]
  ), w = c.filter(
    (v) => !cr[v.id]
  );
  return {
    default: a,
    paragraphStyles: _i(i, h),
    characterStyles: _i(u, w)
  };
}
function _i(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((i) => [i.id, i])), n = e.map(
    (i) => r.has(i.id) ? r.get(i.id) : i
  ), a = new Set(e.map((i) => i.id));
  for (const i of t)
    a.has(i.id) || n.push(i);
  return n;
}
async function nm(e, t = {}) {
  const r = await _p(e, t);
  return xs.toBlob(r);
}
async function _p(e, t = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: a = null,
    headerFirstPageOnly: i = !1,
    footerFirstPageOnly: u = !1
  } = e, {
    paragraphStyles: s,
    characterStyles: c,
    theme: h,
    typography: w,
    numbering: v,
    pageMargin: E,
    pageSize: m,
    pageOrientation: d,
    ...y
  } = t, _ = { nextId: 1, footnotes: {} };
  gr(r.flat(), _), n && gr(n, _), a && gr(a, _);
  const { loadAsset: k } = t, x = await tn(r.flat(), k), T = {
    pageNumbers: { start: 1, formatType: cl.DECIMAL },
    ...E ? { margin: E } : {}
  };
  m && (T.size = {
    width: m.width,
    height: m.height,
    ...d ? { orientation: d } : {}
  });
  const S = {
    properties: {
      type: Lh.CONTINUOUS,
      page: T
    },
    children: x
  };
  if (n) {
    const P = await tn(n, k), M = new ms({ children: P }), R = hr(!0);
    i ? (S.headers = { first: M, default: R }, S.properties.titlePage = !0) : S.headers = { default: M };
  } else
    S.headers = { default: hr(!0) };
  if (a) {
    const P = await tn(a, k), M = new vs({ children: P }), R = hr(!1);
    u ? (S.footers = { first: M, default: R }, S.properties.titlePage = !0) : S.footers = { default: M };
  } else
    S.footers = { default: hr(!1) };
  S.properties.titlePage && (S.headers && !S.headers.first && (S.headers.first = S.headers.default), S.footers && !S.footers.first && (S.footers.first = S.footers.default));
  const A = {
    ...y,
    sections: [S]
  }, b = w ? { ...h || {}, typography: w } : h;
  if (b) {
    const P = bp(b, {
      paragraphStyles: s,
      characterStyles: c
    }), M = {};
    P.default && Object.keys(P.default).length && (M.default = P.default), P.paragraphStyles.length && (M.paragraphStyles = P.paragraphStyles), P.characterStyles.length && (M.characterStyles = P.characterStyles), Object.keys(M).length && (A.styles = M);
  } else (s && s.length || c && c.length) && (A.styles = {}, s?.length && (A.styles.paragraphStyles = s), c?.length && (A.styles.characterStyles = c));
  return v && v.length && (A.numbering = { config: v }), Object.keys(_.footnotes).length && (A.footnotes = _.footnotes), new Jd(A);
}
function gr(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = t.nextId;
          t.nextId += 1, r.footnoteId = n;
          const a = [];
          for (const i of r.children || [])
            if (i.type === "paragraph")
              a.push(jn(i));
            else {
              const u = rr(i);
              u.length && a.push(new be({ children: u }));
            }
          a.length || a.push(new be({})), t.footnotes[n] = { children: a };
        }
        r.children && gr(r.children, t);
      }
  }
}
function hr(e) {
  const t = e ? Ee.RIGHT : Ee.CENTER, r = e ? ms : vs;
  return new r({
    children: [
      new be({
        alignment: t,
        children: [
          new Ie("Page "),
          new Ie({ children: [at.CURRENT] }),
          new Ie(" of "),
          new Ie({ children: [at.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function tn(e, t) {
  return (await Promise.all(
    e.map((n) => xp(n, t))
  )).flat();
}
async function xp(e, t) {
  switch (e.type) {
    case "table":
      return [await Zp(e)];
    case "image":
      return [await Qp(e, t)];
    case "tableOfContents":
      return [Ep(e)];
    case "webOnly":
      return [];
    default:
      return [await Xp(e)];
  }
}
function Ep(e) {
  const t = e.toc || {}, r = t.title || "Contents", n = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new tp(r, n);
}
function jn(e) {
  const t = {};
  if (e.heading && (t.heading = Np(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = Ts(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const n = We(e.spacing.before), a = We(e.spacing.after), i = We(e.spacing.line);
    n != null && (t.spacing.before = n), a != null && (t.spacing.after = a), i != null && (t.spacing.line = i), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
  }
  if (e.bullet && (t.bullet = { level: We(e.bullet.level) ?? 0 }), e.numbering) {
    t.numbering = {
      reference: e.numbering.reference,
      level: We(e.numbering.level) ?? 0
    };
    const n = We(e.numbering.instance);
    n != null && (t.numbering.instance = n);
  }
  if (e.indent) {
    const n = {};
    for (const a of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const i = e.indent[a];
      if (i == null) continue;
      const u = typeof i == "string" ? parseInt(i, 10) : i;
      Number.isFinite(u) && (n[a] = u);
    }
    Object.keys(n).length && (t.indent = n);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(zp).filter(Boolean));
  const r = (e.children || []).flatMap(rr);
  return e.bookmark && r.length ? t.children = [new Ha({ id: e.bookmark, children: r })] : r.length && (t.children = r), new be(t);
}
function rr(e) {
  switch (e.type) {
    case "text":
      return Tp(e);
    case "tab":
      return [new Ie({ children: [new Nr()] })];
    case "externalHyperlink":
    // A plain <a href> from same-source JSX — same destination, same
    // emitter. See the href note in ir/parser.js.
    case "a":
      return [Sp(e)];
    case "internalHyperlink":
      return [Ap(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new np(e.footnoteId)] : [];
    case "math":
      return [new Ie({ text: e.latex || "" })];
    default:
      return e.content ? [new Ie({ text: e.content })] : e.children ? e.children.flatMap(rr) : [];
  }
}
function Tp(e) {
  const t = [];
  e.positionalTab && t.push(
    new Ie({
      children: [
        new Qc({
          alignment: $p(e.positionalTab.alignment),
          leader: Kp(e.positionalTab.leader),
          relativeTo: qp(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new Ie({ children: [at.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new Ie({ children: [at.TOTAL_PAGES] })), t;
  const n = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (n.bold = !0), (e.italics === "true" || e.italics === !0) && (n.italics = !0), e.underline && (n.underline = e.underline), e.style && (n.style = e.style), e.color && (n.color = e.color), e.size != null) {
    const a = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(a) && (n.size = a);
  }
  return e.font && (n.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (n.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (n.allCaps = !0), (e.strike === "true" || e.strike === !0) && (n.strike = !0), e.subScript === "true" || e.subScript === !0 ? n.subScript = !0 : (e.superScript === "true" || e.superScript === !0) && (n.superScript = !0), t.push(new Ie(n)), t;
}
function Sp(e) {
  const t = e.link || e.href || "", r = (e.children || []).flatMap(rr);
  return new za({
    children: r.length ? r : [new Ie({ text: t })],
    link: t
  });
}
function Ap(e) {
  const t = (e.children || []).flatMap(rr);
  return new Ln({
    children: t.length ? t : [new Ie({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function Es(e) {
  const r = { rows: (e.children || []).filter((n) => n.type === "tableRow").map(kp) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? $r.AUTOFIT : $r.FIXED : r.columnWidths && (r.layout = $r.FIXED), e.tableWidth && (r.width = Ss(e.tableWidth)), e.tableBorders && (r.borders = As(e.tableBorders)), new vf(r);
}
function kp(e) {
  const r = { children: (e.children || []).filter((n) => n.type === "tableCell").map(Cp) };
  return e.tableHeader && (r.tableHeader = !0), new ss(r);
}
function Cp(e) {
  const t = {};
  if (e.width && (t.width = Ss(e.width)), e.margins && (t.margins = Ip(e.margins)), e.borders && (t.borders = As(e.borders)), e.shading && (t.shading = Bp(e.shading)), e.verticalAlign && (t.verticalAlign = Up(e.verticalAlign)), e.columnSpan) {
    const n = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(n) && n > 1 && (t.columnSpan = n);
  }
  if (e.rowSpan) {
    const n = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(n) && n > 1 && (t.rowSpan = n);
  }
  const r = (e.children || []).flatMap((n) => n.type === "table" ? [Es(n)] : [jn(n)]);
  return t.children = r.length ? r : [new be({})], new _r(t);
}
function We(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function Ip(e) {
  const t = {};
  for (const [r, n] of Object.entries(e)) {
    const a = We(n);
    a != null && (t[r] = a);
  }
  return t;
}
const Rp = {
  HEADING_1: gt.HEADING_1,
  HEADING_2: gt.HEADING_2,
  HEADING_3: gt.HEADING_3,
  HEADING_4: gt.HEADING_4,
  HEADING_5: gt.HEADING_5,
  HEADING_6: gt.HEADING_6
};
function Np(e) {
  return Rp[e];
}
const Op = {
  left: Ee.LEFT,
  center: Ee.CENTER,
  right: Ee.RIGHT,
  justified: Ee.JUSTIFIED,
  both: Ee.JUSTIFIED
};
function Ts(e) {
  return Op[e] ?? Ee.LEFT;
}
const Pp = {
  percentage: Oe.PERCENTAGE,
  pct: Oe.PERCENTAGE,
  dxa: Oe.DXA,
  auto: Oe.AUTO,
  nil: Oe.NIL
};
function Fp(e) {
  return Pp[e] ?? Oe.DXA;
}
function Ss(e) {
  return {
    size: We(e.size) ?? 0,
    type: Fp(e.type)
  };
}
const Dp = {
  single: Le.SINGLE,
  double: Le.DOUBLE,
  dotted: Le.DOTTED,
  dashed: Le.DASHED,
  none: Le.NONE,
  nil: Le.NIL,
  thick: Le.THICK,
  triple: Le.TRIPLE
};
function As(e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    t[r] = {
      style: Dp[n.style] ?? Le.SINGLE,
      size: We(n.size) ?? 1,
      color: n.color || "000000"
    };
  return t;
}
const Lp = {
  clear: tt.CLEAR,
  nil: tt.NIL,
  solid: tt.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: tt.DIAGONAL_CROSS,
  diagonalStripe: tt.DIAGONAL_STRIPE,
  horizontalStripe: tt.HORIZONTAL_STRIPE,
  verticalStripe: tt.VERTICAL_STRIPE
};
function Bp(e) {
  const t = e.fill || "000000", r = Lp[e.type] ?? tt.CLEAR, n = e.color || "auto";
  return { type: r, fill: t, color: n };
}
const Mp = {
  top: zt.TOP,
  center: zt.CENTER,
  middle: zt.CENTER,
  // alias — natural-language CSS-ish
  bottom: zt.BOTTOM
};
function Up(e) {
  return Mp[e] ?? zt.TOP;
}
const Wp = {
  left: De.LEFT,
  right: De.RIGHT,
  center: De.CENTER,
  decimal: De.DECIMAL,
  bar: De.BAR,
  clear: De.CLEAR,
  end: De.END,
  num: De.NUM,
  start: De.START
}, jp = {
  none: Lt.NONE,
  dot: Lt.DOT,
  hyphen: Lt.HYPHEN,
  underscore: Lt.UNDERSCORE,
  middleDot: Lt.MIDDLE_DOT
};
function zp(e) {
  if (!e || typeof e != "object") return null;
  const t = Wp[e.type] ?? De.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const n = { type: t, position: r };
  if (e.leader) {
    const a = jp[e.leader];
    a && (n.leader = a);
  }
  return n;
}
const Hp = {
  left: dr.LEFT,
  center: dr.CENTER,
  right: dr.RIGHT
};
function $p(e) {
  return Hp[e] ?? dr.LEFT;
}
const Gp = {
  none: dt.NONE,
  dot: dt.DOT,
  hyphen: dt.HYPHEN,
  underscore: dt.UNDERSCORE,
  heavy: dt.HEAVY,
  middleDot: dt.MIDDLE_DOT
};
function Kp(e) {
  return Gp[e] ?? dt.NONE;
}
const Vp = {
  indent: un.INDENT,
  margin: un.MARGIN
};
function qp(e) {
  return Vp[e] ?? un.MARGIN;
}
async function Xp(e) {
  return jn(e);
}
async function Zp(e) {
  return Es(e);
}
let Yp = 1;
function Jp(e, t) {
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
async function Qp(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new be({});
    const n = await em(r, t), a = We(e.transformation?.width) ?? 400, i = We(e.transformation?.height) ?? 300, u = {
      type: Jp(r, n),
      data: n,
      transformation: { width: a, height: i },
      altText: {
        id: Yp++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (u.floating = e.floating);
    const s = {
      children: [new Ju(u)]
    };
    return e.alignment && (s.alignment = Ts(e.alignment)), new be(s);
  } catch (r) {
    return console.error("Error creating image element:", r), new be({});
  }
}
async function em(e, t) {
  const { bytes: r } = await Rs(e, { loadAsset: t });
  return r;
}
export {
  _p as buildDocument,
  nm as compileDocx,
  hr as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-COr1mN7z.js.map
