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
    cta: "Acessar",
    ctaNote: "Acesse com apenas 1 clique",
    directLogin: "Logue diretamente aqui",
    manualLogin: "Ou logue usando seus dados",
    manualAccessLink: "Acessar com seus dados",
    credentialsTitle: "Seus dados de acesso",
    credentialsEmail: "Usuário",
    credentialsPassword: "Senha",
    credentialsChangeNote: "Você pode alterar sua senha a qualquer momento dentro do app.",
    newPurchaseTitle: "Nova compra ativada!",
    newPurchaseSubtitle: "Seu novo pacote já está disponível. Clique abaixo para acessar.",
    accessBelow: "Acesse através do botão abaixo",
    copyLink: "Ou acesse diretamente:",
    team: "Equipe Educly",
    rights: "Todos os direitos reservados.",
    help: "Ajuda",
    privacy: "Privacidade",
    supportText: "Precisa de ajuda? Entre em contato:",
  },
  en: {
    subject: "🔓 Access Granted — Educly",
    heroTitle: "Your account is ready to go.",
    heroSubtitle: "Click the button below to sign in instantly, no password needed.",
    cta: "Sign In",
    ctaNote: "Access with just 1 click",
    directLogin: "Sign in directly here",
    manualLogin: "Or sign in with your credentials",
    manualAccessLink: "Sign in with your credentials",
    credentialsTitle: "Your access details",
    credentialsEmail: "User",
    credentialsPassword: "Password",
    credentialsChangeNote: "You can change your password anytime inside the app.",
    newPurchaseTitle: "New purchase activated!",
    newPurchaseSubtitle: "Your new package is now available. Click below to access.",
    accessBelow: "Access through the button below",
    copyLink: "Or access directly:",
    team: "Educly Team",
    rights: "All rights reserved.",
    help: "Help",
    privacy: "Privacy",
    supportText: "Need help? Get in touch:",
  },
  es: {
    subject: "🔓 Acceso Liberado — Educly",
    heroTitle: "Tu cuenta está lista.",
    heroSubtitle: "Haz clic en el botón de abajo para entrar directamente, sin necesidad de contraseña.",
    cta: "Acceder",
    ctaNote: "Accede con solo 1 clic",
    directLogin: "Inicia sesión directamente aquí",
    manualLogin: "O inicia sesión con tus datos",
    manualAccessLink: "Acceder con tus datos",
    credentialsTitle: "Tus datos de acceso",
    credentialsEmail: "Usuario",
    credentialsPassword: "Contraseña",
    credentialsChangeNote: "Puedes cambiar tu contraseña en cualquier momento dentro de la app.",
    newPurchaseTitle: "¡Nueva compra activada!",
    newPurchaseSubtitle: "Tu nuevo paquete ya está disponible. Haz clic abajo para acceder.",
    accessBelow: "Accede a través del botón de abajo",
    copyLink: "O accede directamente:",
    team: "Equipo Educly",
    rights: "Todos los derechos reservados.",
    help: "Ayuda",
    privacy: "Privacidad",
    supportText: "¿Necesitas ayuda? Contáctanos:",
  },
  fr: {
    subject: "🔓 Accès Accordé — Educly",
    heroTitle: "Votre compte est prêt.",
    heroSubtitle: "Cliquez sur le bouton ci-dessous pour vous connecter instantanément.",
    cta: "Accéder",
    ctaNote: "Accédez en 1 seul clic",
    directLogin: "Connectez-vous directement ici",
    manualLogin: "Ou connectez-vous avec vos identifiants",
    manualAccessLink: "Se connecter avec vos identifiants",
    credentialsTitle: "Vos données d'accès",
    credentialsEmail: "Utilisateur",
    credentialsPassword: "Mot de passe",
    credentialsChangeNote: "Vous pouvez modifier votre mot de passe à tout moment dans l'application.",
    newPurchaseTitle: "Nouvel achat activé !",
    newPurchaseSubtitle: "Votre nouveau forfait est disponible. Cliquez ci-dessous pour y accéder.",
    accessBelow: "Accédez via le bouton ci-dessous",
    copyLink: "Ou accédez directement :",
    team: "Équipe Educly",
    rights: "Tous droits réservés.",
    help: "Aide",
    privacy: "Confidentialité",
    supportText: "Besoin d'aide ? Contactez-nous :",
  },
  de: {
    subject: "🔓 Zugang Freigeschaltet — Educly",
    heroTitle: "Ihr Konto ist bereit.",
    heroSubtitle: "Klicken Sie auf die Schaltfläche unten, um sich sofort anzumelden.",
    cta: "Zugreifen",
    directLogin: "Melden Sie sich direkt hier an",
    manualLogin: "Oder melden Sie sich mit Ihren Daten an",
    manualAccessLink: "Mit Ihren Daten anmelden",
    credentialsTitle: "Ihre Zugangsdaten",
    credentialsEmail: "Benutzer",
    credentialsPassword: "Passwort",
    credentialsChangeNote: "Sie können Ihr Passwort jederzeit in der App ändern.",
    newPurchaseTitle: "Neuer Kauf aktiviert!",
    newPurchaseSubtitle: "Ihr neues Paket ist jetzt verfügbar. Klicken Sie unten, um darauf zuzugreifen.",
    accessBelow: "Zugang über den Button unten",
    copyLink: "Oder greifen Sie direkt zu:",
    team: "Educly Team",
    rights: "Alle Rechte vorbehalten.",
    help: "Hilfe",
    privacy: "Datenschutz",
    supportText: "Brauchen Sie Hilfe? Kontaktieren Sie uns:",
  },
  it: {
    subject: "🔓 Accesso Sbloccato — Educly",
    heroTitle: "Il tuo account è pronto.",
    heroSubtitle: "Clicca sul pulsante qui sotto per accedere direttamente, senza password.",
    cta: "Accedi",
    directLogin: "Accedi direttamente qui",
    manualLogin: "Oppure accedi con i tuoi dati",
    manualAccessLink: "Accedi con i tuoi dati",
    credentialsTitle: "I tuoi dati di accesso",
    credentialsEmail: "Utente",
    credentialsPassword: "Password",
    credentialsChangeNote: "Puoi cambiare la password in qualsiasi momento nell'app.",
    newPurchaseTitle: "Nuovo acquisto attivato!",
    newPurchaseSubtitle: "Il tuo nuovo pacchetto è ora disponibile. Clicca sotto per accedere.",
    accessBelow: "Accedi tramite il pulsante qui sotto",
    copyLink: "Oppure accedi direttamente:",
    team: "Team Educly",
    rights: "Tutti i diritti riservati.",
    help: "Aiuto",
    privacy: "Privacy",
    supportText: "Hai bisogno di aiuto? Contattaci:",
  },
  ru: {
    subject: "🔓 Доступ Открыт — Educly",
    heroTitle: "Ваш аккаунт готов.",
    heroSubtitle: "Нажмите кнопку ниже, чтобы войти мгновенно, без пароля.",
    cta: "Войти",
    directLogin: "Войдите напрямую здесь",
    manualLogin: "Или войдите с вашими данными",
    manualAccessLink: "Войти с вашими данными",
    credentialsTitle: "Ваши данные для входа",
    credentialsEmail: "Пользователь",
    credentialsPassword: "Пароль",
    credentialsChangeNote: "Вы можете изменить пароль в любое время в приложении.",
    newPurchaseTitle: "Новая покупка активирована!",
    newPurchaseSubtitle: "Ваш новый пакет теперь доступен. Нажмите ниже для доступа.",
    accessBelow: "Войдите через кнопку ниже",
    copyLink: "Или перейдите напрямую:",
    team: "Команда Educly",
    rights: "Все права защищены.",
    help: "Помощь",
    privacy: "Конфиденциальность",
    supportText: "Нужна помощь? Свяжитесь с нами:",
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

  const authUrl = "https://educly.app/auth";

  // Manual credentials block (for new accounts with password)
  let manualBlock = '';
  if (mode === 'magic_link' && generatedPassword) {
    manualBlock = `
    <!-- Divider -->
    <tr><td style="padding:0 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="height:1px;background:#e5e7eb;"></td>
      </tr></table>
    </td></tr>
    <!-- Manual Login Section -->
    <tr><td style="padding:28px 40px 0;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">${t(lang,'manualLogin')}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${t(lang,'credentialsEmail')}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${userEmail}</p>
        </td></tr>
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${t(lang,'credentialsPassword')}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${generatedPassword}</p>
        </td></tr>
      </table>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:4px 0 16px;line-height:1.5;">${t(lang,'credentialsChangeNote')}</p>
      <!-- Manual access button -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;"><tr><td style="border:2px solid #1f2937;border-radius:12px;text-align:center;">
        <a href="${authUrl}" target="_blank" style="display:block;color:#1f2937;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;padding:14px 28px;">${t(lang,'manualAccessLink')} →</a>
      </td></tr></table>
    </td></tr>`;
  }

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<!-- Card -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:40px 40px 32px;border-bottom:1px solid #e5e7eb;">
  <!-- Logo -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr>
    <td style="width:36px;height:36px;vertical-align:middle;"><img src="https://educly.app/images/corujaLogo.svg" width="36" height="36" alt="Educly" style="display:block;border:0;" /></td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#111827;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <!-- Headline -->
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:26px;font-weight:800;color:#111827;line-height:1.2;letter-spacing:-0.02em;margin:0 0 8px;">${headline}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${subtitle}</p>
</td></tr>

<!-- Direct Login Section -->
<tr><td style="padding:28px 40px 24px;">
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px;">${t(lang,'directLogin')}</p>
  <!-- CTA Button -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#1f2937;border-radius:12px;text-align:center;">
    <a href="${ctaUrl}" target="_blank" style="display:block;color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;font-size:15px;font-weight:700;padding:16px 28px;">${t(lang,'cta')} →</a>
  </td></tr></table>
</td></tr>

${manualBlock}

<!-- Support -->
<tr><td style="padding:20px 40px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border-radius:10px;">
    <tr><td style="padding:16px 20px;text-align:center;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 4px;">📩 ${t(lang,'supportText')}</p>
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:600;color:#7c3aed;text-decoration:underline;">contact@educly.app</a>
    </td></tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#9ca3af;">© 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${t(lang,'help')}</a>
      <span style="color:#9ca3af;font-size:12px;padding:0 8px;">·</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${t(lang,'privacy')}</a>
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
