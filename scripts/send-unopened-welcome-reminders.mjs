import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import {
  normalizeWelcomeReminderLanguage,
  renderWelcomeReminderEmail,
} from "../supabase/functions/_shared/welcome-reminder-email.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const PREVIEW_DIR = path.join(REPO_ROOT, "docs", "runbooks", "email-previews");
const RESEND_BASE_URL = "https://api.resend.com";
const DEFAULT_DAYS = 120;
const DEFAULT_LIMIT = 100;
const MAX_RESEND_PAGES = 50;
const PAGE_DELAY_MS = 250;
const RETRY_DELAY_MS = 1200;
const RETRY_ATTEMPTS = 4;
const REMINDER_DELAY_HOURS = 6;

const WELCOME_SUBJECT_RULES = [
  { language: "pt", fragments: ["acesso liberado", "acesso foi liberado"] },
  { language: "en", fragments: ["access granted", "access has been unlocked"] },
  { language: "es", fragments: ["acceso liberado", "acceso fue liberado"] },
  { language: "fr", fragments: ["acces accorde", "acces a ete libere"] },
  { language: "de", fragments: ["zugang freigeschaltet", "zugang wurde freigeschaltet"] },
  { language: "it", fragments: ["accesso sbloccato", "accesso e stato sbloccato"] },
  { language: "ru", fragments: ["dostup otkryt"] },
];

const REMINDER_SUBJECT_RULES = [
  { language: "pt", fragments: ["acesso ainda esta te esperando"] },
  { language: "en", fragments: ["access is still waiting"] },
  { language: "es", fragments: ["acceso aun te esta esperando"] },
  { language: "fr", fragments: ["acces vous attend encore"] },
  { language: "de", fragments: ["zugang wartet noch auf sie"] },
  { language: "it", fragments: ["accesso ti sta ancora aspettando"] },
  { language: "ru", fragments: ["dostup vse eshche zhdet vas"] },
];

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/\.+$/, "") : "";

const isObjectRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeMetadata = (value) => (isObjectRecord(value) ? { ...value } : {});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseFlagValue = (args, name, fallback) => {
  const prefix = `${name}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
};

const parseNumberFlag = (args, name, fallback) => {
  const rawValue = parseFlagValue(args, name, "");
  if (!rawValue) return fallback;
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const stripQuotes = (value) => {
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
  return value;
};

const normalizeForMatch = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const getJwtRole = (token) => {
  if (typeof token !== "string" || token.split(".").length < 2) {
    return null;
  }

  try {
    const payloadPart = token.split(".")[1];
    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const payload = JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
    return typeof payload?.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
};

const detectLanguageBySubject = (subject, rules) => {
  const normalizedSubject = normalizeForMatch(subject);

  for (const rule of rules) {
    if (rule.fragments.some((fragment) => normalizedSubject.includes(fragment))) {
      return rule.language;
    }
  }

  return null;
};

const getReminderSubject = (language) => {
  const normalizedLanguage = normalizeWelcomeReminderLanguage(language);
  return {
    pt: "Seu acesso ainda esta te esperando - Educly",
    en: "Your access is still waiting - Educly",
    es: "Tu acceso aun te esta esperando - Educly",
    fr: "Votre acces vous attend encore - Educly",
    de: "Ihr Zugang wartet noch auf Sie - Educly",
    it: "Il tuo accesso ti sta ancora aspettando - Educly",
    ru: "Vash dostup vse eshche zhdet vas - Educly",
  }[normalizedLanguage];
};

const loadEnvFile = async (filePath) => {
  try {
    const contents = await fs.readFile(filePath, "utf8");
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const separatorIndex = line.indexOf("=");
      if (separatorIndex <= 0) continue;

      const key = line.slice(0, separatorIndex).trim();
      const value = stripQuotes(line.slice(separatorIndex + 1).trim());
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // Optional env files are best-effort only.
  }
};

const loadOptionalEnv = async () => {
  await loadEnvFile(path.join(REPO_ROOT, "supabase", "functions", ".env"));
  await loadEnvFile(path.join(REPO_ROOT, ".env.local"));
  await loadEnvFile(path.join(REPO_ROOT, ".env"));
};

const resendGetWithRetry = async (apiKey, urlPath) => {
  for (let attempt = 0; attempt <= RETRY_ATTEMPTS; attempt += 1) {
    const response = await fetch(`${RESEND_BASE_URL}${urlPath}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    const errorText = await response.text();
    if (response.status === 429 && attempt < RETRY_ATTEMPTS) {
      await sleep(RETRY_DELAY_MS * (attempt + 1));
      continue;
    }

    throw new Error(`Resend ${urlPath} ${response.status}: ${errorText}`);
  }

  throw new Error(`Resend ${urlPath} failed after retries`);
};

