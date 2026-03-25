import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BATCH_LIMIT = 50;
const LOOKBACK_DAYS = 14;
const DELAY_BETWEEN_SENDS_MS = 500;
const REMINDER_DELAY_HOURS = 6;
const RESEND_BASE_URL = "https://api.resend.com";
const SUPPORTED_LANGUAGES = ["pt", "en", "es", "fr", "de", "it", "ru"];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeMetadata = (value: unknown): Record<string, unknown> =>
  isObjectRecord(value) ? { ...value } : {};

const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/\.+$/, "") : "";

const normalizeLanguage = (value: unknown, fallback = "en") => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : fallback;
};

const mergeReminderMetadata = (
  metadataValue: unknown,
  patch: Record<string, unknown>,
): Record<string, unknown> => {
  const metadata = normalizeMetadata(metadataValue);
  const currentReminder = isObjectRecord(metadata.welcome_reminder)
    ? { ...metadata.welcome_reminder }
    : {};

  return {
    ...metadata,
    welcome_reminder: {
      ...currentReminder,
      ...patch,
    },
  };
};

const isOpenedResendEvent = (event: string | null | undefined) =>
  event === "opened" || event === "clicked";

const isDeliveryIssueEvent = (event: string | null | undefined) =>
  event === "bounced" || event === "complained";

