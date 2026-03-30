import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BATCH_LIMIT = 50;
const LOOKBACK_DAYS = 14;
const DELAY_BETWEEN_SENDS_MS = 500;
const MIN_HOURS_SINCE_SENT = 6;
const MAX_RESEND_PAGES = 50;
const PAGE_DELAY_MS = 250;
const RETRY_DELAY_MS = 1200;
const RETRY_ATTEMPTS = 4;

// Regras para detectar emails de boas-vindas pelo subject
const WELCOME_SUBJECT_RULES = [
  { language: "pt", fragments: ["acesso liberado", "acesso foi liberado"] },
  { language: "en", fragments: ["access granted", "access has been unlocked"] },
  { language: "es", fragments: ["acceso liberado", "acceso fue liberado"] },
  { language: "fr", fragments: ["acces accorde", "acces a ete libere"] },
  { language: "de", fragments: ["zugang freigeschaltet"] },
  { language: "it", fragments: ["accesso sbloccato"] },
  { language: "ru", fragments: ["dostup otkryt"] },
];

// Regras para detectar emails de lembrete pelo subject
const REMINDER_SUBJECT_RULES = [
  { language: "pt", fragments: ["acesso ainda esta te esperando"] },
  { language: "en", fragments: ["access is still waiting"] },
  { language: "es", fragments: ["acceso aun te esta esperando"] },
  { language: "fr", fragments: ["acces vous attend encore"] },
  { language: "de", fragments: ["zugang wartet noch auf sie"] },
  { language: "it", fragments: ["accesso ti sta ancora aspettando"] },
  { language: "ru", fragments: ["dostup vse eshche zhdet vas"] },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/\.+$/, "") : "";

const normalizeLanguage = (value: unknown, fallback = "en") => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase().split("-")[0];
  return ["pt", "en", "es", "fr", "de", "it", "ru"].includes(normalized) ? normalized : fallback;
};

const normalizeForMatch = (value: string) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const detectLanguageBySubject = (subject: string, rules: typeof WELCOME_SUBJECT_RULES) => {
  const normalizedSubject = normalizeForMatch(subject);
  for (const rule of rules) {
    for (const fragment of rule.fragments) {
      if (normalizedSubject.includes(fragment)) {
        return rule.language;
      }
    }
  }
  return null;
};

const isOpenedResendEvent = (event: unknown) => {
  if (typeof event !== "string") return false;
  const normalized = event.toLowerCase();
  return normalized === "opened" || normalized === "clicked";
};

const resendGetWithRetry = async (apiKey: string, urlPath: string) => {
  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    const response = await fetch(`https://api.resend.com${urlPath}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (response.ok) {
      return response.json();
    }

    if (response.status === 429 && attempt < RETRY_ATTEMPTS) {
      console.log(`[send-unopened-welcome-reminders] Rate limited, waiting ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS);
      continue;
    }

    throw new Error(`Resend API error: ${response.status}`);
  }
};

interface WelcomeEmail {
  id: string;
  email: string;
  subject: string;
  created_at: string;
  last_event: string | null;
  language: string;
  hoursSinceSent: number;
}

const listResendEmails = async (apiKey: string, days: number) => {
  const cutoffMs = Date.now() - days * 24 * 60 * 60 * 1000;
  const welcomeEmails: WelcomeEmail[] = [];
  const remindedRecipients = new Set<string>();
  const activeRecipients = new Set<string>();
  let cursor = "";
  let pages = 0;
  let totalEmailsScanned = 0;

  for (let page = 0; page < MAX_RESEND_PAGES; page++) {
    if (page > 0) await sleep(PAGE_DELAY_MS);

    const urlPath = cursor ? `/emails?limit=100&after=${cursor}` : "/emails?limit=100";
    const payload = await resendGetWithRetry(apiKey, urlPath);
    const batch = Array.isArray(payload?.data) ? payload.data : [];
    pages++;

    if (batch.length === 0) break;

    let reachedCutoff = false;
    for (const item of batch) {
      totalEmailsScanned++;
      const createdAtMs = new Date(item.created_at || "").getTime();
      if (Number.isFinite(createdAtMs) && createdAtMs < cutoffMs) {
        reachedCutoff = true;
        break;
      }

      const subject = item.subject || "";
      const recipient = normalizeEmail(item.to?.[0]);

      // Track users who clicked/opened ANY email (already active)
      if (recipient && isOpenedResendEvent(item.last_event)) {
        activeRecipients.add(recipient);
      }

      // Check if it's a reminder email (to exclude those who already received one)
      const reminderLanguage = detectLanguageBySubject(subject, REMINDER_SUBJECT_RULES);
      if (reminderLanguage) {
        if (recipient) remindedRecipients.add(recipient);
        continue;
      }

      // Check if it's a welcome email
      const welcomeLanguage = detectLanguageBySubject(subject, WELCOME_SUBJECT_RULES);
      if (!welcomeLanguage) continue;

      // Check if the welcome email was opened
      if (isOpenedResendEvent(item.last_event)) continue;

      // Check if minimum time has passed (6 hours)
      const hoursSinceSent = (Date.now() - createdAtMs) / (1000 * 60 * 60);
      if (hoursSinceSent < MIN_HOURS_SINCE_SENT) continue;

      welcomeEmails.push({
        id: item.id,
        email: recipient,
        subject,
        created_at: item.created_at,
        last_event: item.last_event,
        language: welcomeLanguage,
        hoursSinceSent: Math.round(hoursSinceSent),
      });
    }

    if (reachedCutoff || !payload?.has_more) break;
    cursor = batch[batch.length - 1]?.id || "";
    if (!cursor) break;
  }

  console.log(`[send-unopened-welcome-reminders] Resend pages: ${pages}, Emails scanned: ${totalEmailsScanned}`);

  return { welcomeEmails, remindedRecipients, activeRecipients };
};

