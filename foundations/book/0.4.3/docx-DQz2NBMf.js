import { f as Zo } from "./fetch-Db2pAsvR.js";
import { D as Mr, r as Yo, a as Jo } from "./_entry.generated-Cy8ZdGWE.js";
var Qo = Object.create, Fi = Object.defineProperty, es = Object.getOwnPropertyDescriptor, ts = Object.getOwnPropertyNames, rs = Object.getPrototypeOf, ns = Object.prototype.hasOwnProperty, Di = (e, t, r) => () => {
  if (r) throw r[0];
  try {
    return e && (t = e(e = 0)), t;
  } catch (n) {
    throw r = [n], n;
  }
}, fe = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), is = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (var i = ts(t), o = 0, u = i.length, a; o < u; o++)
    a = i[o], !ns.call(e, a) && a !== r && Fi(e, a, {
      get: ((c) => t[c]).bind(null, a),
      enumerable: !(n = es(t, a)) || n.enumerable
    });
  return e;
}, Bi = (e, t, r) => (r = e != null ? Qo(rs(e)) : {}, is(Fi(r, "default", {
  value: e,
  enumerable: !0
}), e)), lr = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function Xt(e) {
  "@babel/helpers - typeof";
  return Xt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xt(e);
}
function as(e, t) {
  if (Xt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function os(e) {
  var t = as(e, "string");
  return Xt(t) == "symbol" ? t : t + "";
}
function G(e, t, r) {
  return (t = os(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Yt = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    G(
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
}, Mi = (e) => e instanceof Yt || typeof e == "object" && e !== null && typeof e.prepForXml == "function", Ar = (e) => Mi(e) ? e.rootKey : void 0, ss = Object.seal({}), ne = class extends Yt {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    super(e), G(
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
      if (Mi(n)) {
        const i = n.writtenAs;
        return i ? i.map((o) => o.prepForXml(e)) : n.prepForXml(e);
      }
      return n;
    }).filter((n) => n !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : ss };
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
}, it = class extends ne {
  constructor(e, t) {
    super(e), G(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
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
function Xn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function le(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xn(Object(r), !0).forEach(function(n) {
      G(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var ve = class extends Yt {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(e) {
    super("_attr"), G(this, "root", void 0), G(
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
        const i = this.xmlKeys && this.xmlKeys[r] || r;
        t[i] = n;
      }
    }), { _attr: t };
  }
}, yn = class extends Yt {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(e) {
    super("_attr"), G(this, "root", void 0), this.root = e;
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: n }) => le(le({}, t), {}, { [r]: n }), {}) };
  }
}, Ne = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
};
function ls(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.includes(n)) continue;
    r[n] = e[n];
  }
  return r;
}
function bn(e, t) {
  if (e == null) return {};
  var r, n, i = ls(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (n = 0; n < o.length; n++) r = o[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
var us = ["elements"], cs = /* @__PURE__ */ new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"]
]), hs = /&([^;]*);?/g, Ui = (e) => e.indexOf("&") === -1 ? e : e.replace(hs, (t, r) => {
  if (!t.endsWith(";")) throw new Error(`Invalid XML: "&" that starts no entity, in "${e}"`);
  const n = cs.get(r);
  if (n !== void 0) return n;
  const i = /^#x[0-9a-f]+$/i.test(r) ? parseInt(r.slice(2), 16) : /^#[0-9]+$/.test(r) ? parseInt(r.slice(1), 10) : NaN;
  if (!(i > 0 && i <= 1114111)) throw new Error(`Invalid XML: unknown entity "${t}"`);
  return String.fromCodePoint(i);
}), vr = (e) => e === " " || e === `
` || e === "	" || e === "\r", fs = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, ds = (e) => Object.fromEntries([...e.matchAll(fs)].map(([, t, r, n]) => [t, r ?? n])), Wi = (e, { keepWhitespaceText: t = !1 } = {}) => {
  const r = {}, n = [];
  let i = e.charCodeAt(0) === 65279 ? 1 : 0;
  for (; i < e.length && vr(e[i]); ) i++;
  const o = (d) => {
    var _;
    const v = n.length === 0 ? r : n[n.length - 1];
    ((_ = v.elements) !== null && _ !== void 0 ? _ : v.elements = []).push(d);
  }, u = (d) => {
    if (d.trim() === "") {
      d !== "" && t && o({
        type: "text",
        text: d
      });
      return;
    }
    if (n.length === 0) throw new Error(`Invalid XML: text outside of the root element, "${d.trim()}"`);
    o({
      type: "text",
      text: Ui(d)
    });
  }, a = (d, _, v) => {
    const g = e.indexOf(d, _);
    if (g === -1) throw new Error(`Invalid XML: ${v} that isn't closed`);
    return g;
  };
  for (; i < e.length; ) {
    const d = e.indexOf("<", i);
    if (u(e.slice(i, d === -1 ? e.length : d)), d === -1) break;
    if (e.startsWith("<?", d)) {
      const _ = a("?>", d + 2, "processing instruction"), v = e.slice(d + 2, _), g = v.search(/\s/), m = g === -1 ? v : v.slice(0, g), b = g === -1 ? "" : v.slice(g).trimStart();
      if (m.toLowerCase() === "xml") {
        const x = ds(b);
        r.declaration = Object.keys(x).length > 0 ? { attributes: x } : {};
      } else o({
        type: "instruction",
        name: m,
        instruction: b
      });
      i = _ + 2;
    } else if (e.startsWith("<!--", d)) {
      const _ = a("-->", d + 4, "comment"), v = e.slice(d + 4, _);
      v !== "" && o({
        type: "comment",
        comment: v
      }), i = _ + 3;
    } else if (e.startsWith("<![CDATA[", d)) {
      const _ = a("]]>", d + 9, "CDATA section"), v = e.slice(d + 9, _);
      v !== "" && o({
        type: "cdata",
        cdata: v
      }), i = _ + 3;
    } else if (e.startsWith("<!DOCTYPE", d)) {
      let _ = d + 9, v, g = !1;
      for (; _ < e.length; _++) {
        const m = e[_];
        if (v !== void 0) v = m === v ? void 0 : v;
        else if (m === '"' || m === "'") v = m;
        else if (m === "[") g = !0;
        else if (m === "]") g = !1;
        else if (m === ">" && !g) break;
      }
      if (_ === e.length) throw new Error("Invalid XML: DOCTYPE that isn't closed");
      o({
        type: "doctype",
        doctype: e.slice(d + 9, _).replace(/^ /, "")
      }), i = _ + 1;
    } else if (e.startsWith("</", d)) {
      const _ = a(">", d + 2, "closing tag"), v = e.slice(d + 2, _).trimEnd(), g = n.pop();
      if (g?.name !== v) {
        var c;
        throw new Error(`Invalid XML: closing tag </${v}> doesn't match <${(c = g?.name) !== null && c !== void 0 ? c : ""}>`);
      }
      i = _ + 1;
    } else i = ps(e, d + 1, (_, v) => {
      o(_), v || n.push(_);
    });
  }
  if (n.length > 0) throw new Error(`Invalid XML: <${n[n.length - 1].name}> isn't closed`);
  const { elements: h } = r, f = bn(r, us);
  return h === void 0 ? f : le(le({}, f), {}, { elements: h });
}, ps = (e, t, r) => {
  let n = t;
  for (; n < e.length && !vr(e[n]) && e[n] !== "/" && e[n] !== ">"; ) n++;
  const i = e.slice(t, n);
  if (i === "") throw new Error("Invalid XML: tag without a name");
  const o = [];
  let u = n;
  for (; ; ) {
    for (; u < e.length && vr(e[u]); ) u++;
    if (u >= e.length) throw new Error(`Invalid XML: <${i}> that isn't closed`);
    if (e[u] === ">" || e.startsWith("/>", u)) {
      const _ = e[u] === "/";
      return r(le({
        type: "element",
        name: i
      }, o.length > 0 ? { attributes: Object.fromEntries(o) } : {}), _), u + (_ ? 2 : 1);
    }
    const a = e.indexOf("=", u), c = e.slice(u, a === -1 ? e.length : a).trimEnd();
    if (a === -1 || c === "" || /[\s/>]/.test(c)) throw new Error(`Invalid XML: attribute of <${i}> without a value`);
    let h = a + 1;
    for (; h < e.length && vr(e[h]); ) h++;
    const f = e[h];
    if (f !== '"' && f !== "'") throw new Error(`Invalid XML: value of ${c} on <${i}> isn't quoted`);
    const d = e.indexOf(f, h + 1);
    if (d === -1) throw new Error(`Invalid XML: value of ${c} on <${i}> isn't closed`);
    o.some(([_]) => _ === c) || o.push([c, Ui(e.slice(h + 1, d))]), u = d + 1;
  }
}, ms = /* @__PURE__ */ new Map([
  ["&", "&amp;"],
  ['"', "&quot;"],
  ["'", "&apos;"],
  ["<", "&lt;"],
  [">", "&gt;"]
]), on = (e) => e.replace(/[&"'<>]/g, (t) => ms.get(t)), Ur = (e) => typeof e == "string" ? on(e) : e, ji = (e, t, r) => {
  const n = Object.keys(e)[0], i = n === void 0 ? void 0 : e[n], o = [], u = [], a = (c) => {
    for (const [h, f] of Object.entries(c)) o.push(`${h}="${String(Ur(f))}"`);
  };
  if (typeof i == "object") {
    if (i !== null) {
      const { _attr: c, _cdata: h } = i;
      if (c && a(c), h && u.push(`<![CDATA[${h.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`), Array.isArray(i)) {
        let f = !1;
        u.push("");
        for (const d of i) typeof d == "object" ? Object.keys(d)[0] === "_attr" ? a(d._attr) : u.push(ji(d, t, r + 1)) : (u.pop(), f = !0, u.push(Ur(d)));
        f || u.push("");
      }
    }
  } else u.push(Ur(i));
  return {
    name: n,
    attributes: o,
    content: u,
    indents: r > 1 ? t.repeat(r - 1) : ""
  };
}, zi = (e, t, r) => {
  if (typeof e != "object") return String(e);
  const { name: n, attributes: i, content: o, indents: u } = e, { length: a } = o, c = u + (n ? `<${n}` : "") + (i.length > 0 ? ` ${i.join(" ")}` : "") + (a > 0 ? n ? ">" : "" : "/>") + (t && a > 1 ? `
` : "");
  return a === 0 ? c + (t ? `
` : "") : c + o.map((h) => h === void 0 ? "" : zi(h, t, !1)).join("") + (a > 1 ? u : "") + (n ? `</${n}>` : "") + (t && !r ? `
` : "");
}, ye = (e, { indent: t = "", declaration: r } = {}) => {
  const n = Array.isArray(e) ? e : [e], i = t ? 1 : 0, o = r?.standalone ? ` standalone="${on(r.standalone)}"` : "";
  return (r === void 0 ? "" : `<?xml version="1.0" encoding="${on(r.encoding || "UTF-8")}"${o}?>${t ? `
` : ""}`) + n.map((u, a) => zi(ji(u, t, i), t, a === n.length - 1)).join("");
}, _n = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new ws(e.name, e.attributes), r = e.elements || [];
      for (const n of r) {
        const i = _n(n);
        i !== void 0 && t.push(i);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, vs = class extends ve {
}, ws = class extends ne {
  /**
  * Parses an XML string and converts it to an ImportedXmlComponent tree.
  *
  * This static method is the primary way to import external XML content.
  * It parses the XML string into an {@link XmlElement} tree,
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
    return _n(Wi(e));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new vs(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, gs = class extends ne {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(e) {
    super(""), G(this, "_attr", void 0), this._attr = e;
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
}, Hi = class extends ne {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, xe = (e) => {
  if (!Number.isFinite(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, Rr = (e) => {
  const t = xe(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, $i = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, Kn = (e) => $i(e, 1), xn = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, ys = {
  in: 1440,
  cm: 1440 / 2.54,
  mm: 1440 / 25.4,
  pt: 20,
  pc: 240,
  pi: 240
}, st = (e) => {
  if (typeof e == "number") return e;
  const t = e.slice(-2), r = Number(e.substring(0, e.length - 2)), n = ys[t];
  if (n === void 0 || Number.isNaN(r)) throw new Error(`Invalid universal measure '${e}'. Expected a number followed by mm, cm, in, pt, pc or pi.`);
  return r * n;
}, Gi = (e) => {
  const t = xn(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, qi = (e) => e === "auto" ? e : $i(e.charAt(0) === "#" ? e.substring(1) : e, 3), qe = (e) => typeof e == "string" ? xn(e) : xe(e), bs = (e) => typeof e == "string" ? Gi(e) : Rr(e), Ie = (e) => typeof e == "string" ? Gi(e) : Rr(e), _s = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Vi = (e) => typeof e == "number" ? xe(e) : e.slice(-1) === "%" ? _s(e) : xn(e), xs = Rr, Ss = Rr, Es = (e) => e.toISOString(), ce = class extends ne {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Ne({ val: t }));
  }
}, Wr = class extends ne {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Ne({ val: bs(t) }));
  }
}, Xi = class extends ne {
}, nt = class extends ne {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(e, t) {
    super(e), this.root.push(new Ne({ val: t }));
  }
}, Ft = (e, t) => new re({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), $t = class extends ne {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(e, t) {
    super(e), this.root.push(new Ne({ val: t }));
  }
}, pt = class extends ne {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, re = class extends ne {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new yn(t)), r && this.root.push(...r);
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
}, Ki = (e) => new re({
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
}, Zi = {
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
}, Yi = {
  dark1: {
    value: "windowText",
    lastColor: "000000"
  },
  light1: {
    value: "window",
    lastColor: "FFFFFF"
  }
}, Ji = (e, t) => {
  if (t === "auto") throw new Error(`Invalid theme color ${e} 'auto'. Expected 6 digit hex value`);
  return qi(t);
}, Qi = (e = {}) => Object.fromEntries(Object.keys(Sn).map((t) => {
  const r = e[t], n = t === "dark1" || t === "light1" ? Yi[t].lastColor : Zi[t];
  return [t, r === void 0 ? n : Ji(t, r)];
})), ks = (e, t) => new re({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: Ji(e, t)
  } }
}), Ts = (e, t) => {
  const r = t[e], n = e === "dark1" || e === "light1" ? Yi[e] : void 0;
  return new re({
    name: `a:${Sn[e]}`,
    children: [r === void 0 && n ? new re({
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
    }) : ks(e, r ?? Zi[e])]
  });
}, As = (e, t = {}) => new re({
  name: "a:clrScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: Object.keys(Sn).map((r) => Ts(r, t))
}), Zn = /* @__PURE__ */ new Set([
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
]), Rs = /* @__PURE__ */ new Map([
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
]), Yn = (e, t) => {
  if (!(e >= 0 && e <= 100)) throw new Error(`Invalid ${t} ${e}. Expected a number from 0 to 100`);
  return Math.round(255 * (1 - e / 100));
}, Cs = ({ theme: e, lighter: t, darker: r }) => {
  if (!Zn.has(e)) {
    const o = Rs.get(e);
    throw new Error(`Invalid theme color "${e}". ${o ? `Did you mean "${o}"?` : `Expected one of ${[...Zn].join(", ")}`}`);
  }
  if (t !== void 0 && r !== void 0) throw new Error("Invalid theme color. Expected lighter or darker, not both");
  const n = t === void 0 ? void 0 : Yn(t, "lighter"), i = r === void 0 ? void 0 : Yn(r, "darker");
  return {
    tint: n === 255 ? void 0 : n,
    shade: i === 255 ? void 0 : i
  };
}, Is = (e) => {
  const [t, r, n] = [
    0,
    2,
    4
  ].map((c) => parseInt(e.slice(c, c + 2), 16) / 255), i = Math.max(t, r, n), o = Math.min(t, r, n), u = (i + o) / 2, a = i - o;
  return a === 0 ? {
    hue: 0,
    saturation: 0,
    lightness: u
  } : {
    hue: (i === t ? ((r - n) / a + 6) % 6 : i === r ? (n - t) / a + 2 : (t - r) / a + 4) * 60,
    saturation: a / (1 - Math.abs(2 * u - 1)),
    lightness: u
  };
}, Ps = ({ hue: e, saturation: t, lightness: r }) => {
  const n = (1 - Math.abs(2 * r - 1)) * t, i = n * (1 - Math.abs(e / 60 % 2 - 1)), [o, u, a] = e < 60 ? [
    n,
    i,
    0
  ] : e < 120 ? [
    i,
    n,
    0
  ] : e < 180 ? [
    0,
    n,
    i
  ] : e < 240 ? [
    0,
    i,
    n
  ] : e < 300 ? [
    i,
    0,
    n
  ] : [
    n,
    0,
    i
  ], c = r - n / 2;
  return [
    o,
    u,
    a
  ].map((h) => Math.floor((h + c) * 255 + 1e-9).toString(16).padStart(2, "0")).join("").toUpperCase();
}, Os = (e, { tint: t, shade: r }) => {
  if (t === void 0 && r === void 0) return e;
  const n = Is(e), i = t === void 0 ? n.lightness * r / 255 : n.lightness * t / 255 + (1 - t / 255);
  return Ps(le(le({}, n), {}, { lightness: i }));
}, Jn = (e) => e === void 0 ? void 0 : e.toString(16).padStart(2, "0").toUpperCase(), Ns = (e) => typeof e == "string" ? {
  type: "hex",
  value: qi(e)
} : {
  type: "theme",
  color: e,
  change: Cs(e)
}, Ls = (e, t) => e.type === "hex" ? { color: e.value } : {
  color: Os(t[e.color.theme], e.change),
  theme: e.color.theme,
  tint: Jn(e.change.tint),
  shade: Jn(e.change.shade)
}, Fs = Qi(), En = class extends Yt {
  /**
  * @throws If a color isn't valid
  */
  constructor(e) {
    super("_attr"), G(this, "attributes", void 0), this.attributes = e.map((t) => "keys" in t ? {
      keys: t.keys,
      color: t.color === void 0 ? void 0 : Ns(t.color)
    } : t);
  }
  prepForXml(e) {
    var t, r;
    const n = (t = (r = e.file) === null || r === void 0 || (r = r.Theme) === null || r === void 0 ? void 0 : r.Colors) !== null && t !== void 0 ? t : Fs, i = this.attributes.flatMap((o) => {
      if (!("keys" in o)) return [[o.key, o.value]];
      if (o.color === void 0) return [];
      const { keys: u } = o, a = Ls(o.color, n);
      return [
        [u.color, a.color],
        [u.theme, a.theme],
        [u.tint, a.tint],
        [u.shade, a.shade]
      ];
    });
    return { _attr: Object.fromEntries(i.filter(([, o]) => o !== void 0)) };
  }
}, Ds = class extends ne {
  constructor(e, t) {
    super(e), this.root.push(new En(t));
  }
}, kn = (e, t) => new Ds(e, t), Jt = {
  color: "w:color",
  theme: "w:themeColor",
  tint: "w:themeTint",
  shade: "w:themeShade"
}, ke = (e, { color: t, size: r, space: n, style: i }) => kn(e, [
  {
    key: "w:val",
    value: i
  },
  {
    keys: Jt,
    color: t
  },
  {
    key: "w:sz",
    value: r === void 0 ? void 0 : xs(r)
  },
  {
    key: "w:space",
    value: n === void 0 ? void 0 : Ss(n)
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
}, Bs = class extends it {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(ke("w:top", e.top)), e.left && this.root.push(ke("w:left", e.left)), e.bottom && this.root.push(ke("w:bottom", e.bottom)), e.right && this.root.push(ke("w:right", e.right)), e.between && this.root.push(ke("w:between", e.between));
  }
}, Ms = class extends ne {
  constructor() {
    super("w:pBdr");
    const e = ke("w:bottom", {
      color: "auto",
      space: 1,
      style: De.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, Us = ({ start: e, end: t, left: r, right: n, hanging: i, firstLine: o, firstLineChars: u }) => new re({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : qe(e)
    },
    end: {
      key: "w:end",
      value: t === void 0 ? void 0 : qe(t)
    },
    left: {
      key: "w:left",
      value: r === void 0 ? void 0 : qe(r)
    },
    right: {
      key: "w:right",
      value: n === void 0 ? void 0 : qe(n)
    },
    hanging: {
      key: "w:hanging",
      value: i === void 0 ? void 0 : Ie(i)
    },
    firstLine: {
      key: "w:firstLine",
      value: o === void 0 ? void 0 : Ie(o)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: u === void 0 ? void 0 : xe(u)
    }
  }
}), Ws = () => new re({ name: "w:br" }), Cr = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Tn = (e, t, r) => new re({
  name: "w:fldChar",
  attributes: {
    type: {
      key: "w:fldCharType",
      value: e
    },
    dirty: {
      key: "w:dirty",
      value: t
    },
    locked: {
      key: "w:fldLock",
      value: r
    }
  }
}), Wt = (e, t) => Tn(Cr.BEGIN, e, t), ea = /* @__PURE__ */ new WeakSet(), js = class extends re {
  constructor() {
    super({
      name: "w:fldChar",
      attributes: {
        type: {
          key: "w:fldCharType",
          value: Cr.BEGIN
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
    return ea.add(t), t;
  }
}, ta = () => new js(), zs = (e) => typeof e == "object" && e !== null && ea.has(e), vt = (e) => Tn(Cr.SEPARATE, e), wt = (e) => Tn(Cr.END, e), Hs = {
  DECIMAL: "decimal"
}, ut = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, ct = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { space: "xml:space" });
  }
}, $s = class extends ne {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: ut.PRESERVE })), this.root.push("PAGE");
  }
}, Gs = class extends ne {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: ut.PRESERVE })), this.root.push("NUMPAGES");
  }
}, qs = class extends ne {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: ut.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, Vs = class extends ne {
  constructor() {
    super("w:instrText"), this.root.push(new ct({ space: ut.PRESERVE })), this.root.push("SECTION");
  }
}, Ir = ({ fill: e, color: t, type: r }) => kn("w:shd", [
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
    value: r ?? rt.CLEAR
  }
]), rt = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
}, Le = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, Xs = class extends ne {
  constructor(e) {
    super("w:del"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Ks = class extends ne {
  constructor(e) {
    super("w:ins"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Zs = ({ twoLinesInOne: e, brackets: t, horizontalInVertical: r, fitToLine: n, group: i }) => new re({
  name: "w:eastAsianLayout",
  attributes: {
    id: {
      key: "w:id",
      value: i === void 0 ? void 0 : xe(i)
    },
    combine: {
      key: "w:combine",
      value: e
    },
    combineBrackets: {
      key: "w:combineBrackets",
      value: t
    },
    vert: {
      key: "w:vert",
      value: r
    },
    vertCompress: {
      key: "w:vertCompress",
      value: n
    }
  }
}), Ys = {
  /** Dot emphasis mark */
  DOT: "dot"
}, Js = (e = Ys.DOT) => new re({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Qt = /* @__PURE__ */ fe(((e, t) => {
  t.exports = r;
  function r(n, i) {
    if (!n) throw new Error(i || "Assertion failed");
  }
  r.equal = function(i, o, u) {
    if (i != o) throw new Error(u || "Assertion failed: " + i + " != " + o);
  };
})), ht = /* @__PURE__ */ fe(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(n, i) {
    i && (n.super_ = i, n.prototype = Object.create(i.prototype, { constructor: {
      value: n,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : t.exports = function(n, i) {
    if (i) {
      n.super_ = i;
      var o = function() {
      };
      o.prototype = i.prototype, n.prototype = new o(), n.prototype.constructor = n;
    }
  };
})), Ze = /* @__PURE__ */ fe(((e) => {
  var t = Qt();
  e.inherits = ht();
  function r(A, M) {
    return (A.charCodeAt(M) & 64512) !== 55296 || M < 0 || M + 1 >= A.length ? !1 : (A.charCodeAt(M + 1) & 64512) === 56320;
  }
  function n(A, M) {
    if (Array.isArray(A)) return A.slice();
    if (!A) return [];
    var S = [];
    if (typeof A == "string")
      if (M) {
        if (M === "hex")
          for (A = A.replace(/[^a-z0-9]+/gi, ""), A.length % 2 !== 0 && (A = "0" + A), J = 0; J < A.length; J += 2) S.push(parseInt(A[J] + A[J + 1], 16));
      } else for (var W = 0, J = 0; J < A.length; J++) {
        var K = A.charCodeAt(J);
        K < 128 ? S[W++] = K : K < 2048 ? (S[W++] = K >> 6 | 192, S[W++] = K & 63 | 128) : r(A, J) ? (K = 65536 + ((K & 1023) << 10) + (A.charCodeAt(++J) & 1023), S[W++] = K >> 18 | 240, S[W++] = K >> 12 & 63 | 128, S[W++] = K >> 6 & 63 | 128, S[W++] = K & 63 | 128) : (S[W++] = K >> 12 | 224, S[W++] = K >> 6 & 63 | 128, S[W++] = K & 63 | 128);
      }
    else for (J = 0; J < A.length; J++) S[J] = A[J] | 0;
    return S;
  }
  e.toArray = n;
  function i(A) {
    for (var M = "", S = 0; S < A.length; S++) M += a(A[S].toString(16));
    return M;
  }
  e.toHex = i;
  function o(A) {
    return (A >>> 24 | A >>> 8 & 65280 | A << 8 & 16711680 | (A & 255) << 24) >>> 0;
  }
  e.htonl = o;
  function u(A, M) {
    for (var S = "", W = 0; W < A.length; W++) {
      var J = A[W];
      M === "little" && (J = o(J)), S += c(J.toString(16));
    }
    return S;
  }
  e.toHex32 = u;
  function a(A) {
    return A.length === 1 ? "0" + A : A;
  }
  e.zero2 = a;
  function c(A) {
    return A.length === 7 ? "0" + A : A.length === 6 ? "00" + A : A.length === 5 ? "000" + A : A.length === 4 ? "0000" + A : A.length === 3 ? "00000" + A : A.length === 2 ? "000000" + A : A.length === 1 ? "0000000" + A : A;
  }
  e.zero8 = c;
  function h(A, M, S, W) {
    var J = S - M;
    t(J % 4 === 0);
    for (var K = new Array(J / 4), oe = 0, V = M; oe < K.length; oe++, V += 4) {
      var Q;
      W === "big" ? Q = A[V] << 24 | A[V + 1] << 16 | A[V + 2] << 8 | A[V + 3] : Q = A[V + 3] << 24 | A[V + 2] << 16 | A[V + 1] << 8 | A[V], K[oe] = Q >>> 0;
    }
    return K;
  }
  e.join32 = h;
  function f(A, M) {
    for (var S = new Array(A.length * 4), W = 0, J = 0; W < A.length; W++, J += 4) {
      var K = A[W];
      M === "big" ? (S[J] = K >>> 24, S[J + 1] = K >>> 16 & 255, S[J + 2] = K >>> 8 & 255, S[J + 3] = K & 255) : (S[J + 3] = K >>> 24, S[J + 2] = K >>> 16 & 255, S[J + 1] = K >>> 8 & 255, S[J] = K & 255);
    }
    return S;
  }
  e.split32 = f;
  function d(A, M) {
    return A >>> M | A << 32 - M;
  }
  e.rotr32 = d;
  function _(A, M) {
    return A << M | A >>> 32 - M;
  }
  e.rotl32 = _;
  function v(A, M) {
    return A + M >>> 0;
  }
  e.sum32 = v;
  function g(A, M, S) {
    return A + M + S >>> 0;
  }
  e.sum32_3 = g;
  function m(A, M, S, W) {
    return A + M + S + W >>> 0;
  }
  e.sum32_4 = m;
  function b(A, M, S, W, J) {
    return A + M + S + W + J >>> 0;
  }
  e.sum32_5 = b;
  function x(A, M, S, W) {
    var J = A[M], K = W + A[M + 1] >>> 0;
    A[M] = (K < W ? 1 : 0) + S + J >>> 0, A[M + 1] = K;
  }
  e.sum64 = x;
  function y(A, M, S, W) {
    return (M + W >>> 0 < M ? 1 : 0) + A + S >>> 0;
  }
  e.sum64_hi = y;
  function k(A, M, S, W) {
    return M + W >>> 0;
  }
  e.sum64_lo = k;
  function T(A, M, S, W, J, K, oe, V) {
    var Q = 0, H = M;
    return H = H + W >>> 0, Q += H < M ? 1 : 0, H = H + K >>> 0, Q += H < K ? 1 : 0, H = H + V >>> 0, Q += H < V ? 1 : 0, A + S + J + oe + Q >>> 0;
  }
  e.sum64_4_hi = T;
  function R(A, M, S, W, J, K, oe, V) {
    return M + W + K + V >>> 0;
  }
  e.sum64_4_lo = R;
  function I(A, M, S, W, J, K, oe, V, Q, H) {
    var C = 0, q = M;
    return q = q + W >>> 0, C += q < M ? 1 : 0, q = q + K >>> 0, C += q < K ? 1 : 0, q = q + V >>> 0, C += q < V ? 1 : 0, q = q + H >>> 0, C += q < H ? 1 : 0, A + S + J + oe + Q + C >>> 0;
  }
  e.sum64_5_hi = I;
  function N(A, M, S, W, J, K, oe, V, Q, H) {
    return M + W + K + V + H >>> 0;
  }
  e.sum64_5_lo = N;
  function U(A, M, S) {
    return (M << 32 - S | A >>> S) >>> 0;
  }
  e.rotr64_hi = U;
  function F(A, M, S) {
    return (A << 32 - S | M >>> S) >>> 0;
  }
  e.rotr64_lo = F;
  function Z(A, M, S) {
    return A >>> S;
  }
  e.shr64_hi = Z;
  function ae(A, M, S) {
    return (A << 32 - S | M >>> S) >>> 0;
  }
  e.shr64_lo = ae;
})), er = /* @__PURE__ */ fe(((e) => {
  var t = Ze(), r = Qt();
  function n() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  e.BlockHash = n, n.prototype.update = function(o, u) {
    if (o = t.toArray(o, u), this.pending ? this.pending = this.pending.concat(o) : this.pending = o, this.pendingTotal += o.length, this.pending.length >= this._delta8) {
      o = this.pending;
      var a = o.length % this._delta8;
      this.pending = o.slice(o.length - a, o.length), this.pending.length === 0 && (this.pending = null), o = t.join32(o, 0, o.length - a, this.endian);
      for (var c = 0; c < o.length; c += this._delta32) this._update(o, c, c + this._delta32);
    }
    return this;
  }, n.prototype.digest = function(o) {
    return this.update(this._pad()), r(this.pending === null), this._digest(o);
  }, n.prototype._pad = function() {
    var o = this.pendingTotal, u = this._delta8, a = u - (o + this.padLength) % u, c = new Array(a + this.padLength);
    c[0] = 128;
    for (var h = 1; h < a; h++) c[h] = 0;
    if (o <<= 3, this.endian === "big") {
      for (var f = 8; f < this.padLength; f++) c[h++] = 0;
      c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = o >>> 24 & 255, c[h++] = o >>> 16 & 255, c[h++] = o >>> 8 & 255, c[h++] = o & 255;
    } else
      for (c[h++] = o & 255, c[h++] = o >>> 8 & 255, c[h++] = o >>> 16 & 255, c[h++] = o >>> 24 & 255, c[h++] = 0, c[h++] = 0, c[h++] = 0, c[h++] = 0, f = 8; f < this.padLength; f++) c[h++] = 0;
    return c;
  };
})), ra = /* @__PURE__ */ fe(((e) => {
  var t = Ze().rotr32;
  function r(f, d, _, v) {
    if (f === 0) return n(d, _, v);
    if (f === 1 || f === 3) return o(d, _, v);
    if (f === 2) return i(d, _, v);
  }
  e.ft_1 = r;
  function n(f, d, _) {
    return f & d ^ ~f & _;
  }
  e.ch32 = n;
  function i(f, d, _) {
    return f & d ^ f & _ ^ d & _;
  }
  e.maj32 = i;
  function o(f, d, _) {
    return f ^ d ^ _;
  }
  e.p32 = o;
  function u(f) {
    return t(f, 2) ^ t(f, 13) ^ t(f, 22);
  }
  e.s0_256 = u;
  function a(f) {
    return t(f, 6) ^ t(f, 11) ^ t(f, 25);
  }
  e.s1_256 = a;
  function c(f) {
    return t(f, 7) ^ t(f, 18) ^ f >>> 3;
  }
  e.g0_256 = c;
  function h(f) {
    return t(f, 17) ^ t(f, 19) ^ f >>> 10;
  }
  e.g1_256 = h;
})), Qs = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), i = ra(), o = r.rotl32, u = r.sum32, a = r.sum32_5, c = i.ft_1, h = n.BlockHash, f = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function d() {
    if (!(this instanceof d)) return new d();
    h.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(d, h), t.exports = d, d.blockSize = 512, d.outSize = 160, d.hmacStrength = 80, d.padLength = 64, d.prototype._update = function(v, g) {
    for (var m = this.W, b = 0; b < 16; b++) m[b] = v[g + b];
    for (; b < m.length; b++) m[b] = o(m[b - 3] ^ m[b - 8] ^ m[b - 14] ^ m[b - 16], 1);
    var x = this.h[0], y = this.h[1], k = this.h[2], T = this.h[3], R = this.h[4];
    for (b = 0; b < m.length; b++) {
      var I = ~~(b / 20), N = a(o(x, 5), c(I, y, k, T), R, m[b], f[I]);
      R = T, T = k, k = o(y, 30), y = x, x = N;
    }
    this.h[0] = u(this.h[0], x), this.h[1] = u(this.h[1], y), this.h[2] = u(this.h[2], k), this.h[3] = u(this.h[3], T), this.h[4] = u(this.h[4], R);
  }, d.prototype._digest = function(v) {
    return v === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), na = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), i = ra(), o = Qt(), u = r.sum32, a = r.sum32_4, c = r.sum32_5, h = i.ch32, f = i.maj32, d = i.s0_256, _ = i.s1_256, v = i.g0_256, g = i.g1_256, m = n.BlockHash, b = [
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
  function x() {
    if (!(this instanceof x)) return new x();
    m.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = b, this.W = new Array(64);
  }
  r.inherits(x, m), t.exports = x, x.blockSize = 512, x.outSize = 256, x.hmacStrength = 192, x.padLength = 64, x.prototype._update = function(k, T) {
    for (var R = this.W, I = 0; I < 16; I++) R[I] = k[T + I];
    for (; I < R.length; I++) R[I] = a(g(R[I - 2]), R[I - 7], v(R[I - 15]), R[I - 16]);
    var N = this.h[0], U = this.h[1], F = this.h[2], Z = this.h[3], ae = this.h[4], A = this.h[5], M = this.h[6], S = this.h[7];
    for (o(this.k.length === R.length), I = 0; I < R.length; I++) {
      var W = c(S, _(ae), h(ae, A, M), this.k[I], R[I]), J = u(d(N), f(N, U, F));
      S = M, M = A, A = ae, ae = u(Z, W), Z = F, F = U, U = N, N = u(W, J);
    }
    this.h[0] = u(this.h[0], N), this.h[1] = u(this.h[1], U), this.h[2] = u(this.h[2], F), this.h[3] = u(this.h[3], Z), this.h[4] = u(this.h[4], ae), this.h[5] = u(this.h[5], A), this.h[6] = u(this.h[6], M), this.h[7] = u(this.h[7], S);
  }, x.prototype._digest = function(k) {
    return k === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), el = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = na();
  function i() {
    if (!(this instanceof i)) return new i();
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
  r.inherits(i, n), t.exports = i, i.blockSize = 512, i.outSize = 224, i.hmacStrength = 192, i.padLength = 64, i.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), ia = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = er(), i = Qt(), o = r.rotr64_hi, u = r.rotr64_lo, a = r.shr64_hi, c = r.shr64_lo, h = r.sum64, f = r.sum64_hi, d = r.sum64_lo, _ = r.sum64_4_hi, v = r.sum64_4_lo, g = r.sum64_5_hi, m = r.sum64_5_lo, b = n.BlockHash, x = [
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
    b.call(this), this.h = [
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
    ], this.k = x, this.W = new Array(160);
  }
  r.inherits(y, b), t.exports = y, y.blockSize = 1024, y.outSize = 512, y.hmacStrength = 192, y.padLength = 128, y.prototype._prepareBlock = function(J, K) {
    for (var oe = this.W, V = 0; V < 32; V++) oe[V] = J[K + V];
    for (; V < oe.length; V += 2) {
      var Q = M(oe[V - 4], oe[V - 3]), H = S(oe[V - 4], oe[V - 3]), C = oe[V - 14], q = oe[V - 13], X = ae(oe[V - 30], oe[V - 29]), ee = A(oe[V - 30], oe[V - 29]), pe = oe[V - 32], $ = oe[V - 31];
      oe[V] = _(Q, H, C, q, X, ee, pe, $), oe[V + 1] = v(Q, H, C, q, X, ee, pe, $);
    }
  }, y.prototype._update = function(J, K) {
    this._prepareBlock(J, K);
    var oe = this.W, V = this.h[0], Q = this.h[1], H = this.h[2], C = this.h[3], q = this.h[4], X = this.h[5], ee = this.h[6], pe = this.h[7], $ = this.h[8], B = this.h[9], Y = this.h[10], se = this.h[11], he = this.h[12], O = this.h[13], P = this.h[14], p = this.h[15];
    i(this.k.length === oe.length);
    for (var z = 0; z < oe.length; z += 2) {
      var E = P, s = p, l = F($, B), w = Z($, B), L = k($, B, Y, se, he), j = T($, B, Y, se, he, O), D = this.k[z], te = this.k[z + 1], ue = oe[z], ie = oe[z + 1], de = g(E, s, l, w, L, j, D, te, ue, ie), me = m(E, s, l, w, L, j, D, te, ue, ie);
      E = N(V, Q), s = U(V, Q), l = R(V, Q, H, C, q), w = I(V, Q, H, C, q, X);
      var we = f(E, s, l, w), Ae = d(E, s, l, w);
      P = he, p = O, he = Y, O = se, Y = $, se = B, $ = f(ee, pe, de, me), B = d(pe, pe, de, me), ee = q, pe = X, q = H, X = C, H = V, C = Q, V = f(de, me, we, Ae), Q = d(de, me, we, Ae);
    }
    h(this.h, 0, V, Q), h(this.h, 2, H, C), h(this.h, 4, q, X), h(this.h, 6, ee, pe), h(this.h, 8, $, B), h(this.h, 10, Y, se), h(this.h, 12, he, O), h(this.h, 14, P, p);
  }, y.prototype._digest = function(J) {
    return J === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function k(W, J, K, oe, V) {
    var Q = W & K ^ ~W & V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function T(W, J, K, oe, V, Q) {
    var H = J & oe ^ ~J & Q;
    return H < 0 && (H += 4294967296), H;
  }
  function R(W, J, K, oe, V) {
    var Q = W & K ^ W & V ^ K & V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function I(W, J, K, oe, V, Q) {
    var H = J & oe ^ J & Q ^ oe & Q;
    return H < 0 && (H += 4294967296), H;
  }
  function N(W, J) {
    var K = o(W, J, 28), oe = o(J, W, 2), V = o(J, W, 7), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function U(W, J) {
    var K = u(W, J, 28), oe = u(J, W, 2), V = u(J, W, 7), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function F(W, J) {
    var K = o(W, J, 14), oe = o(W, J, 18), V = o(J, W, 9), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function Z(W, J) {
    var K = u(W, J, 14), oe = u(W, J, 18), V = u(J, W, 9), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function ae(W, J) {
    var K = o(W, J, 1), oe = o(W, J, 8), V = a(W, J, 7), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function A(W, J) {
    var K = u(W, J, 1), oe = u(W, J, 8), V = c(W, J, 7), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function M(W, J) {
    var K = o(W, J, 19), oe = o(J, W, 29), V = a(W, J, 6), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function S(W, J) {
    var K = u(W, J, 19), oe = u(J, W, 29), V = c(W, J, 6), Q = K ^ oe ^ V;
    return Q < 0 && (Q += 4294967296), Q;
  }
})), tl = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = ia();
  function i() {
    if (!(this instanceof i)) return new i();
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
  r.inherits(i, n), t.exports = i, i.blockSize = 1024, i.outSize = 384, i.hmacStrength = 192, i.padLength = 128, i.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), rl = /* @__PURE__ */ fe(((e) => {
  e.sha1 = Qs(), e.sha224 = el(), e.sha256 = na(), e.sha384 = tl(), e.sha512 = ia();
})), nl = /* @__PURE__ */ fe(((e) => {
  var t = Ze(), r = er(), n = t.rotl32, i = t.sum32, o = t.sum32_3, u = t.sum32_4, a = r.BlockHash;
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
  t.inherits(c, a), e.ripemd160 = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 192, c.padLength = 64, c.prototype._update = function(x, y) {
    for (var k = this.h[0], T = this.h[1], R = this.h[2], I = this.h[3], N = this.h[4], U = k, F = T, Z = R, ae = I, A = N, M = 0; M < 80; M++) {
      var S = i(n(u(k, h(M, T, R, I), x[_[M] + y], f(M)), g[M]), N);
      k = N, N = I, I = n(R, 10), R = T, T = S, S = i(n(u(U, h(79 - M, F, Z, ae), x[v[M] + y], d(M)), m[M]), A), U = A, A = ae, ae = n(Z, 10), Z = F, F = S;
    }
    S = o(this.h[1], R, ae), this.h[1] = o(this.h[2], I, A), this.h[2] = o(this.h[3], N, U), this.h[3] = o(this.h[4], k, F), this.h[4] = o(this.h[0], T, Z), this.h[0] = S;
  }, c.prototype._digest = function(x) {
    return x === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function h(b, x, y, k) {
    return b <= 15 ? x ^ y ^ k : b <= 31 ? x & y | ~x & k : b <= 47 ? (x | ~y) ^ k : b <= 63 ? x & k | y & ~k : x ^ (y | ~k);
  }
  function f(b) {
    return b <= 15 ? 0 : b <= 31 ? 1518500249 : b <= 47 ? 1859775393 : b <= 63 ? 2400959708 : 2840853838;
  }
  function d(b) {
    return b <= 15 ? 1352829926 : b <= 31 ? 1548603684 : b <= 47 ? 1836072691 : b <= 63 ? 2053994217 : 0;
  }
  var _ = [
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
  ], v = [
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
  ], g = [
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
  ], m = [
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
})), il = /* @__PURE__ */ fe(((e, t) => {
  var r = Ze(), n = Qt();
  function i(o, u, a) {
    if (!(this instanceof i)) return new i(o, u, a);
    this.Hash = o, this.blockSize = o.blockSize / 8, this.outSize = o.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(u, a));
  }
  t.exports = i, i.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), n(u.length <= this.blockSize);
    for (var a = u.length; a < this.blockSize; a++) u.push(0);
    for (a = 0; a < u.length; a++) u[a] ^= 54;
    for (this.inner = new this.Hash().update(u), a = 0; a < u.length; a++) u[a] ^= 106;
    this.outer = new this.Hash().update(u);
  }, i.prototype.update = function(u, a) {
    return this.inner.update(u, a), this;
  }, i.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  };
})), sn = /* @__PURE__ */ Bi((/* @__PURE__ */ fe(((e) => {
  var t = e;
  t.utils = Ze(), t.common = er(), t.sha = rl(), t.ripemd = nl(), t.hmac = il(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})))()), al = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", ol = (e, t = 21) => (r = t) => {
  let n = "", i = r | 0;
  for (; i-- > 0; ) n += e[Math.random() * e.length | 0];
  return n;
}, sl = (e = 21) => {
  let t = "", r = e | 0;
  for (; r-- > 0; ) t += al[Math.random() * 64 | 0];
  return t;
}, Ue = (e) => Math.floor(e * 72 * 20), It = (e = 0) => {
  let t = e;
  return () => ++t;
}, ll = () => It(), ul = () => It(1), cl = () => It(), hl = cl(), fl = () => It(), aa = fl(), dl = It(), pl = () => -dl(), An = () => sl().toLowerCase(), oa = (e) => sn.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), Dt = (e) => ol("1234567890abcdef", e)(), sa = () => `${Dt(8)}-${Dt(4)}-${Dt(4)}-${Dt(4)}-${Dt(12)}`, jt = (e) => new Uint8Array(new TextEncoder().encode(e)), ml = ({ width: e, group: t }) => new re({
  name: "w:fitText",
  attributes: {
    val: {
      key: "w:val",
      value: Math.round(st(Ie(e)))
    },
    id: {
      key: "w:id",
      value: t === void 0 ? pl() : xe(t)
    }
  }
}), vl = class extends ne {
  constructor(e) {
    super("w:spacing"), this.root.push(new Ne({ val: qe(e) }));
  }
}, wl = class extends ne {
  constructor(e) {
    super("w:color"), this.root.push(new En([{
      keys: le(le({}, Jt), {}, { color: "w:val" }),
      color: e
    }]));
  }
}, gl = class extends ne {
  constructor(e) {
    super("w:highlight"), this.root.push(new Ne({ val: e }));
  }
}, yl = (e) => new re({
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
}), jr = (e, t) => {
  if (typeof e == "string") {
    const n = e;
    return new re({
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
    return new re({
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
  return new re({
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
}, la = (e) => new re({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), bl = () => la("superscript"), _l = () => la("subscript"), ua = {
  /** Single underline */
  SINGLE: "single"
}, xl = (e = ua.SINGLE, t) => kn("w:u", [{
  key: "w:val",
  value: e
}, {
  keys: Jt,
  color: t
}]), ft = class extends it {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new nt("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(jr(e.font)) : "name" in e.font ? this.push(jr(e.font.name, e.font.hint)) : this.push(jr(e.font))), e.bold !== void 0 && this.push(new ce("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new ce("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new ce("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new ce("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new ce("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ce("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ce("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ce("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ce("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ce("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ce("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ce("w:snapToGrid", e.snapToGrid)), e.vanish !== void 0 && this.push(new ce("w:vanish", e.vanish)), e.color && this.push(new wl(e.color)), e.characterSpacing && this.push(new vl(e.characterSpacing)), e.scale !== void 0 && this.push(new $t("w:w", e.scale)), e.kern && this.push(new Wr("w:kern", e.kern)), e.position && this.push(new nt("w:position", e.position)), e.size !== void 0 && this.push(new Wr("w:sz", e.size));
    const n = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    n && this.push(new Wr("w:szCs", n)), e.highlight && this.push(new gl(e.highlight)), e.underline && this.push(xl(e.underline.type, e.underline.color)), e.effect && this.push(new nt("w:effect", e.effect)), e.border && this.push(ke("w:bdr", e.border)), e.shading && this.push(Ir(e.shading)), e.fitText && this.push(ml(e.fitText)), e.subScript && this.push(_l()), e.superScript && this.push(bl()), e.rightToLeft !== void 0 && this.push(new ce("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(Js(e.emphasisMark.type)), e.language && this.push(yl(e.language)), e.eastAsianLayout && this.push(Zs(e.eastAsianLayout)), e.specVanish !== void 0 && this.push(new ce("w:specVanish", e.specVanish)), e.math !== void 0 && this.push(new ce("w:oMath", e.math)), e.revision && this.push(new El(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, Sl = class extends ft {
  constructor(e) {
    super(e), e?.insertion && this.push(new Ks(e.insertion)), e?.deletion && this.push(new Xs(e.deletion));
  }
}, El = class extends ne {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new ft(e));
  }
}, Sr = class extends ne {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new ct({ space: ut.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new ct({ space: (t = e.space) !== null && t !== void 0 ? t : ut.DEFAULT })), this.root.push(e.text);
    }
  }
}, lt = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, kl = (e) => {
  switch (e) {
    case lt.CURRENT:
      return [
        Wt(),
        new $s(),
        vt(),
        wt()
      ];
    case lt.TOTAL_PAGES:
      return [
        Wt(),
        new Gs(),
        vt(),
        wt()
      ];
    case lt.TOTAL_PAGES_IN_SECTION:
      return [
        Wt(),
        new qs(),
        vt(),
        wt()
      ];
    case lt.CURRENT_SECTION:
      return [
        Wt(),
        new Vs(),
        vt(),
        wt()
      ];
    default:
      return;
  }
}, Me = class ln extends ne {
  constructor(t) {
    if (super("w:r"), G(this, "properties", void 0), G(this, "following", []), this.properties = new ft(t), this.root.push(this.properties), t.break) for (let r = 0; r < t.break; r++) this.root.push(Ws());
    if (t.children) for (const [r, n] of t.children.entries()) {
      if (Ar(n) === "w:r") {
        const i = t.children.slice(r + 1);
        this.following = [n, ...i.length > 0 ? [new ln(le(le({}, t), {}, {
          break: void 0,
          children: i
        }))] : []];
        break;
      }
      if (typeof n == "string") {
        const i = kl(n);
        if (i) {
          const o = t.children.slice(r + 1), u = (h) => new ln(le(le({}, t), {}, {
            break: void 0,
            children: h
          })), a = this.root.length === 1;
          a && this.root.push(i[0]);
          const c = a ? i.slice(1) : i;
          this.following = [...c.map((h) => u([h])), ...o.length > 0 ? [u(o)] : []];
          break;
        }
        this.root.push(new Sr(n));
        continue;
      }
      this.root.push(n);
    }
    else t.text !== void 0 && this.root.push(new Sr(t.text));
  }
  get writtenAs() {
    return this.following.length > 0 ? [this, ...this.following.flatMap((t) => {
      var r;
      return (r = t.writtenAs) !== null && r !== void 0 ? r : t;
    })] : void 0;
  }
}, Te = class extends Me {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, Tl = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Al = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Rl = () => new re({
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
}), ca = (e) => new re({
  name: "wp:align",
  children: [e]
}), ha = (e) => new re({
  name: "wp:posOffset",
  children: [e.toString()]
}), Cl = ({ relative: e, align: t, offset: r }) => new re({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Tl.PAGE
  } },
  children: [(() => {
    if (t) return ca(t);
    if (r !== void 0) return ha(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Il = ({ relative: e, align: t, offset: r }) => new re({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Al.PAGE
  } },
  children: [(() => {
    if (t) return ca(t);
    if (r !== void 0) return ha(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Pl = (e = {}) => {
  var t, r, n, i;
  return new re({
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
        value: (i = e.margins) === null || i === void 0 ? void 0 : i.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new ce("a:noAutofit", e.noAutoFit)] : []]
  });
}, Ol = (e = { txBox: "1" }) => new re({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), Nl = (e) => new re({
  name: "w:txbxContent",
  children: [...e]
}), Ll = (e) => new re({
  name: "wps:txbx",
  children: [Nl(e)]
}), Fl = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, fa = class extends ne {
  constructor(e, t) {
    super("a:ext"), G(this, "attributes", void 0), this.attributes = new Fl({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, Dl = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, da = class extends ne {
  constructor(e, t) {
    super("a:off"), this.root.push(new Dl({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, Bl = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, Ml = class extends ne {
  constructor(e) {
    var t, r, n, i;
    super("a:xfrm"), G(this, "extents", void 0), G(this, "offset", void 0), this.root.push(new Bl({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new da((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (i = e.offset) === null || i === void 0 || (i = i.emus) === null || i === void 0 ? void 0 : i.y), this.extents = new fa(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, pa = () => new re({ name: "a:noFill" }), Ul = (e) => new re({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), Wl = (e) => new re({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), un = (e) => new re({
  name: "a:solidFill",
  children: [e.type === "rgb" ? Ul(e) : Wl(e)]
}), jl = {
  /** Round cap style */
  ROUND: "rnd",
  /** Square cap style */
  SQUARE: "sq",
  /** Flat cap style */
  FLAT: "flat"
}, zl = {
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
}, Hl = {
  /** Center alignment */
  CENTER: "ctr",
  /** Inset alignment */
  INSET: "in"
}, $l = (e) => new re({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap === void 0 ? void 0 : jl[e.cap]
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine === void 0 ? void 0 : zl[e.compoundLine]
    },
    align: {
      key: "algn",
      value: e.align === void 0 ? void 0 : Hl[e.align]
    }
  },
  children: [e.type === "noFill" ? pa() : e.solidFillType === "rgb" ? un({
    type: "rgb",
    value: e.value
  }) : un({
    type: "scheme",
    value: e.value
  })]
}), Gl = class extends ne {
  constructor() {
    super("a:avLst");
  }
}, ql = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { prst: "prst" });
  }
}, Vl = class extends ne {
  constructor() {
    super("a:prstGeom"), this.root.push(new ql({ prst: "rect" })), this.root.push(new Gl());
  }
}, Xl = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, ma = class extends ne {
  constructor({ element: e, outline: t, solidFill: r, transform: n }) {
    super(`${e}:spPr`), G(this, "form", void 0), this.root.push(new Xl({ bwMode: "auto" })), this.form = new Ml(n), this.root.push(this.form), this.root.push(new Vl()), r ? this.root.push(un(r)) : t && this.root.push(pa()), t && this.root.push($l(t));
  }
}, Qn = (e) => new re({
  name: "wps:wsp",
  children: [
    Ol(e.nonVisualProperties),
    new ma({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    Ll(e.children),
    Pl(e.bodyProperties)
  ]
}), ur = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { uri: "uri" });
  }
}, Kl = (e) => new re({
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
}), Zl = (e) => new re({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [Kl(e)]
}), Yl = (e) => new re({
  name: "a:extLst",
  children: [Zl(e)]
}), Jl = (e) => new re({
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
  children: e.type === "svg" ? [Yl(e)] : []
}), Ql = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      left: "l",
      top: "t",
      right: "r",
      bottom: "b"
    });
  }
}, cr = (e, t) => {
  if (e !== void 0) {
    if (!(e >= 0 && e <= 100)) throw new Error(`Invalid crop ${t} ${e}. Expected a number from 0 to 100`);
    return Math.round(e * 1e3);
  }
}, eu = class extends ne {
  constructor(e) {
    super("a:srcRect"), e && this.root.push(new Ql({
      left: cr(e.left, "left"),
      top: cr(e.top, "top"),
      right: cr(e.right, "right"),
      bottom: cr(e.bottom, "bottom")
    }));
  }
}, tu = class extends ne {
  constructor() {
    super("a:fillRect");
  }
}, ru = class extends ne {
  constructor() {
    super("a:stretch"), this.root.push(new tu());
  }
}, nu = class extends ne {
  constructor(e, t) {
    super("pic:blipFill"), this.root.push(Jl(e)), this.root.push(new eu(t)), this.root.push(new ru());
  }
}, iu = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, au = class extends ne {
  constructor() {
    super("a:picLocks"), this.root.push(new iu({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, ou = class extends ne {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new au());
  }
}, su = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, lu = class extends ne {
  constructor() {
    super("pic:cNvPr"), this.root.push(new su({
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
}, uu = class extends ne {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new lu()), this.root.push(new ou());
  }
}, cu = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, ei = class extends ne {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: i }) {
    super("pic:pic"), this.root.push(new cu({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new uu()), this.root.push(new nu(e, i)), this.root.push(new ma({
      element: "pic",
      transform: t,
      outline: r,
      solidFill: n
    }));
  }
}, hu = (e) => {
  var t, r, n, i;
  return new re({
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
      new da((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (i = e.offset) === null || i === void 0 || (i = i.emus) === null || i === void 0 ? void 0 : i.y),
      new fa(e.emus.x, e.emus.y),
      new re({
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
      new re({
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
}, fu = () => new re({ name: "wpg:cNvGrpSpPr" }), du = (e) => new re({
  name: "wpg:wgp",
  children: [
    fu(),
    new re({
      name: "wpg:grpSpPr",
      children: [hu(e.transformation)]
    }),
    ...e.children
  ]
}), pu = class extends ne {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: i }) {
    if (super("a:graphicData"), e.type === "graphic")
      this.root.push(new ur({ uri: e.uri })), this.root.push(e.content);
    else if (e.type === "wps") {
      this.root.push(new ur({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const o = Qn(le(le({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: n
      }));
      this.root.push(o);
    } else if (e.type === "wpg") {
      this.root.push(new ur({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const o = du({
        children: e.children.map((u) => u.type === "wps" ? Qn(le(le({}, u.data), {}, {
          transformation: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })) : new ei({
          mediaData: u,
          transform: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })),
        transformation: t
      });
      this.root.push(o);
    } else {
      this.root.push(new ur({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const o = new ei({
        mediaData: e,
        transform: t,
        outline: r,
        solidFill: n,
        crop: i
      });
      this.root.push(o);
    }
  }
}, mu = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { a: "xmlns:a" });
  }
}, va = class extends ne {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: i }) {
    super("a:graphic"), G(this, "data", void 0), this.root.push(new mu({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new pu({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: n,
      crop: i
    }), this.root.push(this.data);
  }
}, Bt = {
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
}, ti = () => new re({ name: "wp:wrapNone" }), vu = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new re({
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
}), hr = 21600, Mt = (e, { x: t, y: r }) => new re({
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
}), wu = () => new re({
  name: "wp:wrapPolygon",
  attributes: { edited: {
    key: "edited",
    value: !1
  } },
  children: [
    Mt("wp:start", {
      x: 0,
      y: 0
    }),
    Mt("wp:lineTo", {
      x: 0,
      y: hr
    }),
    Mt("wp:lineTo", {
      x: hr,
      y: hr
    }),
    Mt("wp:lineTo", {
      x: hr,
      y: 0
    }),
    Mt("wp:lineTo", {
      x: 0,
      y: 0
    })
  ]
}), ga = (e, t = {}, r) => {
  var n;
  return new re({
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
    children: [wu()]
  });
}, gu = (e, t) => ga("wp:wrapTight", e, t), yu = (e, t) => ga("wp:wrapThrough", e, t), bu = (e = {
  top: 0,
  bottom: 0
}) => new re({
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
}, _u = (e, t, r, n) => new re({
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
}), ba = (e, t) => new re({
  name: "a:hlinkClick",
  attributes: le(le({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), xu = "{C183D7F6-B498-43B3-948B-1728B52AA6E4}", Su = (e) => new re({
  name: "a:extLst",
  attributes: { namespace: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } },
  children: [new re({
    name: "a:ext",
    attributes: { uri: {
      key: "uri",
      value: xu
    } },
    children: [new re({
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
}), _a = class {
  constructor(e) {
    G(this, "link", void 0), G(this, "linkId", An()), G(this, "addedTo", /* @__PURE__ */ new WeakSet()), this.link = e;
  }
  createClick(e) {
    return ba(this.linkId, e);
  }
  addRelationship(e) {
    const t = e.viewWrapper.Relationships;
    this.addedTo.has(t) || (this.addedTo.add(t), t.addRelationship(this.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", this.link, ya.EXTERNAL));
  }
}, xa = class extends ne {
  constructor({ name: e, description: t, title: r, id: n } = { name: "" }, { link: i, decorative: o } = {}) {
    super("wp:docPr"), G(this, "link", void 0), G(this, "decorative", void 0);
    const u = {
      id: {
        key: "id",
        value: n ?? hl()
      },
      name: {
        key: "name",
        value: e
      }
    };
    t && (u.description = {
      key: "descr",
      value: t
    }), r && (u.title = {
      key: "title",
      value: r
    }), this.root.push(new yn(u)), this.link = i === void 0 ? void 0 : new _a(i), this.decorative = o;
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
    this.decorative && this.root.push(Su());
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, Sa = ({ top: e, right: t, bottom: r, left: n }) => new re({
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
}), zr = 2147483647, ri = 9525, ni = (e, t) => {
  if (t !== void 0 && t > zr) throw new Error(`Invalid drawing ${e} ${t} EMUs (${Math.round(t / ri)} pixels). Word won't open a drawing with a ${e} over ${zr} EMUs (${Math.floor(zr / ri)} pixels). Sizes such as an ImageRun's transformation are in pixels, not EMUs`);
  return t;
}, Ea = ({ x: e, y: t }) => new re({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: ni("width", e)
    },
    y: {
      key: "cy",
      value: ni("height", t)
    }
  }
}), Eu = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, ku = class extends ne {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Eu({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, ka = (e = !0) => new re({
  name: "wp:cNvGraphicFramePr",
  children: e ? [new ku()] : []
}), Tu = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, Au = class extends ne {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    var n;
    super("wp:anchor");
    const i = le({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Tu({
      distT: i.margins && i.margins.top || 0,
      distB: i.margins && i.margins.bottom || 0,
      distL: i.margins && i.margins.left || 0,
      distR: i.margins && i.margins.right || 0,
      simplePos: "0",
      allowOverlap: i.allowOverlap === !0 ? "1" : "0",
      behindDoc: i.behindDocument === !0 ? "1" : "0",
      locked: i.lockAnchor === !0 ? "1" : "0",
      layoutInCell: i.layoutInCell === !0 ? "1" : "0",
      relativeHeight: i.zIndex ? i.zIndex : t.emus.y
    })), this.root.push(Rl()), this.root.push(Cl(i.horizontalPosition)), this.root.push(Il(i.verticalPosition)), this.root.push(Ea({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push(Sa((n = r.effectExtent) !== null && n !== void 0 ? n : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Bt.SQUARE:
        this.root.push(vu(r.floating.wrap, r.floating.margins));
        break;
      case Bt.TIGHT:
        this.root.push(gu(r.floating.margins, r.floating.wrap));
        break;
      case Bt.THROUGH:
        this.root.push(yu(r.floating.margins, r.floating.wrap));
        break;
      case Bt.TOP_AND_BOTTOM:
        this.root.push(bu(r.floating.margins));
        break;
      case Bt.NONE:
      default:
        this.root.push(ti());
    }
    else this.root.push(ti());
    this.root.push(new xa(r.docProperties, {
      link: r.link,
      decorative: r.decorative
    })), this.root.push(ka(e.type !== "graphic" || e.lockAspectRatio !== !1)), this.root.push(new va({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill,
      crop: r.crop
    }));
  }
}, Ru = ({ mediaData: e, transform: t, docProperties: r, outline: n, solidFill: i, crop: o, effectExtent: u, link: a, decorative: c }) => {
  var h, f, d, _;
  return new re({
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
      Ea({
        x: t.emus.x,
        y: t.emus.y
      }),
      Sa(u ?? (n ? {
        top: ((h = n.width) !== null && h !== void 0 ? h : 9525) * 2,
        right: ((f = n.width) !== null && f !== void 0 ? f : 9525) * 2,
        bottom: ((d = n.width) !== null && d !== void 0 ? d : 9525) * 2,
        left: ((_ = n.width) !== null && _ !== void 0 ? _ : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })),
      new xa(r, {
        link: a,
        decorative: c
      }),
      ka(e.type !== "graphic" || e.lockAspectRatio !== !1),
      new va({
        mediaData: e,
        transform: t,
        outline: n,
        solidFill: i,
        crop: o
      })
    ]
  });
}, Cu = class extends ne {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Au({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(Ru({
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
}, Iu = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((n) => n.charCodeAt(0)));
}, Ta = (e) => typeof e == "string" ? Iu(e) : e, Pu = [
  ["png", [
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10
  ]],
  ["jpg", [
    255,
    216,
    255
  ]],
  ["gif", [
    71,
    73,
    70,
    56,
    55,
    97
  ]],
  ["gif", [
    71,
    73,
    70,
    56,
    57,
    97
  ]],
  ["bmp", [66, 77]]
], Ou = ({ type: e, data: t }, r) => {
  if (e !== void 0) return e;
  const n = Ta(t), i = ArrayBuffer.isView(n) ? new Uint8Array(n.buffer, n.byteOffset, n.byteLength) : new Uint8Array(n), o = Pu.find(([, u]) => u.every((a, c) => i[c] === a));
  if (o === void 0) throw new Error(`${r}: type isn't given, and data isn't a PNG, JPEG, GIF or BMP file to read it from. Give its type`);
  return o[0];
}, Aa = (e, t) => ({
  data: Ta(e.data),
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
}), ii = (e, t, r) => {
  const n = Ou(e, r);
  return le({ type: n }, Aa(le(le({}, e), {}, { transformation: t }), `${oa(e.data)}.${n}`));
}, Nu = ({ id: e, author: t, date: r }, n) => new re({
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
}), Lu = class extends ne {
  constructor(e) {
    var t;
    const r = e.type === "svg" ? le(le({ type: e.type }, Aa(e, `${oa(e.data)}.svg`)), {}, { fallback: ii(e.fallback, e.transformation, "ImageRun fallback") }) : ii(e, e.transformation, "ImageRun"), n = new Cu(r, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline,
      solidFill: e.solidFill,
      crop: e.crop,
      link: e.link,
      decorative: e.decorative
    }), i = new ft(e.run), o = (t = e.insertion) !== null && t !== void 0 ? t : e.deletion, u = e.insertion ? "w:ins" : e.deletion ? "w:del" : "w:r";
    if (super(u), G(this, "imageData", void 0), o) {
      this.root.push(new Le({
        id: o.id,
        author: o.author,
        date: o.date
      }));
      const a = new re({
        name: "w:r",
        children: [i, n]
      });
      this.addChildElement(e.insertion && e.deletion ? Nu(e.deletion, a) : a);
    } else
      this.root.push(i), this.root.push(n);
    this.imageData = r;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, Fu = 32767, Du = 780, Bu = [
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
], Mu = (e) => e <= Fu ? Bu.reduce(({ rest: t, text: r }, [n, i]) => ({
  rest: t % n,
  text: r + i.repeat(Math.floor(t / n))
}), {
  rest: e,
  text: ""
}).text : void 0, Uu = (e) => e === 0 ? "" : e <= Du ? String.fromCharCode(65 + (e - 1) % 26).repeat(Math.ceil(e / 26)) : void 0, Wu = (e) => {
  var t;
  return `${e}${e % 100 >= 11 && e % 100 <= 13 ? "th" : (t = [
    "th",
    "st",
    "nd",
    "rd"
  ][e % 10]) !== null && t !== void 0 ? t : "th"}`;
}, Rn = (e) => {
  const t = e.charAt(0) !== e.charAt(0).toUpperCase(), r = (n) => (i) => {
    var o;
    return t ? (o = n(i)) === null || o === void 0 ? void 0 : o.toLowerCase() : n(i);
  };
  switch (e.toLowerCase()) {
    case "arabic":
      return String;
    case "roman":
      return r(Mu);
    case "alphabetic":
      return r(Uu);
    case "ordinal":
      return (n) => n > 0 ? Wu(n) : void 0;
    case "arabicdash":
      return (n) => `- ${n} -`;
    default:
      return;
  }
}, Ra = /* @__PURE__ */ new Set([
  "mergeformat",
  "charformat",
  "mergeformatinet"
]), Ca = /* @__PURE__ */ new Set([
  "upper",
  "lower",
  "firstcap",
  "caps"
]), ju = (e) => /^[#0,]*[#0][#0,]*$/.test(e), zu = (e, t) => {
  const r = [...t].filter((o) => o === "0").length, n = r + [...t].filter((o) => o === "#").length, i = String(e).padStart(r, "0");
  if (!(i.length < n || r === 0 && e === 0))
    return t.includes(",") ? i.replace(/\B(?=(\d{3})+$)/g, ",") : i;
}, Hu = (e, t) => {
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
}, $u = (e) => {
  var t;
  const r = new RegExp("^\\s*(PAGEREF|NUMPAGES|SECTIONPAGES)\\b(.*)$", "is").exec(e), n = r?.[1].toUpperCase() === "PAGEREF" ? new RegExp('^\\s*("?)([^\\s"\\\\]+)\\1(.*)$', "s").exec(r[2]) : void 0;
  if (!r || r[1].toUpperCase() === "PAGEREF" && !n) return;
  const i = (t = (n ? n[3] : r[2]).match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  let o, u;
  const a = [];
  let c = !1, h = !0;
  for (let v = 0; v < i.length; v++) {
    const g = i[v], m = () => {
      var b;
      return (g.length > 2 ? g.slice(2) : (b = i[++v]) !== null && b !== void 0 ? b : "").replace(/^"(.*)"$/, "$1");
    };
    if (/^\\p$/i.test(g)) c = !0;
    else if (g.startsWith("\\#")) {
      var f;
      const b = m();
      h && (h = u === void 0 && ju(b)), (f = u) !== null && f !== void 0 || (u = b);
    } else if (g.startsWith("\\*")) {
      const b = m(), x = b.toLowerCase();
      if (Ca.has(x)) a.push(x);
      else if (b !== "" && !Ra.has(x)) {
        var d;
        h && (h = o === void 0 && Rn(b) !== void 0), (d = o) !== null && d !== void 0 || (o = b);
      }
    }
  }
  const _ = le(le(le(le({}, o === void 0 ? {} : { numberFormat: o }), u === void 0 ? {} : { picture: u }), a.length === 0 ? {} : { capitals: a[0] }), {}, { written: h && a.length <= 1 && a[0] !== "caps" && (o === void 0 || u === void 0) });
  return le(n ? {
    type: "pageReference",
    bookmark: n[2],
    relative: c
  } : {
    type: "pageCount",
    scope: r[1].toUpperCase() === "NUMPAGES" ? "document" : "section"
  }, _);
}, Gu = (e) => new RegExp("^\\s*TOC\\b.*\\\\s\\b", "is").test(e), Ia = (e, { enclosing: t, within: r, inTextBox: n }, { estimate: i, sectionPageCount: o, blank: u, relativeTo: a }) => {
  const c = $u(e);
  if (c === void 0) return;
  const { bookmarks: h, pageCount: f, bookmarkPageNumbers: d } = i, { numberFormat: _, picture: v, capitals: g, written: m } = c, b = _ !== void 0 || v !== void 0, x = (T) => T === void 0 ? void 0 : v === void 0 ? Rn(_ ?? "arabic")(T) : zu(T, v), y = c.type === "pageReference" && c.relative && r === "counted" && !n ? a?.(c.bookmark) : void 0;
  let k;
  return m ? c.type === "pageCount" ? k = x(c.scope === "document" ? f : o) : t.some(Gu) ? k = void 0 : b ? k = x(d?.get(c.bookmark)) : k = c.relative ? y : h.get(c.bookmark) : k = void 0, k === void 0 ? u ? "" : void 0 : Hu(k, g);
}, qu = (e, t) => e === "mc:Fallback" || t === "fallback" ? "fallback" : e === "w:del" || e === "w:moveFrom" ? "deleted" : t, Kt = (e, t, r, n, i = "counted", o = !1) => {
  for (let h = 0; h < t.length; h++) {
    const f = t[h], d = e.nameOf(f);
    if (d === void 0) continue;
    const _ = r[r.length - 1];
    if (d === "w:fldChar") {
      const v = e.attributeOf(f, "w:fldCharType");
      v === "begin" ? r.push({
        begin: f,
        instruction: "",
        inResult: !1
      }) : v === "separate" && _ ? (e.writeClean(_.begin, _.instruction), _.inResult = !0, _.result = n.resultOf(_.instruction, {
        within: i,
        enclosing: r.slice(0, -1).map((g) => g.instruction),
        inTextBox: o
      }), _.result !== void 0 && (t.splice(h + 1, 0, e.textElement(_.result)), h++)) : v === "end" && r.pop();
    } else if (d === "w:instrText" && _ && !_.inResult) _.instruction += e.textOf(f);
    else if ((d === "w:t" || d === "w:tab" || d === "w:br" || d === "w:cr") && _?.result !== void 0)
      t.splice(h, 1), h--;
    else if (d === "w:fldSimple") {
      const v = n.resultOf(String(e.attributeOf(f, "w:instr")), {
        within: i,
        enclosing: r.map((g) => g.instruction),
        inTextBox: o
      });
      if (v === void 0) {
        var u;
        Kt(e, (u = e.contentOf(f)) !== null && u !== void 0 ? u : [], [], n, i, o);
      } else e.setSimpleFieldResult(f, v);
    } else {
      var a;
      if (d === "w:p") {
        var c;
        (c = n.beforeParagraph) === null || c === void 0 || c.call(n, f);
      }
      Kt(e, (a = e.contentOf(f)) !== null && a !== void 0 ? a : [], r, n, qu(d, i), o || d === "w:txbxContent"), d === "w:p" && n.afterParagraph(f);
    }
  }
}, Pa = (e, t) => t.flatMap((r) => {
  var n;
  const i = e.nameOf(r);
  return i === void 0 ? [] : i === "w:sectPr" ? [r] : Pa(e, (n = e.contentOf(r)) !== null && n !== void 0 ? n : []);
}), Vu = (e, t) => {
  var r;
  return ((r = e.contentOf(t)) !== null && r !== void 0 ? r : []).some((n) => {
    var i;
    return e.nameOf(n) === "w:pPr" && ((i = e.contentOf(n)) !== null && i !== void 0 ? i : []).some((o) => e.nameOf(o) === "w:sectPr");
  });
}, Xu = (e, t, r) => {
  const n = Pa(e, [t]).reduce((i, o) => {
    var u, a;
    const c = ((u = e.contentOf(o)) !== null && u !== void 0 ? u : []).flatMap((h) => {
      const f = e.nameOf(h);
      return f === "w:headerReference" || f === "w:footerReference" ? [[`${f} ${String(e.attributeOf(h, "w:type"))}`, String(e.attributeOf(h, "r:id"))]] : [];
    });
    return [...i, new Map([...(a = i[i.length - 1]) !== null && a !== void 0 ? a : [], ...c])];
  }, []).reduce((i, o, u) => {
    for (const c of o.values()) {
      var a;
      i.set(c, [...(a = i.get(c)) !== null && a !== void 0 ? a : [], r[u]]);
    }
    return i;
  }, /* @__PURE__ */ new Map());
  return new Map([...n].flatMap(([i, [o, ...u]]) => o !== void 0 && u.every((a) => a === o) ? [[i, o]] : []));
}, Ku = (e, t, r, { blank: n }) => {
  const { sectionPageCounts: i = [], relativePositions: o } = r;
  let u = 0;
  const a = /* @__PURE__ */ new Map(), c = (h) => {
    var f, d;
    const _ = (f = a.get(h)) !== null && f !== void 0 ? f : 0;
    return a.set(h, _ + 1), o == null || (d = o.get(h)) === null || d === void 0 ? void 0 : d[_];
  };
  return Kt(e, [t], [], {
    resultOf: (h, f) => Ia(h, f, {
      estimate: r,
      sectionPageCount: i[u],
      blank: n,
      relativeTo: c
    }),
    afterParagraph: (h) => {
      u += Vu(e, h) ? 1 : 0;
    }
  }), Xu(e, t, i);
}, Zu = (e, t, r, { blank: n, sectionPageCount: i, notes: o = !1 }) => {
  const u = (a) => {
    const c = r.bookmarks.get(a);
    return c === void 0 ? void 0 : `on page ${c}`;
  };
  Kt(e, [t], [], {
    resultOf: (a, c) => Ia(a, c, le({
      estimate: r,
      sectionPageCount: i,
      blank: n
    }, o ? { relativeTo: u } : {})),
    afterParagraph: () => {
    }
  });
}, Yu = (e, t, { beforeParagraph: r, resultOf: n }) => Kt(e, [t], [], {
  resultOf: (i, { within: o }) => n(i, o),
  beforeParagraph: r,
  afterParagraph: () => {
  }
}), Oa = class extends ne {
  constructor(e = {}) {
    super("w:instrText"), G(this, "properties", void 0), this.properties = e, this.root.push(new ct({ space: ut.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((n) => `${n.styleName},${n.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, Na = class extends ne {
  constructor() {
    super("w:sdtContent");
  }
}, La = (e) => e === void 0 ? ta() : Wt(e), Cn = /* @__PURE__ */ new WeakMap(), Ju = (e, t) => {
  Cn.set(e, t);
}, Qu = class {
  constructor() {
    G(this, "ids", []);
  }
  get(e) {
    var t, r;
    return (r = (t = this.ids)[e]) !== null && r !== void 0 || (t[e] = aa()), this.ids[e];
  }
}, Xe = (e) => typeof e == "object" && e !== null ? Object.keys(e)[0] : void 0, Ke = (e) => {
  const t = Xe(e), r = t === void 0 ? void 0 : e[t];
  return Array.isArray(r) ? r : r === void 0 ? [] : [r];
}, je = (e, t) => Ke(e).find((r) => Xe(r) === t), Be = (e, t) => {
  var r;
  return (r = je(e, "_attr")) === null || r === void 0 || (r = r._attr) === null || r === void 0 ? void 0 : r[t];
}, In = (e, t) => {
  const r = Be(e, t);
  return r === void 0 ? void 0 : Number(r);
}, ec = /* @__PURE__ */ new Set([
  "w:tbl",
  "w:tr",
  "w:tc",
  "w:sdt",
  "w:sdtContent",
  "w:customXml"
]), Fa = (e) => e.flatMap((t) => {
  const r = Xe(t);
  return r === "w:p" || Cn.has(t) ? [t] : r !== void 0 && ec.has(r) ? Fa(Ke(t)) : [];
}), tc = /* @__PURE__ */ new Set([
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
]), rc = (e) => {
  switch (Xe(e)) {
    case "w:t":
      return Ke(e).filter((t) => typeof t == "string").join("");
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
}, nc = (e) => {
  const t = [], r = (n) => {
    const i = Xe(n);
    if (i !== void 0 && tc.has(i)) return Ke(n).map(r).join("");
    if (i === "w:fldChar") {
      const o = Be(n, "w:fldCharType");
      return o === "begin" ? t.push(!1) : o === "separate" ? t[t.length - 1] = !0 : t.pop(), "";
    }
    return t.every(Boolean) ? rc(n) : "";
  };
  return Ke(e).map(r).join("");
}, Da = (e) => {
  const t = Xe(e);
  return t === "w:bookmarkStart" ? [{
    start: !0,
    id: Be(e, "w:id"),
    name: Be(e, "w:name")
  }] : t === "w:bookmarkEnd" ? [{
    start: !1,
    id: Be(e, "w:id")
  }] : t === void 0 || t === "_attr" ? [] : Ke(e).flatMap(Da);
}, ic = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.map((r) => {
    const n = Da(r), i = /* @__PURE__ */ new Set([...t.values(), ...n.flatMap((o) => o.start ? [o.name] : [])]);
    for (const o of n) o.start ? t.set(o.id, o.name) : t.delete(o.id);
    return i;
  });
}, ac = (e, t) => {
  const r = t ? ic(e) : [];
  return e.map((n, i) => {
    var o;
    const u = je(n, "w:pPr");
    return {
      element: n,
      styleId: Be(je(u, "w:pStyle"), "w:val"),
      outlineLevel: In(je(u, "w:outlineLvl"), "w:val"),
      text: nc(n),
      bookmarks: (o = r[i]) !== null && o !== void 0 ? o : /* @__PURE__ */ new Set()
    };
  });
}, Ba = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 || (t = t.Styles) === null || t === void 0 ? void 0 : t.prepForXml(e);
  return new Map(Ke(r).filter((n) => Xe(n) === "w:style" && ["paragraph", void 0].includes(Be(n, "w:type"))).map((n) => [Be(n, "w:styleId"), {
    name: Be(je(n, "w:name"), "w:val"),
    basedOn: Be(je(n, "w:basedOn"), "w:val"),
    outlineLevel: In(je(je(n, "w:pPr"), "w:outlineLvl"), "w:val")
  }]));
}, Ma = (e) => {
  const t = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(e);
  return t ? [Number(t[1]), Number(t[2])] : void 0;
}, cn = (e, [t, r]) => e >= t && e <= r, Pn = (e, t) => {
  var r, n;
  if (e === void 0) return;
  const i = /^heading ?([1-9])$/i.exec((r = (n = t.get(e)) === null || n === void 0 ? void 0 : n.name) !== null && r !== void 0 ? r : e);
  return i ? Number(i[1]) : void 0;
}, Ua = (e, t, r = 0) => {
  var n;
  if (e === void 0 || r > t.size) return;
  const i = t.get(e), o = Pn(e, t);
  return (n = i?.outlineLevel) !== null && n !== void 0 ? n : o === void 0 ? Ua(i?.basedOn, t, r + 1) : o - 1;
}, oc = (e) => {
  const t = Ba(e);
  return (r) => {
    const n = je(r, "w:pPr"), i = Be(je(n, "w:pStyle"), "w:val"), o = Pn(i, t), u = Wa({
      styleId: i,
      outlineLevel: In(je(n, "w:outlineLvl"), "w:val")
    }, t), a = u === void 0 || u >= 9 ? void 0 : u + 1;
    return o !== void 0 && (a === void 0 || a === o) ? o : a === void 0 ? void 0 : "unclear";
  };
}, Wa = (e, t) => {
  var r;
  return (r = e.outlineLevel) !== null && r !== void 0 ? r : Ua(e.styleId, t);
}, sc = (e, t, r) => {
  var n;
  const { entriesFromBookmark: i, headingStyleRange: o, stylesWithLevels: u = [], useAppliedParagraphOutlineLevel: a } = e;
  if (t.text.trim() === "" || i && !t.bookmarks.has(i)) return;
  const c = [t.styleId, t.styleId === void 0 || (n = r.get(t.styleId)) === null || n === void 0 ? void 0 : n.name].filter((g) => g !== void 0).map((g) => g.toLowerCase()), h = u.find((g) => c.includes(g.styleName.toLowerCase()));
  if (h) return h.level;
  const f = !!o || u.length > 0 || !!a || !!e.tcFieldIdentifier || !!e.tcFieldLevelRange || !!e.captionLabel || !!e.captionLabelIncludingNumbers, d = o ? Ma(o) : f ? void 0 : [1, 9], _ = Pn(t.styleId, r);
  if (d && _ !== void 0 && cn(_, d)) return _;
  const v = a ? Wa(t, r) : void 0;
  return v !== void 0 && cn(v + 1, d ?? [1, 9]) ? v + 1 : void 0;
}, lc = (e, t) => {
  const r = t.preserveTabInEntries ? e : e.replace(/\t/g, " ");
  return (t.preserveNewLineInEntries ? r.split(`
`) : [r.replace(/\n/g, " ")]).map((n, i) => new Te({
    break: i > 0 ? 1 : void 0,
    children: n.split("	").flatMap((o, u) => [...u > 0 ? [new rr()] : [], ...o === "" ? [] : [o]])
  }));
}, uc = ({ text: e, separator: t }) => t === "tab" ? [new Te(e), new Te({ children: [new rr()] })] : [new Te(`${e} `)], cc = (e, t) => {
  const r = 240 * (e - 1) + t + 240;
  return r <= 1920 ? Math.ceil(r / 240) * 240 : Math.round(r);
}, hc = (e, t) => {
  var r, n;
  return (r = (n = [...t].find(([, i]) => {
    var o;
    return ((o = i.name) === null || o === void 0 ? void 0 : o.toLowerCase()) === `toc ${e}`;
  })) === null || n === void 0 ? void 0 : n[0]) !== null && r !== void 0 ? r : `TOC${e}`;
}, fc = ({ properties: e, beginDirty: t, textWidth: r, tabLeader: n }, i, o, u) => {
  var a;
  const c = e.pageNumbersEntryLevelsRange ? (a = Ma(e.pageNumbersEntryLevelsRange)) !== null && a !== void 0 ? a : [1, 9] : void 0, h = new Na();
  return i.forEach((f, d) => {
    var _;
    const v = c === void 0 || !cn(f.level, c), g = [
      ...f.listNumber ? uc(f.listNumber) : [],
      ...lc(f.title, e),
      ...v ? [new Te({ children: [e.entryAndPageNumberSeparator || new rr()] }), new Zc(f.bookmark, { hyperlink: e.hyperlink })] : []
    ];
    h.addChildElement(new be({
      style: hc(f.level, o),
      tabStops: [...((_ = f.listNumber) === null || _ === void 0 ? void 0 : _.separator) === "tab" ? [{
        type: "left",
        position: cc(f.level, f.listNumber.width)
      }] : [], {
        type: "right",
        position: r,
        leader: n
      }],
      children: [...d === 0 ? [new Me({ children: [
        La(t),
        new Oa(e),
        vt()
      ] })] : [], ...e.hyperlink ? [new Ln({
        anchor: f.bookmark,
        children: g
      })] : g]
    }));
  }), h.addChildElement(new be({ children: [new Me({ children: [wt()] })] })), h.prepForXml(u);
}, dc = (e, t, r, n) => {
  const i = Ke(e), o = i.findIndex((u) => Xe(u) === "w:pPr") + 1;
  e["w:p"] = [
    ...i.slice(0, o),
    new Ga(t, r).prepForXml(n),
    ...i.slice(o),
    new qa(r).prepForXml(n)
  ];
}, pc = (e, t, r, n) => {
  const i = Fa(Ke(e)), o = i.flatMap((f) => {
    const d = Cn.get(f);
    return d ? [[f, d]] : [];
  });
  if (o.length === 0) return;
  const u = Ba(t), a = o.some(([, { properties: f }]) => !!f.entriesFromBookmark), c = ac(i.filter((f) => Xe(f) === "w:p"), a).map((f) => ({
    paragraph: f,
    levels: o.map(([, { properties: d }]) => sc(d, f, u))
  })).filter(({ levels: f }) => f.some((d) => d !== void 0)).map((f, d) => le(le({}, f), {}, { id: r.get(d) }));
  for (const { paragraph: f, id: d } of c) dc(f.element, `_Toc${d}`, d, t);
  const h = c.length > 0 ? n?.(e) : void 0;
  o.forEach(([f, d], _) => {
    const v = c.flatMap(({ paragraph: g, levels: m, id: b }) => {
      const x = m[_], y = h?.get(`_Toc${b}`);
      return x === void 0 ? [] : [le({
        title: g.text,
        level: x,
        bookmark: `_Toc${b}`
      }, y ? { listNumber: y } : {})];
    });
    v.length !== 0 && (f["w:sdt"] = Ke(f).map((g) => Xe(g) === "w:sdtContent" ? fc(d, v, u, t) : g));
  });
}, mc = new RegExp("^\\p{L}[\\p{L}\\p{N}_]*$", "u"), vc = (e) => {
  var t, r;
  let n, i = !1, o, u = !1, a = !1;
  for (let d = 0; d < e.length; d++) {
    var c, h;
    const _ = e[d], v = (c = e[d + 1]) !== null && c !== void 0 ? c : "";
    let g;
    if (d === 0 && !_.startsWith("\\")) g = { type: "bookmark" };
    else if (_ === "\\c" || _ === "\\n") g = { type: _ === "\\c" ? "repeat" : "next" };
    else if ((_ === "\\r" || _ === "\\s") && /^\d+$/.test(v))
      d++, g = _ === "\\r" ? {
        type: "reset",
        to: Number(v)
      } : {
        type: "heading",
        level: Number(v)
      };
    else if (_ === "\\h") i = !0;
    else if (_ === "\\#" && d + 1 < e.length)
      d++, a = !0;
    else if (_ === "\\*" && d + 1 < e.length) {
      const m = e[++d];
      if (Ca.has(m.toLowerCase())) u = !0;
      else if (!Ra.has(m.toLowerCase())) {
        if (o !== void 0) return;
        o = m;
      }
    } else return;
    if (g && n) return;
    n = (h = g) !== null && h !== void 0 ? h : n;
  }
  if (n?.type === "bookmark" && e.length > 1) return;
  const f = !a && !(u && o !== void 0 && o.toLowerCase() !== "arabic");
  return {
    step: (t = n) !== null && t !== void 0 ? t : { type: "next" },
    hidden: i && o === void 0,
    format: f ? (r = o) !== null && r !== void 0 ? r : "ARABIC" : ""
  };
}, On = (e) => {
  var t;
  const r = new RegExp("^\\s*SEQ\\b(.*)$", "is").exec(e);
  if (!r) return;
  const [n, ...i] = (t = r[1].match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  if (n === void 0) return {};
  const o = n.replace(/^"(.*)"$/, "$1");
  return mc.test(o) ? {
    identifier: o,
    sequence: vc(i)
  } : { identifier: o };
}, wc = (e) => On(e) !== void 0, hn = (e) => typeof e != "object" || e === null ? [] : Array.isArray(e) ? e.flatMap(hn) : Object.entries(e).flatMap(([t, r]) => [...(t === "w:instrText" && Array.isArray(r) ? r : t === "_attr" ? [r["w:instr"]] : []).flatMap((n) => {
  const i = typeof n == "string" ? On(n) : void 0;
  return i?.identifier === void 0 ? [] : [i.identifier.toLowerCase()];
}), ...hn(r)]), gc = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 ? void 0 : t.Comments;
  if (!r) return /* @__PURE__ */ new Set();
  const n = {
    View: r,
    Relationships: r.Relationships
  };
  return new Set(hn(r.prepForXml(le(le({}, e), {}, {
    viewWrapper: n,
    stack: []
  }))));
}, yc = (e) => {
  const t = oc(e), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = [];
  let o = -1, u = -1, a;
  const c = (h, f) => {
    var d;
    const _ = Math.max(-1, ...i.slice(1, f + 1).filter((m) => m !== void 0)), v = ((d = n.get(h)) !== null && d !== void 0 ? d : []).filter((m) => m.paragraph >= _), g = v.every(({ step: m }) => m?.type === "next" || m?.type === "heading" && m.level === f);
    return o > _ || !g ? void 0 : v.length + 1;
  };
  return {
    startParagraph: (h) => {
      u++;
      const f = t(h);
      f === "unclear" ? o = u : f !== void 0 && (i[f] = u);
    },
    numberOf: (h, f) => {
      var d, _, v;
      const { identifier: g, sequence: m } = On(h);
      if (g === void 0 || f === "fallback") return;
      (d = a) !== null && d !== void 0 || (a = gc(e));
      const b = g.toLowerCase();
      if (m?.step.type === "bookmark" && f === "counted" && !a.has(b)) return;
      const x = r.has(b) ? r.get(b) : 0, y = a.has(b) || f === "deleted" ? void 0 : m?.step, k = y?.type === "reset" ? y.to : y?.type === "repeat" ? x : y?.type === "heading" ? c(b, y.level) : y?.type === "next" && x !== void 0 ? x + 1 : void 0;
      return r.set(b, k), n.set(b, [...(_ = n.get(b)) !== null && _ !== void 0 ? _ : [], le({ paragraph: u }, k === void 0 ? {} : { step: y })]), k === void 0 || m === void 0 ? void 0 : m.hidden ? "" : (v = Rn(m.format)) === null || v === void 0 ? void 0 : v(k);
    }
  };
}, Hr = (e) => {
  const t = typeof e == "object" && e !== null && !Array.isArray(e) ? Object.keys(e)[0] : void 0;
  return t === "_attr" ? void 0 : t;
}, ai = (e) => ({ "w:t": [{ _attr: { "xml:space": "preserve" } }, e] }), Pr = {
  nameOf: Hr,
  contentOf: (e) => {
    const t = e[Hr(e)];
    return Array.isArray(t) ? t : void 0;
  },
  attributeOf: (e, t) => {
    var r;
    const n = e[Hr(e)], i = Array.isArray(n) ? n.find((o) => typeof o == "object" && o !== null && "_attr" in o) : n;
    return i == null || (r = i._attr) === null || r === void 0 ? void 0 : r[t];
  },
  textOf: (e) => Pr.contentOf(e).filter((t) => typeof t == "string").join(""),
  textElement: ai,
  writeClean: (e) => {
    if (zs(e)) {
      const t = e["w:fldChar"]._attr;
      e["w:fldChar"] = { _attr: Object.fromEntries(Object.entries(t).filter(([r]) => r !== "w:dirty")) };
    }
  },
  setSimpleFieldResult: (e, t) => {
    const r = e["w:fldSimple"];
    e["w:fldSimple"] = [...(Array.isArray(r) ? r : [r]).filter((n) => typeof n == "object" && n !== null && "_attr" in n), { "w:r": [ai(t)] }];
  }
}, ja = /* @__PURE__ */ new WeakMap(), bc = (e, t) => {
  const { startParagraph: r, numberOf: n } = yc(t);
  Yu(Pr, e, {
    beforeParagraph: (i) => r(i),
    resultOf: (i, o) => wc(i) ? n(i, o) : void 0
  });
}, _c = (e, t, r) => {
  const n = r(e, t), i = Ku(Pr, e, n, { blank: !1 });
  t.file && ja.set(t.file, {
    estimate: n,
    partPageCounts: i
  });
}, tr = (e, t, r) => {
  const n = t.file && ja.get(t.file);
  if (!e || !n) return;
  const i = r === void 0 ? void 0 : n.partPageCounts.get(`rId${r}`), o = "w:footnotes" in e || "w:endnotes" in e;
  Zu(Pr, e, n.estimate, {
    blank: !1,
    sectionPageCount: i,
    notes: o
  });
}, xc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Ce = class za extends ne {
  constructor() {
    super("Relationships"), this.root.push(new xc({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(t, r, n, i) {
    this.root.push(_u(`rId${t}`, r, n, i));
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
    const r = new za();
    return r.root.push(...t.root.slice(1)), r;
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, Sc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, Ec = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, oi = class extends ne {
  constructor({ id: e, initials: t, author: r, date: n = /* @__PURE__ */ new Date(), children: i }, o) {
    super("w:comment"), G(this, "paraId", void 0), this.paraId = o, this.root.push(new Sc({
      id: e,
      initials: t,
      author: r,
      date: n.toISOString()
    }));
    for (const u of i) this.root.push(u);
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
      const i = r[n];
      if (i && typeof i == "object" && "w:p" in i) {
        const o = i["w:p"];
        Array.isArray(o) && o.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, kc = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), Tc = class extends ne {
  constructor({ children: e }) {
    super("w:comments"), G(this, "relationships", void 0), G(this, "threadData", void 0), G(this, "commentIdsData", void 0), G(this, "isEmpty", void 0), this.isEmpty = e.length === 0, this.root.push(new Ec({
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
      const n = new Map(e.map((i) => [i.id, kc(i.id)]));
      for (const i of e) this.root.push(new oi(i, n.get(i.id)));
      t && (this.threadData = e.map((i) => ({
        paraId: n.get(i.id),
        parentParaId: i.parentId !== void 0 ? n.get(i.parentId) : void 0,
        done: i.resolved
      }))), r && (this.commentIdsData = e.map((i) => {
        var o;
        return {
          paraId: n.get(i.id),
          durableId: (o = i.durableId) !== null && o !== void 0 ? o : n.get(i.id)
        };
      }));
    } else for (const n of e) this.root.push(new oi(n));
    this.relationships = new Ce();
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
}, Ac = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Rc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, Cc = class extends ne {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new Rc({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, Ic = class extends ne {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new Ac({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new Cc(t));
  }
}, Pc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      paraId: "w16cid:paraId",
      durableId: "w16cid:durableId"
    });
  }
}, Oc = class extends ne {
  constructor(e) {
    super("w16cid:commentId"), this.root.push(new Pc({
      paraId: e.paraId,
      durableId: e.durableId
    }));
  }
}, Nc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:mc": "xmlns:mc",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Lc = class extends ne {
  constructor(e) {
    super("w16cid:commentsIds"), this.root.push(new Nc({
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "w16cid"
    }));
    for (const t of e) this.root.push(new Oc(t));
  }
}, Fc = class extends Xi {
  constructor() {
    super("w:endnoteRef");
  }
}, rr = class extends Xi {
  constructor() {
    super("w:tab");
  }
}, wr = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, fn = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, mt = {
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
}, Dc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, Bc = class extends ne {
  constructor(e) {
    super("w:ptab"), this.root.push(new Dc({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, Mc = class extends ne {
  constructor() {
    super("w:pageBreakBefore");
  }
}, At = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, Uc = ({ after: e, before: t, line: r, lineRule: n, beforeAutoSpacing: i, afterAutoSpacing: o }) => new re({
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
      value: i
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: o
    }
  }
}), xt = {
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
}, zt = (e) => new re({
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
}, Et = {
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
}, Wc = ({ type: e, position: t, leader: r }) => new re({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    pos: {
      key: "w:pos",
      value: qe(t)
    },
    leader: {
      key: "w:leader",
      value: r
    }
  }
}), jc = (e) => new re({
  name: "w:tabs",
  children: e.map((t) => Wc(t))
}), fr = class extends ne {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new zc(t)), this.root.push(new Hc(e));
  }
}, zc = class extends ne {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Ne({ val: e }));
  }
}, Hc = class extends ne {
  constructor(e) {
    super("w:numId"), this.root.push(new Ne({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, Nn = class extends ne {
  constructor(...e) {
    super(...e), G(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, $c = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, Or = class extends ne {
  /**
  * @param children - Inline content of the hyperlink
  * @param relationshipId - Id of the external relationship, without the rId prefix
  * @param anchor - Bookmark name or external URL fragment
  * @param externalLink - The full address of an external hyperlink, so the relationship id is kept alongside its anchor
  */
  constructor(e, t, r, n) {
    super("w:hyperlink"), G(this, "linkId", void 0), G(this, "drawingLink", void 0), this.linkId = t, this.drawingLink = r && n !== void 0 ? new _a(n) : void 0;
    const i = new $c({
      history: 1,
      anchor: r || void 0,
      id: !r || n !== void 0 ? `rId${this.linkId}` : void 0
    });
    this.root.push(i), e.forEach((o) => {
      this.root.push(o);
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
    return this.drawingLink ? (this.drawingLink.addRelationship(e), this.drawingLink.createClick(t)) : ba(this.linkId, t);
  }
}, Ln = class extends Or {
  constructor(e) {
    super(e.children, An(), e.anchor);
  }
}, Gc = class extends ne {
  constructor(e) {
    super("w:externalHyperlink"), G(this, "options", void 0), this.options = e;
  }
}, qc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, Vc = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { id: "w:id" });
  }
}, Ha = class $a {
  constructor(t) {
    G(this, "start", void 0), G(this, "children", void 0), G(this, "end", void 0);
    const r = aa();
    this.start = new Ga(t.id, r), this.children = t.children, this.end = new qa(r);
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
}, Ga = class extends ne {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new qc({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, qa = class extends ne {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new Vc({ id: e });
    this.root.push(t);
  }
}, Xc = (e) => new re({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Kc = class extends ne {
  constructor(e, t = {}) {
    super("w:instrText"), this.root.push(new ct({ space: ut.PRESERVE }));
    let r = `PAGEREF ${e}`;
    t.hyperlink && (r = `${r} \\h`), t.useRelativePosition && (r = `${r} \\p`), this.root.push(r);
  }
}, Zc = class extends Me {
  constructor(e, t = {}) {
    super({ children: [
      ta(),
      new Kc(e, t),
      vt(),
      wt()
    ] });
  }
}, Yc = 255, Jc = (e) => {
  const t = e.indexOf("#"), r = e.length - t - 1;
  return t > 0 && r > 0 && r <= Yc ? {
    target: e.slice(0, t),
    anchor: e.slice(t + 1)
  } : { target: e };
}, Er = (e, t, r) => r === void 0 ? `${e}-${t}` : `${e}-restart ${r}`, dr = ({ id: e, fontKey: t, subsetted: r }, n) => new re({
  name: n,
  attributes: le({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t.toUpperCase()}}`
  } } : {}),
  children: [...r ? [new ce("w:subsetted", r)] : []]
}), Qc = ({ name: e, altName: t, panose1: r, charset: n, family: i, notTrueType: o, pitch: u, sig: a, embedRegular: c, embedBold: h, embedItalic: f, embedBoldItalic: d }) => new re({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [Ft("w:altName", t)] : [],
    ...r ? [Ft("w:panose1", r)] : [],
    ...n ? [Ft("w:charset", n)] : [],
    Ft("w:family", i),
    ...o ? [new ce("w:notTrueType", o)] : [],
    Ft("w:pitch", u),
    ...a ? [new re({
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
    ...c ? [dr(c, "w:embedRegular")] : [],
    ...h ? [dr(h, "w:embedBold")] : [],
    ...f ? [dr(f, "w:embedItalic")] : [],
    ...d ? [dr(d, "w:embedBoldItalic")] : []
  ]
}), eh = ({ name: e, characterSet: t, embedRegular: r, embedBold: n, embedItalic: i, embedBoldItalic: o }) => Qc({
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
  embedItalic: i,
  embedBoldItalic: o
}), th = (e) => new re({
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
  children: e.map(eh)
}), rh = [
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
    G(this, "options", void 0), G(this, "fontTable", void 0), G(this, "relationships", void 0), G(
      this,
      /** @deprecated Use `files`, which has the file and key of each face a font embeds, not only the regular face's key */
      "fontOptionsWithKey",
      []
    ), G(
      this,
      /** The files of the faces the fonts embed, in order: the Nth is `fonts/font<N>.odttf`, with the relationship `rId<N>` */
      "files",
      []
    ), this.options = e;
    const t = e.map((r) => rh.flatMap(({ option: n, element: i, bold: o, italic: u }) => {
      const a = r[n];
      return a ? [{
        element: i,
        file: {
          name: r.name,
          data: a,
          bold: o,
          italic: u,
          fontKey: sa()
        }
      }] : [];
    }));
    this.files = t.flatMap((r) => r.map(({ file: n }) => n)), this.fontOptionsWithKey = e.map((r, n) => le(le({}, r), {}, { fontKey: t[n][0].file.fontKey })), this.fontTable = th(e.map((r, n) => le({
      name: r.name,
      characterSet: r.characterSet
    }, Object.fromEntries(t[n].map(({ element: i, file: o }) => [i, {
      id: `rId${this.files.indexOf(o) + 1}`,
      fontKey: o.fontKey
    }]))))), this.relationships = new Ce();
    for (let r = 0; r < this.files.length; r++) this.relationships.addRelationship(r + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${r + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, nh = () => new re({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), ih = (e) => {
  var t, r;
  return new re({
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
}, $r = /* @__PURE__ */ new WeakMap(), ah = It(), oh = {
  left: "right",
  right: "left"
}, Rt = class extends it {
  /**
  * Creates paragraph properties.
  *
  * @param options - The paragraph formatting to emit
  * @param config - Controls how the element is assembled; see {@link IParagraphPropertiesConfig}
  */
  constructor(e, { implicitListParagraphStyle: t = !0, inListOrder: r = !0 } = {}) {
    if (super("w:pPr", e?.includeIfEmpty), G(this, "numbering", void 0), G(
      this,
      /** The paragraph's `w:numPr`, which is written again with its list's id each time the paragraph is written */
      "numberProperties",
      void 0
    ), !e) return this;
    if (e.heading && this.push(zt(e.heading)), t && (e.bullet && this.push(zt("ListParagraph")), e.numbering && !e.numbering.custom && !e.style && !e.heading && this.push(zt("ListParagraph"))), e.style && this.push(zt(e.style)), e.keepNext !== void 0 && this.push(new ce("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ce("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new Mc()), e.frame && this.push(ih(e.frame)), e.widowControl !== void 0 && this.push(new ce("w:widowControl", e.widowControl)), e.bullet && this.push(new fr(1, e.bullet.level)), e.numbering) {
      const { reference: i, instance: o, level: u, restart: a } = e.numbering, c = typeof i == "string" ? i : i.reference, h = new fr(Er(c, o ?? 0), u);
      this.numbering = {
        reference: c,
        level: u,
        instance: o,
        restartedListId: a && r && o === void 0 ? ah() : void 0,
        definition: typeof i == "string" ? void 0 : i
      }, this.numberProperties = h, this.push(h);
    } else e.numbering === !1 && this.push(new fr(0, 0));
    e.border && this.push(new Bs(e.border)), e.thematicBreak && this.push(new Ms()), e.shading && this.push(Ir(e.shading)), e.wordWrap && this.push(nh()), e.overflowPunctuation && this.push(new ce("w:overflowPunct", e.overflowPunctuation));
    const n = [
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
    n.length > 0 && this.push(jc(n)), e.bidirectional !== void 0 && this.push(new ce("w:bidi", e.bidirectional)), e.spacing && this.push(Uc(e.spacing)), e.indent && this.push(Us(e.indent)), e.contextualSpacing !== void 0 && this.push(new ce("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Ki(e.bidirectional && oh[e.alignment] || e.alignment)), e.outlineLevel !== void 0 && this.push(Xc(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ce("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ce("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Sl(e.run)), e.revision && this.push(new si(e.revision));
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
    const t = this.root.findIndex((r) => r instanceof si);
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
  * This method works out which list instance a numbered paragraph is in, from where it is in its part when it
  * leaves out `instance`, and creates the concrete numbering instance for it before the properties are converted to XML.
  *
  * @param context - The XML context containing document and file information
  * @returns The prepared XML object, or undefined if the component should be ignored
  */
  prepForXml(e) {
    var t;
    if (this.numbering) {
      var r, n;
      const { reference: u, level: a, instance: c = 0, definition: h } = this.numbering, f = this.numbering.instance === void 0 ? (r = this.numbering.restartedListId) !== null && r !== void 0 ? r : (n = $r.get(e)) === null || n === void 0 ? void 0 : n.get(u) : void 0;
      e.viewWrapper instanceof Va || e.file.Numbering.createConcreteNumberingInstance(u, c, h, f);
      const d = new fr(Er(u, c, f), a);
      this.root.splice(this.root.indexOf(this.numberProperties), 1, d), this.numberProperties = d;
    }
    const i = super.prepForXml(e);
    if (((t = this.numbering) === null || t === void 0 ? void 0 : t.restartedListId) !== void 0) {
      var o;
      $r.set(e, new Map([...(o = $r.get(e)) !== null && o !== void 0 ? o : [], [this.numbering.reference, this.numbering.restartedListId]]));
    }
    return i;
  }
}, si = class extends ne {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Rt(le(le({}, e), {}, { includeIfEmpty: !0 }), { inListOrder: !1 }));
  }
}, be = class extends Nn {
  constructor(e) {
    if (super("w:p"), G(this, "properties", void 0), G(this, "alignment", void 0), typeof e == "string")
      return this.alignment = {}, this.properties = new Rt({}), this.root.push(this.properties), this.root.push(new Te(e)), this;
    if (this.alignment = {
      alignment: e.alignment,
      bidirectional: e.bidirectional
    }, this.properties = new Rt(e), this.root.push(this.properties), e.text && this.root.push(new Te(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Ha) {
        this.root.push(...t.writtenAs);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (Ar(t) === "w:externalHyperlink") {
      const r = this.root.indexOf(t), { options: n } = t, { target: i, anchor: o } = Jc(n.link), u = new Or(n.children, An(), o, n.link);
      e.viewWrapper.Relationships.addRelationship(u.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", i, ya.EXTERNAL), this.root[r] = u;
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
  /**
  * The paragraph's alignment and direction, which a table gives the empty paragraphs of the cells it adds below a
  * cell merged down rows (`rowSpan`), so that the merged cell is aligned as one.
  *
  * @internal
  */
  get Alignment() {
    return this.alignment;
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}, sh = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, lh = le(le({}, sh), {}, { BOTH: "both" }), Ht = lh, Xa = (e) => new re({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), uh = ({ space: e, count: t, separate: r, equalWidth: n, children: i }) => new re({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : Ie(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : xe(t)
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
  children: !n && i ? i : void 0
}), ch = ({ type: e, linePitch: t, charSpace: r }) => new re({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: xe(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? xe(r) : void 0
    }
  }
}), Tt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, li = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, Gr = (e, t) => new re({
  name: e,
  attributes: {
    type: {
      key: "w:type",
      value: t.type || Tt.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${t.id}`
    }
  }
}), hh = ({ countBy: e, start: t, restart: r, distance: n }) => new re({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : xe(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : xe(t)
    },
    restart: {
      key: "w:restart",
      value: r
    },
    distance: {
      key: "w:distance",
      value: n === void 0 ? void 0 : Ie(n)
    }
  }
}), Ka = ({ name: e, position: t, numberFormat: r, start: n, restart: i }) => new re({
  name: e,
  children: [
    ...t === void 0 ? [] : [new re({
      name: "w:pos",
      attributes: { val: {
        key: "w:val",
        value: t
      } }
    })],
    ...r ? [new re({
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
    ...n === void 0 ? [] : [new re({
      name: "w:numStart",
      attributes: { val: {
        key: "w:val",
        value: xe(n)
      } }
    })],
    ...i === void 0 ? [] : [new re({
      name: "w:numRestart",
      attributes: { val: {
        key: "w:val",
        value: i
      } }
    })]
  ]
}), fh = (e) => Ka(le({ name: "w:footnotePr" }, e)), dh = (e) => Ka(le({ name: "w:endnotePr" }, e)), ui = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, ph = class extends it {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new ui({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new ui({})), e.pageBorderTop && this.root.push(ke("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(ke("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(ke("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(ke("w:right", e.pageBorderRight));
  }
}, mh = (e, t, r, n, i, o, u) => new re({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: qe(e)
    },
    right: {
      key: "w:right",
      value: Ie(t)
    },
    bottom: {
      key: "w:bottom",
      value: qe(r)
    },
    left: {
      key: "w:left",
      value: Ie(n)
    },
    header: {
      key: "w:header",
      value: Ie(i)
    },
    footer: {
      key: "w:footer",
      value: Ie(o)
    },
    gutter: {
      key: "w:gutter",
      value: Ie(u)
    }
  }
}), vh = {
  /** En dash separator (–), written as `enDash` */
  EN_DASH: "endash"
}, wh = ({ start: e, formatType: t, separator: r, chapterHeadingLevel: n }) => new re({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : xe(e)
    },
    formatType: {
      key: "w:fmt",
      value: t
    },
    separator: {
      key: "w:chapSep",
      value: r === vh.EN_DASH ? "enDash" : r
    },
    chapterHeadingLevel: {
      key: "w:chapStyle",
      value: n === void 0 ? void 0 : xe(n)
    }
  }
}), kr = {
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
}, gh = ({ width: e, height: t, orientation: r, code: n }) => {
  const i = Ie(e), o = Ie(t);
  return new re({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === kr.LANDSCAPE ? o : i
      },
      height: {
        key: "w:h",
        value: r === kr.LANDSCAPE ? i : o
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
}, yh = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, bh = class extends ne {
  constructor(e) {
    super("w:textDirection"), this.root.push(new yh({ val: e }));
  }
}, _h = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, xh = (e) => new re({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), He = {
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
}, gr = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: kr.PORTRAIT
}, dn = class Za extends ne {
  constructor({ page: { size: { width: t = gr.WIDTH, height: r = gr.HEIGHT, orientation: n = gr.ORIENTATION, code: i } = {}, margin: { top: o = He.TOP, right: u = He.RIGHT, bottom: a = He.BOTTOM, left: c = He.LEFT, header: h = He.HEADER, footer: f = He.FOOTER, gutter: d = He.GUTTER } = {}, pageNumbers: _ = {}, borders: v, textDirection: g } = {}, grid: { linePitch: m = 360, charSpace: b, type: x } = {}, headerWrapperGroup: y = {}, footerWrapperGroup: k = {}, lineNumbers: T, titlePage: R, verticalAlign: I, column: N, type: U, footnoteProperties: F, endnoteProperties: Z, revision: ae } = {}) {
    super("w:sectPr"), G(
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
    ), this.availableTextWidth = Za.calculateAvailableTextWidth({
      pageWidth: n === kr.LANDSCAPE ? r : t,
      left: c,
      right: u,
      gutter: d,
      column: N
    }), this.addHeaderFooterGroup(li.HEADER, y), this.addHeaderFooterGroup(li.FOOTER, k), F && this.root.push(fh(F)), Z && this.root.push(dh(Z)), U && this.root.push(xh(U)), this.root.push(gh({
      width: t,
      height: r,
      orientation: n,
      code: i
    })), this.root.push(mh(o, u, a, c, h, f, d)), v && this.root.push(new ph(v)), T && this.root.push(hh(T)), this.root.push(wh(_)), N && this.root.push(uh(N)), I && this.root.push(Xa(I)), R !== void 0 && this.root.push(new ce("w:titlePg", R)), g && this.root.push(new bh(g)), this.root.push(ch({
      linePitch: m,
      charSpace: b,
      type: x
    })), ae && this.root.push(new Sh(ae));
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
  static calculateAvailableTextWidth({ pageWidth: t, left: r, right: n, gutter: i, column: o }) {
    var u, a;
    const c = st(t) - st(r) - st(n) - st(i), h = (u = o?.count) !== null && u !== void 0 ? u : 1;
    return h <= 1 ? c : (c - st((a = o?.space) !== null && a !== void 0 ? a : 720) * (h - 1)) / h;
  }
  addHeaderFooterGroup(t, r) {
    r.default && this.root.push(Gr(t, {
      type: Tt.DEFAULT,
      id: r.default.View.ReferenceId
    })), r.first && this.root.push(Gr(t, {
      type: Tt.FIRST,
      id: r.first.View.ReferenceId
    })), r.even && this.root.push(Gr(t, {
      type: Tt.EVEN,
      id: r.even.View.ReferenceId
    }));
  }
}, Sh = class extends ne {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new dn(e));
  }
}, Ya = class extends ne {
  constructor({ pageNumbers: e } = {}) {
    super("w:body"), G(this, "sections", []), G(
      this,
      /**
      * Section properties that were moved into a paragraph at the end of their section
      * by {@link addSection}, keyed by that paragraph. Used to find the section that
      * governs a given child of the body, and to write each section's properties into
      * its paragraph while the body is written.
      */
      "sectionParagraphs",
      /* @__PURE__ */ new Map()
    ), G(this, "headingBookmarkIds", new Qu()), G(this, "pageNumbers", void 0), this.pageNumbers = e;
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
      if (n instanceof dn) return n;
      const i = this.sectionParagraphs.get(n);
      if (i) return i;
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
    this.sections.push(new dn(e));
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
    var t;
    this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop()));
    for (const [i, o] of this.sectionParagraphs) i.addSectionProperties(o);
    let r;
    try {
      r = super.prepForXml(e);
    } finally {
      for (const [i, o] of this.sectionParagraphs) i.removeSectionProperties(o);
    }
    const n = (t = this.pageNumbers) === null || t === void 0 ? void 0 : t.listNumbers;
    return pc(r, e, this.headingBookmarkIds, n && ((i) => n(i, e))), this.pageNumbers && (bc(r, e), _c(r, e, this.pageNumbers)), r;
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
}, Zt = (e, { type: t = Oe.AUTO, size: r }) => {
  let n = r;
  return t === Oe.PERCENTAGE && typeof r == "number" && (n = Math.round(r * 50)), new re({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: Vi(n)
      }
    }
  });
}, yr = gr.WIDTH - He.LEFT - He.RIGHT - He.GUTTER, Ja = (e) => e.options.columnSpan || 1, Fn = (e, t) => {
  if (!e) return;
  const { type: r = Oe.AUTO, size: n } = e;
  if (r !== Oe.PERCENTAGE && r !== Oe.DXA) return;
  const i = typeof n == "number" ? r === Oe.PERCENTAGE ? n / 100 * t : n : n.endsWith("%") ? Number(n.slice(0, -1)) / 100 * t : st(n);
  return i > 0 ? i : void 0;
}, Eh = (e, t) => {
  var r;
  return (r = Fn(e, t)) !== null && r !== void 0 ? r : t;
}, kh = (e) => Math.max(0, ...e.map((t) => t.cells.reduce((r, n) => r + Ja(n), 0))), ci = ({ rows: e, width: t, availableWidth: r }) => {
  const n = kh(e);
  if (n === 0) return [];
  const i = Eh(t, r), o = Array.from({ length: n }, () => {
  }), u = [];
  for (const f of e) {
    let d = 0;
    for (const _ of f.cells) {
      const v = Ja(_), g = Fn(_.options.width, i);
      if (g !== void 0)
        if (v === 1) {
          var a, c;
          (c = o[a = d]) !== null && c !== void 0 || (o[a] = g);
        } else u.push({
          start: d,
          span: v,
          width: g
        });
      d += v;
    }
  }
  for (const { start: f, span: d, width: _ } of u) {
    const v = Array.from({ length: d }, (b, x) => f + x).filter((b) => b < n), g = v.filter((b) => o[b] === void 0), m = _ - v.reduce((b, x) => {
      var y;
      return b + ((y = o[x]) !== null && y !== void 0 ? y : 0);
    }, 0);
    if (g.length > 0 && m > 0) for (const b of g) o[b] = m / g.length;
  }
  const h = o.flatMap((f, d) => f === void 0 ? [d] : []);
  if (h.length > 0) {
    const f = i - o.reduce((_, v) => _ + (v ?? 0), 0), d = f > 0 ? f / h.length : i / n;
    for (const _ of h) o[_] = d;
  }
  return o.map((f) => Math.round(f));
}, Th = (e) => new re({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: Ie(e)
  } } : void 0
}), br = class extends ne {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(Th(r));
    t && this.root.push(new Rh(t));
  }
}, Ah = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { id: "w:id" });
  }
}, Rh = class extends ne {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new Ah({ id: e.id })), this.root.push(new br(e.columnWidths));
  }
}, Ch = class extends ne {
  constructor(e) {
    super("w:ins"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Ih = class extends ne {
  constructor(e) {
    super("w:del"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Ph = class extends ne {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Oh = class extends ne {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Nh = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Lh = class extends ne {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new Nh(e));
  }
}, Qa = ({ marginUnitType: e = Oe.DXA, top: t, left: r, bottom: n, right: i }) => [
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
    size: i
  }
].filter((o) => o.size !== void 0).map(({ name: o, size: u }) => Zt(o, {
  type: e,
  size: u
})), Fh = (e) => {
  const t = Qa(e);
  if (t.length !== 0)
    return new re({
      name: "w:tblCellMar",
      children: t
    });
}, Dh = (e) => {
  const t = Qa(e);
  if (t.length !== 0)
    return new re({
      name: "w:tcMar",
      children: t
    });
}, Bh = class extends it {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(ke("w:top", e.top)), e.start && this.root.push(ke("w:start", e.start)), e.left && this.root.push(ke("w:left", e.left)), e.bottom && this.root.push(ke("w:bottom", e.bottom)), e.end && this.root.push(ke("w:end", e.end)), e.right && this.root.push(ke("w:right", e.right)), e.diagonalDown && this.root.push(ke("w:tl2br", e.diagonalDown)), e.diagonalUp && this.root.push(ke("w:tr2bl", e.diagonalUp));
  }
}, Mh = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, Uh = class extends ne {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new Mh({ val: xe(e) }));
  }
}, eo = {
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
}, Wh = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, hi = class extends ne {
  constructor(e) {
    super("w:vMerge"), this.root.push(new Wh({ val: e }));
  }
}, jh = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, zh = class extends ne {
  constructor(e) {
    super("w:textDirection"), this.root.push(new jh({ val: e }));
  }
}, to = class extends it {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), G(this, "hasWidth", void 0), G(this, "hasColumnWidth", !1), this.hasWidth = e.width !== void 0, e.width && this.root.push(Zt("w:tcW", e.width)), e.columnSpan && this.root.push(new Uh(e.columnSpan)), e.verticalMerge ? this.root.push(new hi(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new hi(eo.RESTART)), e.borders && this.root.push(new Bh(e.borders)), e.shading && this.root.push(Ir(e.shading)), e.margins) {
      const t = Dh(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new zh(e.textDirection)), e.verticalAlign && this.root.push(Xa(e.verticalAlign)), e.insertion && this.root.push(new Ph(e.insertion)), e.deletion && this.root.push(new Oh(e.deletion)), e.cellMerge && this.root.push(new Lh(e.cellMerge)), e.revision && this.root.push(new Hh(e.revision));
  }
  /**
  * Gives a cell without a width of its own the width of the table's columns it spans, in twips.
  *
  * @internal
  */
  setColumnWidth(e) {
    this.hasWidth || (this.root.splice(0, this.hasColumnWidth ? 1 : 0, Zt("w:tcW", {
      size: e,
      type: Oe.DXA
    })), this.hasColumnWidth = !0);
  }
}, Hh = class extends ne {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new to(le(le({}, e), {}, { includeIfEmpty: !0 })));
  }
}, pn = class extends ne {
  constructor(e) {
    super("w:tc"), G(
      this,
      /**
      * The options the cell was created with.
      *
      * Its borders and shading are declared with hex colors, as they were before they took colors of the document's
      * theme, so that code reading them still compiles. A cell given a theme color has it here as it was given.
      */
      "options",
      void 0
    ), G(this, "properties", void 0), this.options = e, this.properties = new to(e), this.root.push(this.properties);
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
    return Ar(this.root[this.root.length - 1]) !== "w:p" && this.root.push(new be({})), super.prepForXml(e);
  }
}, mn = (e, t) => t ? new ce(e) : new nt(e, "off"), St = {
  style: De.NONE,
  size: 0,
  color: "auto"
}, $h = {
  style: De.SINGLE,
  size: 4,
  color: "auto"
}, ro = class extends it {
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
    for (const [n, i] of r) {
      const o = i ?? (t ? $h : void 0);
      o && this.root.push(ke(n, o));
    }
  }
};
G(ro, "NONE", {
  top: St,
  bottom: St,
  left: St,
  right: St,
  insideHorizontal: St,
  insideVertical: St
});
var Gh = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: n, absoluteVerticalPosition: i, relativeVerticalPosition: o, bottomFromText: u, topFromText: a, leftFromText: c, rightFromText: h }) => new re({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: c === void 0 ? void 0 : Ie(c)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: h === void 0 ? void 0 : Ie(h)
    },
    topFromText: {
      key: "w:topFromText",
      value: a === void 0 ? void 0 : Ie(a)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: u === void 0 ? void 0 : Ie(u)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : qe(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: i === void 0 ? void 0 : qe(i)
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
      value: o
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: t
    }
  }
}), qr = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, qh = (e) => new re({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), Vh = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, no = ({ type: e = Vh.DXA, value: t }) => new re({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: Vi(t)
    }
  }
}), Xh = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: n, noHBand: i, noVBand: o }) => new re({
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
      value: i
    },
    noVBand: {
      key: "w:noVBand",
      value: o
    }
  }
}), Kh = (e) => new re({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Dn = class extends it {
  constructor(e) {
    var t;
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new nt("w:tblStyle", e.style)), e.float && this.root.push(Gh(e.float)), !((t = e.float) === null || t === void 0) && t.overlap && this.root.push(Kh(e.float.overlap)), e.visuallyRightToLeft !== void 0 && this.root.push(mn("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(Zt("w:tblW", e.width)), e.alignment && this.root.push(Ki(e.alignment)), e.cellSpacing && this.root.push(no(e.cellSpacing)), e.indent && this.root.push(Zt("w:tblInd", e.indent)), e.borders && this.root.push(new ro(e.borders, { fillMissingSides: !e.style })), e.shading && this.root.push(Ir(e.shading)), e.layout && this.root.push(qh(e.layout)), e.cellMargin) {
      const r = Fh(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(Xh(e.tableLook)), e.revision && this.root.push(new Zh(e.revision));
  }
}, Zh = class extends ne {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Dn(le(le({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Yh = (e, t) => new re({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: Ie(e)
    },
    rule: {
      key: "w:hRule",
      value: t
    }
  }
}), io = class extends it {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(mn("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(mn("w:tblHeader", e.tableHeader)), e.height && this.root.push(Yh(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(no(e.cellSpacing)), e.insertion && this.root.push(new Ch(e.insertion)), e.deletion && this.root.push(new Ih(e.deletion)), e.revision && this.root.push(new Jh(e.revision));
  }
}, Jh = class extends ne {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Le({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new io(le(le({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Tr = (e, t) => {
  const r = e[t];
  return Array.isArray(r) ? r : [];
}, Gt = (e) => Object.keys(e)[0], Qh = (e, t) => {
  const r = Tr(e, "w:p"), n = r.find((a) => Gt(a) === "w:pPr");
  if (!n) return { "w:p": [{ "w:pPr": [t] }, ...r] };
  const i = Tr(n, "w:pPr");
  if (i.some((a) => Gt(a) === "w:keepNext")) return e;
  const o = i.filter((a) => Gt(a) === "w:pStyle").length, u = { "w:pPr": [
    ...i.slice(0, o),
    t,
    ...i.slice(o)
  ] };
  return { "w:p": r.map((a) => a === n ? u : a) };
}, ao = class extends ne {
  constructor(e) {
    super("w:tr"), G(this, "options", void 0), this.options = e, this.root.push(new io(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    if (this.cells.length === 0) return;
    const t = super.prepForXml(e);
    if (!t || this.options.keepNext === void 0) return t;
    const r = new ce("w:keepNext", this.options.keepNext).prepForXml(e);
    return { "w:tr": Tr(t, "w:tr").map((n) => Gt(n) === "w:tc" ? { "w:tc": Tr(n, "w:tc").map((i) => Gt(i) === "w:p" ? Qh(i, r) : i) } : n) };
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => Ar(e) === "w:tc");
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
      const i = this.root[n];
      n += 1, r += i && i.options.columnSpan || 1;
    }
    return n - 1;
  }
}, ef = class oo extends Nn {
  constructor({ rows: t, width: r, columnWidths: n, columnWidthsRevision: i, margins: o, indent: u, float: a, layout: c, style: h, borders: f, alignment: d, visuallyRightToLeft: _, tableLook: v, cellSpacing: g, revision: m }) {
    super("w:tbl"), G(this, "rows", void 0), G(this, "width", void 0), G(this, "columnWidths", void 0), G(this, "columnWidthsRevision", void 0), G(
      this,
      /**
      * Grid column widths in twips: the explicit `columnWidths`, or the widths derived
      * from the table and cell widths (re-resolved against the actual page or parent
      * cell every time the table is serialized).
      */
      "resolvedColumnWidths",
      void 0
    ), this.rows = t, this.width = r ?? { size: 100 }, this.columnWidths = n, this.columnWidthsRevision = i, t.forEach((b, x) => {
      if (x === t.length - 1) return;
      let y = 0;
      b.cells.forEach((k) => {
        if (k.options.rowSpan && k.options.rowSpan > 1) {
          const T = k.options.children[k.options.children.length - 1], R = new pn({
            rowSpan: k.options.rowSpan - 1,
            columnSpan: k.options.columnSpan,
            width: k.options.width,
            borders: k.options.borders,
            shading: k.options.shading,
            margins: k.options.margins,
            textDirection: k.options.textDirection,
            verticalAlign: k.options.verticalAlign,
            children: T instanceof be ? [new be(T.Alignment)] : [],
            verticalMerge: eo.CONTINUE
          });
          t[x + 1].addCellToColumnIndex(R, y);
        }
        y += k.options.columnSpan || 1;
      });
    }), this.setCellWidths(yr), this.resolvedColumnWidths = n ?? ci({
      rows: t,
      width: this.width,
      availableWidth: yr
    }), this.root.push(new Dn({
      borders: h ? f : f ?? {},
      width: this.width,
      indent: u,
      float: a,
      layout: c,
      style: h,
      alignment: d,
      cellMargin: o,
      visuallyRightToLeft: _,
      tableLook: v,
      cellSpacing: g,
      revision: m
    })), this.root.push(new br(this.resolvedColumnWidths, i));
    for (const b of t) this.root.push(b);
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
    const { cells: n } = t, i = n.indexOf(r);
    if (i === -1) return;
    const o = n.slice(0, i).reduce((a, c) => a + (c.options.columnSpan || 1), 0), u = this.resolvedColumnWidths.slice(o, o + (r.options.columnSpan || 1));
    return u.length === 0 ? void 0 : u.reduce((a, c) => a + c, 0);
  }
  /**
  * Resolves derived grid column widths against the width actually available to the
  * table (the section's text width, or the parent cell for nested tables) before
  * serializing.
  */
  prepForXml(t) {
    if (this.setCellWidths(this.resolveAvailableWidth(t)), this.columnWidths === void 0) {
      this.resolvedColumnWidths = ci({
        rows: this.rows,
        width: this.width,
        availableWidth: this.resolveAvailableWidth(t)
      });
      const r = this.root.findIndex((n) => n instanceof br);
      this.root[r] = new br(this.resolvedColumnWidths, this.columnWidthsRevision);
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
    const n = this.columnWidths.reduce((u, a) => u + a, 0), i = (r = Fn(this.width, t)) !== null && r !== void 0 ? r : 0, o = n > 0 && i > n ? i / n : 1;
    for (const u of this.rows) {
      let a = 0;
      for (const c of u.cells) {
        const h = c.options.columnSpan || 1, f = this.columnWidths.slice(a, a + h), d = Math.round(f.reduce((_, v) => _ + v, 0) * o);
        f.length === h && d > 0 && c.setColumnWidth(d), a += h;
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
    var r, n, i;
    const { stack: o } = t, u = o[o.length - 1], a = o[o.length - 2], c = o[o.length - 3];
    if (u instanceof pn && a instanceof ao && c instanceof oo) {
      const _ = c.getCellWidth(a, u);
      if (_ !== void 0) return _;
    }
    const h = o.findIndex((_) => _ instanceof Ya), f = (r = t.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 ? void 0 : r.View.Body, d = h >= 0 ? o[h].getSectionPropertiesFor((n = o[h + 1]) !== null && n !== void 0 ? n : this) : f?.getSectionPropertiesFor();
    return (i = d?.AvailableTextWidth) !== null && i !== void 0 ? i : yr;
  }
}, tf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, rf = class extends ne {
  constructor() {
    super("Properties"), this.root.push(new tf({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, nf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Je = (e, t) => new re({
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
}), Re = (e, t) => new re({
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
}), af = class extends ne {
  /**
  * @param options.macros - Whether the document has VBA macros, which makes its main part a macro-enabled document
  * and adds the VBA project (word/vbaProject.bin)
  */
  constructor({ macros: e = !1 } = {}) {
    super("Types"), this.root.push(new nf({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(Je("image/png", "png")), this.root.push(Je("image/jpeg", "jpeg")), this.root.push(Je("image/jpeg", "jpg")), this.root.push(Je("image/bmp", "bmp")), this.root.push(Je("image/gif", "gif")), this.root.push(Je("image/svg+xml", "svg")), this.root.push(Je("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Je("application/xml", "xml")), this.root.push(Je("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Re(e ? "application/vnd.ms-word.document.macroEnabled.main+xml" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Re("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")), this.root.push(Re("application/vnd.openxmlformats-officedocument.theme+xml", "/word/theme/theme1.xml")), e && this.root.push(Re("application/vnd.ms-office.vbaProject", "/word/vbaProject.bin"));
  }
  /**
  * Registers the comments part in the content types.
  */
  addComments() {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers the commentsIds part in the content types.
  */
  addCommentsIds() {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml", "/word/commentsIds.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(e) {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  /**
  * Registers a part by its name, such as a chart or an embedded workbook that a drawing adds to the package.
  *
  * @param contentType - The part's content type
  * @param partName - The part's name, from the root of the package, such as "/word/charts/chart1.xml"
  */
  addOverride(e, t) {
    this.root.push(Re(e, t));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(e) {
    this.root.push(Re("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, fi = {
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
    super(le({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, fi[r]])))), G(this, "xmlKeys", le({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(fi).map((r) => [r, `xmlns:${r}`]))));
  }
}, of = class extends ne {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new Nr([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new pt("dc:title", e.title)), e.subject && this.root.push(new pt("dc:subject", e.subject)), e.creator && this.root.push(new pt("dc:creator", e.creator)), e.keywords && this.root.push(new pt("cp:keywords", e.keywords)), e.description && this.root.push(new pt("dc:description", e.description)), e.lastModifiedBy && this.root.push(new pt("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new pt("cp:revision", String(e.revision))), this.root.push(new di("dcterms:created")), this.root.push(new di("dcterms:modified"));
  }
}, sf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { type: "xsi:type" });
  }
}, di = class extends ne {
  constructor(e) {
    super(e), this.root.push(new sf({ type: "dcterms:W3CDTF" })), this.root.push(Es(/* @__PURE__ */ new Date()));
  }
}, lf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, uf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, cf = class extends ne {
  constructor(e, t) {
    super("property"), this.root.push(new uf({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new hf(t.value));
  }
}, hf = class extends ne {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, ff = class extends ne {
  constructor(e) {
    super("Properties"), G(this, "nextId", void 0), G(this, "properties", []), this.root.push(new lf({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.root.splice(1, this.root.length - 1, ...this.properties), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new cf(this.nextId++, e));
  }
}, df = (e) => new re({
  name: "ds:datastoreItem",
  attributes: {
    itemId: {
      key: "ds:itemID",
      value: e
    },
    namespace: {
      key: "xmlns:ds",
      value: "http://schemas.openxmlformats.org/officeDocument/2006/customXml"
    }
  },
  children: [new re({
    name: "ds:schemaRefs",
    children: [new re({
      name: "ds:schemaRef",
      attributes: { uri: {
        key: "ds:uri",
        value: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography"
      } }
    })]
  })]
}), pf = {
  new: "wne:eventDocNew",
  open: "wne:eventDocOpen",
  close: "wne:eventDocClose",
  sync: "wne:eventDocSync",
  xmlAfterInsert: "wne:eventDocXmlAfterInsert",
  xmlBeforeDelete: "wne:eventDocXmlBeforeDelete",
  contentControlAfterAdd: "wne:eventDocContentControlAfterInsert",
  contentControlBeforeDelete: "wne:eventDocContentControlBeforeDelete",
  contentControlOnExit: "wne:eventDocContentControlOnExit",
  contentControlOnEnter: "wne:eventDocContentControlOnEnter",
  contentControlBeforeStoreUpdate: "wne:eventDocStoreUpdate",
  contentControlBeforeContentUpdate: "wne:eventDocContentControlContentUpdate",
  buildingBlockInsert: "wne:eventDocBuildingBlockAfterInsert"
}, mf = (e) => new re({
  name: "wne:vbaSuppData",
  attributes: { namespace: {
    key: "xmlns:wne",
    value: "http://schemas.microsoft.com/office/word/2006/wordml"
  } },
  children: [new re({
    name: "wne:docEvents",
    children: Object.entries(pf).filter(([t]) => e.includes(t)).map(([, t]) => new re({ name: t }))
  })]
}), vf = class extends ne {
  /**
  * @throws If a color isn't valid, or `color` is a theme color and `themeColor`, `themeShade` or `themeTint` is given
  */
  constructor({ color: e, themeColor: t, themeShade: r, themeTint: n }) {
    if (super("w:background"), typeof e == "object" && (t !== void 0 || r !== void 0 || n !== void 0)) throw new Error("Invalid background. Expected a theme color in color, or themeColor, themeShade and themeTint, not both");
    this.root.push(new En([
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
}, wf = class extends ne {
  constructor(e) {
    super("w:document"), G(this, "body", void 0), this.root.push(new Nr([
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
    ], "w14 w15 wp14")), this.body = new Ya({ pageNumbers: e.pageNumbers }), e.background && this.root.push(new vf(e.background)), this.root.push(this.body);
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
}, gf = class {
  constructor(e) {
    G(this, "document", void 0), G(this, "relationships", void 0), this.document = new wf(e), this.relationships = new Ce();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, yf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, so = class extends ne {
  constructor(e, t) {
    super("w:p"), G(this, "paragraph", void 0), G(this, "mark", void 0), this.paragraph = e, this.mark = t;
  }
  prepForXml(e) {
    const t = this.paragraph.prepForXml(e)["w:p"], r = Array.isArray(t) ? t : [], n = r.length > 0 && "w:pPr" in r[0] ? 1 : 0;
    return { "w:p": [
      ...r.slice(0, n),
      this.mark.prepForXml(e),
      ...r.slice(n)
    ] };
  }
}, bf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, _f = class extends Me {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new Fc());
  }
}, pi = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Vr = class extends ne {
  constructor(e) {
    super("w:endnote"), this.root.push(new bf({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new so(r, new _f()) : r);
  }
}, xf = class extends ne {
  constructor() {
    super("w:continuationSeparator");
  }
}, lo = class extends Me {
  constructor() {
    super({}), this.root.push(new xf());
  }
}, Sf = class extends ne {
  constructor() {
    super("w:separator");
  }
}, uo = class extends Me {
  constructor() {
    super({}), this.root.push(new Sf());
  }
}, Ef = class extends ne {
  constructor() {
    super("w:endnotes"), G(this, "ownNotes", /* @__PURE__ */ new Map()), G(this, "highestId", 0), this.root.push(new yf({
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
    const e = new Vr({
      id: -1,
      type: pi.SEPARATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: At.AUTO
        },
        children: [new uo()]
      })]
    });
    this.root.push(e);
    const t = new Vr({
      id: 0,
      type: pi.CONTINUATION_SEPARATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: At.AUTO
        },
        children: [new lo()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new Vr({
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
    const i = this.highestId + 1;
    return this.createEndnote(i, t.children), this.ownNotes.set(e, i), i;
  }
  /**
  * Formats the endnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, kf = class {
  constructor() {
    G(this, "endnotes", void 0), G(this, "relationships", void 0), this.endnotes = new Ef(), this.relationships = new Ce();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, Tf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, Af = class extends Hi {
  constructor(e, t) {
    super("w:ftr", t), G(this, "refId", void 0), this.refId = e, t || this.root.push(new Tf({
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
}, Rf = class {
  constructor(e, t, r) {
    G(this, "media", void 0), G(this, "footer", void 0), G(this, "relationships", void 0), this.media = e, this.footer = new Af(t, r), this.relationships = new Ce();
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
}, Cf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, If = class extends ne {
  constructor() {
    super("w:footnoteRef");
  }
}, Pf = class extends Me {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new If());
  }
}, mi = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, Xr = class extends ne {
  constructor(e) {
    super("w:footnote"), this.root.push(new Cf({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new so(r, new Pf()) : r);
  }
}, Of = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, Nf = class extends ne {
  constructor() {
    super("w:footnotes"), G(this, "ownNotes", /* @__PURE__ */ new Map()), G(this, "highestId", 0), this.root.push(new Of({
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
    const e = new Xr({
      id: -1,
      type: mi.SEPERATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: At.AUTO
        },
        children: [new uo()]
      })]
    });
    this.root.push(e);
    const t = new Xr({
      id: 0,
      type: mi.CONTINUATION_SEPERATOR,
      children: [new be({
        spacing: {
          after: 0,
          line: 240,
          lineRule: At.AUTO
        },
        children: [new lo()]
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
    const r = new Xr({
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
    const i = this.highestId + 1;
    return this.createFootNote(i, t.children), this.ownNotes.set(e, i), i;
  }
  /**
  * Formats the footnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return tr(t, e), t;
  }
}, Lf = class {
  constructor() {
    G(this, "footnotess", void 0), G(this, "relationships", void 0), this.footnotess = new Nf(), this.relationships = new Ce();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Ff = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, Df = class extends Hi {
  constructor(e, t) {
    super("w:hdr", t), G(this, "refId", void 0), this.refId = e, t || this.root.push(new Ff({
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
}, Bf = class {
  constructor(e, t, r) {
    G(this, "media", void 0), G(this, "header", void 0), G(this, "relationships", void 0), this.media = e, this.header = new Df(t, r), this.relationships = new Ce();
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
}, Mf = class {
  constructor() {
    G(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
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
}, Qe = {
  /** Bullet points. */
  BULLET: "bullet"
}, Uf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w:tentative"
    });
  }
}, Wf = class extends ne {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Ne({ val: e }));
  }
}, jf = class extends ne {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Ne({ val: e }));
  }
}, zf = (e) => {
  switch (e) {
    case Ee.CENTER:
      return "center";
    case Ee.END:
    case Ee.RIGHT:
      return "right";
    default:
      return "left";
  }
}, Hf = class extends ne {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Ne({ val: zf(e) }));
  }
}, $f = class extends ne {
  constructor(e) {
    super("w:suff"), this.root.push(new Ne({ val: e }));
  }
}, Gf = class extends ne {
  constructor() {
    super("w:isLgl");
  }
}, qf = class extends ne {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: n = Ee.START, start: i = 1, style: o, suffix: u, isLegalNumberingStyle: a }) {
    if (super("w:lvl"), G(this, "paragraphProperties", void 0), G(this, "runProperties", void 0), this.root.push(new $t("w:start", xe(i))), t && this.root.push(new Wf(t)), o?.style && this.root.push(zt(o.style)), a && this.root.push(new Gf()), u && this.root.push(new $f(u)), r && this.root.push(new jf(r)), this.root.push(new Hf(n)), this.paragraphProperties = new Rt(o && o.paragraph, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }), this.runProperties = new ft(o?.run && le(le({}, o.run), {}, {
      highlight: void 0,
      math: void 0,
      revision: void 0
    })), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Uf({
      ilvl: xe(e),
      tentative: 1
    }));
  }
}, Vf = class extends qf {
}, Xf = class extends ne {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Ne({ val: e }));
  }
}, Kf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, Kr = class extends ne {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(e, t) {
    super("w:abstractNum"), G(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    ), this.root.push(new Kf({
      abstractNumId: xe(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Xf("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new Vf(r));
  }
}, Zf = class extends ne {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Ne({ val: e }));
  }
}, Yf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { numId: "w:numId" });
  }
}, vi = class extends ne {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(e) {
    if (super("w:num"), G(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    ), G(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    ), G(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    ), G(
      this,
      /** For a list a paragraph restarts, the id of that restart, as {@link IConcreteNumberingOptions.restartedListId} describes. */
      "restartedListId",
      void 0
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.restartedListId = e.restartedListId, this.root.push(new Yf({ numId: xe(e.numId) })), this.root.push(new Zf(xe(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new Qf(t.num, t.start));
  }
}, Jf = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, Qf = class extends ne {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new Jf({ ilvl: e })), t !== void 0 && this.root.push(new td(t));
  }
}, ed = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, td = class extends ne {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new ed({ val: e }));
  }
}, rd = class extends ne {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), G(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), G(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), G(this, "referenceConfigMap", /* @__PURE__ */ new Map()), G(this, "abstractNumUniqueNumericId", ll()), G(this, "concreteNumUniqueNumericId", ul()), this.root.push(new Nr([
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
    const t = new Kr(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: Qe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Ue(0.5),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 1,
        format: Qe.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Ue(1),
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 2,
        format: Qe.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 3,
        format: Qe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 4,
        format: Qe.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 5,
        format: Qe.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 6,
        format: Qe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 7,
        format: Qe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: Ue(0.25)
        } } }
      },
      {
        level: 8,
        format: Qe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: Ue(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new vi({
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
      this.abstractNumberingMap.set(r.reference, new Kr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
  * @param restartedListId - For a list a paragraph starts again with `restart`, the id of that restart. The list is
  * then that restart's own, not the `instance`'s
  */
  createConcreteNumberingInstance(e, t, r, n) {
    var i;
    r && !this.abstractNumberingMap.has(r.reference) && (this.abstractNumberingMap.set(r.reference, new Kr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels));
    const o = this.abstractNumberingMap.get(e);
    if (!o) return;
    const u = Er(e, t, n);
    if (this.concreteNumberingMap.has(u)) return;
    const a = (i = this.referenceConfigMap.get(e)) !== null && i !== void 0 ? i : [{ level: 0 }], c = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: o.id,
      reference: e,
      instance: t,
      restartedListId: n,
      overrideLevels: a.map(({ level: h, start: f = 1 }) => ({
        num: h,
        start: xe(f)
      }))
    };
    this.concreteNumberingMap.set(u, new vi(c));
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
}, nd = class {
  /**
  * @param contentTypes - Where each part's content type is added
  * @param existingPaths - The paths under word/ of the parts the package already has, such as a template's charts,
  * which new parts don't take
  */
  constructor(e, t = /* @__PURE__ */ new Set()) {
    G(this, "contentTypes", void 0), G(this, "existingPaths", void 0), G(this, "paths", /* @__PURE__ */ new Map()), G(this, "folders", /* @__PURE__ */ new WeakMap()), this.contentTypes = e, this.existingPaths = t;
  }
  /**
  * Adds a part, and its content type, once.
  *
  * @returns The part's path under word/, such as "charts/chart1.xml"
  */
  add(e) {
    const t = this.paths.get(e);
    if (t !== void 0) return t;
    const { folder: r, name: n, extension: i, contentType: o } = e.options, u = /* @__PURE__ */ new Set([...this.existingPaths, ...this.paths.values()]);
    let a = 1;
    for (; u.has(`${r}/${n}${a}.${i}`); ) a++;
    const c = `${r}/${n}${a}.${i}`;
    return this.paths.set(e, c), this.contentTypes.addOverride(o, `/word/${c}`), c;
  }
  /**
  * Each part added, with its path under word/, in the order they were added.
  *
  * A part related as an OLE object is listed too, though the parts are typed as they were before a part could be:
  * `File`, whose type is public, has these parts, and the compiler only writes their content.
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
    const t = new Ce();
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
}, id = (e) => new re({
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
}), ad = class extends ne {
  constructor(e) {
    super("w:compat"), e.useSingleBorderforContiguousCells && this.root.push(new ce("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ce("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ce("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ce("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ce("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ce("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ce("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ce("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ce("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ce("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ce("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ce("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ce("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ce("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ce("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ce("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ce("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ce("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ce("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ce("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ce("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ce("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ce("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ce("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ce("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ce("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ce("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ce("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ce("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ce("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ce("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ce("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ce("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ce("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ce("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ce("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ce("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ce("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ce("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ce("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ce("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ce("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ce("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ce("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ce("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ce("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ce("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ce("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ce("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ce("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ce("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ce("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ce("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ce("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ce("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ce("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ce("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ce("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ce("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ce("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ce("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ce("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ce("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ce("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ce("w:cachedColBalance", e.cachedColumnBalance)), e.version && this.root.push(id(e.version));
  }
}, wi = 1e5, gi = 15, od = [
  57840,
  7439,
  52380,
  33984,
  4364,
  3600,
  61902,
  12606,
  6258,
  57657,
  54287,
  34041,
  10252,
  43370,
  20163
], sd = [
  [
    44796,
    19929,
    39858,
    10053,
    20106,
    40212,
    10761
  ],
  [
    31585,
    63170,
    64933,
    60267,
    50935,
    40399,
    11199
  ],
  [
    17763,
    35526,
    1453,
    2906,
    5812,
    11624,
    23248
  ],
  [
    885,
    1770,
    3540,
    7080,
    14160,
    28320,
    56640
  ],
  [
    55369,
    41139,
    20807,
    41614,
    21821,
    43642,
    17621
  ],
  [
    28485,
    56970,
    44341,
    19019,
    38038,
    14605,
    29210
  ],
  [
    60195,
    50791,
    40175,
    10751,
    21502,
    43004,
    24537
  ],
  [
    18387,
    36774,
    3949,
    7898,
    15796,
    31592,
    63184
  ],
  [
    47201,
    24803,
    49606,
    37805,
    14203,
    28406,
    56812
  ],
  [
    17824,
    35648,
    1697,
    3394,
    6788,
    13576,
    27152
  ],
  [
    43601,
    17539,
    35078,
    557,
    1114,
    2228,
    4456
  ],
  [
    30388,
    60776,
    51953,
    34243,
    7079,
    14158,
    28316
  ],
  [
    14128,
    28256,
    56512,
    43425,
    17251,
    34502,
    7597
  ],
  [
    13105,
    26210,
    52420,
    35241,
    883,
    1766,
    3532
  ],
  [
    4129,
    8258,
    16516,
    33032,
    4657,
    9314,
    18628
  ]
], yi = (e) => e >> 14 & 1 | e << 1 & 32767, ld = (e) => {
  const t = e.slice(0, gi).split("").map((i) => {
    const o = i.charCodeAt(0);
    return (o & 255) !== 0 ? o & 255 : o >> 8 & 255;
  }), r = t.reduce((i, o, u) => sd[gi - t.length + u].reduce((a, c, h) => o >> h & 1 ? a ^ c : a, i), od[t.length - 1]), n = (yi(t.reduceRight((i, o) => yi(i) ^ o, 0)) ^ t.length ^ 52811) & 65535;
  return [
    n & 255,
    n >> 8,
    r & 255,
    r >> 8
  ].map((i) => i.toString(16).toUpperCase().padStart(2, "0")).join("");
}, ud = (e, t, r) => {
  const n = [...ld(e)].flatMap((o) => [o.charCodeAt(0), 0]);
  let i = sn.default.sha256().update(t).update(n).digest();
  for (let o = 0; o < r; o++) i = sn.default.sha256().update(i).update([
    o & 255,
    o >> 8 & 255,
    o >> 16 & 255,
    o >>> 24 & 255
  ]).digest();
  return i;
}, cd = (e) => {
  var t;
  const r = new Uint8Array(e);
  return typeof ((t = globalThis.crypto) === null || t === void 0 ? void 0 : t.getRandomValues) == "function" ? (globalThis.crypto.getRandomValues(r), [...r]) : [...r].map(() => Math.floor(Math.random() * 256));
}, bi = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      edit: "w:edit",
      enforcement: "w:enforcement",
      cryptProviderType: "w:cryptProviderType",
      cryptAlgorithmClass: "w:cryptAlgorithmClass",
      cryptAlgorithmType: "w:cryptAlgorithmType",
      cryptAlgorithmSid: "w:cryptAlgorithmSid",
      cryptSpinCount: "w:cryptSpinCount",
      hash: "w:hash",
      salt: "w:salt"
    });
  }
}, _i = (e) => btoa(String.fromCharCode(...e)), hd = class extends ne {
  constructor({ type: e, password: t }) {
    if (super("w:documentProtection"), t === void 0 || t === "") {
      this.root.push(new bi({
        edit: e,
        enforcement: !0
      }));
      return;
    }
    const r = cd(16);
    this.root.push(new bi({
      edit: e,
      enforcement: !0,
      cryptProviderType: "rsaAES",
      cryptAlgorithmClass: "hash",
      cryptAlgorithmType: "typeAny",
      cryptAlgorithmSid: 12,
      cryptSpinCount: wi,
      hash: _i(ud(t, r, wi)),
      salt: _i(r)
    }));
  }
}, fd = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
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
}, dd = class extends ne {
  constructor(e) {
    var t, r, n, i, o, u, a, c, h;
    super("w:settings"), this.root.push(new fd({
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
    })), this.root.push(new ce("w:displayBackgroundShape", !0)), e.embedFonts !== void 0 && this.root.push(new ce("w:embedTrueTypeFonts", e.embedFonts)), e.trackRevisions !== void 0 && this.root.push(new ce("w:trackRevisions", e.trackRevisions)), e.protection !== void 0 && this.root.push(new hd(e.protection)), this.root.push(new $t("w:defaultTabStop", (t = e.defaultTabStop) !== null && t !== void 0 ? t : 720)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.autoHyphenation) !== void 0 && this.root.push(new ce("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((n = e.hyphenation) === null || n === void 0 ? void 0 : n.consecutiveHyphenLimit) !== void 0 && this.root.push(new $t("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((i = e.hyphenation) === null || i === void 0 ? void 0 : i.hyphenationZone) !== void 0 && this.root.push(new $t("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((o = e.hyphenation) === null || o === void 0 ? void 0 : o.doNotHyphenateCaps) !== void 0 && this.root.push(new ce("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), e.evenAndOddHeaders !== void 0 && this.root.push(new ce("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ce("w:updateFields", e.updateFields)), this.root.push(new ad(le(le({}, (u = e.compatibility) !== null && u !== void 0 ? u : {}), {}, { version: (a = (c = (h = e.compatibility) === null || h === void 0 ? void 0 : h.version) !== null && c !== void 0 ? c : e.compatibilityModeVersion) !== null && a !== void 0 ? a : 15 })));
  }
}, co = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { val: "w:val" });
  }
}, pd = class extends ne {
  constructor(e) {
    super("w:name"), this.root.push(new co({ val: e }));
  }
}, md = class extends ne {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new co({ val: xe(e) }));
  }
}, vd = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, Bn = class extends ne {
  constructor(e, t) {
    super("w:style"), this.root.push(new vd(e)), t.name && this.root.push(new pd(t.name)), t.basedOn && t.basedOn !== e.styleId && this.root.push(new nt("w:basedOn", t.basedOn)), t.next && this.root.push(new nt("w:next", t.next)), t.link && this.root.push(new nt("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new md(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new ce("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new ce("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new ce("w:qFormat", t.quickFormat));
  }
}, at = class extends Bn {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), G(this, "paragraphProperties", void 0), G(this, "runProperties", void 0), this.paragraphProperties = new Rt(e.paragraph, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }), this.runProperties = new ft(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, bt = class extends Bn {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, le({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), G(this, "runProperties", void 0), this.runProperties = new ft(e.run), this.root.push(this.runProperties);
  }
}, dt = class extends at {
  constructor(e) {
    super(le({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, wd = class extends dt {
  constructor(e) {
    super(le({
      id: "Title",
      name: "Title"
    }, e));
  }
}, gd = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, yd = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, bd = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, _d = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, xd = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, Sd = class extends dt {
  constructor(e) {
    super(le({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, Ed = class extends dt {
  constructor(e) {
    super(le({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, kd = class extends at {
  constructor(e) {
    super(le({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, Td = class extends at {
  constructor(e) {
    super(le({
      id: "Caption",
      name: "caption",
      basedOn: "Normal",
      next: "Normal",
      uiPriority: 35,
      semiHidden: !0,
      unhideWhenUsed: !0,
      quickFormat: !0,
      paragraph: { spacing: { after: 200 } },
      run: {
        italics: !0,
        color: { theme: "dark2" },
        size: 18
      }
    }, e));
  }
}, Ad = class extends at {
  constructor(e) {
    super(le({
      id: "Bibliography",
      name: "Bibliography",
      basedOn: "Normal",
      next: "Normal",
      uiPriority: 37,
      unhideWhenUsed: !0
    }, e));
  }
}, ho = /* @__PURE__ */ new WeakSet(), xi = (e) => ho.has(e), et = class extends at {
  /**
  * @param level - The level of the entries, 1 to 9
  * @param levelIndent - How much more each level is indented than the level above, in twips
  */
  constructor(e, t) {
    super({
      id: `TOC${e}`,
      name: `toc ${e}`,
      basedOn: "Normal",
      next: "Normal",
      uiPriority: 39,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: le({ spacing: { after: 100 } }, e > 1 ? { indent: { left: (e - 1) * t } } : {})
    });
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    return ho.add(t), t;
  }
}, Rd = class extends at {
  constructor(e) {
    super(le({
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
        lineRule: At.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Cd = class extends bt {
  constructor(e) {
    super(le({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Id = class extends bt {
  constructor(e) {
    super(le({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Pd = class extends at {
  constructor(e) {
    super(le({
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
        lineRule: At.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Od = class extends bt {
  constructor(e) {
    super(le({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Nd = class extends bt {
  constructor(e) {
    super(le({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Ld = class extends bt {
  constructor(e) {
    super(le({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: ua.SINGLE }
      }
    }, e));
  }
}, Fd = class extends bt {
  constructor(e) {
    super(le({
      id: "LineNumber",
      name: "line number",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0
    }, e));
  }
}, Dd = class extends Bn {
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
    }), this.root.push(new Dn({
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
}, qt = (e) => typeof e == "object" ? Object.keys(e)[0] : void 0, Mn = (e) => {
  var t;
  return (t = [e["w:style"]].flat().find((r) => r._attr)) === null || t === void 0 ? void 0 : t._attr;
}, Si = (e) => {
  var t;
  return (t = Mn(e)) === null || t === void 0 ? void 0 : t["w:styleId"];
}, Ei = (e) => {
  var t;
  const r = (t = [e["w:style"]].flat().find((n) => qt(n) === "w:name")) === null || t === void 0 || (t = t["w:name"]) === null || t === void 0 || (t = t._attr) === null || t === void 0 ? void 0 : t["w:val"];
  return r === void 0 ? void 0 : String(r).toLowerCase();
}, vn = (e) => {
  var t, r;
  return qt(e) === "w:style" && ((t = (r = Mn(e)) === null || r === void 0 ? void 0 : r["w:type"]) !== null && t !== void 0 ? t : "paragraph") === "paragraph";
}, Bd = (e) => {
  const t = vn(e) ? Mn(e) : void 0;
  return t?.["w:default"] !== void 0 && ![
    "0",
    "false",
    "off"
  ].includes(String(t["w:default"]));
}, Md = (e) => ({ "w:style": [e["w:style"]].flat().map((t) => t._attr ? { _attr: le(le({}, t._attr), {}, { "w:default": "1" }) } : t) }), Zr = class extends ne {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new at(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new bt(t));
  }
  /**
  * Writes the styles in the schema's order: the document defaults, the latent styles, then the styles. A style id
  * can only be used once, so a style replaces an earlier one with its id. That way external styles replace docx's
  * default styles, and paragraph and character styles replace the default and imported ones. docx's TOC 1 to TOC 9
  * styles are also replaced by a paragraph style with their name, such as a template's in another language, with an id
  * of its own. Of several document defaults, or several latent styles, the last is kept. Normal is marked as the
  * default paragraph style when no style is.
  */
  prepForXml(e) {
    const t = super.prepForXml(e), r = t["w:styles"];
    if (!Array.isArray(r)) return t;
    const n = (h) => r.filter((f) => qt(f) === h), i = r.map((h) => qt(h) === "w:style" ? Si(h) : void 0), o = r.filter((h, f) => ![
      "_attr",
      "w:docDefaults",
      "w:latentStyles"
    ].includes(qt(h)) && (i[f] === void 0 || i.lastIndexOf(i[f]) === f)), u = new Set(o.filter((h) => vn(h) && !xi(h)).map(Ei)), a = o.filter((h) => !xi(h) || !u.has(Ei(h))), c = a.some(Bd) ? a : a.map((h) => vn(h) && Si(h) === "Normal" ? Md(h) : h);
    return { "w:styles": [
      ...n("_attr"),
      ...n("w:docDefaults").slice(-1),
      ...n("w:latentStyles").slice(-1),
      ...c
    ] };
  }
}, Ud = class extends ne {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new Rt(e, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }));
  }
}, Wd = class extends ne {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new ft(e));
  }
}, jd = class extends ne {
  constructor(e) {
    super("w:docDefaults"), G(this, "runPropertiesDefaults", void 0), G(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new Wd(e.run), this.paragraphPropertiesDefaults = new Ud(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, zd = class {
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
    const t = Wi(e);
    let r;
    for (const i of t.elements || []) i.name === "w:styles" && (r = i);
    if (r === void 0) throw new Error("can not find styles element");
    const n = r.elements || [];
    return {
      initialStyles: new gs(r.attributes),
      importedStyles: n.map((i) => _n(i))
    };
  }
}, Hd = (e) => {
  var t;
  const r = (t = e.document) === null || t === void 0 || (t = t.run) === null || t === void 0 ? void 0 : t.size;
  return r === void 0 ? 200 : Math.round(typeof r == "number" ? r * 10 : st(r));
}, $d = (e) => ({
  tableOfContents1: new et(1, e),
  tableOfContents2: new et(2, e),
  tableOfContents3: new et(3, e),
  tableOfContents4: new et(4, e),
  tableOfContents5: new et(5, e),
  tableOfContents6: new et(6, e),
  tableOfContents7: new et(7, e),
  tableOfContents8: new et(8, e),
  tableOfContents9: new et(9, e)
}), fo = (e = {}) => {
  var t;
  return le(le({
    normal: new at({
      id: "Normal",
      name: "Normal",
      quickFormat: !0
    }),
    normalTable: new Dd(),
    document: new jd((t = e.document) !== null && t !== void 0 ? t : {}),
    title: new wd(le({ run: { size: 56 } }, e.title)),
    heading1: new gd(le({ run: {
      color: "2E74B5",
      size: 32
    } }, e.heading1)),
    heading2: new yd(le({ run: {
      color: "2E74B5",
      size: 26
    } }, e.heading2)),
    heading3: new bd(le({ run: {
      color: "1F4D78",
      size: 24
    } }, e.heading3)),
    heading4: new _d(le({ run: {
      color: "2E74B5",
      italics: !0
    } }, e.heading4)),
    heading5: new xd(le({ run: { color: "2E74B5" } }, e.heading5)),
    heading6: new Sd(le({ run: { color: "1F4D78" } }, e.heading6)),
    strong: new Ed(le({ run: { bold: !0 } }, e.strong)),
    listParagraph: new kd(e.listParagraph || {}),
    caption: new Td(e.caption || {}),
    bibliography: new Ad(e.bibliography || {})
  }, $d(Hd(e))), {}, {
    hyperlink: new Ld(e.hyperlink || {}),
    footnoteReference: new Cd(e.footnoteReference || {}),
    footnoteText: new Rd(e.footnoteText || {}),
    footnoteTextChar: new Id(e.footnoteTextChar || {}),
    endnoteReference: new Od(e.endnoteReference || {}),
    endnoteText: new Pd(e.endnoteText || {}),
    endnoteTextChar: new Nd(e.endnoteTextChar || {}),
    lineNumber: new Fd(e.lineNumber || {})
  });
}, ki = class {
  newInstance(e = {}) {
    return {
      initialStyles: new Nr([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: Object.values(fo(e))
    };
  }
}, po = {
  headings: {
    latin: "Calibri Light",
    panose: "020F0302020204030204"
  },
  body: {
    latin: "Calibri",
    panose: "020F0502020204030204"
  }
}, Gd = [
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
], Yr = (e, t, r) => new re({
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
}), qd = (e, t) => {
  const r = t[e], n = typeof r == "string" ? r : r?.latin;
  return n ?? po[e].latin;
}, Ti = (e, t) => {
  const r = t[e], { eastAsia: n = "", complexScript: i = "" } = typeof r == "object" ? r : {}, o = qd(e, t), u = po[e];
  return new re({
    name: e === "headings" ? "a:majorFont" : "a:minorFont",
    children: [
      Yr("a:latin", o, o === u.latin ? u.panose : void 0),
      Yr("a:ea", n),
      Yr("a:cs", i),
      ...Gd.map(([a, c, h = c]) => new re({
        name: "a:font",
        attributes: {
          script: {
            key: "script",
            value: a
          },
          typeface: {
            key: "typeface",
            value: e === "headings" ? c : h
          }
        }
      }))
    ]
  });
}, Vd = (e, t = {}) => new re({
  name: "a:fontScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: [Ti("headings", t), Ti("body", t)]
}), mo = (e = []) => new re({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: "phClr"
  } },
  children: e.map(([t, r]) => new re({
    name: `a:${t}`,
    attributes: { value: {
      key: "val",
      value: r
    } }
  }))
}), _r = (e) => new re({
  name: "a:solidFill",
  children: [mo(e)]
}), Jr = (e) => new re({
  name: "a:gradFill",
  attributes: { rotateWithShape: {
    key: "rotWithShape",
    value: !0
  } },
  children: [new re({
    name: "a:gsLst",
    children: e.map((t, r) => new re({
      name: "a:gs",
      attributes: { position: {
        key: "pos",
        value: r * 5e4
      } },
      children: [mo(t)]
    }))
  }), new re({
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
}), Qr = (e) => new re({
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
    _r(),
    new re({
      name: "a:prstDash",
      attributes: { value: {
        key: "val",
        value: "solid"
      } }
    }),
    new re({
      name: "a:miter",
      attributes: { limit: {
        key: "lim",
        value: 8e5
      } }
    })
  ]
}), en = (e) => new re({
  name: "a:effectStyle",
  children: [new re({
    name: "a:effectLst",
    children: e
  })]
}), Xd = () => new re({
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
  children: [new re({
    name: "a:srgbClr",
    attributes: { value: {
      key: "val",
      value: "000000"
    } },
    children: [new re({
      name: "a:alpha",
      attributes: { value: {
        key: "val",
        value: 63e3
      } }
    })]
  })]
}), Kd = () => new re({
  name: "a:fmtScheme",
  attributes: { name: {
    key: "name",
    value: "Office"
  } },
  children: [
    new re({
      name: "a:fillStyleLst",
      children: [
        _r(),
        Jr([
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
        Jr([
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
    new re({
      name: "a:lnStyleLst",
      children: [
        Qr(6350),
        Qr(12700),
        Qr(19050)
      ]
    }),
    new re({
      name: "a:effectStyleLst",
      children: [
        en([]),
        en([]),
        en([Xd()])
      ]
    }),
    new re({
      name: "a:bgFillStyleLst",
      children: [
        _r(),
        _r([["tint", 95e3], ["satMod", 17e4]]),
        Jr([
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
}), Zd = class extends ne {
  constructor({ name: e = "Office Theme", colors: t, fonts: r } = {}) {
    super("a:theme"), G(this, "colors", void 0), this.colors = Qi(t), this.root.push(new yn({
      namespace: {
        key: "xmlns:a",
        value: "http://schemas.openxmlformats.org/drawingml/2006/main"
      },
      name: {
        key: "name",
        value: e
      }
    })), this.root.push(new re({
      name: "a:themeElements",
      children: [
        As(t ? e : "Office", t),
        Vd(r ? e : "Office", r),
        Kd()
      ]
    })), this.root.push(new re({ name: "a:objectDefaults" })), this.root.push(new re({ name: "a:extraClrSchemeLst" }));
  }
  /**
  * The hex color of each of the theme's colors. The system's window text and window colors are black and white.
  */
  get Colors() {
    return this.colors;
  }
}, Yd = [
  208,
  207,
  17,
  224,
  161,
  177,
  26,
  225
], Jd = class {
  constructor(e) {
    var t, r, n, i, o, u, a, c, h, f, d, _, v, g;
    if (G(this, "currentRelationshipId", 1), G(this, "documentWrapper", void 0), G(this, "headers", []), G(this, "footers", []), G(this, "coreProperties", void 0), G(this, "numbering", void 0), G(this, "media", void 0), G(this, "fileRelationships", void 0), G(this, "footnotesWrapper", void 0), G(this, "endnotesWrapper", void 0), G(this, "settings", void 0), G(this, "contentTypes", void 0), G(this, "customProperties", void 0), G(this, "appProperties", void 0), G(this, "styles", void 0), G(this, "comments", void 0), G(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    ), G(
      this,
      /** Durable comment id mapping (word/commentsIds.xml). */
      "commentsIds",
      void 0
    ), G(this, "fontWrapper", void 0), G(this, "theme", void 0), G(this, "packageParts", void 0), G(this, "macros", void 0), G(this, "bibliography", void 0), e.macros !== void 0) {
      const { project: k, events: T = [] } = e.macros, R = k instanceof Uint8Array ? k : new Uint8Array(k);
      if (!Yd.every((N, U) => R[U] === N)) throw new Error("macros.project isn't a VBA project. Use createMacros from docx/macros, or the word/vbaProject.bin in a .docm rather than the .docm itself");
      const I = new Ce();
      T.length > 0 && I.addRelationship(1, "http://schemas.microsoft.com/office/2006/relationships/wordVbaData", "vbaData.xml"), this.macros = {
        project: R,
        events: T.length > 0 ? mf(T) : void 0,
        relationships: I
      };
    }
    if (this.coreProperties = new of(le(le({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (n = e.lastModifiedBy) !== null && n !== void 0 ? n : "Un-named"
    })), this.numbering = new rd(e.numbering ? e.numbering : { config: [] }), this.comments = new Tc((i = e.comments) !== null && i !== void 0 ? i : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Ic(this.comments.ThreadData)), this.comments.CommentIdsData && (this.commentsIds = new Lc(this.comments.CommentIdsData)), this.fileRelationships = new Ce(), this.customProperties = new ff((o = e.customProperties) !== null && o !== void 0 ? o : []), this.appProperties = new rf(), this.footnotesWrapper = new Lf(), this.endnotesWrapper = new kf(), this.contentTypes = new af({ macros: this.macros !== void 0 }), ((u = this.macros) === null || u === void 0 ? void 0 : u.events) !== void 0 && this.contentTypes.addOverride("application/vnd.ms-word.vbaData+xml", "/word/vbaData.xml"), e.bibliography !== void 0) {
      const k = new Ce();
      k.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps", "itemProps1.xml"), this.bibliography = {
        sources: e.bibliography.sources,
        properties: df(`{${sa().toUpperCase()}}`),
        relationships: k
      }, this.contentTypes.addOverride("application/vnd.openxmlformats-officedocument.customXmlProperties+xml", "/customXml/itemProps1.xml");
    }
    if (this.packageParts = new nd(this.contentTypes), this.documentWrapper = new gf({
      background: e.background,
      pageNumbers: e.pageNumbers
    }), this.settings = new dd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (a = e.features) === null || a === void 0 ? void 0 : a.trackRevisions,
      updateFields: (c = e.features) === null || c === void 0 ? void 0 : c.updateFields,
      embedFonts: !((h = e.fonts) === null || h === void 0) && h.length ? !0 : void 0,
      defaultTabStop: e.defaultTabStop,
      protection: e.protection,
      hyphenation: {
        autoHyphenation: (f = e.hyphenation) === null || f === void 0 ? void 0 : f.autoHyphenation,
        hyphenationZone: (d = e.hyphenation) === null || d === void 0 ? void 0 : d.hyphenationZone,
        consecutiveHyphenLimit: (_ = e.hyphenation) === null || _ === void 0 ? void 0 : _.consecutiveHyphenLimit,
        doNotHyphenateCaps: (v = e.hyphenation) === null || v === void 0 ? void 0 : v.doNotHyphenateCaps
      }
    }), this.media = new Mf(), e.externalStyles !== void 0) {
      var m, b, x, y;
      const k = (m = (b = e.styles) === null || b === void 0 ? void 0 : b.default) !== null && m !== void 0 ? m : {}, T = Object.entries(fo(k)), R = ([N]) => k[N] !== void 0, I = new zd().newInstance(e.externalStyles);
      this.styles = new Zr(le(le({}, I), {}, {
        paragraphStyles: (x = e.styles) === null || x === void 0 ? void 0 : x.paragraphStyles,
        characterStyles: (y = e.styles) === null || y === void 0 ? void 0 : y.characterStyles,
        importedStyles: [
          ...T.filter((N) => !R(N)).map(([, N]) => N),
          ...I.importedStyles,
          ...T.filter(R).map(([, N]) => N)
        ]
      }));
    } else if (e.styles) {
      const k = new ki().newInstance(e.styles.default);
      this.styles = new Zr(le(le({}, k), e.styles));
    } else {
      const k = new ki();
      this.styles = new Zr(k.newInstance());
    }
    this.addDefaultRelationships();
    for (const k of e.sections) this.addSection(k);
    if (e.footnotes) for (const k in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(k), e.footnotes[k].children);
    if (e.endnotes) for (const k in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(k), e.endnotes[k].children);
    this.fontWrapper = new Va((g = e.fonts) !== null && g !== void 0 ? g : []), this.theme = new Zd(e.theme), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml"), this.macros !== void 0 && this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2006/relationships/vbaProject", "vbaProject.bin"), this.bibliography !== void 0 && this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml", "../customXml/item1.xml");
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: n }) {
    this.documentWrapper.View.Body.addSection(le(le({}, n), {}, {
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
    for (const i of r) this.documentWrapper.View.add(i);
  }
  createHeader(e) {
    const t = new Bf(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Rf(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = Tt.DEFAULT) {
    this.headers.push({
      header: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = Tt.DEFAULT) {
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
  /**
  * The document's macros, when it has any: its VBA project (word/vbaProject.bin), the events of the document it
  * handles (word/vbaData.xml), and the project's relationships, to the events.
  */
  get Macros() {
    return this.macros;
  }
  /**
  * The document's sources, when it has a bibliography: the part they're in (customXml/item1.xml), its properties
  * (customXml/itemProps1.xml), and its relationships, to its properties.
  */
  get Bibliography() {
    return this.bibliography;
  }
}, Qd = class extends ne {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new nt("w:alias", e));
  }
}, ep = [
  "contentChildren",
  "cachedEntries",
  "beginDirty",
  "tabLeader"
], tp = class extends Nn {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: n = [], beginDirty: i, tabLeader: o = Et.DOT } = t, u = bn(t, ep);
    super("w:sdt"), G(
      this,
      /** What it is filled in with from the headings, when it isn't given its content */
      "fromHeadings",
      void 0
    ), this.root.push(new Qd(e));
    const a = new Na(), c = [new Me({ children: [
      La(i),
      new Oa(u),
      vt()
    ] })], h = [new Me({ children: [wt()] })];
    if (n !== void 0 && n.length > 0) {
      const { stylesWithLevels: f } = u, d = n.map((v, g) => {
        var m, b;
        const x = this.buildCachedContentParagraphChild(v, u), y = (m = f == null || (b = f.find((T) => T.level === v.level)) === null || b === void 0 ? void 0 : b.styleName) !== null && m !== void 0 ? m : `TOC${v.level}`, k = g === 0 ? [...c, x] : g === n.length - 1 ? [x, ...h] : [x];
        return new be({
          style: y,
          tabStops: this.getTabStopsForLevel(v.level, o),
          children: k
        });
      });
      let _ = d;
      n.length <= 1 && (_ = [...d, new be({ children: h })]);
      for (const v of _) a.addChildElement(v);
    } else {
      const f = new be({ children: c });
      a.addChildElement(f);
      for (const _ of r) a.addChildElement(_);
      const d = new be({ children: h });
      a.addChildElement(d), r.length === 0 && (this.fromHeadings = {
        properties: u,
        beginDirty: i,
        tabLeader: o
      });
    }
    this.root.push(a);
  }
  /**
  * Written empty, and filled in from the headings once the body it is in is written, unless it was given its content.
  * The page numbers are aligned to the right of the text in its section.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return Ju(t, this.fromHeadings && le(le({}, this.fromHeadings), {}, { textWidth: this.textWidthIn(e) })), t;
  }
  /** The width of the text in the section it is in */
  textWidthIn(e) {
    var t, r;
    return (t = (r = e.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 || (r = r.View.Body.getSectionPropertiesFor(this)) === null || r === void 0 ? void 0 : r.AvailableTextWidth) !== null && t !== void 0 ? t : yr;
  }
  getTabStopsForLevel(e, t, r = 9025) {
    return [{
      type: "clear",
      position: r + 1 - (e - 1) * 240
    }, {
      type: "right",
      position: r,
      leader: t
    }];
  }
  buildCachedContentRun(e, t) {
    var r, n;
    return new Me({
      style: t?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new Sr({ text: e.title }),
        new rr(),
        new Sr({ text: (r = (n = e.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "" })
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
}, vo = class {
  constructor(e = { children: [] }) {
    G(this, "options", void 0), this.options = e;
  }
}, wo = class {
  constructor(e = { children: [] }) {
    G(this, "options", void 0), this.options = e;
  }
}, rp = class extends ve {
  constructor(...e) {
    super(...e), G(this, "xmlKeys", { id: "w:id" });
  }
}, Ai = class extends ne {
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
    super({ style: "FootnoteReference" }), G(this, "footnote", void 0), typeof e == "number" ? this.root.push(new Ai(e)) : this.footnote = e;
  }
  /**
  * Formats the run, with its own footnote added to the document's footnotes, and referred to by the id it has there.
  */
  prepForXml(e) {
    var t;
    if (this.footnote === void 0) return super.prepForXml(e);
    const r = (t = e.file) === null || t === void 0 ? void 0 : t.FootNotes.View.idOf(this, this.footnote, e);
    if (r !== void 0) {
      this.root.push(new Ai(r));
      try {
        return super.prepForXml(e);
      } finally {
        this.root.pop();
      }
    }
  }
}, Un = /* @__PURE__ */ fe(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, n = r && typeof r.apply == "function" ? r.apply : function(N, U, F) {
    return Function.prototype.apply.call(N, U, F);
  }, i;
  r && typeof r.ownKeys == "function" ? i = r.ownKeys : Object.getOwnPropertySymbols ? i = function(N) {
    return Object.getOwnPropertyNames(N).concat(Object.getOwnPropertySymbols(N));
  } : i = function(N) {
    return Object.getOwnPropertyNames(N);
  };
  function o(I) {
    console && console.warn && console.warn(I);
  }
  var u = Number.isNaN || function(N) {
    return N !== N;
  };
  function a() {
    a.init.call(this);
  }
  t.exports = a, t.exports.once = k, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var c = 10;
  function h(I) {
    if (typeof I != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof I);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return c;
    },
    set: function(I) {
      if (typeof I != "number" || I < 0 || u(I)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + I + ".");
      c = I;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(N) {
    if (typeof N != "number" || N < 0 || u(N)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + N + ".");
    return this._maxListeners = N, this;
  };
  function f(I) {
    return I._maxListeners === void 0 ? a.defaultMaxListeners : I._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return f(this);
  }, a.prototype.emit = function(N) {
    for (var U = [], F = 1; F < arguments.length; F++) U.push(arguments[F]);
    var Z = N === "error", ae = this._events;
    if (ae !== void 0) Z = Z && ae.error === void 0;
    else if (!Z) return !1;
    if (Z) {
      var A;
      if (U.length > 0 && (A = U[0]), A instanceof Error) throw A;
      var M = /* @__PURE__ */ new Error("Unhandled error." + (A ? " (" + A.message + ")" : ""));
      throw M.context = A, M;
    }
    var S = ae[N];
    if (S === void 0) return !1;
    if (typeof S == "function") n(S, this, U);
    else
      for (var W = S.length, J = b(S, W), F = 0; F < W; ++F) n(J[F], this, U);
    return !0;
  };
  function d(I, N, U, F) {
    var Z, ae, A;
    if (h(U), ae = I._events, ae === void 0 ? (ae = I._events = /* @__PURE__ */ Object.create(null), I._eventsCount = 0) : (ae.newListener !== void 0 && (I.emit("newListener", N, U.listener ? U.listener : U), ae = I._events), A = ae[N]), A === void 0)
      A = ae[N] = U, ++I._eventsCount;
    else if (typeof A == "function" ? A = ae[N] = F ? [U, A] : [A, U] : F ? A.unshift(U) : A.push(U), Z = f(I), Z > 0 && A.length > Z && !A.warned) {
      A.warned = !0;
      var M = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + A.length + " " + String(N) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      M.name = "MaxListenersExceededWarning", M.emitter = I, M.type = N, M.count = A.length, o(M);
    }
    return I;
  }
  a.prototype.addListener = function(N, U) {
    return d(this, N, U, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(N, U) {
    return d(this, N, U, !0);
  };
  function _() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function v(I, N, U) {
    var F = {
      fired: !1,
      wrapFn: void 0,
      target: I,
      type: N,
      listener: U
    }, Z = _.bind(F);
    return Z.listener = U, F.wrapFn = Z, Z;
  }
  a.prototype.once = function(N, U) {
    return h(U), this.on(N, v(this, N, U)), this;
  }, a.prototype.prependOnceListener = function(N, U) {
    return h(U), this.prependListener(N, v(this, N, U)), this;
  }, a.prototype.removeListener = function(N, U) {
    var F, Z, ae, A, M;
    if (h(U), Z = this._events, Z === void 0) return this;
    if (F = Z[N], F === void 0) return this;
    if (F === U || F.listener === U)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete Z[N], Z.removeListener && this.emit("removeListener", N, F.listener || U));
    else if (typeof F != "function") {
      for (ae = -1, A = F.length - 1; A >= 0; A--) if (F[A] === U || F[A].listener === U) {
        M = F[A].listener, ae = A;
        break;
      }
      if (ae < 0) return this;
      ae === 0 ? F.shift() : x(F, ae), F.length === 1 && (Z[N] = F[0]), Z.removeListener !== void 0 && this.emit("removeListener", N, M || U);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(N) {
    var U, F = this._events, Z;
    if (F === void 0) return this;
    if (F.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : F[N] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete F[N]), this;
    if (arguments.length === 0) {
      var ae = Object.keys(F), A;
      for (Z = 0; Z < ae.length; ++Z)
        A = ae[Z], A !== "removeListener" && this.removeAllListeners(A);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (U = F[N], typeof U == "function") this.removeListener(N, U);
    else if (U !== void 0) for (Z = U.length - 1; Z >= 0; Z--) this.removeListener(N, U[Z]);
    return this;
  };
  function g(I, N, U) {
    var F = I._events;
    if (F === void 0) return [];
    var Z = F[N];
    return Z === void 0 ? [] : typeof Z == "function" ? U ? [Z.listener || Z] : [Z] : U ? y(Z) : b(Z, Z.length);
  }
  a.prototype.listeners = function(N) {
    return g(this, N, !0);
  }, a.prototype.rawListeners = function(N) {
    return g(this, N, !1);
  }, a.listenerCount = function(I, N) {
    return typeof I.listenerCount == "function" ? I.listenerCount(N) : m.call(I, N);
  }, a.prototype.listenerCount = m;
  function m(I) {
    var N = this._events;
    if (N !== void 0) {
      var U = N[I];
      if (typeof U == "function") return 1;
      if (U !== void 0) return U.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? i(this._events) : [];
  };
  function b(I, N) {
    for (var U = new Array(N), F = 0; F < N; ++F) U[F] = I[F];
    return U;
  }
  function x(I, N) {
    for (; N + 1 < I.length; N++) I[N] = I[N + 1];
    I.pop();
  }
  function y(I) {
    for (var N = new Array(I.length), U = 0; U < N.length; ++U) N[U] = I[U].listener || I[U];
    return N;
  }
  function k(I, N) {
    return new Promise(function(U, F) {
      function Z(A) {
        I.removeListener(N, ae), F(A);
      }
      function ae() {
        typeof I.removeListener == "function" && I.removeListener("error", Z), U([].slice.call(arguments));
      }
      R(I, N, ae, { once: !0 }), N !== "error" && T(I, Z, { once: !0 });
    });
  }
  function T(I, N, U) {
    typeof I.on == "function" && R(I, "error", N, U);
  }
  function R(I, N, U, F) {
    if (typeof I.on == "function")
      F.once ? I.once(N, U) : I.on(N, U);
    else if (typeof I.addEventListener == "function") I.addEventListener(N, function Z(ae) {
      F.once && I.removeEventListener(N, Z), U(ae);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof I);
  }
})), Pe, Pt = Di((() => {
  Pe = globalThis || self;
}));
function ip(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function wn() {
  throw new Error("setTimeout has not been defined");
}
function gn() {
  throw new Error("clearTimeout has not been defined");
}
function go(e) {
  if ($e === setTimeout) return setTimeout(e, 0);
  if (($e === wn || !$e) && setTimeout)
    return $e = setTimeout, setTimeout(e, 0);
  try {
    return $e(e, 0);
  } catch {
    try {
      return $e.call(null, e, 0);
    } catch {
      return $e.call(this, e, 0);
    }
  }
}
function ap(e) {
  if (Ge === clearTimeout) return clearTimeout(e);
  if ((Ge === gn || !Ge) && clearTimeout)
    return Ge = clearTimeout, clearTimeout(e);
  try {
    return Ge(e);
  } catch {
    try {
      return Ge.call(null, e);
    } catch {
      return Ge.call(this, e);
    }
  }
}
function op() {
  !yt || !gt || (yt = !1, gt.length ? Ve = gt.concat(Ve) : Vt = -1, Ve.length && yo());
}
function yo() {
  if (!yt) {
    var e = go(op);
    yt = !0;
    for (var t = Ve.length; t; ) {
      for (gt = Ve, Ve = []; ++Vt < t; ) gt && gt[Vt].run();
      Vt = -1, t = Ve.length;
    }
    gt = null, yt = !1, ap(e);
  }
}
function Ri(e, t) {
  this.fun = e, this.array = t;
}
function tt() {
}
var tn, _e, $e, Ge, Ve, yt, gt, Vt, Ci, ge, _t = Di((() => {
  tn = { exports: {} }, _e = tn.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? $e = setTimeout : $e = wn;
    } catch {
      $e = wn;
    }
    try {
      typeof clearTimeout == "function" ? Ge = clearTimeout : Ge = gn;
    } catch {
      Ge = gn;
    }
  })(), Ve = [], yt = !1, Vt = -1, _e.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    Ve.push(new Ri(e, t)), Ve.length === 1 && !yt && go(yo);
  }, Ri.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _e.title = "browser", _e.browser = !0, _e.env = {}, _e.argv = [], _e.version = "", _e.versions = {}, _e.on = tt, _e.addListener = tt, _e.once = tt, _e.off = tt, _e.removeListener = tt, _e.removeAllListeners = tt, _e.emit = tt, _e.prependListener = tt, _e.prependOnceListener = tt, _e.listeners = function(e) {
    return [];
  }, _e.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, _e.cwd = function() {
    return "/";
  }, _e.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, _e.umask = function() {
    return 0;
  }, Ci = tn.exports, ge = /* @__PURE__ */ ip(Ci);
})), bo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Un().EventEmitter;
})), sp = /* @__PURE__ */ fe(((e) => {
  e.byteLength = c, e.toByteArray = f, e.fromByteArray = v;
  for (var t = [], r = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, u = i.length; o < u; ++o)
    t[o] = i[o], r[i.charCodeAt(o)] = o;
  r[45] = 62, r[95] = 63;
  function a(g) {
    var m = g.length;
    if (m % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var b = g.indexOf("=");
    b === -1 && (b = m);
    var x = b === m ? 0 : 4 - b % 4;
    return [b, x];
  }
  function c(g) {
    var m = a(g), b = m[0], x = m[1];
    return (b + x) * 3 / 4 - x;
  }
  function h(g, m, b) {
    return (m + b) * 3 / 4 - b;
  }
  function f(g) {
    for (var m, b = a(g), x = b[0], y = b[1], k = new n(h(g, x, y)), T = 0, R = y > 0 ? x - 4 : x, I = 0; I < R; I += 4)
      m = r[g.charCodeAt(I)] << 18 | r[g.charCodeAt(I + 1)] << 12 | r[g.charCodeAt(I + 2)] << 6 | r[g.charCodeAt(I + 3)], k[T++] = m >> 16 & 255, k[T++] = m >> 8 & 255, k[T++] = m & 255;
    return y === 2 && (m = r[g.charCodeAt(I)] << 2 | r[g.charCodeAt(I + 1)] >> 4, k[T++] = m & 255), y === 1 && (m = r[g.charCodeAt(I)] << 10 | r[g.charCodeAt(I + 1)] << 4 | r[g.charCodeAt(I + 2)] >> 2, k[T++] = m >> 8 & 255, k[T++] = m & 255), k;
  }
  function d(g) {
    return t[g >> 18 & 63] + t[g >> 12 & 63] + t[g >> 6 & 63] + t[g & 63];
  }
  function _(g, m, b) {
    for (var x, y = [], k = m; k < b; k += 3)
      x = (g[k] << 16 & 16711680) + (g[k + 1] << 8 & 65280) + (g[k + 2] & 255), y.push(d(x));
    return y.join("");
  }
  function v(g) {
    for (var m, b = g.length, x = b % 3, y = [], k = 16383, T = 0, R = b - x; T < R; T += k) y.push(_(g, T, T + k > R ? R : T + k));
    return x === 1 ? (m = g[b - 1], y.push(t[m >> 2] + t[m << 4 & 63] + "==")) : x === 2 && (m = (g[b - 2] << 8) + g[b - 1], y.push(t[m >> 10] + t[m >> 4 & 63] + t[m << 2 & 63] + "=")), y.join("");
  }
})), lp = /* @__PURE__ */ fe(((e) => {
  e.read = function(t, r, n, i, o) {
    var u, a, c = o * 8 - i - 1, h = (1 << c) - 1, f = h >> 1, d = -7, _ = n ? o - 1 : 0, v = n ? -1 : 1, g = t[r + _];
    for (_ += v, u = g & (1 << -d) - 1, g >>= -d, d += c; d > 0; u = u * 256 + t[r + _], _ += v, d -= 8) ;
    for (a = u & (1 << -d) - 1, u >>= -d, d += i; d > 0; a = a * 256 + t[r + _], _ += v, d -= 8) ;
    if (u === 0) u = 1 - f;
    else {
      if (u === h) return a ? NaN : (g ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, i), u = u - f;
    }
    return (g ? -1 : 1) * a * Math.pow(2, u - i);
  }, e.write = function(t, r, n, i, o, u) {
    var a, c, h, f = u * 8 - o - 1, d = (1 << f) - 1, _ = d >> 1, v = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = i ? 0 : u - 1, m = i ? 1 : -1, b = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (c = isNaN(r) ? 1 : 0, a = d) : (a = Math.floor(Math.log(r) / Math.LN2), r * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), a + _ >= 1 ? r += v / h : r += v * Math.pow(2, 1 - _), r * h >= 2 && (a++, h /= 2), a + _ >= d ? (c = 0, a = d) : a + _ >= 1 ? (c = (r * h - 1) * Math.pow(2, o), a = a + _) : (c = r * Math.pow(2, _ - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + g] = c & 255, g += m, c /= 256, o -= 8) ;
    for (a = a << o | c, f += o; f > 0; t[n + g] = a & 255, g += m, a /= 256, f -= 8) ;
    t[n + g - m] |= b * 128;
  };
}));
var Lr = /* @__PURE__ */ fe(((e) => {
  var t = sp(), r = lp(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = a, e.SlowBuffer = y, e.INSPECT_MAX_BYTES = 50;
  var i = 2147483647;
  e.kMaxLength = i, a.TYPED_ARRAY_SUPPORT = o(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function o() {
    try {
      var E = /* @__PURE__ */ new Uint8Array(1), s = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(s, Uint8Array.prototype), Object.setPrototypeOf(E, s), E.foo() === 42;
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
  function u(E) {
    if (E > i) throw new RangeError('The value "' + E + '" is invalid for option "size"');
    var s = new Uint8Array(E);
    return Object.setPrototypeOf(s, a.prototype), s;
  }
  function a(E, s, l) {
    if (typeof E == "number") {
      if (typeof s == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return d(E);
    }
    return c(E, s, l);
  }
  a.poolSize = 8192;
  function c(E, s, l) {
    if (typeof E == "string") return _(E, s);
    if (ArrayBuffer.isView(E)) return g(E);
    if (E == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E);
    if (P(E, ArrayBuffer) || E && P(E.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (P(E, SharedArrayBuffer) || E && P(E.buffer, SharedArrayBuffer))) return m(E, s, l);
    if (typeof E == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var w = E.valueOf && E.valueOf();
    if (w != null && w !== E) return a.from(w, s, l);
    var L = b(E);
    if (L) return L;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof E[Symbol.toPrimitive] == "function") return a.from(E[Symbol.toPrimitive]("string"), s, l);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E);
  }
  a.from = function(E, s, l) {
    return c(E, s, l);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function h(E) {
    if (typeof E != "number") throw new TypeError('"size" argument must be of type number');
    if (E < 0) throw new RangeError('The value "' + E + '" is invalid for option "size"');
  }
  function f(E, s, l) {
    return h(E), E <= 0 ? u(E) : s !== void 0 ? typeof l == "string" ? u(E).fill(s, l) : u(E).fill(s) : u(E);
  }
  a.alloc = function(E, s, l) {
    return f(E, s, l);
  };
  function d(E) {
    return h(E), u(E < 0 ? 0 : x(E) | 0);
  }
  a.allocUnsafe = function(E) {
    return d(E);
  }, a.allocUnsafeSlow = function(E) {
    return d(E);
  };
  function _(E, s) {
    if ((typeof s != "string" || s === "") && (s = "utf8"), !a.isEncoding(s)) throw new TypeError("Unknown encoding: " + s);
    var l = k(E, s) | 0, w = u(l), L = w.write(E, s);
    return L !== l && (w = w.slice(0, L)), w;
  }
  function v(E) {
    for (var s = E.length < 0 ? 0 : x(E.length) | 0, l = u(s), w = 0; w < s; w += 1) l[w] = E[w] & 255;
    return l;
  }
  function g(E) {
    if (P(E, Uint8Array)) {
      var s = new Uint8Array(E);
      return m(s.buffer, s.byteOffset, s.byteLength);
    }
    return v(E);
  }
  function m(E, s, l) {
    if (s < 0 || E.byteLength < s) throw new RangeError('"offset" is outside of buffer bounds');
    if (E.byteLength < s + (l || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var w;
    return s === void 0 && l === void 0 ? w = new Uint8Array(E) : l === void 0 ? w = new Uint8Array(E, s) : w = new Uint8Array(E, s, l), Object.setPrototypeOf(w, a.prototype), w;
  }
  function b(E) {
    if (a.isBuffer(E)) {
      var s = x(E.length) | 0, l = u(s);
      return l.length === 0 || E.copy(l, 0, 0, s), l;
    }
    if (E.length !== void 0)
      return typeof E.length != "number" || p(E.length) ? u(0) : v(E);
    if (E.type === "Buffer" && Array.isArray(E.data)) return v(E.data);
  }
  function x(E) {
    if (E >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return E | 0;
  }
  function y(E) {
    return +E != E && (E = 0), a.alloc(+E);
  }
  a.isBuffer = function(s) {
    return s != null && s._isBuffer === !0 && s !== a.prototype;
  }, a.compare = function(s, l) {
    if (P(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)), P(l, Uint8Array) && (l = a.from(l, l.offset, l.byteLength)), !a.isBuffer(s) || !a.isBuffer(l)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (s === l) return 0;
    for (var w = s.length, L = l.length, j = 0, D = Math.min(w, L); j < D; ++j) if (s[j] !== l[j]) {
      w = s[j], L = l[j];
      break;
    }
    return w < L ? -1 : L < w ? 1 : 0;
  }, a.isEncoding = function(s) {
    switch (String(s).toLowerCase()) {
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
  }, a.concat = function(s, l) {
    if (!Array.isArray(s)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (s.length === 0) return a.alloc(0);
    var w;
    if (l === void 0)
      for (l = 0, w = 0; w < s.length; ++w) l += s[w].length;
    var L = a.allocUnsafe(l), j = 0;
    for (w = 0; w < s.length; ++w) {
      var D = s[w];
      if (P(D, Uint8Array))
        j + D.length > L.length ? a.from(D).copy(L, j) : Uint8Array.prototype.set.call(L, D, j);
      else if (a.isBuffer(D)) D.copy(L, j);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      j += D.length;
    }
    return L;
  };
  function k(E, s) {
    if (a.isBuffer(E)) return E.length;
    if (ArrayBuffer.isView(E) || P(E, ArrayBuffer)) return E.byteLength;
    if (typeof E != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof E);
    var l = E.length, w = arguments.length > 2 && arguments[2] === !0;
    if (!w && l === 0) return 0;
    for (var L = !1; ; ) switch (s) {
      case "ascii":
      case "latin1":
      case "binary":
        return l;
      case "utf8":
      case "utf-8":
        return B(E).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return l * 2;
      case "hex":
        return l >>> 1;
      case "base64":
        return he(E).length;
      default:
        if (L) return w ? -1 : B(E).length;
        s = ("" + s).toLowerCase(), L = !0;
    }
  }
  a.byteLength = k;
  function T(E, s, l) {
    var w = !1;
    if ((s === void 0 || s < 0) && (s = 0), s > this.length || ((l === void 0 || l > this.length) && (l = this.length), l <= 0) || (l >>>= 0, s >>>= 0, l <= s)) return "";
    for (E || (E = "utf8"); ; ) switch (E) {
      case "hex":
        return V(this, s, l);
      case "utf8":
      case "utf-8":
        return S(this, s, l);
      case "ascii":
        return K(this, s, l);
      case "latin1":
      case "binary":
        return oe(this, s, l);
      case "base64":
        return M(this, s, l);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Q(this, s, l);
      default:
        if (w) throw new TypeError("Unknown encoding: " + E);
        E = (E + "").toLowerCase(), w = !0;
    }
  }
  a.prototype._isBuffer = !0;
  function R(E, s, l) {
    var w = E[s];
    E[s] = E[l], E[l] = w;
  }
  a.prototype.swap16 = function() {
    var s = this.length;
    if (s % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var l = 0; l < s; l += 2) R(this, l, l + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var s = this.length;
    if (s % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var l = 0; l < s; l += 4)
      R(this, l, l + 3), R(this, l + 1, l + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var s = this.length;
    if (s % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var l = 0; l < s; l += 8)
      R(this, l, l + 7), R(this, l + 1, l + 6), R(this, l + 2, l + 5), R(this, l + 3, l + 4);
    return this;
  }, a.prototype.toString = function() {
    var s = this.length;
    return s === 0 ? "" : arguments.length === 0 ? S(this, 0, s) : T.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(s) {
    if (!a.isBuffer(s)) throw new TypeError("Argument must be a Buffer");
    return this === s ? !0 : a.compare(this, s) === 0;
  }, a.prototype.inspect = function() {
    var s = "", l = e.INSPECT_MAX_BYTES;
    return s = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (s += " ... "), "<Buffer " + s + ">";
  }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(s, l, w, L, j) {
    if (P(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)), !a.isBuffer(s)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof s);
    if (l === void 0 && (l = 0), w === void 0 && (w = s ? s.length : 0), L === void 0 && (L = 0), j === void 0 && (j = this.length), l < 0 || w > s.length || L < 0 || j > this.length) throw new RangeError("out of range index");
    if (L >= j && l >= w) return 0;
    if (L >= j) return -1;
    if (l >= w) return 1;
    if (l >>>= 0, w >>>= 0, L >>>= 0, j >>>= 0, this === s) return 0;
    for (var D = j - L, te = w - l, ue = Math.min(D, te), ie = this.slice(L, j), de = s.slice(l, w), me = 0; me < ue; ++me) if (ie[me] !== de[me]) {
      D = ie[me], te = de[me];
      break;
    }
    return D < te ? -1 : te < D ? 1 : 0;
  };
  function I(E, s, l, w, L) {
    if (E.length === 0) return -1;
    if (typeof l == "string" ? (w = l, l = 0) : l > 2147483647 ? l = 2147483647 : l < -2147483648 && (l = -2147483648), l = +l, p(l) && (l = L ? 0 : E.length - 1), l < 0 && (l = E.length + l), l >= E.length) {
      if (L) return -1;
      l = E.length - 1;
    } else if (l < 0)
      if (L) l = 0;
      else return -1;
    if (typeof s == "string" && (s = a.from(s, w)), a.isBuffer(s))
      return s.length === 0 ? -1 : N(E, s, l, w, L);
    if (typeof s == "number")
      return s = s & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(E, s, l) : Uint8Array.prototype.lastIndexOf.call(E, s, l) : N(E, [s], l, w, L);
    throw new TypeError("val must be string, number or Buffer");
  }
  function N(E, s, l, w, L) {
    var j = 1, D = E.length, te = s.length;
    if (w !== void 0 && (w = String(w).toLowerCase(), w === "ucs2" || w === "ucs-2" || w === "utf16le" || w === "utf-16le")) {
      if (E.length < 2 || s.length < 2) return -1;
      j = 2, D /= 2, te /= 2, l /= 2;
    }
    function ue(Ae, ot) {
      return j === 1 ? Ae[ot] : Ae.readUInt16BE(ot * j);
    }
    var ie;
    if (L) {
      var de = -1;
      for (ie = l; ie < D; ie++) if (ue(E, ie) === ue(s, de === -1 ? 0 : ie - de)) {
        if (de === -1 && (de = ie), ie - de + 1 === te) return de * j;
      } else
        de !== -1 && (ie -= ie - de), de = -1;
    } else
      for (l + te > D && (l = D - te), ie = l; ie >= 0; ie--) {
        for (var me = !0, we = 0; we < te; we++) if (ue(E, ie + we) !== ue(s, we)) {
          me = !1;
          break;
        }
        if (me) return ie;
      }
    return -1;
  }
  a.prototype.includes = function(s, l, w) {
    return this.indexOf(s, l, w) !== -1;
  }, a.prototype.indexOf = function(s, l, w) {
    return I(this, s, l, w, !0);
  }, a.prototype.lastIndexOf = function(s, l, w) {
    return I(this, s, l, w, !1);
  };
  function U(E, s, l, w) {
    l = Number(l) || 0;
    var L = E.length - l;
    w ? (w = Number(w), w > L && (w = L)) : w = L;
    var j = s.length;
    w > j / 2 && (w = j / 2);
    for (var D = 0; D < w; ++D) {
      var te = parseInt(s.substr(D * 2, 2), 16);
      if (p(te)) return D;
      E[l + D] = te;
    }
    return D;
  }
  function F(E, s, l, w) {
    return O(B(s, E.length - l), E, l, w);
  }
  function Z(E, s, l, w) {
    return O(Y(s), E, l, w);
  }
  function ae(E, s, l, w) {
    return O(he(s), E, l, w);
  }
  function A(E, s, l, w) {
    return O(se(s, E.length - l), E, l, w);
  }
  a.prototype.write = function(s, l, w, L) {
    if (l === void 0)
      L = "utf8", w = this.length, l = 0;
    else if (w === void 0 && typeof l == "string")
      L = l, w = this.length, l = 0;
    else if (isFinite(l))
      l = l >>> 0, isFinite(w) ? (w = w >>> 0, L === void 0 && (L = "utf8")) : (L = w, w = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var j = this.length - l;
    if ((w === void 0 || w > j) && (w = j), s.length > 0 && (w < 0 || l < 0) || l > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    L || (L = "utf8");
    for (var D = !1; ; ) switch (L) {
      case "hex":
        return U(this, s, l, w);
      case "utf8":
      case "utf-8":
        return F(this, s, l, w);
      case "ascii":
      case "latin1":
      case "binary":
        return Z(this, s, l, w);
      case "base64":
        return ae(this, s, l, w);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return A(this, s, l, w);
      default:
        if (D) throw new TypeError("Unknown encoding: " + L);
        L = ("" + L).toLowerCase(), D = !0;
    }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function M(E, s, l) {
    return s === 0 && l === E.length ? t.fromByteArray(E) : t.fromByteArray(E.slice(s, l));
  }
  function S(E, s, l) {
    l = Math.min(E.length, l);
    for (var w = [], L = s; L < l; ) {
      var j = E[L], D = null, te = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
      if (L + te <= l) {
        var ue, ie, de, me;
        switch (te) {
          case 1:
            j < 128 && (D = j);
            break;
          case 2:
            ue = E[L + 1], (ue & 192) === 128 && (me = (j & 31) << 6 | ue & 63, me > 127 && (D = me));
            break;
          case 3:
            ue = E[L + 1], ie = E[L + 2], (ue & 192) === 128 && (ie & 192) === 128 && (me = (j & 15) << 12 | (ue & 63) << 6 | ie & 63, me > 2047 && (me < 55296 || me > 57343) && (D = me));
            break;
          case 4:
            ue = E[L + 1], ie = E[L + 2], de = E[L + 3], (ue & 192) === 128 && (ie & 192) === 128 && (de & 192) === 128 && (me = (j & 15) << 18 | (ue & 63) << 12 | (ie & 63) << 6 | de & 63, me > 65535 && me < 1114112 && (D = me));
        }
      }
      D === null ? (D = 65533, te = 1) : D > 65535 && (D -= 65536, w.push(D >>> 10 & 1023 | 55296), D = 56320 | D & 1023), w.push(D), L += te;
    }
    return J(w);
  }
  var W = 4096;
  function J(E) {
    var s = E.length;
    if (s <= W) return String.fromCharCode.apply(String, E);
    for (var l = "", w = 0; w < s; ) l += String.fromCharCode.apply(String, E.slice(w, w += W));
    return l;
  }
  function K(E, s, l) {
    var w = "";
    l = Math.min(E.length, l);
    for (var L = s; L < l; ++L) w += String.fromCharCode(E[L] & 127);
    return w;
  }
  function oe(E, s, l) {
    var w = "";
    l = Math.min(E.length, l);
    for (var L = s; L < l; ++L) w += String.fromCharCode(E[L]);
    return w;
  }
  function V(E, s, l) {
    var w = E.length;
    (!s || s < 0) && (s = 0), (!l || l < 0 || l > w) && (l = w);
    for (var L = "", j = s; j < l; ++j) L += z[E[j]];
    return L;
  }
  function Q(E, s, l) {
    for (var w = E.slice(s, l), L = "", j = 0; j < w.length - 1; j += 2) L += String.fromCharCode(w[j] + w[j + 1] * 256);
    return L;
  }
  a.prototype.slice = function(s, l) {
    var w = this.length;
    s = ~~s, l = l === void 0 ? w : ~~l, s < 0 ? (s += w, s < 0 && (s = 0)) : s > w && (s = w), l < 0 ? (l += w, l < 0 && (l = 0)) : l > w && (l = w), l < s && (l = s);
    var L = this.subarray(s, l);
    return Object.setPrototypeOf(L, a.prototype), L;
  };
  function H(E, s, l) {
    if (E % 1 !== 0 || E < 0) throw new RangeError("offset is not uint");
    if (E + s > l) throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(s, l, w) {
    s = s >>> 0, l = l >>> 0, w || H(s, l, this.length);
    for (var L = this[s], j = 1, D = 0; ++D < l && (j *= 256); ) L += this[s + D] * j;
    return L;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(s, l, w) {
    s = s >>> 0, l = l >>> 0, w || H(s, l, this.length);
    for (var L = this[s + --l], j = 1; l > 0 && (j *= 256); ) L += this[s + --l] * j;
    return L;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(s, l) {
    return s = s >>> 0, l || H(s, 1, this.length), this[s];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(s, l) {
    return s = s >>> 0, l || H(s, 2, this.length), this[s] | this[s + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(s, l) {
    return s = s >>> 0, l || H(s, 2, this.length), this[s] << 8 | this[s + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), (this[s] | this[s + 1] << 8 | this[s + 2] << 16) + this[s + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), this[s] * 16777216 + (this[s + 1] << 16 | this[s + 2] << 8 | this[s + 3]);
  }, a.prototype.readIntLE = function(s, l, w) {
    s = s >>> 0, l = l >>> 0, w || H(s, l, this.length);
    for (var L = this[s], j = 1, D = 0; ++D < l && (j *= 256); ) L += this[s + D] * j;
    return j *= 128, L >= j && (L -= Math.pow(2, 8 * l)), L;
  }, a.prototype.readIntBE = function(s, l, w) {
    s = s >>> 0, l = l >>> 0, w || H(s, l, this.length);
    for (var L = l, j = 1, D = this[s + --L]; L > 0 && (j *= 256); ) D += this[s + --L] * j;
    return j *= 128, D >= j && (D -= Math.pow(2, 8 * l)), D;
  }, a.prototype.readInt8 = function(s, l) {
    return s = s >>> 0, l || H(s, 1, this.length), this[s] & 128 ? (255 - this[s] + 1) * -1 : this[s];
  }, a.prototype.readInt16LE = function(s, l) {
    s = s >>> 0, l || H(s, 2, this.length);
    var w = this[s] | this[s + 1] << 8;
    return w & 32768 ? w | 4294901760 : w;
  }, a.prototype.readInt16BE = function(s, l) {
    s = s >>> 0, l || H(s, 2, this.length);
    var w = this[s + 1] | this[s] << 8;
    return w & 32768 ? w | 4294901760 : w;
  }, a.prototype.readInt32LE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), this[s] | this[s + 1] << 8 | this[s + 2] << 16 | this[s + 3] << 24;
  }, a.prototype.readInt32BE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), this[s] << 24 | this[s + 1] << 16 | this[s + 2] << 8 | this[s + 3];
  }, a.prototype.readFloatLE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), r.read(this, s, !0, 23, 4);
  }, a.prototype.readFloatBE = function(s, l) {
    return s = s >>> 0, l || H(s, 4, this.length), r.read(this, s, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(s, l) {
    return s = s >>> 0, l || H(s, 8, this.length), r.read(this, s, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(s, l) {
    return s = s >>> 0, l || H(s, 8, this.length), r.read(this, s, !1, 52, 8);
  };
  function C(E, s, l, w, L, j) {
    if (!a.isBuffer(E)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (s > L || s < j) throw new RangeError('"value" argument is out of bounds');
    if (l + w > E.length) throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(s, l, w, L) {
    if (s = +s, l = l >>> 0, w = w >>> 0, !L) {
      var j = Math.pow(2, 8 * w) - 1;
      C(this, s, l, w, j, 0);
    }
    var D = 1, te = 0;
    for (this[l] = s & 255; ++te < w && (D *= 256); ) this[l + te] = s / D & 255;
    return l + w;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(s, l, w, L) {
    if (s = +s, l = l >>> 0, w = w >>> 0, !L) {
      var j = Math.pow(2, 8 * w) - 1;
      C(this, s, l, w, j, 0);
    }
    var D = w - 1, te = 1;
    for (this[l + D] = s & 255; --D >= 0 && (te *= 256); ) this[l + D] = s / te & 255;
    return l + w;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 1, 255, 0), this[l] = s & 255, l + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 2, 65535, 0), this[l] = s & 255, this[l + 1] = s >>> 8, l + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 2, 65535, 0), this[l] = s >>> 8, this[l + 1] = s & 255, l + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 4, 4294967295, 0), this[l + 3] = s >>> 24, this[l + 2] = s >>> 16, this[l + 1] = s >>> 8, this[l] = s & 255, l + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 4, 4294967295, 0), this[l] = s >>> 24, this[l + 1] = s >>> 16, this[l + 2] = s >>> 8, this[l + 3] = s & 255, l + 4;
  }, a.prototype.writeIntLE = function(s, l, w, L) {
    if (s = +s, l = l >>> 0, !L) {
      var j = Math.pow(2, 8 * w - 1);
      C(this, s, l, w, j - 1, -j);
    }
    var D = 0, te = 1, ue = 0;
    for (this[l] = s & 255; ++D < w && (te *= 256); )
      s < 0 && ue === 0 && this[l + D - 1] !== 0 && (ue = 1), this[l + D] = (s / te >> 0) - ue & 255;
    return l + w;
  }, a.prototype.writeIntBE = function(s, l, w, L) {
    if (s = +s, l = l >>> 0, !L) {
      var j = Math.pow(2, 8 * w - 1);
      C(this, s, l, w, j - 1, -j);
    }
    var D = w - 1, te = 1, ue = 0;
    for (this[l + D] = s & 255; --D >= 0 && (te *= 256); )
      s < 0 && ue === 0 && this[l + D + 1] !== 0 && (ue = 1), this[l + D] = (s / te >> 0) - ue & 255;
    return l + w;
  }, a.prototype.writeInt8 = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 1, 127, -128), s < 0 && (s = 255 + s + 1), this[l] = s & 255, l + 1;
  }, a.prototype.writeInt16LE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 2, 32767, -32768), this[l] = s & 255, this[l + 1] = s >>> 8, l + 2;
  }, a.prototype.writeInt16BE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 2, 32767, -32768), this[l] = s >>> 8, this[l + 1] = s & 255, l + 2;
  }, a.prototype.writeInt32LE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 4, 2147483647, -2147483648), this[l] = s & 255, this[l + 1] = s >>> 8, this[l + 2] = s >>> 16, this[l + 3] = s >>> 24, l + 4;
  }, a.prototype.writeInt32BE = function(s, l, w) {
    return s = +s, l = l >>> 0, w || C(this, s, l, 4, 2147483647, -2147483648), s < 0 && (s = 4294967295 + s + 1), this[l] = s >>> 24, this[l + 1] = s >>> 16, this[l + 2] = s >>> 8, this[l + 3] = s & 255, l + 4;
  };
  function q(E, s, l, w, L, j) {
    if (l + w > E.length) throw new RangeError("Index out of range");
    if (l < 0) throw new RangeError("Index out of range");
  }
  function X(E, s, l, w, L) {
    return s = +s, l = l >>> 0, L || q(E, s, l, 4), r.write(E, s, l, w, 23, 4), l + 4;
  }
  a.prototype.writeFloatLE = function(s, l, w) {
    return X(this, s, l, !0, w);
  }, a.prototype.writeFloatBE = function(s, l, w) {
    return X(this, s, l, !1, w);
  };
  function ee(E, s, l, w, L) {
    return s = +s, l = l >>> 0, L || q(E, s, l, 8), r.write(E, s, l, w, 52, 8), l + 8;
  }
  a.prototype.writeDoubleLE = function(s, l, w) {
    return ee(this, s, l, !0, w);
  }, a.prototype.writeDoubleBE = function(s, l, w) {
    return ee(this, s, l, !1, w);
  }, a.prototype.copy = function(s, l, w, L) {
    if (!a.isBuffer(s)) throw new TypeError("argument should be a Buffer");
    if (w || (w = 0), !L && L !== 0 && (L = this.length), l >= s.length && (l = s.length), l || (l = 0), L > 0 && L < w && (L = w), L === w || s.length === 0 || this.length === 0) return 0;
    if (l < 0) throw new RangeError("targetStart out of bounds");
    if (w < 0 || w >= this.length) throw new RangeError("Index out of range");
    if (L < 0) throw new RangeError("sourceEnd out of bounds");
    L > this.length && (L = this.length), s.length - l < L - w && (L = s.length - l + w);
    var j = L - w;
    return this === s && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, w, L) : Uint8Array.prototype.set.call(s, this.subarray(w, L), l), j;
  }, a.prototype.fill = function(s, l, w, L) {
    if (typeof s == "string") {
      if (typeof l == "string" ? (L = l, l = 0, w = this.length) : typeof w == "string" && (L = w, w = this.length), L !== void 0 && typeof L != "string") throw new TypeError("encoding must be a string");
      if (typeof L == "string" && !a.isEncoding(L)) throw new TypeError("Unknown encoding: " + L);
      if (s.length === 1) {
        var j = s.charCodeAt(0);
        (L === "utf8" && j < 128 || L === "latin1") && (s = j);
      }
    } else typeof s == "number" ? s = s & 255 : typeof s == "boolean" && (s = Number(s));
    if (l < 0 || this.length < l || this.length < w) throw new RangeError("Out of range index");
    if (w <= l) return this;
    l = l >>> 0, w = w === void 0 ? this.length : w >>> 0, s || (s = 0);
    var D;
    if (typeof s == "number") for (D = l; D < w; ++D) this[D] = s;
    else {
      var te = a.isBuffer(s) ? s : a.from(s, L), ue = te.length;
      if (ue === 0) throw new TypeError('The value "' + s + '" is invalid for argument "value"');
      for (D = 0; D < w - l; ++D) this[D + l] = te[D % ue];
    }
    return this;
  };
  var pe = /[^+/0-9A-Za-z-_]/g;
  function $(E) {
    if (E = E.split("=")[0], E = E.trim().replace(pe, ""), E.length < 2) return "";
    for (; E.length % 4 !== 0; ) E = E + "=";
    return E;
  }
  function B(E, s) {
    s = s || 1 / 0;
    for (var l, w = E.length, L = null, j = [], D = 0; D < w; ++D) {
      if (l = E.charCodeAt(D), l > 55295 && l < 57344) {
        if (!L) {
          if (l > 56319) {
            (s -= 3) > -1 && j.push(239, 191, 189);
            continue;
          } else if (D + 1 === w) {
            (s -= 3) > -1 && j.push(239, 191, 189);
            continue;
          }
          L = l;
          continue;
        }
        if (l < 56320) {
          (s -= 3) > -1 && j.push(239, 191, 189), L = l;
          continue;
        }
        l = (L - 55296 << 10 | l - 56320) + 65536;
      } else L && (s -= 3) > -1 && j.push(239, 191, 189);
      if (L = null, l < 128) {
        if ((s -= 1) < 0) break;
        j.push(l);
      } else if (l < 2048) {
        if ((s -= 2) < 0) break;
        j.push(l >> 6 | 192, l & 63 | 128);
      } else if (l < 65536) {
        if ((s -= 3) < 0) break;
        j.push(l >> 12 | 224, l >> 6 & 63 | 128, l & 63 | 128);
      } else if (l < 1114112) {
        if ((s -= 4) < 0) break;
        j.push(l >> 18 | 240, l >> 12 & 63 | 128, l >> 6 & 63 | 128, l & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return j;
  }
  function Y(E) {
    for (var s = [], l = 0; l < E.length; ++l) s.push(E.charCodeAt(l) & 255);
    return s;
  }
  function se(E, s) {
    for (var l, w, L, j = [], D = 0; D < E.length && !((s -= 2) < 0); ++D)
      l = E.charCodeAt(D), w = l >> 8, L = l % 256, j.push(L), j.push(w);
    return j;
  }
  function he(E) {
    return t.toByteArray($(E));
  }
  function O(E, s, l, w) {
    for (var L = 0; L < w && !(L + l >= s.length || L >= E.length); ++L)
      s[L + l] = E[L];
    return L;
  }
  function P(E, s) {
    return E instanceof s || E != null && E.constructor != null && E.constructor.name != null && E.constructor.name === s.name;
  }
  function p(E) {
    return E !== E;
  }
  var z = (function() {
    for (var E = "0123456789abcdef", s = new Array(256), l = 0; l < 16; ++l)
      for (var w = l * 16, L = 0; L < 16; ++L) s[w + L] = E[l] + E[L];
    return s;
  })();
})), _o = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var n = {}, i = /* @__PURE__ */ Symbol("test"), o = Object(i);
    if (typeof i == "string" || Object.prototype.toString.call(i) !== "[object Symbol]" || Object.prototype.toString.call(o) !== "[object Symbol]") return !1;
    var u = 42;
    n[i] = u;
    for (var a in n) return !1;
    if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0) return !1;
    var c = Object.getOwnPropertySymbols(n);
    if (c.length !== 1 || c[0] !== i || !Object.prototype.propertyIsEnumerable.call(n, i)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var h = Object.getOwnPropertyDescriptor(n, i);
      if (h.value !== u || h.enumerable !== !0) return !1;
    }
    return !0;
  };
})), Wn = /* @__PURE__ */ fe(((e, t) => {
  var r = _o();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), xo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Object;
})), up = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Error;
})), cp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = EvalError;
})), hp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = RangeError;
})), fp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = ReferenceError;
})), So = /* @__PURE__ */ fe(((e, t) => {
  t.exports = SyntaxError;
})), Fr = /* @__PURE__ */ fe(((e, t) => {
  t.exports = TypeError;
})), dp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = URIError;
})), pp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.abs;
})), mp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.floor;
})), vp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.max;
})), wp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.min;
})), gp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.pow;
})), yp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Math.round;
})), bp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Number.isNaN || function(n) {
    return n !== n;
  };
})), _p = /* @__PURE__ */ fe(((e, t) => {
  var r = bp();
  t.exports = function(i) {
    return r(i) || i === 0 ? i : i < 0 ? -1 : 1;
  };
})), xp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), nr = /* @__PURE__ */ fe(((e, t) => {
  var r = xp();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), Dr = /* @__PURE__ */ fe(((e, t) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  t.exports = r;
})), Sp = /* @__PURE__ */ fe(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, n = _o();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : n();
  };
})), Eo = /* @__PURE__ */ fe(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), ko = /* @__PURE__ */ fe(((e, t) => {
  t.exports = xo().getPrototypeOf || null;
})), Ep = /* @__PURE__ */ fe(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", n = Object.prototype.toString, i = Math.max, o = "[object Function]", u = function(f, d) {
    for (var _ = [], v = 0; v < f.length; v += 1) _[v] = f[v];
    for (var g = 0; g < d.length; g += 1) _[g + f.length] = d[g];
    return _;
  }, a = function(f, d) {
    for (var _ = [], v = d, g = 0; v < f.length; v += 1, g += 1) _[g] = f[v];
    return _;
  }, c = function(h, f) {
    for (var d = "", _ = 0; _ < h.length; _ += 1)
      d += h[_], _ + 1 < h.length && (d += f);
    return d;
  };
  t.exports = function(f) {
    var d = this;
    if (typeof d != "function" || n.apply(d) !== o) throw new TypeError(r + d);
    for (var _ = a(arguments, 1), v, g = function() {
      if (this instanceof v) {
        var k = d.apply(this, u(_, arguments));
        return Object(k) === k ? k : this;
      }
      return d.apply(f, u(_, arguments));
    }, m = i(0, d.length - _.length), b = [], x = 0; x < m; x++) b[x] = "$" + x;
    if (v = Function("binder", "return function (" + c(b, ",") + "){ return binder.apply(this,arguments); }")(g), d.prototype) {
      var y = function() {
      };
      y.prototype = d.prototype, v.prototype = new y(), y.prototype = null;
    }
    return v;
  };
})), ir = /* @__PURE__ */ fe(((e, t) => {
  var r = Ep();
  t.exports = Function.prototype.bind || r;
})), jn = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Function.prototype.call;
})), zn = /* @__PURE__ */ fe(((e, t) => {
  t.exports = Function.prototype.apply;
})), kp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), To = /* @__PURE__ */ fe(((e, t) => {
  var r = ir(), n = zn(), i = jn();
  t.exports = kp() || r.call(i, n);
})), Hn = /* @__PURE__ */ fe(((e, t) => {
  var r = ir(), n = Fr(), i = jn(), o = To();
  t.exports = function(a) {
    if (a.length < 1 || typeof a[0] != "function") throw new n("a function is required");
    return o(r, i, a);
  };
})), Tp = /* @__PURE__ */ fe(((e, t) => {
  var r = Hn(), n = nr(), i;
  try {
    i = [].__proto__ === Array.prototype;
  } catch (c) {
    if (!c || typeof c != "object" || !("code" in c) || c.code !== "ERR_PROTO_ACCESS") throw c;
  }
  var o = !!i && n && n(Object.prototype, "__proto__"), u = Object, a = u.getPrototypeOf;
  t.exports = o && typeof o.get == "function" ? r([o.get]) : typeof a == "function" ? function(h) {
    return a(h == null ? h : u(h));
  } : !1;
})), Ao = /* @__PURE__ */ fe(((e, t) => {
  var r = Eo(), n = ko(), i = Tp();
  t.exports = r ? function(u) {
    return r(u);
  } : n ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function") throw new TypeError("getProto: not an object");
    return n(u);
  } : i ? function(u) {
    return i(u);
  } : null;
})), Ap = /* @__PURE__ */ fe(((e, t) => {
  var r = Function.prototype.call, n = Object.prototype.hasOwnProperty;
  t.exports = ir().call(r, n);
})), Ro = /* @__PURE__ */ fe(((e, t) => {
  var r, n = xo(), i = up(), o = cp(), u = hp(), a = fp(), c = So(), h = Fr(), f = dp(), d = pp(), _ = mp(), v = vp(), g = wp(), m = gp(), b = yp(), x = _p(), y = Function, k = function(se) {
    try {
      return y('"use strict"; return (' + se + ").constructor;")();
    } catch {
    }
  }, T = nr(), R = Dr(), I = function() {
    throw new h();
  }, N = T ? (function() {
    try {
      return arguments.callee, I;
    } catch {
      try {
        return T(arguments, "callee").get;
      } catch {
        return I;
      }
    }
  })() : I, U = Sp()(), F = Ao(), Z = ko(), ae = Eo(), A = zn(), M = jn(), S = {}, W = typeof Uint8Array > "u" || !F ? r : F(Uint8Array), J = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": U && F ? F([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": S,
    "%AsyncGenerator%": S,
    "%AsyncGeneratorFunction%": S,
    "%AsyncIteratorPrototype%": S,
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
    "%Error%": i,
    "%eval%": eval,
    "%EvalError%": o,
    "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": y,
    "%GeneratorFunction%": S,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": U && F ? F(F([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !U || !F ? r : F((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": n,
    "%Object.getOwnPropertyDescriptor%": T,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": u,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !U || !F ? r : F((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": U && F ? F(""[Symbol.iterator]()) : r,
    "%Symbol%": U ? Symbol : r,
    "%SyntaxError%": c,
    "%ThrowTypeError%": N,
    "%TypedArray%": W,
    "%TypeError%": h,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": M,
    "%Function.prototype.apply%": A,
    "%Object.defineProperty%": R,
    "%Object.getPrototypeOf%": Z,
    "%Math.abs%": d,
    "%Math.floor%": _,
    "%Math.max%": v,
    "%Math.min%": g,
    "%Math.pow%": m,
    "%Math.round%": b,
    "%Math.sign%": x,
    "%Reflect.getPrototypeOf%": ae
  };
  if (F) try {
    null.error;
  } catch (se) {
    J["%Error.prototype%"] = F(F(se));
  }
  var K = function se(he) {
    var O;
    if (he === "%AsyncFunction%") O = k("async function () {}");
    else if (he === "%GeneratorFunction%") O = k("function* () {}");
    else if (he === "%AsyncGeneratorFunction%") O = k("async function* () {}");
    else if (he === "%AsyncGenerator%") {
      var P = se("%AsyncGeneratorFunction%");
      P && (O = P.prototype);
    } else if (he === "%AsyncIteratorPrototype%") {
      var p = se("%AsyncGenerator%");
      p && F && (O = F(p.prototype));
    }
    return J[he] = O, O;
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
  }, V = ir(), Q = Ap(), H = V.call(M, Array.prototype.concat), C = V.call(A, Array.prototype.splice), q = V.call(M, String.prototype.replace), X = V.call(M, String.prototype.slice), ee = V.call(M, RegExp.prototype.exec), pe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, $ = /\\(\\)?/g, B = function(he) {
    var O = X(he, 0, 1), P = X(he, -1);
    if (O === "%" && P !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
    if (P === "%" && O !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
    var p = [];
    return q(he, pe, function(z, E, s, l) {
      p[p.length] = s ? q(l, $, "$1") : E || z;
    }), p;
  }, Y = function(he, O) {
    var P = he, p;
    if (Q(oe, P) && (p = oe[P], P = "%" + p[0] + "%"), Q(J, P)) {
      var z = J[P];
      if (z === S && (z = K(P)), typeof z > "u" && !O) throw new h("intrinsic " + he + " exists, but is not available. Please file an issue!");
      return {
        alias: p,
        name: P,
        value: z
      };
    }
    throw new c("intrinsic " + he + " does not exist!");
  };
  t.exports = function(he, O) {
    if (typeof he != "string" || he.length === 0) throw new h("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof O != "boolean") throw new h('"allowMissing" argument must be a boolean');
    if (ee(/^%?[^%]*%?$/, he) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var P = B(he), p = P.length > 0 ? P[0] : "", z = Y("%" + p + "%", O), E = z.name, s = z.value, l = !1, w = z.alias;
    w && (p = w[0], C(P, H([0, 1], w)));
    for (var L = 1, j = !0; L < P.length; L += 1) {
      var D = P[L], te = X(D, 0, 1), ue = X(D, -1);
      if ((te === '"' || te === "'" || te === "`" || ue === '"' || ue === "'" || ue === "`") && te !== ue) throw new c("property names with quotes must have matching quotes");
      if ((D === "constructor" || !j) && (l = !0), p += "." + D, E = "%" + p + "%", Q(J, E)) s = J[E];
      else if (s != null) {
        if (!(D in s)) {
          if (!O) throw new h("base intrinsic for " + he + " exists, but the property is not available.");
          return;
        }
        if (T && L + 1 >= P.length) {
          var ie = T(s, D);
          j = !!ie, j && "get" in ie && !("originalValue" in ie.get) ? s = ie.get : s = s[D];
        } else
          j = Q(s, D), s = s[D];
        j && !l && (J[E] = s);
      }
    }
    return s;
  };
})), Co = /* @__PURE__ */ fe(((e, t) => {
  var r = Ro(), n = Hn(), i = n([r("%String.prototype.indexOf%")]);
  t.exports = function(u, a) {
    var c = r(u, !!a);
    return typeof c == "function" && i(u, ".prototype.") > -1 ? n([c]) : c;
  };
})), Rp = /* @__PURE__ */ fe(((e, t) => {
  var r = Wn()(), n = Co()("Object.prototype.toString"), i = function(c) {
    return r && c && typeof c == "object" && Symbol.toStringTag in c ? !1 : n(c) === "[object Arguments]";
  }, o = function(c) {
    return i(c) ? !0 : c !== null && typeof c == "object" && "length" in c && typeof c.length == "number" && c.length >= 0 && n(c) !== "[object Array]" && "callee" in c && n(c.callee) === "[object Function]";
  }, u = (function() {
    return i(arguments);
  })();
  i.isLegacyArguments = o, t.exports = u ? i : o;
})), Cp = /* @__PURE__ */ fe(((e, t) => {
  var r = Object.prototype.toString, n = Function.prototype.toString, i = /^\s*(?:function)?\*/, o = Wn()(), u = Object.getPrototypeOf, a = function() {
    if (!o) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, c;
  t.exports = function(f) {
    if (typeof f != "function") return !1;
    if (i.test(n.call(f))) return !0;
    if (!o) return r.call(f) === "[object GeneratorFunction]";
    if (!u) return !1;
    if (typeof c > "u") {
      var d = a();
      c = d ? u(d) : !1;
    }
    return u(f) === c;
  };
})), Ip = /* @__PURE__ */ fe(((e, t) => {
  var r = Function.prototype.toString, n = typeof Reflect == "object" && Reflect !== null && Reflect.apply, i, o;
  if (typeof n == "function" && typeof Object.defineProperty == "function") try {
    i = Object.defineProperty({}, "length", { get: function() {
      throw o;
    } }), o = {}, n(function() {
      throw 42;
    }, null, i);
  } catch (T) {
    T !== o && (n = null);
  }
  else n = null;
  var u = /^\s*class\b/, a = function(R) {
    try {
      var I = r.call(R);
      return u.test(I);
    } catch {
      return !1;
    }
  }, c = function(R) {
    try {
      return a(R) ? !1 : (r.call(R), !0);
    } catch {
      return !1;
    }
  }, h = Object.prototype.toString, f = "[object Object]", d = "[object Function]", _ = "[object GeneratorFunction]", v = "[object HTMLAllCollection]", g = "[object HTML document.all class]", m = "[object HTMLCollection]", b = typeof Symbol == "function" && !!Symbol.toStringTag, x = !(0 in [,]), y = function() {
    return !1;
  };
  if (typeof document == "object") {
    var k = document.all;
    h.call(k) === h.call(document.all) && (y = function(R) {
      if ((x || !R) && (typeof R > "u" || typeof R == "object")) try {
        var I = h.call(R);
        return (I === v || I === g || I === m || I === f) && R("") == null;
      } catch {
      }
      return !1;
    });
  }
  t.exports = n ? function(R) {
    if (y(R)) return !0;
    if (!R || typeof R != "function" && typeof R != "object") return !1;
    try {
      n(R, null, i);
    } catch (I) {
      if (I !== o) return !1;
    }
    return !a(R) && c(R);
  } : function(R) {
    if (y(R)) return !0;
    if (!R || typeof R != "function" && typeof R != "object") return !1;
    if (b) return c(R);
    if (a(R)) return !1;
    var I = h.call(R);
    return I !== d && I !== _ && !/^\[object HTML/.test(I) ? !1 : c(R);
  };
})), Pp = /* @__PURE__ */ fe(((e, t) => {
  var r = Ip(), n = Object.prototype.toString, i = Object.prototype.hasOwnProperty, o = function(f, d, _) {
    for (var v = 0, g = f.length; v < g; v++) i.call(f, v) && (_ == null ? d(f[v], v, f) : d.call(_, f[v], v, f));
  }, u = function(f, d, _) {
    for (var v = 0, g = f.length; v < g; v++) _ == null ? d(f.charAt(v), v, f) : d.call(_, f.charAt(v), v, f);
  }, a = function(f, d, _) {
    for (var v in f) i.call(f, v) && (_ == null ? d(f[v], v, f) : d.call(_, f[v], v, f));
  };
  function c(h) {
    return n.call(h) === "[object Array]";
  }
  t.exports = function(f, d, _) {
    if (!r(d)) throw new TypeError("iterator must be a function");
    var v;
    arguments.length >= 3 && (v = _), c(f) ? o(f, d, v) : typeof f == "string" ? u(f, d, v) : a(f, d, v);
  };
})), Op = /* @__PURE__ */ fe(((e, t) => {
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
})), Np = /* @__PURE__ */ fe(((e, t) => {
  Pt();
  var r = Op(), n = typeof globalThis > "u" ? Pe : globalThis;
  t.exports = function() {
    for (var o = [], u = 0; u < r.length; u++) typeof n[r[u]] == "function" && (o[o.length] = r[u]);
    return o;
  };
})), Lp = /* @__PURE__ */ fe(((e, t) => {
  var r = Dr(), n = So(), i = Fr(), o = nr();
  t.exports = function(a, c, h) {
    if (!a || typeof a != "object" && typeof a != "function") throw new i("`obj` must be an object or a function`");
    if (typeof c != "string" && typeof c != "symbol") throw new i("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new i("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new i("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new i("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new i("`loose`, if provided, must be a boolean");
    var f = arguments.length > 3 ? arguments[3] : null, d = arguments.length > 4 ? arguments[4] : null, _ = arguments.length > 5 ? arguments[5] : null, v = arguments.length > 6 ? arguments[6] : !1, g = !!o && o(a, c);
    if (r) r(a, c, {
      configurable: _ === null && g ? g.configurable : !_,
      enumerable: f === null && g ? g.enumerable : !f,
      value: h,
      writable: d === null && g ? g.writable : !d
    });
    else if (v || !f && !d && !_) a[c] = h;
    else throw new n("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), Fp = /* @__PURE__ */ fe(((e, t) => {
  var r = Dr(), n = function() {
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
})), Dp = /* @__PURE__ */ fe(((e, t) => {
  var r = Ro(), n = Lp(), i = Fp()(), o = nr(), u = Fr(), a = r("%Math.floor%");
  t.exports = function(h, f) {
    if (typeof h != "function") throw new u("`fn` is not a function");
    if (typeof f != "number" || f < 0 || f > 4294967295 || a(f) !== f) throw new u("`length` must be a positive 32-bit integer");
    var d = arguments.length > 2 && !!arguments[2], _ = !0, v = !0;
    if ("length" in h && o) {
      var g = o(h, "length");
      g && !g.configurable && (_ = !1), g && !g.writable && (v = !1);
    }
    return (_ || v || !d) && (i ? n(h, "length", f, !0, !0) : n(h, "length", f)), h;
  };
})), Bp = /* @__PURE__ */ fe(((e, t) => {
  var r = ir(), n = zn(), i = To();
  t.exports = function() {
    return i(r, n, arguments);
  };
})), Mp = /* @__PURE__ */ fe(((e, t) => {
  var r = Dp(), n = Dr(), i = Hn(), o = Bp();
  t.exports = function(a) {
    var c = i(arguments), h = a.length - (arguments.length - 1);
    return r(c, 1 + (h > 0 ? h : 0), !0);
  }, n ? n(t.exports, "apply", { value: o }) : t.exports.apply = o;
})), Io = /* @__PURE__ */ fe(((e, t) => {
  Pt();
  var r = Pp(), n = Np(), i = Mp(), o = Co(), u = nr(), a = Ao(), c = o("Object.prototype.toString"), h = Wn()(), f = typeof globalThis > "u" ? Pe : globalThis, d = n(), _ = o("String.prototype.slice"), v = o("Array.prototype.indexOf", !0) || function(y, k) {
    for (var T = 0; T < y.length; T += 1) if (y[T] === k) return T;
    return -1;
  }, g = { __proto__: null };
  h && u && a ? r(d, function(x) {
    var y = new f[x]();
    if (Symbol.toStringTag in y && a) {
      var k = a(y), T = u(k, Symbol.toStringTag);
      !T && k && (T = u(a(k), Symbol.toStringTag)), g["$" + x] = i(T.get);
    }
  }) : r(d, function(x) {
    var y = new f[x](), k = y.slice || y.set;
    k && (g["$" + x] = i(k));
  });
  var m = function(y) {
    var k = !1;
    return r(
      g,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(T, R) {
        if (!k) try {
          "$" + T(y) === R && (k = _(R, 1));
        } catch {
        }
      }
    ), k;
  }, b = function(y) {
    var k = !1;
    return r(
      g,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(T, R) {
        if (!k) try {
          T(y), k = _(R, 1);
        } catch {
        }
      }
    ), k;
  };
  t.exports = function(y) {
    if (!y || typeof y != "object") return !1;
    if (!h) {
      var k = _(c(y), 8, -1);
      return v(d, k) > -1 ? k : k !== "Object" ? !1 : b(y);
    }
    return u ? m(y) : null;
  };
})), Up = /* @__PURE__ */ fe(((e, t) => {
  var r = Io();
  t.exports = function(i) {
    return !!r(i);
  };
})), Wp = /* @__PURE__ */ fe(((e) => {
  var t = Rp(), r = Cp(), n = Io(), i = Up();
  function o(w) {
    return w.call.bind(w);
  }
  var u = typeof BigInt < "u", a = typeof Symbol < "u", c = o(Object.prototype.toString), h = o(Number.prototype.valueOf), f = o(String.prototype.valueOf), d = o(Boolean.prototype.valueOf);
  if (u) var _ = o(BigInt.prototype.valueOf);
  if (a) var v = o(Symbol.prototype.valueOf);
  function g(w, L) {
    if (typeof w != "object") return !1;
    try {
      return L(w), !0;
    } catch {
      return !1;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = i;
  function m(w) {
    return typeof Promise < "u" && w instanceof Promise || w !== null && typeof w == "object" && typeof w.then == "function" && typeof w.catch == "function";
  }
  e.isPromise = m;
  function b(w) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(w) : i(w) || q(w);
  }
  e.isArrayBufferView = b;
  function x(w) {
    return n(w) === "Uint8Array";
  }
  e.isUint8Array = x;
  function y(w) {
    return n(w) === "Uint8ClampedArray";
  }
  e.isUint8ClampedArray = y;
  function k(w) {
    return n(w) === "Uint16Array";
  }
  e.isUint16Array = k;
  function T(w) {
    return n(w) === "Uint32Array";
  }
  e.isUint32Array = T;
  function R(w) {
    return n(w) === "Int8Array";
  }
  e.isInt8Array = R;
  function I(w) {
    return n(w) === "Int16Array";
  }
  e.isInt16Array = I;
  function N(w) {
    return n(w) === "Int32Array";
  }
  e.isInt32Array = N;
  function U(w) {
    return n(w) === "Float32Array";
  }
  e.isFloat32Array = U;
  function F(w) {
    return n(w) === "Float64Array";
  }
  e.isFloat64Array = F;
  function Z(w) {
    return n(w) === "BigInt64Array";
  }
  e.isBigInt64Array = Z;
  function ae(w) {
    return n(w) === "BigUint64Array";
  }
  e.isBigUint64Array = ae;
  function A(w) {
    return c(w) === "[object Map]";
  }
  A.working = typeof Map < "u" && A(/* @__PURE__ */ new Map());
  function M(w) {
    return typeof Map > "u" ? !1 : A.working ? A(w) : w instanceof Map;
  }
  e.isMap = M;
  function S(w) {
    return c(w) === "[object Set]";
  }
  S.working = typeof Set < "u" && S(/* @__PURE__ */ new Set());
  function W(w) {
    return typeof Set > "u" ? !1 : S.working ? S(w) : w instanceof Set;
  }
  e.isSet = W;
  function J(w) {
    return c(w) === "[object WeakMap]";
  }
  J.working = typeof WeakMap < "u" && J(/* @__PURE__ */ new WeakMap());
  function K(w) {
    return typeof WeakMap > "u" ? !1 : J.working ? J(w) : w instanceof WeakMap;
  }
  e.isWeakMap = K;
  function oe(w) {
    return c(w) === "[object WeakSet]";
  }
  oe.working = typeof WeakSet < "u" && oe(/* @__PURE__ */ new WeakSet());
  function V(w) {
    return oe(w);
  }
  e.isWeakSet = V;
  function Q(w) {
    return c(w) === "[object ArrayBuffer]";
  }
  Q.working = typeof ArrayBuffer < "u" && Q(/* @__PURE__ */ new ArrayBuffer());
  function H(w) {
    return typeof ArrayBuffer > "u" ? !1 : Q.working ? Q(w) : w instanceof ArrayBuffer;
  }
  e.isArrayBuffer = H;
  function C(w) {
    return c(w) === "[object DataView]";
  }
  C.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && C(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function q(w) {
    return typeof DataView > "u" ? !1 : C.working ? C(w) : w instanceof DataView;
  }
  e.isDataView = q;
  var X = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function ee(w) {
    return c(w) === "[object SharedArrayBuffer]";
  }
  function pe(w) {
    return typeof X > "u" ? !1 : (typeof ee.working > "u" && (ee.working = ee(new X())), ee.working ? ee(w) : w instanceof X);
  }
  e.isSharedArrayBuffer = pe;
  function $(w) {
    return c(w) === "[object AsyncFunction]";
  }
  e.isAsyncFunction = $;
  function B(w) {
    return c(w) === "[object Map Iterator]";
  }
  e.isMapIterator = B;
  function Y(w) {
    return c(w) === "[object Set Iterator]";
  }
  e.isSetIterator = Y;
  function se(w) {
    return c(w) === "[object Generator]";
  }
  e.isGeneratorObject = se;
  function he(w) {
    return c(w) === "[object WebAssembly.Module]";
  }
  e.isWebAssemblyCompiledModule = he;
  function O(w) {
    return g(w, h);
  }
  e.isNumberObject = O;
  function P(w) {
    return g(w, f);
  }
  e.isStringObject = P;
  function p(w) {
    return g(w, d);
  }
  e.isBooleanObject = p;
  function z(w) {
    return u && g(w, _);
  }
  e.isBigIntObject = z;
  function E(w) {
    return a && g(w, v);
  }
  e.isSymbolObject = E;
  function s(w) {
    return O(w) || P(w) || p(w) || z(w) || E(w);
  }
  e.isBoxedPrimitive = s;
  function l(w) {
    return typeof Uint8Array < "u" && (H(w) || pe(w));
  }
  e.isAnyArrayBuffer = l, [
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
  ].forEach(function(w) {
    Object.defineProperty(e, w, {
      enumerable: !1,
      value: function() {
        throw new Error(w + " is not supported in userland");
      }
    });
  });
})), jp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function(n) {
    return n && typeof n == "object" && typeof n.copy == "function" && typeof n.fill == "function" && typeof n.readUInt8 == "function";
  };
})), Po = /* @__PURE__ */ fe(((e) => {
  _t();
  var t = Object.getOwnPropertyDescriptors || function(q) {
    for (var X = Object.keys(q), ee = {}, pe = 0; pe < X.length; pe++) ee[X[pe]] = Object.getOwnPropertyDescriptor(q, X[pe]);
    return ee;
  }, r = /%[sdj%]/g;
  e.format = function(C) {
    if (!R(C)) {
      for (var q = [], X = 0; X < arguments.length; X++) q.push(u(arguments[X]));
      return q.join(" ");
    }
    for (var X = 1, ee = arguments, pe = ee.length, $ = String(C).replace(r, function(Y) {
      if (Y === "%%") return "%";
      if (X >= pe) return Y;
      switch (Y) {
        case "%s":
          return String(ee[X++]);
        case "%d":
          return Number(ee[X++]);
        case "%j":
          try {
            return JSON.stringify(ee[X++]);
          } catch {
            return "[Circular]";
          }
        default:
          return Y;
      }
    }), B = ee[X]; X < pe; B = ee[++X]) y(B) || !F(B) ? $ += " " + B : $ += " " + u(B);
    return $;
  }, e.deprecate = function(C, q) {
    if (typeof ge < "u" && ge.noDeprecation === !0) return C;
    if (typeof ge > "u") return function() {
      return e.deprecate(C, q).apply(this, arguments);
    };
    var X = !1;
    function ee() {
      if (!X) {
        if (ge.throwDeprecation) throw new Error(q);
        ge.traceDeprecation ? console.trace(q) : console.error(q), X = !0;
      }
      return C.apply(this, arguments);
    }
    return ee;
  };
  var n = {}, i = /^$/;
  if (ge.env.NODE_DEBUG) {
    var o = ge.env.NODE_DEBUG;
    o = o.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), i = new RegExp("^" + o + "$", "i");
  }
  e.debuglog = function(C) {
    if (C = C.toUpperCase(), !n[C])
      if (i.test(C)) {
        var q = ge.pid;
        n[C] = function() {
          var X = e.format.apply(e, arguments);
          console.error("%s %d: %s", C, q, X);
        };
      } else n[C] = function() {
      };
    return n[C];
  };
  function u(C, q) {
    var X = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (X.depth = arguments[2]), arguments.length >= 4 && (X.colors = arguments[3]), x(q) ? X.showHidden = q : q && e._extend(X, q), N(X.showHidden) && (X.showHidden = !1), N(X.depth) && (X.depth = 2), N(X.colors) && (X.colors = !1), N(X.customInspect) && (X.customInspect = !0), X.colors && (X.stylize = a), f(X, C, X.depth);
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
  function a(C, q) {
    var X = u.styles[q];
    return X ? "\x1B[" + u.colors[X][0] + "m" + C + "\x1B[" + u.colors[X][1] + "m" : C;
  }
  function c(C, q) {
    return C;
  }
  function h(C) {
    var q = {};
    return C.forEach(function(X, ee) {
      q[X] = !0;
    }), q;
  }
  function f(C, q, X) {
    if (C.customInspect && q && A(q.inspect) && q.inspect !== e.inspect && !(q.constructor && q.constructor.prototype === q)) {
      var ee = q.inspect(X, C);
      return R(ee) || (ee = f(C, ee, X)), ee;
    }
    var pe = d(C, q);
    if (pe) return pe;
    var $ = Object.keys(q), B = h($);
    if (C.showHidden && ($ = Object.getOwnPropertyNames(q)), ae(q) && ($.indexOf("message") >= 0 || $.indexOf("description") >= 0)) return _(q);
    if ($.length === 0) {
      if (A(q)) {
        var Y = q.name ? ": " + q.name : "";
        return C.stylize("[Function" + Y + "]", "special");
      }
      if (U(q)) return C.stylize(RegExp.prototype.toString.call(q), "regexp");
      if (Z(q)) return C.stylize(Date.prototype.toString.call(q), "date");
      if (ae(q)) return _(q);
    }
    var se = "", he = !1, O = ["{", "}"];
    if (b(q) && (he = !0, O = ["[", "]"]), A(q) && (se = " [Function" + (q.name ? ": " + q.name : "") + "]"), U(q) && (se = " " + RegExp.prototype.toString.call(q)), Z(q) && (se = " " + Date.prototype.toUTCString.call(q)), ae(q) && (se = " " + _(q)), $.length === 0 && (!he || q.length == 0)) return O[0] + se + O[1];
    if (X < 0)
      return U(q) ? C.stylize(RegExp.prototype.toString.call(q), "regexp") : C.stylize("[Object]", "special");
    C.seen.push(q);
    var P;
    return he ? P = v(C, q, X, B, $) : P = $.map(function(p) {
      return g(C, q, X, B, p, he);
    }), C.seen.pop(), m(P, se, O);
  }
  function d(C, q) {
    if (N(q)) return C.stylize("undefined", "undefined");
    if (R(q)) {
      var X = "'" + JSON.stringify(q).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return C.stylize(X, "string");
    }
    if (T(q)) return C.stylize("" + q, "number");
    if (x(q)) return C.stylize("" + q, "boolean");
    if (y(q)) return C.stylize("null", "null");
  }
  function _(C) {
    return "[" + Error.prototype.toString.call(C) + "]";
  }
  function v(C, q, X, ee, pe) {
    for (var $ = [], B = 0, Y = q.length; B < Y; ++B) oe(q, String(B)) ? $.push(g(C, q, X, ee, String(B), !0)) : $.push("");
    return pe.forEach(function(se) {
      se.match(/^\d+$/) || $.push(g(C, q, X, ee, se, !0));
    }), $;
  }
  function g(C, q, X, ee, pe, $) {
    var B, Y, se = Object.getOwnPropertyDescriptor(q, pe) || { value: q[pe] };
    if (se.get ? se.set ? Y = C.stylize("[Getter/Setter]", "special") : Y = C.stylize("[Getter]", "special") : se.set && (Y = C.stylize("[Setter]", "special")), oe(ee, pe) || (B = "[" + pe + "]"), Y || (C.seen.indexOf(se.value) < 0 ? (y(X) ? Y = f(C, se.value, null) : Y = f(C, se.value, X - 1), Y.indexOf(`
`) > -1 && ($ ? Y = Y.split(`
`).map(function(he) {
      return "  " + he;
    }).join(`
`).slice(2) : Y = `
` + Y.split(`
`).map(function(he) {
      return "   " + he;
    }).join(`
`))) : Y = C.stylize("[Circular]", "special")), N(B)) {
      if ($ && pe.match(/^\d+$/)) return Y;
      B = JSON.stringify("" + pe), B.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (B = B.slice(1, -1), B = C.stylize(B, "name")) : (B = B.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), B = C.stylize(B, "string"));
    }
    return B + ": " + Y;
  }
  function m(C, q, X) {
    return C.reduce(function(ee, pe) {
      return pe.indexOf(`
`) >= 0, ee + pe.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? X[0] + (q === "" ? "" : q + `
 `) + " " + C.join(`,
  `) + " " + X[1] : X[0] + q + " " + C.join(", ") + " " + X[1];
  }
  e.types = Wp();
  function b(C) {
    return Array.isArray(C);
  }
  e.isArray = b;
  function x(C) {
    return typeof C == "boolean";
  }
  e.isBoolean = x;
  function y(C) {
    return C === null;
  }
  e.isNull = y;
  function k(C) {
    return C == null;
  }
  e.isNullOrUndefined = k;
  function T(C) {
    return typeof C == "number";
  }
  e.isNumber = T;
  function R(C) {
    return typeof C == "string";
  }
  e.isString = R;
  function I(C) {
    return typeof C == "symbol";
  }
  e.isSymbol = I;
  function N(C) {
    return C === void 0;
  }
  e.isUndefined = N;
  function U(C) {
    return F(C) && S(C) === "[object RegExp]";
  }
  e.isRegExp = U, e.types.isRegExp = U;
  function F(C) {
    return typeof C == "object" && C !== null;
  }
  e.isObject = F;
  function Z(C) {
    return F(C) && S(C) === "[object Date]";
  }
  e.isDate = Z, e.types.isDate = Z;
  function ae(C) {
    return F(C) && (S(C) === "[object Error]" || C instanceof Error);
  }
  e.isError = ae, e.types.isNativeError = ae;
  function A(C) {
    return typeof C == "function";
  }
  e.isFunction = A;
  function M(C) {
    return C === null || typeof C == "boolean" || typeof C == "number" || typeof C == "string" || typeof C == "symbol" || typeof C > "u";
  }
  e.isPrimitive = M, e.isBuffer = jp();
  function S(C) {
    return Object.prototype.toString.call(C);
  }
  function W(C) {
    return C < 10 ? "0" + C.toString(10) : C.toString(10);
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
  function K() {
    var C = /* @__PURE__ */ new Date(), q = [
      W(C.getHours()),
      W(C.getMinutes()),
      W(C.getSeconds())
    ].join(":");
    return [
      C.getDate(),
      J[C.getMonth()],
      q
    ].join(" ");
  }
  e.log = function() {
    console.log("%s - %s", K(), e.format.apply(e, arguments));
  }, e.inherits = ht(), e._extend = function(C, q) {
    if (!q || !F(q)) return C;
    for (var X = Object.keys(q), ee = X.length; ee--; ) C[X[ee]] = q[X[ee]];
    return C;
  };
  function oe(C, q) {
    return Object.prototype.hasOwnProperty.call(C, q);
  }
  var V = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
  e.promisify = function(q) {
    if (typeof q != "function") throw new TypeError('The "original" argument must be of type Function');
    if (V && q[V]) {
      var X = q[V];
      if (typeof X != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(X, V, {
        value: X,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), X;
    }
    function X() {
      for (var ee, pe, $ = new Promise(function(se, he) {
        ee = se, pe = he;
      }), B = [], Y = 0; Y < arguments.length; Y++) B.push(arguments[Y]);
      B.push(function(se, he) {
        se ? pe(se) : ee(he);
      });
      try {
        q.apply(this, B);
      } catch (se) {
        pe(se);
      }
      return $;
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(q)), V && Object.defineProperty(X, V, {
      value: X,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(X, t(q));
  }, e.promisify.custom = V;
  function Q(C, q) {
    if (!C) {
      var X = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      X.reason = C, C = X;
    }
    return q(C);
  }
  function H(C) {
    if (typeof C != "function") throw new TypeError('The "original" argument must be of type Function');
    function q() {
      for (var X = [], ee = 0; ee < arguments.length; ee++) X.push(arguments[ee]);
      var pe = X.pop();
      if (typeof pe != "function") throw new TypeError("The last argument must be of type Function");
      var $ = this, B = function() {
        return pe.apply($, arguments);
      };
      C.apply(this, X).then(function(Y) {
        ge.nextTick(B.bind(null, null, Y));
      }, function(Y) {
        ge.nextTick(Q.bind(null, Y, B));
      });
    }
    return Object.setPrototypeOf(q, Object.getPrototypeOf(C)), Object.defineProperties(q, t(C)), q;
  }
  e.callbackify = H;
})), zp = /* @__PURE__ */ fe(((e, t) => {
  function r(g, m) {
    var b = Object.keys(g);
    if (Object.getOwnPropertySymbols) {
      var x = Object.getOwnPropertySymbols(g);
      m && (x = x.filter(function(y) {
        return Object.getOwnPropertyDescriptor(g, y).enumerable;
      })), b.push.apply(b, x);
    }
    return b;
  }
  function n(g) {
    for (var m = 1; m < arguments.length; m++) {
      var b = arguments[m] != null ? arguments[m] : {};
      m % 2 ? r(Object(b), !0).forEach(function(x) {
        i(g, x, b[x]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(g, Object.getOwnPropertyDescriptors(b)) : r(Object(b)).forEach(function(x) {
        Object.defineProperty(g, x, Object.getOwnPropertyDescriptor(b, x));
      });
    }
    return g;
  }
  function i(g, m, b) {
    return m = c(m), m in g ? Object.defineProperty(g, m, {
      value: b,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : g[m] = b, g;
  }
  function o(g, m) {
    if (!(g instanceof m)) throw new TypeError("Cannot call a class as a function");
  }
  function u(g, m) {
    for (var b = 0; b < m.length; b++) {
      var x = m[b];
      x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(g, c(x.key), x);
    }
  }
  function a(g, m, b) {
    return m && u(g.prototype, m), Object.defineProperty(g, "prototype", { writable: !1 }), g;
  }
  function c(g) {
    var m = h(g, "string");
    return typeof m == "symbol" ? m : String(m);
  }
  function h(g, m) {
    if (typeof g != "object" || g === null) return g;
    var b = g[Symbol.toPrimitive];
    if (b !== void 0) {
      var x = b.call(g, m);
      if (typeof x != "object") return x;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(g);
  }
  var f = Lr().Buffer, d = Po().inspect, _ = d && d.custom || "inspect";
  function v(g, m, b) {
    f.prototype.copy.call(g, m, b);
  }
  t.exports = /* @__PURE__ */ (function() {
    function g() {
      o(this, g), this.head = null, this.tail = null, this.length = 0;
    }
    return a(g, [
      {
        key: "push",
        value: function(b) {
          var x = {
            data: b,
            next: null
          };
          this.length > 0 ? this.tail.next = x : this.head = x, this.tail = x, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(b) {
          var x = {
            data: b,
            next: this.head
          };
          this.length === 0 && (this.tail = x), this.head = x, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var b = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, b;
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
        value: function(b) {
          if (this.length === 0) return "";
          for (var x = this.head, y = "" + x.data; x = x.next; ) y += b + x.data;
          return y;
        }
      },
      {
        key: "concat",
        value: function(b) {
          if (this.length === 0) return f.alloc(0);
          for (var x = f.allocUnsafe(b >>> 0), y = this.head, k = 0; y; )
            v(y.data, x, k), k += y.data.length, y = y.next;
          return x;
        }
      },
      {
        key: "consume",
        value: function(b, x) {
          var y;
          return b < this.head.data.length ? (y = this.head.data.slice(0, b), this.head.data = this.head.data.slice(b)) : b === this.head.data.length ? y = this.shift() : y = x ? this._getString(b) : this._getBuffer(b), y;
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
        value: function(b) {
          var x = this.head, y = 1, k = x.data;
          for (b -= k.length; x = x.next; ) {
            var T = x.data, R = b > T.length ? T.length : b;
            if (R === T.length ? k += T : k += T.slice(0, b), b -= R, b === 0) {
              R === T.length ? (++y, x.next ? this.head = x.next : this.head = this.tail = null) : (this.head = x, x.data = T.slice(R));
              break;
            }
            ++y;
          }
          return this.length -= y, k;
        }
      },
      {
        key: "_getBuffer",
        value: function(b) {
          var x = f.allocUnsafe(b), y = this.head, k = 1;
          for (y.data.copy(x), b -= y.data.length; y = y.next; ) {
            var T = y.data, R = b > T.length ? T.length : b;
            if (T.copy(x, x.length - b, 0, R), b -= R, b === 0) {
              R === T.length ? (++k, y.next ? this.head = y.next : this.head = this.tail = null) : (this.head = y, y.data = T.slice(R));
              break;
            }
            ++k;
          }
          return this.length -= k, x;
        }
      },
      {
        key: _,
        value: function(b, x) {
          return d(this, n(n({}, x), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), g;
  })();
})), Oo = /* @__PURE__ */ fe(((e, t) => {
  _t();
  function r(c, h) {
    var f = this, d = this._readableState && this._readableState.destroyed, _ = this._writableState && this._writableState.destroyed;
    return d || _ ? (h ? h(c) : c && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ge.nextTick(u, this, c)) : ge.nextTick(u, this, c)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(c || null, function(v) {
      !h && v ? f._writableState ? f._writableState.errorEmitted ? ge.nextTick(i, f) : (f._writableState.errorEmitted = !0, ge.nextTick(n, f, v)) : ge.nextTick(n, f, v) : h ? (ge.nextTick(i, f), h(v)) : ge.nextTick(i, f);
    }), this);
  }
  function n(c, h) {
    u(c, h), i(c);
  }
  function i(c) {
    c._writableState && !c._writableState.emitClose || c._readableState && !c._readableState.emitClose || c.emit("close");
  }
  function o() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function u(c, h) {
    c.emit("error", h);
  }
  function a(c, h) {
    var f = c._readableState, d = c._writableState;
    f && f.autoDestroy || d && d.autoDestroy ? c.destroy(h) : c.emit("error", h);
  }
  t.exports = {
    destroy: r,
    undestroy: o,
    errorOrDestroy: a
  };
})), Ot = /* @__PURE__ */ fe(((e, t) => {
  function r(h, f) {
    h.prototype = Object.create(f.prototype), h.prototype.constructor = h, h.__proto__ = f;
  }
  var n = {};
  function i(h, f, d) {
    d || (d = Error);
    function _(g, m, b) {
      return typeof f == "string" ? f : f(g, m, b);
    }
    var v = /* @__PURE__ */ (function(g) {
      r(m, g);
      function m(b, x, y) {
        return g.call(this, _(b, x, y)) || this;
      }
      return m;
    })(d);
    v.prototype.name = d.name, v.prototype.code = h, n[h] = v;
  }
  function o(h, f) {
    if (Array.isArray(h)) {
      var d = h.length;
      return h = h.map(function(_) {
        return String(_);
      }), d > 2 ? "one of ".concat(f, " ").concat(h.slice(0, d - 1).join(", "), ", or ") + h[d - 1] : d === 2 ? "one of ".concat(f, " ").concat(h[0], " or ").concat(h[1]) : "of ".concat(f, " ").concat(h[0]);
    } else return "of ".concat(f, " ").concat(String(h));
  }
  function u(h, f, d) {
    return h.substr(0, f.length) === f;
  }
  function a(h, f, d) {
    return (d === void 0 || d > h.length) && (d = h.length), h.substring(d - f.length, d) === f;
  }
  function c(h, f, d) {
    return typeof d != "number" && (d = 0), d + f.length > h.length ? !1 : h.indexOf(f, d) !== -1;
  }
  i("ERR_INVALID_OPT_VALUE", function(h, f) {
    return 'The value "' + f + '" is invalid for option "' + h + '"';
  }, TypeError), i("ERR_INVALID_ARG_TYPE", function(h, f, d) {
    var _;
    typeof f == "string" && u(f, "not ") ? (_ = "must not be", f = f.replace(/^not /, "")) : _ = "must be";
    var v;
    if (a(h, " argument")) v = "The ".concat(h, " ").concat(_, " ").concat(o(f, "type"));
    else {
      var g = c(h, ".") ? "property" : "argument";
      v = 'The "'.concat(h, '" ').concat(g, " ").concat(_, " ").concat(o(f, "type"));
    }
    return v += ". Received type ".concat(typeof d), v;
  }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function(h) {
    return "The " + h + " method is not implemented";
  }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function(h) {
    return "Cannot call " + h + " after a stream was destroyed";
  }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function(h) {
    return "Unknown encoding: " + h;
  }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
})), No = /* @__PURE__ */ fe(((e, t) => {
  var r = Ot().codes.ERR_INVALID_OPT_VALUE;
  function n(o, u, a) {
    return o.highWaterMark != null ? o.highWaterMark : u ? o[a] : null;
  }
  function i(o, u, a, c) {
    var h = n(u, c, a);
    if (h != null) {
      if (!(isFinite(h) && Math.floor(h) === h) || h < 0) throw new r(c ? a : "highWaterMark", h);
      return Math.floor(h);
    }
    return o.objectMode ? 16 : 16384;
  }
  t.exports = { getHighWaterMark: i };
})), Hp = /* @__PURE__ */ fe(((e, t) => {
  Pt(), t.exports = r;
  function r(i, o) {
    if (n("noDeprecation")) return i;
    var u = !1;
    function a() {
      if (!u) {
        if (n("throwDeprecation")) throw new Error(o);
        n("traceDeprecation") ? console.trace(o) : console.warn(o), u = !0;
      }
      return i.apply(this, arguments);
    }
    return a;
  }
  function n(i) {
    try {
      if (!Pe.localStorage) return !1;
    } catch {
      return !1;
    }
    var o = Pe.localStorage[i];
    return o == null ? !1 : String(o).toLowerCase() === "true";
  }
})), Lo = /* @__PURE__ */ fe(((e, t) => {
  Pt(), _t(), t.exports = F;
  function r($) {
    var B = this;
    this.next = null, this.entry = null, this.finish = function() {
      pe(B, $);
    };
  }
  var n;
  F.WritableState = N;
  var i = { deprecate: Hp() }, o = bo(), u = Lr().Buffer, a = (typeof Pe < "u" ? Pe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c($) {
    return u.from($);
  }
  function h($) {
    return u.isBuffer($) || $ instanceof a;
  }
  var f = Oo(), d = No().getHighWaterMark, _ = Ot().codes, v = _.ERR_INVALID_ARG_TYPE, g = _.ERR_METHOD_NOT_IMPLEMENTED, m = _.ERR_MULTIPLE_CALLBACK, b = _.ERR_STREAM_CANNOT_PIPE, x = _.ERR_STREAM_DESTROYED, y = _.ERR_STREAM_NULL_VALUES, k = _.ERR_STREAM_WRITE_AFTER_END, T = _.ERR_UNKNOWN_ENCODING, R = f.errorOrDestroy;
  ht()(F, o);
  function I() {
  }
  function N($, B, Y) {
    n = n || Ct(), $ = $ || {}, typeof Y != "boolean" && (Y = B instanceof n), this.objectMode = !!$.objectMode, Y && (this.objectMode = this.objectMode || !!$.writableObjectMode), this.highWaterMark = d(this, $, "writableHighWaterMark", Y), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var se = $.decodeStrings === !1;
    this.decodeStrings = !se, this.defaultEncoding = $.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(he) {
      K(B, he);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = $.emitClose !== !1, this.autoDestroy = !!$.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  N.prototype.getBuffer = function() {
    for (var B = this.bufferedRequest, Y = []; B; )
      Y.push(B), B = B.next;
    return Y;
  }, (function() {
    try {
      Object.defineProperty(N.prototype, "buffer", { get: i.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var U;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (U = Function.prototype[Symbol.hasInstance], Object.defineProperty(F, Symbol.hasInstance, { value: function(B) {
    return U.call(this, B) ? !0 : this !== F ? !1 : B && B._writableState instanceof N;
  } })) : U = function(B) {
    return B instanceof this;
  };
  function F($) {
    n = n || Ct();
    var B = this instanceof n;
    if (!B && !U.call(F, this)) return new F($);
    this._writableState = new N($, this, B), this.writable = !0, $ && (typeof $.write == "function" && (this._write = $.write), typeof $.writev == "function" && (this._writev = $.writev), typeof $.destroy == "function" && (this._destroy = $.destroy), typeof $.final == "function" && (this._final = $.final)), o.call(this);
  }
  F.prototype.pipe = function() {
    R(this, new b());
  };
  function Z($, B) {
    var Y = new k();
    R($, Y), ge.nextTick(B, Y);
  }
  function ae($, B, Y, se) {
    var he;
    return Y === null ? he = new y() : typeof Y != "string" && !B.objectMode && (he = new v("chunk", ["string", "Buffer"], Y)), he ? (R($, he), ge.nextTick(se, he), !1) : !0;
  }
  F.prototype.write = function($, B, Y) {
    var se = this._writableState, he = !1, O = !se.objectMode && h($);
    return O && !u.isBuffer($) && ($ = c($)), typeof B == "function" && (Y = B, B = null), O ? B = "buffer" : B || (B = se.defaultEncoding), typeof Y != "function" && (Y = I), se.ending ? Z(this, Y) : (O || ae(this, se, $, Y)) && (se.pendingcb++, he = M(this, se, O, $, B, Y)), he;
  }, F.prototype.cork = function() {
    this._writableState.corked++;
  }, F.prototype.uncork = function() {
    var $ = this._writableState;
    $.corked && ($.corked--, !$.writing && !$.corked && !$.bufferProcessing && $.bufferedRequest && Q(this, $));
  }, F.prototype.setDefaultEncoding = function(B) {
    if (typeof B == "string" && (B = B.toLowerCase()), !([
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
    ].indexOf((B + "").toLowerCase()) > -1)) throw new T(B);
    return this._writableState.defaultEncoding = B, this;
  }, Object.defineProperty(F.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function A($, B, Y) {
    return !$.objectMode && $.decodeStrings !== !1 && typeof B == "string" && (B = u.from(B, Y)), B;
  }
  Object.defineProperty(F.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function M($, B, Y, se, he, O) {
    if (!Y) {
      var P = A(B, se, he);
      se !== P && (Y = !0, he = "buffer", se = P);
    }
    var p = B.objectMode ? 1 : se.length;
    B.length += p;
    var z = B.length < B.highWaterMark;
    if (z || (B.needDrain = !0), B.writing || B.corked) {
      var E = B.lastBufferedRequest;
      B.lastBufferedRequest = {
        chunk: se,
        encoding: he,
        isBuf: Y,
        callback: O,
        next: null
      }, E ? E.next = B.lastBufferedRequest : B.bufferedRequest = B.lastBufferedRequest, B.bufferedRequestCount += 1;
    } else S($, B, !1, p, se, he, O);
    return z;
  }
  function S($, B, Y, se, he, O, P) {
    B.writelen = se, B.writecb = P, B.writing = !0, B.sync = !0, B.destroyed ? B.onwrite(new x("write")) : Y ? $._writev(he, B.onwrite) : $._write(he, O, B.onwrite), B.sync = !1;
  }
  function W($, B, Y, se, he) {
    --B.pendingcb, Y ? (ge.nextTick(he, se), ge.nextTick(X, $, B), $._writableState.errorEmitted = !0, R($, se)) : (he(se), $._writableState.errorEmitted = !0, R($, se), X($, B));
  }
  function J($) {
    $.writing = !1, $.writecb = null, $.length -= $.writelen, $.writelen = 0;
  }
  function K($, B) {
    var Y = $._writableState, se = Y.sync, he = Y.writecb;
    if (typeof he != "function") throw new m();
    if (J(Y), B) W($, Y, se, B, he);
    else {
      var O = H(Y) || $.destroyed;
      !O && !Y.corked && !Y.bufferProcessing && Y.bufferedRequest && Q($, Y), se ? ge.nextTick(oe, $, Y, O, he) : oe($, Y, O, he);
    }
  }
  function oe($, B, Y, se) {
    Y || V($, B), B.pendingcb--, se(), X($, B);
  }
  function V($, B) {
    B.length === 0 && B.needDrain && (B.needDrain = !1, $.emit("drain"));
  }
  function Q($, B) {
    B.bufferProcessing = !0;
    var Y = B.bufferedRequest;
    if ($._writev && Y && Y.next) {
      var se = B.bufferedRequestCount, he = new Array(se), O = B.corkedRequestsFree;
      O.entry = Y;
      for (var P = 0, p = !0; Y; )
        he[P] = Y, Y.isBuf || (p = !1), Y = Y.next, P += 1;
      he.allBuffers = p, S($, B, !0, B.length, he, "", O.finish), B.pendingcb++, B.lastBufferedRequest = null, O.next ? (B.corkedRequestsFree = O.next, O.next = null) : B.corkedRequestsFree = new r(B), B.bufferedRequestCount = 0;
    } else {
      for (; Y; ) {
        var z = Y.chunk, E = Y.encoding, s = Y.callback;
        if (S($, B, !1, B.objectMode ? 1 : z.length, z, E, s), Y = Y.next, B.bufferedRequestCount--, B.writing) break;
      }
      Y === null && (B.lastBufferedRequest = null);
    }
    B.bufferedRequest = Y, B.bufferProcessing = !1;
  }
  F.prototype._write = function($, B, Y) {
    Y(new g("_write()"));
  }, F.prototype._writev = null, F.prototype.end = function($, B, Y) {
    var se = this._writableState;
    return typeof $ == "function" ? (Y = $, $ = null, B = null) : typeof B == "function" && (Y = B, B = null), $ != null && this.write($, B), se.corked && (se.corked = 1, this.uncork()), se.ending || ee(this, se, Y), this;
  }, Object.defineProperty(F.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function H($) {
    return $.ending && $.length === 0 && $.bufferedRequest === null && !$.finished && !$.writing;
  }
  function C($, B) {
    $._final(function(Y) {
      B.pendingcb--, Y && R($, Y), B.prefinished = !0, $.emit("prefinish"), X($, B);
    });
  }
  function q($, B) {
    !B.prefinished && !B.finalCalled && (typeof $._final == "function" && !B.destroyed ? (B.pendingcb++, B.finalCalled = !0, ge.nextTick(C, $, B)) : (B.prefinished = !0, $.emit("prefinish")));
  }
  function X($, B) {
    var Y = H(B);
    if (Y && (q($, B), B.pendingcb === 0 && (B.finished = !0, $.emit("finish"), B.autoDestroy))) {
      var se = $._readableState;
      (!se || se.autoDestroy && se.endEmitted) && $.destroy();
    }
    return Y;
  }
  function ee($, B, Y) {
    B.ending = !0, X($, B), Y && (B.finished ? ge.nextTick(Y) : $.once("finish", Y)), B.ended = !0, $.writable = !1;
  }
  function pe($, B, Y) {
    var se = $.entry;
    for ($.entry = null; se; ) {
      var he = se.callback;
      B.pendingcb--, he(Y), se = se.next;
    }
    B.corkedRequestsFree.next = $;
  }
  Object.defineProperty(F.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(B) {
      this._writableState && (this._writableState.destroyed = B);
    }
  }), F.prototype.destroy = f.destroy, F.prototype._undestroy = f.undestroy, F.prototype._destroy = function($, B) {
    B($);
  };
})), Ct = /* @__PURE__ */ fe(((e, t) => {
  _t();
  var r = Object.keys || function(d) {
    var _ = [];
    for (var v in d) _.push(v);
    return _;
  };
  t.exports = c;
  var n = Fo(), i = Lo();
  ht()(c, n);
  for (var o = r(i.prototype), u = 0; u < o.length; u++) {
    var a = o[u];
    c.prototype[a] || (c.prototype[a] = i.prototype[a]);
  }
  function c(d) {
    if (!(this instanceof c)) return new c(d);
    n.call(this, d), i.call(this, d), this.allowHalfOpen = !0, d && (d.readable === !1 && (this.readable = !1), d.writable === !1 && (this.writable = !1), d.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", h)));
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
    this._writableState.ended || ge.nextTick(f, this);
  }
  function f(d) {
    d.end();
  }
  Object.defineProperty(c.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(_) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = _, this._writableState.destroyed = _);
    }
  });
})), $p = /* @__PURE__ */ fe(((e, t) => {
  var r = Lr(), n = r.Buffer;
  function i(u, a) {
    for (var c in u) a[c] = u[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (i(r, e), e.Buffer = o);
  function o(u, a, c) {
    return n(u, a, c);
  }
  i(n, o), o.from = function(u, a, c) {
    if (typeof u == "number") throw new TypeError("Argument must not be a number");
    return n(u, a, c);
  }, o.alloc = function(u, a, c) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    var h = n(u);
    return a !== void 0 ? typeof c == "string" ? h.fill(a, c) : h.fill(a) : h.fill(0), h;
  }, o.allocUnsafe = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return n(u);
  }, o.allocUnsafeSlow = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(u);
  };
})), Ii = /* @__PURE__ */ fe(((e) => {
  var t = $p().Buffer, r = t.isEncoding || function(y) {
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
  function n(y) {
    if (!y) return "utf8";
    for (var k; ; ) switch (y) {
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
        if (k) return;
        y = ("" + y).toLowerCase(), k = !0;
    }
  }
  function i(y) {
    var k = n(y);
    if (typeof k != "string" && (t.isEncoding === r || !r(y))) throw new Error("Unknown encoding: " + y);
    return k || y;
  }
  e.StringDecoder = o;
  function o(y) {
    this.encoding = i(y);
    var k;
    switch (this.encoding) {
      case "utf16le":
        this.text = _, this.end = v, k = 4;
        break;
      case "utf8":
        this.fillLast = h, k = 4;
        break;
      case "base64":
        this.text = g, this.end = m, k = 3;
        break;
      default:
        this.write = b, this.end = x;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(k);
  }
  o.prototype.write = function(y) {
    if (y.length === 0) return "";
    var k, T;
    if (this.lastNeed) {
      if (k = this.fillLast(y), k === void 0) return "";
      T = this.lastNeed, this.lastNeed = 0;
    } else T = 0;
    return T < y.length ? k ? k + this.text(y, T) : this.text(y, T) : k || "";
  }, o.prototype.end = d, o.prototype.text = f, o.prototype.fillLast = function(y) {
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, y.length), this.lastNeed -= y.length;
  };
  function u(y) {
    return y <= 127 ? 0 : y >> 5 === 6 ? 2 : y >> 4 === 14 ? 3 : y >> 3 === 30 ? 4 : y >> 6 === 2 ? -1 : -2;
  }
  function a(y, k, T) {
    var R = k.length - 1;
    if (R < T) return 0;
    var I = u(k[R]);
    return I >= 0 ? (I > 0 && (y.lastNeed = I - 1), I) : --R < T || I === -2 ? 0 : (I = u(k[R]), I >= 0 ? (I > 0 && (y.lastNeed = I - 2), I) : --R < T || I === -2 ? 0 : (I = u(k[R]), I >= 0 ? (I > 0 && (I === 2 ? I = 0 : y.lastNeed = I - 3), I) : 0));
  }
  function c(y, k, T) {
    if ((k[0] & 192) !== 128)
      return y.lastNeed = 0, "�";
    if (y.lastNeed > 1 && k.length > 1) {
      if ((k[1] & 192) !== 128)
        return y.lastNeed = 1, "�";
      if (y.lastNeed > 2 && k.length > 2 && (k[2] & 192) !== 128)
        return y.lastNeed = 2, "�";
    }
  }
  function h(y) {
    var k = this.lastTotal - this.lastNeed, T = c(this, y);
    if (T !== void 0) return T;
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, k, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, k, 0, y.length), this.lastNeed -= y.length;
  }
  function f(y, k) {
    var T = a(this, y, k);
    if (!this.lastNeed) return y.toString("utf8", k);
    this.lastTotal = T;
    var R = y.length - (T - this.lastNeed);
    return y.copy(this.lastChar, 0, R), y.toString("utf8", k, R);
  }
  function d(y) {
    var k = y && y.length ? this.write(y) : "";
    return this.lastNeed ? k + "�" : k;
  }
  function _(y, k) {
    if ((y.length - k) % 2 === 0) {
      var T = y.toString("utf16le", k);
      if (T) {
        var R = T.charCodeAt(T.length - 1);
        if (R >= 55296 && R <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1], T.slice(0, -1);
      }
      return T;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = y[y.length - 1], y.toString("utf16le", k, y.length - 1);
  }
  function v(y) {
    var k = y && y.length ? this.write(y) : "";
    if (this.lastNeed) {
      var T = this.lastTotal - this.lastNeed;
      return k + this.lastChar.toString("utf16le", 0, T);
    }
    return k;
  }
  function g(y, k) {
    var T = (y.length - k) % 3;
    return T === 0 ? y.toString("base64", k) : (this.lastNeed = 3 - T, this.lastTotal = 3, T === 1 ? this.lastChar[0] = y[y.length - 1] : (this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1]), y.toString("base64", k, y.length - T));
  }
  function m(y) {
    var k = y && y.length ? this.write(y) : "";
    return this.lastNeed ? k + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : k;
  }
  function b(y) {
    return y.toString(this.encoding);
  }
  function x(y) {
    return y && y.length ? this.write(y) : "";
  }
})), $n = /* @__PURE__ */ fe(((e, t) => {
  var r = Ot().codes.ERR_STREAM_PREMATURE_CLOSE;
  function n(a) {
    var c = !1;
    return function() {
      if (!c) {
        c = !0;
        for (var h = arguments.length, f = new Array(h), d = 0; d < h; d++) f[d] = arguments[d];
        a.apply(this, f);
      }
    };
  }
  function i() {
  }
  function o(a) {
    return a.setHeader && typeof a.abort == "function";
  }
  function u(a, c, h) {
    if (typeof c == "function") return u(a, null, c);
    c || (c = {}), h = n(h || i);
    var f = c.readable || c.readable !== !1 && a.readable, d = c.writable || c.writable !== !1 && a.writable, _ = function() {
      a.writable || g();
    }, v = a._writableState && a._writableState.finished, g = function() {
      d = !1, v = !0, f || h.call(a);
    }, m = a._readableState && a._readableState.endEmitted, b = function() {
      f = !1, m = !0, d || h.call(a);
    }, x = function(R) {
      h.call(a, R);
    }, y = function() {
      var R;
      if (f && !m)
        return (!a._readableState || !a._readableState.ended) && (R = new r()), h.call(a, R);
      if (d && !v)
        return (!a._writableState || !a._writableState.ended) && (R = new r()), h.call(a, R);
    }, k = function() {
      a.req.on("finish", g);
    };
    return o(a) ? (a.on("complete", g), a.on("abort", y), a.req ? k() : a.on("request", k)) : d && !a._writableState && (a.on("end", _), a.on("close", _)), a.on("end", b), a.on("finish", g), c.error !== !1 && a.on("error", x), a.on("close", y), function() {
      a.removeListener("complete", g), a.removeListener("abort", y), a.removeListener("request", k), a.req && a.req.removeListener("finish", g), a.removeListener("end", _), a.removeListener("close", _), a.removeListener("finish", g), a.removeListener("end", b), a.removeListener("error", x), a.removeListener("close", y);
    };
  }
  t.exports = u;
})), Gp = /* @__PURE__ */ fe(((e, t) => {
  _t();
  var r;
  function n(T, R, I) {
    return R = i(R), R in T ? Object.defineProperty(T, R, {
      value: I,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : T[R] = I, T;
  }
  function i(T) {
    var R = o(T, "string");
    return typeof R == "symbol" ? R : String(R);
  }
  function o(T, R) {
    if (typeof T != "object" || T === null) return T;
    var I = T[Symbol.toPrimitive];
    if (I !== void 0) {
      var N = I.call(T, R);
      if (typeof N != "object") return N;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (R === "string" ? String : Number)(T);
  }
  var u = $n(), a = /* @__PURE__ */ Symbol("lastResolve"), c = /* @__PURE__ */ Symbol("lastReject"), h = /* @__PURE__ */ Symbol("error"), f = /* @__PURE__ */ Symbol("ended"), d = /* @__PURE__ */ Symbol("lastPromise"), _ = /* @__PURE__ */ Symbol("handlePromise"), v = /* @__PURE__ */ Symbol("stream");
  function g(T, R) {
    return {
      value: T,
      done: R
    };
  }
  function m(T) {
    var R = T[a];
    if (R !== null) {
      var I = T[v].read();
      I !== null && (T[d] = null, T[a] = null, T[c] = null, R(g(I, !1)));
    }
  }
  function b(T) {
    ge.nextTick(m, T);
  }
  function x(T, R) {
    return function(I, N) {
      T.then(function() {
        if (R[f]) {
          I(g(void 0, !0));
          return;
        }
        R[_](I, N);
      }, N);
    };
  }
  var y = Object.getPrototypeOf(function() {
  }), k = Object.setPrototypeOf((r = {
    get stream() {
      return this[v];
    },
    next: function() {
      var R = this, I = this[h];
      if (I !== null) return Promise.reject(I);
      if (this[f]) return Promise.resolve(g(void 0, !0));
      if (this[v].destroyed) return new Promise(function(Z, ae) {
        ge.nextTick(function() {
          R[h] ? ae(R[h]) : Z(g(void 0, !0));
        });
      });
      var N = this[d], U;
      if (N) U = new Promise(x(N, this));
      else {
        var F = this[v].read();
        if (F !== null) return Promise.resolve(g(F, !1));
        U = new Promise(this[_]);
      }
      return this[d] = U, U;
    }
  }, n(r, Symbol.asyncIterator, function() {
    return this;
  }), n(r, "return", function() {
    var R = this;
    return new Promise(function(I, N) {
      R[v].destroy(null, function(U) {
        if (U) {
          N(U);
          return;
        }
        I(g(void 0, !0));
      });
    });
  }), r), y);
  t.exports = function(R) {
    var I, N = Object.create(k, (I = {}, n(I, v, {
      value: R,
      writable: !0
    }), n(I, a, {
      value: null,
      writable: !0
    }), n(I, c, {
      value: null,
      writable: !0
    }), n(I, h, {
      value: null,
      writable: !0
    }), n(I, f, {
      value: R._readableState.endEmitted,
      writable: !0
    }), n(I, _, {
      value: function(F, Z) {
        var ae = N[v].read();
        ae ? (N[d] = null, N[a] = null, N[c] = null, F(g(ae, !1))) : (N[a] = F, N[c] = Z);
      },
      writable: !0
    }), I));
    return N[d] = null, u(R, function(U) {
      if (U && U.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var F = N[c];
        F !== null && (N[d] = null, N[a] = null, N[c] = null, F(U)), N[h] = U;
        return;
      }
      var Z = N[a];
      Z !== null && (N[d] = null, N[a] = null, N[c] = null, Z(g(void 0, !0))), N[f] = !0;
    }), R.on("readable", b.bind(null, N)), N;
  };
})), qp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), Fo = /* @__PURE__ */ fe(((e, t) => {
  Pt(), _t(), t.exports = Z;
  var r;
  Z.ReadableState = F, Un().EventEmitter;
  var n = function(P, p) {
    return P.listeners(p).length;
  }, i = bo(), o = Lr().Buffer, u = (typeof Pe < "u" ? Pe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(O) {
    return o.from(O);
  }
  function c(O) {
    return o.isBuffer(O) || O instanceof u;
  }
  var h = Po(), f;
  h && h.debuglog ? f = h.debuglog("stream") : f = function() {
  };
  var d = zp(), _ = Oo(), v = No().getHighWaterMark, g = Ot().codes, m = g.ERR_INVALID_ARG_TYPE, b = g.ERR_STREAM_PUSH_AFTER_EOF, x = g.ERR_METHOD_NOT_IMPLEMENTED, y = g.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, k, T, R;
  ht()(Z, i);
  var I = _.errorOrDestroy, N = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function U(O, P, p) {
    if (typeof O.prependListener == "function") return O.prependListener(P, p);
    !O._events || !O._events[P] ? O.on(P, p) : Array.isArray(O._events[P]) ? O._events[P].unshift(p) : O._events[P] = [p, O._events[P]];
  }
  function F(O, P, p) {
    r = r || Ct(), O = O || {}, typeof p != "boolean" && (p = P instanceof r), this.objectMode = !!O.objectMode, p && (this.objectMode = this.objectMode || !!O.readableObjectMode), this.highWaterMark = v(this, O, "readableHighWaterMark", p), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = O.emitClose !== !1, this.autoDestroy = !!O.autoDestroy, this.destroyed = !1, this.defaultEncoding = O.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, O.encoding && (k || (k = Ii().StringDecoder), this.decoder = new k(O.encoding), this.encoding = O.encoding);
  }
  function Z(O) {
    if (r = r || Ct(), !(this instanceof Z)) return new Z(O);
    var P = this instanceof r;
    this._readableState = new F(O, this, P), this.readable = !0, O && (typeof O.read == "function" && (this._read = O.read), typeof O.destroy == "function" && (this._destroy = O.destroy)), i.call(this);
  }
  Object.defineProperty(Z.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(P) {
      this._readableState && (this._readableState.destroyed = P);
    }
  }), Z.prototype.destroy = _.destroy, Z.prototype._undestroy = _.undestroy, Z.prototype._destroy = function(O, P) {
    P(O);
  }, Z.prototype.push = function(O, P) {
    var p = this._readableState, z;
    return p.objectMode ? z = !0 : typeof O == "string" && (P = P || p.defaultEncoding, P !== p.encoding && (O = o.from(O, P), P = ""), z = !0), ae(this, O, P, !1, z);
  }, Z.prototype.unshift = function(O) {
    return ae(this, O, null, !0, !1);
  };
  function ae(O, P, p, z, E) {
    f("readableAddChunk", P);
    var s = O._readableState;
    if (P === null)
      s.reading = !1, K(O, s);
    else {
      var l;
      if (E || (l = M(s, P)), l) I(O, l);
      else if (s.objectMode || P && P.length > 0)
        if (typeof P != "string" && !s.objectMode && Object.getPrototypeOf(P) !== o.prototype && (P = a(P)), z)
          s.endEmitted ? I(O, new y()) : A(O, s, P, !0);
        else if (s.ended) I(O, new b());
        else {
          if (s.destroyed) return !1;
          s.reading = !1, s.decoder && !p ? (P = s.decoder.write(P), s.objectMode || P.length !== 0 ? A(O, s, P, !1) : Q(O, s)) : A(O, s, P, !1);
        }
      else z || (s.reading = !1, Q(O, s));
    }
    return !s.ended && (s.length < s.highWaterMark || s.length === 0);
  }
  function A(O, P, p, z) {
    P.flowing && P.length === 0 && !P.sync ? (P.awaitDrain = 0, O.emit("data", p)) : (P.length += P.objectMode ? 1 : p.length, z ? P.buffer.unshift(p) : P.buffer.push(p), P.needReadable && oe(O)), Q(O, P);
  }
  function M(O, P) {
    var p;
    return !c(P) && typeof P != "string" && P !== void 0 && !O.objectMode && (p = new m("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], P)), p;
  }
  Z.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, Z.prototype.setEncoding = function(O) {
    k || (k = Ii().StringDecoder);
    var P = new k(O);
    this._readableState.decoder = P, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var p = this._readableState.buffer.head, z = ""; p !== null; )
      z += P.write(p.data), p = p.next;
    return this._readableState.buffer.clear(), z !== "" && this._readableState.buffer.push(z), this._readableState.length = z.length, this;
  };
  var S = 1073741824;
  function W(O) {
    return O >= S ? O = S : (O--, O |= O >>> 1, O |= O >>> 2, O |= O >>> 4, O |= O >>> 8, O |= O >>> 16, O++), O;
  }
  function J(O, P) {
    return O <= 0 || P.length === 0 && P.ended ? 0 : P.objectMode ? 1 : O !== O ? P.flowing && P.length ? P.buffer.head.data.length : P.length : (O > P.highWaterMark && (P.highWaterMark = W(O)), O <= P.length ? O : P.ended ? P.length : (P.needReadable = !0, 0));
  }
  Z.prototype.read = function(O) {
    f("read", O), O = parseInt(O, 10);
    var P = this._readableState, p = O;
    if (O !== 0 && (P.emittedReadable = !1), O === 0 && P.needReadable && ((P.highWaterMark !== 0 ? P.length >= P.highWaterMark : P.length > 0) || P.ended))
      return f("read: emitReadable", P.length, P.ended), P.length === 0 && P.ended ? Y(this) : oe(this), null;
    if (O = J(O, P), O === 0 && P.ended)
      return P.length === 0 && Y(this), null;
    var z = P.needReadable;
    f("need readable", z), (P.length === 0 || P.length - O < P.highWaterMark) && (z = !0, f("length less than watermark", z)), P.ended || P.reading ? (z = !1, f("reading or ended", z)) : z && (f("do read"), P.reading = !0, P.sync = !0, P.length === 0 && (P.needReadable = !0), this._read(P.highWaterMark), P.sync = !1, P.reading || (O = J(p, P)));
    var E;
    return O > 0 ? E = B(O, P) : E = null, E === null ? (P.needReadable = P.length <= P.highWaterMark, O = 0) : (P.length -= O, P.awaitDrain = 0), P.length === 0 && (P.ended || (P.needReadable = !0), p !== O && P.ended && Y(this)), E !== null && this.emit("data", E), E;
  };
  function K(O, P) {
    if (f("onEofChunk"), !P.ended) {
      if (P.decoder) {
        var p = P.decoder.end();
        p && p.length && (P.buffer.push(p), P.length += P.objectMode ? 1 : p.length);
      }
      P.ended = !0, P.sync ? oe(O) : (P.needReadable = !1, P.emittedReadable || (P.emittedReadable = !0, V(O)));
    }
  }
  function oe(O) {
    var P = O._readableState;
    f("emitReadable", P.needReadable, P.emittedReadable), P.needReadable = !1, P.emittedReadable || (f("emitReadable", P.flowing), P.emittedReadable = !0, ge.nextTick(V, O));
  }
  function V(O) {
    var P = O._readableState;
    f("emitReadable_", P.destroyed, P.length, P.ended), !P.destroyed && (P.length || P.ended) && (O.emit("readable"), P.emittedReadable = !1), P.needReadable = !P.flowing && !P.ended && P.length <= P.highWaterMark, $(O);
  }
  function Q(O, P) {
    P.readingMore || (P.readingMore = !0, ge.nextTick(H, O, P));
  }
  function H(O, P) {
    for (; !P.reading && !P.ended && (P.length < P.highWaterMark || P.flowing && P.length === 0); ) {
      var p = P.length;
      if (f("maybeReadMore read 0"), O.read(0), p === P.length) break;
    }
    P.readingMore = !1;
  }
  Z.prototype._read = function(O) {
    I(this, new x("_read()"));
  }, Z.prototype.pipe = function(O, P) {
    var p = this, z = this._readableState;
    switch (z.pipesCount) {
      case 0:
        z.pipes = O;
        break;
      case 1:
        z.pipes = [z.pipes, O];
        break;
      default:
        z.pipes.push(O);
    }
    z.pipesCount += 1, f("pipe count=%d opts=%j", z.pipesCount, P);
    var E = (!P || P.end !== !1) && O !== ge.stdout && O !== ge.stderr ? l : de;
    z.endEmitted ? ge.nextTick(E) : p.once("end", E), O.on("unpipe", s);
    function s(me, we) {
      f("onunpipe"), me === p && we && we.hasUnpiped === !1 && (we.hasUnpiped = !0, j());
    }
    function l() {
      f("onend"), O.end();
    }
    var w = C(p);
    O.on("drain", w);
    var L = !1;
    function j() {
      f("cleanup"), O.removeListener("close", ue), O.removeListener("finish", ie), O.removeListener("drain", w), O.removeListener("error", te), O.removeListener("unpipe", s), p.removeListener("end", l), p.removeListener("end", de), p.removeListener("data", D), L = !0, z.awaitDrain && (!O._writableState || O._writableState.needDrain) && w();
    }
    p.on("data", D);
    function D(me) {
      f("ondata");
      var we = O.write(me);
      f("dest.write", we), we === !1 && ((z.pipesCount === 1 && z.pipes === O || z.pipesCount > 1 && he(z.pipes, O) !== -1) && !L && (f("false write response, pause", z.awaitDrain), z.awaitDrain++), p.pause());
    }
    function te(me) {
      f("onerror", me), de(), O.removeListener("error", te), n(O, "error") === 0 && I(O, me);
    }
    U(O, "error", te);
    function ue() {
      O.removeListener("finish", ie), de();
    }
    O.once("close", ue);
    function ie() {
      f("onfinish"), O.removeListener("close", ue), de();
    }
    O.once("finish", ie);
    function de() {
      f("unpipe"), p.unpipe(O);
    }
    return O.emit("pipe", p), z.flowing || (f("pipe resume"), p.resume()), O;
  };
  function C(O) {
    return function() {
      var p = O._readableState;
      f("pipeOnDrain", p.awaitDrain), p.awaitDrain && p.awaitDrain--, p.awaitDrain === 0 && n(O, "data") && (p.flowing = !0, $(O));
    };
  }
  Z.prototype.unpipe = function(O) {
    var P = this._readableState, p = { hasUnpiped: !1 };
    if (P.pipesCount === 0) return this;
    if (P.pipesCount === 1)
      return O && O !== P.pipes ? this : (O || (O = P.pipes), P.pipes = null, P.pipesCount = 0, P.flowing = !1, O && O.emit("unpipe", this, p), this);
    if (!O) {
      var z = P.pipes, E = P.pipesCount;
      P.pipes = null, P.pipesCount = 0, P.flowing = !1;
      for (var s = 0; s < E; s++) z[s].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var l = he(P.pipes, O);
    return l === -1 ? this : (P.pipes.splice(l, 1), P.pipesCount -= 1, P.pipesCount === 1 && (P.pipes = P.pipes[0]), O.emit("unpipe", this, p), this);
  }, Z.prototype.on = function(O, P) {
    var p = i.prototype.on.call(this, O, P), z = this._readableState;
    return O === "data" ? (z.readableListening = this.listenerCount("readable") > 0, z.flowing !== !1 && this.resume()) : O === "readable" && !z.endEmitted && !z.readableListening && (z.readableListening = z.needReadable = !0, z.flowing = !1, z.emittedReadable = !1, f("on readable", z.length, z.reading), z.length ? oe(this) : z.reading || ge.nextTick(X, this)), p;
  }, Z.prototype.addListener = Z.prototype.on, Z.prototype.removeListener = function(O, P) {
    var p = i.prototype.removeListener.call(this, O, P);
    return O === "readable" && ge.nextTick(q, this), p;
  }, Z.prototype.removeAllListeners = function(O) {
    var P = i.prototype.removeAllListeners.apply(this, arguments);
    return (O === "readable" || O === void 0) && ge.nextTick(q, this), P;
  };
  function q(O) {
    var P = O._readableState;
    P.readableListening = O.listenerCount("readable") > 0, P.resumeScheduled && !P.paused ? P.flowing = !0 : O.listenerCount("data") > 0 && O.resume();
  }
  function X(O) {
    f("readable nexttick read 0"), O.read(0);
  }
  Z.prototype.resume = function() {
    var O = this._readableState;
    return O.flowing || (f("resume"), O.flowing = !O.readableListening, ee(this, O)), O.paused = !1, this;
  };
  function ee(O, P) {
    P.resumeScheduled || (P.resumeScheduled = !0, ge.nextTick(pe, O, P));
  }
  function pe(O, P) {
    f("resume", P.reading), P.reading || O.read(0), P.resumeScheduled = !1, O.emit("resume"), $(O), P.flowing && !P.reading && O.read(0);
  }
  Z.prototype.pause = function() {
    return f("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (f("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function $(O) {
    var P = O._readableState;
    for (f("flow", P.flowing); P.flowing && O.read() !== null; ) ;
  }
  Z.prototype.wrap = function(O) {
    var P = this, p = this._readableState, z = !1;
    O.on("end", function() {
      if (f("wrapped end"), p.decoder && !p.ended) {
        var l = p.decoder.end();
        l && l.length && P.push(l);
      }
      P.push(null);
    }), O.on("data", function(l) {
      f("wrapped data"), p.decoder && (l = p.decoder.write(l)), !(p.objectMode && l == null) && (!p.objectMode && (!l || !l.length) || P.push(l) || (z = !0, O.pause()));
    });
    for (var E in O) this[E] === void 0 && typeof O[E] == "function" && (this[E] = /* @__PURE__ */ (function(w) {
      return function() {
        return O[w].apply(O, arguments);
      };
    })(E));
    for (var s = 0; s < N.length; s++) O.on(N[s], this.emit.bind(this, N[s]));
    return this._read = function(l) {
      f("wrapped _read", l), z && (z = !1, O.resume());
    }, this;
  }, typeof Symbol == "function" && (Z.prototype[Symbol.asyncIterator] = function() {
    return T === void 0 && (T = Gp()), T(this);
  }), Object.defineProperty(Z.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(Z.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(Z.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(P) {
      this._readableState && (this._readableState.flowing = P);
    }
  }), Z._fromList = B, Object.defineProperty(Z.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function B(O, P) {
    if (P.length === 0) return null;
    var p;
    return P.objectMode ? p = P.buffer.shift() : !O || O >= P.length ? (P.decoder ? p = P.buffer.join("") : P.buffer.length === 1 ? p = P.buffer.first() : p = P.buffer.concat(P.length), P.buffer.clear()) : p = P.buffer.consume(O, P.decoder), p;
  }
  function Y(O) {
    var P = O._readableState;
    f("endReadable", P.endEmitted), P.endEmitted || (P.ended = !0, ge.nextTick(se, P, O));
  }
  function se(O, P) {
    if (f("endReadableNT", O.endEmitted, O.length), !O.endEmitted && O.length === 0 && (O.endEmitted = !0, P.readable = !1, P.emit("end"), O.autoDestroy)) {
      var p = P._writableState;
      (!p || p.autoDestroy && p.finished) && P.destroy();
    }
  }
  typeof Symbol == "function" && (Z.from = function(O, P) {
    return R === void 0 && (R = qp()), R(Z, O, P);
  });
  function he(O, P) {
    for (var p = 0, z = O.length; p < z; p++) if (O[p] === P) return p;
    return -1;
  }
})), Do = /* @__PURE__ */ fe(((e, t) => {
  t.exports = h;
  var r = Ot().codes, n = r.ERR_METHOD_NOT_IMPLEMENTED, i = r.ERR_MULTIPLE_CALLBACK, o = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = r.ERR_TRANSFORM_WITH_LENGTH_0, a = Ct();
  ht()(h, a);
  function c(_, v) {
    var g = this._transformState;
    g.transforming = !1;
    var m = g.writecb;
    if (m === null) return this.emit("error", new i());
    g.writechunk = null, g.writecb = null, v != null && this.push(v), m(_);
    var b = this._readableState;
    b.reading = !1, (b.needReadable || b.length < b.highWaterMark) && this._read(b.highWaterMark);
  }
  function h(_) {
    if (!(this instanceof h)) return new h(_);
    a.call(this, _), this._transformState = {
      afterTransform: c.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, _ && (typeof _.transform == "function" && (this._transform = _.transform), typeof _.flush == "function" && (this._flush = _.flush)), this.on("prefinish", f);
  }
  function f() {
    var _ = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(v, g) {
      d(_, v, g);
    }) : d(this, null, null);
  }
  h.prototype.push = function(_, v) {
    return this._transformState.needTransform = !1, a.prototype.push.call(this, _, v);
  }, h.prototype._transform = function(_, v, g) {
    g(new n("_transform()"));
  }, h.prototype._write = function(_, v, g) {
    var m = this._transformState;
    if (m.writecb = g, m.writechunk = _, m.writeencoding = v, !m.transforming) {
      var b = this._readableState;
      (m.needTransform || b.needReadable || b.length < b.highWaterMark) && this._read(b.highWaterMark);
    }
  }, h.prototype._read = function(_) {
    var v = this._transformState;
    v.writechunk !== null && !v.transforming ? (v.transforming = !0, this._transform(v.writechunk, v.writeencoding, v.afterTransform)) : v.needTransform = !0;
  }, h.prototype._destroy = function(_, v) {
    a.prototype._destroy.call(this, _, function(g) {
      v(g);
    });
  };
  function d(_, v, g) {
    if (v) return _.emit("error", v);
    if (g != null && _.push(g), _._writableState.length) throw new u();
    if (_._transformState.transforming) throw new o();
    return _.push(null);
  }
})), Vp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = n;
  var r = Do();
  ht()(n, r);
  function n(i) {
    if (!(this instanceof n)) return new n(i);
    r.call(this, i);
  }
  n.prototype._transform = function(i, o, u) {
    u(null, i);
  };
})), Xp = /* @__PURE__ */ fe(((e, t) => {
  var r;
  function n(g) {
    var m = !1;
    return function() {
      m || (m = !0, g.apply(void 0, arguments));
    };
  }
  var i = Ot().codes, o = i.ERR_MISSING_ARGS, u = i.ERR_STREAM_DESTROYED;
  function a(g) {
    if (g) throw g;
  }
  function c(g) {
    return g.setHeader && typeof g.abort == "function";
  }
  function h(g, m, b, x) {
    x = n(x);
    var y = !1;
    g.on("close", function() {
      y = !0;
    }), r === void 0 && (r = $n()), r(g, {
      readable: m,
      writable: b
    }, function(T) {
      if (T) return x(T);
      y = !0, x();
    });
    var k = !1;
    return function(T) {
      if (!y && !k) {
        if (k = !0, c(g)) return g.abort();
        if (typeof g.destroy == "function") return g.destroy();
        x(T || new u("pipe"));
      }
    };
  }
  function f(g) {
    g();
  }
  function d(g, m) {
    return g.pipe(m);
  }
  function _(g) {
    return !g.length || typeof g[g.length - 1] != "function" ? a : g.pop();
  }
  function v() {
    for (var g = arguments.length, m = new Array(g), b = 0; b < g; b++) m[b] = arguments[b];
    var x = _(m);
    if (Array.isArray(m[0]) && (m = m[0]), m.length < 2) throw new o("streams");
    var y, k = m.map(function(T, R) {
      var I = R < m.length - 1;
      return h(T, I, R > 0, function(N) {
        y || (y = N), N && k.forEach(f), !I && (k.forEach(f), x(y));
      });
    });
    return m.reduce(d);
  }
  t.exports = v;
})), Kp = /* @__PURE__ */ fe(((e, t) => {
  t.exports = n;
  var r = Un().EventEmitter;
  ht()(n, r), n.Readable = Fo(), n.Writable = Lo(), n.Duplex = Ct(), n.Transform = Do(), n.PassThrough = Vp(), n.finished = $n(), n.pipeline = Xp(), n.Stream = n;
  function n() {
    r.call(this);
  }
  n.prototype.pipe = function(i, o) {
    var u = this;
    function a(g) {
      i.writable && i.write(g) === !1 && u.pause && u.pause();
    }
    u.on("data", a);
    function c() {
      u.readable && u.resume && u.resume();
    }
    i.on("drain", c), !i._isStdio && (!o || o.end !== !1) && (u.on("end", f), u.on("close", d));
    var h = !1;
    function f() {
      h || (h = !0, i.end());
    }
    function d() {
      h || (h = !0, typeof i.destroy == "function" && i.destroy());
    }
    function _(g) {
      if (v(), r.listenerCount(this, "error") === 0) throw g;
    }
    u.on("error", _), i.on("error", _);
    function v() {
      u.removeListener("data", a), i.removeListener("drain", c), u.removeListener("end", f), u.removeListener("close", d), u.removeListener("error", _), i.removeListener("error", _), u.removeListener("end", v), u.removeListener("close", v), i.removeListener("close", v);
    }
    return u.on("end", v), u.on("close", v), i.on("close", v), i.emit("pipe", u), i;
  };
})), Zp = /* @__PURE__ */ fe(((e, t) => {
  Pt(), _t();
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof Pe < "u" ? Pe : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(n, i, o) {
      function u(h, f) {
        if (!i[h]) {
          if (!n[h]) {
            var d = typeof lr == "function" && lr;
            if (!f && d) return d(h, !0);
            if (a) return a(h, !0);
            var _ = /* @__PURE__ */ new Error("Cannot find module '" + h + "'");
            throw _.code = "MODULE_NOT_FOUND", _;
          }
          var v = i[h] = { exports: {} };
          n[h][0].call(v.exports, function(g) {
            var m = n[h][1][g];
            return u(m || g);
          }, v, v.exports, r, n, i, o);
        }
        return i[h].exports;
      }
      for (var a = typeof lr == "function" && lr, c = 0; c < o.length; c++) u(o[c]);
      return u;
    })({
      1: [function(r, n, i) {
        var o = r("./utils"), u = r("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        i.encode = function(c) {
          for (var h, f, d, _, v, g, m, b = [], x = 0, y = c.length, k = y, T = o.getTypeOf(c) !== "string"; x < c.length; ) k = y - x, d = T ? (h = c[x++], f = x < y ? c[x++] : 0, x < y ? c[x++] : 0) : (h = c.charCodeAt(x++), f = x < y ? c.charCodeAt(x++) : 0, x < y ? c.charCodeAt(x++) : 0), _ = h >> 2, v = (3 & h) << 4 | f >> 4, g = 1 < k ? (15 & f) << 2 | d >> 6 : 64, m = 2 < k ? 63 & d : 64, b.push(a.charAt(_) + a.charAt(v) + a.charAt(g) + a.charAt(m));
          return b.join("");
        }, i.decode = function(c) {
          var h, f, d, _, v, g, m = 0, b = 0, x = "data:";
          if (c.substr(0, x.length) === x) throw new Error("Invalid base64 input, it looks like a data url.");
          var y, k = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === a.charAt(64) && k--, c.charAt(c.length - 2) === a.charAt(64) && k--, k % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (y = u.uint8array ? new Uint8Array(0 | k) : new Array(0 | k); m < c.length; ) h = a.indexOf(c.charAt(m++)) << 2 | (_ = a.indexOf(c.charAt(m++))) >> 4, f = (15 & _) << 4 | (v = a.indexOf(c.charAt(m++))) >> 2, d = (3 & v) << 6 | (g = a.indexOf(c.charAt(m++))), y[b++] = h, v !== 64 && (y[b++] = f), g !== 64 && (y[b++] = d);
          return y;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, n, i) {
        var o = r("./external"), u = r("./stream/DataWorker"), a = r("./stream/Crc32Probe"), c = r("./stream/DataLengthProbe");
        function h(f, d, _, v, g) {
          this.compressedSize = f, this.uncompressedSize = d, this.crc32 = _, this.compression = v, this.compressedContent = g;
        }
        h.prototype = {
          getContentWorker: function() {
            var f = new u(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), d = this;
            return f.on("end", function() {
              if (this.streamInfo.data_length !== d.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), f;
          },
          getCompressedWorker: function() {
            return new u(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, h.createWorkerFrom = function(f, d, _) {
          return f.pipe(new a()).pipe(new c("uncompressedSize")).pipe(d.compressWorker(_)).pipe(new c("compressedSize")).withStreamInfo("compression", d);
        }, n.exports = h;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, n, i) {
        var o = r("./stream/GenericWorker");
        i.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new o("STORE compression");
          },
          uncompressWorker: function() {
            return new o("STORE decompression");
          }
        }, i.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, n, i) {
        var o = r("./utils"), u = (function() {
          for (var a, c = [], h = 0; h < 256; h++) {
            a = h;
            for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            c[h] = a;
          }
          return c;
        })();
        n.exports = function(a, c) {
          return a !== void 0 && a.length ? o.getTypeOf(a) !== "string" ? (function(h, f, d, _) {
            var v = u, g = _ + d;
            h ^= -1;
            for (var m = _; m < g; m++) h = h >>> 8 ^ v[255 & (h ^ f[m])];
            return -1 ^ h;
          })(0 | c, a, a.length, 0) : (function(h, f, d, _) {
            var v = u, g = _ + d;
            h ^= -1;
            for (var m = _; m < g; m++) h = h >>> 8 ^ v[255 & (h ^ f.charCodeAt(m))];
            return -1 ^ h;
          })(0 | c, a, a.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, n, i) {
        i.base64 = !1, i.binary = !1, i.dir = !1, i.createFolders = !0, i.date = null, i.compression = null, i.compressionOptions = null, i.comment = null, i.unixPermissions = null, i.dosPermissions = null;
      }, {}],
      6: [function(r, n, i) {
        var o = null;
        o = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: o };
      }, { lie: 37 }],
      7: [function(r, n, i) {
        var o = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", u = r("pako"), a = r("./utils"), c = r("./stream/GenericWorker"), h = o ? "uint8array" : "array";
        function f(d, _) {
          c.call(this, "FlateWorker/" + d), this._pako = null, this._pakoAction = d, this._pakoOptions = _, this.meta = {};
        }
        i.magic = "\b\0", a.inherits(f, c), f.prototype.processChunk = function(d) {
          this.meta = d.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(h, d.data), !1);
        }, f.prototype.flush = function() {
          c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, f.prototype.cleanUp = function() {
          c.prototype.cleanUp.call(this), this._pako = null;
        }, f.prototype._createPako = function() {
          this._pako = new u[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var d = this;
          this._pako.onData = function(_) {
            d.push({
              data: _,
              meta: d.meta
            });
          };
        }, i.compressWorker = function(d) {
          return new f("Deflate", d);
        }, i.uncompressWorker = function() {
          return new f("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, n, i) {
        function o(v, g) {
          var m, b = "";
          for (m = 0; m < g; m++) b += String.fromCharCode(255 & v), v >>>= 8;
          return b;
        }
        function u(v, g, m, b, x, y) {
          var k, T, R = v.file, I = v.compression, N = y !== h.utf8encode, U = a.transformTo("string", y(R.name)), F = a.transformTo("string", h.utf8encode(R.name)), Z = R.comment, ae = a.transformTo("string", y(Z)), A = a.transformTo("string", h.utf8encode(Z)), M = F.length !== R.name.length, S = A.length !== Z.length, W = "", J = "", K = "", oe = R.dir, V = R.date, Q = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          g && !m || (Q.crc32 = v.crc32, Q.compressedSize = v.compressedSize, Q.uncompressedSize = v.uncompressedSize);
          var H = 0;
          g && (H |= 8), N || !M && !S || (H |= 2048);
          var C = 0, q = 0;
          oe && (C |= 16), x === "UNIX" ? (q = 798, C |= (function(ee, pe) {
            var $ = ee;
            return ee || ($ = pe ? 16893 : 33204), (65535 & $) << 16;
          })(R.unixPermissions, oe)) : (q = 20, C |= (function(ee) {
            return 63 & (ee || 0);
          })(R.dosPermissions)), k = V.getUTCHours(), k <<= 6, k |= V.getUTCMinutes(), k <<= 5, k |= V.getUTCSeconds() / 2, T = V.getUTCFullYear() - 1980, T <<= 4, T |= V.getUTCMonth() + 1, T <<= 5, T |= V.getUTCDate(), M && (J = o(1, 1) + o(f(U), 4) + F, W += "up" + o(J.length, 2) + J), S && (K = o(1, 1) + o(f(ae), 4) + A, W += "uc" + o(K.length, 2) + K);
          var X = "";
          return X += `
\0`, X += o(H, 2), X += I.magic, X += o(k, 2), X += o(T, 2), X += o(Q.crc32, 4), X += o(Q.compressedSize, 4), X += o(Q.uncompressedSize, 4), X += o(U.length, 2), X += o(W.length, 2), {
            fileRecord: d.LOCAL_FILE_HEADER + X + U + W,
            dirRecord: d.CENTRAL_FILE_HEADER + o(q, 2) + X + o(ae.length, 2) + "\0\0\0\0" + o(C, 4) + o(b, 4) + U + W + ae
          };
        }
        var a = r("../utils"), c = r("../stream/GenericWorker"), h = r("../utf8"), f = r("../crc32"), d = r("../signature");
        function _(v, g, m, b) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = g, this.zipPlatform = m, this.encodeFileName = b, this.streamFiles = v, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        a.inherits(_, c), _.prototype.push = function(v) {
          var g = v.meta.percent || 0, m = this.entriesCount, b = this._sources.length;
          this.accumulate ? this.contentBuffer.push(v) : (this.bytesWritten += v.data.length, c.prototype.push.call(this, {
            data: v.data,
            meta: {
              currentFile: this.currentFile,
              percent: m ? (g + 100 * (m - b - 1)) / m : 100
            }
          }));
        }, _.prototype.openedSource = function(v) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = v.file.name;
          var g = this.streamFiles && !v.file.dir;
          if (g) {
            var m = u(v, g, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: m.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, _.prototype.closedSource = function(v) {
          this.accumulate = !1;
          var g = this.streamFiles && !v.file.dir, m = u(v, g, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(m.dirRecord), g) this.push({
            data: (function(b) {
              return d.DATA_DESCRIPTOR + o(b.crc32, 4) + o(b.compressedSize, 4) + o(b.uncompressedSize, 4);
            })(v),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: m.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, _.prototype.flush = function() {
          for (var v = this.bytesWritten, g = 0; g < this.dirRecords.length; g++) this.push({
            data: this.dirRecords[g],
            meta: { percent: 100 }
          });
          var m = this.bytesWritten - v, b = (function(x, y, k, T, R) {
            var I = a.transformTo("string", R(T));
            return d.CENTRAL_DIRECTORY_END + "\0\0\0\0" + o(x, 2) + o(x, 2) + o(y, 4) + o(k, 4) + o(I.length, 2) + I;
          })(this.dirRecords.length, m, v, this.zipComment, this.encodeFileName);
          this.push({
            data: b,
            meta: { percent: 100 }
          });
        }, _.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, _.prototype.registerPrevious = function(v) {
          this._sources.push(v);
          var g = this;
          return v.on("data", function(m) {
            g.processChunk(m);
          }), v.on("end", function() {
            g.closedSource(g.previous.streamInfo), g._sources.length ? g.prepareNextSource() : g.end();
          }), v.on("error", function(m) {
            g.error(m);
          }), this;
        }, _.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, _.prototype.error = function(v) {
          var g = this._sources;
          if (!c.prototype.error.call(this, v)) return !1;
          for (var m = 0; m < g.length; m++) try {
            g[m].error(v);
          } catch {
          }
          return !0;
        }, _.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var v = this._sources, g = 0; g < v.length; g++) v[g].lock();
        }, n.exports = _;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, n, i) {
        var o = r("../compressions"), u = r("./ZipFileWorker");
        i.generateWorker = function(a, c, h) {
          var f = new u(c.streamFiles, h, c.platform, c.encodeFileName), d = 0;
          try {
            a.forEach(function(_, v) {
              d++;
              var g = (function(y, k) {
                var T = y || k, R = o[T];
                if (!R) throw new Error(T + " is not a valid compression method !");
                return R;
              })(v.options.compression, c.compression), m = v.options.compressionOptions || c.compressionOptions || {}, b = v.dir, x = v.date;
              v._compressWorker(g, m).withStreamInfo("file", {
                name: _,
                dir: b,
                date: x,
                comment: v.comment || "",
                unixPermissions: v.unixPermissions,
                dosPermissions: v.dosPermissions
              }).pipe(f);
            }), f.entriesCount = d;
          } catch (_) {
            f.error(_);
          }
          return f;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(r, n, i) {
        function o() {
          if (!(this instanceof o)) return new o();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var u = new o();
            for (var a in this) typeof this[a] != "function" && (u[a] = this[a]);
            return u;
          };
        }
        (o.prototype = r("./object")).loadAsync = r("./load"), o.support = r("./support"), o.defaults = r("./defaults"), o.version = "3.10.2", o.loadAsync = function(u, a) {
          return new o().loadAsync(u, a);
        }, o.external = r("./external"), n.exports = o;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(r, n, i) {
        var o = r("./utils"), u = r("./external"), a = r("./utf8"), c = r("./zipEntries"), h = r("./stream/Crc32Probe"), f = r("./nodejsUtils");
        function d(_) {
          return new u.Promise(function(v, g) {
            var m = _.decompressed.getContentWorker().pipe(new h());
            m.on("error", function(b) {
              g(b);
            }).on("end", function() {
              m.streamInfo.crc32 !== _.decompressed.crc32 ? g(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : v();
            }).resume();
          });
        }
        n.exports = function(_, v) {
          var g = this;
          return v = o.extend(v || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: a.utf8decode
          }), f.isNode && f.isStream(_) ? u.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : o.prepareContent("the loaded zip file", _, !0, v.optimizedBinaryString, v.base64).then(function(m) {
            var b = new c(v);
            return b.load(m), b;
          }).then(function(m) {
            var b = [u.Promise.resolve(m)], x = m.files;
            if (v.checkCRC32) for (var y = 0; y < x.length; y++) b.push(d(x[y]));
            return u.Promise.all(b);
          }).then(function(m) {
            for (var b = m.shift(), x = b.files, y = 0; y < x.length; y++) {
              var k = x[y], T = k.fileNameStr, R = o.resolve(k.fileNameStr);
              g.file(R, k.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: k.date,
                dir: k.dir,
                comment: k.fileCommentStr.length ? k.fileCommentStr : null,
                unixPermissions: k.unixPermissions,
                dosPermissions: k.dosPermissions,
                createFolders: v.createFolders
              }), k.dir || (g.file(R).unsafeOriginalName = T);
            }
            return b.zipComment.length && (g.comment = b.zipComment), g;
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
      12: [function(r, n, i) {
        var o = r("../utils"), u = r("../stream/GenericWorker");
        function a(c, h) {
          u.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(h);
        }
        o.inherits(a, u), a.prototype._bindStream = function(c) {
          var h = this;
          (this._stream = c).pause(), c.on("data", function(f) {
            h.push({
              data: f,
              meta: { percent: 0 }
            });
          }).on("error", function(f) {
            h.isPaused ? this.generatedError = f : h.error(f);
          }).on("end", function() {
            h.isPaused ? h._upstreamEnded = !0 : h.end();
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
      13: [function(r, n, i) {
        var o = r("readable-stream").Readable;
        function u(a, c, h) {
          o.call(this, c), this._helper = a;
          var f = this;
          a.on("data", function(d, _) {
            f.push(d) || f._helper.pause(), h && h(_);
          }).on("error", function(d) {
            f.emit("error", d);
          }).on("end", function() {
            f.push(null);
          });
        }
        r("../utils").inherits(u, o), u.prototype._read = function() {
          this._helper.resume();
        }, n.exports = u;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(r, n, i) {
        n.exports = {
          isNode: typeof Buffer < "u",
          newBufferFrom: function(o, u) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(o, u);
            if (typeof o == "number") throw new Error('The "data" argument must not be a number');
            return new Buffer(o, u);
          },
          allocBuffer: function(o) {
            if (Buffer.alloc) return Buffer.alloc(o);
            var u = new Buffer(o);
            return u.fill(0), u;
          },
          isBuffer: function(o) {
            return Buffer.isBuffer(o);
          },
          isStream: function(o) {
            return o && typeof o.on == "function" && typeof o.pause == "function" && typeof o.resume == "function";
          }
        };
      }, {}],
      15: [function(r, n, i) {
        function o(T, R, I) {
          var N, U = a.getTypeOf(R), F = a.extend(I || {}, f);
          F.date = F.date || /* @__PURE__ */ new Date(), F.compression !== null && (F.compression = F.compression.toUpperCase()), typeof F.unixPermissions == "string" && (F.unixPermissions = parseInt(F.unixPermissions, 8)), F.unixPermissions && 16384 & F.unixPermissions && (F.dir = !0), F.dosPermissions && 16 & F.dosPermissions && (F.dir = !0), F.dir && (T = x(T)), F.createFolders && (N = b(T)) && y.call(this, N, !0);
          var Z = U === "string" && F.binary === !1 && F.base64 === !1;
          I && I.binary !== void 0 || (F.binary = !Z), (R instanceof d && R.uncompressedSize === 0 || F.dir || !R || R.length === 0) && (F.base64 = !1, F.binary = !0, R = "", F.compression = "STORE", U = "string");
          var ae = null;
          ae = R instanceof d || R instanceof c ? R : g.isNode && g.isStream(R) ? new m(T, R) : a.prepareContent(T, R, F.binary, F.optimizedBinaryString, F.base64);
          var A = new _(T, ae, F);
          this.files[T] = A;
        }
        var u = r("./utf8"), a = r("./utils"), c = r("./stream/GenericWorker"), h = r("./stream/StreamHelper"), f = r("./defaults"), d = r("./compressedObject"), _ = r("./zipObject"), v = r("./generate"), g = r("./nodejsUtils"), m = r("./nodejs/NodejsStreamInputAdapter"), b = function(T) {
          T.slice(-1) === "/" && (T = T.substring(0, T.length - 1));
          var R = T.lastIndexOf("/");
          return 0 < R ? T.substring(0, R) : "";
        }, x = function(T) {
          return T.slice(-1) !== "/" && (T += "/"), T;
        }, y = function(T, R) {
          return R = R !== void 0 ? R : f.createFolders, T = x(T), this.files[T] || o.call(this, T, null, {
            dir: !0,
            createFolders: R
          }), this.files[T];
        };
        function k(T) {
          return Object.prototype.toString.call(T) === "[object RegExp]";
        }
        n.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(T) {
            var R, I, N;
            for (R in this.files) N = this.files[R], (I = R.slice(this.root.length, R.length)) && R.slice(0, this.root.length) === this.root && T(I, N);
          },
          filter: function(T) {
            var R = [];
            return this.forEach(function(I, N) {
              T(I, N) && R.push(N);
            }), R;
          },
          file: function(T, R, I) {
            if (arguments.length !== 1) return T = this.root + T, o.call(this, T, R, I), this;
            if (k(T)) {
              var N = T;
              return this.filter(function(F, Z) {
                return !Z.dir && N.test(F);
              });
            }
            var U = this.files[this.root + T];
            return U && !U.dir ? U : null;
          },
          folder: function(T) {
            if (!T) return this;
            if (k(T)) return this.filter(function(U, F) {
              return F.dir && T.test(U);
            });
            var R = this.root + T, I = y.call(this, R), N = this.clone();
            return N.root = I.name, N;
          },
          remove: function(T) {
            T = this.root + T;
            var R = this.files[T];
            if (R || (T.slice(-1) !== "/" && (T += "/"), R = this.files[T]), R && !R.dir) delete this.files[T];
            else for (var I = this.filter(function(U, F) {
              return F.name.slice(0, T.length) === T;
            }), N = 0; N < I.length; N++) delete this.files[I[N].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(T) {
            var R, I = {};
            try {
              if ((I = a.extend(T || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: u.utf8encode
              })).type = I.type.toLowerCase(), I.compression = I.compression.toUpperCase(), I.type === "binarystring" && (I.type = "string"), !I.type) throw new Error("No output type specified.");
              a.checkSupport(I.type), I.platform !== "darwin" && I.platform !== "freebsd" && I.platform !== "linux" && I.platform !== "sunos" || (I.platform = "UNIX"), I.platform === "win32" && (I.platform = "DOS");
              var N = I.comment || this.comment || "";
              R = v.generateWorker(this, I, N);
            } catch (U) {
              (R = new c("error")).error(U);
            }
            return new h(R, I.type || "string", I.mimeType);
          },
          generateAsync: function(T, R) {
            return this.generateInternalStream(T).accumulate(R);
          },
          generateNodeStream: function(T, R) {
            return (T = T || {}).type || (T.type = "nodebuffer"), this.generateInternalStream(T).toNodejsStream(R);
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
      16: [function(r, n, i) {
        n.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, n, i) {
        var o = r("./DataReader");
        function u(a) {
          o.call(this, a);
          for (var c = 0; c < this.data.length; c++) a[c] = 255 & a[c];
        }
        r("../utils").inherits(u, o), u.prototype.byteAt = function(a) {
          return this.data[this.zero + a];
        }, u.prototype.lastIndexOfSignature = function(a) {
          for (var c = a.charCodeAt(0), h = a.charCodeAt(1), f = a.charCodeAt(2), d = a.charCodeAt(3), _ = this.length - 4; 0 <= _; --_) if (this.data[_] === c && this.data[_ + 1] === h && this.data[_ + 2] === f && this.data[_ + 3] === d) return _ - this.zero;
          return -1;
        }, u.prototype.readAndCheckSignature = function(a) {
          var c = a.charCodeAt(0), h = a.charCodeAt(1), f = a.charCodeAt(2), d = a.charCodeAt(3), _ = this.readData(4);
          return c === _[0] && h === _[1] && f === _[2] && d === _[3];
        }, u.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, n, i) {
        var o = r("../utils");
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
            var c, h = 0;
            for (this.checkOffset(a), c = this.index + a - 1; c >= this.index; c--) h = (h << 8) + this.byteAt(c);
            return this.index += a, h;
          },
          readString: function(a) {
            return o.transformTo("string", this.readData(a));
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
      19: [function(r, n, i) {
        var o = r("./Uint8ArrayReader");
        function u(a) {
          o.call(this, a);
        }
        r("../utils").inherits(u, o), u.prototype.readData = function(a) {
          this.checkOffset(a);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(r, n, i) {
        var o = r("./DataReader");
        function u(a) {
          o.call(this, a);
        }
        r("../utils").inherits(u, o), u.prototype.byteAt = function(a) {
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
      21: [function(r, n, i) {
        var o = r("./ArrayReader");
        function u(a) {
          o.call(this, a);
        }
        r("../utils").inherits(u, o), u.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return /* @__PURE__ */ new Uint8Array(0);
          var c = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(r, n, i) {
        var o = r("../utils"), u = r("../support"), a = r("./ArrayReader"), c = r("./StringReader"), h = r("./NodeBufferReader"), f = r("./Uint8ArrayReader");
        n.exports = function(d) {
          var _ = o.getTypeOf(d);
          return o.checkSupport(_), _ !== "string" || u.uint8array ? _ === "nodebuffer" ? new h(d) : u.uint8array ? new f(o.transformTo("uint8array", d)) : new a(o.transformTo("array", d)) : new c(d);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, n, i) {
        i.LOCAL_FILE_HEADER = "PK", i.CENTRAL_FILE_HEADER = "PK", i.CENTRAL_DIRECTORY_END = "PK", i.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", i.ZIP64_CENTRAL_DIRECTORY_END = "PK", i.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, n, i) {
        var o = r("./GenericWorker"), u = r("../utils");
        function a(c) {
          o.call(this, "ConvertWorker to " + c), this.destType = c;
        }
        u.inherits(a, o), a.prototype.processChunk = function(c) {
          this.push({
            data: u.transformTo(this.destType, c.data),
            meta: c.meta
          });
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(r, n, i) {
        var o = r("./GenericWorker"), u = r("../crc32");
        function a() {
          o.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(a, o), a.prototype.processChunk = function(c) {
          this.streamInfo.crc32 = u(c.data, this.streamInfo.crc32 || 0), this.push(c);
        }, n.exports = a;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(r, n, i) {
        var o = r("../utils"), u = r("./GenericWorker");
        function a(c) {
          u.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        o.inherits(a, u), a.prototype.processChunk = function(c) {
          if (c) {
            var h = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = h + c.data.length;
          }
          u.prototype.processChunk.call(this, c);
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, n, i) {
        var o = r("../utils"), u = r("./GenericWorker");
        function a(c) {
          u.call(this, "DataWorker");
          var h = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(f) {
            h.dataIsReady = !0, h.data = f, h.max = f && f.length || 0, h.type = o.getTypeOf(f), h.isPaused || h._tickAndRepeat();
          }, function(f) {
            h.error(f);
          });
        }
        o.inherits(a, u), a.prototype.cleanUp = function() {
          u.prototype.cleanUp.call(this), this.data = null;
        }, a.prototype.resume = function() {
          return !!u.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, o.delay(this._tickAndRepeat, [], this)), !0);
        }, a.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (o.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, a.prototype._tick = function() {
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
        }, n.exports = a;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(r, n, i) {
        function o(u) {
          this.name = u || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        o.prototype = {
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
        }, n.exports = o;
      }, {}],
      29: [function(r, n, i) {
        var o = r("../utils"), u = r("./ConvertWorker"), a = r("./GenericWorker"), c = r("../base64"), h = r("../support"), f = r("../external"), d = null;
        if (h.nodestream) try {
          d = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function _(g, m) {
          return new f.Promise(function(b, x) {
            var y = [], k = g._internalType, T = g._outputType, R = g._mimeType;
            g.on("data", function(I, N) {
              y.push(I), m && m(N);
            }).on("error", function(I) {
              y = [], x(I);
            }).on("end", function() {
              try {
                b((function(I, N, U) {
                  switch (I) {
                    case "blob":
                      return o.newBlob(o.transformTo("arraybuffer", N), U);
                    case "base64":
                      return c.encode(N);
                    default:
                      return o.transformTo(I, N);
                  }
                })(T, (function(I, N) {
                  var U, F = 0, Z = null, ae = 0;
                  for (U = 0; U < N.length; U++) ae += N[U].length;
                  switch (I) {
                    case "string":
                      return N.join("");
                    case "array":
                      return Array.prototype.concat.apply([], N);
                    case "uint8array":
                      for (Z = new Uint8Array(ae), U = 0; U < N.length; U++) Z.set(N[U], F), F += N[U].length;
                      return Z;
                    case "nodebuffer":
                      return Buffer.concat(N);
                    default:
                      throw new Error("concat : unsupported type '" + I + "'");
                  }
                })(k, y), R));
              } catch (I) {
                x(I);
              }
              y = [];
            }).resume();
          });
        }
        function v(g, m, b) {
          var x = m;
          switch (m) {
            case "blob":
            case "arraybuffer":
              x = "uint8array";
              break;
            case "base64":
              x = "string";
          }
          try {
            this._internalType = x, this._outputType = m, this._mimeType = b, o.checkSupport(x), this._worker = g.pipe(new u(x)), g.lock();
          } catch (y) {
            this._worker = new a("error"), this._worker.error(y);
          }
        }
        v.prototype = {
          accumulate: function(g) {
            return _(this, g);
          },
          on: function(g, m) {
            var b = this;
            return g === "data" ? this._worker.on(g, function(x) {
              m.call(b, x.data, x.meta);
            }) : this._worker.on(g, function() {
              o.delay(m, arguments, b);
            }), this;
          },
          resume: function() {
            return o.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(g) {
            if (o.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new d(this, { objectMode: this._outputType !== "nodebuffer" }, g);
          }
        }, n.exports = v;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(r, n, i) {
        if (i.base64 = !0, i.array = !0, i.string = !0, i.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", i.nodebuffer = typeof Buffer < "u", i.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") i.blob = !1;
        else {
          var o = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            i.blob = new Blob([o], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              u.append(o), i.blob = u.getBlob("application/zip").size === 0;
            } catch {
              i.blob = !1;
            }
          }
        }
        try {
          i.nodestream = !!r("readable-stream").Readable;
        } catch {
          i.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(r, n, i) {
        for (var o = r("./utils"), u = r("./support"), a = r("./nodejsUtils"), c = r("./stream/GenericWorker"), h = new Array(256), f = 0; f < 256; f++) h[f] = 252 <= f ? 6 : 248 <= f ? 5 : 240 <= f ? 4 : 224 <= f ? 3 : 192 <= f ? 2 : 1;
        h[254] = h[254] = 1;
        function d() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function _() {
          c.call(this, "utf-8 encode");
        }
        i.utf8encode = function(v) {
          return u.nodebuffer ? a.newBufferFrom(v, "utf-8") : (function(g) {
            var m, b, x, y, k, T = g.length, R = 0;
            for (y = 0; y < T; y++) (64512 & (b = g.charCodeAt(y))) == 55296 && y + 1 < T && (64512 & (x = g.charCodeAt(y + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (x - 56320), y++), R += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
            for (m = u.uint8array ? new Uint8Array(R) : new Array(R), y = k = 0; k < R; y++) (64512 & (b = g.charCodeAt(y))) == 55296 && y + 1 < T && (64512 & (x = g.charCodeAt(y + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (x - 56320), y++), b < 128 ? m[k++] = b : (b < 2048 ? m[k++] = 192 | b >>> 6 : (b < 65536 ? m[k++] = 224 | b >>> 12 : (m[k++] = 240 | b >>> 18, m[k++] = 128 | b >>> 12 & 63), m[k++] = 128 | b >>> 6 & 63), m[k++] = 128 | 63 & b);
            return m;
          })(v);
        }, i.utf8decode = function(v) {
          return u.nodebuffer ? o.transformTo("nodebuffer", v).toString("utf-8") : (function(g) {
            var m, b, x, y, k = g.length, T = new Array(2 * k);
            for (m = b = 0; m < k; ) if ((x = g[m++]) < 128) T[b++] = x;
            else if (4 < (y = h[x])) T[b++] = 65533, m += y - 1;
            else {
              for (x &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && m < k; ) x = x << 6 | 63 & g[m++], y--;
              1 < y ? T[b++] = 65533 : x < 65536 ? T[b++] = x : (x -= 65536, T[b++] = 55296 | x >> 10 & 1023, T[b++] = 56320 | 1023 & x);
            }
            return T.length !== b && (T.subarray ? T = T.subarray(0, b) : T.length = b), o.applyFromCharCode(T);
          })(v = o.transformTo(u.uint8array ? "uint8array" : "array", v));
        }, o.inherits(d, c), d.prototype.processChunk = function(v) {
          var g = o.transformTo(u.uint8array ? "uint8array" : "array", v.data);
          if (this.leftOver && this.leftOver.length) {
            if (u.uint8array) {
              var m = g;
              (g = new Uint8Array(m.length + this.leftOver.length)).set(this.leftOver, 0), g.set(m, this.leftOver.length);
            } else g = this.leftOver.concat(g);
            this.leftOver = null;
          }
          var b = (function(y, k) {
            var T;
            for ((k = k || y.length) > y.length && (k = y.length), T = k - 1; 0 <= T && (192 & y[T]) == 128; ) T--;
            return T < 0 || T === 0 ? k : T + h[y[T]] > k ? T : k;
          })(g), x = g;
          b !== g.length && (u.uint8array ? (x = g.subarray(0, b), this.leftOver = g.subarray(b, g.length)) : (x = g.slice(0, b), this.leftOver = g.slice(b, g.length))), this.push({
            data: i.utf8decode(x),
            meta: v.meta
          });
        }, d.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: i.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, i.Utf8DecodeWorker = d, o.inherits(_, c), _.prototype.processChunk = function(v) {
          this.push({
            data: i.utf8encode(v.data),
            meta: v.meta
          });
        }, i.Utf8EncodeWorker = _;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, n, i) {
        var o = r("./support"), u = r("./base64"), a = r("./nodejsUtils"), c = r("./external");
        function h(m) {
          return m;
        }
        function f(m, b) {
          for (var x = 0; x < m.length; ++x) b[x] = 255 & m.charCodeAt(x);
          return b;
        }
        r("setimmediate"), i.newBlob = function(m, b) {
          i.checkSupport("blob");
          try {
            return new Blob([m], { type: b });
          } catch {
            try {
              var x = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return x.append(m), x.getBlob(b);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var d = {
          stringifyByChunk: function(m, b, x) {
            var y = [], k = 0, T = m.length;
            if (T <= x) return String.fromCharCode.apply(null, m);
            for (; k < T; ) b === "array" || b === "nodebuffer" ? y.push(String.fromCharCode.apply(null, m.slice(k, Math.min(k + x, T)))) : y.push(String.fromCharCode.apply(null, m.subarray(k, Math.min(k + x, T)))), k += x;
            return y.join("");
          },
          stringifyByChar: function(m) {
            for (var b = "", x = 0; x < m.length; x++) b += String.fromCharCode(m[x]);
            return b;
          },
          applyCanBeUsed: {
            uint8array: (function() {
              try {
                return o.uint8array && String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1)).length === 1;
              } catch {
                return !1;
              }
            })(),
            nodebuffer: (function() {
              try {
                return o.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
              } catch {
                return !1;
              }
            })()
          }
        };
        function _(m) {
          var b = 65536, x = i.getTypeOf(m), y = !0;
          if (x === "uint8array" ? y = d.applyCanBeUsed.uint8array : x === "nodebuffer" && (y = d.applyCanBeUsed.nodebuffer), y) for (; 1 < b; ) try {
            return d.stringifyByChunk(m, x, b);
          } catch {
            b = Math.floor(b / 2);
          }
          return d.stringifyByChar(m);
        }
        function v(m, b) {
          for (var x = 0; x < m.length; x++) b[x] = m[x];
          return b;
        }
        i.applyFromCharCode = _;
        var g = {};
        g.string = {
          string: h,
          array: function(m) {
            return f(m, new Array(m.length));
          },
          arraybuffer: function(m) {
            return g.string.uint8array(m).buffer;
          },
          uint8array: function(m) {
            return f(m, new Uint8Array(m.length));
          },
          nodebuffer: function(m) {
            return f(m, a.allocBuffer(m.length));
          }
        }, g.array = {
          string: _,
          array: h,
          arraybuffer: function(m) {
            return new Uint8Array(m).buffer;
          },
          uint8array: function(m) {
            return new Uint8Array(m);
          },
          nodebuffer: function(m) {
            return a.newBufferFrom(m);
          }
        }, g.arraybuffer = {
          string: function(m) {
            return _(new Uint8Array(m));
          },
          array: function(m) {
            return v(new Uint8Array(m), new Array(m.byteLength));
          },
          arraybuffer: h,
          uint8array: function(m) {
            return new Uint8Array(m);
          },
          nodebuffer: function(m) {
            return a.newBufferFrom(new Uint8Array(m));
          }
        }, g.uint8array = {
          string: _,
          array: function(m) {
            return v(m, new Array(m.length));
          },
          arraybuffer: function(m) {
            return m.buffer;
          },
          uint8array: h,
          nodebuffer: function(m) {
            return a.newBufferFrom(m);
          }
        }, g.nodebuffer = {
          string: _,
          array: function(m) {
            return v(m, new Array(m.length));
          },
          arraybuffer: function(m) {
            return g.nodebuffer.uint8array(m).buffer;
          },
          uint8array: function(m) {
            return v(m, new Uint8Array(m.length));
          },
          nodebuffer: h
        }, i.transformTo = function(m, b) {
          return b = b || "", m ? (i.checkSupport(m), g[i.getTypeOf(b)][m](b)) : b;
        }, i.resolve = function(m) {
          for (var b = m.split("/"), x = [], y = 0; y < b.length; y++) {
            var k = b[y];
            k === "." || k === "" && y !== 0 && y !== b.length - 1 || (k === ".." ? x.pop() : x.push(k));
          }
          return x.join("/");
        }, i.getTypeOf = function(m) {
          if (typeof m == "string") return "string";
          var b = Object.prototype.toString.call(m);
          return b === "[object Array]" ? "array" : o.nodebuffer && a.isBuffer(m) ? "nodebuffer" : o.uint8array && b === "[object Uint8Array]" ? "uint8array" : o.arraybuffer && b === "[object ArrayBuffer]" ? "arraybuffer" : void 0;
        }, i.checkSupport = function(m) {
          if (!o[m.toLowerCase()]) throw new Error(m + " is not supported by this platform");
        }, i.MAX_VALUE_16BITS = 65535, i.MAX_VALUE_32BITS = -1, i.pretty = function(m) {
          var b, x, y = "";
          for (x = 0; x < (m || "").length; x++) y += "\\x" + ((b = m.charCodeAt(x)) < 16 ? "0" : "") + b.toString(16).toUpperCase();
          return y;
        }, i.delay = function(m, b, x) {
          setImmediate(function() {
            m.apply(x || null, b || []);
          });
        }, i.inherits = function(m, b) {
          function x() {
          }
          x.prototype = b.prototype, m.prototype = new x();
        }, i.extend = function() {
          var m, b, x = {};
          for (m = 0; m < arguments.length; m++) for (b in arguments[m]) Object.prototype.hasOwnProperty.call(arguments[m], b) && x[b] === void 0 && (x[b] = arguments[m][b]);
          return x;
        }, i.prepareContent = function(m, b, x, y, k) {
          return c.Promise.resolve(b).then(function(T) {
            return o.blob && (T instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(T)) !== -1) ? Blob.prototype.arrayBuffer !== void 0 ? T.arrayBuffer() : typeof FileReader < "u" ? new c.Promise(function(R, I) {
              var N = new FileReader();
              N.onload = function(U) {
                R(U.target.result);
              }, N.onerror = function(U) {
                I(U.target.error);
              }, N.readAsArrayBuffer(T);
            }) : c.Promise.reject(/* @__PURE__ */ new Error(m + " is a Blob, but we have no way of reading it.")) : T;
          }).then(function(T) {
            var R = i.getTypeOf(T);
            return R ? (R === "arraybuffer" ? T = i.transformTo("uint8array", T) : R === "string" && (k ? T = u.decode(T) : x && y !== !0 && (T = (function(I) {
              return f(I, o.uint8array ? new Uint8Array(I.length) : new Array(I.length));
            })(T))), T) : c.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + m + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(r, n, i) {
        var o = r("./reader/readerFor"), u = r("./utils"), a = r("./signature"), c = r("./zipEntry"), h = r("./support");
        function f(d) {
          this.files = [], this.loadOptions = d;
        }
        f.prototype = {
          checkSignature: function(d) {
            if (!this.reader.readAndCheckSignature(d)) {
              this.reader.index -= 4;
              var _ = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + u.pretty(_) + ", expected " + u.pretty(d) + ")");
            }
          },
          isSignature: function(d, _) {
            var v = this.reader.index;
            this.reader.setIndex(d);
            var g = this.reader.readString(4) === _;
            return this.reader.setIndex(v), g;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var d = this.reader.readData(this.zipCommentLength), _ = h.uint8array ? "uint8array" : "array", v = u.transformTo(_, d);
            this.zipComment = this.loadOptions.decodeFileName(v);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var d, _, v, g = this.zip64EndOfCentralSize - 44; 0 < g; ) d = this.reader.readInt(2), _ = this.reader.readInt(4), v = this.reader.readData(_), this.zip64ExtensibleData[d] = {
              id: d,
              length: _,
              value: v
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            for (var d = 0, _; d < this.files.length; d++) _ = this.files[d], this.reader.setIndex(_.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), _.readLocalPart(this.reader), _.handleUTF8(), _.processAttributes();
          },
          readCentralDir: function() {
            var d;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (d = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(d);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var d = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
            if (d < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(d);
            var _ = d;
            if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === u.MAX_VALUE_16BITS || this.diskWithCentralDirStart === u.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === u.MAX_VALUE_16BITS || this.centralDirRecords === u.MAX_VALUE_16BITS || this.centralDirSize === u.MAX_VALUE_32BITS || this.centralDirOffset === u.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (d = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(d), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var v = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (v += 20, v += 12 + this.zip64EndOfCentralSize);
            var g = _ - v;
            if (0 < g) this.isSignature(_, a.CENTRAL_FILE_HEADER) || (this.reader.zero = g);
            else if (g < 0) throw new Error("Corrupted zip: missing " + Math.abs(g) + " bytes.");
          },
          prepareReader: function(d) {
            this.reader = o(d);
          },
          load: function(d) {
            this.prepareReader(d), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, n.exports = f;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(r, n, i) {
        var o = r("./reader/readerFor"), u = r("./utils"), a = r("./compressedObject"), c = r("./crc32"), h = r("./utf8"), f = r("./compressions"), d = r("./support");
        function _(v, g) {
          this.options = v, this.loadOptions = g;
        }
        _.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(v) {
            var g, m;
            if (v.skip(22), this.fileNameLength = v.readInt(2), m = v.readInt(2), this.fileName = v.readData(this.fileNameLength), v.skip(m), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((g = (function(b) {
              for (var x in f) if (Object.prototype.hasOwnProperty.call(f, x) && f[x].magic === b) return f[x];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + u.pretty(this.compressionMethod) + " unknown (inner file : " + u.transformTo("string", this.fileName) + ")");
            this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, g, v.readData(this.compressedSize));
          },
          readCentralPart: function(v) {
            this.versionMadeBy = v.readInt(2), v.skip(2), this.bitFlag = v.readInt(2), this.compressionMethod = v.readString(2), this.date = v.readDate(), this.crc32 = v.readInt(4), this.compressedSize = v.readInt(4), this.uncompressedSize = v.readInt(4);
            var g = v.readInt(2);
            if (this.extraFieldsLength = v.readInt(2), this.fileCommentLength = v.readInt(2), this.diskNumberStart = v.readInt(2), this.internalFileAttributes = v.readInt(2), this.externalFileAttributes = v.readInt(4), this.localHeaderOffset = v.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            v.skip(g), this.readExtraFields(v), this.parseZIP64ExtraField(v), this.fileComment = v.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var v = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), v == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), v == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var v = o(this.extraFields[1].value);
              this.uncompressedSize === u.MAX_VALUE_32BITS && (this.uncompressedSize = v.readInt(8)), this.compressedSize === u.MAX_VALUE_32BITS && (this.compressedSize = v.readInt(8)), this.localHeaderOffset === u.MAX_VALUE_32BITS && (this.localHeaderOffset = v.readInt(8)), this.diskNumberStart === u.MAX_VALUE_32BITS && (this.diskNumberStart = v.readInt(4));
            }
          },
          readExtraFields: function(v) {
            var g, m, b, x = v.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); v.index + 4 < x; ) g = v.readInt(2), m = v.readInt(2), b = v.readData(m), this.extraFields[g] = {
              id: g,
              length: m,
              value: b
            };
            v.setIndex(x);
          },
          handleUTF8: function() {
            var v = d.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = h.utf8decode(this.fileName), this.fileCommentStr = h.utf8decode(this.fileComment);
            else {
              var g = this.findExtraFieldUnicodePath();
              if (g !== null) this.fileNameStr = g;
              else {
                var m = u.transformTo(v, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(m);
              }
              var b = this.findExtraFieldUnicodeComment();
              if (b !== null) this.fileCommentStr = b;
              else {
                var x = u.transformTo(v, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(x);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var v = this.extraFields[28789];
            if (v) {
              var g = o(v.value);
              return g.readInt(1) !== 1 || c(this.fileName) !== g.readInt(4) ? null : h.utf8decode(g.readData(v.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var v = this.extraFields[25461];
            if (v) {
              var g = o(v.value);
              return g.readInt(1) !== 1 || c(this.fileComment) !== g.readInt(4) ? null : h.utf8decode(g.readData(v.length - 5));
            }
            return null;
          }
        }, n.exports = _;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(r, n, i) {
        function o(g, m, b) {
          this.name = g, this.dir = b.dir, this.date = b.date, this.comment = b.comment, this.unixPermissions = b.unixPermissions, this.dosPermissions = b.dosPermissions, this._data = m, this._dataBinary = b.binary, this.options = {
            compression: b.compression,
            compressionOptions: b.compressionOptions
          };
        }
        var u = r("./stream/StreamHelper"), a = r("./stream/DataWorker"), c = r("./utf8"), h = r("./compressedObject"), f = r("./stream/GenericWorker");
        o.prototype = {
          internalStream: function(g) {
            var m = null, b = "string";
            try {
              if (!g) throw new Error("No output type specified.");
              var x = (b = g.toLowerCase()) === "string" || b === "text";
              b !== "binarystring" && b !== "text" || (b = "string"), m = this._decompressWorker();
              var y = !this._dataBinary;
              y && !x && (m = m.pipe(new c.Utf8EncodeWorker())), !y && x && (m = m.pipe(new c.Utf8DecodeWorker()));
            } catch (k) {
              (m = new f("error")).error(k);
            }
            return new u(m, b, "");
          },
          async: function(g, m) {
            return this.internalStream(g).accumulate(m);
          },
          nodeStream: function(g, m) {
            return this.internalStream(g || "nodebuffer").toNodejsStream(m);
          },
          _compressWorker: function(g, m) {
            if (this._data instanceof h && this._data.compression.magic === g.magic) return this._data.getCompressedWorker();
            var b = this._decompressWorker();
            return this._dataBinary || (b = b.pipe(new c.Utf8EncodeWorker())), h.createWorkerFrom(b, g, m);
          },
          _decompressWorker: function() {
            return this._data instanceof h ? this._data.getContentWorker() : this._data instanceof f ? this._data : new a(this._data);
          }
        };
        for (var d = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], _ = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, v = 0; v < d.length; v++) o.prototype[d[v]] = _;
        n.exports = o;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(r, n, i) {
        (function(o) {
          var u, a, c = o.MutationObserver || o.WebKitMutationObserver;
          if (c) {
            var h = 0, f = new c(g), d = o.document.createTextNode("");
            f.observe(d, { characterData: !0 }), u = function() {
              d.data = h = ++h % 2;
            };
          } else if (o.setImmediate || o.MessageChannel === void 0) u = "document" in o && "onreadystatechange" in o.document.createElement("script") ? function() {
            var m = o.document.createElement("script");
            m.onreadystatechange = function() {
              g(), m.onreadystatechange = null, m.parentNode.removeChild(m), m = null;
            }, o.document.documentElement.appendChild(m);
          } : function() {
            setTimeout(g, 0);
          };
          else {
            var _ = new o.MessageChannel();
            _.port1.onmessage = g, u = function() {
              _.port2.postMessage(0);
            };
          }
          var v = [];
          function g() {
            var m, b;
            a = !0;
            for (var x = v.length; x; ) {
              for (b = v, v = [], m = -1; ++m < x; ) b[m]();
              x = v.length;
            }
            a = !1;
          }
          n.exports = function(m) {
            v.push(m) !== 1 || a || u();
          };
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, n, i) {
        var o = r("immediate");
        function u() {
        }
        var a = {}, c = ["REJECTED"], h = ["FULFILLED"], f = ["PENDING"];
        function d(x) {
          if (typeof x != "function") throw new TypeError("resolver must be a function");
          this.state = f, this.queue = [], this.outcome = void 0, x !== u && m(this, x);
        }
        function _(x, y, k) {
          this.promise = x, typeof y == "function" && (this.onFulfilled = y, this.callFulfilled = this.otherCallFulfilled), typeof k == "function" && (this.onRejected = k, this.callRejected = this.otherCallRejected);
        }
        function v(x, y, k) {
          o(function() {
            var T;
            try {
              T = y(k);
            } catch (R) {
              return a.reject(x, R);
            }
            T === x ? a.reject(x, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : a.resolve(x, T);
          });
        }
        function g(x) {
          var y = x && x.then;
          if (x && (typeof x == "object" || typeof x == "function") && typeof y == "function") return function() {
            y.apply(x, arguments);
          };
        }
        function m(x, y) {
          var k = !1;
          function T(N) {
            k || (k = !0, a.reject(x, N));
          }
          function R(N) {
            k || (k = !0, a.resolve(x, N));
          }
          var I = b(function() {
            y(R, T);
          });
          I.status === "error" && T(I.value);
        }
        function b(x, y) {
          var k = {};
          try {
            k.value = x(y), k.status = "success";
          } catch (T) {
            k.status = "error", k.value = T;
          }
          return k;
        }
        (n.exports = d).prototype.finally = function(x) {
          if (typeof x != "function") return this;
          var y = this.constructor;
          return this.then(function(k) {
            return y.resolve(x()).then(function() {
              return k;
            });
          }, function(k) {
            return y.resolve(x()).then(function() {
              throw k;
            });
          });
        }, d.prototype.catch = function(x) {
          return this.then(null, x);
        }, d.prototype.then = function(x, y) {
          if (typeof x != "function" && this.state === h || typeof y != "function" && this.state === c) return this;
          var k = new this.constructor(u);
          return this.state !== f ? v(k, this.state === h ? x : y, this.outcome) : this.queue.push(new _(k, x, y)), k;
        }, _.prototype.callFulfilled = function(x) {
          a.resolve(this.promise, x);
        }, _.prototype.otherCallFulfilled = function(x) {
          v(this.promise, this.onFulfilled, x);
        }, _.prototype.callRejected = function(x) {
          a.reject(this.promise, x);
        }, _.prototype.otherCallRejected = function(x) {
          v(this.promise, this.onRejected, x);
        }, a.resolve = function(x, y) {
          var k = b(g, y);
          if (k.status === "error") return a.reject(x, k.value);
          var T = k.value;
          if (T) m(x, T);
          else {
            x.state = h, x.outcome = y;
            for (var R = -1, I = x.queue.length; ++R < I; ) x.queue[R].callFulfilled(y);
          }
          return x;
        }, a.reject = function(x, y) {
          x.state = c, x.outcome = y;
          for (var k = -1, T = x.queue.length; ++k < T; ) x.queue[k].callRejected(y);
          return x;
        }, d.resolve = function(x) {
          return x instanceof this ? x : a.resolve(new this(u), x);
        }, d.reject = function(x) {
          var y = new this(u);
          return a.reject(y, x);
        }, d.all = function(x) {
          var y = this;
          if (Object.prototype.toString.call(x) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var k = x.length, T = !1;
          if (!k) return this.resolve([]);
          for (var R = new Array(k), I = 0, N = -1, U = new this(u); ++N < k; ) F(x[N], N);
          return U;
          function F(Z, ae) {
            y.resolve(Z).then(function(A) {
              R[ae] = A, ++I !== k || T || (T = !0, a.resolve(U, R));
            }, function(A) {
              T || (T = !0, a.reject(U, A));
            });
          }
        }, d.race = function(x) {
          var y = this;
          if (Object.prototype.toString.call(x) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var k = x.length, T = !1;
          if (!k) return this.resolve([]);
          for (var R = -1, I = new this(u); ++R < k; ) N = x[R], y.resolve(N).then(function(U) {
            T || (T = !0, a.resolve(I, U));
          }, function(U) {
            T || (T = !0, a.reject(I, U));
          });
          var N;
          return I;
        };
      }, { immediate: 36 }],
      38: [function(r, n, i) {
        var o = {};
        (0, r("./lib/utils/common").assign)(o, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = o;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, n, i) {
        var o = r("./zlib/deflate"), u = r("./utils/common"), a = r("./utils/strings"), c = r("./zlib/messages"), h = r("./zlib/zstream"), f = Object.prototype.toString, d = 0, _ = -1, v = 0, g = 8;
        function m(x) {
          if (!(this instanceof m)) return new m(x);
          this.options = u.assign({
            level: _,
            method: g,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: v,
            to: ""
          }, x || {});
          var y = this.options;
          y.raw && 0 < y.windowBits ? y.windowBits = -y.windowBits : y.gzip && 0 < y.windowBits && y.windowBits < 16 && (y.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new h(), this.strm.avail_out = 0;
          var k = o.deflateInit2(this.strm, y.level, y.method, y.windowBits, y.memLevel, y.strategy);
          if (k !== d) throw new Error(c[k]);
          if (y.header && o.deflateSetHeader(this.strm, y.header), y.dictionary) {
            var T = typeof y.dictionary == "string" ? a.string2buf(y.dictionary) : f.call(y.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(y.dictionary) : y.dictionary;
            if ((k = o.deflateSetDictionary(this.strm, T)) !== d) throw new Error(c[k]);
            this._dict_set = !0;
          }
        }
        function b(x, y) {
          var k = new m(y);
          if (k.push(x, !0), k.err) throw k.msg || c[k.err];
          return k.result;
        }
        m.prototype.push = function(x, y) {
          var k, T, R = this.strm, I = this.options.chunkSize;
          if (this.ended) return !1;
          T = y === ~~y ? y : y === !0 ? 4 : 0, typeof x == "string" ? R.input = a.string2buf(x) : f.call(x) === "[object ArrayBuffer]" ? R.input = new Uint8Array(x) : R.input = x, R.next_in = 0, R.avail_in = R.input.length;
          do {
            if (R.avail_out === 0 && (R.output = new u.Buf8(I), R.next_out = 0, R.avail_out = I), (k = o.deflate(R, T)) !== 1 && k !== d) return this.onEnd(k), !(this.ended = !0);
            R.avail_out !== 0 && (R.avail_in !== 0 || T !== 4 && T !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(u.shrinkBuf(R.output, R.next_out))) : this.onData(u.shrinkBuf(R.output, R.next_out)));
          } while ((0 < R.avail_in || R.avail_out === 0) && k !== 1);
          return T === 4 ? (k = o.deflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === d) : T !== 2 || (this.onEnd(d), !(R.avail_out = 0));
        }, m.prototype.onData = function(x) {
          this.chunks.push(x);
        }, m.prototype.onEnd = function(x) {
          x === d && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = x, this.msg = this.strm.msg;
        }, i.Deflate = m, i.deflate = b, i.deflateRaw = function(x, y) {
          return (y = y || {}).raw = !0, b(x, y);
        }, i.gzip = function(x, y) {
          return (y = y || {}).gzip = !0, b(x, y);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, n, i) {
        var o = r("./zlib/inflate"), u = r("./utils/common"), a = r("./utils/strings"), c = r("./zlib/constants"), h = r("./zlib/messages"), f = r("./zlib/zstream"), d = r("./zlib/gzheader"), _ = Object.prototype.toString;
        function v(m) {
          if (!(this instanceof v)) return new v(m);
          this.options = u.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, m || {});
          var b = this.options;
          b.raw && 0 <= b.windowBits && b.windowBits < 16 && (b.windowBits = -b.windowBits, b.windowBits === 0 && (b.windowBits = -15)), !(0 <= b.windowBits && b.windowBits < 16) || m && m.windowBits || (b.windowBits += 32), 15 < b.windowBits && b.windowBits < 48 && (15 & b.windowBits) == 0 && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new f(), this.strm.avail_out = 0;
          var x = o.inflateInit2(this.strm, b.windowBits);
          if (x !== c.Z_OK) throw new Error(h[x]);
          this.header = new d(), o.inflateGetHeader(this.strm, this.header);
        }
        function g(m, b) {
          var x = new v(b);
          if (x.push(m, !0), x.err) throw x.msg || h[x.err];
          return x.result;
        }
        v.prototype.push = function(m, b) {
          var x, y, k, T, R, I, N = this.strm, U = this.options.chunkSize, F = this.options.dictionary, Z = !1;
          if (this.ended) return !1;
          y = b === ~~b ? b : b === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof m == "string" ? N.input = a.binstring2buf(m) : _.call(m) === "[object ArrayBuffer]" ? N.input = new Uint8Array(m) : N.input = m, N.next_in = 0, N.avail_in = N.input.length;
          do {
            if (N.avail_out === 0 && (N.output = new u.Buf8(U), N.next_out = 0, N.avail_out = U), (x = o.inflate(N, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && F && (I = typeof F == "string" ? a.string2buf(F) : _.call(F) === "[object ArrayBuffer]" ? new Uint8Array(F) : F, x = o.inflateSetDictionary(this.strm, I)), x === c.Z_BUF_ERROR && Z === !0 && (x = c.Z_OK, Z = !1), x !== c.Z_STREAM_END && x !== c.Z_OK) return this.onEnd(x), !(this.ended = !0);
            N.next_out && (N.avail_out !== 0 && x !== c.Z_STREAM_END && (N.avail_in !== 0 || y !== c.Z_FINISH && y !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (k = a.utf8border(N.output, N.next_out), T = N.next_out - k, R = a.buf2string(N.output, k), N.next_out = T, N.avail_out = U - T, T && u.arraySet(N.output, N.output, k, T, 0), this.onData(R)) : this.onData(u.shrinkBuf(N.output, N.next_out)))), N.avail_in === 0 && N.avail_out === 0 && (Z = !0);
          } while ((0 < N.avail_in || N.avail_out === 0) && x !== c.Z_STREAM_END);
          return x === c.Z_STREAM_END && (y = c.Z_FINISH), y === c.Z_FINISH ? (x = o.inflateEnd(this.strm), this.onEnd(x), this.ended = !0, x === c.Z_OK) : y !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(N.avail_out = 0));
        }, v.prototype.onData = function(m) {
          this.chunks.push(m);
        }, v.prototype.onEnd = function(m) {
          m === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
        }, i.Inflate = v, i.inflate = g, i.inflateRaw = function(m, b) {
          return (b = b || {}).raw = !0, g(m, b);
        }, i.ungzip = g;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, n, i) {
        var o = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        i.assign = function(c) {
          for (var h = Array.prototype.slice.call(arguments, 1); h.length; ) {
            var f = h.shift();
            if (f) {
              if (typeof f != "object") throw new TypeError(f + "must be non-object");
              for (var d in f) f.hasOwnProperty(d) && (c[d] = f[d]);
            }
          }
          return c;
        }, i.shrinkBuf = function(c, h) {
          return c.length === h ? c : c.subarray ? c.subarray(0, h) : (c.length = h, c);
        };
        var u = {
          arraySet: function(c, h, f, d, _) {
            if (h.subarray && c.subarray) c.set(h.subarray(f, f + d), _);
            else for (var v = 0; v < d; v++) c[_ + v] = h[f + v];
          },
          flattenChunks: function(c) {
            for (var h = d = 0, f = c.length, d, _, v, g; h < f; h++) d += c[h].length;
            for (g = new Uint8Array(d), h = _ = 0, f = c.length; h < f; h++) v = c[h], g.set(v, _), _ += v.length;
            return g;
          }
        }, a = {
          arraySet: function(c, h, f, d, _) {
            for (var v = 0; v < d; v++) c[_ + v] = h[f + v];
          },
          flattenChunks: function(c) {
            return [].concat.apply([], c);
          }
        };
        i.setTyped = function(c) {
          c ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, u)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, a));
        }, i.setTyped(o);
      }, {}],
      42: [function(r, n, i) {
        var o = r("./common"), u = !0, a = !0;
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
        for (var c = new o.Buf8(256), h = 0; h < 256; h++) c[h] = 252 <= h ? 6 : 248 <= h ? 5 : 240 <= h ? 4 : 224 <= h ? 3 : 192 <= h ? 2 : 1;
        function f(d, _) {
          if (_ < 65537 && (d.subarray && a || !d.subarray && u)) return String.fromCharCode.apply(null, o.shrinkBuf(d, _));
          for (var v = "", g = 0; g < _; g++) v += String.fromCharCode(d[g]);
          return v;
        }
        c[254] = c[254] = 1, i.string2buf = function(d) {
          var _, v, g, m, b, x = d.length, y = 0;
          for (m = 0; m < x; m++) (64512 & (v = d.charCodeAt(m))) == 55296 && m + 1 < x && (64512 & (g = d.charCodeAt(m + 1))) == 56320 && (v = 65536 + (v - 55296 << 10) + (g - 56320), m++), y += v < 128 ? 1 : v < 2048 ? 2 : v < 65536 ? 3 : 4;
          for (_ = new o.Buf8(y), m = b = 0; b < y; m++) (64512 & (v = d.charCodeAt(m))) == 55296 && m + 1 < x && (64512 & (g = d.charCodeAt(m + 1))) == 56320 && (v = 65536 + (v - 55296 << 10) + (g - 56320), m++), v < 128 ? _[b++] = v : (v < 2048 ? _[b++] = 192 | v >>> 6 : (v < 65536 ? _[b++] = 224 | v >>> 12 : (_[b++] = 240 | v >>> 18, _[b++] = 128 | v >>> 12 & 63), _[b++] = 128 | v >>> 6 & 63), _[b++] = 128 | 63 & v);
          return _;
        }, i.buf2binstring = function(d) {
          return f(d, d.length);
        }, i.binstring2buf = function(d) {
          for (var _ = new o.Buf8(d.length), v = 0, g = _.length; v < g; v++) _[v] = d.charCodeAt(v);
          return _;
        }, i.buf2string = function(d, _) {
          var v, g, m, b, x = _ || d.length, y = new Array(2 * x);
          for (v = g = 0; v < x; ) if ((m = d[v++]) < 128) y[g++] = m;
          else if (4 < (b = c[m])) y[g++] = 65533, v += b - 1;
          else {
            for (m &= b === 2 ? 31 : b === 3 ? 15 : 7; 1 < b && v < x; ) m = m << 6 | 63 & d[v++], b--;
            1 < b ? y[g++] = 65533 : m < 65536 ? y[g++] = m : (m -= 65536, y[g++] = 55296 | m >> 10 & 1023, y[g++] = 56320 | 1023 & m);
          }
          return f(y, g);
        }, i.utf8border = function(d, _) {
          var v;
          for ((_ = _ || d.length) > d.length && (_ = d.length), v = _ - 1; 0 <= v && (192 & d[v]) == 128; ) v--;
          return v < 0 || v === 0 ? _ : v + c[d[v]] > _ ? v : _;
        };
      }, { "./common": 41 }],
      43: [function(r, n, i) {
        n.exports = function(o, u, a, c) {
          for (var h = 65535 & o | 0, f = o >>> 16 & 65535 | 0, d = 0; a !== 0; ) {
            for (a -= d = 2e3 < a ? 2e3 : a; f = f + (h = h + u[c++] | 0) | 0, --d; ) ;
            h %= 65521, f %= 65521;
          }
          return h | f << 16 | 0;
        };
      }, {}],
      44: [function(r, n, i) {
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
      45: [function(r, n, i) {
        var o = (function() {
          for (var u, a = [], c = 0; c < 256; c++) {
            u = c;
            for (var h = 0; h < 8; h++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
            a[c] = u;
          }
          return a;
        })();
        n.exports = function(u, a, c, h) {
          var f = o, d = h + c;
          u ^= -1;
          for (var _ = h; _ < d; _++) u = u >>> 8 ^ f[255 & (u ^ a[_])];
          return -1 ^ u;
        };
      }, {}],
      46: [function(r, n, i) {
        var o, u = r("../utils/common"), a = r("./trees"), c = r("./adler32"), h = r("./crc32"), f = r("./messages"), d = 0, _ = 4, v = 0, g = -2, m = -1, b = 4, x = 2, y = 8, k = 9, T = 286, R = 30, I = 19, N = 2 * T + 1, U = 15, F = 3, Z = 258, ae = Z + F + 1, A = 42, M = 113, S = 1, W = 2, J = 3, K = 4;
        function oe(p, z) {
          return p.msg = f[z], z;
        }
        function V(p) {
          return (p << 1) - (4 < p ? 9 : 0);
        }
        function Q(p) {
          for (var z = p.length; 0 <= --z; ) p[z] = 0;
        }
        function H(p) {
          var z = p.state, E = z.pending;
          E > p.avail_out && (E = p.avail_out), E !== 0 && (u.arraySet(p.output, z.pending_buf, z.pending_out, E, p.next_out), p.next_out += E, z.pending_out += E, p.total_out += E, p.avail_out -= E, z.pending -= E, z.pending === 0 && (z.pending_out = 0));
        }
        function C(p, z) {
          a._tr_flush_block(p, 0 <= p.block_start ? p.block_start : -1, p.strstart - p.block_start, z), p.block_start = p.strstart, H(p.strm);
        }
        function q(p, z) {
          p.pending_buf[p.pending++] = z;
        }
        function X(p, z) {
          p.pending_buf[p.pending++] = z >>> 8 & 255, p.pending_buf[p.pending++] = 255 & z;
        }
        function ee(p, z) {
          var E, s, l = p.max_chain_length, w = p.strstart, L = p.prev_length, j = p.nice_match, D = p.strstart > p.w_size - ae ? p.strstart - (p.w_size - ae) : 0, te = p.window, ue = p.w_mask, ie = p.prev, de = p.strstart + Z, me = te[w + L - 1], we = te[w + L];
          p.prev_length >= p.good_match && (l >>= 2), j > p.lookahead && (j = p.lookahead);
          do
            if (te[(E = z) + L] === we && te[E + L - 1] === me && te[E] === te[w] && te[++E] === te[w + 1]) {
              w += 2, E++;
              do
                ;
              while (te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && te[++w] === te[++E] && w < de);
              if (s = Z - (de - w), w = de - Z, L < s) {
                if (p.match_start = z, j <= (L = s)) break;
                me = te[w + L - 1], we = te[w + L];
              }
            }
          while ((z = ie[z & ue]) > D && --l != 0);
          return L <= p.lookahead ? L : p.lookahead;
        }
        function pe(p) {
          var z, E, s, l, w, L, j, D, te, ue, ie = p.w_size;
          do {
            if (l = p.window_size - p.lookahead - p.strstart, p.strstart >= ie + (ie - ae)) {
              for (u.arraySet(p.window, p.window, ie, ie, 0), p.match_start -= ie, p.strstart -= ie, p.block_start -= ie, z = E = p.hash_size; s = p.head[--z], p.head[z] = ie <= s ? s - ie : 0, --E; ) ;
              for (z = E = ie; s = p.prev[--z], p.prev[z] = ie <= s ? s - ie : 0, --E; ) ;
              l += ie;
            }
            if (p.strm.avail_in === 0) break;
            if (L = p.strm, j = p.window, D = p.strstart + p.lookahead, te = l, ue = void 0, ue = L.avail_in, te < ue && (ue = te), E = ue === 0 ? 0 : (L.avail_in -= ue, u.arraySet(j, L.input, L.next_in, ue, D), L.state.wrap === 1 ? L.adler = c(L.adler, j, ue, D) : L.state.wrap === 2 && (L.adler = h(L.adler, j, ue, D)), L.next_in += ue, L.total_in += ue, ue), p.lookahead += E, p.lookahead + p.insert >= F) for (w = p.strstart - p.insert, p.ins_h = p.window[w], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[w + 1]) & p.hash_mask; p.insert && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[w + F - 1]) & p.hash_mask, p.prev[w & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = w, w++, p.insert--, !(p.lookahead + p.insert < F)); ) ;
          } while (p.lookahead < ae && p.strm.avail_in !== 0);
        }
        function $(p, z) {
          for (var E, s; ; ) {
            if (p.lookahead < ae) {
              if (pe(p), p.lookahead < ae && z === d) return S;
              if (p.lookahead === 0) break;
            }
            if (E = 0, p.lookahead >= F && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + F - 1]) & p.hash_mask, E = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), E !== 0 && p.strstart - E <= p.w_size - ae && (p.match_length = ee(p, E)), p.match_length >= F) if (s = a._tr_tally(p, p.strstart - p.match_start, p.match_length - F), p.lookahead -= p.match_length, p.match_length <= p.max_lazy_match && p.lookahead >= F) {
              for (p.match_length--; p.strstart++, p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + F - 1]) & p.hash_mask, E = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart, --p.match_length != 0; ) ;
              p.strstart++;
            } else p.strstart += p.match_length, p.match_length = 0, p.ins_h = p.window[p.strstart], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + 1]) & p.hash_mask;
            else s = a._tr_tally(p, 0, p.window[p.strstart]), p.lookahead--, p.strstart++;
            if (s && (C(p, !1), p.strm.avail_out === 0)) return S;
          }
          return p.insert = p.strstart < F - 1 ? p.strstart : F - 1, z === _ ? (C(p, !0), p.strm.avail_out === 0 ? J : K) : p.last_lit && (C(p, !1), p.strm.avail_out === 0) ? S : W;
        }
        function B(p, z) {
          for (var E, s, l; ; ) {
            if (p.lookahead < ae) {
              if (pe(p), p.lookahead < ae && z === d) return S;
              if (p.lookahead === 0) break;
            }
            if (E = 0, p.lookahead >= F && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + F - 1]) & p.hash_mask, E = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), p.prev_length = p.match_length, p.prev_match = p.match_start, p.match_length = F - 1, E !== 0 && p.prev_length < p.max_lazy_match && p.strstart - E <= p.w_size - ae && (p.match_length = ee(p, E), p.match_length <= 5 && (p.strategy === 1 || p.match_length === F && 4096 < p.strstart - p.match_start) && (p.match_length = F - 1)), p.prev_length >= F && p.match_length <= p.prev_length) {
              for (l = p.strstart + p.lookahead - F, s = a._tr_tally(p, p.strstart - 1 - p.prev_match, p.prev_length - F), p.lookahead -= p.prev_length - 1, p.prev_length -= 2; ++p.strstart <= l && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + F - 1]) & p.hash_mask, E = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), --p.prev_length != 0; ) ;
              if (p.match_available = 0, p.match_length = F - 1, p.strstart++, s && (C(p, !1), p.strm.avail_out === 0)) return S;
            } else if (p.match_available) {
              if ((s = a._tr_tally(p, 0, p.window[p.strstart - 1])) && C(p, !1), p.strstart++, p.lookahead--, p.strm.avail_out === 0) return S;
            } else p.match_available = 1, p.strstart++, p.lookahead--;
          }
          return p.match_available && (s = a._tr_tally(p, 0, p.window[p.strstart - 1]), p.match_available = 0), p.insert = p.strstart < F - 1 ? p.strstart : F - 1, z === _ ? (C(p, !0), p.strm.avail_out === 0 ? J : K) : p.last_lit && (C(p, !1), p.strm.avail_out === 0) ? S : W;
        }
        function Y(p, z, E, s, l) {
          this.good_length = p, this.max_lazy = z, this.nice_length = E, this.max_chain = s, this.func = l;
        }
        function se() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(2 * N), this.dyn_dtree = new u.Buf16(2 * (2 * R + 1)), this.bl_tree = new u.Buf16(2 * (2 * I + 1)), Q(this.dyn_ltree), Q(this.dyn_dtree), Q(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(U + 1), this.heap = new u.Buf16(2 * T + 1), Q(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(2 * T + 1), Q(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function he(p) {
          var z;
          return p && p.state ? (p.total_in = p.total_out = 0, p.data_type = x, (z = p.state).pending = 0, z.pending_out = 0, z.wrap < 0 && (z.wrap = -z.wrap), z.status = z.wrap ? A : M, p.adler = z.wrap === 2 ? 0 : 1, z.last_flush = d, a._tr_init(z), v) : oe(p, g);
        }
        function O(p) {
          var z = he(p);
          return z === v && (function(E) {
            E.window_size = 2 * E.w_size, Q(E.head), E.max_lazy_match = o[E.level].max_lazy, E.good_match = o[E.level].good_length, E.nice_match = o[E.level].nice_length, E.max_chain_length = o[E.level].max_chain, E.strstart = 0, E.block_start = 0, E.lookahead = 0, E.insert = 0, E.match_length = E.prev_length = F - 1, E.match_available = 0, E.ins_h = 0;
          })(p.state), z;
        }
        function P(p, z, E, s, l, w) {
          if (!p) return g;
          var L = 1;
          if (z === m && (z = 6), s < 0 ? (L = 0, s = -s) : 15 < s && (L = 2, s -= 16), l < 1 || k < l || E !== y || s < 8 || 15 < s || z < 0 || 9 < z || w < 0 || b < w) return oe(p, g);
          s === 8 && (s = 9);
          var j = new se();
          return (p.state = j).strm = p, j.wrap = L, j.gzhead = null, j.w_bits = s, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = l + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + F - 1) / F), j.window = new u.Buf8(2 * j.w_size), j.head = new u.Buf16(j.hash_size), j.prev = new u.Buf16(j.w_size), j.lit_bufsize = 1 << l + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new u.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = z, j.strategy = w, j.method = E, O(p);
        }
        o = [
          new Y(0, 0, 0, 0, function(p, z) {
            var E = 65535;
            for (E > p.pending_buf_size - 5 && (E = p.pending_buf_size - 5); ; ) {
              if (p.lookahead <= 1) {
                if (pe(p), p.lookahead === 0 && z === d) return S;
                if (p.lookahead === 0) break;
              }
              p.strstart += p.lookahead, p.lookahead = 0;
              var s = p.block_start + E;
              if ((p.strstart === 0 || p.strstart >= s) && (p.lookahead = p.strstart - s, p.strstart = s, C(p, !1), p.strm.avail_out === 0) || p.strstart - p.block_start >= p.w_size - ae && (C(p, !1), p.strm.avail_out === 0)) return S;
            }
            return p.insert = 0, z === _ ? (C(p, !0), p.strm.avail_out === 0 ? J : K) : (p.strstart > p.block_start && (C(p, !1), p.strm.avail_out), S);
          }),
          new Y(4, 4, 8, 4, $),
          new Y(4, 5, 16, 8, $),
          new Y(4, 6, 32, 32, $),
          new Y(4, 4, 16, 16, B),
          new Y(8, 16, 32, 32, B),
          new Y(8, 16, 128, 128, B),
          new Y(8, 32, 128, 256, B),
          new Y(32, 128, 258, 1024, B),
          new Y(32, 258, 258, 4096, B)
        ], i.deflateInit = function(p, z) {
          return P(p, z, y, 15, 8, 0);
        }, i.deflateInit2 = P, i.deflateReset = O, i.deflateResetKeep = he, i.deflateSetHeader = function(p, z) {
          return p && p.state ? p.state.wrap !== 2 ? g : (p.state.gzhead = z, v) : g;
        }, i.deflate = function(p, z) {
          var E, s, l, w;
          if (!p || !p.state || 5 < z || z < 0) return p ? oe(p, g) : g;
          if (s = p.state, !p.output || !p.input && p.avail_in !== 0 || s.status === 666 && z !== _) return oe(p, p.avail_out === 0 ? -5 : g);
          if (s.strm = p, E = s.last_flush, s.last_flush = z, s.status === A) if (s.wrap === 2) p.adler = 0, q(s, 31), q(s, 139), q(s, 8), s.gzhead ? (q(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)), q(s, 255 & s.gzhead.time), q(s, s.gzhead.time >> 8 & 255), q(s, s.gzhead.time >> 16 & 255), q(s, s.gzhead.time >> 24 & 255), q(s, s.level === 9 ? 2 : 2 <= s.strategy || s.level < 2 ? 4 : 0), q(s, 255 & s.gzhead.os), s.gzhead.extra && s.gzhead.extra.length && (q(s, 255 & s.gzhead.extra.length), q(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (p.adler = h(p.adler, s.pending_buf, s.pending, 0)), s.gzindex = 0, s.status = 69) : (q(s, 0), q(s, 0), q(s, 0), q(s, 0), q(s, 0), q(s, s.level === 9 ? 2 : 2 <= s.strategy || s.level < 2 ? 4 : 0), q(s, 3), s.status = M);
          else {
            var L = y + (s.w_bits - 8 << 4) << 8;
            L |= (2 <= s.strategy || s.level < 2 ? 0 : s.level < 6 ? 1 : s.level === 6 ? 2 : 3) << 6, s.strstart !== 0 && (L |= 32), L += 31 - L % 31, s.status = M, X(s, L), s.strstart !== 0 && (X(s, p.adler >>> 16), X(s, 65535 & p.adler)), p.adler = 1;
          }
          if (s.status === 69) if (s.gzhead.extra) {
            for (l = s.pending; s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), H(p), l = s.pending, s.pending !== s.pending_buf_size)); ) q(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
            s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = 73);
          } else s.status = 73;
          if (s.status === 73) if (s.gzhead.name) {
            l = s.pending;
            do {
              if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), H(p), l = s.pending, s.pending === s.pending_buf_size)) {
                w = 1;
                break;
              }
              w = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0, q(s, w);
            } while (w !== 0);
            s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), w === 0 && (s.gzindex = 0, s.status = 91);
          } else s.status = 91;
          if (s.status === 91) if (s.gzhead.comment) {
            l = s.pending;
            do {
              if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), H(p), l = s.pending, s.pending === s.pending_buf_size)) {
                w = 1;
                break;
              }
              w = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0, q(s, w);
            } while (w !== 0);
            s.gzhead.hcrc && s.pending > l && (p.adler = h(p.adler, s.pending_buf, s.pending - l, l)), w === 0 && (s.status = 103);
          } else s.status = 103;
          if (s.status === 103 && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && H(p), s.pending + 2 <= s.pending_buf_size && (q(s, 255 & p.adler), q(s, p.adler >> 8 & 255), p.adler = 0, s.status = M)) : s.status = M), s.pending !== 0) {
            if (H(p), p.avail_out === 0) return s.last_flush = -1, v;
          } else if (p.avail_in === 0 && V(z) <= V(E) && z !== _) return oe(p, -5);
          if (s.status === 666 && p.avail_in !== 0) return oe(p, -5);
          if (p.avail_in !== 0 || s.lookahead !== 0 || z !== d && s.status !== 666) {
            var j = s.strategy === 2 ? (function(D, te) {
              for (var ue; ; ) {
                if (D.lookahead === 0 && (pe(D), D.lookahead === 0)) {
                  if (te === d) return S;
                  break;
                }
                if (D.match_length = 0, ue = a._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++, ue && (C(D, !1), D.strm.avail_out === 0)) return S;
              }
              return D.insert = 0, te === _ ? (C(D, !0), D.strm.avail_out === 0 ? J : K) : D.last_lit && (C(D, !1), D.strm.avail_out === 0) ? S : W;
            })(s, z) : s.strategy === 3 ? (function(D, te) {
              for (var ue, ie, de, me, we = D.window; ; ) {
                if (D.lookahead <= Z) {
                  if (pe(D), D.lookahead <= Z && te === d) return S;
                  if (D.lookahead === 0) break;
                }
                if (D.match_length = 0, D.lookahead >= F && 0 < D.strstart && (ie = we[de = D.strstart - 1]) === we[++de] && ie === we[++de] && ie === we[++de]) {
                  me = D.strstart + Z;
                  do
                    ;
                  while (ie === we[++de] && ie === we[++de] && ie === we[++de] && ie === we[++de] && ie === we[++de] && ie === we[++de] && ie === we[++de] && ie === we[++de] && de < me);
                  D.match_length = Z - (me - de), D.match_length > D.lookahead && (D.match_length = D.lookahead);
                }
                if (D.match_length >= F ? (ue = a._tr_tally(D, 1, D.match_length - F), D.lookahead -= D.match_length, D.strstart += D.match_length, D.match_length = 0) : (ue = a._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++), ue && (C(D, !1), D.strm.avail_out === 0)) return S;
              }
              return D.insert = 0, te === _ ? (C(D, !0), D.strm.avail_out === 0 ? J : K) : D.last_lit && (C(D, !1), D.strm.avail_out === 0) ? S : W;
            })(s, z) : o[s.level].func(s, z);
            if (j !== J && j !== K || (s.status = 666), j === S || j === J) return p.avail_out === 0 && (s.last_flush = -1), v;
            if (j === W && (z === 1 ? a._tr_align(s) : z !== 5 && (a._tr_stored_block(s, 0, 0, !1), z === 3 && (Q(s.head), s.lookahead === 0 && (s.strstart = 0, s.block_start = 0, s.insert = 0))), H(p), p.avail_out === 0)) return s.last_flush = -1, v;
          }
          return z !== _ ? v : s.wrap <= 0 ? 1 : (s.wrap === 2 ? (q(s, 255 & p.adler), q(s, p.adler >> 8 & 255), q(s, p.adler >> 16 & 255), q(s, p.adler >> 24 & 255), q(s, 255 & p.total_in), q(s, p.total_in >> 8 & 255), q(s, p.total_in >> 16 & 255), q(s, p.total_in >> 24 & 255)) : (X(s, p.adler >>> 16), X(s, 65535 & p.adler)), H(p), 0 < s.wrap && (s.wrap = -s.wrap), s.pending !== 0 ? v : 1);
        }, i.deflateEnd = function(p) {
          var z;
          return p && p.state ? (z = p.state.status) !== A && z !== 69 && z !== 73 && z !== 91 && z !== 103 && z !== M && z !== 666 ? oe(p, g) : (p.state = null, z === M ? oe(p, -3) : v) : g;
        }, i.deflateSetDictionary = function(p, z) {
          var E, s, l, w, L, j, D, te, ue = z.length;
          if (!p || !p.state || (w = (E = p.state).wrap) === 2 || w === 1 && E.status !== A || E.lookahead) return g;
          for (w === 1 && (p.adler = c(p.adler, z, ue, 0)), E.wrap = 0, ue >= E.w_size && (w === 0 && (Q(E.head), E.strstart = 0, E.block_start = 0, E.insert = 0), te = new u.Buf8(E.w_size), u.arraySet(te, z, ue - E.w_size, E.w_size, 0), z = te, ue = E.w_size), L = p.avail_in, j = p.next_in, D = p.input, p.avail_in = ue, p.next_in = 0, p.input = z, pe(E); E.lookahead >= F; ) {
            for (s = E.strstart, l = E.lookahead - (F - 1); E.ins_h = (E.ins_h << E.hash_shift ^ E.window[s + F - 1]) & E.hash_mask, E.prev[s & E.w_mask] = E.head[E.ins_h], E.head[E.ins_h] = s, s++, --l; ) ;
            E.strstart = s, E.lookahead = F - 1, pe(E);
          }
          return E.strstart += E.lookahead, E.block_start = E.strstart, E.insert = E.lookahead, E.lookahead = 0, E.match_length = E.prev_length = F - 1, E.match_available = 0, p.next_in = j, p.input = D, p.avail_in = L, E.wrap = w, v;
        }, i.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, n, i) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, n, i) {
        n.exports = function(o, u) {
          var a = o.state, c = o.next_in, h, f, d, _, v, g, m, b, x, y, k, T, R, I, N, U, F, Z, ae, A, M, S = o.input, W;
          h = c + (o.avail_in - 5), f = o.next_out, W = o.output, d = f - (u - o.avail_out), _ = f + (o.avail_out - 257), v = a.dmax, g = a.wsize, m = a.whave, b = a.wnext, x = a.window, y = a.hold, k = a.bits, T = a.lencode, R = a.distcode, I = (1 << a.lenbits) - 1, N = (1 << a.distbits) - 1;
          e: do {
            k < 15 && (y += S[c++] << k, k += 8, y += S[c++] << k, k += 8), U = T[y & I];
            t: for (; ; ) {
              if (y >>>= F = U >>> 24, k -= F, (F = U >>> 16 & 255) === 0) W[f++] = 65535 & U;
              else {
                if (!(16 & F)) {
                  if ((64 & F) == 0) {
                    U = T[(65535 & U) + (y & (1 << F) - 1)];
                    continue t;
                  }
                  if (32 & F) {
                    a.mode = 12;
                    break e;
                  }
                  o.msg = "invalid literal/length code", a.mode = 30;
                  break e;
                }
                Z = 65535 & U, (F &= 15) && (k < F && (y += S[c++] << k, k += 8), Z += y & (1 << F) - 1, y >>>= F, k -= F), k < 15 && (y += S[c++] << k, k += 8, y += S[c++] << k, k += 8), U = R[y & N];
                r: for (; ; ) {
                  if (y >>>= F = U >>> 24, k -= F, !(16 & (F = U >>> 16 & 255))) {
                    if ((64 & F) == 0) {
                      U = R[(65535 & U) + (y & (1 << F) - 1)];
                      continue r;
                    }
                    o.msg = "invalid distance code", a.mode = 30;
                    break e;
                  }
                  if (ae = 65535 & U, k < (F &= 15) && (y += S[c++] << k, (k += 8) < F && (y += S[c++] << k, k += 8)), v < (ae += y & (1 << F) - 1)) {
                    o.msg = "invalid distance too far back", a.mode = 30;
                    break e;
                  }
                  if (y >>>= F, k -= F, (F = f - d) < ae) {
                    if (m < (F = ae - F) && a.sane) {
                      o.msg = "invalid distance too far back", a.mode = 30;
                      break e;
                    }
                    if (M = x, (A = 0) === b) {
                      if (A += g - F, F < Z) {
                        for (Z -= F; W[f++] = x[A++], --F; ) ;
                        A = f - ae, M = W;
                      }
                    } else if (b < F) {
                      if (A += g + b - F, (F -= b) < Z) {
                        for (Z -= F; W[f++] = x[A++], --F; ) ;
                        if (A = 0, b < Z) {
                          for (Z -= F = b; W[f++] = x[A++], --F; ) ;
                          A = f - ae, M = W;
                        }
                      }
                    } else if (A += b - F, F < Z) {
                      for (Z -= F; W[f++] = x[A++], --F; ) ;
                      A = f - ae, M = W;
                    }
                    for (; 2 < Z; ) W[f++] = M[A++], W[f++] = M[A++], W[f++] = M[A++], Z -= 3;
                    Z && (W[f++] = M[A++], 1 < Z && (W[f++] = M[A++]));
                  } else {
                    for (A = f - ae; W[f++] = W[A++], W[f++] = W[A++], W[f++] = W[A++], 2 < (Z -= 3); ) ;
                    Z && (W[f++] = W[A++], 1 < Z && (W[f++] = W[A++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (c < h && f < _);
          c -= Z = k >> 3, y &= (1 << (k -= Z << 3)) - 1, o.next_in = c, o.next_out = f, o.avail_in = c < h ? h - c + 5 : 5 - (c - h), o.avail_out = f < _ ? _ - f + 257 : 257 - (f - _), a.hold = y, a.bits = k;
        };
      }, {}],
      49: [function(r, n, i) {
        var o = r("../utils/common"), u = r("./adler32"), a = r("./crc32"), c = r("./inffast"), h = r("./inftrees"), f = 1, d = 2, _ = 0, v = -2, g = 1, m = 852, b = 592;
        function x(A) {
          return (A >>> 24 & 255) + (A >>> 8 & 65280) + ((65280 & A) << 8) + ((255 & A) << 24);
        }
        function y() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new o.Buf16(320), this.work = new o.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function k(A) {
          var M;
          return A && A.state ? (M = A.state, A.total_in = A.total_out = M.total = 0, A.msg = "", M.wrap && (A.adler = 1 & M.wrap), M.mode = g, M.last = 0, M.havedict = 0, M.dmax = 32768, M.head = null, M.hold = 0, M.bits = 0, M.lencode = M.lendyn = new o.Buf32(m), M.distcode = M.distdyn = new o.Buf32(b), M.sane = 1, M.back = -1, _) : v;
        }
        function T(A) {
          var M;
          return A && A.state ? ((M = A.state).wsize = 0, M.whave = 0, M.wnext = 0, k(A)) : v;
        }
        function R(A, M) {
          var S, W;
          return A && A.state ? (W = A.state, M < 0 ? (S = 0, M = -M) : (S = 1 + (M >> 4), M < 48 && (M &= 15)), M && (M < 8 || 15 < M) ? v : (W.window !== null && W.wbits !== M && (W.window = null), W.wrap = S, W.wbits = M, T(A))) : v;
        }
        function I(A, M) {
          var S, W;
          return A ? (W = new y(), (A.state = W).window = null, (S = R(A, M)) !== _ && (A.state = null), S) : v;
        }
        var N, U, F = !0;
        function Z(A) {
          if (F) {
            var M;
            for (N = new o.Buf32(512), U = new o.Buf32(32), M = 0; M < 144; ) A.lens[M++] = 8;
            for (; M < 256; ) A.lens[M++] = 9;
            for (; M < 280; ) A.lens[M++] = 7;
            for (; M < 288; ) A.lens[M++] = 8;
            for (h(f, A.lens, 0, 288, N, 0, A.work, { bits: 9 }), M = 0; M < 32; ) A.lens[M++] = 5;
            h(d, A.lens, 0, 32, U, 0, A.work, { bits: 5 }), F = !1;
          }
          A.lencode = N, A.lenbits = 9, A.distcode = U, A.distbits = 5;
        }
        function ae(A, M, S, W) {
          var J, K = A.state;
          return K.window === null && (K.wsize = 1 << K.wbits, K.wnext = 0, K.whave = 0, K.window = new o.Buf8(K.wsize)), W >= K.wsize ? (o.arraySet(K.window, M, S - K.wsize, K.wsize, 0), K.wnext = 0, K.whave = K.wsize) : (W < (J = K.wsize - K.wnext) && (J = W), o.arraySet(K.window, M, S - W, J, K.wnext), (W -= J) ? (o.arraySet(K.window, M, S - W, W, 0), K.wnext = W, K.whave = K.wsize) : (K.wnext += J, K.wnext === K.wsize && (K.wnext = 0), K.whave < K.wsize && (K.whave += J))), 0;
        }
        i.inflateReset = T, i.inflateReset2 = R, i.inflateResetKeep = k, i.inflateInit = function(A) {
          return I(A, 15);
        }, i.inflateInit2 = I, i.inflate = function(A, M) {
          var S, W, J, K, oe, V, Q, H, C, q, X, ee, pe, $, B, Y, se, he, O, P, p, z, E, s, l = 0, w = new o.Buf8(4), L = [
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
          if (!A || !A.state || !A.output || !A.input && A.avail_in !== 0) return v;
          (S = A.state).mode === 12 && (S.mode = 13), oe = A.next_out, J = A.output, Q = A.avail_out, K = A.next_in, W = A.input, V = A.avail_in, H = S.hold, C = S.bits, q = V, X = Q, z = _;
          e: for (; ; ) switch (S.mode) {
            case g:
              if (S.wrap === 0) {
                S.mode = 13;
                break;
              }
              for (; C < 16; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if (2 & S.wrap && H === 35615) {
                w[S.check = 0] = 255 & H, w[1] = H >>> 8 & 255, S.check = a(S.check, w, 2, 0), C = H = 0, S.mode = 2;
                break;
              }
              if (S.flags = 0, S.head && (S.head.done = !1), !(1 & S.wrap) || (((255 & H) << 8) + (H >> 8)) % 31) {
                A.msg = "incorrect header check", S.mode = 30;
                break;
              }
              if ((15 & H) != 8) {
                A.msg = "unknown compression method", S.mode = 30;
                break;
              }
              if (C -= 4, p = 8 + (15 & (H >>>= 4)), S.wbits === 0) S.wbits = p;
              else if (p > S.wbits) {
                A.msg = "invalid window size", S.mode = 30;
                break;
              }
              S.dmax = 1 << p, A.adler = S.check = 1, S.mode = 512 & H ? 10 : 12, C = H = 0;
              break;
            case 2:
              for (; C < 16; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if (S.flags = H, (255 & S.flags) != 8) {
                A.msg = "unknown compression method", S.mode = 30;
                break;
              }
              if (57344 & S.flags) {
                A.msg = "unknown header flags set", S.mode = 30;
                break;
              }
              S.head && (S.head.text = H >> 8 & 1), 512 & S.flags && (w[0] = 255 & H, w[1] = H >>> 8 & 255, S.check = a(S.check, w, 2, 0)), C = H = 0, S.mode = 3;
            case 3:
              for (; C < 32; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              S.head && (S.head.time = H), 512 & S.flags && (w[0] = 255 & H, w[1] = H >>> 8 & 255, w[2] = H >>> 16 & 255, w[3] = H >>> 24 & 255, S.check = a(S.check, w, 4, 0)), C = H = 0, S.mode = 4;
            case 4:
              for (; C < 16; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              S.head && (S.head.xflags = 255 & H, S.head.os = H >> 8), 512 & S.flags && (w[0] = 255 & H, w[1] = H >>> 8 & 255, S.check = a(S.check, w, 2, 0)), C = H = 0, S.mode = 5;
            case 5:
              if (1024 & S.flags) {
                for (; C < 16; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                S.length = H, S.head && (S.head.extra_len = H), 512 & S.flags && (w[0] = 255 & H, w[1] = H >>> 8 & 255, S.check = a(S.check, w, 2, 0)), C = H = 0;
              } else S.head && (S.head.extra = null);
              S.mode = 6;
            case 6:
              if (1024 & S.flags && (V < (ee = S.length) && (ee = V), ee && (S.head && (p = S.head.extra_len - S.length, S.head.extra || (S.head.extra = new Array(S.head.extra_len)), o.arraySet(S.head.extra, W, K, ee, p)), 512 & S.flags && (S.check = a(S.check, W, ee, K)), V -= ee, K += ee, S.length -= ee), S.length)) break e;
              S.length = 0, S.mode = 7;
            case 7:
              if (2048 & S.flags) {
                if (V === 0) break e;
                for (ee = 0; p = W[K + ee++], S.head && p && S.length < 65536 && (S.head.name += String.fromCharCode(p)), p && ee < V; ) ;
                if (512 & S.flags && (S.check = a(S.check, W, ee, K)), V -= ee, K += ee, p) break e;
              } else S.head && (S.head.name = null);
              S.length = 0, S.mode = 8;
            case 8:
              if (4096 & S.flags) {
                if (V === 0) break e;
                for (ee = 0; p = W[K + ee++], S.head && p && S.length < 65536 && (S.head.comment += String.fromCharCode(p)), p && ee < V; ) ;
                if (512 & S.flags && (S.check = a(S.check, W, ee, K)), V -= ee, K += ee, p) break e;
              } else S.head && (S.head.comment = null);
              S.mode = 9;
            case 9:
              if (512 & S.flags) {
                for (; C < 16; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                if (H !== (65535 & S.check)) {
                  A.msg = "header crc mismatch", S.mode = 30;
                  break;
                }
                C = H = 0;
              }
              S.head && (S.head.hcrc = S.flags >> 9 & 1, S.head.done = !0), A.adler = S.check = 0, S.mode = 12;
              break;
            case 10:
              for (; C < 32; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              A.adler = S.check = x(H), C = H = 0, S.mode = 11;
            case 11:
              if (S.havedict === 0) return A.next_out = oe, A.avail_out = Q, A.next_in = K, A.avail_in = V, S.hold = H, S.bits = C, 2;
              A.adler = S.check = 1, S.mode = 12;
            case 12:
              if (M === 5 || M === 6) break e;
            case 13:
              if (S.last) {
                H >>>= 7 & C, C -= 7 & C, S.mode = 27;
                break;
              }
              for (; C < 3; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              switch (S.last = 1 & H, C -= 1, 3 & (H >>>= 1)) {
                case 0:
                  S.mode = 14;
                  break;
                case 1:
                  if (Z(S), S.mode = 20, M !== 6) break;
                  H >>>= 2, C -= 2;
                  break e;
                case 2:
                  S.mode = 17;
                  break;
                case 3:
                  A.msg = "invalid block type", S.mode = 30;
              }
              H >>>= 2, C -= 2;
              break;
            case 14:
              for (H >>>= 7 & C, C -= 7 & C; C < 32; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if ((65535 & H) != (H >>> 16 ^ 65535)) {
                A.msg = "invalid stored block lengths", S.mode = 30;
                break;
              }
              if (S.length = 65535 & H, C = H = 0, S.mode = 15, M === 6) break e;
            case 15:
              S.mode = 16;
            case 16:
              if (ee = S.length) {
                if (V < ee && (ee = V), Q < ee && (ee = Q), ee === 0) break e;
                o.arraySet(J, W, K, ee, oe), V -= ee, K += ee, Q -= ee, oe += ee, S.length -= ee;
                break;
              }
              S.mode = 12;
              break;
            case 17:
              for (; C < 14; ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if (S.nlen = 257 + (31 & H), H >>>= 5, C -= 5, S.ndist = 1 + (31 & H), H >>>= 5, C -= 5, S.ncode = 4 + (15 & H), H >>>= 4, C -= 4, 286 < S.nlen || 30 < S.ndist) {
                A.msg = "too many length or distance symbols", S.mode = 30;
                break;
              }
              S.have = 0, S.mode = 18;
            case 18:
              for (; S.have < S.ncode; ) {
                for (; C < 3; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                S.lens[L[S.have++]] = 7 & H, H >>>= 3, C -= 3;
              }
              for (; S.have < 19; ) S.lens[L[S.have++]] = 0;
              if (S.lencode = S.lendyn, S.lenbits = 7, E = { bits: S.lenbits }, z = h(0, S.lens, 0, 19, S.lencode, 0, S.work, E), S.lenbits = E.bits, z) {
                A.msg = "invalid code lengths set", S.mode = 30;
                break;
              }
              S.have = 0, S.mode = 19;
            case 19:
              for (; S.have < S.nlen + S.ndist; ) {
                for (; Y = (l = S.lencode[H & (1 << S.lenbits) - 1]) >>> 16 & 255, se = 65535 & l, !((B = l >>> 24) <= C); ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                if (se < 16) H >>>= B, C -= B, S.lens[S.have++] = se;
                else {
                  if (se === 16) {
                    for (s = B + 2; C < s; ) {
                      if (V === 0) break e;
                      V--, H += W[K++] << C, C += 8;
                    }
                    if (H >>>= B, C -= B, S.have === 0) {
                      A.msg = "invalid bit length repeat", S.mode = 30;
                      break;
                    }
                    p = S.lens[S.have - 1], ee = 3 + (3 & H), H >>>= 2, C -= 2;
                  } else if (se === 17) {
                    for (s = B + 3; C < s; ) {
                      if (V === 0) break e;
                      V--, H += W[K++] << C, C += 8;
                    }
                    C -= B, p = 0, ee = 3 + (7 & (H >>>= B)), H >>>= 3, C -= 3;
                  } else {
                    for (s = B + 7; C < s; ) {
                      if (V === 0) break e;
                      V--, H += W[K++] << C, C += 8;
                    }
                    C -= B, p = 0, ee = 11 + (127 & (H >>>= B)), H >>>= 7, C -= 7;
                  }
                  if (S.have + ee > S.nlen + S.ndist) {
                    A.msg = "invalid bit length repeat", S.mode = 30;
                    break;
                  }
                  for (; ee--; ) S.lens[S.have++] = p;
                }
              }
              if (S.mode === 30) break;
              if (S.lens[256] === 0) {
                A.msg = "invalid code -- missing end-of-block", S.mode = 30;
                break;
              }
              if (S.lenbits = 9, E = { bits: S.lenbits }, z = h(f, S.lens, 0, S.nlen, S.lencode, 0, S.work, E), S.lenbits = E.bits, z) {
                A.msg = "invalid literal/lengths set", S.mode = 30;
                break;
              }
              if (S.distbits = 6, S.distcode = S.distdyn, E = { bits: S.distbits }, z = h(d, S.lens, S.nlen, S.ndist, S.distcode, 0, S.work, E), S.distbits = E.bits, z) {
                A.msg = "invalid distances set", S.mode = 30;
                break;
              }
              if (S.mode = 20, M === 6) break e;
            case 20:
              S.mode = 21;
            case 21:
              if (6 <= V && 258 <= Q) {
                A.next_out = oe, A.avail_out = Q, A.next_in = K, A.avail_in = V, S.hold = H, S.bits = C, c(A, X), oe = A.next_out, J = A.output, Q = A.avail_out, K = A.next_in, W = A.input, V = A.avail_in, H = S.hold, C = S.bits, S.mode === 12 && (S.back = -1);
                break;
              }
              for (S.back = 0; Y = (l = S.lencode[H & (1 << S.lenbits) - 1]) >>> 16 & 255, se = 65535 & l, !((B = l >>> 24) <= C); ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if (Y && (240 & Y) == 0) {
                for (he = B, O = Y, P = se; Y = (l = S.lencode[P + ((H & (1 << he + O) - 1) >> he)]) >>> 16 & 255, se = 65535 & l, !(he + (B = l >>> 24) <= C); ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                H >>>= he, C -= he, S.back += he;
              }
              if (H >>>= B, C -= B, S.back += B, S.length = se, Y === 0) {
                S.mode = 26;
                break;
              }
              if (32 & Y) {
                S.back = -1, S.mode = 12;
                break;
              }
              if (64 & Y) {
                A.msg = "invalid literal/length code", S.mode = 30;
                break;
              }
              S.extra = 15 & Y, S.mode = 22;
            case 22:
              if (S.extra) {
                for (s = S.extra; C < s; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                S.length += H & (1 << S.extra) - 1, H >>>= S.extra, C -= S.extra, S.back += S.extra;
              }
              S.was = S.length, S.mode = 23;
            case 23:
              for (; Y = (l = S.distcode[H & (1 << S.distbits) - 1]) >>> 16 & 255, se = 65535 & l, !((B = l >>> 24) <= C); ) {
                if (V === 0) break e;
                V--, H += W[K++] << C, C += 8;
              }
              if ((240 & Y) == 0) {
                for (he = B, O = Y, P = se; Y = (l = S.distcode[P + ((H & (1 << he + O) - 1) >> he)]) >>> 16 & 255, se = 65535 & l, !(he + (B = l >>> 24) <= C); ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                H >>>= he, C -= he, S.back += he;
              }
              if (H >>>= B, C -= B, S.back += B, 64 & Y) {
                A.msg = "invalid distance code", S.mode = 30;
                break;
              }
              S.offset = se, S.extra = 15 & Y, S.mode = 24;
            case 24:
              if (S.extra) {
                for (s = S.extra; C < s; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                S.offset += H & (1 << S.extra) - 1, H >>>= S.extra, C -= S.extra, S.back += S.extra;
              }
              if (S.offset > S.dmax) {
                A.msg = "invalid distance too far back", S.mode = 30;
                break;
              }
              S.mode = 25;
            case 25:
              if (Q === 0) break e;
              if (ee = X - Q, S.offset > ee) {
                if ((ee = S.offset - ee) > S.whave && S.sane) {
                  A.msg = "invalid distance too far back", S.mode = 30;
                  break;
                }
                pe = ee > S.wnext ? (ee -= S.wnext, S.wsize - ee) : S.wnext - ee, ee > S.length && (ee = S.length), $ = S.window;
              } else $ = J, pe = oe - S.offset, ee = S.length;
              for (Q < ee && (ee = Q), Q -= ee, S.length -= ee; J[oe++] = $[pe++], --ee; ) ;
              S.length === 0 && (S.mode = 21);
              break;
            case 26:
              if (Q === 0) break e;
              J[oe++] = S.length, Q--, S.mode = 21;
              break;
            case 27:
              if (S.wrap) {
                for (; C < 32; ) {
                  if (V === 0) break e;
                  V--, H |= W[K++] << C, C += 8;
                }
                if (X -= Q, A.total_out += X, S.total += X, X && (A.adler = S.check = S.flags ? a(S.check, J, X, oe - X) : u(S.check, J, X, oe - X)), X = Q, (S.flags ? H : x(H)) !== S.check) {
                  A.msg = "incorrect data check", S.mode = 30;
                  break;
                }
                C = H = 0;
              }
              S.mode = 28;
            case 28:
              if (S.wrap && S.flags) {
                for (; C < 32; ) {
                  if (V === 0) break e;
                  V--, H += W[K++] << C, C += 8;
                }
                if (H !== (4294967295 & S.total)) {
                  A.msg = "incorrect length check", S.mode = 30;
                  break;
                }
                C = H = 0;
              }
              S.mode = 29;
            case 29:
              z = 1;
              break e;
            case 30:
              z = -3;
              break e;
            case 31:
              return -4;
            default:
              return v;
          }
          return A.next_out = oe, A.avail_out = Q, A.next_in = K, A.avail_in = V, S.hold = H, S.bits = C, (S.wsize || X !== A.avail_out && S.mode < 30 && (S.mode < 27 || M !== 4)) && ae(A, A.output, A.next_out, X - A.avail_out) ? (S.mode = 31, -4) : (q -= A.avail_in, X -= A.avail_out, A.total_in += q, A.total_out += X, S.total += X, S.wrap && X && (A.adler = S.check = S.flags ? a(S.check, J, X, A.next_out - X) : u(S.check, J, X, A.next_out - X)), A.data_type = S.bits + (S.last ? 64 : 0) + (S.mode === 12 ? 128 : 0) + (S.mode === 20 || S.mode === 15 ? 256 : 0), (q == 0 && X === 0 || M === 4) && z === _ && (z = -5), z);
        }, i.inflateEnd = function(A) {
          if (!A || !A.state) return v;
          var M = A.state;
          return M.window && (M.window = null), A.state = null, _;
        }, i.inflateGetHeader = function(A, M) {
          var S;
          return A && A.state ? (2 & (S = A.state).wrap) == 0 ? v : ((S.head = M).done = !1, _) : v;
        }, i.inflateSetDictionary = function(A, M) {
          var S, W = M.length;
          return A && A.state ? (S = A.state).wrap !== 0 && S.mode !== 11 ? v : S.mode === 11 && u(1, M, W, 0) !== S.check ? -3 : ae(A, M, W, W) ? (S.mode = 31, -4) : (S.havedict = 1, _) : v;
        }, i.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, n, i) {
        var o = r("../utils/common"), u = [
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
        n.exports = function(f, d, _, v, g, m, b, x) {
          var y, k, T, R, I, N, U, F, Z, ae = x.bits, A = 0, M = 0, S = 0, W = 0, J = 0, K = 0, oe = 0, V = 0, Q = 0, H = 0, C = null, q = 0, X = new o.Buf16(16), ee = new o.Buf16(16), pe = null, $ = 0;
          for (A = 0; A <= 15; A++) X[A] = 0;
          for (M = 0; M < v; M++) X[d[_ + M]]++;
          for (J = ae, W = 15; 1 <= W && X[W] === 0; W--) ;
          if (W < J && (J = W), W === 0) return g[m++] = 20971520, g[m++] = 20971520, x.bits = 1, 0;
          for (S = 1; S < W && X[S] === 0; S++) ;
          for (J < S && (J = S), A = V = 1; A <= 15; A++) if (V <<= 1, (V -= X[A]) < 0) return -1;
          if (0 < V && (f === 0 || W !== 1)) return -1;
          for (ee[1] = 0, A = 1; A < 15; A++) ee[A + 1] = ee[A] + X[A];
          for (M = 0; M < v; M++) d[_ + M] !== 0 && (b[ee[d[_ + M]]++] = M);
          if (N = f === 0 ? (C = pe = b, 19) : f === 1 ? (C = u, q -= 257, pe = a, $ -= 257, 256) : (C = c, pe = h, -1), A = S, I = m, oe = M = H = 0, T = -1, R = (Q = 1 << (K = J)) - 1, f === 1 && 852 < Q || f === 2 && 592 < Q) return 1;
          for (; ; ) {
            for (U = A - oe, Z = b[M] < N ? (F = 0, b[M]) : b[M] > N ? (F = pe[$ + b[M]], C[q + b[M]]) : (F = 96, 0), y = 1 << A - oe, S = k = 1 << K; g[I + (H >> oe) + (k -= y)] = U << 24 | F << 16 | Z | 0, k !== 0; ) ;
            for (y = 1 << A - 1; H & y; ) y >>= 1;
            if (y !== 0 ? (H &= y - 1, H += y) : H = 0, M++, --X[A] == 0) {
              if (A === W) break;
              A = d[_ + b[M]];
            }
            if (J < A && (H & R) !== T) {
              for (oe === 0 && (oe = J), I += S, V = 1 << (K = A - oe); K + oe < W && !((V -= X[K + oe]) <= 0); ) K++, V <<= 1;
              if (Q += 1 << K, f === 1 && 852 < Q || f === 2 && 592 < Q) return 1;
              g[T = H & R] = J << 24 | K << 16 | I - m | 0;
            }
          }
          return H !== 0 && (g[I + H] = A - oe << 24 | 4194304), x.bits = J, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, n, i) {
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
      52: [function(r, n, i) {
        var o = r("../utils/common"), u = 0, a = 1;
        function c(l) {
          for (var w = l.length; 0 <= --w; ) l[w] = 0;
        }
        var h = 0, f = 29, d = 256, _ = d + 1 + f, v = 30, g = 19, m = 2 * _ + 1, b = 15, x = 16, y = 7, k = 256, T = 16, R = 17, I = 18, N = [
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
        ], U = [
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
        ], F = [
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
        ], Z = [
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
        ], ae = new Array(2 * (_ + 2));
        c(ae);
        var A = new Array(2 * v);
        c(A);
        var M = new Array(512);
        c(M);
        var S = new Array(256);
        c(S);
        var W = new Array(f);
        c(W);
        var J, K, oe, V = new Array(v);
        function Q(l, w, L, j, D) {
          this.static_tree = l, this.extra_bits = w, this.extra_base = L, this.elems = j, this.max_length = D, this.has_stree = l && l.length;
        }
        function H(l, w) {
          this.dyn_tree = l, this.max_code = 0, this.stat_desc = w;
        }
        function C(l) {
          return l < 256 ? M[l] : M[256 + (l >>> 7)];
        }
        function q(l, w) {
          l.pending_buf[l.pending++] = 255 & w, l.pending_buf[l.pending++] = w >>> 8 & 255;
        }
        function X(l, w, L) {
          l.bi_valid > x - L ? (l.bi_buf |= w << l.bi_valid & 65535, q(l, l.bi_buf), l.bi_buf = w >> x - l.bi_valid, l.bi_valid += L - x) : (l.bi_buf |= w << l.bi_valid & 65535, l.bi_valid += L);
        }
        function ee(l, w, L) {
          X(l, L[2 * w], L[2 * w + 1]);
        }
        function pe(l, w) {
          for (var L = 0; L |= 1 & l, l >>>= 1, L <<= 1, 0 < --w; ) ;
          return L >>> 1;
        }
        function $(l, w, L) {
          var j, D, te = new Array(b + 1), ue = 0;
          for (j = 1; j <= b; j++) te[j] = ue = ue + L[j - 1] << 1;
          for (D = 0; D <= w; D++) {
            var ie = l[2 * D + 1];
            ie !== 0 && (l[2 * D] = pe(te[ie]++, ie));
          }
        }
        function B(l) {
          for (var w = 0; w < _; w++) l.dyn_ltree[2 * w] = 0;
          for (w = 0; w < v; w++) l.dyn_dtree[2 * w] = 0;
          for (w = 0; w < g; w++) l.bl_tree[2 * w] = 0;
          l.dyn_ltree[2 * k] = 1, l.opt_len = l.static_len = 0, l.last_lit = l.matches = 0;
        }
        function Y(l) {
          8 < l.bi_valid ? q(l, l.bi_buf) : 0 < l.bi_valid && (l.pending_buf[l.pending++] = l.bi_buf), l.bi_buf = 0, l.bi_valid = 0;
        }
        function se(l, w, L, j) {
          var D = 2 * w, te = 2 * L;
          return l[D] < l[te] || l[D] === l[te] && j[w] <= j[L];
        }
        function he(l, w, L) {
          for (var j = l.heap[L], D = L << 1; D <= l.heap_len && (D < l.heap_len && se(w, l.heap[D + 1], l.heap[D], l.depth) && D++, !se(w, j, l.heap[D], l.depth)); ) l.heap[L] = l.heap[D], L = D, D <<= 1;
          l.heap[L] = j;
        }
        function O(l, w, L) {
          var j, D, te, ue, ie = 0;
          if (l.last_lit !== 0) for (; j = l.pending_buf[l.d_buf + 2 * ie] << 8 | l.pending_buf[l.d_buf + 2 * ie + 1], D = l.pending_buf[l.l_buf + ie], ie++, j === 0 ? ee(l, D, w) : (ee(l, (te = S[D]) + d + 1, w), (ue = N[te]) !== 0 && X(l, D -= W[te], ue), ee(l, te = C(--j), L), (ue = U[te]) !== 0 && X(l, j -= V[te], ue)), ie < l.last_lit; ) ;
          ee(l, k, w);
        }
        function P(l, w) {
          var L, j, D, te = w.dyn_tree, ue = w.stat_desc.static_tree, ie = w.stat_desc.has_stree, de = w.stat_desc.elems, me = -1;
          for (l.heap_len = 0, l.heap_max = m, L = 0; L < de; L++) te[2 * L] !== 0 ? (l.heap[++l.heap_len] = me = L, l.depth[L] = 0) : te[2 * L + 1] = 0;
          for (; l.heap_len < 2; ) te[2 * (D = l.heap[++l.heap_len] = me < 2 ? ++me : 0)] = 1, l.depth[D] = 0, l.opt_len--, ie && (l.static_len -= ue[2 * D + 1]);
          for (w.max_code = me, L = l.heap_len >> 1; 1 <= L; L--) he(l, te, L);
          for (D = de; L = l.heap[1], l.heap[1] = l.heap[l.heap_len--], he(l, te, 1), j = l.heap[1], l.heap[--l.heap_max] = L, l.heap[--l.heap_max] = j, te[2 * D] = te[2 * L] + te[2 * j], l.depth[D] = (l.depth[L] >= l.depth[j] ? l.depth[L] : l.depth[j]) + 1, te[2 * L + 1] = te[2 * j + 1] = D, l.heap[1] = D++, he(l, te, 1), 2 <= l.heap_len; ) ;
          l.heap[--l.heap_max] = l.heap[1], (function(we, Ae) {
            var ot, ze, Nt, Se, or, Br, Ye = Ae.dyn_tree, qn = Ae.max_code, Vo = Ae.stat_desc.static_tree, Xo = Ae.stat_desc.has_stree, Ko = Ae.stat_desc.extra_bits, Vn = Ae.stat_desc.extra_base, Lt = Ae.stat_desc.max_length, sr = 0;
            for (Se = 0; Se <= b; Se++) we.bl_count[Se] = 0;
            for (Ye[2 * we.heap[we.heap_max] + 1] = 0, ot = we.heap_max + 1; ot < m; ot++) Lt < (Se = Ye[2 * Ye[2 * (ze = we.heap[ot]) + 1] + 1] + 1) && (Se = Lt, sr++), Ye[2 * ze + 1] = Se, qn < ze || (we.bl_count[Se]++, or = 0, Vn <= ze && (or = Ko[ze - Vn]), Br = Ye[2 * ze], we.opt_len += Br * (Se + or), Xo && (we.static_len += Br * (Vo[2 * ze + 1] + or)));
            if (sr !== 0) {
              do {
                for (Se = Lt - 1; we.bl_count[Se] === 0; ) Se--;
                we.bl_count[Se]--, we.bl_count[Se + 1] += 2, we.bl_count[Lt]--, sr -= 2;
              } while (0 < sr);
              for (Se = Lt; Se !== 0; Se--) for (ze = we.bl_count[Se]; ze !== 0; ) qn < (Nt = we.heap[--ot]) || (Ye[2 * Nt + 1] !== Se && (we.opt_len += (Se - Ye[2 * Nt + 1]) * Ye[2 * Nt], Ye[2 * Nt + 1] = Se), ze--);
            }
          })(l, w), $(te, me, l.bl_count);
        }
        function p(l, w, L) {
          var j, D, te = -1, ue = w[1], ie = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), w[2 * (L + 1) + 1] = 65535, j = 0; j <= L; j++) D = ue, ue = w[2 * (j + 1) + 1], ++ie < de && D === ue || (ie < me ? l.bl_tree[2 * D] += ie : D !== 0 ? (D !== te && l.bl_tree[2 * D]++, l.bl_tree[2 * T]++) : ie <= 10 ? l.bl_tree[2 * R]++ : l.bl_tree[2 * I]++, te = D, me = (ie = 0) === ue ? (de = 138, 3) : D === ue ? (de = 6, 3) : (de = 7, 4));
        }
        function z(l, w, L) {
          var j, D, te = -1, ue = w[1], ie = 0, de = 7, me = 4;
          for (ue === 0 && (de = 138, me = 3), j = 0; j <= L; j++) if (D = ue, ue = w[2 * (j + 1) + 1], !(++ie < de && D === ue)) {
            if (ie < me) for (; ee(l, D, l.bl_tree), --ie != 0; ) ;
            else D !== 0 ? (D !== te && (ee(l, D, l.bl_tree), ie--), ee(l, T, l.bl_tree), X(l, ie - 3, 2)) : ie <= 10 ? (ee(l, R, l.bl_tree), X(l, ie - 3, 3)) : (ee(l, I, l.bl_tree), X(l, ie - 11, 7));
            te = D, me = (ie = 0) === ue ? (de = 138, 3) : D === ue ? (de = 6, 3) : (de = 7, 4);
          }
        }
        c(V);
        var E = !1;
        function s(l, w, L, j) {
          X(l, (h << 1) + (j ? 1 : 0), 3), (function(D, te, ue, ie) {
            Y(D), q(D, ue), q(D, ~ue), o.arraySet(D.pending_buf, D.window, te, ue, D.pending), D.pending += ue;
          })(l, w, L);
        }
        i._tr_init = function(l) {
          E || ((function() {
            var w, L, j, D, te, ue = new Array(b + 1);
            for (D = j = 0; D < f - 1; D++) for (W[D] = j, w = 0; w < 1 << N[D]; w++) S[j++] = D;
            for (S[j - 1] = D, D = te = 0; D < 16; D++) for (V[D] = te, w = 0; w < 1 << U[D]; w++) M[te++] = D;
            for (te >>= 7; D < v; D++) for (V[D] = te << 7, w = 0; w < 1 << U[D] - 7; w++) M[256 + te++] = D;
            for (L = 0; L <= b; L++) ue[L] = 0;
            for (w = 0; w <= 143; ) ae[2 * w + 1] = 8, w++, ue[8]++;
            for (; w <= 255; ) ae[2 * w + 1] = 9, w++, ue[9]++;
            for (; w <= 279; ) ae[2 * w + 1] = 7, w++, ue[7]++;
            for (; w <= 287; ) ae[2 * w + 1] = 8, w++, ue[8]++;
            for ($(ae, _ + 1, ue), w = 0; w < v; w++) A[2 * w + 1] = 5, A[2 * w] = pe(w, 5);
            J = new Q(ae, N, d + 1, _, b), K = new Q(A, U, 0, v, b), oe = new Q(new Array(0), F, 0, g, y);
          })(), E = !0), l.l_desc = new H(l.dyn_ltree, J), l.d_desc = new H(l.dyn_dtree, K), l.bl_desc = new H(l.bl_tree, oe), l.bi_buf = 0, l.bi_valid = 0, B(l);
        }, i._tr_stored_block = s, i._tr_flush_block = function(l, w, L, j) {
          var D, te, ue = 0;
          0 < l.level ? (l.strm.data_type === 2 && (l.strm.data_type = (function(ie) {
            var de, me = 4093624447;
            for (de = 0; de <= 31; de++, me >>>= 1) if (1 & me && ie.dyn_ltree[2 * de] !== 0) return u;
            if (ie.dyn_ltree[18] !== 0 || ie.dyn_ltree[20] !== 0 || ie.dyn_ltree[26] !== 0) return a;
            for (de = 32; de < d; de++) if (ie.dyn_ltree[2 * de] !== 0) return a;
            return u;
          })(l)), P(l, l.l_desc), P(l, l.d_desc), ue = (function(ie) {
            var de;
            for (p(ie, ie.dyn_ltree, ie.l_desc.max_code), p(ie, ie.dyn_dtree, ie.d_desc.max_code), P(ie, ie.bl_desc), de = g - 1; 3 <= de && ie.bl_tree[2 * Z[de] + 1] === 0; de--) ;
            return ie.opt_len += 3 * (de + 1) + 5 + 5 + 4, de;
          })(l), D = l.opt_len + 3 + 7 >>> 3, (te = l.static_len + 3 + 7 >>> 3) <= D && (D = te)) : D = te = L + 5, L + 4 <= D && w !== -1 ? s(l, w, L, j) : l.strategy === 4 || te === D ? (X(l, 2 + (j ? 1 : 0), 3), O(l, ae, A)) : (X(l, 4 + (j ? 1 : 0), 3), (function(ie, de, me, we) {
            var Ae;
            for (X(ie, de - 257, 5), X(ie, me - 1, 5), X(ie, we - 4, 4), Ae = 0; Ae < we; Ae++) X(ie, ie.bl_tree[2 * Z[Ae] + 1], 3);
            z(ie, ie.dyn_ltree, de - 1), z(ie, ie.dyn_dtree, me - 1);
          })(l, l.l_desc.max_code + 1, l.d_desc.max_code + 1, ue + 1), O(l, l.dyn_ltree, l.dyn_dtree)), B(l), j && Y(l);
        }, i._tr_tally = function(l, w, L) {
          return l.pending_buf[l.d_buf + 2 * l.last_lit] = w >>> 8 & 255, l.pending_buf[l.d_buf + 2 * l.last_lit + 1] = 255 & w, l.pending_buf[l.l_buf + l.last_lit] = 255 & L, l.last_lit++, w === 0 ? l.dyn_ltree[2 * L]++ : (l.matches++, w--, l.dyn_ltree[2 * (S[L] + d + 1)]++, l.dyn_dtree[2 * C(w)]++), l.last_lit === l.lit_bufsize - 1;
        }, i._tr_align = function(l) {
          X(l, 2, 3), ee(l, k, ae), (function(w) {
            w.bi_valid === 16 ? (q(w, w.bi_buf), w.bi_buf = 0, w.bi_valid = 0) : 8 <= w.bi_valid && (w.pending_buf[w.pending++] = 255 & w.bi_buf, w.bi_buf >>= 8, w.bi_valid -= 8);
          })(l);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, n, i) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, n, i) {
        (function(o) {
          (function(u, a) {
            if (!u.setImmediate) {
              var c, h, f, d, _ = 1, v = {}, g = !1, m = u.document, b = Object.getPrototypeOf && Object.getPrototypeOf(u);
              b = b && b.setTimeout ? b : u, c = {}.toString.call(u.process) === "[object process]" ? function(T) {
                ge.nextTick(function() {
                  y(T);
                });
              } : (function() {
                if (u.postMessage && !u.importScripts) {
                  var T = !0, R = u.onmessage;
                  return u.onmessage = function() {
                    T = !1;
                  }, u.postMessage("", "*"), u.onmessage = R, T;
                }
              })() ? (d = "setImmediate$" + Math.random() + "$", u.addEventListener ? u.addEventListener("message", k, !1) : u.attachEvent("onmessage", k), function(T) {
                u.postMessage(d + T, "*");
              }) : u.MessageChannel ? ((f = new MessageChannel()).port1.onmessage = function(T) {
                y(T.data);
              }, function(T) {
                f.port2.postMessage(T);
              }) : m && "onreadystatechange" in m.createElement("script") ? (h = m.documentElement, function(T) {
                var R = m.createElement("script");
                R.onreadystatechange = function() {
                  y(T), R.onreadystatechange = null, h.removeChild(R), R = null;
                }, h.appendChild(R);
              }) : function(T) {
                setTimeout(y, 0, T);
              }, b.setImmediate = function(T) {
                typeof T != "function" && (T = new Function("" + T));
                for (var R = new Array(arguments.length - 1), I = 0; I < R.length; I++) R[I] = arguments[I + 1];
                return v[_] = {
                  callback: T,
                  args: R
                }, c(_), _++;
              }, b.clearImmediate = x;
            }
            function x(T) {
              delete v[T];
            }
            function y(T) {
              if (g) setTimeout(y, 0, T);
              else {
                var R = v[T];
                if (R) {
                  g = !0;
                  try {
                    (function(I) {
                      var N = I.callback, U = I.args;
                      switch (U.length) {
                        case 0:
                          N();
                          break;
                        case 1:
                          N(U[0]);
                          break;
                        case 2:
                          N(U[0], U[1]);
                          break;
                        case 3:
                          N(U[0], U[1], U[2]);
                          break;
                        default:
                          N.apply(a, U);
                      }
                    })(R);
                  } finally {
                    x(T), g = !1;
                  }
                }
              }
            }
            function k(T) {
              T.source === u && typeof T.data == "string" && T.data.indexOf(d) === 0 && y(+T.data.slice(d.length));
            }
          })(typeof self > "u" ? o === void 0 ? this : o : self);
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), Yp = Kp(), Bo = /* @__PURE__ */ Bi(Zp()), Ut = 0, rn = 32, Jp = 32, Qp = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== Jp) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const n = r.replace(/(..)/g, "$1 ").trim().split(" ").map((u) => parseInt(u, 16));
  n.reverse();
  const i = e.slice(Ut, rn).map((u, a) => u ^ n[a % n.length]), o = new Uint8Array(Ut + i.length + Math.max(0, e.length - rn));
  return o.set(e.slice(0, Ut)), o.set(i, Ut), o.set(e.slice(rn), Ut + i.length), o;
}, Mo = class {
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
}, Uo = /\{([^{}]+)\}/g, Wo = (e, t) => t.size === 0 ? e : e.replace(Uo, (r, n) => {
  var i;
  return (i = t.get(n)) !== null && i !== void 0 ? i : r;
}), em = (e) => new Set(Array.from(e.matchAll(Uo), ([, t]) => t)), tm = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(e, t, r) {
    return Wo(e, new Map(t.map((n, i) => [n.fileName, (r + i).toString()])));
  }
  /**
  * Extracts media data referenced in the XML content.
  *
  * @param xmlData - The XML string to search for media references
  * @param media - The media collection to search within
  * @returns Array of media data found in the XML
  */
  getMediaData(e, t) {
    const r = em(e);
    return t.Array.filter((n) => r.has(n.fileName));
  }
}, rm = class {
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
    return Wo(e, new Map(t.map(({ reference: r, instance: n, restartedListId: i, numId: o }) => [Er(r, n, i), o.toString()])));
  }
}, nm = new Mo(), nn = (e, t, r, n, i = !0) => ye(nm.format(t, {
  viewWrapper: {
    View: t,
    Relationships: n
  },
  file: e,
  stack: []
}), {
  indent: r,
  declaration: i ? {
    standalone: "yes",
    encoding: "UTF-8"
  } : { encoding: "UTF-8" }
}), im = (e, t, r, n) => {
  const { content: i } = t.options;
  if (i instanceof Uint8Array) return [{
    data: i,
    path: `word/${r}`
  }];
  if ("files" in i) {
    const h = new Bo.default();
    for (const { path: f, content: d } of i.files) h.file(f, d instanceof Uint8Array ? d : jt(nn(e, d, n, new Ce())));
    return [{
      data: h.generateAsync({
        type: "uint8array",
        compression: "DEFLATE"
      }),
      path: `word/${r}`
    }];
  }
  const o = e.PackageParts.createRelationships(r), u = nn(e, i, n, o), a = r.slice(0, r.lastIndexOf("/")), c = r.slice(r.lastIndexOf("/") + 1);
  return [{
    data: u,
    path: `word/${r}`
  }, ...o.RelationshipCount > 0 ? [{
    data: nn(e, o, n, o, !1),
    path: `word/${a}/_rels/${c}.rels`
  }] : []];
}, jo = (e, t, r = 0) => {
  const n = e.PackageParts.Array.slice(r);
  return n.length === 0 ? [] : [...n.flatMap(({ part: i, path: o }) => im(e, i, o, t)), ...jo(e, t, r + n.length)];
}, am = ["PackageParts"], om = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    G(this, "formatter", void 0), G(this, "imageReplacer", void 0), G(this, "numberingReplacer", void 0), this.formatter = new Mo(), this.imageReplacer = new tm(), this.numberingReplacer = new rm();
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
    const n = new Bo.default(), i = this.xmlifyFile(e, t), { PackageParts: o } = i, u = bn(i, am), a = new Map(Object.entries(u));
    for (const [, c] of a) if (Array.isArray(c)) for (const h of c) n.file(h.path, jt(h.data));
    else n.file(c.path, jt(c.data));
    for (const { path: c, data: h } of o) n.file(c, typeof h == "string" ? jt(h) : h);
    for (const c of r) n.file(c.path, jt(c.data));
    e.Macros !== void 0 && n.file("word/vbaProject.bin", e.Macros.project);
    for (const c of e.Media.Array) c.type !== "svg" ? n.file(`word/media/${c.fileName}`, c.data) : (n.file(`word/media/${c.fileName}`, c.data), n.file(`word/media/${c.fallback.fileName}`, c.fallback.data));
    for (const [c, { data: h, fontKey: f }] of e.FontTable.files.entries()) n.file(`word/fonts/font${c + 1}.odttf`, Qp(h, f));
    return n;
  }
  xmlifyFile(e, t) {
    var r;
    const n = ye(this.formatter.format(e.Document.View, {
      viewWrapper: e.Document,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), i = ye(this.formatter.format(e.Comments, {
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
    }), o = ye(this.formatter.format(e.FootNotes.View, {
      viewWrapper: e.FootNotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), u = ye(this.formatter.format(e.Endnotes.View, {
      viewWrapper: e.Endnotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: { encoding: "UTF-8" }
    }), a = e.Document.Relationships.RelationshipCount + 1, c = e.Comments.Relationships.RelationshipCount + 1, h = e.FootNotes.Relationships.RelationshipCount + 1, f = e.Endnotes.Relationships.RelationshipCount + 1, d = this.imageReplacer.getMediaData(n, e.Media), _ = this.imageReplacer.getMediaData(i, e.Media), v = this.imageReplacer.getMediaData(o, e.Media), g = this.imageReplacer.getMediaData(u, e.Media);
    return le(le(le(le(le(le({
      Relationships: {
        data: (() => {
          const m = Ce.copy(e.Document.Relationships);
          return d.forEach((b, x) => {
            m.addRelationship(a + x, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${b.fileName}`);
          }), m.addRelationship(m.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), ye(this.formatter.format(m, {
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
          const m = this.imageReplacer.replace(n, d, a);
          return this.numberingReplacer.replace(m, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const m = ye(this.formatter.format(e.Styles, {
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
          return this.numberingReplacer.replace(m, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: ye(this.formatter.format(e.CoreProperties, {
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
        data: ye(this.formatter.format(e.FileRelationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: e.Headers.map((m, b) => {
        const x = ye(this.formatter.format(m.View, {
          viewWrapper: m,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), y = this.imageReplacer.getMediaData(x, e.Media), k = Ce.copy(m.Relationships);
        return y.forEach((T, R) => {
          k.addRelationship(R, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: ye(this.formatter.format(k, {
            viewWrapper: m,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${b + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((m, b) => {
        const x = ye(this.formatter.format(m.View, {
          viewWrapper: m,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), y = this.imageReplacer.getMediaData(x, e.Media), k = Ce.copy(m.Relationships);
        return y.forEach((T, R) => {
          k.addRelationship(R, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${T.fileName}`);
        }), {
          data: ye(this.formatter.format(k, {
            viewWrapper: m,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${b + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((m, b) => {
        const x = ye(this.formatter.format(m.View, {
          viewWrapper: m,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), y = this.imageReplacer.getMediaData(x, e.Media), k = this.imageReplacer.replace(x, y, 0);
        return {
          data: this.numberingReplacer.replace(k, e.Numbering.ConcreteNumbering),
          path: `word/header${b + 1}.xml`
        };
      }),
      Footers: e.Footers.map((m, b) => {
        const x = ye(this.formatter.format(m.View, {
          viewWrapper: m,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), y = this.imageReplacer.getMediaData(x, e.Media), k = this.imageReplacer.replace(x, y, 0);
        return {
          data: this.numberingReplacer.replace(k, e.Numbering.ConcreteNumbering),
          path: `word/footer${b + 1}.xml`
        };
      }),
      CustomProperties: {
        data: ye(this.formatter.format(e.CustomProperties, {
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
        data: ye(this.formatter.format(e.AppProperties, {
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
          const m = this.imageReplacer.replace(o, v, h);
          return this.numberingReplacer.replace(m, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (() => {
          const m = Ce.copy(e.FootNotes.Relationships);
          return v.forEach((b, x) => {
            m.addRelationship(h + x, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${b.fileName}`);
          }), ye(this.formatter.format(m, {
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
          const m = this.imageReplacer.replace(u, g, f);
          return this.numberingReplacer.replace(m, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (() => {
          const m = Ce.copy(e.Endnotes.Relationships);
          return g.forEach((b, x) => {
            m.addRelationship(f + x, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${b.fileName}`);
          }), ye(this.formatter.format(m, {
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
        data: ye(this.formatter.format(e.Settings, {
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
          const m = this.imageReplacer.replace(i, _, c);
          return this.numberingReplacer.replace(m, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (() => {
          const m = Ce.copy(e.Comments.Relationships);
          return _.forEach((b, x) => {
            m.addRelationship(c + x, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${b.fileName}`);
          }), ye(this.formatter.format(m, {
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
      data: ye(this.formatter.format(e.CommentsExtended, {
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
      data: ye(this.formatter.format(e.CommentsIds, {
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
        data: ye(this.formatter.format(e.FontTable.View, {
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
        data: ye(this.formatter.format(e.FontTable.Relationships, {
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
        data: ye(this.formatter.format(e.Theme, {
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
      }
    }, !((r = e.Macros) === null || r === void 0) && r.events ? {
      MacroEvents: {
        data: ye(this.formatter.format(e.Macros.events, {
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
        path: "word/vbaData.xml"
      },
      MacroRelationships: {
        data: ye(this.formatter.format(e.Macros.relationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/vbaProject.bin.rels"
      }
    } : {}), e.Bibliography ? {
      BibliographySources: {
        data: ye(this.formatter.format(e.Bibliography.sources, {
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
        path: "customXml/item1.xml"
      },
      BibliographySourcesProperties: {
        data: ye(this.formatter.format(e.Bibliography.properties, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "no",
            encoding: "UTF-8"
          }
        }),
        path: "customXml/itemProps1.xml"
      },
      BibliographySourcesRelationships: {
        data: ye(this.formatter.format(e.Bibliography.relationships, {
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
        path: "customXml/_rels/item1.xml.rels"
      }
    } : {}), {}, {
      PackageParts: jo(e, t),
      Numbering: {
        data: ye(this.formatter.format(e.Numbering, {
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
        data: ye(this.formatter.format(e.ContentTypes, {
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
function Pi(e, t, r, n, i, o, u) {
  try {
    var a = e[o](u), c = a.value;
  } catch (h) {
    r(h);
    return;
  }
  a.done ? t(c) : Promise.resolve(c).then(n, i);
}
function sm(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, i) {
      var o = e.apply(t, r);
      function u(c) {
        Pi(o, n, i, u, a, "next", c);
      }
      function a(c) {
        Pi(o, n, i, u, a, "throw", c);
      }
      u(void 0);
    });
  };
}
var lm = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, Oi = (e) => e === !0 ? lm.WITH_2_BLANKS : e === !1 ? void 0 : e, Ni = (e) => e.Macros === void 0 ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/vnd.ms-word.document.macroEnabled.12", zo = class kt {
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
    var i = this;
    return sm(function* (o, u, a, c = []) {
      return i.compiler.compile(o, Oi(a), c).generateAsync({
        type: u,
        mimeType: Ni(o),
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
    return kt.pack(t, "string", r, n);
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
    return kt.pack(t, "nodebuffer", r, n);
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
    return kt.pack(t, "base64", r, n);
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
    return kt.pack(t, "blob", r, n);
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
    return kt.pack(t, "arraybuffer", r, n);
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
    const i = new Yp.Stream();
    return this.compiler.compile(t, Oi(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: Ni(t),
      compression: "DEFLATE"
    }).then((o) => {
      i.emit("data", o), i.emit("end");
    }), i;
  }
};
G(zo, "compiler", new om());
const pr = {
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
function um(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const n = Yo(e.color, t);
  n && (r.color = n);
  const i = Jo(e.font, t);
  i && (r.font = i), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const o = {};
  return Object.keys(r).length && (o.run = r), e.paragraph && (o.paragraph = e.paragraph), o;
}
function cm(e = Mr, t = {}) {
  const r = e?.typography || Mr.typography, n = e?.typographyKinds || Mr.typographyKinds, i = {}, o = [], u = [];
  for (const [d, _] of Object.entries(r)) {
    const v = um(_, e), g = pr[d];
    if (g === "document") {
      i.document = {
        ...v.run ? { run: v.run } : {},
        ...v.paragraph ? { paragraph: v.paragraph } : {}
      };
      continue;
    }
    if (g) {
      i[g] = v;
      continue;
    }
    (n[d] || "character") === "paragraph" ? o.push({
      id: d,
      name: d,
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0,
      ...v
    }) : u.push({
      id: d,
      name: d,
      basedOn: "Normal",
      quickFormat: !0,
      ...v.run ? { run: v.run } : {}
    });
  }
  const a = t.paragraphStyles || [], c = t.characterStyles || [];
  for (const d of [...a, ...c]) {
    const _ = pr[d.id];
    if (!_) continue;
    const { id: v, name: g, basedOn: m, next: b, quickFormat: x, run: y, paragraph: k } = d;
    i[_] = {
      ...y ? { run: y } : {},
      ...k ? { paragraph: k } : {}
    };
  }
  const h = a.filter(
    (d) => !pr[d.id]
  ), f = c.filter(
    (d) => !pr[d.id]
  );
  return {
    default: i,
    paragraphStyles: Li(o, h),
    characterStyles: Li(u, f)
  };
}
function Li(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((o) => [o.id, o])), n = e.map(
    (o) => r.has(o.id) ? r.get(o.id) : o
  ), i = new Set(e.map((o) => o.id));
  for (const o of t)
    i.has(o.id) || n.push(o);
  return n;
}
async function Vm(e, t = {}) {
  const r = await hm(e, t);
  return zo.toBlob(r);
}
async function hm(e, t = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: i = null,
    headerFirstPageOnly: o = !1,
    footerFirstPageOnly: u = !1
  } = e, {
    paragraphStyles: a,
    characterStyles: c,
    theme: h,
    typography: f,
    numbering: d,
    pageMargin: _,
    pageSize: v,
    pageOrientation: g,
    ...m
  } = t, b = { nextId: 1, footnotes: {} };
  xr(r.flat(), b), n && xr(n, b), i && xr(i, b);
  const { loadAsset: x } = t, y = await an(r.flat(), x), k = {
    pageNumbers: { start: 1, formatType: Hs.DECIMAL },
    ..._ ? { margin: _ } : {}
  };
  v && (k.size = {
    width: v.width,
    height: v.height,
    ...g ? { orientation: g } : {}
  });
  const T = {
    properties: {
      type: _h.CONTINUOUS,
      page: k
    },
    children: y
  };
  if (n) {
    const N = await an(n, x), U = new vo({ children: N }), F = mr(!0);
    o ? (T.headers = { first: U, default: F }, T.properties.titlePage = !0) : T.headers = { default: U };
  } else
    T.headers = { default: mr(!0) };
  if (i) {
    const N = await an(i, x), U = new wo({ children: N }), F = mr(!1);
    u ? (T.footers = { first: U, default: F }, T.properties.titlePage = !0) : T.footers = { default: U };
  } else
    T.footers = { default: mr(!1) };
  T.properties.titlePage && (T.headers && !T.headers.first && (T.headers.first = T.headers.default), T.footers && !T.footers.first && (T.footers.first = T.footers.default));
  const R = {
    ...m,
    sections: [T]
  }, I = f ? { ...h || {}, typography: f } : h;
  if (I) {
    const N = cm(I, {
      paragraphStyles: a,
      characterStyles: c
    }), U = {};
    N.default && Object.keys(N.default).length && (U.default = N.default), N.paragraphStyles.length && (U.paragraphStyles = N.paragraphStyles), N.characterStyles.length && (U.characterStyles = N.characterStyles), Object.keys(U).length && (R.styles = U);
  } else (a && a.length || c && c.length) && (R.styles = {}, a?.length && (R.styles.paragraphStyles = a), c?.length && (R.styles.characterStyles = c));
  return d && d.length && (R.numbering = { config: d }), Object.keys(b.footnotes).length && (R.footnotes = b.footnotes), new Jd(R);
}
function xr(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = t.nextId;
          t.nextId += 1, r.footnoteId = n;
          const i = [];
          for (const o of r.children || [])
            if (o.type === "paragraph")
              i.push(Gn(o));
            else {
              const u = ar(o);
              u.length && i.push(new be({ children: u }));
            }
          i.length || i.push(new be({})), t.footnotes[n] = { children: i };
        }
        r.children && xr(r.children, t);
      }
  }
}
function mr(e) {
  const t = e ? Ee.RIGHT : Ee.CENTER, r = e ? vo : wo;
  return new r({
    children: [
      new be({
        alignment: t,
        children: [
          new Te("Page "),
          new Te({ children: [lt.CURRENT] }),
          new Te(" of "),
          new Te({ children: [lt.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function an(e, t) {
  return (await Promise.all(
    e.map((n) => fm(n, t))
  )).flat();
}
async function fm(e, t) {
  switch (e.type) {
    case "table":
      return [await Wm(e)];
    case "image":
      return [await Hm(e, t)];
    case "tableOfContents":
      return [dm(e)];
    case "webOnly":
      return [];
    default:
      return [await Um(e)];
  }
}
function dm(e) {
  const t = e.toc || {}, r = t.title || "Contents", n = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new tp(r, n);
}
function Gn(e) {
  const t = {};
  if (e.heading && (t.heading = _m(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = $o(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const n = We(e.spacing.before), i = We(e.spacing.after), o = We(e.spacing.line);
    n != null && (t.spacing.before = n), i != null && (t.spacing.after = i), o != null && (t.spacing.line = o), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
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
    for (const i of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const o = e.indent[i];
      if (o == null) continue;
      const u = typeof o == "string" ? parseInt(o, 10) : o;
      Number.isFinite(u) && (n[i] = u);
    }
    Object.keys(n).length && (t.indent = n);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(Om).filter(Boolean));
  const r = (e.children || []).flatMap(ar);
  return e.bookmark && r.length ? t.children = [new Ha({ id: e.bookmark, children: r })] : r.length && (t.children = r), new be(t);
}
function ar(e) {
  switch (e.type) {
    case "text":
      return pm(e);
    case "tab":
      return [new Te({ children: [new rr()] })];
    case "externalHyperlink":
    // A plain <a href> from same-source JSX — same destination, same
    // emitter. See the href note in ir/parser.js.
    case "a":
      return [mm(e)];
    case "internalHyperlink":
      return [vm(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new np(e.footnoteId)] : [];
    case "math":
      return [new Te({ text: e.latex || "" })];
    default:
      return e.content ? [new Te({ text: e.content })] : e.children ? e.children.flatMap(ar) : [];
  }
}
function pm(e) {
  const t = [];
  e.positionalTab && t.push(
    new Te({
      children: [
        new Bc({
          alignment: Lm(e.positionalTab.alignment),
          leader: Dm(e.positionalTab.leader),
          relativeTo: Mm(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new Te({ children: [lt.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new Te({ children: [lt.TOTAL_PAGES] })), t;
  const n = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (n.bold = !0), (e.italics === "true" || e.italics === !0) && (n.italics = !0), e.underline && (n.underline = e.underline), e.style && (n.style = e.style), e.color && (n.color = e.color), e.size != null) {
    const i = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(i) && (n.size = i);
  }
  return e.font && (n.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (n.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (n.allCaps = !0), (e.strike === "true" || e.strike === !0) && (n.strike = !0), e.subScript === "true" || e.subScript === !0 ? n.subScript = !0 : (e.superScript === "true" || e.superScript === !0) && (n.superScript = !0), t.push(new Te(n)), t;
}
function mm(e) {
  const t = e.link || e.href || "", r = (e.children || []).flatMap(ar);
  return new Gc({
    children: r.length ? r : [new Te({ text: t })],
    link: t
  });
}
function vm(e) {
  const t = (e.children || []).flatMap(ar);
  return new Ln({
    children: t.length ? t : [new Te({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function Ho(e) {
  const r = { rows: (e.children || []).filter((n) => n.type === "tableRow").map(wm) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? qr.AUTOFIT : qr.FIXED : r.columnWidths && (r.layout = qr.FIXED), e.tableWidth && (r.width = Go(e.tableWidth)), e.tableBorders && (r.borders = qo(e.tableBorders)), new ef(r);
}
function wm(e) {
  const r = { children: (e.children || []).filter((n) => n.type === "tableCell").map(gm) };
  return e.tableHeader && (r.tableHeader = !0), new ao(r);
}
function gm(e) {
  const t = {};
  if (e.width && (t.width = Go(e.width)), e.margins && (t.margins = ym(e.margins)), e.borders && (t.borders = qo(e.borders)), e.shading && (t.shading = Am(e.shading)), e.verticalAlign && (t.verticalAlign = Cm(e.verticalAlign)), e.columnSpan) {
    const n = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(n) && n > 1 && (t.columnSpan = n);
  }
  if (e.rowSpan) {
    const n = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(n) && n > 1 && (t.rowSpan = n);
  }
  const r = (e.children || []).flatMap((n) => n.type === "table" ? [Ho(n)] : [Gn(n)]);
  return t.children = r.length ? r : [new be({})], new pn(t);
}
function We(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function ym(e) {
  const t = {};
  for (const [r, n] of Object.entries(e)) {
    const i = We(n);
    i != null && (t[r] = i);
  }
  return t;
}
const bm = {
  HEADING_1: xt.HEADING_1,
  HEADING_2: xt.HEADING_2,
  HEADING_3: xt.HEADING_3,
  HEADING_4: xt.HEADING_4,
  HEADING_5: xt.HEADING_5,
  HEADING_6: xt.HEADING_6
};
function _m(e) {
  return bm[e];
}
const xm = {
  left: Ee.LEFT,
  center: Ee.CENTER,
  right: Ee.RIGHT,
  justified: Ee.JUSTIFIED,
  both: Ee.JUSTIFIED
};
function $o(e) {
  return xm[e] ?? Ee.LEFT;
}
const Sm = {
  percentage: Oe.PERCENTAGE,
  pct: Oe.PERCENTAGE,
  dxa: Oe.DXA,
  auto: Oe.AUTO,
  nil: Oe.NIL
};
function Em(e) {
  return Sm[e] ?? Oe.DXA;
}
function Go(e) {
  return {
    size: We(e.size) ?? 0,
    type: Em(e.type)
  };
}
const km = {
  single: De.SINGLE,
  double: De.DOUBLE,
  dotted: De.DOTTED,
  dashed: De.DASHED,
  none: De.NONE,
  nil: De.NIL,
  thick: De.THICK,
  triple: De.TRIPLE
};
function qo(e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    t[r] = {
      style: km[n.style] ?? De.SINGLE,
      size: We(n.size) ?? 1,
      color: n.color || "000000"
    };
  return t;
}
const Tm = {
  clear: rt.CLEAR,
  nil: rt.NIL,
  solid: rt.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: rt.DIAGONAL_CROSS,
  diagonalStripe: rt.DIAGONAL_STRIPE,
  horizontalStripe: rt.HORIZONTAL_STRIPE,
  verticalStripe: rt.VERTICAL_STRIPE
};
function Am(e) {
  const t = e.fill || "000000", r = Tm[e.type] ?? rt.CLEAR, n = e.color || "auto";
  return { type: r, fill: t, color: n };
}
const Rm = {
  top: Ht.TOP,
  center: Ht.CENTER,
  middle: Ht.CENTER,
  // alias — natural-language CSS-ish
  bottom: Ht.BOTTOM
};
function Cm(e) {
  return Rm[e] ?? Ht.TOP;
}
const Im = {
  left: Fe.LEFT,
  right: Fe.RIGHT,
  center: Fe.CENTER,
  decimal: Fe.DECIMAL,
  bar: Fe.BAR,
  clear: Fe.CLEAR,
  end: Fe.END,
  num: Fe.NUM,
  start: Fe.START
}, Pm = {
  none: Et.NONE,
  dot: Et.DOT,
  hyphen: Et.HYPHEN,
  underscore: Et.UNDERSCORE,
  middleDot: Et.MIDDLE_DOT
};
function Om(e) {
  if (!e || typeof e != "object") return null;
  const t = Im[e.type] ?? Fe.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const n = { type: t, position: r };
  if (e.leader) {
    const i = Pm[e.leader];
    i && (n.leader = i);
  }
  return n;
}
const Nm = {
  left: wr.LEFT,
  center: wr.CENTER,
  right: wr.RIGHT
};
function Lm(e) {
  return Nm[e] ?? wr.LEFT;
}
const Fm = {
  none: mt.NONE,
  dot: mt.DOT,
  hyphen: mt.HYPHEN,
  underscore: mt.UNDERSCORE,
  heavy: mt.HEAVY,
  middleDot: mt.MIDDLE_DOT
};
function Dm(e) {
  return Fm[e] ?? mt.NONE;
}
const Bm = {
  indent: fn.INDENT,
  margin: fn.MARGIN
};
function Mm(e) {
  return Bm[e] ?? fn.MARGIN;
}
async function Um(e) {
  return Gn(e);
}
async function Wm(e) {
  return Ho(e);
}
let jm = 1;
function zm(e, t) {
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
async function Hm(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new be({});
    const n = await $m(r, t), i = We(e.transformation?.width) ?? 400, o = We(e.transformation?.height) ?? 300, u = {
      type: zm(r, n),
      data: n,
      transformation: { width: i, height: o },
      altText: {
        id: jm++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (u.floating = e.floating);
    const a = {
      children: [new Lu(u)]
    };
    return e.alignment && (a.alignment = $o(e.alignment)), new be(a);
  } catch (r) {
    return console.error("Error creating image element:", r), new be({});
  }
}
async function $m(e, t) {
  const { bytes: r } = await Zo(e, { loadAsset: t });
  return r;
}
export {
  hm as buildDocument,
  Vm as compileDocx,
  mr as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-DQz2NBMf.js.map
