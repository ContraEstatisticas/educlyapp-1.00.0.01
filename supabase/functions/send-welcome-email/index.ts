import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    subject: "🔓 Acesso Liberado — Educly",
    heroTitle: "Sua conta está pronta.",
    heroSubtitle: "Clique no botão abaixo para entrar direto na sua conta, sem precisar de senha.",
    cta: "Entrar na Minha Conta",
    credentialsTitle: "SUAS CREDENCIAIS",
    credentialsNote: "Referência — guarde com segurança",
    credentialsEmail: "E-mail",
    credentialsPassword: "Senha",
    credentialsChangeNote: "Você pode alterar sua senha a qualquer momento dentro do app.",
    newPurchaseTitle: "Nova compra ativada!",
    newPurchaseSubtitle: "Seu novo pacote já está disponível. Clique abaixo para acessar.",
    team: "Equipe Educly",
    rights: "Todos os direitos reservados.",
    help: "Ajuda",
    privacy: "Privacidade",
  },
  en: {
    subject: "🔓 Access Granted — Educly",
    heroTitle: "Your account is ready to go.",
    heroSubtitle: "Click the button below to sign in instantly, no password needed.",
    cta: "Sign In to My Account",
    credentialsTitle: "YOUR CREDENTIALS",
    credentialsNote: "Reference only — keep this safe",
    credentialsEmail: "Email",
    credentialsPassword: "Password",
    credentialsChangeNote: "You can change your password anytime inside the app.",
    newPurchaseTitle: "New purchase activated!",
    newPurchaseSubtitle: "Your new package is now available. Click below to access.",
    team: "Educly Team",
    rights: "All rights reserved.",
    help: "Help",
    privacy: "Privacy",
  },
  es: {
    subject: "🔓 Acceso Liberado — Educly",
    heroTitle: "Tu cuenta está lista.",
    heroSubtitle: "Haz clic en el botón de abajo para entrar directamente, sin necesidad de contraseña.",
    cta: "Entrar a Mi Cuenta",
    credentialsTitle: "TUS CREDENCIALES",
    credentialsNote: "Solo referencia — guárdalo seguro",
    credentialsEmail: "Correo",
    credentialsPassword: "Contraseña",
    credentialsChangeNote: "Puedes cambiar tu contraseña en cualquier momento dentro de la app.",
    newPurchaseTitle: "¡Nueva compra activada!",
    newPurchaseSubtitle: "Tu nuevo paquete ya está disponible. Haz clic abajo para acceder.",
    team: "Equipo Educly",
    rights: "Todos los derechos reservados.",
    help: "Ayuda",
    privacy: "Privacidad",
  },
  fr: {
    subject: "🔓 Accès Accordé — Educly",
    heroTitle: "Votre compte est prêt.",
    heroSubtitle: "Cliquez sur le bouton ci-dessous pour vous connecter instantanément.",
    cta: "Accéder à Mon Compte",
    credentialsTitle: "VOS IDENTIFIANTS",
    credentialsNote: "Référence uniquement — gardez-le en sécurité",
    credentialsEmail: "E-mail",
    credentialsPassword: "Mot de passe",
    credentialsChangeNote: "Vous pouvez modifier votre mot de passe à tout moment dans l'application.",
    newPurchaseTitle: "Nouvel achat activé !",
    newPurchaseSubtitle: "Votre nouveau forfait est disponible. Cliquez ci-dessous pour y accéder.",
    team: "Équipe Educly",
    rights: "Tous droits réservés.",
    help: "Aide",
    privacy: "Confidentialité",
  },
  de: {
    subject: "🔓 Zugang Freigeschaltet — Educly",
    heroTitle: "Ihr Konto ist bereit.",
    heroSubtitle: "Klicken Sie auf die Schaltfläche unten, um sich sofort anzumelden.",
    cta: "Auf Mein Konto Zugreifen",
    credentialsTitle: "IHRE ZUGANGSDATEN",
    credentialsNote: "Nur zur Referenz — sicher aufbewahren",
    credentialsEmail: "E-Mail",
    credentialsPassword: "Passwort",
    credentialsChangeNote: "Sie können Ihr Passwort jederzeit in der App ändern.",
    newPurchaseTitle: "Neuer Kauf aktiviert!",
    newPurchaseSubtitle: "Ihr neues Paket ist jetzt verfügbar. Klicken Sie unten, um darauf zuzugreifen.",
    team: "Educly Team",
    rights: "Alle Rechte vorbehalten.",
    help: "Hilfe",
    privacy: "Datenschutz",
  },
  it: {
    subject: "🎉 Benvenuto su Educly!",
    heroTitle: "Il tuo account è pronto.",
    heroSubtitle: "Clicca sul pulsante qui sotto per accedere direttamente, senza password.",
    cta: "Accedi al Mio Account",
    credentialsTitle: "LE TUE CREDENZIALI",
    credentialsNote: "Solo riferimento — conserva in sicurezza",
    credentialsEmail: "E-mail",
    credentialsPassword: "Password",
    credentialsChangeNote: "Puoi cambiare la password in qualsiasi momento nell'app.",
    newPurchaseTitle: "Nuovo acquisto attivato!",
    newPurchaseSubtitle: "Il tuo nuovo pacchetto è ora disponibile. Clicca sotto per accedere.",
    team: "Team Educly",
    rights: "Tutti i diritti riservati.",
    help: "Aiuto",
    privacy: "Privacy",
  },
  ru: {
    subject: "🎉 Добро пожаловать в Educly!",
    heroTitle: "Ваш аккаунт готов.",
    heroSubtitle: "Нажмите кнопку ниже, чтобы войти мгновенно, без пароля.",
    cta: "Войти в Мой Аккаунт",
    credentialsTitle: "ВАШИ ДАННЫЕ ДЛЯ ВХОДА",
    credentialsNote: "Только для справки — храните в безопасности",
    credentialsEmail: "E-mail",
    credentialsPassword: "Пароль",
    credentialsChangeNote: "Вы можете изменить пароль в любое время в приложении.",
    newPurchaseTitle: "Новая покупка активирована!",
    newPurchaseSubtitle: "Ваш новый пакет теперь доступен. Нажмите ниже для доступа.",
    team: "Команда Educly",
    rights: "Все права защищены.",
    help: "Помощь",
    privacy: "Конфиденциальность",
  },
};

