import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getWelcomeReminderSubject,
  renderWelcomeReminderEmail,
} from "../_shared/welcome-reminder-email.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const REMINDER_DELAY_HOURS = 6;

type EmailMode =
  | "legacy"
  | "magic_link"
  | "magic_link_existing"
  | "magic_link_reminder";

const TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    subject: "Seu acesso foi liberado - Educly",
    subjectReminder: "Seu acesso ainda esta te esperando - Educly",
    heroTitle: "Sua conta esta pronta.",
    heroSubtitle: "Clique no botao abaixo para entrar direto na sua conta, sem precisar de senha.",
    heroTitleReminder: "Seu acesso ainda esta te esperando.",
    heroSubtitleReminder:
      "Percebemos que voce ainda nao entrou. Clique abaixo para acessar sua conta direto, sem precisar de senha.",
    cta: "Acessar",
    ctaNote: "Acesse com 1 clique",
    directLogin: "Entre diretamente aqui",
    manualLogin: "Ou entre com seus dados",
    manualAccessLink: "Acessar com seus dados",
    credentialsEmail: "Usuario",
    credentialsPassword: "Senha",
    credentialsChangeNote: "Voce pode alterar sua senha a qualquer momento dentro do app.",
    newPurchaseTitle: "Nova compra ativada!",
    newPurchaseSubtitle: "Seu novo pacote ja esta disponivel. Clique abaixo para acessar.",
    help: "Ajuda",
    privacy: "Privacidade",
    supportText: "Precisa de ajuda? Entre em contato:",
  },
  en: {
    subject: "Your access has been unlocked - Educly",
    subjectReminder: "Your access is still waiting - Educly",
    heroTitle: "Your account is ready.",
    heroSubtitle: "Click the button below to sign in instantly, no password needed.",
    heroTitleReminder: "Your access is still waiting for you.",
    heroSubtitleReminder:
      "We noticed that you have not signed in yet. Click below to access your account instantly, no password needed.",
    cta: "Sign in",
    ctaNote: "Access with 1 click",
    directLogin: "Sign in directly here",
    manualLogin: "Or sign in with your credentials",
    manualAccessLink: "Sign in with your credentials",
    credentialsEmail: "User",
    credentialsPassword: "Password",
    credentialsChangeNote: "You can change your password anytime inside the app.",
    newPurchaseTitle: "New purchase activated!",
    newPurchaseSubtitle: "Your new package is now available. Click below to access it.",
    help: "Help",
    privacy: "Privacy",
    supportText: "Need help? Get in touch:",
  },
  es: {
    subject: "Tu acceso fue liberado - Educly",
    subjectReminder: "Tu acceso aun te esta esperando - Educly",
    heroTitle: "Tu cuenta esta lista.",
    heroSubtitle: "Haz clic en el boton de abajo para entrar directamente, sin necesidad de contrasena.",
    heroTitleReminder: "Tu acceso aun te esta esperando.",
    heroSubtitleReminder:
      "Notamos que todavia no entraste. Haz clic abajo para acceder a tu cuenta directamente, sin necesidad de contrasena.",
    cta: "Acceder",
    ctaNote: "Accede con 1 clic",
    directLogin: "Inicia sesion directamente aqui",
    manualLogin: "O inicia sesion con tus datos",
    manualAccessLink: "Acceder con tus datos",
    credentialsEmail: "Usuario",
    credentialsPassword: "Contrasena",
    credentialsChangeNote: "Puedes cambiar tu contrasena en cualquier momento dentro de la app.",
    newPurchaseTitle: "Nueva compra activada!",
    newPurchaseSubtitle: "Tu nuevo paquete ya esta disponible. Haz clic abajo para acceder.",
    help: "Ayuda",
    privacy: "Privacidad",
    supportText: "Necesitas ayuda? Contactanos:",
  },
  fr: {
    subject: "Votre acces a ete libere - Educly",
    subjectReminder: "Votre acces vous attend encore - Educly",
    heroTitle: "Votre compte est pret.",
    heroSubtitle: "Cliquez sur le bouton ci-dessous pour vous connecter instantanement.",
    heroTitleReminder: "Votre acces vous attend encore.",
    heroSubtitleReminder:
      "Nous avons remarque que vous ne vous etes pas encore connecte. Cliquez ci-dessous pour acceder directement a votre compte.",
    cta: "Acceder",
    ctaNote: "Accedez en 1 clic",
    directLogin: "Connectez-vous directement ici",
    manualLogin: "Ou connectez-vous avec vos identifiants",
    manualAccessLink: "Se connecter avec vos identifiants",
    credentialsEmail: "Utilisateur",
    credentialsPassword: "Mot de passe",
    credentialsChangeNote: "Vous pouvez modifier votre mot de passe a tout moment dans l'application.",
    newPurchaseTitle: "Nouvel achat active!",
    newPurchaseSubtitle: "Votre nouveau pack est disponible. Cliquez ci-dessous pour y acceder.",
    help: "Aide",
    privacy: "Confidentialite",
    supportText: "Besoin d'aide? Contactez-nous:",
  },
  de: {
    subject: "Ihr Zugang wurde freigeschaltet - Educly",
    subjectReminder: "Ihr Zugang wartet noch auf Sie - Educly",
    heroTitle: "Ihr Konto ist bereit.",
    heroSubtitle: "Klicken Sie auf die Schaltflaeche unten, um sich sofort anzumelden.",
    heroTitleReminder: "Ihr Zugang wartet noch auf Sie.",
    heroSubtitleReminder:
      "Wir haben gesehen, dass Sie sich noch nicht angemeldet haben. Klicken Sie unten, um direkt auf Ihr Konto zuzugreifen.",
    cta: "Zugreifen",
    ctaNote: "Zugriff mit 1 Klick",
    directLogin: "Melden Sie sich direkt hier an",
    manualLogin: "Oder melden Sie sich mit Ihren Daten an",
    manualAccessLink: "Mit Ihren Daten anmelden",
    credentialsEmail: "Benutzer",
    credentialsPassword: "Passwort",
    credentialsChangeNote: "Sie koennen Ihr Passwort jederzeit in der App aendern.",
    newPurchaseTitle: "Neuer Kauf aktiviert!",
    newPurchaseSubtitle: "Ihr neues Paket ist jetzt verfuegbar. Klicken Sie unten fuer den Zugriff.",
    help: "Hilfe",
    privacy: "Datenschutz",
    supportText: "Brauchen Sie Hilfe? Kontaktieren Sie uns:",
  },
  it: {
    subject: "Il tuo accesso e stato sbloccato - Educly",
    subjectReminder: "Il tuo accesso ti sta ancora aspettando - Educly",
    heroTitle: "Il tuo account e pronto.",
    heroSubtitle: "Clicca sul pulsante qui sotto per accedere direttamente, senza password.",
    heroTitleReminder: "Il tuo accesso ti sta ancora aspettando.",
    heroSubtitleReminder:
      "Abbiamo notato che non sei ancora entrato. Clicca qui sotto per accedere direttamente al tuo account.",
    cta: "Accedi",
    ctaNote: "Accedi con 1 clic",
    directLogin: "Accedi direttamente qui",
    manualLogin: "Oppure accedi con i tuoi dati",
    manualAccessLink: "Accedi con i tuoi dati",
    credentialsEmail: "Utente",
    credentialsPassword: "Password",
    credentialsChangeNote: "Puoi cambiare la password in qualsiasi momento nell'app.",
    newPurchaseTitle: "Nuovo acquisto attivato!",
    newPurchaseSubtitle: "Il tuo nuovo pacchetto e ora disponibile. Clicca sotto per accedere.",
    help: "Aiuto",
    privacy: "Privacy",
    supportText: "Hai bisogno di aiuto? Contattaci:",
  },
  ru: {
    subject: "Vash dostup otkryt - Educly",
    subjectReminder: "Vash dostup vse eshche zhdet vas - Educly",
    heroTitle: "Vash akkaunt gotov.",
    heroSubtitle: "Nazhmite knopku nizhe, chtoby voiti srazu bez parolya.",
    heroTitleReminder: "Vash dostup vse eshche zhdet vas.",
    heroSubtitleReminder:
      "My zametili, chto vy eshche ne voshli. Nazhmite knopku nizhe, chtoby srazu otkryt akkaunt.",
    cta: "Voiti",
    ctaNote: "Voiti v 1 klik",
    directLogin: "Voiti pryamo zdes",
    manualLogin: "Ili voiti s vashimi dannymi",
    manualAccessLink: "Voiti s vashimi dannymi",
    credentialsEmail: "Polzovatel",
    credentialsPassword: "Parol",
    credentialsChangeNote: "Vy mozhete izmenit parol v lyuboi moment v prilozhenii.",
    newPurchaseTitle: "Novaya pokupka aktivirovana!",
    newPurchaseSubtitle: "Vash novyi paket uzhe dostupen. Nazhmite nizhe dlya dostupa.",
    help: "Pomoshch",
    privacy: "Privatnost",
    supportText: "Nuzhna pomoshch? Svyazhites s nami:",
  },
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeMetadata = (value: unknown): Record<string, unknown> =>
  isObjectRecord(value) ? { ...value } : {};

