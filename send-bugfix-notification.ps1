# ============================================================
param (
    [Parameter(Mandatory=$false)]
    [string]$TargetEmail
)

# ---- CONFIGURACAO ----
$SUPABASE_URL     = $env:SUPABASE_URL
$SERVICE_ROLE_KEY = $env:SUPABASE_SERVICE_ROLE_KEY
$RESEND_API_KEY   = $env:RESEND_API_KEY
$FROM_EMAIL       = "Educly <noreply@educly.app>"
$BATCH_SIZE       = 50
$CACHE_RESET_URL  = "https://educly.app/reset-cache"
# ---- FIM ----

if (-not $SUPABASE_URL) {
    throw "Missing environment variable: SUPABASE_URL"
}

if (-not $SERVICE_ROLE_KEY) {
    throw "Missing environment variable: SUPABASE_SERVICE_ROLE_KEY"
}

if (-not $RESEND_API_KEY) {
    throw "Missing environment variable: RESEND_API_KEY"
}

$TRANSLATIONS = @{
    "pt" = @{ subject="[Educly] Atualizamos o sistema!"; title="Melhorias no Educly"; greeting="Olá!"; body="Informamos que o sistema passou por diversas correções de bugs e melhorias para tornar sua experiência ainda melhor e mais estável."; instruction="Para garantir que todas as alterações mais recentes sejam aplicadas corretamente em seu navegador, recomendamos que utilize o link abaixo:"; linkText="Aplicar Atualizações (Reset Cache)"; thanks="Obrigado pela confiança!"; team="Equipe Educly"; privacy="Politica de Privacidade"; terms="Termos de Uso"; rights="Todos os direitos reservados." }
    "en" = @{ subject="[Educly] System updated!"; title="Educly Enhancements"; greeting="Hello!"; body="We want to let you know that the system has undergone several bug fixes and improvements to make your experience even better and more stable."; instruction="To ensure all the latest changes are properly applied to your browser, we recommend using the link below:"; linkText="Apply Updates (Reset Cache)"; thanks="Thank you for your trust!"; team="Educly Team"; privacy="Privacy Policy"; terms="Terms of Use"; rights="All rights reserved." }
    "es" = @{ subject="[Educly] !Sistema actualizado!"; title="Mejoras en Educly"; greeting="!Hola!"; body="Te informamos que el sistema ha pasado por varias correcciones de errores y mejoras para que tu experiencia sea aun mejor y mas estable."; instruction="Para garantizar que todos los cambios mas recientes se apliquen correctamente en tu navegador, recomendamos utilizar el siguiente enlace:"; linkText="Aplicar Actualizaciones (Reset Cache)"; thanks="!Gracias por tu confianza!"; team="Equipo Educly"; privacy="Politica de Privacidad"; terms="Terminos de Uso"; rights="Todos los derechos reservados." }
    "fr" = @{ subject="[Educly] Systeme mis a jour !"; title="Ameliorations d'Educly"; greeting="Bonjour !"; body="Nous vous informons que le systeme a subi plusieurs corrections de bugs et ameliorations pour rendre votre experience encore meilleure et plus stable."; instruction="Pour garantir que tous les derniers changements sont correctement appliques a votre navegador, nous vous recommandons d'utiliser le lien ci-dessous :"; linkText="Appliquer les mises a jour (Reset Cache)"; thanks="Merci de votre confiance !"; team="L'equipe Educly"; privacy="Politique de Confidentialite"; terms="Conditions d'Utilisation"; rights="Tous droits reserves." }
    "de" = @{ subject="[Educly] System aktualisiert!"; title="Educly Verbesserungen"; greeting="Hallo!"; body="Wir mochten Sie informieren, dass das System mehrere Fehlerbehebungen und Verbesserungen erfahren hat, um Ihre Erfahrung noch besser und stabiler zu machen."; instruction="Um sicherzustellen, dass alle neuesten Anderungen korrekt in Ihrem Browser angewendet werden, empfehlen wir den folgenden Link:"; linkText="Updates anwenden (Reset Cache)"; thanks="Vielen Dank fur Ihr Vertrauen!"; team="Das Educly-Team"; privacy="Datenschutzrichtlinie"; terms="Nutzungsbedingungen"; rights="Alle Rechte vorbehalten." }
    "it" = @{ subject="[Educly] Sistema aggiornato!"; title="Miglioramenti Educly"; greeting="Ciao!"; body="Ti informiamo che il sistema e stato sottoposto a diverse correzioni di bug e miglioramenti per rendere la tua esperienza ancora migliore e piu stabile."; instruction="Per garantire que tutte le ultime modifiche siano applicate correttamente nel tuo browser, ti consigliamo di utilizzare il link sottostante:"; linkText="Applica Aggiornamenti (Reset Cache)"; thanks="Grazie per la fiducia!"; team="Il Team Educly"; privacy="Informativa sulla Privacy"; terms="Termini di Utilizzo"; rights="Tutti i diritti riservati." }
}