function t(lang: string, key: string): string {
  const n = lang.toLowerCase().split("-")[0];
  return TRANSLATIONS[n]?.[key] || TRANSLATIONS["en"]?.[key] || "";
}

function getEmailHtml(params: {
  userName: string;
  userEmail: string;
  language: string;
  mode: string;
  accessUrl?: string;
  generatedPassword?: string;
}): string {
  const { userName, userEmail, language, mode, accessUrl, generatedPassword } = params;
  const lang = language.toLowerCase().split("-")[0];

  const ctaUrl = mode === 'legacy'
    ? `https://educly.app/cadastro?email=${encodeURIComponent(userEmail)}&lang=${lang}`
    : (accessUrl || `https://educly.app/auth?email=${encodeURIComponent(userEmail)}`);

  const isExisting = mode === 'magic_link_existing';
  const headline = isExisting ? t(lang, "newPurchaseTitle") : t(lang, "heroTitle");
  const subtitle = isExisting ? t(lang, "newPurchaseSubtitle") : t(lang, "heroSubtitle");

  // Credentials block for new accounts
  let credentialsBlock = '';
  if (mode === 'magic_link' && generatedPassword) {
    credentialsBlock = `
    <!-- Divider -->
    <tr><td style="padding:0 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="height:1px;background:rgba(255,255,255,0.07);"></td>
      </tr></table>
    </td></tr>
    <!-- Credentials -->
    <tr><td style="padding:24px 40px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;">
        <tr><td style="padding:12px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.07);">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;margin:0;">${t(lang,'credentialsTitle')}</p>
        </td></tr>
        <tr><td style="padding:0;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;margin:0;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.07);">${t(lang,'credentialsNote')}</p>
        </td></tr>
        <tr><td style="padding:13px 16px;border-bottom:1px solid rgba(255,255,255,0.07);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;font-weight:500;width:70px;">${t(lang,'credentialsEmail')}</td>
            <td style="font-family:'Courier New',monospace;font-size:13px;color:#e8eaf0;text-align:right;">${userEmail}</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:13px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;font-weight:500;width:70px;">${t(lang,'credentialsPassword')}</td>
            <td style="font-family:'Courier New',monospace;font-size:13px;color:#e8eaf0;text-align:right;">${generatedPassword}</td>
          </tr></table>
        </td></tr>
      </table>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;margin:10px 0 0;line-height:1.5;">${t(lang,'credentialsChangeNote')}</p>
    </td></tr>`;
  }

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#07080f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#07080f;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<!-- Card -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f1120;border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:40px 40px 36px;border-bottom:1px solid rgba(255,255,255,0.07);background:linear-gradient(135deg,rgba(79,110,247,0.12) 0%,transparent 60%);">
  <!-- Logo -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr>
    <td style="width:36px;height:36px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);border-radius:10px;text-align:center;vertical-align:middle;font-size:16px;">🎓</td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#e8eaf0;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <!-- Headline -->
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:28px;font-weight:800;color:#e8eaf0;line-height:1.15;letter-spacing:-0.03em;margin:0 0 10px;">${headline}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${subtitle}</p>
</td></tr>

<!-- Body -->
<tr><td style="padding:36px 40px 32px;">
  <!-- CTA Button -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;"><tr><td>
    <a href="${ctaUrl}" style="display:block;text-align:center;background:linear-gradient(135deg,#4f6ef7 0%,#6366f1 100%);color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;font-size:15px;font-weight:700;padding:17px 28px;border-radius:14px;letter-spacing:0.01em;">${t(lang,'cta')} →</a>
  </td></tr></table>
</td></tr>

${credentialsBlock}

<!-- Footer -->
<tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.07);">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;">© 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;">${t(lang,'help')}</a>
      <span style="color:#6b7280;font-size:12px;padding:0 8px;">·</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;">${t(lang,'privacy')}</a>
    </td>
  </tr></table>
