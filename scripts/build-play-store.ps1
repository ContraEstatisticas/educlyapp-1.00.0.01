# Script PowerShell para Build do App para Play Store
# Educly - Build Automation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Educly - Build para Play Store" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Bubblewrap está instalado
Write-Host "Verificando Bubblewrap..." -ForegroundColor Yellow
$bubblewrapInstalled = Get-Command bubblewrap -ErrorAction SilentlyContinue

if (-not $bubblewrapInstalled) {
    Write-Host "❌ Bubblewrap não encontrado!" -ForegroundColor Red
    Write-Host "Instalando Bubblewrap..." -ForegroundColor Yellow
    npm install -g @bubblewrap/cli
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar Bubblewrap" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Bubblewrap instalado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "✅ Bubblewrap já instalado" -ForegroundColor Green
}

Write-Host ""

# Verificar se Java está instalado (necessário para keytool)
Write-Host "Verificando Java..." -ForegroundColor Yellow
$javaInstalled = Get-Command java -ErrorAction SilentlyContinue

if (-not $javaInstalled) {
    Write-Host "❌ Java não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Java JDK: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Java instalado" -ForegroundColor Green

Write-Host ""

# Verificar se Android SDK está instalado
Write-Host "Verificando Android SDK..." -ForegroundColor Yellow
$androidHome = $env:ANDROID_HOME

if (-not $androidHome) {
    Write-Host "⚠️  ANDROID_HOME não configurado" -ForegroundColor Yellow
    Write-Host "Você pode instalar o Android Studio: https://developer.android.com/studio" -ForegroundColor Yellow
    Write-Host "Ou configurar manualmente o Android SDK" -ForegroundColor Yellow
} else {
    Write-Host "✅ Android SDK encontrado: $androidHome" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Próximos Passos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edite o arquivo twa-manifest.json e substitua 'SEU_DOMINIO_AQUI'" -ForegroundColor White
Write-Host "   pelo seu domínio real (ex: educly.com.br)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Gere o keystore de assinatura:" -ForegroundColor White
Write-Host "   keytool -genkey -v -keystore educly-release-key.keystore -alias educly -keyalg RSA -keysize 2048 -validity 10000" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Inicialize o projeto TWA:" -ForegroundColor White
Write-Host "   bubblewrap init --manifest https://SEU_DOMINIO/manifest.json" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Construa o AAB para Play Store:" -ForegroundColor White
Write-Host "   bubblewrap build" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Configure o assetlinks.json no servidor:" -ForegroundColor White
Write-Host "   Copie .well-known/assetlinks.json para seu servidor web" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Consulte a documentação completa:" -ForegroundColor White
Write-Host "   docs/PUBLICACAO_PLAY_STORE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Verificação de pré-requisitos concluída!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