const callInternalFunction = async ({ functionName, supabaseUrl, serviceRoleKey, body }) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.error) {
    throw new Error(payload?.error || `${functionName} failed with ${response.status}`);
  }

  return payload;
};

const isOpenedResendEvent = (event) => event === "opened" || event === "clicked";

const isDeliveryIssueEvent = (event) => event === "bounced" || event === "complained";

const writePreviewFiles = async () => {
  await fs.mkdir(PREVIEW_DIR, { recursive: true });

  const sampleEmail = "preview@educly.app";
  const sampleAccessUrl = "https://educly.app/magic-login?token=preview-token-only";

  const manualPreview = `<!-- Preview generated for manual backfill script. Link is illustrative only. -->\n${renderWelcomeReminderEmail({
    userEmail: sampleEmail,
    language: "pt",
    accessUrl: sampleAccessUrl,
  })}`;

  const hourlyPreview = `<!-- Preview generated for hourly 6-hour automation. Link is illustrative only. -->\n${renderWelcomeReminderEmail({
    userEmail: sampleEmail,
    language: "pt",
    accessUrl: sampleAccessUrl,
  })}`;

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-manual-preview.html"),
    manualPreview,
    "utf8",
  );

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-6h-preview.html"),
    hourlyPreview,
    "utf8",
  );
};

const listRelevantResendEmails = async ({ apiKey, days }) => {
  const cutoffMs = Date.now() - days * 24 * 60 * 60 * 1000;
  const welcomeEmails = [];
  const remindedRecipients = new Set();
  let cursor = "";
  let pages = 0;
  let totalEmailsScanned = 0;

  for (let page = 0; page < MAX_RESEND_PAGES; page += 1) {
    if (page > 0) {
      await sleep(PAGE_DELAY_MS);
    }

    const urlPath = cursor ? `/emails?limit=100&after=${cursor}` : "/emails?limit=100";
    const payload = await resendGetWithRetry(apiKey, urlPath);
    const batch = Array.isArray(payload?.data) ? payload.data : [];
    pages += 1;

    if (batch.length === 0) break;

    let reachedCutoff = false;
    for (const item of batch) {
      totalEmailsScanned += 1;
      const createdAtMs = new Date(item.created_at || "").getTime();
      if (Number.isFinite(createdAtMs) && createdAtMs < cutoffMs) {
        reachedCutoff = true;
        break;
      }

      const subject = item.subject || "";
      const reminderLanguage = detectLanguageBySubject(subject, REMINDER_SUBJECT_RULES);
      if (reminderLanguage) {
        for (const recipient of item.to || []) {
          remindedRecipients.add(normalizeEmail(recipient));
        }
        continue;
      }

      const welcomeLanguage = detectLanguageBySubject(subject, WELCOME_SUBJECT_RULES);
      if (!welcomeLanguage) continue;

      welcomeEmails.push({
        id: item.id,
        to: Array.isArray(item.to) ? item.to : [],
        subject,
        created_at: item.created_at,
        last_event: typeof item.last_event === "string" ? item.last_event.toLowerCase() : null,
        inferred_language: welcomeLanguage,
      });
    }

    if (reachedCutoff || !payload?.has_more) break;
    cursor = batch[batch.length - 1]?.id || "";
    if (!cursor) break;
  }

  return {
    pages,
    totalEmailsScanned,
    welcomeEmails,
    remindedRecipients,
  };
};