</td></tr>

</table>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

async function sendEmailViaSMTP(to: string, subject: string, html: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Educly <noreply@educly.app>", to: [to], subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${res.status} - ${err}`);
  }
  console.log(`[Resend] Email sent successfully to ${to}`);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const body = await req.json();
    const { email, userName, language } = body;
    const mode: string = body.mode || 'legacy';
    const accessToken: string | undefined = body.access_token;
    const generatedPassword: string | undefined = body.generated_password;

    if (!email || !userName) {
      return new Response(JSON.stringify({ error: "Missing required fields: email, userName" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[send-welcome-email] Request for ${email}, user: ${userName}, lang: ${language}, mode: ${mode}`);

    const emailType = mode === 'legacy' ? 'welcome' : 'magic_link';
    const dedupType = mode === 'magic_link_existing' ? null : emailType;

    if (dedupType) {
      const { data: existingLog } = await supabaseAdmin
        .from("email_logs")
        .select("id")
        .eq("recipient_email", email.toLowerCase().trim())
        .eq("email_type", dedupType)
        .maybeSingle();

      if (existingLog) {
        console.log(`[send-welcome-email] Already sent ${dedupType} to ${email}, skipping`);
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const normalizedLang = (language || "en").toLowerCase().split("-")[0];
    const subject = t(normalizedLang, "subject");
    const accessUrl = accessToken
      ? `https://educly.app/magic-login?token=${accessToken}`
      : undefined;
    const html = getEmailHtml({
      userName,
      userEmail: email,
      language: normalizedLang,
      mode,
      accessUrl,
      generatedPassword,
    });

    const { data: logEntry } = await supabaseAdmin
      .from("email_logs")
      .insert({
        recipient_email: email.toLowerCase().trim(),
        email_type: emailType,
        subject,
        status: "pending",
        metadata: { mode },
      })
      .select("id")
      .single();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const trackingPixel = logEntry
      ? `<img src="${supabaseUrl}/functions/v1/track-email-open?id=${logEntry.id}" width="1" height="1" style="display:none" alt=""/>`
      : "";
    const htmlWithTracking = html.replace("</body>", `${trackingPixel}</body>`);

    await sendEmailViaSMTP(email, subject, htmlWithTracking);

    if (logEntry) {
      await supabaseAdmin
        .from("email_logs")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", logEntry.id);
    }

    console.log(`[send-welcome-email] Email sent to ${email} (mode=${mode})`);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[send-welcome-email] Error:", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
