import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BATCH_LIMIT = 50;
const LOOKBACK_DAYS = 14;
const DELAY_BETWEEN_SENDS_MS = 500;
const REMINDER_6H = 6;
const REMINDER_EMAIL_TYPES = ["welcome_reminder_6h", "welcome_reminder_48h", "welcome_reminder"] as const;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/\.+$/, "") : "";

const normalizeLanguage = (value: unknown, fallback = "en") => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase().split("-")[0];
  return ["pt", "en", "es", "fr", "de", "it", "ru"].includes(normalized) ? normalized : fallback;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeMetadata = (value: unknown): Record<string, unknown> =>
  isObjectRecord(value) ? { ...value } : {};

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

    const now = new Date();
    const lookbackStart = new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();

    // 1. Get welcome/magic_link emails sent in the lookback window that were NOT opened
    const { data: welcomeEmails, error: welcomeError } = await supabase
      .from("email_logs")
      .select("id, recipient_email, email_type, status, sent_at, user_id, metadata, opened_at")
      .in("email_type", ["welcome", "magic_link"])
      .not("sent_at", "is", null)
      .is("opened_at", null)
      .gte("created_at", lookbackStart)
      .order("sent_at", { ascending: true })
      .limit(BATCH_LIMIT * 4);

    if (welcomeError) throw welcomeError;
    if (!welcomeEmails || welcomeEmails.length === 0) {
      return new Response(JSON.stringify({ success: true, processed: 0, sent: 0, sent_6h: 0, sent_48h: 0, skipped: 0, errors: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Get all reminder emails already sent (one-time dedupe for the whole user/email)
    const candidateEmails = Array.from(
      new Set(welcomeEmails.map((r: any) => normalizeEmail(r.recipient_email)).filter(Boolean)),
    );
    const candidateUserIds = Array.from(
      new Set(welcomeEmails.map((r: any) => r.user_id).filter(Boolean)),
    );

    const [
      { data: existingRemindersByEmail, error: existingRemindersByEmailError },
      { data: existingRemindersByUser, error: existingRemindersByUserError },
    ] = await Promise.all([
      candidateEmails.length > 0
        ? supabase
          .from("email_logs")
          .select("recipient_email, user_id, email_type")
          .in("email_type", [...REMINDER_EMAIL_TYPES])
          .in("recipient_email", candidateEmails)
        : Promise.resolve({ data: [], error: null }),
      candidateUserIds.length > 0
        ? supabase
          .from("email_logs")
          .select("recipient_email, user_id, email_type")
          .in("email_type", [...REMINDER_EMAIL_TYPES])
          .in("user_id", candidateUserIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (existingRemindersByEmailError) throw existingRemindersByEmailError;
    if (existingRemindersByUserError) throw existingRemindersByUserError;

    const remindedEmails = new Set<string>();
    const remindedUserIds = new Set<string>();
    for (const reminder of [...(existingRemindersByEmail || []), ...(existingRemindersByUser || [])]) {
      const email = normalizeEmail(reminder.recipient_email);
      if (email) {
        remindedEmails.add(email);
      }
      if (typeof reminder.user_id === "string" && reminder.user_id.length > 0) {
        remindedUserIds.add(reminder.user_id);
      }
    }

    // 3. Get user_ids that have sessions (meaning they accessed the platform)
    const userIds = Array.from(
      new Set(welcomeEmails.map((r: any) => r.user_id).filter(Boolean)),
    );

    const usersWithSessions = new Set<string>();
    const userLanguageMap = new Map<string, string>();

    if (userIds.length > 0) {
      // Fetch preferred_language from profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, preferred_language")
        .in("id", userIds);

      for (const p of (profiles || [])) {
        if (p.preferred_language) {
          userLanguageMap.set(p.id, p.preferred_language);
        }
      }

      // Check who has ANY session (for 6h check)
      const { data: sessions } = await supabase
        .from("user_sessions")
        .select("user_id")
        .in("user_id", userIds);

      for (const s of (sessions || [])) {
        usersWithSessions.add(s.user_id);
      }
    }

    // 4. Process candidates
    const results: Array<Record<string, unknown>> = [];
    let sentReminders = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const processedEmails = new Set<string>();

    for (const row of welcomeEmails) {
      if (results.length >= BATCH_LIMIT) break;

      const email = normalizeEmail(row.recipient_email);
      if (!email || processedEmails.has(email)) continue;
      processedEmails.add(email);

      const metadata = normalizeMetadata(row.metadata);
      const userId = row.user_id;
      const sentAt = row.sent_at ? new Date(row.sent_at) : null;
      if (!sentAt) continue;
      if (remindedEmails.has(email) || (typeof userId === "string" && remindedUserIds.has(userId))) {
        skippedCount++;
        continue;
      }

      const userName = typeof metadata.user_name === "string" && metadata.user_name.trim().length > 0
        ? metadata.user_name.trim()
        : email.split("@")[0];
      const language = userId && userLanguageMap.has(userId)
        ? normalizeLanguage(userLanguageMap.get(userId), "en")
        : normalizeLanguage(metadata.language, "en");

      const hoursSinceSent = (now.getTime() - sentAt.getTime()) / (1000 * 60 * 60);
      const shouldSendReminder = hoursSinceSent >= REMINDER_6H &&
        (
          (typeof userId === "string" && userId.length > 0 && !usersWithSessions.has(userId)) ||
          !userId
        );

      if (!shouldSendReminder) {
        skippedCount++;
        continue;
      }

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
            email,
            buyer_name: userName,
            language,
          },
        });

        if (!accountData.access_token) {
          throw new Error("auto-create-account returned no access token");
        }

        // Determine language source for telemetry
        const languageSource = userId && userLanguageMap.has(userId)
          ? "profile"
          : (typeof metadata.language === "string" && metadata.language.trim().length > 0)
            ? "welcome_metadata"
            : "fallback_en";

        await callInternalFunction({
          functionName: "send-welcome-email",
          supabaseUrl,
          serviceRoleKey,
          body: {
            email,
            userName,
            language,
            mode: "magic_link_reminder",
            access_token: accountData.access_token,
            generated_password: accountData.generated_password,
            user_id: accountData.user_id,
            parent_email_log_id: row.id,
            metadata: {
              reminder_type: "6h_once",
              original_email_type: row.email_type,
              hours_since_original: Math.round(hoursSinceSent),
              language_source: languageSource,
            },
          },
        });

        sentReminders++;
        remindedEmails.add(email);
        if (typeof accountData.user_id === "string" && accountData.user_id.length > 0) {
          remindedUserIds.add(accountData.user_id);
        }
        results.push({ email, status: "reminder_sent" });
        await sleep(DELAY_BETWEEN_SENDS_MS);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errorCount++;
        console.error(`[welcome-reminder] Error for ${email}:`, errorMessage);
        results.push({ email, status: "error", error: errorMessage });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed: results.length,
      sent: sentReminders,
      sent_6h: sentReminders,
      sent_48h: 0,
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