const t = (lang: string, key: string): string => {
  const normalizedLang = lang.toLowerCase().split("-")[0];
  return TRANSLATIONS[normalizedLang]?.[key] || TRANSLATIONS.en[key] || "";
};

const getEmailHtml = (params: {
  userEmail: string;
  language: string;
  mode: EmailMode;
  accessUrl?: string;
  generatedPassword?: string;
}) => {
  const { userEmail, language, mode, accessUrl, generatedPassword } = params;
  const lang = language.toLowerCase().split("-")[0];
  const authUrl = "https://educly.app/auth";
  const isExisting = mode === "magic_link_existing";
  const isReminder = mode === "magic_link_reminder";

  const ctaUrl = mode === "legacy"
    ? `https://educly.app/cadastro?email=${encodeURIComponent(userEmail)}&lang=${lang}`
    : (accessUrl || `https://educly.app/auth?email=${encodeURIComponent(userEmail)}`);

  const headline = isReminder
    ? t(lang, "heroTitleReminder")
    : isExisting
      ? t(lang, "newPurchaseTitle")
      : t(lang, "heroTitle");
  const subtitle = isReminder
    ? t(lang, "heroSubtitleReminder")
    : isExisting
      ? t(lang, "newPurchaseSubtitle")
      : t(lang, "heroSubtitle");

  const showCredentials = (mode === "magic_link" || mode === "magic_link_reminder") && generatedPassword;

  const manualBlock = showCredentials
    ? `
    <tr><td style="padding:0 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="height:1px;background:#e5e7eb;"></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:28px 40px 0;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">${t(lang, "manualLogin")}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${t(lang, "credentialsEmail")}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${userEmail}</p>
        </td></tr>
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${t(lang, "credentialsPassword")}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${generatedPassword}</p>
        </td></tr>
      </table>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:4px 0 16px;line-height:1.5;">${t(lang, "credentialsChangeNote")}</p>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 8px;">${t(lang, "manualAccessLink")}: <a href="${authUrl}" target="_blank" style="color:#7c3aed;font-weight:600;text-decoration:underline;">${authUrl}</a></p>
    </td></tr>`
    : "";

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

<tr><td style="padding:40px 40px 32px;border-bottom:1px solid #e5e7eb;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr>
    <td style="width:36px;height:36px;vertical-align:middle;"><img src="https://educly.app/images/corujaLogo.svg" width="36" height="36" alt="Educly" style="display:block;border:0;" /></td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#111827;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:26px;font-weight:800;color:#111827;line-height:1.2;letter-spacing:-0.02em;margin:0 0 8px;">${headline}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${subtitle}</p>
</td></tr>

<tr><td style="padding:28px 40px 24px;">
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px;">${t(lang, "directLogin")}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#1f2937;border-radius:12px;text-align:center;">
    <a href="${ctaUrl}" target="_blank" style="display:block;color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;padding:16px 28px;">
      <span style="font-size:15px;font-weight:700;">${t(lang, "ctaNote")}</span><br/>
      <span style="font-size:13px;font-weight:400;opacity:0.85;">${t(lang, "cta")} -></span>
    </a>
  </td></tr></table>
</td></tr>

${manualBlock}

<tr><td style="padding:20px 40px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border-radius:10px;">
    <tr><td style="padding:16px 20px;text-align:center;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 4px;">${t(lang, "supportText")}</p>
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:600;color:#7c3aed;text-decoration:underline;">contact@educly.app</a>
    </td></tr>
  </table>
</td></tr>

<tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#9ca3af;">&copy; 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${t(lang, "help")}</a>
      <span style="color:#9ca3af;font-size:12px;padding:0 8px;">&middot;</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${t(lang, "privacy")}</a>
    </td>
  </tr></table>
</td></tr>

</table>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
};

