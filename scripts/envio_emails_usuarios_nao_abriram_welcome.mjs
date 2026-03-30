/**
 * backfill-welcome-reminders.mjs
 * 
 * Script para enviar emails de lembrete usando a API do Resend (dados mais precisos).
 * 
 * Critérios:
 * 1. Email de boas-vindas enviado nos últimos 14 dias
 * 2. NÃO foi aberto (last_event != 'opened')
 * 3. NÃO recebeu lembrete ainda (verifica pelo subject do Resend)
 * 4. Respeita o idioma de preferência do usuário
 * 
 * Uso:
 *   node scripts/backfill-welcome-reminders.mjs --preview     # Apenas lista quem receberia
 *   node scripts/backfill-welcome-reminders.mjs --send        # Envia os emails
 *   node scripts/backfill-welcome-reminders.mjs --send --limit=10  # Envia para até 10 usuários
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const DELAY_BETWEEN_SENDS_MS = 500;
const DEFAULT_LIMIT = 500;
const DEFAULT_DAYS = 14;
const MAX_RESEND_PAGES = 50;
const PAGE_DELAY_MS = 250;
const RETRY_DELAY_MS = 1200;
const RETRY_ATTEMPTS = 4;
const MIN_HOURS_SINCE_SENT = 6;

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

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/\.+$/, "") : "";

const normalizeLanguage = (value, fallback = "en") => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase().split("-")[0];
  return ["pt", "en", "es", "fr", "de", "it", "ru"].includes(normalized) ? normalized : fallback;
};

const normalizeForMatch = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseFlag = (args, name) => args.includes(name);

const parseNumberFlag = (args, name, fallback) => {
  const prefix = `${name}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  if (!match) return fallback;
  const parsed = Number.parseInt(match.slice(prefix.length), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const loadEnv = async () => {
  try {
    const envPath = path.join(REPO_ROOT, ".env");
    const content = await fs.readFile(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env not found, use existing env vars
  }
};

const detectLanguageBySubject = (subject, rules) => {
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

const isOpenedResendEvent = (event) => {
  if (typeof event !== "string") return false;
  const normalized = event.toLowerCase();
  return normalized === "opened" || normalized === "clicked";
};

const resendGetWithRetry = async (apiKey, urlPath) => {
  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    const response = await fetch(`https://api.resend.com${urlPath}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (response.ok) {
      return response.json();
    }

    if (response.status === 429 && attempt < RETRY_ATTEMPTS) {
      console.log(`[backfill] Rate limited, aguardando ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS);
      continue;
    }

    throw new Error(`Resend API error: ${response.status}`);
  }
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

const listResendEmails = async ({ apiKey, days }) => {
  const cutoffMs = Date.now() - days * 24 * 60 * 60 * 1000;
  const welcomeEmails = [];
  const remindedRecipients = new Set();
  const activeRecipients = new Set(); // Usuários que clicaram/abriram QUALQUER email
  let cursor = "";
  let pages = 0;
  let totalEmailsScanned = 0;

  console.log(`[backfill] Buscando emails no Resend (últimos ${days} dias)...`);

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
      
      // Rastrear usuários que clicaram/abriram QUALQUER email (já interagiram)
      if (recipient && isOpenedResendEvent(item.last_event)) {
        activeRecipients.add(recipient);
      }
      
      // Verificar se é email de lembrete (para excluir quem já recebeu)
      const reminderLanguage = detectLanguageBySubject(subject, REMINDER_SUBJECT_RULES);
      if (reminderLanguage) {
        if (recipient) remindedRecipients.add(recipient);
        continue;
      }

      // Verificar se é email de boas-vindas
      const welcomeLanguage = detectLanguageBySubject(subject, WELCOME_SUBJECT_RULES);
      if (!welcomeLanguage) continue;

      // Verificar se o email de boas-vindas foi aberto
      if (isOpenedResendEvent(item.last_event)) continue;

      // Verificar se já passou o tempo mínimo (6 horas)
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

  console.log(`[backfill] Páginas do Resend: ${pages}, Emails escaneados: ${totalEmailsScanned}`);

  return { welcomeEmails, remindedRecipients, activeRecipients };
};

const run = async () => {
  await loadEnv();

  const args = process.argv.slice(2);
  const shouldSend = parseFlag(args, "--send");
  const limit = parseNumberFlag(args, "--limit", DEFAULT_LIMIT);
  const days = parseNumberFlag(args, "--days", DEFAULT_DAYS);

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const resendApiKey = process.env.RESEND_API_KEY || "";

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[backfill] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exitCode = 1;
    return;
  }

  if (!resendApiKey) {
    console.error("[backfill] Missing RESEND_API_KEY");
    process.exitCode = 1;
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 1. Buscar emails do Resend (últimos N dias)
  const { welcomeEmails, remindedRecipients, activeRecipients } = await listResendEmails({ apiKey: resendApiKey, days });

  console.log(`[backfill] Emails de boas-vindas NÃO abertos: ${welcomeEmails.length}`);
  console.log(`[backfill] Já receberam lembrete (Resend): ${remindedRecipients.size}`);
  console.log(`[backfill] Já interagiram (clicaram em algum email): ${activeRecipients.size}`);

  if (welcomeEmails.length === 0) {
    console.log("[backfill] Nenhum email de boas-vindas não aberto encontrado.");
    return;
  }

  // 2. Filtrar quem já recebeu lembrete OU já interagiu com algum email
  const candidatesAfterReminder = welcomeEmails.filter(e => 
    !remindedRecipients.has(e.email) && !activeRecipients.has(e.email)
  );
  console.log(`[backfill] Após filtrar lembretes e ativos: ${candidatesAfterReminder.length}`);

  // 3. Buscar idioma preferido dos usuários no Supabase
  const candidateEmails = [...new Set(candidatesAfterReminder.map(e => e.email))];
  
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, preferred_language, full_name")
    .in("email", candidateEmails);

  const profileByEmail = new Map();
  for (const p of profiles || []) {
    if (p.email) {
      profileByEmail.set(normalizeEmail(p.email), p);
    }
  }

  // 4. Montar lista final de elegíveis
  const eligible = [];
  const processedEmails = new Set();

  for (const item of candidatesAfterReminder) {
    if (processedEmails.has(item.email)) continue;
    processedEmails.add(item.email);

    const profile = profileByEmail.get(item.email);
    
    // Determinar idioma: preferência do perfil > idioma do email original
    let language = item.language || "en";
    if (profile?.preferred_language) {
      language = normalizeLanguage(profile.preferred_language);
    }

    // Determinar nome
    let userName = item.email.split("@")[0];
    if (profile?.full_name) {
      userName = profile.full_name;
    }

    eligible.push({
      email: item.email,
      language,
      userName,
      lastEvent: item.last_event,
      sentAt: item.created_at,
      hoursSinceSent: item.hoursSinceSent,
    });

    if (eligible.length >= limit) break;
  }

  console.log(`[backfill] ${eligible.length} usuários elegíveis para receber lembrete.`);

  if (eligible.length === 0) {
    console.log("[backfill] Nenhum usuário elegível encontrado.");
    return;
  }

  // Mostrar preview
  console.log("\n[backfill] Preview dos usuários elegíveis:");
  console.log("─".repeat(90));
  for (const u of eligible.slice(0, 20)) {
    console.log(`  ${u.email.padEnd(40)} | ${u.language} | ${u.hoursSinceSent}h atrás`);
  }
  if (eligible.length > 20) {
    console.log(`  ... e mais ${eligible.length - 20} usuários`);
  }
  console.log("─".repeat(90));

  if (!shouldSend) {
    console.log("\n[backfill] Modo PREVIEW. Use --send para enviar os emails.");
    console.log(`[backfill] Comando: node scripts/backfill-welcome-reminders.mjs --send --limit=${eligible.length}`);
    return;
  }

  // 5. Enviar emails
  console.log(`\n[backfill] Enviando ${eligible.length} emails de lembrete...`);

  let sentCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const candidate of eligible) {
    try {
      // Criar conta se necessário e obter token
      const accountData = await callInternalFunction({
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

      // Enviar email de lembrete
      const response = await callInternalFunction({
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
            source: "backfill_script",
            reminder_type: "backfill",
          },
        },
      });

      if (response?.skipped) {
        skippedCount++;
        console.log(`  [SKIP] ${candidate.email} - já recebeu lembrete`);
      } else {
        sentCount++;
        console.log(`  [OK] ${candidate.email} (${candidate.language})`);
      }

      await sleep(DELAY_BETWEEN_SENDS_MS);
    } catch (error) {
      errorCount++;
      console.error(`  [ERRO] ${candidate.email}: ${error.message}`);
    }
  }

  console.log("\n[backfill] Concluído!");
  console.log(`  Enviados: ${sentCount}`);
  console.log(`  Pulados (já recebeu): ${skippedCount}`);
  console.log(`  Erros: ${errorCount}`);
};

run().catch((error) => {
  console.error("[backfill] Erro fatal:", error);
  process.exitCode = 1;
});
