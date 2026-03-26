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
const REMINDER_48H = 48;

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
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const authHeader = req.headers.get("authorization") || "";
    const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : "";
    const bodySecret = typeof body.secret === "string" ? body.secret : "";

    const isAuthorized =
      (cronSecret.length > 0 && (bearerToken === cronSecret || bodySecret === cronSecret)) ||
      bearerToken === serviceRoleKey ||
      bearerToken === anonKey;

    if (!isAuthorized) {
      console.error("[send-unopened-welcome-reminders] Unauthorized: bearer token does not match any accepted key");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date();
    const nowIso = now.toISOString();
    const sixHoursAgo = new Date(now.getTime() - REMINDER_6H * 60 * 60 * 1000).toISOString();
    const fortyEightHoursAgo = new Date(now.getTime() - REMINDER_48H * 60 * 60 * 1000).toISOString();
    const lookbackStart = new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();

    // 1. Get welcome/magic_link emails sent in the lookback window
    const { data: welcomeEmails, error: welcomeError } = await supabase
      .from("email_logs")
      .select("id, recipient_email, email_type, status, sent_at, user_id, metadata")
      .in("email_type", ["welcome", "magic_link"])
      .not("sent_at", "is", null)
      .gte("created_at", lookbackStart)
      .order("sent_at", { ascending: true })
      .limit(BATCH_LIMIT * 4);

    if (welcomeError) throw welcomeError;
    if (!welcomeEmails || welcomeEmails.length === 0) {
      return new Response(JSON.stringify({ success: true, processed: 0, sent_6h: 0, sent_48h: 0, skipped: 0, errors: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Get all reminder emails already sent (for dedup)
    const candidateEmails = Array.from(
      new Set(welcomeEmails.map((r: any) => normalizeEmail(r.recipient_email)).filter(Boolean)),
    );

    const { data: existingReminders } = candidateEmails.length > 0
      ? await supabase
        .from("email_logs")
        .select("recipient_email, email_type")
        .in("email_type", ["welcome_reminder_6h", "welcome_reminder_48h", "welcome_reminder"])
        .in("recipient_email", candidateEmails)
        .gte("created_at", lookbackStart)
      : { data: [] };

    const reminded6h = new Set<string>();
    const reminded48h = new Set<string>();
    for (const r of (existingReminders || [])) {
      const email = normalizeEmail(r.recipient_email);
      if (r.email_type === "welcome_reminder_6h" || r.email_type === "welcome_reminder") {
        reminded6h.add(email);
      }
      if (r.email_type === "welcome_reminder_48h") {
        reminded48h.add(email);
      }
    }

    // 3. Get user_ids that have sessions (meaning they accessed the platform)
    const userIds = Array.from(
      new Set(welcomeEmails.map((r: any) => r.user_id).filter(Boolean)),
    );

    const usersWithSessions = new Set<string>();
    const usersWithRecentSessions = new Set<string>();

    if (userIds.length > 0) {
      // Check who has ANY session (for 6h check)
      const { data: sessions } = await supabase
        .from("user_sessions")
        .select("user_id")
        .in("user_id", userIds);

      for (const s of (sessions || [])) {
        usersWithSessions.add(s.user_id);
      }

      // Check who has a session in last 2 days (for 48h check)
      const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
      const { data: recentSessions } = await supabase
        .from("user_sessions")
        .select("user_id")
        .in("user_id", userIds)
        .gte("started_at", twoDaysAgo);

      for (const s of (recentSessions || [])) {
        usersWithRecentSessions.add(s.user_id);
      }
    }

    // 4. Process candidates
    const results: Array<Record<string, unknown>> = [];
    let sent6h = 0;
    let sent48h = 0;
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

      const userName = typeof metadata.user_name === "string" && metadata.user_name.trim().length > 0
        ? metadata.user_name.trim()
        : email.split("@")[0];
      const language = normalizeLanguage(metadata.language, "en");

      // Determine which reminder to send
      let reminderType: "6h" | "48h" | null = null;

      const hoursSinceSent = (now.getTime() - sentAt.getTime()) / (1000 * 60 * 60);

      if (hoursSinceSent >= REMINDER_48H && !reminded48h.has(email)) {
        // 48h reminder: user has no session in last 2 days
        if (userId && !usersWithRecentSessions.has(userId)) {
          reminderType = "48h";
        } else if (!userId) {
          // No user_id means they never created an account
          reminderType = "48h";
        }
      } else if (hoursSinceSent >= REMINDER_6H && !reminded6h.has(email)) {
        // 6h reminder: user has no session at all
        if (userId && !usersWithSessions.has(userId)) {
          reminderType = "6h";
        } else if (!userId) {
          reminderType = "6h";
        }
      }

      if (!reminderType) {
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

        const emailType = reminderType === "6h" ? "welcome_reminder_6h" : "welcome_reminder_48h";

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
              reminder_type: reminderType,
              original_email_type: row.email_type,
              hours_since_original: Math.round(hoursSinceSent),
              override_email_type: emailType,
            },
          },
        });

        if (reminderType === "6h") sent6h++;
        else sent48h++;

        results.push({ email, status: `reminder_${reminderType}_sent` });
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
      sent_6h: sent6h,
      sent_48h: sent48h,
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
