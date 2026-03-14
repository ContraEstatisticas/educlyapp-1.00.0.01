import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const translations: Record<string, { subject: string; heading: string; body: string; cta: string; footer: string }> = {
  es: {
    subject: "🎓 Tu acceso a Educly te espera",
    heading: "¡Tu acceso a Educly está listo!",
    body: "Hemos registrado tu compra y tu acceso ya está disponible. Solo necesitas crear tu cuenta para empezar a aprender con inteligencia artificial.",
    cta: "Crear mi cuenta ahora",
    footer: "Si tienes alguna duda, responde a este email. ¡Estamos aquí para ayudarte!",
  },
  pt: {
    subject: "🎓 Seu acesso à Educly te espera",
    heading: "Seu acesso à Educly está pronto!",
    body: "Registramos sua compra e seu acesso já está disponível. Basta criar sua conta para começar a aprender com inteligência artificial.",
    cta: "Criar minha conta agora",
    footer: "Se tiver alguma dúvida, responda a este email. Estamos aqui para ajudar!",
  },
  en: {
    subject: "🎓 Your Educly access is waiting",
    heading: "Your Educly access is ready!",
    body: "We've registered your purchase and your access is already available. Just create your account to start learning with artificial intelligence.",
    cta: "Create my account now",
    footer: "If you have any questions, reply to this email. We're here to help!",
  },
  fr: {
    subject: "🎓 Votre accès Educly vous attend",
    heading: "Votre accès à Educly est prêt !",
    body: "Nous avons enregistré votre achat et votre accès est déjà disponible. Créez simplement votre compte pour commencer à apprendre avec l'intelligence artificielle.",
    cta: "Créer mon compte",
    footer: "Si vous avez des questions, répondez à cet email. Nous sommes là pour vous aider !",
  },
  de: {
    subject: "🎓 Dein Educly-Zugang wartet",
    heading: "Dein Educly-Zugang ist bereit!",
    body: "Wir haben deinen Kauf registriert und dein Zugang ist bereits verfügbar. Erstelle einfach dein Konto, um mit künstlicher Intelligenz zu lernen.",
    cta: "Mein Konto erstellen",
    footer: "Bei Fragen antworte einfach auf diese E-Mail. Wir sind hier, um zu helfen!",
  },
  it: {
    subject: "🎓 Il tuo accesso a Educly ti aspetta",
    heading: "Il tuo accesso a Educly è pronto!",
    body: "Abbiamo registrato il tuo acquisto e il tuo accesso è già disponibile. Crea il tuo account per iniziare a imparare con l'intelligenza artificiale.",
    cta: "Crea il mio account",
    footer: "Se hai domande, rispondi a questa email. Siamo qui per aiutarti!",
  },
  ru: {
    subject: "🎓 Ваш доступ к Educly ждёт вас",
    heading: "Ваш доступ к Educly готов!",
    body: "Мы зарегистрировали вашу покупку, и ваш доступ уже доступен. Просто создайте аккаунт, чтобы начать обучение с искусственным интеллектом.",
    cta: "Создать аккаунт",
    footer: "Если у вас есть вопросы, ответьте на это письмо. Мы здесь, чтобы помочь!",
  },
};

const SUPPORTED_LANGS = Object.keys(translations);

function getLang(lang: string | null | undefined): string {
  if (!lang) return "es";
  const norm = lang.trim().toLowerCase().split("-")[0];
  return SUPPORTED_LANGS.includes(norm) ? norm : "es";
}

function buildEmailHtml(t: typeof translations["es"], email: string, lang: string): string {
  const signupUrl = `https://educly.app/cadastro?email=${encodeURIComponent(email)}&lang=${lang}`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
<tr><td align="center">
<table width="100%" style="max-width:580px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
<tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;text-align:center;">
  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">${t.heading}</h1>
</td></tr>
<tr><td style="padding:32px 40px;">
  <p style="font-size:16px;line-height:1.6;color:#374151;margin:0 0 24px;">${t.body}</p>
  <div style="text-align:center;margin:32px 0;">
    <a href="${signupUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">${t.cta}</a>
  </div>
  <p style="font-size:14px;line-height:1.5;color:#6b7280;margin:24px 0 0;">${t.footer}</p>
</td></tr>
<tr><td style="padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
  <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Educly</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: isAdmin } = await supabaseAuth.rpc("is_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { emails, language } = await req.json() as {
      emails: string[];
      language?: string;
    };

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return new Response(JSON.stringify({ error: "emails array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const defaultLang = getLang(language);
    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const rawEmail of emails) {
      const email = rawEmail.trim().toLowerCase().replace(/\.+$/, "");
      if (!email.includes("@")) {
        skipped++;
        continue;
      }

      try {
        // Check if invite already sent
        const { data: existing } = await supabase
          .from("email_logs")
          .select("id")
          .eq("recipient_email", email)
          .eq("email_type", "signup_invite")
          .maybeSingle();

        if (existing) {
          skipped++;
          continue;
        }

        const lang = defaultLang;
        const t = translations[lang];
        const html = buildEmailHtml(t, email, lang);

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Educly <hola@educly.app>",
            to: [email],
            subject: t.subject,
            html,
          }),
        });

        if (!resendRes.ok) {
          const errBody = await resendRes.text();
          errors.push(`${email}: Resend ${resendRes.status} - ${errBody}`);
          continue;
        }

        // Log the sent email
        await supabase.from("email_logs").insert({
          recipient_email: email,
          email_type: "signup_invite",
          subject: t.subject,
          status: "sent",
          sent_at: new Date().toISOString(),
          metadata: { language: lang },
        });

        sent++;
      } catch (err: any) {
        errors.push(`${email}: ${err.message}`);
      }
    }

    return new Response(
      JSON.stringify({ sent, skipped, errors, total: emails.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("send-signup-invite error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
