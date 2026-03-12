# ============================================================
# Notificação de Manutenção Programada - Bright White Wonder
# 12/03/2026 das 14h30 às 16h30
# ============================================================

# ---- CONFIGURAÇÃO ----
$SUPABASE_URL      = "https://dqlcxpbfemhzzetwaxsa.supabase.co"
$SERVICE_ROLE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ"
$RESEND_API_KEY    = "re_L6bNDBay_JcehQZPKrK2xwTKt7sUQxsJg"
$FROM_EMAIL        = "Educly <noreply@educly.app>"
# ---- FIM DA CONFIGURAÇÃO ----

$SUBJECT = "[Educly] Manutenção Programada - 12/03/2026"

$HTML = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f9fc; margin: 0; padding: 40px 20px; }
    .container { background-color: #fff; max-width: 600px; margin: 0 auto; padding: 40px 30px; border-radius: 8px; }
    .logo { text-align: center; margin-bottom: 32px; }
    h1 { color: #1a1a2e; font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 24px; }
    p { color: #4a5568; font-size: 15px; line-height: 26px; margin: 16px 0; }
    .warning-box { background-color: #fffbeb; border-radius: 8px; padding: 20px 24px; margin: 24px 0; border-left: 4px solid #f59e0b; }
    .warning-box p { margin: 4px 0; color: #78350f; font-size: 15px; }
    .footer { border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 20px; text-align: center; }
    .footer p { color: #a0aec0; font-size: 12px; }
    .footer a { color: #6366f1; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://educly.lovable.app/logo-educly.png" width="150" height="50" alt="Educly"/>
    </div>

    <h1>⚙️ Manutenção Programada</h1>

    <p>Olá! Informamos que a plataforma passará por uma <strong>manutenção programada</strong> no seguinte período:</p>

    <div class="warning-box">
      <p><strong>📅 Data:</strong> 12 de março de 2026</p>
      <p><strong>🕑 Início:</strong> 14h30 (horário de Brasília)</p>
      <p><strong>🕓 Término previsto:</strong> 16h30 (horário de Brasília)</p>
    </div>

    <p>Durante esse período, <strong>poderemos apresentar instabilidades no sistema</strong>. Pedimos desculpas pelo inconveniente e garantimos que trabalharemos para minimizar qualquer impacto.</p>

    <p>Após o término da manutenção, a plataforma voltará ao funcionamento normal. Se tiver dúvidas, entre em contato pelo <a href="mailto:contact@educly.app">contact@educly.app</a>.</p>

    <p style="text-align: center; margin-top: 28px; color: #718096; font-size: 14px;">
      Obrigado pela compreensão!<br><strong>Equipe Educly</strong>
    </p>

    <div class="footer">
      <p>
        © 2025 Educly. Todos os direitos reservados.<br>
        <a href="https://educly.lovable.app/politica-privacidade">Política de Privacidade</a> |
        <a href="https://educly.lovable.app/termos-uso">Termos de Uso</a>
      </p>
    </div>
  </div>
</body>
</html>
"@

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Notificacao de Manutencao Programada" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Busca todos os usuários via Supabase Admin API (com paginação)
Write-Host "`nBuscando usuarios..." -ForegroundColor Yellow

$allUsers = @()
$page = 1
$perPage = 1000

do {
    $usersResponse = Invoke-RestMethod `
        -Uri "$SUPABASE_URL/auth/v1/admin/users?page=$page&per_page=$perPage" `
        -Headers @{
            "apikey"        = $SERVICE_ROLE_KEY
            "Authorization" = "Bearer $SERVICE_ROLE_KEY"
        }

    $batch = $usersResponse.users
    $allUsers += $batch
    $page++
} while ($batch.Count -eq $perPage)

$emails = $allUsers | Where-Object { $_.email } | Select-Object -ExpandProperty email | Sort-Object -Unique
Write-Host "Total de usuarios encontrados: $($emails.Count)" -ForegroundColor Green

$confirm = Read-Host "`nEnviar notificacao para $($emails.Count) usuarios? (s/N)"
if ($confirm -notin @("s", "S", "sim", "Sim")) {
    Write-Host "Cancelado." -ForegroundColor Red
    exit
}

$success = 0
$failed  = 0
$i       = 0

foreach ($email in $emails) {
    $i++
    $body = @{
        from    = $FROM_EMAIL
        to      = @($email)
        subject = $SUBJECT
        html    = $HTML
    } | ConvertTo-Json -Depth 5

    try {
        Invoke-RestMethod `
            -Uri "https://api.resend.com/emails" `
            -Method POST `
            -Headers @{ "Authorization" = "Bearer $RESEND_API_KEY"; "Content-Type" = "application/json" } `
            -Body $body | Out-Null

        $success++
        Write-Host "[$i/$($emails.Count)] OK $email" -ForegroundColor Green
    } catch {
        $failed++
        Write-Host "[$i/$($emails.Count)] FALHA $email - $($_.Exception.Message)" -ForegroundColor Red
    }

    # Pequeno delay para não estourar rate limit do Resend
    Start-Sleep -Milliseconds 100
}

Write-Host "`n========================================"
Write-Host "  Enviados: $success  |  Falhas: $failed"
Write-Host "========================================" -ForegroundColor Cyan