const resendGet = async (apiKey: string, path: string) => {
  const response = await fetch(`${RESEND_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend ${path} ${response.status}: ${errorText}`);
  }

  return response.json();
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
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const rawBody = await req.text();
    let body: Record<string, unknown> = {};

    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      body = {};
    }

    const authHeader = req.headers.get("authorization") || "";
    const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : "";
    const bodySecret = typeof body.secret === "string" ? body.secret : "";

    const isAuthorized = (
      (cronSecret.length > 0 && (bearerToken === cronSecret || bodySecret === cronSecret)) ||
      bearerToken === serviceRoleKey
    );

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date();
    const nowIso = now.toISOString();
    const dueBeforeIso = new Date(now.getTime() - REMINDER_DELAY_HOURS * 60 * 60 * 1000).toISOString();
    const lookbackStartIso = new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();

    const { data: rawCandidates, error: candidateError } = await supabase
      .from("email_logs")
      .select("id, recipient_email, email_type, status, sent_at, opened_at, created_at, user_id, metadata")
      .in("email_type", ["welcome", "magic_link"])
      .not("sent_at", "is", null)
      .is("opened_at", null)
      .gte("created_at", lookbackStartIso)
      .lte("sent_at", dueBeforeIso)
      .order("sent_at", { ascending: true })
      .limit(BATCH_LIMIT * 4);

    if (candidateError) {
      throw candidateError;
    }

    const candidates = (rawCandidates || []).filter((row) => {
      const metadata = normalizeMetadata(row.metadata);
      const reminderMetadata = isObjectRecord(metadata.welcome_reminder)
        ? metadata.welcome_reminder
        : null;

      return (
        metadata.source === "welcome_flow" &&
        reminderMetadata?.eligible === true &&
        typeof metadata.resend_email_id === "string" &&
        !reminderMetadata?.sent_at
      );
    });

    if (candidates.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        processed: 0,
        sent: 0,
        skipped_opened: 0,
        skipped_already_reminded: 0,
        errors: 0,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const candidateEmails = Array.from(
      new Set(candidates.map((row) => normalizeEmail(row.recipient_email)).filter(Boolean)),
    );

    const { data: reminderLogs, error: reminderLogsError } = candidateEmails.length > 0
      ? await supabase
        .from("email_logs")
        .select("id, recipient_email, status, sent_at, metadata")
        .eq("email_type", "welcome_reminder")
        .in("recipient_email", candidateEmails)
        .gte("created_at", lookbackStartIso)
      : { data: [], error: null };

    if (reminderLogsError) {
      throw reminderLogsError;
    }

    const alreadyRemindedEmails = new Set(
      (reminderLogs || [])
        .filter((row) => Boolean(row.sent_at) || row.status === "sent" || row.status === "opened")
        .map((row) => normalizeEmail(row.recipient_email))
        .filter(Boolean),
    );

    const processedEmails = new Set<string>();
    const results: Array<Record<string, unknown>> = [];

    let sentCount = 0;
    let openedCount = 0;
    let alreadyRemindedCount = 0;
    let errorCount = 0;

    for (const row of candidates.slice(0, BATCH_LIMIT)) {
      const email = normalizeEmail(row.recipient_email);
      const metadata = normalizeMetadata(row.metadata);
      const reminderMetadata = isObjectRecord(metadata.welcome_reminder)
        ? metadata.welcome_reminder
        : {};

      if (!email) {
        continue;
      }

      if (processedEmails.has(email) || alreadyRemindedEmails.has(email)) {
        alreadyRemindedCount += 1;
        const nextMetadata = mergeReminderMetadata(metadata, {
          status: "skipped_already_reminded",
          checked_at: nowIso,
        });

        await supabase
          .from("email_logs")
          .update({ metadata: nextMetadata })
          .eq("id", row.id);

        results.push({ email, status: "skipped_already_reminded" });
        continue;
      }

      const resendEmailId = typeof metadata.resend_email_id === "string"
        ? metadata.resend_email_id
        : null;

      if (!resendEmailId) {
        errorCount += 1;
        const nextMetadata = mergeReminderMetadata(metadata, {
          status: "missing_resend_email_id",
          checked_at: nowIso,
        });

        await supabase
          .from("email_logs")
          .update({ metadata: nextMetadata })
          .eq("id", row.id);

        results.push({ email, status: "missing_resend_email_id" });
        continue;
      }

      try {
        const resendDetail = await resendGet(resendApiKey, `/emails/${resendEmailId}`);
        const lastEvent = typeof resendDetail?.last_event === "string"
          ? resendDetail.last_event.toLowerCase()
          : null;

        if (isOpenedResendEvent(lastEvent)) {
          openedCount += 1;

          await supabase
            .from("email_logs")
            .update({
              opened_at: row.opened_at || nowIso,
              status: "opened",
              metadata: mergeReminderMetadata(metadata, {
                status: "not_needed_opened",
                checked_at: nowIso,
                last_resend_event: lastEvent,
              }),
            })
            .eq("id", row.id);

          results.push({ email, status: "opened_on_resend" });
          continue;
        }

        if (isDeliveryIssueEvent(lastEvent)) {
          await supabase
            .from("email_logs")
            .update({
              metadata: mergeReminderMetadata(metadata, {
                status: "skipped_delivery_issue",
                checked_at: nowIso,
                last_resend_event: lastEvent,
              }),
            })
            .eq("id", row.id);

          results.push({ email, status: "skipped_delivery_issue", last_event: lastEvent });
          continue;
        }

        const userName = typeof metadata.user_name === "string" && metadata.user_name.trim().length > 0
          ? metadata.user_name.trim()
          : email.split("@")[0];
        const language = normalizeLanguage(metadata.language, "en");

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
              original_resend_email_id: resendEmailId,
              original_last_resend_event: lastEvent,
            },
          },
        });

        processedEmails.add(email);
        sentCount += 1;

        await supabase
          .from("email_logs")
          .update({
            metadata: mergeReminderMetadata(metadata, {
              status: "sent",
              sent_at: nowIso,
              checked_at: nowIso,
              last_resend_event: lastEvent,
            }),
          })
          .eq("id", row.id);

        results.push({
          email,
          status: "reminder_sent",
          original_email_type: row.email_type,
          last_event: lastEvent,
        });

        await sleep(DELAY_BETWEEN_SENDS_MS);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errorCount += 1;

        await supabase
          .from("email_logs")
          .update({
            metadata: mergeReminderMetadata(metadata, {
              status: reminderMetadata?.sent_at ? "sent" : "retry_pending",
              checked_at: nowIso,
              last_error: errorMessage,
              last_error_at: nowIso,
            }),
          })
          .eq("id", row.id);

        results.push({
          email,
          status: "error",
          error: errorMessage,
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed: results.length,
      sent: sentCount,
      skipped_opened: openedCount,
      skipped_already_reminded: alreadyRemindedCount,
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
