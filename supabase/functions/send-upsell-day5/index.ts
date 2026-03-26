import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_LANGUAGE = "en";

const TRANSLATIONS = {
  pt: {
    subject: "🔥 Desbloqueie recursos avançados com o AI Hub ou Freelancer",
    title: "Você está indo muito bem! Que tal avançar para o próximo nível?",
    body: "Ao chegar ao dia 05, você já domina os fundamentos. Desbloqueie recursos avançados com acesso ilimitado aos assistentes de IA, tutoriais premium e ferramentas profissionais.",
    cta: "Desbloquear agora",
    ignoreNote: "Se já possui acesso, ignore este email.",
  },
  en: {
    subject: "🔥 Unlock advanced features with AI Hub or Freelancer",
    title: "You're doing great! Ready for the next level?",
    body: "By day 05, you've already mastered the fundamentals. Unlock advanced features with unlimited access to AI assistants, premium tutorials, and professional tools.",
    cta: "Unlock now",
    ignoreNote: "If you already have access, ignore this email.",
  },
  es: {
    subject: "🔥 Desbloquea funciones avanzadas con AI Hub o Freelancer",
    title: "¡Vas muy bien! ¿Avanzamos al siguiente nivel?",
    body: "Al llegar al día 05 ya dominas los fundamentos. Desbloquea funciones avanzadas con acceso ilimitado a asistentes de IA, tutoriales premium y herramientas profesionales.",
    cta: "Desbloquear ahora",
    ignoreNote: "Si ya tienes acceso, ignora este correo.",
  },
  fr: {
    subject: "🔥 Débloquez des fonctionnalités avancées avec AI Hub ou Freelancer",
    title: "Vous progressez très bien ! Passons au niveau supérieur",
    body: "Au jour 05, vous maîtrisez déjà les bases. Débloquez des fonctionnalités avancées avec un accès illimité aux assistants IA, des tutoriels premium et des outils professionnels.",
    cta: "Débloquer maintenant",
    ignoreNote: "Si vous avez déjà accès, ignorez cet e-mail.",
  },
  de: {
    subject: "🔥 Schalte erweiterte Funktionen mit AI Hub oder Freelancer frei",
    title: "Du machst das großartig! Auf zum nächsten Level",
    body: "Am Tag 05 beherrschst du bereits die Grundlagen. Schalte erweiterte Funktionen frei mit unbegrenztem Zugriff auf KI-Assistenten, Premium-Tutorials und Profi-Tools.",
    cta: "Jetzt freischalten",
    ignoreNote: "Falls du bereits Zugriff hast, ignoriere diese E-Mail.",
  },
} satisfies Record<string, {
  subject: string;
  title: string;
  body: string;
  cta: string;
  ignoreNote: string;
}>;

type SupportedLanguage = keyof typeof TRANSLATIONS;
type TranslationKey = keyof (typeof TRANSLATIONS)[typeof DEFAULT_LANGUAGE];

function normalizeLanguage(language?: string | null): SupportedLanguage {
  const normalized = String(language ?? "").trim().toLowerCase().split("-")[0];
  if (normalized in TRANSLATIONS) {
    return normalized as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE as SupportedLanguage;
}

function tr(language: string, key: TranslationKey): string {
  const normalized = normalizeLanguage(language);
  return TRANSLATIONS[normalized][key];
}

function normalizeEmail(email?: string | null): string {
  return String(email ?? "").trim().toLowerCase();
}

function getCheckoutUrl(product: "ai_hub" | "freelancer"): string {
  if (product === "ai_hub") {
    return "https://pay.hotmart.com/P104360708Q?off=nnp1mth1&bid=1773855842344&sck=app&utm_source=emailRS";
  }

  return "https://pay.hotmart.com/F103975080O?off=dcrrw2vo&bid=1773855997932&sck=app&utm_source=emailRS";
}

function emailHtml(userName: string, language: string, product: "ai_hub" | "freelancer"): string {
  const checkoutUrl = getCheckoutUrl(product);
  const normalizedLanguage = normalizeLanguage(language);

  return `<!DOCTYPE html>
<html lang="${normalizedLanguage}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family: Arial, sans-serif; margin:0; padding:0; background:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;">
    <tr><td style="background:#7c3aed;color:#fff;padding:26px 28px;font-weight:800;font-size:20px;">Educly</td></tr>
    <tr><td style="padding:26px 28px;">
      <h1 style="margin:0 0 8px;font-size:20px;color:#111827;">${tr(normalizedLanguage, "title")}</h1>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;">${tr(normalizedLanguage, "body")}</p>
      <p style="margin:0 0 16px;color:#374151;font-size:14px;">${userName ? "@" + userName : ""}</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${checkoutUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700;">
          ${tr(normalizedLanguage, "cta")}
        </a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:12px;">${tr(normalizedLanguage, "ignoreNote")}</p>
    </td></tr>
  </table>
</body>
</html>`;
}

async function readRequestedLanguage(req: Request): Promise<string | null> {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return null;
  }

  const rawBody = await req.text();
  if (!rawBody.trim()) {
    return null;
  }

  try {
    const body = JSON.parse(rawBody);
    return typeof body?.language === "string" ? body.language : null;
  } catch {
    return null;
  }
}

