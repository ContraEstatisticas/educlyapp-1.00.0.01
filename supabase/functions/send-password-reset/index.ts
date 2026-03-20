import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  language?: string;
}

const TRANSLATIONS: Record<
  string,
  {
    subject: string;
    title: string;
    greeting: string;
    intro: string;
    buttonText: string;
    ignore: string;
    footer: string;
    privacyPolicy: string;
    termsOfUse: string;
  }
> = {
  pt: {
    subject: "🔐 Redefinir sua senha - Educly",
    title: "Redefinir Senha",
    greeting: "Olá",
    intro: "Recebemos uma solicitação para redefinir a senha da sua conta Educly. Use o botão abaixo para criar uma nova senha:",
    buttonText: "Redefinir Minha Senha",
    ignore: "Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá inalterada.",
    footer: "© 2025 Educly. Todos os direitos reservados.",
    privacyPolicy: "Política de Privacidade",
    termsOfUse: "Termos de Uso",
  },
  en: {
    subject: "🔐 Reset Your Password - Educly",
    title: "Reset Password",
    greeting: "Hello",
    intro: "We received a request to reset your Educly account password. Use the button below to create a new password:",
    buttonText: "Reset My Password",
    ignore: "If you didn't request a password reset, please ignore this email. Your password will remain unchanged.",
    footer: "© 2025 Educly. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
  },
  es: {
    subject: "🔐 Restablecer tu contraseña - Educly",
    title: "Restablecer Contraseña",
    greeting: "Hola",
    intro: "Recibimos una solicitud para restablecer la contraseña de tu cuenta Educly. Usa el botón de abajo para crear una nueva contraseña:",
    buttonText: "Restablecer Mi Contraseña",
    ignore: "Si no solicitaste el restablecimiento de contraseña, ignora este correo. Tu contraseña permanecerá sin cambios.",
    footer: "© 2025 Educly. Todos los derechos reservados.",
    privacyPolicy: "Política de Privacidad",
    termsOfUse: "Términos de Uso",
  },
  fr: {
    subject: "🔐 Réinitialiser votre mot de passe - Educly",
    title: "Réinitialiser le Mot de Passe",
    greeting: "Bonjour",
    intro: "Nous avons reçu une demande de réinitialisation du mot de passe de votre compte Educly. Utilisez le bouton ci-dessous pour créer un nouveau mot de passe:",
    buttonText: "Réinitialiser Mon Mot de Passe",
    ignore: "Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email. Votre mot de passe restera inchangé.",
    footer: "© 2025 Educly. Tous droits réservés.",
    privacyPolicy: "Politique de Confidentialité",
    termsOfUse: "Conditions d'Utilisation",
  },
  de: {
    subject: "🔐 Passwort zurücksetzen - Educly",
    title: "Passwort Zurücksetzen",
    greeting: "Hallo",
    intro: "Wir haben eine Anfrage erhalten, das Passwort für Ihr Educly-Konto zurückzusetzen. Klicken Sie auf die Schaltfläche unten, um ein neues Passwort zu erstellen:",
    buttonText: "Mein Passwort Zurücksetzen",
    ignore: "Wenn Sie keine Passwortzurücksetzung angefordert haben, ignorieren Sie diese E-Mail. Ihr Passwort bleibt unverändert.",
    footer: "© 2025 Educly. Alle Rechte vorbehalten.",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfUse: "Nutzungsbedingungen",
  },
  it: {
    subject: "🔐 Reimposta la tua password - Educly",
    title: "Reimposta Password",
    greeting: "Ciao",
    intro: "Abbiamo ricevuto una richiesta per reimpostare la password del tuo account Educly. Usa il pulsante qui sotto per creare una nuova password:",
    buttonText: "Reimposta La Mia Password",
    ignore: "Se non hai richiesto la reimpostazione della password, ignora questa email. La tua password rimarrà invariata.",
    footer: "© 2025 Educly. Tutti i diritti riservati.",
    privacyPolicy: "Informativa sulla Privacy",
    termsOfUse: "Termini di Utilizzo",
  },
  ru: {
    subject: "🔐 Сбросить пароль - Educly",
    title: "Сброс Пароля",
    greeting: "Здравствуйте",
    intro: "Мы получили запрос на сброс пароля вашей учетной записи Educly. Нажмите кнопку ниже, чтобы создать новый пароль:",
    buttonText: "Сбросить Мой Пароль",
    ignore: "Если вы не запрашивали сброс пароля, проигнорируйте это письмо. Ваш пароль останется без изменений.",
    footer: "© 2025 Educly. Все права защищены.",
    privacyPolicy: "Политика Конфиденциальности",
    termsOfUse: "Условия Использования",
  },
};

function getTranslation(lang: string): (typeof TRANSLATIONS)["en"] {
  const normalizedLang = lang?.substring(0, 2).toLowerCase() || "en";
  return TRANSLATIONS[normalizedLang] || TRANSLATIONS["en"];
}

