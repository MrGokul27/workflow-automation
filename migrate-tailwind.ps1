# migrate-tailwind.ps1
# Removes cdn.tailwindcss.com <script> and inline tailwind.config <script id="tailwind-config">
# Inserts <link rel="stylesheet" href="...assets/css/tailwind.css"> at the correct relative depth.

$Root = (Resolve-Path ".").Path

$files = Get-ChildItem -Path $Root -Recurse -Filter "*.html" |
         Where-Object { $_.FullName -notlike "*\node_modules\*" }

$count = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)

    # Skip files that don't use the CDN
    if ($content -notmatch 'cdn\.tailwindcss\.com') {
        continue
    }

    # Compute relative path from file's folder to /assets/css/tailwind.css
    $fileDir  = $file.DirectoryName
    $cssAbs   = [System.IO.Path]::Combine($Root, "assets", "css", "tailwind.css")
    $relPath  = [System.IO.Path]::GetRelativePath($fileDir, $cssAbs) -replace '\\', '/'
    $linkTag  = "    <link rel=`"stylesheet`" href=`"$relPath`" />"

    # 1. Remove CDN script tag (single line or multi-line)
    $content = [regex]::Replace($content, '<script\s+src="https://cdn\.tailwindcss\.com[^"]*"[^>]*>\s*</script>', '', 'Singleline')

    # 2. Remove inline tailwind.config script block
    $content = [regex]::Replace($content, '<script\s+id="tailwind-config"[^>]*>.*?</script>', '', 'Singleline')

    # 3. Insert <link> before </head> if not already present
    if ($content -notmatch 'tailwind\.css') {
        $content = [regex]::Replace($content, '</head>', "$linkTag`n  </head>")
    }

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host ("Processed: " + $file.FullName.Replace($Root + "\", ""))
    $count++
}

Write-Host ""
Write-Host ("Done - " + $count + " file(s) updated.")