async function sendEmailViaResend(to: string, subject: string, html: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("Missing RESEND_API_KEY");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Educly <noreply@educly.app>",
      to,
      subject,
      html,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Resend error: ${resp.status} - ${text}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const requestedLanguage = await readRequestedLanguage(req);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const token = authHeader.replace("Bearer ", "");
    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await anonClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;
    const userEmail = user.email || "";
    const metadataLanguage =
      typeof user.user_metadata?.preferred_language === "string"
        ? user.user_metadata.preferred_language
        : null;
    const service = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: profile } = await service
      .from("profiles")
      .select("id, full_name, preferred_language")
      .eq("id", userId)
      .maybeSingle();

    const email = normalizeEmail(userEmail);
    if (!email) {
      return new Response(JSON.stringify({ error: "User email not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const language = normalizeLanguage(
      requestedLanguage || profile?.preferred_language || metadataLanguage || DEFAULT_LANGUAGE,
    );

    const { data: existingLogs, error: existingLogsError } = await service
      .from("email_logs")
      .select("id")
      .eq("recipient_email", email)
      .eq("email_type", "upsell_day5")
      .limit(1);

    if (existingLogsError) {
      console.error("[send-upsell-day5] Failed to check existing email log:", existingLogsError);
      return new Response(JSON.stringify({ error: "Could not verify existing sends safely" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((existingLogs?.length ?? 0) > 0) {
      return new Response(JSON.stringify({ success: true, skipped: true, reason: "already_sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: products } = await service
      .from("user_product_access")
      .select("product_type,is_active")
      .eq("user_id", userId)
      .eq("is_active", true);

    const hasAiHub = (products || []).some((product) => product.product_type === "ai_hub");
    const hasFreelancer = (products || []).some((product) => product.product_type === "freelancer");

    let target: "ai_hub" | "freelancer" | null = null;
    if (!hasAiHub) target = "ai_hub";
    else if (!hasFreelancer) target = "freelancer";

    if (!target) {
      return new Response(JSON.stringify({ success: true, skipped: true, reason: "already_has_products" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subject = tr(language, "subject");
    const { data: logEntry, error: logInsertError } = await service
      .from("email_logs")
      .insert({
        recipient_email: email,
        user_id: userId,
        email_type: "upsell_day5",
        subject,
        status: "pending",
        metadata: { target, language },
      })
      .select("id")
      .single();

    if (logInsertError || !logEntry) {
      console.error("[send-upsell-day5] Failed to create email log:", logInsertError);
      return new Response(JSON.stringify({ error: "Could not create send guard log" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // After reserving a log row, only the oldest upsell log is allowed to send.
    // This prevents duplicate emails when multiple requests race at the same time.
    const { data: canonicalLogs, error: canonicalLogError } = await service
      .from("email_logs")
      .select("id")
      .eq("recipient_email", email)
      .eq("email_type", "upsell_day5")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .limit(1);

    if (canonicalLogError || !canonicalLogs?.[0]) {
      console.error("[send-upsell-day5] Failed to resolve canonical email log:", canonicalLogError);
      await service
        .from("email_logs")
        .update({
          status: "error",
          error_message: "Could not confirm canonical day 5 upsell log before send",
        })
        .eq("id", logEntry.id);

      return new Response(JSON.stringify({ error: "Could not verify duplicate protection" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const canonicalLogId = canonicalLogs[0].id;
    if (canonicalLogId !== logEntry.id) {
      await service
        .from("email_logs")
        .update({
          status: "skipped_duplicate",
          error_message: "Duplicate day 5 upsell prevented by race-condition guard",
        })
        .eq("id", logEntry.id);

      return new Response(JSON.stringify({ success: true, skipped: true, reason: "duplicate_request" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const pixelBaseUrl = Deno.env.get("SUPABASE_URL")!;
    const pixel = logEntry
      ? `<img src="${pixelBaseUrl}/functions/v1/track-email-open?id=${logEntry.id}" width="1" height="1" style="display:none" alt=""/>`
      : "";
    const htmlBase = emailHtml(profile?.full_name || email.split("@")[0], language, target);
    const html = htmlBase.includes("</body>") ? htmlBase.replace("</body>", `${pixel}</body>`) : htmlBase + pixel;

    try {
      await sendEmailViaResend(email, subject, html);
    } catch (sendError) {
      const sendMessage = sendError instanceof Error ? sendError.message : "Unknown send error";
      await service
        .from("email_logs")
        .update({
          status: "error",
          error_message: sendMessage,
        })
        .eq("id", logEntry.id);

      throw sendError;
    }

    if (logEntry) {
      await service
        .from("email_logs")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", logEntry.id);
    }

    return new Response(JSON.stringify({ success: true, sent: true, target, language }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
