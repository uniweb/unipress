// Named error classes used across unipress commands.
//
// Per the brief (Section 14), every error names what was attempted, what
// failed, and how to recover. The CLI's top-level handler converts these
// into `error: ...` lines (and stack traces under --verbose).
//
// Error shape:
//   new <Class>(summary)
//   new <Class>(summary + '\nhint: ...\ncause: ...')
//
// Convention: a single summary line, optionally followed by lines prefixed
// with `hint:` or `cause:`. `format()` turns that into
//
//   error: <summary>
//       hint: <...>
//       cause: <...>
//
// Keeping the structured data as part of the string (rather than separate
// fields) lets call sites stay one-argument and still get consistent
// output.

// Known "structured" prefixes inside a multi-line message. When format()
// sees these at the start of a continuation line, it preserves them;
// everything else on continuation lines is indented as-is (for the
// `at file:line` form and arbitrary continuation context).
const STRUCTURED_PREFIXES = /^(hint|cause|at)\s*:/

export class UnipressError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }

  // Formatted multi-line rendering. The top-level CLI handler calls this
  // for every UnipressError so output stays consistent regardless of
  // which pipeline stage threw.
  format() {
    const [first, ...rest] = (this.message ?? '').split('\n')
    const out = [`error: ${first}`]
    for (const line of rest) {
      if (!line) continue
      // Normalize prefixed continuation lines (hint/cause/at) with a
      // 4-space indent, a 6-character prefix column, and the remainder.
      // Example: 'hint: rebuild the foundation' -> '    hint: rebuild the foundation'.
      // Non-prefixed lines get the same 4-space indent (they're
      // continuation context).
      out.push(STRUCTURED_PREFIXES.test(line) ? `    ${line}` : `    ${line}`)
    }
    return out.join('\n')
  }
}

// --- Pipeline stages (present in code today) ---------------------------

export class ContentDirectoryError extends UnipressError {}
export class DocumentYmlError extends UnipressError {}
export class ConfigValidationError extends UnipressError {}
export class FoundationResolutionError extends UnipressError {}
export class CompileError extends UnipressError {}
export class OutputWriteError extends UnipressError {}
export class TypstBinaryError extends UnipressError {}

// --- Pipeline stages (catalog-complete; call sites land with their milestone) ---

// M9-URL will use this for registry fetches.
export class FoundationFetchError extends UnipressError {}

// Reserved for markdown / frontmatter / collections-JSON parse failures.
// Today, js-yaml's YAMLException + ENOENT surface through DocumentYmlError
// (content-loader.js catches them); ContentParseError is the dedicated
// class when per-file parse errors start needing distinct exit codes or
// handling (e.g. "build succeeded with 1 page skipped — parse error in
// pages/foo.md").
export class ContentParseError extends UnipressError {}

// M9 (unipress create) uses this for missing / malformed template
// packages.
export class TemplateError extends UnipressError {}