const sendEmailViaResend = async (
  to: string,
  subject: string,
  html: string,
): Promise<{ id?: string | null; last_event?: string | null }> => {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Educly <noreply@educly.app>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${response.status} - ${errorText}`);
  }

  const payload = await response.json().catch(() => ({}));
  return {
    id: typeof payload?.id === "string" ? payload.id : null,
    last_event: typeof payload?.last_event === "string" ? payload.last_event : null,
  };
};

const resolveUserId = async (params: {
  supabaseAdmin: any;
  explicitUserId?: string | null;
  accessToken?: string | null;
}) => {
  const { supabaseAdmin, explicitUserId, accessToken } = params;

  if (explicitUserId) {
    return explicitUserId;
  }

  if (!accessToken) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("user_access_tokens")
    .select("user_id")
    .eq("token", accessToken)
    .maybeSingle();

  if (error) {
    console.error("[send-welcome-email] Failed to resolve user id from access token:", error);
    return null;
  }

  return (data as any)?.user_id ?? null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let createdLogId: string | null = null;
  let createdMetadata: Record<string, unknown> | null = null;

  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const userName = typeof body.userName === "string" && body.userName.trim().length > 0
      ? body.userName.trim()
      : "";
    const rawMode = typeof body.mode === "string" ? body.mode : "legacy";
    const mode = (["legacy", "magic_link", "magic_link_existing", "magic_link_reminder"].includes(rawMode)
      ? rawMode
      : "legacy") as EmailMode;
    const language = typeof body.language === "string" ? body.language : "en";
    const accessToken = typeof body.access_token === "string" ? body.access_token : undefined;
    const generatedPassword = typeof body.generated_password === "string"
      ? body.generated_password
      : undefined;
    const explicitUserId = typeof body.user_id === "string" ? body.user_id : null;
    const parentEmailLogId = typeof body.parent_email_log_id === "string"
      ? body.parent_email_log_id
      : null;
    const customMetadata = normalizeMetadata(body.metadata);

    if (!email || !userName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, userName" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userId = await resolveUserId({
      supabaseAdmin,
      explicitUserId,
      accessToken: accessToken || null,
    });

    // For reminder emails, always resolve language from the user's profile
    let normalizedLang = language.toLowerCase().split("-")[0] || "en";
    let languageSource = "body_param";

    if (mode === "magic_link_reminder" && userId) {
      const { data: profileData } = await supabaseAdmin
        .from("profiles")
        .select("preferred_language")
        .eq("id", userId)
        .maybeSingle();

      const profileLang = profileData?.preferred_language;
      if (typeof profileLang === "string" && profileLang.trim().length > 0) {
        const resolved = profileLang.trim().toLowerCase().split("-")[0];
        if (["pt", "en", "es", "fr", "de", "it", "ru"].includes(resolved)) {
          normalizedLang = resolved;
          languageSource = "profile";
        }
      }
    }

    // Allow override_email_type from metadata (used by welcome reminders)
    const overrideEmailType = typeof customMetadata.override_email_type === "string"
      ? customMetadata.override_email_type
      : null;
    const emailType = overrideEmailType || (mode === "legacy"
      ? "welcome"
      : mode === "magic_link_reminder"
        ? "welcome_reminder"
        : "magic_link");
    const dedupType = mode === "magic_link_existing" ? null : emailType;

    if (dedupType) {
      const { data: existingLog } = await supabaseAdmin
        .from("email_logs")
        .select("id")
        .eq("recipient_email", email)
        .eq("email_type", dedupType)
        .neq("status", "error")
        .limit(1)
        .maybeSingle();

      if (existingLog) {
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const metadata: Record<string, unknown> = {
      ...customMetadata,
      mode,
      language: normalizedLang,
      language_source: languageSource,
      user_name: userName,
    };

    if (userId) {
      metadata.user_id = userId;
    }

    if (parentEmailLogId) {
      metadata.parent_email_log_id = parentEmailLogId;
    }

    if (mode === "legacy" || mode === "magic_link") {
      metadata.source = "welcome_flow";
      metadata.welcome_reminder = {
        eligible: true,
        delay_hours: REMINDER_DELAY_HOURS,
        status: "pending",
      };
    } else if (mode === "magic_link_reminder") {
      metadata.source = "welcome_reminder";
    } else {
      metadata.source = "existing_account_purchase";
    }

    createdMetadata = metadata;

    const subject = mode === "magic_link_reminder"
      ? getWelcomeReminderSubject(normalizedLang)
      : t(normalizedLang, "subject");
    const accessUrl = accessToken
      ? `https://educly.app/magic-login?token=${accessToken}`
      : undefined;
    const html = mode === "magic_link_reminder"
      ? renderWelcomeReminderEmail({
        userEmail: email,
        language: normalizedLang,
        accessUrl,
        generatedPassword,
      })
      : getEmailHtml({
        userEmail: email,
        language: normalizedLang,
        mode,
        accessUrl,
        generatedPassword,
      });

    const { data: logEntry, error: logInsertError } = await supabaseAdmin
      .from("email_logs")
      .insert({
        recipient_email: email,
        email_type: emailType,
        subject,
        status: "pending",
        metadata,
        user_id: userId,
      })
      .select("id")
      .single();

    if (logInsertError) {
      throw logInsertError;
    }

    createdLogId = logEntry?.id ?? null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const trackingPixel = createdLogId
      ? `<img src="${supabaseUrl}/functions/v1/track-email-open?id=${createdLogId}" width="1" height="1" style="display:none" alt=""/>`
      : "";
    const htmlWithTracking = html.replace("</body>", `${trackingPixel}</body>`);

    const resendResponse = await sendEmailViaResend(email, subject, htmlWithTracking);

    if (createdLogId) {
      await supabaseAdmin
        .from("email_logs")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          metadata: {
            ...metadata,
            resend_email_id: resendResponse.id ?? null,
            resend_last_event: resendResponse.last_event ?? "sent",
            sent_via: "resend",
          },
        })
        .eq("id", createdLogId);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[send-welcome-email] Error:", error);

    if (createdLogId) {
      await supabaseAdmin
        .from("email_logs")
        .update({
          status: "error",
          error_message: errorMessage,
          metadata: {
            ...(createdMetadata || {}),
            last_error_at: new Date().toISOString(),
          },
        })
        .eq("id", createdLogId);
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
