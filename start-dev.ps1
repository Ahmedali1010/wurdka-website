npm install --no-audit --no-fund
if ($LASTEXITCODE -eq 0) {
    npm run dev
}