function getEmailTemplate(resetLink: string, language: string, userName?: string): string {
  const t = getTranslation(language);
  const displayName = userName || "";
  const greetingText = displayName ? `${t.greeting}, ${displayName}!` : `${t.greeting}!`;

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #07080f;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #07080f;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">

          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="font-size: 28px; font-weight: 700; color: #e8eaf0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    🎓 Educly<span style="color: #f59e0b;">.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f1120; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;">

                <!-- Accent bar -->
                <tr>
                  <td style="height: 3px; background: linear-gradient(90deg, #4f6ef7, #6366f1, #4f6ef7); border-radius: 16px 16px 0 0; font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>

                <!-- Card Content -->
                <tr>
                  <td style="padding: 40px 36px;">

                    <!-- Title -->
                    <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #e8eaf0; text-align: center;">
                      🔐 ${t.title}
                    </h1>

                    <!-- Divider -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
                      <tr>
                        <td style="height: 1px; background-color: rgba(255,255,255,0.06);"></td>
                      </tr>
                    </table>

                    <!-- Greeting -->
                    <p style="margin: 0 0 16px; font-size: 16px; color: #e8eaf0; font-weight: 600;">
                      ${greetingText}
                    </p>

                    <!-- Intro -->
                    <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #9ca3af;">
                      ${t.intro}
                    </p>

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 28px;">
                      <tr>
                        <td style="text-align: center;">
                          <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 14px 36px; background: linear-gradient(135deg, #4f6ef7 0%, #6366f1 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 10px; box-shadow: 0 4px 14px rgba(79, 110, 247, 0.4);">
                            ${t.buttonText}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Ignore Notice -->
                    <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280; text-align: center;">
                      ${t.ignore}
                    </p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 28px 0 0; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #4b5563;">
                ${t.footer}
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="https://educly.app/politica-privacidade" style="color: #6b7280; text-decoration: none;">${t.privacyPolicy}</a>
                <span style="color: #374151; margin: 0 6px;">·</span>
                <a href="https://educly.app/termos-uso" style="color: #6b7280; text-decoration: none;">${t.termsOfUse}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function normalizeRecoveryLink(link: string): string {
  if (!link) return link;
  try {
    const url = new URL(link);
    if (url.hostname.endsWith("supabase.co") && !url.hostname.endsWith(".supabase.co")) {
      url.hostname = url.hostname.replace(/supabase\.co$/, ".supabase.co");
      return url.toString();
    }
    return link;
  } catch {
    return link;
  }
}

function buildRecoveryLink(rawLink: string, supabaseUrl: string): string {
  if (!rawLink) return rawLink;
  const normalizedRawLink = normalizeRecoveryLink(rawLink);
  try {
    const raw = new URL(normalizedRawLink);
    const supabaseOrigin = new URL(supabaseUrl).origin;
    const token = raw.searchParams.get("token");
    const type = raw.searchParams.get("type") || "recovery";
    const redirectTo = raw.searchParams.get("redirect_to");
    if (!token) return normalizedRawLink;
    const safe = new URL("/auth/v1/verify", supabaseOrigin);
    safe.searchParams.set("token", token);
    safe.searchParams.set("type", type);
    if (redirectTo) {
      safe.searchParams.set("redirect_to", redirectTo);
    }
    return safe.toString();
  } catch {
    return normalizedRawLink;
  }
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
  console.log(`Password reset email sent to ${to}`);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Processing password reset request for: ${normalizedEmail}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // --- RATE LIMIT CHECK (Max 2 emails every 10 minutes) ---
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("password_reset_attempts")
      .select("*", { count: "exact", head: true })
      .eq("email", normalizedEmail)
      .gte("created_at", tenMinutesAgo);

    if (countError) {
      console.error("Error checking rate limit:", countError);
      // Proceeding despite error to be safe, but logging it
    } else if (count !== null && count >= 2) {
      console.warn(`Rate limit exceeded for ${normalizedEmail}: ${count} attempts since ${tenMinutesAgo}`);
      return new Response(JSON.stringify({ 
        error: "Muitas tentativas enviadas. Por favor, aguarde 10 minutos antes de tentar novamente." 
      }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record the attempt before proceeding
    const { error: insertError } = await supabase
      .from("password_reset_attempts")
      .insert({ email: normalizedEmail });
    
    if (insertError) {
      console.error("Error recording attempt:", insertError);
    }
    // --------------------------------------------------------

    const redirectUrl = "https://educly.app/update-password";

    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: normalizedEmail,
      options: { redirectTo: redirectUrl },
    });

    if (linkError) {
      console.error(`generateLink error for ${normalizedEmail}: ${linkError.message}`);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawResetLink = linkData.properties?.action_link || "";
    const resetLink = buildRecoveryLink(rawResetLink, supabaseUrl);

    if (!resetLink) {
      console.error("No action link generated");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (rawResetLink !== resetLink) {
      console.warn(`Normalized recovery link for ${normalizedEmail}`);
    }

    const generatedUserId = linkData.user?.id;

    let language = "en";
    let userName = "";

    if (generatedUserId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("preferred_language, full_name")
        .eq("id", generatedUserId)
        .maybeSingle();

      language = profile?.preferred_language || "en";
      userName = profile?.full_name || linkData.user?.user_metadata?.full_name || "";
    }

    const t = getTranslation(language);
    const emailHtml = getEmailTemplate(resetLink, language, userName);
    await sendEmailViaSMTP(normalizedEmail, t.subject, emailHtml);

    console.log(`Password reset email sent successfully to: ${normalizedEmail}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset:", error);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

Deno.serve(handler);
