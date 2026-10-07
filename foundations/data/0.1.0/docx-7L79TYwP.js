import { f as Ts } from "./fetch-C-PgllAm.js";
import { D as Pr, r as Ss, a as As } from "./_entry.generated-BD7RkX0v.js";
var ks = Object.create, _i = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, Is = Object.getOwnPropertyNames, Rs = Object.getPrototypeOf, Ns = Object.prototype.hasOwnProperty, xi = (e, t, r) => () => {
  if (r) throw r[0];
  try {
    return e && (t = e(e = 0)), t;
  } catch (n) {
    throw r = [n], n;
  }
}, he = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Os = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (var s = Is(t), i = 0, u = s.length, a; i < u; i++)
    a = s[i], !Ns.call(e, a) && a !== r && _i(e, a, {
      get: ((c) => t[c]).bind(null, a),
      enumerable: !(n = Cs(t, a)) || n.enumerable
    });
  return e;
}, cn = (e, t, r) => (r = e != null ? ks(Rs(e)) : {}, Os(_i(r, "default", {
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
function Ps(e, t) {
  if (Kt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Kt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fs(e) {
  var t = Ps(e, "string");
  return Kt(t) == "symbol" ? t : t + "";
}
function J(e, t, r) {
  return (t = Fs(t)) in e ? Object.defineProperty(e, t, {
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
}, Ds = Object.seal({}), ae = class extends Vt {
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
      if (n instanceof Vt) {
        const s = n.writtenAs;
        return s ? s.map((i) => i.prepForXml(e)) : n.prepForXml(e);
      }
      return n;
    }).filter((n) => n !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : Ds };
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
}, ot = class extends ae {
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
function Hn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hn(Object(r), !0).forEach(function(n) {
      J(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hn(Object(r)).forEach(function(n) {
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
        const s = this.xmlKeys && this.xmlKeys[r] || r;
        t[s] = n;
      }
    }), { _attr: t };
  }
}, hn = class extends Vt {
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: n }) => fe(fe({}, t), {}, { [r]: n }), {}) };
  }
}, Pe = class extends ve {
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
}, fn = /* @__PURE__ */ he(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, n = r && typeof r.apply == "function" ? r.apply : function(P, M, R) {
    return Function.prototype.apply.call(P, M, R);
  }, s;
  r && typeof r.ownKeys == "function" ? s = r.ownKeys : Object.getOwnPropertySymbols ? s = function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  } : s = function(P) {
    return Object.getOwnPropertyNames(P);
  };
  function i(b) {
    console && console.warn && console.warn(b);
  }
  var u = Number.isNaN || function(P) {
    return P !== P;
  };
  function a() {
    a.init.call(this);
  }
  t.exports = a, t.exports.once = T, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var c = 10;
  function d(b) {
    if (typeof b != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof b);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return c;
    },
    set: function(b) {
      if (typeof b != "number" || b < 0 || u(b)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + b + ".");
      c = b;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(P) {
    if (typeof P != "number" || P < 0 || u(P)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  };
  function w(b) {
    return b._maxListeners === void 0 ? a.defaultMaxListeners : b._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return w(this);
  }, a.prototype.emit = function(P) {
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
    if (d(M), ee = b._events, ee === void 0 ? (ee = b._events = /* @__PURE__ */ Object.create(null), b._eventsCount = 0) : (ee.newListener !== void 0 && (b.emit("newListener", P, M.listener ? M.listener : M), ee = b._events), O = ee[P]), O === void 0)
      O = ee[P] = M, ++b._eventsCount;
    else if (typeof O == "function" ? O = ee[P] = R ? [M, O] : [O, M] : R ? O.unshift(M) : O.push(M), K = w(b), K > 0 && O.length > K && !O.warned) {
      O.warned = !0;
      var z = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(P) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      z.name = "MaxListenersExceededWarning", z.emitter = b, z.type = P, z.count = O.length, i(z);
    }
    return b;
  }
  a.prototype.addListener = function(P, M) {
    return v(this, P, M, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(P, M) {
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
  a.prototype.once = function(P, M) {
    return d(M), this.on(P, m(this, P, M)), this;
  }, a.prototype.prependOnceListener = function(P, M) {
    return d(M), this.prependListener(P, m(this, P, M)), this;
  }, a.prototype.removeListener = function(P, M) {
    var R, K, ee, O, z;
    if (d(M), K = this._events, K === void 0) return this;
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
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(P) {
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
  function f(b, P, M) {
    var R = b._events;
    if (R === void 0) return [];
    var K = R[P];
    return K === void 0 ? [] : typeof K == "function" ? M ? [K.listener || K] : [K] : M ? x(K) : _(K, K.length);
  }
  a.prototype.listeners = function(P) {
    return f(this, P, !0);
  }, a.prototype.rawListeners = function(P) {
    return f(this, P, !1);
  }, a.listenerCount = function(b, P) {
    return typeof b.listenerCount == "function" ? b.listenerCount(P) : y.call(b, P);
  }, a.prototype.listenerCount = y;
  function y(b) {
    var P = this._events;
    if (P !== void 0) {
      var M = P[b];
      if (typeof M == "function") return 1;
      if (M !== void 0) return M.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? s(this._events) : [];
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
})), lt = /* @__PURE__ */ he(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(n, s) {
    s && (n.super_ = s, n.prototype = Object.create(s.prototype, { constructor: {
      value: n,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : t.exports = function(n, s) {
    if (s) {
      n.super_ = s;
      var i = function() {
      };
      i.prototype = s.prototype, n.prototype = new i(), n.prototype.constructor = n;
    }
  };
})), Oe, kt = xi((() => {
  Oe = globalThis || self;
}));
function Ls(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Qr() {
  throw new Error("setTimeout has not been defined");
}
function en() {
  throw new Error("clearTimeout has not been defined");
}
function Ei(e) {
  if (He === setTimeout) return setTimeout(e, 0);
  if ((He === Qr || !He) && setTimeout)
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
function Bs(e) {
  if ($e === clearTimeout) return clearTimeout(e);
  if (($e === en || !$e) && clearTimeout)
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
function Ms() {
  !wt || !pt || (wt = !1, pt.length ? Ke = pt.concat(Ke) : $t = -1, Ke.length && Ti());
}
function Ti() {
  if (!wt) {
    var e = Ei(Ms);
    wt = !0;
    for (var t = Ke.length; t; ) {
      for (pt = Ke, Ke = []; ++$t < t; ) pt && pt[$t].run();
      $t = -1, t = Ke.length;
    }
    pt = null, wt = !1, Bs(e);
  }
}
function $n(e, t) {
  this.fun = e, this.array = t;
}
function Je() {
}
var Fr, xe, He, $e, Ke, wt, pt, $t, Gn, ge, ut = xi((() => {
  Fr = { exports: {} }, xe = Fr.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? He = setTimeout : He = Qr;
    } catch {
      He = Qr;
    }
    try {
      typeof clearTimeout == "function" ? $e = clearTimeout : $e = en;
    } catch {
      $e = en;
    }
  })(), Ke = [], wt = !1, $t = -1, xe.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    Ke.push(new $n(e, t)), Ke.length === 1 && !wt && Ei(Ti);
  }, $n.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, xe.title = "browser", xe.browser = !0, xe.env = {}, xe.argv = [], xe.version = "", xe.versions = {}, xe.on = Je, xe.addListener = Je, xe.once = Je, xe.off = Je, xe.removeListener = Je, xe.removeAllListeners = Je, xe.emit = Je, xe.prependListener = Je, xe.prependOnceListener = Je, xe.listeners = function(e) {
    return [];
  }, xe.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, xe.cwd = function() {
    return "/";
  }, xe.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, xe.umask = function() {
    return 0;
  }, Gn = Fr.exports, ge = /* @__PURE__ */ Ls(Gn);
})), Si = /* @__PURE__ */ he(((e, t) => {
  t.exports = fn().EventEmitter;
})), Us = /* @__PURE__ */ he(((e) => {
  e.byteLength = c, e.toByteArray = w, e.fromByteArray = m;
  for (var t = [], r = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, u = s.length; i < u; ++i)
    t[i] = s[i], r[s.charCodeAt(i)] = i;
  r[45] = 62, r[95] = 63;
  function a(f) {
    var y = f.length;
    if (y % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var _ = f.indexOf("=");
    _ === -1 && (_ = y);
    var k = _ === y ? 0 : 4 - _ % 4;
    return [_, k];
  }
  function c(f) {
    var y = a(f), _ = y[0], k = y[1];
    return (_ + k) * 3 / 4 - k;
  }
  function d(f, y, _) {
    return (y + _) * 3 / 4 - _;
  }
  function w(f) {
    for (var y, _ = a(f), k = _[0], x = _[1], T = new n(d(f, k, x)), S = 0, A = x > 0 ? k - 4 : k, b = 0; b < A; b += 4)
      y = r[f.charCodeAt(b)] << 18 | r[f.charCodeAt(b + 1)] << 12 | r[f.charCodeAt(b + 2)] << 6 | r[f.charCodeAt(b + 3)], T[S++] = y >> 16 & 255, T[S++] = y >> 8 & 255, T[S++] = y & 255;
    return x === 2 && (y = r[f.charCodeAt(b)] << 2 | r[f.charCodeAt(b + 1)] >> 4, T[S++] = y & 255), x === 1 && (y = r[f.charCodeAt(b)] << 10 | r[f.charCodeAt(b + 1)] << 4 | r[f.charCodeAt(b + 2)] >> 2, T[S++] = y >> 8 & 255, T[S++] = y & 255), T;
  }
  function v(f) {
    return t[f >> 18 & 63] + t[f >> 12 & 63] + t[f >> 6 & 63] + t[f & 63];
  }
  function E(f, y, _) {
    for (var k, x = [], T = y; T < _; T += 3)
      k = (f[T] << 16 & 16711680) + (f[T + 1] << 8 & 65280) + (f[T + 2] & 255), x.push(v(k));
    return x.join("");
  }
  function m(f) {
    for (var y, _ = f.length, k = _ % 3, x = [], T = 16383, S = 0, A = _ - k; S < A; S += T) x.push(E(f, S, S + T > A ? A : S + T));
    return k === 1 ? (y = f[_ - 1], x.push(t[y >> 2] + t[y << 4 & 63] + "==")) : k === 2 && (y = (f[_ - 2] << 8) + f[_ - 1], x.push(t[y >> 10] + t[y >> 4 & 63] + t[y << 2 & 63] + "=")), x.join("");
  }
})), Ws = /* @__PURE__ */ he(((e) => {
  e.read = function(t, r, n, s, i) {
    var u, a, c = i * 8 - s - 1, d = (1 << c) - 1, w = d >> 1, v = -7, E = n ? i - 1 : 0, m = n ? -1 : 1, f = t[r + E];
    for (E += m, u = f & (1 << -v) - 1, f >>= -v, v += c; v > 0; u = u * 256 + t[r + E], E += m, v -= 8) ;
    for (a = u & (1 << -v) - 1, u >>= -v, v += s; v > 0; a = a * 256 + t[r + E], E += m, v -= 8) ;
    if (u === 0) u = 1 - w;
    else {
      if (u === d) return a ? NaN : (f ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, s), u = u - w;
    }
    return (f ? -1 : 1) * a * Math.pow(2, u - s);
  }, e.write = function(t, r, n, s, i, u) {
    var a, c, d, w = u * 8 - i - 1, v = (1 << w) - 1, E = v >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = s ? 0 : u - 1, y = s ? 1 : -1, _ = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (c = isNaN(r) ? 1 : 0, a = v) : (a = Math.floor(Math.log(r) / Math.LN2), r * (d = Math.pow(2, -a)) < 1 && (a--, d *= 2), a + E >= 1 ? r += m / d : r += m * Math.pow(2, 1 - E), r * d >= 2 && (a++, d /= 2), a + E >= v ? (c = 0, a = v) : a + E >= 1 ? (c = (r * d - 1) * Math.pow(2, i), a = a + E) : (c = r * Math.pow(2, E - 1) * Math.pow(2, i), a = 0)); i >= 8; t[n + f] = c & 255, f += y, c /= 256, i -= 8) ;
    for (a = a << i | c, w += i; w > 0; t[n + f] = a & 255, f += y, a /= 256, w -= 8) ;
    t[n + f - y] |= _ * 128;
  };
}));
var _r = /* @__PURE__ */ he(((e) => {
  var t = Us(), r = Ws(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = a, e.SlowBuffer = x, e.INSPECT_MAX_BYTES = 50;
  var s = 2147483647;
  e.kMaxLength = s, a.TYPED_ARRAY_SUPPORT = i(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
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
  function u(N) {
    if (N > s) throw new RangeError('The value "' + N + '" is invalid for option "size"');
    var o = new Uint8Array(N);
    return Object.setPrototypeOf(o, a.prototype), o;
  }
  function a(N, o, l) {
    if (typeof N == "number") {
      if (typeof o == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return v(N);
    }
    return c(N, o, l);
  }
  a.poolSize = 8192;
  function c(N, o, l) {
    if (typeof N == "string") return E(N, o);
    if (ArrayBuffer.isView(N)) return f(N);
    if (N == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
    if (L(N, ArrayBuffer) || N && L(N.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (L(N, SharedArrayBuffer) || N && L(N.buffer, SharedArrayBuffer))) return y(N, o, l);
    if (typeof N == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var g = N.valueOf && N.valueOf();
    if (g != null && g !== N) return a.from(g, o, l);
    var B = _(N);
    if (B) return B;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof N[Symbol.toPrimitive] == "function") return a.from(N[Symbol.toPrimitive]("string"), o, l);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
  }
  a.from = function(N, o, l) {
    return c(N, o, l);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function d(N) {
    if (typeof N != "number") throw new TypeError('"size" argument must be of type number');
    if (N < 0) throw new RangeError('The value "' + N + '" is invalid for option "size"');
  }
  function w(N, o, l) {
    return d(N), N <= 0 ? u(N) : o !== void 0 ? typeof l == "string" ? u(N).fill(o, l) : u(N).fill(o) : u(N);
  }
  a.alloc = function(N, o, l) {
    return w(N, o, l);
  };
  function v(N) {
    return d(N), u(N < 0 ? 0 : k(N) | 0);
  }
  a.allocUnsafe = function(N) {
    return v(N);
  }, a.allocUnsafeSlow = function(N) {
    return v(N);
  };
  function E(N, o) {
    if ((typeof o != "string" || o === "") && (o = "utf8"), !a.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
    var l = T(N, o) | 0, g = u(l), B = g.write(N, o);
    return B !== l && (g = g.slice(0, B)), g;
  }
  function m(N) {
    for (var o = N.length < 0 ? 0 : k(N.length) | 0, l = u(o), g = 0; g < o; g += 1) l[g] = N[g] & 255;
    return l;
  }
  function f(N) {
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
    return o === void 0 && l === void 0 ? g = new Uint8Array(N) : l === void 0 ? g = new Uint8Array(N, o) : g = new Uint8Array(N, o, l), Object.setPrototypeOf(g, a.prototype), g;
  }
  function _(N) {
    if (a.isBuffer(N)) {
      var o = k(N.length) | 0, l = u(o);
      return l.length === 0 || N.copy(l, 0, 0, o), l;
    }
    if (N.length !== void 0)
      return typeof N.length != "number" || h(N.length) ? u(0) : m(N);
    if (N.type === "Buffer" && Array.isArray(N.data)) return m(N.data);
  }
  function k(N) {
    if (N >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return N | 0;
  }
  function x(N) {
    return +N != N && (N = 0), a.alloc(+N);
  }
  a.isBuffer = function(o) {
    return o != null && o._isBuffer === !0 && o !== a.prototype;
  }, a.compare = function(o, l) {
    if (L(o, Uint8Array) && (o = a.from(o, o.offset, o.byteLength)), L(l, Uint8Array) && (l = a.from(l, l.offset, l.byteLength)), !a.isBuffer(o) || !a.isBuffer(l)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (o === l) return 0;
    for (var g = o.length, B = l.length, $ = 0, j = Math.min(g, B); $ < j; ++$) if (o[$] !== l[$]) {
      g = o[$], B = l[$];
      break;
    }
    return g < B ? -1 : B < g ? 1 : 0;
  }, a.isEncoding = function(o) {
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
  }, a.concat = function(o, l) {
    if (!Array.isArray(o)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (o.length === 0) return a.alloc(0);
    var g;
    if (l === void 0)
      for (l = 0, g = 0; g < o.length; ++g) l += o[g].length;
    var B = a.allocUnsafe(l), $ = 0;
    for (g = 0; g < o.length; ++g) {
      var j = o[g];
      if (L(j, Uint8Array))
        $ + j.length > B.length ? a.from(j).copy(B, $) : Uint8Array.prototype.set.call(B, j, $);
      else if (a.isBuffer(j)) j.copy(B, $);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      $ += j.length;
    }
    return B;
  };
  function T(N, o) {
    if (a.isBuffer(N)) return N.length;
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
  a.byteLength = T;
  function S(N, o, l) {
    var g = !1;
    if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((l === void 0 || l > this.length) && (l = this.length), l <= 0) || (l >>>= 0, o >>>= 0, l <= o)) return "";
    for (N || (N = "utf8"); ; ) switch (N) {
      case "hex":
        return Z(this, o, l);
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
  a.prototype._isBuffer = !0;
  function A(N, o, l) {
    var g = N[o];
    N[o] = N[l], N[l] = g;
  }
  a.prototype.swap16 = function() {
    var o = this.length;
    if (o % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var l = 0; l < o; l += 2) A(this, l, l + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var o = this.length;
    if (o % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var l = 0; l < o; l += 4)
      A(this, l, l + 3), A(this, l + 1, l + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var o = this.length;
    if (o % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var l = 0; l < o; l += 8)
      A(this, l, l + 7), A(this, l + 1, l + 6), A(this, l + 2, l + 5), A(this, l + 3, l + 4);
    return this;
  }, a.prototype.toString = function() {
    var o = this.length;
    return o === 0 ? "" : arguments.length === 0 ? I(this, 0, o) : S.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(o) {
    if (!a.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
    return this === o ? !0 : a.compare(this, o) === 0;
  }, a.prototype.inspect = function() {
    var o = "", l = e.INSPECT_MAX_BYTES;
    return o = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (o += " ... "), "<Buffer " + o + ">";
  }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(o, l, g, B, $) {
    if (L(o, Uint8Array) && (o = a.from(o, o.offset, o.byteLength)), !a.isBuffer(o)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o);
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
    if (typeof l == "string" ? (g = l, l = 0) : l > 2147483647 ? l = 2147483647 : l < -2147483648 && (l = -2147483648), l = +l, h(l) && (l = B ? 0 : N.length - 1), l < 0 && (l = N.length + l), l >= N.length) {
      if (B) return -1;
      l = N.length - 1;
    } else if (l < 0)
      if (B) l = 0;
      else return -1;
    if (typeof o == "string" && (o = a.from(o, g)), a.isBuffer(o))
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
    function ue(Ae, nt) {
      return $ === 1 ? Ae[nt] : Ae.readUInt16BE(nt * $);
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
  a.prototype.includes = function(o, l, g) {
    return this.indexOf(o, l, g) !== -1;
  }, a.prototype.indexOf = function(o, l, g) {
    return b(this, o, l, g, !0);
  }, a.prototype.lastIndexOf = function(o, l, g) {
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
      if (h(ie)) return j;
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
  a.prototype.write = function(o, l, g, B) {
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
  }, a.prototype.toJSON = function() {
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
  function Z(N, o, l) {
    var g = N.length;
    (!o || o < 0) && (o = 0), (!l || l < 0 || l > g) && (l = g);
    for (var B = "", $ = o; $ < l; ++$) B += G[N[$]];
    return B;
  }
  function te(N, o, l) {
    for (var g = N.slice(o, l), B = "", $ = 0; $ < g.length - 1; $ += 2) B += String.fromCharCode(g[$] + g[$ + 1] * 256);
    return B;
  }
  a.prototype.slice = function(o, l) {
    var g = this.length;
    o = ~~o, l = l === void 0 ? g : ~~l, o < 0 ? (o += g, o < 0 && (o = 0)) : o > g && (o = g), l < 0 ? (l += g, l < 0 && (l = 0)) : l > g && (l = g), l < o && (l = o);
    var B = this.subarray(o, l);
    return Object.setPrototypeOf(B, a.prototype), B;
  };
  function V(N, o, l) {
    if (N % 1 !== 0 || N < 0) throw new RangeError("offset is not uint");
    if (N + o > l) throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o], $ = 1, j = 0; ++j < l && ($ *= 256); ) B += this[o + j] * $;
    return B;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o + --l], $ = 1; l > 0 && ($ *= 256); ) B += this[o + --l] * $;
    return B;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(o, l) {
    return o = o >>> 0, l || V(o, 1, this.length), this[o];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(o, l) {
    return o = o >>> 0, l || V(o, 2, this.length), this[o] | this[o + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(o, l) {
    return o = o >>> 0, l || V(o, 2, this.length), this[o] << 8 | this[o + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
  }, a.prototype.readIntLE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = this[o], $ = 1, j = 0; ++j < l && ($ *= 256); ) B += this[o + j] * $;
    return $ *= 128, B >= $ && (B -= Math.pow(2, 8 * l)), B;
  }, a.prototype.readIntBE = function(o, l, g) {
    o = o >>> 0, l = l >>> 0, g || V(o, l, this.length);
    for (var B = l, $ = 1, j = this[o + --B]; B > 0 && ($ *= 256); ) j += this[o + --B] * $;
    return $ *= 128, j >= $ && (j -= Math.pow(2, 8 * l)), j;
  }, a.prototype.readInt8 = function(o, l) {
    return o = o >>> 0, l || V(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
  }, a.prototype.readInt16LE = function(o, l) {
    o = o >>> 0, l || V(o, 2, this.length);
    var g = this[o] | this[o + 1] << 8;
    return g & 32768 ? g | 4294901760 : g;
  }, a.prototype.readInt16BE = function(o, l) {
    o = o >>> 0, l || V(o, 2, this.length);
    var g = this[o + 1] | this[o] << 8;
    return g & 32768 ? g | 4294901760 : g;
  }, a.prototype.readInt32LE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
  }, a.prototype.readInt32BE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
  }, a.prototype.readFloatLE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), r.read(this, o, !0, 23, 4);
  }, a.prototype.readFloatBE = function(o, l) {
    return o = o >>> 0, l || V(o, 4, this.length), r.read(this, o, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(o, l) {
    return o = o >>> 0, l || V(o, 8, this.length), r.read(this, o, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(o, l) {
    return o = o >>> 0, l || V(o, 8, this.length), r.read(this, o, !1, 52, 8);
  };
  function F(N, o, l, g, B, $) {
    if (!a.isBuffer(N)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > B || o < $) throw new RangeError('"value" argument is out of bounds');
    if (l + g > N.length) throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, g = g >>> 0, !B) {
      var $ = Math.pow(2, 8 * g) - 1;
      F(this, o, l, g, $, 0);
    }
    var j = 1, ie = 0;
    for (this[l] = o & 255; ++ie < g && (j *= 256); ) this[l + ie] = o / j & 255;
    return l + g;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, g = g >>> 0, !B) {
      var $ = Math.pow(2, 8 * g) - 1;
      F(this, o, l, g, $, 0);
    }
    var j = g - 1, ie = 1;
    for (this[l + j] = o & 255; --j >= 0 && (ie *= 256); ) this[l + j] = o / ie & 255;
    return l + g;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 1, 255, 0), this[l] = o & 255, l + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 65535, 0), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 65535, 0), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 4294967295, 0), this[l + 3] = o >>> 24, this[l + 2] = o >>> 16, this[l + 1] = o >>> 8, this[l] = o & 255, l + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 4294967295, 0), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  }, a.prototype.writeIntLE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, !B) {
      var $ = Math.pow(2, 8 * g - 1);
      F(this, o, l, g, $ - 1, -$);
    }
    var j = 0, ie = 1, ue = 0;
    for (this[l] = o & 255; ++j < g && (ie *= 256); )
      o < 0 && ue === 0 && this[l + j - 1] !== 0 && (ue = 1), this[l + j] = (o / ie >> 0) - ue & 255;
    return l + g;
  }, a.prototype.writeIntBE = function(o, l, g, B) {
    if (o = +o, l = l >>> 0, !B) {
      var $ = Math.pow(2, 8 * g - 1);
      F(this, o, l, g, $ - 1, -$);
    }
    var j = g - 1, ie = 1, ue = 0;
    for (this[l + j] = o & 255; --j >= 0 && (ie *= 256); )
      o < 0 && ue === 0 && this[l + j + 1] !== 0 && (ue = 1), this[l + j] = (o / ie >> 0) - ue & 255;
    return l + g;
  }, a.prototype.writeInt8 = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[l] = o & 255, l + 1;
  }, a.prototype.writeInt16LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 32767, -32768), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
  }, a.prototype.writeInt16BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 2, 32767, -32768), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
  }, a.prototype.writeInt32LE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 2147483647, -2147483648), this[l] = o & 255, this[l + 1] = o >>> 8, this[l + 2] = o >>> 16, this[l + 3] = o >>> 24, l + 4;
  }, a.prototype.writeInt32BE = function(o, l, g) {
    return o = +o, l = l >>> 0, g || F(this, o, l, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
  };
  function X(N, o, l, g, B, $) {
    if (l + g > N.length) throw new RangeError("Index out of range");
    if (l < 0) throw new RangeError("Index out of range");
  }
  function Y(N, o, l, g, B) {
    return o = +o, l = l >>> 0, B || X(N, o, l, 4), r.write(N, o, l, g, 23, 4), l + 4;
  }
  a.prototype.writeFloatLE = function(o, l, g) {
    return Y(this, o, l, !0, g);
  }, a.prototype.writeFloatBE = function(o, l, g) {
    return Y(this, o, l, !1, g);
  };
  function re(N, o, l, g, B) {
    return o = +o, l = l >>> 0, B || X(N, o, l, 8), r.write(N, o, l, g, 52, 8), l + 8;
  }
  a.prototype.writeDoubleLE = function(o, l, g) {
    return re(this, o, l, !0, g);
  }, a.prototype.writeDoubleBE = function(o, l, g) {
    return re(this, o, l, !1, g);
  }, a.prototype.copy = function(o, l, g, B) {
    if (!a.isBuffer(o)) throw new TypeError("argument should be a Buffer");
    if (g || (g = 0), !B && B !== 0 && (B = this.length), l >= o.length && (l = o.length), l || (l = 0), B > 0 && B < g && (B = g), B === g || o.length === 0 || this.length === 0) return 0;
    if (l < 0) throw new RangeError("targetStart out of bounds");
    if (g < 0 || g >= this.length) throw new RangeError("Index out of range");
    if (B < 0) throw new RangeError("sourceEnd out of bounds");
    B > this.length && (B = this.length), o.length - l < B - g && (B = o.length - l + g);
    var $ = B - g;
    return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, g, B) : Uint8Array.prototype.set.call(o, this.subarray(g, B), l), $;
  }, a.prototype.fill = function(o, l, g, B) {
    if (typeof o == "string") {
      if (typeof l == "string" ? (B = l, l = 0, g = this.length) : typeof g == "string" && (B = g, g = this.length), B !== void 0 && typeof B != "string") throw new TypeError("encoding must be a string");
      if (typeof B == "string" && !a.isEncoding(B)) throw new TypeError("Unknown encoding: " + B);
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
      var ie = a.isBuffer(o) ? o : a.from(o, B), ue = ie.length;
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
  function h(N) {
    return N !== N;
  }
  var G = (function() {
    for (var N = "0123456789abcdef", o = new Array(256), l = 0; l < 16; ++l)
      for (var g = l * 16, B = 0; B < 16; ++B) o[g + B] = N[l] + N[B];
    return o;
  })();
})), Ai = /* @__PURE__ */ he(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var n = {}, s = /* @__PURE__ */ Symbol("test"), i = Object(s);
    if (typeof s == "string" || Object.prototype.toString.call(s) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]") return !1;
    var u = 42;
    n[s] = u;
    for (var a in n) return !1;
    if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0) return !1;
    var c = Object.getOwnPropertySymbols(n);
    if (c.length !== 1 || c[0] !== s || !Object.prototype.propertyIsEnumerable.call(n, s)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var d = Object.getOwnPropertyDescriptor(n, s);
      if (d.value !== u || d.enumerable !== !0) return !1;
    }
    return !0;
  };
})), dn = /* @__PURE__ */ he(((e, t) => {
  var r = Ai();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), ki = /* @__PURE__ */ he(((e, t) => {
  t.exports = Object;
})), js = /* @__PURE__ */ he(((e, t) => {
  t.exports = Error;
})), zs = /* @__PURE__ */ he(((e, t) => {
  t.exports = EvalError;
})), Hs = /* @__PURE__ */ he(((e, t) => {
  t.exports = RangeError;
})), $s = /* @__PURE__ */ he(((e, t) => {
  t.exports = ReferenceError;
})), Ci = /* @__PURE__ */ he(((e, t) => {
  t.exports = SyntaxError;
})), xr = /* @__PURE__ */ he(((e, t) => {
  t.exports = TypeError;
})), Gs = /* @__PURE__ */ he(((e, t) => {
  t.exports = URIError;
})), Ks = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.abs;
})), Vs = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.floor;
})), qs = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.max;
})), Xs = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.min;
})), Zs = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.pow;
})), Ys = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.round;
})), Js = /* @__PURE__ */ he(((e, t) => {
  t.exports = Number.isNaN || function(n) {
    return n !== n;
  };
})), Qs = /* @__PURE__ */ he(((e, t) => {
  var r = Js();
  t.exports = function(s) {
    return r(s) || s === 0 ? s : s < 0 ? -1 : 1;
  };
})), eo = /* @__PURE__ */ he(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), Zt = /* @__PURE__ */ he(((e, t) => {
  var r = eo();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), Er = /* @__PURE__ */ he(((e, t) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  t.exports = r;
})), to = /* @__PURE__ */ he(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, n = Ai();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : n();
  };
})), Ii = /* @__PURE__ */ he(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Ri = /* @__PURE__ */ he(((e, t) => {
  t.exports = ki().getPrototypeOf || null;
})), ro = /* @__PURE__ */ he(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", n = Object.prototype.toString, s = Math.max, i = "[object Function]", u = function(w, v) {
    for (var E = [], m = 0; m < w.length; m += 1) E[m] = w[m];
    for (var f = 0; f < v.length; f += 1) E[f + w.length] = v[f];
    return E;
  }, a = function(w, v) {
    for (var E = [], m = v, f = 0; m < w.length; m += 1, f += 1) E[f] = w[m];
    return E;
  }, c = function(d, w) {
    for (var v = "", E = 0; E < d.length; E += 1)
      v += d[E], E + 1 < d.length && (v += w);
    return v;
  };
  t.exports = function(w) {
    var v = this;
    if (typeof v != "function" || n.apply(v) !== i) throw new TypeError(r + v);
    for (var E = a(arguments, 1), m, f = function() {
      if (this instanceof m) {
        var T = v.apply(this, u(E, arguments));
        return Object(T) === T ? T : this;
      }
      return v.apply(w, u(E, arguments));
    }, y = s(0, v.length - E.length), _ = [], k = 0; k < y; k++) _[k] = "$" + k;
    if (m = Function("binder", "return function (" + c(_, ",") + "){ return binder.apply(this,arguments); }")(f), v.prototype) {
      var x = function() {
      };
      x.prototype = v.prototype, m.prototype = new x(), x.prototype = null;
    }
    return m;
  };
})), Yt = /* @__PURE__ */ he(((e, t) => {
  var r = ro();
  t.exports = Function.prototype.bind || r;
})), pn = /* @__PURE__ */ he(((e, t) => {
  t.exports = Function.prototype.call;
})), mn = /* @__PURE__ */ he(((e, t) => {
  t.exports = Function.prototype.apply;
})), no = /* @__PURE__ */ he(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), Ni = /* @__PURE__ */ he(((e, t) => {
  var r = Yt(), n = mn(), s = pn();
  t.exports = no() || r.call(s, n);
})), vn = /* @__PURE__ */ he(((e, t) => {
  var r = Yt(), n = xr(), s = pn(), i = Ni();
  t.exports = function(a) {
    if (a.length < 1 || typeof a[0] != "function") throw new n("a function is required");
    return i(r, s, a);
  };
})), io = /* @__PURE__ */ he(((e, t) => {
  var r = vn(), n = Zt(), s;
  try {
    s = [].__proto__ === Array.prototype;
  } catch (c) {
    if (!c || typeof c != "object" || !("code" in c) || c.code !== "ERR_PROTO_ACCESS") throw c;
  }
  var i = !!s && n && n(Object.prototype, "__proto__"), u = Object, a = u.getPrototypeOf;
  t.exports = i && typeof i.get == "function" ? r([i.get]) : typeof a == "function" ? function(d) {
    return a(d == null ? d : u(d));
  } : !1;
})), Oi = /* @__PURE__ */ he(((e, t) => {
  var r = Ii(), n = Ri(), s = io();
  t.exports = r ? function(u) {
    return r(u);
  } : n ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function") throw new TypeError("getProto: not an object");
    return n(u);
  } : s ? function(u) {
    return s(u);
  } : null;
})), ao = /* @__PURE__ */ he(((e, t) => {
  var r = Function.prototype.call, n = Object.prototype.hasOwnProperty;
  t.exports = Yt().call(r, n);
})), Pi = /* @__PURE__ */ he(((e, t) => {
  var r, n = ki(), s = js(), i = zs(), u = Hs(), a = $s(), c = Ci(), d = xr(), w = Gs(), v = Ks(), E = Vs(), m = qs(), f = Xs(), y = Zs(), _ = Ys(), k = Qs(), x = Function, T = function(U) {
    try {
      return x('"use strict"; return (' + U + ").constructor;")();
    } catch {
    }
  }, S = Zt(), A = Er(), b = function() {
    throw new d();
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
  })() : b, M = to()(), R = Oi(), K = Ri(), ee = Ii(), O = mn(), z = pn(), I = {}, H = typeof Uint8Array > "u" || !R ? r : R(Uint8Array), Q = {
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
    "%Error%": s,
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
    "%ReferenceError%": a,
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
    "%TypeError%": d,
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
    "%Math.min%": f,
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
      var h = U("%AsyncGenerator%");
      h && R && (D = R(h.prototype));
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
  }, Z = Yt(), te = ao(), V = Z.call(z, Array.prototype.concat), F = Z.call(O, Array.prototype.splice), X = Z.call(z, String.prototype.replace), Y = Z.call(z, String.prototype.slice), re = Z.call(z, RegExp.prototype.exec), pe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, C = /\\(\\)?/g, p = function(ne) {
    var D = Y(ne, 0, 1), L = Y(ne, -1);
    if (D === "%" && L !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
    if (L === "%" && D !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
    var h = [];
    return X(ne, pe, function(G, N, o, l) {
      h[h.length] = o ? X(l, C, "$1") : N || G;
    }), h;
  }, W = function(ne, D) {
    var L = ne, h;
    if (te(le, L) && (h = le[L], L = "%" + h[0] + "%"), te(Q, L)) {
      var G = Q[L];
      if (G === I && (G = q(L)), typeof G > "u" && !D) throw new d("intrinsic " + ne + " exists, but is not available. Please file an issue!");
      return {
        alias: h,
        name: L,
        value: G
      };
    }
    throw new c("intrinsic " + ne + " does not exist!");
  };
  t.exports = function(ne, D) {
    if (typeof ne != "string" || ne.length === 0) throw new d("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof D != "boolean") throw new d('"allowMissing" argument must be a boolean');
    if (re(/^%?[^%]*%?$/, ne) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(ne), h = L.length > 0 ? L[0] : "", G = W("%" + h + "%", D), N = G.name, o = G.value, l = !1, g = G.alias;
    g && (h = g[0], F(L, V([0, 1], g)));
    for (var B = 1, $ = !0; B < L.length; B += 1) {
      var j = L[B], ie = Y(j, 0, 1), ue = Y(j, -1);
      if ((ie === '"' || ie === "'" || ie === "`" || ue === '"' || ue === "'" || ue === "`") && ie !== ue) throw new c("property names with quotes must have matching quotes");
      if ((j === "constructor" || !$) && (l = !0), h += "." + j, N = "%" + h + "%", te(Q, N)) o = Q[N];
      else if (o != null) {
        if (!(j in o)) {
          if (!D) throw new d("base intrinsic for " + ne + " exists, but the property is not available.");
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
})), Fi = /* @__PURE__ */ he(((e, t) => {
  var r = Pi(), n = vn(), s = n([r("%String.prototype.indexOf%")]);
  t.exports = function(u, a) {
    var c = r(u, !!a);
    return typeof c == "function" && s(u, ".prototype.") > -1 ? n([c]) : c;
  };
})), so = /* @__PURE__ */ he(((e, t) => {
  var r = dn()(), n = Fi()("Object.prototype.toString"), s = function(c) {
    return r && c && typeof c == "object" && Symbol.toStringTag in c ? !1 : n(c) === "[object Arguments]";
  }, i = function(c) {
    return s(c) ? !0 : c !== null && typeof c == "object" && "length" in c && typeof c.length == "number" && c.length >= 0 && n(c) !== "[object Array]" && "callee" in c && n(c.callee) === "[object Function]";
  }, u = (function() {
    return s(arguments);
  })();
  s.isLegacyArguments = i, t.exports = u ? s : i;
})), oo = /* @__PURE__ */ he(((e, t) => {
  var r = Object.prototype.toString, n = Function.prototype.toString, s = /^\s*(?:function)?\*/, i = dn()(), u = Object.getPrototypeOf, a = function() {
    if (!i) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, c;
  t.exports = function(w) {
    if (typeof w != "function") return !1;
    if (s.test(n.call(w))) return !0;
    if (!i) return r.call(w) === "[object GeneratorFunction]";
    if (!u) return !1;
    if (typeof c > "u") {
      var v = a();
      c = v ? u(v) : !1;
    }
    return u(w) === c;
  };
})), lo = /* @__PURE__ */ he(((e, t) => {
  var r = Function.prototype.toString, n = typeof Reflect == "object" && Reflect !== null && Reflect.apply, s, i;
  if (typeof n == "function" && typeof Object.defineProperty == "function") try {
    s = Object.defineProperty({}, "length", { get: function() {
      throw i;
    } }), i = {}, n(function() {
      throw 42;
    }, null, s);
  } catch (S) {
    S !== i && (n = null);
  }
  else n = null;
  var u = /^\s*class\b/, a = function(A) {
    try {
      var b = r.call(A);
      return u.test(b);
    } catch {
      return !1;
    }
  }, c = function(A) {
    try {
      return a(A) ? !1 : (r.call(A), !0);
    } catch {
      return !1;
    }
  }, d = Object.prototype.toString, w = "[object Object]", v = "[object Function]", E = "[object GeneratorFunction]", m = "[object HTMLAllCollection]", f = "[object HTML document.all class]", y = "[object HTMLCollection]", _ = typeof Symbol == "function" && !!Symbol.toStringTag, k = !(0 in [,]), x = function() {
    return !1;
  };
  if (typeof document == "object") {
    var T = document.all;
    d.call(T) === d.call(document.all) && (x = function(A) {
      if ((k || !A) && (typeof A > "u" || typeof A == "object")) try {
        var b = d.call(A);
        return (b === m || b === f || b === y || b === w) && A("") == null;
      } catch {
      }
      return !1;
    });
  }
  t.exports = n ? function(A) {
    if (x(A)) return !0;
    if (!A || typeof A != "function" && typeof A != "object") return !1;
    try {
      n(A, null, s);
    } catch (b) {
      if (b !== i) return !1;
    }
    return !a(A) && c(A);
  } : function(A) {
    if (x(A)) return !0;
    if (!A || typeof A != "function" && typeof A != "object") return !1;
    if (_) return c(A);
    if (a(A)) return !1;
    var b = d.call(A);
    return b !== v && b !== E && !/^\[object HTML/.test(b) ? !1 : c(A);
  };
})), uo = /* @__PURE__ */ he(((e, t) => {
  var r = lo(), n = Object.prototype.toString, s = Object.prototype.hasOwnProperty, i = function(w, v, E) {
    for (var m = 0, f = w.length; m < f; m++) s.call(w, m) && (E == null ? v(w[m], m, w) : v.call(E, w[m], m, w));
  }, u = function(w, v, E) {
    for (var m = 0, f = w.length; m < f; m++) E == null ? v(w.charAt(m), m, w) : v.call(E, w.charAt(m), m, w);
  }, a = function(w, v, E) {
    for (var m in w) s.call(w, m) && (E == null ? v(w[m], m, w) : v.call(E, w[m], m, w));
  };
  function c(d) {
    return n.call(d) === "[object Array]";
  }
  t.exports = function(w, v, E) {
    if (!r(v)) throw new TypeError("iterator must be a function");
    var m;
    arguments.length >= 3 && (m = E), c(w) ? i(w, v, m) : typeof w == "string" ? u(w, v, m) : a(w, v, m);
  };
})), co = /* @__PURE__ */ he(((e, t) => {
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
})), ho = /* @__PURE__ */ he(((e, t) => {
  kt();
  var r = co(), n = typeof globalThis > "u" ? Oe : globalThis;
  t.exports = function() {
    for (var i = [], u = 0; u < r.length; u++) typeof n[r[u]] == "function" && (i[i.length] = r[u]);
    return i;
  };
})), fo = /* @__PURE__ */ he(((e, t) => {
  var r = Er(), n = Ci(), s = xr(), i = Zt();
  t.exports = function(a, c, d) {
    if (!a || typeof a != "object" && typeof a != "function") throw new s("`obj` must be an object or a function`");
    if (typeof c != "string" && typeof c != "symbol") throw new s("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new s("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new s("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new s("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new s("`loose`, if provided, must be a boolean");
    var w = arguments.length > 3 ? arguments[3] : null, v = arguments.length > 4 ? arguments[4] : null, E = arguments.length > 5 ? arguments[5] : null, m = arguments.length > 6 ? arguments[6] : !1, f = !!i && i(a, c);
    if (r) r(a, c, {
      configurable: E === null && f ? f.configurable : !E,
      enumerable: w === null && f ? f.enumerable : !w,
      value: d,
      writable: v === null && f ? f.writable : !v
    });
    else if (m || !w && !v && !E) a[c] = d;
    else throw new n("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), po = /* @__PURE__ */ he(((e, t) => {
  var r = Er(), n = function() {
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
})), mo = /* @__PURE__ */ he(((e, t) => {
  var r = Pi(), n = fo(), s = po()(), i = Zt(), u = xr(), a = r("%Math.floor%");
  t.exports = function(d, w) {
    if (typeof d != "function") throw new u("`fn` is not a function");
    if (typeof w != "number" || w < 0 || w > 4294967295 || a(w) !== w) throw new u("`length` must be a positive 32-bit integer");
    var v = arguments.length > 2 && !!arguments[2], E = !0, m = !0;
    if ("length" in d && i) {
      var f = i(d, "length");
      f && !f.configurable && (E = !1), f && !f.writable && (m = !1);
    }
    return (E || m || !v) && (s ? n(d, "length", w, !0, !0) : n(d, "length", w)), d;
  };
})), vo = /* @__PURE__ */ he(((e, t) => {
  var r = Yt(), n = mn(), s = Ni();
  t.exports = function() {
    return s(r, n, arguments);
  };
})), wo = /* @__PURE__ */ he(((e, t) => {
  var r = mo(), n = Er(), s = vn(), i = vo();
  t.exports = function(a) {
    var c = s(arguments), d = a.length - (arguments.length - 1);
    return r(c, 1 + (d > 0 ? d : 0), !0);
  }, n ? n(t.exports, "apply", { value: i }) : t.exports.apply = i;
})), Di = /* @__PURE__ */ he(((e, t) => {
  kt();
  var r = uo(), n = ho(), s = wo(), i = Fi(), u = Zt(), a = Oi(), c = i("Object.prototype.toString"), d = dn()(), w = typeof globalThis > "u" ? Oe : globalThis, v = n(), E = i("String.prototype.slice"), m = i("Array.prototype.indexOf", !0) || function(x, T) {
    for (var S = 0; S < x.length; S += 1) if (x[S] === T) return S;
    return -1;
  }, f = { __proto__: null };
  d && u && a ? r(v, function(k) {
    var x = new w[k]();
    if (Symbol.toStringTag in x && a) {
      var T = a(x), S = u(T, Symbol.toStringTag);
      !S && T && (S = u(a(T), Symbol.toStringTag)), f["$" + k] = s(S.get);
    }
  }) : r(v, function(k) {
    var x = new w[k](), T = x.slice || x.set;
    T && (f["$" + k] = s(T));
  });
  var y = function(x) {
    var T = !1;
    return r(
      f,
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
      f,
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
    if (!d) {
      var T = E(c(x), 8, -1);
      return m(v, T) > -1 ? T : T !== "Object" ? !1 : _(x);
    }
    return u ? y(x) : null;
  };
})), go = /* @__PURE__ */ he(((e, t) => {
  var r = Di();
  t.exports = function(s) {
    return !!r(s);
  };
})), yo = /* @__PURE__ */ he(((e) => {
  var t = so(), r = oo(), n = Di(), s = go();
  function i(g) {
    return g.call.bind(g);
  }
  var u = typeof BigInt < "u", a = typeof Symbol < "u", c = i(Object.prototype.toString), d = i(Number.prototype.valueOf), w = i(String.prototype.valueOf), v = i(Boolean.prototype.valueOf);
  if (u) var E = i(BigInt.prototype.valueOf);
  if (a) var m = i(Symbol.prototype.valueOf);
  function f(g, B) {
    if (typeof g != "object") return !1;
    try {
      return B(g), !0;
    } catch {
      return !1;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = s;
  function y(g) {
    return typeof Promise < "u" && g instanceof Promise || g !== null && typeof g == "object" && typeof g.then == "function" && typeof g.catch == "function";
  }
  e.isPromise = y;
  function _(g) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(g) : s(g) || X(g);
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
  function Z(g) {
    return le(g);
  }
  e.isWeakSet = Z;
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
  var Y = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function re(g) {
    return c(g) === "[object SharedArrayBuffer]";
  }
  function pe(g) {
    return typeof Y > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new Y())), re.working ? re(g) : g instanceof Y);
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
    return f(g, d);
  }
  e.isNumberObject = D;
  function L(g) {
    return f(g, w);
  }
  e.isStringObject = L;
  function h(g) {
    return f(g, v);
  }
  e.isBooleanObject = h;
  function G(g) {
    return u && f(g, E);
  }
  e.isBigIntObject = G;
  function N(g) {
    return a && f(g, m);
  }
  e.isSymbolObject = N;
  function o(g) {
    return D(g) || L(g) || h(g) || G(g) || N(g);
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
})), bo = /* @__PURE__ */ he(((e, t) => {
  t.exports = function(n) {
    return n && typeof n == "object" && typeof n.copy == "function" && typeof n.fill == "function" && typeof n.readUInt8 == "function";
  };
})), Li = /* @__PURE__ */ he(((e) => {
  ut();
  var t = Object.getOwnPropertyDescriptors || function(X) {
    for (var Y = Object.keys(X), re = {}, pe = 0; pe < Y.length; pe++) re[Y[pe]] = Object.getOwnPropertyDescriptor(X, Y[pe]);
    return re;
  }, r = /%[sdj%]/g;
  e.format = function(F) {
    if (!A(F)) {
      for (var X = [], Y = 0; Y < arguments.length; Y++) X.push(u(arguments[Y]));
      return X.join(" ");
    }
    for (var Y = 1, re = arguments, pe = re.length, C = String(F).replace(r, function(W) {
      if (W === "%%") return "%";
      if (Y >= pe) return W;
      switch (W) {
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
          return W;
      }
    }), p = re[Y]; Y < pe; p = re[++Y]) x(p) || !R(p) ? C += " " + p : C += " " + u(p);
    return C;
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
  var n = {}, s = /^$/;
  if (ge.env.NODE_DEBUG) {
    var i = ge.env.NODE_DEBUG;
    i = i.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), s = new RegExp("^" + i + "$", "i");
  }
  e.debuglog = function(F) {
    if (F = F.toUpperCase(), !n[F])
      if (s.test(F)) {
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
    return arguments.length >= 3 && (Y.depth = arguments[2]), arguments.length >= 4 && (Y.colors = arguments[3]), k(X) ? Y.showHidden = X : X && e._extend(Y, X), P(Y.showHidden) && (Y.showHidden = !1), P(Y.depth) && (Y.depth = 2), P(Y.colors) && (Y.colors = !1), P(Y.customInspect) && (Y.customInspect = !0), Y.colors && (Y.stylize = a), w(Y, F, Y.depth);
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
  function a(F, X) {
    var Y = u.styles[X];
    return Y ? "\x1B[" + u.colors[Y][0] + "m" + F + "\x1B[" + u.colors[Y][1] + "m" : F;
  }
  function c(F, X) {
    return F;
  }
  function d(F) {
    var X = {};
    return F.forEach(function(Y, re) {
      X[Y] = !0;
    }), X;
  }
  function w(F, X, Y) {
    if (F.customInspect && X && O(X.inspect) && X.inspect !== e.inspect && !(X.constructor && X.constructor.prototype === X)) {
      var re = X.inspect(Y, F);
      return A(re) || (re = w(F, re, Y)), re;
    }
    var pe = v(F, X);
    if (pe) return pe;
    var C = Object.keys(X), p = d(C);
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
    if (Y < 0)
      return M(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(X);
    var L;
    return ne ? L = m(F, X, Y, p, C) : L = C.map(function(h) {
      return f(F, X, Y, p, h, ne);
    }), F.seen.pop(), y(L, U, D);
  }
  function v(F, X) {
    if (P(X)) return F.stylize("undefined", "undefined");
    if (A(X)) {
      var Y = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(Y, "string");
    }
    if (S(X)) return F.stylize("" + X, "number");
    if (k(X)) return F.stylize("" + X, "boolean");
    if (x(X)) return F.stylize("null", "null");
  }
  function E(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function m(F, X, Y, re, pe) {
    for (var C = [], p = 0, W = X.length; p < W; ++p) le(X, String(p)) ? C.push(f(F, X, Y, re, String(p), !0)) : C.push("");
    return pe.forEach(function(U) {
      U.match(/^\d+$/) || C.push(f(F, X, Y, re, U, !0));
    }), C;
  }
  function f(F, X, Y, re, pe, C) {
    var p, W, U = Object.getOwnPropertyDescriptor(X, pe) || { value: X[pe] };
    if (U.get ? U.set ? W = F.stylize("[Getter/Setter]", "special") : W = F.stylize("[Getter]", "special") : U.set && (W = F.stylize("[Setter]", "special")), le(re, pe) || (p = "[" + pe + "]"), W || (F.seen.indexOf(U.value) < 0 ? (x(Y) ? W = w(F, U.value, null) : W = w(F, U.value, Y - 1), W.indexOf(`
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
  function y(F, X, Y) {
    return F.reduce(function(re, pe) {
      return pe.indexOf(`
`) >= 0, re + pe.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? Y[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + Y[1] : Y[0] + X + " " + F.join(", ") + " " + Y[1];
  }
  e.types = yo();
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
  e.isPrimitive = z, e.isBuffer = bo();
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
      var C = this, p = function() {
        return pe.apply(C, arguments);
      };
      F.apply(this, Y).then(function(W) {
        ge.nextTick(p.bind(null, null, W));
      }, function(W) {
        ge.nextTick(te.bind(null, W, p));
      });
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, t(F)), X;
  }
  e.callbackify = V;
})), _o = /* @__PURE__ */ he(((e, t) => {
  function r(f, y) {
    var _ = Object.keys(f);
    if (Object.getOwnPropertySymbols) {
      var k = Object.getOwnPropertySymbols(f);
      y && (k = k.filter(function(x) {
        return Object.getOwnPropertyDescriptor(f, x).enumerable;
      })), _.push.apply(_, k);
    }
    return _;
  }
  function n(f) {
    for (var y = 1; y < arguments.length; y++) {
      var _ = arguments[y] != null ? arguments[y] : {};
      y % 2 ? r(Object(_), !0).forEach(function(k) {
        s(f, k, _[k]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(f, Object.getOwnPropertyDescriptors(_)) : r(Object(_)).forEach(function(k) {
        Object.defineProperty(f, k, Object.getOwnPropertyDescriptor(_, k));
      });
    }
    return f;
  }
  function s(f, y, _) {
    return y = c(y), y in f ? Object.defineProperty(f, y, {
      value: _,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : f[y] = _, f;
  }
  function i(f, y) {
    if (!(f instanceof y)) throw new TypeError("Cannot call a class as a function");
  }
  function u(f, y) {
    for (var _ = 0; _ < y.length; _++) {
      var k = y[_];
      k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(f, c(k.key), k);
    }
  }
  function a(f, y, _) {
    return y && u(f.prototype, y), Object.defineProperty(f, "prototype", { writable: !1 }), f;
  }
  function c(f) {
    var y = d(f, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function d(f, y) {
    if (typeof f != "object" || f === null) return f;
    var _ = f[Symbol.toPrimitive];
    if (_ !== void 0) {
      var k = _.call(f, y);
      if (typeof k != "object") return k;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(f);
  }
  var w = _r().Buffer, v = Li().inspect, E = v && v.custom || "inspect";
  function m(f, y, _) {
    w.prototype.copy.call(f, y, _);
  }
  t.exports = /* @__PURE__ */ (function() {
    function f() {
      i(this, f), this.head = null, this.tail = null, this.length = 0;
    }
    return a(f, [
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
    ]), f;
  })();
})), Bi = /* @__PURE__ */ he(((e, t) => {
  ut();
  function r(c, d) {
    var w = this, v = this._readableState && this._readableState.destroyed, E = this._writableState && this._writableState.destroyed;
    return v || E ? (d ? d(c) : c && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ge.nextTick(u, this, c)) : ge.nextTick(u, this, c)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(c || null, function(m) {
      !d && m ? w._writableState ? w._writableState.errorEmitted ? ge.nextTick(s, w) : (w._writableState.errorEmitted = !0, ge.nextTick(n, w, m)) : ge.nextTick(n, w, m) : d ? (ge.nextTick(s, w), d(m)) : ge.nextTick(s, w);
    }), this);
  }
  function n(c, d) {
    u(c, d), s(c);
  }
  function s(c) {
    c._writableState && !c._writableState.emitClose || c._readableState && !c._readableState.emitClose || c.emit("close");
  }
  function i() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function u(c, d) {
    c.emit("error", d);
  }
  function a(c, d) {
    var w = c._readableState, v = c._writableState;
    w && w.autoDestroy || v && v.autoDestroy ? c.destroy(d) : c.emit("error", d);
  }
  t.exports = {
    destroy: r,
    undestroy: i,
    errorOrDestroy: a
  };
})), Ct = /* @__PURE__ */ he(((e, t) => {
  function r(d, w) {
    d.prototype = Object.create(w.prototype), d.prototype.constructor = d, d.__proto__ = w;
  }
  var n = {};
  function s(d, w, v) {
    v || (v = Error);
    function E(f, y, _) {
      return typeof w == "string" ? w : w(f, y, _);
    }
    var m = /* @__PURE__ */ (function(f) {
      r(y, f);
      function y(_, k, x) {
        return f.call(this, E(_, k, x)) || this;
      }
      return y;
    })(v);
    m.prototype.name = v.name, m.prototype.code = d, n[d] = m;
  }
  function i(d, w) {
    if (Array.isArray(d)) {
      var v = d.length;
      return d = d.map(function(E) {
        return String(E);
      }), v > 2 ? "one of ".concat(w, " ").concat(d.slice(0, v - 1).join(", "), ", or ") + d[v - 1] : v === 2 ? "one of ".concat(w, " ").concat(d[0], " or ").concat(d[1]) : "of ".concat(w, " ").concat(d[0]);
    } else return "of ".concat(w, " ").concat(String(d));
  }
  function u(d, w, v) {
    return d.substr(0, w.length) === w;
  }
  function a(d, w, v) {
    return (v === void 0 || v > d.length) && (v = d.length), d.substring(v - w.length, v) === w;
  }
  function c(d, w, v) {
    return typeof v != "number" && (v = 0), v + w.length > d.length ? !1 : d.indexOf(w, v) !== -1;
  }
  s("ERR_INVALID_OPT_VALUE", function(d, w) {
    return 'The value "' + w + '" is invalid for option "' + d + '"';
  }, TypeError), s("ERR_INVALID_ARG_TYPE", function(d, w, v) {
    var E;
    typeof w == "string" && u(w, "not ") ? (E = "must not be", w = w.replace(/^not /, "")) : E = "must be";
    var m;
    if (a(d, " argument")) m = "The ".concat(d, " ").concat(E, " ").concat(i(w, "type"));
    else {
      var f = c(d, ".") ? "property" : "argument";
      m = 'The "'.concat(d, '" ').concat(f, " ").concat(E, " ").concat(i(w, "type"));
    }
    return m += ". Received type ".concat(typeof v), m;
  }, TypeError), s("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), s("ERR_METHOD_NOT_IMPLEMENTED", function(d) {
    return "The " + d + " method is not implemented";
  }), s("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), s("ERR_STREAM_DESTROYED", function(d) {
    return "Cannot call " + d + " after a stream was destroyed";
  }), s("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), s("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), s("ERR_STREAM_WRITE_AFTER_END", "write after end"), s("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), s("ERR_UNKNOWN_ENCODING", function(d) {
    return "Unknown encoding: " + d;
  }, TypeError), s("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
})), Mi = /* @__PURE__ */ he(((e, t) => {
  var r = Ct().codes.ERR_INVALID_OPT_VALUE;
  function n(i, u, a) {
    return i.highWaterMark != null ? i.highWaterMark : u ? i[a] : null;
  }
  function s(i, u, a, c) {
    var d = n(u, c, a);
    if (d != null) {
      if (!(isFinite(d) && Math.floor(d) === d) || d < 0) throw new r(c ? a : "highWaterMark", d);
      return Math.floor(d);
    }
    return i.objectMode ? 16 : 16384;
  }
  t.exports = { getHighWaterMark: s };
})), xo = /* @__PURE__ */ he(((e, t) => {
  kt(), t.exports = r;
  function r(s, i) {
    if (n("noDeprecation")) return s;
    var u = !1;
    function a() {
      if (!u) {
        if (n("throwDeprecation")) throw new Error(i);
        n("traceDeprecation") ? console.trace(i) : console.warn(i), u = !0;
      }
      return s.apply(this, arguments);
    }
    return a;
  }
  function n(s) {
    try {
      if (!Oe.localStorage) return !1;
    } catch {
      return !1;
    }
    var i = Oe.localStorage[s];
    return i == null ? !1 : String(i).toLowerCase() === "true";
  }
})), Ui = /* @__PURE__ */ he(((e, t) => {
  kt(), ut(), t.exports = R;
  function r(C) {
    var p = this;
    this.next = null, this.entry = null, this.finish = function() {
      pe(p, C);
    };
  }
  var n;
  R.WritableState = P;
  var s = { deprecate: xo() }, i = Si(), u = _r().Buffer, a = (typeof Oe < "u" ? Oe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c(C) {
    return u.from(C);
  }
  function d(C) {
    return u.isBuffer(C) || C instanceof a;
  }
  var w = Bi(), v = Mi().getHighWaterMark, E = Ct().codes, m = E.ERR_INVALID_ARG_TYPE, f = E.ERR_METHOD_NOT_IMPLEMENTED, y = E.ERR_MULTIPLE_CALLBACK, _ = E.ERR_STREAM_CANNOT_PIPE, k = E.ERR_STREAM_DESTROYED, x = E.ERR_STREAM_NULL_VALUES, T = E.ERR_STREAM_WRITE_AFTER_END, S = E.ERR_UNKNOWN_ENCODING, A = w.errorOrDestroy;
  lt()(R, i);
  function b() {
  }
  function P(C, p, W) {
    n = n || Tt(), C = C || {}, typeof W != "boolean" && (W = p instanceof n), this.objectMode = !!C.objectMode, W && (this.objectMode = this.objectMode || !!C.writableObjectMode), this.highWaterMark = v(this, C, "writableHighWaterMark", W), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
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
      Object.defineProperty(P.prototype, "buffer", { get: s.deprecate(function() {
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
    n = n || Tt();
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
    var U = this._writableState, ne = !1, D = !U.objectMode && d(C);
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
    var h = p.objectMode ? 1 : U.length;
    p.length += h;
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
    } else I(C, p, !1, h, U, ne, D);
    return G;
  }
  function I(C, p, W, U, ne, D, L) {
    p.writelen = U, p.writecb = L, p.writing = !0, p.sync = !0, p.destroyed ? p.onwrite(new k("write")) : W ? C._writev(ne, p.onwrite) : C._write(ne, D, p.onwrite), p.sync = !1;
  }
  function H(C, p, W, U, ne) {
    --p.pendingcb, W ? (ge.nextTick(ne, U), ge.nextTick(Y, C, p), C._writableState.errorEmitted = !0, A(C, U)) : (ne(U), C._writableState.errorEmitted = !0, A(C, U), Y(C, p));
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
    W || Z(C, p), p.pendingcb--, U(), Y(C, p);
  }
  function Z(C, p) {
    p.length === 0 && p.needDrain && (p.needDrain = !1, C.emit("drain"));
  }
  function te(C, p) {
    p.bufferProcessing = !0;
    var W = p.bufferedRequest;
    if (C._writev && W && W.next) {
      var U = p.bufferedRequestCount, ne = new Array(U), D = p.corkedRequestsFree;
      D.entry = W;
      for (var L = 0, h = !0; W; )
        ne[L] = W, W.isBuf || (h = !1), W = W.next, L += 1;
      ne.allBuffers = h, I(C, p, !0, p.length, ne, "", D.finish), p.pendingcb++, p.lastBufferedRequest = null, D.next ? (p.corkedRequestsFree = D.next, D.next = null) : p.corkedRequestsFree = new r(p), p.bufferedRequestCount = 0;
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
    W(new f("_write()"));
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
      p.pendingcb--, W && A(C, W), p.prefinished = !0, C.emit("prefinish"), Y(C, p);
    });
  }
  function X(C, p) {
    !p.prefinished && !p.finalCalled && (typeof C._final == "function" && !p.destroyed ? (p.pendingcb++, p.finalCalled = !0, ge.nextTick(F, C, p)) : (p.prefinished = !0, C.emit("prefinish")));
  }
  function Y(C, p) {
    var W = V(p);
    if (W && (X(C, p), p.pendingcb === 0 && (p.finished = !0, C.emit("finish"), p.autoDestroy))) {
      var U = C._readableState;
      (!U || U.autoDestroy && U.endEmitted) && C.destroy();
    }
    return W;
  }
  function re(C, p, W) {
    p.ending = !0, Y(C, p), W && (p.finished ? ge.nextTick(W) : C.once("finish", W)), p.ended = !0, C.writable = !1;
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
})), Tt = /* @__PURE__ */ he(((e, t) => {
  ut();
  var r = Object.keys || function(v) {
    var E = [];
    for (var m in v) E.push(m);
    return E;
  };
  t.exports = c;
  var n = Wi(), s = Ui();
  lt()(c, n);
  for (var i = r(s.prototype), u = 0; u < i.length; u++) {
    var a = i[u];
    c.prototype[a] || (c.prototype[a] = s.prototype[a]);
  }
  function c(v) {
    if (!(this instanceof c)) return new c(v);
    n.call(this, v), s.call(this, v), this.allowHalfOpen = !0, v && (v.readable === !1 && (this.readable = !1), v.writable === !1 && (this.writable = !1), v.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", d)));
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
  function d() {
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
})), Eo = /* @__PURE__ */ he(((e, t) => {
  var r = _r(), n = r.Buffer;
  function s(u, a) {
    for (var c in u) a[c] = u[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (s(r, e), e.Buffer = i);
  function i(u, a, c) {
    return n(u, a, c);
  }
  s(n, i), i.from = function(u, a, c) {
    if (typeof u == "number") throw new TypeError("Argument must not be a number");
    return n(u, a, c);
  }, i.alloc = function(u, a, c) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    var d = n(u);
    return a !== void 0 ? typeof c == "string" ? d.fill(a, c) : d.fill(a) : d.fill(0), d;
  }, i.allocUnsafe = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return n(u);
  }, i.allocUnsafeSlow = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(u);
  };
})), tn = /* @__PURE__ */ he(((e) => {
  var t = Eo().Buffer, r = t.isEncoding || function(x) {
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
  function s(x) {
    var T = n(x);
    if (typeof T != "string" && (t.isEncoding === r || !r(x))) throw new Error("Unknown encoding: " + x);
    return T || x;
  }
  e.StringDecoder = i;
  function i(x) {
    this.encoding = s(x);
    var T;
    switch (this.encoding) {
      case "utf16le":
        this.text = E, this.end = m, T = 4;
        break;
      case "utf8":
        this.fillLast = d, T = 4;
        break;
      case "base64":
        this.text = f, this.end = y, T = 3;
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
  function a(x, T, S) {
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
  function d(x) {
    var T = this.lastTotal - this.lastNeed, S = c(this, x);
    if (S !== void 0) return S;
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, T, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, T, 0, x.length), this.lastNeed -= x.length;
  }
  function w(x, T) {
    var S = a(this, x, T);
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
  function f(x, T) {
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
})), wn = /* @__PURE__ */ he(((e, t) => {
  var r = Ct().codes.ERR_STREAM_PREMATURE_CLOSE;
  function n(a) {
    var c = !1;
    return function() {
      if (!c) {
        c = !0;
        for (var d = arguments.length, w = new Array(d), v = 0; v < d; v++) w[v] = arguments[v];
        a.apply(this, w);
      }
    };
  }
  function s() {
  }
  function i(a) {
    return a.setHeader && typeof a.abort == "function";
  }
  function u(a, c, d) {
    if (typeof c == "function") return u(a, null, c);
    c || (c = {}), d = n(d || s);
    var w = c.readable || c.readable !== !1 && a.readable, v = c.writable || c.writable !== !1 && a.writable, E = function() {
      a.writable || f();
    }, m = a._writableState && a._writableState.finished, f = function() {
      v = !1, m = !0, w || d.call(a);
    }, y = a._readableState && a._readableState.endEmitted, _ = function() {
      w = !1, y = !0, v || d.call(a);
    }, k = function(A) {
      d.call(a, A);
    }, x = function() {
      var A;
      if (w && !y)
        return (!a._readableState || !a._readableState.ended) && (A = new r()), d.call(a, A);
      if (v && !m)
        return (!a._writableState || !a._writableState.ended) && (A = new r()), d.call(a, A);
    }, T = function() {
      a.req.on("finish", f);
    };
    return i(a) ? (a.on("complete", f), a.on("abort", x), a.req ? T() : a.on("request", T)) : v && !a._writableState && (a.on("end", E), a.on("close", E)), a.on("end", _), a.on("finish", f), c.error !== !1 && a.on("error", k), a.on("close", x), function() {
      a.removeListener("complete", f), a.removeListener("abort", x), a.removeListener("request", T), a.req && a.req.removeListener("finish", f), a.removeListener("end", E), a.removeListener("close", E), a.removeListener("finish", f), a.removeListener("end", _), a.removeListener("error", k), a.removeListener("close", x);
    };
  }
  t.exports = u;
})), To = /* @__PURE__ */ he(((e, t) => {
  ut();
  var r;
  function n(S, A, b) {
    return A = s(A), A in S ? Object.defineProperty(S, A, {
      value: b,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : S[A] = b, S;
  }
  function s(S) {
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
  var u = wn(), a = /* @__PURE__ */ Symbol("lastResolve"), c = /* @__PURE__ */ Symbol("lastReject"), d = /* @__PURE__ */ Symbol("error"), w = /* @__PURE__ */ Symbol("ended"), v = /* @__PURE__ */ Symbol("lastPromise"), E = /* @__PURE__ */ Symbol("handlePromise"), m = /* @__PURE__ */ Symbol("stream");
  function f(S, A) {
    return {
      value: S,
      done: A
    };
  }
  function y(S) {
    var A = S[a];
    if (A !== null) {
      var b = S[m].read();
      b !== null && (S[v] = null, S[a] = null, S[c] = null, A(f(b, !1)));
    }
  }
  function _(S) {
    ge.nextTick(y, S);
  }
  function k(S, A) {
    return function(b, P) {
      S.then(function() {
        if (A[w]) {
          b(f(void 0, !0));
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
      var A = this, b = this[d];
      if (b !== null) return Promise.reject(b);
      if (this[w]) return Promise.resolve(f(void 0, !0));
      if (this[m].destroyed) return new Promise(function(K, ee) {
        ge.nextTick(function() {
          A[d] ? ee(A[d]) : K(f(void 0, !0));
        });
      });
      var P = this[v], M;
      if (P) M = new Promise(k(P, this));
      else {
        var R = this[m].read();
        if (R !== null) return Promise.resolve(f(R, !1));
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
        b(f(void 0, !0));
      });
    });
  }), r), x);
  t.exports = function(A) {
    var b, P = Object.create(T, (b = {}, n(b, m, {
      value: A,
      writable: !0
    }), n(b, a, {
      value: null,
      writable: !0
    }), n(b, c, {
      value: null,
      writable: !0
    }), n(b, d, {
      value: null,
      writable: !0
    }), n(b, w, {
      value: A._readableState.endEmitted,
      writable: !0
    }), n(b, E, {
      value: function(R, K) {
        var ee = P[m].read();
        ee ? (P[v] = null, P[a] = null, P[c] = null, R(f(ee, !1))) : (P[a] = R, P[c] = K);
      },
      writable: !0
    }), b));
    return P[v] = null, u(A, function(M) {
      if (M && M.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var R = P[c];
        R !== null && (P[v] = null, P[a] = null, P[c] = null, R(M)), P[d] = M;
        return;
      }
      var K = P[a];
      K !== null && (P[v] = null, P[a] = null, P[c] = null, K(f(void 0, !0))), P[w] = !0;
    }), A.on("readable", _.bind(null, P)), P;
  };
})), So = /* @__PURE__ */ he(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), Wi = /* @__PURE__ */ he(((e, t) => {
  kt(), ut(), t.exports = K;
  var r;
  K.ReadableState = R, fn().EventEmitter;
  var n = function(L, h) {
    return L.listeners(h).length;
  }, s = Si(), i = _r().Buffer, u = (typeof Oe < "u" ? Oe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(D) {
    return i.from(D);
  }
  function c(D) {
    return i.isBuffer(D) || D instanceof u;
  }
  var d = Li(), w;
  d && d.debuglog ? w = d.debuglog("stream") : w = function() {
  };
  var v = _o(), E = Bi(), m = Mi().getHighWaterMark, f = Ct().codes, y = f.ERR_INVALID_ARG_TYPE, _ = f.ERR_STREAM_PUSH_AFTER_EOF, k = f.ERR_METHOD_NOT_IMPLEMENTED, x = f.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, T, S, A;
  lt()(K, s);
  var b = E.errorOrDestroy, P = [
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
  function R(D, L, h) {
    r = r || Tt(), D = D || {}, typeof h != "boolean" && (h = L instanceof r), this.objectMode = !!D.objectMode, h && (this.objectMode = this.objectMode || !!D.readableObjectMode), this.highWaterMark = m(this, D, "readableHighWaterMark", h), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = D.emitClose !== !1, this.autoDestroy = !!D.autoDestroy, this.destroyed = !1, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, D.encoding && (T || (T = tn().StringDecoder), this.decoder = new T(D.encoding), this.encoding = D.encoding);
  }
  function K(D) {
    if (r = r || Tt(), !(this instanceof K)) return new K(D);
    var L = this instanceof r;
    this._readableState = new R(D, this, L), this.readable = !0, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), s.call(this);
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
    var h = this._readableState, G;
    return h.objectMode ? G = !0 : typeof D == "string" && (L = L || h.defaultEncoding, L !== h.encoding && (D = i.from(D, L), L = ""), G = !0), ee(this, D, L, !1, G);
  }, K.prototype.unshift = function(D) {
    return ee(this, D, null, !0, !1);
  };
  function ee(D, L, h, G, N) {
    w("readableAddChunk", L);
    var o = D._readableState;
    if (L === null)
      o.reading = !1, q(D, o);
    else {
      var l;
      if (N || (l = z(o, L)), l) b(D, l);
      else if (o.objectMode || L && L.length > 0)
        if (typeof L != "string" && !o.objectMode && Object.getPrototypeOf(L) !== i.prototype && (L = a(L)), G)
          o.endEmitted ? b(D, new x()) : O(D, o, L, !0);
        else if (o.ended) b(D, new _());
        else {
          if (o.destroyed) return !1;
          o.reading = !1, o.decoder && !h ? (L = o.decoder.write(L), o.objectMode || L.length !== 0 ? O(D, o, L, !1) : te(D, o)) : O(D, o, L, !1);
        }
      else G || (o.reading = !1, te(D, o));
    }
    return !o.ended && (o.length < o.highWaterMark || o.length === 0);
  }
  function O(D, L, h, G) {
    L.flowing && L.length === 0 && !L.sync ? (L.awaitDrain = 0, D.emit("data", h)) : (L.length += L.objectMode ? 1 : h.length, G ? L.buffer.unshift(h) : L.buffer.push(h), L.needReadable && le(D)), te(D, L);
  }
  function z(D, L) {
    var h;
    return !c(L) && typeof L != "string" && L !== void 0 && !D.objectMode && (h = new y("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], L)), h;
  }
  K.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, K.prototype.setEncoding = function(D) {
    T || (T = tn().StringDecoder);
    var L = new T(D);
    this._readableState.decoder = L, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var h = this._readableState.buffer.head, G = ""; h !== null; )
      G += L.write(h.data), h = h.next;
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
    var L = this._readableState, h = D;
    if (D !== 0 && (L.emittedReadable = !1), D === 0 && L.needReadable && ((L.highWaterMark !== 0 ? L.length >= L.highWaterMark : L.length > 0) || L.ended))
      return w("read: emitReadable", L.length, L.ended), L.length === 0 && L.ended ? W(this) : le(this), null;
    if (D = Q(D, L), D === 0 && L.ended)
      return L.length === 0 && W(this), null;
    var G = L.needReadable;
    w("need readable", G), (L.length === 0 || L.length - D < L.highWaterMark) && (G = !0, w("length less than watermark", G)), L.ended || L.reading ? (G = !1, w("reading or ended", G)) : G && (w("do read"), L.reading = !0, L.sync = !0, L.length === 0 && (L.needReadable = !0), this._read(L.highWaterMark), L.sync = !1, L.reading || (D = Q(h, L)));
    var N;
    return D > 0 ? N = p(D, L) : N = null, N === null ? (L.needReadable = L.length <= L.highWaterMark, D = 0) : (L.length -= D, L.awaitDrain = 0), L.length === 0 && (L.ended || (L.needReadable = !0), h !== D && L.ended && W(this)), N !== null && this.emit("data", N), N;
  };
  function q(D, L) {
    if (w("onEofChunk"), !L.ended) {
      if (L.decoder) {
        var h = L.decoder.end();
        h && h.length && (L.buffer.push(h), L.length += L.objectMode ? 1 : h.length);
      }
      L.ended = !0, L.sync ? le(D) : (L.needReadable = !1, L.emittedReadable || (L.emittedReadable = !0, Z(D)));
    }
  }
  function le(D) {
    var L = D._readableState;
    w("emitReadable", L.needReadable, L.emittedReadable), L.needReadable = !1, L.emittedReadable || (w("emitReadable", L.flowing), L.emittedReadable = !0, ge.nextTick(Z, D));
  }
  function Z(D) {
    var L = D._readableState;
    w("emitReadable_", L.destroyed, L.length, L.ended), !L.destroyed && (L.length || L.ended) && (D.emit("readable"), L.emittedReadable = !1), L.needReadable = !L.flowing && !L.ended && L.length <= L.highWaterMark, C(D);
  }
  function te(D, L) {
    L.readingMore || (L.readingMore = !0, ge.nextTick(V, D, L));
  }
  function V(D, L) {
    for (; !L.reading && !L.ended && (L.length < L.highWaterMark || L.flowing && L.length === 0); ) {
      var h = L.length;
      if (w("maybeReadMore read 0"), D.read(0), h === L.length) break;
    }
    L.readingMore = !1;
  }
  K.prototype._read = function(D) {
    b(this, new k("_read()"));
  }, K.prototype.pipe = function(D, L) {
    var h = this, G = this._readableState;
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
    G.endEmitted ? ge.nextTick(N) : h.once("end", N), D.on("unpipe", o);
    function o(me, we) {
      w("onunpipe"), me === h && we && we.hasUnpiped === !1 && (we.hasUnpiped = !0, $());
    }
    function l() {
      w("onend"), D.end();
    }
    var g = F(h);
    D.on("drain", g);
    var B = !1;
    function $() {
      w("cleanup"), D.removeListener("close", ue), D.removeListener("finish", oe), D.removeListener("drain", g), D.removeListener("error", ie), D.removeListener("unpipe", o), h.removeListener("end", l), h.removeListener("end", de), h.removeListener("data", j), B = !0, G.awaitDrain && (!D._writableState || D._writableState.needDrain) && g();
    }
    h.on("data", j);
    function j(me) {
      w("ondata");
      var we = D.write(me);
      w("dest.write", we), we === !1 && ((G.pipesCount === 1 && G.pipes === D || G.pipesCount > 1 && ne(G.pipes, D) !== -1) && !B && (w("false write response, pause", G.awaitDrain), G.awaitDrain++), h.pause());
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
      w("unpipe"), h.unpipe(D);
    }
    return D.emit("pipe", h), G.flowing || (w("pipe resume"), h.resume()), D;
  };
  function F(D) {
    return function() {
      var h = D._readableState;
      w("pipeOnDrain", h.awaitDrain), h.awaitDrain && h.awaitDrain--, h.awaitDrain === 0 && n(D, "data") && (h.flowing = !0, C(D));
    };
  }
  K.prototype.unpipe = function(D) {
    var L = this._readableState, h = { hasUnpiped: !1 };
    if (L.pipesCount === 0) return this;
    if (L.pipesCount === 1)
      return D && D !== L.pipes ? this : (D || (D = L.pipes), L.pipes = null, L.pipesCount = 0, L.flowing = !1, D && D.emit("unpipe", this, h), this);
    if (!D) {
      var G = L.pipes, N = L.pipesCount;
      L.pipes = null, L.pipesCount = 0, L.flowing = !1;
      for (var o = 0; o < N; o++) G[o].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var l = ne(L.pipes, D);
    return l === -1 ? this : (L.pipes.splice(l, 1), L.pipesCount -= 1, L.pipesCount === 1 && (L.pipes = L.pipes[0]), D.emit("unpipe", this, h), this);
  }, K.prototype.on = function(D, L) {
    var h = s.prototype.on.call(this, D, L), G = this._readableState;
    return D === "data" ? (G.readableListening = this.listenerCount("readable") > 0, G.flowing !== !1 && this.resume()) : D === "readable" && !G.endEmitted && !G.readableListening && (G.readableListening = G.needReadable = !0, G.flowing = !1, G.emittedReadable = !1, w("on readable", G.length, G.reading), G.length ? le(this) : G.reading || ge.nextTick(Y, this)), h;
  }, K.prototype.addListener = K.prototype.on, K.prototype.removeListener = function(D, L) {
    var h = s.prototype.removeListener.call(this, D, L);
    return D === "readable" && ge.nextTick(X, this), h;
  }, K.prototype.removeAllListeners = function(D) {
    var L = s.prototype.removeAllListeners.apply(this, arguments);
    return (D === "readable" || D === void 0) && ge.nextTick(X, this), L;
  };
  function X(D) {
    var L = D._readableState;
    L.readableListening = D.listenerCount("readable") > 0, L.resumeScheduled && !L.paused ? L.flowing = !0 : D.listenerCount("data") > 0 && D.resume();
  }
  function Y(D) {
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
    var L = this, h = this._readableState, G = !1;
    D.on("end", function() {
      if (w("wrapped end"), h.decoder && !h.ended) {
        var l = h.decoder.end();
        l && l.length && L.push(l);
      }
      L.push(null);
    }), D.on("data", function(l) {
      w("wrapped data"), h.decoder && (l = h.decoder.write(l)), !(h.objectMode && l == null) && (!h.objectMode && (!l || !l.length) || L.push(l) || (G = !0, D.pause()));
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
    return S === void 0 && (S = To()), S(this);
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
    var h;
    return L.objectMode ? h = L.buffer.shift() : !D || D >= L.length ? (L.decoder ? h = L.buffer.join("") : L.buffer.length === 1 ? h = L.buffer.first() : h = L.buffer.concat(L.length), L.buffer.clear()) : h = L.buffer.consume(D, L.decoder), h;
  }
  function W(D) {
    var L = D._readableState;
    w("endReadable", L.endEmitted), L.endEmitted || (L.ended = !0, ge.nextTick(U, L, D));
  }
  function U(D, L) {
    if (w("endReadableNT", D.endEmitted, D.length), !D.endEmitted && D.length === 0 && (D.endEmitted = !0, L.readable = !1, L.emit("end"), D.autoDestroy)) {
      var h = L._writableState;
      (!h || h.autoDestroy && h.finished) && L.destroy();
    }
  }
  typeof Symbol == "function" && (K.from = function(D, L) {
    return A === void 0 && (A = So()), A(K, D, L);
  });
  function ne(D, L) {
    for (var h = 0, G = D.length; h < G; h++) if (D[h] === L) return h;
    return -1;
  }
})), ji = /* @__PURE__ */ he(((e, t) => {
  t.exports = d;
  var r = Ct().codes, n = r.ERR_METHOD_NOT_IMPLEMENTED, s = r.ERR_MULTIPLE_CALLBACK, i = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = r.ERR_TRANSFORM_WITH_LENGTH_0, a = Tt();
  lt()(d, a);
  function c(E, m) {
    var f = this._transformState;
    f.transforming = !1;
    var y = f.writecb;
    if (y === null) return this.emit("error", new s());
    f.writechunk = null, f.writecb = null, m != null && this.push(m), y(E);
    var _ = this._readableState;
    _.reading = !1, (_.needReadable || _.length < _.highWaterMark) && this._read(_.highWaterMark);
  }
  function d(E) {
    if (!(this instanceof d)) return new d(E);
    a.call(this, E), this._transformState = {
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
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(m, f) {
      v(E, m, f);
    }) : v(this, null, null);
  }
  d.prototype.push = function(E, m) {
    return this._transformState.needTransform = !1, a.prototype.push.call(this, E, m);
  }, d.prototype._transform = function(E, m, f) {
    f(new n("_transform()"));
  }, d.prototype._write = function(E, m, f) {
    var y = this._transformState;
    if (y.writecb = f, y.writechunk = E, y.writeencoding = m, !y.transforming) {
      var _ = this._readableState;
      (y.needTransform || _.needReadable || _.length < _.highWaterMark) && this._read(_.highWaterMark);
    }
  }, d.prototype._read = function(E) {
    var m = this._transformState;
    m.writechunk !== null && !m.transforming ? (m.transforming = !0, this._transform(m.writechunk, m.writeencoding, m.afterTransform)) : m.needTransform = !0;
  }, d.prototype._destroy = function(E, m) {
    a.prototype._destroy.call(this, E, function(f) {
      m(f);
    });
  };
  function v(E, m, f) {
    if (m) return E.emit("error", m);
    if (f != null && E.push(f), E._writableState.length) throw new u();
    if (E._transformState.transforming) throw new i();
    return E.push(null);
  }
})), Ao = /* @__PURE__ */ he(((e, t) => {
  t.exports = n;
  var r = ji();
  lt()(n, r);
  function n(s) {
    if (!(this instanceof n)) return new n(s);
    r.call(this, s);
  }
  n.prototype._transform = function(s, i, u) {
    u(null, s);
  };
})), ko = /* @__PURE__ */ he(((e, t) => {
  var r;
  function n(f) {
    var y = !1;
    return function() {
      y || (y = !0, f.apply(void 0, arguments));
    };
  }
  var s = Ct().codes, i = s.ERR_MISSING_ARGS, u = s.ERR_STREAM_DESTROYED;
  function a(f) {
    if (f) throw f;
  }
  function c(f) {
    return f.setHeader && typeof f.abort == "function";
  }
  function d(f, y, _, k) {
    k = n(k);
    var x = !1;
    f.on("close", function() {
      x = !0;
    }), r === void 0 && (r = wn()), r(f, {
      readable: y,
      writable: _
    }, function(S) {
      if (S) return k(S);
      x = !0, k();
    });
    var T = !1;
    return function(S) {
      if (!x && !T) {
        if (T = !0, c(f)) return f.abort();
        if (typeof f.destroy == "function") return f.destroy();
        k(S || new u("pipe"));
      }
    };
  }
  function w(f) {
    f();
  }
  function v(f, y) {
    return f.pipe(y);
  }
  function E(f) {
    return !f.length || typeof f[f.length - 1] != "function" ? a : f.pop();
  }
  function m() {
    for (var f = arguments.length, y = new Array(f), _ = 0; _ < f; _++) y[_] = arguments[_];
    var k = E(y);
    if (Array.isArray(y[0]) && (y = y[0]), y.length < 2) throw new i("streams");
    var x, T = y.map(function(S, A) {
      var b = A < y.length - 1;
      return d(S, b, A > 0, function(P) {
        x || (x = P), P && T.forEach(w), !b && (T.forEach(w), k(x));
      });
    });
    return y.reduce(v);
  }
  t.exports = m;
})), gn = /* @__PURE__ */ he(((e, t) => {
  t.exports = n;
  var r = fn().EventEmitter;
  lt()(n, r), n.Readable = Wi(), n.Writable = Ui(), n.Duplex = Tt(), n.Transform = ji(), n.PassThrough = Ao(), n.finished = wn(), n.pipeline = ko(), n.Stream = n;
  function n() {
    r.call(this);
  }
  n.prototype.pipe = function(s, i) {
    var u = this;
    function a(f) {
      s.writable && s.write(f) === !1 && u.pause && u.pause();
    }
    u.on("data", a);
    function c() {
      u.readable && u.resume && u.resume();
    }
    s.on("drain", c), !s._isStdio && (!i || i.end !== !1) && (u.on("end", w), u.on("close", v));
    var d = !1;
    function w() {
      d || (d = !0, s.end());
    }
    function v() {
      d || (d = !0, typeof s.destroy == "function" && s.destroy());
    }
    function E(f) {
      if (m(), r.listenerCount(this, "error") === 0) throw f;
    }
    u.on("error", E), s.on("error", E);
    function m() {
      u.removeListener("data", a), s.removeListener("drain", c), u.removeListener("end", w), u.removeListener("close", v), u.removeListener("error", E), s.removeListener("error", E), u.removeListener("end", m), u.removeListener("close", m), s.removeListener("close", m);
    }
    return u.on("end", m), u.on("close", m), s.on("close", m), s.emit("pipe", u), s;
  };
})), Co = /* @__PURE__ */ he(((e) => {
  (function(t) {
    t.parser = function(C, p) {
      return new n(C, p);
    }, t.SAXParser = n, t.SAXStream = w, t.createStream = d, t.MAX_BUFFER_LENGTH = 65536;
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
    function s(C) {
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
    var a;
    try {
      a = gn().Stream;
    } catch {
      a = function() {
      };
    }
    var c = t.EVENTS.filter(function(C) {
      return C !== "error" && C !== "end";
    });
    function d(C, p) {
      return new w(C, p);
    }
    function w(C, p) {
      if (!(this instanceof w)) return new w(C, p);
      a.apply(this), this._parser = new n(C, p), this.writable = !0, this.readable = !0;
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
    w.prototype = Object.create(a.prototype, { constructor: { value: w } }), w.prototype.write = function(C) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(C)) {
        if (!this._decoder) {
          var p = tn().StringDecoder;
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
      }), a.prototype.on.call(W, C, p);
    };
    var v = "[CDATA[", E = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", f = "http://www.w3.org/2000/xmlns/", y = {
      xml: m,
      xmlns: f
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
    function Z(C, p) {
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
        var p = Z(C.attribName, !0), W = p.prefix, U = p.local;
        if (W === "xmlns")
          if (U === "xml" && C.attribValue !== m) q(C, "xml: prefix must be bound to " + m + `
Actual: ` + C.attribValue);
          else if (U === "xmlns" && C.attribValue !== f) q(C, "xmlns: prefix must be bound to " + f + `
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
        var W = C.tag, U = Z(C.tagName);
        W.prefix = U.prefix, W.local = U.local, W.uri = W.ns[U.prefix] || "", W.prefix && !W.uri && (q(C, "Unbound namespace prefix: " + JSON.stringify(C.tagName)), W.uri = U.prefix);
        var ne = C.tags[C.tags.length - 1] || C;
        W.ns && ne.ns !== W.ns && Object.keys(W.ns).forEach(function(j) {
          O(C, "onopennamespace", {
            prefix: j,
            uri: W.ns[j]
          });
        });
        for (var D = 0, L = C.attribList.length; D < L; D++) {
          var h = C.attribList[D], G = h[0], N = h[1], o = Z(G, !0), l = o.prefix, g = o.local, B = l === "" ? "" : W.ns[l] || "", $ = {
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
        for (var h in D.ns) L[h] = D.ns[h];
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
    function Y(C, p) {
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
            Y(p, U);
            continue;
          case R.BEGIN_WHITESPACE:
            Y(p, U);
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
            var L, h;
            switch (p.state) {
              case R.TEXT_ENTITY:
                L = R.TEXT, h = "textNode";
                break;
              case R.ATTRIB_VALUE_ENTITY_Q:
                L = R.ATTRIB_VALUE_QUOTED, h = "attribValue";
                break;
              case R.ATTRIB_VALUE_ENTITY_U:
                L = R.ATTRIB_VALUE_UNQUOTED, h = "attribValue";
            }
            U === ";" ? (p[h] += X(p), p.entity = "", p.state = L) : P(p.entity.length ? T : x, U) ? p.entity += U : (q(p, "Invalid character in entity name"), p[h] += "&" + p.entity + U, p.entity = "", p.state = L);
            continue;
          default:
            throw new Error(p, "Unknown state: " + p.state);
        }
      return p.position >= p.bufferCheckPosition && s(p), p;
    }
    String.fromCodePoint || (function() {
      var C = String.fromCharCode, p = Math.floor, W = function() {
        var U = 16384, ne = [], D, L, h = -1, G = arguments.length;
        if (!G) return "";
        for (var N = ""; ++h < G; ) {
          var o = Number(arguments[h]);
          if (!isFinite(o) || o < 0 || o > 1114111 || p(o) !== o) throw RangeError("Invalid code point: " + o);
          o <= 65535 ? ne.push(o) : (o -= 65536, D = (o >> 10) + 55296, L = o % 1024 + 56320, ne.push(D, L)), (h + 1 === G || ne.length > U) && (N += C.apply(null, ne), ne.length = 0);
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
})), yn = /* @__PURE__ */ he(((e, t) => {
  t.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), bn = /* @__PURE__ */ he(((e, t) => {
  var r = yn().isArray;
  t.exports = {
    copyOptions: function(n) {
      var s, i = {};
      for (s in n) n.hasOwnProperty(s) && (i[s] = n[s]);
      return i;
    },
    ensureFlagExists: function(n, s) {
      (!(n in s) || typeof s[n] != "boolean") && (s[n] = !1);
    },
    ensureSpacesExists: function(n) {
      (!("spaces" in n) || typeof n.spaces != "number" && typeof n.spaces != "string") && (n.spaces = 0);
    },
    ensureAlwaysArrayExists: function(n) {
      (!("alwaysArray" in n) || typeof n.alwaysArray != "boolean" && !r(n.alwaysArray)) && (n.alwaysArray = !1);
    },
    ensureKeyExists: function(n, s) {
      (!(n + "Key" in s) || typeof s[n + "Key"] != "string") && (s[n + "Key"] = s.compact ? "_" + n : n);
    },
    checkFnExists: function(n, s) {
      return n + "Fn" in s;
    }
  };
})), zi = /* @__PURE__ */ he(((e, t) => {
  var r = Co(), n = bn(), s = yn().isArray, i, u;
  function a(T) {
    return i = n.copyOptions(T), n.ensureFlagExists("ignoreDeclaration", i), n.ensureFlagExists("ignoreInstruction", i), n.ensureFlagExists("ignoreAttributes", i), n.ensureFlagExists("ignoreText", i), n.ensureFlagExists("ignoreComment", i), n.ensureFlagExists("ignoreCdata", i), n.ensureFlagExists("ignoreDoctype", i), n.ensureFlagExists("compact", i), n.ensureFlagExists("alwaysChildren", i), n.ensureFlagExists("addParent", i), n.ensureFlagExists("trim", i), n.ensureFlagExists("nativeType", i), n.ensureFlagExists("nativeTypeAttributes", i), n.ensureFlagExists("sanitize", i), n.ensureFlagExists("instructionHasAttributes", i), n.ensureFlagExists("captureSpacesBetweenElements", i), n.ensureAlwaysArrayExists(i), n.ensureKeyExists("declaration", i), n.ensureKeyExists("instruction", i), n.ensureKeyExists("attributes", i), n.ensureKeyExists("text", i), n.ensureKeyExists("comment", i), n.ensureKeyExists("cdata", i), n.ensureKeyExists("doctype", i), n.ensureKeyExists("type", i), n.ensureKeyExists("name", i), n.ensureKeyExists("elements", i), n.ensureKeyExists("parent", i), n.checkFnExists("doctype", i), n.checkFnExists("instruction", i), n.checkFnExists("cdata", i), n.checkFnExists("comment", i), n.checkFnExists("text", i), n.checkFnExists("instructionName", i), n.checkFnExists("elementName", i), n.checkFnExists("attributeName", i), n.checkFnExists("attributeValue", i), n.checkFnExists("attributes", i), i;
  }
  function c(T) {
    var S = Number(T);
    if (!isNaN(S)) return S;
    var A = T.toLowerCase();
    return A === "true" ? !0 : A === "false" ? !1 : T;
  }
  function d(T, S) {
    var A;
    if (i.compact) {
      if (!u[i[T + "Key"]] && (s(i.alwaysArray) ? i.alwaysArray.indexOf(i[T + "Key"]) !== -1 : i.alwaysArray) && (u[i[T + "Key"]] = []), u[i[T + "Key"]] && !s(u[i[T + "Key"]]) && (u[i[T + "Key"]] = [u[i[T + "Key"]]]), T + "Fn" in i && typeof S == "string" && (S = i[T + "Fn"](S, u)), T === "instruction" && ("instructionFn" in i || "instructionNameFn" in i)) {
        for (A in S) if (S.hasOwnProperty(A))
          if ("instructionFn" in i) S[A] = i.instructionFn(S[A], A, u);
          else {
            var b = S[A];
            delete S[A], S[i.instructionNameFn(A, b, u)] = b;
          }
      }
      s(u[i[T + "Key"]]) ? u[i[T + "Key"]].push(S) : u[i[T + "Key"]] = S;
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
      i.instructionHasAttributes && Object.keys(S).length ? (P[T.name] = {}, P[T.name][i.attributesKey] = S) : P[T.name] = T.body, d("instruction", P);
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
      !(T in u) && (s(i.alwaysArray) ? i.alwaysArray.indexOf(T) !== -1 : i.alwaysArray) && (u[T] = []), u[T] && !s(u[T]) && (u[T] = [u[T]]), s(u[T]) ? u[T].push(A) : u[T] = A;
    } else
      u[i.elementsKey] || (u[i.elementsKey] = []), A = {}, A[i.typeKey] = "element", A[i.nameKey] = T, !i.ignoreAttributes && S && Object.keys(S).length && (A[i.attributesKey] = S), i.alwaysChildren && (A[i.elementsKey] = []), u[i.elementsKey].push(A);
    A[i.parentKey] = u, u = A;
  }
  function m(T) {
    i.ignoreText || !T.trim() && !i.captureSpacesBetweenElements || (i.trim && (T = T.trim()), i.nativeType && (T = c(T)), i.sanitize && (T = T.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), d("text", T));
  }
  function f(T) {
    i.ignoreComment || (i.trim && (T = T.trim()), d("comment", T));
  }
  function y(T) {
    var S = u[i.parentKey];
    i.addParent || delete u[i.parentKey], u = S;
  }
  function _(T) {
    i.ignoreCdata || (i.trim && (T = T.trim()), d("cdata", T));
  }
  function k(T) {
    i.ignoreDoctype || (T = T.replace(/^ /, ""), i.trim && (T = T.trim()), d("doctype", T));
  }
  function x(T) {
    T.note = T;
  }
  t.exports = function(T, S) {
    var A = r.parser(!0, {}), b = {};
    if (u = b, i = a(S), A.opt = { strictEntities: !0 }, A.onopentag = E, A.ontext = m, A.oncomment = f, A.onclosetag = y, A.onerror = x, A.oncdata = _, A.ondoctype = k, A.onprocessinginstruction = v, A.write(T).close(), b[i.elementsKey]) {
      var P = b[i.elementsKey];
      delete b[i.elementsKey], b[i.elementsKey] = P, delete b.text;
    }
    return b;
  };
})), Io = /* @__PURE__ */ he(((e, t) => {
  var r = bn(), n = zi();
  function s(i) {
    var u = r.copyOptions(i);
    return r.ensureSpacesExists(u), u;
  }
  t.exports = function(i, u) {
    var a = s(u), c = n(i, a), d, w = "compact" in a && a.compact ? "_parent" : "parent";
    return "addParent" in a && a.addParent ? d = JSON.stringify(c, function(v, E) {
      return v === w ? "_" : E;
    }, a.spaces) : d = JSON.stringify(c, null, a.spaces), d.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), Hi = /* @__PURE__ */ he(((e, t) => {
  var r = bn(), n = yn().isArray, s, i;
  function u(A) {
    var b = r.copyOptions(A);
    return r.ensureFlagExists("ignoreDeclaration", b), r.ensureFlagExists("ignoreInstruction", b), r.ensureFlagExists("ignoreAttributes", b), r.ensureFlagExists("ignoreText", b), r.ensureFlagExists("ignoreComment", b), r.ensureFlagExists("ignoreCdata", b), r.ensureFlagExists("ignoreDoctype", b), r.ensureFlagExists("compact", b), r.ensureFlagExists("indentText", b), r.ensureFlagExists("indentCdata", b), r.ensureFlagExists("indentAttributes", b), r.ensureFlagExists("indentInstruction", b), r.ensureFlagExists("fullTagEmptyElement", b), r.ensureFlagExists("noQuotesForNativeAttributes", b), r.ensureSpacesExists(b), typeof b.spaces == "number" && (b.spaces = Array(b.spaces + 1).join(" ")), r.ensureKeyExists("declaration", b), r.ensureKeyExists("instruction", b), r.ensureKeyExists("attributes", b), r.ensureKeyExists("text", b), r.ensureKeyExists("comment", b), r.ensureKeyExists("cdata", b), r.ensureKeyExists("doctype", b), r.ensureKeyExists("type", b), r.ensureKeyExists("name", b), r.ensureKeyExists("elements", b), r.checkFnExists("doctype", b), r.checkFnExists("instruction", b), r.checkFnExists("cdata", b), r.checkFnExists("comment", b), r.checkFnExists("text", b), r.checkFnExists("instructionName", b), r.checkFnExists("elementName", b), r.checkFnExists("attributeName", b), r.checkFnExists("attributeValue", b), r.checkFnExists("attributes", b), r.checkFnExists("fullTagEmptyElement", b), b;
  }
  function a(A, b, P) {
    return (!P && A.spaces ? `
` : "") + Array(b + 1).join(A.spaces);
  }
  function c(A, b, P) {
    if (b.ignoreAttributes) return "";
    "attributesFn" in b && (A = b.attributesFn(A, i, s));
    var M, R, K, ee, O = [];
    for (M in A) A.hasOwnProperty(M) && A[M] !== null && A[M] !== void 0 && (ee = b.noQuotesForNativeAttributes && typeof A[M] != "string" ? "" : '"', R = "" + A[M], R = R.replace(/"/g, "&quot;"), K = "attributeNameFn" in b ? b.attributeNameFn(M, R, i, s) : M, O.push(b.spaces && b.indentAttributes ? a(b, P + 1, !1) : " "), O.push(K + "=" + ee + ("attributeValueFn" in b ? b.attributeValueFn(R, M, i, s) : R) + ee));
    return A && Object.keys(A).length && b.spaces && b.indentAttributes && O.push(a(b, P, !1)), O.join("");
  }
  function d(A, b, P) {
    return s = A, i = "xml", b.ignoreDeclaration ? "" : "<?xml" + c(A[b.attributesKey], b, P) + "?>";
  }
  function w(A, b, P) {
    if (b.ignoreInstruction) return "";
    var M;
    for (M in A) if (A.hasOwnProperty(M)) break;
    var R = "instructionNameFn" in b ? b.instructionNameFn(M, A[M], i, s) : M;
    if (typeof A[M] == "object")
      return s = A, i = R, "<?" + R + c(A[M][b.attributesKey], b, P) + "?>";
    var K = A[M] ? A[M] : "";
    return "instructionFn" in b && (K = b.instructionFn(K, M, i, s)), "<?" + R + (K ? " " + K : "") + "?>";
  }
  function v(A, b) {
    return b.ignoreComment ? "" : "<!--" + ("commentFn" in b ? b.commentFn(A, i, s) : A) + "-->";
  }
  function E(A, b) {
    return b.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in b ? b.cdataFn(A, i, s) : A.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function m(A, b) {
    return b.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in b ? b.doctypeFn(A, i, s) : A) + ">";
  }
  function f(A, b) {
    return b.ignoreText ? "" : (A = "" + A, A = A.replace(/&amp;/g, "&"), A = A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in b ? b.textFn(A, i, s) : A);
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
    s = A, i = A.name;
    var M = [], R = "elementNameFn" in b ? b.elementNameFn(A.name, A) : A.name;
    M.push("<" + R), A[b.attributesKey] && M.push(c(A[b.attributesKey], b, P));
    var K = A[b.elementsKey] && A[b.elementsKey].length || A[b.attributesKey] && A[b.attributesKey]["xml:space"] === "preserve";
    return K || ("fullTagEmptyElementFn" in b ? K = b.fullTagEmptyElementFn(A.name, A) : K = b.fullTagEmptyElement), K ? (M.push(">"), A[b.elementsKey] && A[b.elementsKey].length && (M.push(k(A[b.elementsKey], b, P + 1)), s = A, i = A.name), M.push(b.spaces && y(A, b) ? `
` + Array(P + 1).join(b.spaces) : ""), M.push("</" + R + ">")) : M.push("/>"), M.join("");
  }
  function k(A, b, P, M) {
    return A.reduce(function(R, K) {
      var ee = a(b, P, M && !R);
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
          return R + (b.indentText ? ee : "") + f(K[b.textKey], b);
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
    s = A, i = b;
    var K = "elementNameFn" in P ? P.elementNameFn(b, A) : b;
    if (typeof A > "u" || A === null || A === "") return "fullTagEmptyElementFn" in P && P.fullTagEmptyElementFn(b, A) || P.fullTagEmptyElement ? "<" + K + "></" + K + ">" : "<" + K + "/>";
    var ee = [];
    if (b) {
      if (ee.push("<" + K), typeof A != "object")
        return ee.push(">" + f(A, P) + "</" + K + ">"), ee.join("");
      A[P.attributesKey] && ee.push(c(A[P.attributesKey], P, M));
      var O = x(A, P, !0) || A[P.attributesKey] && A[P.attributesKey]["xml:space"] === "preserve";
      if (O || ("fullTagEmptyElementFn" in P ? O = P.fullTagEmptyElementFn(b, A) : O = P.fullTagEmptyElement), O) ee.push(">");
      else
        return ee.push("/>"), ee.join("");
    }
    return ee.push(S(A, P, M + 1, !1)), s = A, i = b, b && ee.push((R ? a(P, M, !1) : "") + "</" + K + ">"), ee.join("");
  }
  function S(A, b, P, M) {
    var R, K, ee, O = [];
    for (K in A) if (A.hasOwnProperty(K))
      for (ee = n(A[K]) ? A[K] : [A[K]], R = 0; R < ee.length; ++R) {
        switch (K) {
          case b.declarationKey:
            O.push(d(ee[R], b, P));
            break;
          case b.instructionKey:
            O.push((b.indentInstruction ? a(b, P, M) : "") + w(ee[R], b, P));
            break;
          case b.attributesKey:
          case b.parentKey:
            break;
          case b.textKey:
            O.push((b.indentText ? a(b, P, M) : "") + f(ee[R], b));
            break;
          case b.cdataKey:
            O.push((b.indentCdata ? a(b, P, M) : "") + E(ee[R], b));
            break;
          case b.doctypeKey:
            O.push(a(b, P, M) + m(ee[R], b));
            break;
          case b.commentKey:
            O.push(a(b, P, M) + v(ee[R], b));
            break;
          default:
            O.push(a(b, P, M) + T(ee[R], K, b, P, x(ee[R], b)));
        }
        M = M && !O.length;
      }
    return O.join("");
  }
  t.exports = function(A, b) {
    b = u(b);
    var P = [];
    return s = A, i = "_root_", b.compact ? P.push(S(A, b, 0, !0)) : (A[b.declarationKey] && P.push(d(A[b.declarationKey], b, 0)), A[b.elementsKey] && A[b.elementsKey].length && P.push(k(A[b.elementsKey], b, 0, !P.length))), P.join("");
  };
})), Ro = /* @__PURE__ */ he(((e, t) => {
  var r = Hi();
  t.exports = function(n, s) {
    n instanceof Buffer && (n = n.toString());
    var i = null;
    if (typeof n == "string") try {
      i = JSON.parse(n);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else i = n;
    return r(i, s);
  };
})), $i = (/* @__PURE__ */ he(((e, t) => {
  t.exports = {
    xml2js: zi(),
    xml2json: Io(),
    js2xml: Hi(),
    json2xml: Ro()
  };
})))(), _n = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new Oo(e.name, e.attributes), r = e.elements || [];
      for (const n of r) {
        const s = _n(n);
        s !== void 0 && t.push(s);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, No = class extends ve {
}, Oo = class extends ae {
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
    return _n((0, $i.xml2js)(e, { compact: !1 }));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new No(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, Po = class extends ae {
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
}, Gi = class extends ae {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, Se = (e) => {
  if (isNaN(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, Tr = (e) => {
  const t = Se(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, Ki = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, Kn = (e) => Ki(e, 1), xn = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, Fo = {
  in: 1440,
  cm: 1440 / 2.54,
  mm: 1440 / 25.4,
  pt: 20,
  pc: 240,
  pi: 240
}, _t = (e) => {
  if (typeof e == "number") return e;
  const t = e.slice(-2), r = Number(e.substring(0, e.length - 2)), n = Fo[t];
  if (n === void 0 || Number.isNaN(r)) throw new Error(`Invalid universal measure '${e}'. Expected a number followed by mm, cm, in, pt, pc or pi.`);
  return r * n;
}, Vi = (e) => {
  const t = xn(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, qi = (e) => e === "auto" ? e : Ki(e.charAt(0) === "#" ? e.substring(1) : e, 3), Ve = (e) => typeof e == "string" ? xn(e) : Se(e), Do = (e) => typeof e == "string" ? Vi(e) : Tr(e), Ce = (e) => typeof e == "string" ? Vi(e) : Tr(e), Lo = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Xi = (e) => typeof e == "number" ? Se(e) : e.slice(-1) === "%" ? Lo(e) : xn(e), Bo = Tr, Mo = Tr, Uo = (e) => e.toISOString(), ce = class extends ae {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Pe({ val: t }));
  }
}, Dr = class extends ae {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Pe({ val: Do(t) }));
  }
}, Zi = class extends ae {
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
}, Pt = (e, t) => new se({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), Gt = class extends ae {
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
    super(e), t && this.root.push(new hn(t)), r && this.root.push(...r);
  }
}, Te = {
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
}, Yi = (e) => new se({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), En = {
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
}, Ji = {
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
}, Qi = {
  dark1: {
    value: "windowText",
    lastColor: "000000"
  },
  light1: {
    value: "window",
    lastColor: "FFFFFF"
  }
}, ea = (e, t) => {
  if (t === "auto") throw new Error(`Invalid theme color ${e} 'auto'. Expected 6 digit hex value`);
  return qi(t);
}, ta = (e = {}) => Object.fromEntries(Object.keys(En).map((t) => {
  const r = e[t], n = t === "dark1" || t === "light1" ? Qi[t].lastColor : Ji[t];
  return [t, r === void 0 ? n : ea(t, r)];
})), Wo = (e, t) => new se({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: ea(e, t)
  } }
}), jo = (e, t) => {
  const r = t[e], n = e === "dark1" || e === "light1" ? Qi[e] : void 0;
  return new se({
    name: `a:${En[e]}`,
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
    }) : Wo(e, r ?? Ji[e])]
  });
}, zo = (e, t = {}) => new se({
  name: "a:clrScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: Object.keys(En).map((r) => jo(r, t))
}), Vn = /* @__PURE__ */ new Set([
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
]), Ho = /* @__PURE__ */ new Map([
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
]), qn = (e, t) => {
  if (!(e >= 0 && e <= 100)) throw new Error(`Invalid ${t} ${e}. Expected a number from 0 to 100`);
  return Math.round(255 * (1 - e / 100));
}, $o = ({ theme: e, lighter: t, darker: r }) => {
  if (!Vn.has(e)) {
    const i = Ho.get(e);
    throw new Error(`Invalid theme color "${e}". ${i ? `Did you mean "${i}"?` : `Expected one of ${[...Vn].join(", ")}`}`);
  }
  if (t !== void 0 && r !== void 0) throw new Error("Invalid theme color. Expected lighter or darker, not both");
  const n = t === void 0 ? void 0 : qn(t, "lighter"), s = r === void 0 ? void 0 : qn(r, "darker");
  return {
    tint: n === 255 ? void 0 : n,
    shade: s === 255 ? void 0 : s
  };
}, Go = (e) => {
  const [t, r, n] = [
    0,
    2,
    4
  ].map((c) => parseInt(e.slice(c, c + 2), 16) / 255), s = Math.max(t, r, n), i = Math.min(t, r, n), u = (s + i) / 2, a = s - i;
  return a === 0 ? {
    hue: 0,
    saturation: 0,
    lightness: u
  } : {
    hue: (s === t ? ((r - n) / a + 6) % 6 : s === r ? (n - t) / a + 2 : (t - r) / a + 4) * 60,
    saturation: a / (1 - Math.abs(2 * u - 1)),
    lightness: u
  };
}, Ko = ({ hue: e, saturation: t, lightness: r }) => {
  const n = (1 - Math.abs(2 * r - 1)) * t, s = n * (1 - Math.abs(e / 60 % 2 - 1)), [i, u, a] = e < 60 ? [
    n,
    s,
    0
  ] : e < 120 ? [
    s,
    n,
    0
  ] : e < 180 ? [
    0,
    n,
    s
  ] : e < 240 ? [
    0,
    s,
    n
  ] : e < 300 ? [
    s,
    0,
    n
  ] : [
    n,
    0,
    s
  ], c = r - n / 2;
  return [
    i,
    u,
    a
  ].map((d) => Math.floor((d + c) * 255 + 1e-9).toString(16).padStart(2, "0")).join("").toUpperCase();
}, Vo = (e, { tint: t, shade: r }) => {
  if (t === void 0 && r === void 0) return e;
  const n = Go(e), s = t === void 0 ? n.lightness * r / 255 : n.lightness * t / 255 + (1 - t / 255);
  return Ko(fe(fe({}, n), {}, { lightness: s }));
}, Xn = (e) => e === void 0 ? void 0 : e.toString(16).padStart(2, "0").toUpperCase(), qo = (e) => typeof e == "string" ? {
  type: "hex",
  value: qi(e)
} : {
  type: "theme",
  color: e,
  change: $o(e)
}, Xo = (e, t) => e.type === "hex" ? { color: e.value } : {
  color: Vo(t[e.color.theme], e.change),
  theme: e.color.theme,
  tint: Xn(e.change.tint),
  shade: Xn(e.change.shade)
}, Zo = ta(), Tn = class extends Vt {
  /**
  * @throws If a color isn't valid
  */
  constructor(e) {
    super("_attr"), J(this, "attributes", void 0), this.attributes = e.map((t) => "keys" in t ? {
      keys: t.keys,
      color: t.color === void 0 ? void 0 : qo(t.color)
    } : t);
  }
  prepForXml(e) {
    var t, r;
    const n = (t = (r = e.file) === null || r === void 0 || (r = r.Theme) === null || r === void 0 ? void 0 : r.Colors) !== null && t !== void 0 ? t : Zo, s = this.attributes.flatMap((i) => {
      if (!("keys" in i)) return [[i.key, i.value]];
      if (i.color === void 0) return [];
      const { keys: u } = i, a = Xo(i.color, n);
      return [
        [u.color, a.color],
        [u.theme, a.theme],
        [u.tint, a.tint],
        [u.shade, a.shade]
      ];
    });
    return { _attr: Object.fromEntries(s.filter(([, i]) => i !== void 0)) };
  }
}, Yo = class extends ae {
  constructor(e, t) {
    super(e), this.root.push(new Tn(t));
  }
}, Sn = (e, t) => new Yo(e, t), Jt = {
  color: "w:color",
  theme: "w:themeColor",
  tint: "w:themeTint",
  shade: "w:themeShade"
}, be = (e, { color: t, size: r, space: n, style: s }) => Sn(e, [
  {
    key: "w:val",
    value: s
  },
  {
    keys: Jt,
    color: t
  },
  {
    key: "w:sz",
    value: r === void 0 ? void 0 : Bo(r)
  },
  {
    key: "w:space",
    value: n === void 0 ? void 0 : Mo(n)
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
}, Jo = class extends ot {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}, Qo = class extends ae {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", {
      color: "auto",
      space: 1,
      style: Le.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, el = ({ start: e, end: t, left: r, right: n, hanging: s, firstLine: i, firstLineChars: u }) => new se({
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
      value: s === void 0 ? void 0 : Ce(s)
    },
    firstLine: {
      key: "w:firstLine",
      value: i === void 0 ? void 0 : Ce(i)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: u === void 0 ? void 0 : Se(u)
    }
  }
}), tl = () => new se({ name: "w:br" }), Sr = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, An = (e, t) => new se({
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
}), Wt = (e) => An(Sr.BEGIN, e), ra = /* @__PURE__ */ new WeakSet(), rl = class extends se {
  constructor() {
    super({
      name: "w:fldChar",
      attributes: {
        type: {
          key: "w:fldCharType",
          value: Sr.BEGIN
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
    return ra.add(t), t;
  }
}, na = () => new rl(), nl = (e) => typeof e == "object" && e !== null && ra.has(e), mt = (e) => An(Sr.SEPARATE, e), vt = (e) => An(Sr.END, e), il = {
  DECIMAL: "decimal"
}, at = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, st = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { space: "xml:space" });
  }
}, al = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new st({ space: at.PRESERVE })), this.root.push("PAGE");
  }
}, sl = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new st({ space: at.PRESERVE })), this.root.push("NUMPAGES");
  }
}, ol = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new st({ space: at.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, ll = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new st({ space: at.PRESERVE })), this.root.push("SECTION");
  }
}, Ar = ({ fill: e, color: t, type: r }) => Sn("w:shd", [
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
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, ul = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, cl = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, hl = {
  /** Dot emphasis mark */
  DOT: "dot"
}, fl = (e = hl.DOT) => new se({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), dl = class extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(new Pe({ val: Ve(e) }));
  }
}, pl = class extends ae {
  constructor(e) {
    super("w:color"), this.root.push(new Tn([{
      keys: fe(fe({}, Jt), {}, { color: "w:val" }),
      color: e
    }]));
  }
}, ml = class extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(new Pe({ val: e }));
  }
}, vl = (e) => new se({
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
}), Lr = (e, t) => {
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
}, ia = (e) => new se({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), wl = () => ia("superscript"), gl = () => ia("subscript"), aa = {
  /** Single underline */
  SINGLE: "single"
}, yl = (e = aa.SINGLE, t) => Sn("w:u", [{
  key: "w:val",
  value: e
}, {
  keys: Jt,
  color: t
}]), ct = class extends ot {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new rt("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(Lr(e.font)) : "name" in e.font ? this.push(Lr(e.font.name, e.font.hint)) : this.push(Lr(e.font))), e.bold !== void 0 && this.push(new ce("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new ce("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new ce("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new ce("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new ce("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ce("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ce("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ce("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ce("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ce("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ce("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ce("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ce("w:vanish", e.vanish)), e.color && this.push(new pl(e.color)), e.characterSpacing && this.push(new dl(e.characterSpacing)), e.scale !== void 0 && this.push(new Gt("w:w", e.scale)), e.kern && this.push(new Dr("w:kern", e.kern)), e.position && this.push(new rt("w:position", e.position)), e.size !== void 0 && this.push(new Dr("w:sz", e.size));
    const n = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    n && this.push(new Dr("w:szCs", n)), e.highlight && this.push(new ml(e.highlight)), e.underline && this.push(yl(e.underline.type, e.underline.color)), e.effect && this.push(new rt("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(Ar(e.shading)), e.subScript && this.push(gl()), e.superScript && this.push(wl()), e.rightToLeft !== void 0 && this.push(new ce("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(fl(e.emphasisMark.type)), e.language && this.push(vl(e.language)), e.specVanish && this.push(new ce("w:specVanish", e.vanish)), e.math && this.push(new ce("w:oMath", e.math)), e.revision && this.push(new _l(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, bl = class extends ct {
  constructor(e) {
    super(e), e?.insertion && this.push(new cl(e.insertion)), e?.deletion && this.push(new ul(e.deletion));
  }
}, _l = class extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new ct(e));
  }
}, gr = class extends ae {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new st({ space: at.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new st({ space: (t = e.space) !== null && t !== void 0 ? t : at.DEFAULT })), this.root.push(e.text);
    }
  }
}, it = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, Me = class rn extends ae {
  constructor(t) {
    if (super("w:r"), J(this, "properties", void 0), J(this, "following", []), this.properties = new ct(t), this.root.push(this.properties), t.break) for (let r = 0; r < t.break; r++) this.root.push(tl());
    if (t.children) for (const [r, n] of t.children.entries()) {
      if (n instanceof rn) {
        const s = t.children.slice(r + 1);
        this.following = [n, ...s.length > 0 ? [new rn(fe(fe({}, t), {}, {
          break: void 0,
          children: s
        }))] : []];
        break;
      }
      if (typeof n == "string") {
        switch (n) {
          case it.CURRENT:
            this.root.push(Wt()), this.root.push(new al()), this.root.push(mt()), this.root.push(vt());
            break;
          case it.TOTAL_PAGES:
            this.root.push(Wt()), this.root.push(new sl()), this.root.push(mt()), this.root.push(vt());
            break;
          case it.TOTAL_PAGES_IN_SECTION:
            this.root.push(Wt()), this.root.push(new ol()), this.root.push(mt()), this.root.push(vt());
            break;
          case it.CURRENT_SECTION:
            this.root.push(Wt()), this.root.push(new ll()), this.root.push(mt()), this.root.push(vt());
            break;
          default:
            this.root.push(new gr(n));
        }
        continue;
      }
      this.root.push(n);
    }
    else t.text !== void 0 && this.root.push(new gr(t.text));
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
}, Qt = /* @__PURE__ */ he(((e, t) => {
  t.exports = r;
  function r(n, s) {
    if (!n) throw new Error(s || "Assertion failed");
  }
  r.equal = function(s, i, u) {
    if (s != i) throw new Error(u || "Assertion failed: " + s + " != " + i);
  };
})), Ze = /* @__PURE__ */ he(((e) => {
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
  function s(O) {
    for (var z = "", I = 0; I < O.length; I++) z += a(O[I].toString(16));
    return z;
  }
  e.toHex = s;
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
  function a(O) {
    return O.length === 1 ? "0" + O : O;
  }
  e.zero2 = a;
  function c(O) {
    return O.length === 7 ? "0" + O : O.length === 6 ? "00" + O : O.length === 5 ? "000" + O : O.length === 4 ? "0000" + O : O.length === 3 ? "00000" + O : O.length === 2 ? "000000" + O : O.length === 1 ? "0000000" + O : O;
  }
  e.zero8 = c;
  function d(O, z, I, H) {
    var Q = I - z;
    t(Q % 4 === 0);
    for (var q = new Array(Q / 4), le = 0, Z = z; le < q.length; le++, Z += 4) {
      var te;
      H === "big" ? te = O[Z] << 24 | O[Z + 1] << 16 | O[Z + 2] << 8 | O[Z + 3] : te = O[Z + 3] << 24 | O[Z + 2] << 16 | O[Z + 1] << 8 | O[Z], q[le] = te >>> 0;
    }
    return q;
  }
  e.join32 = d;
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
  function f(O, z, I) {
    return O + z + I >>> 0;
  }
  e.sum32_3 = f;
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
  function S(O, z, I, H, Q, q, le, Z) {
    var te = 0, V = z;
    return V = V + H >>> 0, te += V < z ? 1 : 0, V = V + q >>> 0, te += V < q ? 1 : 0, V = V + Z >>> 0, te += V < Z ? 1 : 0, O + I + Q + le + te >>> 0;
  }
  e.sum64_4_hi = S;
  function A(O, z, I, H, Q, q, le, Z) {
    return z + H + q + Z >>> 0;
  }
  e.sum64_4_lo = A;
  function b(O, z, I, H, Q, q, le, Z, te, V) {
    var F = 0, X = z;
    return X = X + H >>> 0, F += X < z ? 1 : 0, X = X + q >>> 0, F += X < q ? 1 : 0, X = X + Z >>> 0, F += X < Z ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0, O + I + Q + le + te + F >>> 0;
  }
  e.sum64_5_hi = b;
  function P(O, z, I, H, Q, q, le, Z, te, V) {
    return z + H + q + Z + V >>> 0;
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
})), er = /* @__PURE__ */ he(((e) => {
  var t = Ze(), r = Qt();
  function n() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  e.BlockHash = n, n.prototype.update = function(i, u) {
    if (i = t.toArray(i, u), this.pending ? this.pending = this.pending.concat(i) : this.pending = i, this.pendingTotal += i.length, this.pending.length >= this._delta8) {
      i = this.pending;
      var a = i.length % this._delta8;
      this.pending = i.slice(i.length - a, i.length), this.pending.length === 0 && (this.pending = null), i = t.join32(i, 0, i.length - a, this.endian);
      for (var c = 0; c < i.length; c += this._delta32) this._update(i, c, c + this._delta32);
    }
    return this;
  }, n.prototype.digest = function(i) {
    return this.update(this._pad()), r(this.pending === null), this._digest(i);
  }, n.prototype._pad = function() {
    var i = this.pendingTotal, u = this._delta8, a = u - (i + this.padLength) % u, c = new Array(a + this.padLength);
    c[0] = 128;
    for (var d = 1; d < a; d++) c[d] = 0;
    if (i <<= 3, this.endian === "big") {
      for (var w = 8; w < this.padLength; w++) c[d++] = 0;
      c[d++] = 0, c[d++] = 0, c[d++] = 0, c[d++] = 0, c[d++] = i >>> 24 & 255, c[d++] = i >>> 16 & 255, c[d++] = i >>> 8 & 255, c[d++] = i & 255;
    } else
      for (c[d++] = i & 255, c[d++] = i >>> 8 & 255, c[d++] = i >>> 16 & 255, c[d++] = i >>> 24 & 255, c[d++] = 0, c[d++] = 0, c[d++] = 0, c[d++] = 0, w = 8; w < this.padLength; w++) c[d++] = 0;
    return c;
  };
})), sa = /* @__PURE__ */ he(((e) => {
  var t = Ze().rotr32;
  function r(w, v, E, m) {
    if (w === 0) return n(v, E, m);
    if (w === 1 || w === 3) return i(v, E, m);
    if (w === 2) return s(v, E, m);
  }
  e.ft_1 = r;
  function n(w, v, E) {
    return w & v ^ ~w & E;
  }
  e.ch32 = n;
  function s(w, v, E) {
    return w & v ^ w & E ^ v & E;
  }
  e.maj32 = s;
  function i(w, v, E) {
    return w ^ v ^ E;
  }
  e.p32 = i;
  function u(w) {
    return t(w, 2) ^ t(w, 13) ^ t(w, 22);
  }
  e.s0_256 = u;
  function a(w) {
    return t(w, 6) ^ t(w, 11) ^ t(w, 25);
  }
  e.s1_256 = a;
  function c(w) {
    return t(w, 7) ^ t(w, 18) ^ w >>> 3;
  }
  e.g0_256 = c;
  function d(w) {
    return t(w, 17) ^ t(w, 19) ^ w >>> 10;
  }
  e.g1_256 = d;
})), xl = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = er(), s = sa(), i = r.rotl32, u = r.sum32, a = r.sum32_5, c = s.ft_1, d = n.BlockHash, w = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function v() {
    if (!(this instanceof v)) return new v();
    d.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(v, d), t.exports = v, v.blockSize = 512, v.outSize = 160, v.hmacStrength = 80, v.padLength = 64, v.prototype._update = function(m, f) {
    for (var y = this.W, _ = 0; _ < 16; _++) y[_] = m[f + _];
    for (; _ < y.length; _++) y[_] = i(y[_ - 3] ^ y[_ - 8] ^ y[_ - 14] ^ y[_ - 16], 1);
    var k = this.h[0], x = this.h[1], T = this.h[2], S = this.h[3], A = this.h[4];
    for (_ = 0; _ < y.length; _++) {
      var b = ~~(_ / 20), P = a(i(k, 5), c(b, x, T, S), A, y[_], w[b]);
      A = S, S = T, T = i(x, 30), x = k, k = P;
    }
    this.h[0] = u(this.h[0], k), this.h[1] = u(this.h[1], x), this.h[2] = u(this.h[2], T), this.h[3] = u(this.h[3], S), this.h[4] = u(this.h[4], A);
  }, v.prototype._digest = function(m) {
    return m === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), oa = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = er(), s = sa(), i = Qt(), u = r.sum32, a = r.sum32_4, c = r.sum32_5, d = s.ch32, w = s.maj32, v = s.s0_256, E = s.s1_256, m = s.g0_256, f = s.g1_256, y = n.BlockHash, _ = [
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
    for (; b < A.length; b++) A[b] = a(f(A[b - 2]), A[b - 7], m(A[b - 15]), A[b - 16]);
    var P = this.h[0], M = this.h[1], R = this.h[2], K = this.h[3], ee = this.h[4], O = this.h[5], z = this.h[6], I = this.h[7];
    for (i(this.k.length === A.length), b = 0; b < A.length; b++) {
      var H = c(I, E(ee), d(ee, O, z), this.k[b], A[b]), Q = u(v(P), w(P, M, R));
      I = z, z = O, O = ee, ee = u(K, H), K = R, R = M, M = P, P = u(H, Q);
    }
    this.h[0] = u(this.h[0], P), this.h[1] = u(this.h[1], M), this.h[2] = u(this.h[2], R), this.h[3] = u(this.h[3], K), this.h[4] = u(this.h[4], ee), this.h[5] = u(this.h[5], O), this.h[6] = u(this.h[6], z), this.h[7] = u(this.h[7], I);
  }, k.prototype._digest = function(T) {
    return T === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), El = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = oa();
  function s() {
    if (!(this instanceof s)) return new s();
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
  r.inherits(s, n), t.exports = s, s.blockSize = 512, s.outSize = 224, s.hmacStrength = 192, s.padLength = 64, s.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), la = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = er(), s = Qt(), i = r.rotr64_hi, u = r.rotr64_lo, a = r.shr64_hi, c = r.shr64_lo, d = r.sum64, w = r.sum64_hi, v = r.sum64_lo, E = r.sum64_4_hi, m = r.sum64_4_lo, f = r.sum64_5_hi, y = r.sum64_5_lo, _ = n.BlockHash, k = [
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
    for (var le = this.W, Z = 0; Z < 32; Z++) le[Z] = Q[q + Z];
    for (; Z < le.length; Z += 2) {
      var te = z(le[Z - 4], le[Z - 3]), V = I(le[Z - 4], le[Z - 3]), F = le[Z - 14], X = le[Z - 13], Y = ee(le[Z - 30], le[Z - 29]), re = O(le[Z - 30], le[Z - 29]), pe = le[Z - 32], C = le[Z - 31];
      le[Z] = E(te, V, F, X, Y, re, pe, C), le[Z + 1] = m(te, V, F, X, Y, re, pe, C);
    }
  }, x.prototype._update = function(Q, q) {
    this._prepareBlock(Q, q);
    var le = this.W, Z = this.h[0], te = this.h[1], V = this.h[2], F = this.h[3], X = this.h[4], Y = this.h[5], re = this.h[6], pe = this.h[7], C = this.h[8], p = this.h[9], W = this.h[10], U = this.h[11], ne = this.h[12], D = this.h[13], L = this.h[14], h = this.h[15];
    s(this.k.length === le.length);
    for (var G = 0; G < le.length; G += 2) {
      var N = L, o = h, l = R(C, p), g = K(C, p), B = T(C, p, W, U, ne), $ = S(C, p, W, U, ne, D), j = this.k[G], ie = this.k[G + 1], ue = le[G], oe = le[G + 1], de = f(N, o, l, g, B, $, j, ie, ue, oe), me = y(N, o, l, g, B, $, j, ie, ue, oe);
      N = P(Z, te), o = M(Z, te), l = A(Z, te, V, F, X), g = b(Z, te, V, F, X, Y);
      var we = w(N, o, l, g), Ae = v(N, o, l, g);
      L = ne, h = D, ne = W, D = U, W = C, U = p, C = w(re, pe, de, me), p = v(pe, pe, de, me), re = X, pe = Y, X = V, Y = F, V = Z, F = te, Z = w(de, me, we, Ae), te = v(de, me, we, Ae);
    }
    d(this.h, 0, Z, te), d(this.h, 2, V, F), d(this.h, 4, X, Y), d(this.h, 6, re, pe), d(this.h, 8, C, p), d(this.h, 10, W, U), d(this.h, 12, ne, D), d(this.h, 14, L, h);
  }, x.prototype._digest = function(Q) {
    return Q === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function T(H, Q, q, le, Z) {
    var te = H & q ^ ~H & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function S(H, Q, q, le, Z, te) {
    var V = Q & le ^ ~Q & te;
    return V < 0 && (V += 4294967296), V;
  }
  function A(H, Q, q, le, Z) {
    var te = H & q ^ H & Z ^ q & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function b(H, Q, q, le, Z, te) {
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
  function R(H, Q) {
    var q = i(H, Q, 14), le = i(H, Q, 18), Z = i(Q, H, 9), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function K(H, Q) {
    var q = u(H, Q, 14), le = u(H, Q, 18), Z = u(Q, H, 9), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function ee(H, Q) {
    var q = i(H, Q, 1), le = i(H, Q, 8), Z = a(H, Q, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function O(H, Q) {
    var q = u(H, Q, 1), le = u(H, Q, 8), Z = c(H, Q, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function z(H, Q) {
    var q = i(H, Q, 19), le = i(Q, H, 29), Z = a(H, Q, 6), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function I(H, Q) {
    var q = u(H, Q, 19), le = u(Q, H, 29), Z = c(H, Q, 6), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
})), Tl = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = la();
  function s() {
    if (!(this instanceof s)) return new s();
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
  r.inherits(s, n), t.exports = s, s.blockSize = 1024, s.outSize = 384, s.hmacStrength = 192, s.padLength = 128, s.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), Sl = /* @__PURE__ */ he(((e) => {
  e.sha1 = xl(), e.sha224 = El(), e.sha256 = oa(), e.sha384 = Tl(), e.sha512 = la();
})), Al = /* @__PURE__ */ he(((e) => {
  var t = Ze(), r = er(), n = t.rotl32, s = t.sum32, i = t.sum32_3, u = t.sum32_4, a = r.BlockHash;
  function c() {
    if (!(this instanceof c)) return new c();
    a.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.endian = "little";
  }
  t.inherits(c, a), e.ripemd160 = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 192, c.padLength = 64, c.prototype._update = function(k, x) {
    for (var T = this.h[0], S = this.h[1], A = this.h[2], b = this.h[3], P = this.h[4], M = T, R = S, K = A, ee = b, O = P, z = 0; z < 80; z++) {
      var I = s(n(u(T, d(z, S, A, b), k[E[z] + x], w(z)), f[z]), P);
      T = P, P = b, b = n(A, 10), A = S, S = I, I = s(n(u(M, d(79 - z, R, K, ee), k[m[z] + x], v(z)), y[z]), O), M = O, O = ee, ee = n(K, 10), K = R, R = I;
    }
    I = i(this.h[1], A, ee), this.h[1] = i(this.h[2], b, O), this.h[2] = i(this.h[3], P, M), this.h[3] = i(this.h[4], T, R), this.h[4] = i(this.h[0], S, K), this.h[0] = I;
  }, c.prototype._digest = function(k) {
    return k === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function d(_, k, x, T) {
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
  ], f = [
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
})), kl = /* @__PURE__ */ he(((e, t) => {
  var r = Ze(), n = Qt();
  function s(i, u, a) {
    if (!(this instanceof s)) return new s(i, u, a);
    this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(u, a));
  }
  t.exports = s, s.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), n(u.length <= this.blockSize);
    for (var a = u.length; a < this.blockSize; a++) u.push(0);
    for (a = 0; a < u.length; a++) u[a] ^= 54;
    for (this.inner = new this.Hash().update(u), a = 0; a < u.length; a++) u[a] ^= 106;
    this.outer = new this.Hash().update(u);
  }, s.prototype.update = function(u, a) {
    return this.inner.update(u, a), this;
  }, s.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  };
})), Cl = /* @__PURE__ */ cn((/* @__PURE__ */ he(((e) => {
  var t = e;
  t.utils = Ze(), t.common = er(), t.sha = Sl(), t.ripemd = Al(), t.hmac = kl(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})))()), Il = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Rl = (e, t = 21) => (r = t) => {
  let n = "", s = r | 0;
  for (; s-- > 0; ) n += e[Math.random() * e.length | 0];
  return n;
}, Nl = (e = 21) => {
  let t = "", r = e | 0;
  for (; r-- > 0; ) t += Il[Math.random() * 64 | 0];
  return t;
}, Ue = (e) => Math.floor(e * 72 * 20), kr = (e = 0) => {
  let t = e;
  return () => ++t;
}, Ol = () => kr(), Pl = () => kr(1), Fl = () => kr(), Dl = Fl(), Ll = () => kr(), ua = Ll(), kn = () => Nl().toLowerCase(), Zn = (e) => Cl.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), Ft = (e) => Rl("1234567890abcdef", e)(), Bl = () => `${Ft(8)}-${Ft(4)}-${Ft(4)}-${Ft(4)}-${Ft(12)}`, jt = (e) => new Uint8Array(new TextEncoder().encode(e)), Ml = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Ul = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Wl = () => new se({
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
}), ca = (e) => new se({
  name: "wp:align",
  children: [e]
}), ha = (e) => new se({
  name: "wp:posOffset",
  children: [e.toString()]
}), jl = ({ relative: e, align: t, offset: r }) => new se({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Ml.PAGE
  } },
  children: [(() => {
    if (t) return ca(t);
    if (r !== void 0) return ha(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), zl = ({ relative: e, align: t, offset: r }) => new se({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Ul.PAGE
  } },
  children: [(() => {
    if (t) return ca(t);
    if (r !== void 0) return ha(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Hl = (e = {}) => {
  var t, r, n, s;
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
        value: (s = e.margins) === null || s === void 0 ? void 0 : s.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new ce("a:noAutofit", e.noAutoFit)] : []]
  });
}, $l = (e = { txBox: "1" }) => new se({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), Gl = (e) => new se({
  name: "w:txbxContent",
  children: [...e]
}), Kl = (e) => new se({
  name: "wps:txbx",
  children: [Gl(e)]
}), Vl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, fa = class extends ae {
  constructor(e, t) {
    super("a:ext"), J(this, "attributes", void 0), this.attributes = new Vl({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, ql = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, da = class extends ae {
  constructor(e, t) {
    super("a:off"), this.root.push(new ql({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, Xl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, Zl = class extends ae {
  constructor(e) {
    var t, r, n, s;
    super("a:xfrm"), J(this, "extents", void 0), J(this, "offset", void 0), this.root.push(new Xl({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new da((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (s = e.offset) === null || s === void 0 || (s = s.emus) === null || s === void 0 ? void 0 : s.y), this.extents = new fa(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, pa = () => new se({ name: "a:noFill" }), Yl = (e) => new se({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), Jl = (e) => new se({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), nn = (e) => new se({
  name: "a:solidFill",
  children: [e.type === "rgb" ? Yl(e) : Jl(e)]
}), Ql = {
  /** Round cap style */
  ROUND: "rnd",
  /** Square cap style */
  SQUARE: "sq",
  /** Flat cap style */
  FLAT: "flat"
}, eu = {
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
}, tu = {
  /** Center alignment */
  CENTER: "ctr",
  /** Inset alignment */
  INSET: "in"
}, ru = (e) => new se({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap === void 0 ? void 0 : Ql[e.cap]
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine === void 0 ? void 0 : eu[e.compoundLine]
    },
    align: {
      key: "algn",
      value: e.align === void 0 ? void 0 : tu[e.align]
    }
  },
  children: [e.type === "noFill" ? pa() : e.solidFillType === "rgb" ? nn({
    type: "rgb",
    value: e.value
  }) : nn({
    type: "scheme",
    value: e.value
  })]
}), nu = class extends ae {
  constructor() {
    super("a:avLst");
  }
}, iu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { prst: "prst" });
  }
}, au = class extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(new iu({ prst: "rect" })), this.root.push(new nu());
  }
}, su = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, ma = class extends ae {
  constructor({ element: e, outline: t, solidFill: r, transform: n }) {
    super(`${e}:spPr`), J(this, "form", void 0), this.root.push(new su({ bwMode: "auto" })), this.form = new Zl(n), this.root.push(this.form), this.root.push(new au()), r ? this.root.push(nn(r)) : t && this.root.push(pa()), t && this.root.push(ru(t));
  }
}, Yn = (e) => new se({
  name: "wps:wsp",
  children: [
    $l(e.nonVisualProperties),
    new ma({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    Kl(e.children),
    Hl(e.bodyProperties)
  ]
}), sr = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { uri: "uri" });
  }
}, ou = (e) => new se({
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
}), lu = (e) => new se({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [ou(e)]
}), uu = (e) => new se({
  name: "a:extLst",
  children: [lu(e)]
}), cu = (e) => new se({
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
  children: e.type === "svg" ? [uu(e)] : []
}), hu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, fu = class extends ae {
  constructor(e) {
    super("a:srcRect"), e && this.root.push(new hu({
      left: or(e.left, "left"),
      top: or(e.top, "top"),
      right: or(e.right, "right"),
      bottom: or(e.bottom, "bottom")
    }));
  }
}, du = class extends ae {
  constructor() {
    super("a:fillRect");
  }
}, pu = class extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new du());
  }
}, mu = class extends ae {
  constructor(e, t) {
    super("pic:blipFill"), this.root.push(cu(e)), this.root.push(new fu(t)), this.root.push(new pu());
  }
}, vu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, wu = class extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(new vu({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, gu = class extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new wu());
  }
}, Cn = (e, t) => new se({
  name: "a:hlinkClick",
  attributes: fe(fe({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), yu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, bu = class extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(new yu({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof Rr) {
        this.root.push(Cn(n.linkId, !1));
        break;
      }
    }
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, _u = class extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new bu()), this.root.push(new gu());
  }
}, xu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, Jn = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: s }) {
    super("pic:pic"), this.root.push(new xu({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new _u()), this.root.push(new mu(e, s)), this.root.push(new ma({
      element: "pic",
      transform: t,
      outline: r,
      solidFill: n
    }));
  }
}, Eu = (e) => {
  var t, r, n, s;
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
      new da((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (s = e.offset) === null || s === void 0 || (s = s.emus) === null || s === void 0 ? void 0 : s.y),
      new fa(e.emus.x, e.emus.y),
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
}, Tu = () => new se({ name: "wpg:cNvGrpSpPr" }), Su = (e) => new se({
  name: "wpg:wgp",
  children: [
    Tu(),
    new se({
      name: "wpg:grpSpPr",
      children: [Eu(e.transformation)]
    }),
    ...e.children
  ]
}), Au = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: s }) {
    if (super("a:graphicData"), e.type === "graphic")
      this.root.push(new sr({ uri: e.uri })), this.root.push(e.content);
    else if (e.type === "wps") {
      this.root.push(new sr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const i = Yn(fe(fe({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: n
      }));
      this.root.push(i);
    } else if (e.type === "wpg") {
      this.root.push(new sr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const i = Su({
        children: e.children.map((u) => u.type === "wps" ? Yn(fe(fe({}, u.data), {}, {
          transformation: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })) : new Jn({
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
      const i = new Jn({
        mediaData: e,
        transform: t,
        outline: r,
        solidFill: n,
        crop: s
      });
      this.root.push(i);
    }
  }
}, ku = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { a: "xmlns:a" });
  }
}, va = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: s }) {
    super("a:graphic"), J(this, "data", void 0), this.root.push(new ku({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new Au({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: n,
      crop: s
    }), this.root.push(this.data);
  }
}, Dt = {
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
}, wa = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, Qn = () => new se({ name: "wp:wrapNone" }), Cu = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new se({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: e.side || wa.BOTH_SIDES
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
}), lr = 21600, Lt = (e, { x: t, y: r }) => new se({
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
}), Iu = () => new se({
  name: "wp:wrapPolygon",
  attributes: { edited: {
    key: "edited",
    value: !1
  } },
  children: [
    Lt("wp:start", {
      x: 0,
      y: 0
    }),
    Lt("wp:lineTo", {
      x: 0,
      y: lr
    }),
    Lt("wp:lineTo", {
      x: lr,
      y: lr
    }),
    Lt("wp:lineTo", {
      x: lr,
      y: 0
    }),
    Lt("wp:lineTo", {
      x: 0,
      y: 0
    })
  ]
}), ga = (e, t = {}, r) => {
  var n;
  return new se({
    name: e,
    attributes: {
      wrapText: {
        key: "wrapText",
        value: (n = r?.side) !== null && n !== void 0 ? n : wa.BOTH_SIDES
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
    children: [Iu()]
  });
}, Ru = (e, t) => ga("wp:wrapTight", e, t), Nu = (e, t) => ga("wp:wrapThrough", e, t), Ou = (e = {
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
}), ya = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, Pu = (e, t, r, n) => new se({
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
}), Fu = "{C183D7F6-B498-43B3-948B-1728B52AA6E4}", Du = (e) => new se({
  name: "a:extLst",
  attributes: { namespace: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } },
  children: [new se({
    name: "a:ext",
    attributes: { uri: {
      key: "uri",
      value: Fu
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
}), Lu = class {
  constructor(e) {
    J(this, "link", void 0), J(this, "linkId", kn()), J(this, "addedTo", /* @__PURE__ */ new WeakSet()), this.link = e;
  }
  createClick(e) {
    return Cn(this.linkId, e);
  }
  addRelationship(e) {
    const t = e.viewWrapper.Relationships;
    this.addedTo.has(t) || (this.addedTo.add(t), t.addRelationship(this.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", this.link, ya.EXTERNAL));
  }
}, ba = class extends ae {
  constructor({ name: e, description: t, title: r, id: n } = {
    name: "",
    description: "",
    title: ""
  }, { link: s, decorative: i } = {}) {
    super("wp:docPr"), J(this, "link", void 0), J(this, "decorative", void 0);
    const u = {
      id: {
        key: "id",
        value: n ?? Dl()
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
    }), this.root.push(new hn(u)), this.link = s === void 0 ? void 0 : new Lu(s), this.decorative = i;
  }
  prepForXml(e) {
    if (this.link)
      this.link.addRelationship(e), this.root.push(this.link.createClick(!0));
    else for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof Rr) {
        this.root.push(Cn(n.linkId, !0));
        break;
      }
    }
    this.decorative && this.root.push(Du());
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, _a = ({ top: e, right: t, bottom: r, left: n }) => new se({
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
}), Br = 2147483647, ei = 9525, ti = (e, t) => {
  if (t !== void 0 && t > Br) throw new Error(`Invalid drawing ${e} ${t} EMUs (${Math.round(t / ei)} pixels). Word won't open a drawing with a ${e} over ${Br} EMUs (${Math.floor(Br / ei)} pixels). Sizes such as an ImageRun's transformation are in pixels, not EMUs`);
  return t;
}, xa = ({ x: e, y: t }) => new se({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: ti("width", e)
    },
    y: {
      key: "cy",
      value: ti("height", t)
    }
  }
}), Bu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, Mu = class extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Bu({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, Ea = (e = !0) => new se({
  name: "wp:cNvGraphicFramePr",
  children: e ? [new Mu()] : []
}), Uu = class extends ve {
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
}, Wu = class extends ae {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    var n;
    super("wp:anchor");
    const s = fe({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Uu({
      distT: s.margins && s.margins.top || 0,
      distB: s.margins && s.margins.bottom || 0,
      distL: s.margins && s.margins.left || 0,
      distR: s.margins && s.margins.right || 0,
      simplePos: "0",
      allowOverlap: s.allowOverlap === !0 ? "1" : "0",
      behindDoc: s.behindDocument === !0 ? "1" : "0",
      locked: s.lockAnchor === !0 ? "1" : "0",
      layoutInCell: s.layoutInCell === !0 ? "1" : "0",
      relativeHeight: s.zIndex ? s.zIndex : t.emus.y
    })), this.root.push(Wl()), this.root.push(jl(s.horizontalPosition)), this.root.push(zl(s.verticalPosition)), this.root.push(xa({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push(_a((n = r.effectExtent) !== null && n !== void 0 ? n : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Dt.SQUARE:
        this.root.push(Cu(r.floating.wrap, r.floating.margins));
        break;
      case Dt.TIGHT:
        this.root.push(Ru(r.floating.margins, r.floating.wrap));
        break;
      case Dt.THROUGH:
        this.root.push(Nu(r.floating.margins, r.floating.wrap));
        break;
      case Dt.TOP_AND_BOTTOM:
        this.root.push(Ou(r.floating.margins));
        break;
      case Dt.NONE:
      default:
        this.root.push(Qn());
    }
    else this.root.push(Qn());
    this.root.push(new ba(r.docProperties, {
      link: r.link,
      decorative: r.decorative
    })), this.root.push(Ea(e.type !== "graphic" || e.lockAspectRatio !== !1)), this.root.push(new va({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill,
      crop: r.crop
    }));
  }
}, ju = ({ mediaData: e, transform: t, docProperties: r, outline: n, solidFill: s, crop: i, effectExtent: u, link: a, decorative: c }) => {
  var d, w, v, E;
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
      xa({
        x: t.emus.x,
        y: t.emus.y
      }),
      _a(u ?? (n ? {
        top: ((d = n.width) !== null && d !== void 0 ? d : 9525) * 2,
        right: ((w = n.width) !== null && w !== void 0 ? w : 9525) * 2,
        bottom: ((v = n.width) !== null && v !== void 0 ? v : 9525) * 2,
        left: ((E = n.width) !== null && E !== void 0 ? E : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })),
      new ba(r, {
        link: a,
        decorative: c
      }),
      Ea(e.type !== "graphic" || e.lockAspectRatio !== !1),
      new va({
        mediaData: e,
        transform: t,
        outline: n,
        solidFill: s,
        crop: i
      })
    ]
  });
}, zu = class extends ae {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Wu({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(ju({
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
}, Hu = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((n) => n.charCodeAt(0)));
}, $u = (e) => typeof e == "string" ? Hu(e) : e, Mr = (e, t) => ({
  data: $u(e.data),
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
}), Gu = ({ id: e, author: t, date: r }, n) => new se({
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
}), Ku = class extends ae {
  constructor(e) {
    var t;
    const r = `${Zn(e.data)}.${e.type}`, n = e.type === "svg" ? fe(fe({ type: e.type }, Mr(e, r)), {}, { fallback: fe({ type: e.fallback.type }, Mr(fe(fe({}, e.fallback), {}, { transformation: e.transformation }), `${Zn(e.fallback.data)}.${e.fallback.type}`)) }) : fe({ type: e.type }, Mr(e, r)), s = new zu(n, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline,
      solidFill: e.solidFill,
      crop: e.crop,
      link: e.link,
      decorative: e.decorative
    }), i = new ct(e.run), u = (t = e.insertion) !== null && t !== void 0 ? t : e.deletion, a = e.insertion ? "w:ins" : e.deletion ? "w:del" : "w:r";
    if (super(a), J(this, "imageData", void 0), u) {
      this.root.push(new Fe({
        id: u.id,
        author: u.author,
        date: u.date
      }));
      const c = new se({
        name: "w:r",
        children: [i, s]
      });
      this.addChildElement(e.insertion && e.deletion ? Gu(e.deletion, c) : c);
    } else
      this.root.push(i), this.root.push(s);
    this.imageData = n;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, Vu = 32767, qu = 780, Xu = [
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
], Zu = (e) => e <= Vu ? Xu.reduce(({ rest: t, text: r }, [n, s]) => ({
  rest: t % n,
  text: r + s.repeat(Math.floor(t / n))
}), {
  rest: e,
  text: ""
}).text : void 0, Yu = (e) => e === 0 ? "" : e <= qu ? String.fromCharCode(65 + (e - 1) % 26).repeat(Math.ceil(e / 26)) : void 0, Ju = (e) => {
  var t;
  return `${e}${e % 100 >= 11 && e % 100 <= 13 ? "th" : (t = [
    "th",
    "st",
    "nd",
    "rd"
  ][e % 10]) !== null && t !== void 0 ? t : "th"}`;
}, In = (e) => {
  const t = e.charAt(0) !== e.charAt(0).toUpperCase(), r = (n) => (s) => {
    var i;
    return t ? (i = n(s)) === null || i === void 0 ? void 0 : i.toLowerCase() : n(s);
  };
  switch (e.toLowerCase()) {
    case "arabic":
      return String;
    case "roman":
      return r(Zu);
    case "alphabetic":
      return r(Yu);
    case "ordinal":
      return (n) => n > 0 ? Ju(n) : void 0;
    case "arabicdash":
      return (n) => `- ${n} -`;
    default:
      return;
  }
}, Ta = /* @__PURE__ */ new Set([
  "mergeformat",
  "charformat",
  "mergeformatinet"
]), Sa = /* @__PURE__ */ new Set([
  "upper",
  "lower",
  "firstcap",
  "caps"
]), Qu = (e) => /^[#0,]*[#0][#0,]*$/.test(e), ec = (e, t) => {
  const r = [...t].filter((i) => i === "0").length, n = r + [...t].filter((i) => i === "#").length, s = String(e).padStart(r, "0");
  if (!(s.length < n || r === 0 && e === 0))
    return t.includes(",") ? s.replace(/\B(?=(\d{3})+$)/g, ",") : s;
}, tc = (e, t) => {
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
}, rc = (e) => {
  var t;
  const r = new RegExp("^\\s*(PAGEREF|NUMPAGES|SECTIONPAGES)\\b(.*)$", "is").exec(e), n = r?.[1].toUpperCase() === "PAGEREF" ? new RegExp('^\\s*("?)([^\\s"\\\\]+)\\1(.*)$', "s").exec(r[2]) : void 0;
  if (!r || r[1].toUpperCase() === "PAGEREF" && !n) return;
  const s = (t = (n ? n[3] : r[2]).match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  let i, u;
  const a = [];
  let c = !1, d = !0;
  for (let m = 0; m < s.length; m++) {
    const f = s[m], y = () => {
      var _;
      return (f.length > 2 ? f.slice(2) : (_ = s[++m]) !== null && _ !== void 0 ? _ : "").replace(/^"(.*)"$/, "$1");
    };
    if (/^\\p$/i.test(f)) c = !0;
    else if (f.startsWith("\\#")) {
      var w;
      const _ = y();
      d && (d = u === void 0 && Qu(_)), (w = u) !== null && w !== void 0 || (u = _);
    } else if (f.startsWith("\\*")) {
      const _ = y(), k = _.toLowerCase();
      if (Sa.has(k)) a.push(k);
      else if (_ !== "" && !Ta.has(k)) {
        var v;
        d && (d = i === void 0 && In(_) !== void 0), (v = i) !== null && v !== void 0 || (i = _);
      }
    }
  }
  const E = fe(fe(fe(fe({}, i === void 0 ? {} : { numberFormat: i }), u === void 0 ? {} : { picture: u }), a.length === 0 ? {} : { capitals: a[0] }), {}, { written: d && a.length <= 1 && a[0] !== "caps" && (i === void 0 || u === void 0) });
  return fe(n ? {
    type: "pageReference",
    bookmark: n[2],
    relative: c
  } : {
    type: "pageCount",
    scope: r[1].toUpperCase() === "NUMPAGES" ? "document" : "section"
  }, E);
}, nc = (e) => new RegExp("^\\s*TOC\\b.*\\\\s\\b", "is").test(e), Aa = (e, { enclosing: t, within: r, inTextBox: n }, { estimate: s, sectionPageCount: i, blank: u, relativeTo: a }) => {
  const c = rc(e);
  if (c === void 0) return;
  const { bookmarks: d, pageCount: w, bookmarkPageNumbers: v } = s, { numberFormat: E, picture: m, capitals: f, written: y } = c, _ = E !== void 0 || m !== void 0, k = (S) => S === void 0 ? void 0 : m === void 0 ? In(E ?? "arabic")(S) : ec(S, m), x = c.type === "pageReference" && c.relative && r === "counted" && !n ? a?.(c.bookmark) : void 0;
  let T;
  return y ? c.type === "pageCount" ? T = k(c.scope === "document" ? w : i) : t.some(nc) ? T = void 0 : _ ? T = k(v?.get(c.bookmark)) : T = c.relative ? x : d.get(c.bookmark) : T = void 0, T === void 0 ? u ? "" : void 0 : tc(T, f);
}, ic = (e, t) => e === "mc:Fallback" || t === "fallback" ? "fallback" : e === "w:del" || e === "w:moveFrom" ? "deleted" : t, qt = (e, t, r, n, s = "counted", i = !1) => {
  for (let d = 0; d < t.length; d++) {
    const w = t[d], v = e.nameOf(w);
    if (v === void 0) continue;
    const E = r[r.length - 1];
    if (v === "w:fldChar") {
      const m = e.attributeOf(w, "w:fldCharType");
      m === "begin" ? r.push({
        begin: w,
        instruction: "",
        inResult: !1
      }) : m === "separate" && E ? (e.writeClean(E.begin, E.instruction), E.inResult = !0, E.result = n.resultOf(E.instruction, {
        within: s,
        enclosing: r.slice(0, -1).map((f) => f.instruction),
        inTextBox: i
      }), E.result !== void 0 && (t.splice(d + 1, 0, e.textElement(E.result)), d++)) : m === "end" && r.pop();
    } else if (v === "w:instrText" && E && !E.inResult) E.instruction += e.textOf(w);
    else if ((v === "w:t" || v === "w:tab" || v === "w:br" || v === "w:cr") && E?.result !== void 0)
      t.splice(d, 1), d--;
    else if (v === "w:fldSimple") {
      const m = n.resultOf(String(e.attributeOf(w, "w:instr")), {
        within: s,
        enclosing: r.map((f) => f.instruction),
        inTextBox: i
      });
      if (m === void 0) {
        var u;
        qt(e, (u = e.contentOf(w)) !== null && u !== void 0 ? u : [], [], n, s, i);
      } else e.setSimpleFieldResult(w, m);
    } else {
      var a;
      if (v === "w:p") {
        var c;
        (c = n.beforeParagraph) === null || c === void 0 || c.call(n, w);
      }
      qt(e, (a = e.contentOf(w)) !== null && a !== void 0 ? a : [], r, n, ic(v, s), i || v === "w:txbxContent"), v === "w:p" && n.afterParagraph(w);
    }
  }
}, ka = (e, t) => t.flatMap((r) => {
  var n;
  const s = e.nameOf(r);
  return s === void 0 ? [] : s === "w:sectPr" ? [r] : ka(e, (n = e.contentOf(r)) !== null && n !== void 0 ? n : []);
}), ac = (e, t) => {
  var r;
  return ((r = e.contentOf(t)) !== null && r !== void 0 ? r : []).some((n) => {
    var s;
    return e.nameOf(n) === "w:pPr" && ((s = e.contentOf(n)) !== null && s !== void 0 ? s : []).some((i) => e.nameOf(i) === "w:sectPr");
  });
}, sc = (e, t, r) => {
  const n = ka(e, [t]).reduce((s, i) => {
    var u, a;
    const c = ((u = e.contentOf(i)) !== null && u !== void 0 ? u : []).flatMap((d) => {
      const w = e.nameOf(d);
      return w === "w:headerReference" || w === "w:footerReference" ? [[`${w} ${String(e.attributeOf(d, "w:type"))}`, String(e.attributeOf(d, "r:id"))]] : [];
    });
    return [...s, new Map([...(a = s[s.length - 1]) !== null && a !== void 0 ? a : [], ...c])];
  }, []).reduce((s, i, u) => {
    for (const c of i.values()) {
      var a;
      s.set(c, [...(a = s.get(c)) !== null && a !== void 0 ? a : [], r[u]]);
    }
    return s;
  }, /* @__PURE__ */ new Map());
  return new Map([...n].flatMap(([s, [i, ...u]]) => i !== void 0 && u.every((a) => a === i) ? [[s, i]] : []));
}, oc = (e, t, r, { blank: n }) => {
  const { sectionPageCounts: s = [], relativePositions: i } = r;
  let u = 0;
  const a = /* @__PURE__ */ new Map(), c = (d) => {
    var w, v;
    const E = (w = a.get(d)) !== null && w !== void 0 ? w : 0;
    return a.set(d, E + 1), i == null || (v = i.get(d)) === null || v === void 0 ? void 0 : v[E];
  };
  return qt(e, [t], [], {
    resultOf: (d, w) => Aa(d, w, {
      estimate: r,
      sectionPageCount: s[u],
      blank: n,
      relativeTo: c
    }),
    afterParagraph: (d) => {
      u += ac(e, d) ? 1 : 0;
    }
  }), sc(e, t, s);
}, lc = (e, t, r, { blank: n, sectionPageCount: s, notes: i = !1 }) => {
  const u = (a) => {
    const c = r.bookmarks.get(a);
    return c === void 0 ? void 0 : `on page ${c}`;
  };
  qt(e, [t], [], {
    resultOf: (a, c) => Aa(a, c, fe({
      estimate: r,
      sectionPageCount: s,
      blank: n
    }, i ? { relativeTo: u } : {})),
    afterParagraph: () => {
    }
  });
}, uc = (e, t, { beforeParagraph: r, resultOf: n }) => qt(e, [t], [], {
  resultOf: (s, { within: i }) => n(s, i),
  beforeParagraph: r,
  afterParagraph: () => {
  }
}), Ca = class extends ae {
  constructor(e = {}) {
    super("w:instrText"), J(this, "properties", void 0), this.properties = e, this.root.push(new st({ space: at.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((n) => `${n.styleName},${n.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, Ia = class extends ae {
  constructor() {
    super("w:sdtContent");
  }
}, Ra = (e) => e === void 0 ? na() : Wt(e), Rn = /* @__PURE__ */ new WeakMap(), cc = (e, t) => {
  Rn.set(e, t);
}, hc = class {
  constructor() {
    J(this, "ids", []);
  }
  get(e) {
    var t, r;
    return (r = (t = this.ids)[e]) !== null && r !== void 0 || (t[e] = ua()), this.ids[e];
  }
}, qe = (e) => typeof e == "object" && e !== null ? Object.keys(e)[0] : void 0, Xe = (e) => {
  const t = qe(e), r = t === void 0 ? void 0 : e[t];
  return Array.isArray(r) ? r : r === void 0 ? [] : [r];
}, je = (e, t) => Xe(e).find((r) => qe(r) === t), Be = (e, t) => {
  var r;
  return (r = je(e, "_attr")) === null || r === void 0 || (r = r._attr) === null || r === void 0 ? void 0 : r[t];
}, Nn = (e, t) => {
  const r = Be(e, t);
  return r === void 0 ? void 0 : Number(r);
}, fc = /* @__PURE__ */ new Set([
  "w:tbl",
  "w:tr",
  "w:tc",
  "w:sdt",
  "w:sdtContent",
  "w:customXml"
]), Na = (e) => e.flatMap((t) => {
  const r = qe(t);
  return r === "w:p" || Rn.has(t) ? [t] : r !== void 0 && fc.has(r) ? Na(Xe(t)) : [];
}), dc = /* @__PURE__ */ new Set([
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
]), pc = (e) => {
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
}, mc = (e) => {
  const t = [], r = (n) => {
    const s = qe(n);
    if (s !== void 0 && dc.has(s)) return Xe(n).map(r).join("");
    if (s === "w:fldChar") {
      const i = Be(n, "w:fldCharType");
      return i === "begin" ? t.push(!1) : i === "separate" ? t[t.length - 1] = !0 : t.pop(), "";
    }
    return t.every(Boolean) ? pc(n) : "";
  };
  return Xe(e).map(r).join("");
}, Oa = (e) => {
  const t = qe(e);
  return t === "w:bookmarkStart" ? [{
    start: !0,
    id: Be(e, "w:id"),
    name: Be(e, "w:name")
  }] : t === "w:bookmarkEnd" ? [{
    start: !1,
    id: Be(e, "w:id")
  }] : t === void 0 || t === "_attr" ? [] : Xe(e).flatMap(Oa);
}, vc = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.map((r) => {
    const n = Oa(r), s = /* @__PURE__ */ new Set([...t.values(), ...n.flatMap((i) => i.start ? [i.name] : [])]);
    for (const i of n) i.start ? t.set(i.id, i.name) : t.delete(i.id);
    return s;
  });
}, wc = (e, t) => {
  const r = t ? vc(e) : [];
  return e.map((n, s) => {
    var i;
    const u = je(n, "w:pPr");
    return {
      element: n,
      styleId: Be(je(u, "w:pStyle"), "w:val"),
      outlineLevel: Nn(je(u, "w:outlineLvl"), "w:val"),
      text: mc(n),
      bookmarks: (i = r[s]) !== null && i !== void 0 ? i : /* @__PURE__ */ new Set()
    };
  });
}, Pa = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 || (t = t.Styles) === null || t === void 0 ? void 0 : t.prepForXml(e);
  return new Map(Xe(r).filter((n) => qe(n) === "w:style" && ["paragraph", void 0].includes(Be(n, "w:type"))).map((n) => [Be(n, "w:styleId"), {
    name: Be(je(n, "w:name"), "w:val"),
    basedOn: Be(je(n, "w:basedOn"), "w:val"),
    outlineLevel: Nn(je(je(n, "w:pPr"), "w:outlineLvl"), "w:val")
  }]));
}, Fa = (e) => {
  const t = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(e);
  return t ? [Number(t[1]), Number(t[2])] : void 0;
}, an = (e, [t, r]) => e >= t && e <= r, On = (e, t) => {
  var r, n;
  if (e === void 0) return;
  const s = /^heading ?([1-9])$/i.exec((r = (n = t.get(e)) === null || n === void 0 ? void 0 : n.name) !== null && r !== void 0 ? r : e);
  return s ? Number(s[1]) : void 0;
}, Da = (e, t, r = 0) => {
  var n;
  if (e === void 0 || r > t.size) return;
  const s = t.get(e), i = On(e, t);
  return (n = s?.outlineLevel) !== null && n !== void 0 ? n : i === void 0 ? Da(s?.basedOn, t, r + 1) : i - 1;
}, gc = (e) => {
  const t = Pa(e);
  return (r) => {
    const n = je(r, "w:pPr"), s = Be(je(n, "w:pStyle"), "w:val"), i = On(s, t), u = La({
      styleId: s,
      outlineLevel: Nn(je(n, "w:outlineLvl"), "w:val")
    }, t), a = u === void 0 || u >= 9 ? void 0 : u + 1;
    return i !== void 0 && (a === void 0 || a === i) ? i : a === void 0 ? void 0 : "unclear";
  };
}, La = (e, t) => {
  var r;
  return (r = e.outlineLevel) !== null && r !== void 0 ? r : Da(e.styleId, t);
}, yc = (e, t, r) => {
  var n;
  const { entriesFromBookmark: s, headingStyleRange: i, stylesWithLevels: u = [], useAppliedParagraphOutlineLevel: a } = e;
  if (t.text.trim() === "" || s && !t.bookmarks.has(s)) return;
  const c = [t.styleId, t.styleId === void 0 || (n = r.get(t.styleId)) === null || n === void 0 ? void 0 : n.name].filter((f) => f !== void 0).map((f) => f.toLowerCase()), d = u.find((f) => c.includes(f.styleName.toLowerCase()));
  if (d) return d.level;
  const w = !!i || u.length > 0 || !!a || !!e.tcFieldIdentifier || !!e.tcFieldLevelRange || !!e.captionLabel || !!e.captionLabelIncludingNumbers, v = i ? Fa(i) : w ? void 0 : [1, 9], E = On(t.styleId, r);
  if (v && E !== void 0 && an(E, v)) return E;
  const m = a ? La(t, r) : void 0;
  return m !== void 0 && an(m + 1, v ?? [1, 9]) ? m + 1 : void 0;
}, bc = (e, t) => {
  const r = t.preserveTabInEntries ? e : e.replace(/\t/g, " ");
  return (t.preserveNewLineInEntries ? r.split(`
`) : [r.replace(/\n/g, " ")]).map((n, s) => new Ie({
    break: s > 0 ? 1 : void 0,
    children: n.split("	").flatMap((i, u) => [...u > 0 ? [new Ir()] : [], ...i === "" ? [] : [i]])
  }));
}, _c = (e, t) => {
  var r;
  const n = (r = [...t].find(([, i]) => {
    var u;
    return ((u = i.name) === null || u === void 0 ? void 0 : u.toLowerCase()) === `toc ${e}`;
  })) === null || r === void 0 ? void 0 : r[0], s = n ?? `TOC${e}`;
  return n !== void 0 || t.has(s) || e === 1 ? { id: s } : {
    id: s,
    indent: (e - 1) * 220
  };
}, xc = ({ properties: e, beginDirty: t, textWidth: r }, n, s, i) => {
  var u;
  const a = e.pageNumbersEntryLevelsRange ? (u = Fa(e.pageNumbersEntryLevelsRange)) !== null && u !== void 0 ? u : [1, 9] : void 0, c = new Ia();
  return n.forEach((d, w) => {
    const v = a === void 0 || !an(d.level, a), E = [...bc(d.title, e), ...v ? [new Ie({ children: [e.entryAndPageNumberSeparator || new Ir()] }), new ah(d.bookmark, { hyperlink: e.hyperlink })] : []], m = _c(d.level, s);
    c.addChildElement(new _e({
      style: m.id,
      indent: m.indent === void 0 ? void 0 : { left: m.indent },
      tabStops: [{
        type: "right",
        position: r,
        leader: "dot"
      }],
      children: [...w === 0 ? [new Me({ children: [
        Ra(t),
        new Ca(e),
        mt()
      ] })] : [], ...e.hyperlink ? [new Dn({
        anchor: d.bookmark,
        children: E
      })] : E]
    }));
  }), c.addChildElement(new _e({ children: [new Me({ children: [vt()] })] })), c.prepForXml(i);
}, Ec = (e, t, r, n) => {
  const s = Xe(e), i = s.findIndex((u) => qe(u) === "w:pPr") + 1;
  e["w:p"] = [
    ...s.slice(0, i),
    new za(t, r).prepForXml(n),
    ...s.slice(i),
    new Ha(r).prepForXml(n)
  ];
}, Tc = (e, t, r) => {
  const n = Na(Xe(e)), s = n.flatMap((c) => {
    const d = Rn.get(c);
    return d ? [[c, d]] : [];
  });
  if (s.length === 0) return;
  const i = Pa(t), u = s.some(([, { properties: c }]) => !!c.entriesFromBookmark), a = wc(n.filter((c) => qe(c) === "w:p"), u).map((c) => ({
    paragraph: c,
    levels: s.map(([, { properties: d }]) => yc(d, c, i))
  })).filter(({ levels: c }) => c.some((d) => d !== void 0)).map((c, d) => fe(fe({}, c), {}, { id: r.get(d) }));
  for (const { paragraph: c, id: d } of a) Ec(c.element, `_Toc${d}`, d, t);
  s.forEach(([c, d], w) => {
    const v = a.flatMap(({ paragraph: E, levels: m, id: f }) => {
      const y = m[w];
      return y === void 0 ? [] : [{
        title: E.text,
        level: y,
        bookmark: `_Toc${f}`
      }];
    });
    v.length !== 0 && (c["w:sdt"] = Xe(c).map((E) => qe(E) === "w:sdtContent" ? xc(d, v, i, t) : E));
  });
}, Sc = new RegExp("^\\p{L}[\\p{L}\\p{N}_]*$", "u"), Ac = (e) => {
  var t, r;
  let n, s = !1, i, u = !1, a = !1;
  for (let v = 0; v < e.length; v++) {
    var c, d;
    const E = e[v], m = (c = e[v + 1]) !== null && c !== void 0 ? c : "";
    let f;
    if (v === 0 && !E.startsWith("\\")) f = { type: "bookmark" };
    else if (E === "\\c" || E === "\\n") f = { type: E === "\\c" ? "repeat" : "next" };
    else if ((E === "\\r" || E === "\\s") && /^\d+$/.test(m))
      v++, f = E === "\\r" ? {
        type: "reset",
        to: Number(m)
      } : {
        type: "heading",
        level: Number(m)
      };
    else if (E === "\\h") s = !0;
    else if (E === "\\#" && v + 1 < e.length)
      v++, a = !0;
    else if (E === "\\*" && v + 1 < e.length) {
      const y = e[++v];
      if (Sa.has(y.toLowerCase())) u = !0;
      else if (!Ta.has(y.toLowerCase())) {
        if (i !== void 0) return;
        i = y;
      }
    } else return;
    if (f && n) return;
    n = (d = f) !== null && d !== void 0 ? d : n;
  }
  if (n?.type === "bookmark" && e.length > 1) return;
  const w = !a && !(u && i !== void 0 && i.toLowerCase() !== "arabic");
  return {
    step: (t = n) !== null && t !== void 0 ? t : { type: "next" },
    hidden: s && i === void 0,
    format: w ? (r = i) !== null && r !== void 0 ? r : "ARABIC" : ""
  };
}, Pn = (e) => {
  var t;
  const r = new RegExp("^\\s*SEQ\\b(.*)$", "is").exec(e);
  if (!r) return;
  const [n, ...s] = (t = r[1].match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  if (n === void 0) return {};
  const i = n.replace(/^"(.*)"$/, "$1");
  return Sc.test(i) ? {
    identifier: i,
    sequence: Ac(s)
  } : { identifier: i };
}, kc = (e) => Pn(e) !== void 0, sn = (e) => typeof e != "object" || e === null ? [] : Array.isArray(e) ? e.flatMap(sn) : Object.entries(e).flatMap(([t, r]) => [...(t === "w:instrText" && Array.isArray(r) ? r : t === "_attr" ? [r["w:instr"]] : []).flatMap((n) => {
  const s = typeof n == "string" ? Pn(n) : void 0;
  return s?.identifier === void 0 ? [] : [s.identifier.toLowerCase()];
}), ...sn(r)]), Cc = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 ? void 0 : t.Comments;
  if (!r) return /* @__PURE__ */ new Set();
  const n = {
    View: r,
    Relationships: r.Relationships
  };
  return new Set(sn(r.prepForXml(fe(fe({}, e), {}, {
    viewWrapper: n,
    stack: []
  }))));
}, Ic = (e) => {
  const t = gc(e), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = [];
  let i = -1, u = -1, a;
  const c = (d, w) => {
    var v;
    const E = Math.max(-1, ...s.slice(1, w + 1).filter((y) => y !== void 0)), m = ((v = n.get(d)) !== null && v !== void 0 ? v : []).filter((y) => y.paragraph >= E), f = m.every(({ step: y }) => y?.type === "next" || y?.type === "heading" && y.level === w);
    if (!(i > E || !f))
      return m.length + 1;
  };
  return {
    startParagraph: (d) => {
      u++;
      const w = t(d);
      w === "unclear" ? i = u : w !== void 0 && (s[w] = u);
    },
    numberOf: (d, w) => {
      var v, E, m;
      const { identifier: f, sequence: y } = Pn(d);
      if (f === void 0 || w === "fallback") return;
      (v = a) !== null && v !== void 0 || (a = Cc(e));
      const _ = f.toLowerCase();
      if (y?.step.type === "bookmark" && w === "counted" && !a.has(_)) return;
      const k = r.has(_) ? r.get(_) : 0, x = a.has(_) || w === "deleted" ? void 0 : y?.step, T = x?.type === "reset" ? x.to : x?.type === "repeat" ? k : x?.type === "heading" ? c(_, x.level) : x?.type === "next" && k !== void 0 ? k + 1 : void 0;
      return r.set(_, T), n.set(_, [...(E = n.get(_)) !== null && E !== void 0 ? E : [], fe({ paragraph: u }, T === void 0 ? {} : { step: x })]), T === void 0 || y === void 0 ? void 0 : y.hidden ? "" : (m = In(y.format)) === null || m === void 0 ? void 0 : m(T);
    }
  };
}, Ur = (e) => {
  const t = typeof e == "object" && e !== null && !Array.isArray(e) ? Object.keys(e)[0] : void 0;
  return t === "_attr" ? void 0 : t;
}, ri = (e) => ({ "w:t": [{ _attr: { "xml:space": "preserve" } }, e] }), Cr = {
  nameOf: Ur,
  contentOf: (e) => {
    const t = e[Ur(e)];
    return Array.isArray(t) ? t : void 0;
  },
  attributeOf: (e, t) => {
    var r;
    const n = e[Ur(e)], s = Array.isArray(n) ? n.find((i) => typeof i == "object" && i !== null && "_attr" in i) : n;
    return s == null || (r = s._attr) === null || r === void 0 ? void 0 : r[t];
  },
  textOf: (e) => Cr.contentOf(e).filter((t) => typeof t == "string").join(""),
  textElement: ri,
  writeClean: (e) => {
    if (nl(e)) {
      const t = e["w:fldChar"]._attr;
      e["w:fldChar"] = { _attr: Object.fromEntries(Object.entries(t).filter(([r]) => r !== "w:dirty")) };
    }
  },
  setSimpleFieldResult: (e, t) => {
    const r = e["w:fldSimple"];
    e["w:fldSimple"] = [...(Array.isArray(r) ? r : [r]).filter((n) => typeof n == "object" && n !== null && "_attr" in n), { "w:r": [ri(t)] }];
  }
}, Ba = /* @__PURE__ */ new WeakMap(), Rc = (e, t) => {
  const { startParagraph: r, numberOf: n } = Ic(t);
  uc(Cr, e, {
    beforeParagraph: (s) => r(s),
    resultOf: (s, i) => kc(s) ? n(s, i) : void 0
  });
}, Nc = (e, t, r) => {
  const n = r(e, t), s = oc(Cr, e, n, { blank: !1 });
  t.file && Ba.set(t.file, {
    estimate: n,
    partPageCounts: s
  });
}, tr = (e, t, r) => {
  const n = t.file && Ba.get(t.file);
  if (!e || !n) return;
  const s = r === void 0 ? void 0 : n.partPageCounts.get(`rId${r}`), i = "w:footnotes" in e || "w:endnotes" in e;
  lc(Cr, e, n.estimate, {
    blank: !1,
    sectionPageCount: s,
    notes: i
  });
}, Oc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Re = class Ma extends ae {
  constructor() {
    super("Relationships"), this.root.push(new Oc({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(t, r, n, s) {
    this.root.push(Pu(`rId${t}`, r, n, s));
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
    const r = new Ma();
    return r.root.push(...t.root.slice(1)), r;
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, Pc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, Fc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, ni = class extends ae {
  constructor({ id: e, initials: t, author: r, date: n = /* @__PURE__ */ new Date(), children: s }, i) {
    super("w:comment"), J(this, "paraId", void 0), this.paraId = i, this.root.push(new Pc({
      id: e,
      initials: t,
      author: r,
      date: n.toISOString()
    }));
    for (const u of s) this.root.push(u);
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
      const s = r[n];
      if (s && typeof s == "object" && "w:p" in s) {
        const i = s["w:p"];
        Array.isArray(i) && i.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, Dc = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), Lc = class extends ae {
  constructor({ children: e }) {
    super("w:comments"), J(this, "relationships", void 0), J(this, "threadData", void 0), J(this, "commentIdsData", void 0), J(this, "isEmpty", void 0), this.isEmpty = e.length === 0, this.root.push(new Fc({
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
      const n = new Map(e.map((s) => [s.id, Dc(s.id)]));
      for (const s of e) this.root.push(new ni(s, n.get(s.id)));
      t && (this.threadData = e.map((s) => ({
        paraId: n.get(s.id),
        parentParaId: s.parentId !== void 0 ? n.get(s.parentId) : void 0,
        done: s.resolved
      }))), r && (this.commentIdsData = e.map((s) => {
        var i;
        return {
          paraId: n.get(s.id),
          durableId: (i = s.durableId) !== null && i !== void 0 ? i : n.get(s.id)
        };
      }));
    } else for (const n of e) this.root.push(new ni(n));
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
}, Bc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Mc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, Uc = class extends ae {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new Mc({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, Wc = class extends ae {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new Bc({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new Uc(t));
  }
}, jc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      paraId: "w16cid:paraId",
      durableId: "w16cid:durableId"
    });
  }
}, zc = class extends ae {
  constructor(e) {
    super("w16cid:commentId"), this.root.push(new jc({
      paraId: e.paraId,
      durableId: e.durableId
    }));
  }
}, Hc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:mc": "xmlns:mc",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, $c = class extends ae {
  constructor(e) {
    super("w16cid:commentsIds"), this.root.push(new Hc({
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "w16cid"
    }));
    for (const t of e) this.root.push(new zc(t));
  }
}, Gc = class extends Zi {
  constructor() {
    super("w:endnoteRef");
  }
}, Ir = class extends Zi {
  constructor() {
    super("w:tab");
  }
}, fr = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, on = {
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
}, Kc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, Vc = class extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(new Kc({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, qc = class extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}, St = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, Xc = ({ after: e, before: t, line: r, lineRule: n, beforeAutoSpacing: s, afterAutoSpacing: i }) => new se({
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
      value: s
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
}, zt = (e) => new se({
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
}, Bt = {
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
}, Zc = ({ type: e, position: t, leader: r }) => new se({
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
}), Yc = (e) => new se({
  name: "w:tabs",
  children: e.map((t) => Zc(t))
}), Wr = class extends ae {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new Jc(t)), this.root.push(new Qc(e));
  }
}, Jc = class extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Pe({ val: e }));
  }
}, Qc = class extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(new Pe({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, Fn = class extends ae {
  constructor(...e) {
    super(...e), J(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, eh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, Rr = class extends ae {
  constructor(e, t, r) {
    super("w:hyperlink"), J(this, "linkId", void 0), this.linkId = t;
    const n = new eh({
      history: 1,
      anchor: r || void 0,
      id: r ? void 0 : `rId${this.linkId}`
    });
    this.root.push(n), e.forEach((s) => {
      this.root.push(s);
    });
  }
}, Dn = class extends Rr {
  constructor(e) {
    super(e.children, kn(), e.anchor);
  }
}, Ua = class extends ae {
  constructor(e) {
    super("w:externalHyperlink"), J(this, "options", void 0), this.options = e;
  }
}, th = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, rh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, Wa = class ja {
  constructor(t) {
    J(this, "start", void 0), J(this, "children", void 0), J(this, "end", void 0);
    const r = ua();
    this.start = new za(t.id, r), this.children = t.children, this.end = new Ha(r);
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
      ...this.children.flatMap((t) => t instanceof ja ? t.writtenAs : [t]),
      this.end
    ];
  }
}, za = class extends ae {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new th({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, Ha = class extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new rh({ id: e });
    this.root.push(t);
  }
}, nh = (e) => new se({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), ih = class extends ae {
  constructor(e, t = {}) {
    super("w:instrText"), this.root.push(new st({ space: at.PRESERVE }));
    let r = `PAGEREF ${e}`;
    t.hyperlink && (r = `${r} \\h`), t.useRelativePosition && (r = `${r} \\p`), this.root.push(r);
  }
}, ah = class extends Me {
  constructor(e, t = {}) {
    super({ children: [
      na(),
      new ih(e, t),
      mt(),
      vt()
    ] });
  }
}, ur = ({ id: e, fontKey: t, subsetted: r }, n) => new se({
  name: n,
  attributes: fe({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t.toUpperCase()}}`
  } } : {}),
  children: [...r ? [new ce("w:subsetted", r)] : []]
}), sh = ({ name: e, altName: t, panose1: r, charset: n, family: s, notTrueType: i, pitch: u, sig: a, embedRegular: c, embedBold: d, embedItalic: w, embedBoldItalic: v }) => new se({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [Pt("w:altName", t)] : [],
    ...r ? [Pt("w:panose1", r)] : [],
    ...n ? [Pt("w:charset", n)] : [],
    Pt("w:family", s),
    ...i ? [new ce("w:notTrueType", i)] : [],
    Pt("w:pitch", u),
    ...a ? [new se({
      name: "w:sig",
      attributes: {
        usb0: {
          key: "w:usb0",
          value: a.usb0
        },
        usb1: {
          key: "w:usb1",
          value: a.usb1
        },
        usb2: {
          key: "w:usb2",
          value: a.usb2
        },
        usb3: {
          key: "w:usb3",
          value: a.usb3
        },
        csb0: {
          key: "w:csb0",
          value: a.csb0
        },
        csb1: {
          key: "w:csb1",
          value: a.csb1
        }
      }
    })] : [],
    ...c ? [ur(c, "w:embedRegular")] : [],
    ...d ? [ur(d, "w:embedBold")] : [],
    ...w ? [ur(w, "w:embedItalic")] : [],
    ...v ? [ur(v, "w:embedBoldItalic")] : []
  ]
}), oh = ({ name: e, index: t, fontKey: r, characterSet: n }) => sh({
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
}), lh = (e) => new se({
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
  children: e.map((t, r) => oh({
    name: t.name,
    index: r + 1,
    fontKey: t.fontKey,
    characterSet: t.characterSet
  }))
}), $a = class {
  constructor(e) {
    J(this, "options", void 0), J(this, "fontTable", void 0), J(this, "relationships", void 0), J(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((t) => fe(fe({}, t), {}, { fontKey: Bl() })), this.fontTable = lh(this.fontOptionsWithKey), this.relationships = new Re();
    for (let t = 0; t < e.length; t++) this.relationships.addRelationship(t + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${t + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, uh = () => new se({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), ch = (e) => {
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
}, hh = {
  left: "right",
  right: "left"
}, At = class extends ot {
  /**
  * Creates paragraph properties.
  *
  * @param options - The paragraph formatting to emit
  * @param config - Controls how the element is assembled; see {@link IParagraphPropertiesConfig}
  */
  constructor(e, { implicitListParagraphStyle: t = !0 } = {}) {
    if (super("w:pPr", e?.includeIfEmpty), J(this, "numberingReferences", []), !e) return this;
    if (e.heading && this.push(zt(e.heading)), t && (e.bullet && this.push(zt("ListParagraph")), e.numbering && !e.numbering.custom && !e.style && !e.heading && this.push(zt("ListParagraph"))), e.style && this.push(zt(e.style)), e.keepNext !== void 0 && this.push(new ce("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ce("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new qc()), e.frame && this.push(ch(e.frame)), e.widowControl !== void 0 && this.push(new ce("w:widowControl", e.widowControl)), e.bullet && this.push(new Wr(1, e.bullet.level)), e.numbering) {
      var r, n;
      this.numberingReferences.push({
        reference: e.numbering.reference,
        instance: (r = e.numbering.instance) !== null && r !== void 0 ? r : 0
      }), this.push(new Wr(`${e.numbering.reference}-${(n = e.numbering.instance) !== null && n !== void 0 ? n : 0}`, e.numbering.level));
    } else e.numbering === !1 && this.push(new Wr(0, 0));
    e.border && this.push(new Jo(e.border)), e.thematicBreak && this.push(new Qo()), e.shading && this.push(Ar(e.shading)), e.wordWrap && this.push(uh()), e.overflowPunctuation && this.push(new ce("w:overflowPunct", e.overflowPunctuation));
    const s = [
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
    s.length > 0 && this.push(Yc(s)), e.bidirectional !== void 0 && this.push(new ce("w:bidi", e.bidirectional)), e.spacing && this.push(Xc(e.spacing)), e.indent && this.push(el(e.indent)), e.contextualSpacing !== void 0 && this.push(new ce("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Yi(e.bidirectional && hh[e.alignment] || e.alignment)), e.outlineLevel !== void 0 && this.push(nh(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ce("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ce("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new bl(e.run)), e.revision && this.push(new ii(e.revision));
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
    const t = this.root.findIndex((r) => r instanceof ii);
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
    if (!(e.viewWrapper instanceof $a)) for (const t of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t.reference, t.instance);
    return super.prepForXml(e);
  }
}, ii = class extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new At(fe(fe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, _e = class extends Fn {
  constructor(e) {
    if (super("w:p"), J(this, "properties", void 0), typeof e == "string")
      return this.properties = new At({}), this.root.push(this.properties), this.root.push(new Ie(e)), this;
    if (this.properties = new At(e), this.root.push(this.properties), e.text && this.root.push(new Ie(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Wa) {
        this.root.push(...t.writtenAs);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof Ua) {
      const r = this.root.indexOf(t), n = new Rr(t.options.children, kn());
      e.viewWrapper.Relationships.addRelationship(n.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", t.options.link, ya.EXTERNAL), this.root[r] = n;
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
function fh(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.includes(n)) continue;
    r[n] = e[n];
  }
  return r;
}
function Ga(e, t) {
  if (e == null) return {};
  var r, n, s = fh(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (s[r] = e[r]);
  }
  return s;
}
var dh = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, ph = fe(fe({}, dh), {}, { BOTH: "both" }), Ht = ph, Ka = (e) => new se({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), mh = ({ space: e, count: t, separate: r, equalWidth: n, children: s }) => new se({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : Ce(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : Se(t)
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
  children: !n && s ? s : void 0
}), vh = ({ type: e, linePitch: t, charSpace: r }) => new se({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: Se(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? Se(r) : void 0
    }
  }
}), Et = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, ai = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, jr = (e, t) => new se({
  name: e,
  attributes: {
    type: {
      key: "w:type",
      value: t.type || Et.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${t.id}`
    }
  }
}), wh = ({ countBy: e, start: t, restart: r, distance: n }) => new se({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : Se(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : Se(t)
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
}), Va = ({ name: e, position: t, numberFormat: r, start: n, restart: s }) => new se({
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
        value: Se(n)
      } }
    })],
    ...s === void 0 ? [] : [new se({
      name: "w:numRestart",
      attributes: { val: {
        key: "w:val",
        value: s
      } }
    })]
  ]
}), gh = (e) => Va(fe({ name: "w:footnotePr" }, e)), yh = (e) => Va(fe({ name: "w:endnotePr" }, e)), si = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, bh = class extends ot {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new si({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new si({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}, _h = (e, t, r, n, s, i, u) => new se({
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
      value: Ce(s)
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
}), xh = {
  /** En dash separator (–), written as `enDash` */
  EN_DASH: "endash"
}, Eh = ({ start: e, formatType: t, separator: r, chapterHeadingLevel: n }) => new se({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : Se(e)
    },
    formatType: {
      key: "w:fmt",
      value: t
    },
    separator: {
      key: "w:chapSep",
      value: r === xh.EN_DASH ? "enDash" : r
    },
    chapterHeadingLevel: {
      key: "w:chapStyle",
      value: n === void 0 ? void 0 : Se(n)
    }
  }
}), yr = {
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
}, Th = ({ width: e, height: t, orientation: r, code: n }) => {
  const s = Ce(e), i = Ce(t);
  return new se({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === yr.LANDSCAPE ? i : s
      },
      height: {
        key: "w:h",
        value: r === yr.LANDSCAPE ? s : i
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
}, Sh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, Ah = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Sh({ val: e }));
  }
}, kh = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Ch = (e) => new se({
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
}, dr = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: yr.PORTRAIT
}, ln = class qa extends ae {
  constructor({ page: { size: { width: t = dr.WIDTH, height: r = dr.HEIGHT, orientation: n = dr.ORIENTATION, code: s } = {}, margin: { top: i = Ge.TOP, right: u = Ge.RIGHT, bottom: a = Ge.BOTTOM, left: c = Ge.LEFT, header: d = Ge.HEADER, footer: w = Ge.FOOTER, gutter: v = Ge.GUTTER } = {}, pageNumbers: E = {}, borders: m, textDirection: f } = {}, grid: { linePitch: y = 360, charSpace: _, type: k } = {}, headerWrapperGroup: x = {}, footerWrapperGroup: T = {}, lineNumbers: S, titlePage: A, verticalAlign: b, column: P, type: M, footnoteProperties: R, endnoteProperties: K, revision: ee } = {}) {
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
    ), this.availableTextWidth = qa.calculateAvailableTextWidth({
      pageWidth: n === yr.LANDSCAPE ? r : t,
      left: c,
      right: u,
      gutter: v,
      column: P
    }), this.addHeaderFooterGroup(ai.HEADER, x), this.addHeaderFooterGroup(ai.FOOTER, T), R && this.root.push(gh(R)), K && this.root.push(yh(K)), M && this.root.push(Ch(M)), this.root.push(Th({
      width: t,
      height: r,
      orientation: n,
      code: s
    })), this.root.push(_h(i, u, a, c, d, w, v)), m && this.root.push(new bh(m)), S && this.root.push(wh(S)), this.root.push(Eh(E)), P && this.root.push(mh(P)), b && this.root.push(Ka(b)), A !== void 0 && this.root.push(new ce("w:titlePg", A)), f && this.root.push(new Ah(f)), this.root.push(vh({
      linePitch: y,
      charSpace: _,
      type: k
    })), ee && this.root.push(new Ih(ee));
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
  static calculateAvailableTextWidth({ pageWidth: t, left: r, right: n, gutter: s, column: i }) {
    var u, a;
    const c = _t(t) - _t(r) - _t(n) - _t(s), d = (u = i?.count) !== null && u !== void 0 ? u : 1;
    return d <= 1 ? c : (c - _t((a = i?.space) !== null && a !== void 0 ? a : 720) * (d - 1)) / d;
  }
  addHeaderFooterGroup(t, r) {
    r.default && this.root.push(jr(t, {
      type: Et.DEFAULT,
      id: r.default.View.ReferenceId
    })), r.first && this.root.push(jr(t, {
      type: Et.FIRST,
      id: r.first.View.ReferenceId
    })), r.even && this.root.push(jr(t, {
      type: Et.EVEN,
      id: r.even.View.ReferenceId
    }));
  }
}, Ih = class extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new ln(e));
  }
}, Xa = class extends ae {
  constructor({ pageNumbers: e } = {}) {
    super("w:body"), J(this, "sections", []), J(
      this,
      /**
      * Section properties that were moved into a paragraph at the end of their section
      * by {@link addSection}, keyed by that paragraph. Used to find the section that
      * governs a given child of the body, and to write each section's properties into
      * its paragraph while the body is written.
      */
      "sectionParagraphs",
      /* @__PURE__ */ new Map()
    ), J(this, "headingBookmarkIds", new hc()), J(this, "pageNumbers", void 0), this.pageNumbers = e;
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
      if (n instanceof ln) return n;
      const s = this.sectionParagraphs.get(n);
      if (s) return s;
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
    this.sections.push(new ln(e));
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
    return Tc(t, e, this.headingBookmarkIds), this.pageNumbers && (Rc(t, e), Nc(t, e, this.pageNumbers)), t;
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
    const t = e instanceof _e ? this.sectionParagraphs.get(e) : void 0;
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
    return e instanceof _e && e !== this.root[0] && !this.sectionParagraphs.has(e) && this.root.indexOf(e) === this.root.length - 1 ? e : void 0;
  }
  /**
  * An empty paragraph to end a section that has no paragraph of its own to end it. The section's
  * properties are written into it with the others, when the body is written.
  */
  createSectionParagraph() {
    return new _e({});
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
}, Xt = (e, { type: t = Ne.AUTO, size: r }) => {
  let n = r;
  return t === Ne.PERCENTAGE && typeof r == "number" && (n = Math.round(r * 50)), new se({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: Xi(n)
      }
    }
  });
}, pr = dr.WIDTH - Ge.LEFT - Ge.RIGHT - Ge.GUTTER, Za = (e) => e.options.columnSpan || 1, Ln = (e, t) => {
  if (!e) return;
  const { type: r = Ne.AUTO, size: n } = e;
  if (r !== Ne.PERCENTAGE && r !== Ne.DXA) return;
  const s = typeof n == "number" ? r === Ne.PERCENTAGE ? n / 100 * t : n : n.endsWith("%") ? Number(n.slice(0, -1)) / 100 * t : _t(n);
  return s > 0 ? s : void 0;
}, Rh = (e, t) => {
  var r;
  return (r = Ln(e, t)) !== null && r !== void 0 ? r : t;
}, Nh = (e) => Math.max(0, ...e.map((t) => t.cells.reduce((r, n) => r + Za(n), 0))), oi = ({ rows: e, width: t, availableWidth: r }) => {
  const n = Nh(e);
  if (n === 0) return [];
  const s = Rh(t, r), i = Array.from({ length: n }, () => {
  }), u = [];
  for (const w of e) {
    let v = 0;
    for (const E of w.cells) {
      const m = Za(E), f = Ln(E.options.width, s);
      if (f !== void 0)
        if (m === 1) {
          var a, c;
          (c = i[a = v]) !== null && c !== void 0 || (i[a] = f);
        } else u.push({
          start: v,
          span: m,
          width: f
        });
      v += m;
    }
  }
  for (const { start: w, span: v, width: E } of u) {
    const m = Array.from({ length: v }, (_, k) => w + k).filter((_) => _ < n), f = m.filter((_) => i[_] === void 0), y = E - m.reduce((_, k) => {
      var x;
      return _ + ((x = i[k]) !== null && x !== void 0 ? x : 0);
    }, 0);
    if (f.length > 0 && y > 0) for (const _ of f) i[_] = y / f.length;
  }
  const d = i.flatMap((w, v) => w === void 0 ? [v] : []);
  if (d.length > 0) {
    const w = s - i.reduce((E, m) => E + (m ?? 0), 0), v = w > 0 ? w / d.length : s / n;
    for (const E of d) i[E] = v;
  }
  return i.map((w) => Math.round(w));
}, Oh = (e) => new se({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: Ce(e)
  } } : void 0
}), mr = class extends ae {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(Oh(r));
    t && this.root.push(new Fh(t));
  }
}, Ph = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, Fh = class extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new Ph({ id: e.id })), this.root.push(new mr(e.columnWidths));
  }
}, Dh = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Lh = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Bh = class extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Mh = class extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Uh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Wh = class extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new Uh(e));
  }
}, Ya = ({ marginUnitType: e = Ne.DXA, top: t, left: r, bottom: n, right: s }) => [
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
    size: s
  }
].filter((i) => i.size !== void 0).map(({ name: i, size: u }) => Xt(i, {
  type: e,
  size: u
})), jh = (e) => {
  const t = Ya(e);
  if (t.length !== 0)
    return new se({
      name: "w:tblCellMar",
      children: t
    });
}, zh = (e) => {
  const t = Ya(e);
  if (t.length !== 0)
    return new se({
      name: "w:tcMar",
      children: t
    });
}, Hh = class extends ot {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}, $h = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, Gh = class extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new $h({ val: Se(e) }));
  }
}, Ja = {
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
}, Kh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, li = class extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(new Kh({ val: e }));
  }
}, Vh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, qh = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Vh({ val: e }));
  }
}, Qa = class extends ot {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), J(this, "hasWidth", void 0), J(this, "hasColumnWidth", !1), this.hasWidth = e.width !== void 0, e.width && this.root.push(Xt("w:tcW", e.width)), e.columnSpan && this.root.push(new Gh(e.columnSpan)), e.verticalMerge ? this.root.push(new li(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new li(Ja.RESTART)), e.borders && this.root.push(new Hh(e.borders)), e.shading && this.root.push(Ar(e.shading)), e.margins) {
      const t = zh(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new qh(e.textDirection)), e.verticalAlign && this.root.push(Ka(e.verticalAlign)), e.insertion && this.root.push(new Bh(e.insertion)), e.deletion && this.root.push(new Mh(e.deletion)), e.cellMerge && this.root.push(new Wh(e.cellMerge)), e.revision && this.root.push(new Xh(e.revision));
  }
  /**
  * Gives a cell without a width of its own the width of the table's columns it spans, in twips.
  *
  * @internal
  */
  setColumnWidth(e) {
    this.hasWidth || (this.root.splice(0, this.hasColumnWidth ? 1 : 0, Xt("w:tcW", {
      size: e,
      type: Ne.DXA
    })), this.hasColumnWidth = !0);
  }
}, Xh = class extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Qa(fe(fe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, br = class extends ae {
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
    ), J(this, "properties", void 0), this.options = e, this.properties = new Qa(e), this.root.push(this.properties);
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
    return this.root[this.root.length - 1] instanceof _e || this.root.push(new _e({})), super.prepForXml(e);
  }
}, un = (e, t) => t ? new ce(e) : new rt(e, "off"), yt = {
  style: Le.NONE,
  size: 0,
  color: "auto"
}, bt = {
  style: Le.SINGLE,
  size: 4,
  color: "auto"
}, es = class extends ae {
  constructor(e) {
    var t, r, n, s, i, u;
    super("w:tblBorders"), this.root.push(be("w:top", (t = e.top) !== null && t !== void 0 ? t : bt)), this.root.push(be("w:left", (r = e.left) !== null && r !== void 0 ? r : bt)), this.root.push(be("w:bottom", (n = e.bottom) !== null && n !== void 0 ? n : bt)), this.root.push(be("w:right", (s = e.right) !== null && s !== void 0 ? s : bt)), this.root.push(be("w:insideH", (i = e.insideHorizontal) !== null && i !== void 0 ? i : bt)), this.root.push(be("w:insideV", (u = e.insideVertical) !== null && u !== void 0 ? u : bt));
  }
};
J(es, "NONE", {
  top: yt,
  bottom: yt,
  left: yt,
  right: yt,
  insideHorizontal: yt,
  insideVertical: yt
});
var Zh = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: n, absoluteVerticalPosition: s, relativeVerticalPosition: i, bottomFromText: u, topFromText: a, leftFromText: c, rightFromText: d }) => new se({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: c === void 0 ? void 0 : Ce(c)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: d === void 0 ? void 0 : Ce(d)
    },
    topFromText: {
      key: "w:topFromText",
      value: a === void 0 ? void 0 : Ce(a)
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
      value: s === void 0 ? void 0 : Ve(s)
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
}), zr = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, Yh = (e) => new se({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), Jh = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, ts = ({ type: e = Jh.DXA, value: t }) => new se({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: Xi(t)
    }
  }
}), Qh = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: n, noHBand: s, noVBand: i }) => new se({
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
      value: s
    },
    noVBand: {
      key: "w:noVBand",
      value: i
    }
  }
}), ef = (e) => new se({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Bn = class extends ot {
  constructor(e) {
    var t;
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new rt("w:tblStyle", e.style)), e.float && this.root.push(Zh(e.float)), !((t = e.float) === null || t === void 0) && t.overlap && this.root.push(ef(e.float.overlap)), e.visuallyRightToLeft !== void 0 && this.root.push(un("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(Xt("w:tblW", e.width)), e.alignment && this.root.push(Yi(e.alignment)), e.cellSpacing && this.root.push(ts(e.cellSpacing)), e.indent && this.root.push(Xt("w:tblInd", e.indent)), e.borders && this.root.push(new es(e.borders)), e.shading && this.root.push(Ar(e.shading)), e.layout && this.root.push(Yh(e.layout)), e.cellMargin) {
      const r = jh(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(Qh(e.tableLook)), e.revision && this.root.push(new tf(e.revision));
  }
}, tf = class extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Bn(fe(fe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, rf = (e, t) => new se({
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
}), rs = class extends ot {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(un("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(un("w:tblHeader", e.tableHeader)), e.height && this.root.push(rf(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(ts(e.cellSpacing)), e.insertion && this.root.push(new Dh(e.insertion)), e.deletion && this.root.push(new Lh(e.deletion)), e.revision && this.root.push(new nf(e.revision));
  }
}, nf = class extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Fe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new rs(fe(fe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, ns = class extends ae {
  constructor(e) {
    super("w:tr"), J(this, "options", void 0), this.options = e, this.root.push(new rs(e));
    for (const t of e.children) this.root.push(t);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof br);
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
      const s = this.root[n];
      n += 1, r += s && s.options.columnSpan || 1;
    }
    return n - 1;
  }
}, af = class is extends Fn {
  constructor({ rows: t, width: r, columnWidths: n, columnWidthsRevision: s, margins: i, indent: u, float: a, layout: c, style: d, borders: w, alignment: v, visuallyRightToLeft: E, tableLook: m, cellSpacing: f, revision: y }) {
    super("w:tbl"), J(this, "rows", void 0), J(this, "width", void 0), J(this, "columnWidths", void 0), J(this, "columnWidthsRevision", void 0), J(
      this,
      /**
      * Grid column widths in twips: the explicit `columnWidths`, or the widths derived
      * from the table and cell widths (re-resolved against the actual page or parent
      * cell every time the table is serialized).
      */
      "resolvedColumnWidths",
      void 0
    ), this.rows = t, this.width = r ?? { size: 100 }, this.columnWidths = n, this.columnWidthsRevision = s, t.forEach((_, k) => {
      if (k === t.length - 1) return;
      let x = 0;
      _.cells.forEach((T) => {
        if (T.options.rowSpan && T.options.rowSpan > 1) {
          const S = new br({
            rowSpan: T.options.rowSpan - 1,
            columnSpan: T.options.columnSpan,
            borders: T.options.borders,
            children: [],
            verticalMerge: Ja.CONTINUE
          });
          t[k + 1].addCellToColumnIndex(S, x);
        }
        x += T.options.columnSpan || 1;
      });
    }), this.setCellWidths(pr), this.resolvedColumnWidths = n ?? oi({
      rows: t,
      width: this.width,
      availableWidth: pr
    }), this.root.push(new Bn({
      borders: w ?? {},
      width: this.width,
      indent: u,
      float: a,
      layout: c,
      style: d,
      alignment: v,
      cellMargin: i,
      visuallyRightToLeft: E,
      tableLook: m,
      cellSpacing: f,
      revision: y
    })), this.root.push(new mr(this.resolvedColumnWidths, s));
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
    const { cells: n } = t, s = n.indexOf(r);
    if (s === -1) return;
    const i = n.slice(0, s).reduce((a, c) => a + (c.options.columnSpan || 1), 0), u = this.resolvedColumnWidths.slice(i, i + (r.options.columnSpan || 1));
    return u.length === 0 ? void 0 : u.reduce((a, c) => a + c, 0);
  }
  /**
  * Resolves derived grid column widths against the width actually available to the
  * table (the section's text width, or the parent cell for nested tables) before
  * serializing.
  */
  prepForXml(t) {
    if (this.setCellWidths(this.resolveAvailableWidth(t)), this.columnWidths === void 0) {
      this.resolvedColumnWidths = oi({
        rows: this.rows,
        width: this.width,
        availableWidth: this.resolveAvailableWidth(t)
      });
      const r = this.root.findIndex((n) => n instanceof mr);
      this.root[r] = new mr(this.resolvedColumnWidths, this.columnWidthsRevision);
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
    const n = this.columnWidths.reduce((u, a) => u + a, 0), s = (r = Ln(this.width, t)) !== null && r !== void 0 ? r : 0, i = n > 0 && s > n ? s / n : 1;
    for (const u of this.rows) {
      let a = 0;
      for (const c of u.cells) {
        const d = c.options.columnSpan || 1, w = this.columnWidths.slice(a, a + d), v = Math.round(w.reduce((E, m) => E + m, 0) * i);
        w.length === d && v > 0 && c.setColumnWidth(v), a += d;
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
    var r, n, s;
    const { stack: i } = t, u = i[i.length - 1], a = i[i.length - 2], c = i[i.length - 3];
    if (u instanceof br && a instanceof ns && c instanceof is) {
      const E = c.getCellWidth(a, u);
      if (E !== void 0) return E;
    }
    const d = i.findIndex((E) => E instanceof Xa), w = (r = t.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 ? void 0 : r.View.Body, v = d >= 0 ? i[d].getSectionPropertiesFor((n = i[d + 1]) !== null && n !== void 0 ? n : this) : w?.getSectionPropertiesFor();
    return (s = v?.AvailableTextWidth) !== null && s !== void 0 ? s : pr;
  }
}, sf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, of = class extends ae {
  constructor() {
    super("Properties"), this.root.push(new sf({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, lf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns" });
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
}), uf = class extends ae {
  constructor() {
    super("Types"), this.root.push(new lf({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(Qe("image/png", "png")), this.root.push(Qe("image/jpeg", "jpeg")), this.root.push(Qe("image/jpeg", "jpg")), this.root.push(Qe("image/bmp", "bmp")), this.root.push(Qe("image/gif", "gif")), this.root.push(Qe("image/svg+xml", "svg")), this.root.push(Qe("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Qe("application/xml", "xml")), this.root.push(Qe("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(ke("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")), this.root.push(ke("application/vnd.openxmlformats-officedocument.theme+xml", "/word/theme/theme1.xml"));
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
}, ui = {
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
}, Nr = class extends ve {
  constructor(e, t) {
    super(fe({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, ui[r]])))), J(this, "xmlKeys", fe({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(ui).map((r) => [r, `xmlns:${r}`]))));
  }
}, cf = class extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new Nr([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new ft("dc:title", e.title)), e.subject && this.root.push(new ft("dc:subject", e.subject)), e.creator && this.root.push(new ft("dc:creator", e.creator)), e.keywords && this.root.push(new ft("cp:keywords", e.keywords)), e.description && this.root.push(new ft("dc:description", e.description)), e.lastModifiedBy && this.root.push(new ft("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new ft("cp:revision", String(e.revision))), this.root.push(new ci("dcterms:created")), this.root.push(new ci("dcterms:modified"));
  }
}, hf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { type: "xsi:type" });
  }
}, ci = class extends ae {
  constructor(e) {
    super(e), this.root.push(new hf({ type: "dcterms:W3CDTF" })), this.root.push(Uo(/* @__PURE__ */ new Date()));
  }
}, ff = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, df = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, pf = class extends ae {
  constructor(e, t) {
    super("property"), this.root.push(new df({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new mf(t.value));
  }
}, mf = class extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, vf = class extends ae {
  constructor(e) {
    super("Properties"), J(this, "nextId", void 0), J(this, "properties", []), this.root.push(new ff({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.root.splice(1, this.root.length - 1, ...this.properties), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new pf(this.nextId++, e));
  }
}, wf = class extends ae {
  /**
  * @throws If a color isn't valid, or `color` is a theme color and `themeColor`, `themeShade` or `themeTint` is given
  */
  constructor({ color: e, themeColor: t, themeShade: r, themeTint: n }) {
    if (super("w:background"), typeof e == "object" && (t !== void 0 || r !== void 0 || n !== void 0)) throw new Error("Invalid background. Expected a theme color in color, or themeColor, themeShade and themeTint, not both");
    this.root.push(new Tn([
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
        value: r === void 0 ? void 0 : Kn(r)
      },
      {
        key: "w:themeTint",
        value: n === void 0 ? void 0 : Kn(n)
      }
    ]));
  }
}, gf = class extends ae {
  constructor(e) {
    super("w:document"), J(this, "body", void 0), this.root.push(new Nr([
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
    ], "w14 w15 wp14")), this.body = new Xa({ pageNumbers: e.pageNumbers }), e.background && this.root.push(new wf(e.background)), this.root.push(this.body);
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
}, yf = class {
  constructor(e) {
    J(this, "document", void 0), J(this, "relationships", void 0), this.document = new gf(e), this.relationships = new Re();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, bf = class extends ve {
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
}, _f = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, xf = class extends Me {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new Gc());
  }
}, hi = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Hr = class extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(new _f({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new xf()), this.root.push(r);
    }
  }
}, Ef = class extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}, as = class extends Me {
  constructor() {
    super({}), this.root.push(new Ef());
  }
}, Tf = class extends ae {
  constructor() {
    super("w:separator");
  }
}, ss = class extends Me {
  constructor() {
    super({}), this.root.push(new Tf());
  }
}, Sf = class extends ae {
  constructor() {
    super("w:endnotes"), this.root.push(new bf({
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
    const e = new Hr({
      id: -1,
      type: hi.SEPARATOR,
      children: [new _e({
        spacing: {
          after: 0,
          line: 240,
          lineRule: St.AUTO
        },
        children: [new ss()]
      })]
    });
    this.root.push(e);
    const t = new Hr({
      id: 0,
      type: hi.CONTINUATION_SEPARATOR,
      children: [new _e({
        spacing: {
          after: 0,
          line: 240,
          lineRule: St.AUTO
        },
        children: [new as()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new Hr({
      id: e,
      children: t
    });
    this.root.push(r);
  }
  /**
  * Formats the endnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Af = class {
  constructor() {
    J(this, "endnotes", void 0), J(this, "relationships", void 0), this.endnotes = new Sf(), this.relationships = new Re();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, kf = class extends ve {
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
}, Cf = class extends Gi {
  constructor(e, t) {
    super("w:ftr", t), J(this, "refId", void 0), this.refId = e, t || this.root.push(new kf({
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
}, If = class {
  constructor(e, t, r) {
    J(this, "media", void 0), J(this, "footer", void 0), J(this, "relationships", void 0), this.media = e, this.footer = new Cf(t, r), this.relationships = new Re();
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
}, Rf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Nf = class extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}, Of = class extends Me {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new Nf());
  }
}, fi = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, $r = class extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(new Rf({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new Of()), this.root.push(r);
    }
  }
}, Pf = class extends ve {
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
}, Ff = class extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(new Pf({
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
    const e = new $r({
      id: -1,
      type: fi.SEPERATOR,
      children: [new _e({
        spacing: {
          after: 0,
          line: 240,
          lineRule: St.AUTO
        },
        children: [new ss()]
      })]
    });
    this.root.push(e);
    const t = new $r({
      id: 0,
      type: fi.CONTINUATION_SEPERATOR,
      children: [new _e({
        spacing: {
          after: 0,
          line: 240,
          lineRule: St.AUTO
        },
        children: [new as()]
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
    const r = new $r({
      id: e,
      children: t
    });
    this.root.push(r);
  }
  /**
  * Formats the footnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Df = class {
  constructor() {
    J(this, "footnotess", void 0), J(this, "relationships", void 0), this.footnotess = new Ff(), this.relationships = new Re();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Lf = class extends ve {
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
}, Bf = class extends Gi {
  constructor(e, t) {
    super("w:hdr", t), J(this, "refId", void 0), this.refId = e, t || this.root.push(new Lf({
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
}, Mf = class {
  constructor(e, t, r) {
    J(this, "media", void 0), J(this, "header", void 0), J(this, "relationships", void 0), this.media = e, this.header = new Bf(t, r), this.relationships = new Re();
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
}, Uf = class {
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
}, et = {
  /** Bullet points. */
  BULLET: "bullet"
}, Wf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w:tentative"
    });
  }
}, jf = class extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Pe({ val: e }));
  }
}, zf = class extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Pe({ val: e }));
  }
}, Hf = (e) => {
  switch (e) {
    case Te.CENTER:
      return "center";
    case Te.END:
    case Te.RIGHT:
      return "right";
    default:
      return "left";
  }
}, $f = class extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Pe({ val: Hf(e) }));
  }
}, Gf = class extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(new Pe({ val: e }));
  }
}, Kf = class extends ae {
  constructor() {
    super("w:isLgl");
  }
}, Vf = class extends ae {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: n = Te.START, start: s = 1, style: i, suffix: u, isLegalNumberingStyle: a }) {
    if (super("w:lvl"), J(this, "paragraphProperties", void 0), J(this, "runProperties", void 0), this.root.push(new Gt("w:start", Se(s))), t && this.root.push(new jf(t)), i?.style && this.root.push(zt(i.style)), a && this.root.push(new Kf()), u && this.root.push(new Gf(u)), r && this.root.push(new zf(r)), this.root.push(new $f(n)), this.paragraphProperties = new At(i && i.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new ct(i?.run && fe(fe({}, i.run), {}, {
      highlight: void 0,
      math: void 0,
      revision: void 0
    })), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Wf({
      ilvl: Se(e),
      tentative: 1
    }));
  }
}, qf = class extends Vf {
}, Xf = class extends ae {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Pe({ val: e }));
  }
}, Zf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, di = class extends ae {
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
    ), this.root.push(new Zf({
      abstractNumId: Se(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Xf("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new qf(r));
  }
}, Yf = class extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Pe({ val: e }));
  }
}, Jf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { numId: "w:numId" });
  }
}, pi = class extends ae {
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
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new Jf({ numId: Se(e.numId) })), this.root.push(new Yf(Se(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new ed(t.num, t.start));
  }
}, Qf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, ed = class extends ae {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new Qf({ ilvl: e })), t !== void 0 && this.root.push(new rd(t));
  }
}, td = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, rd = class extends ae {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new td({ val: e }));
  }
}, nd = class extends ae {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), J(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), J(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), J(this, "referenceConfigMap", /* @__PURE__ */ new Map()), J(this, "abstractNumUniqueNumericId", Ol()), J(this, "concreteNumUniqueNumericId", Pl()), this.root.push(new Nr([
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
    const t = new di(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: et.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: Ue(0.5),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 1,
        format: et.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: Ue(1),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 2,
        format: et.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 3,
        format: et.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 4,
        format: et.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 5,
        format: et.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 6,
        format: et.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 7,
        format: et.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 8,
        format: et.BULLET,
        text: "●",
        alignment: Te.LEFT,
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
      this.abstractNumberingMap.set(r.reference, new di(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
  */
  createConcreteNumberingInstance(e, t) {
    const r = this.abstractNumberingMap.get(e);
    if (!r) return;
    const n = `${e}-${t}`;
    if (this.concreteNumberingMap.has(n)) return;
    const s = this.referenceConfigMap.get(e), i = s && s[0].start, u = {
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
    this.concreteNumberingMap.set(n, new pi(u));
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
}, id = class {
  /**
  * @param contentTypes - Where each part's content type is added
  * @param existingPaths - The paths under word/ of the parts the package already has, such as a template's charts,
  * which new parts don't take
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
    const { folder: r, name: n, extension: s, contentType: i } = e.options, u = /* @__PURE__ */ new Set([...this.existingPaths, ...this.paths.values()]);
    let a = 1;
    for (; u.has(`${r}/${n}${a}.${s}`); ) a++;
    const c = `${r}/${n}${a}.${s}`;
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
}, ad = (e) => new se({
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
}), sd = class extends ae {
  constructor(e) {
    super("w:compat"), e.useSingleBorderforContiguousCells && this.root.push(new ce("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ce("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ce("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ce("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ce("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ce("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ce("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ce("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ce("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ce("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ce("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ce("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ce("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ce("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ce("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ce("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ce("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ce("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ce("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ce("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ce("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ce("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ce("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ce("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ce("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ce("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ce("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ce("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ce("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ce("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ce("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ce("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ce("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ce("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ce("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ce("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ce("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ce("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ce("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ce("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ce("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ce("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ce("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ce("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ce("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ce("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ce("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ce("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ce("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ce("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ce("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ce("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ce("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ce("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ce("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ce("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ce("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ce("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ce("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ce("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ce("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ce("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ce("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ce("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ce("w:cachedColBalance", e.cachedColumnBalance)), e.version && this.root.push(ad(e.version));
  }
}, od = class extends ve {
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
}, ld = class extends ae {
  constructor(e) {
    var t, r, n, s, i, u, a, c;
    super("w:settings"), this.root.push(new od({
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
    })), this.root.push(new ce("w:displayBackgroundShape", !0)), e.embedFonts !== void 0 && this.root.push(new ce("w:embedTrueTypeFonts", e.embedFonts)), e.trackRevisions !== void 0 && this.root.push(new ce("w:trackRevisions", e.trackRevisions)), e.defaultTabStop !== void 0 && this.root.push(new Gt("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) === null || t === void 0 ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new ce("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.consecutiveHyphenLimit) !== void 0 && this.root.push(new Gt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((n = e.hyphenation) === null || n === void 0 ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new Gt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((s = e.hyphenation) === null || s === void 0 ? void 0 : s.doNotHyphenateCaps) !== void 0 && this.root.push(new ce("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), e.evenAndOddHeaders !== void 0 && this.root.push(new ce("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ce("w:updateFields", e.updateFields)), this.root.push(new sd(fe(fe({}, (i = e.compatibility) !== null && i !== void 0 ? i : {}), {}, { version: (u = (a = (c = e.compatibility) === null || c === void 0 ? void 0 : c.version) !== null && a !== void 0 ? a : e.compatibilityModeVersion) !== null && u !== void 0 ? u : 15 })));
  }
}, os = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, ud = class extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new os({ val: e }));
  }
}, cd = class extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new os({ val: Se(e) }));
  }
}, hd = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, Mn = class extends ae {
  constructor(e, t) {
    super("w:style"), this.root.push(new hd(e)), t.name && this.root.push(new ud(t.name)), t.basedOn && this.root.push(new rt("w:basedOn", t.basedOn)), t.next && this.root.push(new rt("w:next", t.next)), t.link && this.root.push(new rt("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new cd(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new ce("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new ce("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new ce("w:qFormat", t.quickFormat));
  }
}, It = class extends Mn {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), J(this, "paragraphProperties", void 0), J(this, "runProperties", void 0), this.paragraphProperties = new At(e.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new ct(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, Rt = class extends Mn {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, fe({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), J(this, "runProperties", void 0), this.runProperties = new ct(e.run), this.root.push(this.runProperties);
  }
}, ht = class extends It {
  constructor(e) {
    super(fe({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, fd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Title",
      name: "Title"
    }, e));
  }
}, dd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, pd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, md = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, vd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, wd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, gd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, yd = class extends ht {
  constructor(e) {
    super(fe({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, bd = class extends It {
  constructor(e) {
    super(fe({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, _d = class extends It {
  constructor(e) {
    super(fe({
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
        lineRule: St.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, xd = class extends Rt {
  constructor(e) {
    super(fe({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Ed = class extends Rt {
  constructor(e) {
    super(fe({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Td = class extends It {
  constructor(e) {
    super(fe({
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
        lineRule: St.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Sd = class extends Rt {
  constructor(e) {
    super(fe({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Ad = class extends Rt {
  constructor(e) {
    super(fe({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, kd = class extends Rt {
  constructor(e) {
    super(fe({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: aa.SINGLE }
      }
    }, e));
  }
}, Cd = class extends Mn {
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
    }), this.root.push(new Bn({
      indent: {
        size: 0,
        type: Ne.DXA
      },
      cellMargin: {
        top: 0,
        left: 108,
        bottom: 0,
        right: 108
      }
    }));
  }
}, Mt = (e) => typeof e == "object" ? Object.keys(e)[0] : void 0, Un = (e) => {
  var t;
  return (t = [e["w:style"]].flat().find((r) => r._attr)) === null || t === void 0 ? void 0 : t._attr;
}, mi = (e) => {
  var t;
  return (t = Un(e)) === null || t === void 0 ? void 0 : t["w:styleId"];
}, Id = (e) => {
  var t;
  const r = Un(e);
  return ((t = r?.["w:type"]) !== null && t !== void 0 ? t : "paragraph") === "paragraph" && r?.["w:default"] !== void 0 && ![
    "0",
    "false",
    "off"
  ].includes(String(r["w:default"]));
}, Rd = (e) => ({ "w:style": [e["w:style"]].flat().map((t) => t._attr ? { _attr: fe(fe({}, t._attr), {}, { "w:default": "1" }) } : t) }), Gr = class extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new It(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new Rt(t));
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
    const n = (a) => r.filter((c) => Mt(c) === a), s = r.map((a) => Mt(a) === "w:style" ? mi(a) : void 0), i = r.filter((a, c) => ![
      "_attr",
      "w:docDefaults",
      "w:latentStyles"
    ].includes(Mt(a)) && (s[c] === void 0 || s.lastIndexOf(s[c]) === c)), u = i.some((a) => Mt(a) === "w:style" && Id(a)) ? i : i.map((a) => {
      var c, d;
      return Mt(a) === "w:style" && mi(a) === "Normal" && ((c = (d = Un(a)) === null || d === void 0 ? void 0 : d["w:type"]) !== null && c !== void 0 ? c : "paragraph") === "paragraph" ? Rd(a) : a;
    });
    return { "w:styles": [
      ...n("_attr"),
      ...n("w:docDefaults").slice(-1),
      ...n("w:latentStyles").slice(-1),
      ...u
    ] };
  }
}, Nd = class extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new At(e, { implicitListParagraphStyle: !1 }));
  }
}, Od = class extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new ct(e));
  }
}, Pd = class extends ae {
  constructor(e) {
    super("w:docDefaults"), J(this, "runPropertiesDefaults", void 0), J(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new Od(e.run), this.paragraphPropertiesDefaults = new Nd(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, Fd = class {
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
    const t = (0, $i.xml2js)(e, { compact: !1 });
    let r;
    for (const s of t.elements || []) s.name === "w:styles" && (r = s);
    if (r === void 0) throw new Error("can not find styles element");
    const n = r.elements || [];
    return {
      initialStyles: new Po(r.attributes),
      importedStyles: n.map((s) => _n(s))
    };
  }
}, ls = (e = {}) => {
  var t;
  return {
    normal: new It({
      id: "Normal",
      name: "Normal",
      quickFormat: !0
    }),
    normalTable: new Cd(),
    document: new Pd((t = e.document) !== null && t !== void 0 ? t : {}),
    title: new fd(fe({ run: { size: 56 } }, e.title)),
    heading1: new dd(fe({ run: {
      color: "2E74B5",
      size: 32
    } }, e.heading1)),
    heading2: new pd(fe({ run: {
      color: "2E74B5",
      size: 26
    } }, e.heading2)),
    heading3: new md(fe({ run: {
      color: "1F4D78",
      size: 24
    } }, e.heading3)),
    heading4: new vd(fe({ run: {
      color: "2E74B5",
      italics: !0
    } }, e.heading4)),
    heading5: new wd(fe({ run: { color: "2E74B5" } }, e.heading5)),
    heading6: new gd(fe({ run: { color: "1F4D78" } }, e.heading6)),
    strong: new yd(fe({ run: { bold: !0 } }, e.strong)),
    listParagraph: new bd(e.listParagraph || {}),
    hyperlink: new kd(e.hyperlink || {}),
    footnoteReference: new xd(e.footnoteReference || {}),
    footnoteText: new _d(e.footnoteText || {}),
    footnoteTextChar: new Ed(e.footnoteTextChar || {}),
    endnoteReference: new Sd(e.endnoteReference || {}),
    endnoteText: new Td(e.endnoteText || {}),
    endnoteTextChar: new Ad(e.endnoteTextChar || {})
  };
}, vi = class {
  newInstance(e = {}) {
    return {
      initialStyles: new Nr([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: Object.values(ls(e))
    };
  }
}, us = {
  headings: {
    latin: "Calibri Light",
    panose: "020F0302020204030204"
  },
  body: {
    latin: "Calibri",
    panose: "020F0502020204030204"
  }
}, Dd = [
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
], Kr = (e, t, r) => new se({
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
}), Ld = (e, t) => {
  const r = t[e], n = typeof r == "string" ? r : r?.latin;
  return n ?? us[e].latin;
}, wi = (e, t) => {
  const r = t[e], { eastAsia: n = "", complexScript: s = "" } = typeof r == "object" ? r : {}, i = Ld(e, t), u = us[e];
  return new se({
    name: e === "headings" ? "a:majorFont" : "a:minorFont",
    children: [
      Kr("a:latin", i, i === u.latin ? u.panose : void 0),
      Kr("a:ea", n),
      Kr("a:cs", s),
      ...Dd.map(([a, c, d = c]) => new se({
        name: "a:font",
        attributes: {
          script: {
            key: "script",
            value: a
          },
          typeface: {
            key: "typeface",
            value: e === "headings" ? c : d
          }
        }
      }))
    ]
  });
}, Bd = (e, t = {}) => new se({
  name: "a:fontScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: [wi("headings", t), wi("body", t)]
}), cs = (e = []) => new se({
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
}), vr = (e) => new se({
  name: "a:solidFill",
  children: [cs(e)]
}), Vr = (e) => new se({
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
      children: [cs(t)]
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
}), qr = (e) => new se({
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
    vr(),
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
}), Xr = (e) => new se({
  name: "a:effectStyle",
  children: [new se({
    name: "a:effectLst",
    children: e
  })]
}), Md = () => new se({
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
}), Ud = () => new se({
  name: "a:fmtScheme",
  attributes: { name: {
    key: "name",
    value: "Office"
  } },
  children: [
    new se({
      name: "a:fillStyleLst",
      children: [
        vr(),
        Vr([
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
        Vr([
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
        qr(6350),
        qr(12700),
        qr(19050)
      ]
    }),
    new se({
      name: "a:effectStyleLst",
      children: [
        Xr([]),
        Xr([]),
        Xr([Md()])
      ]
    }),
    new se({
      name: "a:bgFillStyleLst",
      children: [
        vr(),
        vr([["tint", 95e3], ["satMod", 17e4]]),
        Vr([
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
}), Wd = class extends ae {
  constructor({ name: e = "Office Theme", colors: t, fonts: r } = {}) {
    super("a:theme"), J(this, "colors", void 0), this.colors = ta(t), this.root.push(new hn({
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
        zo(t ? e : "Office", t),
        Bd(r ? e : "Office", r),
        Ud()
      ]
    })), this.root.push(new se({ name: "a:objectDefaults" })), this.root.push(new se({ name: "a:extraClrSchemeLst" }));
  }
  /**
  * The hex color of each of the theme's colors. The system's window text and window colors are black and white.
  */
  get Colors() {
    return this.colors;
  }
}, jd = class {
  constructor(e) {
    var t, r, n, s, i, u, a, c, d, w, v, E, m;
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
    ), J(this, "fontWrapper", void 0), J(this, "theme", void 0), J(this, "packageParts", void 0), this.coreProperties = new cf(fe(fe({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (n = e.lastModifiedBy) !== null && n !== void 0 ? n : "Un-named"
    })), this.numbering = new nd(e.numbering ? e.numbering : { config: [] }), this.comments = new Lc((s = e.comments) !== null && s !== void 0 ? s : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Wc(this.comments.ThreadData)), this.comments.CommentIdsData && (this.commentsIds = new $c(this.comments.CommentIdsData)), this.fileRelationships = new Re(), this.customProperties = new vf((i = e.customProperties) !== null && i !== void 0 ? i : []), this.appProperties = new of(), this.footnotesWrapper = new Df(), this.endnotesWrapper = new Af(), this.contentTypes = new uf(), this.packageParts = new id(this.contentTypes), this.documentWrapper = new yf({
      background: e.background,
      pageNumbers: e.pageNumbers
    }), this.settings = new ld({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (u = e.features) === null || u === void 0 ? void 0 : u.trackRevisions,
      updateFields: (a = e.features) === null || a === void 0 ? void 0 : a.updateFields,
      embedFonts: !((c = e.fonts) === null || c === void 0) && c.length ? !0 : void 0,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (d = e.hyphenation) === null || d === void 0 ? void 0 : d.autoHyphenation,
        hyphenationZone: (w = e.hyphenation) === null || w === void 0 ? void 0 : w.hyphenationZone,
        consecutiveHyphenLimit: (v = e.hyphenation) === null || v === void 0 ? void 0 : v.consecutiveHyphenLimit,
        doNotHyphenateCaps: (E = e.hyphenation) === null || E === void 0 ? void 0 : E.doNotHyphenateCaps
      }
    }), this.media = new Uf(), e.externalStyles !== void 0) {
      var f, y, _, k;
      const x = (f = (y = e.styles) === null || y === void 0 ? void 0 : y.default) !== null && f !== void 0 ? f : {}, T = Object.entries(ls(x)), S = ([b]) => x[b] !== void 0, A = new Fd().newInstance(e.externalStyles);
      this.styles = new Gr(fe(fe({}, A), {}, {
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
      this.styles = new Gr(fe(fe({}, x), e.styles));
    } else {
      const x = new vi();
      this.styles = new Gr(x.newInstance());
    }
    this.addDefaultRelationships();
    for (const x of e.sections) this.addSection(x);
    if (e.footnotes) for (const x in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(x), e.footnotes[x].children);
    if (e.endnotes) for (const x in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(x), e.endnotes[x].children);
    this.fontWrapper = new $a((m = e.fonts) !== null && m !== void 0 ? m : []), this.theme = new Wd(e.theme), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml");
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: n }) {
    this.documentWrapper.View.Body.addSection(fe(fe({}, n), {}, {
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
    for (const s of r) this.documentWrapper.View.add(s);
  }
  createHeader(e) {
    const t = new Mf(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new If(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = Et.DEFAULT) {
    this.headers.push({
      header: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = Et.DEFAULT) {
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
}, zd = class extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new rt("w:alias", e));
  }
}, Hd = [
  "contentChildren",
  "cachedEntries",
  "beginDirty"
], $d = class extends Fn {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: n = [], beginDirty: s } = t, i = Ga(t, Hd);
    super("w:sdt"), J(
      this,
      /** What it is filled in with from the headings, when it isn't given its content */
      "fromHeadings",
      void 0
    ), this.root.push(new zd(e));
    const u = new Ia(), a = [new Me({ children: [
      Ra(s),
      new Ca(i),
      mt()
    ] })], c = [new Me({ children: [vt()] })];
    if (n !== void 0 && n.length > 0) {
      const { stylesWithLevels: d } = i, w = n.map((E, m) => {
        var f, y;
        const _ = this.buildCachedContentParagraphChild(E, i), k = (f = d == null || (y = d.find((T) => T.level === E.level)) === null || y === void 0 ? void 0 : y.styleName) !== null && f !== void 0 ? f : `TOC${E.level}`, x = m === 0 ? [...a, _] : m === n.length - 1 ? [_, ...c] : [_];
        return new _e({
          style: k,
          tabStops: this.getTabStopsForLevel(E.level),
          children: x
        });
      });
      let v = w;
      n.length <= 1 && (v = [...w, new _e({ children: c })]);
      for (const E of v) u.addChildElement(E);
    } else {
      const d = new _e({ children: a });
      u.addChildElement(d);
      for (const v of r) u.addChildElement(v);
      const w = new _e({ children: c });
      u.addChildElement(w), r.length === 0 && (this.fromHeadings = {
        properties: i,
        beginDirty: s
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
    return cc(t, this.fromHeadings && fe(fe({}, this.fromHeadings), {}, { textWidth: this.textWidthIn(e) })), t;
  }
  /** The width of the text in the section it is in */
  textWidthIn(e) {
    var t, r;
    return (t = (r = e.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 || (r = r.View.Body.getSectionPropertiesFor(this)) === null || r === void 0 ? void 0 : r.AvailableTextWidth) !== null && t !== void 0 ? t : pr;
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
        new gr({ text: e.title }),
        new Ir(),
        new gr({ text: (r = (n = e.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "" })
      ]
    });
  }
  buildCachedContentParagraphChild(e, t) {
    const r = this.buildCachedContentRun(e, t);
    return t?.hyperlink && e.href !== void 0 ? new Dn({
      anchor: e.href,
      children: [r]
    }) : r;
  }
}, hs = class {
  constructor(e = { children: [] }) {
    J(this, "options", void 0), this.options = e;
  }
}, fs = class {
  constructor(e = { children: [] }) {
    J(this, "options", void 0), this.options = e;
  }
}, Gd = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, Kd = class extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new Gd({ id: e }));
  }
}, Vd = class extends Me {
  /**
  * Creates a new footnote reference run.
  *
  * @param id - Unique identifier linking to the footnote content
  */
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new Kd(e));
  }
}, qd = /* @__PURE__ */ he(((e, t) => {
  kt(), ut();
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof Oe < "u" ? Oe : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(n, s, i) {
      function u(d, w) {
        if (!s[d]) {
          if (!n[d]) {
            var v = typeof ar == "function" && ar;
            if (!w && v) return v(d, !0);
            if (a) return a(d, !0);
            var E = /* @__PURE__ */ new Error("Cannot find module '" + d + "'");
            throw E.code = "MODULE_NOT_FOUND", E;
          }
          var m = s[d] = { exports: {} };
          n[d][0].call(m.exports, function(f) {
            var y = n[d][1][f];
            return u(y || f);
          }, m, m.exports, r, n, s, i);
        }
        return s[d].exports;
      }
      for (var a = typeof ar == "function" && ar, c = 0; c < i.length; c++) u(i[c]);
      return u;
    })({
      1: [function(r, n, s) {
        var i = r("./utils"), u = r("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        s.encode = function(c) {
          for (var d, w, v, E, m, f, y, _ = [], k = 0, x = c.length, T = x, S = i.getTypeOf(c) !== "string"; k < c.length; ) T = x - k, v = S ? (d = c[k++], w = k < x ? c[k++] : 0, k < x ? c[k++] : 0) : (d = c.charCodeAt(k++), w = k < x ? c.charCodeAt(k++) : 0, k < x ? c.charCodeAt(k++) : 0), E = d >> 2, m = (3 & d) << 4 | w >> 4, f = 1 < T ? (15 & w) << 2 | v >> 6 : 64, y = 2 < T ? 63 & v : 64, _.push(a.charAt(E) + a.charAt(m) + a.charAt(f) + a.charAt(y));
          return _.join("");
        }, s.decode = function(c) {
          var d, w, v, E, m, f, y = 0, _ = 0, k = "data:";
          if (c.substr(0, k.length) === k) throw new Error("Invalid base64 input, it looks like a data url.");
          var x, T = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === a.charAt(64) && T--, c.charAt(c.length - 2) === a.charAt(64) && T--, T % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (x = u.uint8array ? new Uint8Array(0 | T) : new Array(0 | T); y < c.length; ) d = a.indexOf(c.charAt(y++)) << 2 | (E = a.indexOf(c.charAt(y++))) >> 4, w = (15 & E) << 4 | (m = a.indexOf(c.charAt(y++))) >> 2, v = (3 & m) << 6 | (f = a.indexOf(c.charAt(y++))), x[_++] = d, m !== 64 && (x[_++] = w), f !== 64 && (x[_++] = v);
          return x;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, n, s) {
        var i = r("./external"), u = r("./stream/DataWorker"), a = r("./stream/Crc32Probe"), c = r("./stream/DataLengthProbe");
        function d(w, v, E, m, f) {
          this.compressedSize = w, this.uncompressedSize = v, this.crc32 = E, this.compression = m, this.compressedContent = f;
        }
        d.prototype = {
          getContentWorker: function() {
            var w = new u(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), v = this;
            return w.on("end", function() {
              if (this.streamInfo.data_length !== v.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), w;
          },
          getCompressedWorker: function() {
            return new u(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, d.createWorkerFrom = function(w, v, E) {
          return w.pipe(new a()).pipe(new c("uncompressedSize")).pipe(v.compressWorker(E)).pipe(new c("compressedSize")).withStreamInfo("compression", v);
        }, n.exports = d;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, n, s) {
        var i = r("./stream/GenericWorker");
        s.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new i("STORE compression");
          },
          uncompressWorker: function() {
            return new i("STORE decompression");
          }
        }, s.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, n, s) {
        var i = r("./utils"), u = (function() {
          for (var a, c = [], d = 0; d < 256; d++) {
            a = d;
            for (var w = 0; w < 8; w++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            c[d] = a;
          }
          return c;
        })();
        n.exports = function(a, c) {
          return a !== void 0 && a.length ? i.getTypeOf(a) !== "string" ? (function(d, w, v, E) {
            var m = u, f = E + v;
            d ^= -1;
            for (var y = E; y < f; y++) d = d >>> 8 ^ m[255 & (d ^ w[y])];
            return -1 ^ d;
          })(0 | c, a, a.length, 0) : (function(d, w, v, E) {
            var m = u, f = E + v;
            d ^= -1;
            for (var y = E; y < f; y++) d = d >>> 8 ^ m[255 & (d ^ w.charCodeAt(y))];
            return -1 ^ d;
          })(0 | c, a, a.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, n, s) {
        s.base64 = !1, s.binary = !1, s.dir = !1, s.createFolders = !0, s.date = null, s.compression = null, s.compressionOptions = null, s.comment = null, s.unixPermissions = null, s.dosPermissions = null;
      }, {}],
      6: [function(r, n, s) {
        var i = null;
        i = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: i };
      }, { lie: 37 }],
      7: [function(r, n, s) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", u = r("pako"), a = r("./utils"), c = r("./stream/GenericWorker"), d = i ? "uint8array" : "array";
        function w(v, E) {
          c.call(this, "FlateWorker/" + v), this._pako = null, this._pakoAction = v, this._pakoOptions = E, this.meta = {};
        }
        s.magic = "\b\0", a.inherits(w, c), w.prototype.processChunk = function(v) {
          this.meta = v.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(d, v.data), !1);
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
        }, s.compressWorker = function(v) {
          return new w("Deflate", v);
        }, s.uncompressWorker = function() {
          return new w("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, n, s) {
        function i(m, f) {
          var y, _ = "";
          for (y = 0; y < f; y++) _ += String.fromCharCode(255 & m), m >>>= 8;
          return _;
        }
        function u(m, f, y, _, k, x) {
          var T, S, A = m.file, b = m.compression, P = x !== d.utf8encode, M = a.transformTo("string", x(A.name)), R = a.transformTo("string", d.utf8encode(A.name)), K = A.comment, ee = a.transformTo("string", x(K)), O = a.transformTo("string", d.utf8encode(K)), z = R.length !== A.name.length, I = O.length !== K.length, H = "", Q = "", q = "", le = A.dir, Z = A.date, te = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          f && !y || (te.crc32 = m.crc32, te.compressedSize = m.compressedSize, te.uncompressedSize = m.uncompressedSize);
          var V = 0;
          f && (V |= 8), P || !z && !I || (V |= 2048);
          var F = 0, X = 0;
          le && (F |= 16), k === "UNIX" ? (X = 798, F |= (function(re, pe) {
            var C = re;
            return re || (C = pe ? 16893 : 33204), (65535 & C) << 16;
          })(A.unixPermissions, le)) : (X = 20, F |= (function(re) {
            return 63 & (re || 0);
          })(A.dosPermissions)), T = Z.getUTCHours(), T <<= 6, T |= Z.getUTCMinutes(), T <<= 5, T |= Z.getUTCSeconds() / 2, S = Z.getUTCFullYear() - 1980, S <<= 4, S |= Z.getUTCMonth() + 1, S <<= 5, S |= Z.getUTCDate(), z && (Q = i(1, 1) + i(w(M), 4) + R, H += "up" + i(Q.length, 2) + Q), I && (q = i(1, 1) + i(w(ee), 4) + O, H += "uc" + i(q.length, 2) + q);
          var Y = "";
          return Y += `
\0`, Y += i(V, 2), Y += b.magic, Y += i(T, 2), Y += i(S, 2), Y += i(te.crc32, 4), Y += i(te.compressedSize, 4), Y += i(te.uncompressedSize, 4), Y += i(M.length, 2), Y += i(H.length, 2), {
            fileRecord: v.LOCAL_FILE_HEADER + Y + M + H,
            dirRecord: v.CENTRAL_FILE_HEADER + i(X, 2) + Y + i(ee.length, 2) + "\0\0\0\0" + i(F, 4) + i(_, 4) + M + H + ee
          };
        }
        var a = r("../utils"), c = r("../stream/GenericWorker"), d = r("../utf8"), w = r("../crc32"), v = r("../signature");
        function E(m, f, y, _) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = f, this.zipPlatform = y, this.encodeFileName = _, this.streamFiles = m, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        a.inherits(E, c), E.prototype.push = function(m) {
          var f = m.meta.percent || 0, y = this.entriesCount, _ = this._sources.length;
          this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, c.prototype.push.call(this, {
            data: m.data,
            meta: {
              currentFile: this.currentFile,
              percent: y ? (f + 100 * (y - _ - 1)) / y : 100
            }
          }));
        }, E.prototype.openedSource = function(m) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = m.file.name;
          var f = this.streamFiles && !m.file.dir;
          if (f) {
            var y = u(m, f, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: y.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, E.prototype.closedSource = function(m) {
          this.accumulate = !1;
          var f = this.streamFiles && !m.file.dir, y = u(m, f, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(y.dirRecord), f) this.push({
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
          for (var m = this.bytesWritten, f = 0; f < this.dirRecords.length; f++) this.push({
            data: this.dirRecords[f],
            meta: { percent: 100 }
          });
          var y = this.bytesWritten - m, _ = (function(k, x, T, S, A) {
            var b = a.transformTo("string", A(S));
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
          var f = this;
          return m.on("data", function(y) {
            f.processChunk(y);
          }), m.on("end", function() {
            f.closedSource(f.previous.streamInfo), f._sources.length ? f.prepareNextSource() : f.end();
          }), m.on("error", function(y) {
            f.error(y);
          }), this;
        }, E.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, E.prototype.error = function(m) {
          var f = this._sources;
          if (!c.prototype.error.call(this, m)) return !1;
          for (var y = 0; y < f.length; y++) try {
            f[y].error(m);
          } catch {
          }
          return !0;
        }, E.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var m = this._sources, f = 0; f < m.length; f++) m[f].lock();
        }, n.exports = E;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, n, s) {
        var i = r("../compressions"), u = r("./ZipFileWorker");
        s.generateWorker = function(a, c, d) {
          var w = new u(c.streamFiles, d, c.platform, c.encodeFileName), v = 0;
          try {
            a.forEach(function(E, m) {
              v++;
              var f = (function(x, T) {
                var S = x || T, A = i[S];
                if (!A) throw new Error(S + " is not a valid compression method !");
                return A;
              })(m.options.compression, c.compression), y = m.options.compressionOptions || c.compressionOptions || {}, _ = m.dir, k = m.date;
              m._compressWorker(f, y).withStreamInfo("file", {
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
      10: [function(r, n, s) {
        function i() {
          if (!(this instanceof i)) return new i();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var u = new i();
            for (var a in this) typeof this[a] != "function" && (u[a] = this[a]);
            return u;
          };
        }
        (i.prototype = r("./object")).loadAsync = r("./load"), i.support = r("./support"), i.defaults = r("./defaults"), i.version = "3.10.2", i.loadAsync = function(u, a) {
          return new i().loadAsync(u, a);
        }, i.external = r("./external"), n.exports = i;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(r, n, s) {
        var i = r("./utils"), u = r("./external"), a = r("./utf8"), c = r("./zipEntries"), d = r("./stream/Crc32Probe"), w = r("./nodejsUtils");
        function v(E) {
          return new u.Promise(function(m, f) {
            var y = E.decompressed.getContentWorker().pipe(new d());
            y.on("error", function(_) {
              f(_);
            }).on("end", function() {
              y.streamInfo.crc32 !== E.decompressed.crc32 ? f(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : m();
            }).resume();
          });
        }
        n.exports = function(E, m) {
          var f = this;
          return m = i.extend(m || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: a.utf8decode
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
              f.file(A, T.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: T.date,
                dir: T.dir,
                comment: T.fileCommentStr.length ? T.fileCommentStr : null,
                unixPermissions: T.unixPermissions,
                dosPermissions: T.dosPermissions,
                createFolders: m.createFolders
              }), T.dir || (f.file(A).unsafeOriginalName = S);
            }
            return _.zipComment.length && (f.comment = _.zipComment), f;
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
      12: [function(r, n, s) {
        var i = r("../utils"), u = r("../stream/GenericWorker");
        function a(c, d) {
          u.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(d);
        }
        i.inherits(a, u), a.prototype._bindStream = function(c) {
          var d = this;
          (this._stream = c).pause(), c.on("data", function(w) {
            d.push({
              data: w,
              meta: { percent: 0 }
            });
          }).on("error", function(w) {
            d.isPaused ? this.generatedError = w : d.error(w);
          }).on("end", function() {
            d.isPaused ? d._upstreamEnded = !0 : d.end();
          });
        }, a.prototype.pause = function() {
          return !!u.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, a.prototype.resume = function() {
          return !!u.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, n.exports = a;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(r, n, s) {
        var i = r("readable-stream").Readable;
        function u(a, c, d) {
          i.call(this, c), this._helper = a;
          var w = this;
          a.on("data", function(v, E) {
            w.push(v) || w._helper.pause(), d && d(E);
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
      14: [function(r, n, s) {
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
      15: [function(r, n, s) {
        function i(S, A, b) {
          var P, M = a.getTypeOf(A), R = a.extend(b || {}, w);
          R.date = R.date || /* @__PURE__ */ new Date(), R.compression !== null && (R.compression = R.compression.toUpperCase()), typeof R.unixPermissions == "string" && (R.unixPermissions = parseInt(R.unixPermissions, 8)), R.unixPermissions && 16384 & R.unixPermissions && (R.dir = !0), R.dosPermissions && 16 & R.dosPermissions && (R.dir = !0), R.dir && (S = k(S)), R.createFolders && (P = _(S)) && x.call(this, P, !0);
          var K = M === "string" && R.binary === !1 && R.base64 === !1;
          b && b.binary !== void 0 || (R.binary = !K), (A instanceof v && A.uncompressedSize === 0 || R.dir || !A || A.length === 0) && (R.base64 = !1, R.binary = !0, A = "", R.compression = "STORE", M = "string");
          var ee = null;
          ee = A instanceof v || A instanceof c ? A : f.isNode && f.isStream(A) ? new y(S, A) : a.prepareContent(S, A, R.binary, R.optimizedBinaryString, R.base64);
          var O = new E(S, ee, R);
          this.files[S] = O;
        }
        var u = r("./utf8"), a = r("./utils"), c = r("./stream/GenericWorker"), d = r("./stream/StreamHelper"), w = r("./defaults"), v = r("./compressedObject"), E = r("./zipObject"), m = r("./generate"), f = r("./nodejsUtils"), y = r("./nodejs/NodejsStreamInputAdapter"), _ = function(S) {
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
              if ((b = a.extend(S || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: u.utf8encode
              })).type = b.type.toLowerCase(), b.compression = b.compression.toUpperCase(), b.type === "binarystring" && (b.type = "string"), !b.type) throw new Error("No output type specified.");
              a.checkSupport(b.type), b.platform !== "darwin" && b.platform !== "freebsd" && b.platform !== "linux" && b.platform !== "sunos" || (b.platform = "UNIX"), b.platform === "win32" && (b.platform = "DOS");
              var P = b.comment || this.comment || "";
              A = m.generateWorker(this, b, P);
            } catch (M) {
              (A = new c("error")).error(M);
            }
            return new d(A, b.type || "string", b.mimeType);
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
      16: [function(r, n, s) {
        n.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, n, s) {
        var i = r("./DataReader");
        function u(a) {
          i.call(this, a);
          for (var c = 0; c < this.data.length; c++) a[c] = 255 & a[c];
        }
        r("../utils").inherits(u, i), u.prototype.byteAt = function(a) {
          return this.data[this.zero + a];
        }, u.prototype.lastIndexOfSignature = function(a) {
          for (var c = a.charCodeAt(0), d = a.charCodeAt(1), w = a.charCodeAt(2), v = a.charCodeAt(3), E = this.length - 4; 0 <= E; --E) if (this.data[E] === c && this.data[E + 1] === d && this.data[E + 2] === w && this.data[E + 3] === v) return E - this.zero;
          return -1;
        }, u.prototype.readAndCheckSignature = function(a) {
          var c = a.charCodeAt(0), d = a.charCodeAt(1), w = a.charCodeAt(2), v = a.charCodeAt(3), E = this.readData(4);
          return c === E[0] && d === E[1] && w === E[2] && v === E[3];
        }, u.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, n, s) {
        var i = r("../utils");
        function u(a) {
          this.data = a, this.length = a.length, this.index = 0, this.zero = 0;
        }
        u.prototype = {
          checkOffset: function(a) {
            this.checkIndex(this.index + a);
          },
          checkIndex: function(a) {
            if (this.length < this.zero + a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
          },
          setIndex: function(a) {
            this.checkIndex(a), this.index = a;
          },
          skip: function(a) {
            this.setIndex(this.index + a);
          },
          byteAt: function() {
          },
          readInt: function(a) {
            var c, d = 0;
            for (this.checkOffset(a), c = this.index + a - 1; c >= this.index; c--) d = (d << 8) + this.byteAt(c);
            return this.index += a, d;
          },
          readString: function(a) {
            return i.transformTo("string", this.readData(a));
          },
          readData: function() {
          },
          lastIndexOfSignature: function() {
          },
          readAndCheckSignature: function() {
          },
          readDate: function() {
            var a = this.readInt(4);
            return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
          }
        }, n.exports = u;
      }, { "../utils": 32 }],
      19: [function(r, n, s) {
        var i = r("./Uint8ArrayReader");
        function u(a) {
          i.call(this, a);
        }
        r("../utils").inherits(u, i), u.prototype.readData = function(a) {
          this.checkOffset(a);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(r, n, s) {
        var i = r("./DataReader");
        function u(a) {
          i.call(this, a);
        }
        r("../utils").inherits(u, i), u.prototype.byteAt = function(a) {
          return this.data.charCodeAt(this.zero + a);
        }, u.prototype.lastIndexOfSignature = function(a) {
          return this.data.lastIndexOf(a) - this.zero;
        }, u.prototype.readAndCheckSignature = function(a) {
          return a === this.readData(4);
        }, u.prototype.readData = function(a) {
          this.checkOffset(a);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(r, n, s) {
        var i = r("./ArrayReader");
        function u(a) {
          i.call(this, a);
        }
        r("../utils").inherits(u, i), u.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return /* @__PURE__ */ new Uint8Array(0);
          var c = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(r, n, s) {
        var i = r("../utils"), u = r("../support"), a = r("./ArrayReader"), c = r("./StringReader"), d = r("./NodeBufferReader"), w = r("./Uint8ArrayReader");
        n.exports = function(v) {
          var E = i.getTypeOf(v);
          return i.checkSupport(E), E !== "string" || u.uint8array ? E === "nodebuffer" ? new d(v) : u.uint8array ? new w(i.transformTo("uint8array", v)) : new a(i.transformTo("array", v)) : new c(v);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, n, s) {
        s.LOCAL_FILE_HEADER = "PK", s.CENTRAL_FILE_HEADER = "PK", s.CENTRAL_DIRECTORY_END = "PK", s.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", s.ZIP64_CENTRAL_DIRECTORY_END = "PK", s.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, n, s) {
        var i = r("./GenericWorker"), u = r("../utils");
        function a(c) {
          i.call(this, "ConvertWorker to " + c), this.destType = c;
        }
        u.inherits(a, i), a.prototype.processChunk = function(c) {
          this.push({
            data: u.transformTo(this.destType, c.data),
            meta: c.meta
          });
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(r, n, s) {
        var i = r("./GenericWorker"), u = r("../crc32");
        function a() {
          i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(a, i), a.prototype.processChunk = function(c) {
          this.streamInfo.crc32 = u(c.data, this.streamInfo.crc32 || 0), this.push(c);
        }, n.exports = a;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(r, n, s) {
        var i = r("../utils"), u = r("./GenericWorker");
        function a(c) {
          u.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        i.inherits(a, u), a.prototype.processChunk = function(c) {
          if (c) {
            var d = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = d + c.data.length;
          }
          u.prototype.processChunk.call(this, c);
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, n, s) {
        var i = r("../utils"), u = r("./GenericWorker");
        function a(c) {
          u.call(this, "DataWorker");
          var d = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(w) {
            d.dataIsReady = !0, d.data = w, d.max = w && w.length || 0, d.type = i.getTypeOf(w), d.isPaused || d._tickAndRepeat();
          }, function(w) {
            d.error(w);
          });
        }
        i.inherits(a, u), a.prototype.cleanUp = function() {
          u.prototype.cleanUp.call(this), this.data = null;
        }, a.prototype.resume = function() {
          return !!u.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
        }, a.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, a.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var c = null, d = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              c = this.data.substring(this.index, d);
              break;
            case "uint8array":
              c = this.data.subarray(this.index, d);
              break;
            case "array":
            case "nodebuffer":
              c = this.data.slice(this.index, d);
          }
          return this.index = d, this.push({
            data: c,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(r, n, s) {
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
          on: function(u, a) {
            return this._listeners[u].push(a), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(u, a) {
            if (this._listeners[u]) for (var c = 0; c < this._listeners[u].length; c++) this._listeners[u][c].call(this, a);
          },
          pipe: function(u) {
            return u.registerPrevious(this);
          },
          registerPrevious: function(u) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = u.streamInfo, this.mergeStreamInfo(), this.previous = u;
            var a = this;
            return u.on("data", function(c) {
              a.processChunk(c);
            }), u.on("end", function() {
              a.end();
            }), u.on("error", function(c) {
              a.error(c);
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
          withStreamInfo: function(u, a) {
            return this.extraStreamInfo[u] = a, this.mergeStreamInfo(), this;
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
      29: [function(r, n, s) {
        var i = r("../utils"), u = r("./ConvertWorker"), a = r("./GenericWorker"), c = r("../base64"), d = r("../support"), w = r("../external"), v = null;
        if (d.nodestream) try {
          v = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function E(f, y) {
          return new w.Promise(function(_, k) {
            var x = [], T = f._internalType, S = f._outputType, A = f._mimeType;
            f.on("data", function(b, P) {
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
        function m(f, y, _) {
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
            this._internalType = k, this._outputType = y, this._mimeType = _, i.checkSupport(k), this._worker = f.pipe(new u(k)), f.lock();
          } catch (x) {
            this._worker = new a("error"), this._worker.error(x);
          }
        }
        m.prototype = {
          accumulate: function(f) {
            return E(this, f);
          },
          on: function(f, y) {
            var _ = this;
            return f === "data" ? this._worker.on(f, function(k) {
              y.call(_, k.data, k.meta);
            }) : this._worker.on(f, function() {
              i.delay(y, arguments, _);
            }), this;
          },
          resume: function() {
            return i.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(f) {
            if (i.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new v(this, { objectMode: this._outputType !== "nodebuffer" }, f);
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
      30: [function(r, n, s) {
        if (s.base64 = !0, s.array = !0, s.string = !0, s.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", s.nodebuffer = typeof Buffer < "u", s.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") s.blob = !1;
        else {
          var i = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            s.blob = new Blob([i], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              u.append(i), s.blob = u.getBlob("application/zip").size === 0;
            } catch {
              s.blob = !1;
            }
          }
        }
        try {
          s.nodestream = !!r("readable-stream").Readable;
        } catch {
          s.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(r, n, s) {
        for (var i = r("./utils"), u = r("./support"), a = r("./nodejsUtils"), c = r("./stream/GenericWorker"), d = new Array(256), w = 0; w < 256; w++) d[w] = 252 <= w ? 6 : 248 <= w ? 5 : 240 <= w ? 4 : 224 <= w ? 3 : 192 <= w ? 2 : 1;
        d[254] = d[254] = 1;
        function v() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function E() {
          c.call(this, "utf-8 encode");
        }
        s.utf8encode = function(m) {
          return u.nodebuffer ? a.newBufferFrom(m, "utf-8") : (function(f) {
            var y, _, k, x, T, S = f.length, A = 0;
            for (x = 0; x < S; x++) (64512 & (_ = f.charCodeAt(x))) == 55296 && x + 1 < S && (64512 & (k = f.charCodeAt(x + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), x++), A += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
            for (y = u.uint8array ? new Uint8Array(A) : new Array(A), x = T = 0; T < A; x++) (64512 & (_ = f.charCodeAt(x))) == 55296 && x + 1 < S && (64512 & (k = f.charCodeAt(x + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), x++), _ < 128 ? y[T++] = _ : (_ < 2048 ? y[T++] = 192 | _ >>> 6 : (_ < 65536 ? y[T++] = 224 | _ >>> 12 : (y[T++] = 240 | _ >>> 18, y[T++] = 128 | _ >>> 12 & 63), y[T++] = 128 | _ >>> 6 & 63), y[T++] = 128 | 63 & _);
            return y;
          })(m);
        }, s.utf8decode = function(m) {
          return u.nodebuffer ? i.transformTo("nodebuffer", m).toString("utf-8") : (function(f) {
            var y, _, k, x, T = f.length, S = new Array(2 * T);
            for (y = _ = 0; y < T; ) if ((k = f[y++]) < 128) S[_++] = k;
            else if (4 < (x = d[k])) S[_++] = 65533, y += x - 1;
            else {
              for (k &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && y < T; ) k = k << 6 | 63 & f[y++], x--;
              1 < x ? S[_++] = 65533 : k < 65536 ? S[_++] = k : (k -= 65536, S[_++] = 55296 | k >> 10 & 1023, S[_++] = 56320 | 1023 & k);
            }
            return S.length !== _ && (S.subarray ? S = S.subarray(0, _) : S.length = _), i.applyFromCharCode(S);
          })(m = i.transformTo(u.uint8array ? "uint8array" : "array", m));
        }, i.inherits(v, c), v.prototype.processChunk = function(m) {
          var f = i.transformTo(u.uint8array ? "uint8array" : "array", m.data);
          if (this.leftOver && this.leftOver.length) {
            if (u.uint8array) {
              var y = f;
              (f = new Uint8Array(y.length + this.leftOver.length)).set(this.leftOver, 0), f.set(y, this.leftOver.length);
            } else f = this.leftOver.concat(f);
            this.leftOver = null;
          }
          var _ = (function(x, T) {
            var S;
            for ((T = T || x.length) > x.length && (T = x.length), S = T - 1; 0 <= S && (192 & x[S]) == 128; ) S--;
            return S < 0 || S === 0 ? T : S + d[x[S]] > T ? S : T;
          })(f), k = f;
          _ !== f.length && (u.uint8array ? (k = f.subarray(0, _), this.leftOver = f.subarray(_, f.length)) : (k = f.slice(0, _), this.leftOver = f.slice(_, f.length))), this.push({
            data: s.utf8decode(k),
            meta: m.meta
          });
        }, v.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: s.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, s.Utf8DecodeWorker = v, i.inherits(E, c), E.prototype.processChunk = function(m) {
          this.push({
            data: s.utf8encode(m.data),
            meta: m.meta
          });
        }, s.Utf8EncodeWorker = E;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, n, s) {
        var i = r("./support"), u = r("./base64"), a = r("./nodejsUtils"), c = r("./external");
        function d(y) {
          return y;
        }
        function w(y, _) {
          for (var k = 0; k < y.length; ++k) _[k] = 255 & y.charCodeAt(k);
          return _;
        }
        r("setimmediate"), s.newBlob = function(y, _) {
          s.checkSupport("blob");
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
                return i.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
              } catch {
                return !1;
              }
            })()
          }
        };
        function E(y) {
          var _ = 65536, k = s.getTypeOf(y), x = !0;
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
        s.applyFromCharCode = E;
        var f = {};
        f.string = {
          string: d,
          array: function(y) {
            return w(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return f.string.uint8array(y).buffer;
          },
          uint8array: function(y) {
            return w(y, new Uint8Array(y.length));
          },
          nodebuffer: function(y) {
            return w(y, a.allocBuffer(y.length));
          }
        }, f.array = {
          string: E,
          array: d,
          arraybuffer: function(y) {
            return new Uint8Array(y).buffer;
          },
          uint8array: function(y) {
            return new Uint8Array(y);
          },
          nodebuffer: function(y) {
            return a.newBufferFrom(y);
          }
        }, f.arraybuffer = {
          string: function(y) {
            return E(new Uint8Array(y));
          },
          array: function(y) {
            return m(new Uint8Array(y), new Array(y.byteLength));
          },
          arraybuffer: d,
          uint8array: function(y) {
            return new Uint8Array(y);
          },
          nodebuffer: function(y) {
            return a.newBufferFrom(new Uint8Array(y));
          }
        }, f.uint8array = {
          string: E,
          array: function(y) {
            return m(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return y.buffer;
          },
          uint8array: d,
          nodebuffer: function(y) {
            return a.newBufferFrom(y);
          }
        }, f.nodebuffer = {
          string: E,
          array: function(y) {
            return m(y, new Array(y.length));
          },
          arraybuffer: function(y) {
            return f.nodebuffer.uint8array(y).buffer;
          },
          uint8array: function(y) {
            return m(y, new Uint8Array(y.length));
          },
          nodebuffer: d
        }, s.transformTo = function(y, _) {
          return _ = _ || "", y ? (s.checkSupport(y), f[s.getTypeOf(_)][y](_)) : _;
        }, s.resolve = function(y) {
          for (var _ = y.split("/"), k = [], x = 0; x < _.length; x++) {
            var T = _[x];
            T === "." || T === "" && x !== 0 && x !== _.length - 1 || (T === ".." ? k.pop() : k.push(T));
          }
          return k.join("/");
        }, s.getTypeOf = function(y) {
          if (typeof y == "string") return "string";
          var _ = Object.prototype.toString.call(y);
          return _ === "[object Array]" ? "array" : i.nodebuffer && a.isBuffer(y) ? "nodebuffer" : i.uint8array && _ === "[object Uint8Array]" ? "uint8array" : i.arraybuffer && _ === "[object ArrayBuffer]" ? "arraybuffer" : void 0;
        }, s.checkSupport = function(y) {
          if (!i[y.toLowerCase()]) throw new Error(y + " is not supported by this platform");
        }, s.MAX_VALUE_16BITS = 65535, s.MAX_VALUE_32BITS = -1, s.pretty = function(y) {
          var _, k, x = "";
          for (k = 0; k < (y || "").length; k++) x += "\\x" + ((_ = y.charCodeAt(k)) < 16 ? "0" : "") + _.toString(16).toUpperCase();
          return x;
        }, s.delay = function(y, _, k) {
          setImmediate(function() {
            y.apply(k || null, _ || []);
          });
        }, s.inherits = function(y, _) {
          function k() {
          }
          k.prototype = _.prototype, y.prototype = new k();
        }, s.extend = function() {
          var y, _, k = {};
          for (y = 0; y < arguments.length; y++) for (_ in arguments[y]) Object.prototype.hasOwnProperty.call(arguments[y], _) && k[_] === void 0 && (k[_] = arguments[y][_]);
          return k;
        }, s.prepareContent = function(y, _, k, x, T) {
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
            var A = s.getTypeOf(S);
            return A ? (A === "arraybuffer" ? S = s.transformTo("uint8array", S) : A === "string" && (T ? S = u.decode(S) : k && x !== !0 && (S = (function(b) {
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
      33: [function(r, n, s) {
        var i = r("./reader/readerFor"), u = r("./utils"), a = r("./signature"), c = r("./zipEntry"), d = r("./support");
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
            var f = this.reader.readString(4) === E;
            return this.reader.setIndex(m), f;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var v = this.reader.readData(this.zipCommentLength), E = d.uint8array ? "uint8array" : "array", m = u.transformTo(E, v);
            this.zipComment = this.loadOptions.decodeFileName(m);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var v, E, m, f = this.zip64EndOfCentralSize - 44; 0 < f; ) v = this.reader.readInt(2), E = this.reader.readInt(4), m = this.reader.readData(E), this.zip64ExtensibleData[v] = {
              id: v,
              length: E,
              value: m
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            for (var v = 0, E; v < this.files.length; v++) E = this.files[v], this.reader.setIndex(E.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), E.readLocalPart(this.reader), E.handleUTF8(), E.processAttributes();
          },
          readCentralDir: function() {
            var v;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (v = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(v);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var v = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
            if (v < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(v);
            var E = v;
            if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === u.MAX_VALUE_16BITS || this.diskWithCentralDirStart === u.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === u.MAX_VALUE_16BITS || this.centralDirRecords === u.MAX_VALUE_16BITS || this.centralDirSize === u.MAX_VALUE_32BITS || this.centralDirOffset === u.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (v = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(v), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var m = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
            var f = E - m;
            if (0 < f) this.isSignature(E, a.CENTRAL_FILE_HEADER) || (this.reader.zero = f);
            else if (f < 0) throw new Error("Corrupted zip: missing " + Math.abs(f) + " bytes.");
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
      34: [function(r, n, s) {
        var i = r("./reader/readerFor"), u = r("./utils"), a = r("./compressedObject"), c = r("./crc32"), d = r("./utf8"), w = r("./compressions"), v = r("./support");
        function E(m, f) {
          this.options = m, this.loadOptions = f;
        }
        E.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(m) {
            var f, y;
            if (m.skip(22), this.fileNameLength = m.readInt(2), y = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(y), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((f = (function(_) {
              for (var k in w) if (Object.prototype.hasOwnProperty.call(w, k) && w[k].magic === _) return w[k];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + u.pretty(this.compressionMethod) + " unknown (inner file : " + u.transformTo("string", this.fileName) + ")");
            this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, f, m.readData(this.compressedSize));
          },
          readCentralPart: function(m) {
            this.versionMadeBy = m.readInt(2), m.skip(2), this.bitFlag = m.readInt(2), this.compressionMethod = m.readString(2), this.date = m.readDate(), this.crc32 = m.readInt(4), this.compressedSize = m.readInt(4), this.uncompressedSize = m.readInt(4);
            var f = m.readInt(2);
            if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            m.skip(f), this.readExtraFields(m), this.parseZIP64ExtraField(m), this.fileComment = m.readData(this.fileCommentLength);
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
            var f, y, _, k = m.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); m.index + 4 < k; ) f = m.readInt(2), y = m.readInt(2), _ = m.readData(y), this.extraFields[f] = {
              id: f,
              length: y,
              value: _
            };
            m.setIndex(k);
          },
          handleUTF8: function() {
            var m = v.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = d.utf8decode(this.fileName), this.fileCommentStr = d.utf8decode(this.fileComment);
            else {
              var f = this.findExtraFieldUnicodePath();
              if (f !== null) this.fileNameStr = f;
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
              var f = i(m.value);
              return f.readInt(1) !== 1 || c(this.fileName) !== f.readInt(4) ? null : d.utf8decode(f.readData(m.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var m = this.extraFields[25461];
            if (m) {
              var f = i(m.value);
              return f.readInt(1) !== 1 || c(this.fileComment) !== f.readInt(4) ? null : d.utf8decode(f.readData(m.length - 5));
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
      35: [function(r, n, s) {
        function i(f, y, _) {
          this.name = f, this.dir = _.dir, this.date = _.date, this.comment = _.comment, this.unixPermissions = _.unixPermissions, this.dosPermissions = _.dosPermissions, this._data = y, this._dataBinary = _.binary, this.options = {
            compression: _.compression,
            compressionOptions: _.compressionOptions
          };
        }
        var u = r("./stream/StreamHelper"), a = r("./stream/DataWorker"), c = r("./utf8"), d = r("./compressedObject"), w = r("./stream/GenericWorker");
        i.prototype = {
          internalStream: function(f) {
            var y = null, _ = "string";
            try {
              if (!f) throw new Error("No output type specified.");
              var k = (_ = f.toLowerCase()) === "string" || _ === "text";
              _ !== "binarystring" && _ !== "text" || (_ = "string"), y = this._decompressWorker();
              var x = !this._dataBinary;
              x && !k && (y = y.pipe(new c.Utf8EncodeWorker())), !x && k && (y = y.pipe(new c.Utf8DecodeWorker()));
            } catch (T) {
              (y = new w("error")).error(T);
            }
            return new u(y, _, "");
          },
          async: function(f, y) {
            return this.internalStream(f).accumulate(y);
          },
          nodeStream: function(f, y) {
            return this.internalStream(f || "nodebuffer").toNodejsStream(y);
          },
          _compressWorker: function(f, y) {
            if (this._data instanceof d && this._data.compression.magic === f.magic) return this._data.getCompressedWorker();
            var _ = this._decompressWorker();
            return this._dataBinary || (_ = _.pipe(new c.Utf8EncodeWorker())), d.createWorkerFrom(_, f, y);
          },
          _decompressWorker: function() {
            return this._data instanceof d ? this._data.getContentWorker() : this._data instanceof w ? this._data : new a(this._data);
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
      36: [function(r, n, s) {
        (function(i) {
          var u, a, c = i.MutationObserver || i.WebKitMutationObserver;
          if (c) {
            var d = 0, w = new c(f), v = i.document.createTextNode("");
            w.observe(v, { characterData: !0 }), u = function() {
              v.data = d = ++d % 2;
            };
          } else if (i.setImmediate || i.MessageChannel === void 0) u = "document" in i && "onreadystatechange" in i.document.createElement("script") ? function() {
            var y = i.document.createElement("script");
            y.onreadystatechange = function() {
              f(), y.onreadystatechange = null, y.parentNode.removeChild(y), y = null;
            }, i.document.documentElement.appendChild(y);
          } : function() {
            setTimeout(f, 0);
          };
          else {
            var E = new i.MessageChannel();
            E.port1.onmessage = f, u = function() {
              E.port2.postMessage(0);
            };
          }
          var m = [];
          function f() {
            var y, _;
            a = !0;
            for (var k = m.length; k; ) {
              for (_ = m, m = [], y = -1; ++y < k; ) _[y]();
              k = m.length;
            }
            a = !1;
          }
          n.exports = function(y) {
            m.push(y) !== 1 || a || u();
          };
        }).call(this, typeof Oe < "u" ? Oe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, n, s) {
        var i = r("immediate");
        function u() {
        }
        var a = {}, c = ["REJECTED"], d = ["FULFILLED"], w = ["PENDING"];
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
              return a.reject(k, A);
            }
            S === k ? a.reject(k, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : a.resolve(k, S);
          });
        }
        function f(k) {
          var x = k && k.then;
          if (k && (typeof k == "object" || typeof k == "function") && typeof x == "function") return function() {
            x.apply(k, arguments);
          };
        }
        function y(k, x) {
          var T = !1;
          function S(P) {
            T || (T = !0, a.reject(k, P));
          }
          function A(P) {
            T || (T = !0, a.resolve(k, P));
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
          if (typeof k != "function" && this.state === d || typeof x != "function" && this.state === c) return this;
          var T = new this.constructor(u);
          return this.state !== w ? m(T, this.state === d ? k : x, this.outcome) : this.queue.push(new E(T, k, x)), T;
        }, E.prototype.callFulfilled = function(k) {
          a.resolve(this.promise, k);
        }, E.prototype.otherCallFulfilled = function(k) {
          m(this.promise, this.onFulfilled, k);
        }, E.prototype.callRejected = function(k) {
          a.reject(this.promise, k);
        }, E.prototype.otherCallRejected = function(k) {
          m(this.promise, this.onRejected, k);
        }, a.resolve = function(k, x) {
          var T = _(f, x);
          if (T.status === "error") return a.reject(k, T.value);
          var S = T.value;
          if (S) y(k, S);
          else {
            k.state = d, k.outcome = x;
            for (var A = -1, b = k.queue.length; ++A < b; ) k.queue[A].callFulfilled(x);
          }
          return k;
        }, a.reject = function(k, x) {
          k.state = c, k.outcome = x;
          for (var T = -1, S = k.queue.length; ++T < S; ) k.queue[T].callRejected(x);
          return k;
        }, v.resolve = function(k) {
          return k instanceof this ? k : a.resolve(new this(u), k);
        }, v.reject = function(k) {
          var x = new this(u);
          return a.reject(x, k);
        }, v.all = function(k) {
          var x = this;
          if (Object.prototype.toString.call(k) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var T = k.length, S = !1;
          if (!T) return this.resolve([]);
          for (var A = new Array(T), b = 0, P = -1, M = new this(u); ++P < T; ) R(k[P], P);
          return M;
          function R(K, ee) {
            x.resolve(K).then(function(O) {
              A[ee] = O, ++b !== T || S || (S = !0, a.resolve(M, A));
            }, function(O) {
              S || (S = !0, a.reject(M, O));
            });
          }
        }, v.race = function(k) {
          var x = this;
          if (Object.prototype.toString.call(k) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var T = k.length, S = !1;
          if (!T) return this.resolve([]);
          for (var A = -1, b = new this(u); ++A < T; ) P = k[A], x.resolve(P).then(function(M) {
            S || (S = !0, a.resolve(b, M));
          }, function(M) {
            S || (S = !0, a.reject(b, M));
          });
          var P;
          return b;
        };
      }, { immediate: 36 }],
      38: [function(r, n, s) {
        var i = {};
        (0, r("./lib/utils/common").assign)(i, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = i;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, n, s) {
        var i = r("./zlib/deflate"), u = r("./utils/common"), a = r("./utils/strings"), c = r("./zlib/messages"), d = r("./zlib/zstream"), w = Object.prototype.toString, v = 0, E = -1, m = 0, f = 8;
        function y(k) {
          if (!(this instanceof y)) return new y(k);
          this.options = u.assign({
            level: E,
            method: f,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: m,
            to: ""
          }, k || {});
          var x = this.options;
          x.raw && 0 < x.windowBits ? x.windowBits = -x.windowBits : x.gzip && 0 < x.windowBits && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d(), this.strm.avail_out = 0;
          var T = i.deflateInit2(this.strm, x.level, x.method, x.windowBits, x.memLevel, x.strategy);
          if (T !== v) throw new Error(c[T]);
          if (x.header && i.deflateSetHeader(this.strm, x.header), x.dictionary) {
            var S = typeof x.dictionary == "string" ? a.string2buf(x.dictionary) : w.call(x.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(x.dictionary) : x.dictionary;
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
          S = x === ~~x ? x : x === !0 ? 4 : 0, typeof k == "string" ? A.input = a.string2buf(k) : w.call(k) === "[object ArrayBuffer]" ? A.input = new Uint8Array(k) : A.input = k, A.next_in = 0, A.avail_in = A.input.length;
          do {
            if (A.avail_out === 0 && (A.output = new u.Buf8(b), A.next_out = 0, A.avail_out = b), (T = i.deflate(A, S)) !== 1 && T !== v) return this.onEnd(T), !(this.ended = !0);
            A.avail_out !== 0 && (A.avail_in !== 0 || S !== 4 && S !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(u.shrinkBuf(A.output, A.next_out))) : this.onData(u.shrinkBuf(A.output, A.next_out)));
          } while ((0 < A.avail_in || A.avail_out === 0) && T !== 1);
          return S === 4 ? (T = i.deflateEnd(this.strm), this.onEnd(T), this.ended = !0, T === v) : S !== 2 || (this.onEnd(v), !(A.avail_out = 0));
        }, y.prototype.onData = function(k) {
          this.chunks.push(k);
        }, y.prototype.onEnd = function(k) {
          k === v && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = k, this.msg = this.strm.msg;
        }, s.Deflate = y, s.deflate = _, s.deflateRaw = function(k, x) {
          return (x = x || {}).raw = !0, _(k, x);
        }, s.gzip = function(k, x) {
          return (x = x || {}).gzip = !0, _(k, x);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, n, s) {
        var i = r("./zlib/inflate"), u = r("./utils/common"), a = r("./utils/strings"), c = r("./zlib/constants"), d = r("./zlib/messages"), w = r("./zlib/zstream"), v = r("./zlib/gzheader"), E = Object.prototype.toString;
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
          if (k !== c.Z_OK) throw new Error(d[k]);
          this.header = new v(), i.inflateGetHeader(this.strm, this.header);
        }
        function f(y, _) {
          var k = new m(_);
          if (k.push(y, !0), k.err) throw k.msg || d[k.err];
          return k.result;
        }
        m.prototype.push = function(y, _) {
          var k, x, T, S, A, b, P = this.strm, M = this.options.chunkSize, R = this.options.dictionary, K = !1;
          if (this.ended) return !1;
          x = _ === ~~_ ? _ : _ === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof y == "string" ? P.input = a.binstring2buf(y) : E.call(y) === "[object ArrayBuffer]" ? P.input = new Uint8Array(y) : P.input = y, P.next_in = 0, P.avail_in = P.input.length;
          do {
            if (P.avail_out === 0 && (P.output = new u.Buf8(M), P.next_out = 0, P.avail_out = M), (k = i.inflate(P, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && R && (b = typeof R == "string" ? a.string2buf(R) : E.call(R) === "[object ArrayBuffer]" ? new Uint8Array(R) : R, k = i.inflateSetDictionary(this.strm, b)), k === c.Z_BUF_ERROR && K === !0 && (k = c.Z_OK, K = !1), k !== c.Z_STREAM_END && k !== c.Z_OK) return this.onEnd(k), !(this.ended = !0);
            P.next_out && (P.avail_out !== 0 && k !== c.Z_STREAM_END && (P.avail_in !== 0 || x !== c.Z_FINISH && x !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (T = a.utf8border(P.output, P.next_out), S = P.next_out - T, A = a.buf2string(P.output, T), P.next_out = S, P.avail_out = M - S, S && u.arraySet(P.output, P.output, T, S, 0), this.onData(A)) : this.onData(u.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (K = !0);
          } while ((0 < P.avail_in || P.avail_out === 0) && k !== c.Z_STREAM_END);
          return k === c.Z_STREAM_END && (x = c.Z_FINISH), x === c.Z_FINISH ? (k = i.inflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === c.Z_OK) : x !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(P.avail_out = 0));
        }, m.prototype.onData = function(y) {
          this.chunks.push(y);
        }, m.prototype.onEnd = function(y) {
          y === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = y, this.msg = this.strm.msg;
        }, s.Inflate = m, s.inflate = f, s.inflateRaw = function(y, _) {
          return (_ = _ || {}).raw = !0, f(y, _);
        }, s.ungzip = f;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, n, s) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        s.assign = function(c) {
          for (var d = Array.prototype.slice.call(arguments, 1); d.length; ) {
            var w = d.shift();
            if (w) {
              if (typeof w != "object") throw new TypeError(w + "must be non-object");
              for (var v in w) w.hasOwnProperty(v) && (c[v] = w[v]);
            }
          }
          return c;
        }, s.shrinkBuf = function(c, d) {
          return c.length === d ? c : c.subarray ? c.subarray(0, d) : (c.length = d, c);
        };
        var u = {
          arraySet: function(c, d, w, v, E) {
            if (d.subarray && c.subarray) c.set(d.subarray(w, w + v), E);
            else for (var m = 0; m < v; m++) c[E + m] = d[w + m];
          },
          flattenChunks: function(c) {
            for (var d = v = 0, w = c.length, v, E, m, f; d < w; d++) v += c[d].length;
            for (f = new Uint8Array(v), d = E = 0, w = c.length; d < w; d++) m = c[d], f.set(m, E), E += m.length;
            return f;
          }
        }, a = {
          arraySet: function(c, d, w, v, E) {
            for (var m = 0; m < v; m++) c[E + m] = d[w + m];
          },
          flattenChunks: function(c) {
            return [].concat.apply([], c);
          }
        };
        s.setTyped = function(c) {
          c ? (s.Buf8 = Uint8Array, s.Buf16 = Uint16Array, s.Buf32 = Int32Array, s.assign(s, u)) : (s.Buf8 = Array, s.Buf16 = Array, s.Buf32 = Array, s.assign(s, a));
        }, s.setTyped(i);
      }, {}],
      42: [function(r, n, s) {
        var i = r("./common"), u = !0, a = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          u = !1;
        }
        try {
          String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
        } catch {
          a = !1;
        }
        for (var c = new i.Buf8(256), d = 0; d < 256; d++) c[d] = 252 <= d ? 6 : 248 <= d ? 5 : 240 <= d ? 4 : 224 <= d ? 3 : 192 <= d ? 2 : 1;
        function w(v, E) {
          if (E < 65537 && (v.subarray && a || !v.subarray && u)) return String.fromCharCode.apply(null, i.shrinkBuf(v, E));
          for (var m = "", f = 0; f < E; f++) m += String.fromCharCode(v[f]);
          return m;
        }
        c[254] = c[254] = 1, s.string2buf = function(v) {
          var E, m, f, y, _, k = v.length, x = 0;
          for (y = 0; y < k; y++) (64512 & (m = v.charCodeAt(y))) == 55296 && y + 1 < k && (64512 & (f = v.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), y++), x += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (E = new i.Buf8(x), y = _ = 0; _ < x; y++) (64512 & (m = v.charCodeAt(y))) == 55296 && y + 1 < k && (64512 & (f = v.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), y++), m < 128 ? E[_++] = m : (m < 2048 ? E[_++] = 192 | m >>> 6 : (m < 65536 ? E[_++] = 224 | m >>> 12 : (E[_++] = 240 | m >>> 18, E[_++] = 128 | m >>> 12 & 63), E[_++] = 128 | m >>> 6 & 63), E[_++] = 128 | 63 & m);
          return E;
        }, s.buf2binstring = function(v) {
          return w(v, v.length);
        }, s.binstring2buf = function(v) {
          for (var E = new i.Buf8(v.length), m = 0, f = E.length; m < f; m++) E[m] = v.charCodeAt(m);
          return E;
        }, s.buf2string = function(v, E) {
          var m, f, y, _, k = E || v.length, x = new Array(2 * k);
          for (m = f = 0; m < k; ) if ((y = v[m++]) < 128) x[f++] = y;
          else if (4 < (_ = c[y])) x[f++] = 65533, m += _ - 1;
          else {
            for (y &= _ === 2 ? 31 : _ === 3 ? 15 : 7; 1 < _ && m < k; ) y = y << 6 | 63 & v[m++], _--;
            1 < _ ? x[f++] = 65533 : y < 65536 ? x[f++] = y : (y -= 65536, x[f++] = 55296 | y >> 10 & 1023, x[f++] = 56320 | 1023 & y);
          }
          return w(x, f);
        }, s.utf8border = function(v, E) {
          var m;
          for ((E = E || v.length) > v.length && (E = v.length), m = E - 1; 0 <= m && (192 & v[m]) == 128; ) m--;
          return m < 0 || m === 0 ? E : m + c[v[m]] > E ? m : E;
        };
      }, { "./common": 41 }],
      43: [function(r, n, s) {
        n.exports = function(i, u, a, c) {
          for (var d = 65535 & i | 0, w = i >>> 16 & 65535 | 0, v = 0; a !== 0; ) {
            for (a -= v = 2e3 < a ? 2e3 : a; w = w + (d = d + u[c++] | 0) | 0, --v; ) ;
            d %= 65521, w %= 65521;
          }
          return d | w << 16 | 0;
        };
      }, {}],
      44: [function(r, n, s) {
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
      45: [function(r, n, s) {
        var i = (function() {
          for (var u, a = [], c = 0; c < 256; c++) {
            u = c;
            for (var d = 0; d < 8; d++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
            a[c] = u;
          }
          return a;
        })();
        n.exports = function(u, a, c, d) {
          var w = i, v = d + c;
          u ^= -1;
          for (var E = d; E < v; E++) u = u >>> 8 ^ w[255 & (u ^ a[E])];
          return -1 ^ u;
        };
      }, {}],
      46: [function(r, n, s) {
        var i, u = r("../utils/common"), a = r("./trees"), c = r("./adler32"), d = r("./crc32"), w = r("./messages"), v = 0, E = 4, m = 0, f = -2, y = -1, _ = 4, k = 2, x = 8, T = 9, S = 286, A = 30, b = 19, P = 2 * S + 1, M = 15, R = 3, K = 258, ee = K + R + 1, O = 42, z = 113, I = 1, H = 2, Q = 3, q = 4;
        function le(h, G) {
          return h.msg = w[G], G;
        }
        function Z(h) {
          return (h << 1) - (4 < h ? 9 : 0);
        }
        function te(h) {
          for (var G = h.length; 0 <= --G; ) h[G] = 0;
        }
        function V(h) {
          var G = h.state, N = G.pending;
          N > h.avail_out && (N = h.avail_out), N !== 0 && (u.arraySet(h.output, G.pending_buf, G.pending_out, N, h.next_out), h.next_out += N, G.pending_out += N, h.total_out += N, h.avail_out -= N, G.pending -= N, G.pending === 0 && (G.pending_out = 0));
        }
        function F(h, G) {
          a._tr_flush_block(h, 0 <= h.block_start ? h.block_start : -1, h.strstart - h.block_start, G), h.block_start = h.strstart, V(h.strm);
        }
        function X(h, G) {
          h.pending_buf[h.pending++] = G;
        }
        function Y(h, G) {
          h.pending_buf[h.pending++] = G >>> 8 & 255, h.pending_buf[h.pending++] = 255 & G;
        }
        function re(h, G) {
          var N, o, l = h.max_chain_length, g = h.strstart, B = h.prev_length, $ = h.nice_match, j = h.strstart > h.w_size - ee ? h.strstart - (h.w_size - ee) : 0, ie = h.window, ue = h.w_mask, oe = h.prev, de = h.strstart + K, me = ie[g + B - 1], we = ie[g + B];
          h.prev_length >= h.good_match && (l >>= 2), $ > h.lookahead && ($ = h.lookahead);
          do
            if (ie[(N = G) + B] === we && ie[N + B - 1] === me && ie[N] === ie[g] && ie[++N] === ie[g + 1]) {
              g += 2, N++;
              do
                ;
              while (ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && ie[++g] === ie[++N] && g < de);
              if (o = K - (de - g), g = de - K, B < o) {
                if (h.match_start = G, $ <= (B = o)) break;
                me = ie[g + B - 1], we = ie[g + B];
              }
            }
          while ((G = oe[G & ue]) > j && --l != 0);
          return B <= h.lookahead ? B : h.lookahead;
        }
        function pe(h) {
          var G, N, o, l, g, B, $, j, ie, ue, oe = h.w_size;
          do {
            if (l = h.window_size - h.lookahead - h.strstart, h.strstart >= oe + (oe - ee)) {
              for (u.arraySet(h.window, h.window, oe, oe, 0), h.match_start -= oe, h.strstart -= oe, h.block_start -= oe, G = N = h.hash_size; o = h.head[--G], h.head[G] = oe <= o ? o - oe : 0, --N; ) ;
              for (G = N = oe; o = h.prev[--G], h.prev[G] = oe <= o ? o - oe : 0, --N; ) ;
              l += oe;
            }
            if (h.strm.avail_in === 0) break;
            if (B = h.strm, $ = h.window, j = h.strstart + h.lookahead, ie = l, ue = void 0, ue = B.avail_in, ie < ue && (ue = ie), N = ue === 0 ? 0 : (B.avail_in -= ue, u.arraySet($, B.input, B.next_in, ue, j), B.state.wrap === 1 ? B.adler = c(B.adler, $, ue, j) : B.state.wrap === 2 && (B.adler = d(B.adler, $, ue, j)), B.next_in += ue, B.total_in += ue, ue), h.lookahead += N, h.lookahead + h.insert >= R) for (g = h.strstart - h.insert, h.ins_h = h.window[g], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[g + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[g + R - 1]) & h.hash_mask, h.prev[g & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = g, g++, h.insert--, !(h.lookahead + h.insert < R)); ) ;
          } while (h.lookahead < ee && h.strm.avail_in !== 0);
        }
        function C(h, G) {
          for (var N, o; ; ) {
            if (h.lookahead < ee) {
              if (pe(h), h.lookahead < ee && G === v) return I;
              if (h.lookahead === 0) break;
            }
            if (N = 0, h.lookahead >= R && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + R - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), N !== 0 && h.strstart - N <= h.w_size - ee && (h.match_length = re(h, N)), h.match_length >= R) if (o = a._tr_tally(h, h.strstart - h.match_start, h.match_length - R), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= R) {
              for (h.match_length--; h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + R - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart, --h.match_length != 0; ) ;
              h.strstart++;
            } else h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
            else o = a._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
            if (o && (F(h, !1), h.strm.avail_out === 0)) return I;
          }
          return h.insert = h.strstart < R - 1 ? h.strstart : R - 1, G === E ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : h.last_lit && (F(h, !1), h.strm.avail_out === 0) ? I : H;
        }
        function p(h, G) {
          for (var N, o, l; ; ) {
            if (h.lookahead < ee) {
              if (pe(h), h.lookahead < ee && G === v) return I;
              if (h.lookahead === 0) break;
            }
            if (N = 0, h.lookahead >= R && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + R - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = R - 1, N !== 0 && h.prev_length < h.max_lazy_match && h.strstart - N <= h.w_size - ee && (h.match_length = re(h, N), h.match_length <= 5 && (h.strategy === 1 || h.match_length === R && 4096 < h.strstart - h.match_start) && (h.match_length = R - 1)), h.prev_length >= R && h.match_length <= h.prev_length) {
              for (l = h.strstart + h.lookahead - R, o = a._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - R), h.lookahead -= h.prev_length - 1, h.prev_length -= 2; ++h.strstart <= l && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + R - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), --h.prev_length != 0; ) ;
              if (h.match_available = 0, h.match_length = R - 1, h.strstart++, o && (F(h, !1), h.strm.avail_out === 0)) return I;
            } else if (h.match_available) {
              if ((o = a._tr_tally(h, 0, h.window[h.strstart - 1])) && F(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0) return I;
            } else h.match_available = 1, h.strstart++, h.lookahead--;
          }
          return h.match_available && (o = a._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < R - 1 ? h.strstart : R - 1, G === E ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : h.last_lit && (F(h, !1), h.strm.avail_out === 0) ? I : H;
        }
        function W(h, G, N, o, l) {
          this.good_length = h, this.max_lazy = G, this.nice_length = N, this.max_chain = o, this.func = l;
        }
        function U() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(2 * P), this.dyn_dtree = new u.Buf16(2 * (2 * A + 1)), this.bl_tree = new u.Buf16(2 * (2 * b + 1)), te(this.dyn_ltree), te(this.dyn_dtree), te(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(M + 1), this.heap = new u.Buf16(2 * S + 1), te(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(2 * S + 1), te(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function ne(h) {
          var G;
          return h && h.state ? (h.total_in = h.total_out = 0, h.data_type = k, (G = h.state).pending = 0, G.pending_out = 0, G.wrap < 0 && (G.wrap = -G.wrap), G.status = G.wrap ? O : z, h.adler = G.wrap === 2 ? 0 : 1, G.last_flush = v, a._tr_init(G), m) : le(h, f);
        }
        function D(h) {
          var G = ne(h);
          return G === m && (function(N) {
            N.window_size = 2 * N.w_size, te(N.head), N.max_lazy_match = i[N.level].max_lazy, N.good_match = i[N.level].good_length, N.nice_match = i[N.level].nice_length, N.max_chain_length = i[N.level].max_chain, N.strstart = 0, N.block_start = 0, N.lookahead = 0, N.insert = 0, N.match_length = N.prev_length = R - 1, N.match_available = 0, N.ins_h = 0;
          })(h.state), G;
        }
        function L(h, G, N, o, l, g) {
          if (!h) return f;
          var B = 1;
          if (G === y && (G = 6), o < 0 ? (B = 0, o = -o) : 15 < o && (B = 2, o -= 16), l < 1 || T < l || N !== x || o < 8 || 15 < o || G < 0 || 9 < G || g < 0 || _ < g) return le(h, f);
          o === 8 && (o = 9);
          var $ = new U();
          return (h.state = $).strm = h, $.wrap = B, $.gzhead = null, $.w_bits = o, $.w_size = 1 << $.w_bits, $.w_mask = $.w_size - 1, $.hash_bits = l + 7, $.hash_size = 1 << $.hash_bits, $.hash_mask = $.hash_size - 1, $.hash_shift = ~~(($.hash_bits + R - 1) / R), $.window = new u.Buf8(2 * $.w_size), $.head = new u.Buf16($.hash_size), $.prev = new u.Buf16($.w_size), $.lit_bufsize = 1 << l + 6, $.pending_buf_size = 4 * $.lit_bufsize, $.pending_buf = new u.Buf8($.pending_buf_size), $.d_buf = 1 * $.lit_bufsize, $.l_buf = 3 * $.lit_bufsize, $.level = G, $.strategy = g, $.method = N, D(h);
        }
        i = [
          new W(0, 0, 0, 0, function(h, G) {
            var N = 65535;
            for (N > h.pending_buf_size - 5 && (N = h.pending_buf_size - 5); ; ) {
              if (h.lookahead <= 1) {
                if (pe(h), h.lookahead === 0 && G === v) return I;
                if (h.lookahead === 0) break;
              }
              h.strstart += h.lookahead, h.lookahead = 0;
              var o = h.block_start + N;
              if ((h.strstart === 0 || h.strstart >= o) && (h.lookahead = h.strstart - o, h.strstart = o, F(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - ee && (F(h, !1), h.strm.avail_out === 0)) return I;
            }
            return h.insert = 0, G === E ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : (h.strstart > h.block_start && (F(h, !1), h.strm.avail_out), I);
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
        ], s.deflateInit = function(h, G) {
          return L(h, G, x, 15, 8, 0);
        }, s.deflateInit2 = L, s.deflateReset = D, s.deflateResetKeep = ne, s.deflateSetHeader = function(h, G) {
          return h && h.state ? h.state.wrap !== 2 ? f : (h.state.gzhead = G, m) : f;
        }, s.deflate = function(h, G) {
          var N, o, l, g;
          if (!h || !h.state || 5 < G || G < 0) return h ? le(h, f) : f;
          if (o = h.state, !h.output || !h.input && h.avail_in !== 0 || o.status === 666 && G !== E) return le(h, h.avail_out === 0 ? -5 : f);
          if (o.strm = h, N = o.last_flush, o.last_flush = G, o.status === O) if (o.wrap === 2) h.adler = 0, X(o, 31), X(o, 139), X(o, 8), o.gzhead ? (X(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)), X(o, 255 & o.gzhead.time), X(o, o.gzhead.time >> 8 & 255), X(o, o.gzhead.time >> 16 & 255), X(o, o.gzhead.time >> 24 & 255), X(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), X(o, 255 & o.gzhead.os), o.gzhead.extra && o.gzhead.extra.length && (X(o, 255 & o.gzhead.extra.length), X(o, o.gzhead.extra.length >> 8 & 255)), o.gzhead.hcrc && (h.adler = d(h.adler, o.pending_buf, o.pending, 0)), o.gzindex = 0, o.status = 69) : (X(o, 0), X(o, 0), X(o, 0), X(o, 0), X(o, 0), X(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), X(o, 3), o.status = z);
          else {
            var B = x + (o.w_bits - 8 << 4) << 8;
            B |= (2 <= o.strategy || o.level < 2 ? 0 : o.level < 6 ? 1 : o.level === 6 ? 2 : 3) << 6, o.strstart !== 0 && (B |= 32), B += 31 - B % 31, o.status = z, Y(o, B), o.strstart !== 0 && (Y(o, h.adler >>> 16), Y(o, 65535 & h.adler)), h.adler = 1;
          }
          if (o.status === 69) if (o.gzhead.extra) {
            for (l = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), V(h), l = o.pending, o.pending !== o.pending_buf_size)); ) X(o, 255 & o.gzhead.extra[o.gzindex]), o.gzindex++;
            o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), o.gzindex === o.gzhead.extra.length && (o.gzindex = 0, o.status = 73);
          } else o.status = 73;
          if (o.status === 73) if (o.gzhead.name) {
            l = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), V(h), l = o.pending, o.pending === o.pending_buf_size)) {
                g = 1;
                break;
              }
              g = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++) : 0, X(o, g);
            } while (g !== 0);
            o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), g === 0 && (o.gzindex = 0, o.status = 91);
          } else o.status = 91;
          if (o.status === 91) if (o.gzhead.comment) {
            l = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), V(h), l = o.pending, o.pending === o.pending_buf_size)) {
                g = 1;
                break;
              }
              g = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++) : 0, X(o, g);
            } while (g !== 0);
            o.gzhead.hcrc && o.pending > l && (h.adler = d(h.adler, o.pending_buf, o.pending - l, l)), g === 0 && (o.status = 103);
          } else o.status = 103;
          if (o.status === 103 && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && V(h), o.pending + 2 <= o.pending_buf_size && (X(o, 255 & h.adler), X(o, h.adler >> 8 & 255), h.adler = 0, o.status = z)) : o.status = z), o.pending !== 0) {
            if (V(h), h.avail_out === 0) return o.last_flush = -1, m;
          } else if (h.avail_in === 0 && Z(G) <= Z(N) && G !== E) return le(h, -5);
          if (o.status === 666 && h.avail_in !== 0) return le(h, -5);
          if (h.avail_in !== 0 || o.lookahead !== 0 || G !== v && o.status !== 666) {
            var $ = o.strategy === 2 ? (function(j, ie) {
              for (var ue; ; ) {
                if (j.lookahead === 0 && (pe(j), j.lookahead === 0)) {
                  if (ie === v) return I;
                  break;
                }
                if (j.match_length = 0, ue = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++, ue && (F(j, !1), j.strm.avail_out === 0)) return I;
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
                if (j.match_length >= R ? (ue = a._tr_tally(j, 1, j.match_length - R), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (ue = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), ue && (F(j, !1), j.strm.avail_out === 0)) return I;
              }
              return j.insert = 0, ie === E ? (F(j, !0), j.strm.avail_out === 0 ? Q : q) : j.last_lit && (F(j, !1), j.strm.avail_out === 0) ? I : H;
            })(o, G) : i[o.level].func(o, G);
            if ($ !== Q && $ !== q || (o.status = 666), $ === I || $ === Q) return h.avail_out === 0 && (o.last_flush = -1), m;
            if ($ === H && (G === 1 ? a._tr_align(o) : G !== 5 && (a._tr_stored_block(o, 0, 0, !1), G === 3 && (te(o.head), o.lookahead === 0 && (o.strstart = 0, o.block_start = 0, o.insert = 0))), V(h), h.avail_out === 0)) return o.last_flush = -1, m;
          }
          return G !== E ? m : o.wrap <= 0 ? 1 : (o.wrap === 2 ? (X(o, 255 & h.adler), X(o, h.adler >> 8 & 255), X(o, h.adler >> 16 & 255), X(o, h.adler >> 24 & 255), X(o, 255 & h.total_in), X(o, h.total_in >> 8 & 255), X(o, h.total_in >> 16 & 255), X(o, h.total_in >> 24 & 255)) : (Y(o, h.adler >>> 16), Y(o, 65535 & h.adler)), V(h), 0 < o.wrap && (o.wrap = -o.wrap), o.pending !== 0 ? m : 1);
        }, s.deflateEnd = function(h) {
          var G;
          return h && h.state ? (G = h.state.status) !== O && G !== 69 && G !== 73 && G !== 91 && G !== 103 && G !== z && G !== 666 ? le(h, f) : (h.state = null, G === z ? le(h, -3) : m) : f;
        }, s.deflateSetDictionary = function(h, G) {
          var N, o, l, g, B, $, j, ie, ue = G.length;
          if (!h || !h.state || (g = (N = h.state).wrap) === 2 || g === 1 && N.status !== O || N.lookahead) return f;
          for (g === 1 && (h.adler = c(h.adler, G, ue, 0)), N.wrap = 0, ue >= N.w_size && (g === 0 && (te(N.head), N.strstart = 0, N.block_start = 0, N.insert = 0), ie = new u.Buf8(N.w_size), u.arraySet(ie, G, ue - N.w_size, N.w_size, 0), G = ie, ue = N.w_size), B = h.avail_in, $ = h.next_in, j = h.input, h.avail_in = ue, h.next_in = 0, h.input = G, pe(N); N.lookahead >= R; ) {
            for (o = N.strstart, l = N.lookahead - (R - 1); N.ins_h = (N.ins_h << N.hash_shift ^ N.window[o + R - 1]) & N.hash_mask, N.prev[o & N.w_mask] = N.head[N.ins_h], N.head[N.ins_h] = o, o++, --l; ) ;
            N.strstart = o, N.lookahead = R - 1, pe(N);
          }
          return N.strstart += N.lookahead, N.block_start = N.strstart, N.insert = N.lookahead, N.lookahead = 0, N.match_length = N.prev_length = R - 1, N.match_available = 0, h.next_in = $, h.input = j, h.avail_in = B, N.wrap = g, m;
        }, s.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, n, s) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, n, s) {
        n.exports = function(i, u) {
          var a = i.state, c = i.next_in, d, w, v, E, m, f, y, _, k, x, T, S, A, b, P, M, R, K, ee, O, z, I = i.input, H;
          d = c + (i.avail_in - 5), w = i.next_out, H = i.output, v = w - (u - i.avail_out), E = w + (i.avail_out - 257), m = a.dmax, f = a.wsize, y = a.whave, _ = a.wnext, k = a.window, x = a.hold, T = a.bits, S = a.lencode, A = a.distcode, b = (1 << a.lenbits) - 1, P = (1 << a.distbits) - 1;
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
                    a.mode = 12;
                    break e;
                  }
                  i.msg = "invalid literal/length code", a.mode = 30;
                  break e;
                }
                K = 65535 & M, (R &= 15) && (T < R && (x += I[c++] << T, T += 8), K += x & (1 << R) - 1, x >>>= R, T -= R), T < 15 && (x += I[c++] << T, T += 8, x += I[c++] << T, T += 8), M = A[x & P];
                r: for (; ; ) {
                  if (x >>>= R = M >>> 24, T -= R, !(16 & (R = M >>> 16 & 255))) {
                    if ((64 & R) == 0) {
                      M = A[(65535 & M) + (x & (1 << R) - 1)];
                      continue r;
                    }
                    i.msg = "invalid distance code", a.mode = 30;
                    break e;
                  }
                  if (ee = 65535 & M, T < (R &= 15) && (x += I[c++] << T, (T += 8) < R && (x += I[c++] << T, T += 8)), m < (ee += x & (1 << R) - 1)) {
                    i.msg = "invalid distance too far back", a.mode = 30;
                    break e;
                  }
                  if (x >>>= R, T -= R, (R = w - v) < ee) {
                    if (y < (R = ee - R) && a.sane) {
                      i.msg = "invalid distance too far back", a.mode = 30;
                      break e;
                    }
                    if (z = k, (O = 0) === _) {
                      if (O += f - R, R < K) {
                        for (K -= R; H[w++] = k[O++], --R; ) ;
                        O = w - ee, z = H;
                      }
                    } else if (_ < R) {
                      if (O += f + _ - R, (R -= _) < K) {
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
          } while (c < d && w < E);
          c -= K = T >> 3, x &= (1 << (T -= K << 3)) - 1, i.next_in = c, i.next_out = w, i.avail_in = c < d ? d - c + 5 : 5 - (c - d), i.avail_out = w < E ? E - w + 257 : 257 - (w - E), a.hold = x, a.bits = T;
        };
      }, {}],
      49: [function(r, n, s) {
        var i = r("../utils/common"), u = r("./adler32"), a = r("./crc32"), c = r("./inffast"), d = r("./inftrees"), w = 1, v = 2, E = 0, m = -2, f = 1, y = 852, _ = 592;
        function k(O) {
          return (O >>> 24 & 255) + (O >>> 8 & 65280) + ((65280 & O) << 8) + ((255 & O) << 24);
        }
        function x() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function T(O) {
          var z;
          return O && O.state ? (z = O.state, O.total_in = O.total_out = z.total = 0, O.msg = "", z.wrap && (O.adler = 1 & z.wrap), z.mode = f, z.last = 0, z.havedict = 0, z.dmax = 32768, z.head = null, z.hold = 0, z.bits = 0, z.lencode = z.lendyn = new i.Buf32(y), z.distcode = z.distdyn = new i.Buf32(_), z.sane = 1, z.back = -1, E) : m;
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
            for (d(w, O.lens, 0, 288, P, 0, O.work, { bits: 9 }), z = 0; z < 32; ) O.lens[z++] = 5;
            d(v, O.lens, 0, 32, M, 0, O.work, { bits: 5 }), R = !1;
          }
          O.lencode = P, O.lenbits = 9, O.distcode = M, O.distbits = 5;
        }
        function ee(O, z, I, H) {
          var Q, q = O.state;
          return q.window === null && (q.wsize = 1 << q.wbits, q.wnext = 0, q.whave = 0, q.window = new i.Buf8(q.wsize)), H >= q.wsize ? (i.arraySet(q.window, z, I - q.wsize, q.wsize, 0), q.wnext = 0, q.whave = q.wsize) : (H < (Q = q.wsize - q.wnext) && (Q = H), i.arraySet(q.window, z, I - H, Q, q.wnext), (H -= Q) ? (i.arraySet(q.window, z, I - H, H, 0), q.wnext = H, q.whave = q.wsize) : (q.wnext += Q, q.wnext === q.wsize && (q.wnext = 0), q.whave < q.wsize && (q.whave += Q))), 0;
        }
        s.inflateReset = S, s.inflateReset2 = A, s.inflateResetKeep = T, s.inflateInit = function(O) {
          return b(O, 15);
        }, s.inflateInit2 = b, s.inflate = function(O, z) {
          var I, H, Q, q, le, Z, te, V, F, X, Y, re, pe, C, p, W, U, ne, D, L, h, G, N, o, l = 0, g = new i.Buf8(4), B = [
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
          (I = O.state).mode === 12 && (I.mode = 13), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Z = O.avail_in, V = I.hold, F = I.bits, X = Z, Y = te, G = E;
          e: for (; ; ) switch (I.mode) {
            case f:
              if (I.wrap === 0) {
                I.mode = 13;
                break;
              }
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (2 & I.wrap && V === 35615) {
                g[I.check = 0] = 255 & V, g[1] = V >>> 8 & 255, I.check = a(I.check, g, 2, 0), F = V = 0, I.mode = 2;
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
              if (F -= 4, h = 8 + (15 & (V >>>= 4)), I.wbits === 0) I.wbits = h;
              else if (h > I.wbits) {
                O.msg = "invalid window size", I.mode = 30;
                break;
              }
              I.dmax = 1 << h, O.adler = I.check = 1, I.mode = 512 & V ? 10 : 12, F = V = 0;
              break;
            case 2:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (I.flags = V, (255 & I.flags) != 8) {
                O.msg = "unknown compression method", I.mode = 30;
                break;
              }
              if (57344 & I.flags) {
                O.msg = "unknown header flags set", I.mode = 30;
                break;
              }
              I.head && (I.head.text = V >> 8 & 1), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = a(I.check, g, 2, 0)), F = V = 0, I.mode = 3;
            case 3:
              for (; F < 32; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              I.head && (I.head.time = V), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, g[2] = V >>> 16 & 255, g[3] = V >>> 24 & 255, I.check = a(I.check, g, 4, 0)), F = V = 0, I.mode = 4;
            case 4:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              I.head && (I.head.xflags = 255 & V, I.head.os = V >> 8), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = a(I.check, g, 2, 0)), F = V = 0, I.mode = 5;
            case 5:
              if (1024 & I.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                I.length = V, I.head && (I.head.extra_len = V), 512 & I.flags && (g[0] = 255 & V, g[1] = V >>> 8 & 255, I.check = a(I.check, g, 2, 0)), F = V = 0;
              } else I.head && (I.head.extra = null);
              I.mode = 6;
            case 6:
              if (1024 & I.flags && (Z < (re = I.length) && (re = Z), re && (I.head && (h = I.head.extra_len - I.length, I.head.extra || (I.head.extra = new Array(I.head.extra_len)), i.arraySet(I.head.extra, H, q, re, h)), 512 & I.flags && (I.check = a(I.check, H, re, q)), Z -= re, q += re, I.length -= re), I.length)) break e;
              I.length = 0, I.mode = 7;
            case 7:
              if (2048 & I.flags) {
                if (Z === 0) break e;
                for (re = 0; h = H[q + re++], I.head && h && I.length < 65536 && (I.head.name += String.fromCharCode(h)), h && re < Z; ) ;
                if (512 & I.flags && (I.check = a(I.check, H, re, q)), Z -= re, q += re, h) break e;
              } else I.head && (I.head.name = null);
              I.length = 0, I.mode = 8;
            case 8:
              if (4096 & I.flags) {
                if (Z === 0) break e;
                for (re = 0; h = H[q + re++], I.head && h && I.length < 65536 && (I.head.comment += String.fromCharCode(h)), h && re < Z; ) ;
                if (512 & I.flags && (I.check = a(I.check, H, re, q)), Z -= re, q += re, h) break e;
              } else I.head && (I.head.comment = null);
              I.mode = 9;
            case 9:
              if (512 & I.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
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
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              O.adler = I.check = k(V), F = V = 0, I.mode = 11;
            case 11:
              if (I.havedict === 0) return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, I.hold = V, I.bits = F, 2;
              O.adler = I.check = 1, I.mode = 12;
            case 12:
              if (z === 5 || z === 6) break e;
            case 13:
              if (I.last) {
                V >>>= 7 & F, F -= 7 & F, I.mode = 27;
                break;
              }
              for (; F < 3; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
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
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
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
                if (Z < re && (re = Z), te < re && (re = te), re === 0) break e;
                i.arraySet(Q, H, q, re, le), Z -= re, q += re, te -= re, le += re, I.length -= re;
                break;
              }
              I.mode = 12;
              break;
            case 17:
              for (; F < 14; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (I.nlen = 257 + (31 & V), V >>>= 5, F -= 5, I.ndist = 1 + (31 & V), V >>>= 5, F -= 5, I.ncode = 4 + (15 & V), V >>>= 4, F -= 4, 286 < I.nlen || 30 < I.ndist) {
                O.msg = "too many length or distance symbols", I.mode = 30;
                break;
              }
              I.have = 0, I.mode = 18;
            case 18:
              for (; I.have < I.ncode; ) {
                for (; F < 3; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                I.lens[B[I.have++]] = 7 & V, V >>>= 3, F -= 3;
              }
              for (; I.have < 19; ) I.lens[B[I.have++]] = 0;
              if (I.lencode = I.lendyn, I.lenbits = 7, N = { bits: I.lenbits }, G = d(0, I.lens, 0, 19, I.lencode, 0, I.work, N), I.lenbits = N.bits, G) {
                O.msg = "invalid code lengths set", I.mode = 30;
                break;
              }
              I.have = 0, I.mode = 19;
            case 19:
              for (; I.have < I.nlen + I.ndist; ) {
                for (; W = (l = I.lencode[V & (1 << I.lenbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                if (U < 16) V >>>= p, F -= p, I.lens[I.have++] = U;
                else {
                  if (U === 16) {
                    for (o = p + 2; F < o; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    if (V >>>= p, F -= p, I.have === 0) {
                      O.msg = "invalid bit length repeat", I.mode = 30;
                      break;
                    }
                    h = I.lens[I.have - 1], re = 3 + (3 & V), V >>>= 2, F -= 2;
                  } else if (U === 17) {
                    for (o = p + 3; F < o; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    F -= p, h = 0, re = 3 + (7 & (V >>>= p)), V >>>= 3, F -= 3;
                  } else {
                    for (o = p + 7; F < o; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    F -= p, h = 0, re = 11 + (127 & (V >>>= p)), V >>>= 7, F -= 7;
                  }
                  if (I.have + re > I.nlen + I.ndist) {
                    O.msg = "invalid bit length repeat", I.mode = 30;
                    break;
                  }
                  for (; re--; ) I.lens[I.have++] = h;
                }
              }
              if (I.mode === 30) break;
              if (I.lens[256] === 0) {
                O.msg = "invalid code -- missing end-of-block", I.mode = 30;
                break;
              }
              if (I.lenbits = 9, N = { bits: I.lenbits }, G = d(w, I.lens, 0, I.nlen, I.lencode, 0, I.work, N), I.lenbits = N.bits, G) {
                O.msg = "invalid literal/lengths set", I.mode = 30;
                break;
              }
              if (I.distbits = 6, I.distcode = I.distdyn, N = { bits: I.distbits }, G = d(v, I.lens, I.nlen, I.ndist, I.distcode, 0, I.work, N), I.distbits = N.bits, G) {
                O.msg = "invalid distances set", I.mode = 30;
                break;
              }
              if (I.mode = 20, z === 6) break e;
            case 20:
              I.mode = 21;
            case 21:
              if (6 <= Z && 258 <= te) {
                O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, I.hold = V, I.bits = F, c(O, Y), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Z = O.avail_in, V = I.hold, F = I.bits, I.mode === 12 && (I.back = -1);
                break;
              }
              for (I.back = 0; W = (l = I.lencode[V & (1 << I.lenbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (W && (240 & W) == 0) {
                for (ne = p, D = W, L = U; W = (l = I.lencode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & l, !(ne + (p = l >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
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
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                I.length += V & (1 << I.extra) - 1, V >>>= I.extra, F -= I.extra, I.back += I.extra;
              }
              I.was = I.length, I.mode = 23;
            case 23:
              for (; W = (l = I.distcode[V & (1 << I.distbits) - 1]) >>> 16 & 255, U = 65535 & l, !((p = l >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if ((240 & W) == 0) {
                for (ne = p, D = W, L = U; W = (l = I.distcode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & l, !(ne + (p = l >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
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
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
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
              if (re = Y - te, I.offset > re) {
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
                  if (Z === 0) break e;
                  Z--, V |= H[q++] << F, F += 8;
                }
                if (Y -= te, O.total_out += Y, I.total += Y, Y && (O.adler = I.check = I.flags ? a(I.check, Q, Y, le - Y) : u(I.check, Q, Y, le - Y)), Y = te, (I.flags ? V : k(V)) !== I.check) {
                  O.msg = "incorrect data check", I.mode = 30;
                  break;
                }
                F = V = 0;
              }
              I.mode = 28;
            case 28:
              if (I.wrap && I.flags) {
                for (; F < 32; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
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
          return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, I.hold = V, I.bits = F, (I.wsize || Y !== O.avail_out && I.mode < 30 && (I.mode < 27 || z !== 4)) && ee(O, O.output, O.next_out, Y - O.avail_out) ? (I.mode = 31, -4) : (X -= O.avail_in, Y -= O.avail_out, O.total_in += X, O.total_out += Y, I.total += Y, I.wrap && Y && (O.adler = I.check = I.flags ? a(I.check, Q, Y, O.next_out - Y) : u(I.check, Q, Y, O.next_out - Y)), O.data_type = I.bits + (I.last ? 64 : 0) + (I.mode === 12 ? 128 : 0) + (I.mode === 20 || I.mode === 15 ? 256 : 0), (X == 0 && Y === 0 || z === 4) && G === E && (G = -5), G);
        }, s.inflateEnd = function(O) {
          if (!O || !O.state) return m;
          var z = O.state;
          return z.window && (z.window = null), O.state = null, E;
        }, s.inflateGetHeader = function(O, z) {
          var I;
          return O && O.state ? (2 & (I = O.state).wrap) == 0 ? m : ((I.head = z).done = !1, E) : m;
        }, s.inflateSetDictionary = function(O, z) {
          var I, H = z.length;
          return O && O.state ? (I = O.state).wrap !== 0 && I.mode !== 11 ? m : I.mode === 11 && u(1, z, H, 0) !== I.check ? -3 : ee(O, z, H, H) ? (I.mode = 31, -4) : (I.havedict = 1, E) : m;
        }, s.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, n, s) {
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
        ], a = [
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
        ], d = [
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
        n.exports = function(w, v, E, m, f, y, _, k) {
          var x, T, S, A, b, P, M, R, K, ee = k.bits, O = 0, z = 0, I = 0, H = 0, Q = 0, q = 0, le = 0, Z = 0, te = 0, V = 0, F = null, X = 0, Y = new i.Buf16(16), re = new i.Buf16(16), pe = null, C = 0;
          for (O = 0; O <= 15; O++) Y[O] = 0;
          for (z = 0; z < m; z++) Y[v[E + z]]++;
          for (Q = ee, H = 15; 1 <= H && Y[H] === 0; H--) ;
          if (H < Q && (Q = H), H === 0) return f[y++] = 20971520, f[y++] = 20971520, k.bits = 1, 0;
          for (I = 1; I < H && Y[I] === 0; I++) ;
          for (Q < I && (Q = I), O = Z = 1; O <= 15; O++) if (Z <<= 1, (Z -= Y[O]) < 0) return -1;
          if (0 < Z && (w === 0 || H !== 1)) return -1;
          for (re[1] = 0, O = 1; O < 15; O++) re[O + 1] = re[O] + Y[O];
          for (z = 0; z < m; z++) v[E + z] !== 0 && (_[re[v[E + z]]++] = z);
          if (P = w === 0 ? (F = pe = _, 19) : w === 1 ? (F = u, X -= 257, pe = a, C -= 257, 256) : (F = c, pe = d, -1), O = I, b = y, le = z = V = 0, S = -1, A = (te = 1 << (q = Q)) - 1, w === 1 && 852 < te || w === 2 && 592 < te) return 1;
          for (; ; ) {
            for (M = O - le, K = _[z] < P ? (R = 0, _[z]) : _[z] > P ? (R = pe[C + _[z]], F[X + _[z]]) : (R = 96, 0), x = 1 << O - le, I = T = 1 << q; f[b + (V >> le) + (T -= x)] = M << 24 | R << 16 | K | 0, T !== 0; ) ;
            for (x = 1 << O - 1; V & x; ) x >>= 1;
            if (x !== 0 ? (V &= x - 1, V += x) : V = 0, z++, --Y[O] == 0) {
              if (O === H) break;
              O = v[E + _[z]];
            }
            if (Q < O && (V & A) !== S) {
              for (le === 0 && (le = Q), b += I, Z = 1 << (q = O - le); q + le < H && !((Z -= Y[q + le]) <= 0); ) q++, Z <<= 1;
              if (te += 1 << q, w === 1 && 852 < te || w === 2 && 592 < te) return 1;
              f[S = V & A] = Q << 24 | q << 16 | b - y | 0;
            }
          }
          return V !== 0 && (f[b + V] = O - le << 24 | 4194304), k.bits = Q, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, n, s) {
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
      52: [function(r, n, s) {
        var i = r("../utils/common"), u = 0, a = 1;
        function c(l) {
          for (var g = l.length; 0 <= --g; ) l[g] = 0;
        }
        var d = 0, w = 29, v = 256, E = v + 1 + w, m = 30, f = 19, y = 2 * E + 1, _ = 15, k = 16, x = 7, T = 256, S = 16, A = 17, b = 18, P = [
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
        var Q, q, le, Z = new Array(m);
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
        function Y(l, g, B) {
          l.bi_valid > k - B ? (l.bi_buf |= g << l.bi_valid & 65535, X(l, l.bi_buf), l.bi_buf = g >> k - l.bi_valid, l.bi_valid += B - k) : (l.bi_buf |= g << l.bi_valid & 65535, l.bi_valid += B);
        }
        function re(l, g, B) {
          Y(l, B[2 * g], B[2 * g + 1]);
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
          for (g = 0; g < f; g++) l.bl_tree[2 * g] = 0;
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
          if (l.last_lit !== 0) for (; $ = l.pending_buf[l.d_buf + 2 * oe] << 8 | l.pending_buf[l.d_buf + 2 * oe + 1], j = l.pending_buf[l.l_buf + oe], oe++, $ === 0 ? re(l, j, g) : (re(l, (ie = I[j]) + v + 1, g), (ue = P[ie]) !== 0 && Y(l, j -= H[ie], ue), re(l, ie = F(--$), B), (ue = M[ie]) !== 0 && Y(l, $ -= Z[ie], ue)), oe < l.last_lit; ) ;
          re(l, T, g);
        }
        function L(l, g) {
          var B, $, j, ie = g.dyn_tree, ue = g.stat_desc.static_tree, oe = g.stat_desc.has_stree, de = g.stat_desc.elems, me = -1;
          for (l.heap_len = 0, l.heap_max = y, B = 0; B < de; B++) ie[2 * B] !== 0 ? (l.heap[++l.heap_len] = me = B, l.depth[B] = 0) : ie[2 * B + 1] = 0;
          for (; l.heap_len < 2; ) ie[2 * (j = l.heap[++l.heap_len] = me < 2 ? ++me : 0)] = 1, l.depth[j] = 0, l.opt_len--, oe && (l.static_len -= ue[2 * j + 1]);
          for (g.max_code = me, B = l.heap_len >> 1; 1 <= B; B--) ne(l, ie, B);
          for (j = de; B = l.heap[1], l.heap[1] = l.heap[l.heap_len--], ne(l, ie, 1), $ = l.heap[1], l.heap[--l.heap_max] = B, l.heap[--l.heap_max] = $, ie[2 * j] = ie[2 * B] + ie[2 * $], l.depth[j] = (l.depth[B] >= l.depth[$] ? l.depth[B] : l.depth[$]) + 1, ie[2 * B + 1] = ie[2 * $ + 1] = j, l.heap[1] = j++, ne(l, ie, 1), 2 <= l.heap_len; ) ;
          l.heap[--l.heap_max] = l.heap[1], (function(we, Ae) {
            var nt, ze, Nt, Ee, nr, Or, Ye = Ae.dyn_tree, jn = Ae.max_code, _s = Ae.stat_desc.static_tree, xs = Ae.stat_desc.has_stree, Es = Ae.stat_desc.extra_bits, zn = Ae.stat_desc.extra_base, Ot = Ae.stat_desc.max_length, ir = 0;
            for (Ee = 0; Ee <= _; Ee++) we.bl_count[Ee] = 0;
            for (Ye[2 * we.heap[we.heap_max] + 1] = 0, nt = we.heap_max + 1; nt < y; nt++) Ot < (Ee = Ye[2 * Ye[2 * (ze = we.heap[nt]) + 1] + 1] + 1) && (Ee = Ot, ir++), Ye[2 * ze + 1] = Ee, jn < ze || (we.bl_count[Ee]++, nr = 0, zn <= ze && (nr = Es[ze - zn]), Or = Ye[2 * ze], we.opt_len += Or * (Ee + nr), xs && (we.static_len += Or * (_s[2 * ze + 1] + nr)));
            if (ir !== 0) {
              do {
                for (Ee = Ot - 1; we.bl_count[Ee] === 0; ) Ee--;
                we.bl_count[Ee]--, we.bl_count[Ee + 1] += 2, we.bl_count[Ot]--, ir -= 2;
              } while (0 < ir);
              for (Ee = Ot; Ee !== 0; Ee--) for (ze = we.bl_count[Ee]; ze !== 0; ) jn < (Nt = we.heap[--nt]) || (Ye[2 * Nt + 1] !== Ee && (we.opt_len += (Ee - Ye[2 * Nt + 1]) * Ye[2 * Nt], Ye[2 * Nt + 1] = Ee), ze--);
            }
          })(l, g), C(ie, me, l.bl_count);
        }
        function h(l, g, B) {
          var $, j, ie = -1, ue = g[1], oe = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), g[2 * (B + 1) + 1] = 65535, $ = 0; $ <= B; $++) j = ue, ue = g[2 * ($ + 1) + 1], ++oe < de && j === ue || (oe < me ? l.bl_tree[2 * j] += oe : j !== 0 ? (j !== ie && l.bl_tree[2 * j]++, l.bl_tree[2 * S]++) : oe <= 10 ? l.bl_tree[2 * A]++ : l.bl_tree[2 * b]++, ie = j, me = (oe = 0) === ue ? (de = 138, 3) : j === ue ? (de = 6, 3) : (de = 7, 4));
        }
        function G(l, g, B) {
          var $, j, ie = -1, ue = g[1], oe = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), $ = 0; $ <= B; $++) if (j = ue, ue = g[2 * ($ + 1) + 1], !(++oe < de && j === ue)) {
            if (oe < me) for (; re(l, j, l.bl_tree), --oe != 0; ) ;
            else j !== 0 ? (j !== ie && (re(l, j, l.bl_tree), oe--), re(l, S, l.bl_tree), Y(l, oe - 3, 2)) : oe <= 10 ? (re(l, A, l.bl_tree), Y(l, oe - 3, 3)) : (re(l, b, l.bl_tree), Y(l, oe - 11, 7));
            ie = j, me = (oe = 0) === ue ? (de = 138, 3) : j === ue ? (de = 6, 3) : (de = 7, 4);
          }
        }
        c(Z);
        var N = !1;
        function o(l, g, B, $) {
          Y(l, (d << 1) + ($ ? 1 : 0), 3), (function(j, ie, ue, oe) {
            W(j), X(j, ue), X(j, ~ue), i.arraySet(j.pending_buf, j.window, ie, ue, j.pending), j.pending += ue;
          })(l, g, B);
        }
        s._tr_init = function(l) {
          N || ((function() {
            var g, B, $, j, ie, ue = new Array(_ + 1);
            for (j = $ = 0; j < w - 1; j++) for (H[j] = $, g = 0; g < 1 << P[j]; g++) I[$++] = j;
            for (I[$ - 1] = j, j = ie = 0; j < 16; j++) for (Z[j] = ie, g = 0; g < 1 << M[j]; g++) z[ie++] = j;
            for (ie >>= 7; j < m; j++) for (Z[j] = ie << 7, g = 0; g < 1 << M[j] - 7; g++) z[256 + ie++] = j;
            for (B = 0; B <= _; B++) ue[B] = 0;
            for (g = 0; g <= 143; ) ee[2 * g + 1] = 8, g++, ue[8]++;
            for (; g <= 255; ) ee[2 * g + 1] = 9, g++, ue[9]++;
            for (; g <= 279; ) ee[2 * g + 1] = 7, g++, ue[7]++;
            for (; g <= 287; ) ee[2 * g + 1] = 8, g++, ue[8]++;
            for (C(ee, E + 1, ue), g = 0; g < m; g++) O[2 * g + 1] = 5, O[2 * g] = pe(g, 5);
            Q = new te(ee, P, v + 1, E, _), q = new te(O, M, 0, m, _), le = new te(new Array(0), R, 0, f, x);
          })(), N = !0), l.l_desc = new V(l.dyn_ltree, Q), l.d_desc = new V(l.dyn_dtree, q), l.bl_desc = new V(l.bl_tree, le), l.bi_buf = 0, l.bi_valid = 0, p(l);
        }, s._tr_stored_block = o, s._tr_flush_block = function(l, g, B, $) {
          var j, ie, ue = 0;
          0 < l.level ? (l.strm.data_type === 2 && (l.strm.data_type = (function(oe) {
            var de, me = 4093624447;
            for (de = 0; de <= 31; de++, me >>>= 1) if (1 & me && oe.dyn_ltree[2 * de] !== 0) return u;
            if (oe.dyn_ltree[18] !== 0 || oe.dyn_ltree[20] !== 0 || oe.dyn_ltree[26] !== 0) return a;
            for (de = 32; de < v; de++) if (oe.dyn_ltree[2 * de] !== 0) return a;
            return u;
          })(l)), L(l, l.l_desc), L(l, l.d_desc), ue = (function(oe) {
            var de;
            for (h(oe, oe.dyn_ltree, oe.l_desc.max_code), h(oe, oe.dyn_dtree, oe.d_desc.max_code), L(oe, oe.bl_desc), de = f - 1; 3 <= de && oe.bl_tree[2 * K[de] + 1] === 0; de--) ;
            return oe.opt_len += 3 * (de + 1) + 5 + 5 + 4, de;
          })(l), j = l.opt_len + 3 + 7 >>> 3, (ie = l.static_len + 3 + 7 >>> 3) <= j && (j = ie)) : j = ie = B + 5, B + 4 <= j && g !== -1 ? o(l, g, B, $) : l.strategy === 4 || ie === j ? (Y(l, 2 + ($ ? 1 : 0), 3), D(l, ee, O)) : (Y(l, 4 + ($ ? 1 : 0), 3), (function(oe, de, me, we) {
            var Ae;
            for (Y(oe, de - 257, 5), Y(oe, me - 1, 5), Y(oe, we - 4, 4), Ae = 0; Ae < we; Ae++) Y(oe, oe.bl_tree[2 * K[Ae] + 1], 3);
            G(oe, oe.dyn_ltree, de - 1), G(oe, oe.dyn_dtree, me - 1);
          })(l, l.l_desc.max_code + 1, l.d_desc.max_code + 1, ue + 1), D(l, l.dyn_ltree, l.dyn_dtree)), p(l), $ && W(l);
        }, s._tr_tally = function(l, g, B) {
          return l.pending_buf[l.d_buf + 2 * l.last_lit] = g >>> 8 & 255, l.pending_buf[l.d_buf + 2 * l.last_lit + 1] = 255 & g, l.pending_buf[l.l_buf + l.last_lit] = 255 & B, l.last_lit++, g === 0 ? l.dyn_ltree[2 * B]++ : (l.matches++, g--, l.dyn_ltree[2 * (I[B] + v + 1)]++, l.dyn_dtree[2 * F(g)]++), l.last_lit === l.lit_bufsize - 1;
        }, s._tr_align = function(l) {
          Y(l, 2, 3), re(l, T, ee), (function(g) {
            g.bi_valid === 16 ? (X(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : 8 <= g.bi_valid && (g.pending_buf[g.pending++] = 255 & g.bi_buf, g.bi_buf >>= 8, g.bi_valid -= 8);
          })(l);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, n, s) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, n, s) {
        (function(i) {
          (function(u, a) {
            if (!u.setImmediate) {
              var c, d, w, v, E = 1, m = {}, f = !1, y = u.document, _ = Object.getPrototypeOf && Object.getPrototypeOf(u);
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
              }) : y && "onreadystatechange" in y.createElement("script") ? (d = y.documentElement, function(S) {
                var A = y.createElement("script");
                A.onreadystatechange = function() {
                  x(S), A.onreadystatechange = null, d.removeChild(A), A = null;
                }, d.appendChild(A);
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
              if (f) setTimeout(x, 0, S);
              else {
                var A = m[S];
                if (A) {
                  f = !0;
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
                          P.apply(a, M);
                      }
                    })(A);
                  } finally {
                    k(S), f = !1;
                  }
                }
              }
            }
            function T(S) {
              S.source === u && typeof S.data == "string" && S.data.indexOf(v) === 0 && x(+S.data.slice(v.length));
            }
          })(typeof self > "u" ? i === void 0 ? this : i : self);
        }).call(this, typeof Oe < "u" ? Oe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), Xd = /* @__PURE__ */ he(((e, t) => {
  var r = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function n(s) {
    return s && s.replace ? s.replace(/([&"<>'])/g, function(i, u) {
      return r[u];
    }) : s;
  }
  t.exports = n;
})), Zd = /* @__PURE__ */ he(((e, t) => {
  ut();
  var r = Xd(), n = gn().Stream, s = "    ";
  function i(v, E) {
    typeof E != "object" && (E = { indent: E });
    var m = E.stream ? new n() : null, f = "", y = !1, _ = E.indent ? E.indent === !0 ? s : E.indent : "", k = !0;
    function x(P) {
      k ? ge.nextTick(P) : P();
    }
    function T(P, M) {
      if (M !== void 0 && (f += M), P && !y && (m = m || new n(), y = !0), P && y) {
        var R = f;
        x(function() {
          m.emit("data", R);
        }), f = "";
      }
    }
    function S(P, M) {
      d(T, c(P, _, _ ? 1 : 0), M);
    }
    function A() {
      if (m) {
        var P = f;
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
      P.standalone && (M.standalone = P.standalone), S({ "?xml": { _attr: M } }), f = f.replace("/>", "?>");
    }
    return x(function() {
      k = !1;
    }), E.declaration && b(E.declaration), v && v.forEach ? v.forEach(function(P, M) {
      var R;
      M + 1 === v.length && (R = A), S(P, R);
    }) : S(v, A), m ? (m.readable = !0, m) : f;
  }
  function u() {
    var v = { _elem: c(Array.prototype.slice.call(arguments)) };
    return v.push = function(E) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var m = this, f = this._elem.indent;
      d(this.append, c(E, f, this._elem.icount + (f ? 1 : 0)), function() {
        m.append(!0);
      });
    }, v.close = function(E) {
      E !== void 0 && this.push(E), this.end && this.end();
    }, v;
  }
  function a(v, E) {
    return new Array(E || 0).join(v || "");
  }
  function c(v, E, m) {
    m = m || 0;
    var f = a(E, m), y, _ = v, k = !1;
    if (typeof v == "object" && (y = Object.keys(v)[0], _ = v[y], _ && _._elem))
      return _._elem.name = y, _._elem.icount = m, _._elem.indent = E, _._elem.indents = f, _._elem.interrupt = _, _._elem;
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
      indents: f,
      indent: E
    };
  }
  function d(v, E, m) {
    if (typeof E != "object") return v(!1, E);
    var f = E.interrupt ? 1 : E.content.length;
    function y() {
      for (; E.content.length; ) {
        var k = E.content.shift();
        if (k !== void 0) {
          if (_(k)) return;
          d(v, k);
        }
      }
      v(!1, (f > 1 ? E.indents : "") + (E.name ? "</" + E.name + ">" : "") + (E.indent && !m ? `
` : "")), m && m();
    }
    function _(k) {
      return k.interrupt ? (k.interrupt.append = v, k.interrupt.end = y, k.interrupt = !1, v(!0), !0) : !1;
    }
    if (v(!1, E.indents + (E.name ? "<" + E.name : "") + (E.attributes.length ? " " + E.attributes.join(" ") : "") + (f ? E.name ? ">" : "" : E.name ? "/>" : "") + (E.indent && f > 1 ? `
` : "")), !f) return v(!1, E.indent ? `
` : "");
    _(E) || y();
  }
  function w(v, E) {
    return v + '="' + r(E) + '"';
  }
  t.exports = i, t.exports.element = t.exports.Element = u;
})), Yd = gn(), ds = /* @__PURE__ */ cn(qd()), ye = /* @__PURE__ */ cn(Zd()), Ut = 0, Zr = 32, Jd = 32, Qd = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== Jd) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const n = r.replace(/(..)/g, "$1 ").trim().split(" ").map((u) => parseInt(u, 16));
  n.reverse();
  const s = e.slice(Ut, Zr).map((u, a) => u ^ n[a % n.length]), i = new Uint8Array(Ut + s.length + Math.max(0, e.length - Zr));
  return i.set(e.slice(0, Ut)), i.set(s, Ut), i.set(e.slice(Zr), Ut + s.length), i;
}, ps = class {
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
}, ep = class {
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
    return t.forEach((s, i) => {
      n = n.replace(new RegExp(`{${s.fileName}}`, "g"), (r + i).toString());
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
}, tp = class {
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
}, rp = new ps(), Yr = (e, t, r, n, s = !0) => (0, ye.default)(rp.format(t, {
  viewWrapper: {
    View: t,
    Relationships: n
  },
  file: e,
  stack: []
}), {
  indent: r,
  declaration: s ? {
    standalone: "yes",
    encoding: "UTF-8"
  } : { encoding: "UTF-8" }
}), np = (e, t, r, n) => {
  const { content: s } = t.options;
  if (s instanceof Uint8Array) return [{
    data: s,
    path: `word/${r}`
  }];
  if ("files" in s) {
    const d = new ds.default();
    for (const { path: w, content: v } of s.files) d.file(w, v instanceof Uint8Array ? v : jt(Yr(e, v, n, new Re())));
    return [{
      data: d.generateAsync({
        type: "uint8array",
        compression: "DEFLATE"
      }),
      path: `word/${r}`
    }];
  }
  const i = e.PackageParts.createRelationships(r), u = Yr(e, s, n, i), a = r.slice(0, r.lastIndexOf("/")), c = r.slice(r.lastIndexOf("/") + 1);
  return [{
    data: u,
    path: `word/${r}`
  }, ...i.RelationshipCount > 0 ? [{
    data: Yr(e, i, n, i, !1),
    path: `word/${a}/_rels/${c}.rels`
  }] : []];
}, ms = (e, t, r = 0) => {
  const n = e.PackageParts.Array.slice(r);
  return n.length === 0 ? [] : [...n.flatMap(({ part: s, path: i }) => np(e, s, i, t)), ...ms(e, t, r + n.length)];
}, ip = ["PackageParts"], ap = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    J(this, "formatter", void 0), J(this, "imageReplacer", void 0), J(this, "numberingReplacer", void 0), this.formatter = new ps(), this.imageReplacer = new ep(), this.numberingReplacer = new tp();
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
    const n = new ds.default(), s = this.xmlifyFile(e, t), { PackageParts: i } = s, u = Ga(s, ip), a = new Map(Object.entries(u));
    for (const [, c] of a) if (Array.isArray(c)) for (const d of c) n.file(d.path, jt(d.data));
    else n.file(c.path, jt(c.data));
    for (const { path: c, data: d } of i) n.file(c, typeof d == "string" ? jt(d) : d);
    for (const c of r) n.file(c.path, jt(c.data));
    for (const c of e.Media.Array) c.type !== "svg" ? n.file(`word/media/${c.fileName}`, c.data) : (n.file(`word/media/${c.fileName}`, c.data), n.file(`word/media/${c.fallback.fileName}`, c.fallback.data));
    for (const [c, { data: d, fontKey: w }] of e.FontTable.fontOptionsWithKey.entries()) n.file(`word/fonts/font${c + 1}.odttf`, Qd(d, w));
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
    }), s = (0, ye.default)(this.formatter.format(e.FootNotes.View, {
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
    }), u = e.Document.Relationships.RelationshipCount + 1, a = e.Comments.Relationships.RelationshipCount + 1, c = e.FootNotes.Relationships.RelationshipCount + 1, d = e.Endnotes.Relationships.RelationshipCount + 1, w = this.imageReplacer.getMediaData(r, e.Media), v = this.imageReplacer.getMediaData(n, e.Media), E = this.imageReplacer.getMediaData(s, e.Media), m = this.imageReplacer.getMediaData(i, e.Media);
    return fe(fe(fe(fe({
      Relationships: {
        data: (() => {
          const f = Re.copy(e.Document.Relationships);
          return w.forEach((y, _) => {
            f.addRelationship(u + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), f.addRelationship(f.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, ye.default)(this.formatter.format(f, {
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
          const f = this.imageReplacer.replace(r, w, u);
          return this.numberingReplacer.replace(f, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const f = (0, ye.default)(this.formatter.format(e.Styles, {
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
          return this.numberingReplacer.replace(f, e.Numbering.ConcreteNumbering);
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
      HeaderRelationships: e.Headers.map((f, y) => {
        const _ = (0, ye.default)(this.formatter.format(f.View, {
          viewWrapper: f,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = Re.copy(f.Relationships);
        return k.forEach((T, S) => {
          x.addRelationship(S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(x, {
            viewWrapper: f,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${y + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((f, y) => {
        const _ = (0, ye.default)(this.formatter.format(f.View, {
          viewWrapper: f,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), k = this.imageReplacer.getMediaData(_, e.Media), x = Re.copy(f.Relationships);
        return k.forEach((T, S) => {
          x.addRelationship(S, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(x, {
            viewWrapper: f,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${y + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((f, y) => {
        const _ = (0, ye.default)(this.formatter.format(f.View, {
          viewWrapper: f,
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
      Footers: e.Footers.map((f, y) => {
        const _ = (0, ye.default)(this.formatter.format(f.View, {
          viewWrapper: f,
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
          const f = this.imageReplacer.replace(s, E, c);
          return this.numberingReplacer.replace(f, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (() => {
          const f = Re.copy(e.FootNotes.Relationships);
          return E.forEach((y, _) => {
            f.addRelationship(c + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(f, {
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
          const f = this.imageReplacer.replace(i, m, d);
          return this.numberingReplacer.replace(f, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (() => {
          const f = Re.copy(e.Endnotes.Relationships);
          return m.forEach((y, _) => {
            f.addRelationship(d + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(f, {
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
          const f = this.imageReplacer.replace(n, v, a);
          return this.numberingReplacer.replace(f, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (() => {
          const f = Re.copy(e.Comments.Relationships);
          return v.forEach((y, _) => {
            f.addRelationship(a + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${y.fileName}`);
          }), (0, ye.default)(this.formatter.format(f, {
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
      PackageParts: ms(e, t),
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
function gi(e, t, r, n, s, i, u) {
  try {
    var a = e[i](u), c = a.value;
  } catch (d) {
    r(d);
    return;
  }
  a.done ? t(c) : Promise.resolve(c).then(n, s);
}
function sp(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, s) {
      var i = e.apply(t, r);
      function u(c) {
        gi(i, n, s, u, a, "next", c);
      }
      function a(c) {
        gi(i, n, s, u, a, "throw", c);
      }
      u(void 0);
    });
  };
}
var op = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, yi = (e) => e === !0 ? op.WITH_2_BLANKS : e === !1 ? void 0 : e, vs = class xt {
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
    var s = this;
    return sp(function* (i, u, a, c = []) {
      return s.compiler.compile(i, yi(a), c).generateAsync({
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
    return xt.pack(t, "string", r, n);
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
    return xt.pack(t, "nodebuffer", r, n);
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
    return xt.pack(t, "base64", r, n);
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
    return xt.pack(t, "blob", r, n);
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
    return xt.pack(t, "arraybuffer", r, n);
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
    const s = new Yd.Stream();
    return this.compiler.compile(t, yi(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((i) => {
      s.emit("data", i), s.emit("end");
    }), s;
  }
};
J(vs, "compiler", new ap());
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
function lp(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const n = Ss(e.color, t);
  n && (r.color = n);
  const s = As(e.font, t);
  s && (r.font = s), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const i = {};
  return Object.keys(r).length && (i.run = r), e.paragraph && (i.paragraph = e.paragraph), i;
}
function up(e = Pr, t = {}) {
  const r = e?.typography || Pr.typography, n = e?.typographyKinds || Pr.typographyKinds, s = {}, i = [], u = [];
  for (const [v, E] of Object.entries(r)) {
    const m = lp(E, e), f = cr[v];
    if (f === "document") {
      s.document = {
        ...m.run ? { run: m.run } : {},
        ...m.paragraph ? { paragraph: m.paragraph } : {}
      };
      continue;
    }
    if (f) {
      s[f] = m;
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
  const a = t.paragraphStyles || [], c = t.characterStyles || [];
  for (const v of [...a, ...c]) {
    const E = cr[v.id];
    if (!E) continue;
    const { id: m, name: f, basedOn: y, next: _, quickFormat: k, run: x, paragraph: T } = v;
    s[E] = {
      ...x ? { run: x } : {},
      ...T ? { paragraph: T } : {}
    };
  }
  const d = a.filter(
    (v) => !cr[v.id]
  ), w = c.filter(
    (v) => !cr[v.id]
  );
  return {
    default: s,
    paragraphStyles: bi(i, d),
    characterStyles: bi(u, w)
  };
}
function bi(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((i) => [i.id, i])), n = e.map(
    (i) => r.has(i.id) ? r.get(i.id) : i
  ), s = new Set(e.map((i) => i.id));
  for (const i of t)
    s.has(i.id) || n.push(i);
  return n;
}
async function Kp(e, t = {}) {
  const r = await cp(e, t);
  return vs.toBlob(r);
}
async function cp(e, t = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: s = null,
    headerFirstPageOnly: i = !1,
    footerFirstPageOnly: u = !1
  } = e, {
    paragraphStyles: a,
    characterStyles: c,
    theme: d,
    typography: w,
    numbering: v,
    pageMargin: E,
    pageSize: m,
    pageOrientation: f,
    ...y
  } = t, _ = { nextId: 1, footnotes: {} };
  wr(r.flat(), _), n && wr(n, _), s && wr(s, _);
  const { loadAsset: k } = t, x = await Jr(r.flat(), k), T = {
    pageNumbers: { start: 1, formatType: il.DECIMAL },
    ...E ? { margin: E } : {}
  };
  m && (T.size = {
    width: m.width,
    height: m.height,
    ...f ? { orientation: f } : {}
  });
  const S = {
    properties: {
      type: kh.CONTINUOUS,
      page: T
    },
    children: x
  };
  if (n) {
    const P = await Jr(n, k), M = new hs({ children: P }), R = hr(!0);
    i ? (S.headers = { first: M, default: R }, S.properties.titlePage = !0) : S.headers = { default: M };
  } else
    S.headers = { default: hr(!0) };
  if (s) {
    const P = await Jr(s, k), M = new fs({ children: P }), R = hr(!1);
    u ? (S.footers = { first: M, default: R }, S.properties.titlePage = !0) : S.footers = { default: M };
  } else
    S.footers = { default: hr(!1) };
  S.properties.titlePage && (S.headers && !S.headers.first && (S.headers.first = S.headers.default), S.footers && !S.footers.first && (S.footers.first = S.footers.default));
  const A = {
    ...y,
    sections: [S]
  }, b = w ? { ...d || {}, typography: w } : d;
  if (b) {
    const P = up(b, {
      paragraphStyles: a,
      characterStyles: c
    }), M = {};
    P.default && Object.keys(P.default).length && (M.default = P.default), P.paragraphStyles.length && (M.paragraphStyles = P.paragraphStyles), P.characterStyles.length && (M.characterStyles = P.characterStyles), Object.keys(M).length && (A.styles = M);
  } else (a && a.length || c && c.length) && (A.styles = {}, a?.length && (A.styles.paragraphStyles = a), c?.length && (A.styles.characterStyles = c));
  return v && v.length && (A.numbering = { config: v }), Object.keys(_.footnotes).length && (A.footnotes = _.footnotes), new jd(A);
}
function wr(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = t.nextId;
          t.nextId += 1, r.footnoteId = n;
          const s = [];
          for (const i of r.children || [])
            if (i.type === "paragraph")
              s.push(Wn(i));
            else {
              const u = rr(i);
              u.length && s.push(new _e({ children: u }));
            }
          s.length || s.push(new _e({})), t.footnotes[n] = { children: s };
        }
        r.children && wr(r.children, t);
      }
  }
}
function hr(e) {
  const t = e ? Te.RIGHT : Te.CENTER, r = e ? hs : fs;
  return new r({
    children: [
      new _e({
        alignment: t,
        children: [
          new Ie("Page "),
          new Ie({ children: [it.CURRENT] }),
          new Ie(" of "),
          new Ie({ children: [it.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function Jr(e, t) {
  return (await Promise.all(
    e.map((n) => hp(n, t))
  )).flat();
}
async function hp(e, t) {
  switch (e.type) {
    case "table":
      return [await Up(e)];
    case "image":
      return [await zp(e, t)];
    case "tableOfContents":
      return [fp(e)];
    case "webOnly":
      return [];
    default:
      return [await Mp(e)];
  }
}
function fp(e) {
  const t = e.toc || {}, r = t.title || "Contents", n = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new $d(r, n);
}
function Wn(e) {
  const t = {};
  if (e.heading && (t.heading = bp(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = gs(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const n = We(e.spacing.before), s = We(e.spacing.after), i = We(e.spacing.line);
    n != null && (t.spacing.before = n), s != null && (t.spacing.after = s), i != null && (t.spacing.line = i), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
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
    for (const s of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const i = e.indent[s];
      if (i == null) continue;
      const u = typeof i == "string" ? parseInt(i, 10) : i;
      Number.isFinite(u) && (n[s] = u);
    }
    Object.keys(n).length && (t.indent = n);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(Np).filter(Boolean));
  const r = (e.children || []).flatMap(rr);
  return e.bookmark && r.length ? t.children = [new Wa({ id: e.bookmark, children: r })] : r.length && (t.children = r), new _e(t);
}
function rr(e) {
  switch (e.type) {
    case "text":
      return dp(e);
    case "tab":
      return [new Ie({ children: [new Ir()] })];
    case "externalHyperlink":
    // A plain <a href> from same-source JSX — same destination, same
    // emitter. See the href note in ir/parser.js.
    case "a":
      return [pp(e)];
    case "internalHyperlink":
      return [mp(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new Vd(e.footnoteId)] : [];
    case "math":
      return [new Ie({ text: e.latex || "" })];
    default:
      return e.content ? [new Ie({ text: e.content })] : e.children ? e.children.flatMap(rr) : [];
  }
}
function dp(e) {
  const t = [];
  e.positionalTab && t.push(
    new Ie({
      children: [
        new Vc({
          alignment: Pp(e.positionalTab.alignment),
          leader: Dp(e.positionalTab.leader),
          relativeTo: Bp(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new Ie({ children: [it.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new Ie({ children: [it.TOTAL_PAGES] })), t;
  const n = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (n.bold = !0), (e.italics === "true" || e.italics === !0) && (n.italics = !0), e.underline && (n.underline = e.underline), e.style && (n.style = e.style), e.color && (n.color = e.color), e.size != null) {
    const s = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(s) && (n.size = s);
  }
  return e.font && (n.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (n.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (n.allCaps = !0), (e.strike === "true" || e.strike === !0) && (n.strike = !0), e.subScript === "true" || e.subScript === !0 ? n.subScript = !0 : (e.superScript === "true" || e.superScript === !0) && (n.superScript = !0), t.push(new Ie(n)), t;
}
function pp(e) {
  const t = e.link || e.href || "", r = (e.children || []).flatMap(rr);
  return new Ua({
    children: r.length ? r : [new Ie({ text: t })],
    link: t
  });
}
function mp(e) {
  const t = (e.children || []).flatMap(rr);
  return new Dn({
    children: t.length ? t : [new Ie({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function ws(e) {
  const r = { rows: (e.children || []).filter((n) => n.type === "tableRow").map(vp) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? zr.AUTOFIT : zr.FIXED : r.columnWidths && (r.layout = zr.FIXED), e.tableWidth && (r.width = ys(e.tableWidth)), e.tableBorders && (r.borders = bs(e.tableBorders)), new af(r);
}
function vp(e) {
  const r = { children: (e.children || []).filter((n) => n.type === "tableCell").map(wp) };
  return e.tableHeader && (r.tableHeader = !0), new ns(r);
}
function wp(e) {
  const t = {};
  if (e.width && (t.width = ys(e.width)), e.margins && (t.margins = gp(e.margins)), e.borders && (t.borders = bs(e.borders)), e.shading && (t.shading = Ap(e.shading)), e.verticalAlign && (t.verticalAlign = Cp(e.verticalAlign)), e.columnSpan) {
    const n = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(n) && n > 1 && (t.columnSpan = n);
  }
  if (e.rowSpan) {
    const n = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(n) && n > 1 && (t.rowSpan = n);
  }
  const r = (e.children || []).flatMap((n) => n.type === "table" ? [ws(n)] : [Wn(n)]);
  return t.children = r.length ? r : [new _e({})], new br(t);
}
function We(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function gp(e) {
  const t = {};
  for (const [r, n] of Object.entries(e)) {
    const s = We(n);
    s != null && (t[r] = s);
  }
  return t;
}
const yp = {
  HEADING_1: gt.HEADING_1,
  HEADING_2: gt.HEADING_2,
  HEADING_3: gt.HEADING_3,
  HEADING_4: gt.HEADING_4,
  HEADING_5: gt.HEADING_5,
  HEADING_6: gt.HEADING_6
};
function bp(e) {
  return yp[e];
}
const _p = {
  left: Te.LEFT,
  center: Te.CENTER,
  right: Te.RIGHT,
  justified: Te.JUSTIFIED,
  both: Te.JUSTIFIED
};
function gs(e) {
  return _p[e] ?? Te.LEFT;
}
const xp = {
  percentage: Ne.PERCENTAGE,
  pct: Ne.PERCENTAGE,
  dxa: Ne.DXA,
  auto: Ne.AUTO,
  nil: Ne.NIL
};
function Ep(e) {
  return xp[e] ?? Ne.DXA;
}
function ys(e) {
  const t = We(e.size) ?? 0, r = e.type;
  return r === "pct" || r === "percentage" ? {
    size: String(t * 50),
    type: Ne.PERCENTAGE
  } : {
    size: t,
    type: Ep(r)
  };
}
const Tp = {
  single: Le.SINGLE,
  double: Le.DOUBLE,
  dotted: Le.DOTTED,
  dashed: Le.DASHED,
  none: Le.NONE,
  nil: Le.NIL,
  thick: Le.THICK,
  triple: Le.TRIPLE
};
function bs(e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    t[r] = {
      style: Tp[n.style] ?? Le.SINGLE,
      size: We(n.size) ?? 1,
      color: n.color || "000000"
    };
  return t;
}
const Sp = {
  clear: tt.CLEAR,
  nil: tt.NIL,
  solid: tt.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: tt.DIAGONAL_CROSS,
  diagonalStripe: tt.DIAGONAL_STRIPE,
  horizontalStripe: tt.HORIZONTAL_STRIPE,
  verticalStripe: tt.VERTICAL_STRIPE
};
function Ap(e) {
  const t = e.fill || "000000", r = Sp[e.type] ?? tt.CLEAR, n = e.color || "auto";
  return { type: r, fill: t, color: n };
}
const kp = {
  top: Ht.TOP,
  center: Ht.CENTER,
  middle: Ht.CENTER,
  // alias — natural-language CSS-ish
  bottom: Ht.BOTTOM
};
function Cp(e) {
  return kp[e] ?? Ht.TOP;
}
const Ip = {
  left: De.LEFT,
  right: De.RIGHT,
  center: De.CENTER,
  decimal: De.DECIMAL,
  bar: De.BAR,
  clear: De.CLEAR,
  end: De.END,
  num: De.NUM,
  start: De.START
}, Rp = {
  none: Bt.NONE,
  dot: Bt.DOT,
  hyphen: Bt.HYPHEN,
  underscore: Bt.UNDERSCORE,
  middleDot: Bt.MIDDLE_DOT
};
function Np(e) {
  if (!e || typeof e != "object") return null;
  const t = Ip[e.type] ?? De.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const n = { type: t, position: r };
  if (e.leader) {
    const s = Rp[e.leader];
    s && (n.leader = s);
  }
  return n;
}
const Op = {
  left: fr.LEFT,
  center: fr.CENTER,
  right: fr.RIGHT
};
function Pp(e) {
  return Op[e] ?? fr.LEFT;
}
const Fp = {
  none: dt.NONE,
  dot: dt.DOT,
  hyphen: dt.HYPHEN,
  underscore: dt.UNDERSCORE,
  heavy: dt.HEAVY,
  middleDot: dt.MIDDLE_DOT
};
function Dp(e) {
  return Fp[e] ?? dt.NONE;
}
const Lp = {
  indent: on.INDENT,
  margin: on.MARGIN
};
function Bp(e) {
  return Lp[e] ?? on.MARGIN;
}
async function Mp(e) {
  return Wn(e);
}
async function Up(e) {
  return ws(e);
}
let Wp = 1;
function jp(e, t) {
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
async function zp(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new _e({});
    const n = await Hp(r, t), s = We(e.transformation?.width) ?? 400, i = We(e.transformation?.height) ?? 300, u = {
      type: jp(r, n),
      data: n,
      transformation: { width: s, height: i },
      altText: {
        id: Wp++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (u.floating = e.floating);
    const a = {
      children: [new Ku(u)]
    };
    return e.alignment && (a.alignment = gs(e.alignment)), new _e(a);
  } catch (r) {
    return console.error("Error creating image element:", r), new _e({});
  }
}
async function Hp(e, t) {
  const { bytes: r } = await Ts(e, { loadAsset: t });
  return r;
}
export {
  cp as buildDocument,
  Kp as compileDocx,
  hr as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-7L79TYwP.js.map
