# CLI reference

```text
unipress compile <dir> [options]
  --format <fmt>      Output format (pdf | typst | latex | docx | xlsx | pagedjs | epub).
                      Overrides the format: field in document.yml. A foundation declares
                      which of these it can write; `list-templates` shows each template's.
  --foundation <ref>  Override document.yml's foundation. Accepts:
                        - registry ref:  @<namespace>/<name>@<version>
                        - URL:           https://…/entry.js
                        - path:          ./foundation, /abs/path, …
  --out <path>        Output file (default: ./<dir-basename>.<ext>). A name that can only be
                      one format (.pdf, .epub, .docx, .xlsx, .html) builds that format when
                      nothing names one, and is refused when --format names another.
  --paper <size>      Print this build on a4 or letter, over what document.yml says.
  --variant <name>    Build an alternate top-level config <name>.yml inside <dir>
                      (e.g. --variant document-book → document-book.yml) instead of the
                      default document.yml. Lets one manuscript hold several cuts —
                      an A4 article and a trade book — side by side. The name is used
                      as given (a .yml extension is assumed if omitted).
  --config <path>     Explicit config file (default: <dir>/unipress.config.js).
  --typst-binary <p>  Path to a typst binary (skips the managed download).
  --keep-temp         On typst-compile failure, keep the temp dir for inspection.
  --yes               If no document.yml exists, generate one from the folder's
                      markdown without prompting (book foundation by default;
                      honors --foundation/--format/--paper).
  --verbose           Per-step progress to stderr + stack traces on errors.

unipress create <dir> [options]
  --template <id>     Template to scaffold (interactive picker if omitted).
                      Run `unipress list-templates` to see available ids.
  --title <str>       Document title (prompts if omitted).
  --author <str>      Document author (prompts if omitted).
  --paper <size>      a4 or letter. Without it, what your system's region uses; a
                      template with a book trim keeps its trim.
  --force             Overwrite non-empty <dir>.
  --yes               Take the defaults without asking. A run with no terminal does the
                      same, so an agent or a script can leave it out. Either way --template
                      is required, and the output says what was chosen.

unipress list-templates
  List the templates available, each with its description, outputs, the foundation it
  pins, and the source URL where that foundation lives.

unipress inspect <dir> [options]
  Dump the parsed content as JSON (debugging aid).
  --full              Include web-only fields (assets, icons, etc.).
  --summary           Replace pages[] with route strings only.
  --page <route>      Keep only the page matching <route>.
  --depth <n>         Truncate nested values beyond depth n.
  --foundation <ref>  Override document.yml's foundation.
  --no-orchestrate    Skip running the foundation; show only the parsed content.

unipress --help
unipress --version
```

Exit codes: `0` success, `1` user-addressable error, `2` internal error (re-run with `--verbose` for a stack trace).
