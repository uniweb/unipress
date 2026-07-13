import { f as Gi } from "./fetch-C-PgllAm.js";
import { D as hr, r as Ki, a as qi } from "./_entry.generated-D4Ec6hwg.js";
var Vi = Object.create, _n = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, Xi = Object.getOwnPropertyNames, Zi = Object.getPrototypeOf, Yi = Object.prototype.hasOwnProperty, xn = (e, t) => () => (e && (t = e(e = 0)), t), ce = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Ji = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function") for (var u = Xi(t), i = 0, l = u.length, s; i < l; i++)
    s = u[i], !Yi.call(e, s) && s !== r && _n(e, s, {
      get: ((f) => t[f]).bind(null, s),
      enumerable: !(o = $i(t, s)) || o.enumerable
    });
  return e;
}, Fr = (e, t, r) => (r = e != null ? Vi(Zi(e)) : {}, Ji(_n(r, "default", {
  value: e,
  enumerable: !0
}), e)), qt = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function Lt(e) {
  "@babel/helpers - typeof";
  return Lt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Lt(e);
}
function Qi(e, t) {
  if (Lt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (Lt(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ea(e) {
  var t = Qi(e, "string");
  return Lt(t) == "symbol" ? t : t + "";
}
function ee(e, t, r) {
  return (t = ea(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Qt = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    ee(
      this,
      /** The XML element name for this component (e.g., "w:p" for paragraph). */
      "rootKey",
      void 0
    ), this.rootKey = e;
  }
}, ta = Object.seal({}), ae = class extends Qt {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    super(e), ee(
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
    const r = this.root.map((o) => o instanceof Qt ? o.prepForXml(e) : o).filter((o) => o !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : ta };
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
}, Qe = class extends ae {
  constructor(e, t) {
    super(e), ee(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
  }
  /**
  * Prepares the component for XML serialization, excluding it if empty.
  *
  * @param context - The serialization context
  * @returns The XML-serializable object, or undefined if empty
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (this.includeIfEmpty || t && (typeof t[this.rootKey] != "object" || Object.keys(t[this.rootKey]).length)) return t;
  }
};
function Qr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(u) {
      return Object.getOwnPropertyDescriptor(e, u).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qr(Object(r), !0).forEach(function(o) {
      ee(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qr(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
var we = class extends Qt {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(e) {
    super("_attr"), ee(this, "root", void 0), ee(
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
    return Object.entries(this.root).forEach(([r, o]) => {
      if (o !== void 0) {
        const u = this.xmlKeys && this.xmlKeys[r] || r;
        t[u] = o;
      }
    }), { _attr: t };
  }
}, En = class extends Qt {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(e) {
    super("_attr"), ee(this, "root", void 0), this.root = e;
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: o }) => pe(pe({}, t), {}, { [r]: o }), {}) };
  }
}, Re = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Dr = /* @__PURE__ */ ce(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, o = r && typeof r.apply == "function" ? r.apply : function(P, M, R) {
    return Function.prototype.apply.call(P, M, R);
  }, u;
  r && typeof r.ownKeys == "function" ? u = r.ownKeys : Object.getOwnPropertySymbols ? u = function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  } : u = function(P) {
    return Object.getOwnPropertyNames(P);
  };
  function i(p) {
    console && console.warn && console.warn(p);
  }
  var l = Number.isNaN || function(P) {
    return P !== P;
  };
  function s() {
    s.init.call(this);
  }
  t.exports = s, t.exports.once = x, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var f = 10;
  function T(p) {
    if (typeof p != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return f;
    },
    set: function(p) {
      if (typeof p != "number" || p < 0 || l(p)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
      f = p;
    }
  }), s.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(P) {
    if (typeof P != "number" || P < 0 || l(P)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  };
  function S(p) {
    return p._maxListeners === void 0 ? s.defaultMaxListeners : p._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return S(this);
  }, s.prototype.emit = function(P) {
    for (var M = [], R = 1; R < arguments.length; R++) M.push(arguments[R]);
    var q = P === "error", Q = this._events;
    if (Q !== void 0) q = q && Q.error === void 0;
    else if (!q) return !1;
    if (q) {
      var O;
      if (M.length > 0 && (O = M[0]), O instanceof Error) throw O;
      var W = /* @__PURE__ */ new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
      throw W.context = O, W;
    }
    var k = Q[P];
    if (k === void 0) return !1;
    if (typeof k == "function") o(k, this, M);
    else
      for (var H = k.length, J = A(k, H), R = 0; R < H; ++R) o(J[R], this, M);
    return !0;
  };
  function v(p, P, M, R) {
    var q, Q, O;
    if (T(M), Q = p._events, Q === void 0 ? (Q = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (Q.newListener !== void 0 && (p.emit("newListener", P, M.listener ? M.listener : M), Q = p._events), O = Q[P]), O === void 0)
      O = Q[P] = M, ++p._eventsCount;
    else if (typeof O == "function" ? O = Q[P] = R ? [M, O] : [O, M] : R ? O.unshift(M) : O.push(M), q = S(p), q > 0 && O.length > q && !O.warned) {
      O.warned = !0;
      var W = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(P) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      W.name = "MaxListenersExceededWarning", W.emitter = p, W.type = P, W.count = O.length, i(W);
    }
    return p;
  }
  s.prototype.addListener = function(P, M) {
    return v(this, P, M, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(P, M) {
    return v(this, P, M, !0);
  };
  function N() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function w(p, P, M) {
    var R = {
      fired: !1,
      wrapFn: void 0,
      target: p,
      type: P,
      listener: M
    }, q = N.bind(R);
    return q.listener = M, R.wrapFn = q, q;
  }
  s.prototype.once = function(P, M) {
    return T(M), this.on(P, w(this, P, M)), this;
  }, s.prototype.prependOnceListener = function(P, M) {
    return T(M), this.prependListener(P, w(this, P, M)), this;
  }, s.prototype.removeListener = function(P, M) {
    var R, q, Q, O, W;
    if (T(M), q = this._events, q === void 0) return this;
    if (R = q[P], R === void 0) return this;
    if (R === M || R.listener === M) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete q[P], q.removeListener && this.emit("removeListener", P, R.listener || M));
    else if (typeof R != "function") {
      for (Q = -1, O = R.length - 1; O >= 0; O--) if (R[O] === M || R[O].listener === M) {
        W = R[O].listener, Q = O;
        break;
      }
      if (Q < 0) return this;
      Q === 0 ? R.shift() : C(R, Q), R.length === 1 && (q[P] = R[0]), q.removeListener !== void 0 && this.emit("removeListener", P, W || M);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(P) {
    var M, R = this._events, q;
    if (R === void 0) return this;
    if (R.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : R[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete R[P]), this;
    if (arguments.length === 0) {
      var Q = Object.keys(R), O;
      for (q = 0; q < Q.length; ++q)
        O = Q[q], O !== "removeListener" && this.removeAllListeners(O);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (M = R[P], typeof M == "function") this.removeListener(P, M);
    else if (M !== void 0) for (q = M.length - 1; q >= 0; q--) this.removeListener(P, M[q]);
    return this;
  };
  function m(p, P, M) {
    var R = p._events;
    if (R === void 0) return [];
    var q = R[P];
    return q === void 0 ? [] : typeof q == "function" ? M ? [q.listener || q] : [q] : M ? y(q) : A(q, q.length);
  }
  s.prototype.listeners = function(P) {
    return m(this, P, !0);
  }, s.prototype.rawListeners = function(P) {
    return m(this, P, !1);
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
    return this._eventsCount > 0 ? u(this._events) : [];
  };
  function A(p, P) {
    for (var M = new Array(P), R = 0; R < P; ++R) M[R] = p[R];
    return M;
  }
  function C(p, P) {
    for (; P + 1 < p.length; P++) p[P] = p[P + 1];
    p.pop();
  }
  function y(p) {
    for (var P = new Array(p.length), M = 0; M < P.length; ++M) P[M] = p[M].listener || p[M];
    return P;
  }
  function x(p, P) {
    return new Promise(function(M, R) {
      function q(O) {
        p.removeListener(P, Q), R(O);
      }
      function Q() {
        typeof p.removeListener == "function" && p.removeListener("error", q), M([].slice.call(arguments));
      }
      _(p, P, Q, { once: !0 }), P !== "error" && b(p, q, { once: !0 });
    });
  }
  function b(p, P, M) {
    typeof p.on == "function" && _(p, "error", P, M);
  }
  function _(p, P, M, R) {
    if (typeof p.on == "function") R.once ? p.once(P, M) : p.on(P, M);
    else if (typeof p.addEventListener == "function") p.addEventListener(P, function q(Q) {
      R.once && p.removeEventListener(P, q), M(Q);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
})), et = /* @__PURE__ */ ce(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(o, u) {
    u && (o.super_ = u, o.prototype = Object.create(u.prototype, { constructor: {
      value: o,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : t.exports = function(o, u) {
    if (u) {
      o.super_ = u;
      var i = function() {
      };
      i.prototype = u.prototype, o.prototype = new i(), o.prototype.constructor = o;
    }
  };
})), Ie, _t = xn((() => {
  Ie = globalThis || self;
}));
function ra(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Rr() {
  throw new Error("setTimeout has not been defined");
}
function Ir() {
  throw new Error("clearTimeout has not been defined");
}
function Tn(e) {
  if (Me === setTimeout) return setTimeout(e, 0);
  if ((Me === Rr || !Me) && setTimeout)
    return Me = setTimeout, setTimeout(e, 0);
  try {
    return Me(e, 0);
  } catch {
    try {
      return Me.call(null, e, 0);
    } catch {
      return Me.call(this, e, 0);
    }
  }
}
function na(e) {
  if (Ue === clearTimeout) return clearTimeout(e);
  if ((Ue === Ir || !Ue) && clearTimeout)
    return Ue = clearTimeout, clearTimeout(e);
  try {
    return Ue(e);
  } catch {
    try {
      return Ue.call(null, e);
    } catch {
      return Ue.call(this, e);
    }
  }
}
function ia() {
  !ut || !lt || (ut = !1, lt.length ? ze = lt.concat(ze) : Dt = -1, ze.length && Sn());
}
function Sn() {
  if (!ut) {
    var e = Tn(ia);
    ut = !0;
    for (var t = ze.length; t; ) {
      for (lt = ze, ze = []; ++Dt < t; ) lt && lt[Dt].run();
      Dt = -1, t = ze.length;
    }
    lt = null, ut = !1, na(e);
  }
}
function en(e, t) {
  this.fun = e, this.array = t;
}
function Ke() {
}
var fr, _e, Me, Ue, ze, ut, lt, Dt, tn, ve, tt = xn((() => {
  fr = { exports: {} }, _e = fr.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? Me = setTimeout : Me = Rr;
    } catch {
      Me = Rr;
    }
    try {
      typeof clearTimeout == "function" ? Ue = clearTimeout : Ue = Ir;
    } catch {
      Ue = Ir;
    }
  })(), ze = [], ut = !1, Dt = -1, _e.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    ze.push(new en(e, t)), ze.length === 1 && !ut && Tn(Sn);
  }, en.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _e.title = "browser", _e.browser = !0, _e.env = {}, _e.argv = [], _e.version = "", _e.versions = {}, _e.on = Ke, _e.addListener = Ke, _e.once = Ke, _e.off = Ke, _e.removeListener = Ke, _e.removeAllListeners = Ke, _e.emit = Ke, _e.prependListener = Ke, _e.prependOnceListener = Ke, _e.listeners = function(e) {
    return [];
  }, _e.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, _e.cwd = function() {
    return "/";
  }, _e.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, _e.umask = function() {
    return 0;
  }, tn = fr.exports, ve = /* @__PURE__ */ ra(tn);
})), An = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Dr().EventEmitter;
})), aa = /* @__PURE__ */ ce(((e) => {
  e.byteLength = f, e.toByteArray = S, e.fromByteArray = w;
  for (var t = [], r = [], o = typeof Uint8Array < "u" ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, l = u.length; i < l; ++i)
    t[i] = u[i], r[u.charCodeAt(i)] = i;
  r[45] = 62, r[95] = 63;
  function s(m) {
    var g = m.length;
    if (g % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var A = m.indexOf("=");
    A === -1 && (A = g);
    var C = A === g ? 0 : 4 - A % 4;
    return [A, C];
  }
  function f(m) {
    var g = s(m), A = g[0], C = g[1];
    return (A + C) * 3 / 4 - C;
  }
  function T(m, g, A) {
    return (g + A) * 3 / 4 - A;
  }
  function S(m) {
    var g, A = s(m), C = A[0], y = A[1], x = new o(T(m, C, y)), b = 0, _ = y > 0 ? C - 4 : C, p;
    for (p = 0; p < _; p += 4)
      g = r[m.charCodeAt(p)] << 18 | r[m.charCodeAt(p + 1)] << 12 | r[m.charCodeAt(p + 2)] << 6 | r[m.charCodeAt(p + 3)], x[b++] = g >> 16 & 255, x[b++] = g >> 8 & 255, x[b++] = g & 255;
    return y === 2 && (g = r[m.charCodeAt(p)] << 2 | r[m.charCodeAt(p + 1)] >> 4, x[b++] = g & 255), y === 1 && (g = r[m.charCodeAt(p)] << 10 | r[m.charCodeAt(p + 1)] << 4 | r[m.charCodeAt(p + 2)] >> 2, x[b++] = g >> 8 & 255, x[b++] = g & 255), x;
  }
  function v(m) {
    return t[m >> 18 & 63] + t[m >> 12 & 63] + t[m >> 6 & 63] + t[m & 63];
  }
  function N(m, g, A) {
    for (var C, y = [], x = g; x < A; x += 3)
      C = (m[x] << 16 & 16711680) + (m[x + 1] << 8 & 65280) + (m[x + 2] & 255), y.push(v(C));
    return y.join("");
  }
  function w(m) {
    for (var g, A = m.length, C = A % 3, y = [], x = 16383, b = 0, _ = A - C; b < _; b += x) y.push(N(m, b, b + x > _ ? _ : b + x));
    return C === 1 ? (g = m[A - 1], y.push(t[g >> 2] + t[g << 4 & 63] + "==")) : C === 2 && (g = (m[A - 2] << 8) + m[A - 1], y.push(t[g >> 10] + t[g >> 4 & 63] + t[g << 2 & 63] + "=")), y.join("");
  }
})), sa = /* @__PURE__ */ ce(((e) => {
  e.read = function(t, r, o, u, i) {
    var l, s, f = i * 8 - u - 1, T = (1 << f) - 1, S = T >> 1, v = -7, N = o ? i - 1 : 0, w = o ? -1 : 1, m = t[r + N];
    for (N += w, l = m & (1 << -v) - 1, m >>= -v, v += f; v > 0; l = l * 256 + t[r + N], N += w, v -= 8) ;
    for (s = l & (1 << -v) - 1, l >>= -v, v += u; v > 0; s = s * 256 + t[r + N], N += w, v -= 8) ;
    if (l === 0) l = 1 - S;
    else {
      if (l === T) return s ? NaN : (m ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, u), l = l - S;
    }
    return (m ? -1 : 1) * s * Math.pow(2, l - u);
  }, e.write = function(t, r, o, u, i, l) {
    var s, f, T, S = l * 8 - i - 1, v = (1 << S) - 1, N = v >> 1, w = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = u ? 0 : l - 1, g = u ? 1 : -1, A = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (f = isNaN(r) ? 1 : 0, s = v) : (s = Math.floor(Math.log(r) / Math.LN2), r * (T = Math.pow(2, -s)) < 1 && (s--, T *= 2), s + N >= 1 ? r += w / T : r += w * Math.pow(2, 1 - N), r * T >= 2 && (s++, T /= 2), s + N >= v ? (f = 0, s = v) : s + N >= 1 ? (f = (r * T - 1) * Math.pow(2, i), s = s + N) : (f = r * Math.pow(2, N - 1) * Math.pow(2, i), s = 0)); i >= 8; t[o + m] = f & 255, m += g, f /= 256, i -= 8) ;
    for (s = s << i | f, S += i; S > 0; t[o + m] = s & 255, m += g, s /= 256, S -= 8) ;
    t[o + m - g] |= A * 128;
  };
}));
var rr = /* @__PURE__ */ ce(((e) => {
  var t = aa(), r = sa(), o = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = y, e.INSPECT_MAX_BYTES = 50;
  var u = 2147483647;
  e.kMaxLength = u, s.TYPED_ARRAY_SUPPORT = i(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i() {
    try {
      var I = new Uint8Array(1), n = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(n, Uint8Array.prototype), Object.setPrototypeOf(I, n), I.foo() === 42;
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
  function l(I) {
    if (I > u) throw new RangeError('The value "' + I + '" is invalid for option "size"');
    var n = new Uint8Array(I);
    return Object.setPrototypeOf(n, s.prototype), n;
  }
  function s(I, n, a) {
    if (typeof I == "number") {
      if (typeof n == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return v(I);
    }
    return f(I, n, a);
  }
  s.poolSize = 8192;
  function f(I, n, a) {
    if (typeof I == "string") return N(I, n);
    if (ArrayBuffer.isView(I)) return m(I);
    if (I == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof I);
    if (B(I, ArrayBuffer) || I && B(I.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (B(I, SharedArrayBuffer) || I && B(I.buffer, SharedArrayBuffer))) return g(I, n, a);
    if (typeof I == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var d = I.valueOf && I.valueOf();
    if (d != null && d !== I) return s.from(d, n, a);
    var L = A(I);
    if (L) return L;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof I[Symbol.toPrimitive] == "function") return s.from(I[Symbol.toPrimitive]("string"), n, a);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof I);
  }
  s.from = function(I, n, a) {
    return f(I, n, a);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function T(I) {
    if (typeof I != "number") throw new TypeError('"size" argument must be of type number');
    if (I < 0) throw new RangeError('The value "' + I + '" is invalid for option "size"');
  }
  function S(I, n, a) {
    return T(I), I <= 0 ? l(I) : n !== void 0 ? typeof a == "string" ? l(I).fill(n, a) : l(I).fill(n) : l(I);
  }
  s.alloc = function(I, n, a) {
    return S(I, n, a);
  };
  function v(I) {
    return T(I), l(I < 0 ? 0 : C(I) | 0);
  }
  s.allocUnsafe = function(I) {
    return v(I);
  }, s.allocUnsafeSlow = function(I) {
    return v(I);
  };
  function N(I, n) {
    if ((typeof n != "string" || n === "") && (n = "utf8"), !s.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
    var a = x(I, n) | 0, d = l(a), L = d.write(I, n);
    return L !== a && (d = d.slice(0, L)), d;
  }
  function w(I) {
    for (var n = I.length < 0 ? 0 : C(I.length) | 0, a = l(n), d = 0; d < n; d += 1) a[d] = I[d] & 255;
    return a;
  }
  function m(I) {
    if (B(I, Uint8Array)) {
      var n = new Uint8Array(I);
      return g(n.buffer, n.byteOffset, n.byteLength);
    }
    return w(I);
  }
  function g(I, n, a) {
    if (n < 0 || I.byteLength < n) throw new RangeError('"offset" is outside of buffer bounds');
    if (I.byteLength < n + (a || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var d;
    return n === void 0 && a === void 0 ? d = new Uint8Array(I) : a === void 0 ? d = new Uint8Array(I, n) : d = new Uint8Array(I, n, a), Object.setPrototypeOf(d, s.prototype), d;
  }
  function A(I) {
    if (s.isBuffer(I)) {
      var n = C(I.length) | 0, a = l(n);
      return a.length === 0 || I.copy(a, 0, 0, n), a;
    }
    if (I.length !== void 0)
      return typeof I.length != "number" || c(I.length) ? l(0) : w(I);
    if (I.type === "Buffer" && Array.isArray(I.data)) return w(I.data);
  }
  function C(I) {
    if (I >= u) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u.toString(16) + " bytes");
    return I | 0;
  }
  function y(I) {
    return +I != I && (I = 0), s.alloc(+I);
  }
  s.isBuffer = function(n) {
    return n != null && n._isBuffer === !0 && n !== s.prototype;
  }, s.compare = function(n, a) {
    if (B(n, Uint8Array) && (n = s.from(n, n.offset, n.byteLength)), B(a, Uint8Array) && (a = s.from(a, a.offset, a.byteLength)), !s.isBuffer(n) || !s.isBuffer(a)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (n === a) return 0;
    for (var d = n.length, L = a.length, G = 0, z = Math.min(d, L); G < z; ++G) if (n[G] !== a[G]) {
      d = n[G], L = a[G];
      break;
    }
    return d < L ? -1 : L < d ? 1 : 0;
  }, s.isEncoding = function(n) {
    switch (String(n).toLowerCase()) {
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
  }, s.concat = function(n, a) {
    if (!Array.isArray(n)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (n.length === 0) return s.alloc(0);
    var d;
    if (a === void 0)
      for (a = 0, d = 0; d < n.length; ++d) a += n[d].length;
    var L = s.allocUnsafe(a), G = 0;
    for (d = 0; d < n.length; ++d) {
      var z = n[d];
      if (B(z, Uint8Array)) G + z.length > L.length ? s.from(z).copy(L, G) : Uint8Array.prototype.set.call(L, z, G);
      else if (s.isBuffer(z)) z.copy(L, G);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      G += z.length;
    }
    return L;
  };
  function x(I, n) {
    if (s.isBuffer(I)) return I.length;
    if (ArrayBuffer.isView(I) || B(I, ArrayBuffer)) return I.byteLength;
    if (typeof I != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof I);
    var a = I.length, d = arguments.length > 2 && arguments[2] === !0;
    if (!d && a === 0) return 0;
    for (var L = !1; ; ) switch (n) {
      case "ascii":
      case "latin1":
      case "binary":
        return a;
      case "utf8":
      case "utf-8":
        return h(I).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return a * 2;
      case "hex":
        return a >>> 1;
      case "base64":
        return ne(I).length;
      default:
        if (L) return d ? -1 : h(I).length;
        n = ("" + n).toLowerCase(), L = !0;
    }
  }
  s.byteLength = x;
  function b(I, n, a) {
    var d = !1;
    if ((n === void 0 || n < 0) && (n = 0), n > this.length || ((a === void 0 || a > this.length) && (a = this.length), a <= 0) || (a >>>= 0, n >>>= 0, a <= n)) return "";
    for (I || (I = "utf8"); ; ) switch (I) {
      case "hex":
        return Z(this, n, a);
      case "utf8":
      case "utf-8":
        return k(this, n, a);
      case "ascii":
        return $(this, n, a);
      case "latin1":
      case "binary":
        return oe(this, n, a);
      case "base64":
        return W(this, n, a);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return te(this, n, a);
      default:
        if (d) throw new TypeError("Unknown encoding: " + I);
        I = (I + "").toLowerCase(), d = !0;
    }
  }
  s.prototype._isBuffer = !0;
  function _(I, n, a) {
    var d = I[n];
    I[n] = I[a], I[a] = d;
  }
  s.prototype.swap16 = function() {
    var n = this.length;
    if (n % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var a = 0; a < n; a += 2) _(this, a, a + 1);
    return this;
  }, s.prototype.swap32 = function() {
    var n = this.length;
    if (n % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var a = 0; a < n; a += 4)
      _(this, a, a + 3), _(this, a + 1, a + 2);
    return this;
  }, s.prototype.swap64 = function() {
    var n = this.length;
    if (n % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var a = 0; a < n; a += 8)
      _(this, a, a + 7), _(this, a + 1, a + 6), _(this, a + 2, a + 5), _(this, a + 3, a + 4);
    return this;
  }, s.prototype.toString = function() {
    var n = this.length;
    return n === 0 ? "" : arguments.length === 0 ? k(this, 0, n) : b.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(n) {
    if (!s.isBuffer(n)) throw new TypeError("Argument must be a Buffer");
    return this === n ? !0 : s.compare(this, n) === 0;
  }, s.prototype.inspect = function() {
    var n = "", a = e.INSPECT_MAX_BYTES;
    return n = this.toString("hex", 0, a).replace(/(.{2})/g, "$1 ").trim(), this.length > a && (n += " ... "), "<Buffer " + n + ">";
  }, o && (s.prototype[o] = s.prototype.inspect), s.prototype.compare = function(n, a, d, L, G) {
    if (B(n, Uint8Array) && (n = s.from(n, n.offset, n.byteLength)), !s.isBuffer(n)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof n);
    if (a === void 0 && (a = 0), d === void 0 && (d = n ? n.length : 0), L === void 0 && (L = 0), G === void 0 && (G = this.length), a < 0 || d > n.length || L < 0 || G > this.length) throw new RangeError("out of range index");
    if (L >= G && a >= d) return 0;
    if (L >= G) return -1;
    if (a >= d) return 1;
    if (a >>>= 0, d >>>= 0, L >>>= 0, G >>>= 0, this === n) return 0;
    for (var z = G - L, ie = d - a, le = Math.min(z, ie), se = this.slice(L, G), he = n.slice(a, d), me = 0; me < le; ++me) if (se[me] !== he[me]) {
      z = se[me], ie = he[me];
      break;
    }
    return z < ie ? -1 : ie < z ? 1 : 0;
  };
  function p(I, n, a, d, L) {
    if (I.length === 0) return -1;
    if (typeof a == "string" ? (d = a, a = 0) : a > 2147483647 ? a = 2147483647 : a < -2147483648 && (a = -2147483648), a = +a, c(a) && (a = L ? 0 : I.length - 1), a < 0 && (a = I.length + a), a >= I.length) {
      if (L) return -1;
      a = I.length - 1;
    } else if (a < 0) if (L) a = 0;
    else return -1;
    if (typeof n == "string" && (n = s.from(n, d)), s.isBuffer(n))
      return n.length === 0 ? -1 : P(I, n, a, d, L);
    if (typeof n == "number")
      return n = n & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(I, n, a) : Uint8Array.prototype.lastIndexOf.call(I, n, a) : P(I, [n], a, d, L);
    throw new TypeError("val must be string, number or Buffer");
  }
  function P(I, n, a, d, L) {
    var G = 1, z = I.length, ie = n.length;
    if (d !== void 0 && (d = String(d).toLowerCase(), d === "ucs2" || d === "ucs-2" || d === "utf16le" || d === "utf-16le")) {
      if (I.length < 2 || n.length < 2) return -1;
      G = 2, z /= 2, ie /= 2, a /= 2;
    }
    function le(Te, Xe) {
      return G === 1 ? Te[Xe] : Te.readUInt16BE(Xe * G);
    }
    var se;
    if (L) {
      var he = -1;
      for (se = a; se < z; se++) if (le(I, se) === le(n, he === -1 ? 0 : se - he)) {
        if (he === -1 && (he = se), se - he + 1 === ie) return he * G;
      } else
        he !== -1 && (se -= se - he), he = -1;
    } else
      for (a + ie > z && (a = z - ie), se = a; se >= 0; se--) {
        for (var me = !0, ge = 0; ge < ie; ge++) if (le(I, se + ge) !== le(n, ge)) {
          me = !1;
          break;
        }
        if (me) return se;
      }
    return -1;
  }
  s.prototype.includes = function(n, a, d) {
    return this.indexOf(n, a, d) !== -1;
  }, s.prototype.indexOf = function(n, a, d) {
    return p(this, n, a, d, !0);
  }, s.prototype.lastIndexOf = function(n, a, d) {
    return p(this, n, a, d, !1);
  };
  function M(I, n, a, d) {
    a = Number(a) || 0;
    var L = I.length - a;
    d ? (d = Number(d), d > L && (d = L)) : d = L;
    var G = n.length;
    d > G / 2 && (d = G / 2);
    for (var z = 0; z < d; ++z) {
      var ie = parseInt(n.substr(z * 2, 2), 16);
      if (c(ie)) return z;
      I[a + z] = ie;
    }
    return z;
  }
  function R(I, n, a, d) {
    return D(h(n, I.length - a), I, a, d);
  }
  function q(I, n, a, d) {
    return D(j(n), I, a, d);
  }
  function Q(I, n, a, d) {
    return D(ne(n), I, a, d);
  }
  function O(I, n, a, d) {
    return D(U(n, I.length - a), I, a, d);
  }
  s.prototype.write = function(n, a, d, L) {
    if (a === void 0)
      L = "utf8", d = this.length, a = 0;
    else if (d === void 0 && typeof a == "string")
      L = a, d = this.length, a = 0;
    else if (isFinite(a))
      a = a >>> 0, isFinite(d) ? (d = d >>> 0, L === void 0 && (L = "utf8")) : (L = d, d = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var G = this.length - a;
    if ((d === void 0 || d > G) && (d = G), n.length > 0 && (d < 0 || a < 0) || a > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    L || (L = "utf8");
    for (var z = !1; ; ) switch (L) {
      case "hex":
        return M(this, n, a, d);
      case "utf8":
      case "utf-8":
        return R(this, n, a, d);
      case "ascii":
      case "latin1":
      case "binary":
        return q(this, n, a, d);
      case "base64":
        return Q(this, n, a, d);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return O(this, n, a, d);
      default:
        if (z) throw new TypeError("Unknown encoding: " + L);
        L = ("" + L).toLowerCase(), z = !0;
    }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function W(I, n, a) {
    return n === 0 && a === I.length ? t.fromByteArray(I) : t.fromByteArray(I.slice(n, a));
  }
  function k(I, n, a) {
    a = Math.min(I.length, a);
    for (var d = [], L = n; L < a; ) {
      var G = I[L], z = null, ie = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
      if (L + ie <= a) {
        var le, se, he, me;
        switch (ie) {
          case 1:
            G < 128 && (z = G);
            break;
          case 2:
            le = I[L + 1], (le & 192) === 128 && (me = (G & 31) << 6 | le & 63, me > 127 && (z = me));
            break;
          case 3:
            le = I[L + 1], se = I[L + 2], (le & 192) === 128 && (se & 192) === 128 && (me = (G & 15) << 12 | (le & 63) << 6 | se & 63, me > 2047 && (me < 55296 || me > 57343) && (z = me));
            break;
          case 4:
            le = I[L + 1], se = I[L + 2], he = I[L + 3], (le & 192) === 128 && (se & 192) === 128 && (he & 192) === 128 && (me = (G & 15) << 18 | (le & 63) << 12 | (se & 63) << 6 | he & 63, me > 65535 && me < 1114112 && (z = me));
        }
      }
      z === null ? (z = 65533, ie = 1) : z > 65535 && (z -= 65536, d.push(z >>> 10 & 1023 | 55296), z = 56320 | z & 1023), d.push(z), L += ie;
    }
    return J(d);
  }
  var H = 4096;
  function J(I) {
    var n = I.length;
    if (n <= H) return String.fromCharCode.apply(String, I);
    for (var a = "", d = 0; d < n; ) a += String.fromCharCode.apply(String, I.slice(d, d += H));
    return a;
  }
  function $(I, n, a) {
    var d = "";
    a = Math.min(I.length, a);
    for (var L = n; L < a; ++L) d += String.fromCharCode(I[L] & 127);
    return d;
  }
  function oe(I, n, a) {
    var d = "";
    a = Math.min(I.length, a);
    for (var L = n; L < a; ++L) d += String.fromCharCode(I[L]);
    return d;
  }
  function Z(I, n, a) {
    var d = I.length;
    (!n || n < 0) && (n = 0), (!a || a < 0 || a > d) && (a = d);
    for (var L = "", G = n; G < a; ++G) L += K[I[G]];
    return L;
  }
  function te(I, n, a) {
    for (var d = I.slice(n, a), L = "", G = 0; G < d.length - 1; G += 2) L += String.fromCharCode(d[G] + d[G + 1] * 256);
    return L;
  }
  s.prototype.slice = function(n, a) {
    var d = this.length;
    n = ~~n, a = a === void 0 ? d : ~~a, n < 0 ? (n += d, n < 0 && (n = 0)) : n > d && (n = d), a < 0 ? (a += d, a < 0 && (a = 0)) : a > d && (a = d), a < n && (a = n);
    var L = this.subarray(n, a);
    return Object.setPrototypeOf(L, s.prototype), L;
  };
  function V(I, n, a) {
    if (I % 1 !== 0 || I < 0) throw new RangeError("offset is not uint");
    if (I + n > a) throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(n, a, d) {
    n = n >>> 0, a = a >>> 0, d || V(n, a, this.length);
    for (var L = this[n], G = 1, z = 0; ++z < a && (G *= 256); ) L += this[n + z] * G;
    return L;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(n, a, d) {
    n = n >>> 0, a = a >>> 0, d || V(n, a, this.length);
    for (var L = this[n + --a], G = 1; a > 0 && (G *= 256); ) L += this[n + --a] * G;
    return L;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(n, a) {
    return n = n >>> 0, a || V(n, 1, this.length), this[n];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(n, a) {
    return n = n >>> 0, a || V(n, 2, this.length), this[n] | this[n + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(n, a) {
    return n = n >>> 0, a || V(n, 2, this.length), this[n] << 8 | this[n + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), (this[n] | this[n + 1] << 8 | this[n + 2] << 16) + this[n + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), this[n] * 16777216 + (this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3]);
  }, s.prototype.readIntLE = function(n, a, d) {
    n = n >>> 0, a = a >>> 0, d || V(n, a, this.length);
    for (var L = this[n], G = 1, z = 0; ++z < a && (G *= 256); ) L += this[n + z] * G;
    return G *= 128, L >= G && (L -= Math.pow(2, 8 * a)), L;
  }, s.prototype.readIntBE = function(n, a, d) {
    n = n >>> 0, a = a >>> 0, d || V(n, a, this.length);
    for (var L = a, G = 1, z = this[n + --L]; L > 0 && (G *= 256); ) z += this[n + --L] * G;
    return G *= 128, z >= G && (z -= Math.pow(2, 8 * a)), z;
  }, s.prototype.readInt8 = function(n, a) {
    return n = n >>> 0, a || V(n, 1, this.length), this[n] & 128 ? (255 - this[n] + 1) * -1 : this[n];
  }, s.prototype.readInt16LE = function(n, a) {
    n = n >>> 0, a || V(n, 2, this.length);
    var d = this[n] | this[n + 1] << 8;
    return d & 32768 ? d | 4294901760 : d;
  }, s.prototype.readInt16BE = function(n, a) {
    n = n >>> 0, a || V(n, 2, this.length);
    var d = this[n + 1] | this[n] << 8;
    return d & 32768 ? d | 4294901760 : d;
  }, s.prototype.readInt32LE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), this[n] | this[n + 1] << 8 | this[n + 2] << 16 | this[n + 3] << 24;
  }, s.prototype.readInt32BE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), this[n] << 24 | this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3];
  }, s.prototype.readFloatLE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), r.read(this, n, !0, 23, 4);
  }, s.prototype.readFloatBE = function(n, a) {
    return n = n >>> 0, a || V(n, 4, this.length), r.read(this, n, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(n, a) {
    return n = n >>> 0, a || V(n, 8, this.length), r.read(this, n, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(n, a) {
    return n = n >>> 0, a || V(n, 8, this.length), r.read(this, n, !1, 52, 8);
  };
  function F(I, n, a, d, L, G) {
    if (!s.isBuffer(I)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (n > L || n < G) throw new RangeError('"value" argument is out of bounds');
    if (a + d > I.length) throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(n, a, d, L) {
    if (n = +n, a = a >>> 0, d = d >>> 0, !L) {
      var G = Math.pow(2, 8 * d) - 1;
      F(this, n, a, d, G, 0);
    }
    var z = 1, ie = 0;
    for (this[a] = n & 255; ++ie < d && (z *= 256); ) this[a + ie] = n / z & 255;
    return a + d;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(n, a, d, L) {
    if (n = +n, a = a >>> 0, d = d >>> 0, !L) {
      var G = Math.pow(2, 8 * d) - 1;
      F(this, n, a, d, G, 0);
    }
    var z = d - 1, ie = 1;
    for (this[a + z] = n & 255; --z >= 0 && (ie *= 256); ) this[a + z] = n / ie & 255;
    return a + d;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 1, 255, 0), this[a] = n & 255, a + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 2, 65535, 0), this[a] = n & 255, this[a + 1] = n >>> 8, a + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 2, 65535, 0), this[a] = n >>> 8, this[a + 1] = n & 255, a + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 4, 4294967295, 0), this[a + 3] = n >>> 24, this[a + 2] = n >>> 16, this[a + 1] = n >>> 8, this[a] = n & 255, a + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 4, 4294967295, 0), this[a] = n >>> 24, this[a + 1] = n >>> 16, this[a + 2] = n >>> 8, this[a + 3] = n & 255, a + 4;
  }, s.prototype.writeIntLE = function(n, a, d, L) {
    if (n = +n, a = a >>> 0, !L) {
      var G = Math.pow(2, 8 * d - 1);
      F(this, n, a, d, G - 1, -G);
    }
    var z = 0, ie = 1, le = 0;
    for (this[a] = n & 255; ++z < d && (ie *= 256); )
      n < 0 && le === 0 && this[a + z - 1] !== 0 && (le = 1), this[a + z] = (n / ie >> 0) - le & 255;
    return a + d;
  }, s.prototype.writeIntBE = function(n, a, d, L) {
    if (n = +n, a = a >>> 0, !L) {
      var G = Math.pow(2, 8 * d - 1);
      F(this, n, a, d, G - 1, -G);
    }
    var z = d - 1, ie = 1, le = 0;
    for (this[a + z] = n & 255; --z >= 0 && (ie *= 256); )
      n < 0 && le === 0 && this[a + z + 1] !== 0 && (le = 1), this[a + z] = (n / ie >> 0) - le & 255;
    return a + d;
  }, s.prototype.writeInt8 = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 1, 127, -128), n < 0 && (n = 255 + n + 1), this[a] = n & 255, a + 1;
  }, s.prototype.writeInt16LE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 2, 32767, -32768), this[a] = n & 255, this[a + 1] = n >>> 8, a + 2;
  }, s.prototype.writeInt16BE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 2, 32767, -32768), this[a] = n >>> 8, this[a + 1] = n & 255, a + 2;
  }, s.prototype.writeInt32LE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 4, 2147483647, -2147483648), this[a] = n & 255, this[a + 1] = n >>> 8, this[a + 2] = n >>> 16, this[a + 3] = n >>> 24, a + 4;
  }, s.prototype.writeInt32BE = function(n, a, d) {
    return n = +n, a = a >>> 0, d || F(this, n, a, 4, 2147483647, -2147483648), n < 0 && (n = 4294967295 + n + 1), this[a] = n >>> 24, this[a + 1] = n >>> 16, this[a + 2] = n >>> 8, this[a + 3] = n & 255, a + 4;
  };
  function X(I, n, a, d, L, G) {
    if (a + d > I.length) throw new RangeError("Index out of range");
    if (a < 0) throw new RangeError("Index out of range");
  }
  function Y(I, n, a, d, L) {
    return n = +n, a = a >>> 0, L || X(I, n, a, 4), r.write(I, n, a, d, 23, 4), a + 4;
  }
  s.prototype.writeFloatLE = function(n, a, d) {
    return Y(this, n, a, !0, d);
  }, s.prototype.writeFloatBE = function(n, a, d) {
    return Y(this, n, a, !1, d);
  };
  function re(I, n, a, d, L) {
    return n = +n, a = a >>> 0, L || X(I, n, a, 8), r.write(I, n, a, d, 52, 8), a + 8;
  }
  s.prototype.writeDoubleLE = function(n, a, d) {
    return re(this, n, a, !0, d);
  }, s.prototype.writeDoubleBE = function(n, a, d) {
    return re(this, n, a, !1, d);
  }, s.prototype.copy = function(n, a, d, L) {
    if (!s.isBuffer(n)) throw new TypeError("argument should be a Buffer");
    if (d || (d = 0), !L && L !== 0 && (L = this.length), a >= n.length && (a = n.length), a || (a = 0), L > 0 && L < d && (L = d), L === d || n.length === 0 || this.length === 0) return 0;
    if (a < 0) throw new RangeError("targetStart out of bounds");
    if (d < 0 || d >= this.length) throw new RangeError("Index out of range");
    if (L < 0) throw new RangeError("sourceEnd out of bounds");
    L > this.length && (L = this.length), n.length - a < L - d && (L = n.length - a + d);
    var G = L - d;
    return this === n && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(a, d, L) : Uint8Array.prototype.set.call(n, this.subarray(d, L), a), G;
  }, s.prototype.fill = function(n, a, d, L) {
    if (typeof n == "string") {
      if (typeof a == "string" ? (L = a, a = 0, d = this.length) : typeof d == "string" && (L = d, d = this.length), L !== void 0 && typeof L != "string") throw new TypeError("encoding must be a string");
      if (typeof L == "string" && !s.isEncoding(L)) throw new TypeError("Unknown encoding: " + L);
      if (n.length === 1) {
        var G = n.charCodeAt(0);
        (L === "utf8" && G < 128 || L === "latin1") && (n = G);
      }
    } else typeof n == "number" ? n = n & 255 : typeof n == "boolean" && (n = Number(n));
    if (a < 0 || this.length < a || this.length < d) throw new RangeError("Out of range index");
    if (d <= a) return this;
    a = a >>> 0, d = d === void 0 ? this.length : d >>> 0, n || (n = 0);
    var z;
    if (typeof n == "number") for (z = a; z < d; ++z) this[z] = n;
    else {
      var ie = s.isBuffer(n) ? n : s.from(n, L), le = ie.length;
      if (le === 0) throw new TypeError('The value "' + n + '" is invalid for argument "value"');
      for (z = 0; z < d - a; ++z) this[z + a] = ie[z % le];
    }
    return this;
  };
  var de = /[^+/0-9A-Za-z-_]/g;
  function E(I) {
    if (I = I.split("=")[0], I = I.trim().replace(de, ""), I.length < 2) return "";
    for (; I.length % 4 !== 0; ) I = I + "=";
    return I;
  }
  function h(I, n) {
    n = n || 1 / 0;
    for (var a, d = I.length, L = null, G = [], z = 0; z < d; ++z) {
      if (a = I.charCodeAt(z), a > 55295 && a < 57344) {
        if (!L) {
          if (a > 56319) {
            (n -= 3) > -1 && G.push(239, 191, 189);
            continue;
          } else if (z + 1 === d) {
            (n -= 3) > -1 && G.push(239, 191, 189);
            continue;
          }
          L = a;
          continue;
        }
        if (a < 56320) {
          (n -= 3) > -1 && G.push(239, 191, 189), L = a;
          continue;
        }
        a = (L - 55296 << 10 | a - 56320) + 65536;
      } else L && (n -= 3) > -1 && G.push(239, 191, 189);
      if (L = null, a < 128) {
        if ((n -= 1) < 0) break;
        G.push(a);
      } else if (a < 2048) {
        if ((n -= 2) < 0) break;
        G.push(a >> 6 | 192, a & 63 | 128);
      } else if (a < 65536) {
        if ((n -= 3) < 0) break;
        G.push(a >> 12 | 224, a >> 6 & 63 | 128, a & 63 | 128);
      } else if (a < 1114112) {
        if ((n -= 4) < 0) break;
        G.push(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, a & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return G;
  }
  function j(I) {
    for (var n = [], a = 0; a < I.length; ++a) n.push(I.charCodeAt(a) & 255);
    return n;
  }
  function U(I, n) {
    for (var a, d, L, G = [], z = 0; z < I.length && !((n -= 2) < 0); ++z)
      a = I.charCodeAt(z), d = a >> 8, L = a % 256, G.push(L), G.push(d);
    return G;
  }
  function ne(I) {
    return t.toByteArray(E(I));
  }
  function D(I, n, a, d) {
    for (var L = 0; L < d && !(L + a >= n.length || L >= I.length); ++L)
      n[L + a] = I[L];
    return L;
  }
  function B(I, n) {
    return I instanceof n || I != null && I.constructor != null && I.constructor.name != null && I.constructor.name === n.name;
  }
  function c(I) {
    return I !== I;
  }
  var K = (function() {
    for (var I = "0123456789abcdef", n = new Array(256), a = 0; a < 16; ++a)
      for (var d = a * 16, L = 0; L < 16; ++L) n[d + L] = I[a] + I[L];
    return n;
  })();
})), kn = /* @__PURE__ */ ce(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var o = {}, u = /* @__PURE__ */ Symbol("test"), i = Object(u);
    if (typeof u == "string" || Object.prototype.toString.call(u) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]") return !1;
    var l = 42;
    o[u] = l;
    for (var s in o) return !1;
    if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(o).length !== 0) return !1;
    var f = Object.getOwnPropertySymbols(o);
    if (f.length !== 1 || f[0] !== u || !Object.prototype.propertyIsEnumerable.call(o, u)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var T = Object.getOwnPropertyDescriptor(o, u);
      if (T.value !== l || T.enumerable !== !0) return !1;
    }
    return !0;
  };
})), Br = /* @__PURE__ */ ce(((e, t) => {
  var r = kn();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), Rn = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Object;
})), oa = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Error;
})), la = /* @__PURE__ */ ce(((e, t) => {
  t.exports = EvalError;
})), ua = /* @__PURE__ */ ce(((e, t) => {
  t.exports = RangeError;
})), ca = /* @__PURE__ */ ce(((e, t) => {
  t.exports = ReferenceError;
})), In = /* @__PURE__ */ ce(((e, t) => {
  t.exports = SyntaxError;
})), nr = /* @__PURE__ */ ce(((e, t) => {
  t.exports = TypeError;
})), ha = /* @__PURE__ */ ce(((e, t) => {
  t.exports = URIError;
})), fa = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.abs;
})), da = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.floor;
})), pa = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.max;
})), ma = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.min;
})), wa = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.pow;
})), ga = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Math.round;
})), va = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Number.isNaN || function(o) {
    return o !== o;
  };
})), ya = /* @__PURE__ */ ce(((e, t) => {
  var r = va();
  t.exports = function(u) {
    return r(u) || u === 0 ? u : u < 0 ? -1 : 1;
  };
})), ba = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), Mt = /* @__PURE__ */ ce(((e, t) => {
  var r = ba();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), ir = /* @__PURE__ */ ce(((e, t) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  t.exports = r;
})), _a = /* @__PURE__ */ ce(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, o = kn();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : o();
  };
})), Cn = /* @__PURE__ */ ce(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Nn = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Rn().getPrototypeOf || null;
})), xa = /* @__PURE__ */ ce(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", o = Object.prototype.toString, u = Math.max, i = "[object Function]", l = function(S, v) {
    for (var N = [], w = 0; w < S.length; w += 1) N[w] = S[w];
    for (var m = 0; m < v.length; m += 1) N[m + S.length] = v[m];
    return N;
  }, s = function(S, v) {
    for (var N = [], w = v, m = 0; w < S.length; w += 1, m += 1) N[m] = S[w];
    return N;
  }, f = function(T, S) {
    for (var v = "", N = 0; N < T.length; N += 1)
      v += T[N], N + 1 < T.length && (v += S);
    return v;
  };
  t.exports = function(S) {
    var v = this;
    if (typeof v != "function" || o.apply(v) !== i) throw new TypeError(r + v);
    for (var N = s(arguments, 1), w, m = function() {
      if (this instanceof w) {
        var x = v.apply(this, l(N, arguments));
        return Object(x) === x ? x : this;
      }
      return v.apply(S, l(N, arguments));
    }, g = u(0, v.length - N.length), A = [], C = 0; C < g; C++) A[C] = "$" + C;
    if (w = Function("binder", "return function (" + f(A, ",") + "){ return binder.apply(this,arguments); }")(m), v.prototype) {
      var y = function() {
      };
      y.prototype = v.prototype, w.prototype = new y(), y.prototype = null;
    }
    return w;
  };
})), Ut = /* @__PURE__ */ ce(((e, t) => {
  var r = xa();
  t.exports = Function.prototype.bind || r;
})), Lr = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Function.prototype.call;
})), Mr = /* @__PURE__ */ ce(((e, t) => {
  t.exports = Function.prototype.apply;
})), Ea = /* @__PURE__ */ ce(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), On = /* @__PURE__ */ ce(((e, t) => {
  var r = Ut(), o = Mr(), u = Lr();
  t.exports = Ea() || r.call(u, o);
})), Ur = /* @__PURE__ */ ce(((e, t) => {
  var r = Ut(), o = nr(), u = Lr(), i = On();
  t.exports = function(s) {
    if (s.length < 1 || typeof s[0] != "function") throw new o("a function is required");
    return i(r, u, s);
  };
})), Ta = /* @__PURE__ */ ce(((e, t) => {
  var r = Ur(), o = Mt(), u;
  try {
    u = [].__proto__ === Array.prototype;
  } catch (f) {
    if (!f || typeof f != "object" || !("code" in f) || f.code !== "ERR_PROTO_ACCESS") throw f;
  }
  var i = !!u && o && o(Object.prototype, "__proto__"), l = Object, s = l.getPrototypeOf;
  t.exports = i && typeof i.get == "function" ? r([i.get]) : typeof s == "function" ? function(T) {
    return s(T == null ? T : l(T));
  } : !1;
})), Pn = /* @__PURE__ */ ce(((e, t) => {
  var r = Cn(), o = Nn(), u = Ta();
  t.exports = r ? function(l) {
    return r(l);
  } : o ? function(l) {
    if (!l || typeof l != "object" && typeof l != "function") throw new TypeError("getProto: not an object");
    return o(l);
  } : u ? function(l) {
    return u(l);
  } : null;
})), Sa = /* @__PURE__ */ ce(((e, t) => {
  var r = Function.prototype.call, o = Object.prototype.hasOwnProperty;
  t.exports = Ut().call(r, o);
})), Fn = /* @__PURE__ */ ce(((e, t) => {
  var r, o = Rn(), u = oa(), i = la(), l = ua(), s = ca(), f = In(), T = nr(), S = ha(), v = fa(), N = da(), w = pa(), m = ma(), g = wa(), A = ga(), C = ya(), y = Function, x = function(U) {
    try {
      return y('"use strict"; return (' + U + ").constructor;")();
    } catch {
    }
  }, b = Mt(), _ = ir(), p = function() {
    throw new T();
  }, P = b ? (function() {
    try {
      return arguments.callee, p;
    } catch {
      try {
        return b(arguments, "callee").get;
      } catch {
        return p;
      }
    }
  })() : p, M = _a()(), R = Pn(), q = Nn(), Q = Cn(), O = Mr(), W = Lr(), k = {}, H = typeof Uint8Array > "u" || !R ? r : R(Uint8Array), J = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": M && R ? R([][Symbol.iterator]()) : r,
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
    "%Error%": u,
    "%eval%": eval,
    "%EvalError%": i,
    "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": y,
    "%GeneratorFunction%": k,
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
    "%Object%": o,
    "%Object.getOwnPropertyDescriptor%": b,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": l,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !M || !R ? r : R((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": M && R ? R(""[Symbol.iterator]()) : r,
    "%Symbol%": M ? Symbol : r,
    "%SyntaxError%": f,
    "%ThrowTypeError%": P,
    "%TypedArray%": H,
    "%TypeError%": T,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": S,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": W,
    "%Function.prototype.apply%": O,
    "%Object.defineProperty%": _,
    "%Object.getPrototypeOf%": q,
    "%Math.abs%": v,
    "%Math.floor%": N,
    "%Math.max%": w,
    "%Math.min%": m,
    "%Math.pow%": g,
    "%Math.round%": A,
    "%Math.sign%": C,
    "%Reflect.getPrototypeOf%": Q
  };
  if (R) try {
    null.error;
  } catch (U) {
    J["%Error.prototype%"] = R(R(U));
  }
  var $ = function U(ne) {
    var D;
    if (ne === "%AsyncFunction%") D = x("async function () {}");
    else if (ne === "%GeneratorFunction%") D = x("function* () {}");
    else if (ne === "%AsyncGeneratorFunction%") D = x("async function* () {}");
    else if (ne === "%AsyncGenerator%") {
      var B = U("%AsyncGeneratorFunction%");
      B && (D = B.prototype);
    } else if (ne === "%AsyncIteratorPrototype%") {
      var c = U("%AsyncGenerator%");
      c && R && (D = R(c.prototype));
    }
    return J[ne] = D, D;
  }, oe = {
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
  }, Z = Ut(), te = Sa(), V = Z.call(W, Array.prototype.concat), F = Z.call(O, Array.prototype.splice), X = Z.call(W, String.prototype.replace), Y = Z.call(W, String.prototype.slice), re = Z.call(W, RegExp.prototype.exec), de = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, E = /\\(\\)?/g, h = function(ne) {
    var D = Y(ne, 0, 1), B = Y(ne, -1);
    if (D === "%" && B !== "%") throw new f("invalid intrinsic syntax, expected closing `%`");
    if (B === "%" && D !== "%") throw new f("invalid intrinsic syntax, expected opening `%`");
    var c = [];
    return X(ne, de, function(K, I, n, a) {
      c[c.length] = n ? X(a, E, "$1") : I || K;
    }), c;
  }, j = function(ne, D) {
    var B = ne, c;
    if (te(oe, B) && (c = oe[B], B = "%" + c[0] + "%"), te(J, B)) {
      var K = J[B];
      if (K === k && (K = $(B)), typeof K > "u" && !D) throw new T("intrinsic " + ne + " exists, but is not available. Please file an issue!");
      return {
        alias: c,
        name: B,
        value: K
      };
    }
    throw new f("intrinsic " + ne + " does not exist!");
  };
  t.exports = function(ne, D) {
    if (typeof ne != "string" || ne.length === 0) throw new T("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof D != "boolean") throw new T('"allowMissing" argument must be a boolean');
    if (re(/^%?[^%]*%?$/, ne) === null) throw new f("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var B = h(ne), c = B.length > 0 ? B[0] : "", K = j("%" + c + "%", D), I = K.name, n = K.value, a = !1, d = K.alias;
    d && (c = d[0], F(B, V([0, 1], d)));
    for (var L = 1, G = !0; L < B.length; L += 1) {
      var z = B[L], ie = Y(z, 0, 1), le = Y(z, -1);
      if ((ie === '"' || ie === "'" || ie === "`" || le === '"' || le === "'" || le === "`") && ie !== le) throw new f("property names with quotes must have matching quotes");
      if ((z === "constructor" || !G) && (a = !0), c += "." + z, I = "%" + c + "%", te(J, I)) n = J[I];
      else if (n != null) {
        if (!(z in n)) {
          if (!D) throw new T("base intrinsic for " + ne + " exists, but the property is not available.");
          return;
        }
        if (b && L + 1 >= B.length) {
          var se = b(n, z);
          G = !!se, G && "get" in se && !("originalValue" in se.get) ? n = se.get : n = n[z];
        } else
          G = te(n, z), n = n[z];
        G && !a && (J[I] = n);
      }
    }
    return n;
  };
})), Dn = /* @__PURE__ */ ce(((e, t) => {
  var r = Fn(), o = Ur(), u = o([r("%String.prototype.indexOf%")]);
  t.exports = function(l, s) {
    var f = r(l, !!s);
    return typeof f == "function" && u(l, ".prototype.") > -1 ? o([f]) : f;
  };
})), Aa = /* @__PURE__ */ ce(((e, t) => {
  var r = Br()(), o = Dn()("Object.prototype.toString"), u = function(f) {
    return r && f && typeof f == "object" && Symbol.toStringTag in f ? !1 : o(f) === "[object Arguments]";
  }, i = function(f) {
    return u(f) ? !0 : f !== null && typeof f == "object" && "length" in f && typeof f.length == "number" && f.length >= 0 && o(f) !== "[object Array]" && "callee" in f && o(f.callee) === "[object Function]";
  }, l = (function() {
    return u(arguments);
  })();
  u.isLegacyArguments = i, t.exports = l ? u : i;
})), ka = /* @__PURE__ */ ce(((e, t) => {
  var r = Object.prototype.toString, o = Function.prototype.toString, u = /^\s*(?:function)?\*/, i = Br()(), l = Object.getPrototypeOf, s = function() {
    if (!i) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, f;
  t.exports = function(S) {
    if (typeof S != "function") return !1;
    if (u.test(o.call(S))) return !0;
    if (!i) return r.call(S) === "[object GeneratorFunction]";
    if (!l) return !1;
    if (typeof f > "u") {
      var v = s();
      f = v ? l(v) : !1;
    }
    return l(S) === f;
  };
})), Ra = /* @__PURE__ */ ce(((e, t) => {
  var r = Function.prototype.toString, o = typeof Reflect == "object" && Reflect !== null && Reflect.apply, u, i;
  if (typeof o == "function" && typeof Object.defineProperty == "function") try {
    u = Object.defineProperty({}, "length", { get: function() {
      throw i;
    } }), i = {}, o(function() {
      throw 42;
    }, null, u);
  } catch (b) {
    b !== i && (o = null);
  }
  else o = null;
  var l = /^\s*class\b/, s = function(_) {
    try {
      var p = r.call(_);
      return l.test(p);
    } catch {
      return !1;
    }
  }, f = function(_) {
    try {
      return s(_) ? !1 : (r.call(_), !0);
    } catch {
      return !1;
    }
  }, T = Object.prototype.toString, S = "[object Object]", v = "[object Function]", N = "[object GeneratorFunction]", w = "[object HTMLAllCollection]", m = "[object HTML document.all class]", g = "[object HTMLCollection]", A = typeof Symbol == "function" && !!Symbol.toStringTag, C = !(0 in [,]), y = function() {
    return !1;
  };
  if (typeof document == "object") {
    var x = document.all;
    T.call(x) === T.call(document.all) && (y = function(_) {
      if ((C || !_) && (typeof _ > "u" || typeof _ == "object")) try {
        var p = T.call(_);
        return (p === w || p === m || p === g || p === S) && _("") == null;
      } catch {
      }
      return !1;
    });
  }
  t.exports = o ? function(_) {
    if (y(_)) return !0;
    if (!_ || typeof _ != "function" && typeof _ != "object") return !1;
    try {
      o(_, null, u);
    } catch (p) {
      if (p !== i) return !1;
    }
    return !s(_) && f(_);
  } : function(_) {
    if (y(_)) return !0;
    if (!_ || typeof _ != "function" && typeof _ != "object") return !1;
    if (A) return f(_);
    if (s(_)) return !1;
    var p = T.call(_);
    return p !== v && p !== N && !/^\[object HTML/.test(p) ? !1 : f(_);
  };
})), Ia = /* @__PURE__ */ ce(((e, t) => {
  var r = Ra(), o = Object.prototype.toString, u = Object.prototype.hasOwnProperty, i = function(S, v, N) {
    for (var w = 0, m = S.length; w < m; w++) u.call(S, w) && (N == null ? v(S[w], w, S) : v.call(N, S[w], w, S));
  }, l = function(S, v, N) {
    for (var w = 0, m = S.length; w < m; w++) N == null ? v(S.charAt(w), w, S) : v.call(N, S.charAt(w), w, S);
  }, s = function(S, v, N) {
    for (var w in S) u.call(S, w) && (N == null ? v(S[w], w, S) : v.call(N, S[w], w, S));
  };
  function f(T) {
    return o.call(T) === "[object Array]";
  }
  t.exports = function(S, v, N) {
    if (!r(v)) throw new TypeError("iterator must be a function");
    var w;
    arguments.length >= 3 && (w = N), f(S) ? i(S, v, w) : typeof S == "string" ? l(S, v, w) : s(S, v, w);
  };
})), Ca = /* @__PURE__ */ ce(((e, t) => {
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
})), Na = /* @__PURE__ */ ce(((e, t) => {
  _t();
  var r = Ca(), o = typeof globalThis > "u" ? Ie : globalThis;
  t.exports = function() {
    for (var i = [], l = 0; l < r.length; l++) typeof o[r[l]] == "function" && (i[i.length] = r[l]);
    return i;
  };
})), Oa = /* @__PURE__ */ ce(((e, t) => {
  var r = ir(), o = In(), u = nr(), i = Mt();
  t.exports = function(s, f, T) {
    if (!s || typeof s != "object" && typeof s != "function") throw new u("`obj` must be an object or a function`");
    if (typeof f != "string" && typeof f != "symbol") throw new u("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new u("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new u("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new u("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new u("`loose`, if provided, must be a boolean");
    var S = arguments.length > 3 ? arguments[3] : null, v = arguments.length > 4 ? arguments[4] : null, N = arguments.length > 5 ? arguments[5] : null, w = arguments.length > 6 ? arguments[6] : !1, m = !!i && i(s, f);
    if (r) r(s, f, {
      configurable: N === null && m ? m.configurable : !N,
      enumerable: S === null && m ? m.enumerable : !S,
      value: T,
      writable: v === null && m ? m.writable : !v
    });
    else if (w || !S && !v && !N) s[f] = T;
    else throw new o("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), Pa = /* @__PURE__ */ ce(((e, t) => {
  var r = ir(), o = function() {
    return !!r;
  };
  o.hasArrayLengthDefineBug = function() {
    if (!r) return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, t.exports = o;
})), Fa = /* @__PURE__ */ ce(((e, t) => {
  var r = Fn(), o = Oa(), u = Pa()(), i = Mt(), l = nr(), s = r("%Math.floor%");
  t.exports = function(T, S) {
    if (typeof T != "function") throw new l("`fn` is not a function");
    if (typeof S != "number" || S < 0 || S > 4294967295 || s(S) !== S) throw new l("`length` must be a positive 32-bit integer");
    var v = arguments.length > 2 && !!arguments[2], N = !0, w = !0;
    if ("length" in T && i) {
      var m = i(T, "length");
      m && !m.configurable && (N = !1), m && !m.writable && (w = !1);
    }
    return (N || w || !v) && (u ? o(T, "length", S, !0, !0) : o(T, "length", S)), T;
  };
})), Da = /* @__PURE__ */ ce(((e, t) => {
  var r = Ut(), o = Mr(), u = On();
  t.exports = function() {
    return u(r, o, arguments);
  };
})), Ba = /* @__PURE__ */ ce(((e, t) => {
  var r = Fa(), o = ir(), u = Ur(), i = Da();
  t.exports = function(s) {
    var f = u(arguments), T = s.length - (arguments.length - 1);
    return r(f, 1 + (T > 0 ? T : 0), !0);
  }, o ? o(t.exports, "apply", { value: i }) : t.exports.apply = i;
})), Bn = /* @__PURE__ */ ce(((e, t) => {
  _t();
  var r = Ia(), o = Na(), u = Ba(), i = Dn(), l = Mt(), s = Pn(), f = i("Object.prototype.toString"), T = Br()(), S = typeof globalThis > "u" ? Ie : globalThis, v = o(), N = i("String.prototype.slice"), w = i("Array.prototype.indexOf", !0) || function(y, x) {
    for (var b = 0; b < y.length; b += 1) if (y[b] === x) return b;
    return -1;
  }, m = { __proto__: null };
  T && l && s ? r(v, function(C) {
    var y = new S[C]();
    if (Symbol.toStringTag in y && s) {
      var x = s(y), b = l(x, Symbol.toStringTag);
      !b && x && (b = l(s(x), Symbol.toStringTag)), m["$" + C] = u(b.get);
    }
  }) : r(v, function(C) {
    var y = new S[C](), x = y.slice || y.set;
    x && (m["$" + C] = u(x));
  });
  var g = function(y) {
    var x = !1;
    return r(
      m,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(b, _) {
        if (!x) try {
          "$" + b(y) === _ && (x = N(_, 1));
        } catch {
        }
      }
    ), x;
  }, A = function(y) {
    var x = !1;
    return r(
      m,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(b, _) {
        if (!x) try {
          b(y), x = N(_, 1);
        } catch {
        }
      }
    ), x;
  };
  t.exports = function(y) {
    if (!y || typeof y != "object") return !1;
    if (!T) {
      var x = N(f(y), 8, -1);
      return w(v, x) > -1 ? x : x !== "Object" ? !1 : A(y);
    }
    return l ? g(y) : null;
  };
})), La = /* @__PURE__ */ ce(((e, t) => {
  var r = Bn();
  t.exports = function(u) {
    return !!r(u);
  };
})), Ma = /* @__PURE__ */ ce(((e) => {
  var t = Aa(), r = ka(), o = Bn(), u = La();
  function i(d) {
    return d.call.bind(d);
  }
  var l = typeof BigInt < "u", s = typeof Symbol < "u", f = i(Object.prototype.toString), T = i(Number.prototype.valueOf), S = i(String.prototype.valueOf), v = i(Boolean.prototype.valueOf);
  if (l) var N = i(BigInt.prototype.valueOf);
  if (s) var w = i(Symbol.prototype.valueOf);
  function m(d, L) {
    if (typeof d != "object") return !1;
    try {
      return L(d), !0;
    } catch {
      return !1;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = u;
  function g(d) {
    return typeof Promise < "u" && d instanceof Promise || d !== null && typeof d == "object" && typeof d.then == "function" && typeof d.catch == "function";
  }
  e.isPromise = g;
  function A(d) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(d) : u(d) || X(d);
  }
  e.isArrayBufferView = A;
  function C(d) {
    return o(d) === "Uint8Array";
  }
  e.isUint8Array = C;
  function y(d) {
    return o(d) === "Uint8ClampedArray";
  }
  e.isUint8ClampedArray = y;
  function x(d) {
    return o(d) === "Uint16Array";
  }
  e.isUint16Array = x;
  function b(d) {
    return o(d) === "Uint32Array";
  }
  e.isUint32Array = b;
  function _(d) {
    return o(d) === "Int8Array";
  }
  e.isInt8Array = _;
  function p(d) {
    return o(d) === "Int16Array";
  }
  e.isInt16Array = p;
  function P(d) {
    return o(d) === "Int32Array";
  }
  e.isInt32Array = P;
  function M(d) {
    return o(d) === "Float32Array";
  }
  e.isFloat32Array = M;
  function R(d) {
    return o(d) === "Float64Array";
  }
  e.isFloat64Array = R;
  function q(d) {
    return o(d) === "BigInt64Array";
  }
  e.isBigInt64Array = q;
  function Q(d) {
    return o(d) === "BigUint64Array";
  }
  e.isBigUint64Array = Q;
  function O(d) {
    return f(d) === "[object Map]";
  }
  O.working = typeof Map < "u" && O(/* @__PURE__ */ new Map());
  function W(d) {
    return typeof Map > "u" ? !1 : O.working ? O(d) : d instanceof Map;
  }
  e.isMap = W;
  function k(d) {
    return f(d) === "[object Set]";
  }
  k.working = typeof Set < "u" && k(/* @__PURE__ */ new Set());
  function H(d) {
    return typeof Set > "u" ? !1 : k.working ? k(d) : d instanceof Set;
  }
  e.isSet = H;
  function J(d) {
    return f(d) === "[object WeakMap]";
  }
  J.working = typeof WeakMap < "u" && J(/* @__PURE__ */ new WeakMap());
  function $(d) {
    return typeof WeakMap > "u" ? !1 : J.working ? J(d) : d instanceof WeakMap;
  }
  e.isWeakMap = $;
  function oe(d) {
    return f(d) === "[object WeakSet]";
  }
  oe.working = typeof WeakSet < "u" && oe(/* @__PURE__ */ new WeakSet());
  function Z(d) {
    return oe(d);
  }
  e.isWeakSet = Z;
  function te(d) {
    return f(d) === "[object ArrayBuffer]";
  }
  te.working = typeof ArrayBuffer < "u" && te(/* @__PURE__ */ new ArrayBuffer());
  function V(d) {
    return typeof ArrayBuffer > "u" ? !1 : te.working ? te(d) : d instanceof ArrayBuffer;
  }
  e.isArrayBuffer = V;
  function F(d) {
    return f(d) === "[object DataView]";
  }
  F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function X(d) {
    return typeof DataView > "u" ? !1 : F.working ? F(d) : d instanceof DataView;
  }
  e.isDataView = X;
  var Y = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function re(d) {
    return f(d) === "[object SharedArrayBuffer]";
  }
  function de(d) {
    return typeof Y > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new Y())), re.working ? re(d) : d instanceof Y);
  }
  e.isSharedArrayBuffer = de;
  function E(d) {
    return f(d) === "[object AsyncFunction]";
  }
  e.isAsyncFunction = E;
  function h(d) {
    return f(d) === "[object Map Iterator]";
  }
  e.isMapIterator = h;
  function j(d) {
    return f(d) === "[object Set Iterator]";
  }
  e.isSetIterator = j;
  function U(d) {
    return f(d) === "[object Generator]";
  }
  e.isGeneratorObject = U;
  function ne(d) {
    return f(d) === "[object WebAssembly.Module]";
  }
  e.isWebAssemblyCompiledModule = ne;
  function D(d) {
    return m(d, T);
  }
  e.isNumberObject = D;
  function B(d) {
    return m(d, S);
  }
  e.isStringObject = B;
  function c(d) {
    return m(d, v);
  }
  e.isBooleanObject = c;
  function K(d) {
    return l && m(d, N);
  }
  e.isBigIntObject = K;
  function I(d) {
    return s && m(d, w);
  }
  e.isSymbolObject = I;
  function n(d) {
    return D(d) || B(d) || c(d) || K(d) || I(d);
  }
  e.isBoxedPrimitive = n;
  function a(d) {
    return typeof Uint8Array < "u" && (V(d) || de(d));
  }
  e.isAnyArrayBuffer = a, [
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
})), Ua = /* @__PURE__ */ ce(((e, t) => {
  t.exports = function(o) {
    return o && typeof o == "object" && typeof o.copy == "function" && typeof o.fill == "function" && typeof o.readUInt8 == "function";
  };
})), Ln = /* @__PURE__ */ ce(((e) => {
  tt();
  var t = Object.getOwnPropertyDescriptors || function(X) {
    for (var Y = Object.keys(X), re = {}, de = 0; de < Y.length; de++) re[Y[de]] = Object.getOwnPropertyDescriptor(X, Y[de]);
    return re;
  }, r = /%[sdj%]/g;
  e.format = function(F) {
    if (!_(F)) {
      for (var X = [], Y = 0; Y < arguments.length; Y++) X.push(l(arguments[Y]));
      return X.join(" ");
    }
    for (var Y = 1, re = arguments, de = re.length, E = String(F).replace(r, function(j) {
      if (j === "%%") return "%";
      if (Y >= de) return j;
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
    }), h = re[Y]; Y < de; h = re[++Y]) y(h) || !R(h) ? E += " " + h : E += " " + l(h);
    return E;
  }, e.deprecate = function(F, X) {
    if (typeof ve < "u" && ve.noDeprecation === !0) return F;
    if (typeof ve > "u") return function() {
      return e.deprecate(F, X).apply(this, arguments);
    };
    var Y = !1;
    function re() {
      if (!Y) {
        if (ve.throwDeprecation) throw new Error(X);
        ve.traceDeprecation ? console.trace(X) : console.error(X), Y = !0;
      }
      return F.apply(this, arguments);
    }
    return re;
  };
  var o = {}, u = /^$/;
  if (ve.env.NODE_DEBUG) {
    var i = ve.env.NODE_DEBUG;
    i = i.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), u = new RegExp("^" + i + "$", "i");
  }
  e.debuglog = function(F) {
    if (F = F.toUpperCase(), !o[F]) if (u.test(F)) {
      var X = ve.pid;
      o[F] = function() {
        var Y = e.format.apply(e, arguments);
        console.error("%s %d: %s", F, X, Y);
      };
    } else o[F] = function() {
    };
    return o[F];
  };
  function l(F, X) {
    var Y = {
      seen: [],
      stylize: f
    };
    return arguments.length >= 3 && (Y.depth = arguments[2]), arguments.length >= 4 && (Y.colors = arguments[3]), C(X) ? Y.showHidden = X : X && e._extend(Y, X), P(Y.showHidden) && (Y.showHidden = !1), P(Y.depth) && (Y.depth = 2), P(Y.colors) && (Y.colors = !1), P(Y.customInspect) && (Y.customInspect = !0), Y.colors && (Y.stylize = s), S(Y, F, Y.depth);
  }
  e.inspect = l, l.colors = {
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
  }, l.styles = {
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
    var Y = l.styles[X];
    return Y ? "\x1B[" + l.colors[Y][0] + "m" + F + "\x1B[" + l.colors[Y][1] + "m" : F;
  }
  function f(F, X) {
    return F;
  }
  function T(F) {
    var X = {};
    return F.forEach(function(Y, re) {
      X[Y] = !0;
    }), X;
  }
  function S(F, X, Y) {
    if (F.customInspect && X && O(X.inspect) && X.inspect !== e.inspect && !(X.constructor && X.constructor.prototype === X)) {
      var re = X.inspect(Y, F);
      return _(re) || (re = S(F, re, Y)), re;
    }
    var de = v(F, X);
    if (de) return de;
    var E = Object.keys(X), h = T(E);
    if (F.showHidden && (E = Object.getOwnPropertyNames(X)), Q(X) && (E.indexOf("message") >= 0 || E.indexOf("description") >= 0)) return N(X);
    if (E.length === 0) {
      if (O(X)) {
        var j = X.name ? ": " + X.name : "";
        return F.stylize("[Function" + j + "]", "special");
      }
      if (M(X)) return F.stylize(RegExp.prototype.toString.call(X), "regexp");
      if (q(X)) return F.stylize(Date.prototype.toString.call(X), "date");
      if (Q(X)) return N(X);
    }
    var U = "", ne = !1, D = ["{", "}"];
    if (A(X) && (ne = !0, D = ["[", "]"]), O(X) && (U = " [Function" + (X.name ? ": " + X.name : "") + "]"), M(X) && (U = " " + RegExp.prototype.toString.call(X)), q(X) && (U = " " + Date.prototype.toUTCString.call(X)), Q(X) && (U = " " + N(X)), E.length === 0 && (!ne || X.length == 0)) return D[0] + U + D[1];
    if (Y < 0) return M(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(X);
    var B;
    return ne ? B = w(F, X, Y, h, E) : B = E.map(function(c) {
      return m(F, X, Y, h, c, ne);
    }), F.seen.pop(), g(B, U, D);
  }
  function v(F, X) {
    if (P(X)) return F.stylize("undefined", "undefined");
    if (_(X)) {
      var Y = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(Y, "string");
    }
    if (b(X)) return F.stylize("" + X, "number");
    if (C(X)) return F.stylize("" + X, "boolean");
    if (y(X)) return F.stylize("null", "null");
  }
  function N(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function w(F, X, Y, re, de) {
    for (var E = [], h = 0, j = X.length; h < j; ++h) oe(X, String(h)) ? E.push(m(F, X, Y, re, String(h), !0)) : E.push("");
    return de.forEach(function(U) {
      U.match(/^\d+$/) || E.push(m(F, X, Y, re, U, !0));
    }), E;
  }
  function m(F, X, Y, re, de, E) {
    var h, j, U = Object.getOwnPropertyDescriptor(X, de) || { value: X[de] };
    if (U.get ? U.set ? j = F.stylize("[Getter/Setter]", "special") : j = F.stylize("[Getter]", "special") : U.set && (j = F.stylize("[Setter]", "special")), oe(re, de) || (h = "[" + de + "]"), j || (F.seen.indexOf(U.value) < 0 ? (y(Y) ? j = S(F, U.value, null) : j = S(F, U.value, Y - 1), j.indexOf(`
`) > -1 && (E ? j = j.split(`
`).map(function(ne) {
      return "  " + ne;
    }).join(`
`).slice(2) : j = `
` + j.split(`
`).map(function(ne) {
      return "   " + ne;
    }).join(`
`))) : j = F.stylize("[Circular]", "special")), P(h)) {
      if (E && de.match(/^\d+$/)) return j;
      h = JSON.stringify("" + de), h.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (h = h.slice(1, -1), h = F.stylize(h, "name")) : (h = h.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), h = F.stylize(h, "string"));
    }
    return h + ": " + j;
  }
  function g(F, X, Y) {
    return F.reduce(function(re, de) {
      return de.indexOf(`
`) >= 0, re + de.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? Y[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + Y[1] : Y[0] + X + " " + F.join(", ") + " " + Y[1];
  }
  e.types = Ma();
  function A(F) {
    return Array.isArray(F);
  }
  e.isArray = A;
  function C(F) {
    return typeof F == "boolean";
  }
  e.isBoolean = C;
  function y(F) {
    return F === null;
  }
  e.isNull = y;
  function x(F) {
    return F == null;
  }
  e.isNullOrUndefined = x;
  function b(F) {
    return typeof F == "number";
  }
  e.isNumber = b;
  function _(F) {
    return typeof F == "string";
  }
  e.isString = _;
  function p(F) {
    return typeof F == "symbol";
  }
  e.isSymbol = p;
  function P(F) {
    return F === void 0;
  }
  e.isUndefined = P;
  function M(F) {
    return R(F) && k(F) === "[object RegExp]";
  }
  e.isRegExp = M, e.types.isRegExp = M;
  function R(F) {
    return typeof F == "object" && F !== null;
  }
  e.isObject = R;
  function q(F) {
    return R(F) && k(F) === "[object Date]";
  }
  e.isDate = q, e.types.isDate = q;
  function Q(F) {
    return R(F) && (k(F) === "[object Error]" || F instanceof Error);
  }
  e.isError = Q, e.types.isNativeError = Q;
  function O(F) {
    return typeof F == "function";
  }
  e.isFunction = O;
  function W(F) {
    return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || typeof F > "u";
  }
  e.isPrimitive = W, e.isBuffer = Ua();
  function k(F) {
    return Object.prototype.toString.call(F);
  }
  function H(F) {
    return F < 10 ? "0" + F.toString(10) : F.toString(10);
  }
  var J = [
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
  function $() {
    var F = /* @__PURE__ */ new Date(), X = [
      H(F.getHours()),
      H(F.getMinutes()),
      H(F.getSeconds())
    ].join(":");
    return [
      F.getDate(),
      J[F.getMonth()],
      X
    ].join(" ");
  }
  e.log = function() {
    console.log("%s - %s", $(), e.format.apply(e, arguments));
  }, e.inherits = et(), e._extend = function(F, X) {
    if (!X || !R(X)) return F;
    for (var Y = Object.keys(X), re = Y.length; re--; ) F[Y[re]] = X[Y[re]];
    return F;
  };
  function oe(F, X) {
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
      for (var re, de, E = new Promise(function(U, ne) {
        re = U, de = ne;
      }), h = [], j = 0; j < arguments.length; j++) h.push(arguments[j]);
      h.push(function(U, ne) {
        U ? de(U) : re(ne);
      });
      try {
        X.apply(this, h);
      } catch (U) {
        de(U);
      }
      return E;
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
      var de = Y.pop();
      if (typeof de != "function") throw new TypeError("The last argument must be of type Function");
      var E = this, h = function() {
        return de.apply(E, arguments);
      };
      F.apply(this, Y).then(function(j) {
        ve.nextTick(h.bind(null, null, j));
      }, function(j) {
        ve.nextTick(te.bind(null, j, h));
      });
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, t(F)), X;
  }
  e.callbackify = V;
})), ja = /* @__PURE__ */ ce(((e, t) => {
  function r(m, g) {
    var A = Object.keys(m);
    if (Object.getOwnPropertySymbols) {
      var C = Object.getOwnPropertySymbols(m);
      g && (C = C.filter(function(y) {
        return Object.getOwnPropertyDescriptor(m, y).enumerable;
      })), A.push.apply(A, C);
    }
    return A;
  }
  function o(m) {
    for (var g = 1; g < arguments.length; g++) {
      var A = arguments[g] != null ? arguments[g] : {};
      g % 2 ? r(Object(A), !0).forEach(function(C) {
        u(m, C, A[C]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(m, Object.getOwnPropertyDescriptors(A)) : r(Object(A)).forEach(function(C) {
        Object.defineProperty(m, C, Object.getOwnPropertyDescriptor(A, C));
      });
    }
    return m;
  }
  function u(m, g, A) {
    return g = f(g), g in m ? Object.defineProperty(m, g, {
      value: A,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : m[g] = A, m;
  }
  function i(m, g) {
    if (!(m instanceof g)) throw new TypeError("Cannot call a class as a function");
  }
  function l(m, g) {
    for (var A = 0; A < g.length; A++) {
      var C = g[A];
      C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(m, f(C.key), C);
    }
  }
  function s(m, g, A) {
    return g && l(m.prototype, g), Object.defineProperty(m, "prototype", { writable: !1 }), m;
  }
  function f(m) {
    var g = T(m, "string");
    return typeof g == "symbol" ? g : String(g);
  }
  function T(m, g) {
    if (typeof m != "object" || m === null) return m;
    var A = m[Symbol.toPrimitive];
    if (A !== void 0) {
      var C = A.call(m, g);
      if (typeof C != "object") return C;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(m);
  }
  var S = rr().Buffer, v = Ln().inspect, N = v && v.custom || "inspect";
  function w(m, g, A) {
    S.prototype.copy.call(m, g, A);
  }
  t.exports = /* @__PURE__ */ (function() {
    function m() {
      i(this, m), this.head = null, this.tail = null, this.length = 0;
    }
    return s(m, [
      {
        key: "push",
        value: function(A) {
          var C = {
            data: A,
            next: null
          };
          this.length > 0 ? this.tail.next = C : this.head = C, this.tail = C, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(A) {
          var C = {
            data: A,
            next: this.head
          };
          this.length === 0 && (this.tail = C), this.head = C, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var A = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, A;
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
        value: function(A) {
          if (this.length === 0) return "";
          for (var C = this.head, y = "" + C.data; C = C.next; ) y += A + C.data;
          return y;
        }
      },
      {
        key: "concat",
        value: function(A) {
          if (this.length === 0) return S.alloc(0);
          for (var C = S.allocUnsafe(A >>> 0), y = this.head, x = 0; y; )
            w(y.data, C, x), x += y.data.length, y = y.next;
          return C;
        }
      },
      {
        key: "consume",
        value: function(A, C) {
          var y;
          return A < this.head.data.length ? (y = this.head.data.slice(0, A), this.head.data = this.head.data.slice(A)) : A === this.head.data.length ? y = this.shift() : y = C ? this._getString(A) : this._getBuffer(A), y;
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
        value: function(A) {
          var C = this.head, y = 1, x = C.data;
          for (A -= x.length; C = C.next; ) {
            var b = C.data, _ = A > b.length ? b.length : A;
            if (_ === b.length ? x += b : x += b.slice(0, A), A -= _, A === 0) {
              _ === b.length ? (++y, C.next ? this.head = C.next : this.head = this.tail = null) : (this.head = C, C.data = b.slice(_));
              break;
            }
            ++y;
          }
          return this.length -= y, x;
        }
      },
      {
        key: "_getBuffer",
        value: function(A) {
          var C = S.allocUnsafe(A), y = this.head, x = 1;
          for (y.data.copy(C), A -= y.data.length; y = y.next; ) {
            var b = y.data, _ = A > b.length ? b.length : A;
            if (b.copy(C, C.length - A, 0, _), A -= _, A === 0) {
              _ === b.length ? (++x, y.next ? this.head = y.next : this.head = this.tail = null) : (this.head = y, y.data = b.slice(_));
              break;
            }
            ++x;
          }
          return this.length -= x, C;
        }
      },
      {
        key: N,
        value: function(A, C) {
          return v(this, o(o({}, C), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), m;
  })();
})), Mn = /* @__PURE__ */ ce(((e, t) => {
  tt();
  function r(f, T) {
    var S = this, v = this._readableState && this._readableState.destroyed, N = this._writableState && this._writableState.destroyed;
    return v || N ? (T ? T(f) : f && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ve.nextTick(l, this, f)) : ve.nextTick(l, this, f)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(f || null, function(w) {
      !T && w ? S._writableState ? S._writableState.errorEmitted ? ve.nextTick(u, S) : (S._writableState.errorEmitted = !0, ve.nextTick(o, S, w)) : ve.nextTick(o, S, w) : T ? (ve.nextTick(u, S), T(w)) : ve.nextTick(u, S);
    }), this);
  }
  function o(f, T) {
    l(f, T), u(f);
  }
  function u(f) {
    f._writableState && !f._writableState.emitClose || f._readableState && !f._readableState.emitClose || f.emit("close");
  }
  function i() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function l(f, T) {
    f.emit("error", T);
  }
  function s(f, T) {
    var S = f._readableState, v = f._writableState;
    S && S.autoDestroy || v && v.autoDestroy ? f.destroy(T) : f.emit("error", T);
  }
  t.exports = {
    destroy: r,
    undestroy: i,
    errorOrDestroy: s
  };
})), xt = /* @__PURE__ */ ce(((e, t) => {
  function r(T, S) {
    T.prototype = Object.create(S.prototype), T.prototype.constructor = T, T.__proto__ = S;
  }
  var o = {};
  function u(T, S, v) {
    v || (v = Error);
    function N(m, g, A) {
      return typeof S == "string" ? S : S(m, g, A);
    }
    var w = /* @__PURE__ */ (function(m) {
      r(g, m);
      function g(A, C, y) {
        return m.call(this, N(A, C, y)) || this;
      }
      return g;
    })(v);
    w.prototype.name = v.name, w.prototype.code = T, o[T] = w;
  }
  function i(T, S) {
    if (Array.isArray(T)) {
      var v = T.length;
      return T = T.map(function(N) {
        return String(N);
      }), v > 2 ? "one of ".concat(S, " ").concat(T.slice(0, v - 1).join(", "), ", or ") + T[v - 1] : v === 2 ? "one of ".concat(S, " ").concat(T[0], " or ").concat(T[1]) : "of ".concat(S, " ").concat(T[0]);
    } else return "of ".concat(S, " ").concat(String(T));
  }
  function l(T, S, v) {
    return T.substr(0, S.length) === S;
  }
  function s(T, S, v) {
    return (v === void 0 || v > T.length) && (v = T.length), T.substring(v - S.length, v) === S;
  }
  function f(T, S, v) {
    return typeof v != "number" && (v = 0), v + S.length > T.length ? !1 : T.indexOf(S, v) !== -1;
  }
  u("ERR_INVALID_OPT_VALUE", function(T, S) {
    return 'The value "' + S + '" is invalid for option "' + T + '"';
  }, TypeError), u("ERR_INVALID_ARG_TYPE", function(T, S, v) {
    var N;
    typeof S == "string" && l(S, "not ") ? (N = "must not be", S = S.replace(/^not /, "")) : N = "must be";
    var w;
    if (s(T, " argument")) w = "The ".concat(T, " ").concat(N, " ").concat(i(S, "type"));
    else {
      var m = f(T, ".") ? "property" : "argument";
      w = 'The "'.concat(T, '" ').concat(m, " ").concat(N, " ").concat(i(S, "type"));
    }
    return w += ". Received type ".concat(typeof v), w;
  }, TypeError), u("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), u("ERR_METHOD_NOT_IMPLEMENTED", function(T) {
    return "The " + T + " method is not implemented";
  }), u("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), u("ERR_STREAM_DESTROYED", function(T) {
    return "Cannot call " + T + " after a stream was destroyed";
  }), u("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), u("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), u("ERR_STREAM_WRITE_AFTER_END", "write after end"), u("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), u("ERR_UNKNOWN_ENCODING", function(T) {
    return "Unknown encoding: " + T;
  }, TypeError), u("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = o;
})), Un = /* @__PURE__ */ ce(((e, t) => {
  var r = xt().codes.ERR_INVALID_OPT_VALUE;
  function o(i, l, s) {
    return i.highWaterMark != null ? i.highWaterMark : l ? i[s] : null;
  }
  function u(i, l, s, f) {
    var T = o(l, f, s);
    if (T != null) {
      if (!(isFinite(T) && Math.floor(T) === T) || T < 0) throw new r(f ? s : "highWaterMark", T);
      return Math.floor(T);
    }
    return i.objectMode ? 16 : 16 * 1024;
  }
  t.exports = { getHighWaterMark: u };
})), za = /* @__PURE__ */ ce(((e, t) => {
  _t(), t.exports = r;
  function r(u, i) {
    if (o("noDeprecation")) return u;
    var l = !1;
    function s() {
      if (!l) {
        if (o("throwDeprecation")) throw new Error(i);
        o("traceDeprecation") ? console.trace(i) : console.warn(i), l = !0;
      }
      return u.apply(this, arguments);
    }
    return s;
  }
  function o(u) {
    try {
      if (!Ie.localStorage) return !1;
    } catch {
      return !1;
    }
    var i = Ie.localStorage[u];
    return i == null ? !1 : String(i).toLowerCase() === "true";
  }
})), jn = /* @__PURE__ */ ce(((e, t) => {
  _t(), tt(), t.exports = R;
  function r(E) {
    var h = this;
    this.next = null, this.entry = null, this.finish = function() {
      de(h, E);
    };
  }
  var o;
  R.WritableState = P;
  var u = { deprecate: za() }, i = An(), l = rr().Buffer, s = (typeof Ie < "u" ? Ie : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function f(E) {
    return l.from(E);
  }
  function T(E) {
    return l.isBuffer(E) || E instanceof s;
  }
  var S = Mn(), v = Un().getHighWaterMark, N = xt().codes, w = N.ERR_INVALID_ARG_TYPE, m = N.ERR_METHOD_NOT_IMPLEMENTED, g = N.ERR_MULTIPLE_CALLBACK, A = N.ERR_STREAM_CANNOT_PIPE, C = N.ERR_STREAM_DESTROYED, y = N.ERR_STREAM_NULL_VALUES, x = N.ERR_STREAM_WRITE_AFTER_END, b = N.ERR_UNKNOWN_ENCODING, _ = S.errorOrDestroy;
  et()(R, i);
  function p() {
  }
  function P(E, h, j) {
    o = o || vt(), E = E || {}, typeof j != "boolean" && (j = h instanceof o), this.objectMode = !!E.objectMode, j && (this.objectMode = this.objectMode || !!E.writableObjectMode), this.highWaterMark = v(this, E, "writableHighWaterMark", j), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var U = E.decodeStrings === !1;
    this.decodeStrings = !U, this.defaultEncoding = E.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ne) {
      $(h, ne);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = E.emitClose !== !1, this.autoDestroy = !!E.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  P.prototype.getBuffer = function() {
    for (var h = this.bufferedRequest, j = []; h; )
      j.push(h), h = h.next;
    return j;
  }, (function() {
    try {
      Object.defineProperty(P.prototype, "buffer", { get: u.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var M;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (M = Function.prototype[Symbol.hasInstance], Object.defineProperty(R, Symbol.hasInstance, { value: function(h) {
    return M.call(this, h) ? !0 : this !== R ? !1 : h && h._writableState instanceof P;
  } })) : M = function(h) {
    return h instanceof this;
  };
  function R(E) {
    o = o || vt();
    var h = this instanceof o;
    if (!h && !M.call(R, this)) return new R(E);
    this._writableState = new P(E, this, h), this.writable = !0, E && (typeof E.write == "function" && (this._write = E.write), typeof E.writev == "function" && (this._writev = E.writev), typeof E.destroy == "function" && (this._destroy = E.destroy), typeof E.final == "function" && (this._final = E.final)), i.call(this);
  }
  R.prototype.pipe = function() {
    _(this, new A());
  };
  function q(E, h) {
    var j = new x();
    _(E, j), ve.nextTick(h, j);
  }
  function Q(E, h, j, U) {
    var ne;
    return j === null ? ne = new y() : typeof j != "string" && !h.objectMode && (ne = new w("chunk", ["string", "Buffer"], j)), ne ? (_(E, ne), ve.nextTick(U, ne), !1) : !0;
  }
  R.prototype.write = function(E, h, j) {
    var U = this._writableState, ne = !1, D = !U.objectMode && T(E);
    return D && !l.isBuffer(E) && (E = f(E)), typeof h == "function" && (j = h, h = null), D ? h = "buffer" : h || (h = U.defaultEncoding), typeof j != "function" && (j = p), U.ending ? q(this, j) : (D || Q(this, U, E, j)) && (U.pendingcb++, ne = W(this, U, D, E, h, j)), ne;
  }, R.prototype.cork = function() {
    this._writableState.corked++;
  }, R.prototype.uncork = function() {
    var E = this._writableState;
    E.corked && (E.corked--, !E.writing && !E.corked && !E.bufferProcessing && E.bufferedRequest && te(this, E));
  }, R.prototype.setDefaultEncoding = function(h) {
    if (typeof h == "string" && (h = h.toLowerCase()), !([
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
    ].indexOf((h + "").toLowerCase()) > -1)) throw new b(h);
    return this._writableState.defaultEncoding = h, this;
  }, Object.defineProperty(R.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function O(E, h, j) {
    return !E.objectMode && E.decodeStrings !== !1 && typeof h == "string" && (h = l.from(h, j)), h;
  }
  Object.defineProperty(R.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function W(E, h, j, U, ne, D) {
    if (!j) {
      var B = O(h, U, ne);
      U !== B && (j = !0, ne = "buffer", U = B);
    }
    var c = h.objectMode ? 1 : U.length;
    h.length += c;
    var K = h.length < h.highWaterMark;
    if (K || (h.needDrain = !0), h.writing || h.corked) {
      var I = h.lastBufferedRequest;
      h.lastBufferedRequest = {
        chunk: U,
        encoding: ne,
        isBuf: j,
        callback: D,
        next: null
      }, I ? I.next = h.lastBufferedRequest : h.bufferedRequest = h.lastBufferedRequest, h.bufferedRequestCount += 1;
    } else k(E, h, !1, c, U, ne, D);
    return K;
  }
  function k(E, h, j, U, ne, D, B) {
    h.writelen = U, h.writecb = B, h.writing = !0, h.sync = !0, h.destroyed ? h.onwrite(new C("write")) : j ? E._writev(ne, h.onwrite) : E._write(ne, D, h.onwrite), h.sync = !1;
  }
  function H(E, h, j, U, ne) {
    --h.pendingcb, j ? (ve.nextTick(ne, U), ve.nextTick(Y, E, h), E._writableState.errorEmitted = !0, _(E, U)) : (ne(U), E._writableState.errorEmitted = !0, _(E, U), Y(E, h));
  }
  function J(E) {
    E.writing = !1, E.writecb = null, E.length -= E.writelen, E.writelen = 0;
  }
  function $(E, h) {
    var j = E._writableState, U = j.sync, ne = j.writecb;
    if (typeof ne != "function") throw new g();
    if (J(j), h) H(E, j, U, h, ne);
    else {
      var D = V(j) || E.destroyed;
      !D && !j.corked && !j.bufferProcessing && j.bufferedRequest && te(E, j), U ? ve.nextTick(oe, E, j, D, ne) : oe(E, j, D, ne);
    }
  }
  function oe(E, h, j, U) {
    j || Z(E, h), h.pendingcb--, U(), Y(E, h);
  }
  function Z(E, h) {
    h.length === 0 && h.needDrain && (h.needDrain = !1, E.emit("drain"));
  }
  function te(E, h) {
    h.bufferProcessing = !0;
    var j = h.bufferedRequest;
    if (E._writev && j && j.next) {
      var U = h.bufferedRequestCount, ne = new Array(U), D = h.corkedRequestsFree;
      D.entry = j;
      for (var B = 0, c = !0; j; )
        ne[B] = j, j.isBuf || (c = !1), j = j.next, B += 1;
      ne.allBuffers = c, k(E, h, !0, h.length, ne, "", D.finish), h.pendingcb++, h.lastBufferedRequest = null, D.next ? (h.corkedRequestsFree = D.next, D.next = null) : h.corkedRequestsFree = new r(h), h.bufferedRequestCount = 0;
    } else {
      for (; j; ) {
        var K = j.chunk, I = j.encoding, n = j.callback;
        if (k(E, h, !1, h.objectMode ? 1 : K.length, K, I, n), j = j.next, h.bufferedRequestCount--, h.writing) break;
      }
      j === null && (h.lastBufferedRequest = null);
    }
    h.bufferedRequest = j, h.bufferProcessing = !1;
  }
  R.prototype._write = function(E, h, j) {
    j(new m("_write()"));
  }, R.prototype._writev = null, R.prototype.end = function(E, h, j) {
    var U = this._writableState;
    return typeof E == "function" ? (j = E, E = null, h = null) : typeof h == "function" && (j = h, h = null), E != null && this.write(E, h), U.corked && (U.corked = 1, this.uncork()), U.ending || re(this, U, j), this;
  }, Object.defineProperty(R.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function V(E) {
    return E.ending && E.length === 0 && E.bufferedRequest === null && !E.finished && !E.writing;
  }
  function F(E, h) {
    E._final(function(j) {
      h.pendingcb--, j && _(E, j), h.prefinished = !0, E.emit("prefinish"), Y(E, h);
    });
  }
  function X(E, h) {
    !h.prefinished && !h.finalCalled && (typeof E._final == "function" && !h.destroyed ? (h.pendingcb++, h.finalCalled = !0, ve.nextTick(F, E, h)) : (h.prefinished = !0, E.emit("prefinish")));
  }
  function Y(E, h) {
    var j = V(h);
    if (j && (X(E, h), h.pendingcb === 0 && (h.finished = !0, E.emit("finish"), h.autoDestroy))) {
      var U = E._readableState;
      (!U || U.autoDestroy && U.endEmitted) && E.destroy();
    }
    return j;
  }
  function re(E, h, j) {
    h.ending = !0, Y(E, h), j && (h.finished ? ve.nextTick(j) : E.once("finish", j)), h.ended = !0, E.writable = !1;
  }
  function de(E, h, j) {
    var U = E.entry;
    for (E.entry = null; U; ) {
      var ne = U.callback;
      h.pendingcb--, ne(j), U = U.next;
    }
    h.corkedRequestsFree.next = E;
  }
  Object.defineProperty(R.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(h) {
      this._writableState && (this._writableState.destroyed = h);
    }
  }), R.prototype.destroy = S.destroy, R.prototype._undestroy = S.undestroy, R.prototype._destroy = function(E, h) {
    h(E);
  };
})), vt = /* @__PURE__ */ ce(((e, t) => {
  tt();
  var r = Object.keys || function(v) {
    var N = [];
    for (var w in v) N.push(w);
    return N;
  };
  t.exports = f;
  var o = zn(), u = jn();
  et()(f, o);
  for (var i = r(u.prototype), l = 0; l < i.length; l++) {
    var s = i[l];
    f.prototype[s] || (f.prototype[s] = u.prototype[s]);
  }
  function f(v) {
    if (!(this instanceof f)) return new f(v);
    o.call(this, v), u.call(this, v), this.allowHalfOpen = !0, v && (v.readable === !1 && (this.readable = !1), v.writable === !1 && (this.writable = !1), v.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", T)));
  }
  Object.defineProperty(f.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(f.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(f.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function T() {
    this._writableState.ended || ve.nextTick(S, this);
  }
  function S(v) {
    v.end();
  }
  Object.defineProperty(f.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(N) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = N, this._writableState.destroyed = N);
    }
  });
})), Wa = /* @__PURE__ */ ce(((e, t) => {
  var r = rr(), o = r.Buffer;
  function u(l, s) {
    for (var f in l) s[f] = l[f];
  }
  o.from && o.alloc && o.allocUnsafe && o.allocUnsafeSlow ? t.exports = r : (u(r, e), e.Buffer = i);
  function i(l, s, f) {
    return o(l, s, f);
  }
  u(o, i), i.from = function(l, s, f) {
    if (typeof l == "number") throw new TypeError("Argument must not be a number");
    return o(l, s, f);
  }, i.alloc = function(l, s, f) {
    if (typeof l != "number") throw new TypeError("Argument must be a number");
    var T = o(l);
    return s !== void 0 ? typeof f == "string" ? T.fill(s, f) : T.fill(s) : T.fill(0), T;
  }, i.allocUnsafe = function(l) {
    if (typeof l != "number") throw new TypeError("Argument must be a number");
    return o(l);
  }, i.allocUnsafeSlow = function(l) {
    if (typeof l != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(l);
  };
})), Cr = /* @__PURE__ */ ce(((e) => {
  var t = Wa().Buffer, r = t.isEncoding || function(y) {
    switch (y = "" + y, y && y.toLowerCase()) {
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
  function o(y) {
    if (!y) return "utf8";
    for (var x; ; ) switch (y) {
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
        return y;
      default:
        if (x) return;
        y = ("" + y).toLowerCase(), x = !0;
    }
  }
  function u(y) {
    var x = o(y);
    if (typeof x != "string" && (t.isEncoding === r || !r(y))) throw new Error("Unknown encoding: " + y);
    return x || y;
  }
  e.StringDecoder = i;
  function i(y) {
    this.encoding = u(y);
    var x;
    switch (this.encoding) {
      case "utf16le":
        this.text = N, this.end = w, x = 4;
        break;
      case "utf8":
        this.fillLast = T, x = 4;
        break;
      case "base64":
        this.text = m, this.end = g, x = 3;
        break;
      default:
        this.write = A, this.end = C;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(x);
  }
  i.prototype.write = function(y) {
    if (y.length === 0) return "";
    var x, b;
    if (this.lastNeed) {
      if (x = this.fillLast(y), x === void 0) return "";
      b = this.lastNeed, this.lastNeed = 0;
    } else b = 0;
    return b < y.length ? x ? x + this.text(y, b) : this.text(y, b) : x || "";
  }, i.prototype.end = v, i.prototype.text = S, i.prototype.fillLast = function(y) {
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, y.length), this.lastNeed -= y.length;
  };
  function l(y) {
    return y <= 127 ? 0 : y >> 5 === 6 ? 2 : y >> 4 === 14 ? 3 : y >> 3 === 30 ? 4 : y >> 6 === 2 ? -1 : -2;
  }
  function s(y, x, b) {
    var _ = x.length - 1;
    if (_ < b) return 0;
    var p = l(x[_]);
    return p >= 0 ? (p > 0 && (y.lastNeed = p - 1), p) : --_ < b || p === -2 ? 0 : (p = l(x[_]), p >= 0 ? (p > 0 && (y.lastNeed = p - 2), p) : --_ < b || p === -2 ? 0 : (p = l(x[_]), p >= 0 ? (p > 0 && (p === 2 ? p = 0 : y.lastNeed = p - 3), p) : 0));
  }
  function f(y, x, b) {
    if ((x[0] & 192) !== 128)
      return y.lastNeed = 0, "�";
    if (y.lastNeed > 1 && x.length > 1) {
      if ((x[1] & 192) !== 128)
        return y.lastNeed = 1, "�";
      if (y.lastNeed > 2 && x.length > 2 && (x[2] & 192) !== 128)
        return y.lastNeed = 2, "�";
    }
  }
  function T(y) {
    var x = this.lastTotal - this.lastNeed, b = f(this, y);
    if (b !== void 0) return b;
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, x, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, x, 0, y.length), this.lastNeed -= y.length;
  }
  function S(y, x) {
    var b = s(this, y, x);
    if (!this.lastNeed) return y.toString("utf8", x);
    this.lastTotal = b;
    var _ = y.length - (b - this.lastNeed);
    return y.copy(this.lastChar, 0, _), y.toString("utf8", x, _);
  }
  function v(y) {
    var x = y && y.length ? this.write(y) : "";
    return this.lastNeed ? x + "�" : x;
  }
  function N(y, x) {
    if ((y.length - x) % 2 === 0) {
      var b = y.toString("utf16le", x);
      if (b) {
        var _ = b.charCodeAt(b.length - 1);
        if (_ >= 55296 && _ <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1], b.slice(0, -1);
      }
      return b;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = y[y.length - 1], y.toString("utf16le", x, y.length - 1);
  }
  function w(y) {
    var x = y && y.length ? this.write(y) : "";
    if (this.lastNeed) {
      var b = this.lastTotal - this.lastNeed;
      return x + this.lastChar.toString("utf16le", 0, b);
    }
    return x;
  }
  function m(y, x) {
    var b = (y.length - x) % 3;
    return b === 0 ? y.toString("base64", x) : (this.lastNeed = 3 - b, this.lastTotal = 3, b === 1 ? this.lastChar[0] = y[y.length - 1] : (this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1]), y.toString("base64", x, y.length - b));
  }
  function g(y) {
    var x = y && y.length ? this.write(y) : "";
    return this.lastNeed ? x + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : x;
  }
  function A(y) {
    return y.toString(this.encoding);
  }
  function C(y) {
    return y && y.length ? this.write(y) : "";
  }
})), jr = /* @__PURE__ */ ce(((e, t) => {
  var r = xt().codes.ERR_STREAM_PREMATURE_CLOSE;
  function o(s) {
    var f = !1;
    return function() {
      if (!f) {
        f = !0;
        for (var T = arguments.length, S = new Array(T), v = 0; v < T; v++) S[v] = arguments[v];
        s.apply(this, S);
      }
    };
  }
  function u() {
  }
  function i(s) {
    return s.setHeader && typeof s.abort == "function";
  }
  function l(s, f, T) {
    if (typeof f == "function") return l(s, null, f);
    f || (f = {}), T = o(T || u);
    var S = f.readable || f.readable !== !1 && s.readable, v = f.writable || f.writable !== !1 && s.writable, N = function() {
      s.writable || m();
    }, w = s._writableState && s._writableState.finished, m = function() {
      v = !1, w = !0, S || T.call(s);
    }, g = s._readableState && s._readableState.endEmitted, A = function() {
      S = !1, g = !0, v || T.call(s);
    }, C = function(_) {
      T.call(s, _);
    }, y = function() {
      var _;
      if (S && !g)
        return (!s._readableState || !s._readableState.ended) && (_ = new r()), T.call(s, _);
      if (v && !w)
        return (!s._writableState || !s._writableState.ended) && (_ = new r()), T.call(s, _);
    }, x = function() {
      s.req.on("finish", m);
    };
    return i(s) ? (s.on("complete", m), s.on("abort", y), s.req ? x() : s.on("request", x)) : v && !s._writableState && (s.on("end", N), s.on("close", N)), s.on("end", A), s.on("finish", m), f.error !== !1 && s.on("error", C), s.on("close", y), function() {
      s.removeListener("complete", m), s.removeListener("abort", y), s.removeListener("request", x), s.req && s.req.removeListener("finish", m), s.removeListener("end", N), s.removeListener("close", N), s.removeListener("finish", m), s.removeListener("end", A), s.removeListener("error", C), s.removeListener("close", y);
    };
  }
  t.exports = l;
})), Ha = /* @__PURE__ */ ce(((e, t) => {
  tt();
  var r;
  function o(b, _, p) {
    return _ = u(_), _ in b ? Object.defineProperty(b, _, {
      value: p,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : b[_] = p, b;
  }
  function u(b) {
    var _ = i(b, "string");
    return typeof _ == "symbol" ? _ : String(_);
  }
  function i(b, _) {
    if (typeof b != "object" || b === null) return b;
    var p = b[Symbol.toPrimitive];
    if (p !== void 0) {
      var P = p.call(b, _);
      if (typeof P != "object") return P;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (_ === "string" ? String : Number)(b);
  }
  var l = jr(), s = /* @__PURE__ */ Symbol("lastResolve"), f = /* @__PURE__ */ Symbol("lastReject"), T = /* @__PURE__ */ Symbol("error"), S = /* @__PURE__ */ Symbol("ended"), v = /* @__PURE__ */ Symbol("lastPromise"), N = /* @__PURE__ */ Symbol("handlePromise"), w = /* @__PURE__ */ Symbol("stream");
  function m(b, _) {
    return {
      value: b,
      done: _
    };
  }
  function g(b) {
    var _ = b[s];
    if (_ !== null) {
      var p = b[w].read();
      p !== null && (b[v] = null, b[s] = null, b[f] = null, _(m(p, !1)));
    }
  }
  function A(b) {
    ve.nextTick(g, b);
  }
  function C(b, _) {
    return function(p, P) {
      b.then(function() {
        if (_[S]) {
          p(m(void 0, !0));
          return;
        }
        _[N](p, P);
      }, P);
    };
  }
  var y = Object.getPrototypeOf(function() {
  }), x = Object.setPrototypeOf((r = {
    get stream() {
      return this[w];
    },
    next: function() {
      var _ = this, p = this[T];
      if (p !== null) return Promise.reject(p);
      if (this[S]) return Promise.resolve(m(void 0, !0));
      if (this[w].destroyed) return new Promise(function(q, Q) {
        ve.nextTick(function() {
          _[T] ? Q(_[T]) : q(m(void 0, !0));
        });
      });
      var P = this[v], M;
      if (P) M = new Promise(C(P, this));
      else {
        var R = this[w].read();
        if (R !== null) return Promise.resolve(m(R, !1));
        M = new Promise(this[N]);
      }
      return this[v] = M, M;
    }
  }, o(r, Symbol.asyncIterator, function() {
    return this;
  }), o(r, "return", function() {
    var _ = this;
    return new Promise(function(p, P) {
      _[w].destroy(null, function(M) {
        if (M) {
          P(M);
          return;
        }
        p(m(void 0, !0));
      });
    });
  }), r), y);
  t.exports = function(_) {
    var p, P = Object.create(x, (p = {}, o(p, w, {
      value: _,
      writable: !0
    }), o(p, s, {
      value: null,
      writable: !0
    }), o(p, f, {
      value: null,
      writable: !0
    }), o(p, T, {
      value: null,
      writable: !0
    }), o(p, S, {
      value: _._readableState.endEmitted,
      writable: !0
    }), o(p, N, {
      value: function(R, q) {
        var Q = P[w].read();
        Q ? (P[v] = null, P[s] = null, P[f] = null, R(m(Q, !1))) : (P[s] = R, P[f] = q);
      },
      writable: !0
    }), p));
    return P[v] = null, l(_, function(M) {
      if (M && M.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var R = P[f];
        R !== null && (P[v] = null, P[s] = null, P[f] = null, R(M)), P[T] = M;
        return;
      }
      var q = P[s];
      q !== null && (P[v] = null, P[s] = null, P[f] = null, q(m(void 0, !0))), P[S] = !0;
    }), _.on("readable", A.bind(null, P)), P;
  };
})), Ga = /* @__PURE__ */ ce(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), zn = /* @__PURE__ */ ce(((e, t) => {
  _t(), tt(), t.exports = q;
  var r;
  q.ReadableState = R, Dr().EventEmitter;
  var o = function(B, c) {
    return B.listeners(c).length;
  }, u = An(), i = rr().Buffer, l = (typeof Ie < "u" ? Ie : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(D) {
    return i.from(D);
  }
  function f(D) {
    return i.isBuffer(D) || D instanceof l;
  }
  var T = Ln(), S;
  T && T.debuglog ? S = T.debuglog("stream") : S = function() {
  };
  var v = ja(), N = Mn(), w = Un().getHighWaterMark, m = xt().codes, g = m.ERR_INVALID_ARG_TYPE, A = m.ERR_STREAM_PUSH_AFTER_EOF, C = m.ERR_METHOD_NOT_IMPLEMENTED, y = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, x, b, _;
  et()(q, u);
  var p = N.errorOrDestroy, P = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function M(D, B, c) {
    if (typeof D.prependListener == "function") return D.prependListener(B, c);
    !D._events || !D._events[B] ? D.on(B, c) : Array.isArray(D._events[B]) ? D._events[B].unshift(c) : D._events[B] = [c, D._events[B]];
  }
  function R(D, B, c) {
    r = r || vt(), D = D || {}, typeof c != "boolean" && (c = B instanceof r), this.objectMode = !!D.objectMode, c && (this.objectMode = this.objectMode || !!D.readableObjectMode), this.highWaterMark = w(this, D, "readableHighWaterMark", c), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = D.emitClose !== !1, this.autoDestroy = !!D.autoDestroy, this.destroyed = !1, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, D.encoding && (x || (x = Cr().StringDecoder), this.decoder = new x(D.encoding), this.encoding = D.encoding);
  }
  function q(D) {
    if (r = r || vt(), !(this instanceof q)) return new q(D);
    var B = this instanceof r;
    this._readableState = new R(D, this, B), this.readable = !0, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), u.call(this);
  }
  Object.defineProperty(q.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(B) {
      this._readableState && (this._readableState.destroyed = B);
    }
  }), q.prototype.destroy = N.destroy, q.prototype._undestroy = N.undestroy, q.prototype._destroy = function(D, B) {
    B(D);
  }, q.prototype.push = function(D, B) {
    var c = this._readableState, K;
    return c.objectMode ? K = !0 : typeof D == "string" && (B = B || c.defaultEncoding, B !== c.encoding && (D = i.from(D, B), B = ""), K = !0), Q(this, D, B, !1, K);
  }, q.prototype.unshift = function(D) {
    return Q(this, D, null, !0, !1);
  };
  function Q(D, B, c, K, I) {
    S("readableAddChunk", B);
    var n = D._readableState;
    if (B === null)
      n.reading = !1, $(D, n);
    else {
      var a;
      if (I || (a = W(n, B)), a) p(D, a);
      else if (n.objectMode || B && B.length > 0)
        if (typeof B != "string" && !n.objectMode && Object.getPrototypeOf(B) !== i.prototype && (B = s(B)), K) n.endEmitted ? p(D, new y()) : O(D, n, B, !0);
        else if (n.ended) p(D, new A());
        else {
          if (n.destroyed) return !1;
          n.reading = !1, n.decoder && !c ? (B = n.decoder.write(B), n.objectMode || B.length !== 0 ? O(D, n, B, !1) : te(D, n)) : O(D, n, B, !1);
        }
      else K || (n.reading = !1, te(D, n));
    }
    return !n.ended && (n.length < n.highWaterMark || n.length === 0);
  }
  function O(D, B, c, K) {
    B.flowing && B.length === 0 && !B.sync ? (B.awaitDrain = 0, D.emit("data", c)) : (B.length += B.objectMode ? 1 : c.length, K ? B.buffer.unshift(c) : B.buffer.push(c), B.needReadable && oe(D)), te(D, B);
  }
  function W(D, B) {
    var c;
    return !f(B) && typeof B != "string" && B !== void 0 && !D.objectMode && (c = new g("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], B)), c;
  }
  q.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, q.prototype.setEncoding = function(D) {
    x || (x = Cr().StringDecoder);
    var B = new x(D);
    this._readableState.decoder = B, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var c = this._readableState.buffer.head, K = ""; c !== null; )
      K += B.write(c.data), c = c.next;
    return this._readableState.buffer.clear(), K !== "" && this._readableState.buffer.push(K), this._readableState.length = K.length, this;
  };
  var k = 1073741824;
  function H(D) {
    return D >= k ? D = k : (D--, D |= D >>> 1, D |= D >>> 2, D |= D >>> 4, D |= D >>> 8, D |= D >>> 16, D++), D;
  }
  function J(D, B) {
    return D <= 0 || B.length === 0 && B.ended ? 0 : B.objectMode ? 1 : D !== D ? B.flowing && B.length ? B.buffer.head.data.length : B.length : (D > B.highWaterMark && (B.highWaterMark = H(D)), D <= B.length ? D : B.ended ? B.length : (B.needReadable = !0, 0));
  }
  q.prototype.read = function(D) {
    S("read", D), D = parseInt(D, 10);
    var B = this._readableState, c = D;
    if (D !== 0 && (B.emittedReadable = !1), D === 0 && B.needReadable && ((B.highWaterMark !== 0 ? B.length >= B.highWaterMark : B.length > 0) || B.ended))
      return S("read: emitReadable", B.length, B.ended), B.length === 0 && B.ended ? j(this) : oe(this), null;
    if (D = J(D, B), D === 0 && B.ended)
      return B.length === 0 && j(this), null;
    var K = B.needReadable;
    S("need readable", K), (B.length === 0 || B.length - D < B.highWaterMark) && (K = !0, S("length less than watermark", K)), B.ended || B.reading ? (K = !1, S("reading or ended", K)) : K && (S("do read"), B.reading = !0, B.sync = !0, B.length === 0 && (B.needReadable = !0), this._read(B.highWaterMark), B.sync = !1, B.reading || (D = J(c, B)));
    var I;
    return D > 0 ? I = h(D, B) : I = null, I === null ? (B.needReadable = B.length <= B.highWaterMark, D = 0) : (B.length -= D, B.awaitDrain = 0), B.length === 0 && (B.ended || (B.needReadable = !0), c !== D && B.ended && j(this)), I !== null && this.emit("data", I), I;
  };
  function $(D, B) {
    if (S("onEofChunk"), !B.ended) {
      if (B.decoder) {
        var c = B.decoder.end();
        c && c.length && (B.buffer.push(c), B.length += B.objectMode ? 1 : c.length);
      }
      B.ended = !0, B.sync ? oe(D) : (B.needReadable = !1, B.emittedReadable || (B.emittedReadable = !0, Z(D)));
    }
  }
  function oe(D) {
    var B = D._readableState;
    S("emitReadable", B.needReadable, B.emittedReadable), B.needReadable = !1, B.emittedReadable || (S("emitReadable", B.flowing), B.emittedReadable = !0, ve.nextTick(Z, D));
  }
  function Z(D) {
    var B = D._readableState;
    S("emitReadable_", B.destroyed, B.length, B.ended), !B.destroyed && (B.length || B.ended) && (D.emit("readable"), B.emittedReadable = !1), B.needReadable = !B.flowing && !B.ended && B.length <= B.highWaterMark, E(D);
  }
  function te(D, B) {
    B.readingMore || (B.readingMore = !0, ve.nextTick(V, D, B));
  }
  function V(D, B) {
    for (; !B.reading && !B.ended && (B.length < B.highWaterMark || B.flowing && B.length === 0); ) {
      var c = B.length;
      if (S("maybeReadMore read 0"), D.read(0), c === B.length) break;
    }
    B.readingMore = !1;
  }
  q.prototype._read = function(D) {
    p(this, new C("_read()"));
  }, q.prototype.pipe = function(D, B) {
    var c = this, K = this._readableState;
    switch (K.pipesCount) {
      case 0:
        K.pipes = D;
        break;
      case 1:
        K.pipes = [K.pipes, D];
        break;
      default:
        K.pipes.push(D);
        break;
    }
    K.pipesCount += 1, S("pipe count=%d opts=%j", K.pipesCount, B);
    var I = (!B || B.end !== !1) && D !== ve.stdout && D !== ve.stderr ? a : he;
    K.endEmitted ? ve.nextTick(I) : c.once("end", I), D.on("unpipe", n);
    function n(me, ge) {
      S("onunpipe"), me === c && ge && ge.hasUnpiped === !1 && (ge.hasUnpiped = !0, G());
    }
    function a() {
      S("onend"), D.end();
    }
    var d = F(c);
    D.on("drain", d);
    var L = !1;
    function G() {
      S("cleanup"), D.removeListener("close", le), D.removeListener("finish", se), D.removeListener("drain", d), D.removeListener("error", ie), D.removeListener("unpipe", n), c.removeListener("end", a), c.removeListener("end", he), c.removeListener("data", z), L = !0, K.awaitDrain && (!D._writableState || D._writableState.needDrain) && d();
    }
    c.on("data", z);
    function z(me) {
      S("ondata");
      var ge = D.write(me);
      S("dest.write", ge), ge === !1 && ((K.pipesCount === 1 && K.pipes === D || K.pipesCount > 1 && ne(K.pipes, D) !== -1) && !L && (S("false write response, pause", K.awaitDrain), K.awaitDrain++), c.pause());
    }
    function ie(me) {
      S("onerror", me), he(), D.removeListener("error", ie), o(D, "error") === 0 && p(D, me);
    }
    M(D, "error", ie);
    function le() {
      D.removeListener("finish", se), he();
    }
    D.once("close", le);
    function se() {
      S("onfinish"), D.removeListener("close", le), he();
    }
    D.once("finish", se);
    function he() {
      S("unpipe"), c.unpipe(D);
    }
    return D.emit("pipe", c), K.flowing || (S("pipe resume"), c.resume()), D;
  };
  function F(D) {
    return function() {
      var c = D._readableState;
      S("pipeOnDrain", c.awaitDrain), c.awaitDrain && c.awaitDrain--, c.awaitDrain === 0 && o(D, "data") && (c.flowing = !0, E(D));
    };
  }
  q.prototype.unpipe = function(D) {
    var B = this._readableState, c = { hasUnpiped: !1 };
    if (B.pipesCount === 0) return this;
    if (B.pipesCount === 1)
      return D && D !== B.pipes ? this : (D || (D = B.pipes), B.pipes = null, B.pipesCount = 0, B.flowing = !1, D && D.emit("unpipe", this, c), this);
    if (!D) {
      var K = B.pipes, I = B.pipesCount;
      B.pipes = null, B.pipesCount = 0, B.flowing = !1;
      for (var n = 0; n < I; n++) K[n].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var a = ne(B.pipes, D);
    return a === -1 ? this : (B.pipes.splice(a, 1), B.pipesCount -= 1, B.pipesCount === 1 && (B.pipes = B.pipes[0]), D.emit("unpipe", this, c), this);
  }, q.prototype.on = function(D, B) {
    var c = u.prototype.on.call(this, D, B), K = this._readableState;
    return D === "data" ? (K.readableListening = this.listenerCount("readable") > 0, K.flowing !== !1 && this.resume()) : D === "readable" && !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = !0, K.flowing = !1, K.emittedReadable = !1, S("on readable", K.length, K.reading), K.length ? oe(this) : K.reading || ve.nextTick(Y, this)), c;
  }, q.prototype.addListener = q.prototype.on, q.prototype.removeListener = function(D, B) {
    var c = u.prototype.removeListener.call(this, D, B);
    return D === "readable" && ve.nextTick(X, this), c;
  }, q.prototype.removeAllListeners = function(D) {
    var B = u.prototype.removeAllListeners.apply(this, arguments);
    return (D === "readable" || D === void 0) && ve.nextTick(X, this), B;
  };
  function X(D) {
    var B = D._readableState;
    B.readableListening = D.listenerCount("readable") > 0, B.resumeScheduled && !B.paused ? B.flowing = !0 : D.listenerCount("data") > 0 && D.resume();
  }
  function Y(D) {
    S("readable nexttick read 0"), D.read(0);
  }
  q.prototype.resume = function() {
    var D = this._readableState;
    return D.flowing || (S("resume"), D.flowing = !D.readableListening, re(this, D)), D.paused = !1, this;
  };
  function re(D, B) {
    B.resumeScheduled || (B.resumeScheduled = !0, ve.nextTick(de, D, B));
  }
  function de(D, B) {
    S("resume", B.reading), B.reading || D.read(0), B.resumeScheduled = !1, D.emit("resume"), E(D), B.flowing && !B.reading && D.read(0);
  }
  q.prototype.pause = function() {
    return S("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (S("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function E(D) {
    var B = D._readableState;
    for (S("flow", B.flowing); B.flowing && D.read() !== null; ) ;
  }
  q.prototype.wrap = function(D) {
    var B = this, c = this._readableState, K = !1;
    D.on("end", function() {
      if (S("wrapped end"), c.decoder && !c.ended) {
        var a = c.decoder.end();
        a && a.length && B.push(a);
      }
      B.push(null);
    }), D.on("data", function(a) {
      S("wrapped data"), c.decoder && (a = c.decoder.write(a)), !(c.objectMode && a == null) && (!c.objectMode && (!a || !a.length) || B.push(a) || (K = !0, D.pause()));
    });
    for (var I in D) this[I] === void 0 && typeof D[I] == "function" && (this[I] = /* @__PURE__ */ (function(d) {
      return function() {
        return D[d].apply(D, arguments);
      };
    })(I));
    for (var n = 0; n < P.length; n++) D.on(P[n], this.emit.bind(this, P[n]));
    return this._read = function(a) {
      S("wrapped _read", a), K && (K = !1, D.resume());
    }, this;
  }, typeof Symbol == "function" && (q.prototype[Symbol.asyncIterator] = function() {
    return b === void 0 && (b = Ha()), b(this);
  }), Object.defineProperty(q.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(q.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(q.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(B) {
      this._readableState && (this._readableState.flowing = B);
    }
  }), q._fromList = h, Object.defineProperty(q.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function h(D, B) {
    if (B.length === 0) return null;
    var c;
    return B.objectMode ? c = B.buffer.shift() : !D || D >= B.length ? (B.decoder ? c = B.buffer.join("") : B.buffer.length === 1 ? c = B.buffer.first() : c = B.buffer.concat(B.length), B.buffer.clear()) : c = B.buffer.consume(D, B.decoder), c;
  }
  function j(D) {
    var B = D._readableState;
    S("endReadable", B.endEmitted), B.endEmitted || (B.ended = !0, ve.nextTick(U, B, D));
  }
  function U(D, B) {
    if (S("endReadableNT", D.endEmitted, D.length), !D.endEmitted && D.length === 0 && (D.endEmitted = !0, B.readable = !1, B.emit("end"), D.autoDestroy)) {
      var c = B._writableState;
      (!c || c.autoDestroy && c.finished) && B.destroy();
    }
  }
  typeof Symbol == "function" && (q.from = function(D, B) {
    return _ === void 0 && (_ = Ga()), _(q, D, B);
  });
  function ne(D, B) {
    for (var c = 0, K = D.length; c < K; c++) if (D[c] === B) return c;
    return -1;
  }
})), Wn = /* @__PURE__ */ ce(((e, t) => {
  t.exports = T;
  var r = xt().codes, o = r.ERR_METHOD_NOT_IMPLEMENTED, u = r.ERR_MULTIPLE_CALLBACK, i = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, l = r.ERR_TRANSFORM_WITH_LENGTH_0, s = vt();
  et()(T, s);
  function f(N, w) {
    var m = this._transformState;
    m.transforming = !1;
    var g = m.writecb;
    if (g === null) return this.emit("error", new u());
    m.writechunk = null, m.writecb = null, w != null && this.push(w), g(N);
    var A = this._readableState;
    A.reading = !1, (A.needReadable || A.length < A.highWaterMark) && this._read(A.highWaterMark);
  }
  function T(N) {
    if (!(this instanceof T)) return new T(N);
    s.call(this, N), this._transformState = {
      afterTransform: f.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, N && (typeof N.transform == "function" && (this._transform = N.transform), typeof N.flush == "function" && (this._flush = N.flush)), this.on("prefinish", S);
  }
  function S() {
    var N = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(w, m) {
      v(N, w, m);
    }) : v(this, null, null);
  }
  T.prototype.push = function(N, w) {
    return this._transformState.needTransform = !1, s.prototype.push.call(this, N, w);
  }, T.prototype._transform = function(N, w, m) {
    m(new o("_transform()"));
  }, T.prototype._write = function(N, w, m) {
    var g = this._transformState;
    if (g.writecb = m, g.writechunk = N, g.writeencoding = w, !g.transforming) {
      var A = this._readableState;
      (g.needTransform || A.needReadable || A.length < A.highWaterMark) && this._read(A.highWaterMark);
    }
  }, T.prototype._read = function(N) {
    var w = this._transformState;
    w.writechunk !== null && !w.transforming ? (w.transforming = !0, this._transform(w.writechunk, w.writeencoding, w.afterTransform)) : w.needTransform = !0;
  }, T.prototype._destroy = function(N, w) {
    s.prototype._destroy.call(this, N, function(m) {
      w(m);
    });
  };
  function v(N, w, m) {
    if (w) return N.emit("error", w);
    if (m != null && N.push(m), N._writableState.length) throw new l();
    if (N._transformState.transforming) throw new i();
    return N.push(null);
  }
})), Ka = /* @__PURE__ */ ce(((e, t) => {
  t.exports = o;
  var r = Wn();
  et()(o, r);
  function o(u) {
    if (!(this instanceof o)) return new o(u);
    r.call(this, u);
  }
  o.prototype._transform = function(u, i, l) {
    l(null, u);
  };
})), qa = /* @__PURE__ */ ce(((e, t) => {
  var r;
  function o(m) {
    var g = !1;
    return function() {
      g || (g = !0, m.apply(void 0, arguments));
    };
  }
  var u = xt().codes, i = u.ERR_MISSING_ARGS, l = u.ERR_STREAM_DESTROYED;
  function s(m) {
    if (m) throw m;
  }
  function f(m) {
    return m.setHeader && typeof m.abort == "function";
  }
  function T(m, g, A, C) {
    C = o(C);
    var y = !1;
    m.on("close", function() {
      y = !0;
    }), r === void 0 && (r = jr()), r(m, {
      readable: g,
      writable: A
    }, function(b) {
      if (b) return C(b);
      y = !0, C();
    });
    var x = !1;
    return function(b) {
      if (!y && !x) {
        if (x = !0, f(m)) return m.abort();
        if (typeof m.destroy == "function") return m.destroy();
        C(b || new l("pipe"));
      }
    };
  }
  function S(m) {
    m();
  }
  function v(m, g) {
    return m.pipe(g);
  }
  function N(m) {
    return !m.length || typeof m[m.length - 1] != "function" ? s : m.pop();
  }
  function w() {
    for (var m = arguments.length, g = new Array(m), A = 0; A < m; A++) g[A] = arguments[A];
    var C = N(g);
    if (Array.isArray(g[0]) && (g = g[0]), g.length < 2) throw new i("streams");
    var y, x = g.map(function(b, _) {
      var p = _ < g.length - 1;
      return T(b, p, _ > 0, function(P) {
        y || (y = P), P && x.forEach(S), !p && (x.forEach(S), C(y));
      });
    });
    return g.reduce(v);
  }
  t.exports = w;
})), zr = /* @__PURE__ */ ce(((e, t) => {
  t.exports = o;
  var r = Dr().EventEmitter;
  et()(o, r), o.Readable = zn(), o.Writable = jn(), o.Duplex = vt(), o.Transform = Wn(), o.PassThrough = Ka(), o.finished = jr(), o.pipeline = qa(), o.Stream = o;
  function o() {
    r.call(this);
  }
  o.prototype.pipe = function(u, i) {
    var l = this;
    function s(m) {
      u.writable && u.write(m) === !1 && l.pause && l.pause();
    }
    l.on("data", s);
    function f() {
      l.readable && l.resume && l.resume();
    }
    u.on("drain", f), !u._isStdio && (!i || i.end !== !1) && (l.on("end", S), l.on("close", v));
    var T = !1;
    function S() {
      T || (T = !0, u.end());
    }
    function v() {
      T || (T = !0, typeof u.destroy == "function" && u.destroy());
    }
    function N(m) {
      if (w(), r.listenerCount(this, "error") === 0) throw m;
    }
    l.on("error", N), u.on("error", N);
    function w() {
      l.removeListener("data", s), u.removeListener("drain", f), l.removeListener("end", S), l.removeListener("close", v), l.removeListener("error", N), u.removeListener("error", N), l.removeListener("end", w), l.removeListener("close", w), u.removeListener("close", w);
    }
    return l.on("end", w), l.on("close", w), u.on("close", w), u.emit("pipe", l), u;
  };
})), Va = /* @__PURE__ */ ce(((e) => {
  (function(t) {
    t.parser = function(E, h) {
      return new o(E, h);
    }, t.SAXParser = o, t.SAXStream = S, t.createStream = T, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
    function o(E, h) {
      if (!(this instanceof o)) return new o(E, h);
      var j = this;
      i(j), j.q = j.c = "", j.bufferCheckPosition = t.MAX_BUFFER_LENGTH, j.opt = h || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!E, j.noscript = !!(E || j.opt.noscript), j.state = R.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(g)), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), Q(j, "onready");
    }
    Object.create || (Object.create = function(E) {
      function h() {
      }
      return h.prototype = E, new h();
    }), Object.keys || (Object.keys = function(E) {
      var h = [];
      for (var j in E) E.hasOwnProperty(j) && h.push(j);
      return h;
    });
    function u(E) {
      for (var h = Math.max(t.MAX_BUFFER_LENGTH, 10), j = 0, U = 0, ne = r.length; U < ne; U++) {
        var D = E[r[U]].length;
        if (D > h) switch (r[U]) {
          case "textNode":
            W(E);
            break;
          case "cdata":
            O(E, "oncdata", E.cdata), E.cdata = "";
            break;
          case "script":
            O(E, "onscript", E.script), E.script = "";
            break;
          default:
            H(E, "Max buffer length exceeded: " + r[U]);
        }
        j = Math.max(j, D);
      }
      E.bufferCheckPosition = t.MAX_BUFFER_LENGTH - j + E.position;
    }
    function i(E) {
      for (var h = 0, j = r.length; h < j; h++) E[r[h]] = "";
    }
    function l(E) {
      W(E), E.cdata !== "" && (O(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (O(E, "onscript", E.script), E.script = "");
    }
    o.prototype = {
      end: function() {
        J(this);
      },
      write: de,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        l(this);
      }
    };
    var s;
    try {
      s = zr().Stream;
    } catch {
      s = function() {
      };
    }
    var f = t.EVENTS.filter(function(E) {
      return E !== "error" && E !== "end";
    });
    function T(E, h) {
      return new S(E, h);
    }
    function S(E, h) {
      if (!(this instanceof S)) return new S(E, h);
      s.apply(this), this._parser = new o(E, h), this.writable = !0, this.readable = !0;
      var j = this;
      this._parser.onend = function() {
        j.emit("end");
      }, this._parser.onerror = function(U) {
        j.emit("error", U), j._parser.error = null;
      }, this._decoder = null, f.forEach(function(U) {
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
    S.prototype = Object.create(s.prototype, { constructor: { value: S } }), S.prototype.write = function(E) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E)) {
        if (!this._decoder) {
          var h = Cr().StringDecoder;
          this._decoder = new h("utf8");
        }
        E = this._decoder.write(E);
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, S.prototype.end = function(E) {
      return E && E.length && this.write(E), this._parser.end(), !0;
    }, S.prototype.on = function(E, h) {
      var j = this;
      return !j._parser["on" + E] && f.indexOf(E) !== -1 && (j._parser["on" + E] = function() {
        var U = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        U.splice(0, 0, E), j.emit.apply(j, U);
      }), s.prototype.on.call(j, E, h);
    };
    var v = "[CDATA[", N = "DOCTYPE", w = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", g = {
      xml: w,
      xmlns: m
    }, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function b(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function _(E) {
      return E === '"' || E === "'";
    }
    function p(E) {
      return E === ">" || b(E);
    }
    function P(E, h) {
      return E.test(h);
    }
    function M(E, h) {
      return !P(E, h);
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
    }, Object.keys(t.ENTITIES).forEach(function(E) {
      var h = t.ENTITIES[E], j = typeof h == "number" ? String.fromCharCode(h) : h;
      t.ENTITIES[E] = j;
    });
    for (var q in t.STATE) t.STATE[t.STATE[q]] = q;
    R = t.STATE;
    function Q(E, h, j) {
      E[h] && E[h](j);
    }
    function O(E, h, j) {
      E.textNode && W(E), Q(E, h, j);
    }
    function W(E) {
      E.textNode = k(E.opt, E.textNode), E.textNode && Q(E, "ontext", E.textNode), E.textNode = "";
    }
    function k(E, h) {
      return E.trim && (h = h.trim()), E.normalize && (h = h.replace(/\s+/g, " ")), h;
    }
    function H(E, h) {
      return W(E), E.trackPosition && (h += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), h = new Error(h), E.error = h, Q(E, "onerror", h), E;
    }
    function J(E) {
      return E.sawRoot && !E.closedRoot && $(E, "Unclosed root tag"), E.state !== R.BEGIN && E.state !== R.BEGIN_WHITESPACE && E.state !== R.TEXT && H(E, "Unexpected end"), W(E), E.c = "", E.closed = !0, Q(E, "onend"), o.call(E, E.strict, E.opt), E;
    }
    function $(E, h) {
      if (typeof E != "object" || !(E instanceof o)) throw new Error("bad call to strictFail");
      E.strict && H(E, h);
    }
    function oe(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var h = E.tags[E.tags.length - 1] || E, j = E.tag = {
        name: E.tagName,
        attributes: {}
      };
      E.opt.xmlns && (j.ns = h.ns), E.attribList.length = 0, O(E, "onopentagstart", j);
    }
    function Z(E, h) {
      var j = E.indexOf(":") < 0 ? ["", E] : E.split(":"), U = j[0], ne = j[1];
      return h && E === "xmlns" && (U = "xmlns", ne = ""), {
        prefix: U,
        local: ne
      };
    }
    function te(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var h = Z(E.attribName, !0), j = h.prefix, U = h.local;
        if (j === "xmlns") if (U === "xml" && E.attribValue !== w) $(E, "xml: prefix must be bound to " + w + `
Actual: ` + E.attribValue);
        else if (U === "xmlns" && E.attribValue !== m) $(E, "xmlns: prefix must be bound to " + m + `
Actual: ` + E.attribValue);
        else {
          var ne = E.tag, D = E.tags[E.tags.length - 1] || E;
          ne.ns === D.ns && (ne.ns = Object.create(D.ns)), ne.ns[U] = E.attribValue;
        }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, O(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function V(E, h) {
      if (E.opt.xmlns) {
        var j = E.tag, U = Z(E.tagName);
        j.prefix = U.prefix, j.local = U.local, j.uri = j.ns[U.prefix] || "", j.prefix && !j.uri && ($(E, "Unbound namespace prefix: " + JSON.stringify(E.tagName)), j.uri = U.prefix);
        var ne = E.tags[E.tags.length - 1] || E;
        j.ns && ne.ns !== j.ns && Object.keys(j.ns).forEach(function(z) {
          O(E, "onopennamespace", {
            prefix: z,
            uri: j.ns[z]
          });
        });
        for (var D = 0, B = E.attribList.length; D < B; D++) {
          var c = E.attribList[D], K = c[0], I = c[1], n = Z(K, !0), a = n.prefix, d = n.local, L = a === "" ? "" : j.ns[a] || "", G = {
            name: K,
            value: I,
            prefix: a,
            local: d,
            uri: L
          };
          a && a !== "xmlns" && !L && ($(E, "Unbound namespace prefix: " + JSON.stringify(a)), G.uri = a), E.tag.attributes[K] = G, O(E, "onattribute", G);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!h, E.sawRoot = !0, E.tags.push(E.tag), O(E, "onopentag", E.tag), h || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = R.SCRIPT : E.state = R.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function F(E) {
      if (!E.tagName) {
        $(E, "Weird empty close tag."), E.textNode += "</>", E.state = R.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = R.SCRIPT;
          return;
        }
        O(E, "onscript", E.script), E.script = "";
      }
      var h = E.tags.length, j = E.tagName;
      E.strict || (j = j[E.looseCase]());
      for (var U = j; h-- && E.tags[h].name !== U; ) $(E, "Unexpected close tag");
      if (h < 0) {
        $(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = R.TEXT;
        return;
      }
      E.tagName = j;
      for (var ne = E.tags.length; ne-- > h; ) {
        var D = E.tag = E.tags.pop();
        E.tagName = E.tag.name, O(E, "onclosetag", E.tagName);
        var B = {};
        for (var c in D.ns) B[c] = D.ns[c];
        var K = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && D.ns !== K.ns && Object.keys(D.ns).forEach(function(I) {
          var n = D.ns[I];
          O(E, "onclosenamespace", {
            prefix: I,
            uri: n
          });
        });
      }
      h === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = R.TEXT;
    }
    function X(E) {
      var h = E.entity, j = h.toLowerCase(), U, ne = "";
      return E.ENTITIES[h] ? E.ENTITIES[h] : E.ENTITIES[j] ? E.ENTITIES[j] : (h = j, h.charAt(0) === "#" && (h.charAt(1) === "x" ? (h = h.slice(2), U = parseInt(h, 16), ne = U.toString(16)) : (h = h.slice(1), U = parseInt(h, 10), ne = U.toString(10))), h = h.replace(/^0+/, ""), isNaN(U) || ne.toLowerCase() !== h ? ($(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(U));
    }
    function Y(E, h) {
      h === "<" ? (E.state = R.OPEN_WAKA, E.startTagPosition = E.position) : b(h) || ($(E, "Non-whitespace before first tag."), E.textNode = h, E.state = R.TEXT);
    }
    function re(E, h) {
      var j = "";
      return h < E.length && (j = E.charAt(h)), j;
    }
    function de(E) {
      var h = this;
      if (this.error) throw this.error;
      if (h.closed) return H(h, "Cannot write after close. Assign an onready handler.");
      if (E === null) return J(h);
      typeof E == "object" && (E = E.toString());
      for (var j = 0, U = ""; U = re(E, j++), h.c = U, !!U; )
        switch (h.trackPosition && (h.position++, U === `
` ? (h.line++, h.column = 0) : h.column++), h.state) {
          case R.BEGIN:
            if (h.state = R.BEGIN_WHITESPACE, U === "\uFEFF") continue;
            Y(h, U);
            continue;
          case R.BEGIN_WHITESPACE:
            Y(h, U);
            continue;
          case R.TEXT:
            if (h.sawRoot && !h.closedRoot) {
              for (var ne = j - 1; U && U !== "<" && U !== "&"; )
                U = re(E, j++), U && h.trackPosition && (h.position++, U === `
` ? (h.line++, h.column = 0) : h.column++);
              h.textNode += E.substring(ne, j - 1);
            }
            U === "<" && !(h.sawRoot && h.closedRoot && !h.strict) ? (h.state = R.OPEN_WAKA, h.startTagPosition = h.position) : (!b(U) && (!h.sawRoot || h.closedRoot) && $(h, "Text data outside of root node."), U === "&" ? h.state = R.TEXT_ENTITY : h.textNode += U);
            continue;
          case R.SCRIPT:
            U === "<" ? h.state = R.SCRIPT_ENDING : h.script += U;
            continue;
          case R.SCRIPT_ENDING:
            U === "/" ? h.state = R.CLOSE_TAG : (h.script += "<" + U, h.state = R.SCRIPT);
            continue;
          case R.OPEN_WAKA:
            if (U === "!")
              h.state = R.SGML_DECL, h.sgmlDecl = "";
            else if (!b(U)) if (P(A, U))
              h.state = R.OPEN_TAG, h.tagName = U;
            else if (U === "/")
              h.state = R.CLOSE_TAG, h.tagName = "";
            else if (U === "?")
              h.state = R.PROC_INST, h.procInstName = h.procInstBody = "";
            else {
              if ($(h, "Unencoded <"), h.startTagPosition + 1 < h.position) {
                var D = h.position - h.startTagPosition;
                U = new Array(D).join(" ") + U;
              }
              h.textNode += "<" + U, h.state = R.TEXT;
            }
            continue;
          case R.SGML_DECL:
            (h.sgmlDecl + U).toUpperCase() === v ? (O(h, "onopencdata"), h.state = R.CDATA, h.sgmlDecl = "", h.cdata = "") : h.sgmlDecl + U === "--" ? (h.state = R.COMMENT, h.comment = "", h.sgmlDecl = "") : (h.sgmlDecl + U).toUpperCase() === N ? (h.state = R.DOCTYPE, (h.doctype || h.sawRoot) && $(h, "Inappropriately located doctype declaration"), h.doctype = "", h.sgmlDecl = "") : U === ">" ? (O(h, "onsgmldeclaration", h.sgmlDecl), h.sgmlDecl = "", h.state = R.TEXT) : (_(U) && (h.state = R.SGML_DECL_QUOTED), h.sgmlDecl += U);
            continue;
          case R.SGML_DECL_QUOTED:
            U === h.q && (h.state = R.SGML_DECL, h.q = ""), h.sgmlDecl += U;
            continue;
          case R.DOCTYPE:
            U === ">" ? (h.state = R.TEXT, O(h, "ondoctype", h.doctype), h.doctype = !0) : (h.doctype += U, U === "[" ? h.state = R.DOCTYPE_DTD : _(U) && (h.state = R.DOCTYPE_QUOTED, h.q = U));
            continue;
          case R.DOCTYPE_QUOTED:
            h.doctype += U, U === h.q && (h.q = "", h.state = R.DOCTYPE);
            continue;
          case R.DOCTYPE_DTD:
            h.doctype += U, U === "]" ? h.state = R.DOCTYPE : _(U) && (h.state = R.DOCTYPE_DTD_QUOTED, h.q = U);
            continue;
          case R.DOCTYPE_DTD_QUOTED:
            h.doctype += U, U === h.q && (h.state = R.DOCTYPE_DTD, h.q = "");
            continue;
          case R.COMMENT:
            U === "-" ? h.state = R.COMMENT_ENDING : h.comment += U;
            continue;
          case R.COMMENT_ENDING:
            U === "-" ? (h.state = R.COMMENT_ENDED, h.comment = k(h.opt, h.comment), h.comment && O(h, "oncomment", h.comment), h.comment = "") : (h.comment += "-" + U, h.state = R.COMMENT);
            continue;
          case R.COMMENT_ENDED:
            U !== ">" ? ($(h, "Malformed comment"), h.comment += "--" + U, h.state = R.COMMENT) : h.state = R.TEXT;
            continue;
          case R.CDATA:
            U === "]" ? h.state = R.CDATA_ENDING : h.cdata += U;
            continue;
          case R.CDATA_ENDING:
            U === "]" ? h.state = R.CDATA_ENDING_2 : (h.cdata += "]" + U, h.state = R.CDATA);
            continue;
          case R.CDATA_ENDING_2:
            U === ">" ? (h.cdata && O(h, "oncdata", h.cdata), O(h, "onclosecdata"), h.cdata = "", h.state = R.TEXT) : U === "]" ? h.cdata += "]" : (h.cdata += "]]" + U, h.state = R.CDATA);
            continue;
          case R.PROC_INST:
            U === "?" ? h.state = R.PROC_INST_ENDING : b(U) ? h.state = R.PROC_INST_BODY : h.procInstName += U;
            continue;
          case R.PROC_INST_BODY:
            if (!h.procInstBody && b(U)) continue;
            U === "?" ? h.state = R.PROC_INST_ENDING : h.procInstBody += U;
            continue;
          case R.PROC_INST_ENDING:
            U === ">" ? (O(h, "onprocessinginstruction", {
              name: h.procInstName,
              body: h.procInstBody
            }), h.procInstName = h.procInstBody = "", h.state = R.TEXT) : (h.procInstBody += "?" + U, h.state = R.PROC_INST_BODY);
            continue;
          case R.OPEN_TAG:
            P(C, U) ? h.tagName += U : (oe(h), U === ">" ? V(h) : U === "/" ? h.state = R.OPEN_TAG_SLASH : (b(U) || $(h, "Invalid character in tag name"), h.state = R.ATTRIB));
            continue;
          case R.OPEN_TAG_SLASH:
            U === ">" ? (V(h, !0), F(h)) : ($(h, "Forward-slash in opening tag not followed by >"), h.state = R.ATTRIB);
            continue;
          case R.ATTRIB:
            if (b(U)) continue;
            U === ">" ? V(h) : U === "/" ? h.state = R.OPEN_TAG_SLASH : P(A, U) ? (h.attribName = U, h.attribValue = "", h.state = R.ATTRIB_NAME) : $(h, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME:
            U === "=" ? h.state = R.ATTRIB_VALUE : U === ">" ? ($(h, "Attribute without value"), h.attribValue = h.attribName, te(h), V(h)) : b(U) ? h.state = R.ATTRIB_NAME_SAW_WHITE : P(C, U) ? h.attribName += U : $(h, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME_SAW_WHITE:
            if (U === "=") h.state = R.ATTRIB_VALUE;
            else {
              if (b(U)) continue;
              $(h, "Attribute without value"), h.tag.attributes[h.attribName] = "", h.attribValue = "", O(h, "onattribute", {
                name: h.attribName,
                value: ""
              }), h.attribName = "", U === ">" ? V(h) : P(A, U) ? (h.attribName = U, h.state = R.ATTRIB_NAME) : ($(h, "Invalid attribute name"), h.state = R.ATTRIB);
            }
            continue;
          case R.ATTRIB_VALUE:
            if (b(U)) continue;
            _(U) ? (h.q = U, h.state = R.ATTRIB_VALUE_QUOTED) : ($(h, "Unquoted attribute value"), h.state = R.ATTRIB_VALUE_UNQUOTED, h.attribValue = U);
            continue;
          case R.ATTRIB_VALUE_QUOTED:
            if (U !== h.q) {
              U === "&" ? h.state = R.ATTRIB_VALUE_ENTITY_Q : h.attribValue += U;
              continue;
            }
            te(h), h.q = "", h.state = R.ATTRIB_VALUE_CLOSED;
            continue;
          case R.ATTRIB_VALUE_CLOSED:
            b(U) ? h.state = R.ATTRIB : U === ">" ? V(h) : U === "/" ? h.state = R.OPEN_TAG_SLASH : P(A, U) ? ($(h, "No whitespace between attributes"), h.attribName = U, h.attribValue = "", h.state = R.ATTRIB_NAME) : $(h, "Invalid attribute name");
            continue;
          case R.ATTRIB_VALUE_UNQUOTED:
            if (!p(U)) {
              U === "&" ? h.state = R.ATTRIB_VALUE_ENTITY_U : h.attribValue += U;
              continue;
            }
            te(h), U === ">" ? V(h) : h.state = R.ATTRIB;
            continue;
          case R.CLOSE_TAG:
            if (h.tagName) U === ">" ? F(h) : P(C, U) ? h.tagName += U : h.script ? (h.script += "</" + h.tagName, h.tagName = "", h.state = R.SCRIPT) : (b(U) || $(h, "Invalid tagname in closing tag"), h.state = R.CLOSE_TAG_SAW_WHITE);
            else {
              if (b(U)) continue;
              M(A, U) ? h.script ? (h.script += "</" + U, h.state = R.SCRIPT) : $(h, "Invalid tagname in closing tag.") : h.tagName = U;
            }
            continue;
          case R.CLOSE_TAG_SAW_WHITE:
            if (b(U)) continue;
            U === ">" ? F(h) : $(h, "Invalid characters in closing tag");
            continue;
          case R.TEXT_ENTITY:
          case R.ATTRIB_VALUE_ENTITY_Q:
          case R.ATTRIB_VALUE_ENTITY_U:
            var B, c;
            switch (h.state) {
              case R.TEXT_ENTITY:
                B = R.TEXT, c = "textNode";
                break;
              case R.ATTRIB_VALUE_ENTITY_Q:
                B = R.ATTRIB_VALUE_QUOTED, c = "attribValue";
                break;
              case R.ATTRIB_VALUE_ENTITY_U:
                B = R.ATTRIB_VALUE_UNQUOTED, c = "attribValue";
                break;
            }
            U === ";" ? (h[c] += X(h), h.entity = "", h.state = B) : P(h.entity.length ? x : y, U) ? h.entity += U : ($(h, "Invalid character in entity name"), h[c] += "&" + h.entity + U, h.entity = "", h.state = B);
            continue;
          default:
            throw new Error(h, "Unknown state: " + h.state);
        }
      return h.position >= h.bufferCheckPosition && u(h), h;
    }
    String.fromCodePoint || (function() {
      var E = String.fromCharCode, h = Math.floor, j = function() {
        var U = 16384, ne = [], D, B, c = -1, K = arguments.length;
        if (!K) return "";
        for (var I = ""; ++c < K; ) {
          var n = Number(arguments[c]);
          if (!isFinite(n) || n < 0 || n > 1114111 || h(n) !== n) throw RangeError("Invalid code point: " + n);
          n <= 65535 ? ne.push(n) : (n -= 65536, D = (n >> 10) + 55296, B = n % 1024 + 56320, ne.push(D, B)), (c + 1 === K || ne.length > U) && (I += E.apply(null, ne), ne.length = 0);
        }
        return I;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: j,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = j;
    })();
  })(typeof e > "u" ? e.sax = {} : e);
})), Wr = /* @__PURE__ */ ce(((e, t) => {
  t.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), Hr = /* @__PURE__ */ ce(((e, t) => {
  var r = Wr().isArray;
  t.exports = {
    copyOptions: function(o) {
      var u, i = {};
      for (u in o) o.hasOwnProperty(u) && (i[u] = o[u]);
      return i;
    },
    ensureFlagExists: function(o, u) {
      (!(o in u) || typeof u[o] != "boolean") && (u[o] = !1);
    },
    ensureSpacesExists: function(o) {
      (!("spaces" in o) || typeof o.spaces != "number" && typeof o.spaces != "string") && (o.spaces = 0);
    },
    ensureAlwaysArrayExists: function(o) {
      (!("alwaysArray" in o) || typeof o.alwaysArray != "boolean" && !r(o.alwaysArray)) && (o.alwaysArray = !1);
    },
    ensureKeyExists: function(o, u) {
      (!(o + "Key" in u) || typeof u[o + "Key"] != "string") && (u[o + "Key"] = u.compact ? "_" + o : o);
    },
    checkFnExists: function(o, u) {
      return o + "Fn" in u;
    }
  };
})), Hn = /* @__PURE__ */ ce(((e, t) => {
  var r = Va(), o = Hr(), u = Wr().isArray, i, l;
  function s(x) {
    return i = o.copyOptions(x), o.ensureFlagExists("ignoreDeclaration", i), o.ensureFlagExists("ignoreInstruction", i), o.ensureFlagExists("ignoreAttributes", i), o.ensureFlagExists("ignoreText", i), o.ensureFlagExists("ignoreComment", i), o.ensureFlagExists("ignoreCdata", i), o.ensureFlagExists("ignoreDoctype", i), o.ensureFlagExists("compact", i), o.ensureFlagExists("alwaysChildren", i), o.ensureFlagExists("addParent", i), o.ensureFlagExists("trim", i), o.ensureFlagExists("nativeType", i), o.ensureFlagExists("nativeTypeAttributes", i), o.ensureFlagExists("sanitize", i), o.ensureFlagExists("instructionHasAttributes", i), o.ensureFlagExists("captureSpacesBetweenElements", i), o.ensureAlwaysArrayExists(i), o.ensureKeyExists("declaration", i), o.ensureKeyExists("instruction", i), o.ensureKeyExists("attributes", i), o.ensureKeyExists("text", i), o.ensureKeyExists("comment", i), o.ensureKeyExists("cdata", i), o.ensureKeyExists("doctype", i), o.ensureKeyExists("type", i), o.ensureKeyExists("name", i), o.ensureKeyExists("elements", i), o.ensureKeyExists("parent", i), o.checkFnExists("doctype", i), o.checkFnExists("instruction", i), o.checkFnExists("cdata", i), o.checkFnExists("comment", i), o.checkFnExists("text", i), o.checkFnExists("instructionName", i), o.checkFnExists("elementName", i), o.checkFnExists("attributeName", i), o.checkFnExists("attributeValue", i), o.checkFnExists("attributes", i), i;
  }
  function f(x) {
    var b = Number(x);
    if (!isNaN(b)) return b;
    var _ = x.toLowerCase();
    return _ === "true" ? !0 : _ === "false" ? !1 : x;
  }
  function T(x, b) {
    var _;
    if (i.compact) {
      if (!l[i[x + "Key"]] && (u(i.alwaysArray) ? i.alwaysArray.indexOf(i[x + "Key"]) !== -1 : i.alwaysArray) && (l[i[x + "Key"]] = []), l[i[x + "Key"]] && !u(l[i[x + "Key"]]) && (l[i[x + "Key"]] = [l[i[x + "Key"]]]), x + "Fn" in i && typeof b == "string" && (b = i[x + "Fn"](b, l)), x === "instruction" && ("instructionFn" in i || "instructionNameFn" in i)) {
        for (_ in b) if (b.hasOwnProperty(_)) if ("instructionFn" in i) b[_] = i.instructionFn(b[_], _, l);
        else {
          var p = b[_];
          delete b[_], b[i.instructionNameFn(_, p, l)] = p;
        }
      }
      u(l[i[x + "Key"]]) ? l[i[x + "Key"]].push(b) : l[i[x + "Key"]] = b;
    } else {
      l[i.elementsKey] || (l[i.elementsKey] = []);
      var P = {};
      if (P[i.typeKey] = x, x === "instruction") {
        for (_ in b) if (b.hasOwnProperty(_)) break;
        P[i.nameKey] = "instructionNameFn" in i ? i.instructionNameFn(_, b, l) : _, i.instructionHasAttributes ? (P[i.attributesKey] = b[_][i.attributesKey], "instructionFn" in i && (P[i.attributesKey] = i.instructionFn(P[i.attributesKey], _, l))) : ("instructionFn" in i && (b[_] = i.instructionFn(b[_], _, l)), P[i.instructionKey] = b[_]);
      } else
        x + "Fn" in i && (b = i[x + "Fn"](b, l)), P[i[x + "Key"]] = b;
      i.addParent && (P[i.parentKey] = l), l[i.elementsKey].push(P);
    }
  }
  function S(x) {
    if ("attributesFn" in i && x && (x = i.attributesFn(x, l)), (i.trim || "attributeValueFn" in i || "attributeNameFn" in i || i.nativeTypeAttributes) && x) {
      var b;
      for (b in x) if (x.hasOwnProperty(b) && (i.trim && (x[b] = x[b].trim()), i.nativeTypeAttributes && (x[b] = f(x[b])), "attributeValueFn" in i && (x[b] = i.attributeValueFn(x[b], b, l)), "attributeNameFn" in i)) {
        var _ = x[b];
        delete x[b], x[i.attributeNameFn(b, x[b], l)] = _;
      }
    }
    return x;
  }
  function v(x) {
    var b = {};
    if (x.body && (x.name.toLowerCase() === "xml" || i.instructionHasAttributes)) {
      for (var _ = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, p; (p = _.exec(x.body)) !== null; ) b[p[1]] = p[2] || p[3] || p[4];
      b = S(b);
    }
    if (x.name.toLowerCase() === "xml") {
      if (i.ignoreDeclaration) return;
      l[i.declarationKey] = {}, Object.keys(b).length && (l[i.declarationKey][i.attributesKey] = b), i.addParent && (l[i.declarationKey][i.parentKey] = l);
    } else {
      if (i.ignoreInstruction) return;
      i.trim && (x.body = x.body.trim());
      var P = {};
      i.instructionHasAttributes && Object.keys(b).length ? (P[x.name] = {}, P[x.name][i.attributesKey] = b) : P[x.name] = x.body, T("instruction", P);
    }
  }
  function N(x, b) {
    var _;
    if (typeof x == "object" && (b = x.attributes, x = x.name), b = S(b), "elementNameFn" in i && (x = i.elementNameFn(x, l)), i.compact) {
      if (_ = {}, !i.ignoreAttributes && b && Object.keys(b).length) {
        _[i.attributesKey] = {};
        var p;
        for (p in b) b.hasOwnProperty(p) && (_[i.attributesKey][p] = b[p]);
      }
      !(x in l) && (u(i.alwaysArray) ? i.alwaysArray.indexOf(x) !== -1 : i.alwaysArray) && (l[x] = []), l[x] && !u(l[x]) && (l[x] = [l[x]]), u(l[x]) ? l[x].push(_) : l[x] = _;
    } else
      l[i.elementsKey] || (l[i.elementsKey] = []), _ = {}, _[i.typeKey] = "element", _[i.nameKey] = x, !i.ignoreAttributes && b && Object.keys(b).length && (_[i.attributesKey] = b), i.alwaysChildren && (_[i.elementsKey] = []), l[i.elementsKey].push(_);
    _[i.parentKey] = l, l = _;
  }
  function w(x) {
    i.ignoreText || !x.trim() && !i.captureSpacesBetweenElements || (i.trim && (x = x.trim()), i.nativeType && (x = f(x)), i.sanitize && (x = x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), T("text", x));
  }
  function m(x) {
    i.ignoreComment || (i.trim && (x = x.trim()), T("comment", x));
  }
  function g(x) {
    var b = l[i.parentKey];
    i.addParent || delete l[i.parentKey], l = b;
  }
  function A(x) {
    i.ignoreCdata || (i.trim && (x = x.trim()), T("cdata", x));
  }
  function C(x) {
    i.ignoreDoctype || (x = x.replace(/^ /, ""), i.trim && (x = x.trim()), T("doctype", x));
  }
  function y(x) {
    x.note = x;
  }
  t.exports = function(x, b) {
    var _ = r.parser(!0, {}), p = {};
    if (l = p, i = s(b), _.opt = { strictEntities: !0 }, _.onopentag = N, _.ontext = w, _.oncomment = m, _.onclosetag = g, _.onerror = y, _.oncdata = A, _.ondoctype = C, _.onprocessinginstruction = v, _.write(x).close(), p[i.elementsKey]) {
      var P = p[i.elementsKey];
      delete p[i.elementsKey], p[i.elementsKey] = P, delete p.text;
    }
    return p;
  };
})), $a = /* @__PURE__ */ ce(((e, t) => {
  var r = Hr(), o = Hn();
  function u(i) {
    var l = r.copyOptions(i);
    return r.ensureSpacesExists(l), l;
  }
  t.exports = function(i, l) {
    var s = u(l), f = o(i, s), T, S = "compact" in s && s.compact ? "_parent" : "parent";
    return "addParent" in s && s.addParent ? T = JSON.stringify(f, function(v, N) {
      return v === S ? "_" : N;
    }, s.spaces) : T = JSON.stringify(f, null, s.spaces), T.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), Gn = /* @__PURE__ */ ce(((e, t) => {
  var r = Hr(), o = Wr().isArray, u, i;
  function l(_) {
    var p = r.copyOptions(_);
    return r.ensureFlagExists("ignoreDeclaration", p), r.ensureFlagExists("ignoreInstruction", p), r.ensureFlagExists("ignoreAttributes", p), r.ensureFlagExists("ignoreText", p), r.ensureFlagExists("ignoreComment", p), r.ensureFlagExists("ignoreCdata", p), r.ensureFlagExists("ignoreDoctype", p), r.ensureFlagExists("compact", p), r.ensureFlagExists("indentText", p), r.ensureFlagExists("indentCdata", p), r.ensureFlagExists("indentAttributes", p), r.ensureFlagExists("indentInstruction", p), r.ensureFlagExists("fullTagEmptyElement", p), r.ensureFlagExists("noQuotesForNativeAttributes", p), r.ensureSpacesExists(p), typeof p.spaces == "number" && (p.spaces = Array(p.spaces + 1).join(" ")), r.ensureKeyExists("declaration", p), r.ensureKeyExists("instruction", p), r.ensureKeyExists("attributes", p), r.ensureKeyExists("text", p), r.ensureKeyExists("comment", p), r.ensureKeyExists("cdata", p), r.ensureKeyExists("doctype", p), r.ensureKeyExists("type", p), r.ensureKeyExists("name", p), r.ensureKeyExists("elements", p), r.checkFnExists("doctype", p), r.checkFnExists("instruction", p), r.checkFnExists("cdata", p), r.checkFnExists("comment", p), r.checkFnExists("text", p), r.checkFnExists("instructionName", p), r.checkFnExists("elementName", p), r.checkFnExists("attributeName", p), r.checkFnExists("attributeValue", p), r.checkFnExists("attributes", p), r.checkFnExists("fullTagEmptyElement", p), p;
  }
  function s(_, p, P) {
    return (!P && _.spaces ? `
` : "") + Array(p + 1).join(_.spaces);
  }
  function f(_, p, P) {
    if (p.ignoreAttributes) return "";
    "attributesFn" in p && (_ = p.attributesFn(_, i, u));
    var M, R, q, Q, O = [];
    for (M in _) _.hasOwnProperty(M) && _[M] !== null && _[M] !== void 0 && (Q = p.noQuotesForNativeAttributes && typeof _[M] != "string" ? "" : '"', R = "" + _[M], R = R.replace(/"/g, "&quot;"), q = "attributeNameFn" in p ? p.attributeNameFn(M, R, i, u) : M, O.push(p.spaces && p.indentAttributes ? s(p, P + 1, !1) : " "), O.push(q + "=" + Q + ("attributeValueFn" in p ? p.attributeValueFn(R, M, i, u) : R) + Q));
    return _ && Object.keys(_).length && p.spaces && p.indentAttributes && O.push(s(p, P, !1)), O.join("");
  }
  function T(_, p, P) {
    return u = _, i = "xml", p.ignoreDeclaration ? "" : "<?xml" + f(_[p.attributesKey], p, P) + "?>";
  }
  function S(_, p, P) {
    if (p.ignoreInstruction) return "";
    var M;
    for (M in _) if (_.hasOwnProperty(M)) break;
    var R = "instructionNameFn" in p ? p.instructionNameFn(M, _[M], i, u) : M;
    if (typeof _[M] == "object")
      return u = _, i = R, "<?" + R + f(_[M][p.attributesKey], p, P) + "?>";
    var q = _[M] ? _[M] : "";
    return "instructionFn" in p && (q = p.instructionFn(q, M, i, u)), "<?" + R + (q ? " " + q : "") + "?>";
  }
  function v(_, p) {
    return p.ignoreComment ? "" : "<!--" + ("commentFn" in p ? p.commentFn(_, i, u) : _) + "-->";
  }
  function N(_, p) {
    return p.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in p ? p.cdataFn(_, i, u) : _.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function w(_, p) {
    return p.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in p ? p.doctypeFn(_, i, u) : _) + ">";
  }
  function m(_, p) {
    return p.ignoreText ? "" : (_ = "" + _, _ = _.replace(/&amp;/g, "&"), _ = _.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in p ? p.textFn(_, i, u) : _);
  }
  function g(_, p) {
    var P;
    if (_.elements && _.elements.length) for (P = 0; P < _.elements.length; ++P) switch (_.elements[P][p.typeKey]) {
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
  function A(_, p, P) {
    u = _, i = _.name;
    var M = [], R = "elementNameFn" in p ? p.elementNameFn(_.name, _) : _.name;
    M.push("<" + R), _[p.attributesKey] && M.push(f(_[p.attributesKey], p, P));
    var q = _[p.elementsKey] && _[p.elementsKey].length || _[p.attributesKey] && _[p.attributesKey]["xml:space"] === "preserve";
    return q || ("fullTagEmptyElementFn" in p ? q = p.fullTagEmptyElementFn(_.name, _) : q = p.fullTagEmptyElement), q ? (M.push(">"), _[p.elementsKey] && _[p.elementsKey].length && (M.push(C(_[p.elementsKey], p, P + 1)), u = _, i = _.name), M.push(p.spaces && g(_, p) ? `
` + Array(P + 1).join(p.spaces) : ""), M.push("</" + R + ">")) : M.push("/>"), M.join("");
  }
  function C(_, p, P, M) {
    return _.reduce(function(R, q) {
      var Q = s(p, P, M && !R);
      switch (q.type) {
        case "element":
          return R + Q + A(q, p, P);
        case "comment":
          return R + Q + v(q[p.commentKey], p);
        case "doctype":
          return R + Q + w(q[p.doctypeKey], p);
        case "cdata":
          return R + (p.indentCdata ? Q : "") + N(q[p.cdataKey], p);
        case "text":
          return R + (p.indentText ? Q : "") + m(q[p.textKey], p);
        case "instruction":
          var O = {};
          return O[q[p.nameKey]] = q[p.attributesKey] ? q : q[p.instructionKey], R + (p.indentInstruction ? Q : "") + S(O, p, P);
      }
    }, "");
  }
  function y(_, p, P) {
    var M;
    for (M in _) if (_.hasOwnProperty(M)) switch (M) {
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
  function x(_, p, P, M, R) {
    u = _, i = p;
    var q = "elementNameFn" in P ? P.elementNameFn(p, _) : p;
    if (typeof _ > "u" || _ === null || _ === "") return "fullTagEmptyElementFn" in P && P.fullTagEmptyElementFn(p, _) || P.fullTagEmptyElement ? "<" + q + "></" + q + ">" : "<" + q + "/>";
    var Q = [];
    if (p) {
      if (Q.push("<" + q), typeof _ != "object")
        return Q.push(">" + m(_, P) + "</" + q + ">"), Q.join("");
      _[P.attributesKey] && Q.push(f(_[P.attributesKey], P, M));
      var O = y(_, P, !0) || _[P.attributesKey] && _[P.attributesKey]["xml:space"] === "preserve";
      if (O || ("fullTagEmptyElementFn" in P ? O = P.fullTagEmptyElementFn(p, _) : O = P.fullTagEmptyElement), O) Q.push(">");
      else
        return Q.push("/>"), Q.join("");
    }
    return Q.push(b(_, P, M + 1, !1)), u = _, i = p, p && Q.push((R ? s(P, M, !1) : "") + "</" + q + ">"), Q.join("");
  }
  function b(_, p, P, M) {
    var R, q, Q, O = [];
    for (q in _) if (_.hasOwnProperty(q))
      for (Q = o(_[q]) ? _[q] : [_[q]], R = 0; R < Q.length; ++R) {
        switch (q) {
          case p.declarationKey:
            O.push(T(Q[R], p, P));
            break;
          case p.instructionKey:
            O.push((p.indentInstruction ? s(p, P, M) : "") + S(Q[R], p, P));
            break;
          case p.attributesKey:
          case p.parentKey:
            break;
          case p.textKey:
            O.push((p.indentText ? s(p, P, M) : "") + m(Q[R], p));
            break;
          case p.cdataKey:
            O.push((p.indentCdata ? s(p, P, M) : "") + N(Q[R], p));
            break;
          case p.doctypeKey:
            O.push(s(p, P, M) + w(Q[R], p));
            break;
          case p.commentKey:
            O.push(s(p, P, M) + v(Q[R], p));
            break;
          default:
            O.push(s(p, P, M) + x(Q[R], q, p, P, y(Q[R], p)));
        }
        M = M && !O.length;
      }
    return O.join("");
  }
  t.exports = function(_, p) {
    p = l(p);
    var P = [];
    return u = _, i = "_root_", p.compact ? P.push(b(_, p, 0, !0)) : (_[p.declarationKey] && P.push(T(_[p.declarationKey], p, 0)), _[p.elementsKey] && _[p.elementsKey].length && P.push(C(_[p.elementsKey], p, 0, !P.length))), P.join("");
  };
})), Xa = /* @__PURE__ */ ce(((e, t) => {
  var r = Gn();
  t.exports = function(o, u) {
    o instanceof Buffer && (o = o.toString());
    var i = null;
    if (typeof o == "string") try {
      i = JSON.parse(o);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else i = o;
    return r(i, u);
  };
})), Kn = (/* @__PURE__ */ ce(((e, t) => {
  t.exports = {
    xml2js: Hn(),
    xml2json: $a(),
    js2xml: Gn(),
    json2xml: Xa()
  };
})))(), Gr = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new Ya(e.name, e.attributes), r = e.elements || [];
      for (const o of r) {
        const u = Gr(o);
        u !== void 0 && t.push(u);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, Za = class extends we {
}, Ya = class extends ae {
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
    return Gr((0, Kn.xml2js)(e, { compact: !1 }));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new Za(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, Ja = class extends ae {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(e) {
    super(""), ee(this, "_attr", void 0), this._attr = e;
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
}, qn = class extends ae {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, ke = (e) => {
  if (isNaN(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, ar = (e) => {
  const t = ke(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, Vn = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, rn = (e) => Vn(e, 1), Kr = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, $n = (e) => {
  const t = Kr(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, yt = (e) => e === "auto" ? e : Vn(e.charAt(0) === "#" ? e.substring(1) : e, 3), $e = (e) => typeof e == "string" ? Kr(e) : ke(e), Qa = (e) => typeof e == "string" ? $n(e) : ar(e), Ae = (e) => typeof e == "string" ? $n(e) : ar(e), es = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Xn = (e) => typeof e == "number" ? ke(e) : e.slice(-1) === "%" ? es(e) : Kr(e), ts = ar, rs = ar, ns = (e) => e.toISOString(), ue = class extends ae {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Re({ val: t }));
  }
}, dr = class extends ae {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Re({ val: Qa(t) }));
  }
}, Zn = class extends ae {
}, Je = class extends ae {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(e, t) {
    super(e), this.root.push(new Re({ val: t }));
  }
}, At = (e, t) => new fe({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), Bt = class extends ae {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(e, t) {
    super(e), this.root.push(new Re({ val: t }));
  }
}, at = class extends ae {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, fe = class extends ae {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new En(t)), r && this.root.push(...r);
  }
}, Se = {
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
}, Yn = (e) => new fe({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), be = (e, { color: t, size: r, space: o, style: u }) => new fe({
  name: e,
  attributes: {
    style: {
      key: "w:val",
      value: u
    },
    color: {
      key: "w:color",
      value: t === void 0 ? void 0 : yt(t)
    },
    size: {
      key: "w:sz",
      value: r === void 0 ? void 0 : ts(r)
    },
    space: {
      key: "w:space",
      value: o === void 0 ? void 0 : rs(o)
    }
  }
}), Fe = {
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
}, is = class extends Qe {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.left && this.root.push(be("w:left", e.left)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}, as = class extends ae {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", {
      color: "auto",
      space: 1,
      style: Fe.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, ss = ({ start: e, end: t, left: r, right: o, hanging: u, firstLine: i, firstLineChars: l }) => new fe({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : $e(e)
    },
    end: {
      key: "w:end",
      value: t === void 0 ? void 0 : $e(t)
    },
    left: {
      key: "w:left",
      value: r === void 0 ? void 0 : $e(r)
    },
    right: {
      key: "w:right",
      value: o === void 0 ? void 0 : $e(o)
    },
    hanging: {
      key: "w:hanging",
      value: u === void 0 ? void 0 : Ae(u)
    },
    firstLine: {
      key: "w:firstLine",
      value: i === void 0 ? void 0 : Ae(i)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: l === void 0 ? void 0 : ke(l)
    }
  }
}), os = () => new fe({ name: "w:br" }), qr = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Vr = (e, t) => new fe({
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
}), Ct = (e) => Vr(qr.BEGIN, e), Nt = (e) => Vr(qr.SEPARATE, e), Ot = (e) => Vr(qr.END, e), ls = {
  DECIMAL: "decimal"
}, ct = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, ht = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { space: "xml:space" });
  }
}, us = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("PAGE");
  }
}, cs = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("NUMPAGES");
  }
}, hs = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, fs = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTION");
  }
}, sr = ({ fill: e, color: t, type: r }) => new fe({
  name: "w:shd",
  attributes: {
    fill: {
      key: "w:fill",
      value: e === void 0 ? void 0 : yt(e)
    },
    color: {
      key: "w:color",
      value: t === void 0 ? void 0 : yt(t)
    },
    type: {
      key: "w:val",
      value: r
    }
  }
}), Ze = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
}, Oe = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, ds = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, ps = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, ms = {
  /** Dot emphasis mark */
  DOT: "dot"
}, ws = (e = ms.DOT) => new fe({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), gs = class extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(new Re({ val: $e(e) }));
  }
}, vs = class extends ae {
  constructor(e) {
    super("w:color"), this.root.push(new Re({ val: yt(e) }));
  }
}, ys = class extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(new Re({ val: e }));
  }
}, bs = class extends ae {
  constructor(e) {
    super("w:highlightCs"), this.root.push(new Re({ val: e }));
  }
}, _s = (e) => new fe({
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
}), pr = (e, t) => {
  if (typeof e == "string") {
    const o = e;
    return new fe({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:ascii",
          value: o
        },
        cs: {
          key: "w:cs",
          value: o
        },
        eastAsia: {
          key: "w:eastAsia",
          value: o
        },
        hAnsi: {
          key: "w:hAnsi",
          value: o
        },
        hint: {
          key: "w:hint",
          value: t
        }
      }
    });
  }
  const r = e;
  return new fe({
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
}, Jn = (e) => new fe({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), xs = () => Jn("superscript"), Es = () => Jn("subscript"), Qn = {
  /** Single underline */
  SINGLE: "single"
}, Ts = (e = Qn.SINGLE, t) => new fe({
  name: "w:u",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    color: {
      key: "w:color",
      value: t === void 0 ? void 0 : yt(t)
    }
  }
}), rt = class extends Qe {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new Je("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(pr(e.font)) : "name" in e.font ? this.push(pr(e.font.name, e.font.hint)) : this.push(pr(e.font))), e.bold !== void 0 && this.push(new ue("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new ue("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new ue("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new ue("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new ue("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ue("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ue("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ue("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ue("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ue("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ue("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ue("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ue("w:vanish", e.vanish)), e.color && this.push(new vs(e.color)), e.characterSpacing && this.push(new gs(e.characterSpacing)), e.scale !== void 0 && this.push(new Bt("w:w", e.scale)), e.kern && this.push(new dr("w:kern", e.kern)), e.position && this.push(new Je("w:position", e.position)), e.size !== void 0 && this.push(new dr("w:sz", e.size));
    const o = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    o && this.push(new dr("w:szCs", o)), e.highlight && this.push(new ys(e.highlight));
    const u = e.highlightComplexScript === void 0 || e.highlightComplexScript === !0 ? e.highlight : e.highlightComplexScript;
    u && this.push(new bs(u)), e.underline && this.push(Ts(e.underline.type, e.underline.color)), e.effect && this.push(new Je("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(sr(e.shading)), e.subScript && this.push(Es()), e.superScript && this.push(xs()), e.rightToLeft !== void 0 && this.push(new ue("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(ws(e.emphasisMark.type)), e.language && this.push(_s(e.language)), e.specVanish && this.push(new ue("w:specVanish", e.vanish)), e.math && this.push(new ue("w:oMath", e.math)), e.revision && this.push(new As(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, Ss = class extends rt {
  constructor(e) {
    super(e), e?.insertion && this.push(new ps(e.insertion)), e?.deletion && this.push(new ds(e.deletion));
  }
}, As = class extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new rt(e));
  }
}, er = class extends ae {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new ht({ space: ct.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new ht({ space: (t = e.space) !== null && t !== void 0 ? t : ct.DEFAULT })), this.root.push(e.text);
    }
  }
}, Ye = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, We = class extends ae {
  constructor(e) {
    if (super("w:r"), ee(this, "properties", void 0), this.properties = new rt(e), this.root.push(this.properties), e.break) for (let t = 0; t < e.break; t++) this.root.push(os());
    if (e.children) for (const t of e.children) {
      if (typeof t == "string") {
        switch (t) {
          case Ye.CURRENT:
            this.root.push(Ct()), this.root.push(new us()), this.root.push(Nt()), this.root.push(Ot());
            break;
          case Ye.TOTAL_PAGES:
            this.root.push(Ct()), this.root.push(new cs()), this.root.push(Nt()), this.root.push(Ot());
            break;
          case Ye.TOTAL_PAGES_IN_SECTION:
            this.root.push(Ct()), this.root.push(new hs()), this.root.push(Nt()), this.root.push(Ot());
            break;
          case Ye.CURRENT_SECTION:
            this.root.push(Ct()), this.root.push(new fs()), this.root.push(Nt()), this.root.push(Ot());
            break;
          default:
            this.root.push(new er(t));
            break;
        }
        continue;
      }
      this.root.push(t);
    }
    else e.text !== void 0 && this.root.push(new er(e.text));
  }
}, Ce = class extends We {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, jt = /* @__PURE__ */ ce(((e, t) => {
  t.exports = r;
  function r(o, u) {
    if (!o) throw new Error(u || "Assertion failed");
  }
  r.equal = function(u, i, l) {
    if (u != i) throw new Error(l || "Assertion failed: " + u + " != " + i);
  };
})), He = /* @__PURE__ */ ce(((e) => {
  var t = jt();
  e.inherits = et();
  function r(O, W) {
    return (O.charCodeAt(W) & 64512) !== 55296 || W < 0 || W + 1 >= O.length ? !1 : (O.charCodeAt(W + 1) & 64512) === 56320;
  }
  function o(O, W) {
    if (Array.isArray(O)) return O.slice();
    if (!O) return [];
    var k = [];
    if (typeof O == "string")
      if (W) {
        if (W === "hex")
          for (O = O.replace(/[^a-z0-9]+/gi, ""), O.length % 2 !== 0 && (O = "0" + O), J = 0; J < O.length; J += 2) k.push(parseInt(O[J] + O[J + 1], 16));
      } else for (var H = 0, J = 0; J < O.length; J++) {
        var $ = O.charCodeAt(J);
        $ < 128 ? k[H++] = $ : $ < 2048 ? (k[H++] = $ >> 6 | 192, k[H++] = $ & 63 | 128) : r(O, J) ? ($ = 65536 + (($ & 1023) << 10) + (O.charCodeAt(++J) & 1023), k[H++] = $ >> 18 | 240, k[H++] = $ >> 12 & 63 | 128, k[H++] = $ >> 6 & 63 | 128, k[H++] = $ & 63 | 128) : (k[H++] = $ >> 12 | 224, k[H++] = $ >> 6 & 63 | 128, k[H++] = $ & 63 | 128);
      }
    else for (J = 0; J < O.length; J++) k[J] = O[J] | 0;
    return k;
  }
  e.toArray = o;
  function u(O) {
    for (var W = "", k = 0; k < O.length; k++) W += s(O[k].toString(16));
    return W;
  }
  e.toHex = u;
  function i(O) {
    return (O >>> 24 | O >>> 8 & 65280 | O << 8 & 16711680 | (O & 255) << 24) >>> 0;
  }
  e.htonl = i;
  function l(O, W) {
    for (var k = "", H = 0; H < O.length; H++) {
      var J = O[H];
      W === "little" && (J = i(J)), k += f(J.toString(16));
    }
    return k;
  }
  e.toHex32 = l;
  function s(O) {
    return O.length === 1 ? "0" + O : O;
  }
  e.zero2 = s;
  function f(O) {
    return O.length === 7 ? "0" + O : O.length === 6 ? "00" + O : O.length === 5 ? "000" + O : O.length === 4 ? "0000" + O : O.length === 3 ? "00000" + O : O.length === 2 ? "000000" + O : O.length === 1 ? "0000000" + O : O;
  }
  e.zero8 = f;
  function T(O, W, k, H) {
    var J = k - W;
    t(J % 4 === 0);
    for (var $ = new Array(J / 4), oe = 0, Z = W; oe < $.length; oe++, Z += 4) {
      var te;
      H === "big" ? te = O[Z] << 24 | O[Z + 1] << 16 | O[Z + 2] << 8 | O[Z + 3] : te = O[Z + 3] << 24 | O[Z + 2] << 16 | O[Z + 1] << 8 | O[Z], $[oe] = te >>> 0;
    }
    return $;
  }
  e.join32 = T;
  function S(O, W) {
    for (var k = new Array(O.length * 4), H = 0, J = 0; H < O.length; H++, J += 4) {
      var $ = O[H];
      W === "big" ? (k[J] = $ >>> 24, k[J + 1] = $ >>> 16 & 255, k[J + 2] = $ >>> 8 & 255, k[J + 3] = $ & 255) : (k[J + 3] = $ >>> 24, k[J + 2] = $ >>> 16 & 255, k[J + 1] = $ >>> 8 & 255, k[J] = $ & 255);
    }
    return k;
  }
  e.split32 = S;
  function v(O, W) {
    return O >>> W | O << 32 - W;
  }
  e.rotr32 = v;
  function N(O, W) {
    return O << W | O >>> 32 - W;
  }
  e.rotl32 = N;
  function w(O, W) {
    return O + W >>> 0;
  }
  e.sum32 = w;
  function m(O, W, k) {
    return O + W + k >>> 0;
  }
  e.sum32_3 = m;
  function g(O, W, k, H) {
    return O + W + k + H >>> 0;
  }
  e.sum32_4 = g;
  function A(O, W, k, H, J) {
    return O + W + k + H + J >>> 0;
  }
  e.sum32_5 = A;
  function C(O, W, k, H) {
    var J = O[W], $ = H + O[W + 1] >>> 0;
    O[W] = ($ < H ? 1 : 0) + k + J >>> 0, O[W + 1] = $;
  }
  e.sum64 = C;
  function y(O, W, k, H) {
    return (W + H >>> 0 < W ? 1 : 0) + O + k >>> 0;
  }
  e.sum64_hi = y;
  function x(O, W, k, H) {
    return W + H >>> 0;
  }
  e.sum64_lo = x;
  function b(O, W, k, H, J, $, oe, Z) {
    var te = 0, V = W;
    return V = V + H >>> 0, te += V < W ? 1 : 0, V = V + $ >>> 0, te += V < $ ? 1 : 0, V = V + Z >>> 0, te += V < Z ? 1 : 0, O + k + J + oe + te >>> 0;
  }
  e.sum64_4_hi = b;
  function _(O, W, k, H, J, $, oe, Z) {
    return W + H + $ + Z >>> 0;
  }
  e.sum64_4_lo = _;
  function p(O, W, k, H, J, $, oe, Z, te, V) {
    var F = 0, X = W;
    return X = X + H >>> 0, F += X < W ? 1 : 0, X = X + $ >>> 0, F += X < $ ? 1 : 0, X = X + Z >>> 0, F += X < Z ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0, O + k + J + oe + te + F >>> 0;
  }
  e.sum64_5_hi = p;
  function P(O, W, k, H, J, $, oe, Z, te, V) {
    return W + H + $ + Z + V >>> 0;
  }
  e.sum64_5_lo = P;
  function M(O, W, k) {
    return (W << 32 - k | O >>> k) >>> 0;
  }
  e.rotr64_hi = M;
  function R(O, W, k) {
    return (O << 32 - k | W >>> k) >>> 0;
  }
  e.rotr64_lo = R;
  function q(O, W, k) {
    return O >>> k;
  }
  e.shr64_hi = q;
  function Q(O, W, k) {
    return (O << 32 - k | W >>> k) >>> 0;
  }
  e.shr64_lo = Q;
})), zt = /* @__PURE__ */ ce(((e) => {
  var t = He(), r = jt();
  function o() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  e.BlockHash = o, o.prototype.update = function(i, l) {
    if (i = t.toArray(i, l), this.pending ? this.pending = this.pending.concat(i) : this.pending = i, this.pendingTotal += i.length, this.pending.length >= this._delta8) {
      i = this.pending;
      var s = i.length % this._delta8;
      this.pending = i.slice(i.length - s, i.length), this.pending.length === 0 && (this.pending = null), i = t.join32(i, 0, i.length - s, this.endian);
      for (var f = 0; f < i.length; f += this._delta32) this._update(i, f, f + this._delta32);
    }
    return this;
  }, o.prototype.digest = function(i) {
    return this.update(this._pad()), r(this.pending === null), this._digest(i);
  }, o.prototype._pad = function() {
    var i = this.pendingTotal, l = this._delta8, s = l - (i + this.padLength) % l, f = new Array(s + this.padLength);
    f[0] = 128;
    for (var T = 1; T < s; T++) f[T] = 0;
    if (i <<= 3, this.endian === "big") {
      for (var S = 8; S < this.padLength; S++) f[T++] = 0;
      f[T++] = 0, f[T++] = 0, f[T++] = 0, f[T++] = 0, f[T++] = i >>> 24 & 255, f[T++] = i >>> 16 & 255, f[T++] = i >>> 8 & 255, f[T++] = i & 255;
    } else
      for (f[T++] = i & 255, f[T++] = i >>> 8 & 255, f[T++] = i >>> 16 & 255, f[T++] = i >>> 24 & 255, f[T++] = 0, f[T++] = 0, f[T++] = 0, f[T++] = 0, S = 8; S < this.padLength; S++) f[T++] = 0;
    return f;
  };
})), ei = /* @__PURE__ */ ce(((e) => {
  var t = He().rotr32;
  function r(S, v, N, w) {
    if (S === 0) return o(v, N, w);
    if (S === 1 || S === 3) return i(v, N, w);
    if (S === 2) return u(v, N, w);
  }
  e.ft_1 = r;
  function o(S, v, N) {
    return S & v ^ ~S & N;
  }
  e.ch32 = o;
  function u(S, v, N) {
    return S & v ^ S & N ^ v & N;
  }
  e.maj32 = u;
  function i(S, v, N) {
    return S ^ v ^ N;
  }
  e.p32 = i;
  function l(S) {
    return t(S, 2) ^ t(S, 13) ^ t(S, 22);
  }
  e.s0_256 = l;
  function s(S) {
    return t(S, 6) ^ t(S, 11) ^ t(S, 25);
  }
  e.s1_256 = s;
  function f(S) {
    return t(S, 7) ^ t(S, 18) ^ S >>> 3;
  }
  e.g0_256 = f;
  function T(S) {
    return t(S, 17) ^ t(S, 19) ^ S >>> 10;
  }
  e.g1_256 = T;
})), ks = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = zt(), u = ei(), i = r.rotl32, l = r.sum32, s = r.sum32_5, f = u.ft_1, T = o.BlockHash, S = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function v() {
    if (!(this instanceof v)) return new v();
    T.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(v, T), t.exports = v, v.blockSize = 512, v.outSize = 160, v.hmacStrength = 80, v.padLength = 64, v.prototype._update = function(w, m) {
    for (var g = this.W, A = 0; A < 16; A++) g[A] = w[m + A];
    for (; A < g.length; A++) g[A] = i(g[A - 3] ^ g[A - 8] ^ g[A - 14] ^ g[A - 16], 1);
    var C = this.h[0], y = this.h[1], x = this.h[2], b = this.h[3], _ = this.h[4];
    for (A = 0; A < g.length; A++) {
      var p = ~~(A / 20), P = s(i(C, 5), f(p, y, x, b), _, g[A], S[p]);
      _ = b, b = x, x = i(y, 30), y = C, C = P;
    }
    this.h[0] = l(this.h[0], C), this.h[1] = l(this.h[1], y), this.h[2] = l(this.h[2], x), this.h[3] = l(this.h[3], b), this.h[4] = l(this.h[4], _);
  }, v.prototype._digest = function(w) {
    return w === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), ti = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = zt(), u = ei(), i = jt(), l = r.sum32, s = r.sum32_4, f = r.sum32_5, T = u.ch32, S = u.maj32, v = u.s0_256, N = u.s1_256, w = u.g0_256, m = u.g1_256, g = o.BlockHash, A = [
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
  function C() {
    if (!(this instanceof C)) return new C();
    g.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = A, this.W = new Array(64);
  }
  r.inherits(C, g), t.exports = C, C.blockSize = 512, C.outSize = 256, C.hmacStrength = 192, C.padLength = 64, C.prototype._update = function(x, b) {
    for (var _ = this.W, p = 0; p < 16; p++) _[p] = x[b + p];
    for (; p < _.length; p++) _[p] = s(m(_[p - 2]), _[p - 7], w(_[p - 15]), _[p - 16]);
    var P = this.h[0], M = this.h[1], R = this.h[2], q = this.h[3], Q = this.h[4], O = this.h[5], W = this.h[6], k = this.h[7];
    for (i(this.k.length === _.length), p = 0; p < _.length; p++) {
      var H = f(k, N(Q), T(Q, O, W), this.k[p], _[p]), J = l(v(P), S(P, M, R));
      k = W, W = O, O = Q, Q = l(q, H), q = R, R = M, M = P, P = l(H, J);
    }
    this.h[0] = l(this.h[0], P), this.h[1] = l(this.h[1], M), this.h[2] = l(this.h[2], R), this.h[3] = l(this.h[3], q), this.h[4] = l(this.h[4], Q), this.h[5] = l(this.h[5], O), this.h[6] = l(this.h[6], W), this.h[7] = l(this.h[7], k);
  }, C.prototype._digest = function(x) {
    return x === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), Rs = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = ti();
  function u() {
    if (!(this instanceof u)) return new u();
    o.call(this), this.h = [
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
  r.inherits(u, o), t.exports = u, u.blockSize = 512, u.outSize = 224, u.hmacStrength = 192, u.padLength = 64, u.prototype._digest = function(l) {
    return l === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), ri = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = zt(), u = jt(), i = r.rotr64_hi, l = r.rotr64_lo, s = r.shr64_hi, f = r.shr64_lo, T = r.sum64, S = r.sum64_hi, v = r.sum64_lo, N = r.sum64_4_hi, w = r.sum64_4_lo, m = r.sum64_5_hi, g = r.sum64_5_lo, A = o.BlockHash, C = [
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
  function y() {
    if (!(this instanceof y)) return new y();
    A.call(this), this.h = [
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
    ], this.k = C, this.W = new Array(160);
  }
  r.inherits(y, A), t.exports = y, y.blockSize = 1024, y.outSize = 512, y.hmacStrength = 192, y.padLength = 128, y.prototype._prepareBlock = function(J, $) {
    for (var oe = this.W, Z = 0; Z < 32; Z++) oe[Z] = J[$ + Z];
    for (; Z < oe.length; Z += 2) {
      var te = W(oe[Z - 4], oe[Z - 3]), V = k(oe[Z - 4], oe[Z - 3]), F = oe[Z - 14], X = oe[Z - 13], Y = Q(oe[Z - 30], oe[Z - 29]), re = O(oe[Z - 30], oe[Z - 29]), de = oe[Z - 32], E = oe[Z - 31];
      oe[Z] = N(te, V, F, X, Y, re, de, E), oe[Z + 1] = w(te, V, F, X, Y, re, de, E);
    }
  }, y.prototype._update = function(J, $) {
    this._prepareBlock(J, $);
    var oe = this.W, Z = this.h[0], te = this.h[1], V = this.h[2], F = this.h[3], X = this.h[4], Y = this.h[5], re = this.h[6], de = this.h[7], E = this.h[8], h = this.h[9], j = this.h[10], U = this.h[11], ne = this.h[12], D = this.h[13], B = this.h[14], c = this.h[15];
    u(this.k.length === oe.length);
    for (var K = 0; K < oe.length; K += 2) {
      var I = B, n = c, a = R(E, h), d = q(E, h), L = x(E, h, j, U, ne), G = b(E, h, j, U, ne, D), z = this.k[K], ie = this.k[K + 1], le = oe[K], se = oe[K + 1], he = m(I, n, a, d, L, G, z, ie, le, se), me = g(I, n, a, d, L, G, z, ie, le, se);
      I = P(Z, te), n = M(Z, te), a = _(Z, te, V, F, X), d = p(Z, te, V, F, X, Y);
      var ge = S(I, n, a, d), Te = v(I, n, a, d);
      B = ne, c = D, ne = j, D = U, j = E, U = h, E = S(re, de, he, me), h = v(de, de, he, me), re = X, de = Y, X = V, Y = F, V = Z, F = te, Z = S(he, me, ge, Te), te = v(he, me, ge, Te);
    }
    T(this.h, 0, Z, te), T(this.h, 2, V, F), T(this.h, 4, X, Y), T(this.h, 6, re, de), T(this.h, 8, E, h), T(this.h, 10, j, U), T(this.h, 12, ne, D), T(this.h, 14, B, c);
  }, y.prototype._digest = function(J) {
    return J === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function x(H, J, $, oe, Z) {
    var te = H & $ ^ ~H & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function b(H, J, $, oe, Z, te) {
    var V = J & oe ^ ~J & te;
    return V < 0 && (V += 4294967296), V;
  }
  function _(H, J, $, oe, Z) {
    var te = H & $ ^ H & Z ^ $ & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function p(H, J, $, oe, Z, te) {
    var V = J & oe ^ J & te ^ oe & te;
    return V < 0 && (V += 4294967296), V;
  }
  function P(H, J) {
    var $ = i(H, J, 28), oe = i(J, H, 2), Z = i(J, H, 7), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function M(H, J) {
    var $ = l(H, J, 28), oe = l(J, H, 2), Z = l(J, H, 7), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function R(H, J) {
    var $ = i(H, J, 14), oe = i(H, J, 18), Z = i(J, H, 9), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function q(H, J) {
    var $ = l(H, J, 14), oe = l(H, J, 18), Z = l(J, H, 9), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function Q(H, J) {
    var $ = i(H, J, 1), oe = i(H, J, 8), Z = s(H, J, 7), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function O(H, J) {
    var $ = l(H, J, 1), oe = l(H, J, 8), Z = f(H, J, 7), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function W(H, J) {
    var $ = i(H, J, 19), oe = i(J, H, 29), Z = s(H, J, 6), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function k(H, J) {
    var $ = l(H, J, 19), oe = l(J, H, 29), Z = f(H, J, 6), te = $ ^ oe ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
})), Is = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = ri();
  function u() {
    if (!(this instanceof u)) return new u();
    o.call(this), this.h = [
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
  r.inherits(u, o), t.exports = u, u.blockSize = 1024, u.outSize = 384, u.hmacStrength = 192, u.padLength = 128, u.prototype._digest = function(l) {
    return l === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), Cs = /* @__PURE__ */ ce(((e) => {
  e.sha1 = ks(), e.sha224 = Rs(), e.sha256 = ti(), e.sha384 = Is(), e.sha512 = ri();
})), Ns = /* @__PURE__ */ ce(((e) => {
  var t = He(), r = zt(), o = t.rotl32, u = t.sum32, i = t.sum32_3, l = t.sum32_4, s = r.BlockHash;
  function f() {
    if (!(this instanceof f)) return new f();
    s.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.endian = "little";
  }
  t.inherits(f, s), e.ripemd160 = f, f.blockSize = 512, f.outSize = 160, f.hmacStrength = 192, f.padLength = 64, f.prototype._update = function(C, y) {
    for (var x = this.h[0], b = this.h[1], _ = this.h[2], p = this.h[3], P = this.h[4], M = x, R = b, q = _, Q = p, O = P, W = 0; W < 80; W++) {
      var k = u(o(l(x, T(W, b, _, p), C[N[W] + y], S(W)), m[W]), P);
      x = P, P = p, p = o(_, 10), _ = b, b = k, k = u(o(l(M, T(79 - W, R, q, Q), C[w[W] + y], v(W)), g[W]), O), M = O, O = Q, Q = o(q, 10), q = R, R = k;
    }
    k = i(this.h[1], _, Q), this.h[1] = i(this.h[2], p, O), this.h[2] = i(this.h[3], P, M), this.h[3] = i(this.h[4], x, R), this.h[4] = i(this.h[0], b, q), this.h[0] = k;
  }, f.prototype._digest = function(C) {
    return C === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function T(A, C, y, x) {
    return A <= 15 ? C ^ y ^ x : A <= 31 ? C & y | ~C & x : A <= 47 ? (C | ~y) ^ x : A <= 63 ? C & x | y & ~x : C ^ (y | ~x);
  }
  function S(A) {
    return A <= 15 ? 0 : A <= 31 ? 1518500249 : A <= 47 ? 1859775393 : A <= 63 ? 2400959708 : 2840853838;
  }
  function v(A) {
    return A <= 15 ? 1352829926 : A <= 31 ? 1548603684 : A <= 47 ? 1836072691 : A <= 63 ? 2053994217 : 0;
  }
  var N = [
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
  ], w = [
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
  ], m = [
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
})), Os = /* @__PURE__ */ ce(((e, t) => {
  var r = He(), o = jt();
  function u(i, l, s) {
    if (!(this instanceof u)) return new u(i, l, s);
    this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(l, s));
  }
  t.exports = u, u.prototype._init = function(l) {
    l.length > this.blockSize && (l = new this.Hash().update(l).digest()), o(l.length <= this.blockSize);
    for (var s = l.length; s < this.blockSize; s++) l.push(0);
    for (s = 0; s < l.length; s++) l[s] ^= 54;
    for (this.inner = new this.Hash().update(l), s = 0; s < l.length; s++) l[s] ^= 106;
    this.outer = new this.Hash().update(l);
  }, u.prototype.update = function(l, s) {
    return this.inner.update(l, s), this;
  }, u.prototype.digest = function(l) {
    return this.outer.update(this.inner.digest()), this.outer.digest(l);
  };
})), Ps = /* @__PURE__ */ Fr((/* @__PURE__ */ ce(((e) => {
  var t = e;
  t.utils = He(), t.common = zt(), t.sha = Cs(), t.ripemd = Ns(), t.hmac = Os(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})))()), Fs = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Ds = (e, t = 21) => (r = t) => {
  let o = "", u = r | 0;
  for (; u--; ) o += e[Math.random() * e.length | 0];
  return o;
}, Bs = (e = 21) => {
  let t = "", r = e | 0;
  for (; r--; ) t += Fs[Math.random() * 64 | 0];
  return t;
}, De = (e) => Math.floor(e * 72 * 20), or = (e = 0) => {
  let t = e;
  return () => ++t;
}, Ls = () => or(), Ms = () => or(1), Us = () => or(), js = () => or(), ni = () => Bs().toLowerCase(), nn = (e) => Ps.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), kt = (e) => Ds("1234567890abcdef", e)(), zs = () => `${kt(8)}-${kt(4)}-${kt(4)}-${kt(4)}-${kt(12)}`, mr = (e) => new Uint8Array(new TextEncoder().encode(e)), Ws = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Hs = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Gs = () => new fe({
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
}), ii = (e) => new fe({
  name: "wp:align",
  children: [e]
}), ai = (e) => new fe({
  name: "wp:posOffset",
  children: [e.toString()]
}), Ks = ({ relative: e, align: t, offset: r }) => new fe({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Ws.PAGE
  } },
  children: [(() => {
    if (t) return ii(t);
    if (r !== void 0) return ai(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), qs = ({ relative: e, align: t, offset: r }) => new fe({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Hs.PAGE
  } },
  children: [(() => {
    if (t) return ii(t);
    if (r !== void 0) return ai(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Vs = (e = {}) => {
  var t, r, o, u;
  return new fe({
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
        value: (o = e.margins) === null || o === void 0 ? void 0 : o.top
      },
      bIns: {
        key: "bIns",
        value: (u = e.margins) === null || u === void 0 ? void 0 : u.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new ue("a:noAutofit", e.noAutoFit)] : []]
  });
}, $s = (e = { txBox: "1" }) => new fe({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), Xs = (e) => new fe({
  name: "w:txbxContent",
  children: [...e]
}), Zs = (e) => new fe({
  name: "wps:txbx",
  children: [Xs(e)]
}), Ys = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, Js = class extends ae {
  constructor(e, t) {
    super("a:ext"), ee(this, "attributes", void 0), this.attributes = new Ys({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, Qs = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, eo = class extends ae {
  constructor(e, t) {
    super("a:off"), this.root.push(new Qs({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, to = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, si = class extends ae {
  constructor(e) {
    var t, r, o, u;
    super("a:xfrm"), ee(this, "extents", void 0), ee(this, "offset", void 0), this.root.push(new to({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new eo((o = e.offset) === null || o === void 0 || (o = o.emus) === null || o === void 0 ? void 0 : o.x, (u = e.offset) === null || u === void 0 || (u = u.emus) === null || u === void 0 ? void 0 : u.y), this.extents = new Js(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, oi = () => new fe({ name: "a:noFill" }), ro = (e) => new fe({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), no = (e) => new fe({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), Nr = (e) => new fe({
  name: "a:solidFill",
  children: [e.type === "rgb" ? ro(e) : no(e)]
}), io = (e) => new fe({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine
    },
    align: {
      key: "algn",
      value: e.align
    }
  },
  children: [e.type === "noFill" ? oi() : e.solidFillType === "rgb" ? Nr({
    type: "rgb",
    value: e.value
  }) : Nr({
    type: "scheme",
    value: e.value
  })]
}), ao = class extends ae {
  constructor() {
    super("a:avLst");
  }
}, so = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { prst: "prst" });
  }
}, oo = class extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(new so({ prst: "rect" })), this.root.push(new ao());
  }
}, lo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, li = class extends ae {
  constructor({ element: e, outline: t, solidFill: r, transform: o }) {
    super(`${e}:spPr`), ee(this, "form", void 0), this.root.push(new lo({ bwMode: "auto" })), this.form = new si(o), this.root.push(this.form), this.root.push(new oo()), t && (this.root.push(oi()), this.root.push(io(t))), r && this.root.push(Nr(r));
  }
}, an = (e) => new fe({
  name: "wps:wsp",
  children: [
    $s(e.nonVisualProperties),
    new li({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    Zs(e.children),
    Vs(e.bodyProperties)
  ]
}), wr = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { uri: "uri" });
  }
}, uo = (e) => new fe({
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
}), co = (e) => new fe({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [uo(e)]
}), ho = (e) => new fe({
  name: "a:extLst",
  children: [co(e)]
}), fo = (e) => new fe({
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
  children: e.type === "svg" ? [ho(e)] : []
}), po = class extends ae {
  constructor() {
    super("a:srcRect");
  }
}, mo = class extends ae {
  constructor() {
    super("a:fillRect");
  }
}, wo = class extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new mo());
  }
}, go = class extends ae {
  constructor(e) {
    super("pic:blipFill"), this.root.push(fo(e)), this.root.push(new po()), this.root.push(new wo());
  }
}, vo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, yo = class extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(new vo({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, bo = class extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new yo());
  }
}, ui = (e, t) => new fe({
  name: "a:hlinkClick",
  attributes: pe(pe({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), _o = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, xo = class extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(new _o({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(e) {
    for (let t = e.stack.length - 1; t >= 0; t--) {
      const r = e.stack[t];
      if (r instanceof lr) {
        this.root.push(ui(r.linkId, !1));
        break;
      }
    }
    return super.prepForXml(e);
  }
}, Eo = class extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new xo()), this.root.push(new bo());
  }
}, To = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, sn = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r }) {
    super("pic:pic"), this.root.push(new To({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new Eo()), this.root.push(new go(e)), this.root.push(new li({
      element: "pic",
      transform: t,
      outline: r
    }));
  }
}, So = (e) => new fe({
  name: "wpg:grpSpPr",
  children: [new si(e)]
}), Ao = () => new fe({ name: "wpg:cNvGrpSpPr" }), ko = (e) => new fe({
  name: "wpg:wgp",
  children: [
    Ao(),
    So(e.transformation),
    ...e.children
  ]
}), Ro = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: o }) {
    if (super("a:graphicData"), e.type === "wps") {
      this.root.push(new wr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const u = an(pe(pe({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: o
      }));
      this.root.push(u);
    } else if (e.type === "wpg") {
      this.root.push(new wr({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const u = ko({
        children: e.children.map((i) => i.type === "wps" ? an(pe(pe({}, i.data), {}, {
          transformation: i.transformation,
          outline: i.outline,
          solidFill: i.solidFill
        })) : new sn({
          mediaData: i,
          transform: i.transformation,
          outline: i.outline
        })),
        transformation: t
      });
      this.root.push(u);
    } else {
      this.root.push(new wr({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const u = new sn({
        mediaData: e,
        transform: t,
        outline: r
      });
      this.root.push(u);
    }
  }
}, Io = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { a: "xmlns:a" });
  }
}, ci = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: o }) {
    super("a:graphic"), ee(this, "data", void 0), this.root.push(new Io({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new Ro({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: o
    }), this.root.push(this.data);
  }
}, Vt = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
}, Co = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, on = () => new fe({ name: "wp:wrapNone" }), No = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new fe({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: e.side || Co.BOTH_SIDES
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
}), Oo = (e = {
  top: 0,
  bottom: 0
}) => new fe({
  name: "wp:wrapTight",
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
}), Po = (e = {
  top: 0,
  bottom: 0
}) => new fe({
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
}), hi = class extends ae {
  constructor({ name: e, description: t, title: r, id: o } = {
    name: "",
    description: "",
    title: ""
  }) {
    super("wp:docPr"), ee(this, "docPropertiesUniqueNumericId", Us());
    const u = {
      id: {
        key: "id",
        value: o ?? this.docPropertiesUniqueNumericId()
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
    }), this.root.push(new En(u));
  }
  prepForXml(e) {
    for (let t = e.stack.length - 1; t >= 0; t--) {
      const r = e.stack[t];
      if (r instanceof lr) {
        this.root.push(ui(r.linkId, !0));
        break;
      }
    }
    return super.prepForXml(e);
  }
}, fi = ({ top: e, right: t, bottom: r, left: o }) => new fe({
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
      value: o
    }
  }
}), di = ({ x: e, y: t }) => new fe({
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
}), Fo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, Do = class extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Fo({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, pi = () => new fe({
  name: "wp:cNvGraphicFramePr",
  children: [new Do()]
}), Bo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Lo = class extends ae {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    super("wp:anchor");
    const o = pe({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Bo({
      distT: o.margins && o.margins.top || 0,
      distB: o.margins && o.margins.bottom || 0,
      distL: o.margins && o.margins.left || 0,
      distR: o.margins && o.margins.right || 0,
      simplePos: "0",
      allowOverlap: o.allowOverlap === !0 ? "1" : "0",
      behindDoc: o.behindDocument === !0 ? "1" : "0",
      locked: o.lockAnchor === !0 ? "1" : "0",
      layoutInCell: o.layoutInCell === !0 ? "1" : "0",
      relativeHeight: o.zIndex ? o.zIndex : t.emus.y
    })), this.root.push(Gs()), this.root.push(Ks(o.horizontalPosition)), this.root.push(qs(o.verticalPosition)), this.root.push(di({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push(fi({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Vt.SQUARE:
        this.root.push(No(r.floating.wrap, r.floating.margins));
        break;
      case Vt.TIGHT:
        this.root.push(Oo(r.floating.margins));
        break;
      case Vt.TOP_AND_BOTTOM:
        this.root.push(Po(r.floating.margins));
        break;
      case Vt.NONE:
      default:
        this.root.push(on());
    }
    else this.root.push(on());
    this.root.push(new hi(r.docProperties)), this.root.push(pi()), this.root.push(new ci({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill
    }));
  }
}, Mo = ({ mediaData: e, transform: t, docProperties: r, outline: o, solidFill: u }) => {
  var i, l, s, f;
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
      di({
        x: t.emus.x,
        y: t.emus.y
      }),
      fi(o ? {
        top: ((i = o.width) !== null && i !== void 0 ? i : 9525) * 2,
        right: ((l = o.width) !== null && l !== void 0 ? l : 9525) * 2,
        bottom: ((s = o.width) !== null && s !== void 0 ? s : 9525) * 2,
        left: ((f = o.width) !== null && f !== void 0 ? f : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }),
      new hi(r),
      pi(),
      new ci({
        mediaData: e,
        transform: t,
        outline: o,
        solidFill: u
      })
    ]
  });
}, Uo = class extends ae {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Lo({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(Mo({
      mediaData: e,
      transform: e.transformation,
      docProperties: t.docProperties,
      outline: t.outline,
      solidFill: t.solidFill
    }));
  }
}, jo = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((o) => o.charCodeAt(0)));
}, zo = (e) => typeof e == "string" ? jo(e) : e, gr = (e, t) => ({
  data: zo(e.data),
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
}), Wo = class extends ae {
  constructor(e) {
    var t = (...l) => (super(...l), ee(this, "imageData", void 0), this);
    const r = `${nn(e.data)}.${e.type}`, o = e.type === "svg" ? pe(pe({ type: e.type }, gr(e, r)), {}, { fallback: pe({ type: e.fallback.type }, gr(pe(pe({}, e.fallback), {}, { transformation: e.transformation }), `${nn(e.fallback.data)}.${e.fallback.type}`)) }) : pe({ type: e.type }, gr(e, r)), u = new Uo(o, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline
    }), i = new We({ children: [u] });
    e.insertion ? (t("w:ins"), this.root.push(new Oe({
      id: e.insertion.id,
      author: e.insertion.author,
      date: e.insertion.date
    })), this.addChildElement(i)) : e.deletion ? (t("w:del"), this.root.push(new Oe({
      id: e.deletion.id,
      author: e.deletion.author,
      date: e.deletion.date
    })), this.addChildElement(i)) : (t("w:r"), this.root.push(new rt({})), this.root.push(u)), this.imageData = o;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, Ho = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Go = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, Ko = (e, t, r, o) => new fe({
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
      value: o
    }
  }
}), nt = class extends ae {
  constructor() {
    super("Relationships"), this.root.push(new Ho({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(e, t, r, o) {
    this.root.push(Ko(`rId${e}`, t, r, o));
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, qo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, Vo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, ln = class extends ae {
  constructor({ id: e, initials: t, author: r, date: o = /* @__PURE__ */ new Date(), children: u }, i) {
    super("w:comment"), ee(this, "paraId", void 0), this.paraId = i, this.root.push(new qo({
      id: e,
      initials: t,
      author: r,
      date: o.toISOString()
    }));
    for (const l of u) this.root.push(l);
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
    for (let o = r.length - 1; o >= 0; o--) {
      const u = r[o];
      if (u && typeof u == "object" && "w:p" in u) {
        const i = u["w:p"];
        Array.isArray(i) && i.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, $o = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), Xo = class extends ae {
  constructor({ children: e }) {
    if (super("w:comments"), ee(this, "relationships", void 0), ee(this, "threadData", void 0), this.root.push(new Vo({
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
    })), e.some((t) => t.parentId !== void 0)) {
      const t = new Map(e.map((r) => [r.id, $o(r.id)]));
      for (const r of e) this.root.push(new ln(r, t.get(r.id)));
      this.threadData = e.map((r) => ({
        paraId: t.get(r.id),
        parentParaId: r.parentId !== void 0 ? t.get(r.parentId) : void 0,
        done: r.resolved
      }));
    } else for (const t of e) this.root.push(new ln(t));
    this.relationships = new nt();
  }
  get Relationships() {
    return this.relationships;
  }
  /** Thread data for commentsExtended.xml, or undefined when no comments use parentId. */
  get ThreadData() {
    return this.threadData;
  }
}, Zo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Yo = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, Jo = class extends ae {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new Yo({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, Qo = class extends ae {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new Zo({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new Jo(t));
  }
}, el = class extends Zn {
  constructor() {
    super("w:endnoteRef");
  }
}, mi = class extends Zn {
  constructor() {
    super("w:tab");
  }
}, Yt = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, Or = {
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
}, tl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, rl = class extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(new tl({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, nl = class extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}, bt = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, il = ({ after: e, before: t, line: r, lineRule: o, beforeAutoSpacing: u, afterAutoSpacing: i }) => new fe({
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
      value: o
    },
    beforeAutoSpacing: {
      key: "w:beforeAutospacing",
      value: u
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
}, Pt = (e) => new fe({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Pe = {
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
}, Rt = {
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
}, al = ({ type: e, position: t, leader: r }) => new fe({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    pos: {
      key: "w:pos",
      value: t
    },
    leader: {
      key: "w:leader",
      value: r
    }
  }
}), sl = (e) => new fe({
  name: "w:tabs",
  children: e.map((t) => al(t))
}), vr = class extends ae {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new ol(t)), this.root.push(new ll(e));
  }
}, ol = class extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Re({ val: e }));
  }
}, ll = class extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(new Re({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, $r = class extends ae {
  constructor(...e) {
    super(...e), ee(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, ul = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, lr = class extends ae {
  constructor(e, t, r) {
    super("w:hyperlink"), ee(this, "linkId", void 0), this.linkId = t;
    const o = new ul({
      history: 1,
      anchor: r || void 0,
      id: r ? void 0 : `rId${this.linkId}`
    });
    this.root.push(o), e.forEach((u) => {
      this.root.push(u);
    });
  }
}, wi = class extends lr {
  constructor(e) {
    super(e.children, ni(), e.anchor);
  }
}, gi = class extends ae {
  constructor(e) {
    super("w:externalHyperlink"), ee(this, "options", void 0), this.options = e;
  }
}, cl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, hl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { id: "w:id" });
  }
}, vi = class {
  constructor(e) {
    ee(this, "bookmarkUniqueNumericId", js()), ee(this, "start", void 0), ee(this, "children", void 0), ee(this, "end", void 0);
    const t = this.bookmarkUniqueNumericId();
    this.start = new fl(e.id, t), this.children = e.children, this.end = new dl(t);
  }
}, fl = class extends ae {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new cl({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, dl = class extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new hl({ id: e });
    this.root.push(t);
  }
}, pl = (e) => new fe({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), $t = ({ id: e, fontKey: t, subsetted: r }, o) => new fe({
  name: o,
  attributes: pe({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t}}`
  } } : {}),
  children: [...r ? [new ue("w:subsetted", r)] : []]
}), ml = ({ name: e, altName: t, panose1: r, charset: o, family: u, notTrueType: i, pitch: l, sig: s, embedRegular: f, embedBold: T, embedItalic: S, embedBoldItalic: v }) => new fe({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [At("w:altName", t)] : [],
    ...r ? [At("w:panose1", r)] : [],
    ...o ? [At("w:charset", o)] : [],
    At("w:family", u),
    ...i ? [new ue("w:notTrueType", i)] : [],
    At("w:pitch", l),
    ...s ? [new fe({
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
    ...f ? [$t(f, "w:embedRegular")] : [],
    ...T ? [$t(T, "w:embedBold")] : [],
    ...S ? [$t(S, "w:embedItalic")] : [],
    ...v ? [$t(v, "w:embedBoldItalic")] : []
  ]
}), wl = ({ name: e, index: t, fontKey: r, characterSet: o }) => ml({
  name: e,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: o,
  family: "auto",
  pitch: "variable",
  embedRegular: {
    fontKey: r,
    id: `rId${t}`
  }
}), gl = (e) => new fe({
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
  children: e.map((t, r) => wl({
    name: t.name,
    index: r + 1,
    fontKey: t.fontKey,
    characterSet: t.characterSet
  }))
}), yi = class {
  constructor(e) {
    ee(this, "options", void 0), ee(this, "fontTable", void 0), ee(this, "relationships", void 0), ee(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((t) => pe(pe({}, t), {}, { fontKey: zs() })), this.fontTable = gl(this.fontOptionsWithKey), this.relationships = new nt();
    for (let t = 0; t < e.length; t++) this.relationships.addRelationship(t + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${t + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, vl = () => new fe({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), yl = (e) => {
  var t, r;
  return new fe({
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
}, ft = class extends Qe {
  constructor(e) {
    if (super("w:pPr", e?.includeIfEmpty), ee(this, "numberingReferences", []), !e) return this;
    if (e.heading && this.push(Pt(e.heading)), e.bullet && this.push(Pt("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(Pt("ListParagraph"))), e.style && this.push(Pt(e.style)), e.keepNext !== void 0 && this.push(new ue("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ue("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new nl()), e.frame && this.push(yl(e.frame)), e.widowControl !== void 0 && this.push(new ue("w:widowControl", e.widowControl)), e.bullet && this.push(new vr(1, e.bullet.level)), e.numbering) {
      var t, r;
      this.numberingReferences.push({
        reference: e.numbering.reference,
        instance: (t = e.numbering.instance) !== null && t !== void 0 ? t : 0
      }), this.push(new vr(`${e.numbering.reference}-${(r = e.numbering.instance) !== null && r !== void 0 ? r : 0}`, e.numbering.level));
    } else e.numbering === !1 && this.push(new vr(0, 0));
    e.border && this.push(new is(e.border)), e.thematicBreak && this.push(new as()), e.shading && this.push(sr(e.shading)), e.wordWrap && this.push(vl()), e.overflowPunctuation && this.push(new ue("w:overflowPunct", e.overflowPunctuation));
    const o = [
      ...e.rightTabStop !== void 0 ? [{
        type: Pe.RIGHT,
        position: e.rightTabStop
      }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{
        type: Pe.LEFT,
        position: e.leftTabStop
      }] : []
    ];
    o.length > 0 && this.push(sl(o)), e.bidirectional !== void 0 && this.push(new ue("w:bidi", e.bidirectional)), e.spacing && this.push(il(e.spacing)), e.indent && this.push(ss(e.indent)), e.contextualSpacing !== void 0 && this.push(new ue("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Yn(e.alignment)), e.outlineLevel !== void 0 && this.push(pl(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ue("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ue("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Ss(e.run)), e.revision && this.push(new bl(e.revision));
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
    if (!(e.viewWrapper instanceof yi)) for (const t of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t.reference, t.instance);
    return super.prepForXml(e);
  }
}, bl = class extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new ft(pe(pe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Ee = class extends $r {
  constructor(e) {
    if (super("w:p"), ee(this, "properties", void 0), typeof e == "string")
      return this.properties = new ft({}), this.root.push(this.properties), this.root.push(new Ce(e)), this;
    if (this.properties = new ft(e), this.root.push(this.properties), e.text && this.root.push(new Ce(e.text)), e.children) for (const t of e.children) {
      if (t instanceof vi) {
        this.root.push(t.start);
        for (const r of t.children) this.root.push(r);
        this.root.push(t.end);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof gi) {
      const r = this.root.indexOf(t), o = new lr(t.options.children, ni());
      e.viewWrapper.Relationships.addRelationship(o.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", t.options.link, Go.EXTERNAL), this.root[r] = o;
    }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}, _l = (e) => new fe({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: Ae(e)
  } } : void 0
}), bi = class extends ae {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(_l(r));
    t && this.root.push(new El(t));
  }
}, xl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { id: "w:id" });
  }
}, El = class extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new xl({ id: e.id })), this.root.push(new bi(e.columnWidths));
  }
}, Tl = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Sl = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Al = class extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, kl = class extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Rl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Il = class extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new Rl(e));
  }
}, Cl = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, Nl = pe(pe({}, Cl), {}, { BOTH: "both" }), Ft = Nl, _i = (e) => new fe({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), xi = ({ marginUnitType: e = je.DXA, top: t, left: r, bottom: o, right: u }) => [
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
    size: o
  },
  {
    name: "w:right",
    size: u
  }
].filter((i) => i.size !== void 0).map(({ name: i, size: l }) => tr(i, {
  type: e,
  size: l
})), Ol = (e) => {
  const t = xi(e);
  if (t.length !== 0)
    return new fe({
      name: "w:tblCellMar",
      children: t
    });
}, Pl = (e) => {
  const t = xi(e);
  if (t.length !== 0)
    return new fe({
      name: "w:tcMar",
      children: t
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
}, tr = (e, { type: t = je.AUTO, size: r }) => {
  let o = r;
  return t === je.PERCENTAGE && typeof r == "number" && (o = `${r}%`), new fe({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: Xn(o)
      }
    }
  });
}, Fl = class extends Qe {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}, Dl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, Bl = class extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new Dl({ val: ke(e) }));
  }
}, Ei = {
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
}, Ll = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, un = class extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(new Ll({ val: e }));
  }
}, Ml = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, Ul = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Ml({ val: e }));
  }
}, Ti = class extends Qe {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), e.width && this.root.push(tr("w:tcW", e.width)), e.columnSpan && this.root.push(new Bl(e.columnSpan)), e.verticalMerge ? this.root.push(new un(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new un(Ei.RESTART)), e.borders && this.root.push(new Fl(e.borders)), e.shading && this.root.push(sr(e.shading)), e.margins) {
      const t = Pl(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new Ul(e.textDirection)), e.verticalAlign && this.root.push(_i(e.verticalAlign)), e.insertion && this.root.push(new Al(e.insertion)), e.deletion && this.root.push(new kl(e.deletion)), e.revision && this.root.push(new jl(e.revision)), e.cellMerge && this.root.push(new Il(e.cellMerge));
  }
}, jl = class extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ti(pe(pe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Xr = class extends ae {
  constructor(e) {
    super("w:tc"), ee(this, "options", void 0), this.options = e, this.root.push(new Ti(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof Ee || this.root.push(new Ee({})), super.prepForXml(e);
  }
}, pt = {
  style: Fe.NONE,
  size: 0,
  color: "auto"
}, mt = {
  style: Fe.SINGLE,
  size: 4,
  color: "auto"
}, Si = class extends ae {
  constructor(e) {
    var t, r, o, u, i, l;
    super("w:tblBorders"), this.root.push(be("w:top", (t = e.top) !== null && t !== void 0 ? t : mt)), this.root.push(be("w:left", (r = e.left) !== null && r !== void 0 ? r : mt)), this.root.push(be("w:bottom", (o = e.bottom) !== null && o !== void 0 ? o : mt)), this.root.push(be("w:right", (u = e.right) !== null && u !== void 0 ? u : mt)), this.root.push(be("w:insideH", (i = e.insideHorizontal) !== null && i !== void 0 ? i : mt)), this.root.push(be("w:insideV", (l = e.insideVertical) !== null && l !== void 0 ? l : mt));
  }
};
ee(Si, "NONE", {
  top: pt,
  bottom: pt,
  left: pt,
  right: pt,
  insideHorizontal: pt,
  insideVertical: pt
});
var zl = (e) => new fe({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Wl = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: o, absoluteVerticalPosition: u, relativeVerticalPosition: i, bottomFromText: l, topFromText: s, leftFromText: f, rightFromText: T, overlap: S }) => new fe({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: f === void 0 ? void 0 : Ae(f)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: T === void 0 ? void 0 : Ae(T)
    },
    topFromText: {
      key: "w:topFromText",
      value: s === void 0 ? void 0 : Ae(s)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: l === void 0 ? void 0 : Ae(l)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : $e(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: u === void 0 ? void 0 : $e(u)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: e
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: o
    },
    relativeVerticalPosition: {
      key: "w:tblpYSpec",
      value: i
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: t
    }
  },
  children: S ? [zl(S)] : void 0
}), yr = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, Hl = (e) => new fe({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), Gl = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, Ai = ({ type: e = Gl.DXA, value: t }) => new fe({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: Xn(t)
    }
  }
}), Kl = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: o, noHBand: u, noVBand: i }) => new fe({
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
      value: o
    },
    noHBand: {
      key: "w:noHBand",
      value: u
    },
    noVBand: {
      key: "w:noVBand",
      value: i
    }
  }
}), ki = class extends Qe {
  constructor(e) {
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new Je("w:tblStyle", e.style)), e.float && this.root.push(Wl(e.float)), e.visuallyRightToLeft !== void 0 && this.root.push(new ue("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(tr("w:tblW", e.width)), e.alignment && this.root.push(Yn(e.alignment)), e.indent && this.root.push(tr("w:tblInd", e.indent)), e.borders && this.root.push(new Si(e.borders)), e.shading && this.root.push(sr(e.shading)), e.layout && this.root.push(Hl(e.layout)), e.cellMargin) {
      const t = Ol(e.cellMargin);
      t && this.root.push(t);
    }
    e.tableLook && this.root.push(Kl(e.tableLook)), e.cellSpacing && this.root.push(Ai(e.cellSpacing)), e.revision && this.root.push(new ql(e.revision));
  }
}, ql = class extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new ki(pe(pe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Vl = class extends $r {
  constructor({ rows: e, width: t, columnWidths: r = Array(Math.max(...e.map((g) => g.CellCount))).fill(100), columnWidthsRevision: o, margins: u, indent: i, float: l, layout: s, style: f, borders: T, alignment: S, visuallyRightToLeft: v, tableLook: N, cellSpacing: w, revision: m }) {
    super("w:tbl"), this.root.push(new ki({
      borders: T ?? {},
      width: t ?? { size: 100 },
      indent: i,
      float: l,
      layout: s,
      style: f,
      alignment: S,
      cellMargin: u,
      visuallyRightToLeft: v,
      tableLook: N,
      cellSpacing: w,
      revision: m
    })), this.root.push(new bi(r, o));
    for (const g of e) this.root.push(g);
    e.forEach((g, A) => {
      if (A === e.length - 1) return;
      let C = 0;
      g.cells.forEach((y) => {
        if (y.options.rowSpan && y.options.rowSpan > 1) {
          const x = new Xr({
            rowSpan: y.options.rowSpan - 1,
            columnSpan: y.options.columnSpan,
            borders: y.options.borders,
            children: [],
            verticalMerge: Ei.CONTINUE
          });
          e[A + 1].addCellToColumnIndex(x, C);
        }
        C += y.options.columnSpan || 1;
      });
    });
  }
}, $l = (e, t) => new fe({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: Ae(e)
    },
    rule: {
      key: "w:hRule",
      value: t
    }
  }
}), Ri = class extends Qe {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(new ue("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(new ue("w:tblHeader", e.tableHeader)), e.height && this.root.push($l(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(Ai(e.cellSpacing)), e.insertion && this.root.push(new Tl(e.insertion)), e.deletion && this.root.push(new Sl(e.deletion)), e.revision && this.root.push(new Xl(e.revision));
  }
}, Xl = class extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ri(pe(pe({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Zl = class extends ae {
  constructor(e) {
    super("w:tr"), ee(this, "options", void 0), this.options = e, this.root.push(new Ri(e));
    for (const t of e.children) this.root.push(t);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof Xr);
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
      const o = this.root[r];
      t += o.options.columnSpan || 1;
    }
    return t;
  }
  columnIndexToRootIndex(e, t = !1) {
    if (e < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let r = 0, o = 1;
    for (; r <= e; ) {
      if (o >= this.root.length) {
        if (t) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${r - 1}`);
      }
      const u = this.root[o];
      o += 1, r += u && u.options.columnSpan || 1;
    }
    return o - 1;
  }
}, Yl = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Jl = class extends ae {
  constructor() {
    super("Properties"), this.root.push(new Yl({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, Ql = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, qe = (e, t) => new fe({
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
}), Ne = (e, t) => new fe({
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
}), eu = class extends ae {
  constructor() {
    super("Types"), this.root.push(new Ql({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(qe("image/png", "png")), this.root.push(qe("image/jpeg", "jpeg")), this.root.push(qe("image/jpeg", "jpg")), this.root.push(qe("image/bmp", "bmp")), this.root.push(qe("image/gif", "gif")), this.root.push(qe("image/svg+xml", "svg")), this.root.push(qe("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(qe("application/xml", "xml")), this.root.push(qe("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ne("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(e) {
    this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(e) {
    this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, cn = {
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
}, ur = class extends we {
  constructor(e, t) {
    super(pe({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, cn[r]])))), ee(this, "xmlKeys", pe({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(cn).map((r) => [r, `xmlns:${r}`]))));
  }
}, tu = class extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new ur([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new at("dc:title", e.title)), e.subject && this.root.push(new at("dc:subject", e.subject)), e.creator && this.root.push(new at("dc:creator", e.creator)), e.keywords && this.root.push(new at("cp:keywords", e.keywords)), e.description && this.root.push(new at("dc:description", e.description)), e.lastModifiedBy && this.root.push(new at("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new at("cp:revision", String(e.revision))), this.root.push(new hn("dcterms:created")), this.root.push(new hn("dcterms:modified"));
  }
}, ru = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { type: "xsi:type" });
  }
}, hn = class extends ae {
  constructor(e) {
    super(e), this.root.push(new ru({ type: "dcterms:W3CDTF" })), this.root.push(ns(/* @__PURE__ */ new Date()));
  }
}, nu = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, iu = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, au = class extends ae {
  constructor(e, t) {
    super("property"), this.root.push(new iu({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new su(t.value));
  }
}, su = class extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, ou = class extends ae {
  constructor(e) {
    super("Properties"), ee(this, "nextId", void 0), ee(this, "properties", []), this.root.push(new nu({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.properties.forEach((t) => this.root.push(t)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new au(this.nextId++, e));
  }
}, lu = ({ space: e, count: t, separate: r, equalWidth: o, children: u }) => new fe({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : Ae(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : ke(t)
    },
    separate: {
      key: "w:sep",
      value: r
    },
    equalWidth: {
      key: "w:equalWidth",
      value: o
    }
  },
  children: !o && u ? u : void 0
}), uu = ({ type: e, linePitch: t, charSpace: r }) => new fe({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: ke(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? ke(r) : void 0
    }
  }
}), gt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, fn = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, br = (e, t) => new fe({
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
}), cu = ({ countBy: e, start: t, restart: r, distance: o }) => new fe({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : ke(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : ke(t)
    },
    restart: {
      key: "w:restart",
      value: r
    },
    distance: {
      key: "w:distance",
      value: o === void 0 ? void 0 : Ae(o)
    }
  }
}), dn = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, hu = class extends Qe {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new dn({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new dn({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}, fu = (e, t, r, o, u, i, l) => new fe({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: $e(e)
    },
    right: {
      key: "w:right",
      value: Ae(t)
    },
    bottom: {
      key: "w:bottom",
      value: $e(r)
    },
    left: {
      key: "w:left",
      value: Ae(o)
    },
    header: {
      key: "w:header",
      value: Ae(u)
    },
    footer: {
      key: "w:footer",
      value: Ae(i)
    },
    gutter: {
      key: "w:gutter",
      value: Ae(l)
    }
  }
}), du = ({ start: e, formatType: t, separator: r }) => new fe({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : ke(e)
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
}), Pr = {
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
}, pu = ({ width: e, height: t, orientation: r, code: o }) => {
  const u = Ae(e), i = Ae(t);
  return new fe({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === Pr.LANDSCAPE ? i : u
      },
      height: {
        key: "w:h",
        value: r === Pr.LANDSCAPE ? u : i
      },
      orientation: {
        key: "w:orient",
        value: r
      },
      code: {
        key: "w:code",
        value: o
      }
    }
  });
}, mu = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, wu = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new mu({ val: e }));
  }
}, gu = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, vu = (e) => new fe({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), st = {
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
}, _r = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: Pr.PORTRAIT
}, Ii = class extends ae {
  constructor({ page: { size: { width: e = _r.WIDTH, height: t = _r.HEIGHT, orientation: r = _r.ORIENTATION, code: o } = {}, margin: { top: u = st.TOP, right: i = st.RIGHT, bottom: l = st.BOTTOM, left: s = st.LEFT, header: f = st.HEADER, footer: T = st.FOOTER, gutter: S = st.GUTTER } = {}, pageNumbers: v = {}, borders: N, textDirection: w } = {}, grid: { linePitch: m = 360, charSpace: g, type: A } = {}, headerWrapperGroup: C = {}, footerWrapperGroup: y = {}, lineNumbers: x, titlePage: b, verticalAlign: _, column: p, type: P, revision: M } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(fn.HEADER, C), this.addHeaderFooterGroup(fn.FOOTER, y), P && this.root.push(vu(P)), this.root.push(pu({
      width: e,
      height: t,
      orientation: r,
      code: o
    })), this.root.push(fu(u, i, l, s, f, T, S)), N && this.root.push(new hu(N)), x && this.root.push(cu(x)), this.root.push(du(v)), p && this.root.push(lu(p)), _ && this.root.push(_i(_)), b !== void 0 && this.root.push(new ue("w:titlePg", b)), w && this.root.push(new wu(w)), M && this.root.push(new yu(M)), this.root.push(uu({
      linePitch: m,
      charSpace: g,
      type: A
    }));
  }
  addHeaderFooterGroup(e, t) {
    t.default && this.root.push(br(e, {
      type: gt.DEFAULT,
      id: t.default.View.ReferenceId
    })), t.first && this.root.push(br(e, {
      type: gt.FIRST,
      id: t.first.View.ReferenceId
    })), t.even && this.root.push(br(e, {
      type: gt.EVEN,
      id: t.even.View.ReferenceId
    }));
  }
}, yu = class extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Oe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ii(e));
  }
}, bu = class extends ae {
  constructor() {
    super("w:body"), ee(this, "sections", []);
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
    const t = this.sections.pop();
    this.root.push(this.createSectionParagraph(t)), this.sections.push(new Ii(e));
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
    const t = new Ee({}), r = new ft({});
    return r.push(e), t.addChildElement(r), t;
  }
}, _u = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}, xu = class extends ae {
  constructor(e) {
    super("w:background"), this.root.push(new _u({
      color: e.color === void 0 ? void 0 : yt(e.color),
      themeColor: e.themeColor,
      themeShade: e.themeShade === void 0 ? void 0 : rn(e.themeShade),
      themeTint: e.themeTint === void 0 ? void 0 : rn(e.themeTint)
    }));
  }
}, Eu = class extends ae {
  constructor(e) {
    super("w:document"), ee(this, "body", void 0), this.root.push(new ur([
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
    ], "w14 w15 wp14")), this.body = new bu(), e.background && this.root.push(new xu(e.background)), this.root.push(this.body);
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
}, Tu = class {
  constructor(e) {
    ee(this, "document", void 0), ee(this, "relationships", void 0), this.document = new Eu(e), this.relationships = new nt();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, Su = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Au = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, ku = class extends We {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new el());
  }
}, pn = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, xr = class extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(new Au({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new ku()), this.root.push(r);
    }
  }
}, Ru = class extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}, Ci = class extends We {
  constructor() {
    super({}), this.root.push(new Ru());
  }
}, Iu = class extends ae {
  constructor() {
    super("w:separator");
  }
}, Ni = class extends We {
  constructor() {
    super({}), this.root.push(new Iu());
  }
}, Cu = class extends ae {
  constructor() {
    super("w:endnotes"), this.root.push(new Su({
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
    const e = new xr({
      id: -1,
      type: pn.SEPARATOR,
      children: [new Ee({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new Ni()]
      })]
    });
    this.root.push(e);
    const t = new xr({
      id: 0,
      type: pn.CONTINUATION_SEPARATOR,
      children: [new Ee({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new Ci()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new xr({
      id: e,
      children: t
    });
    this.root.push(r);
  }
}, Nu = class {
  constructor() {
    ee(this, "endnotes", void 0), ee(this, "relationships", void 0), this.endnotes = new Cu(), this.relationships = new nt();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, Ou = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Pu = class extends qn {
  constructor(e, t) {
    super("w:ftr", t), ee(this, "refId", void 0), this.refId = e, t || this.root.push(new Ou({
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
}, Fu = class {
  constructor(e, t, r) {
    ee(this, "media", void 0), ee(this, "footer", void 0), ee(this, "relationships", void 0), this.media = e, this.footer = new Pu(t, r), this.relationships = new nt();
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
}, Du = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Bu = class extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}, Lu = class extends We {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new Bu());
  }
}, mn = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, Er = class extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(new Du({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new Lu()), this.root.push(r);
    }
  }
}, Mu = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Uu = class extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(new Mu({
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
    const e = new Er({
      id: -1,
      type: mn.SEPERATOR,
      children: [new Ee({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new Ni()]
      })]
    });
    this.root.push(e);
    const t = new Er({
      id: 0,
      type: mn.CONTINUATION_SEPERATOR,
      children: [new Ee({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new Ci()]
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
    const r = new Er({
      id: e,
      children: t
    });
    this.root.push(r);
  }
}, ju = class {
  constructor() {
    ee(this, "footnotess", void 0), ee(this, "relationships", void 0), this.footnotess = new Uu(), this.relationships = new nt();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, zu = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, Wu = class extends qn {
  constructor(e, t) {
    super("w:hdr", t), ee(this, "refId", void 0), this.refId = e, t || this.root.push(new zu({
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
}, Hu = class {
  constructor(e, t, r) {
    ee(this, "media", void 0), ee(this, "header", void 0), ee(this, "relationships", void 0), this.media = e, this.header = new Wu(t, r), this.relationships = new nt();
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
}, Gu = class {
  constructor() {
    ee(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
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
}, Ve = {
  /** Bullet points. */
  BULLET: "bullet"
}, Ku = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}, qu = class extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Re({ val: e }));
  }
}, Vu = class extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Re({ val: e }));
  }
}, $u = class extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Re({ val: e }));
  }
}, Xu = class extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(new Re({ val: e }));
  }
}, Zu = class extends ae {
  constructor() {
    super("w:isLgl");
  }
}, Yu = class extends ae {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: o = Se.START, start: u = 1, style: i, suffix: l, isLegalNumberingStyle: s }) {
    if (super("w:lvl"), ee(this, "paragraphProperties", void 0), ee(this, "runProperties", void 0), this.root.push(new Bt("w:start", ke(u))), t && this.root.push(new qu(t)), l && this.root.push(new Xu(l)), s && this.root.push(new Zu()), r && this.root.push(new Vu(r)), this.root.push(new $u(o)), i?.style && this.root.push(Pt(i.style)), this.paragraphProperties = new ft(i && i.paragraph), this.runProperties = new rt(i && i.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Ku({
      ilvl: ke(e),
      tentative: 1
    }));
  }
}, Ju = class extends Yu {
}, Qu = class extends ae {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Re({ val: e }));
  }
}, ec = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, wn = class extends ae {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(e, t) {
    super("w:abstractNum"), ee(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    ), this.root.push(new ec({
      abstractNumId: ke(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Qu("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new Ju(r));
  }
}, tc = class extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Re({ val: e }));
  }
}, rc = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { numId: "w:numId" });
  }
}, gn = class extends ae {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(e) {
    if (super("w:num"), ee(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    ), ee(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    ), ee(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new rc({ numId: ke(e.numId) })), this.root.push(new tc(ke(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new ic(t.num, t.start));
  }
}, nc = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, ic = class extends ae {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new nc({ ilvl: e })), t !== void 0 && this.root.push(new sc(t));
  }
}, ac = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, sc = class extends ae {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new ac({ val: e }));
  }
}, oc = class extends ae {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), ee(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), ee(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), ee(this, "referenceConfigMap", /* @__PURE__ */ new Map()), ee(this, "abstractNumUniqueNumericId", Ls()), ee(this, "concreteNumUniqueNumericId", Ms()), this.root.push(new ur([
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
    const t = new wn(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: Ve.BULLET,
        text: "●",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: De(0.5),
          hanging: De(0.25)
        } } }
      },
      {
        level: 1,
        format: Ve.BULLET,
        text: "○",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: De(1),
          hanging: De(0.25)
        } } }
      },
      {
        level: 2,
        format: Ve.BULLET,
        text: "■",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: De(0.25)
        } } }
      },
      {
        level: 3,
        format: Ve.BULLET,
        text: "●",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: De(0.25)
        } } }
      },
      {
        level: 4,
        format: Ve.BULLET,
        text: "○",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: De(0.25)
        } } }
      },
      {
        level: 5,
        format: Ve.BULLET,
        text: "■",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: De(0.25)
        } } }
      },
      {
        level: 6,
        format: Ve.BULLET,
        text: "●",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: De(0.25)
        } } }
      },
      {
        level: 7,
        format: Ve.BULLET,
        text: "●",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: De(0.25)
        } } }
      },
      {
        level: 8,
        format: Ve.BULLET,
        text: "●",
        alignment: Se.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: De(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new gn({
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
      this.abstractNumberingMap.set(r.reference, new wn(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
    const o = `${e}-${t}`;
    if (this.concreteNumberingMap.has(o)) return;
    const u = this.referenceConfigMap.get(e), i = u && u[0].start, l = {
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
    this.concreteNumberingMap.set(o, new gn(l));
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
}, lc = (e) => new fe({
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
}), uc = class extends ae {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(lc(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new ue("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ue("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ue("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ue("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ue("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ue("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ue("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ue("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ue("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ue("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ue("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ue("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ue("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ue("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ue("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ue("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ue("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ue("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ue("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ue("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ue("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ue("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ue("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ue("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ue("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ue("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ue("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ue("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ue("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ue("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ue("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ue("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ue("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ue("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ue("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ue("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ue("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ue("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ue("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ue("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ue("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ue("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ue("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ue("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ue("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ue("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ue("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ue("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ue("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ue("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ue("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ue("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ue("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ue("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ue("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ue("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ue("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ue("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ue("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ue("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ue("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ue("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ue("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ue("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ue("w:cachedColBalance", e.cachedColumnBalance));
  }
}, cc = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
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
}, hc = class extends ae {
  constructor(e) {
    var t, r, o, u, i, l, s, f;
    super("w:settings"), this.root.push(new cc({
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
    })), this.root.push(new ue("w:displayBackgroundShape", !0)), e.trackRevisions !== void 0 && this.root.push(new ue("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new ue("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ue("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new Bt("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) === null || t === void 0 ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new ue("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.hyphenationZone) !== void 0 && this.root.push(new Bt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((o = e.hyphenation) === null || o === void 0 ? void 0 : o.consecutiveHyphenLimit) !== void 0 && this.root.push(new Bt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((u = e.hyphenation) === null || u === void 0 ? void 0 : u.doNotHyphenateCaps) !== void 0 && this.root.push(new ue("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(new uc(pe(pe({}, (i = e.compatibility) !== null && i !== void 0 ? i : {}), {}, { version: (l = (s = (f = e.compatibility) === null || f === void 0 ? void 0 : f.version) !== null && s !== void 0 ? s : e.compatibilityModeVersion) !== null && l !== void 0 ? l : 15 })));
  }
}, Oi = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { val: "w:val" });
  }
}, fc = class extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new Oi({ val: e }));
  }
}, dc = class extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new Oi({ val: ke(e) }));
  }
}, pc = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, Pi = class extends ae {
  constructor(e, t) {
    super("w:style"), this.root.push(new pc(e)), t.name && this.root.push(new fc(t.name)), t.basedOn && this.root.push(new Je("w:basedOn", t.basedOn)), t.next && this.root.push(new Je("w:next", t.next)), t.link && this.root.push(new Je("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new dc(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new ue("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new ue("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new ue("w:qFormat", t.quickFormat));
  }
}, Wt = class extends Pi {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), ee(this, "paragraphProperties", void 0), ee(this, "runProperties", void 0), this.paragraphProperties = new ft(e.paragraph), this.runProperties = new rt(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, Et = class extends Pi {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, pe({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), ee(this, "runProperties", void 0), this.runProperties = new rt(e.run), this.root.push(this.runProperties);
  }
}, it = class extends Wt {
  constructor(e) {
    super(pe({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, mc = class extends it {
  constructor(e) {
    super(pe({
      id: "Title",
      name: "Title"
    }, e));
  }
}, wc = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, gc = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, vc = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, yc = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, bc = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, _c = class extends it {
  constructor(e) {
    super(pe({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, xc = class extends it {
  constructor(e) {
    super(pe({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, Ec = class extends Wt {
  constructor(e) {
    super(pe({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, Tc = class extends Wt {
  constructor(e) {
    super(pe({
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
}, Sc = class extends Et {
  constructor(e) {
    super(pe({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Ac = class extends Et {
  constructor(e) {
    super(pe({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, kc = class extends Wt {
  constructor(e) {
    super(pe({
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
}, Rc = class extends Et {
  constructor(e) {
    super(pe({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Ic = class extends Et {
  constructor(e) {
    super(pe({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Cc = class extends Et {
  constructor(e) {
    super(pe({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: Qn.SINGLE }
      }
    }, e));
  }
}, Tr = class extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Wt(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new Et(t));
  }
}, Nc = class extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new ft(e));
  }
}, Oc = class extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new rt(e));
  }
}, Pc = class extends ae {
  constructor(e) {
    super("w:docDefaults"), ee(this, "runPropertiesDefaults", void 0), ee(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new Oc(e.run), this.paragraphPropertiesDefaults = new Nc(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, Fc = class {
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
    const t = (0, Kn.xml2js)(e, { compact: !1 });
    let r;
    for (const u of t.elements || []) u.name === "w:styles" && (r = u);
    if (r === void 0) throw new Error("can not find styles element");
    const o = r.elements || [];
    return {
      initialStyles: new Ja(r.attributes),
      importedStyles: o.map((u) => Gr(u))
    };
  }
}, Sr = class {
  newInstance(e = {}) {
    var t;
    return {
      initialStyles: new ur([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: [
        new Pc((t = e.document) !== null && t !== void 0 ? t : {}),
        new mc(pe({ run: { size: 56 } }, e.title)),
        new wc(pe({ run: {
          color: "2E74B5",
          size: 32
        } }, e.heading1)),
        new gc(pe({ run: {
          color: "2E74B5",
          size: 26
        } }, e.heading2)),
        new vc(pe({ run: {
          color: "1F4D78",
          size: 24
        } }, e.heading3)),
        new yc(pe({ run: {
          color: "2E74B5",
          italics: !0
        } }, e.heading4)),
        new bc(pe({ run: { color: "2E74B5" } }, e.heading5)),
        new _c(pe({ run: { color: "1F4D78" } }, e.heading6)),
        new xc(pe({ run: { bold: !0 } }, e.strong)),
        new Ec(e.listParagraph || {}),
        new Cc(e.hyperlink || {}),
        new Sc(e.footnoteReference || {}),
        new Tc(e.footnoteText || {}),
        new Ac(e.footnoteTextChar || {}),
        new Rc(e.endnoteReference || {}),
        new kc(e.endnoteText || {}),
        new Ic(e.endnoteTextChar || {})
      ]
    };
  }
}, Dc = class {
  constructor(e) {
    var t, r, o, u, i, l, s, f, T, S, v, N;
    if (ee(this, "currentRelationshipId", 1), ee(this, "documentWrapper", void 0), ee(this, "headers", []), ee(this, "footers", []), ee(this, "coreProperties", void 0), ee(this, "numbering", void 0), ee(this, "media", void 0), ee(this, "fileRelationships", void 0), ee(this, "footnotesWrapper", void 0), ee(this, "endnotesWrapper", void 0), ee(this, "settings", void 0), ee(this, "contentTypes", void 0), ee(this, "customProperties", void 0), ee(this, "appProperties", void 0), ee(this, "styles", void 0), ee(this, "comments", void 0), ee(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    ), ee(this, "fontWrapper", void 0), this.coreProperties = new tu(pe(pe({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (o = e.lastModifiedBy) !== null && o !== void 0 ? o : "Un-named"
    })), this.numbering = new oc(e.numbering ? e.numbering : { config: [] }), this.comments = new Xo((u = e.comments) !== null && u !== void 0 ? u : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Qo(this.comments.ThreadData)), this.fileRelationships = new nt(), this.customProperties = new ou((i = e.customProperties) !== null && i !== void 0 ? i : []), this.appProperties = new Jl(), this.footnotesWrapper = new ju(), this.endnotesWrapper = new Nu(), this.contentTypes = new eu(), this.documentWrapper = new Tu({ background: e.background }), this.settings = new hc({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (l = e.features) === null || l === void 0 ? void 0 : l.trackRevisions,
      updateFields: (s = e.features) === null || s === void 0 ? void 0 : s.updateFields,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (f = e.hyphenation) === null || f === void 0 ? void 0 : f.autoHyphenation,
        hyphenationZone: (T = e.hyphenation) === null || T === void 0 ? void 0 : T.hyphenationZone,
        consecutiveHyphenLimit: (S = e.hyphenation) === null || S === void 0 ? void 0 : S.consecutiveHyphenLimit,
        doNotHyphenateCaps: (v = e.hyphenation) === null || v === void 0 ? void 0 : v.doNotHyphenateCaps
      }
    }), this.media = new Gu(), e.externalStyles !== void 0) {
      var w;
      const m = new Sr().newInstance((w = e.styles) === null || w === void 0 ? void 0 : w.default), g = new Fc().newInstance(e.externalStyles);
      this.styles = new Tr(pe(pe({}, g), {}, { importedStyles: [...m.importedStyles, ...g.importedStyles] }));
    } else if (e.styles) {
      const m = new Sr().newInstance(e.styles.default);
      this.styles = new Tr(pe(pe({}, m), e.styles));
    } else {
      const m = new Sr();
      this.styles = new Tr(m.newInstance());
    }
    this.addDefaultRelationships();
    for (const m of e.sections) this.addSection(m);
    if (e.footnotes) for (const m in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(m), e.footnotes[m].children);
    if (e.endnotes) for (const m in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(m), e.endnotes[m].children);
    this.fontWrapper = new yi((N = e.fonts) !== null && N !== void 0 ? N : []);
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: o }) {
    this.documentWrapper.View.Body.addSection(pe(pe({}, o), {}, {
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
    for (const u of r) this.documentWrapper.View.add(u);
  }
  createHeader(e) {
    const t = new Hu(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Fu(this.media, this.currentRelationshipId++);
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
    this.fileRelationships.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml"), this.fileRelationships.addRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), this.fileRelationships.addRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml"), this.fileRelationships.addRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", "endnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml"), this.commentsExtended && (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", "commentsExtended.xml"), this.contentTypes.addCommentsExtended());
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
  get FontTable() {
    return this.fontWrapper;
  }
}, Bc = class extends ae {
  constructor(e = {}) {
    super("w:instrText"), ee(this, "properties", void 0), this.properties = e, this.root.push(new ht({ space: ct.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((o) => `${o.styleName},${o.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, Lc = class extends ae {
  constructor() {
    super("w:sdtContent");
  }
}, Mc = class extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new Je("w:alias", e));
  }
};
function Uc(e, t) {
  if (e == null) return {};
  var r = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (t.includes(o)) continue;
    r[o] = e[o];
  }
  return r;
}
function jc(e, t) {
  if (e == null) return {};
  var r, o, u = Uc(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++) r = i[o], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (u[r] = e[r]);
  }
  return u;
}
var zc = [
  "contentChildren",
  "cachedEntries",
  "beginDirty"
], Wc = class extends $r {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: o = [], beginDirty: u = !0 } = t, i = jc(t, zc);
    super("w:sdt"), this.root.push(new Mc(e));
    const l = new Lc(), s = [new We({ children: [
      Ct(u),
      new Bc(i),
      Nt()
    ] })], f = [new We({ children: [Ot()] })];
    if (o !== void 0 && o.length > 0) {
      const { stylesWithLevels: T } = i, S = o.map((N, w) => {
        var m, g;
        const A = this.buildCachedContentParagraphChild(N, i), C = (m = T == null || (g = T.find((x) => x.level === N.level)) === null || g === void 0 ? void 0 : g.styleName) !== null && m !== void 0 ? m : `TOC${N.level}`, y = w === 0 ? [...s, A] : w === o.length - 1 ? [A, ...f] : [A];
        return new Ee({
          style: C,
          tabStops: this.getTabStopsForLevel(N.level),
          children: y
        });
      });
      let v = S;
      o.length <= 1 && (v = [...S, new Ee({ children: f })]);
      for (const N of v) l.addChildElement(N);
    } else {
      const T = new Ee({ children: s });
      l.addChildElement(T);
      for (const v of r) l.addChildElement(v);
      const S = new Ee({ children: f });
      l.addChildElement(S);
    }
    this.root.push(l);
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
    var r, o;
    return new We({
      style: t?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new er({ text: e.title }),
        new mi(),
        new er({ text: (r = (o = e.page) === null || o === void 0 ? void 0 : o.toString()) !== null && r !== void 0 ? r : "" })
      ]
    });
  }
  buildCachedContentParagraphChild(e, t) {
    const r = this.buildCachedContentRun(e, t);
    return t?.hyperlink && e.href !== void 0 ? new wi({
      anchor: e.href,
      children: [r]
    }) : r;
  }
}, Fi = class {
  constructor(e = { children: [] }) {
    ee(this, "options", void 0), this.options = e;
  }
}, Di = class {
  constructor(e = { children: [] }) {
    ee(this, "options", void 0), this.options = e;
  }
}, Hc = class extends we {
  constructor(...e) {
    super(...e), ee(this, "xmlKeys", { id: "w:id" });
  }
}, Gc = class extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new Hc({ id: e }));
  }
}, Kc = class extends We {
  /**
  * Creates a new footnote reference run.
  *
  * @param id - Unique identifier linking to the footnote content
  */
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new Gc(e));
  }
}, qc = /* @__PURE__ */ ce(((e, t) => {
  _t(), tt();
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof Ie < "u" ? Ie : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(o, u, i) {
      function l(T, S) {
        if (!u[T]) {
          if (!o[T]) {
            var v = typeof qt == "function" && qt;
            if (!S && v) return v(T, !0);
            if (s) return s(T, !0);
            var N = /* @__PURE__ */ new Error("Cannot find module '" + T + "'");
            throw N.code = "MODULE_NOT_FOUND", N;
          }
          var w = u[T] = { exports: {} };
          o[T][0].call(w.exports, function(m) {
            var g = o[T][1][m];
            return l(g || m);
          }, w, w.exports, r, o, u, i);
        }
        return u[T].exports;
      }
      for (var s = typeof qt == "function" && qt, f = 0; f < i.length; f++) l(i[f]);
      return l;
    })({
      1: [function(r, o, u) {
        var i = r("./utils"), l = r("./support"), s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        u.encode = function(f) {
          for (var T, S, v, N, w, m, g, A = [], C = 0, y = f.length, x = y, b = i.getTypeOf(f) !== "string"; C < f.length; ) x = y - C, v = b ? (T = f[C++], S = C < y ? f[C++] : 0, C < y ? f[C++] : 0) : (T = f.charCodeAt(C++), S = C < y ? f.charCodeAt(C++) : 0, C < y ? f.charCodeAt(C++) : 0), N = T >> 2, w = (3 & T) << 4 | S >> 4, m = 1 < x ? (15 & S) << 2 | v >> 6 : 64, g = 2 < x ? 63 & v : 64, A.push(s.charAt(N) + s.charAt(w) + s.charAt(m) + s.charAt(g));
          return A.join("");
        }, u.decode = function(f) {
          var T, S, v, N, w, m, g = 0, A = 0, C = "data:";
          if (f.substr(0, C.length) === C) throw new Error("Invalid base64 input, it looks like a data url.");
          var y, x = 3 * (f = f.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (f.charAt(f.length - 1) === s.charAt(64) && x--, f.charAt(f.length - 2) === s.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (y = l.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); g < f.length; ) T = s.indexOf(f.charAt(g++)) << 2 | (N = s.indexOf(f.charAt(g++))) >> 4, S = (15 & N) << 4 | (w = s.indexOf(f.charAt(g++))) >> 2, v = (3 & w) << 6 | (m = s.indexOf(f.charAt(g++))), y[A++] = T, w !== 64 && (y[A++] = S), m !== 64 && (y[A++] = v);
          return y;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, o, u) {
        var i = r("./external"), l = r("./stream/DataWorker"), s = r("./stream/Crc32Probe"), f = r("./stream/DataLengthProbe");
        function T(S, v, N, w, m) {
          this.compressedSize = S, this.uncompressedSize = v, this.crc32 = N, this.compression = w, this.compressedContent = m;
        }
        T.prototype = {
          getContentWorker: function() {
            var S = new l(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new f("data_length")), v = this;
            return S.on("end", function() {
              if (this.streamInfo.data_length !== v.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), S;
          },
          getCompressedWorker: function() {
            return new l(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, T.createWorkerFrom = function(S, v, N) {
          return S.pipe(new s()).pipe(new f("uncompressedSize")).pipe(v.compressWorker(N)).pipe(new f("compressedSize")).withStreamInfo("compression", v);
        }, o.exports = T;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, o, u) {
        var i = r("./stream/GenericWorker");
        u.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new i("STORE compression");
          },
          uncompressWorker: function() {
            return new i("STORE decompression");
          }
        }, u.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, o, u) {
        var i = r("./utils"), l = (function() {
          for (var s, f = [], T = 0; T < 256; T++) {
            s = T;
            for (var S = 0; S < 8; S++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            f[T] = s;
          }
          return f;
        })();
        o.exports = function(s, f) {
          return s !== void 0 && s.length ? i.getTypeOf(s) !== "string" ? (function(T, S, v, N) {
            var w = l, m = N + v;
            T ^= -1;
            for (var g = N; g < m; g++) T = T >>> 8 ^ w[255 & (T ^ S[g])];
            return -1 ^ T;
          })(0 | f, s, s.length, 0) : (function(T, S, v, N) {
            var w = l, m = N + v;
            T ^= -1;
            for (var g = N; g < m; g++) T = T >>> 8 ^ w[255 & (T ^ S.charCodeAt(g))];
            return -1 ^ T;
          })(0 | f, s, s.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, o, u) {
        u.base64 = !1, u.binary = !1, u.dir = !1, u.createFolders = !0, u.date = null, u.compression = null, u.compressionOptions = null, u.comment = null, u.unixPermissions = null, u.dosPermissions = null;
      }, {}],
      6: [function(r, o, u) {
        var i = null;
        i = typeof Promise < "u" ? Promise : r("lie"), o.exports = { Promise: i };
      }, { lie: 37 }],
      7: [function(r, o, u) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = r("pako"), s = r("./utils"), f = r("./stream/GenericWorker"), T = i ? "uint8array" : "array";
        function S(v, N) {
          f.call(this, "FlateWorker/" + v), this._pako = null, this._pakoAction = v, this._pakoOptions = N, this.meta = {};
        }
        u.magic = "\b\0", s.inherits(S, f), S.prototype.processChunk = function(v) {
          this.meta = v.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(T, v.data), !1);
        }, S.prototype.flush = function() {
          f.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, S.prototype.cleanUp = function() {
          f.prototype.cleanUp.call(this), this._pako = null;
        }, S.prototype._createPako = function() {
          this._pako = new l[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var v = this;
          this._pako.onData = function(N) {
            v.push({
              data: N,
              meta: v.meta
            });
          };
        }, u.compressWorker = function(v) {
          return new S("Deflate", v);
        }, u.uncompressWorker = function() {
          return new S("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, o, u) {
        function i(w, m) {
          var g, A = "";
          for (g = 0; g < m; g++) A += String.fromCharCode(255 & w), w >>>= 8;
          return A;
        }
        function l(w, m, g, A, C, y) {
          var x, b, _ = w.file, p = w.compression, P = y !== T.utf8encode, M = s.transformTo("string", y(_.name)), R = s.transformTo("string", T.utf8encode(_.name)), q = _.comment, Q = s.transformTo("string", y(q)), O = s.transformTo("string", T.utf8encode(q)), W = R.length !== _.name.length, k = O.length !== q.length, H = "", J = "", $ = "", oe = _.dir, Z = _.date, te = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          m && !g || (te.crc32 = w.crc32, te.compressedSize = w.compressedSize, te.uncompressedSize = w.uncompressedSize);
          var V = 0;
          m && (V |= 8), P || !W && !k || (V |= 2048);
          var F = 0, X = 0;
          oe && (F |= 16), C === "UNIX" ? (X = 798, F |= (function(re, de) {
            var E = re;
            return re || (E = de ? 16893 : 33204), (65535 & E) << 16;
          })(_.unixPermissions, oe)) : (X = 20, F |= (function(re) {
            return 63 & (re || 0);
          })(_.dosPermissions)), x = Z.getUTCHours(), x <<= 6, x |= Z.getUTCMinutes(), x <<= 5, x |= Z.getUTCSeconds() / 2, b = Z.getUTCFullYear() - 1980, b <<= 4, b |= Z.getUTCMonth() + 1, b <<= 5, b |= Z.getUTCDate(), W && (J = i(1, 1) + i(S(M), 4) + R, H += "up" + i(J.length, 2) + J), k && ($ = i(1, 1) + i(S(Q), 4) + O, H += "uc" + i($.length, 2) + $);
          var Y = "";
          return Y += `
\0`, Y += i(V, 2), Y += p.magic, Y += i(x, 2), Y += i(b, 2), Y += i(te.crc32, 4), Y += i(te.compressedSize, 4), Y += i(te.uncompressedSize, 4), Y += i(M.length, 2), Y += i(H.length, 2), {
            fileRecord: v.LOCAL_FILE_HEADER + Y + M + H,
            dirRecord: v.CENTRAL_FILE_HEADER + i(X, 2) + Y + i(Q.length, 2) + "\0\0\0\0" + i(F, 4) + i(A, 4) + M + H + Q
          };
        }
        var s = r("../utils"), f = r("../stream/GenericWorker"), T = r("../utf8"), S = r("../crc32"), v = r("../signature");
        function N(w, m, g, A) {
          f.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = m, this.zipPlatform = g, this.encodeFileName = A, this.streamFiles = w, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        s.inherits(N, f), N.prototype.push = function(w) {
          var m = w.meta.percent || 0, g = this.entriesCount, A = this._sources.length;
          this.accumulate ? this.contentBuffer.push(w) : (this.bytesWritten += w.data.length, f.prototype.push.call(this, {
            data: w.data,
            meta: {
              currentFile: this.currentFile,
              percent: g ? (m + 100 * (g - A - 1)) / g : 100
            }
          }));
        }, N.prototype.openedSource = function(w) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = w.file.name;
          var m = this.streamFiles && !w.file.dir;
          if (m) {
            var g = l(w, m, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: g.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, N.prototype.closedSource = function(w) {
          this.accumulate = !1;
          var m = this.streamFiles && !w.file.dir, g = l(w, m, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(g.dirRecord), m) this.push({
            data: (function(A) {
              return v.DATA_DESCRIPTOR + i(A.crc32, 4) + i(A.compressedSize, 4) + i(A.uncompressedSize, 4);
            })(w),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: g.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, N.prototype.flush = function() {
          for (var w = this.bytesWritten, m = 0; m < this.dirRecords.length; m++) this.push({
            data: this.dirRecords[m],
            meta: { percent: 100 }
          });
          var g = this.bytesWritten - w, A = (function(C, y, x, b, _) {
            var p = s.transformTo("string", _(b));
            return v.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(C, 2) + i(C, 2) + i(y, 4) + i(x, 4) + i(p.length, 2) + p;
          })(this.dirRecords.length, g, w, this.zipComment, this.encodeFileName);
          this.push({
            data: A,
            meta: { percent: 100 }
          });
        }, N.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, N.prototype.registerPrevious = function(w) {
          this._sources.push(w);
          var m = this;
          return w.on("data", function(g) {
            m.processChunk(g);
          }), w.on("end", function() {
            m.closedSource(m.previous.streamInfo), m._sources.length ? m.prepareNextSource() : m.end();
          }), w.on("error", function(g) {
            m.error(g);
          }), this;
        }, N.prototype.resume = function() {
          return !!f.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, N.prototype.error = function(w) {
          var m = this._sources;
          if (!f.prototype.error.call(this, w)) return !1;
          for (var g = 0; g < m.length; g++) try {
            m[g].error(w);
          } catch {
          }
          return !0;
        }, N.prototype.lock = function() {
          f.prototype.lock.call(this);
          for (var w = this._sources, m = 0; m < w.length; m++) w[m].lock();
        }, o.exports = N;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, o, u) {
        var i = r("../compressions"), l = r("./ZipFileWorker");
        u.generateWorker = function(s, f, T) {
          var S = new l(f.streamFiles, T, f.platform, f.encodeFileName), v = 0;
          try {
            s.forEach(function(N, w) {
              v++;
              var m = (function(y, x) {
                var b = y || x, _ = i[b];
                if (!_) throw new Error(b + " is not a valid compression method !");
                return _;
              })(w.options.compression, f.compression), g = w.options.compressionOptions || f.compressionOptions || {}, A = w.dir, C = w.date;
              w._compressWorker(m, g).withStreamInfo("file", {
                name: N,
                dir: A,
                date: C,
                comment: w.comment || "",
                unixPermissions: w.unixPermissions,
                dosPermissions: w.dosPermissions
              }).pipe(S);
            }), S.entriesCount = v;
          } catch (N) {
            S.error(N);
          }
          return S;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(r, o, u) {
        function i() {
          if (!(this instanceof i)) return new i();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var l = new i();
            for (var s in this) typeof this[s] != "function" && (l[s] = this[s]);
            return l;
          };
        }
        (i.prototype = r("./object")).loadAsync = r("./load"), i.support = r("./support"), i.defaults = r("./defaults"), i.version = "3.10.1", i.loadAsync = function(l, s) {
          return new i().loadAsync(l, s);
        }, i.external = r("./external"), o.exports = i;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(r, o, u) {
        var i = r("./utils"), l = r("./external"), s = r("./utf8"), f = r("./zipEntries"), T = r("./stream/Crc32Probe"), S = r("./nodejsUtils");
        function v(N) {
          return new l.Promise(function(w, m) {
            var g = N.decompressed.getContentWorker().pipe(new T());
            g.on("error", function(A) {
              m(A);
            }).on("end", function() {
              g.streamInfo.crc32 !== N.decompressed.crc32 ? m(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : w();
            }).resume();
          });
        }
        o.exports = function(N, w) {
          var m = this;
          return w = i.extend(w || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: s.utf8decode
          }), S.isNode && S.isStream(N) ? l.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", N, !0, w.optimizedBinaryString, w.base64).then(function(g) {
            var A = new f(w);
            return A.load(g), A;
          }).then(function(g) {
            var A = [l.Promise.resolve(g)], C = g.files;
            if (w.checkCRC32) for (var y = 0; y < C.length; y++) A.push(v(C[y]));
            return l.Promise.all(A);
          }).then(function(g) {
            for (var A = g.shift(), C = A.files, y = 0; y < C.length; y++) {
              var x = C[y], b = x.fileNameStr, _ = i.resolve(x.fileNameStr);
              m.file(_, x.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: x.date,
                dir: x.dir,
                comment: x.fileCommentStr.length ? x.fileCommentStr : null,
                unixPermissions: x.unixPermissions,
                dosPermissions: x.dosPermissions,
                createFolders: w.createFolders
              }), x.dir || (m.file(_).unsafeOriginalName = b);
            }
            return A.zipComment.length && (m.comment = A.zipComment), m;
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
      12: [function(r, o, u) {
        var i = r("../utils"), l = r("../stream/GenericWorker");
        function s(f, T) {
          l.call(this, "Nodejs stream input adapter for " + f), this._upstreamEnded = !1, this._bindStream(T);
        }
        i.inherits(s, l), s.prototype._bindStream = function(f) {
          var T = this;
          (this._stream = f).pause(), f.on("data", function(S) {
            T.push({
              data: S,
              meta: { percent: 0 }
            });
          }).on("error", function(S) {
            T.isPaused ? this.generatedError = S : T.error(S);
          }).on("end", function() {
            T.isPaused ? T._upstreamEnded = !0 : T.end();
          });
        }, s.prototype.pause = function() {
          return !!l.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, s.prototype.resume = function() {
          return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, o.exports = s;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(r, o, u) {
        var i = r("readable-stream").Readable;
        function l(s, f, T) {
          i.call(this, f), this._helper = s;
          var S = this;
          s.on("data", function(v, N) {
            S.push(v) || S._helper.pause(), T && T(N);
          }).on("error", function(v) {
            S.emit("error", v);
          }).on("end", function() {
            S.push(null);
          });
        }
        r("../utils").inherits(l, i), l.prototype._read = function() {
          this._helper.resume();
        }, o.exports = l;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(r, o, u) {
        o.exports = {
          isNode: typeof Buffer < "u",
          newBufferFrom: function(i, l) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(i, l);
            if (typeof i == "number") throw new Error('The "data" argument must not be a number');
            return new Buffer(i, l);
          },
          allocBuffer: function(i) {
            if (Buffer.alloc) return Buffer.alloc(i);
            var l = new Buffer(i);
            return l.fill(0), l;
          },
          isBuffer: function(i) {
            return Buffer.isBuffer(i);
          },
          isStream: function(i) {
            return i && typeof i.on == "function" && typeof i.pause == "function" && typeof i.resume == "function";
          }
        };
      }, {}],
      15: [function(r, o, u) {
        function i(b, _, p) {
          var P, M = s.getTypeOf(_), R = s.extend(p || {}, S);
          R.date = R.date || /* @__PURE__ */ new Date(), R.compression !== null && (R.compression = R.compression.toUpperCase()), typeof R.unixPermissions == "string" && (R.unixPermissions = parseInt(R.unixPermissions, 8)), R.unixPermissions && 16384 & R.unixPermissions && (R.dir = !0), R.dosPermissions && 16 & R.dosPermissions && (R.dir = !0), R.dir && (b = C(b)), R.createFolders && (P = A(b)) && y.call(this, P, !0);
          var q = M === "string" && R.binary === !1 && R.base64 === !1;
          p && p.binary !== void 0 || (R.binary = !q), (_ instanceof v && _.uncompressedSize === 0 || R.dir || !_ || _.length === 0) && (R.base64 = !1, R.binary = !0, _ = "", R.compression = "STORE", M = "string");
          var Q = null;
          Q = _ instanceof v || _ instanceof f ? _ : m.isNode && m.isStream(_) ? new g(b, _) : s.prepareContent(b, _, R.binary, R.optimizedBinaryString, R.base64);
          var O = new N(b, Q, R);
          this.files[b] = O;
        }
        var l = r("./utf8"), s = r("./utils"), f = r("./stream/GenericWorker"), T = r("./stream/StreamHelper"), S = r("./defaults"), v = r("./compressedObject"), N = r("./zipObject"), w = r("./generate"), m = r("./nodejsUtils"), g = r("./nodejs/NodejsStreamInputAdapter"), A = function(b) {
          b.slice(-1) === "/" && (b = b.substring(0, b.length - 1));
          var _ = b.lastIndexOf("/");
          return 0 < _ ? b.substring(0, _) : "";
        }, C = function(b) {
          return b.slice(-1) !== "/" && (b += "/"), b;
        }, y = function(b, _) {
          return _ = _ !== void 0 ? _ : S.createFolders, b = C(b), this.files[b] || i.call(this, b, null, {
            dir: !0,
            createFolders: _
          }), this.files[b];
        };
        function x(b) {
          return Object.prototype.toString.call(b) === "[object RegExp]";
        }
        o.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(b) {
            var _, p, P;
            for (_ in this.files) P = this.files[_], (p = _.slice(this.root.length, _.length)) && _.slice(0, this.root.length) === this.root && b(p, P);
          },
          filter: function(b) {
            var _ = [];
            return this.forEach(function(p, P) {
              b(p, P) && _.push(P);
            }), _;
          },
          file: function(b, _, p) {
            if (arguments.length !== 1) return b = this.root + b, i.call(this, b, _, p), this;
            if (x(b)) {
              var P = b;
              return this.filter(function(R, q) {
                return !q.dir && P.test(R);
              });
            }
            var M = this.files[this.root + b];
            return M && !M.dir ? M : null;
          },
          folder: function(b) {
            if (!b) return this;
            if (x(b)) return this.filter(function(M, R) {
              return R.dir && b.test(M);
            });
            var _ = this.root + b, p = y.call(this, _), P = this.clone();
            return P.root = p.name, P;
          },
          remove: function(b) {
            b = this.root + b;
            var _ = this.files[b];
            if (_ || (b.slice(-1) !== "/" && (b += "/"), _ = this.files[b]), _ && !_.dir) delete this.files[b];
            else for (var p = this.filter(function(M, R) {
              return R.name.slice(0, b.length) === b;
            }), P = 0; P < p.length; P++) delete this.files[p[P].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(b) {
            var _, p = {};
            try {
              if ((p = s.extend(b || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: l.utf8encode
              })).type = p.type.toLowerCase(), p.compression = p.compression.toUpperCase(), p.type === "binarystring" && (p.type = "string"), !p.type) throw new Error("No output type specified.");
              s.checkSupport(p.type), p.platform !== "darwin" && p.platform !== "freebsd" && p.platform !== "linux" && p.platform !== "sunos" || (p.platform = "UNIX"), p.platform === "win32" && (p.platform = "DOS");
              var P = p.comment || this.comment || "";
              _ = w.generateWorker(this, p, P);
            } catch (M) {
              (_ = new f("error")).error(M);
            }
            return new T(_, p.type || "string", p.mimeType);
          },
          generateAsync: function(b, _) {
            return this.generateInternalStream(b).accumulate(_);
          },
          generateNodeStream: function(b, _) {
            return (b = b || {}).type || (b.type = "nodebuffer"), this.generateInternalStream(b).toNodejsStream(_);
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
      16: [function(r, o, u) {
        o.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, o, u) {
        var i = r("./DataReader");
        function l(s) {
          i.call(this, s);
          for (var f = 0; f < this.data.length; f++) s[f] = 255 & s[f];
        }
        r("../utils").inherits(l, i), l.prototype.byteAt = function(s) {
          return this.data[this.zero + s];
        }, l.prototype.lastIndexOfSignature = function(s) {
          for (var f = s.charCodeAt(0), T = s.charCodeAt(1), S = s.charCodeAt(2), v = s.charCodeAt(3), N = this.length - 4; 0 <= N; --N) if (this.data[N] === f && this.data[N + 1] === T && this.data[N + 2] === S && this.data[N + 3] === v) return N - this.zero;
          return -1;
        }, l.prototype.readAndCheckSignature = function(s) {
          var f = s.charCodeAt(0), T = s.charCodeAt(1), S = s.charCodeAt(2), v = s.charCodeAt(3), N = this.readData(4);
          return f === N[0] && T === N[1] && S === N[2] && v === N[3];
        }, l.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return [];
          var f = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, f;
        }, o.exports = l;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, o, u) {
        var i = r("../utils");
        function l(s) {
          this.data = s, this.length = s.length, this.index = 0, this.zero = 0;
        }
        l.prototype = {
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
            var f, T = 0;
            for (this.checkOffset(s), f = this.index + s - 1; f >= this.index; f--) T = (T << 8) + this.byteAt(f);
            return this.index += s, T;
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
        }, o.exports = l;
      }, { "../utils": 32 }],
      19: [function(r, o, u) {
        var i = r("./Uint8ArrayReader");
        function l(s) {
          i.call(this, s);
        }
        r("../utils").inherits(l, i), l.prototype.readData = function(s) {
          this.checkOffset(s);
          var f = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, f;
        }, o.exports = l;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(r, o, u) {
        var i = r("./DataReader");
        function l(s) {
          i.call(this, s);
        }
        r("../utils").inherits(l, i), l.prototype.byteAt = function(s) {
          return this.data.charCodeAt(this.zero + s);
        }, l.prototype.lastIndexOfSignature = function(s) {
          return this.data.lastIndexOf(s) - this.zero;
        }, l.prototype.readAndCheckSignature = function(s) {
          return s === this.readData(4);
        }, l.prototype.readData = function(s) {
          this.checkOffset(s);
          var f = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, f;
        }, o.exports = l;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(r, o, u) {
        var i = r("./ArrayReader");
        function l(s) {
          i.call(this, s);
        }
        r("../utils").inherits(l, i), l.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return new Uint8Array(0);
          var f = this.data.subarray(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, f;
        }, o.exports = l;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(r, o, u) {
        var i = r("../utils"), l = r("../support"), s = r("./ArrayReader"), f = r("./StringReader"), T = r("./NodeBufferReader"), S = r("./Uint8ArrayReader");
        o.exports = function(v) {
          var N = i.getTypeOf(v);
          return i.checkSupport(N), N !== "string" || l.uint8array ? N === "nodebuffer" ? new T(v) : l.uint8array ? new S(i.transformTo("uint8array", v)) : new s(i.transformTo("array", v)) : new f(v);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, o, u) {
        u.LOCAL_FILE_HEADER = "PK", u.CENTRAL_FILE_HEADER = "PK", u.CENTRAL_DIRECTORY_END = "PK", u.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", u.ZIP64_CENTRAL_DIRECTORY_END = "PK", u.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, o, u) {
        var i = r("./GenericWorker"), l = r("../utils");
        function s(f) {
          i.call(this, "ConvertWorker to " + f), this.destType = f;
        }
        l.inherits(s, i), s.prototype.processChunk = function(f) {
          this.push({
            data: l.transformTo(this.destType, f.data),
            meta: f.meta
          });
        }, o.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(r, o, u) {
        var i = r("./GenericWorker"), l = r("../crc32");
        function s() {
          i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(s, i), s.prototype.processChunk = function(f) {
          this.streamInfo.crc32 = l(f.data, this.streamInfo.crc32 || 0), this.push(f);
        }, o.exports = s;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(r, o, u) {
        var i = r("../utils"), l = r("./GenericWorker");
        function s(f) {
          l.call(this, "DataLengthProbe for " + f), this.propName = f, this.withStreamInfo(f, 0);
        }
        i.inherits(s, l), s.prototype.processChunk = function(f) {
          if (f) {
            var T = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = T + f.data.length;
          }
          l.prototype.processChunk.call(this, f);
        }, o.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, o, u) {
        var i = r("../utils"), l = r("./GenericWorker");
        function s(f) {
          l.call(this, "DataWorker");
          var T = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, f.then(function(S) {
            T.dataIsReady = !0, T.data = S, T.max = S && S.length || 0, T.type = i.getTypeOf(S), T.isPaused || T._tickAndRepeat();
          }, function(S) {
            T.error(S);
          });
        }
        i.inherits(s, l), s.prototype.cleanUp = function() {
          l.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!l.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var f = null, T = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              f = this.data.substring(this.index, T);
              break;
            case "uint8array":
              f = this.data.subarray(this.index, T);
              break;
            case "array":
            case "nodebuffer":
              f = this.data.slice(this.index, T);
          }
          return this.index = T, this.push({
            data: f,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, o.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(r, o, u) {
        function i(l) {
          this.name = l || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        i.prototype = {
          push: function(l) {
            this.emit("data", l);
          },
          end: function() {
            if (this.isFinished) return !1;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = !0;
            } catch (l) {
              this.emit("error", l);
            }
            return !0;
          },
          error: function(l) {
            return !this.isFinished && (this.isPaused ? this.generatedError = l : (this.isFinished = !0, this.emit("error", l), this.previous && this.previous.error(l), this.cleanUp()), !0);
          },
          on: function(l, s) {
            return this._listeners[l].push(s), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(l, s) {
            if (this._listeners[l]) for (var f = 0; f < this._listeners[l].length; f++) this._listeners[l][f].call(this, s);
          },
          pipe: function(l) {
            return l.registerPrevious(this);
          },
          registerPrevious: function(l) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
            var s = this;
            return l.on("data", function(f) {
              s.processChunk(f);
            }), l.on("end", function() {
              s.end();
            }), l.on("error", function(f) {
              s.error(f);
            }), this;
          },
          pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
          },
          resume: function() {
            if (!this.isPaused || this.isFinished) return !1;
            var l = this.isPaused = !1;
            return this.generatedError && (this.error(this.generatedError), l = !0), this.previous && this.previous.resume(), !l;
          },
          flush: function() {
          },
          processChunk: function(l) {
            this.push(l);
          },
          withStreamInfo: function(l, s) {
            return this.extraStreamInfo[l] = s, this.mergeStreamInfo(), this;
          },
          mergeStreamInfo: function() {
            for (var l in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, l) && (this.streamInfo[l] = this.extraStreamInfo[l]);
          },
          lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = !0, this.previous && this.previous.lock();
          },
          toString: function() {
            var l = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + l : l;
          }
        }, o.exports = i;
      }, {}],
      29: [function(r, o, u) {
        var i = r("../utils"), l = r("./ConvertWorker"), s = r("./GenericWorker"), f = r("../base64"), T = r("../support"), S = r("../external"), v = null;
        if (T.nodestream) try {
          v = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function N(m, g) {
          return new S.Promise(function(A, C) {
            var y = [], x = m._internalType, b = m._outputType, _ = m._mimeType;
            m.on("data", function(p, P) {
              y.push(p), g && g(P);
            }).on("error", function(p) {
              y = [], C(p);
            }).on("end", function() {
              try {
                A((function(p, P, M) {
                  switch (p) {
                    case "blob":
                      return i.newBlob(i.transformTo("arraybuffer", P), M);
                    case "base64":
                      return f.encode(P);
                    default:
                      return i.transformTo(p, P);
                  }
                })(b, (function(p, P) {
                  var M, R = 0, q = null, Q = 0;
                  for (M = 0; M < P.length; M++) Q += P[M].length;
                  switch (p) {
                    case "string":
                      return P.join("");
                    case "array":
                      return Array.prototype.concat.apply([], P);
                    case "uint8array":
                      for (q = new Uint8Array(Q), M = 0; M < P.length; M++) q.set(P[M], R), R += P[M].length;
                      return q;
                    case "nodebuffer":
                      return Buffer.concat(P);
                    default:
                      throw new Error("concat : unsupported type '" + p + "'");
                  }
                })(x, y), _));
              } catch (p) {
                C(p);
              }
              y = [];
            }).resume();
          });
        }
        function w(m, g, A) {
          var C = g;
          switch (g) {
            case "blob":
            case "arraybuffer":
              C = "uint8array";
              break;
            case "base64":
              C = "string";
          }
          try {
            this._internalType = C, this._outputType = g, this._mimeType = A, i.checkSupport(C), this._worker = m.pipe(new l(C)), m.lock();
          } catch (y) {
            this._worker = new s("error"), this._worker.error(y);
          }
        }
        w.prototype = {
          accumulate: function(m) {
            return N(this, m);
          },
          on: function(m, g) {
            var A = this;
            return m === "data" ? this._worker.on(m, function(C) {
              g.call(A, C.data, C.meta);
            }) : this._worker.on(m, function() {
              i.delay(g, arguments, A);
            }), this;
          },
          resume: function() {
            return i.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(m) {
            if (i.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new v(this, { objectMode: this._outputType !== "nodebuffer" }, m);
          }
        }, o.exports = w;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(r, o, u) {
        if (u.base64 = !0, u.array = !0, u.string = !0, u.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", u.nodebuffer = typeof Buffer < "u", u.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") u.blob = !1;
        else {
          var i = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            u.blob = new Blob([i], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              l.append(i), u.blob = l.getBlob("application/zip").size === 0;
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
      }, { "readable-stream": 16 }],
      31: [function(r, o, u) {
        for (var i = r("./utils"), l = r("./support"), s = r("./nodejsUtils"), f = r("./stream/GenericWorker"), T = new Array(256), S = 0; S < 256; S++) T[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
        T[254] = T[254] = 1;
        function v() {
          f.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function N() {
          f.call(this, "utf-8 encode");
        }
        u.utf8encode = function(w) {
          return l.nodebuffer ? s.newBufferFrom(w, "utf-8") : (function(m) {
            var g, A, C, y, x, b = m.length, _ = 0;
            for (y = 0; y < b; y++) (64512 & (A = m.charCodeAt(y))) == 55296 && y + 1 < b && (64512 & (C = m.charCodeAt(y + 1))) == 56320 && (A = 65536 + (A - 55296 << 10) + (C - 56320), y++), _ += A < 128 ? 1 : A < 2048 ? 2 : A < 65536 ? 3 : 4;
            for (g = l.uint8array ? new Uint8Array(_) : new Array(_), y = x = 0; x < _; y++) (64512 & (A = m.charCodeAt(y))) == 55296 && y + 1 < b && (64512 & (C = m.charCodeAt(y + 1))) == 56320 && (A = 65536 + (A - 55296 << 10) + (C - 56320), y++), A < 128 ? g[x++] = A : (A < 2048 ? g[x++] = 192 | A >>> 6 : (A < 65536 ? g[x++] = 224 | A >>> 12 : (g[x++] = 240 | A >>> 18, g[x++] = 128 | A >>> 12 & 63), g[x++] = 128 | A >>> 6 & 63), g[x++] = 128 | 63 & A);
            return g;
          })(w);
        }, u.utf8decode = function(w) {
          return l.nodebuffer ? i.transformTo("nodebuffer", w).toString("utf-8") : (function(m) {
            var g, A, C, y, x = m.length, b = new Array(2 * x);
            for (g = A = 0; g < x; ) if ((C = m[g++]) < 128) b[A++] = C;
            else if (4 < (y = T[C])) b[A++] = 65533, g += y - 1;
            else {
              for (C &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && g < x; ) C = C << 6 | 63 & m[g++], y--;
              1 < y ? b[A++] = 65533 : C < 65536 ? b[A++] = C : (C -= 65536, b[A++] = 55296 | C >> 10 & 1023, b[A++] = 56320 | 1023 & C);
            }
            return b.length !== A && (b.subarray ? b = b.subarray(0, A) : b.length = A), i.applyFromCharCode(b);
          })(w = i.transformTo(l.uint8array ? "uint8array" : "array", w));
        }, i.inherits(v, f), v.prototype.processChunk = function(w) {
          var m = i.transformTo(l.uint8array ? "uint8array" : "array", w.data);
          if (this.leftOver && this.leftOver.length) {
            if (l.uint8array) {
              var g = m;
              (m = new Uint8Array(g.length + this.leftOver.length)).set(this.leftOver, 0), m.set(g, this.leftOver.length);
            } else m = this.leftOver.concat(m);
            this.leftOver = null;
          }
          var A = (function(y, x) {
            var b;
            for ((x = x || y.length) > y.length && (x = y.length), b = x - 1; 0 <= b && (192 & y[b]) == 128; ) b--;
            return b < 0 || b === 0 ? x : b + T[y[b]] > x ? b : x;
          })(m), C = m;
          A !== m.length && (l.uint8array ? (C = m.subarray(0, A), this.leftOver = m.subarray(A, m.length)) : (C = m.slice(0, A), this.leftOver = m.slice(A, m.length))), this.push({
            data: u.utf8decode(C),
            meta: w.meta
          });
        }, v.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: u.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, u.Utf8DecodeWorker = v, i.inherits(N, f), N.prototype.processChunk = function(w) {
          this.push({
            data: u.utf8encode(w.data),
            meta: w.meta
          });
        }, u.Utf8EncodeWorker = N;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, o, u) {
        var i = r("./support"), l = r("./base64"), s = r("./nodejsUtils"), f = r("./external");
        function T(g) {
          return g;
        }
        function S(g, A) {
          for (var C = 0; C < g.length; ++C) A[C] = 255 & g.charCodeAt(C);
          return A;
        }
        r("setimmediate"), u.newBlob = function(g, A) {
          u.checkSupport("blob");
          try {
            return new Blob([g], { type: A });
          } catch {
            try {
              var C = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return C.append(g), C.getBlob(A);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var v = {
          stringifyByChunk: function(g, A, C) {
            var y = [], x = 0, b = g.length;
            if (b <= C) return String.fromCharCode.apply(null, g);
            for (; x < b; ) A === "array" || A === "nodebuffer" ? y.push(String.fromCharCode.apply(null, g.slice(x, Math.min(x + C, b)))) : y.push(String.fromCharCode.apply(null, g.subarray(x, Math.min(x + C, b)))), x += C;
            return y.join("");
          },
          stringifyByChar: function(g) {
            for (var A = "", C = 0; C < g.length; C++) A += String.fromCharCode(g[C]);
            return A;
          },
          applyCanBeUsed: {
            uint8array: (function() {
              try {
                return i.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
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
        function N(g) {
          var A = 65536, C = u.getTypeOf(g), y = !0;
          if (C === "uint8array" ? y = v.applyCanBeUsed.uint8array : C === "nodebuffer" && (y = v.applyCanBeUsed.nodebuffer), y) for (; 1 < A; ) try {
            return v.stringifyByChunk(g, C, A);
          } catch {
            A = Math.floor(A / 2);
          }
          return v.stringifyByChar(g);
        }
        function w(g, A) {
          for (var C = 0; C < g.length; C++) A[C] = g[C];
          return A;
        }
        u.applyFromCharCode = N;
        var m = {};
        m.string = {
          string: T,
          array: function(g) {
            return S(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return m.string.uint8array(g).buffer;
          },
          uint8array: function(g) {
            return S(g, new Uint8Array(g.length));
          },
          nodebuffer: function(g) {
            return S(g, s.allocBuffer(g.length));
          }
        }, m.array = {
          string: N,
          array: T,
          arraybuffer: function(g) {
            return new Uint8Array(g).buffer;
          },
          uint8array: function(g) {
            return new Uint8Array(g);
          },
          nodebuffer: function(g) {
            return s.newBufferFrom(g);
          }
        }, m.arraybuffer = {
          string: function(g) {
            return N(new Uint8Array(g));
          },
          array: function(g) {
            return w(new Uint8Array(g), new Array(g.byteLength));
          },
          arraybuffer: T,
          uint8array: function(g) {
            return new Uint8Array(g);
          },
          nodebuffer: function(g) {
            return s.newBufferFrom(new Uint8Array(g));
          }
        }, m.uint8array = {
          string: N,
          array: function(g) {
            return w(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return g.buffer;
          },
          uint8array: T,
          nodebuffer: function(g) {
            return s.newBufferFrom(g);
          }
        }, m.nodebuffer = {
          string: N,
          array: function(g) {
            return w(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return m.nodebuffer.uint8array(g).buffer;
          },
          uint8array: function(g) {
            return w(g, new Uint8Array(g.length));
          },
          nodebuffer: T
        }, u.transformTo = function(g, A) {
          return A = A || "", g ? (u.checkSupport(g), m[u.getTypeOf(A)][g](A)) : A;
        }, u.resolve = function(g) {
          for (var A = g.split("/"), C = [], y = 0; y < A.length; y++) {
            var x = A[y];
            x === "." || x === "" && y !== 0 && y !== A.length - 1 || (x === ".." ? C.pop() : C.push(x));
          }
          return C.join("/");
        }, u.getTypeOf = function(g) {
          return typeof g == "string" ? "string" : Object.prototype.toString.call(g) === "[object Array]" ? "array" : i.nodebuffer && s.isBuffer(g) ? "nodebuffer" : i.uint8array && g instanceof Uint8Array ? "uint8array" : i.arraybuffer && g instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, u.checkSupport = function(g) {
          if (!i[g.toLowerCase()]) throw new Error(g + " is not supported by this platform");
        }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(g) {
          var A, C, y = "";
          for (C = 0; C < (g || "").length; C++) y += "\\x" + ((A = g.charCodeAt(C)) < 16 ? "0" : "") + A.toString(16).toUpperCase();
          return y;
        }, u.delay = function(g, A, C) {
          setImmediate(function() {
            g.apply(C || null, A || []);
          });
        }, u.inherits = function(g, A) {
          function C() {
          }
          C.prototype = A.prototype, g.prototype = new C();
        }, u.extend = function() {
          var g, A, C = {};
          for (g = 0; g < arguments.length; g++) for (A in arguments[g]) Object.prototype.hasOwnProperty.call(arguments[g], A) && C[A] === void 0 && (C[A] = arguments[g][A]);
          return C;
        }, u.prepareContent = function(g, A, C, y, x) {
          return f.Promise.resolve(A).then(function(b) {
            return i.blob && (b instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(b)) !== -1) && typeof FileReader < "u" ? new f.Promise(function(_, p) {
              var P = new FileReader();
              P.onload = function(M) {
                _(M.target.result);
              }, P.onerror = function(M) {
                p(M.target.error);
              }, P.readAsArrayBuffer(b);
            }) : b;
          }).then(function(b) {
            var _ = u.getTypeOf(b);
            return _ ? (_ === "arraybuffer" ? b = u.transformTo("uint8array", b) : _ === "string" && (x ? b = l.decode(b) : C && y !== !0 && (b = (function(p) {
              return S(p, i.uint8array ? new Uint8Array(p.length) : new Array(p.length));
            })(b))), b) : f.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + g + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(r, o, u) {
        var i = r("./reader/readerFor"), l = r("./utils"), s = r("./signature"), f = r("./zipEntry"), T = r("./support");
        function S(v) {
          this.files = [], this.loadOptions = v;
        }
        S.prototype = {
          checkSignature: function(v) {
            if (!this.reader.readAndCheckSignature(v)) {
              this.reader.index -= 4;
              var N = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(N) + ", expected " + l.pretty(v) + ")");
            }
          },
          isSignature: function(v, N) {
            var w = this.reader.index;
            this.reader.setIndex(v);
            var m = this.reader.readString(4) === N;
            return this.reader.setIndex(w), m;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var v = this.reader.readData(this.zipCommentLength), N = T.uint8array ? "uint8array" : "array", w = l.transformTo(N, v);
            this.zipComment = this.loadOptions.decodeFileName(w);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var v, N, w, m = this.zip64EndOfCentralSize - 44; 0 < m; ) v = this.reader.readInt(2), N = this.reader.readInt(4), w = this.reader.readData(N), this.zip64ExtensibleData[v] = {
              id: v,
              length: N,
              value: w
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            var v, N;
            for (v = 0; v < this.files.length; v++) N = this.files[v], this.reader.setIndex(N.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), N.readLocalPart(this.reader), N.handleUTF8(), N.processAttributes();
          },
          readCentralDir: function() {
            var v;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (v = new f({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(v);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var v = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (v < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(v);
            var N = v;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (v = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(v), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var w = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (w += 20, w += 12 + this.zip64EndOfCentralSize);
            var m = N - w;
            if (0 < m) this.isSignature(N, s.CENTRAL_FILE_HEADER) || (this.reader.zero = m);
            else if (m < 0) throw new Error("Corrupted zip: missing " + Math.abs(m) + " bytes.");
          },
          prepareReader: function(v) {
            this.reader = i(v);
          },
          load: function(v) {
            this.prepareReader(v), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, o.exports = S;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(r, o, u) {
        var i = r("./reader/readerFor"), l = r("./utils"), s = r("./compressedObject"), f = r("./crc32"), T = r("./utf8"), S = r("./compressions"), v = r("./support");
        function N(w, m) {
          this.options = w, this.loadOptions = m;
        }
        N.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(w) {
            var m, g;
            if (w.skip(22), this.fileNameLength = w.readInt(2), g = w.readInt(2), this.fileName = w.readData(this.fileNameLength), w.skip(g), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((m = (function(A) {
              for (var C in S) if (Object.prototype.hasOwnProperty.call(S, C) && S[C].magic === A) return S[C];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
            this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, m, w.readData(this.compressedSize));
          },
          readCentralPart: function(w) {
            this.versionMadeBy = w.readInt(2), w.skip(2), this.bitFlag = w.readInt(2), this.compressionMethod = w.readString(2), this.date = w.readDate(), this.crc32 = w.readInt(4), this.compressedSize = w.readInt(4), this.uncompressedSize = w.readInt(4);
            var m = w.readInt(2);
            if (this.extraFieldsLength = w.readInt(2), this.fileCommentLength = w.readInt(2), this.diskNumberStart = w.readInt(2), this.internalFileAttributes = w.readInt(2), this.externalFileAttributes = w.readInt(4), this.localHeaderOffset = w.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            w.skip(m), this.readExtraFields(w), this.parseZIP64ExtraField(w), this.fileComment = w.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var w = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), w == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), w == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var w = i(this.extraFields[1].value);
              this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = w.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = w.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = w.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = w.readInt(4));
            }
          },
          readExtraFields: function(w) {
            var m, g, A, C = w.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); w.index + 4 < C; ) m = w.readInt(2), g = w.readInt(2), A = w.readData(g), this.extraFields[m] = {
              id: m,
              length: g,
              value: A
            };
            w.setIndex(C);
          },
          handleUTF8: function() {
            var w = v.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = T.utf8decode(this.fileName), this.fileCommentStr = T.utf8decode(this.fileComment);
            else {
              var m = this.findExtraFieldUnicodePath();
              if (m !== null) this.fileNameStr = m;
              else {
                var g = l.transformTo(w, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(g);
              }
              var A = this.findExtraFieldUnicodeComment();
              if (A !== null) this.fileCommentStr = A;
              else {
                var C = l.transformTo(w, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(C);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var w = this.extraFields[28789];
            if (w) {
              var m = i(w.value);
              return m.readInt(1) !== 1 || f(this.fileName) !== m.readInt(4) ? null : T.utf8decode(m.readData(w.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var w = this.extraFields[25461];
            if (w) {
              var m = i(w.value);
              return m.readInt(1) !== 1 || f(this.fileComment) !== m.readInt(4) ? null : T.utf8decode(m.readData(w.length - 5));
            }
            return null;
          }
        }, o.exports = N;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(r, o, u) {
        function i(m, g, A) {
          this.name = m, this.dir = A.dir, this.date = A.date, this.comment = A.comment, this.unixPermissions = A.unixPermissions, this.dosPermissions = A.dosPermissions, this._data = g, this._dataBinary = A.binary, this.options = {
            compression: A.compression,
            compressionOptions: A.compressionOptions
          };
        }
        var l = r("./stream/StreamHelper"), s = r("./stream/DataWorker"), f = r("./utf8"), T = r("./compressedObject"), S = r("./stream/GenericWorker");
        i.prototype = {
          internalStream: function(m) {
            var g = null, A = "string";
            try {
              if (!m) throw new Error("No output type specified.");
              var C = (A = m.toLowerCase()) === "string" || A === "text";
              A !== "binarystring" && A !== "text" || (A = "string"), g = this._decompressWorker();
              var y = !this._dataBinary;
              y && !C && (g = g.pipe(new f.Utf8EncodeWorker())), !y && C && (g = g.pipe(new f.Utf8DecodeWorker()));
            } catch (x) {
              (g = new S("error")).error(x);
            }
            return new l(g, A, "");
          },
          async: function(m, g) {
            return this.internalStream(m).accumulate(g);
          },
          nodeStream: function(m, g) {
            return this.internalStream(m || "nodebuffer").toNodejsStream(g);
          },
          _compressWorker: function(m, g) {
            if (this._data instanceof T && this._data.compression.magic === m.magic) return this._data.getCompressedWorker();
            var A = this._decompressWorker();
            return this._dataBinary || (A = A.pipe(new f.Utf8EncodeWorker())), T.createWorkerFrom(A, m, g);
          },
          _decompressWorker: function() {
            return this._data instanceof T ? this._data.getContentWorker() : this._data instanceof S ? this._data : new s(this._data);
          }
        };
        for (var v = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], N = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, w = 0; w < v.length; w++) i.prototype[v[w]] = N;
        o.exports = i;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(r, o, u) {
        (function(i) {
          var l, s, f = i.MutationObserver || i.WebKitMutationObserver;
          if (f) {
            var T = 0, S = new f(m), v = i.document.createTextNode("");
            S.observe(v, { characterData: !0 }), l = function() {
              v.data = T = ++T % 2;
            };
          } else if (i.setImmediate || i.MessageChannel === void 0) l = "document" in i && "onreadystatechange" in i.document.createElement("script") ? function() {
            var g = i.document.createElement("script");
            g.onreadystatechange = function() {
              m(), g.onreadystatechange = null, g.parentNode.removeChild(g), g = null;
            }, i.document.documentElement.appendChild(g);
          } : function() {
            setTimeout(m, 0);
          };
          else {
            var N = new i.MessageChannel();
            N.port1.onmessage = m, l = function() {
              N.port2.postMessage(0);
            };
          }
          var w = [];
          function m() {
            var g, A;
            s = !0;
            for (var C = w.length; C; ) {
              for (A = w, w = [], g = -1; ++g < C; ) A[g]();
              C = w.length;
            }
            s = !1;
          }
          o.exports = function(g) {
            w.push(g) !== 1 || s || l();
          };
        }).call(this, typeof Ie < "u" ? Ie : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, o, u) {
        var i = r("immediate");
        function l() {
        }
        var s = {}, f = ["REJECTED"], T = ["FULFILLED"], S = ["PENDING"];
        function v(C) {
          if (typeof C != "function") throw new TypeError("resolver must be a function");
          this.state = S, this.queue = [], this.outcome = void 0, C !== l && g(this, C);
        }
        function N(C, y, x) {
          this.promise = C, typeof y == "function" && (this.onFulfilled = y, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
        }
        function w(C, y, x) {
          i(function() {
            var b;
            try {
              b = y(x);
            } catch (_) {
              return s.reject(C, _);
            }
            b === C ? s.reject(C, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : s.resolve(C, b);
          });
        }
        function m(C) {
          var y = C && C.then;
          if (C && (typeof C == "object" || typeof C == "function") && typeof y == "function") return function() {
            y.apply(C, arguments);
          };
        }
        function g(C, y) {
          var x = !1;
          function b(P) {
            x || (x = !0, s.reject(C, P));
          }
          function _(P) {
            x || (x = !0, s.resolve(C, P));
          }
          var p = A(function() {
            y(_, b);
          });
          p.status === "error" && b(p.value);
        }
        function A(C, y) {
          var x = {};
          try {
            x.value = C(y), x.status = "success";
          } catch (b) {
            x.status = "error", x.value = b;
          }
          return x;
        }
        (o.exports = v).prototype.finally = function(C) {
          if (typeof C != "function") return this;
          var y = this.constructor;
          return this.then(function(x) {
            return y.resolve(C()).then(function() {
              return x;
            });
          }, function(x) {
            return y.resolve(C()).then(function() {
              throw x;
            });
          });
        }, v.prototype.catch = function(C) {
          return this.then(null, C);
        }, v.prototype.then = function(C, y) {
          if (typeof C != "function" && this.state === T || typeof y != "function" && this.state === f) return this;
          var x = new this.constructor(l);
          return this.state !== S ? w(x, this.state === T ? C : y, this.outcome) : this.queue.push(new N(x, C, y)), x;
        }, N.prototype.callFulfilled = function(C) {
          s.resolve(this.promise, C);
        }, N.prototype.otherCallFulfilled = function(C) {
          w(this.promise, this.onFulfilled, C);
        }, N.prototype.callRejected = function(C) {
          s.reject(this.promise, C);
        }, N.prototype.otherCallRejected = function(C) {
          w(this.promise, this.onRejected, C);
        }, s.resolve = function(C, y) {
          var x = A(m, y);
          if (x.status === "error") return s.reject(C, x.value);
          var b = x.value;
          if (b) g(C, b);
          else {
            C.state = T, C.outcome = y;
            for (var _ = -1, p = C.queue.length; ++_ < p; ) C.queue[_].callFulfilled(y);
          }
          return C;
        }, s.reject = function(C, y) {
          C.state = f, C.outcome = y;
          for (var x = -1, b = C.queue.length; ++x < b; ) C.queue[x].callRejected(y);
          return C;
        }, v.resolve = function(C) {
          return C instanceof this ? C : s.resolve(new this(l), C);
        }, v.reject = function(C) {
          var y = new this(l);
          return s.reject(y, C);
        }, v.all = function(C) {
          var y = this;
          if (Object.prototype.toString.call(C) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var x = C.length, b = !1;
          if (!x) return this.resolve([]);
          for (var _ = new Array(x), p = 0, P = -1, M = new this(l); ++P < x; ) R(C[P], P);
          return M;
          function R(q, Q) {
            y.resolve(q).then(function(O) {
              _[Q] = O, ++p !== x || b || (b = !0, s.resolve(M, _));
            }, function(O) {
              b || (b = !0, s.reject(M, O));
            });
          }
        }, v.race = function(C) {
          var y = this;
          if (Object.prototype.toString.call(C) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var x = C.length, b = !1;
          if (!x) return this.resolve([]);
          for (var _ = -1, p = new this(l); ++_ < x; ) P = C[_], y.resolve(P).then(function(M) {
            b || (b = !0, s.resolve(p, M));
          }, function(M) {
            b || (b = !0, s.reject(p, M));
          });
          var P;
          return p;
        };
      }, { immediate: 36 }],
      38: [function(r, o, u) {
        var i = {};
        (0, r("./lib/utils/common").assign)(i, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), o.exports = i;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, o, u) {
        var i = r("./zlib/deflate"), l = r("./utils/common"), s = r("./utils/strings"), f = r("./zlib/messages"), T = r("./zlib/zstream"), S = Object.prototype.toString, v = 0, N = -1, w = 0, m = 8;
        function g(C) {
          if (!(this instanceof g)) return new g(C);
          this.options = l.assign({
            level: N,
            method: m,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: w,
            to: ""
          }, C || {});
          var y = this.options;
          y.raw && 0 < y.windowBits ? y.windowBits = -y.windowBits : y.gzip && 0 < y.windowBits && y.windowBits < 16 && (y.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new T(), this.strm.avail_out = 0;
          var x = i.deflateInit2(this.strm, y.level, y.method, y.windowBits, y.memLevel, y.strategy);
          if (x !== v) throw new Error(f[x]);
          if (y.header && i.deflateSetHeader(this.strm, y.header), y.dictionary) {
            var b;
            if (b = typeof y.dictionary == "string" ? s.string2buf(y.dictionary) : S.call(y.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(y.dictionary) : y.dictionary, (x = i.deflateSetDictionary(this.strm, b)) !== v) throw new Error(f[x]);
            this._dict_set = !0;
          }
        }
        function A(C, y) {
          var x = new g(y);
          if (x.push(C, !0), x.err) throw x.msg || f[x.err];
          return x.result;
        }
        g.prototype.push = function(C, y) {
          var x, b, _ = this.strm, p = this.options.chunkSize;
          if (this.ended) return !1;
          b = y === ~~y ? y : y === !0 ? 4 : 0, typeof C == "string" ? _.input = s.string2buf(C) : S.call(C) === "[object ArrayBuffer]" ? _.input = new Uint8Array(C) : _.input = C, _.next_in = 0, _.avail_in = _.input.length;
          do {
            if (_.avail_out === 0 && (_.output = new l.Buf8(p), _.next_out = 0, _.avail_out = p), (x = i.deflate(_, b)) !== 1 && x !== v) return this.onEnd(x), !(this.ended = !0);
            _.avail_out !== 0 && (_.avail_in !== 0 || b !== 4 && b !== 2) || (this.options.to === "string" ? this.onData(s.buf2binstring(l.shrinkBuf(_.output, _.next_out))) : this.onData(l.shrinkBuf(_.output, _.next_out)));
          } while ((0 < _.avail_in || _.avail_out === 0) && x !== 1);
          return b === 4 ? (x = i.deflateEnd(this.strm), this.onEnd(x), this.ended = !0, x === v) : b !== 2 || (this.onEnd(v), !(_.avail_out = 0));
        }, g.prototype.onData = function(C) {
          this.chunks.push(C);
        }, g.prototype.onEnd = function(C) {
          C === v && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = C, this.msg = this.strm.msg;
        }, u.Deflate = g, u.deflate = A, u.deflateRaw = function(C, y) {
          return (y = y || {}).raw = !0, A(C, y);
        }, u.gzip = function(C, y) {
          return (y = y || {}).gzip = !0, A(C, y);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, o, u) {
        var i = r("./zlib/inflate"), l = r("./utils/common"), s = r("./utils/strings"), f = r("./zlib/constants"), T = r("./zlib/messages"), S = r("./zlib/zstream"), v = r("./zlib/gzheader"), N = Object.prototype.toString;
        function w(g) {
          if (!(this instanceof w)) return new w(g);
          this.options = l.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, g || {});
          var A = this.options;
          A.raw && 0 <= A.windowBits && A.windowBits < 16 && (A.windowBits = -A.windowBits, A.windowBits === 0 && (A.windowBits = -15)), !(0 <= A.windowBits && A.windowBits < 16) || g && g.windowBits || (A.windowBits += 32), 15 < A.windowBits && A.windowBits < 48 && (15 & A.windowBits) == 0 && (A.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
          var C = i.inflateInit2(this.strm, A.windowBits);
          if (C !== f.Z_OK) throw new Error(T[C]);
          this.header = new v(), i.inflateGetHeader(this.strm, this.header);
        }
        function m(g, A) {
          var C = new w(A);
          if (C.push(g, !0), C.err) throw C.msg || T[C.err];
          return C.result;
        }
        w.prototype.push = function(g, A) {
          var C, y, x, b, _, p, P = this.strm, M = this.options.chunkSize, R = this.options.dictionary, q = !1;
          if (this.ended) return !1;
          y = A === ~~A ? A : A === !0 ? f.Z_FINISH : f.Z_NO_FLUSH, typeof g == "string" ? P.input = s.binstring2buf(g) : N.call(g) === "[object ArrayBuffer]" ? P.input = new Uint8Array(g) : P.input = g, P.next_in = 0, P.avail_in = P.input.length;
          do {
            if (P.avail_out === 0 && (P.output = new l.Buf8(M), P.next_out = 0, P.avail_out = M), (C = i.inflate(P, f.Z_NO_FLUSH)) === f.Z_NEED_DICT && R && (p = typeof R == "string" ? s.string2buf(R) : N.call(R) === "[object ArrayBuffer]" ? new Uint8Array(R) : R, C = i.inflateSetDictionary(this.strm, p)), C === f.Z_BUF_ERROR && q === !0 && (C = f.Z_OK, q = !1), C !== f.Z_STREAM_END && C !== f.Z_OK) return this.onEnd(C), !(this.ended = !0);
            P.next_out && (P.avail_out !== 0 && C !== f.Z_STREAM_END && (P.avail_in !== 0 || y !== f.Z_FINISH && y !== f.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = s.utf8border(P.output, P.next_out), b = P.next_out - x, _ = s.buf2string(P.output, x), P.next_out = b, P.avail_out = M - b, b && l.arraySet(P.output, P.output, x, b, 0), this.onData(_)) : this.onData(l.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (q = !0);
          } while ((0 < P.avail_in || P.avail_out === 0) && C !== f.Z_STREAM_END);
          return C === f.Z_STREAM_END && (y = f.Z_FINISH), y === f.Z_FINISH ? (C = i.inflateEnd(this.strm), this.onEnd(C), this.ended = !0, C === f.Z_OK) : y !== f.Z_SYNC_FLUSH || (this.onEnd(f.Z_OK), !(P.avail_out = 0));
        }, w.prototype.onData = function(g) {
          this.chunks.push(g);
        }, w.prototype.onEnd = function(g) {
          g === f.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
        }, u.Inflate = w, u.inflate = m, u.inflateRaw = function(g, A) {
          return (A = A || {}).raw = !0, m(g, A);
        }, u.ungzip = m;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, o, u) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        u.assign = function(f) {
          for (var T = Array.prototype.slice.call(arguments, 1); T.length; ) {
            var S = T.shift();
            if (S) {
              if (typeof S != "object") throw new TypeError(S + "must be non-object");
              for (var v in S) S.hasOwnProperty(v) && (f[v] = S[v]);
            }
          }
          return f;
        }, u.shrinkBuf = function(f, T) {
          return f.length === T ? f : f.subarray ? f.subarray(0, T) : (f.length = T, f);
        };
        var l = {
          arraySet: function(f, T, S, v, N) {
            if (T.subarray && f.subarray) f.set(T.subarray(S, S + v), N);
            else for (var w = 0; w < v; w++) f[N + w] = T[S + w];
          },
          flattenChunks: function(f) {
            var T, S, v, N, w, m;
            for (T = v = 0, S = f.length; T < S; T++) v += f[T].length;
            for (m = new Uint8Array(v), T = N = 0, S = f.length; T < S; T++) w = f[T], m.set(w, N), N += w.length;
            return m;
          }
        }, s = {
          arraySet: function(f, T, S, v, N) {
            for (var w = 0; w < v; w++) f[N + w] = T[S + w];
          },
          flattenChunks: function(f) {
            return [].concat.apply([], f);
          }
        };
        u.setTyped = function(f) {
          f ? (u.Buf8 = Uint8Array, u.Buf16 = Uint16Array, u.Buf32 = Int32Array, u.assign(u, l)) : (u.Buf8 = Array, u.Buf16 = Array, u.Buf32 = Array, u.assign(u, s));
        }, u.setTyped(i);
      }, {}],
      42: [function(r, o, u) {
        var i = r("./common"), l = !0, s = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          l = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          s = !1;
        }
        for (var f = new i.Buf8(256), T = 0; T < 256; T++) f[T] = 252 <= T ? 6 : 248 <= T ? 5 : 240 <= T ? 4 : 224 <= T ? 3 : 192 <= T ? 2 : 1;
        function S(v, N) {
          if (N < 65537 && (v.subarray && s || !v.subarray && l)) return String.fromCharCode.apply(null, i.shrinkBuf(v, N));
          for (var w = "", m = 0; m < N; m++) w += String.fromCharCode(v[m]);
          return w;
        }
        f[254] = f[254] = 1, u.string2buf = function(v) {
          var N, w, m, g, A, C = v.length, y = 0;
          for (g = 0; g < C; g++) (64512 & (w = v.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (m = v.charCodeAt(g + 1))) == 56320 && (w = 65536 + (w - 55296 << 10) + (m - 56320), g++), y += w < 128 ? 1 : w < 2048 ? 2 : w < 65536 ? 3 : 4;
          for (N = new i.Buf8(y), g = A = 0; A < y; g++) (64512 & (w = v.charCodeAt(g))) == 55296 && g + 1 < C && (64512 & (m = v.charCodeAt(g + 1))) == 56320 && (w = 65536 + (w - 55296 << 10) + (m - 56320), g++), w < 128 ? N[A++] = w : (w < 2048 ? N[A++] = 192 | w >>> 6 : (w < 65536 ? N[A++] = 224 | w >>> 12 : (N[A++] = 240 | w >>> 18, N[A++] = 128 | w >>> 12 & 63), N[A++] = 128 | w >>> 6 & 63), N[A++] = 128 | 63 & w);
          return N;
        }, u.buf2binstring = function(v) {
          return S(v, v.length);
        }, u.binstring2buf = function(v) {
          for (var N = new i.Buf8(v.length), w = 0, m = N.length; w < m; w++) N[w] = v.charCodeAt(w);
          return N;
        }, u.buf2string = function(v, N) {
          var w, m, g, A, C = N || v.length, y = new Array(2 * C);
          for (w = m = 0; w < C; ) if ((g = v[w++]) < 128) y[m++] = g;
          else if (4 < (A = f[g])) y[m++] = 65533, w += A - 1;
          else {
            for (g &= A === 2 ? 31 : A === 3 ? 15 : 7; 1 < A && w < C; ) g = g << 6 | 63 & v[w++], A--;
            1 < A ? y[m++] = 65533 : g < 65536 ? y[m++] = g : (g -= 65536, y[m++] = 55296 | g >> 10 & 1023, y[m++] = 56320 | 1023 & g);
          }
          return S(y, m);
        }, u.utf8border = function(v, N) {
          var w;
          for ((N = N || v.length) > v.length && (N = v.length), w = N - 1; 0 <= w && (192 & v[w]) == 128; ) w--;
          return w < 0 || w === 0 ? N : w + f[v[w]] > N ? w : N;
        };
      }, { "./common": 41 }],
      43: [function(r, o, u) {
        o.exports = function(i, l, s, f) {
          for (var T = 65535 & i | 0, S = i >>> 16 & 65535 | 0, v = 0; s !== 0; ) {
            for (s -= v = 2e3 < s ? 2e3 : s; S = S + (T = T + l[f++] | 0) | 0, --v; ) ;
            T %= 65521, S %= 65521;
          }
          return T | S << 16 | 0;
        };
      }, {}],
      44: [function(r, o, u) {
        o.exports = {
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
      45: [function(r, o, u) {
        var i = (function() {
          for (var l, s = [], f = 0; f < 256; f++) {
            l = f;
            for (var T = 0; T < 8; T++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
            s[f] = l;
          }
          return s;
        })();
        o.exports = function(l, s, f, T) {
          var S = i, v = T + f;
          l ^= -1;
          for (var N = T; N < v; N++) l = l >>> 8 ^ S[255 & (l ^ s[N])];
          return -1 ^ l;
        };
      }, {}],
      46: [function(r, o, u) {
        var i, l = r("../utils/common"), s = r("./trees"), f = r("./adler32"), T = r("./crc32"), S = r("./messages"), v = 0, N = 4, w = 0, m = -2, g = -1, A = 4, C = 2, y = 8, x = 9, b = 286, _ = 30, p = 19, P = 2 * b + 1, M = 15, R = 3, q = 258, Q = q + R + 1, O = 42, W = 113, k = 1, H = 2, J = 3, $ = 4;
        function oe(c, K) {
          return c.msg = S[K], K;
        }
        function Z(c) {
          return (c << 1) - (4 < c ? 9 : 0);
        }
        function te(c) {
          for (var K = c.length; 0 <= --K; ) c[K] = 0;
        }
        function V(c) {
          var K = c.state, I = K.pending;
          I > c.avail_out && (I = c.avail_out), I !== 0 && (l.arraySet(c.output, K.pending_buf, K.pending_out, I, c.next_out), c.next_out += I, K.pending_out += I, c.total_out += I, c.avail_out -= I, K.pending -= I, K.pending === 0 && (K.pending_out = 0));
        }
        function F(c, K) {
          s._tr_flush_block(c, 0 <= c.block_start ? c.block_start : -1, c.strstart - c.block_start, K), c.block_start = c.strstart, V(c.strm);
        }
        function X(c, K) {
          c.pending_buf[c.pending++] = K;
        }
        function Y(c, K) {
          c.pending_buf[c.pending++] = K >>> 8 & 255, c.pending_buf[c.pending++] = 255 & K;
        }
        function re(c, K) {
          var I, n, a = c.max_chain_length, d = c.strstart, L = c.prev_length, G = c.nice_match, z = c.strstart > c.w_size - Q ? c.strstart - (c.w_size - Q) : 0, ie = c.window, le = c.w_mask, se = c.prev, he = c.strstart + q, me = ie[d + L - 1], ge = ie[d + L];
          c.prev_length >= c.good_match && (a >>= 2), G > c.lookahead && (G = c.lookahead);
          do
            if (ie[(I = K) + L] === ge && ie[I + L - 1] === me && ie[I] === ie[d] && ie[++I] === ie[d + 1]) {
              d += 2, I++;
              do
                ;
              while (ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && ie[++d] === ie[++I] && d < he);
              if (n = q - (he - d), d = he - q, L < n) {
                if (c.match_start = K, G <= (L = n)) break;
                me = ie[d + L - 1], ge = ie[d + L];
              }
            }
          while ((K = se[K & le]) > z && --a != 0);
          return L <= c.lookahead ? L : c.lookahead;
        }
        function de(c) {
          var K, I, n, a, d, L, G, z, ie, le, se = c.w_size;
          do {
            if (a = c.window_size - c.lookahead - c.strstart, c.strstart >= se + (se - Q)) {
              for (l.arraySet(c.window, c.window, se, se, 0), c.match_start -= se, c.strstart -= se, c.block_start -= se, K = I = c.hash_size; n = c.head[--K], c.head[K] = se <= n ? n - se : 0, --I; ) ;
              for (K = I = se; n = c.prev[--K], c.prev[K] = se <= n ? n - se : 0, --I; ) ;
              a += se;
            }
            if (c.strm.avail_in === 0) break;
            if (L = c.strm, G = c.window, z = c.strstart + c.lookahead, ie = a, le = void 0, le = L.avail_in, ie < le && (le = ie), I = le === 0 ? 0 : (L.avail_in -= le, l.arraySet(G, L.input, L.next_in, le, z), L.state.wrap === 1 ? L.adler = f(L.adler, G, le, z) : L.state.wrap === 2 && (L.adler = T(L.adler, G, le, z)), L.next_in += le, L.total_in += le, le), c.lookahead += I, c.lookahead + c.insert >= R) for (d = c.strstart - c.insert, c.ins_h = c.window[d], c.ins_h = (c.ins_h << c.hash_shift ^ c.window[d + 1]) & c.hash_mask; c.insert && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[d + R - 1]) & c.hash_mask, c.prev[d & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = d, d++, c.insert--, !(c.lookahead + c.insert < R)); ) ;
          } while (c.lookahead < Q && c.strm.avail_in !== 0);
        }
        function E(c, K) {
          for (var I, n; ; ) {
            if (c.lookahead < Q) {
              if (de(c), c.lookahead < Q && K === v) return k;
              if (c.lookahead === 0) break;
            }
            if (I = 0, c.lookahead >= R && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + R - 1]) & c.hash_mask, I = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), I !== 0 && c.strstart - I <= c.w_size - Q && (c.match_length = re(c, I)), c.match_length >= R) if (n = s._tr_tally(c, c.strstart - c.match_start, c.match_length - R), c.lookahead -= c.match_length, c.match_length <= c.max_lazy_match && c.lookahead >= R) {
              for (c.match_length--; c.strstart++, c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + R - 1]) & c.hash_mask, I = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart, --c.match_length != 0; ) ;
              c.strstart++;
            } else c.strstart += c.match_length, c.match_length = 0, c.ins_h = c.window[c.strstart], c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + 1]) & c.hash_mask;
            else n = s._tr_tally(c, 0, c.window[c.strstart]), c.lookahead--, c.strstart++;
            if (n && (F(c, !1), c.strm.avail_out === 0)) return k;
          }
          return c.insert = c.strstart < R - 1 ? c.strstart : R - 1, K === N ? (F(c, !0), c.strm.avail_out === 0 ? J : $) : c.last_lit && (F(c, !1), c.strm.avail_out === 0) ? k : H;
        }
        function h(c, K) {
          for (var I, n, a; ; ) {
            if (c.lookahead < Q) {
              if (de(c), c.lookahead < Q && K === v) return k;
              if (c.lookahead === 0) break;
            }
            if (I = 0, c.lookahead >= R && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + R - 1]) & c.hash_mask, I = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), c.prev_length = c.match_length, c.prev_match = c.match_start, c.match_length = R - 1, I !== 0 && c.prev_length < c.max_lazy_match && c.strstart - I <= c.w_size - Q && (c.match_length = re(c, I), c.match_length <= 5 && (c.strategy === 1 || c.match_length === R && 4096 < c.strstart - c.match_start) && (c.match_length = R - 1)), c.prev_length >= R && c.match_length <= c.prev_length) {
              for (a = c.strstart + c.lookahead - R, n = s._tr_tally(c, c.strstart - 1 - c.prev_match, c.prev_length - R), c.lookahead -= c.prev_length - 1, c.prev_length -= 2; ++c.strstart <= a && (c.ins_h = (c.ins_h << c.hash_shift ^ c.window[c.strstart + R - 1]) & c.hash_mask, I = c.prev[c.strstart & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = c.strstart), --c.prev_length != 0; ) ;
              if (c.match_available = 0, c.match_length = R - 1, c.strstart++, n && (F(c, !1), c.strm.avail_out === 0)) return k;
            } else if (c.match_available) {
              if ((n = s._tr_tally(c, 0, c.window[c.strstart - 1])) && F(c, !1), c.strstart++, c.lookahead--, c.strm.avail_out === 0) return k;
            } else c.match_available = 1, c.strstart++, c.lookahead--;
          }
          return c.match_available && (n = s._tr_tally(c, 0, c.window[c.strstart - 1]), c.match_available = 0), c.insert = c.strstart < R - 1 ? c.strstart : R - 1, K === N ? (F(c, !0), c.strm.avail_out === 0 ? J : $) : c.last_lit && (F(c, !1), c.strm.avail_out === 0) ? k : H;
        }
        function j(c, K, I, n, a) {
          this.good_length = c, this.max_lazy = K, this.nice_length = I, this.max_chain = n, this.func = a;
        }
        function U() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * P), this.dyn_dtree = new l.Buf16(2 * (2 * _ + 1)), this.bl_tree = new l.Buf16(2 * (2 * p + 1)), te(this.dyn_ltree), te(this.dyn_dtree), te(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(M + 1), this.heap = new l.Buf16(2 * b + 1), te(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * b + 1), te(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function ne(c) {
          var K;
          return c && c.state ? (c.total_in = c.total_out = 0, c.data_type = C, (K = c.state).pending = 0, K.pending_out = 0, K.wrap < 0 && (K.wrap = -K.wrap), K.status = K.wrap ? O : W, c.adler = K.wrap === 2 ? 0 : 1, K.last_flush = v, s._tr_init(K), w) : oe(c, m);
        }
        function D(c) {
          var K = ne(c);
          return K === w && (function(I) {
            I.window_size = 2 * I.w_size, te(I.head), I.max_lazy_match = i[I.level].max_lazy, I.good_match = i[I.level].good_length, I.nice_match = i[I.level].nice_length, I.max_chain_length = i[I.level].max_chain, I.strstart = 0, I.block_start = 0, I.lookahead = 0, I.insert = 0, I.match_length = I.prev_length = R - 1, I.match_available = 0, I.ins_h = 0;
          })(c.state), K;
        }
        function B(c, K, I, n, a, d) {
          if (!c) return m;
          var L = 1;
          if (K === g && (K = 6), n < 0 ? (L = 0, n = -n) : 15 < n && (L = 2, n -= 16), a < 1 || x < a || I !== y || n < 8 || 15 < n || K < 0 || 9 < K || d < 0 || A < d) return oe(c, m);
          n === 8 && (n = 9);
          var G = new U();
          return (c.state = G).strm = c, G.wrap = L, G.gzhead = null, G.w_bits = n, G.w_size = 1 << G.w_bits, G.w_mask = G.w_size - 1, G.hash_bits = a + 7, G.hash_size = 1 << G.hash_bits, G.hash_mask = G.hash_size - 1, G.hash_shift = ~~((G.hash_bits + R - 1) / R), G.window = new l.Buf8(2 * G.w_size), G.head = new l.Buf16(G.hash_size), G.prev = new l.Buf16(G.w_size), G.lit_bufsize = 1 << a + 6, G.pending_buf_size = 4 * G.lit_bufsize, G.pending_buf = new l.Buf8(G.pending_buf_size), G.d_buf = 1 * G.lit_bufsize, G.l_buf = 3 * G.lit_bufsize, G.level = K, G.strategy = d, G.method = I, D(c);
        }
        i = [
          new j(0, 0, 0, 0, function(c, K) {
            var I = 65535;
            for (I > c.pending_buf_size - 5 && (I = c.pending_buf_size - 5); ; ) {
              if (c.lookahead <= 1) {
                if (de(c), c.lookahead === 0 && K === v) return k;
                if (c.lookahead === 0) break;
              }
              c.strstart += c.lookahead, c.lookahead = 0;
              var n = c.block_start + I;
              if ((c.strstart === 0 || c.strstart >= n) && (c.lookahead = c.strstart - n, c.strstart = n, F(c, !1), c.strm.avail_out === 0) || c.strstart - c.block_start >= c.w_size - Q && (F(c, !1), c.strm.avail_out === 0)) return k;
            }
            return c.insert = 0, K === N ? (F(c, !0), c.strm.avail_out === 0 ? J : $) : (c.strstart > c.block_start && (F(c, !1), c.strm.avail_out), k);
          }),
          new j(4, 4, 8, 4, E),
          new j(4, 5, 16, 8, E),
          new j(4, 6, 32, 32, E),
          new j(4, 4, 16, 16, h),
          new j(8, 16, 32, 32, h),
          new j(8, 16, 128, 128, h),
          new j(8, 32, 128, 256, h),
          new j(32, 128, 258, 1024, h),
          new j(32, 258, 258, 4096, h)
        ], u.deflateInit = function(c, K) {
          return B(c, K, y, 15, 8, 0);
        }, u.deflateInit2 = B, u.deflateReset = D, u.deflateResetKeep = ne, u.deflateSetHeader = function(c, K) {
          return c && c.state ? c.state.wrap !== 2 ? m : (c.state.gzhead = K, w) : m;
        }, u.deflate = function(c, K) {
          var I, n, a, d;
          if (!c || !c.state || 5 < K || K < 0) return c ? oe(c, m) : m;
          if (n = c.state, !c.output || !c.input && c.avail_in !== 0 || n.status === 666 && K !== N) return oe(c, c.avail_out === 0 ? -5 : m);
          if (n.strm = c, I = n.last_flush, n.last_flush = K, n.status === O) if (n.wrap === 2) c.adler = 0, X(n, 31), X(n, 139), X(n, 8), n.gzhead ? (X(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), X(n, 255 & n.gzhead.time), X(n, n.gzhead.time >> 8 & 255), X(n, n.gzhead.time >> 16 & 255), X(n, n.gzhead.time >> 24 & 255), X(n, n.level === 9 ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), X(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (X(n, 255 & n.gzhead.extra.length), X(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (c.adler = T(c.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (X(n, 0), X(n, 0), X(n, 0), X(n, 0), X(n, 0), X(n, n.level === 9 ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), X(n, 3), n.status = W);
          else {
            var L = y + (n.w_bits - 8 << 4) << 8;
            L |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3) << 6, n.strstart !== 0 && (L |= 32), L += 31 - L % 31, n.status = W, Y(n, L), n.strstart !== 0 && (Y(n, c.adler >>> 16), Y(n, 65535 & c.adler)), c.adler = 1;
          }
          if (n.status === 69) if (n.gzhead.extra) {
            for (a = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), V(c), a = n.pending, n.pending !== n.pending_buf_size)); ) X(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
            n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
          } else n.status = 73;
          if (n.status === 73) if (n.gzhead.name) {
            a = n.pending;
            do {
              if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), V(c), a = n.pending, n.pending === n.pending_buf_size)) {
                d = 1;
                break;
              }
              d = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, X(n, d);
            } while (d !== 0);
            n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), d === 0 && (n.gzindex = 0, n.status = 91);
          } else n.status = 91;
          if (n.status === 91) if (n.gzhead.comment) {
            a = n.pending;
            do {
              if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), V(c), a = n.pending, n.pending === n.pending_buf_size)) {
                d = 1;
                break;
              }
              d = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, X(n, d);
            } while (d !== 0);
            n.gzhead.hcrc && n.pending > a && (c.adler = T(c.adler, n.pending_buf, n.pending - a, a)), d === 0 && (n.status = 103);
          } else n.status = 103;
          if (n.status === 103 && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && V(c), n.pending + 2 <= n.pending_buf_size && (X(n, 255 & c.adler), X(n, c.adler >> 8 & 255), c.adler = 0, n.status = W)) : n.status = W), n.pending !== 0) {
            if (V(c), c.avail_out === 0) return n.last_flush = -1, w;
          } else if (c.avail_in === 0 && Z(K) <= Z(I) && K !== N) return oe(c, -5);
          if (n.status === 666 && c.avail_in !== 0) return oe(c, -5);
          if (c.avail_in !== 0 || n.lookahead !== 0 || K !== v && n.status !== 666) {
            var G = n.strategy === 2 ? (function(z, ie) {
              for (var le; ; ) {
                if (z.lookahead === 0 && (de(z), z.lookahead === 0)) {
                  if (ie === v) return k;
                  break;
                }
                if (z.match_length = 0, le = s._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, le && (F(z, !1), z.strm.avail_out === 0)) return k;
              }
              return z.insert = 0, ie === N ? (F(z, !0), z.strm.avail_out === 0 ? J : $) : z.last_lit && (F(z, !1), z.strm.avail_out === 0) ? k : H;
            })(n, K) : n.strategy === 3 ? (function(z, ie) {
              for (var le, se, he, me, ge = z.window; ; ) {
                if (z.lookahead <= q) {
                  if (de(z), z.lookahead <= q && ie === v) return k;
                  if (z.lookahead === 0) break;
                }
                if (z.match_length = 0, z.lookahead >= R && 0 < z.strstart && (se = ge[he = z.strstart - 1]) === ge[++he] && se === ge[++he] && se === ge[++he]) {
                  me = z.strstart + q;
                  do
                    ;
                  while (se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && he < me);
                  z.match_length = q - (me - he), z.match_length > z.lookahead && (z.match_length = z.lookahead);
                }
                if (z.match_length >= R ? (le = s._tr_tally(z, 1, z.match_length - R), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (le = s._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), le && (F(z, !1), z.strm.avail_out === 0)) return k;
              }
              return z.insert = 0, ie === N ? (F(z, !0), z.strm.avail_out === 0 ? J : $) : z.last_lit && (F(z, !1), z.strm.avail_out === 0) ? k : H;
            })(n, K) : i[n.level].func(n, K);
            if (G !== J && G !== $ || (n.status = 666), G === k || G === J) return c.avail_out === 0 && (n.last_flush = -1), w;
            if (G === H && (K === 1 ? s._tr_align(n) : K !== 5 && (s._tr_stored_block(n, 0, 0, !1), K === 3 && (te(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), V(c), c.avail_out === 0)) return n.last_flush = -1, w;
          }
          return K !== N ? w : n.wrap <= 0 ? 1 : (n.wrap === 2 ? (X(n, 255 & c.adler), X(n, c.adler >> 8 & 255), X(n, c.adler >> 16 & 255), X(n, c.adler >> 24 & 255), X(n, 255 & c.total_in), X(n, c.total_in >> 8 & 255), X(n, c.total_in >> 16 & 255), X(n, c.total_in >> 24 & 255)) : (Y(n, c.adler >>> 16), Y(n, 65535 & c.adler)), V(c), 0 < n.wrap && (n.wrap = -n.wrap), n.pending !== 0 ? w : 1);
        }, u.deflateEnd = function(c) {
          var K;
          return c && c.state ? (K = c.state.status) !== O && K !== 69 && K !== 73 && K !== 91 && K !== 103 && K !== W && K !== 666 ? oe(c, m) : (c.state = null, K === W ? oe(c, -3) : w) : m;
        }, u.deflateSetDictionary = function(c, K) {
          var I, n, a, d, L, G, z, ie, le = K.length;
          if (!c || !c.state || (d = (I = c.state).wrap) === 2 || d === 1 && I.status !== O || I.lookahead) return m;
          for (d === 1 && (c.adler = f(c.adler, K, le, 0)), I.wrap = 0, le >= I.w_size && (d === 0 && (te(I.head), I.strstart = 0, I.block_start = 0, I.insert = 0), ie = new l.Buf8(I.w_size), l.arraySet(ie, K, le - I.w_size, I.w_size, 0), K = ie, le = I.w_size), L = c.avail_in, G = c.next_in, z = c.input, c.avail_in = le, c.next_in = 0, c.input = K, de(I); I.lookahead >= R; ) {
            for (n = I.strstart, a = I.lookahead - (R - 1); I.ins_h = (I.ins_h << I.hash_shift ^ I.window[n + R - 1]) & I.hash_mask, I.prev[n & I.w_mask] = I.head[I.ins_h], I.head[I.ins_h] = n, n++, --a; ) ;
            I.strstart = n, I.lookahead = R - 1, de(I);
          }
          return I.strstart += I.lookahead, I.block_start = I.strstart, I.insert = I.lookahead, I.lookahead = 0, I.match_length = I.prev_length = R - 1, I.match_available = 0, c.next_in = G, c.input = z, c.avail_in = L, I.wrap = d, w;
        }, u.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, o, u) {
        o.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, o, u) {
        o.exports = function(i, l) {
          var s = i.state, f = i.next_in, T, S, v, N, w, m, g, A, C, y, x, b, _, p, P, M, R, q, Q, O, W, k = i.input, H;
          T = f + (i.avail_in - 5), S = i.next_out, H = i.output, v = S - (l - i.avail_out), N = S + (i.avail_out - 257), w = s.dmax, m = s.wsize, g = s.whave, A = s.wnext, C = s.window, y = s.hold, x = s.bits, b = s.lencode, _ = s.distcode, p = (1 << s.lenbits) - 1, P = (1 << s.distbits) - 1;
          e: do {
            x < 15 && (y += k[f++] << x, x += 8, y += k[f++] << x, x += 8), M = b[y & p];
            t: for (; ; ) {
              if (y >>>= R = M >>> 24, x -= R, (R = M >>> 16 & 255) === 0) H[S++] = 65535 & M;
              else {
                if (!(16 & R)) {
                  if ((64 & R) == 0) {
                    M = b[(65535 & M) + (y & (1 << R) - 1)];
                    continue t;
                  }
                  if (32 & R) {
                    s.mode = 12;
                    break e;
                  }
                  i.msg = "invalid literal/length code", s.mode = 30;
                  break e;
                }
                q = 65535 & M, (R &= 15) && (x < R && (y += k[f++] << x, x += 8), q += y & (1 << R) - 1, y >>>= R, x -= R), x < 15 && (y += k[f++] << x, x += 8, y += k[f++] << x, x += 8), M = _[y & P];
                r: for (; ; ) {
                  if (y >>>= R = M >>> 24, x -= R, !(16 & (R = M >>> 16 & 255))) {
                    if ((64 & R) == 0) {
                      M = _[(65535 & M) + (y & (1 << R) - 1)];
                      continue r;
                    }
                    i.msg = "invalid distance code", s.mode = 30;
                    break e;
                  }
                  if (Q = 65535 & M, x < (R &= 15) && (y += k[f++] << x, (x += 8) < R && (y += k[f++] << x, x += 8)), w < (Q += y & (1 << R) - 1)) {
                    i.msg = "invalid distance too far back", s.mode = 30;
                    break e;
                  }
                  if (y >>>= R, x -= R, (R = S - v) < Q) {
                    if (g < (R = Q - R) && s.sane) {
                      i.msg = "invalid distance too far back", s.mode = 30;
                      break e;
                    }
                    if (W = C, (O = 0) === A) {
                      if (O += m - R, R < q) {
                        for (q -= R; H[S++] = C[O++], --R; ) ;
                        O = S - Q, W = H;
                      }
                    } else if (A < R) {
                      if (O += m + A - R, (R -= A) < q) {
                        for (q -= R; H[S++] = C[O++], --R; ) ;
                        if (O = 0, A < q) {
                          for (q -= R = A; H[S++] = C[O++], --R; ) ;
                          O = S - Q, W = H;
                        }
                      }
                    } else if (O += A - R, R < q) {
                      for (q -= R; H[S++] = C[O++], --R; ) ;
                      O = S - Q, W = H;
                    }
                    for (; 2 < q; ) H[S++] = W[O++], H[S++] = W[O++], H[S++] = W[O++], q -= 3;
                    q && (H[S++] = W[O++], 1 < q && (H[S++] = W[O++]));
                  } else {
                    for (O = S - Q; H[S++] = H[O++], H[S++] = H[O++], H[S++] = H[O++], 2 < (q -= 3); ) ;
                    q && (H[S++] = H[O++], 1 < q && (H[S++] = H[O++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (f < T && S < N);
          f -= q = x >> 3, y &= (1 << (x -= q << 3)) - 1, i.next_in = f, i.next_out = S, i.avail_in = f < T ? T - f + 5 : 5 - (f - T), i.avail_out = S < N ? N - S + 257 : 257 - (S - N), s.hold = y, s.bits = x;
        };
      }, {}],
      49: [function(r, o, u) {
        var i = r("../utils/common"), l = r("./adler32"), s = r("./crc32"), f = r("./inffast"), T = r("./inftrees"), S = 1, v = 2, N = 0, w = -2, m = 1, g = 852, A = 592;
        function C(O) {
          return (O >>> 24 & 255) + (O >>> 8 & 65280) + ((65280 & O) << 8) + ((255 & O) << 24);
        }
        function y() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function x(O) {
          var W;
          return O && O.state ? (W = O.state, O.total_in = O.total_out = W.total = 0, O.msg = "", W.wrap && (O.adler = 1 & W.wrap), W.mode = m, W.last = 0, W.havedict = 0, W.dmax = 32768, W.head = null, W.hold = 0, W.bits = 0, W.lencode = W.lendyn = new i.Buf32(g), W.distcode = W.distdyn = new i.Buf32(A), W.sane = 1, W.back = -1, N) : w;
        }
        function b(O) {
          var W;
          return O && O.state ? ((W = O.state).wsize = 0, W.whave = 0, W.wnext = 0, x(O)) : w;
        }
        function _(O, W) {
          var k, H;
          return O && O.state ? (H = O.state, W < 0 ? (k = 0, W = -W) : (k = 1 + (W >> 4), W < 48 && (W &= 15)), W && (W < 8 || 15 < W) ? w : (H.window !== null && H.wbits !== W && (H.window = null), H.wrap = k, H.wbits = W, b(O))) : w;
        }
        function p(O, W) {
          var k, H;
          return O ? (H = new y(), (O.state = H).window = null, (k = _(O, W)) !== N && (O.state = null), k) : w;
        }
        var P, M, R = !0;
        function q(O) {
          if (R) {
            var W;
            for (P = new i.Buf32(512), M = new i.Buf32(32), W = 0; W < 144; ) O.lens[W++] = 8;
            for (; W < 256; ) O.lens[W++] = 9;
            for (; W < 280; ) O.lens[W++] = 7;
            for (; W < 288; ) O.lens[W++] = 8;
            for (T(S, O.lens, 0, 288, P, 0, O.work, { bits: 9 }), W = 0; W < 32; ) O.lens[W++] = 5;
            T(v, O.lens, 0, 32, M, 0, O.work, { bits: 5 }), R = !1;
          }
          O.lencode = P, O.lenbits = 9, O.distcode = M, O.distbits = 5;
        }
        function Q(O, W, k, H) {
          var J, $ = O.state;
          return $.window === null && ($.wsize = 1 << $.wbits, $.wnext = 0, $.whave = 0, $.window = new i.Buf8($.wsize)), H >= $.wsize ? (i.arraySet($.window, W, k - $.wsize, $.wsize, 0), $.wnext = 0, $.whave = $.wsize) : (H < (J = $.wsize - $.wnext) && (J = H), i.arraySet($.window, W, k - H, J, $.wnext), (H -= J) ? (i.arraySet($.window, W, k - H, H, 0), $.wnext = H, $.whave = $.wsize) : ($.wnext += J, $.wnext === $.wsize && ($.wnext = 0), $.whave < $.wsize && ($.whave += J))), 0;
        }
        u.inflateReset = b, u.inflateReset2 = _, u.inflateResetKeep = x, u.inflateInit = function(O) {
          return p(O, 15);
        }, u.inflateInit2 = p, u.inflate = function(O, W) {
          var k, H, J, $, oe, Z, te, V, F, X, Y, re, de, E, h, j, U, ne, D, B, c, K, I, n, a = 0, d = new i.Buf8(4), L = [
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
          if (!O || !O.state || !O.output || !O.input && O.avail_in !== 0) return w;
          (k = O.state).mode === 12 && (k.mode = 13), oe = O.next_out, J = O.output, te = O.avail_out, $ = O.next_in, H = O.input, Z = O.avail_in, V = k.hold, F = k.bits, X = Z, Y = te, K = N;
          e: for (; ; ) switch (k.mode) {
            case m:
              if (k.wrap === 0) {
                k.mode = 13;
                break;
              }
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
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
              if (F -= 4, c = 8 + (15 & (V >>>= 4)), k.wbits === 0) k.wbits = c;
              else if (c > k.wbits) {
                O.msg = "invalid window size", k.mode = 30;
                break;
              }
              k.dmax = 1 << c, O.adler = k.check = 1, k.mode = 512 & V ? 10 : 12, F = V = 0;
              break;
            case 2:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
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
                Z--, V += H[$++] << F, F += 8;
              }
              k.head && (k.head.time = V), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, d[2] = V >>> 16 & 255, d[3] = V >>> 24 & 255, k.check = s(k.check, d, 4, 0)), F = V = 0, k.mode = 4;
            case 4:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              k.head && (k.head.xflags = 255 & V, k.head.os = V >> 8), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0)), F = V = 0, k.mode = 5;
            case 5:
              if (1024 & k.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
                }
                k.length = V, k.head && (k.head.extra_len = V), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0)), F = V = 0;
              } else k.head && (k.head.extra = null);
              k.mode = 6;
            case 6:
              if (1024 & k.flags && (Z < (re = k.length) && (re = Z), re && (k.head && (c = k.head.extra_len - k.length, k.head.extra || (k.head.extra = new Array(k.head.extra_len)), i.arraySet(k.head.extra, H, $, re, c)), 512 & k.flags && (k.check = s(k.check, H, re, $)), Z -= re, $ += re, k.length -= re), k.length)) break e;
              k.length = 0, k.mode = 7;
            case 7:
              if (2048 & k.flags) {
                if (Z === 0) break e;
                for (re = 0; c = H[$ + re++], k.head && c && k.length < 65536 && (k.head.name += String.fromCharCode(c)), c && re < Z; ) ;
                if (512 & k.flags && (k.check = s(k.check, H, re, $)), Z -= re, $ += re, c) break e;
              } else k.head && (k.head.name = null);
              k.length = 0, k.mode = 8;
            case 8:
              if (4096 & k.flags) {
                if (Z === 0) break e;
                for (re = 0; c = H[$ + re++], k.head && c && k.length < 65536 && (k.head.comment += String.fromCharCode(c)), c && re < Z; ) ;
                if (512 & k.flags && (k.check = s(k.check, H, re, $)), Z -= re, $ += re, c) break e;
              } else k.head && (k.head.comment = null);
              k.mode = 9;
            case 9:
              if (512 & k.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
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
                Z--, V += H[$++] << F, F += 8;
              }
              O.adler = k.check = C(V), F = V = 0, k.mode = 11;
            case 11:
              if (k.havedict === 0) return O.next_out = oe, O.avail_out = te, O.next_in = $, O.avail_in = Z, k.hold = V, k.bits = F, 2;
              O.adler = k.check = 1, k.mode = 12;
            case 12:
              if (W === 5 || W === 6) break e;
            case 13:
              if (k.last) {
                V >>>= 7 & F, F -= 7 & F, k.mode = 27;
                break;
              }
              for (; F < 3; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              switch (k.last = 1 & V, F -= 1, 3 & (V >>>= 1)) {
                case 0:
                  k.mode = 14;
                  break;
                case 1:
                  if (q(k), k.mode = 20, W !== 6) break;
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
                Z--, V += H[$++] << F, F += 8;
              }
              if ((65535 & V) != (V >>> 16 ^ 65535)) {
                O.msg = "invalid stored block lengths", k.mode = 30;
                break;
              }
              if (k.length = 65535 & V, F = V = 0, k.mode = 15, W === 6) break e;
            case 15:
              k.mode = 16;
            case 16:
              if (re = k.length) {
                if (Z < re && (re = Z), te < re && (re = te), re === 0) break e;
                i.arraySet(J, H, $, re, oe), Z -= re, $ += re, te -= re, oe += re, k.length -= re;
                break;
              }
              k.mode = 12;
              break;
            case 17:
              for (; F < 14; ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
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
                  Z--, V += H[$++] << F, F += 8;
                }
                k.lens[L[k.have++]] = 7 & V, V >>>= 3, F -= 3;
              }
              for (; k.have < 19; ) k.lens[L[k.have++]] = 0;
              if (k.lencode = k.lendyn, k.lenbits = 7, I = { bits: k.lenbits }, K = T(0, k.lens, 0, 19, k.lencode, 0, k.work, I), k.lenbits = I.bits, K) {
                O.msg = "invalid code lengths set", k.mode = 30;
                break;
              }
              k.have = 0, k.mode = 19;
            case 19:
              for (; k.have < k.nlen + k.ndist; ) {
                for (; j = (a = k.lencode[V & (1 << k.lenbits) - 1]) >>> 16 & 255, U = 65535 & a, !((h = a >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
                }
                if (U < 16) V >>>= h, F -= h, k.lens[k.have++] = U;
                else {
                  if (U === 16) {
                    for (n = h + 2; F < n; ) {
                      if (Z === 0) break e;
                      Z--, V += H[$++] << F, F += 8;
                    }
                    if (V >>>= h, F -= h, k.have === 0) {
                      O.msg = "invalid bit length repeat", k.mode = 30;
                      break;
                    }
                    c = k.lens[k.have - 1], re = 3 + (3 & V), V >>>= 2, F -= 2;
                  } else if (U === 17) {
                    for (n = h + 3; F < n; ) {
                      if (Z === 0) break e;
                      Z--, V += H[$++] << F, F += 8;
                    }
                    F -= h, c = 0, re = 3 + (7 & (V >>>= h)), V >>>= 3, F -= 3;
                  } else {
                    for (n = h + 7; F < n; ) {
                      if (Z === 0) break e;
                      Z--, V += H[$++] << F, F += 8;
                    }
                    F -= h, c = 0, re = 11 + (127 & (V >>>= h)), V >>>= 7, F -= 7;
                  }
                  if (k.have + re > k.nlen + k.ndist) {
                    O.msg = "invalid bit length repeat", k.mode = 30;
                    break;
                  }
                  for (; re--; ) k.lens[k.have++] = c;
                }
              }
              if (k.mode === 30) break;
              if (k.lens[256] === 0) {
                O.msg = "invalid code -- missing end-of-block", k.mode = 30;
                break;
              }
              if (k.lenbits = 9, I = { bits: k.lenbits }, K = T(S, k.lens, 0, k.nlen, k.lencode, 0, k.work, I), k.lenbits = I.bits, K) {
                O.msg = "invalid literal/lengths set", k.mode = 30;
                break;
              }
              if (k.distbits = 6, k.distcode = k.distdyn, I = { bits: k.distbits }, K = T(v, k.lens, k.nlen, k.ndist, k.distcode, 0, k.work, I), k.distbits = I.bits, K) {
                O.msg = "invalid distances set", k.mode = 30;
                break;
              }
              if (k.mode = 20, W === 6) break e;
            case 20:
              k.mode = 21;
            case 21:
              if (6 <= Z && 258 <= te) {
                O.next_out = oe, O.avail_out = te, O.next_in = $, O.avail_in = Z, k.hold = V, k.bits = F, f(O, Y), oe = O.next_out, J = O.output, te = O.avail_out, $ = O.next_in, H = O.input, Z = O.avail_in, V = k.hold, F = k.bits, k.mode === 12 && (k.back = -1);
                break;
              }
              for (k.back = 0; j = (a = k.lencode[V & (1 << k.lenbits) - 1]) >>> 16 & 255, U = 65535 & a, !((h = a >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              if (j && (240 & j) == 0) {
                for (ne = h, D = j, B = U; j = (a = k.lencode[B + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & a, !(ne + (h = a >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
                }
                V >>>= ne, F -= ne, k.back += ne;
              }
              if (V >>>= h, F -= h, k.back += h, k.length = U, j === 0) {
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
                for (n = k.extra; F < n; ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
                }
                k.length += V & (1 << k.extra) - 1, V >>>= k.extra, F -= k.extra, k.back += k.extra;
              }
              k.was = k.length, k.mode = 23;
            case 23:
              for (; j = (a = k.distcode[V & (1 << k.distbits) - 1]) >>> 16 & 255, U = 65535 & a, !((h = a >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[$++] << F, F += 8;
              }
              if ((240 & j) == 0) {
                for (ne = h, D = j, B = U; j = (a = k.distcode[B + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & a, !(ne + (h = a >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
                }
                V >>>= ne, F -= ne, k.back += ne;
              }
              if (V >>>= h, F -= h, k.back += h, 64 & j) {
                O.msg = "invalid distance code", k.mode = 30;
                break;
              }
              k.offset = U, k.extra = 15 & j, k.mode = 24;
            case 24:
              if (k.extra) {
                for (n = k.extra; F < n; ) {
                  if (Z === 0) break e;
                  Z--, V += H[$++] << F, F += 8;
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
                de = re > k.wnext ? (re -= k.wnext, k.wsize - re) : k.wnext - re, re > k.length && (re = k.length), E = k.window;
              } else E = J, de = oe - k.offset, re = k.length;
              for (te < re && (re = te), te -= re, k.length -= re; J[oe++] = E[de++], --re; ) ;
              k.length === 0 && (k.mode = 21);
              break;
            case 26:
              if (te === 0) break e;
              J[oe++] = k.length, te--, k.mode = 21;
              break;
            case 27:
              if (k.wrap) {
                for (; F < 32; ) {
                  if (Z === 0) break e;
                  Z--, V |= H[$++] << F, F += 8;
                }
                if (Y -= te, O.total_out += Y, k.total += Y, Y && (O.adler = k.check = k.flags ? s(k.check, J, Y, oe - Y) : l(k.check, J, Y, oe - Y)), Y = te, (k.flags ? V : C(V)) !== k.check) {
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
                  Z--, V += H[$++] << F, F += 8;
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
              return w;
          }
          return O.next_out = oe, O.avail_out = te, O.next_in = $, O.avail_in = Z, k.hold = V, k.bits = F, (k.wsize || Y !== O.avail_out && k.mode < 30 && (k.mode < 27 || W !== 4)) && Q(O, O.output, O.next_out, Y - O.avail_out) ? (k.mode = 31, -4) : (X -= O.avail_in, Y -= O.avail_out, O.total_in += X, O.total_out += Y, k.total += Y, k.wrap && Y && (O.adler = k.check = k.flags ? s(k.check, J, Y, O.next_out - Y) : l(k.check, J, Y, O.next_out - Y)), O.data_type = k.bits + (k.last ? 64 : 0) + (k.mode === 12 ? 128 : 0) + (k.mode === 20 || k.mode === 15 ? 256 : 0), (X == 0 && Y === 0 || W === 4) && K === N && (K = -5), K);
        }, u.inflateEnd = function(O) {
          if (!O || !O.state) return w;
          var W = O.state;
          return W.window && (W.window = null), O.state = null, N;
        }, u.inflateGetHeader = function(O, W) {
          var k;
          return O && O.state ? (2 & (k = O.state).wrap) == 0 ? w : ((k.head = W).done = !1, N) : w;
        }, u.inflateSetDictionary = function(O, W) {
          var k, H = W.length;
          return O && O.state ? (k = O.state).wrap !== 0 && k.mode !== 11 ? w : k.mode === 11 && l(1, W, H, 0) !== k.check ? -3 : Q(O, W, H, H) ? (k.mode = 31, -4) : (k.havedict = 1, N) : w;
        }, u.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, o, u) {
        var i = r("../utils/common"), l = [
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
        ], f = [
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
        ], T = [
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
        o.exports = function(S, v, N, w, m, g, A, C) {
          var y, x, b, _, p, P, M, R, q, Q = C.bits, O = 0, W = 0, k = 0, H = 0, J = 0, $ = 0, oe = 0, Z = 0, te = 0, V = 0, F = null, X = 0, Y = new i.Buf16(16), re = new i.Buf16(16), de = null, E = 0;
          for (O = 0; O <= 15; O++) Y[O] = 0;
          for (W = 0; W < w; W++) Y[v[N + W]]++;
          for (J = Q, H = 15; 1 <= H && Y[H] === 0; H--) ;
          if (H < J && (J = H), H === 0) return m[g++] = 20971520, m[g++] = 20971520, C.bits = 1, 0;
          for (k = 1; k < H && Y[k] === 0; k++) ;
          for (J < k && (J = k), O = Z = 1; O <= 15; O++) if (Z <<= 1, (Z -= Y[O]) < 0) return -1;
          if (0 < Z && (S === 0 || H !== 1)) return -1;
          for (re[1] = 0, O = 1; O < 15; O++) re[O + 1] = re[O] + Y[O];
          for (W = 0; W < w; W++) v[N + W] !== 0 && (A[re[v[N + W]]++] = W);
          if (P = S === 0 ? (F = de = A, 19) : S === 1 ? (F = l, X -= 257, de = s, E -= 257, 256) : (F = f, de = T, -1), O = k, p = g, oe = W = V = 0, b = -1, _ = (te = 1 << ($ = J)) - 1, S === 1 && 852 < te || S === 2 && 592 < te) return 1;
          for (; ; ) {
            for (M = O - oe, q = A[W] < P ? (R = 0, A[W]) : A[W] > P ? (R = de[E + A[W]], F[X + A[W]]) : (R = 96, 0), y = 1 << O - oe, k = x = 1 << $; m[p + (V >> oe) + (x -= y)] = M << 24 | R << 16 | q | 0, x !== 0; ) ;
            for (y = 1 << O - 1; V & y; ) y >>= 1;
            if (y !== 0 ? (V &= y - 1, V += y) : V = 0, W++, --Y[O] == 0) {
              if (O === H) break;
              O = v[N + A[W]];
            }
            if (J < O && (V & _) !== b) {
              for (oe === 0 && (oe = J), p += k, Z = 1 << ($ = O - oe); $ + oe < H && !((Z -= Y[$ + oe]) <= 0); ) $++, Z <<= 1;
              if (te += 1 << $, S === 1 && 852 < te || S === 2 && 592 < te) return 1;
              m[b = V & _] = J << 24 | $ << 16 | p - g | 0;
            }
          }
          return V !== 0 && (m[p + V] = O - oe << 24 | 4194304), C.bits = J, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, o, u) {
        o.exports = {
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
      52: [function(r, o, u) {
        var i = r("../utils/common"), l = 0, s = 1;
        function f(a) {
          for (var d = a.length; 0 <= --d; ) a[d] = 0;
        }
        var T = 0, S = 29, v = 256, N = v + 1 + S, w = 30, m = 19, g = 2 * N + 1, A = 15, C = 16, y = 7, x = 256, b = 16, _ = 17, p = 18, P = [
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
        ], q = [
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
        ], Q = new Array(2 * (N + 2));
        f(Q);
        var O = new Array(2 * w);
        f(O);
        var W = new Array(512);
        f(W);
        var k = new Array(256);
        f(k);
        var H = new Array(S);
        f(H);
        var J, $, oe, Z = new Array(w);
        function te(a, d, L, G, z) {
          this.static_tree = a, this.extra_bits = d, this.extra_base = L, this.elems = G, this.max_length = z, this.has_stree = a && a.length;
        }
        function V(a, d) {
          this.dyn_tree = a, this.max_code = 0, this.stat_desc = d;
        }
        function F(a) {
          return a < 256 ? W[a] : W[256 + (a >>> 7)];
        }
        function X(a, d) {
          a.pending_buf[a.pending++] = 255 & d, a.pending_buf[a.pending++] = d >>> 8 & 255;
        }
        function Y(a, d, L) {
          a.bi_valid > C - L ? (a.bi_buf |= d << a.bi_valid & 65535, X(a, a.bi_buf), a.bi_buf = d >> C - a.bi_valid, a.bi_valid += L - C) : (a.bi_buf |= d << a.bi_valid & 65535, a.bi_valid += L);
        }
        function re(a, d, L) {
          Y(a, L[2 * d], L[2 * d + 1]);
        }
        function de(a, d) {
          for (var L = 0; L |= 1 & a, a >>>= 1, L <<= 1, 0 < --d; ) ;
          return L >>> 1;
        }
        function E(a, d, L) {
          var G, z, ie = new Array(A + 1), le = 0;
          for (G = 1; G <= A; G++) ie[G] = le = le + L[G - 1] << 1;
          for (z = 0; z <= d; z++) {
            var se = a[2 * z + 1];
            se !== 0 && (a[2 * z] = de(ie[se]++, se));
          }
        }
        function h(a) {
          var d;
          for (d = 0; d < N; d++) a.dyn_ltree[2 * d] = 0;
          for (d = 0; d < w; d++) a.dyn_dtree[2 * d] = 0;
          for (d = 0; d < m; d++) a.bl_tree[2 * d] = 0;
          a.dyn_ltree[2 * x] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0;
        }
        function j(a) {
          8 < a.bi_valid ? X(a, a.bi_buf) : 0 < a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0;
        }
        function U(a, d, L, G) {
          var z = 2 * d, ie = 2 * L;
          return a[z] < a[ie] || a[z] === a[ie] && G[d] <= G[L];
        }
        function ne(a, d, L) {
          for (var G = a.heap[L], z = L << 1; z <= a.heap_len && (z < a.heap_len && U(d, a.heap[z + 1], a.heap[z], a.depth) && z++, !U(d, G, a.heap[z], a.depth)); ) a.heap[L] = a.heap[z], L = z, z <<= 1;
          a.heap[L] = G;
        }
        function D(a, d, L) {
          var G, z, ie, le, se = 0;
          if (a.last_lit !== 0) for (; G = a.pending_buf[a.d_buf + 2 * se] << 8 | a.pending_buf[a.d_buf + 2 * se + 1], z = a.pending_buf[a.l_buf + se], se++, G === 0 ? re(a, z, d) : (re(a, (ie = k[z]) + v + 1, d), (le = P[ie]) !== 0 && Y(a, z -= H[ie], le), re(a, ie = F(--G), L), (le = M[ie]) !== 0 && Y(a, G -= Z[ie], le)), se < a.last_lit; ) ;
          re(a, x, d);
        }
        function B(a, d) {
          var L, G, z, ie = d.dyn_tree, le = d.stat_desc.static_tree, se = d.stat_desc.has_stree, he = d.stat_desc.elems, me = -1;
          for (a.heap_len = 0, a.heap_max = g, L = 0; L < he; L++) ie[2 * L] !== 0 ? (a.heap[++a.heap_len] = me = L, a.depth[L] = 0) : ie[2 * L + 1] = 0;
          for (; a.heap_len < 2; ) ie[2 * (z = a.heap[++a.heap_len] = me < 2 ? ++me : 0)] = 1, a.depth[z] = 0, a.opt_len--, se && (a.static_len -= le[2 * z + 1]);
          for (d.max_code = me, L = a.heap_len >> 1; 1 <= L; L--) ne(a, ie, L);
          for (z = he; L = a.heap[1], a.heap[1] = a.heap[a.heap_len--], ne(a, ie, 1), G = a.heap[1], a.heap[--a.heap_max] = L, a.heap[--a.heap_max] = G, ie[2 * z] = ie[2 * L] + ie[2 * G], a.depth[z] = (a.depth[L] >= a.depth[G] ? a.depth[L] : a.depth[G]) + 1, ie[2 * L + 1] = ie[2 * G + 1] = z, a.heap[1] = z++, ne(a, ie, 1), 2 <= a.heap_len; ) ;
          a.heap[--a.heap_max] = a.heap[1], (function(ge, Te) {
            var Xe, Le, Tt, xe, Gt, cr, Ge = Te.dyn_tree, Yr = Te.max_code, zi = Te.stat_desc.static_tree, Wi = Te.stat_desc.has_stree, Hi = Te.stat_desc.extra_bits, Jr = Te.stat_desc.extra_base, St = Te.stat_desc.max_length, Kt = 0;
            for (xe = 0; xe <= A; xe++) ge.bl_count[xe] = 0;
            for (Ge[2 * ge.heap[ge.heap_max] + 1] = 0, Xe = ge.heap_max + 1; Xe < g; Xe++) St < (xe = Ge[2 * Ge[2 * (Le = ge.heap[Xe]) + 1] + 1] + 1) && (xe = St, Kt++), Ge[2 * Le + 1] = xe, Yr < Le || (ge.bl_count[xe]++, Gt = 0, Jr <= Le && (Gt = Hi[Le - Jr]), cr = Ge[2 * Le], ge.opt_len += cr * (xe + Gt), Wi && (ge.static_len += cr * (zi[2 * Le + 1] + Gt)));
            if (Kt !== 0) {
              do {
                for (xe = St - 1; ge.bl_count[xe] === 0; ) xe--;
                ge.bl_count[xe]--, ge.bl_count[xe + 1] += 2, ge.bl_count[St]--, Kt -= 2;
              } while (0 < Kt);
              for (xe = St; xe !== 0; xe--) for (Le = ge.bl_count[xe]; Le !== 0; ) Yr < (Tt = ge.heap[--Xe]) || (Ge[2 * Tt + 1] !== xe && (ge.opt_len += (xe - Ge[2 * Tt + 1]) * Ge[2 * Tt], Ge[2 * Tt + 1] = xe), Le--);
            }
          })(a, d), E(ie, me, a.bl_count);
        }
        function c(a, d, L) {
          var G, z, ie = -1, le = d[1], se = 0, he = 7, me = 4;
          for (le === 0 && (he = 138, me = 3), d[2 * (L + 1) + 1] = 65535, G = 0; G <= L; G++) z = le, le = d[2 * (G + 1) + 1], ++se < he && z === le || (se < me ? a.bl_tree[2 * z] += se : z !== 0 ? (z !== ie && a.bl_tree[2 * z]++, a.bl_tree[2 * b]++) : se <= 10 ? a.bl_tree[2 * _]++ : a.bl_tree[2 * p]++, ie = z, me = (se = 0) === le ? (he = 138, 3) : z === le ? (he = 6, 3) : (he = 7, 4));
        }
        function K(a, d, L) {
          var G, z, ie = -1, le = d[1], se = 0, he = 7, me = 4;
          for (le === 0 && (he = 138, me = 3), G = 0; G <= L; G++) if (z = le, le = d[2 * (G + 1) + 1], !(++se < he && z === le)) {
            if (se < me) for (; re(a, z, a.bl_tree), --se != 0; ) ;
            else z !== 0 ? (z !== ie && (re(a, z, a.bl_tree), se--), re(a, b, a.bl_tree), Y(a, se - 3, 2)) : se <= 10 ? (re(a, _, a.bl_tree), Y(a, se - 3, 3)) : (re(a, p, a.bl_tree), Y(a, se - 11, 7));
            ie = z, me = (se = 0) === le ? (he = 138, 3) : z === le ? (he = 6, 3) : (he = 7, 4);
          }
        }
        f(Z);
        var I = !1;
        function n(a, d, L, G) {
          Y(a, (T << 1) + (G ? 1 : 0), 3), (function(z, ie, le, se) {
            j(z), X(z, le), X(z, ~le), i.arraySet(z.pending_buf, z.window, ie, le, z.pending), z.pending += le;
          })(a, d, L);
        }
        u._tr_init = function(a) {
          I || ((function() {
            var d, L, G, z, ie, le = new Array(A + 1);
            for (z = G = 0; z < S - 1; z++) for (H[z] = G, d = 0; d < 1 << P[z]; d++) k[G++] = z;
            for (k[G - 1] = z, z = ie = 0; z < 16; z++) for (Z[z] = ie, d = 0; d < 1 << M[z]; d++) W[ie++] = z;
            for (ie >>= 7; z < w; z++) for (Z[z] = ie << 7, d = 0; d < 1 << M[z] - 7; d++) W[256 + ie++] = z;
            for (L = 0; L <= A; L++) le[L] = 0;
            for (d = 0; d <= 143; ) Q[2 * d + 1] = 8, d++, le[8]++;
            for (; d <= 255; ) Q[2 * d + 1] = 9, d++, le[9]++;
            for (; d <= 279; ) Q[2 * d + 1] = 7, d++, le[7]++;
            for (; d <= 287; ) Q[2 * d + 1] = 8, d++, le[8]++;
            for (E(Q, N + 1, le), d = 0; d < w; d++) O[2 * d + 1] = 5, O[2 * d] = de(d, 5);
            J = new te(Q, P, v + 1, N, A), $ = new te(O, M, 0, w, A), oe = new te(new Array(0), R, 0, m, y);
          })(), I = !0), a.l_desc = new V(a.dyn_ltree, J), a.d_desc = new V(a.dyn_dtree, $), a.bl_desc = new V(a.bl_tree, oe), a.bi_buf = 0, a.bi_valid = 0, h(a);
        }, u._tr_stored_block = n, u._tr_flush_block = function(a, d, L, G) {
          var z, ie, le = 0;
          0 < a.level ? (a.strm.data_type === 2 && (a.strm.data_type = (function(se) {
            var he, me = 4093624447;
            for (he = 0; he <= 31; he++, me >>>= 1) if (1 & me && se.dyn_ltree[2 * he] !== 0) return l;
            if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return s;
            for (he = 32; he < v; he++) if (se.dyn_ltree[2 * he] !== 0) return s;
            return l;
          })(a)), B(a, a.l_desc), B(a, a.d_desc), le = (function(se) {
            var he;
            for (c(se, se.dyn_ltree, se.l_desc.max_code), c(se, se.dyn_dtree, se.d_desc.max_code), B(se, se.bl_desc), he = m - 1; 3 <= he && se.bl_tree[2 * q[he] + 1] === 0; he--) ;
            return se.opt_len += 3 * (he + 1) + 5 + 5 + 4, he;
          })(a), z = a.opt_len + 3 + 7 >>> 3, (ie = a.static_len + 3 + 7 >>> 3) <= z && (z = ie)) : z = ie = L + 5, L + 4 <= z && d !== -1 ? n(a, d, L, G) : a.strategy === 4 || ie === z ? (Y(a, 2 + (G ? 1 : 0), 3), D(a, Q, O)) : (Y(a, 4 + (G ? 1 : 0), 3), (function(se, he, me, ge) {
            var Te;
            for (Y(se, he - 257, 5), Y(se, me - 1, 5), Y(se, ge - 4, 4), Te = 0; Te < ge; Te++) Y(se, se.bl_tree[2 * q[Te] + 1], 3);
            K(se, se.dyn_ltree, he - 1), K(se, se.dyn_dtree, me - 1);
          })(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, le + 1), D(a, a.dyn_ltree, a.dyn_dtree)), h(a), G && j(a);
        }, u._tr_tally = function(a, d, L) {
          return a.pending_buf[a.d_buf + 2 * a.last_lit] = d >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & d, a.pending_buf[a.l_buf + a.last_lit] = 255 & L, a.last_lit++, d === 0 ? a.dyn_ltree[2 * L]++ : (a.matches++, d--, a.dyn_ltree[2 * (k[L] + v + 1)]++, a.dyn_dtree[2 * F(d)]++), a.last_lit === a.lit_bufsize - 1;
        }, u._tr_align = function(a) {
          Y(a, 2, 3), re(a, x, Q), (function(d) {
            d.bi_valid === 16 ? (X(d, d.bi_buf), d.bi_buf = 0, d.bi_valid = 0) : 8 <= d.bi_valid && (d.pending_buf[d.pending++] = 255 & d.bi_buf, d.bi_buf >>= 8, d.bi_valid -= 8);
          })(a);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, o, u) {
        o.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, o, u) {
        (function(i) {
          (function(l, s) {
            if (!l.setImmediate) {
              var f, T, S, v, N = 1, w = {}, m = !1, g = l.document, A = Object.getPrototypeOf && Object.getPrototypeOf(l);
              A = A && A.setTimeout ? A : l, f = {}.toString.call(l.process) === "[object process]" ? function(b) {
                ve.nextTick(function() {
                  y(b);
                });
              } : (function() {
                if (l.postMessage && !l.importScripts) {
                  var b = !0, _ = l.onmessage;
                  return l.onmessage = function() {
                    b = !1;
                  }, l.postMessage("", "*"), l.onmessage = _, b;
                }
              })() ? (v = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", x, !1) : l.attachEvent("onmessage", x), function(b) {
                l.postMessage(v + b, "*");
              }) : l.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(b) {
                y(b.data);
              }, function(b) {
                S.port2.postMessage(b);
              }) : g && "onreadystatechange" in g.createElement("script") ? (T = g.documentElement, function(b) {
                var _ = g.createElement("script");
                _.onreadystatechange = function() {
                  y(b), _.onreadystatechange = null, T.removeChild(_), _ = null;
                }, T.appendChild(_);
              }) : function(b) {
                setTimeout(y, 0, b);
              }, A.setImmediate = function(b) {
                typeof b != "function" && (b = new Function("" + b));
                for (var _ = new Array(arguments.length - 1), p = 0; p < _.length; p++) _[p] = arguments[p + 1];
                return w[N] = {
                  callback: b,
                  args: _
                }, f(N), N++;
              }, A.clearImmediate = C;
            }
            function C(b) {
              delete w[b];
            }
            function y(b) {
              if (m) setTimeout(y, 0, b);
              else {
                var _ = w[b];
                if (_) {
                  m = !0;
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
                    })(_);
                  } finally {
                    C(b), m = !1;
                  }
                }
              }
            }
            function x(b) {
              b.source === l && typeof b.data == "string" && b.data.indexOf(v) === 0 && y(+b.data.slice(v.length));
            }
          })(typeof self > "u" ? i === void 0 ? this : i : self);
        }).call(this, typeof Ie < "u" ? Ie : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), Vc = /* @__PURE__ */ ce(((e, t) => {
  var r = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function o(u) {
    return u && u.replace ? u.replace(/([&"<>'])/g, function(i, l) {
      return r[l];
    }) : u;
  }
  t.exports = o;
})), $c = /* @__PURE__ */ ce(((e, t) => {
  tt();
  var r = Vc(), o = zr().Stream, u = "    ";
  function i(v, N) {
    typeof N != "object" && (N = { indent: N });
    var w = N.stream ? new o() : null, m = "", g = !1, A = N.indent ? N.indent === !0 ? u : N.indent : "", C = !0;
    function y(P) {
      C ? ve.nextTick(P) : P();
    }
    function x(P, M) {
      if (M !== void 0 && (m += M), P && !g && (w = w || new o(), g = !0), P && g) {
        var R = m;
        y(function() {
          w.emit("data", R);
        }), m = "";
      }
    }
    function b(P, M) {
      T(x, f(P, A, A ? 1 : 0), M);
    }
    function _() {
      if (w) {
        var P = m;
        y(function() {
          w.emit("data", P), w.emit("end"), w.readable = !1, w.emit("close");
        });
      }
    }
    function p(P) {
      var M = {
        version: "1.0",
        encoding: P.encoding || "UTF-8"
      };
      P.standalone && (M.standalone = P.standalone), b({ "?xml": { _attr: M } }), m = m.replace("/>", "?>");
    }
    return y(function() {
      C = !1;
    }), N.declaration && p(N.declaration), v && v.forEach ? v.forEach(function(P, M) {
      var R;
      M + 1 === v.length && (R = _), b(P, R);
    }) : b(v, _), w ? (w.readable = !0, w) : m;
  }
  function l() {
    var v = { _elem: f(Array.prototype.slice.call(arguments)) };
    return v.push = function(N) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var w = this, m = this._elem.indent;
      T(this.append, f(N, m, this._elem.icount + (m ? 1 : 0)), function() {
        w.append(!0);
      });
    }, v.close = function(N) {
      N !== void 0 && this.push(N), this.end && this.end();
    }, v;
  }
  function s(v, N) {
    return new Array(N || 0).join(v || "");
  }
  function f(v, N, w) {
    w = w || 0;
    var m = s(N, w), g, A = v, C = !1;
    if (typeof v == "object" && (g = Object.keys(v)[0], A = v[g], A && A._elem))
      return A._elem.name = g, A._elem.icount = w, A._elem.indent = N, A._elem.indents = m, A._elem.interrupt = A, A._elem;
    var y = [], x = [], b;
    function _(p) {
      Object.keys(p).forEach(function(P) {
        y.push(S(P, p[P]));
      });
    }
    switch (typeof A) {
      case "object":
        if (A === null) break;
        A._attr && _(A._attr), A._cdata && x.push(("<![CDATA[" + A._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), A.forEach && (b = !1, x.push(""), A.forEach(function(p) {
          typeof p == "object" ? Object.keys(p)[0] == "_attr" ? _(p._attr) : x.push(f(p, N, w + 1)) : (x.pop(), b = !0, x.push(r(p)));
        }), b || x.push(""));
        break;
      default:
        x.push(r(A));
    }
    return {
      name: g,
      interrupt: C,
      attributes: y,
      content: x,
      icount: w,
      indents: m,
      indent: N
    };
  }
  function T(v, N, w) {
    if (typeof N != "object") return v(!1, N);
    var m = N.interrupt ? 1 : N.content.length;
    function g() {
      for (; N.content.length; ) {
        var C = N.content.shift();
        if (C !== void 0) {
          if (A(C)) return;
          T(v, C);
        }
      }
      v(!1, (m > 1 ? N.indents : "") + (N.name ? "</" + N.name + ">" : "") + (N.indent && !w ? `
` : "")), w && w();
    }
    function A(C) {
      return C.interrupt ? (C.interrupt.append = v, C.interrupt.end = g, C.interrupt = !1, v(!0), !0) : !1;
    }
    if (v(!1, N.indents + (N.name ? "<" + N.name : "") + (N.attributes.length ? " " + N.attributes.join(" ") : "") + (m ? N.name ? ">" : "" : N.name ? "/>" : "") + (N.indent && m > 1 ? `
` : "")), !m) return v(!1, N.indent ? `
` : "");
    A(N) || g();
  }
  function S(v, N) {
    return v + '="' + r(N) + '"';
  }
  t.exports = i, t.exports.element = t.exports.Element = l;
})), Xc = zr(), Zc = /* @__PURE__ */ Fr(qc()), ye = /* @__PURE__ */ Fr($c()), It = 0, Ar = 32, Yc = 32, Jc = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== Yc) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const o = r.replace(/(..)/g, "$1 ").trim().split(" ").map((l) => parseInt(l, 16));
  o.reverse();
  const u = e.slice(It, Ar).map((l, s) => l ^ o[s % o.length]), i = new Uint8Array(It + u.length + Math.max(0, e.length - Ar));
  return i.set(e.slice(0, It)), i.set(u, It), i.set(e.slice(Ar), It + u.length), i;
}, Qc = class {
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
}, eh = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(e, t, r) {
    let o = e;
    return t.forEach((u, i) => {
      o = o.replace(new RegExp(`{${u.fileName}}`, "g"), (r + i).toString());
    }), o;
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
}, th = class {
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
    for (const o of t) r = r.replace(new RegExp(`{${o.reference}-${o.instance}}`, "g"), o.numId.toString());
    return r;
  }
}, rh = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    ee(this, "formatter", void 0), ee(this, "imageReplacer", void 0), ee(this, "numberingReplacer", void 0), this.formatter = new Qc(), this.imageReplacer = new eh(), this.numberingReplacer = new th();
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
    const o = new Zc.default(), u = this.xmlifyFile(e, t), i = new Map(Object.entries(u));
    for (const [, l] of i) if (Array.isArray(l)) for (const s of l) o.file(s.path, mr(s.data));
    else o.file(l.path, mr(l.data));
    for (const l of r) o.file(l.path, mr(l.data));
    for (const l of e.Media.Array) l.type !== "svg" ? o.file(`word/media/${l.fileName}`, l.data) : (o.file(`word/media/${l.fileName}`, l.data), o.file(`word/media/${l.fallback.fileName}`, l.fallback.data));
    for (const [l, { data: s, fontKey: f }] of e.FontTable.fontOptionsWithKey.entries()) o.file(`word/fonts/font${l + 1}.odttf`, Jc(s, f));
    return o;
  }
  xmlifyFile(e, t) {
    const r = e.Document.Relationships.RelationshipCount + 1, o = (0, ye.default)(this.formatter.format(e.Document.View, {
      viewWrapper: e.Document,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), u = e.Comments.Relationships.RelationshipCount + 1, i = (0, ye.default)(this.formatter.format(e.Comments, {
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
    }), l = e.FootNotes.Relationships.RelationshipCount + 1, s = (0, ye.default)(this.formatter.format(e.FootNotes.View, {
      viewWrapper: e.FootNotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), f = this.imageReplacer.getMediaData(o, e.Media), T = this.imageReplacer.getMediaData(i, e.Media), S = this.imageReplacer.getMediaData(s, e.Media);
    return pe(pe({
      Relationships: {
        data: (f.forEach((v, N) => {
          e.Document.Relationships.addRelationship(r + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
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
          const v = this.imageReplacer.replace(o, f, r);
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
      HeaderRelationships: e.Headers.map((v, N) => {
        const w = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(w, e.Media).forEach((m, g) => {
          v.Relationships.addRelationship(g, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${N + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((v, N) => {
        const w = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(w, e.Media).forEach((m, g) => {
          v.Relationships.addRelationship(g, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${N + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((v, N) => {
        const w = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), m = this.imageReplacer.getMediaData(w, e.Media), g = this.imageReplacer.replace(w, m, 0);
        return {
          data: this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering),
          path: `word/header${N + 1}.xml`
        };
      }),
      Footers: e.Footers.map((v, N) => {
        const w = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), m = this.imageReplacer.getMediaData(w, e.Media), g = this.imageReplacer.replace(w, m, 0);
        return {
          data: this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering),
          path: `word/footer${N + 1}.xml`
        };
      }),
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
      },
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
          const v = this.imageReplacer.replace(s, S, l);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (S.forEach((v, N) => {
          e.FootNotes.Relationships.addRelationship(l + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
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
      },
      Comments: {
        data: (() => {
          const v = this.imageReplacer.replace(i, T, u);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (T.forEach((v, N) => {
          e.Comments.Relationships.addRelationship(u + N, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
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
    }, e.CommentsExtended ? { CommentsExtended: {
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
      }
    });
  }
};
function vn(e, t, r, o, u, i, l) {
  try {
    var s = e[i](l), f = s.value;
  } catch (T) {
    r(T);
    return;
  }
  s.done ? t(f) : Promise.resolve(f).then(o, u);
}
function nh(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(o, u) {
      var i = e.apply(t, r);
      function l(f) {
        vn(i, o, u, l, s, "next", f);
      }
      function s(f) {
        vn(i, o, u, l, s, "throw", f);
      }
      l(void 0);
    });
  };
}
var ih = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, yn = (e) => e === !0 ? ih.WITH_2_BLANKS : e === !1 ? void 0 : e, Bi = class wt {
  /**
  * Exports a document to the specified output format.
  *
  * @param file - The document to export
  * @param type - The output format type (e.g., "nodebuffer", "blob", "string")
  * @param prettify - Whether to prettify the XML output (boolean or PrettifyType)
  * @param overrides - Optional array of file overrides for custom XML content
  * @returns A promise resolving to the exported document in the specified format
  */
  static pack(t, r, o) {
    var u = this;
    return nh(function* (i, l, s, f = []) {
      return u.compiler.compile(i, yn(s), f).generateAsync({
        type: l,
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
  static toString(t, r, o = []) {
    return wt.pack(t, "string", r, o);
  }
  /**
  * Exports a document to a Node.js Buffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Buffer
  */
  static toBuffer(t, r, o = []) {
    return wt.pack(t, "nodebuffer", r, o);
  }
  /**
  * Exports a document to a base64-encoded string.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a base64 string
  */
  static toBase64String(t, r, o = []) {
    return wt.pack(t, "base64", r, o);
  }
  /**
  * Exports a document to a Blob (for browser environments).
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Blob
  */
  static toBlob(t, r, o = []) {
    return wt.pack(t, "blob", r, o);
  }
  /**
  * Exports a document to an ArrayBuffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as an ArrayBuffer
  */
  static toArrayBuffer(t, r, o = []) {
    return wt.pack(t, "arraybuffer", r, o);
  }
  /**
  * Exports a document to a Node.js Stream.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A readable stream containing the document data
  */
  static toStream(t, r, o = []) {
    const u = new Xc.Stream();
    return this.compiler.compile(t, yn(r), o).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((i) => {
      u.emit("data", i), u.emit("end");
    }), u;
  }
};
ee(Bi, "compiler", new rh());
const Xt = {
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
function ah(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const o = Ki(e.color, t);
  o && (r.color = o);
  const u = qi(e.font, t);
  u && (r.font = u), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const i = {};
  return Object.keys(r).length && (i.run = r), e.paragraph && (i.paragraph = e.paragraph), i;
}
function sh(e = hr, t = {}) {
  const r = e?.typography || hr.typography, o = e?.typographyKinds || hr.typographyKinds, u = {}, i = [], l = [];
  for (const [v, N] of Object.entries(r)) {
    const w = ah(N, e), m = Xt[v];
    if (m === "document") {
      u.document = {
        ...w.run ? { run: w.run } : {},
        ...w.paragraph ? { paragraph: w.paragraph } : {}
      };
      continue;
    }
    if (m) {
      u[m] = w;
      continue;
    }
    (o[v] || "character") === "paragraph" ? i.push({
      id: v,
      name: v,
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0,
      ...w
    }) : l.push({
      id: v,
      name: v,
      basedOn: "Normal",
      quickFormat: !0,
      ...w.run ? { run: w.run } : {}
    });
  }
  const s = t.paragraphStyles || [], f = t.characterStyles || [];
  for (const v of [...s, ...f]) {
    const N = Xt[v.id];
    if (!N) continue;
    const { id: w, name: m, basedOn: g, next: A, quickFormat: C, run: y, paragraph: x } = v;
    u[N] = {
      ...y ? { run: y } : {},
      ...x ? { paragraph: x } : {}
    };
  }
  const T = s.filter(
    (v) => !Xt[v.id]
  ), S = f.filter(
    (v) => !Xt[v.id]
  );
  return {
    default: u,
    paragraphStyles: bn(i, T),
    characterStyles: bn(l, S)
  };
}
function bn(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((i) => [i.id, i])), o = e.map(
    (i) => r.has(i.id) ? r.get(i.id) : i
  ), u = new Set(e.map((i) => i.id));
  for (const i of t)
    u.has(i.id) || o.push(i);
  return o;
}
async function Hh(e, t = {}) {
  const r = await oh(e, t);
  return Bi.toBlob(r);
}
async function oh(e, t = {}) {
  const {
    sections: r = [],
    header: o = null,
    footer: u = null,
    headerFirstPageOnly: i = !1,
    footerFirstPageOnly: l = !1
  } = e, {
    paragraphStyles: s,
    characterStyles: f,
    theme: T,
    typography: S,
    numbering: v,
    pageMargin: N,
    pageSize: w,
    pageOrientation: m,
    ...g
  } = t, A = { nextId: 1, footnotes: {} };
  Jt(r.flat(), A), o && Jt(o, A), u && Jt(u, A);
  const { loadAsset: C } = t, y = await kr(r.flat(), C), x = {
    pageNumbers: { start: 1, formatType: ls.DECIMAL },
    ...N ? { margin: N } : {}
  };
  w && (x.size = {
    width: w.width,
    height: w.height,
    ...m ? { orientation: m } : {}
  });
  const b = {
    properties: {
      type: gu.CONTINUOUS,
      page: x
    },
    children: y
  };
  if (o) {
    const P = await kr(o, C), M = new Fi({ children: P }), R = Zt(!0);
    i ? (b.headers = { first: M, default: R }, b.properties.titlePage = !0) : b.headers = { default: M };
  } else
    b.headers = { default: Zt(!0) };
  if (u) {
    const P = await kr(u, C), M = new Di({ children: P }), R = Zt(!1);
    l ? (b.footers = { first: M, default: R }, b.properties.titlePage = !0) : b.footers = { default: M };
  } else
    b.footers = { default: Zt(!1) };
  b.properties.titlePage && (b.headers && !b.headers.first && (b.headers.first = b.headers.default), b.footers && !b.footers.first && (b.footers.first = b.footers.default));
  const _ = {
    ...g,
    sections: [b]
  }, p = S ? { ...T || {}, typography: S } : T;
  if (p) {
    const P = sh(p, {
      paragraphStyles: s,
      characterStyles: f
    }), M = {};
    P.default && Object.keys(P.default).length && (M.default = P.default), P.paragraphStyles.length && (M.paragraphStyles = P.paragraphStyles), P.characterStyles.length && (M.characterStyles = P.characterStyles), Object.keys(M).length && (_.styles = M);
  } else (s && s.length || f && f.length) && (_.styles = {}, s?.length && (_.styles.paragraphStyles = s), f?.length && (_.styles.characterStyles = f));
  return v && v.length && (_.numbering = { config: v }), Object.keys(A.footnotes).length && (_.footnotes = A.footnotes), new Dc(_);
}
function Jt(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const o = t.nextId;
          t.nextId += 1, r.footnoteId = o;
          const u = [];
          for (const i of r.children || [])
            if (i.type === "paragraph")
              u.push(Zr(i));
            else {
              const l = Ht(i);
              l.length && u.push(new Ee({ children: l }));
            }
          u.length || u.push(new Ee({})), t.footnotes[o] = { children: u };
        }
        r.children && Jt(r.children, t);
      }
  }
}
function Zt(e) {
  const t = e ? Se.RIGHT : Se.CENTER, r = e ? Fi : Di;
  return new r({
    children: [
      new Ee({
        alignment: t,
        children: [
          new Ce("Page "),
          new Ce({ children: [Ye.CURRENT] }),
          new Ce(" of "),
          new Ce({ children: [Ye.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function kr(e, t) {
  return (await Promise.all(
    e.map((o) => lh(o, t))
  )).flat();
}
async function lh(e, t) {
  switch (e.type) {
    case "table":
      return [await Bh(e)];
    case "image":
      return [await Uh(e, t)];
    case "tableOfContents":
      return [uh(e)];
    case "webOnly":
      return [];
    default:
      return [await Dh(e)];
  }
}
function uh(e) {
  const t = e.toc || {}, r = t.title || "Contents", o = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new Wc(r, o);
}
function Zr(e) {
  const t = {};
  if (e.heading && (t.heading = gh(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = Mi(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const o = Be(e.spacing.before), u = Be(e.spacing.after), i = Be(e.spacing.line);
    o != null && (t.spacing.before = o), u != null && (t.spacing.after = u), i != null && (t.spacing.line = i), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
  }
  if (e.bullet && (t.bullet = { level: Be(e.bullet.level) ?? 0 }), e.numbering) {
    t.numbering = {
      reference: e.numbering.reference,
      level: Be(e.numbering.level) ?? 0
    };
    const o = Be(e.numbering.instance);
    o != null && (t.numbering.instance = o);
  }
  if (e.indent) {
    const o = {};
    for (const u of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const i = e.indent[u];
      if (i == null) continue;
      const l = typeof i == "string" ? parseInt(i, 10) : i;
      Number.isFinite(l) && (o[u] = l);
    }
    Object.keys(o).length && (t.indent = o);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(Rh).filter(Boolean));
  const r = (e.children || []).flatMap(Ht);
  return e.bookmark && r.length ? t.children = [new vi({ id: e.bookmark, children: r })] : r.length && (t.children = r), new Ee(t);
}
function Ht(e) {
  switch (e.type) {
    case "text":
      return ch(e);
    case "tab":
      return [new Ce({ children: [new mi()] })];
    case "externalHyperlink":
      return [hh(e)];
    case "internalHyperlink":
      return [fh(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new Kc(e.footnoteId)] : [];
    case "math":
      return [new Ce({ text: e.latex || "" })];
    default:
      return e.content ? [new Ce({ text: e.content })] : e.children ? e.children.flatMap(Ht) : [];
  }
}
function ch(e) {
  const t = [];
  e.positionalTab && t.push(
    new Ce({
      children: [
        new rl({
          alignment: Ch(e.positionalTab.alignment),
          leader: Oh(e.positionalTab.leader),
          relativeTo: Fh(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new Ce({ children: [Ye.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new Ce({ children: [Ye.TOTAL_PAGES] })), t;
  const o = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (o.bold = !0), (e.italics === "true" || e.italics === !0) && (o.italics = !0), e.underline && (o.underline = e.underline), e.style && (o.style = e.style), e.color && (o.color = e.color), e.size != null) {
    const u = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(u) && (o.size = u);
  }
  return e.font && (o.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (o.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (o.allCaps = !0), (e.strike === "true" || e.strike === !0) && (o.strike = !0), t.push(new Ce(o)), t;
}
function hh(e) {
  const t = (e.children || []).flatMap(Ht);
  return new gi({
    children: t.length ? t : [new Ce({ text: e.link || "" })],
    link: e.link || ""
  });
}
function fh(e) {
  const t = (e.children || []).flatMap(Ht);
  return new wi({
    children: t.length ? t : [new Ce({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function Li(e) {
  const r = { rows: (e.children || []).filter((o) => o.type === "tableRow").map(dh) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? yr.AUTOFIT : yr.FIXED : r.columnWidths && (r.layout = yr.FIXED), e.tableWidth && (r.width = Ui(e.tableWidth)), e.tableBorders && (r.borders = ji(e.tableBorders)), new Vl(r);
}
function dh(e) {
  const r = { children: (e.children || []).filter((o) => o.type === "tableCell").map(ph) };
  return e.tableHeader && (r.tableHeader = !0), new Zl(r);
}
function ph(e) {
  const t = {};
  if (e.width && (t.width = Ui(e.width)), e.margins && (t.margins = mh(e.margins)), e.borders && (t.borders = ji(e.borders)), e.shading && (t.shading = Eh(e.shading)), e.verticalAlign && (t.verticalAlign = Sh(e.verticalAlign)), e.columnSpan) {
    const o = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(o) && o > 1 && (t.columnSpan = o);
  }
  if (e.rowSpan) {
    const o = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(o) && o > 1 && (t.rowSpan = o);
  }
  const r = (e.children || []).flatMap((o) => o.type === "table" ? [Li(o)] : [Zr(o)]);
  return t.children = r.length ? r : [new Ee({})], new Xr(t);
}
function Be(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function mh(e) {
  const t = {};
  for (const [r, o] of Object.entries(e)) {
    const u = Be(o);
    u != null && (t[r] = u);
  }
  return t;
}
const wh = {
  HEADING_1: dt.HEADING_1,
  HEADING_2: dt.HEADING_2,
  HEADING_3: dt.HEADING_3,
  HEADING_4: dt.HEADING_4,
  HEADING_5: dt.HEADING_5,
  HEADING_6: dt.HEADING_6
};
function gh(e) {
  return wh[e];
}
const vh = {
  left: Se.LEFT,
  center: Se.CENTER,
  right: Se.RIGHT,
  justified: Se.JUSTIFIED,
  both: Se.JUSTIFIED
};
function Mi(e) {
  return vh[e] ?? Se.LEFT;
}
const yh = {
  percentage: je.PERCENTAGE,
  pct: je.PERCENTAGE,
  dxa: je.DXA,
  auto: je.AUTO,
  nil: je.NIL
};
function bh(e) {
  return yh[e] ?? je.DXA;
}
function Ui(e) {
  const t = Be(e.size) ?? 0, r = e.type;
  return r === "pct" || r === "percentage" ? {
    size: String(t * 50),
    type: je.PERCENTAGE
  } : {
    size: t,
    type: bh(r)
  };
}
const _h = {
  single: Fe.SINGLE,
  double: Fe.DOUBLE,
  dotted: Fe.DOTTED,
  dashed: Fe.DASHED,
  none: Fe.NONE,
  nil: Fe.NIL,
  thick: Fe.THICK,
  triple: Fe.TRIPLE
};
function ji(e) {
  const t = {};
  for (const [r, o] of Object.entries(e))
    t[r] = {
      style: _h[o.style] ?? Fe.SINGLE,
      size: Be(o.size) ?? 1,
      color: o.color || "000000"
    };
  return t;
}
const xh = {
  clear: Ze.CLEAR,
  nil: Ze.NIL,
  solid: Ze.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: Ze.DIAGONAL_CROSS,
  diagonalStripe: Ze.DIAGONAL_STRIPE,
  horizontalStripe: Ze.HORIZONTAL_STRIPE,
  verticalStripe: Ze.VERTICAL_STRIPE
};
function Eh(e) {
  const t = e.fill || "000000", r = xh[e.type] ?? Ze.CLEAR, o = e.color || "auto";
  return { type: r, fill: t, color: o };
}
const Th = {
  top: Ft.TOP,
  center: Ft.CENTER,
  middle: Ft.CENTER,
  // alias — natural-language CSS-ish
  bottom: Ft.BOTTOM
};
function Sh(e) {
  return Th[e] ?? Ft.TOP;
}
const Ah = {
  left: Pe.LEFT,
  right: Pe.RIGHT,
  center: Pe.CENTER,
  decimal: Pe.DECIMAL,
  bar: Pe.BAR,
  clear: Pe.CLEAR,
  end: Pe.END,
  num: Pe.NUM,
  start: Pe.START
}, kh = {
  none: Rt.NONE,
  dot: Rt.DOT,
  hyphen: Rt.HYPHEN,
  underscore: Rt.UNDERSCORE,
  middleDot: Rt.MIDDLE_DOT
};
function Rh(e) {
  if (!e || typeof e != "object") return null;
  const t = Ah[e.type] ?? Pe.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const o = { type: t, position: r };
  if (e.leader) {
    const u = kh[e.leader];
    u && (o.leader = u);
  }
  return o;
}
const Ih = {
  left: Yt.LEFT,
  center: Yt.CENTER,
  right: Yt.RIGHT
};
function Ch(e) {
  return Ih[e] ?? Yt.LEFT;
}
const Nh = {
  none: ot.NONE,
  dot: ot.DOT,
  hyphen: ot.HYPHEN,
  underscore: ot.UNDERSCORE,
  heavy: ot.HEAVY,
  middleDot: ot.MIDDLE_DOT
};
function Oh(e) {
  return Nh[e] ?? ot.NONE;
}
const Ph = {
  indent: Or.INDENT,
  margin: Or.MARGIN
};
function Fh(e) {
  return Ph[e] ?? Or.MARGIN;
}
async function Dh(e) {
  return Zr(e);
}
async function Bh(e) {
  return Li(e);
}
let Lh = 1;
function Mh(e, t) {
  const r = (e.split(/[?#]/)[0].match(/\.([a-zA-Z0-9]+)$/)?.[1] || "").toLowerCase();
  if (r === "png") return "png";
  if (r === "jpg" || r === "jpeg") return "jpg";
  if (r === "gif") return "gif";
  if (r === "bmp") return "bmp";
  const o = new Uint8Array(t instanceof ArrayBuffer ? t : t?.buffer ?? t);
  if (o.length >= 4) {
    if (o[0] === 137 && o[1] === 80 && o[2] === 78 && o[3] === 71) return "png";
    if (o[0] === 255 && o[1] === 216 && o[2] === 255) return "jpg";
    if (o[0] === 71 && o[1] === 73 && o[2] === 70) return "gif";
    if (o[0] === 66 && o[1] === 77) return "bmp";
  }
  return "png";
}
async function Uh(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new Ee({});
    const o = await jh(r, t), u = Be(e.transformation?.width) ?? 400, i = Be(e.transformation?.height) ?? 300, l = {
      type: Mh(r, o),
      data: o,
      transformation: { width: u, height: i },
      altText: {
        id: Lh++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (l.floating = e.floating);
    const s = {
      children: [new Wo(l)]
    };
    return e.alignment && (s.alignment = Mi(e.alignment)), new Ee(s);
  } catch (r) {
    return console.error("Error creating image element:", r), new Ee({});
  }
}
async function jh(e, t) {
  const { bytes: r } = await Gi(e, { loadAsset: t });
  return r;
}
export {
  oh as buildDocument,
  Hh as compileDocx,
  Zt as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-j8YSfbAV.js.map
