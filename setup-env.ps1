$env:ANDROID_HOME = "C:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\Sdk"
$env:PATH += ";C:\Android\Sdk\platform-tools;C:\Android\Sdk\cmdline-tools\latest\bin;C:\Android\Sdk\tools\bin"

Write-Host "Android environment ready" -ForegroundColor Green