const buildCandidateBuckets = ({ welcomeEmails, remindedRecipients, targetEmail }) => {
  const dueBeforeMs = Date.now() - REMINDER_DELAY_HOURS * 60 * 60 * 1000;
  const latestPerRecipient = new Map();

  for (const item of welcomeEmails) {
    const recipient = normalizeEmail(item.to?.[0]);
    if (!recipient) continue;
    if (targetEmail && recipient !== targetEmail) continue;

    const createdAtMs = new Date(item.created_at || "").getTime();
    const currentBest = latestPerRecipient.get(recipient);
    if (!currentBest || createdAtMs > new Date(currentBest.created_at).getTime()) {
      latestPerRecipient.set(recipient, item);
    }
  }

  const sendable = [];
  const opened = [];
  const skipped = [];

  for (const [recipient, item] of latestPerRecipient.entries()) {
    const createdAtMs = new Date(item.created_at || "").getTime();

    if (!Number.isFinite(createdAtMs) || createdAtMs > dueBeforeMs) {
      skipped.push({
        email: recipient,
        resend_email_id: item.id,
        subject: item.subject,
        created_at: item.created_at,
        skip_reason: "not_due_yet",
      });
      continue;
    }

    if (isOpenedResendEvent(item.last_event)) {
      opened.push({
        email: recipient,
        resend_email_id: item.id,
        subject: item.subject,
        created_at: item.created_at,
        last_event: item.last_event,
      });
      continue;
    }

    if (isDeliveryIssueEvent(item.last_event)) {
      skipped.push({
        email: recipient,
        resend_email_id: item.id,
        subject: item.subject,
        created_at: item.created_at,
        skip_reason: item.last_event,
      });
      continue;
    }

    if (remindedRecipients.has(recipient)) {
      skipped.push({
        email: recipient,
        resend_email_id: item.id,
        subject: item.subject,
        created_at: item.created_at,
        skip_reason: "already_reminded_in_resend",
      });
      continue;
    }

    sendable.push({
      email: recipient,
      resend_email_id: item.id,
      subject: item.subject,
      created_at: item.created_at,
      last_event: item.last_event || "sent",
      language: item.inferred_language,
    });
  }

  sendable.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  return { sendable, opened, skipped };
};

const rowsToCsv = (rows) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");
};

const writeReports = async ({ summary, sendable, opened, skipped }) => {
  await fs.mkdir(PREVIEW_DIR, { recursive: true });

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-affected-users.json"),
    JSON.stringify(sendable, null, 2),
    "utf8",
  );

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-affected-users.csv"),
    rowsToCsv(sendable),
    "utf8",
  );

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-opened-users.json"),
    JSON.stringify(opened, null, 2),
    "utf8",
  );

  await fs.writeFile(
    path.join(PREVIEW_DIR, "welcome-reminder-skipped-users.json"),
    JSON.stringify(skipped, null, 2),
    "utf8",
  );
};

const resolveUserIdFromEmail = async (supabase, email) => {
  const perPage = 1000;

  for (let page = 1; page <= 10; page += 1) {
    const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage });
    if (listError) throw listError;

    const users = listData?.users || [];
    if (users.length === 0) break;

    const match = users.find((user) => normalizeEmail(user.email) === email);
    if (match) return match.id;

    if (users.length < perPage) break;
  }

  return null;
};

const buildReminderPayload = async ({ candidate, supabase, supabaseUrl, serviceRoleKey }) => {
  const existingUserId = await resolveUserIdFromEmail(supabase, candidate.email);

  let userId = existingUserId;
  let accessToken = null;
  let generatedPassword = null;
  let language = normalizeWelcomeReminderLanguage(candidate.language || "en");
  let userName = candidate.email.split("@")[0];

  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, preferred_language")
      .eq("id", userId)
      .maybeSingle();

    if (profile?.preferred_language) {
      language = normalizeWelcomeReminderLanguage(profile.preferred_language, language);
    }

    if (typeof profile?.full_name === "string" && profile.full_name.trim().length > 0) {
      userName = profile.full_name.trim();
    }

    const { data: tokenRow, error: tokenError } = await supabase
      .from("user_access_tokens")
      .select("token")
      .eq("user_id", userId)
      .maybeSingle();

    if (tokenError) throw tokenError;

    if (tokenRow?.token) {
      accessToken = tokenRow.token;
    } else {
      const { data: newToken, error: newTokenError } = await supabase
        .from("user_access_tokens")
        .insert({ user_id: userId })
        .select("token")
        .single();

      if (newTokenError) throw newTokenError;
      accessToken = newToken.token;
    }
  } else {
    const accountData = await callInternalFunction({
      functionName: "auto-create-account",
      supabaseUrl,
      serviceRoleKey,
      body: {
        email: candidate.email,
        buyer_name: userName,
        language,
      },
    });

    userId = accountData.user_id;
    accessToken = accountData.access_token;
    generatedPassword = accountData.generated_password || null;
  }

  if (!userId || !accessToken) {
    throw new Error("Could not prepare access token for reminder send");
  }

  return {
    email: candidate.email,
    userName,
    language,
    accessToken,
    generatedPassword,
    userId,
  };
};