const callInternalFunction = async <T>(params: {
  functionName: string;
  supabaseUrl: string;
  serviceRoleKey: string;
  body: Record<string, unknown>;
}): Promise<T> => {
  const response = await fetch(
    `${params.supabaseUrl}/functions/v1/${params.functionName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.serviceRoleKey}`,
      },
      body: JSON.stringify(params.body),
    },
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload?.error) {
    throw new Error(payload?.error || `${params.functionName} failed with ${response.status}`);
  }

  return payload as T;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const cronSecret = Deno.env.get("CRON_SECRET") || "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const rawBody = await req.text();
    let body: Record<string, unknown> = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      body = {};
    }

    // Auth check
    const authHeader = req.headers.get("authorization") || "";
    const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : "";
    const bodySecret = typeof body.secret === "string" ? body.secret : "";

    const isAuthorized =
      (cronSecret.length > 0 && (bearerToken === cronSecret || bodySecret === cronSecret)) ||
      bearerToken === serviceRoleKey;

    if (!isAuthorized) {
      console.error("[send-unopened-welcome-reminders] Unauthorized: bearer token does not match any accepted key");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resendApiKey) {
      console.error("[send-unopened-welcome-reminders] Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Fetch emails from Resend API (last N days)
    const { welcomeEmails, remindedRecipients, activeRecipients } = await listResendEmails(resendApiKey, LOOKBACK_DAYS);

    console.log(`[send-unopened-welcome-reminders] Welcome emails NOT opened: ${welcomeEmails.length}`);
    console.log(`[send-unopened-welcome-reminders] Already received reminder: ${remindedRecipients.size}`);
    console.log(`[send-unopened-welcome-reminders] Already active (clicked any email): ${activeRecipients.size}`);

    if (welcomeEmails.length === 0) {
      return new Response(JSON.stringify({ success: true, processed: 0, sent: 0, skipped: 0, errors: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Filter out those who already received reminder OR are already active
    const candidatesAfterFilter = welcomeEmails.filter(e => 
      !remindedRecipients.has(e.email) && !activeRecipients.has(e.email)
    );

    console.log(`[send-unopened-welcome-reminders] After filtering reminders and active: ${candidatesAfterFilter.length}`);

    if (candidatesAfterFilter.length === 0) {
      return new Response(JSON.stringify({ success: true, processed: 0, sent: 0, skipped: welcomeEmails.length, errors: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Get preferred language from profiles
    const candidateEmails = [...new Set(candidatesAfterFilter.map(e => e.email))];
    
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, preferred_language, full_name")
      .in("email", candidateEmails);

    const profileByEmail = new Map<string, { preferred_language?: string; full_name?: string }>();
    for (const p of (profiles || [])) {
      if (p.email) {
        profileByEmail.set(normalizeEmail(p.email), p);
      }
    }

    // 4. Build eligible list
    const eligible: Array<{
      email: string;
      language: string;
      userName: string;
      hoursSinceSent: number;
    }> = [];
    const processedEmails = new Set<string>();

    for (const item of candidatesAfterFilter) {
      if (processedEmails.has(item.email)) continue;
      processedEmails.add(item.email);

      const profile = profileByEmail.get(item.email);

      // Determine language: profile preference > original email language
      let language = item.language || "en";
      if (profile?.preferred_language) {
        language = normalizeLanguage(profile.preferred_language);
      }

      // Determine name
      let userName = item.email.split("@")[0];
      if (profile?.full_name) {
        userName = profile.full_name;
      }

      eligible.push({
        email: item.email,
        language,
        userName,
        hoursSinceSent: item.hoursSinceSent,
      });

      if (eligible.length >= BATCH_LIMIT) break;
    }

    console.log(`[send-unopened-welcome-reminders] Eligible to receive reminder: ${eligible.length}`);

    // 5. Send reminder emails
    const results: Array<Record<string, unknown>> = [];
    let sentReminders = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const candidate of eligible) {
      try {
        // Create account if needed and get access token
        const accountData = await callInternalFunction<{
          user_id: string;
          access_token: string | null;
          generated_password: string | null;
        }>({
          functionName: "auto-create-account",
          supabaseUrl,
          serviceRoleKey,
          body: {
            email: candidate.email,
            buyer_name: candidate.userName,
            language: candidate.language,
          },
        });

        if (!accountData.access_token) {
          throw new Error("auto-create-account returned no access token");
        }

        const response = await callInternalFunction<{ skipped?: boolean }>({
          functionName: "send-welcome-email",
          supabaseUrl,
          serviceRoleKey,
          body: {
            email: candidate.email,
            userName: candidate.userName,
            language: candidate.language,
            mode: "magic_link_reminder",
            access_token: accountData.access_token,
            generated_password: accountData.generated_password,
            user_id: accountData.user_id,
            metadata: {
              reminder_type: "6h_once",
              hours_since_original: candidate.hoursSinceSent,
              source: "cron_resend_api",
            },
          },
        });

        if (response?.skipped) {
          skippedCount++;
          results.push({ email: candidate.email, status: "skipped" });
        } else {
          sentReminders++;
          results.push({ email: candidate.email, status: "reminder_sent", language: candidate.language });
        }

        await sleep(DELAY_BETWEEN_SENDS_MS);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errorCount++;
        console.error(`[send-unopened-welcome-reminders] Error for ${candidate.email}:`, errorMessage);
        results.push({ email: candidate.email, status: "error", error: errorMessage });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed: results.length,
      sent: sentReminders,
      skipped: skippedCount,
      errors: errorCount,
      results,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[send-unopened-welcome-reminders] Error:", error);

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
