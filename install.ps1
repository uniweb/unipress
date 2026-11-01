# Install unipress on Windows. In PowerShell or Command Prompt:
#
#   powershell -ExecutionPolicy ByPass -c "irm https://unipress.app/install.ps1 | iex"
#
# It downloads the signed binary from the latest release, checks it against the release's
# checksum, puts it in your own folder (no administrator needed) and adds that folder to your
# PATH. Run it again to update. Set UNIPRESS_VERSION=1.1.23 to install that version instead.
#
# To remove it, delete %LOCALAPPDATA%\Programs\unipress, and %LOCALAPPDATA%\unipress for what it
# downloads later. The PATH entry left behind does nothing.

& {
  $ErrorActionPreference = 'Stop'
  # Windows PowerShell's progress bar slows a large download many times over.
  $ProgressPreference = 'SilentlyContinue'
  [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

  if (-not [Environment]::Is64BitOperatingSystem) { throw 'unipress needs 64-bit Windows.' }

  $asset = 'unipress-windows-x64.exe'
  $base = 'https://github.com/uniweb/unipress/releases/latest/download'
  if ($env:UNIPRESS_VERSION) { $base = "https://github.com/uniweb/unipress/releases/download/v$env:UNIPRESS_VERSION" }

  $dir = Join-Path $env:LOCALAPPDATA 'Programs\unipress'
  $exe = Join-Path $dir 'unipress.exe'
  $download = "$exe.download"
  $checksum = "$exe.sha256"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  try {
    Write-Host "Downloading $base/$asset (about 120 MB)..."
    Invoke-WebRequest -UseBasicParsing -Uri "$base/$asset" -OutFile $download
    Invoke-WebRequest -UseBasicParsing -Uri "$base/$asset.sha256" -OutFile $checksum

    $expected = ((Get-Content -Raw $checksum).Trim() -split '\s+')[0]
    $actual = (Get-FileHash -Algorithm SHA256 -Path $download).Hash
    if ($actual -ne $expected) { throw 'The download does not match the release checksum, so it was not installed.' }

    Move-Item -Force $download $exe
  } finally {
    Remove-Item -Force -ErrorAction SilentlyContinue $download, $checksum
  }

  # From the registry and as written, so an entry like %USERPROFILE%\bin stays one.
  $key = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment', $true)
  $path = [string]$key.GetValue('Path', '', [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
  if (($path -split ';') -notcontains $dir) {
    $key.SetValue('Path', "$($path.TrimEnd(';'));$dir".TrimStart(';'), [Microsoft.Win32.RegistryValueKind]::ExpandString)
    # Setting any variable this way tells Windows the environment changed, so a new terminal sees it.
    [Environment]::SetEnvironmentVariable('UNIPRESS_INSTALLING', '1', 'User')
    [Environment]::SetEnvironmentVariable('UNIPRESS_INSTALLING', $null, 'User')
  }
  $key.Close()
  if (($env:Path -split ';') -notcontains $dir) { $env:Path = "$dir;$env:Path" }

  $version = & $exe --version
  Write-Host "unipress $version is installed. Open a new terminal, then try: unipress create my-book --template book"
}
