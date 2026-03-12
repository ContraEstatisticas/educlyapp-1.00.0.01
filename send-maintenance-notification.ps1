# ============================================================
# Notificacao de Manutencao Programada - Bright White Wonder
# 12/03/2026 das 14h30 as 16h30 (Brasilia)
# Envia o email no idioma salvo em profiles.preferred_language
# ============================================================

# ---- CONFIGURACAO ----
$SUPABASE_URL     = "https://dqlcxpbfemhzzetwaxsa.supabase.co"
$SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ"
$RESEND_API_KEY   = "re_L6bNDBay_JcehQZPKrK2xwTKt7sUQxsJg"
$FROM_EMAIL       = "Educly <noreply@educly.app>"
$BATCH_SIZE       = 50
# ---- FIM ----

$TRANSLATIONS = @{
    "pt" = @{ subject="[Educly] Manutencao Programada - 12/03/2026"; title="Manutencao Programada"; greeting="Ola! Informamos que a plataforma passara por uma <strong>manutencao programada</strong> no seguinte periodo:"; date="Data:"; dateVal="12 de marco de 2026"; start="Inicio:"; startVal="14h30 (horario de Brasilia)"; end="Termino previsto:"; endVal="16h30 (horario de Brasilia)"; body="Durante esse periodo, <strong>poderemos apresentar instabilidades no sistema</strong>. Pedimos desculpas pelo inconveniente."; contact="Apos o termino da manutencao, a plataforma voltara ao funcionamento normal. Duvidas:"; thanks="Obrigado pela compreensao!"; team="Equipe Educly"; privacy="Politica de Privacidade"; terms="Termos de Uso"; rights="Todos os direitos reservados." }
    "en" = @{ subject="[Educly] Scheduled Maintenance - 03/12/2026"; title="Scheduled Maintenance"; greeting="Hello! We want to let you know that the platform will undergo <strong>scheduled maintenance</strong> during the following period:"; date="Date:"; dateVal="March 12, 2026"; start="Start:"; startVal="2:30 PM (Brasilia time)"; end="Expected end:"; endVal="4:30 PM (Brasilia time)"; body="During this period, <strong>the system may experience instabilities</strong>. We apologize for the inconvenience."; contact="After maintenance is complete, the platform will return to normal. Questions:"; thanks="Thank you for your understanding!"; team="Educly Team"; privacy="Privacy Policy"; terms="Terms of Use"; rights="All rights reserved." }
    "es" = @{ subject="[Educly] Mantenimiento Programado - 12/03/2026"; title="Mantenimiento Programado"; greeting="Hola! Te informamos que la plataforma realizara un <strong>mantenimiento programado</strong> en el siguiente periodo:"; date="Fecha:"; dateVal="12 de marzo de 2026"; start="Inicio:"; startVal="14:30 h (hora de Brasilia)"; end="Fin previsto:"; endVal="16:30 h (hora de Brasilia)"; body="Durante este periodo, <strong>el sistema podria presentar inestabilidades</strong>. Pedimos disculpas por los inconvenientes."; contact="Despues del mantenimiento, la plataforma volvera a funcionar con normalidad. Dudas:"; thanks="Gracias por tu comprension!"; team="Equipo Educly"; privacy="Politica de Privacidad"; terms="Terminos de Uso"; rights="Todos los derechos reservados." }
    "fr" = @{ subject="[Educly] Maintenance Programmee - 12/03/2026"; title="Maintenance Programmee"; greeting="Bonjour! Nous vous informons que la plateforme fera une <strong>maintenance programmee</strong> pendant la periode suivante:"; date="Date:"; dateVal="12 mars 2026"; start="Debut:"; startVal="14h30 (heure de Brasilia)"; end="Fin prevue:"; endVal="16h30 (heure de Brasilia)"; body="Pendant cette periode, <strong>le systeme pourrait presenter des instabilites</strong>. Nous nous excusons pour la gene."; contact="Apres la maintenance, la plateforme reprendra son fonctionnement normal. Questions:"; thanks="Merci de votre comprehension!"; team="L equipe Educly"; privacy="Politique de Confidentialite"; terms="Conditions d Utilisation"; rights="Tous droits reserves." }
    "de" = @{ subject="[Educly] Geplante Wartung - 12.03.2026"; title="Geplante Wartung"; greeting="Hallo! Wir informieren Sie, dass die Plattform eine <strong>geplante Wartung</strong> im folgenden Zeitraum durchfuhren wird:"; date="Datum:"; dateVal="12. Marz 2026"; start="Beginn:"; startVal="14:30 Uhr (Brasilia-Zeit)"; end="Voraussichtliches Ende:"; endVal="16:30 Uhr (Brasilia-Zeit)"; body="Wahrend dieses Zeitraums <strong>konnen Instabilitaten auftreten</strong>. Wir entschuldigen uns fur die Unannehmlichkeiten."; contact="Nach der Wartung kehrt die Plattform zum normalen Betrieb zuruck. Fragen:"; thanks="Vielen Dank fur Ihr Verstandnis!"; team="Das Educly-Team"; privacy="Datenschutzrichtlinie"; terms="Nutzungsbedingungen"; rights="Alle Rechte vorbehalten." }
    "it" = @{ subject="[Educly] Manutenzione Programmata - 12/03/2026"; title="Manutenzione Programmata"; greeting="Ciao! Ti informiamo che la piattaforma subira una <strong>manutenzione programmata</strong> nel seguente periodo:"; date="Data:"; dateVal="12 marzo 2026"; start="Inizio:"; startVal="14:30 (ora di Brasilia)"; end="Fine prevista:"; endVal="16:30 (ora di Brasilia)"; body="Durante questo periodo, <strong>il sistema potrebbe presentare instabilita</strong>. Ci scusiamo per il disagio."; contact="Al termine della manutenzione, la piattaforma tornera al normale funzionamento. Domande:"; thanks="Grazie per la comprensione!"; team="Il Team Educly"; privacy="Informativa sulla Privacy"; terms="Termini di Utilizzo"; rights="Tutti i diritti riservati." }
    "nl" = @{ subject="[Educly] Gepland Onderhoud - 12/03/2026"; title="Gepland Onderhoud"; greeting="Hallo! We willen u informeren dat het platform <strong>gepland onderhoud</strong> zal ondergaan:"; date="Datum:"; dateVal="12 maart 2026"; start="Start:"; startVal="14:30 (Brasilia-tijd)"; end="Verwacht einde:"; endVal="16:30 (Brasilia-tijd)"; body="Tijdens deze periode <strong>kan het systeem instabiliteiten ondervinden</strong>. Onze excuses voor het ongemak."; contact="Na het onderhoud keert het platform terug naar normaal. Vragen:"; thanks="Bedankt voor uw begrip!"; team="Het Educly Team"; privacy="Privacybeleid"; terms="Gebruiksvoorwaarden"; rights="Alle rechten voorbehouden." }
    "pl" = @{ subject="[Educly] Zaplanowana Konserwacja - 12/03/2026"; title="Zaplanowana Konserwacja"; greeting="Czesc! Informujemy, ze platforma przejdzie <strong>zaplanowana konserwacje</strong> w nastepujacym okresie:"; date="Data:"; dateVal="12 marca 2026"; start="Poczatek:"; startVal="14:30 (czas Brasilia)"; end="Przewidywany koniec:"; endVal="16:30 (czas Brasilia)"; body="W tym czasie <strong>system moze wykazywac niestabilnosci</strong>. Przepraszamy za niedogodnosci."; contact="Po zakonczeniu konserwacji platforma wrocit do normalnego dzialania. Pytania:"; thanks="Dziekujemy za zrozumienie!"; team="Zespol Educly"; privacy="Polityka Prywatnosci"; terms="Warunki Uzytkowania"; rights="Wszelkie prawa zastrzezone." }
    "ru" = @{ subject="[Educly] Planovoe Obsluzhivanie - 12/03/2026"; title="Planovoe Obsluzhivanie"; greeting="Zdravstvuyte! Soobshchaem, chto platforma proydet <strong>planovoe obsluzhivanie</strong> v sleduyushchiy period:"; date="Data:"; dateVal="12 marta 2026"; start="Nachalo:"; startVal="14:30 (vremya Brazilia)"; end="Okonchanie:"; endVal="16:30 (vremya Brazilia)"; body="V etot period <strong>vozmozhny nestabilnosti v sisteme</strong>. Prinosim izvineniya za neudobstva."; contact="Posle obsluzhivaniya platforma vernyotsya k normal'noy rabote. Voprosy:"; thanks="Spasibo za ponimanie!"; team="Komanda Educly"; privacy="Politika Konfidentsialnosti"; terms="Usloviya Ispolzovaniya"; rights="Vse prava zashchishcheny." }
    "tr" = @{ subject="[Educly] Planli Bakim - 12/03/2026"; title="Planli Bakim"; greeting="Merhaba! Platformun <strong>planli bakim</strong> yapacagini bildirmek istiyoruz:"; date="Tarih:"; dateVal="12 Mart 2026"; start="Baslangic:"; startVal="14:30 (Brezilya saati)"; end="Tahmini bitis:"; endVal="16:30 (Brezilya saati)"; body="Bu donemde <strong>sistemde aksakliklar yasanabilir</strong>. Yarattigi rahatsizlik icin ozur dileriz."; contact="Bakim tamamlandiktan sonra platform normale donecektir. Sorular:"; thanks="Anlayisiniz icin tesekkurler!"; team="Educly Ekibi"; privacy="Gizlilik Politikasi"; terms="Kullanim Sartlari"; rights="Tum haklari saklidir." }
    "ja" = @{ subject="[Educly] Teiki Maintenance no Oshirase - 2026/03/12"; title="Teiki Maintenance"; greeting="Konnichiwa! Platform no <strong>teiki maintenance</strong> o jisshi shimasu:"; date="Hiduke:"; dateVal="2026-nen 3-gatsu 12-nichi"; start="Kaishi:"; startVal="14:30 (Brasilia jikan)"; end="Shuryo yotei:"; endVal="16:30 (Brasilia jikan)"; body="Kono kikan chuu, <strong>system ni fuantei ga hassei suru kanosei ga arimasu</strong>. Fuben wo okake shite moushiwake gozaimasen."; contact="Maintenance shuryo-go, platform wa tsuujou doori no un'ei wo saikai shimasu. Oshirase:"; thanks="Gorikai no hodo arigatou gozaimasu!"; team="Educly Team"; privacy="Privacy Policy"; terms="Terms of Use"; rights="All rights reserved." }
    "ko" = @{ subject="[Educly] Jeonggi Jeomgeom Annaeg - 2026/03/12"; title="Jeonggi Jeomgeom"; greeting="Annyeonghaseyo! Platform <strong>jeonggi jeomgeom</strong> i jinhaengdoel yejeongimnida:"; date="Nalju:"; dateVal="2026 nyeon 3 wol 12 il"; start="Sijak:"; startVal="14:30 (Brazillia sigan)"; end="Yesang jongryoo:"; endVal="16:30 (Brazillia sigan)"; body="Jeomgeom gigan junge <strong>system bulanejeong i balsaenghal su itsseumnida</strong>. Bulpyeonul deuryeo joesong hamnida."; contact="Jeomgeom wanlyo hoo platform eun jeongssang unyeong doebnida. Muneuisarang:"; thanks="Yihae hae jusin de gamsa hamnida!"; team="Educly Team"; privacy="Privacy Policy"; terms="Terms of Use"; rights="All rights reserved." }
    "zh" = @{ subject="[Educly] Jihua Weihu Tongzhi - 2026/03/12"; title="Jihua Weihu"; greeting="Nin hao! Tongzhi nin pingtai jiang jin xing <strong>jihua weihu</strong>:"; date="Riqi:"; dateVal="2026 nian 3 yue 12 ri"; start="Kaishi:"; startVal="14:30 (Baziliya shijian)"; end="Yujie jieshu:"; endVal="16:30 (Baziliya shijian)"; body="Ci period zhong, <strong>xitong keneng chuxian buwending qingkuang</strong>. Wei nin dailai bu bian, women shenshi daohao."; contact="Weihu wanjie hou, pingtai jiang huifu zhengchang yunying. Zhanxianwenti:"; thanks="Ganxie nin de lijie!"; team="Educly Tuandui"; privacy="Yinsi Zhengce"; terms="Shiyong Tiaokuan"; rights="Baoliu suoyou quanli." }
    "hi" = @{ subject="[Educly] Nirdharit Rakhrakha - 12/03/2026"; title="Nirdharit Rakhrakha"; greeting="Namaskar! Hum aapko suchit karna chahte hain ki platform <strong>nirdharit rakhrakha</strong> se guzregi:"; date="Tithi:"; dateVal="12 March 2026"; start="Shuruat:"; startVal="14:30 (Brasilia samay)"; end="Anumanit samapt:"; endVal="16:30 (Brasilia samay)"; body="Is avadhi mein <strong>system mein aasthirta aa sakti hai</strong>. Asuvidhaa ke liye khed hai."; contact="Rakhrakha ke baad platform samanya roop se chalega. Sawal:"; thanks="Samajhne ke liye dhanyavaad!"; team="Educly Team"; privacy="Guptataa Neeti"; terms="Upyog Niyam"; rights="Sabhi adhikar surakshit." }
    "ar" = @{ subject="[Educly] Sianah Mujadwala - 12/03/2026"; title="Sianah Mujadwala"; greeting="Marhaban! Noud ilamakum bi anna al-manssa satakhda <strong>Sianat mujadwala</strong> khilal al-fatra al-taliya:"; date="Al-Tarikh:"; dateVal="12 Maris 2026"; start="Al-Bidaya:"; startVal="14:30 (tawqit Braziliya)"; end="Al-Nihaya al-mutawaqqa:"; endVal="16:30 (tawqit Braziliya)"; body="Khilal hadhihi al-fatra, <strong>qad ya'ani al-nidham ba'd al-idtirabat</strong>. Na'tadhir 'an al-iz'aj."; contact="Ba'da intihaa al-sianah, sa-ta'ud al-manssa ila al-'amal bi-shukl tabi'i. Lil-istifsar:"; thanks="Shukran li-tafahomkum!"; team="Fariq Educly"; privacy="Siyasat Al-Khusosiya"; terms="Shurot Al-Istikhddam"; rights="Jami' al-houqouq mahfouza." }
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
    .box{background-color:#fffbeb;border-radius:8px;padding:20px 24px;margin:24px 0;border-left:4px solid #f59e0b}
    .box p{margin:4px 0;color:#78350f;font-size:15px}
    .footer{border-top:1px solid #e2e8f0;margin-top:32px;padding-top:20px;text-align:center}
    .footer p{color:#a0aec0;font-size:12px}
    .footer a{color:#6366f1;text-decoration:underline}
  </style>
</head>
<body>
  <div class="container">
    <div class="logo"><img src="https://educly.lovable.app/logo-educly.png" width="150" height="50" alt="Educly"/></div>
    <h1>$($t.title)</h1>
    <p>$($t.greeting)</p>
    <div class="box">
      <p><strong>$($t.date)</strong> $($t.dateVal)</p>
      <p><strong>$($t.start)</strong> $($t.startVal)</p>
      <p><strong>$($t.end)</strong> $($t.endVal)</p>
    </div>
    <p>$($t.body)</p>
    <p>$($t.contact) <a href="mailto:contact@educly.app">contact@educly.app</a>.</p>
    <p style="text-align:center;margin-top:28px;color:#718096;font-size:14px">$($t.thanks)<br><strong>$($t.team)</strong></p>
    <div class="footer">
      <p>&copy; 2025 Educly. $($t.rights)<br>
        <a href="https://educly.lovable.app/politica-privacidade">$($t.privacy)</a> |
        <a href="https://educly.lovable.app/termos-uso">$($t.terms)</a>
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
Write-Host "  Notificacao de Manutencao Programada  " -ForegroundColor Cyan
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

$userList = $allUsers | Where-Object { $_.email } | ForEach-Object {
    $lang = if ($langMap.ContainsKey($_.id)) { $langMap[$_.id] } else { "en" }
    if (-not $TRANSLATIONS.ContainsKey($lang)) { $lang = "en" }
    [PSCustomObject]@{ email = $_.email; lang = $lang }
} | Sort-Object email | Select-Object -Unique email, lang

Write-Host "Total de usuarios: $($userList.Count)" -ForegroundColor Green
Write-Host "`nDistribuicao por idioma:" -ForegroundColor Yellow
$userList | Group-Object lang | Sort-Object Count -Descending | ForEach-Object { Write-Host "  $($_.Name.PadRight(4)): $($_.Count)" -ForegroundColor Gray }

$confirm = Read-Host "`nEnviar para $($userList.Count) usuarios? (s/N)"
if ($confirm -notin @("s","S","sim","Sim")) { Write-Host "Cancelado." -ForegroundColor Red; exit }

$success = 0; $suppressed = 0; $failed = 0

$batches = for ($b = 0; $b -lt $userList.Count; $b += $BATCH_SIZE) {
    ,($userList[$b..([Math]::Min($b + $BATCH_SIZE - 1, $userList.Count - 1))])
}

$batchNum = 0
foreach ($batch in $batches) {
    $batchNum++
    $startIdx = ($batchNum - 1) * $BATCH_SIZE + 1
    $endIdx   = [Math]::Min($batchNum * $BATCH_SIZE, $userList.Count)
    Write-Host "`n[Lote $batchNum/$($batches.Count)] emails $startIdx-${endIdx}..." -ForegroundColor Cyan

    $messages  = $batch | ForEach-Object { @{ from=$FROM_EMAIL; to=@($_.email); subject=$SUBJECT_CACHE[$_.lang]; html=$HTML_CACHE[$_.lang] } }
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -InputObject $messages -Depth 6 -Compress))

    $retries = 0; $sent = $false
    while (-not $sent -and $retries -lt 5) {
        try {
            $r    = Invoke-RestMethod -Uri "https://api.resend.com/emails/batch" -Method POST -Headers @{ "Authorization"="Bearer $RESEND_API_KEY"; "Content-Type"="application/json; charset=utf-8" } -Body $bodyBytes
            $ok   = ($r.data | Where-Object { $_.id }).Count
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