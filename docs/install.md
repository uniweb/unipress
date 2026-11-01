# Install

Pick whichever fits your system. They all give you the same `unipress` command.

## Homebrew

For Apple Silicon Macs and x64 Linux. No Node, no manual download:

```bash
brew install uniweb/unipress/unipress
```

Updates land via `brew upgrade unipress`. If Homebrew stops with `untrusted tap`, run `brew trust uniweb/unipress` once, then re-run the command ([why](./troubleshooting.md#homebrew-error-refusing-to-load-formula--from-untrusted-tap-uniwebunipress)). The macOS binary is signed with the Proximify Inc. Developer ID and Apple-notarized — no Gatekeeper warnings.

## Windows

For x64 Windows, in PowerShell or Command Prompt. No Node, no administrator:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://unipress.app/install.ps1 | iex"
```

It downloads the signed binary from the latest release, checks it against the release's checksum, puts it in `%LOCALAPPDATA%\Programs\unipress` and adds that folder to your PATH. Then open a new terminal. Run it again to update. To remove unipress, delete that folder, and `%LOCALAPPDATA%\unipress` for what it downloads later; the PATH entry left behind does nothing. [The script](https://github.com/uniweb/unipress/blob/main/install.ps1) is short, if you'd like to read it first.

## Manual download

Without Homebrew or the Windows script. Grab the asset for your platform (Apple Silicon Mac, x64 Linux or x64 Windows) from [the releases page](https://github.com/uniweb/unipress/releases), make it executable (Unix), and put it somewhere on your `PATH`. On macOS and Linux, `/usr/local/bin/unipress` is a common location.

## npm

If you already have Node ≥ 22.12:

```bash
npm i -g @uniweb/unipress
```

## What it downloads later

The first PDF downloads and checks a [Typst binary](./configuration.md#typst-binary), and the first compile of a template fetches the foundation it pins. Both are cached. On Linux, unpacking Typst needs `xz`.