function Get-EmailHtml($t) {
    return @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f6f9fc;margin:0;padding:40px 20px}
    .container{background-color:#fff;max-width:600px;margin:0 auto;padding:40px 30px;border-radius:8px}
    .logo{text-align:center;margin-bottom:32px}
    h1{color:#1a1a2e;font-size:22px;font-weight:700;text-align:center;margin:0 0 24px}
    p{color:#4a5568;font-size:15px;line-height:26px;margin:16px 0}
    .box{background-color:#f0f7ff;border-radius:8px;padding:30px 24px;margin:24px 0;border-left:4px solid #3b82f6;text-align:center}
    .box p{margin-bottom:20px;color:#1e40af;font-size:15px;font-weight:500}
    .button{background-color:#3b82f6;color:#ffffff !important;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:16px}
    .footer{border-top:1px solid #e2e8f0;margin-top:32px;padding-top:20px;text-align:center}
    .footer p{color:#a0aec0;font-size:12px}
    .footer a{color:#6366f1;text-decoration:underline}
  </style>
</head>
<body>
  <div class="container">
    <div class="logo"><img src="https://educly.lovable.app/logo-educly.png" width="150" alt="Educly"/></div>
    <h1>$($t.title)</h1>
    <p>$($t.greeting)</p>
    <p>$($t.body)</p>
    <div class="box">
      <p>$($t.instruction)</p>
      <a href="$CACHE_RESET_URL" class="button">$($t.linkText)</a>
    </div>
    <p style="text-align:center;margin-top:28px;color:#718096;font-size:14px">$($t.thanks)<br><strong>$($t.team)</strong></p>
    <div class="footer">
      <p>&copy; 2026 Educly. $($t.rights)<br>
        <a href="https://educly.app/politica-privacidade">$($t.privacy)</a> |
        <a href="https://educly.app/termos-uso">$($t.terms)</a>
      </p>
    </div>
  </div>
</body>
</html>
"@
}

$HTML_CACHE = @{}; $SUBJECT_CACHE = @{}
foreach ($lang in $TRANSLATIONS.Keys) {
    $HTML_CACHE[$lang]    = Get-EmailHtml $TRANSLATIONS[$lang]
    $SUBJECT_CACHE[$lang] = $TRANSLATIONS[$lang].subject
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Notificacao de Melhorias e Correcoes  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nBuscando usuarios..." -ForegroundColor Yellow
$allUsers = @(); $page = 1; $perPage = 1000
do {
    $resp  = Invoke-RestMethod -Uri "$SUPABASE_URL/auth/v1/admin/users?page=$page&per_page=$perPage" -Headers @{ "apikey"=$SERVICE_ROLE_KEY; "Authorization"="Bearer $SERVICE_ROLE_KEY" }
    $batch = $resp.users
    $allUsers += $batch
    $page++
} while ($batch.Count -eq $perPage)

Write-Host "Buscando idiomas dos perfis..." -ForegroundColor Yellow
$langMap = @{}; $offset = 0; $limit = 1000
do {
    $profResp = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/profiles?select=id,preferred_language&limit=$limit&offset=$offset" -Headers @{ "apikey"=$SERVICE_ROLE_KEY; "Authorization"="Bearer $SERVICE_ROLE_KEY"; "Accept"="application/json" }
    foreach ($p in $profResp) { if ($p.id -and $p.preferred_language) { $langMap[$p.id] = $p.preferred_language } }
    $offset += $limit
} while ($profResp.Count -eq $limit)

$userList = @($allUsers | Where-Object { $_.email } | ForEach-Object {
    $pLang = if ($langMap.ContainsKey($_.id)) { $langMap[$_.id] } else { "en" }
    $lang = if ($TRANSLATIONS.ContainsKey($pLang)) { $pLang } else { "en" }
    [PSCustomObject]@{ email = $_.email; lang = $lang }
} | Sort-Object email | Select-Object -Unique email, lang)

if ($TargetEmail) {
    $userList = @($userList | Where-Object { $_.email -eq $TargetEmail })
    if ($userList.Count -eq 0) {
        Write-Host "Usuario com email '$TargetEmail' nao encontrado." -ForegroundColor Red
        exit
    }
    Write-Host "`nMODO TESTE: Enviar para APENAS '$TargetEmail'" -ForegroundColor Cyan
}

$userCount = @($userList).Count
Write-Host "Total de usuarios: $userCount" -ForegroundColor Green
Write-Host "`nDistribuicao por idioma:" -ForegroundColor Yellow
$userList | Group-Object lang | Sort-Object Count -Descending | ForEach-Object { Write-Host "  $($_.Name.PadRight(4)): $($_.Count)" -ForegroundColor Gray }

$confirm = Read-Host "`nEnviar para $userCount usuarios? (s/N)"
if ($confirm -notin @("s","S","sim","Sim")) { Write-Host "Cancelado." -ForegroundColor Red; exit }

$success = 0; $suppressed = 0; $failed = 0

$batches = for ($b = 0; $b -lt $userCount; $b += $BATCH_SIZE) {
    ,($userList[$b..([Math]::Min($b + $BATCH_SIZE - 1, $userCount - 1))])
}

$batchNum = 0
foreach ($batch in $batches) {
    $batchNum++
    $startIdx = ($batchNum - 1) * $BATCH_SIZE + 1
    $endIdx   = [Math]::Min($batchNum * $BATCH_SIZE, $userCount)
    Write-Host "`n[Lote $batchNum/$($batches.Count)] emails $startIdx-${endIdx}..." -ForegroundColor Cyan

    $messages  = @($batch | ForEach-Object { @{ from=$FROM_EMAIL; to=@($_.email); subject=$SUBJECT_CACHE[$_.lang]; html=$HTML_CACHE[$_.lang] } })
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -InputObject $messages -Depth 6 -Compress))

    $retries = 0; $sent = $false
    while (-not $sent -and $retries -lt 5) {
        try {
            $r    = Invoke-RestMethod -Uri "https://api.resend.com/emails/batch" -Method POST -Headers @{ "Authorization"="Bearer $RESEND_API_KEY"; "Content-Type"="application/json; charset=utf-8" } -Body $bodyBytes
            $ok   = @(@($r.data) | Where-Object { $_.id }).Count
            $fail = $batch.Count - $ok
            $success += $ok; $failed += $fail
            Write-Host "  OK: $ok  Falhas: $fail" -ForegroundColor Green
            $sent = $true
        } catch {
            $sc = $null; try { $sc = [int]$_.Exception.Response.StatusCode } catch {}
            if ($sc -eq 429) {
                $retries++; $wait = [Math]::Pow(2,$retries)
                Write-Host "  429 - aguardando ${wait}s ($retries/5)..." -ForegroundColor Yellow
                Start-Sleep -Seconds $wait
            } elseif ($sc -eq 400) {
                Write-Host "  400 no lote - enviando individualmente..." -ForegroundColor Yellow
                foreach ($u in $batch) {
                    $sb = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -InputObject @(@{ from=$FROM_EMAIL; to=@($u.email); subject=$SUBJECT_CACHE[$u.lang]; html=$HTML_CACHE[$u.lang] }) -Depth 6 -Compress))
                    try { Invoke-RestMethod -Uri "https://api.resend.com/emails/batch" -Method POST -Headers @{ "Authorization"="Bearer $RESEND_API_KEY"; "Content-Type"="application/json; charset=utf-8" } -Body $sb | Out-Null; $success++ }
                    catch { $sc2=$null; try{$sc2=[int]$_.Exception.Response.StatusCode}catch{}; if($sc2 -eq 400){$suppressed++}else{$failed++} }
                    Start-Sleep -Milliseconds 600
                }
                $sent = $true
            } else {
                Write-Host "  ERRO ($sc): $($_.Exception.Message)" -ForegroundColor Red
                $failed += $batch.Count; $sent = $true
            }
        }
    }
    if (-not $sent) { $failed += $batch.Count; Write-Host "  Lote abandonado." -ForegroundColor Red }
    if ($batchNum -lt $batches.Count) { Start-Sleep -Milliseconds 1500 }
}

Write-Host "`n========================================"
Write-Host "  Enviados  : $success"
Write-Host "  Suprimidos: $suppressed"
Write-Host "  Falhas    : $failed"
Write-Host "========================================" -ForegroundColor Cyan