const run = async () => {
  await loadOptionalEnv();

  const args = process.argv.slice(2);
  const shouldSend = args.includes("--send");
  const days = parseNumberFlag(args, "--days", DEFAULT_DAYS);
  const limit = parseNumberFlag(args, "--limit", DEFAULT_LIMIT);
  const targetEmail = normalizeEmail(parseFlagValue(args, "--email", ""));

  await writePreviewFiles();

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const resendApiKey = process.env.RESEND_API_KEY || "";

  if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
    console.log("[welcome-reminder-script] Preview HTML generated.");
    console.log("[welcome-reminder-script] Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY. Live scan skipped.");
    console.log(`[welcome-reminder-script] Preview files: ${PREVIEW_DIR}`);
    return;
  }

  const jwtRole = getJwtRole(serviceRoleKey);
  if (jwtRole !== "service_role") {
    console.error("[welcome-reminder-script] Invalid SUPABASE_SERVICE_ROLE_KEY for admin operations.");
    console.error(`[welcome-reminder-script] Detected role: ${jwtRole || "unknown"}`);
    console.error("[welcome-reminder-script] This script needs the real service_role key from Supabase Settings > API.");
    console.error("[welcome-reminder-script] Your local .env appears to contain the anon/publishable key in SUPABASE_SERVICE_ROLE_KEY.");
    console.error(`[welcome-reminder-script] Preview files: ${PREVIEW_DIR}`);
    return;
  }

  const { pages, totalEmailsScanned, welcomeEmails, remindedRecipients } = await listRelevantResendEmails({
    apiKey: resendApiKey,
    days,
  });

  const { sendable, opened, skipped } = buildCandidateBuckets({
    welcomeEmails,
    remindedRecipients,
    targetEmail,
  });

  const summary = {
    generated_at: new Date().toISOString(),
    days_scanned: days,
    resend_pages_scanned: pages,
    resend_emails_scanned: totalEmailsScanned,
    welcome_emails_found: welcomeEmails.length,
    already_reminded_recipients: remindedRecipients.size,
    sendable_recipients: sendable.length,
    opened_recipients: opened.length,
    skipped_recipients: skipped.length,
  };

  await writeReports({ summary, sendable, opened, skipped });

  console.log(`[welcome-reminder-script] Resend pages scanned: ${pages}`);
  console.log(`[welcome-reminder-script] Resend emails scanned: ${totalEmailsScanned}`);
  console.log(`[welcome-reminder-script] Welcome emails found in Resend: ${welcomeEmails.length}`);
  console.log(`[welcome-reminder-script] Unopened and sendable: ${sendable.length}`);
  console.log(`[welcome-reminder-script] Already opened: ${opened.length}`);
  console.log(`[welcome-reminder-script] Skipped: ${skipped.length}`);
  console.log(`[welcome-reminder-script] Reports: ${PREVIEW_DIR}`);

  if (!shouldSend) {
    console.log("[welcome-reminder-script] Preview mode only. No emails were sent.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  let sentCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const candidate of sendable.slice(0, limit)) {
    try {
      const reminderPayload = await buildReminderPayload({
        candidate,
        supabase,
        supabaseUrl,
        serviceRoleKey,
      });

      const response = await callInternalFunction({
        functionName: "send-welcome-email",
        supabaseUrl,
        serviceRoleKey,
        body: {
          email: reminderPayload.email,
          userName: reminderPayload.userName,
          language: reminderPayload.language,
          mode: "magic_link_reminder",
          access_token: reminderPayload.accessToken,
          generated_password: reminderPayload.generatedPassword,
          user_id: reminderPayload.userId,
          metadata: {
            source: "manual_backfill_script",
            original_resend_email_id: candidate.resend_email_id,
            original_last_resend_event: candidate.last_event,
            original_subject: candidate.subject,
            original_created_at: candidate.created_at,
          },
        },
      });

      if (response?.skipped) {
        skippedCount += 1;
        console.log(`[welcome-reminder-script] Skipped duplicate reminder for ${candidate.email}`);
        continue;
      }

      sentCount += 1;
      console.log(`[welcome-reminder-script] Sent reminder to ${candidate.email}`);
    } catch (error) {
      errorCount += 1;
      console.error(
        `[welcome-reminder-script] Failed for ${candidate.email}:`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.log(`[welcome-reminder-script] Finished. Sent=${sentCount} Skipped=${skippedCount} Errors=${errorCount}`);
};

run().catch((error) => {
  console.error("[welcome-reminder-script] Fatal error:", error);
  process.exitCode = 1;
});
