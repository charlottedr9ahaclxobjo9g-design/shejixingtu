# 设计星图 v3.1 部署脚本
# 将 deploy 目录推送到 GitHub Pages
# 运行方式: 右键此文件 -> 使用 PowerShell 运行

$ErrorActionPreference = "Stop"

$deployDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "=== 设计星图 v3.1 部署 ===" -ForegroundColor Cyan
Write-Host "Deploy from: $deployDir"

# 临时工作目录
$workDir = "$env:TEMP\shejixingtu-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host "Work dir: $workDir"

# 克隆仓库
Write-Host "Cloning repo..." -ForegroundColor Yellow
git clone --branch main --depth 1 https://github.com/charlottedr9ahaclxobjo9g-design/shejixingtu.git $workDir
if ($LASTEXITCODE -ne 0) {
    Write-Host "Clone failed! 请确认 GitHub 已登录。" -ForegroundColor Red
    pause
    exit 1
}

# 复制构建文件
Write-Host "Copying deploy files..." -ForegroundColor Yellow
robocopy $deployDir $workDir /E /NFL /NDL /NJH /NJS /R:0 /W:0

# 提交
Set-Location $workDir
git add -A
$changes = git status --short
if ($changes) {
    git commit -m "fix: 补全globals.css缺失样式类 + 添加.nojekyll (v3.1)"
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "=== 部署成功! ===" -ForegroundColor Green
        Write-Host "访问: https://shejixingtu.cn"
    }
} else {
    Write-Host "No changes detected." -ForegroundColor Yellow
}

# 清理
Set-Location $deployDir
Remove-Item -Recurse -Force $workDir -ErrorAction SilentlyContinue
pause
