import { f as na } from "./fetch-Db2pAsvR.js";
import { D as Jt, r as oa, a as aa } from "./_entry.generated-B5mZ7V1T.js";
var ia = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports);
function ut(e) {
  "@babel/helpers - typeof";
  return ut = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ut(e);
}
function la(e, t) {
  if (ut(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(e, t);
    if (ut(s) != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ca(e) {
  var t = la(e, "string");
  return ut(t) == "symbol" ? t : t + "";
}
function d(e, t, r) {
  return (t = ca(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var mt = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    d(
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
}, on = (e) => e instanceof mt || typeof e == "object" && e !== null && typeof e.prepForXml == "function", Wt = (e) => on(e) ? e.rootKey : void 0, ha = Object.seal({}), g = class extends mt {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    super(e), d(
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
    const r = this.root.flatMap((s) => {
      if (on(s)) {
        const n = s.writtenAs;
        return n ? n.map((o) => o.prepForXml(e)) : s.prepForXml(e);
      }
      return s;
    }).filter((s) => s !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : ha };
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
}, Ee = class extends g {
  constructor(e, t) {
    super(e), d(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
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
function hs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, s);
  }
  return r;
}
function b(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hs(Object(r), !0).forEach(function(s) {
      d(e, s, r[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hs(Object(r)).forEach(function(s) {
      Object.defineProperty(e, s, Object.getOwnPropertyDescriptor(r, s));
    });
  }
  return e;
}
var N = class extends mt {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(e) {
    super("_attr"), d(this, "root", void 0), d(
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
    return Object.entries(this.root).forEach(([r, s]) => {
      if (s !== void 0) {
        const n = this.xmlKeys && this.xmlKeys[r] || r;
        t[n] = s;
      }
    }), { _attr: t };
  }
}, Mr = class extends mt {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(e) {
    super("_attr"), d(this, "root", void 0), this.root = e;
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: s }) => b(b({}, t), {}, { [r]: s }), {}) };
  }
}, Q = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
function ua(e, t) {
  if (e == null) return {};
  var r = {};
  for (var s in e) if ({}.hasOwnProperty.call(e, s)) {
    if (t.includes(s)) continue;
    r[s] = e[s];
  }
  return r;
}
function _r(e, t) {
  if (e == null) return {};
  var r, s, n = ua(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (s = 0; s < o.length; s++) r = o[s], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var da = ["elements"], pa = /* @__PURE__ */ new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"]
]), ma = /&([^;]*);?/g, an = (e) => e.indexOf("&") === -1 ? e : e.replace(ma, (t, r) => {
  if (!t.endsWith(";")) throw new Error(`Invalid XML: "&" that starts no entity, in "${e}"`);
  const s = pa.get(r);
  if (s !== void 0) return s;
  const n = /^#x[0-9a-f]+$/i.test(r) ? parseInt(r.slice(2), 16) : /^#[0-9]+$/.test(r) ? parseInt(r.slice(1), 10) : NaN;
  if (!(n > 0 && n <= 1114111)) throw new Error(`Invalid XML: unknown entity "${t}"`);
  return String.fromCodePoint(n);
}), Ct = (e) => e === " " || e === `
` || e === "	" || e === "\r", fa = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, va = (e) => Object.fromEntries([...e.matchAll(fa)].map(([, t, r, s]) => [t, r ?? s])), ln = (e, { keepWhitespaceText: t = !1 } = {}) => {
  const r = {}, s = [];
  let n = e.charCodeAt(0) === 65279 ? 1 : 0;
  for (; n < e.length && Ct(e[n]); ) n++;
  const o = (c) => {
    var p;
    const m = s.length === 0 ? r : s[s.length - 1];
    ((p = m.elements) !== null && p !== void 0 ? p : m.elements = []).push(c);
  }, i = (c) => {
    if (c.trim() === "") {
      c !== "" && t && o({
        type: "text",
        text: c
      });
      return;
    }
    if (s.length === 0) throw new Error(`Invalid XML: text outside of the root element, "${c.trim()}"`);
    o({
      type: "text",
      text: an(c)
    });
  }, a = (c, p, m) => {
    const f = e.indexOf(c, p);
    if (f === -1) throw new Error(`Invalid XML: ${m} that isn't closed`);
    return f;
  };
  for (; n < e.length; ) {
    const c = e.indexOf("<", n);
    if (i(e.slice(n, c === -1 ? e.length : c)), c === -1) break;
    if (e.startsWith("<?", c)) {
      const p = a("?>", c + 2, "processing instruction"), m = e.slice(c + 2, p), f = m.search(/\s/), v = f === -1 ? m : m.slice(0, f), E = f === -1 ? "" : m.slice(f).trimStart();
      if (v.toLowerCase() === "xml") {
        const I = va(E);
        r.declaration = Object.keys(I).length > 0 ? { attributes: I } : {};
      } else o({
        type: "instruction",
        name: v,
        instruction: E
      });
      n = p + 2;
    } else if (e.startsWith("<!--", c)) {
      const p = a("-->", c + 4, "comment"), m = e.slice(c + 4, p);
      m !== "" && o({
        type: "comment",
        comment: m
      }), n = p + 3;
    } else if (e.startsWith("<![CDATA[", c)) {
      const p = a("]]>", c + 9, "CDATA section"), m = e.slice(c + 9, p);
      m !== "" && o({
        type: "cdata",
        cdata: m
      }), n = p + 3;
    } else if (e.startsWith("<!DOCTYPE", c)) {
      let p = c + 9, m, f = !1;
      for (; p < e.length; p++) {
        const v = e[p];
        if (m !== void 0) m = v === m ? void 0 : m;
        else if (v === '"' || v === "'") m = v;
        else if (v === "[") f = !0;
        else if (v === "]") f = !1;
        else if (v === ">" && !f) break;
      }
      if (p === e.length) throw new Error("Invalid XML: DOCTYPE that isn't closed");
      o({
        type: "doctype",
        doctype: e.slice(c + 9, p).replace(/^ /, "")
      }), n = p + 1;
    } else if (e.startsWith("</", c)) {
      const p = a(">", c + 2, "closing tag"), m = e.slice(c + 2, p).trimEnd(), f = s.pop();
      if (f?.name !== m) {
        var l;
        throw new Error(`Invalid XML: closing tag </${m}> doesn't match <${(l = f?.name) !== null && l !== void 0 ? l : ""}>`);
      }
      n = p + 1;
    } else n = wa(e, c + 1, (p, m) => {
      o(p), m || s.push(p);
    });
  }
  if (s.length > 0) throw new Error(`Invalid XML: <${s[s.length - 1].name}> isn't closed`);
  const { elements: u } = r, h = _r(r, da);
  return u === void 0 ? h : b(b({}, h), {}, { elements: u });
}, wa = (e, t, r) => {
  let s = t;
  for (; s < e.length && !Ct(e[s]) && e[s] !== "/" && e[s] !== ">"; ) s++;
  const n = e.slice(t, s);
  if (n === "") throw new Error("Invalid XML: tag without a name");
  const o = [];
  let i = s;
  for (; ; ) {
    for (; i < e.length && Ct(e[i]); ) i++;
    if (i >= e.length) throw new Error(`Invalid XML: <${n}> that isn't closed`);
    if (e[i] === ">" || e.startsWith("/>", i)) {
      const p = e[i] === "/";
      return r(b({
        type: "element",
        name: n
      }, o.length > 0 ? { attributes: Object.fromEntries(o) } : {}), p), i + (p ? 2 : 1);
    }
    const a = e.indexOf("=", i), l = e.slice(i, a === -1 ? e.length : a).trimEnd();
    if (a === -1 || l === "" || /[\s/>]/.test(l)) throw new Error(`Invalid XML: attribute of <${n}> without a value`);
    let u = a + 1;
    for (; u < e.length && Ct(e[u]); ) u++;
    const h = e[u];
    if (h !== '"' && h !== "'") throw new Error(`Invalid XML: value of ${l} on <${n}> isn't quoted`);
    const c = e.indexOf(h, u + 1);
    if (c === -1) throw new Error(`Invalid XML: value of ${l} on <${n}> isn't closed`);
    o.some(([p]) => p === l) || o.push([l, an(e.slice(u + 1, c))]), i = c + 1;
  }
}, ga = /* @__PURE__ */ new Map([
  ["&", "&amp;"],
  ['"', "&quot;"],
  ["'", "&apos;"],
  ["<", "&lt;"],
  [">", "&gt;"]
]), br = (e) => e.replace(/[&"'<>\x00-\x08\x0B\x0C\x0E-\x1F]/g, (t) => {
  var r;
  return (r = ga.get(t)) !== null && r !== void 0 ? r : "";
}), Zt = (e) => typeof e == "string" ? br(e) : e, cn = (e, t, r) => {
  const s = Object.keys(e)[0], n = s === void 0 ? void 0 : e[s], o = [], i = [], a = (l) => {
    for (const [u, h] of Object.entries(l)) o.push(`${u}="${String(Zt(h))}"`);
  };
  if (typeof n == "object") {
    if (n !== null) {
      const { _attr: l, _cdata: u } = n;
      if (l && a(l), u && i.push(`<![CDATA[${u.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`), Array.isArray(n)) {
        let h = !1;
        i.push("");
        for (const c of n) typeof c == "object" ? Object.keys(c)[0] === "_attr" ? a(c._attr) : i.push(cn(c, t, r + 1)) : (i.pop(), h = !0, i.push(Zt(c)));
        h || i.push("");
      }
    }
  } else i.push(Zt(n));
  return {
    name: s,
    attributes: o,
    content: i,
    indents: r > 1 ? t.repeat(r - 1) : ""
  };
}, hn = (e, t, r) => {
  if (typeof e != "object") return String(e);
  const { name: s, attributes: n, content: o, indents: i } = e, { length: a } = o, l = i + (s ? `<${s}` : "") + (n.length > 0 ? ` ${n.join(" ")}` : "") + (a > 0 ? s ? ">" : "" : "/>") + (t && a > 1 ? `
` : "");
  return a === 0 ? l + (t ? `
` : "") : l + o.map((u) => u === void 0 ? "" : hn(u, t, !1)).join("") + (a > 1 ? i : "") + (s ? `</${s}>` : "") + (t && !r ? `
` : "");
}, D = (e, { indent: t = "", declaration: r } = {}) => {
  const s = Array.isArray(e) ? e : [e], n = t ? 1 : 0, o = r?.standalone ? ` standalone="${br(r.standalone)}"` : "";
  return (r === void 0 ? "" : `<?xml version="1.0" encoding="${br(r.encoding || "UTF-8")}"${o}?>${t ? `
` : ""}`) + s.map((i, a) => hn(cn(i, t, n), t, a === s.length - 1)).join("");
}, Br = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new xa(e.name, e.attributes), r = e.elements || [];
      for (const s of r) {
        const n = Br(s);
        n !== void 0 && t.push(n);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, ya = class extends N {
}, xa = class extends g {
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
    return Br(ln(e));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new ya(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, ba = class extends g {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(e) {
    super(""), d(this, "_attr", void 0), this._attr = e;
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
}, un = class extends g {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, W = (e) => {
  if (!Number.isFinite(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, Ht = (e) => {
  const t = W(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, dn = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, us = (e) => dn(e, 1), Wr = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, Ta = {
  in: 1440,
  cm: 1440 / 2.54,
  mm: 1440 / 25.4,
  pt: 20,
  pc: 240,
  pi: 240
}, Ae = (e) => {
  if (typeof e == "number") return e;
  const t = e.slice(-2), r = Number(e.substring(0, e.length - 2)), s = Ta[t];
  if (s === void 0 || Number.isNaN(r)) throw new Error(`Invalid universal measure '${e}'. Expected a number followed by mm, cm, in, pt, pc or pi.`);
  return r * s;
}, pn = (e) => {
  const t = Wr(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, mn = (e) => e === "auto" ? e : dn(e.charAt(0) === "#" ? e.substring(1) : e, 3), fe = (e) => typeof e == "string" ? Wr(e) : W(e), ka = (e) => typeof e == "string" ? pn(e) : Ht(e), j = (e) => typeof e == "string" ? pn(e) : Ht(e), Ea = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, fn = (e) => typeof e == "number" ? W(e) : e.slice(-1) === "%" ? Ea(e) : Wr(e), Sa = Ht, Ca = Ht, Ia = (e) => e.toISOString(), k = class extends g {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Q({ val: t }));
  }
}, Qt = class extends g {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Q({ val: ka(t) }));
  }
}, vn = class extends g {
}, ve = class extends g {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(e, t) {
    super(e), this.root.push(new Q({ val: t }));
  }
}, Je = (e, t) => new w({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), it = class extends g {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(e, t) {
    super(e), this.root.push(new Q({ val: t }));
  }
}, Fe = class extends g {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, w = class extends g {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new Mr(t)), r && this.root.push(...r);
  }
}, _ = {
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
}, wn = (e) => new w({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Hr = {
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
}, gn = {
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
}, yn = {
  dark1: {
    value: "windowText",
    lastColor: "000000"
  },
  light1: {
    value: "window",
    lastColor: "FFFFFF"
  }
}, xn = (e, t) => {
  if (t === "auto") throw new Error(`Invalid theme color ${e} 'auto'. Expected 6 digit hex value`);
  return mn(t);
}, bn = (e = {}) => Object.fromEntries(Object.keys(Hr).map((t) => {
  const r = e[t], s = t === "dark1" || t === "light1" ? yn[t].lastColor : gn[t];
  return [t, r === void 0 ? s : xn(t, r)];
})), Aa = (e, t) => new w({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: xn(e, t)
  } }
}), Pa = (e, t) => {
  const r = t[e], s = e === "dark1" || e === "light1" ? yn[e] : void 0;
  return new w({
    name: `a:${Hr[e]}`,
    children: [r === void 0 && s ? new w({
      name: "a:sysClr",
      attributes: {
        value: {
          key: "val",
          value: s.value
        },
        lastColor: {
          key: "lastClr",
          value: s.lastColor
        }
      }
    }) : Aa(e, r ?? gn[e])]
  });
}, Ra = (e, t = {}) => new w({
  name: "a:clrScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: Object.keys(Hr).map((r) => Pa(r, t))
}), ds = /* @__PURE__ */ new Set([
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
]), Na = /* @__PURE__ */ new Map([
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
]), ps = (e, t) => {
  if (!(e >= 0 && e <= 100)) throw new Error(`Invalid ${t} ${e}. Expected a number from 0 to 100`);
  return Math.round(255 * (1 - e / 100));
}, Oa = ({ theme: e, lighter: t, darker: r }) => {
  if (!ds.has(e)) {
    const o = Na.get(e);
    throw new Error(`Invalid theme color "${e}". ${o ? `Did you mean "${o}"?` : `Expected one of ${[...ds].join(", ")}`}`);
  }
  if (t !== void 0 && r !== void 0) throw new Error("Invalid theme color. Expected lighter or darker, not both");
  const s = t === void 0 ? void 0 : ps(t, "lighter"), n = r === void 0 ? void 0 : ps(r, "darker");
  return {
    tint: s === 255 ? void 0 : s,
    shade: n === 255 ? void 0 : n
  };
}, La = (e) => {
  const [t, r, s] = [
    0,
    2,
    4
  ].map((l) => parseInt(e.slice(l, l + 2), 16) / 255), n = Math.max(t, r, s), o = Math.min(t, r, s), i = (n + o) / 2, a = n - o;
  return a === 0 ? {
    hue: 0,
    saturation: 0,
    lightness: i
  } : {
    hue: (n === t ? ((r - s) / a + 6) % 6 : n === r ? (s - t) / a + 2 : (t - r) / a + 4) * 60,
    saturation: a / (1 - Math.abs(2 * i - 1)),
    lightness: i
  };
}, Fa = ({ hue: e, saturation: t, lightness: r }) => {
  const s = (1 - Math.abs(2 * r - 1)) * t, n = s * (1 - Math.abs(e / 60 % 2 - 1)), [o, i, a] = e < 60 ? [
    s,
    n,
    0
  ] : e < 120 ? [
    n,
    s,
    0
  ] : e < 180 ? [
    0,
    s,
    n
  ] : e < 240 ? [
    0,
    n,
    s
  ] : e < 300 ? [
    n,
    0,
    s
  ] : [
    s,
    0,
    n
  ], l = r - s / 2;
  return [
    o,
    i,
    a
  ].map((u) => Math.floor((u + l) * 255 + 1e-9).toString(16).padStart(2, "0")).join("").toUpperCase();
}, Da = (e, { tint: t, shade: r }) => {
  if (t === void 0 && r === void 0) return e;
  const s = La(e), n = t === void 0 ? s.lightness * r / 255 : s.lightness * t / 255 + (1 - t / 255);
  return Fa(b(b({}, s), {}, { lightness: n }));
}, ms = (e) => e === void 0 ? void 0 : e.toString(16).padStart(2, "0").toUpperCase(), Ma = (e) => typeof e == "string" ? {
  type: "hex",
  value: mn(e)
} : {
  type: "theme",
  color: e,
  change: Oa(e)
}, _a = (e, t) => e.type === "hex" ? { color: e.value } : {
  color: Da(t[e.color.theme], e.change),
  theme: e.color.theme,
  tint: ms(e.change.tint),
  shade: ms(e.change.shade)
}, Ba = bn(), $r = class extends mt {
  /**
  * @throws If a color isn't valid
  */
  constructor(e) {
    super("_attr"), d(this, "attributes", void 0), this.attributes = e.map((t) => "keys" in t ? {
      keys: t.keys,
      color: t.color === void 0 ? void 0 : Ma(t.color)
    } : t);
  }
  prepForXml(e) {
    var t, r;
    const s = (t = (r = e.file) === null || r === void 0 || (r = r.Theme) === null || r === void 0 ? void 0 : r.Colors) !== null && t !== void 0 ? t : Ba, n = this.attributes.flatMap((o) => {
      if (!("keys" in o)) return [[o.key, o.value]];
      if (o.color === void 0) return [];
      const { keys: i } = o, a = _a(o.color, s);
      return [
        [i.color, a.color],
        [i.theme, a.theme],
        [i.tint, a.tint],
        [i.shade, a.shade]
      ];
    });
    return { _attr: Object.fromEntries(n.filter(([, o]) => o !== void 0)) };
  }
}, Wa = class extends g {
  constructor(e, t) {
    super(e), this.root.push(new $r(t));
  }
}, Ur = (e, t) => new Wa(e, t), ft = {
  color: "w:color",
  theme: "w:themeColor",
  tint: "w:themeTint",
  shade: "w:themeShade"
}, H = (e, { color: t, size: r, space: s, style: n }) => Ur(e, [
  {
    key: "w:val",
    value: n
  },
  {
    keys: ft,
    color: t
  },
  {
    key: "w:sz",
    value: r === void 0 ? void 0 : Sa(r)
  },
  {
    key: "w:space",
    value: s === void 0 ? void 0 : Ca(s)
  }
]), ne = {
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
}, Ha = class extends Ee {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(H("w:top", e.top)), e.left && this.root.push(H("w:left", e.left)), e.bottom && this.root.push(H("w:bottom", e.bottom)), e.right && this.root.push(H("w:right", e.right)), e.between && this.root.push(H("w:between", e.between));
  }
}, $a = class extends g {
  constructor() {
    super("w:pBdr");
    const e = H("w:bottom", {
      color: "auto",
      space: 1,
      style: ne.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, Ua = ({ start: e, end: t, left: r, right: s, hanging: n, firstLine: o, firstLineChars: i }) => new w({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : fe(e)
    },
    end: {
      key: "w:end",
      value: t === void 0 ? void 0 : fe(t)
    },
    left: {
      key: "w:left",
      value: r === void 0 ? void 0 : fe(r)
    },
    right: {
      key: "w:right",
      value: s === void 0 ? void 0 : fe(s)
    },
    hanging: {
      key: "w:hanging",
      value: n === void 0 ? void 0 : j(n)
    },
    firstLine: {
      key: "w:firstLine",
      value: o === void 0 ? void 0 : j(o)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: i === void 0 ? void 0 : W(i)
    }
  }
}), Ga = () => new w({ name: "w:br" }), $t = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Gr = (e, t, r) => new w({
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
}), nt = (e, t) => Gr($t.BEGIN, e, t), Tn = /* @__PURE__ */ new WeakSet(), Xa = class extends w {
  constructor() {
    super({
      name: "w:fldChar",
      attributes: {
        type: {
          key: "w:fldCharType",
          value: $t.BEGIN
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
    return Tn.add(t), t;
  }
}, kn = () => new Xa(), ja = (e) => typeof e == "object" && e !== null && Tn.has(e), Me = (e) => Gr($t.SEPARATE, e), _e = (e) => Gr($t.END, e), Va = {
  DECIMAL: "decimal"
}, Re = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, Ne = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { space: "xml:space" });
  }
}, za = class extends g {
  constructor() {
    super("w:instrText"), this.root.push(new Ne({ space: Re.PRESERVE })), this.root.push("PAGE");
  }
}, Ka = class extends g {
  constructor() {
    super("w:instrText"), this.root.push(new Ne({ space: Re.PRESERVE })), this.root.push("NUMPAGES");
  }
}, qa = class extends g {
  constructor() {
    super("w:instrText"), this.root.push(new Ne({ space: Re.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, Ya = class extends g {
  constructor() {
    super("w:instrText"), this.root.push(new Ne({ space: Re.PRESERVE })), this.root.push("SECTION");
  }
}, Ut = ({ fill: e, color: t, type: r }) => Ur("w:shd", [
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
    keys: ft,
    color: t
  },
  {
    key: "w:val",
    value: r ?? ke.CLEAR
  }
]), ke = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
}, te = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, Ja = class extends g {
  constructor(e) {
    super("w:del"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Za = class extends g {
  constructor(e) {
    super("w:ins"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Qa = ({ twoLinesInOne: e, brackets: t, horizontalInVertical: r, fitToLine: s, group: n }) => new w({
  name: "w:eastAsianLayout",
  attributes: {
    id: {
      key: "w:id",
      value: n === void 0 ? void 0 : W(n)
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
      value: s
    }
  }
}), ei = {
  /** Dot emphasis mark */
  DOT: "dot"
}, ti = (e = ei.DOT) => new w({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), ri = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", si = (e, t = 21) => (r = t) => {
  let s = "", n = r | 0;
  for (; n-- > 0; ) s += e[Math.random() * e.length | 0];
  return s;
}, ni = (e = 21) => {
  let t = "", r = e | 0;
  for (; r-- > 0; ) t += ri[Math.random() * 64 | 0];
  return t;
}, En = (e) => {
  const t = new Int32Array(Math.ceil((e.length + 9) / 64) * 16);
  for (let r = 0; r < e.length; r++) t[r >> 2] |= e[r] << 24 - (r & 3) * 8;
  return t[e.length >> 2] |= 128 << 24 - (e.length & 3) * 8, t[t.length - 2] = Math.floor(e.length / 536870912), t[t.length - 1] = e.length * 8, t;
}, Sn = (e) => {
  const t = new Uint8Array(e.length * 4);
  for (let r = 0; r < t.length; r++) t[r] = e[r >> 2] >>> 24 - (r & 3) * 8;
  return t;
}, er = (e, t) => e << t | e >>> 32 - t, pe = (e, t) => e >>> t | e << 32 - t, oi = [
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
], ai = Int32Array.of(1518500249, 1859775393, 2400959708, 3395469782), ii = /* @__PURE__ */ new Int32Array(80), li = (e) => {
  const t = En(e), r = ii;
  let [s, n, o, i, a] = oi;
  for (let l = 0; l < t.length; l += 16) {
    r.set(t.subarray(l, l + 16));
    for (let f = 16; f < 80; f++) r[f] = er(r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16], 1);
    let [u, h, c, p, m] = [
      s,
      n,
      o,
      i,
      a
    ];
    for (let f = 0; f < 80; f++) {
      const v = f < 20 ? h & c | ~h & p : f >= 40 && f < 60 ? h & c | h & p | c & p : h ^ c ^ p, E = er(u, 5) + v + m + ai[Math.floor(f / 20)] + r[f] | 0;
      m = p, p = c, c = er(h, 30), h = u, u = E;
    }
    [s, n, o, i, a] = [
      s + u | 0,
      n + h | 0,
      o + c | 0,
      i + p | 0,
      a + m | 0
    ];
  }
  return Sn([
    s,
    n,
    o,
    i,
    a
  ]);
}, ci = Int32Array.of(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), hi = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
], ui = /* @__PURE__ */ new Int32Array(64), fs = (e) => {
  const t = En(e), r = ui;
  let [s, n, o, i, a, l, u, h] = hi;
  for (let c = 0; c < t.length; c += 16) {
    r.set(t.subarray(c, c + 16));
    for (let A = 16; A < 64; A++) {
      const O = r[A - 15], T = r[A - 2];
      r[A] = r[A - 16] + (pe(O, 7) ^ pe(O, 18) ^ O >>> 3) + r[A - 7] + (pe(T, 17) ^ pe(T, 19) ^ T >>> 10);
    }
    let [p, m, f, v, E, I, P, C] = [
      s,
      n,
      o,
      i,
      a,
      l,
      u,
      h
    ];
    for (let A = 0; A < 64; A++) {
      const O = C + (pe(E, 6) ^ pe(E, 11) ^ pe(E, 25)) + (E & I ^ ~E & P) + ci[A] + r[A] | 0, T = (pe(p, 2) ^ pe(p, 13) ^ pe(p, 22)) + (p & m ^ p & f ^ m & f) | 0;
      C = P, P = I, I = E, E = v + O | 0, v = f, f = m, m = p, p = O + T | 0;
    }
    [s, n, o, i, a, l, u, h] = [
      s + p | 0,
      n + m | 0,
      o + f | 0,
      i + v | 0,
      a + E | 0,
      l + I | 0,
      u + P | 0,
      h + C | 0
    ];
  }
  return Sn([
    s,
    n,
    o,
    i,
    a,
    l,
    u,
    h
  ]);
}, le = (e) => Math.floor(e * 72 * 20), qe = (e = 0) => {
  let t = e;
  return () => ++t;
}, di = () => qe(), pi = () => qe(1), mi = () => qe(), fi = mi(), vi = () => qe(), Cn = vi(), wi = qe(), gi = () => -wi(), Xr = () => ni().toLowerCase(), In = (e) => Array.from(li(typeof e == "string" ? Pn(e) : ArrayBuffer.isView(e) ? e : new Uint8Array(e)), (t) => t.toString(16).padStart(2, "0")).join(""), Ze = (e) => si("1234567890abcdef", e)(), An = () => `${Ze(8)}-${Ze(4)}-${Ze(4)}-${Ze(4)}-${Ze(12)}`, Pn = (e) => new Uint8Array(new TextEncoder().encode(e)), yi = ({ width: e, group: t }) => new w({
  name: "w:fitText",
  attributes: {
    val: {
      key: "w:val",
      value: Math.round(Ae(j(e)))
    },
    id: {
      key: "w:id",
      value: t === void 0 ? gi() : W(t)
    }
  }
}), xi = class extends g {
  constructor(e) {
    super("w:spacing"), this.root.push(new Q({ val: fe(e) }));
  }
}, bi = class extends g {
  constructor(e) {
    super("w:color"), this.root.push(new $r([{
      keys: b(b({}, ft), {}, { color: "w:val" }),
      color: e
    }]));
  }
}, Ti = class extends g {
  constructor(e) {
    super("w:highlight"), this.root.push(new Q({ val: e }));
  }
}, ki = (e) => new w({
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
}), tr = (e, t) => {
  if (typeof e == "string") {
    const s = e;
    return new w({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:ascii",
          value: s
        },
        cs: {
          key: "w:cs",
          value: s
        },
        eastAsia: {
          key: "w:eastAsia",
          value: s
        },
        hAnsi: {
          key: "w:hAnsi",
          value: s
        },
        hint: {
          key: "w:hint",
          value: t
        }
      }
    });
  }
  if ("theme" in e) {
    const s = e.theme === "headings" ? "major" : "minor";
    return new w({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:asciiTheme",
          value: `${s}HAnsi`
        },
        eastAsia: {
          key: "w:eastAsiaTheme",
          value: `${s}EastAsia`
        },
        hAnsi: {
          key: "w:hAnsiTheme",
          value: `${s}HAnsi`
        },
        cs: {
          key: "w:cstheme",
          value: `${s}Bidi`
        }
      }
    });
  }
  const r = e;
  return new w({
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
}, Rn = (e) => new w({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Ei = () => Rn("superscript"), Si = () => Rn("subscript"), Nn = {
  /** Single underline */
  SINGLE: "single"
}, Ci = (e = Nn.SINGLE, t) => Ur("w:u", [{
  key: "w:val",
  value: e
}, {
  keys: ft,
  color: t
}]), Oe = class extends Ee {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new ve("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(tr(e.font)) : "name" in e.font ? this.push(tr(e.font.name, e.font.hint)) : this.push(tr(e.font))), e.bold !== void 0 && this.push(new k("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new k("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new k("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new k("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new k("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new k("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new k("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new k("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new k("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new k("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new k("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new k("w:snapToGrid", e.snapToGrid)), e.vanish !== void 0 && this.push(new k("w:vanish", e.vanish)), e.color && this.push(new bi(e.color)), e.characterSpacing && this.push(new xi(e.characterSpacing)), e.scale !== void 0 && this.push(new it("w:w", e.scale)), e.kern && this.push(new Qt("w:kern", e.kern)), e.position && this.push(new ve("w:position", e.position)), e.size !== void 0 && this.push(new Qt("w:sz", e.size));
    const s = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    s && this.push(new Qt("w:szCs", s)), e.highlight && this.push(new Ti(e.highlight)), e.underline && this.push(Ci(e.underline.type, e.underline.color)), e.effect && this.push(new ve("w:effect", e.effect)), e.border && this.push(H("w:bdr", e.border)), e.shading && this.push(Ut(e.shading)), e.fitText && this.push(yi(e.fitText)), e.subScript && this.push(Si()), e.superScript && this.push(Ei()), e.rightToLeft !== void 0 && this.push(new k("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(ti(e.emphasisMark.type)), e.language && this.push(ki(e.language)), e.eastAsianLayout && this.push(Qa(e.eastAsianLayout)), e.specVanish !== void 0 && this.push(new k("w:specVanish", e.specVanish)), e.math !== void 0 && this.push(new k("w:oMath", e.math)), e.revision && this.push(new Ai(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, Ii = class extends Oe {
  constructor(e) {
    super(e), e?.insertion && this.push(new Za(e.insertion)), e?.deletion && this.push(new Ja(e.deletion));
  }
}, Ai = class extends g {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new Oe(e));
  }
}, Ft = class extends g {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new Ne({ space: Re.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new Ne({ space: (t = e.space) !== null && t !== void 0 ? t : Re.DEFAULT })), this.root.push(e.text);
    }
  }
}, Pe = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, Pi = (e) => {
  switch (e) {
    case Pe.CURRENT:
      return [
        nt(),
        new za(),
        Me(),
        _e()
      ];
    case Pe.TOTAL_PAGES:
      return [
        nt(),
        new Ka(),
        Me(),
        _e()
      ];
    case Pe.TOTAL_PAGES_IN_SECTION:
      return [
        nt(),
        new qa(),
        Me(),
        _e()
      ];
    case Pe.CURRENT_SECTION:
      return [
        nt(),
        new Ya(),
        Me(),
        _e()
      ];
    default:
      return;
  }
}, ae = class Tr extends g {
  constructor(t) {
    if (super("w:r"), d(this, "properties", void 0), d(this, "following", []), this.properties = new Oe(t), this.root.push(this.properties), t.break) for (let r = 0; r < t.break; r++) this.root.push(Ga());
    if (t.children) for (const [r, s] of t.children.entries()) {
      if (Wt(s) === "w:r") {
        const n = t.children.slice(r + 1);
        this.following = [s, ...n.length > 0 ? [new Tr(b(b({}, t), {}, {
          break: void 0,
          children: n
        }))] : []];
        break;
      }
      if (typeof s == "string") {
        const n = Pi(s);
        if (n) {
          const o = t.children.slice(r + 1), i = (u) => new Tr(b(b({}, t), {}, {
            break: void 0,
            children: u
          })), a = this.root.length === 1;
          a && this.root.push(n[0]);
          const l = a ? n.slice(1) : n;
          this.following = [...l.map((u) => i([u])), ...o.length > 0 ? [i(o)] : []];
          break;
        }
        this.root.push(new Ft(s));
        continue;
      }
      this.root.push(s);
    }
    else t.text !== void 0 && this.root.push(new Ft(t.text));
  }
  get writtenAs() {
    return this.following.length > 0 ? [this, ...this.following.flatMap((t) => {
      var r;
      return (r = t.writtenAs) !== null && r !== void 0 ? r : t;
    })] : void 0;
  }
}, $ = class extends ae {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, Ri = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((s) => s.charCodeAt(0)));
}, On = (e) => typeof e == "string" ? Ri(e) : e, Ni = [
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
], Oi = ({ type: e, data: t }, r) => {
  if (e !== void 0) return e;
  const s = On(t), n = ArrayBuffer.isView(s) ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : new Uint8Array(s), o = Ni.find(([, i]) => i.every((a, l) => n[l] === a));
  if (o === void 0) throw new Error(`${r}: type isn't given, and data isn't a PNG, JPEG, GIF or BMP file to read it from. Give its type`);
  return o[0];
}, Li = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Fi = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Di = () => new w({
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
}), Ln = (e) => new w({
  name: "wp:align",
  children: [e]
}), Fn = (e) => new w({
  name: "wp:posOffset",
  children: [e.toString()]
}), Mi = ({ relative: e, align: t, offset: r }) => new w({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Li.PAGE
  } },
  children: [(() => {
    if (t) return Ln(t);
    if (r !== void 0) return Fn(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), _i = ({ relative: e, align: t, offset: r }) => new w({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Fi.PAGE
  } },
  children: [(() => {
    if (t) return Ln(t);
    if (r !== void 0) return Fn(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Bi = (e = {}) => {
  var t, r, s, n;
  return new w({
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
        value: (s = e.margins) === null || s === void 0 ? void 0 : s.top
      },
      bIns: {
        key: "bIns",
        value: (n = e.margins) === null || n === void 0 ? void 0 : n.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new k("a:noAutofit", e.noAutoFit)] : []]
  });
}, Wi = (e = { txBox: "1" }) => new w({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), Hi = (e) => new w({
  name: "w:txbxContent",
  children: [...e]
}), $i = (e) => new w({
  name: "wps:txbx",
  children: [Hi(e)]
}), Ui = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, Dn = class extends g {
  constructor(e, t) {
    super("a:ext"), d(this, "attributes", void 0), this.attributes = new Ui({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, Gi = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, Mn = class extends g {
  constructor(e, t) {
    super("a:off"), this.root.push(new Gi({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, Xi = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, ji = class extends g {
  constructor(e) {
    var t, r, s, n;
    super("a:xfrm"), d(this, "extents", void 0), d(this, "offset", void 0), this.root.push(new Xi({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new Mn((s = e.offset) === null || s === void 0 || (s = s.emus) === null || s === void 0 ? void 0 : s.x, (n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.y), this.extents = new Dn(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, _n = () => new w({ name: "a:noFill" }), Vi = (e) => new w({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), zi = (e) => new w({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), kr = (e) => new w({
  name: "a:solidFill",
  children: [e.type === "rgb" ? Vi(e) : zi(e)]
}), Ki = {
  /** Round cap style */
  ROUND: "rnd",
  /** Square cap style */
  SQUARE: "sq",
  /** Flat cap style */
  FLAT: "flat"
}, qi = {
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
}, Yi = {
  /** Center alignment */
  CENTER: "ctr",
  /** Inset alignment */
  INSET: "in"
}, Ji = (e) => new w({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap === void 0 ? void 0 : Ki[e.cap]
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine === void 0 ? void 0 : qi[e.compoundLine]
    },
    align: {
      key: "algn",
      value: e.align === void 0 ? void 0 : Yi[e.align]
    }
  },
  children: [e.type === "noFill" ? _n() : e.solidFillType === "rgb" ? kr({
    type: "rgb",
    value: e.value
  }) : kr({
    type: "scheme",
    value: e.value
  })]
}), Zi = class extends g {
  constructor() {
    super("a:avLst");
  }
}, Qi = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { prst: "prst" });
  }
}, el = class extends g {
  constructor() {
    super("a:prstGeom"), this.root.push(new Qi({ prst: "rect" })), this.root.push(new Zi());
  }
}, tl = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, Bn = class extends g {
  constructor({ element: e, outline: t, solidFill: r, transform: s }) {
    super(`${e}:spPr`), d(this, "form", void 0), this.root.push(new tl({ bwMode: "auto" })), this.form = new ji(s), this.root.push(this.form), this.root.push(new el()), r ? this.root.push(kr(r)) : t && this.root.push(_n()), t && this.root.push(Ji(t));
  }
}, vs = (e) => new w({
  name: "wps:wsp",
  children: [
    Wi(e.nonVisualProperties),
    new Bn({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    $i(e.children),
    Bi(e.bodyProperties)
  ]
}), yt = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { uri: "uri" });
  }
}, rl = (e) => new w({
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
}), sl = (e) => new w({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [rl(e)]
}), nl = (e) => new w({
  name: "a:extLst",
  children: [sl(e)]
}), ol = (e) => new w({
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
  children: e.type === "svg" ? [nl(e)] : []
}), al = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      left: "l",
      top: "t",
      right: "r",
      bottom: "b"
    });
  }
}, xt = (e, t) => {
  if (e !== void 0) {
    if (!(e >= 0 && e <= 100)) throw new Error(`Invalid crop ${t} ${e}. Expected a number from 0 to 100`);
    return Math.round(e * 1e3);
  }
}, il = class extends g {
  constructor(e) {
    super("a:srcRect"), e && this.root.push(new al({
      left: xt(e.left, "left"),
      top: xt(e.top, "top"),
      right: xt(e.right, "right"),
      bottom: xt(e.bottom, "bottom")
    }));
  }
}, ll = class extends g {
  constructor() {
    super("a:fillRect");
  }
}, cl = class extends g {
  constructor() {
    super("a:stretch"), this.root.push(new ll());
  }
}, hl = class extends g {
  constructor(e, t) {
    super("pic:blipFill"), this.root.push(ol(e)), this.root.push(new il(t)), this.root.push(new cl());
  }
}, ul = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, dl = class extends g {
  constructor() {
    super("a:picLocks"), this.root.push(new ul({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, pl = class extends g {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new dl());
  }
}, ml = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, fl = class extends g {
  constructor() {
    super("pic:cNvPr"), this.root.push(new ml({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const s = e.stack[r];
      if (s instanceof Xt) {
        this.root.push(s.createDrawingClick(e, !1));
        break;
      }
    }
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, vl = class extends g {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new fl()), this.root.push(new pl());
  }
}, wl = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, ws = class extends g {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: s, crop: n }) {
    super("pic:pic"), this.root.push(new wl({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new vl()), this.root.push(new hl(e, n)), this.root.push(new Bn({
      element: "pic",
      transform: t,
      outline: r,
      solidFill: s
    }));
  }
}, gl = (e) => {
  var t, r, s, n;
  return new w({
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
      new Mn((s = e.offset) === null || s === void 0 || (s = s.emus) === null || s === void 0 ? void 0 : s.x, (n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.y),
      new Dn(e.emus.x, e.emus.y),
      new w({
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
      new w({
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
}, yl = () => new w({ name: "wpg:cNvGrpSpPr" }), xl = (e) => new w({
  name: "wpg:wgp",
  children: [
    yl(),
    new w({
      name: "wpg:grpSpPr",
      children: [gl(e.transformation)]
    }),
    ...e.children
  ]
}), bl = class extends g {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: s, crop: n }) {
    if (super("a:graphicData"), e.type === "graphic")
      this.root.push(new yt({ uri: e.uri })), this.root.push(e.content);
    else if (e.type === "wps") {
      this.root.push(new yt({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const o = vs(b(b({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: s
      }));
      this.root.push(o);
    } else if (e.type === "wpg") {
      this.root.push(new yt({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const o = xl({
        children: e.children.map((i) => i.type === "wps" ? vs(b(b({}, i.data), {}, {
          transformation: i.transformation,
          outline: i.outline,
          solidFill: i.solidFill
        })) : new ws({
          mediaData: i,
          transform: i.transformation,
          outline: i.outline,
          solidFill: i.solidFill
        })),
        transformation: t
      });
      this.root.push(o);
    } else {
      this.root.push(new yt({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const o = new ws({
        mediaData: e,
        transform: t,
        outline: r,
        solidFill: s,
        crop: n
      });
      this.root.push(o);
    }
  }
}, Tl = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { a: "xmlns:a" });
  }
}, Wn = class extends g {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: s, crop: n }) {
    super("a:graphic"), d(this, "data", void 0), this.root.push(new Tl({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new bl({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: s,
      crop: n
    }), this.root.push(this.data);
  }
}, Qe = {
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
}, Hn = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, gs = () => new w({ name: "wp:wrapNone" }), kl = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new w({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: e.side || Hn.BOTH_SIDES
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
}), bt = 21600, et = (e, { x: t, y: r }) => new w({
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
}), El = () => new w({
  name: "wp:wrapPolygon",
  attributes: { edited: {
    key: "edited",
    value: !1
  } },
  children: [
    et("wp:start", {
      x: 0,
      y: 0
    }),
    et("wp:lineTo", {
      x: 0,
      y: bt
    }),
    et("wp:lineTo", {
      x: bt,
      y: bt
    }),
    et("wp:lineTo", {
      x: bt,
      y: 0
    }),
    et("wp:lineTo", {
      x: 0,
      y: 0
    })
  ]
}), $n = (e, t = {}, r) => {
  var s;
  return new w({
    name: e,
    attributes: {
      wrapText: {
        key: "wrapText",
        value: (s = r?.side) !== null && s !== void 0 ? s : Hn.BOTH_SIDES
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
    children: [El()]
  });
}, Sl = (e, t) => $n("wp:wrapTight", e, t), Cl = (e, t) => $n("wp:wrapThrough", e, t), Il = (e = {
  top: 0,
  bottom: 0
}) => new w({
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
}), Un = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, Al = (e, t, r, s) => new w({
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
      value: s
    }
  }
}), Gn = (e, t) => new w({
  name: "a:hlinkClick",
  attributes: b(b({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), Pl = "{C183D7F6-B498-43B3-948B-1728B52AA6E4}", Rl = (e) => new w({
  name: "a:extLst",
  attributes: { namespace: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } },
  children: [new w({
    name: "a:ext",
    attributes: { uri: {
      key: "uri",
      value: Pl
    } },
    children: [new w({
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
}), Xn = class {
  constructor(e) {
    d(this, "link", void 0), d(this, "linkId", Xr()), d(this, "addedTo", /* @__PURE__ */ new WeakSet()), this.link = e;
  }
  createClick(e) {
    return Gn(this.linkId, e);
  }
  addRelationship(e) {
    const t = e.viewWrapper.Relationships;
    this.addedTo.has(t) || (this.addedTo.add(t), t.addRelationship(this.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", this.link, Un.EXTERNAL));
  }
}, jn = class extends g {
  constructor({ name: e = "", description: t, title: r, id: s } = {}, { link: n, decorative: o } = {}) {
    super("wp:docPr"), d(this, "link", void 0), d(this, "decorative", void 0);
    const i = {
      id: {
        key: "id",
        value: s ?? fi()
      },
      name: {
        key: "name",
        value: e
      }
    };
    t && (i.description = {
      key: "descr",
      value: t
    }), r && (i.title = {
      key: "title",
      value: r
    }), this.root.push(new Mr(i)), this.link = n === void 0 ? void 0 : new Xn(n), this.decorative = o;
  }
  prepForXml(e) {
    if (this.link)
      this.link.addRelationship(e), this.root.push(this.link.createClick(!0));
    else for (let r = e.stack.length - 1; r >= 0; r--) {
      const s = e.stack[r];
      if (s instanceof Xt) {
        this.root.push(s.createDrawingClick(e, !0));
        break;
      }
    }
    this.decorative && this.root.push(Rl());
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, Vn = ({ top: e, right: t, bottom: r, left: s }) => new w({
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
      value: s
    }
  }
}), rr = 2147483647, ys = 9525, xs = (e, t) => {
  if (t !== void 0 && t > rr) throw new Error(`Invalid drawing ${e} ${t} EMUs (${Math.round(t / ys)} pixels). Word won't open a drawing with a ${e} over ${rr} EMUs (${Math.floor(rr / ys)} pixels). Sizes such as an ImageRun's transformation are in pixels, not EMUs`);
  return t;
}, zn = ({ x: e, y: t }) => new w({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: xs("width", e)
    },
    y: {
      key: "cy",
      value: xs("height", t)
    }
  }
}), Nl = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, Ol = class extends g {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Nl({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, Kn = (e = !0) => new w({
  name: "wp:cNvGraphicFramePr",
  children: e ? [new Ol()] : []
}), Ll = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, Fl = class extends g {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    var s;
    super("wp:anchor");
    const n = b({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Ll({
      distT: n.margins && n.margins.top || 0,
      distB: n.margins && n.margins.bottom || 0,
      distL: n.margins && n.margins.left || 0,
      distR: n.margins && n.margins.right || 0,
      simplePos: "0",
      allowOverlap: n.allowOverlap === !0 ? "1" : "0",
      behindDoc: n.behindDocument === !0 ? "1" : "0",
      locked: n.lockAnchor === !0 ? "1" : "0",
      layoutInCell: n.layoutInCell === !0 ? "1" : "0",
      relativeHeight: n.zIndex ? n.zIndex : t.emus.y
    })), this.root.push(Di()), this.root.push(Mi(n.horizontalPosition)), this.root.push(_i(n.verticalPosition)), this.root.push(zn({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push(Vn((s = r.effectExtent) !== null && s !== void 0 ? s : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Qe.SQUARE:
        this.root.push(kl(r.floating.wrap, r.floating.margins));
        break;
      case Qe.TIGHT:
        this.root.push(Sl(r.floating.margins, r.floating.wrap));
        break;
      case Qe.THROUGH:
        this.root.push(Cl(r.floating.margins, r.floating.wrap));
        break;
      case Qe.TOP_AND_BOTTOM:
        this.root.push(Il(r.floating.margins));
        break;
      case Qe.NONE:
      default:
        this.root.push(gs());
    }
    else this.root.push(gs());
    this.root.push(new jn(r.docProperties, {
      link: r.link,
      decorative: r.decorative
    })), this.root.push(Kn(e.type !== "graphic" || e.lockAspectRatio !== !1)), this.root.push(new Wn({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill,
      crop: r.crop
    }));
  }
}, Dl = ({ mediaData: e, transform: t, docProperties: r, outline: s, solidFill: n, crop: o, effectExtent: i, link: a, decorative: l }) => {
  var u, h, c, p;
  return new w({
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
      zn({
        x: t.emus.x,
        y: t.emus.y
      }),
      Vn(i ?? (s ? {
        top: ((u = s.width) !== null && u !== void 0 ? u : 9525) * 2,
        right: ((h = s.width) !== null && h !== void 0 ? h : 9525) * 2,
        bottom: ((c = s.width) !== null && c !== void 0 ? c : 9525) * 2,
        left: ((p = s.width) !== null && p !== void 0 ? p : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })),
      new jn(r, {
        link: a,
        decorative: l
      }),
      Kn(e.type !== "graphic" || e.lockAspectRatio !== !1),
      new Wn({
        mediaData: e,
        transform: t,
        outline: s,
        solidFill: n,
        crop: o
      })
    ]
  });
}, Ml = class extends g {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Fl({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(Dl({
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
}, qn = (e, t) => ({
  data: On(e.data),
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
}), bs = (e, t, r) => {
  const s = Oi(e, r);
  return b({ type: s }, qn(b(b({}, e), {}, { transformation: t }), `${In(e.data)}.${s}`));
}, _l = ({ id: e, author: t, date: r }, s) => new w({
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
  children: [s]
}), Bl = class extends g {
  constructor(e) {
    var t;
    const r = e.type === "svg" ? b(b({ type: e.type }, qn(e, `${In(e.data)}.svg`)), {}, { fallback: bs(e.fallback, e.transformation, "ImageRun fallback") }) : bs(e, e.transformation, "ImageRun"), s = new Ml(r, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline,
      solidFill: e.solidFill,
      crop: e.crop,
      link: e.link,
      decorative: e.decorative
    }), n = new Oe(e.run), o = (t = e.insertion) !== null && t !== void 0 ? t : e.deletion, i = e.insertion ? "w:ins" : e.deletion ? "w:del" : "w:r";
    if (super(i), d(this, "imageData", void 0), o) {
      this.root.push(new te({
        id: o.id,
        author: o.author,
        date: o.date
      }));
      const a = new w({
        name: "w:r",
        children: [n, s]
      });
      this.addChildElement(e.insertion && e.deletion ? _l(e.deletion, a) : a);
    } else
      this.root.push(n), this.root.push(s);
    this.imageData = r;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, Wl = 32767, Hl = 780, $l = [
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
], Ul = (e) => e <= Wl ? $l.reduce(({ rest: t, text: r }, [s, n]) => ({
  rest: t % s,
  text: r + n.repeat(Math.floor(t / s))
}), {
  rest: e,
  text: ""
}).text : void 0, Gl = (e) => e === 0 ? "" : e <= Hl ? String.fromCharCode(65 + (e - 1) % 26).repeat(Math.ceil(e / 26)) : void 0, Xl = (e) => {
  var t;
  return `${e}${e % 100 >= 11 && e % 100 <= 13 ? "th" : (t = [
    "th",
    "st",
    "nd",
    "rd"
  ][e % 10]) !== null && t !== void 0 ? t : "th"}`;
}, jr = (e) => {
  const t = e.charAt(0) !== e.charAt(0).toUpperCase(), r = (s) => (n) => {
    var o;
    return t ? (o = s(n)) === null || o === void 0 ? void 0 : o.toLowerCase() : s(n);
  };
  switch (e.toLowerCase()) {
    case "arabic":
      return String;
    case "roman":
      return r(Ul);
    case "alphabetic":
      return r(Gl);
    case "ordinal":
      return (s) => s > 0 ? Xl(s) : void 0;
    case "arabicdash":
      return (s) => `- ${s} -`;
    default:
      return;
  }
}, Yn = /* @__PURE__ */ new Set([
  "mergeformat",
  "charformat",
  "mergeformatinet"
]), Jn = /* @__PURE__ */ new Set([
  "upper",
  "lower",
  "firstcap",
  "caps"
]), jl = (e) => /^[#0,]*[#0][#0,]*$/.test(e), Vl = (e, t) => {
  const r = [...t].filter((o) => o === "0").length, s = r + [...t].filter((o) => o === "#").length, n = String(e).padStart(r, "0");
  if (!(n.length < s || r === 0 && e === 0))
    return t.includes(",") ? n.replace(/\B(?=(\d{3})+$)/g, ",") : n;
}, zl = (e, t) => {
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
}, Kl = (e) => {
  var t;
  const r = new RegExp("^\\s*(PAGEREF|NUMPAGES|SECTIONPAGES)\\b(.*)$", "is").exec(e), s = r?.[1].toUpperCase() === "PAGEREF" ? new RegExp('^\\s*("?)([^\\s"\\\\]+)\\1(.*)$', "s").exec(r[2]) : void 0;
  if (!r || r[1].toUpperCase() === "PAGEREF" && !s) return;
  const n = (t = (s ? s[3] : r[2]).match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  let o, i;
  const a = [];
  let l = !1, u = !0;
  for (let m = 0; m < n.length; m++) {
    const f = n[m], v = () => {
      var E;
      return (f.length > 2 ? f.slice(2) : (E = n[++m]) !== null && E !== void 0 ? E : "").replace(/^"(.*)"$/, "$1");
    };
    if (/^\\p$/i.test(f)) l = !0;
    else if (f.startsWith("\\#")) {
      var h;
      const E = v();
      u && (u = i === void 0 && jl(E)), (h = i) !== null && h !== void 0 || (i = E);
    } else if (f.startsWith("\\*")) {
      const E = v(), I = E.toLowerCase();
      if (Jn.has(I)) a.push(I);
      else if (E !== "" && !Yn.has(I)) {
        var c;
        u && (u = o === void 0 && jr(E) !== void 0), (c = o) !== null && c !== void 0 || (o = E);
      }
    }
  }
  const p = b(b(b(b({}, o === void 0 ? {} : { numberFormat: o }), i === void 0 ? {} : { picture: i }), a.length === 0 ? {} : { capitals: a[0] }), {}, { written: u && a.length <= 1 && a[0] !== "caps" && (o === void 0 || i === void 0) });
  return b(s ? {
    type: "pageReference",
    bookmark: s[2],
    relative: l
  } : {
    type: "pageCount",
    scope: r[1].toUpperCase() === "NUMPAGES" ? "document" : "section"
  }, p);
}, ql = (e) => new RegExp("^\\s*TOC\\b.*\\\\s\\b", "is").test(e), Zn = (e, { enclosing: t, within: r, inTextBox: s }, { estimate: n, sectionPageCount: o, blank: i, relativeTo: a }) => {
  const l = Kl(e);
  if (l === void 0) return;
  const { bookmarks: u, pageCount: h, bookmarkPageNumbers: c } = n, { numberFormat: p, picture: m, capitals: f, written: v } = l, E = p !== void 0 || m !== void 0, I = (A) => A === void 0 ? void 0 : m === void 0 ? jr(p ?? "arabic")(A) : Vl(A, m), P = l.type === "pageReference" && l.relative && r === "counted" && !s ? a?.(l.bookmark) : void 0;
  let C;
  return v ? l.type === "pageCount" ? C = I(l.scope === "document" ? h : o) : t.some(ql) ? C = void 0 : E ? C = I(c?.get(l.bookmark)) : C = l.relative ? P : u.get(l.bookmark) : C = void 0, C === void 0 ? i ? "" : void 0 : zl(C, f);
}, Yl = (e, t) => e === "mc:Fallback" || t === "fallback" ? "fallback" : e === "w:del" || e === "w:moveFrom" ? "deleted" : t, dt = (e, t, r, s, n = "counted", o = !1) => {
  for (let u = 0; u < t.length; u++) {
    const h = t[u], c = e.nameOf(h);
    if (c === void 0) continue;
    const p = r[r.length - 1];
    if (c === "w:fldChar") {
      const m = e.attributeOf(h, "w:fldCharType");
      m === "begin" ? r.push({
        begin: h,
        instruction: "",
        inResult: !1
      }) : m === "separate" && p ? (e.writeClean(p.begin, p.instruction), p.inResult = !0, p.result = s.resultOf(p.instruction, {
        within: n,
        enclosing: r.slice(0, -1).map((f) => f.instruction),
        inTextBox: o
      }), p.result !== void 0 && (t.splice(u + 1, 0, e.textElement(p.result)), u++)) : m === "end" && r.pop();
    } else if (c === "w:instrText" && p && !p.inResult) p.instruction += e.textOf(h);
    else if ((c === "w:t" || c === "w:tab" || c === "w:br" || c === "w:cr") && p?.result !== void 0)
      t.splice(u, 1), u--;
    else if (c === "w:fldSimple") {
      const m = s.resultOf(String(e.attributeOf(h, "w:instr")), {
        within: n,
        enclosing: r.map((f) => f.instruction),
        inTextBox: o
      });
      if (m === void 0) {
        var i;
        dt(e, (i = e.contentOf(h)) !== null && i !== void 0 ? i : [], [], s, n, o);
      } else e.setSimpleFieldResult(h, m);
    } else {
      var a;
      if (c === "w:p") {
        var l;
        (l = s.beforeParagraph) === null || l === void 0 || l.call(s, h);
      }
      dt(e, (a = e.contentOf(h)) !== null && a !== void 0 ? a : [], r, s, Yl(c, n), o || c === "w:txbxContent"), c === "w:p" && s.afterParagraph(h);
    }
  }
}, Qn = (e, t) => t.flatMap((r) => {
  var s;
  const n = e.nameOf(r);
  return n === void 0 ? [] : n === "w:sectPr" ? [r] : Qn(e, (s = e.contentOf(r)) !== null && s !== void 0 ? s : []);
}), Jl = (e, t) => {
  var r;
  return ((r = e.contentOf(t)) !== null && r !== void 0 ? r : []).some((s) => {
    var n;
    return e.nameOf(s) === "w:pPr" && ((n = e.contentOf(s)) !== null && n !== void 0 ? n : []).some((o) => e.nameOf(o) === "w:sectPr");
  });
}, Zl = (e, t, r) => {
  const s = Qn(e, [t]).reduce((n, o) => {
    var i, a;
    const l = ((i = e.contentOf(o)) !== null && i !== void 0 ? i : []).flatMap((u) => {
      const h = e.nameOf(u);
      return h === "w:headerReference" || h === "w:footerReference" ? [[`${h} ${String(e.attributeOf(u, "w:type"))}`, String(e.attributeOf(u, "r:id"))]] : [];
    });
    return [...n, new Map([...(a = n[n.length - 1]) !== null && a !== void 0 ? a : [], ...l])];
  }, []).reduce((n, o, i) => {
    for (const l of o.values()) {
      var a;
      n.set(l, [...(a = n.get(l)) !== null && a !== void 0 ? a : [], r[i]]);
    }
    return n;
  }, /* @__PURE__ */ new Map());
  return new Map([...s].flatMap(([n, [o, ...i]]) => o !== void 0 && i.every((a) => a === o) ? [[n, o]] : []));
}, Ql = (e, t, r, { blank: s }) => {
  const { sectionPageCounts: n = [], relativePositions: o } = r;
  let i = 0;
  const a = /* @__PURE__ */ new Map(), l = (u) => {
    var h, c;
    const p = (h = a.get(u)) !== null && h !== void 0 ? h : 0;
    return a.set(u, p + 1), o == null || (c = o.get(u)) === null || c === void 0 ? void 0 : c[p];
  };
  return dt(e, [t], [], {
    resultOf: (u, h) => Zn(u, h, {
      estimate: r,
      sectionPageCount: n[i],
      blank: s,
      relativeTo: l
    }),
    afterParagraph: (u) => {
      i += Jl(e, u) ? 1 : 0;
    }
  }), Zl(e, t, n);
}, ec = (e, t, r, { blank: s, sectionPageCount: n, notes: o = !1 }) => {
  const i = (a) => {
    const l = r.bookmarks.get(a);
    return l === void 0 ? void 0 : `on page ${l}`;
  };
  dt(e, [t], [], {
    resultOf: (a, l) => Zn(a, l, b({
      estimate: r,
      sectionPageCount: n,
      blank: s
    }, o ? { relativeTo: i } : {})),
    afterParagraph: () => {
    }
  });
}, tc = (e, t, { beforeParagraph: r, resultOf: s }) => dt(e, [t], [], {
  resultOf: (n, { within: o }) => s(n, o),
  beforeParagraph: r,
  afterParagraph: () => {
  }
}), eo = class extends g {
  constructor(e = {}) {
    super("w:instrText"), d(this, "properties", void 0), this.properties = e, this.root.push(new Ne({ space: Re.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((s) => `${s.styleName},${s.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, to = class extends g {
  constructor() {
    super("w:sdtContent");
  }
}, ro = (e) => e === void 0 ? kn() : nt(e), Vr = /* @__PURE__ */ new WeakMap(), rc = (e, t) => {
  Vr.set(e, t);
}, sc = class {
  constructor() {
    d(this, "ids", []);
  }
  get(e) {
    var t, r;
    return (r = (t = this.ids)[e]) !== null && r !== void 0 || (t[e] = Cn()), this.ids[e];
  }
}, we = (e) => typeof e == "object" && e !== null ? Object.keys(e)[0] : void 0, ge = (e) => {
  const t = we(e), r = t === void 0 ? void 0 : e[t];
  return Array.isArray(r) ? r : r === void 0 ? [] : [r];
}, he = (e, t) => ge(e).find((r) => we(r) === t), oe = (e, t) => {
  var r;
  return (r = he(e, "_attr")) === null || r === void 0 || (r = r._attr) === null || r === void 0 ? void 0 : r[t];
}, zr = (e, t) => {
  const r = oe(e, t);
  return r === void 0 ? void 0 : Number(r);
}, nc = /* @__PURE__ */ new Set([
  "w:tbl",
  "w:tr",
  "w:tc",
  "w:sdt",
  "w:sdtContent",
  "w:customXml"
]), so = (e) => e.flatMap((t) => {
  const r = we(t);
  return r === "w:p" || Vr.has(t) ? [t] : r !== void 0 && nc.has(r) ? so(ge(t)) : [];
}), oc = /* @__PURE__ */ new Set([
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
]), ac = (e) => {
  switch (we(e)) {
    case "w:t":
      return ge(e).filter((t) => typeof t == "string").join("");
    case "w:tab":
      return "	";
    case "w:br":
      return [void 0, "textWrapping"].includes(oe(e, "w:type")) ? `
` : "";
    case "w:cr":
      return `
`;
    case "w:noBreakHyphen":
      return "-";
    default:
      return "";
  }
}, ic = (e) => {
  const t = [], r = (s) => {
    const n = we(s);
    if (n !== void 0 && oc.has(n)) return ge(s).map(r).join("");
    if (n === "w:fldChar") {
      const o = oe(s, "w:fldCharType");
      return o === "begin" ? t.push(!1) : o === "separate" ? t[t.length - 1] = !0 : t.pop(), "";
    }
    return t.every(Boolean) ? ac(s) : "";
  };
  return ge(e).map(r).join("");
}, no = (e) => {
  const t = we(e);
  return t === "w:bookmarkStart" ? [{
    start: !0,
    id: oe(e, "w:id"),
    name: oe(e, "w:name")
  }] : t === "w:bookmarkEnd" ? [{
    start: !1,
    id: oe(e, "w:id")
  }] : t === void 0 || t === "_attr" ? [] : ge(e).flatMap(no);
}, lc = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.map((r) => {
    const s = no(r), n = /* @__PURE__ */ new Set([...t.values(), ...s.flatMap((o) => o.start ? [o.name] : [])]);
    for (const o of s) o.start ? t.set(o.id, o.name) : t.delete(o.id);
    return n;
  });
}, cc = (e, t) => {
  const r = t ? lc(e) : [];
  return e.map((s, n) => {
    var o;
    const i = he(s, "w:pPr");
    return {
      element: s,
      styleId: oe(he(i, "w:pStyle"), "w:val"),
      outlineLevel: zr(he(i, "w:outlineLvl"), "w:val"),
      text: ic(s),
      bookmarks: (o = r[n]) !== null && o !== void 0 ? o : /* @__PURE__ */ new Set()
    };
  });
}, oo = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 || (t = t.Styles) === null || t === void 0 ? void 0 : t.prepForXml(e);
  return new Map(ge(r).filter((s) => we(s) === "w:style" && ["paragraph", void 0].includes(oe(s, "w:type"))).map((s) => [oe(s, "w:styleId"), {
    name: oe(he(s, "w:name"), "w:val"),
    basedOn: oe(he(s, "w:basedOn"), "w:val"),
    outlineLevel: zr(he(he(s, "w:pPr"), "w:outlineLvl"), "w:val")
  }]));
}, ao = (e) => {
  const t = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(e);
  return t ? [Number(t[1]), Number(t[2])] : void 0;
}, Er = (e, [t, r]) => e >= t && e <= r, Kr = (e, t) => {
  var r, s;
  if (e === void 0) return;
  const n = /^heading ?([1-9])$/i.exec((r = (s = t.get(e)) === null || s === void 0 ? void 0 : s.name) !== null && r !== void 0 ? r : e);
  return n ? Number(n[1]) : void 0;
}, io = (e, t, r = 0) => {
  var s;
  if (e === void 0 || r > t.size) return;
  const n = t.get(e), o = Kr(e, t);
  return (s = n?.outlineLevel) !== null && s !== void 0 ? s : o === void 0 ? io(n?.basedOn, t, r + 1) : o - 1;
}, hc = (e) => {
  const t = oo(e);
  return (r) => {
    const s = he(r, "w:pPr"), n = oe(he(s, "w:pStyle"), "w:val"), o = Kr(n, t), i = lo({
      styleId: n,
      outlineLevel: zr(he(s, "w:outlineLvl"), "w:val")
    }, t), a = i === void 0 || i >= 9 ? void 0 : i + 1;
    return o !== void 0 && (a === void 0 || a === o) ? o : a === void 0 ? void 0 : "unclear";
  };
}, lo = (e, t) => {
  var r;
  return (r = e.outlineLevel) !== null && r !== void 0 ? r : io(e.styleId, t);
}, uc = (e, t, r) => {
  var s;
  const { entriesFromBookmark: n, headingStyleRange: o, stylesWithLevels: i = [], useAppliedParagraphOutlineLevel: a } = e;
  if (t.text.trim() === "" || n && !t.bookmarks.has(n)) return;
  const l = [t.styleId, t.styleId === void 0 || (s = r.get(t.styleId)) === null || s === void 0 ? void 0 : s.name].filter((f) => f !== void 0).map((f) => f.toLowerCase()), u = i.find((f) => l.includes(f.styleName.toLowerCase()));
  if (u) return u.level;
  const h = !!o || i.length > 0 || !!a || !!e.tcFieldIdentifier || !!e.tcFieldLevelRange || !!e.captionLabel || !!e.captionLabelIncludingNumbers, c = o ? ao(o) : h ? void 0 : [1, 9], p = Kr(t.styleId, r);
  if (c && p !== void 0 && Er(p, c)) return p;
  const m = a ? lo(t, r) : void 0;
  return m !== void 0 && Er(m + 1, c ?? [1, 9]) ? m + 1 : void 0;
}, dc = (e, t) => {
  const r = t.preserveTabInEntries ? e : e.replace(/\t/g, " ");
  return (t.preserveNewLineInEntries ? r.split(`
`) : [r.replace(/\n/g, " ")]).map((s, n) => new $({
    break: n > 0 ? 1 : void 0,
    children: s.split("	").flatMap((o, i) => [...i > 0 ? [new wt()] : [], ...o === "" ? [] : [o]])
  }));
}, pc = ({ text: e, separator: t }) => t === "tab" ? [new $(e), new $({ children: [new wt()] })] : [new $(`${e} `)], mc = (e, t) => {
  const r = 240 * (e - 1) + t + 240;
  return r <= 1920 ? Math.ceil(r / 240) * 240 : Math.round(r);
}, fc = (e, t) => {
  var r, s;
  return (r = (s = [...t].find(([, n]) => {
    var o;
    return ((o = n.name) === null || o === void 0 ? void 0 : o.toLowerCase()) === `toc ${e}`;
  })) === null || s === void 0 ? void 0 : s[0]) !== null && r !== void 0 ? r : `TOC${e}`;
}, vc = ({ properties: e, beginDirty: t, textWidth: r, tabLeader: s }, n, o, i) => {
  var a;
  const l = e.pageNumbersEntryLevelsRange ? (a = ao(e.pageNumbersEntryLevelsRange)) !== null && a !== void 0 ? a : [1, 9] : void 0, u = new to();
  return n.forEach((h, c) => {
    var p;
    const m = l === void 0 || !Er(h.level, l), f = [
      ...h.listNumber ? pc(h.listNumber) : [],
      ...dc(h.title, e),
      ...m ? [new $({ children: [e.entryAndPageNumberSeparator || new wt()] }), new eh(h.bookmark, { hyperlink: e.hyperlink })] : []
    ];
    u.addChildElement(new B({
      style: fc(h.level, o),
      tabStops: [...((p = h.listNumber) === null || p === void 0 ? void 0 : p.separator) === "tab" ? [{
        type: "left",
        position: mc(h.level, h.listNumber.width)
      }] : [], {
        type: "right",
        position: r,
        leader: s
      }],
      children: [...c === 0 ? [new ae({ children: [
        ro(t),
        new eo(e),
        Me()
      ] })] : [], ...e.hyperlink ? [new Jr({
        anchor: h.bookmark,
        children: f
      })] : f]
    }));
  }), u.addChildElement(new B({ children: [new ae({ children: [_e()] })] })), u.prepForXml(i);
}, wc = (e, t, r, s) => {
  const n = ge(e), o = n.findIndex((i) => we(i) === "w:pPr") + 1;
  e["w:p"] = [
    ...n.slice(0, o),
    new mo(t, r).prepForXml(s),
    ...n.slice(o),
    new fo(r).prepForXml(s)
  ];
}, gc = (e, t, r, s) => {
  const n = so(ge(e)), o = n.flatMap((h) => {
    const c = Vr.get(h);
    return c ? [[h, c]] : [];
  });
  if (o.length === 0) return;
  const i = oo(t), a = o.some(([, { properties: h }]) => !!h.entriesFromBookmark), l = cc(n.filter((h) => we(h) === "w:p"), a).map((h) => ({
    paragraph: h,
    levels: o.map(([, { properties: c }]) => uc(c, h, i))
  })).filter(({ levels: h }) => h.some((c) => c !== void 0)).map((h, c) => b(b({}, h), {}, { id: r.get(c) }));
  for (const { paragraph: h, id: c } of l) wc(h.element, `_Toc${c}`, c, t);
  const u = l.length > 0 ? s?.(e) : void 0;
  o.forEach(([h, c], p) => {
    const m = l.flatMap(({ paragraph: f, levels: v, id: E }) => {
      const I = v[p], P = u?.get(`_Toc${E}`);
      return I === void 0 ? [] : [b({
        title: f.text,
        level: I,
        bookmark: `_Toc${E}`
      }, P ? { listNumber: P } : {})];
    });
    m.length !== 0 && (h["w:sdt"] = ge(h).map((f) => we(f) === "w:sdtContent" ? vc(c, m, i, t) : f));
  });
}, yc = new RegExp("^\\p{L}[\\p{L}\\p{N}_]*$", "u"), xc = (e) => {
  var t, r;
  let s, n = !1, o, i = !1, a = !1;
  for (let c = 0; c < e.length; c++) {
    var l, u;
    const p = e[c], m = (l = e[c + 1]) !== null && l !== void 0 ? l : "";
    let f;
    if (c === 0 && !p.startsWith("\\")) f = { type: "bookmark" };
    else if (p === "\\c" || p === "\\n") f = { type: p === "\\c" ? "repeat" : "next" };
    else if ((p === "\\r" || p === "\\s") && /^\d+$/.test(m))
      c++, f = p === "\\r" ? {
        type: "reset",
        to: Number(m)
      } : {
        type: "heading",
        level: Number(m)
      };
    else if (p === "\\h") n = !0;
    else if (p === "\\#" && c + 1 < e.length)
      c++, a = !0;
    else if (p === "\\*" && c + 1 < e.length) {
      const v = e[++c];
      if (Jn.has(v.toLowerCase())) i = !0;
      else if (!Yn.has(v.toLowerCase())) {
        if (o !== void 0) return;
        o = v;
      }
    } else return;
    if (f && s) return;
    s = (u = f) !== null && u !== void 0 ? u : s;
  }
  if (s?.type === "bookmark" && e.length > 1) return;
  const h = !a && !(i && o !== void 0 && o.toLowerCase() !== "arabic");
  return {
    step: (t = s) !== null && t !== void 0 ? t : { type: "next" },
    hidden: n && o === void 0,
    format: h ? (r = o) !== null && r !== void 0 ? r : "ARABIC" : ""
  };
}, qr = (e) => {
  var t;
  const r = new RegExp("^\\s*SEQ\\b(.*)$", "is").exec(e);
  if (!r) return;
  const [s, ...n] = (t = r[1].match(/"[^"]*"|\S+/g)) !== null && t !== void 0 ? t : [];
  if (s === void 0) return {};
  const o = s.replace(/^"(.*)"$/, "$1");
  return yc.test(o) ? {
    identifier: o,
    sequence: xc(n)
  } : { identifier: o };
}, bc = (e) => qr(e) !== void 0, Sr = (e) => typeof e != "object" || e === null ? [] : Array.isArray(e) ? e.flatMap(Sr) : Object.entries(e).flatMap(([t, r]) => [...(t === "w:instrText" && Array.isArray(r) ? r : t === "_attr" ? [r["w:instr"]] : []).flatMap((s) => {
  const n = typeof s == "string" ? qr(s) : void 0;
  return n?.identifier === void 0 ? [] : [n.identifier.toLowerCase()];
}), ...Sr(r)]), Tc = (e) => {
  var t;
  const r = (t = e.file) === null || t === void 0 ? void 0 : t.Comments;
  if (!r) return /* @__PURE__ */ new Set();
  const s = {
    View: r,
    Relationships: r.Relationships
  };
  return new Set(Sr(r.prepForXml(b(b({}, e), {}, {
    viewWrapper: s,
    stack: []
  }))));
}, kc = (e) => {
  const t = hc(e), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), n = [];
  let o = -1, i = -1, a;
  const l = (u, h) => {
    var c;
    const p = Math.max(-1, ...n.slice(1, h + 1).filter((v) => v !== void 0)), m = ((c = s.get(u)) !== null && c !== void 0 ? c : []).filter((v) => v.paragraph >= p), f = m.every(({ step: v }) => v?.type === "next" || v?.type === "heading" && v.level === h);
    return o > p || !f ? void 0 : m.length + 1;
  };
  return {
    startParagraph: (u) => {
      i++;
      const h = t(u);
      h === "unclear" ? o = i : h !== void 0 && (n[h] = i);
    },
    numberOf: (u, h) => {
      var c, p, m;
      const { identifier: f, sequence: v } = qr(u);
      if (f === void 0 || h === "fallback") return;
      (c = a) !== null && c !== void 0 || (a = Tc(e));
      const E = f.toLowerCase();
      if (v?.step.type === "bookmark" && h === "counted" && !a.has(E)) return;
      const I = r.has(E) ? r.get(E) : 0, P = a.has(E) || h === "deleted" ? void 0 : v?.step, C = P?.type === "reset" ? P.to : P?.type === "repeat" ? I : P?.type === "heading" ? l(E, P.level) : P?.type === "next" && I !== void 0 ? I + 1 : void 0;
      return r.set(E, C), s.set(E, [...(p = s.get(E)) !== null && p !== void 0 ? p : [], b({ paragraph: i }, C === void 0 ? {} : { step: P })]), C === void 0 || v === void 0 ? void 0 : v.hidden ? "" : (m = jr(v.format)) === null || m === void 0 ? void 0 : m(C);
    }
  };
}, sr = (e) => {
  const t = typeof e == "object" && e !== null && !Array.isArray(e) ? Object.keys(e)[0] : void 0;
  return t === "_attr" ? void 0 : t;
}, Ts = (e) => ({ "w:t": [{ _attr: { "xml:space": "preserve" } }, e] }), Gt = {
  nameOf: sr,
  contentOf: (e) => {
    const t = e[sr(e)];
    return Array.isArray(t) ? t : void 0;
  },
  attributeOf: (e, t) => {
    var r;
    const s = e[sr(e)], n = Array.isArray(s) ? s.find((o) => typeof o == "object" && o !== null && "_attr" in o) : s;
    return n == null || (r = n._attr) === null || r === void 0 ? void 0 : r[t];
  },
  textOf: (e) => Gt.contentOf(e).filter((t) => typeof t == "string").join(""),
  textElement: Ts,
  writeClean: (e) => {
    if (ja(e)) {
      const t = e["w:fldChar"]._attr;
      e["w:fldChar"] = { _attr: Object.fromEntries(Object.entries(t).filter(([r]) => r !== "w:dirty")) };
    }
  },
  setSimpleFieldResult: (e, t) => {
    const r = e["w:fldSimple"];
    e["w:fldSimple"] = [...(Array.isArray(r) ? r : [r]).filter((s) => typeof s == "object" && s !== null && "_attr" in s), { "w:r": [Ts(t)] }];
  }
}, co = /* @__PURE__ */ new WeakMap(), Ec = (e, t) => {
  const { startParagraph: r, numberOf: s } = kc(t);
  tc(Gt, e, {
    beforeParagraph: (n) => r(n),
    resultOf: (n, o) => bc(n) ? s(n, o) : void 0
  });
}, Sc = (e, t, r) => {
  const s = r(e, t), n = Ql(Gt, e, s, { blank: !1 });
  t.file && co.set(t.file, {
    estimate: s,
    partPageCounts: n
  });
}, vt = (e, t, r) => {
  const s = t.file && co.get(t.file);
  if (!e || !s) return;
  const n = r === void 0 ? void 0 : s.partPageCounts.get(`rId${r}`), o = "w:footnotes" in e || "w:endnotes" in e;
  ec(Gt, e, s.estimate, {
    blank: !1,
    sectionPageCount: n,
    notes: o
  });
}, Cc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, X = class ho extends g {
  constructor() {
    super("Relationships"), this.root.push(new Cc({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(t, r, s, n) {
    this.root.push(Al(`rId${t}`, r, s, n));
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
    const r = new ho();
    return r.root.push(...t.root.slice(1)), r;
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, Ic = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, Ac = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, ks = class extends g {
  constructor({ id: e, initials: t, author: r, date: s = /* @__PURE__ */ new Date(), children: n }, o) {
    super("w:comment"), d(this, "paraId", void 0), this.paraId = o, this.root.push(new Ic({
      id: e,
      initials: t,
      author: r,
      date: s.toISOString()
    }));
    for (const i of n) this.root.push(i);
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
    for (let s = r.length - 1; s >= 0; s--) {
      const n = r[s];
      if (n && typeof n == "object" && "w:p" in n) {
        const o = n["w:p"];
        Array.isArray(o) && o.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, Pc = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), Rc = class extends g {
  constructor({ children: e }) {
    super("w:comments"), d(this, "relationships", void 0), d(this, "threadData", void 0), d(this, "commentIdsData", void 0), d(this, "isEmpty", void 0), this.isEmpty = e.length === 0, this.root.push(new Ac({
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
    const t = e.some((s) => s.parentId !== void 0), r = e.some((s) => s.durableId !== void 0);
    if (t || r) {
      const s = new Map(e.map((n) => [n.id, Pc(n.id)]));
      for (const n of e) this.root.push(new ks(n, s.get(n.id)));
      t && (this.threadData = e.map((n) => ({
        paraId: s.get(n.id),
        parentParaId: n.parentId !== void 0 ? s.get(n.parentId) : void 0,
        done: n.resolved
      }))), r && (this.commentIdsData = e.map((n) => {
        var o;
        return {
          paraId: s.get(n.id),
          durableId: (o = n.durableId) !== null && o !== void 0 ? o : s.get(n.id)
        };
      }));
    } else for (const s of e) this.root.push(new ks(s));
    this.relationships = new X();
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
    return vt(t, e), t;
  }
}, Nc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Oc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, Lc = class extends g {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new Oc({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, Fc = class extends g {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new Nc({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new Lc(t));
  }
}, Dc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      paraId: "w16cid:paraId",
      durableId: "w16cid:durableId"
    });
  }
}, Mc = class extends g {
  constructor(e) {
    super("w16cid:commentId"), this.root.push(new Dc({
      paraId: e.paraId,
      durableId: e.durableId
    }));
  }
}, _c = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:mc": "xmlns:mc",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Bc = class extends g {
  constructor(e) {
    super("w16cid:commentsIds"), this.root.push(new _c({
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "w16cid"
    }));
    for (const t of e) this.root.push(new Mc(t));
  }
}, Wc = class extends vn {
  constructor() {
    super("w:endnoteRef");
  }
}, wt = class extends vn {
  constructor() {
    super("w:tab");
  }
}, It = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, Cr = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, De = {
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
}, Hc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, $c = class extends g {
  constructor(e) {
    super("w:ptab"), this.root.push(new Hc({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, Uc = class extends g {
  constructor() {
    super("w:pageBreakBefore");
  }
}, ze = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, Gc = ({ after: e, before: t, line: r, lineRule: s, beforeAutoSpacing: n, afterAutoSpacing: o }) => new w({
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
      value: s
    },
    beforeAutoSpacing: {
      key: "w:beforeAutospacing",
      value: n
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: o
    }
  }
}), Ue = {
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
}, ot = (e) => new w({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), se = {
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
}, Xe = {
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
}, Xc = ({ type: e, position: t, leader: r }) => new w({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    pos: {
      key: "w:pos",
      value: fe(t)
    },
    leader: {
      key: "w:leader",
      value: r
    }
  }
}), jc = (e) => new w({
  name: "w:tabs",
  children: e.map((t) => Xc(t))
}), Tt = class extends g {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new Vc(t)), this.root.push(new zc(e));
  }
}, Vc = class extends g {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Q({ val: e }));
  }
}, zc = class extends g {
  constructor(e) {
    super("w:numId"), this.root.push(new Q({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, Yr = class extends g {
  constructor(...e) {
    super(...e), d(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, Kc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, Xt = class extends g {
  /**
  * @param children - Inline content of the hyperlink
  * @param relationshipId - Id of the external relationship, without the rId prefix
  * @param anchor - Bookmark name or external URL fragment
  * @param externalLink - The full address of an external hyperlink, so the relationship id is kept alongside its anchor
  */
  constructor(e, t, r, s) {
    super("w:hyperlink"), d(this, "linkId", void 0), d(this, "drawingLink", void 0), this.linkId = t, this.drawingLink = r && s !== void 0 ? new Xn(s) : void 0;
    const n = new Kc({
      history: 1,
      anchor: r || void 0,
      id: !r || s !== void 0 ? `rId${this.linkId}` : void 0
    });
    this.root.push(n), e.forEach((o) => {
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
    return this.drawingLink ? (this.drawingLink.addRelationship(e), this.drawingLink.createClick(t)) : Gn(this.linkId, t);
  }
}, Jr = class extends Xt {
  constructor(e) {
    super(e.children, Xr(), e.anchor);
  }
}, qc = class extends g {
  constructor(e) {
    super("w:externalHyperlink"), d(this, "options", void 0), this.options = e;
  }
}, Yc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, Jc = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { id: "w:id" });
  }
}, uo = class po {
  constructor(t) {
    d(this, "start", void 0), d(this, "children", void 0), d(this, "end", void 0);
    const r = Cn();
    this.start = new mo(t.id, r), this.children = t.children, this.end = new fo(r);
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
      ...this.children.flatMap((t) => t instanceof po ? t.writtenAs : [t]),
      this.end
    ];
  }
}, mo = class extends g {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new Yc({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, fo = class extends g {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new Jc({ id: e });
    this.root.push(t);
  }
}, Zc = (e) => new w({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Qc = class extends g {
  constructor(e, t = {}) {
    super("w:instrText"), this.root.push(new Ne({ space: Re.PRESERVE }));
    let r = `PAGEREF ${e}`;
    t.hyperlink && (r = `${r} \\h`), t.useRelativePosition && (r = `${r} \\p`), this.root.push(r);
  }
}, eh = class extends ae {
  constructor(e, t = {}) {
    super({ children: [
      kn(),
      new Qc(e, t),
      Me(),
      _e()
    ] });
  }
}, th = 255, rh = (e) => {
  const t = e.indexOf("#"), r = e.length - t - 1;
  return t > 0 && r > 0 && r <= th ? {
    target: e.slice(0, t),
    anchor: e.slice(t + 1)
  } : { target: e };
}, Dt = (e, t, r) => r === void 0 ? `${e}-${t}` : `${e}-restart ${r}`, kt = ({ id: e, fontKey: t, subsetted: r }, s) => new w({
  name: s,
  attributes: b({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t.toUpperCase()}}`
  } } : {}),
  children: [...r ? [new k("w:subsetted", r)] : []]
}), sh = ({ name: e, altName: t, panose1: r, charset: s, family: n, notTrueType: o, pitch: i, sig: a, embedRegular: l, embedBold: u, embedItalic: h, embedBoldItalic: c }) => new w({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [Je("w:altName", t)] : [],
    ...r ? [Je("w:panose1", r)] : [],
    ...s ? [Je("w:charset", s)] : [],
    Je("w:family", n),
    ...o ? [new k("w:notTrueType", o)] : [],
    Je("w:pitch", i),
    ...a ? [new w({
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
    ...l ? [kt(l, "w:embedRegular")] : [],
    ...u ? [kt(u, "w:embedBold")] : [],
    ...h ? [kt(h, "w:embedItalic")] : [],
    ...c ? [kt(c, "w:embedBoldItalic")] : []
  ]
}), nh = ({ name: e, characterSet: t, embedRegular: r, embedBold: s, embedItalic: n, embedBoldItalic: o }) => sh({
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
  embedBold: s,
  embedItalic: n,
  embedBoldItalic: o
}), oh = (e) => new w({
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
  children: e.map(nh)
}), ah = [
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
], vo = class {
  constructor(e) {
    d(this, "options", void 0), d(this, "fontTable", void 0), d(this, "relationships", void 0), d(
      this,
      /** @deprecated Use `files`, which has the file and key of each face a font embeds, not only the regular face's key */
      "fontOptionsWithKey",
      []
    ), d(
      this,
      /** The files of the faces the fonts embed, in order: the Nth is `fonts/font<N>.odttf`, with the relationship `rId<N>` */
      "files",
      []
    ), this.options = e;
    const t = e.map((r) => ah.flatMap(({ option: s, element: n, bold: o, italic: i }) => {
      const a = r[s];
      return a ? [{
        element: n,
        file: {
          name: r.name,
          data: a,
          bold: o,
          italic: i,
          fontKey: An()
        }
      }] : [];
    }));
    this.files = t.flatMap((r) => r.map(({ file: s }) => s)), this.fontOptionsWithKey = e.map((r, s) => b(b({}, r), {}, { fontKey: t[s][0].file.fontKey })), this.fontTable = oh(e.map((r, s) => b({
      name: r.name,
      characterSet: r.characterSet
    }, Object.fromEntries(t[s].map(({ element: n, file: o }) => [n, {
      id: `rId${this.files.indexOf(o) + 1}`,
      fontKey: o.fontKey
    }]))))), this.relationships = new X();
    for (let r = 0; r < this.files.length; r++) this.relationships.addRelationship(r + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${r + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, ih = () => new w({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), lh = (e) => {
  var t, r;
  return new w({
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
}, nr = /* @__PURE__ */ new WeakMap(), ch = qe(), hh = {
  left: "right",
  right: "left"
}, Ke = class extends Ee {
  /**
  * Creates paragraph properties.
  *
  * @param options - The paragraph formatting to emit
  * @param config - Controls how the element is assembled; see {@link IParagraphPropertiesConfig}
  */
  constructor(e, { implicitListParagraphStyle: t = !0, inListOrder: r = !0 } = {}) {
    if (super("w:pPr", e?.includeIfEmpty), d(this, "numbering", void 0), d(
      this,
      /** The paragraph's `w:numPr`, which is written again with its list's id each time the paragraph is written */
      "numberProperties",
      void 0
    ), !e) return this;
    if (e.heading && this.push(ot(e.heading)), t && (e.bullet && this.push(ot("ListParagraph")), e.numbering && !e.numbering.custom && !e.style && !e.heading && this.push(ot("ListParagraph"))), e.style && this.push(ot(e.style)), e.keepNext !== void 0 && this.push(new k("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new k("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new Uc()), e.frame && this.push(lh(e.frame)), e.widowControl !== void 0 && this.push(new k("w:widowControl", e.widowControl)), e.bullet && this.push(new Tt(1, e.bullet.level)), e.numbering) {
      const { reference: n, instance: o, level: i, restart: a } = e.numbering, l = typeof n == "string" ? n : n.reference, u = new Tt(Dt(l, o ?? 0), i);
      this.numbering = {
        reference: l,
        level: i,
        instance: o,
        restartedListId: a && r && o === void 0 ? ch() : void 0,
        definition: typeof n == "string" ? void 0 : n
      }, this.numberProperties = u, this.push(u);
    } else e.numbering === !1 && this.push(new Tt(0, 0));
    e.border && this.push(new Ha(e.border)), e.thematicBreak && this.push(new $a()), e.shading && this.push(Ut(e.shading)), e.wordWrap && this.push(ih()), e.overflowPunctuation && this.push(new k("w:overflowPunct", e.overflowPunctuation));
    const s = [
      ...e.rightTabStop !== void 0 ? [{
        type: se.RIGHT,
        position: e.rightTabStop
      }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{
        type: se.LEFT,
        position: e.leftTabStop
      }] : []
    ];
    s.length > 0 && this.push(jc(s)), e.bidirectional !== void 0 && this.push(new k("w:bidi", e.bidirectional)), e.spacing && this.push(Gc(e.spacing)), e.indent && this.push(Ua(e.indent)), e.contextualSpacing !== void 0 && this.push(new k("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(wn(e.bidirectional && hh[e.alignment] || e.alignment)), e.outlineLevel !== void 0 && this.push(Zc(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new k("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new k("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Ii(e.run)), e.revision && this.push(new Es(e.revision));
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
    const t = this.root.findIndex((r) => r instanceof Es);
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
      var r, s;
      const { reference: i, level: a, instance: l = 0, definition: u } = this.numbering, h = this.numbering.instance === void 0 ? (r = this.numbering.restartedListId) !== null && r !== void 0 ? r : (s = nr.get(e)) === null || s === void 0 ? void 0 : s.get(i) : void 0;
      e.viewWrapper instanceof vo || e.file.Numbering.createConcreteNumberingInstance(i, l, u, h);
      const c = new Tt(Dt(i, l, h), a);
      this.root.splice(this.root.indexOf(this.numberProperties), 1, c), this.numberProperties = c;
    }
    const n = super.prepForXml(e);
    if (((t = this.numbering) === null || t === void 0 ? void 0 : t.restartedListId) !== void 0) {
      var o;
      nr.set(e, new Map([...(o = nr.get(e)) !== null && o !== void 0 ? o : [], [this.numbering.reference, this.numbering.restartedListId]]));
    }
    return n;
  }
}, Es = class extends g {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ke(b(b({}, e), {}, { includeIfEmpty: !0 }), { inListOrder: !1 }));
  }
}, B = class wo extends Yr {
  constructor(t) {
    if (super("w:p"), d(
      this,
      /** The options the paragraph was made with. A paragraph made from a string has it as its `text` */
      "options",
      void 0
    ), d(this, "properties", void 0), d(this, "alignment", void 0), this.options = typeof t == "string" ? { text: t } : t, typeof t == "string")
      return this.alignment = {}, this.properties = new Ke({}), this.root.push(this.properties), this.root.push(new $(t)), this;
    if (this.alignment = {
      alignment: t.alignment,
      bidirectional: t.bidirectional
    }, this.properties = new Ke(t), this.root.push(this.properties), t.text && this.root.push(new $(t.text)), t.children) for (const r of t.children) {
      if (r instanceof uo) {
        this.root.push(...r.writtenAs);
        continue;
      }
      this.root.push(r);
    }
  }
  prepForXml(t) {
    for (const r of this.root) if (Wt(r) === "w:externalHyperlink") {
      const s = this.root.indexOf(r), { options: n } = r, { target: o, anchor: i } = rh(n.link), a = new Xt(n.children, Xr(), i, n.link);
      t.viewWrapper.Relationships.addRelationship(a.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", o, Un.EXTERNAL), this.root[s] = a;
    }
    return super.prepForXml(t);
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
  addSectionProperties(t) {
    this.properties.addSectionProperties(t);
  }
  /**
  * Removes the section properties added with {@link addSectionProperties}.
  *
  * @internal
  * @param sectionProperties - The properties of the section to remove
  */
  removeSectionProperties(t) {
    this.properties.removeSectionProperties(t);
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
  /**
  * Makes a new paragraph with the paragraph's options and these, which take the place of its own, such as to indent
  * the paragraphs a parser made. The paragraph itself is left as it is, and the new one has the same children.
  *
  * Each option given replaces the paragraph's whole option: to keep the rest of its spacing, give
  * `spacing: { ...paragraph.options.spacing, before: 240 }`. An option given as `undefined` is removed.
  *
  * @example
  * ```typescript
  * const indented = paragraphs.map((paragraph) => paragraph.with({ indent: { left: 720, right: 720 } }));
  * ```
  */
  with(t) {
    return new wo(b(b({}, this.options), t));
  }
  addRunToFront(t) {
    return this.root.splice(1, 0, t), this;
  }
}, uh = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, dh = b(b({}, uh), {}, { BOTH: "both" }), at = dh, go = (e) => new w({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), ph = ({ space: e, count: t, separate: r, equalWidth: s, children: n }) => new w({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : j(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : W(t)
    },
    separate: {
      key: "w:sep",
      value: r
    },
    equalWidth: {
      key: "w:equalWidth",
      value: s
    }
  },
  children: !s && n ? n : void 0
}), mh = ({ type: e, linePitch: t, charSpace: r }) => new w({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: W(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? W(r) : void 0
    }
  }
}), Ve = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, Ss = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, or = (e, t) => new w({
  name: e,
  attributes: {
    type: {
      key: "w:type",
      value: t.type || Ve.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${t.id}`
    }
  }
}), fh = ({ countBy: e, start: t, restart: r, distance: s }) => new w({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : W(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : W(t)
    },
    restart: {
      key: "w:restart",
      value: r
    },
    distance: {
      key: "w:distance",
      value: s === void 0 ? void 0 : j(s)
    }
  }
}), yo = ({ name: e, position: t, numberFormat: r, start: s, restart: n }) => new w({
  name: e,
  children: [
    ...t === void 0 ? [] : [new w({
      name: "w:pos",
      attributes: { val: {
        key: "w:val",
        value: t
      } }
    })],
    ...r ? [new w({
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
    ...s === void 0 ? [] : [new w({
      name: "w:numStart",
      attributes: { val: {
        key: "w:val",
        value: W(s)
      } }
    })],
    ...n === void 0 ? [] : [new w({
      name: "w:numRestart",
      attributes: { val: {
        key: "w:val",
        value: n
      } }
    })]
  ]
}), vh = (e) => yo(b({ name: "w:footnotePr" }, e)), wh = (e) => yo(b({ name: "w:endnotePr" }, e)), Cs = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, gh = class extends Ee {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new Cs({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new Cs({})), e.pageBorderTop && this.root.push(H("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(H("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(H("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(H("w:right", e.pageBorderRight));
  }
}, yh = (e, t, r, s, n, o, i) => new w({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: fe(e)
    },
    right: {
      key: "w:right",
      value: j(t)
    },
    bottom: {
      key: "w:bottom",
      value: fe(r)
    },
    left: {
      key: "w:left",
      value: j(s)
    },
    header: {
      key: "w:header",
      value: j(n)
    },
    footer: {
      key: "w:footer",
      value: j(o)
    },
    gutter: {
      key: "w:gutter",
      value: j(i)
    }
  }
}), xh = {
  /** En dash separator (–), written as `enDash` */
  EN_DASH: "endash"
}, bh = ({ start: e, formatType: t, separator: r, chapterHeadingLevel: s }) => new w({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : W(e)
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
      value: s === void 0 ? void 0 : W(s)
    }
  }
}), Mt = {
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
}, Th = ({ width: e, height: t, orientation: r, code: s }) => {
  const n = j(e), o = j(t);
  return new w({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === Mt.LANDSCAPE ? o : n
      },
      height: {
        key: "w:h",
        value: r === Mt.LANDSCAPE ? n : o
      },
      orientation: {
        key: "w:orient",
        value: r
      },
      code: {
        key: "w:code",
        value: s
      }
    }
  });
}, kh = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, Eh = class extends g {
  constructor(e) {
    super("w:textDirection"), this.root.push(new kh({ val: e }));
  }
}, Sh = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Ch = (e) => new w({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), me = {
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
}, At = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: Mt.PORTRAIT
}, Ir = class xo extends g {
  constructor({ page: { size: { width: t = At.WIDTH, height: r = At.HEIGHT, orientation: s = At.ORIENTATION, code: n } = {}, margin: { top: o = me.TOP, right: i = me.RIGHT, bottom: a = me.BOTTOM, left: l = me.LEFT, header: u = me.HEADER, footer: h = me.FOOTER, gutter: c = me.GUTTER } = {}, pageNumbers: p = {}, borders: m, textDirection: f } = {}, grid: { linePitch: v = 360, charSpace: E, type: I } = {}, headerWrapperGroup: P = {}, footerWrapperGroup: C = {}, lineNumbers: A, titlePage: O, verticalAlign: T, column: y, type: x, footnoteProperties: S, endnoteProperties: R, revision: F } = {}) {
    super("w:sectPr"), d(
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
    ), this.availableTextWidth = xo.calculateAvailableTextWidth({
      pageWidth: s === Mt.LANDSCAPE ? r : t,
      left: l,
      right: i,
      gutter: c,
      column: y
    }), this.addHeaderFooterGroup(Ss.HEADER, P), this.addHeaderFooterGroup(Ss.FOOTER, C), S && this.root.push(vh(S)), R && this.root.push(wh(R)), x && this.root.push(Ch(x)), this.root.push(Th({
      width: t,
      height: r,
      orientation: s,
      code: n
    })), this.root.push(yh(o, i, a, l, u, h, c)), m && this.root.push(new gh(m)), A && this.root.push(fh(A)), this.root.push(bh(p)), y && this.root.push(ph(y)), T && this.root.push(go(T)), O !== void 0 && this.root.push(new k("w:titlePg", O)), f && this.root.push(new Eh(f)), this.root.push(mh({
      linePitch: v,
      charSpace: E,
      type: I
    })), F && this.root.push(new Ih(F));
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
  static calculateAvailableTextWidth({ pageWidth: t, left: r, right: s, gutter: n, column: o }) {
    var i, a;
    const l = Ae(t) - Ae(r) - Ae(s) - Ae(n), u = (i = o?.count) !== null && i !== void 0 ? i : 1;
    return u <= 1 ? l : (l - Ae((a = o?.space) !== null && a !== void 0 ? a : 720) * (u - 1)) / u;
  }
  addHeaderFooterGroup(t, r) {
    r.default && this.root.push(or(t, {
      type: Ve.DEFAULT,
      id: r.default.View.ReferenceId
    })), r.first && this.root.push(or(t, {
      type: Ve.FIRST,
      id: r.first.View.ReferenceId
    })), r.even && this.root.push(or(t, {
      type: Ve.EVEN,
      id: r.even.View.ReferenceId
    }));
  }
}, Ih = class extends g {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ir(e));
  }
}, bo = class extends g {
  constructor({ pageNumbers: e } = {}) {
    super("w:body"), d(this, "sections", []), d(
      this,
      /**
      * Section properties that were moved into a paragraph at the end of their section
      * by {@link addSection}, keyed by that paragraph. Used to find the section that
      * governs a given child of the body, and to write each section's properties into
      * its paragraph while the body is written.
      */
      "sectionParagraphs",
      /* @__PURE__ */ new Map()
    ), d(this, "headingBookmarkIds", new sc()), d(this, "pageNumbers", void 0), this.pageNumbers = e;
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
      const s = this.root[r];
      if (s instanceof Ir) return s;
      const n = this.sectionParagraphs.get(s);
      if (n) return n;
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
      const s = this.createSectionParagraph();
      this.root.push(s), t && this.sectionParagraphs.set(s, t);
    }
    this.sections.push(new Ir(e));
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
    for (const [n, o] of this.sectionParagraphs) n.addSectionProperties(o);
    let r;
    try {
      r = super.prepForXml(e);
    } finally {
      for (const [n, o] of this.sectionParagraphs) n.removeSectionProperties(o);
    }
    const s = (t = this.pageNumbers) === null || t === void 0 ? void 0 : t.listNumbers;
    return gc(r, e, this.headingBookmarkIds, s && ((n) => s(n, e))), this.pageNumbers && (Ec(r, e), Sc(r, e, this.pageNumbers)), r;
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
    const t = e instanceof B ? this.sectionParagraphs.get(e) : void 0;
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
    return e instanceof B && e !== this.root[0] && !this.sectionParagraphs.has(e) && this.root.indexOf(e) === this.root.length - 1 ? e : void 0;
  }
  /**
  * An empty paragraph to end a section that has no paragraph of its own to end it. The section's
  * properties are written into it with the others, when the body is written.
  */
  createSectionParagraph() {
    return new B({});
  }
}, Y = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
}, pt = (e, { type: t = Y.AUTO, size: r }) => {
  let s = r;
  return t === Y.PERCENTAGE && typeof r == "number" && (s = Math.round(r * 50)), new w({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: fn(s)
      }
    }
  });
}, Pt = At.WIDTH - me.LEFT - me.RIGHT - me.GUTTER, To = (e) => e.options.columnSpan || 1, Zr = (e, t) => {
  if (!e) return;
  const { type: r = Y.AUTO, size: s } = e;
  if (r !== Y.PERCENTAGE && r !== Y.DXA) return;
  const n = typeof s == "number" ? r === Y.PERCENTAGE ? s / 100 * t : s : s.endsWith("%") ? Number(s.slice(0, -1)) / 100 * t : Ae(s);
  return n > 0 ? n : void 0;
}, Ah = (e, t) => {
  var r;
  return (r = Zr(e, t)) !== null && r !== void 0 ? r : t;
}, Ph = (e) => Math.max(0, ...e.map((t) => t.cells.reduce((r, s) => r + To(s), 0))), Is = ({ rows: e, width: t, availableWidth: r }) => {
  const s = Ph(e);
  if (s === 0) return [];
  const n = Ah(t, r), o = Array.from({ length: s }, () => {
  }), i = [];
  for (const h of e) {
    let c = 0;
    for (const p of h.cells) {
      const m = To(p), f = Zr(p.options.width, n);
      if (f !== void 0)
        if (m === 1) {
          var a, l;
          (l = o[a = c]) !== null && l !== void 0 || (o[a] = f);
        } else i.push({
          start: c,
          span: m,
          width: f
        });
      c += m;
    }
  }
  for (const { start: h, span: c, width: p } of i) {
    const m = Array.from({ length: c }, (E, I) => h + I).filter((E) => E < s), f = m.filter((E) => o[E] === void 0), v = p - m.reduce((E, I) => {
      var P;
      return E + ((P = o[I]) !== null && P !== void 0 ? P : 0);
    }, 0);
    if (f.length > 0 && v > 0) for (const E of f) o[E] = v / f.length;
  }
  const u = o.flatMap((h, c) => h === void 0 ? [c] : []);
  if (u.length > 0) {
    const h = n - o.reduce((p, m) => p + (m ?? 0), 0), c = h > 0 ? h / u.length : n / s;
    for (const p of u) o[p] = c;
  }
  return o.map((h) => Math.round(h));
}, Rh = (e) => new w({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: j(e)
  } } : void 0
}), Rt = class extends g {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(Rh(r));
    t && this.root.push(new Oh(t));
  }
}, Nh = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { id: "w:id" });
  }
}, Oh = class extends g {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new Nh({ id: e.id })), this.root.push(new Rt(e.columnWidths));
  }
}, Lh = class extends g {
  constructor(e) {
    super("w:ins"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Fh = class extends g {
  constructor(e) {
    super("w:del"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Dh = class extends g {
  constructor(e) {
    super("w:cellIns"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, Mh = class extends g {
  constructor(e) {
    super("w:cellDel"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, _h = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Bh = class extends g {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new _h(e));
  }
}, ko = ({ marginUnitType: e = Y.DXA, top: t, left: r, bottom: s, right: n }) => [
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
    size: s
  },
  {
    name: "w:right",
    size: n
  }
].filter((o) => o.size !== void 0).map(({ name: o, size: i }) => pt(o, {
  type: e,
  size: i
})), Wh = (e) => {
  const t = ko(e);
  if (t.length !== 0)
    return new w({
      name: "w:tblCellMar",
      children: t
    });
}, Hh = (e) => {
  const t = ko(e);
  if (t.length !== 0)
    return new w({
      name: "w:tcMar",
      children: t
    });
}, $h = class extends Ee {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(H("w:top", e.top)), e.start && this.root.push(H("w:start", e.start)), e.left && this.root.push(H("w:left", e.left)), e.bottom && this.root.push(H("w:bottom", e.bottom)), e.end && this.root.push(H("w:end", e.end)), e.right && this.root.push(H("w:right", e.right)), e.diagonalDown && this.root.push(H("w:tl2br", e.diagonalDown)), e.diagonalUp && this.root.push(H("w:tr2bl", e.diagonalUp));
  }
}, Uh = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, Gh = class extends g {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new Uh({ val: W(e) }));
  }
}, Eo = {
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
}, Xh = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, As = class extends g {
  constructor(e) {
    super("w:vMerge"), this.root.push(new Xh({ val: e }));
  }
}, jh = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, Vh = class extends g {
  constructor(e) {
    super("w:textDirection"), this.root.push(new jh({ val: e }));
  }
}, So = class extends Ee {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), d(this, "hasWidth", void 0), d(this, "hasColumnWidth", !1), this.hasWidth = e.width !== void 0, e.width && this.root.push(pt("w:tcW", e.width)), e.columnSpan && this.root.push(new Gh(e.columnSpan)), e.verticalMerge ? this.root.push(new As(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new As(Eo.RESTART)), e.borders && this.root.push(new $h(e.borders)), e.shading && this.root.push(Ut(e.shading)), e.margins) {
      const t = Hh(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new Vh(e.textDirection)), e.verticalAlign && this.root.push(go(e.verticalAlign)), e.insertion && this.root.push(new Dh(e.insertion)), e.deletion && this.root.push(new Mh(e.deletion)), e.cellMerge && this.root.push(new Bh(e.cellMerge)), e.revision && this.root.push(new zh(e.revision));
  }
  /**
  * Gives a cell without a width of its own the width of the table's columns it spans, in twips.
  *
  * @internal
  */
  setColumnWidth(e) {
    this.hasWidth || (this.root.splice(0, this.hasColumnWidth ? 1 : 0, pt("w:tcW", {
      size: e,
      type: Y.DXA
    })), this.hasColumnWidth = !0);
  }
}, zh = class extends g {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new So(b(b({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Ar = class extends g {
  constructor(e) {
    super("w:tc"), d(
      this,
      /**
      * The options the cell was created with.
      *
      * Its borders and shading are declared with hex colors, as they were before they took colors of the document's
      * theme, so that code reading them still compiles. A cell given a theme color has it here as it was given.
      */
      "options",
      void 0
    ), d(this, "properties", void 0), this.options = e, this.properties = new So(e), this.root.push(this.properties);
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
    return Wt(this.root[this.root.length - 1]) !== "w:p" && this.root.push(new B({})), super.prepForXml(e);
  }
}, Pr = (e, t) => t ? new k(e) : new ve(e, "off"), Ge = {
  style: ne.NONE,
  size: 0,
  color: "auto"
}, Kh = {
  style: ne.SINGLE,
  size: 4,
  color: "auto"
}, Co = class extends Ee {
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
    for (const [s, n] of r) {
      const o = n ?? (t ? Kh : void 0);
      o && this.root.push(H(s, o));
    }
  }
};
d(Co, "NONE", {
  top: Ge,
  bottom: Ge,
  left: Ge,
  right: Ge,
  insideHorizontal: Ge,
  insideVertical: Ge
});
var ar = {
  CENTER: "center",
  LEFT: "left",
  RIGHT: "right"
}, qh = {
  /**
  * In line with the text, with no text beside it. Word places a floating table lined up inline at the top of the
  * paragraph after it, with text beside it, so the table is written in line with the text instead.
  */
  INLINE: "inline"
}, Yh = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: s, absoluteVerticalPosition: n, relativeVerticalPosition: o, bottomFromText: i, topFromText: a, leftFromText: l, rightFromText: u }) => new w({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: l === void 0 ? void 0 : j(l)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: u === void 0 ? void 0 : j(u)
    },
    topFromText: {
      key: "w:topFromText",
      value: a === void 0 ? void 0 : j(a)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: i === void 0 ? void 0 : j(i)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : fe(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: n === void 0 ? void 0 : fe(n)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: e
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: s
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
}), ir = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, Jh = (e) => new w({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), Zh = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, Io = ({ type: e = Zh.DXA, value: t }) => new w({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: fn(t)
    }
  }
}), Qh = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: s, noHBand: n, noVBand: o }) => new w({
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
      value: s
    },
    noHBand: {
      key: "w:noHBand",
      value: n
    },
    noVBand: {
      key: "w:noVBand",
      value: o
    }
  }
}), eu = (e) => new w({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), tu = {
  [ar.LEFT]: _.LEFT,
  [ar.CENTER]: _.CENTER,
  [ar.RIGHT]: _.RIGHT
}, Qr = class extends Ee {
  constructor(e) {
    var t, r, s;
    super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new ve("w:tblStyle", e.style));
    const n = ((t = e.float) === null || t === void 0 ? void 0 : t.relativeVerticalPosition) === qh.INLINE, o = n ? void 0 : e.float;
    o && this.root.push(Yh(o)), o?.overlap && this.root.push(eu(o.overlap)), e.visuallyRightToLeft !== void 0 && this.root.push(Pr("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(pt("w:tblW", e.width));
    const i = (r = e.alignment) !== null && r !== void 0 ? r : n && (!((s = e.float) === null || s === void 0) && s.relativeHorizontalPosition) ? tu[e.float.relativeHorizontalPosition] : void 0;
    if (i && this.root.push(wn(i)), e.cellSpacing && this.root.push(Io(e.cellSpacing)), e.indent && this.root.push(pt("w:tblInd", e.indent)), e.borders && this.root.push(new Co(e.borders, { fillMissingSides: !e.style })), e.shading && this.root.push(Ut(e.shading)), e.layout && this.root.push(Jh(e.layout)), e.cellMargin) {
      const a = Wh(e.cellMargin);
      a && this.root.push(a);
    }
    e.tableLook && this.root.push(Qh(e.tableLook)), e.revision && this.root.push(new ru(e.revision));
  }
}, ru = class extends g {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Qr(b(b({}, e), {}, { includeIfEmpty: !0 })));
  }
}, su = (e, t) => new w({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: j(e)
    },
    rule: {
      key: "w:hRule",
      value: t
    }
  }
}), Ao = class extends Ee {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(Pr("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(Pr("w:tblHeader", e.tableHeader)), e.height && this.root.push(su(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(Io(e.cellSpacing)), e.insertion && this.root.push(new Lh(e.insertion)), e.deletion && this.root.push(new Fh(e.deletion)), e.revision && this.root.push(new nu(e.revision));
  }
}, nu = class extends g {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new te({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new Ao(b(b({}, e), {}, { includeIfEmpty: !0 })));
  }
}, _t = (e, t) => {
  const r = e[t];
  return Array.isArray(r) ? r : [];
}, lt = (e) => Object.keys(e)[0], ou = (e, t) => {
  const r = _t(e, "w:p"), s = r.find((a) => lt(a) === "w:pPr");
  if (!s) return { "w:p": [{ "w:pPr": [t] }, ...r] };
  const n = _t(s, "w:pPr");
  if (n.some((a) => lt(a) === "w:keepNext")) return e;
  const o = n.filter((a) => lt(a) === "w:pStyle").length, i = { "w:pPr": [
    ...n.slice(0, o),
    t,
    ...n.slice(o)
  ] };
  return { "w:p": r.map((a) => a === s ? i : a) };
}, Po = class extends g {
  constructor(e) {
    super("w:tr"), d(this, "options", void 0), this.options = e, this.root.push(new Ao(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    if (this.cells.length === 0) return;
    const t = super.prepForXml(e);
    if (!t || this.options.keepNext === void 0) return t;
    const r = new k("w:keepNext", this.options.keepNext).prepForXml(e);
    return { "w:tr": _t(t, "w:tr").map((s) => lt(s) === "w:tc" ? { "w:tc": _t(s, "w:tc").map((n) => lt(n) === "w:p" ? ou(n, r) : n) } : s) };
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => Wt(e) === "w:tc");
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
      const s = this.root[r];
      t += s.options.columnSpan || 1;
    }
    return t;
  }
  columnIndexToRootIndex(e, t = !1) {
    if (e < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let r = 0, s = 1;
    for (; r <= e; ) {
      if (s >= this.root.length) {
        if (t) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${r - 1}`);
      }
      const n = this.root[s];
      s += 1, r += n && n.options.columnSpan || 1;
    }
    return s - 1;
  }
}, au = class Ro extends Yr {
  constructor({ rows: t, width: r, columnWidths: s, columnWidthsRevision: n, margins: o, indent: i, float: a, layout: l, style: u, borders: h, alignment: c, visuallyRightToLeft: p, tableLook: m, cellSpacing: f, revision: v }) {
    super("w:tbl"), d(this, "rows", void 0), d(this, "width", void 0), d(this, "columnWidths", void 0), d(this, "columnWidthsRevision", void 0), d(
      this,
      /**
      * Grid column widths in twips: the explicit `columnWidths`, or the widths derived
      * from the table and cell widths (re-resolved against the actual page or parent
      * cell every time the table is serialized).
      */
      "resolvedColumnWidths",
      void 0
    ), this.rows = t, this.width = r ?? { size: 100 }, this.columnWidths = s, this.columnWidthsRevision = n, t.forEach((E, I) => {
      if (I === t.length - 1) return;
      let P = 0;
      E.cells.forEach((C) => {
        if (C.options.rowSpan && C.options.rowSpan > 1) {
          const A = C.options.children[C.options.children.length - 1], O = new Ar({
            rowSpan: C.options.rowSpan - 1,
            columnSpan: C.options.columnSpan,
            width: C.options.width,
            borders: C.options.borders,
            shading: C.options.shading,
            margins: C.options.margins,
            textDirection: C.options.textDirection,
            verticalAlign: C.options.verticalAlign,
            children: A instanceof B ? [new B(A.Alignment)] : [],
            verticalMerge: Eo.CONTINUE
          });
          t[I + 1].addCellToColumnIndex(O, P);
        }
        P += C.options.columnSpan || 1;
      });
    }), this.setCellWidths(Pt), this.resolvedColumnWidths = s ?? Is({
      rows: t,
      width: this.width,
      availableWidth: Pt
    }), this.root.push(new Qr({
      borders: u ? h : h ?? {},
      width: this.width,
      indent: i,
      float: a,
      layout: l,
      style: u,
      alignment: c,
      cellMargin: o,
      visuallyRightToLeft: p,
      tableLook: m,
      cellSpacing: f,
      revision: v
    })), this.root.push(new Rt(this.resolvedColumnWidths, n));
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
    const { cells: s } = t, n = s.indexOf(r);
    if (n === -1) return;
    const o = s.slice(0, n).reduce((a, l) => a + (l.options.columnSpan || 1), 0), i = this.resolvedColumnWidths.slice(o, o + (r.options.columnSpan || 1));
    return i.length === 0 ? void 0 : i.reduce((a, l) => a + l, 0);
  }
  /**
  * Resolves derived grid column widths against the width actually available to the
  * table (the section's text width, or the parent cell for nested tables) before
  * serializing.
  */
  prepForXml(t) {
    if (this.setCellWidths(this.resolveAvailableWidth(t)), this.columnWidths === void 0) {
      this.resolvedColumnWidths = Is({
        rows: this.rows,
        width: this.width,
        availableWidth: this.resolveAvailableWidth(t)
      });
      const r = this.root.findIndex((s) => s instanceof Rt);
      this.root[r] = new Rt(this.resolvedColumnWidths, this.columnWidthsRevision);
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
    const s = this.columnWidths.reduce((i, a) => i + a, 0), n = (r = Zr(this.width, t)) !== null && r !== void 0 ? r : 0, o = s > 0 && n > s ? n / s : 1;
    for (const i of this.rows) {
      let a = 0;
      for (const l of i.cells) {
        const u = l.options.columnSpan || 1, h = this.columnWidths.slice(a, a + u), c = Math.round(h.reduce((p, m) => p + m, 0) * o);
        h.length === u && c > 0 && l.setColumnWidth(c), a += u;
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
    var r, s, n;
    const { stack: o } = t, i = o[o.length - 1], a = o[o.length - 2], l = o[o.length - 3];
    if (i instanceof Ar && a instanceof Po && l instanceof Ro) {
      const p = l.getCellWidth(a, i);
      if (p !== void 0) return p;
    }
    const u = o.findIndex((p) => p instanceof bo), h = (r = t.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 ? void 0 : r.View.Body, c = u >= 0 ? o[u].getSectionPropertiesFor((s = o[u + 1]) !== null && s !== void 0 ? s : this) : h?.getSectionPropertiesFor();
    return (n = c?.AvailableTextWidth) !== null && n !== void 0 ? n : Pt;
  }
}, iu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, lu = class extends g {
  constructor() {
    super("Properties"), this.root.push(new iu({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, cu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, ye = (e, t) => new w({
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
}), G = (e, t) => new w({
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
}), hu = class extends g {
  /**
  * @param options.macros - Whether the document has VBA macros, which makes its main part a macro-enabled document
  * and adds the VBA project (word/vbaProject.bin)
  */
  constructor({ macros: e = !1 } = {}) {
    super("Types"), this.root.push(new cu({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(ye("image/png", "png")), this.root.push(ye("image/jpeg", "jpeg")), this.root.push(ye("image/jpeg", "jpg")), this.root.push(ye("image/bmp", "bmp")), this.root.push(ye("image/gif", "gif")), this.root.push(ye("image/svg+xml", "svg")), this.root.push(ye("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(ye("application/xml", "xml")), this.root.push(ye("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(G(e ? "application/vnd.ms-word.document.macroEnabled.main+xml" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(G("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")), this.root.push(G("application/vnd.openxmlformats-officedocument.theme+xml", "/word/theme/theme1.xml")), e && this.root.push(G("application/vnd.ms-office.vbaProject", "/word/vbaProject.bin"));
  }
  /**
  * Registers the comments part in the content types.
  */
  addComments() {
    this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers the commentsIds part in the content types.
  */
  addCommentsIds() {
    this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml", "/word/commentsIds.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(e) {
    this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  /**
  * Registers a part by its name, such as a chart or an embedded workbook that a drawing adds to the package.
  *
  * @param contentType - The part's content type
  * @param partName - The part's name, from the root of the package, such as "/word/charts/chart1.xml"
  */
  addOverride(e, t) {
    this.root.push(G(e, t));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(e) {
    this.root.push(G("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, Ps = {
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
}, jt = class extends N {
  constructor(e, t) {
    super(b({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, Ps[r]])))), d(this, "xmlKeys", b({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(Ps).map((r) => [r, `xmlns:${r}`]))));
  }
}, uu = class extends g {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new jt([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new Fe("dc:title", e.title)), e.subject && this.root.push(new Fe("dc:subject", e.subject)), e.creator && this.root.push(new Fe("dc:creator", e.creator)), e.keywords && this.root.push(new Fe("cp:keywords", e.keywords)), e.description && this.root.push(new Fe("dc:description", e.description)), e.lastModifiedBy && this.root.push(new Fe("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new Fe("cp:revision", String(e.revision))), this.root.push(new Rs("dcterms:created")), this.root.push(new Rs("dcterms:modified"));
  }
}, du = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { type: "xsi:type" });
  }
}, Rs = class extends g {
  constructor(e) {
    super(e), this.root.push(new du({ type: "dcterms:W3CDTF" })), this.root.push(Ia(/* @__PURE__ */ new Date()));
  }
}, pu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, mu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, fu = class extends g {
  constructor(e, t) {
    super("property"), this.root.push(new mu({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new vu(t.value));
  }
}, vu = class extends g {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, wu = class extends g {
  constructor(e) {
    super("Properties"), d(this, "nextId", void 0), d(this, "properties", []), this.root.push(new pu({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.root.splice(1, this.root.length - 1, ...this.properties), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new fu(this.nextId++, e));
  }
}, gu = (e) => new w({
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
  children: [new w({
    name: "ds:schemaRefs",
    children: [new w({
      name: "ds:schemaRef",
      attributes: { uri: {
        key: "ds:uri",
        value: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography"
      } }
    })]
  })]
}), yu = {
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
}, xu = (e) => new w({
  name: "wne:vbaSuppData",
  attributes: { namespace: {
    key: "xmlns:wne",
    value: "http://schemas.microsoft.com/office/word/2006/wordml"
  } },
  children: [new w({
    name: "wne:docEvents",
    children: Object.entries(yu).filter(([t]) => e.includes(t)).map(([, t]) => new w({ name: t }))
  })]
}), bu = class extends g {
  /**
  * @throws If a color isn't valid, or `color` is a theme color and `themeColor`, `themeShade` or `themeTint` is given
  */
  constructor({ color: e, themeColor: t, themeShade: r, themeTint: s }) {
    if (super("w:background"), typeof e == "object" && (t !== void 0 || r !== void 0 || s !== void 0)) throw new Error("Invalid background. Expected a theme color in color, or themeColor, themeShade and themeTint, not both");
    this.root.push(new $r([
      {
        keys: ft,
        color: e
      },
      {
        key: "w:themeColor",
        value: t
      },
      {
        key: "w:themeShade",
        value: r === void 0 ? void 0 : us(r)
      },
      {
        key: "w:themeTint",
        value: s === void 0 ? void 0 : us(s)
      }
    ]));
  }
}, Tu = class extends g {
  constructor(e) {
    super("w:document"), d(this, "body", void 0), this.root.push(new jt([
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
    ], "w14 w15 wp14")), this.body = new bo({ pageNumbers: e.pageNumbers }), e.background && this.root.push(new bu(e.background)), this.root.push(this.body);
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
}, ku = class {
  constructor(e) {
    d(this, "document", void 0), d(this, "relationships", void 0), this.document = new Tu(e), this.relationships = new X();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, Eu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, No = class extends g {
  constructor(e, t) {
    super("w:p"), d(this, "paragraph", void 0), d(this, "mark", void 0), this.paragraph = e, this.mark = t;
  }
  prepForXml(e) {
    const t = this.paragraph.prepForXml(e)["w:p"], r = Array.isArray(t) ? t : [], s = r.length > 0 && "w:pPr" in r[0] ? 1 : 0;
    return { "w:p": [
      ...r.slice(0, s),
      this.mark.prepForXml(e),
      ...r.slice(s)
    ] };
  }
}, Su = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Cu = class extends ae {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new Wc());
  }
}, Ns = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, lr = class extends g {
  constructor(e) {
    super("w:endnote"), this.root.push(new Su({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new No(r, new Cu()) : r);
  }
}, Iu = class extends g {
  constructor() {
    super("w:continuationSeparator");
  }
}, Oo = class extends ae {
  constructor() {
    super({}), this.root.push(new Iu());
  }
}, Au = class extends g {
  constructor() {
    super("w:separator");
  }
}, Lo = class extends ae {
  constructor() {
    super({}), this.root.push(new Au());
  }
}, Pu = class extends g {
  constructor() {
    super("w:endnotes"), d(this, "ownNotes", /* @__PURE__ */ new Map()), d(this, "highestId", 0), this.root.push(new Eu({
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
    const e = new lr({
      id: -1,
      type: Ns.SEPARATOR,
      children: [new B({
        spacing: {
          after: 0,
          line: 240,
          lineRule: ze.AUTO
        },
        children: [new Lo()]
      })]
    });
    this.root.push(e);
    const t = new lr({
      id: 0,
      type: Ns.CONTINUATION_SEPARATOR,
      children: [new B({
        spacing: {
          after: 0,
          line: 240,
          lineRule: ze.AUTO
        },
        children: [new Oo()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new lr({
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
    const s = this.ownNotes.get(e);
    if (s !== void 0) return s;
    const n = this.highestId + 1;
    return this.createEndnote(n, t.children), this.ownNotes.set(e, n), n;
  }
  /**
  * Formats the endnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return vt(t, e), t;
  }
}, Ru = class {
  constructor() {
    d(this, "endnotes", void 0), d(this, "relationships", void 0), this.endnotes = new Pu(), this.relationships = new X();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, Nu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, Ou = class extends un {
  constructor(e, t) {
    super("w:ftr", t), d(this, "refId", void 0), this.refId = e, t || this.root.push(new Nu({
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
    return vt(t, e, this.refId), t;
  }
}, Lu = class {
  constructor(e, t, r) {
    d(this, "media", void 0), d(this, "footer", void 0), d(this, "relationships", void 0), this.media = e, this.footer = new Ou(t, r), this.relationships = new X();
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
}, Fu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Du = class extends g {
  constructor() {
    super("w:footnoteRef");
  }
}, Mu = class extends ae {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new Du());
  }
}, Os = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, cr = class extends g {
  constructor(e) {
    super("w:footnote"), this.root.push(new Fu({
      type: e.type,
      id: e.id
    }));
    for (const [t, r] of e.children.entries()) this.root.push(t === 0 ? new No(r, new Mu()) : r);
  }
}, _u = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, Bu = class extends g {
  constructor() {
    super("w:footnotes"), d(this, "ownNotes", /* @__PURE__ */ new Map()), d(this, "highestId", 0), this.root.push(new _u({
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
    const e = new cr({
      id: -1,
      type: Os.SEPERATOR,
      children: [new B({
        spacing: {
          after: 0,
          line: 240,
          lineRule: ze.AUTO
        },
        children: [new Lo()]
      })]
    });
    this.root.push(e);
    const t = new cr({
      id: 0,
      type: Os.CONTINUATION_SEPERATOR,
      children: [new B({
        spacing: {
          after: 0,
          line: 240,
          lineRule: ze.AUTO
        },
        children: [new Oo()]
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
    const r = new cr({
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
    const s = this.ownNotes.get(e);
    if (s !== void 0) return s;
    const n = this.highestId + 1;
    return this.createFootNote(n, t.children), this.ownNotes.set(e, n), n;
  }
  /**
  * Formats the footnotes, with the page numbers worked out for their document written into their fields, when the
  * document's body is written with an estimate of its pages.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return vt(t, e), t;
  }
}, Wu = class {
  constructor() {
    d(this, "footnotess", void 0), d(this, "relationships", void 0), this.footnotess = new Bu(), this.relationships = new X();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Hu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, $u = class extends un {
  constructor(e, t) {
    super("w:hdr", t), d(this, "refId", void 0), this.refId = e, t || this.root.push(new Hu({
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
    return vt(t, e, this.refId), t;
  }
}, Uu = class {
  constructor(e, t, r) {
    d(this, "media", void 0), d(this, "header", void 0), d(this, "relationships", void 0), this.media = e, this.header = new $u(t, r), this.relationships = new X();
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
    d(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
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
}, xe = {
  /** Bullet points. */
  BULLET: "bullet"
}, Xu = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w:tentative"
    });
  }
}, ju = class extends g {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Q({ val: e }));
  }
}, Vu = class extends g {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Q({ val: e }));
  }
}, zu = (e) => {
  switch (e) {
    case _.CENTER:
      return "center";
    case _.END:
    case _.RIGHT:
      return "right";
    default:
      return "left";
  }
}, Ku = class extends g {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Q({ val: zu(e) }));
  }
}, qu = class extends g {
  constructor(e) {
    super("w:suff"), this.root.push(new Q({ val: e }));
  }
}, Yu = class extends g {
  constructor() {
    super("w:isLgl");
  }
}, Ju = class extends g {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: s = _.START, start: n = 1, style: o, suffix: i, isLegalNumberingStyle: a }) {
    if (super("w:lvl"), d(this, "paragraphProperties", void 0), d(this, "runProperties", void 0), this.root.push(new it("w:start", W(n))), t && this.root.push(new ju(t)), o?.style && this.root.push(ot(o.style)), a && this.root.push(new Yu()), i && this.root.push(new qu(i)), r && this.root.push(new Vu(r)), this.root.push(new Ku(s)), this.paragraphProperties = new Ke(o && o.paragraph, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }), this.runProperties = new Oe(o?.run && b(b({}, o.run), {}, {
      highlight: void 0,
      math: void 0,
      revision: void 0
    })), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Xu({
      ilvl: W(e),
      tentative: 1
    }));
  }
}, Zu = class extends Ju {
}, Qu = class extends g {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Q({ val: e }));
  }
}, ed = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, hr = class extends g {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(e, t) {
    super("w:abstractNum"), d(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    ), this.root.push(new ed({
      abstractNumId: W(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Qu("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new Zu(r));
  }
}, td = class extends g {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Q({ val: e }));
  }
}, rd = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { numId: "w:numId" });
  }
}, Ls = class extends g {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(e) {
    if (super("w:num"), d(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    ), d(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    ), d(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    ), d(
      this,
      /** For a list a paragraph restarts, the id of that restart, as {@link IConcreteNumberingOptions.restartedListId} describes. */
      "restartedListId",
      void 0
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.restartedListId = e.restartedListId, this.root.push(new rd({ numId: W(e.numId) })), this.root.push(new td(W(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new nd(t.num, t.start));
  }
}, sd = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, nd = class extends g {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new sd({ ilvl: e })), t !== void 0 && this.root.push(new ad(t));
  }
}, od = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, ad = class extends g {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new od({ val: e }));
  }
}, id = class extends g {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), d(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), d(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), d(this, "referenceConfigMap", /* @__PURE__ */ new Map()), d(this, "abstractNumUniqueNumericId", di()), d(this, "concreteNumUniqueNumericId", pi()), this.root.push(new jt([
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
    const t = new hr(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: xe.BULLET,
        text: "●",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: le(0.5),
          hanging: le(0.25)
        } } }
      },
      {
        level: 1,
        format: xe.BULLET,
        text: "○",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: le(1),
          hanging: le(0.25)
        } } }
      },
      {
        level: 2,
        format: xe.BULLET,
        text: "■",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: le(0.25)
        } } }
      },
      {
        level: 3,
        format: xe.BULLET,
        text: "●",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: le(0.25)
        } } }
      },
      {
        level: 4,
        format: xe.BULLET,
        text: "○",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: le(0.25)
        } } }
      },
      {
        level: 5,
        format: xe.BULLET,
        text: "■",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: le(0.25)
        } } }
      },
      {
        level: 6,
        format: xe.BULLET,
        text: "●",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: le(0.25)
        } } }
      },
      {
        level: 7,
        format: xe.BULLET,
        text: "●",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: le(0.25)
        } } }
      },
      {
        level: 8,
        format: xe.BULLET,
        text: "●",
        alignment: _.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: le(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new Ls({
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
      this.abstractNumberingMap.set(r.reference, new hr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
  createConcreteNumberingInstance(e, t, r, s) {
    var n;
    r && !this.abstractNumberingMap.has(r.reference) && (this.abstractNumberingMap.set(r.reference, new hr(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels));
    const o = this.abstractNumberingMap.get(e);
    if (!o) return;
    const i = Dt(e, t, s);
    if (this.concreteNumberingMap.has(i)) return;
    const a = (n = this.referenceConfigMap.get(e)) !== null && n !== void 0 ? n : [{ level: 0 }], l = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: o.id,
      reference: e,
      instance: t,
      restartedListId: s,
      overrideLevels: a.map(({ level: u, start: h = 1 }) => ({
        num: u,
        start: W(h)
      }))
    };
    this.concreteNumberingMap.set(i, new Ls(l));
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
}, ld = class {
  /**
  * @param contentTypes - Where each part's content type is added
  * @param existingPaths - The paths under word/ of the parts the package already has, such as a template's charts,
  * which new parts don't take
  */
  constructor(e, t = /* @__PURE__ */ new Set()) {
    d(this, "contentTypes", void 0), d(this, "existingPaths", void 0), d(this, "paths", /* @__PURE__ */ new Map()), d(this, "folders", /* @__PURE__ */ new WeakMap()), this.contentTypes = e, this.existingPaths = t;
  }
  /**
  * Adds a part, and its content type, once.
  *
  * @returns The part's path under word/, such as "charts/chart1.xml"
  */
  add(e) {
    const t = this.paths.get(e);
    if (t !== void 0) return t;
    const { folder: r, name: s, extension: n, contentType: o } = e.options, i = /* @__PURE__ */ new Set([...this.existingPaths, ...this.paths.values()]);
    let a = 1;
    for (; i.has(`${r}/${s}${a}.${n}`); ) a++;
    const l = `${r}/${s}${a}.${n}`;
    return this.paths.set(e, l), this.contentTypes.addOverride(o, `/word/${l}`), l;
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
    const t = new X();
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
}, cd = (e) => new w({
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
}), hd = class extends g {
  constructor(e) {
    super("w:compat"), e.useSingleBorderforContiguousCells && this.root.push(new k("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new k("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new k("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new k("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new k("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new k("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new k("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new k("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new k("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new k("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new k("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new k("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new k("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new k("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new k("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new k("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new k("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new k("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new k("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new k("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new k("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new k("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new k("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new k("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new k("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new k("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new k("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new k("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new k("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new k("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new k("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new k("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new k("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new k("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new k("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new k("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new k("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new k("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new k("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new k("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new k("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new k("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new k("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new k("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new k("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new k("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new k("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new k("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new k("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new k("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new k("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new k("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new k("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new k("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new k("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new k("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new k("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new k("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new k("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new k("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new k("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new k("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new k("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new k("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new k("w:cachedColBalance", e.cachedColumnBalance)), e.version && this.root.push(cd(e.version));
  }
}, Fs = 1e5, Ds = 15, ud = [
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
], dd = [
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
], Ms = (e) => e >> 14 & 1 | e << 1 & 32767, pd = (e) => {
  const t = e.slice(0, Ds).split("").map((n) => {
    const o = n.charCodeAt(0);
    return (o & 255) !== 0 ? o & 255 : o >> 8 & 255;
  }), r = t.reduce((n, o, i) => dd[Ds - t.length + i].reduce((a, l, u) => o >> u & 1 ? a ^ l : a, n), ud[t.length - 1]), s = (Ms(t.reduceRight((n, o) => Ms(n) ^ o, 0)) ^ t.length ^ 52811) & 65535;
  return [
    s & 255,
    s >> 8,
    r & 255,
    r >> 8
  ].map((n) => n.toString(16).toUpperCase().padStart(2, "0")).join("");
}, md = (e, t, r) => {
  const s = [...pd(e)].flatMap((a) => [a.charCodeAt(0), 0]);
  let n = fs(Uint8Array.from([...t, ...s]));
  const o = new Uint8Array(n.length + 4), i = new DataView(o.buffer);
  for (let a = 0; a < r; a++)
    o.set(n), i.setUint32(n.length, a, !0), n = fs(o);
  return Array.from(n);
}, fd = (e) => {
  var t;
  const r = new Uint8Array(e);
  return typeof ((t = globalThis.crypto) === null || t === void 0 ? void 0 : t.getRandomValues) == "function" ? (globalThis.crypto.getRandomValues(r), [...r]) : [...r].map(() => Math.floor(Math.random() * 256));
}, _s = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, Bs = (e) => btoa(String.fromCharCode(...e)), vd = class extends g {
  constructor({ type: e, password: t }) {
    if (super("w:documentProtection"), t === void 0 || t === "") {
      this.root.push(new _s({
        edit: e,
        enforcement: !0
      }));
      return;
    }
    const r = fd(16);
    this.root.push(new _s({
      edit: e,
      enforcement: !0,
      cryptProviderType: "rsaAES",
      cryptAlgorithmClass: "hash",
      cryptAlgorithmType: "typeAny",
      cryptAlgorithmSid: 12,
      cryptSpinCount: Fs,
      hash: Bs(md(t, r, Fs)),
      salt: Bs(r)
    }));
  }
}, wd = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
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
}, gd = class extends g {
  constructor(e) {
    var t, r, s, n, o, i, a, l, u;
    super("w:settings"), this.root.push(new wd({
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
    })), this.root.push(new k("w:displayBackgroundShape", !0)), e.embedFonts !== void 0 && this.root.push(new k("w:embedTrueTypeFonts", e.embedFonts)), e.trackRevisions !== void 0 && this.root.push(new k("w:trackRevisions", e.trackRevisions)), e.protection !== void 0 && this.root.push(new vd(e.protection)), this.root.push(new it("w:defaultTabStop", (t = e.defaultTabStop) !== null && t !== void 0 ? t : 720)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.autoHyphenation) !== void 0 && this.root.push(new k("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((s = e.hyphenation) === null || s === void 0 ? void 0 : s.consecutiveHyphenLimit) !== void 0 && this.root.push(new it("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((n = e.hyphenation) === null || n === void 0 ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new it("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((o = e.hyphenation) === null || o === void 0 ? void 0 : o.doNotHyphenateCaps) !== void 0 && this.root.push(new k("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), e.evenAndOddHeaders !== void 0 && this.root.push(new k("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new k("w:updateFields", e.updateFields)), this.root.push(new hd(b(b({}, (i = e.compatibility) !== null && i !== void 0 ? i : {}), {}, { version: (a = (l = (u = e.compatibility) === null || u === void 0 ? void 0 : u.version) !== null && l !== void 0 ? l : e.compatibilityModeVersion) !== null && a !== void 0 ? a : 15 })));
  }
}, Fo = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { val: "w:val" });
  }
}, yd = class extends g {
  constructor(e) {
    super("w:name"), this.root.push(new Fo({ val: e }));
  }
}, xd = class extends g {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new Fo({ val: W(e) }));
  }
}, bd = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, es = class extends g {
  constructor(e, t) {
    super("w:style"), this.root.push(new bd(e)), t.name && this.root.push(new yd(t.name)), t.basedOn && t.basedOn !== e.styleId && this.root.push(new ve("w:basedOn", t.basedOn)), t.next && this.root.push(new ve("w:next", t.next)), t.link && this.root.push(new ve("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new xd(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new k("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new k("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new k("w:qFormat", t.quickFormat));
  }
}, Se = class extends es {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), d(this, "paragraphProperties", void 0), d(this, "runProperties", void 0), this.paragraphProperties = new Ke(e.paragraph, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }), this.runProperties = new Oe(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, We = class extends es {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, b({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), d(this, "runProperties", void 0), this.runProperties = new Oe(e.run), this.root.push(this.runProperties);
  }
}, Le = class extends Se {
  constructor(e) {
    super(b({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, Td = class extends Le {
  constructor(e) {
    super(b({
      id: "Title",
      name: "Title"
    }, e));
  }
}, kd = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, Ed = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, Sd = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, Cd = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, Id = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, Ad = class extends Le {
  constructor(e) {
    super(b({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, Pd = class extends Le {
  constructor(e) {
    super(b({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, Rd = class extends Se {
  constructor(e) {
    super(b({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, Nd = class extends Se {
  constructor(e) {
    super(b({
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
}, Od = class extends Se {
  constructor(e) {
    super(b({
      id: "Bibliography",
      name: "Bibliography",
      basedOn: "Normal",
      next: "Normal",
      uiPriority: 37,
      unhideWhenUsed: !0
    }, e));
  }
}, Do = /* @__PURE__ */ new WeakSet(), Ws = (e) => Do.has(e), be = class extends Se {
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
      paragraph: b({ spacing: { after: 100 } }, e > 1 ? { indent: { left: (e - 1) * t } } : {})
    });
  }
  prepForXml(e) {
    const t = super.prepForXml(e);
    return Do.add(t), t;
  }
}, Ld = class extends Se {
  constructor(e) {
    super(b({
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
        lineRule: ze.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Fd = class extends We {
  constructor(e) {
    super(b({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Dd = class extends We {
  constructor(e) {
    super(b({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Md = class extends Se {
  constructor(e) {
    super(b({
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
        lineRule: ze.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, _d = class extends We {
  constructor(e) {
    super(b({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Bd = class extends We {
  constructor(e) {
    super(b({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Wd = class extends We {
  constructor(e) {
    super(b({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: Nn.SINGLE }
      }
    }, e));
  }
}, Hd = class extends We {
  constructor(e) {
    super(b({
      id: "LineNumber",
      name: "line number",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0
    }, e));
  }
}, $d = class extends es {
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
    }), this.root.push(new Qr({
      indent: {
        size: 0,
        type: Y.DXA
      },
      cellMargin: {
        top: 0,
        left: 108,
        bottom: 0,
        right: 108
      }
    }));
  }
}, ct = (e) => typeof e == "object" ? Object.keys(e)[0] : void 0, ts = (e) => {
  var t;
  return (t = [e["w:style"]].flat().find((r) => r._attr)) === null || t === void 0 ? void 0 : t._attr;
}, Hs = (e) => {
  var t;
  return (t = ts(e)) === null || t === void 0 ? void 0 : t["w:styleId"];
}, $s = (e) => {
  var t;
  const r = (t = [e["w:style"]].flat().find((s) => ct(s) === "w:name")) === null || t === void 0 || (t = t["w:name"]) === null || t === void 0 || (t = t._attr) === null || t === void 0 ? void 0 : t["w:val"];
  return r === void 0 ? void 0 : String(r).toLowerCase();
}, Rr = (e) => {
  var t, r;
  return ct(e) === "w:style" && ((t = (r = ts(e)) === null || r === void 0 ? void 0 : r["w:type"]) !== null && t !== void 0 ? t : "paragraph") === "paragraph";
}, Ud = (e) => {
  const t = Rr(e) ? ts(e) : void 0;
  return t?.["w:default"] !== void 0 && ![
    "0",
    "false",
    "off"
  ].includes(String(t["w:default"]));
}, Gd = (e) => ({ "w:style": [e["w:style"]].flat().map((t) => t._attr ? { _attr: b(b({}, t._attr), {}, { "w:default": "1" }) } : t) }), ur = class extends g {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Se(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new We(t));
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
    const s = (u) => r.filter((h) => ct(h) === u), n = r.map((u) => ct(u) === "w:style" ? Hs(u) : void 0), o = r.filter((u, h) => ![
      "_attr",
      "w:docDefaults",
      "w:latentStyles"
    ].includes(ct(u)) && (n[h] === void 0 || n.lastIndexOf(n[h]) === h)), i = new Set(o.filter((u) => Rr(u) && !Ws(u)).map($s)), a = o.filter((u) => !Ws(u) || !i.has($s(u))), l = a.some(Ud) ? a : a.map((u) => Rr(u) && Hs(u) === "Normal" ? Gd(u) : u);
    return { "w:styles": [
      ...s("_attr"),
      ...s("w:docDefaults").slice(-1),
      ...s("w:latentStyles").slice(-1),
      ...l
    ] };
  }
}, Xd = class extends g {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new Ke(e, {
      implicitListParagraphStyle: !1,
      inListOrder: !1
    }));
  }
}, jd = class extends g {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new Oe(e));
  }
}, Vd = class extends g {
  constructor(e) {
    super("w:docDefaults"), d(this, "runPropertiesDefaults", void 0), d(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new jd(e.run), this.paragraphPropertiesDefaults = new Xd(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
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
    const t = ln(e);
    let r;
    for (const n of t.elements || []) n.name === "w:styles" && (r = n);
    if (r === void 0) throw new Error("can not find styles element");
    const s = r.elements || [];
    return {
      initialStyles: new ba(r.attributes),
      importedStyles: s.map((n) => Br(n))
    };
  }
}, Kd = (e) => {
  var t;
  const r = (t = e.document) === null || t === void 0 || (t = t.run) === null || t === void 0 ? void 0 : t.size;
  return r === void 0 ? 200 : Math.round(typeof r == "number" ? r * 10 : Ae(r));
}, qd = (e) => ({
  tableOfContents1: new be(1, e),
  tableOfContents2: new be(2, e),
  tableOfContents3: new be(3, e),
  tableOfContents4: new be(4, e),
  tableOfContents5: new be(5, e),
  tableOfContents6: new be(6, e),
  tableOfContents7: new be(7, e),
  tableOfContents8: new be(8, e),
  tableOfContents9: new be(9, e)
}), Mo = (e = {}) => {
  var t;
  return b(b({
    normal: new Se({
      id: "Normal",
      name: "Normal",
      quickFormat: !0
    }),
    normalTable: new $d(),
    document: new Vd((t = e.document) !== null && t !== void 0 ? t : {}),
    title: new Td(b({ run: { size: 56 } }, e.title)),
    heading1: new kd(b({ run: {
      color: "2E74B5",
      size: 32
    } }, e.heading1)),
    heading2: new Ed(b({ run: {
      color: "2E74B5",
      size: 26
    } }, e.heading2)),
    heading3: new Sd(b({ run: {
      color: "1F4D78",
      size: 24
    } }, e.heading3)),
    heading4: new Cd(b({ run: {
      color: "2E74B5",
      italics: !0
    } }, e.heading4)),
    heading5: new Id(b({ run: { color: "2E74B5" } }, e.heading5)),
    heading6: new Ad(b({ run: { color: "1F4D78" } }, e.heading6)),
    strong: new Pd(b({ run: { bold: !0 } }, e.strong)),
    listParagraph: new Rd(e.listParagraph || {}),
    caption: new Nd(e.caption || {}),
    bibliography: new Od(e.bibliography || {})
  }, qd(Kd(e))), {}, {
    hyperlink: new Wd(e.hyperlink || {}),
    footnoteReference: new Fd(e.footnoteReference || {}),
    footnoteText: new Ld(e.footnoteText || {}),
    footnoteTextChar: new Dd(e.footnoteTextChar || {}),
    endnoteReference: new _d(e.endnoteReference || {}),
    endnoteText: new Md(e.endnoteText || {}),
    endnoteTextChar: new Bd(e.endnoteTextChar || {}),
    lineNumber: new Hd(e.lineNumber || {})
  });
}, Us = class {
  newInstance(e = {}) {
    return {
      initialStyles: new jt([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: Object.values(Mo(e))
    };
  }
}, _o = {
  headings: {
    latin: "Calibri Light",
    panose: "020F0302020204030204"
  },
  body: {
    latin: "Calibri",
    panose: "020F0502020204030204"
  }
}, Yd = [
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
], dr = (e, t, r) => new w({
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
}), Jd = (e, t) => {
  const r = t[e], s = typeof r == "string" ? r : r?.latin;
  return s ?? _o[e].latin;
}, Zd = (e, t = {}) => {
  const r = Yd.map(([n, o, i = o]) => {
    var a;
    return [n, (a = t[n]) !== null && a !== void 0 ? a : e === "headings" ? o : i];
  }), s = new Set(r.map(([n]) => n));
  return [...r, ...Object.entries(t).filter(([n]) => !s.has(n))];
}, Gs = (e, t) => {
  const r = t[e], { eastAsia: s = "", complexScript: n = "", scripts: o } = typeof r == "object" ? r : {}, i = Jd(e, t), a = _o[e];
  return new w({
    name: e === "headings" ? "a:majorFont" : "a:minorFont",
    children: [
      dr("a:latin", i, i === a.latin ? a.panose : void 0),
      dr("a:ea", s),
      dr("a:cs", n),
      ...Zd(e, o).map(([l, u]) => new w({
        name: "a:font",
        attributes: {
          script: {
            key: "script",
            value: l
          },
          typeface: {
            key: "typeface",
            value: u
          }
        }
      }))
    ]
  });
}, Qd = (e, t = {}) => new w({
  name: "a:fontScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: [Gs("headings", t), Gs("body", t)]
}), Bo = (e = []) => new w({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: "phClr"
  } },
  children: e.map(([t, r]) => new w({
    name: `a:${t}`,
    attributes: { value: {
      key: "val",
      value: r
    } }
  }))
}), Nt = (e) => new w({
  name: "a:solidFill",
  children: [Bo(e)]
}), pr = (e) => new w({
  name: "a:gradFill",
  attributes: { rotateWithShape: {
    key: "rotWithShape",
    value: !0
  } },
  children: [new w({
    name: "a:gsLst",
    children: e.map((t, r) => new w({
      name: "a:gs",
      attributes: { position: {
        key: "pos",
        value: r * 5e4
      } },
      children: [Bo(t)]
    }))
  }), new w({
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
}), mr = (e) => new w({
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
    Nt(),
    new w({
      name: "a:prstDash",
      attributes: { value: {
        key: "val",
        value: "solid"
      } }
    }),
    new w({
      name: "a:miter",
      attributes: { limit: {
        key: "lim",
        value: 8e5
      } }
    })
  ]
}), fr = (e) => new w({
  name: "a:effectStyle",
  children: [new w({
    name: "a:effectLst",
    children: e
  })]
}), ep = () => new w({
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
  children: [new w({
    name: "a:srgbClr",
    attributes: { value: {
      key: "val",
      value: "000000"
    } },
    children: [new w({
      name: "a:alpha",
      attributes: { value: {
        key: "val",
        value: 63e3
      } }
    })]
  })]
}), tp = () => new w({
  name: "a:fmtScheme",
  attributes: { name: {
    key: "name",
    value: "Office"
  } },
  children: [
    new w({
      name: "a:fillStyleLst",
      children: [
        Nt(),
        pr([
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
        pr([
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
    new w({
      name: "a:lnStyleLst",
      children: [
        mr(6350),
        mr(12700),
        mr(19050)
      ]
    }),
    new w({
      name: "a:effectStyleLst",
      children: [
        fr([]),
        fr([]),
        fr([ep()])
      ]
    }),
    new w({
      name: "a:bgFillStyleLst",
      children: [
        Nt(),
        Nt([["tint", 95e3], ["satMod", 17e4]]),
        pr([
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
}), rp = class extends g {
  constructor({ name: e = "Office Theme", colors: t, fonts: r } = {}) {
    super("a:theme"), d(this, "colors", void 0), this.colors = bn(t), this.root.push(new Mr({
      namespace: {
        key: "xmlns:a",
        value: "http://schemas.openxmlformats.org/drawingml/2006/main"
      },
      name: {
        key: "name",
        value: e
      }
    })), this.root.push(new w({
      name: "a:themeElements",
      children: [
        Ra(t ? e : "Office", t),
        Qd(r ? e : "Office", r),
        tp()
      ]
    })), this.root.push(new w({ name: "a:objectDefaults" })), this.root.push(new w({ name: "a:extraClrSchemeLst" }));
  }
  /**
  * The hex color of each of the theme's colors. The system's window text and window colors are black and white.
  */
  get Colors() {
    return this.colors;
  }
}, J = Uint8Array, ee = Uint16Array, rs = Int32Array, ss = new J([
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
  0,
  0,
  0,
  0
]), ns = new J([
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
  13,
  0,
  0
]), Xs = new J([
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
]), Wo = function(e, t) {
  for (var r = new ee(31), s = 0; s < 31; ++s) r[s] = t += 1 << e[s - 1];
  for (var n = new rs(r[30]), s = 1; s < 30; ++s) for (var o = r[s]; o < r[s + 1]; ++o) n[o] = o - r[s] << 5 | s;
  return {
    b: r,
    r: n
  };
}, Ho = Wo(ss, 2), sp = Ho.b, Nr = Ho.r;
sp[28] = 258, Nr[258] = 28;
var np = Wo(ns, 0), js = np.r, Or = new ee(32768);
for (var M = 0; M < 32768; ++M) {
  var Ie = (M & 43690) >> 1 | (M & 21845) << 1;
  Ie = (Ie & 52428) >> 2 | (Ie & 13107) << 2, Ie = (Ie & 61680) >> 4 | (Ie & 3855) << 4, Or[M] = ((Ie & 65280) >> 8 | (Ie & 255) << 8) >> 1;
}
var ht = (function(e, t, r) {
  for (var s = e.length, n = 0, o = new ee(t); n < s; ++n) e[n] && ++o[e[n] - 1];
  var i = new ee(t);
  for (n = 1; n < t; ++n) i[n] = i[n - 1] + o[n - 1] << 1;
  var a;
  if (r) {
    a = new ee(1 << t);
    var l = 15 - t;
    for (n = 0; n < s; ++n) if (e[n])
      for (var u = n << 4 | e[n], h = t - e[n], c = i[e[n] - 1]++ << h, p = c | (1 << h) - 1; c <= p; ++c) a[Or[c] >> l] = u;
  } else
    for (a = new ee(s), n = 0; n < s; ++n) e[n] && (a[n] = Or[i[e[n] - 1]++] >> 15 - e[n]);
  return a;
}), Be = new J(288);
for (var M = 0; M < 144; ++M) Be[M] = 8;
for (var M = 144; M < 256; ++M) Be[M] = 9;
for (var M = 256; M < 280; ++M) Be[M] = 7;
for (var M = 280; M < 288; ++M) Be[M] = 8;
var Bt = new J(32);
for (var M = 0; M < 32; ++M) Bt[M] = 5;
var op = /* @__PURE__ */ ht(Be, 9, 0), ap = /* @__PURE__ */ ht(Bt, 5, 0), $o = function(e) {
  return (e + 7) / 8 | 0;
}, Uo = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new J(e.subarray(t, r));
}, ip = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
], Vt = function(e, t, r) {
  var s = new Error(t || ip[e]);
  if (s.code = e, Error.captureStackTrace && Error.captureStackTrace(s, Vt), !r) throw s;
  return s;
}, Te = function(e, t, r) {
  r <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= r, e[s + 1] |= r >> 8;
}, tt = function(e, t, r) {
  r <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= r, e[s + 1] |= r >> 8, e[s + 2] |= r >> 16;
}, vr = function(e, t) {
  for (var r = [], s = 0; s < e.length; ++s) e[s] && r.push({
    s,
    f: e[s]
  });
  var n = r.length, o = r.slice();
  if (!n) return {
    t: Xo,
    l: 0
  };
  if (n == 1) {
    var i = new J(r[0].s + 1);
    return i[r[0].s] = 1, {
      t: i,
      l: 1
    };
  }
  r.sort(function(O, T) {
    return O.f - T.f;
  }), r.push({
    s: -1,
    f: 25001
  });
  var a = r[0], l = r[1], u = 0, h = 1, c = 2;
  for (r[0] = {
    s: -1,
    f: a.f + l.f,
    l: a,
    r: l
  }; h != n - 1; )
    a = r[r[u].f < r[c].f ? u++ : c++], l = r[u != h && r[u].f < r[c].f ? u++ : c++], r[h++] = {
      s: -1,
      f: a.f + l.f,
      l: a,
      r: l
    };
  for (var p = o[0].s, s = 1; s < n; ++s) o[s].s > p && (p = o[s].s);
  var m = new ee(p + 1), f = Lr(r[h - 1], m, 0);
  if (f > t) {
    var s = 0, v = 0, E = f - t, I = 1 << E;
    for (o.sort(function(T, y) {
      return m[y.s] - m[T.s] || T.f - y.f;
    }); s < n; ++s) {
      var P = o[s].s;
      if (m[P] > t)
        v += I - (1 << f - m[P]), m[P] = t;
      else break;
    }
    for (v >>= E; v > 0; ) {
      var C = o[s].s;
      m[C] < t ? v -= 1 << t - m[C]++ - 1 : ++s;
    }
    for (; s >= 0 && v; --s) {
      var A = o[s].s;
      m[A] == t && (--m[A], ++v);
    }
    f = t;
  }
  return {
    t: new J(m),
    l: f
  };
}, Lr = function(e, t, r) {
  return e.s == -1 ? Math.max(Lr(e.l, t, r + 1), Lr(e.r, t, r + 1)) : t[e.s] = r;
}, Vs = function(e) {
  for (var t = e.length; t && !e[--t]; ) ;
  for (var r = new ee(++t), s = 0, n = e[0], o = 1, i = function(l) {
    r[s++] = l;
  }, a = 1; a <= t; ++a) if (e[a] == n && a != t) ++o;
  else {
    if (!n && o > 2) {
      for (; o > 138; o -= 138) i(32754);
      o > 2 && (i(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0);
    } else if (o > 3) {
      for (i(n), --o; o > 6; o -= 6) i(8304);
      o > 2 && (i(o - 3 << 5 | 8208), o = 0);
    }
    for (; o--; ) i(n);
    o = 1, n = e[a];
  }
  return {
    c: r.subarray(0, s),
    n: t
  };
}, rt = function(e, t) {
  for (var r = 0, s = 0; s < t.length; ++s) r += e[s] * t[s];
  return r;
}, Go = function(e, t, r) {
  var s = r.length, n = $o(t + 2);
  e[n] = s & 255, e[n + 1] = s >> 8, e[n + 2] = e[n] ^ 255, e[n + 3] = e[n + 1] ^ 255;
  for (var o = 0; o < s; ++o) e[n + o + 4] = r[o];
  return (n + 4 + s) * 8;
}, zs = function(e, t, r, s, n, o, i, a, l, u, h) {
  Te(t, h++, r), ++n[256];
  for (var c = vr(n, 15), p = c.t, m = c.l, f = vr(o, 15), v = f.t, E = f.l, I = Vs(p), P = I.c, C = I.n, A = Vs(v), O = A.c, T = A.n, y = new ee(19), x = 0; x < P.length; ++x) ++y[P[x] & 31];
  for (var x = 0; x < O.length; ++x) ++y[O[x] & 31];
  for (var S = vr(y, 7), R = S.t, F = S.l, L = 19; L > 4 && !R[Xs[L - 1]]; --L) ;
  var U = u + 5 << 3, V = rt(n, Be) + rt(o, Bt) + i, Z = rt(n, p) + rt(o, v) + i + 14 + 3 * L + rt(y, R) + 2 * y[16] + 3 * y[17] + 7 * y[18];
  if (l >= 0 && U <= V && U <= Z) return Go(t, h, e.subarray(l, l + u));
  var re, z, ie, Ce;
  if (Te(t, h, 1 + (Z < V)), h += 2, Z < V) {
    re = ht(p, m, 0), z = p, ie = ht(v, E, 0), Ce = v;
    var zt = ht(R, F, 0);
    Te(t, h, C - 257), Te(t, h + 5, T - 1), Te(t, h + 10, L - 4), h += 14;
    for (var x = 0; x < L; ++x) Te(t, h + 3 * x, R[Xs[x]]);
    h += 3 * L;
    for (var ue = [P, O], Ye = 0; Ye < 2; ++Ye)
      for (var He = ue[Ye], x = 0; x < He.length; ++x) {
        var de = He[x] & 31;
        Te(t, h, zt[de]), h += R[de], de > 15 && (Te(t, h, He[x] >> 5 & 127), h += He[x] >> 12);
      }
  } else re = op, z = Be, ie = ap, Ce = Bt;
  for (var x = 0; x < a; ++x) {
    var q = s[x];
    if (q > 255) {
      var de = q >> 18 & 31;
      tt(t, h, re[de + 257]), h += z[de + 257], de > 7 && (Te(t, h, q >> 23 & 31), h += ss[de]);
      var $e = q & 31;
      tt(t, h, ie[$e]), h += Ce[$e], $e > 3 && (tt(t, h, q >> 5 & 8191), h += ns[$e]);
    } else tt(t, h, re[q]), h += z[q];
  }
  return tt(t, h, re[256]), h + z[256];
}, lp = /* @__PURE__ */ new rs([
  65540,
  131080,
  131088,
  131104,
  262176,
  1048704,
  1048832,
  2114560,
  2117632
]), Xo = /* @__PURE__ */ new J(0), cp = function(e, t, r, s, n, o) {
  var i = o.z || e.length, a = new J(s + i + 5 * (1 + Math.ceil(i / 7e3)) + n), l = a.subarray(s, a.length - n), u = o.l, h = (o.r || 0) & 7;
  if (t) {
    h && (l[0] = o.r >> 3);
    for (var c = lp[t - 1], p = c >> 13, m = c & 8191, f = (1 << r) - 1, v = o.p || new ee(32768), E = o.h || new ee(f + 1), I = Math.ceil(r / 3), P = 2 * I, C = function(Yt) {
      return (e[Yt] ^ e[Yt + 1] << I ^ e[Yt + 2] << P) & f;
    }, A = new rs(25e3), O = new ee(288), T = new ee(32), y = 0, x = 0, S = o.i || 0, R = 0, F = o.w || 0, L = 0; S + 2 < i; ++S) {
      var U = C(S), V = S & 32767, Z = E[U];
      if (v[V] = Z, E[U] = V, F <= S) {
        var re = i - S;
        if ((y > 7e3 || R > 24576) && (re > 423 || !u)) {
          h = zs(e, l, 0, A, O, T, x, R, L, S - L, h), R = y = x = 0, L = S;
          for (var z = 0; z < 286; ++z) O[z] = 0;
          for (var z = 0; z < 30; ++z) T[z] = 0;
        }
        var ie = 2, Ce = 0, zt = m, ue = V - Z & 32767;
        if (re > 2 && U == C(S - ue))
          for (var Ye = Math.min(p, re) - 1, He = Math.min(32767, S), de = Math.min(258, re); ue <= He && --zt && V != Z; ) {
            if (e[S + ie] == e[S + ie - ue]) {
              for (var q = 0; q < de && e[S + q] == e[S + q - ue]; ++q) ;
              if (q > ie) {
                if (ie = q, Ce = ue, q > Ye) break;
                for (var $e = Math.min(ue, q - 2), as = 0, z = 0; z < $e; ++z) {
                  var Kt = S - ue + z & 32767, is = Kt - v[Kt] & 32767;
                  is > as && (as = is, Z = Kt);
                }
              }
            }
            V = Z, Z = v[V], ue += V - Z & 32767;
          }
        if (Ce) {
          A[R++] = 268435456 | Nr[ie] << 18 | js[Ce];
          var ls = Nr[ie] & 31, cs = js[Ce] & 31;
          x += ss[ls] + ns[cs], ++O[257 + ls], ++T[cs], F = S + ie, ++y;
        } else
          A[R++] = e[S], ++O[e[S]];
      }
    }
    for (S = Math.max(S, F); S < i; ++S)
      A[R++] = e[S], ++O[e[S]];
    h = zs(e, l, u, A, O, T, x, R, L, S - L, h), u || (o.r = h & 7 | l[h / 8 | 0] << 3, h -= 7, o.h = E, o.p = v, o.i = S, o.w = F);
  } else {
    for (var S = o.w || 0; S < i + u; S += 65535) {
      var qt = S + 65535;
      qt >= i && (l[h / 8 | 0] = u, qt = i), h = Go(l, h + 1, e.subarray(S, qt));
    }
    o.i = i;
  }
  return Uo(a, 0, s + $o(h) + n);
}, hp = /* @__PURE__ */ (function() {
  for (var e = /* @__PURE__ */ new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, s = 9; --s; ) r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
})(), up = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, s = 0; s < t.length; ++s) r = hp[r & 255 ^ t[s]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, dp = function(e, t, r, s, n) {
  if (!n && (n = { l: 1 }, t.dictionary)) {
    var o = t.dictionary.subarray(-32768), i = new J(o.length + e.length);
    i.set(o), i.set(e, o.length), e = i, n.w = o.length;
  }
  return cp(e, t.level == null ? 6 : t.level, t.mem == null ? n.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, s, n);
}, jo = function(e, t) {
  var r = {};
  for (var s in e) r[s] = e[s];
  for (var s in t) r[s] = t[s];
  return r;
}, K = function(e, t, r) {
  for (; r; ++t) e[t] = r, r >>>= 8;
};
function pp(e, t) {
  return dp(e, t || {}, 0, 0);
}
var Vo = function(e, t, r, s) {
  for (var n in e) {
    var o = e[n], i = t + n, a = s;
    Array.isArray(o) && (a = jo(s, o[1]), o = o[0]), ArrayBuffer.isView(o) ? r[i] = [o, a] : (r[i += "/"] = [new J(0), a], Vo(o, i, r, s));
  }
}, Ks = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), mp = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
try {
  mp.decode(Xo, { stream: !0 });
} catch {
}
function qs(e, t) {
  var r;
  if (Ks) return Ks.encode(e);
  for (var s = e.length, n = new J(e.length + (e.length >> 1)), o = 0, i = function(u) {
    n[o++] = u;
  }, r = 0; r < s; ++r) {
    if (o + 5 > n.length) {
      var a = new J(o + 8 + (s - r << 1));
      a.set(n), n = a;
    }
    var l = e.charCodeAt(r);
    l < 128 || t ? i(l) : l < 2048 ? (i(192 | l >> 6), i(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | e.charCodeAt(++r) & 1023, i(240 | l >> 18), i(128 | l >> 12 & 63), i(128 | l >> 6 & 63), i(128 | l & 63)) : (i(224 | l >> 12), i(128 | l >> 6 & 63), i(128 | l & 63));
  }
  return Uo(n, 0, o);
}
var Fr = function(e) {
  var t = 0;
  if (e) for (var r in e) {
    var s = e[r].length;
    s > 65535 && Vt(9), t += s + 4;
  }
  return t;
}, Ys = function(e, t, r, s, n, o, i, a) {
  var l = s.length, u = r.extra, h = a && a.length, c = Fr(u);
  K(e, t, i != null ? 33639248 : 67324752), t += 4, i != null && (e[t++] = 20, e[t++] = r.os), e[t] = 20, t += 2, e[t++] = r.flag << 1 | (o < 0 && 8), e[t++] = n && 8, e[t++] = r.compression & 255, e[t++] = r.compression >> 8;
  var p = new Date(r.mtime == null ? Date.now() : r.mtime), m = p.getFullYear() - 1980;
  if ((m < 0 || m > 119) && Vt(10), K(e, t, m << 25 | p.getMonth() + 1 << 21 | p.getDate() << 16 | p.getHours() << 11 | p.getMinutes() << 5 | p.getSeconds() >> 1), t += 4, o != -1 && (K(e, t, r.crc), K(e, t + 4, o < 0 ? -o - 2 : o), K(e, t + 8, r.size)), K(e, t + 12, l), K(e, t + 14, c), t += 16, i != null && (K(e, t, h), K(e, t + 6, r.attrs), K(e, t + 10, i), t += 14), e.set(s, t), t += l, c) for (var f in u) {
    var v = u[f], E = v.length;
    K(e, t, +f), K(e, t + 2, E), e.set(v, t + 4), t += 4 + E;
  }
  return h && (e.set(a, t), t += h), t;
}, fp = function(e, t, r, s, n) {
  K(e, t, 101010256), K(e, t + 8, r), K(e, t + 10, r), K(e, t + 12, s), K(e, t + 16, n);
};
function vp(e, t) {
  t || (t = {});
  var r = {}, s = [];
  Vo(e, "", r, t);
  var n = 0, o = 0;
  for (var i in r) {
    var a = r[i], l = a[0], u = a[1], h = u.level == 0 ? 0 : 8, c = qs(i), p = c.length, m = u.comment, f = m && qs(m), v = f && f.length, E = Fr(u.extra);
    p > 65535 && Vt(11);
    var I = h ? pp(l, u) : l, P = I.length, C = up();
    C.p(l), s.push(jo(u, {
      size: l.length,
      crc: C.d(),
      c: I,
      f: c,
      m: f,
      u: p != i.length || f && m.length != v,
      o: n,
      compression: h
    })), n += 30 + p + E + P, o += 76 + 2 * (p + E) + (v || 0) + P;
  }
  for (var A = new J(o + 22), O = n, T = o - n, y = 0; y < s.length; ++y) {
    var c = s[y];
    Ys(A, c.o, c, c.f, c.u, c.c.length);
    var x = 30 + c.f.length + Fr(c.extra);
    A.set(c.c, c.o + x), Ys(A, n, c, c.f, c.u, c.c.length, c.o, c.m), n += 16 + x + (c.m ? c.m.length : 0);
  }
  return fp(A, n, s.length, T, O), A;
}
var wp = (e) => typeof e == "string" ? Pn(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e), Dr = (e) => vp(Object.fromEntries([...e].map(([t, r]) => [t, wp(r)]))), wr = (e) => {
  let t = "";
  for (let r = 0; r < e.length; r += 32768) t += String.fromCharCode(...e.subarray(r, r + 32768));
  return t;
}, Ot = (e) => /* @__PURE__ */ new Error(`${e} is not supported by this platform`), Js = {
  uint8array: (e) => e,
  arraybuffer: (e) => e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength),
  array: (e) => Array.from(e),
  string: wr,
  binarystring: wr,
  base64: (e) => btoa(wr(e)),
  blob: (e, t) => {
    if (typeof Blob > "u") throw Ot("blob");
    return new Blob([e], { type: t });
  },
  nodebuffer: (e) => {
    if (typeof Buffer > "u") throw Ot("nodebuffer");
    return Buffer.from(e.buffer, e.byteOffset, e.byteLength);
  },
  text: () => {
    throw Ot("text");
  }
}, Zs = (e, t, r) => {
  const s = Object.prototype.hasOwnProperty.call(Js, t.toLowerCase()) ? Js[t.toLowerCase()] : void 0;
  if (s === void 0) throw Ot(t);
  return s(e, r);
}, gp = [
  208,
  207,
  17,
  224,
  161,
  177,
  26,
  225
], yp = class {
  constructor(e) {
    var t, r, s, n, o, i, a, l, u, h, c, p, m, f;
    if (d(this, "currentRelationshipId", 1), d(this, "documentWrapper", void 0), d(this, "headers", []), d(this, "footers", []), d(this, "coreProperties", void 0), d(this, "numbering", void 0), d(this, "media", void 0), d(this, "fileRelationships", void 0), d(this, "footnotesWrapper", void 0), d(this, "endnotesWrapper", void 0), d(this, "settings", void 0), d(this, "contentTypes", void 0), d(this, "customProperties", void 0), d(this, "appProperties", void 0), d(this, "styles", void 0), d(this, "comments", void 0), d(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    ), d(
      this,
      /** Durable comment id mapping (word/commentsIds.xml). */
      "commentsIds",
      void 0
    ), d(this, "fontWrapper", void 0), d(this, "theme", void 0), d(this, "packageParts", void 0), d(this, "macros", void 0), d(this, "bibliography", void 0), e.macros !== void 0) {
      const { project: C, events: A = [] } = e.macros, O = C instanceof Uint8Array ? C : new Uint8Array(C);
      if (!gp.every((y, x) => O[x] === y)) throw new Error("macros.project isn't a VBA project. Use createMacros from docx/macros, or the word/vbaProject.bin in a .docm rather than the .docm itself");
      const T = new X();
      A.length > 0 && T.addRelationship(1, "http://schemas.microsoft.com/office/2006/relationships/wordVbaData", "vbaData.xml"), this.macros = {
        project: O,
        events: A.length > 0 ? xu(A) : void 0,
        relationships: T
      };
    }
    if (this.coreProperties = new uu(b(b({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (s = e.lastModifiedBy) !== null && s !== void 0 ? s : "Un-named"
    })), this.numbering = new id(e.numbering ? e.numbering : { config: [] }), this.comments = new Rc((n = e.comments) !== null && n !== void 0 ? n : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new Fc(this.comments.ThreadData)), this.comments.CommentIdsData && (this.commentsIds = new Bc(this.comments.CommentIdsData)), this.fileRelationships = new X(), this.customProperties = new wu((o = e.customProperties) !== null && o !== void 0 ? o : []), this.appProperties = new lu(), this.footnotesWrapper = new Wu(), this.endnotesWrapper = new Ru(), this.contentTypes = new hu({ macros: this.macros !== void 0 }), ((i = this.macros) === null || i === void 0 ? void 0 : i.events) !== void 0 && this.contentTypes.addOverride("application/vnd.ms-word.vbaData+xml", "/word/vbaData.xml"), e.bibliography !== void 0) {
      const C = new X();
      C.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps", "itemProps1.xml"), this.bibliography = {
        sources: e.bibliography.sources,
        properties: gu(`{${An().toUpperCase()}}`),
        relationships: C
      }, this.contentTypes.addOverride("application/vnd.openxmlformats-officedocument.customXmlProperties+xml", "/customXml/itemProps1.xml");
    }
    if (this.packageParts = new ld(this.contentTypes), this.documentWrapper = new ku({
      background: e.background,
      pageNumbers: e.pageNumbers
    }), this.settings = new gd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (a = e.features) === null || a === void 0 ? void 0 : a.trackRevisions,
      updateFields: (l = e.features) === null || l === void 0 ? void 0 : l.updateFields,
      embedFonts: !((u = e.fonts) === null || u === void 0) && u.length ? !0 : void 0,
      defaultTabStop: e.defaultTabStop,
      protection: e.protection,
      hyphenation: {
        autoHyphenation: (h = e.hyphenation) === null || h === void 0 ? void 0 : h.autoHyphenation,
        hyphenationZone: (c = e.hyphenation) === null || c === void 0 ? void 0 : c.hyphenationZone,
        consecutiveHyphenLimit: (p = e.hyphenation) === null || p === void 0 ? void 0 : p.consecutiveHyphenLimit,
        doNotHyphenateCaps: (m = e.hyphenation) === null || m === void 0 ? void 0 : m.doNotHyphenateCaps
      }
    }), this.media = new Gu(), e.externalStyles !== void 0) {
      var v, E, I, P;
      const C = (v = (E = e.styles) === null || E === void 0 ? void 0 : E.default) !== null && v !== void 0 ? v : {}, A = Object.entries(Mo(C)), O = ([y]) => C[y] !== void 0, T = new zd().newInstance(e.externalStyles);
      this.styles = new ur(b(b({}, T), {}, {
        paragraphStyles: (I = e.styles) === null || I === void 0 ? void 0 : I.paragraphStyles,
        characterStyles: (P = e.styles) === null || P === void 0 ? void 0 : P.characterStyles,
        importedStyles: [
          ...A.filter((y) => !O(y)).map(([, y]) => y),
          ...T.importedStyles,
          ...A.filter(O).map(([, y]) => y)
        ]
      }));
    } else if (e.styles) {
      const C = new Us().newInstance(e.styles.default);
      this.styles = new ur(b(b({}, C), e.styles));
    } else {
      const C = new Us();
      this.styles = new ur(C.newInstance());
    }
    this.addDefaultRelationships();
    for (const C of e.sections) this.addSection(C);
    if (e.footnotes) for (const C in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(C), e.footnotes[C].children);
    if (e.endnotes) for (const C in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(C), e.endnotes[C].children);
    this.fontWrapper = new vo((f = e.fonts) !== null && f !== void 0 ? f : []), this.theme = new rp(e.theme), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml"), this.macros !== void 0 && this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2006/relationships/vbaProject", "vbaProject.bin"), this.bibliography !== void 0 && this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml", "../customXml/item1.xml");
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: s }) {
    this.documentWrapper.View.Body.addSection(b(b({}, s), {}, {
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
    for (const n of r) this.documentWrapper.View.add(n);
  }
  createHeader(e) {
    const t = new Uu(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Lu(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = Ve.DEFAULT) {
    this.headers.push({
      header: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = Ve.DEFAULT) {
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
}, xp = class extends g {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new ve("w:alias", e));
  }
}, bp = (e) => new w({
  name: "w:docPartObj",
  children: [new ve("w:docPartGallery", e), new w({ name: "w:docPartUnique" })]
}), Tp = [
  "contentChildren",
  "cachedEntries",
  "beginDirty",
  "tabLeader"
], kp = class extends Yr {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: s = [], beginDirty: n, tabLeader: o = Xe.DOT } = t, i = _r(t, Tp);
    super("w:sdt"), d(
      this,
      /** What it is filled in with from the headings, when it isn't given its content */
      "fromHeadings",
      void 0
    );
    const a = new xp(e);
    a.addChildElement(bp("Table of Contents")), this.root.push(a);
    const l = new to(), u = [new ae({ children: [
      ro(n),
      new eo(i),
      Me()
    ] })], h = [new ae({ children: [_e()] })];
    if (s !== void 0 && s.length > 0) {
      const { stylesWithLevels: c } = i, p = s.map((f, v) => {
        var E, I;
        const P = this.buildCachedContentParagraphChild(f, i), C = (E = c == null || (I = c.find((O) => O.level === f.level)) === null || I === void 0 ? void 0 : I.styleName) !== null && E !== void 0 ? E : `TOC${f.level}`, A = v === 0 ? [...u, P] : v === s.length - 1 ? [P, ...h] : [P];
        return new B({
          style: C,
          tabStops: this.getTabStopsForLevel(f.level, o),
          children: A
        });
      });
      let m = p;
      s.length <= 1 && (m = [...p, new B({ children: h })]);
      for (const f of m) l.addChildElement(f);
    } else {
      const c = new B({ children: u });
      l.addChildElement(c);
      for (const m of r) l.addChildElement(m);
      const p = new B({ children: h });
      l.addChildElement(p), r.length === 0 && (this.fromHeadings = {
        properties: i,
        beginDirty: n,
        tabLeader: o
      });
    }
    this.root.push(l);
  }
  /**
  * Written empty, and filled in from the headings once the body it is in is written, unless it was given its content.
  * The page numbers are aligned to the right of the text in its section.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return rc(t, this.fromHeadings && b(b({}, this.fromHeadings), {}, { textWidth: this.textWidthIn(e) })), t;
  }
  /** The width of the text in the section it is in */
  textWidthIn(e) {
    var t, r;
    return (t = (r = e.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 || (r = r.View.Body.getSectionPropertiesFor(this)) === null || r === void 0 ? void 0 : r.AvailableTextWidth) !== null && t !== void 0 ? t : Pt;
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
    var r, s;
    return new ae({
      style: t?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new Ft({ text: e.title }),
        new wt(),
        new Ft({ text: (r = (s = e.page) === null || s === void 0 ? void 0 : s.toString()) !== null && r !== void 0 ? r : "" })
      ]
    });
  }
  buildCachedContentParagraphChild(e, t) {
    const r = this.buildCachedContentRun(e, t);
    return t?.hyperlink && e.href !== void 0 ? new Jr({
      anchor: e.href,
      children: [r]
    }) : r;
  }
}, zo = class {
  constructor(e = { children: [] }) {
    d(this, "options", void 0), this.options = e;
  }
}, Ko = class {
  constructor(e = { children: [] }) {
    d(this, "options", void 0), this.options = e;
  }
}, Ep = class extends N {
  constructor(...e) {
    super(...e), d(this, "xmlKeys", { id: "w:id" });
  }
}, Qs = class extends g {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new Ep({ id: e }));
  }
}, Sp = class extends ae {
  /**
  * Creates a new footnote reference run.
  *
  * @param footnote - The id of one of the document's `footnotes`, or the footnote's content, for a footnote of the
  * run's own. Word has footnotes only in a document's body, so a run with its footnote's content is left out of
  * headers, footers, comments and notes
  */
  constructor(e) {
    super({ style: "FootnoteReference" }), d(this, "footnote", void 0), typeof e == "number" ? this.root.push(new Qs(e)) : this.footnote = e;
  }
  /**
  * Formats the run, with its own footnote added to the document's footnotes, and referred to by the id it has there.
  */
  prepForXml(e) {
    var t;
    if (this.footnote === void 0) return super.prepForXml(e);
    const r = (t = e.file) === null || t === void 0 ? void 0 : t.FootNotes.View.idOf(this, this.footnote, e);
    if (r !== void 0) {
      this.root.push(new Qs(r));
      try {
        return super.prepForXml(e);
      } finally {
        this.root.pop();
      }
    }
  }
}, st = 0, gr = 32, Cp = 32, Ip = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== Cp) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const s = r.replace(/(..)/g, "$1 ").trim().split(" ").map((i) => parseInt(i, 16));
  s.reverse();
  const n = e.slice(st, gr).map((i, a) => i ^ s[a % s.length]), o = new Uint8Array(st + n.length + Math.max(0, e.length - gr));
  return o.set(e.slice(0, st)), o.set(n, st), o.set(e.slice(gr), st + n.length), o;
}, qo = class {
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
}, Yo = /\{([^{}]+)\}/g, Jo = (e, t) => t.size === 0 ? e : e.replace(Yo, (r, s) => {
  var n;
  return (n = t.get(s)) !== null && n !== void 0 ? n : r;
}), Ap = (e) => new Set(Array.from(e.matchAll(Yo), ([, t]) => t)), Pp = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(e, t, r) {
    return Jo(e, new Map(t.map((s, n) => [s.fileName, (r + n).toString()])));
  }
  /**
  * Extracts media data referenced in the XML content.
  *
  * @param xmlData - The XML string to search for media references
  * @param media - The media collection to search within
  * @returns Array of media data found in the XML
  */
  getMediaData(e, t) {
    const r = Ap(e);
    return t.Array.filter((s) => r.has(s.fileName));
  }
}, Rp = class {
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
    return Jo(e, new Map(t.map(({ reference: r, instance: s, restartedListId: n, numId: o }) => [Dt(r, s, n), o.toString()])));
  }
}, Np = new qo(), yr = (e, t, r, s, n = !0) => D(Np.format(t, {
  viewWrapper: {
    View: t,
    Relationships: s
  },
  file: e,
  stack: []
}), {
  indent: r,
  declaration: n ? {
    standalone: "yes",
    encoding: "UTF-8"
  } : { encoding: "UTF-8" }
}), Op = (e, t, r, s) => {
  const { content: n } = t.options;
  if (n instanceof Uint8Array) return [{
    data: n,
    path: `word/${r}`
  }];
  if ("files" in n) return [{
    data: Dr(n.files.map(({ path: u, content: h }) => [u, h instanceof Uint8Array ? h : yr(e, h, s, new X())])),
    path: `word/${r}`
  }];
  const o = e.PackageParts.createRelationships(r), i = yr(e, n, s, o), a = r.slice(0, r.lastIndexOf("/")), l = r.slice(r.lastIndexOf("/") + 1);
  return [{
    data: i,
    path: `word/${r}`
  }, ...o.RelationshipCount > 0 ? [{
    data: yr(e, o, s, o, !1),
    path: `word/${a}/_rels/${l}.rels`
  }] : []];
}, Zo = (e, t, r = 0) => {
  const s = e.PackageParts.Array.slice(r);
  return s.length === 0 ? [] : [...s.flatMap(({ part: n, path: o }) => Op(e, n, o, t)), ...Zo(e, t, r + s.length)];
}, Lp = ["PackageParts"], Fp = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    d(this, "formatter", void 0), d(this, "imageReplacer", void 0), d(this, "numberingReplacer", void 0), this.formatter = new qo(), this.imageReplacer = new Pp(), this.numberingReplacer = new Rp();
  }
  /**
  * Compiles a File object into the files of the complete OOXML package, which the Packer zips.
  *
  * This method orchestrates the entire compilation process:
  * - Converts all document components to XML
  * - Manages image and numbering placeholder replacements
  * - Creates relationship files
  * - Packages fonts and media files
  *
  * @param file - The document to compile
  * @param prettifyXml - Optional XML formatting style
  * @param overrides - Optional custom XML file overrides
  * @returns The package's files by their paths, in the order they are zipped
  */
  compile(e, t, r = []) {
    const s = this.xmlifyFile(e, t), { PackageParts: n } = s, o = _r(s, Lp), i = Object.values(o).flatMap((a) => Array.isArray(a) ? a : [a]);
    return new Map([
      ...i.map(({ path: a, data: l }) => [a, l]),
      ...n.map(({ path: a, data: l }) => [a, l]),
      ...r.map(({ path: a, data: l }) => [a, l]),
      ...e.Macros === void 0 ? [] : [["word/vbaProject.bin", e.Macros.project]],
      ...e.Media.Array.flatMap((a) => a.type !== "svg" ? [[`word/media/${a.fileName}`, a.data]] : [[`word/media/${a.fileName}`, a.data], [`word/media/${a.fallback.fileName}`, a.fallback.data]]),
      ...e.FontTable.files.map(({ data: a, fontKey: l }, u) => [`word/fonts/font${u + 1}.odttf`, Ip(a, l)])
    ]);
  }
  xmlifyFile(e, t) {
    var r;
    const s = D(this.formatter.format(e.Document.View, {
      viewWrapper: e.Document,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), n = D(this.formatter.format(e.Comments, {
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
    }), o = D(this.formatter.format(e.FootNotes.View, {
      viewWrapper: e.FootNotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), i = D(this.formatter.format(e.Endnotes.View, {
      viewWrapper: e.Endnotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: { encoding: "UTF-8" }
    }), a = e.Document.Relationships.RelationshipCount + 1, l = e.Comments.Relationships.RelationshipCount + 1, u = e.FootNotes.Relationships.RelationshipCount + 1, h = e.Endnotes.Relationships.RelationshipCount + 1, c = this.imageReplacer.getMediaData(s, e.Media), p = this.imageReplacer.getMediaData(n, e.Media), m = this.imageReplacer.getMediaData(o, e.Media), f = this.imageReplacer.getMediaData(i, e.Media);
    return b(b(b(b(b(b({
      Relationships: {
        data: (() => {
          const v = X.copy(e.Document.Relationships);
          return c.forEach((E, I) => {
            v.addRelationship(a + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
          }), v.addRelationship(v.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), D(this.formatter.format(v, {
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
          const v = this.imageReplacer.replace(s, c, a);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const v = D(this.formatter.format(e.Styles, {
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
        data: D(this.formatter.format(e.CoreProperties, {
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
        data: D(this.formatter.format(e.FileRelationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: e.Headers.map((v, E) => {
        const I = D(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), P = this.imageReplacer.getMediaData(I, e.Media), C = X.copy(v.Relationships);
        return P.forEach((A, O) => {
          C.addRelationship(O, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${A.fileName}`);
        }), {
          data: D(this.formatter.format(C, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${E + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((v, E) => {
        const I = D(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), P = this.imageReplacer.getMediaData(I, e.Media), C = X.copy(v.Relationships);
        return P.forEach((A, O) => {
          C.addRelationship(O, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${A.fileName}`);
        }), {
          data: D(this.formatter.format(C, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${E + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((v, E) => {
        const I = D(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), P = this.imageReplacer.getMediaData(I, e.Media), C = this.imageReplacer.replace(I, P, 0);
        return {
          data: this.numberingReplacer.replace(C, e.Numbering.ConcreteNumbering),
          path: `word/header${E + 1}.xml`
        };
      }),
      Footers: e.Footers.map((v, E) => {
        const I = D(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), P = this.imageReplacer.getMediaData(I, e.Media), C = this.imageReplacer.replace(I, P, 0);
        return {
          data: this.numberingReplacer.replace(C, e.Numbering.ConcreteNumbering),
          path: `word/footer${E + 1}.xml`
        };
      }),
      CustomProperties: {
        data: D(this.formatter.format(e.CustomProperties, {
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
        data: D(this.formatter.format(e.AppProperties, {
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
          const v = this.imageReplacer.replace(o, m, u);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (() => {
          const v = X.copy(e.FootNotes.Relationships);
          return m.forEach((E, I) => {
            v.addRelationship(u + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
          }), D(this.formatter.format(v, {
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
          const v = this.imageReplacer.replace(i, f, h);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (() => {
          const v = X.copy(e.Endnotes.Relationships);
          return f.forEach((E, I) => {
            v.addRelationship(h + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
          }), D(this.formatter.format(v, {
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
        data: D(this.formatter.format(e.Settings, {
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
          const v = this.imageReplacer.replace(n, p, l);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (() => {
          const v = X.copy(e.Comments.Relationships);
          return p.forEach((E, I) => {
            v.addRelationship(l + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${E.fileName}`);
          }), D(this.formatter.format(v, {
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
      data: D(this.formatter.format(e.CommentsExtended, {
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
      data: D(this.formatter.format(e.CommentsIds, {
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
        data: D(this.formatter.format(e.FontTable.View, {
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
        data: D(this.formatter.format(e.FontTable.Relationships, {
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
        data: D(this.formatter.format(e.Theme, {
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
        data: D(this.formatter.format(e.Macros.events, {
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
        data: D(this.formatter.format(e.Macros.relationships, {
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
        data: D(this.formatter.format(e.Bibliography.sources, {
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
        data: D(this.formatter.format(e.Bibliography.properties, {
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
        data: D(this.formatter.format(e.Bibliography.relationships, {
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
      PackageParts: Zo(e, t),
      Numbering: {
        data: D(this.formatter.format(e.Numbering, {
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
        data: D(this.formatter.format(e.ContentTypes, {
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
}, en = (/* @__PURE__ */ ia(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, s = r && typeof r.apply == "function" ? r.apply : function(y, x, S) {
    return Function.prototype.apply.call(y, x, S);
  }, n;
  r && typeof r.ownKeys == "function" ? n = r.ownKeys : Object.getOwnPropertySymbols ? n = function(y) {
    return Object.getOwnPropertyNames(y).concat(Object.getOwnPropertySymbols(y));
  } : n = function(y) {
    return Object.getOwnPropertyNames(y);
  };
  function o(T) {
    console && console.warn && console.warn(T);
  }
  var i = Number.isNaN || function(y) {
    return y !== y;
  };
  function a() {
    a.init.call(this);
  }
  t.exports = a, t.exports.once = C, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var l = 10;
  function u(T) {
    if (typeof T != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof T);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return l;
    },
    set: function(T) {
      if (typeof T != "number" || T < 0 || i(T)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + T + ".");
      l = T;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(y) {
    if (typeof y != "number" || y < 0 || i(y)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + y + ".");
    return this._maxListeners = y, this;
  };
  function h(T) {
    return T._maxListeners === void 0 ? a.defaultMaxListeners : T._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return h(this);
  }, a.prototype.emit = function(y) {
    for (var x = [], S = 1; S < arguments.length; S++) x.push(arguments[S]);
    var R = y === "error", F = this._events;
    if (F !== void 0) R = R && F.error === void 0;
    else if (!R) return !1;
    if (R) {
      var L;
      if (x.length > 0 && (L = x[0]), L instanceof Error) throw L;
      var U = /* @__PURE__ */ new Error("Unhandled error." + (L ? " (" + L.message + ")" : ""));
      throw U.context = L, U;
    }
    var V = F[y];
    if (V === void 0) return !1;
    if (typeof V == "function") s(V, this, x);
    else
      for (var Z = V.length, re = E(V, Z), S = 0; S < Z; ++S) s(re[S], this, x);
    return !0;
  };
  function c(T, y, x, S) {
    var R, F, L;
    if (u(x), F = T._events, F === void 0 ? (F = T._events = /* @__PURE__ */ Object.create(null), T._eventsCount = 0) : (F.newListener !== void 0 && (T.emit("newListener", y, x.listener ? x.listener : x), F = T._events), L = F[y]), L === void 0)
      L = F[y] = x, ++T._eventsCount;
    else if (typeof L == "function" ? L = F[y] = S ? [x, L] : [L, x] : S ? L.unshift(x) : L.push(x), R = h(T), R > 0 && L.length > R && !L.warned) {
      L.warned = !0;
      var U = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + L.length + " " + String(y) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      U.name = "MaxListenersExceededWarning", U.emitter = T, U.type = y, U.count = L.length, o(U);
    }
    return T;
  }
  a.prototype.addListener = function(y, x) {
    return c(this, y, x, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(y, x) {
    return c(this, y, x, !0);
  };
  function p() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function m(T, y, x) {
    var S = {
      fired: !1,
      wrapFn: void 0,
      target: T,
      type: y,
      listener: x
    }, R = p.bind(S);
    return R.listener = x, S.wrapFn = R, R;
  }
  a.prototype.once = function(y, x) {
    return u(x), this.on(y, m(this, y, x)), this;
  }, a.prototype.prependOnceListener = function(y, x) {
    return u(x), this.prependListener(y, m(this, y, x)), this;
  }, a.prototype.removeListener = function(y, x) {
    var S, R, F, L, U;
    if (u(x), R = this._events, R === void 0) return this;
    if (S = R[y], S === void 0) return this;
    if (S === x || S.listener === x)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete R[y], R.removeListener && this.emit("removeListener", y, S.listener || x));
    else if (typeof S != "function") {
      for (F = -1, L = S.length - 1; L >= 0; L--) if (S[L] === x || S[L].listener === x) {
        U = S[L].listener, F = L;
        break;
      }
      if (F < 0) return this;
      F === 0 ? S.shift() : I(S, F), S.length === 1 && (R[y] = S[0]), R.removeListener !== void 0 && this.emit("removeListener", y, U || x);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(y) {
    var x, S = this._events, R;
    if (S === void 0) return this;
    if (S.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : S[y] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete S[y]), this;
    if (arguments.length === 0) {
      var F = Object.keys(S), L;
      for (R = 0; R < F.length; ++R)
        L = F[R], L !== "removeListener" && this.removeAllListeners(L);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (x = S[y], typeof x == "function") this.removeListener(y, x);
    else if (x !== void 0) for (R = x.length - 1; R >= 0; R--) this.removeListener(y, x[R]);
    return this;
  };
  function f(T, y, x) {
    var S = T._events;
    if (S === void 0) return [];
    var R = S[y];
    return R === void 0 ? [] : typeof R == "function" ? x ? [R.listener || R] : [R] : x ? P(R) : E(R, R.length);
  }
  a.prototype.listeners = function(y) {
    return f(this, y, !0);
  }, a.prototype.rawListeners = function(y) {
    return f(this, y, !1);
  }, a.listenerCount = function(T, y) {
    return typeof T.listenerCount == "function" ? T.listenerCount(y) : v.call(T, y);
  }, a.prototype.listenerCount = v;
  function v(T) {
    var y = this._events;
    if (y !== void 0) {
      var x = y[T];
      if (typeof x == "function") return 1;
      if (x !== void 0) return x.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? n(this._events) : [];
  };
  function E(T, y) {
    for (var x = new Array(y), S = 0; S < y; ++S) x[S] = T[S];
    return x;
  }
  function I(T, y) {
    for (; y + 1 < T.length; y++) T[y] = T[y + 1];
    T.pop();
  }
  function P(T) {
    for (var y = new Array(T.length), x = 0; x < y.length; ++x) y[x] = T[x].listener || T[x];
    return y;
  }
  function C(T, y) {
    return new Promise(function(x, S) {
      function R(L) {
        T.removeListener(y, F), S(L);
      }
      function F() {
        typeof T.removeListener == "function" && T.removeListener("error", R), x([].slice.call(arguments));
      }
      O(T, y, F, { once: !0 }), y !== "error" && A(T, R, { once: !0 });
    });
  }
  function A(T, y, x) {
    typeof T.on == "function" && O(T, "error", y, x);
  }
  function O(T, y, x, S) {
    if (typeof T.on == "function")
      S.once ? T.once(y, x) : T.on(y, x);
    else if (typeof T.addEventListener == "function") T.addEventListener(y, function R(F) {
      S.once && T.removeEventListener(y, R), x(F);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof T);
  }
})))();
var Dp = class extends en.EventEmitter {
  pipe(e, t) {
    const r = this, s = e, n = (c) => {
      s.writable && s.write(c) === !1 && r.pause && r.pause();
    };
    r.on("data", n);
    const o = () => {
      r.readable && r.resume && r.resume();
    };
    s.on("drain", o), !s._isStdio && (!t || t.end !== !1) && (r.on("end", a), r.on("close", l));
    let i = !1;
    function a() {
      i || (i = !0, s.end());
    }
    function l() {
      i || (i = !0, typeof s.destroy == "function" && s.destroy());
    }
    function u(c) {
      if (h(), en.EventEmitter.listenerCount(this, "error") === 0) throw c;
    }
    r.on("error", u), s.on("error", u);
    function h() {
      r.removeListener("data", n), s.removeListener("drain", o), r.removeListener("end", a), r.removeListener("close", l), r.removeListener("error", u), s.removeListener("error", u), r.removeListener("end", h), r.removeListener("close", h), s.removeListener("close", h);
    }
    return r.on("end", h), r.on("close", h), s.on("close", h), s.emit("pipe", r), s;
  }
};
function tn(e, t, r, s, n, o, i) {
  try {
    var a = e[o](i), l = a.value;
  } catch (u) {
    r(u);
    return;
  }
  a.done ? t(l) : Promise.resolve(l).then(s, n);
}
function Mp(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(s, n) {
      var o = e.apply(t, r);
      function i(l) {
        tn(o, s, n, i, a, "next", l);
      }
      function a(l) {
        tn(o, s, n, i, a, "throw", l);
      }
      i(void 0);
    });
  };
}
var _p = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, rn = (e) => e === !0 ? _p.WITH_2_BLANKS : e === !1 ? void 0 : e, sn = (e) => e.Macros === void 0 ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/vnd.ms-word.document.macroEnabled.12", Qo = class je {
  /**
  * Exports a document to the specified output format.
  *
  * @param file - The document to export
  * @param type - The output format type (e.g., "nodebuffer", "blob", "string")
  * @param prettify - Whether to prettify the XML output (boolean or PrettifyType)
  * @param overrides - Optional array of file overrides for custom XML content
  * @returns A promise resolving to the exported document in the specified format
  */
  static pack(t, r, s) {
    var n = this;
    return Mp(function* (o, i, a, l = []) {
      return Zs(Dr(n.compiler.compile(o, rn(a), l)), i, sn(o));
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
  static toString(t, r, s = []) {
    return je.pack(t, "string", r, s);
  }
  /**
  * Exports a document to a Node.js Buffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Buffer
  */
  static toBuffer(t, r, s = []) {
    return je.pack(t, "nodebuffer", r, s);
  }
  /**
  * Exports a document to a base64-encoded string.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a base64 string
  */
  static toBase64String(t, r, s = []) {
    return je.pack(t, "base64", r, s);
  }
  /**
  * Exports a document to a Blob (for browser environments).
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Blob
  */
  static toBlob(t, r, s = []) {
    return je.pack(t, "blob", r, s);
  }
  /**
  * Exports a document to an ArrayBuffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as an ArrayBuffer
  */
  static toArrayBuffer(t, r, s = []) {
    return je.pack(t, "arraybuffer", r, s);
  }
  /**
  * Exports a document to a Node.js Stream.
  *
  * The stream gives the document as one Node.js Buffer, then ends. Where there's no Buffer, as in a browser, it
  * emits an `error` event instead, so use `toBlob` there.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A readable stream containing the document data
  */
  static toStream(t, r, s = []) {
    const n = new Dp(), o = this.compiler.compile(t, rn(r), s);
    return new Promise((i) => setTimeout(i)).then(() => Zs(Dr(o), "nodebuffer", sn(t))).then((i) => {
      n.emit("data", i), n.emit("end");
    }, (i) => n.emit("error", i)), n;
  }
};
d(Qo, "compiler", new Fp());
const Et = {
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
function Bp(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const s = oa(e.color, t);
  s && (r.color = s);
  const n = aa(e.font, t);
  n && (r.font = n), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const o = {};
  return Object.keys(r).length && (o.run = r), e.paragraph && (o.paragraph = e.paragraph), o;
}
function Wp(e = Jt, t = {}) {
  const r = e?.typography || Jt.typography, s = e?.typographyKinds || Jt.typographyKinds, n = {}, o = [], i = [];
  for (const [c, p] of Object.entries(r)) {
    const m = Bp(p, e), f = Et[c];
    if (f === "document") {
      n.document = {
        ...m.run ? { run: m.run } : {},
        ...m.paragraph ? { paragraph: m.paragraph } : {}
      };
      continue;
    }
    if (f) {
      n[f] = m;
      continue;
    }
    (s[c] || "character") === "paragraph" ? o.push({
      id: c,
      name: c,
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0,
      ...m
    }) : i.push({
      id: c,
      name: c,
      basedOn: "Normal",
      quickFormat: !0,
      ...m.run ? { run: m.run } : {}
    });
  }
  const a = t.paragraphStyles || [], l = t.characterStyles || [];
  for (const c of [...a, ...l]) {
    const p = Et[c.id];
    if (!p) continue;
    const { id: m, name: f, basedOn: v, next: E, quickFormat: I, run: P, paragraph: C } = c;
    n[p] = {
      ...P ? { run: P } : {},
      ...C ? { paragraph: C } : {}
    };
  }
  const u = a.filter(
    (c) => !Et[c.id]
  ), h = l.filter(
    (c) => !Et[c.id]
  );
  return {
    default: n,
    paragraphStyles: nn(o, u),
    characterStyles: nn(i, h)
  };
}
function nn(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((o) => [o.id, o])), s = e.map(
    (o) => r.has(o.id) ? r.get(o.id) : o
  ), n = new Set(e.map((o) => o.id));
  for (const o of t)
    n.has(o.id) || s.push(o);
  return s;
}
async function Tm(e, t = {}) {
  const r = await Hp(e, t);
  return Qo.toBlob(r);
}
async function Hp(e, t = {}) {
  const {
    sections: r = [],
    header: s = null,
    footer: n = null,
    headerFirstPageOnly: o = !1,
    footerFirstPageOnly: i = !1
  } = e, {
    paragraphStyles: a,
    characterStyles: l,
    theme: u,
    typography: h,
    numbering: c,
    pageMargin: p,
    pageSize: m,
    pageOrientation: f,
    ...v
  } = t, E = { nextId: 1, footnotes: {} };
  Lt(r.flat(), E), s && Lt(s, E), n && Lt(n, E);
  const { loadAsset: I } = t, P = await xr(r.flat(), I), C = {
    pageNumbers: { start: 1, formatType: Va.DECIMAL },
    ...p ? { margin: p } : {}
  };
  m && (C.size = {
    width: m.width,
    height: m.height,
    ...f ? { orientation: f } : {}
  });
  const A = {
    properties: {
      type: Sh.CONTINUOUS,
      page: C
    },
    children: P
  };
  if (s) {
    const y = await xr(s, I), x = new zo({ children: y }), S = St(!0);
    o ? (A.headers = { first: x, default: S }, A.properties.titlePage = !0) : A.headers = { default: x };
  } else
    A.headers = { default: St(!0) };
  if (n) {
    const y = await xr(n, I), x = new Ko({ children: y }), S = St(!1);
    i ? (A.footers = { first: x, default: S }, A.properties.titlePage = !0) : A.footers = { default: x };
  } else
    A.footers = { default: St(!1) };
  A.properties.titlePage && (A.headers && !A.headers.first && (A.headers.first = A.headers.default), A.footers && !A.footers.first && (A.footers.first = A.footers.default));
  const O = {
    ...v,
    sections: [A]
  }, T = h ? { ...u || {}, typography: h } : u;
  if (T) {
    const y = Wp(T, {
      paragraphStyles: a,
      characterStyles: l
    }), x = {};
    y.default && Object.keys(y.default).length && (x.default = y.default), y.paragraphStyles.length && (x.paragraphStyles = y.paragraphStyles), y.characterStyles.length && (x.characterStyles = y.characterStyles), Object.keys(x).length && (O.styles = x);
  } else (a && a.length || l && l.length) && (O.styles = {}, a?.length && (O.styles.paragraphStyles = a), l?.length && (O.styles.characterStyles = l));
  return c && c.length && (O.numbering = { config: c }), Object.keys(E.footnotes).length && (O.footnotes = E.footnotes), new yp(O);
}
function Lt(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const s = t.nextId;
          t.nextId += 1, r.footnoteId = s;
          const n = [];
          for (const o of r.children || [])
            if (o.type === "paragraph")
              n.push(os(o));
            else {
              const i = gt(o);
              i.length && n.push(new B({ children: i }));
            }
          n.length || n.push(new B({})), t.footnotes[s] = { children: n };
        }
        r.children && Lt(r.children, t);
      }
  }
}
function St(e) {
  const t = e ? _.RIGHT : _.CENTER, r = e ? zo : Ko;
  return new r({
    children: [
      new B({
        alignment: t,
        children: [
          new $("Page "),
          new $({ children: [Pe.CURRENT] }),
          new $(" of "),
          new $({ children: [Pe.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function xr(e, t) {
  return (await Promise.all(
    e.map((s) => $p(s, t))
  )).flat();
}
async function $p(e, t) {
  switch (e.type) {
    case "table":
      return [await fm(e)];
    case "image":
      return [await gm(e, t)];
    case "tableOfContents":
      return [Up(e)];
    case "webOnly":
      return [];
    default:
      return [await mm(e)];
  }
}
function Up(e) {
  const t = e.toc || {}, r = t.title || "Contents", s = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new kp(r, s);
}
function os(e) {
  const t = {};
  if (e.heading && (t.heading = Yp(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = ta(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const s = ce(e.spacing.before), n = ce(e.spacing.after), o = ce(e.spacing.line);
    s != null && (t.spacing.before = s), n != null && (t.spacing.after = n), o != null && (t.spacing.line = o), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
  }
  if (e.bullet && (t.bullet = { level: ce(e.bullet.level) ?? 0 }), e.numbering) {
    t.numbering = {
      reference: e.numbering.reference,
      level: ce(e.numbering.level) ?? 0
    };
    const s = ce(e.numbering.instance);
    s != null && (t.numbering.instance = s);
  }
  if (e.indent) {
    const s = {};
    for (const n of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const o = e.indent[n];
      if (o == null) continue;
      const i = typeof o == "string" ? parseInt(o, 10) : o;
      Number.isFinite(i) && (s[n] = i);
    }
    Object.keys(s).length && (t.indent = s);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(im).filter(Boolean));
  const r = (e.children || []).flatMap(gt);
  return e.bookmark && r.length ? t.children = [new uo({ id: e.bookmark, children: r })] : r.length && (t.children = r), new B(t);
}
function gt(e) {
  switch (e.type) {
    case "text":
      return Gp(e);
    case "tab":
      return [new $({ children: [new wt()] })];
    case "externalHyperlink":
    // A plain <a href> from same-source JSX — same destination, same
    // emitter. See the href note in ir/parser.js.
    case "a":
      return [Xp(e)];
    case "internalHyperlink":
      return [jp(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new Sp(e.footnoteId)] : [];
    case "math":
      return [new $({ text: e.latex || "" })];
    default:
      return e.content ? [new $({ text: e.content })] : e.children ? e.children.flatMap(gt) : [];
  }
}
function Gp(e) {
  const t = [];
  e.positionalTab && t.push(
    new $({
      children: [
        new $c({
          alignment: cm(e.positionalTab.alignment),
          leader: um(e.positionalTab.leader),
          relativeTo: pm(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new $({ children: [Pe.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new $({ children: [Pe.TOTAL_PAGES] })), t;
  const s = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (s.bold = !0), (e.italics === "true" || e.italics === !0) && (s.italics = !0), e.underline && (s.underline = e.underline), e.style && (s.style = e.style), e.color && (s.color = e.color), e.size != null) {
    const n = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(n) && (s.size = n);
  }
  return e.font && (s.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (s.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (s.allCaps = !0), (e.strike === "true" || e.strike === !0) && (s.strike = !0), e.subScript === "true" || e.subScript === !0 ? s.subScript = !0 : (e.superScript === "true" || e.superScript === !0) && (s.superScript = !0), t.push(new $(s)), t;
}
function Xp(e) {
  const t = e.link || e.href || "", r = (e.children || []).flatMap(gt);
  return new qc({
    children: r.length ? r : [new $({ text: t })],
    link: t
  });
}
function jp(e) {
  const t = (e.children || []).flatMap(gt);
  return new Jr({
    children: t.length ? t : [new $({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function ea(e) {
  const r = { rows: (e.children || []).filter((s) => s.type === "tableRow").map(Vp) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? ir.AUTOFIT : ir.FIXED : r.columnWidths && (r.layout = ir.FIXED), e.tableWidth && (r.width = ra(e.tableWidth)), e.tableBorders && (r.borders = sa(e.tableBorders)), new au(r);
}
function Vp(e) {
  const r = { children: (e.children || []).filter((s) => s.type === "tableCell").map(zp) };
  return e.tableHeader && (r.tableHeader = !0), new Po(r);
}
function zp(e) {
  const t = {};
  if (e.width && (t.width = ra(e.width)), e.margins && (t.margins = Kp(e.margins)), e.borders && (t.borders = sa(e.borders)), e.shading && (t.shading = rm(e.shading)), e.verticalAlign && (t.verticalAlign = nm(e.verticalAlign)), e.columnSpan) {
    const s = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(s) && s > 1 && (t.columnSpan = s);
  }
  if (e.rowSpan) {
    const s = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(s) && s > 1 && (t.rowSpan = s);
  }
  const r = (e.children || []).flatMap((s) => s.type === "table" ? [ea(s)] : [os(s)]);
  return t.children = r.length ? r : [new B({})], new Ar(t);
}
function ce(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function Kp(e) {
  const t = {};
  for (const [r, s] of Object.entries(e)) {
    const n = ce(s);
    n != null && (t[r] = n);
  }
  return t;
}
const qp = {
  HEADING_1: Ue.HEADING_1,
  HEADING_2: Ue.HEADING_2,
  HEADING_3: Ue.HEADING_3,
  HEADING_4: Ue.HEADING_4,
  HEADING_5: Ue.HEADING_5,
  HEADING_6: Ue.HEADING_6
};
function Yp(e) {
  return qp[e];
}
const Jp = {
  left: _.LEFT,
  center: _.CENTER,
  right: _.RIGHT,
  justified: _.JUSTIFIED,
  both: _.JUSTIFIED
};
function ta(e) {
  return Jp[e] ?? _.LEFT;
}
const Zp = {
  percentage: Y.PERCENTAGE,
  pct: Y.PERCENTAGE,
  dxa: Y.DXA,
  auto: Y.AUTO,
  nil: Y.NIL
};
function Qp(e) {
  return Zp[e] ?? Y.DXA;
}
function ra(e) {
  return {
    size: ce(e.size) ?? 0,
    type: Qp(e.type)
  };
}
const em = {
  single: ne.SINGLE,
  double: ne.DOUBLE,
  dotted: ne.DOTTED,
  dashed: ne.DASHED,
  none: ne.NONE,
  nil: ne.NIL,
  thick: ne.THICK,
  triple: ne.TRIPLE
};
function sa(e) {
  const t = {};
  for (const [r, s] of Object.entries(e))
    t[r] = {
      style: em[s.style] ?? ne.SINGLE,
      size: ce(s.size) ?? 1,
      color: s.color || "000000"
    };
  return t;
}
const tm = {
  clear: ke.CLEAR,
  nil: ke.NIL,
  solid: ke.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: ke.DIAGONAL_CROSS,
  diagonalStripe: ke.DIAGONAL_STRIPE,
  horizontalStripe: ke.HORIZONTAL_STRIPE,
  verticalStripe: ke.VERTICAL_STRIPE
};
function rm(e) {
  const t = e.fill || "000000", r = tm[e.type] ?? ke.CLEAR, s = e.color || "auto";
  return { type: r, fill: t, color: s };
}
const sm = {
  top: at.TOP,
  center: at.CENTER,
  middle: at.CENTER,
  // alias — natural-language CSS-ish
  bottom: at.BOTTOM
};
function nm(e) {
  return sm[e] ?? at.TOP;
}
const om = {
  left: se.LEFT,
  right: se.RIGHT,
  center: se.CENTER,
  decimal: se.DECIMAL,
  bar: se.BAR,
  clear: se.CLEAR,
  end: se.END,
  num: se.NUM,
  start: se.START
}, am = {
  none: Xe.NONE,
  dot: Xe.DOT,
  hyphen: Xe.HYPHEN,
  underscore: Xe.UNDERSCORE,
  middleDot: Xe.MIDDLE_DOT
};
function im(e) {
  if (!e || typeof e != "object") return null;
  const t = om[e.type] ?? se.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const s = { type: t, position: r };
  if (e.leader) {
    const n = am[e.leader];
    n && (s.leader = n);
  }
  return s;
}
const lm = {
  left: It.LEFT,
  center: It.CENTER,
  right: It.RIGHT
};
function cm(e) {
  return lm[e] ?? It.LEFT;
}
const hm = {
  none: De.NONE,
  dot: De.DOT,
  hyphen: De.HYPHEN,
  underscore: De.UNDERSCORE,
  heavy: De.HEAVY,
  middleDot: De.MIDDLE_DOT
};
function um(e) {
  return hm[e] ?? De.NONE;
}
const dm = {
  indent: Cr.INDENT,
  margin: Cr.MARGIN
};
function pm(e) {
  return dm[e] ?? Cr.MARGIN;
}
async function mm(e) {
  return os(e);
}
async function fm(e) {
  return ea(e);
}
let vm = 1;
function wm(e, t) {
  const r = (e.split(/[?#]/)[0].match(/\.([a-zA-Z0-9]+)$/)?.[1] || "").toLowerCase();
  if (r === "png") return "png";
  if (r === "jpg" || r === "jpeg") return "jpg";
  if (r === "gif") return "gif";
  if (r === "bmp") return "bmp";
  const s = new Uint8Array(t instanceof ArrayBuffer ? t : t?.buffer ?? t);
  if (s.length >= 4) {
    if (s[0] === 137 && s[1] === 80 && s[2] === 78 && s[3] === 71) return "png";
    if (s[0] === 255 && s[1] === 216 && s[2] === 255) return "jpg";
    if (s[0] === 71 && s[1] === 73 && s[2] === 70) return "gif";
    if (s[0] === 66 && s[1] === 77) return "bmp";
  }
  return "png";
}
async function gm(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new B({});
    const s = await ym(r, t), n = ce(e.transformation?.width) ?? 400, o = ce(e.transformation?.height) ?? 300, i = {
      type: wm(r, s),
      data: s,
      transformation: { width: n, height: o },
      altText: {
        id: vm++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (i.floating = e.floating);
    const a = {
      children: [new Bl(i)]
    };
    return e.alignment && (a.alignment = ta(e.alignment)), new B(a);
  } catch (r) {
    return console.error("Error creating image element:", r), new B({});
  }
}
async function ym(e, t) {
  const { bytes: r } = await na(e, { loadAsset: t });
  return r;
}
export {
  Hp as buildDocument,
  Tm as compileDocx,
  St as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-Drv2nqOF.js.map
