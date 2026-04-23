// Named error classes used across unipress commands.
//
// Per the brief (Section 14), every error names what was attempted, what
// failed, and how to recover. The CLI's top-level handler converts these
// into `error: ...` lines (and stack traces under --verbose). The full
// matrix in Section 14 is intentionally introduced milestone by milestone;
// this file grows as more pipeline stages land.

class UnipressError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ContentDirectoryError extends UnipressError {}
export class DocumentYmlError extends UnipressError {}
export class ConfigValidationError extends UnipressError {}
export class FoundationResolutionError extends UnipressError {}
