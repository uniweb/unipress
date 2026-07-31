const t = `/* Temml's own class hooks — without these an aligned environment neither
   aligns nor breathes. */
.tml-right { text-align: right; }
.tml-left { text-align: left; }
.tml-sml-pad { padding-left: 0.05em; }
/* Row spacing. The browser gives mtd no vertical padding, so state the
   MathML-Core default here; Temml's own CSS only adjusts it for jot. */
math mtd { padding-top: 0.5ex; padding-bottom: 0.5ex; }
math mtable.tml-jot mtd { padding-top: 0.7ex; padding-bottom: 0.7ex; }
/* AMS auto-numbering. Which equations number is the AUTHOR's choice, made in
   LaTeX: align and equation number, aligned and the starred forms do not.
   Without these two rules that choice was discarded -- align and align-star
   rendered identically, so an author who asked for numbers silently got none.
   (No backticks in here: this string is a JS template literal.) */
.tml-eqn::before {
  counter-increment: tmlEqnNo;
  content: "(" counter(tmlEqnNo) ")";
}
body {
  counter-reset: tmlEqnNo;
}
/* Display math needs CSS block layout, not MathML layout, for an equation TAG
   to reach the right margin: the tag rides in an mtable whose width:100%
   Chromium ignores under display: block math, collapsing the spacer cells so
   "(1)" sits glued to the equation instead of at the margin.

   !important is not decoration. Temml emits style=display:block math on
   every display formula unconditionally — no option turns it off — so an inline
   style beats any rule we write, including Temml's own math.tml-display { display: block }, which is exactly what this restores. Fixing it here
   rather than in the generator also repairs math that was already built.

   Scoped with :has() to formulas that actually carry a tag. Switching every
   display formula to CSS block layout would left-align the lot -- MathML layout
   is what centres them -- so an unnumbered derivation or matrix keeps
   display: block math and stays centred. Where :has() is unsupported the tag
   simply does not reach the margin; nothing else changes. */
math.tml-display:has(.tml-eqn) {
  display: block !important;
  width: 100%;
}`;
export {
  t as M
};
//# sourceMappingURL=math-css-BVI-Y5gH.js.map
