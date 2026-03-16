import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    subject: "🎉 Bem-vindo à Educly!",
    badge: "Acesso Liberado",
    heroTitle: "Bem-vindo à Educly! 🎉",
    heroSubtitle: "Você deu o primeiro passo para dominar a Inteligência Artificial e transformar sua carreira para sempre.",
    successTitle: "Conta ativa e pronta!",
    successBody: "Sua conta foi criada com o e-mail <strong>{email}</strong>. Você já pode acessar e começar agora mesmo.",
    sectionLabel: "O QUE VOCÊ VAI APRENDER",
    feature1: "ChatGPT, Claude e outras IAs",
    feature2: "Imagens incríveis com IA",
    feature3: "Automatizar tarefas do dia a dia",
    feature4: "Ganhar dinheiro com IA",
    cta: "Acessar Minha Conta",
    ctaNote: "Bons estudos!",
    team: "Equipe Educly",
    supportQ: "Ficou com dúvidas? Entre em contato:",
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
    // Magic link mode
    credentialsTitle: "Suas credenciais de acesso",
    credentialsEmail: "E-mail",
    credentialsPassword: "Senha",
    credentialsNote: "Você pode alterar sua senha a qualquer momento dentro do app.",
    // Existing user mode
    newPurchaseTitle: "Nova compra ativada! 🎉",
    newPurchaseBody: "Seu novo pacote já está disponível na sua conta <strong>{email}</strong>.",
  },
  en: {
    subject: "🎉 Welcome to Educly!",
    badge: "Access Granted",
    heroTitle: "Welcome to Educly! 🎉",
    heroSubtitle: "You have taken the first step to master Artificial Intelligence and transform your career forever.",
    successTitle: "Account active and ready!",
    successBody: "Your account was created with <strong>{email}</strong>. You can access and start right now.",
    sectionLabel: "WHAT YOU WILL LEARN",
    feature1: "ChatGPT, Claude and other AIs",
    feature2: "Create amazing images with AI",
    feature3: "Automate daily tasks",
    feature4: "Earn money with AI",
    cta: "Access My Account",
    ctaNote: "Happy learning!",
    team: "Educly Team",
    supportQ: "Have questions? Contact us:",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    credentialsTitle: "Your access credentials",
    credentialsEmail: "Email",
    credentialsPassword: "Password",
    credentialsNote: "You can change your password anytime inside the app.",
    newPurchaseTitle: "New purchase activated! 🎉",
    newPurchaseBody: "Your new package is now available in your account <strong>{email}</strong>.",
  },
  es: {
    subject: "🎉 ¡Bienvenido a Educly!",
    badge: "Acceso Liberado",
    heroTitle: "¡Bienvenido a Educly! 🎉",
    heroSubtitle: "Has dado el primer paso para dominar la Inteligencia Artificial y transformar tu carrera para siempre.",
    successTitle: "¡Cuenta activa y lista!",
    successBody: "Tu cuenta fue creada con el correo <strong>{email}</strong>. Ya puedes acceder y comenzar ahora mismo.",
    sectionLabel: "LO QUE APRENDERÁS",
    feature1: "ChatGPT, Claude y otras IAs",
    feature2: "Imágenes increíbles con IA",
    feature3: "Automatizar tareas diarias",
    feature4: "Ganar dinero con IA",
    cta: "Acceder a Mi Cuenta",
    ctaNote: "¡Buen aprendizaje!",
    team: "Equipo Educly",
    supportQ: "¿Tienes dudas? Contáctanos:",
    rights: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso",
    credentialsTitle: "Tus credenciales de acceso",
    credentialsEmail: "Correo",
    credentialsPassword: "Contraseña",
    credentialsNote: "Puedes cambiar tu contraseña en cualquier momento dentro de la app.",
    newPurchaseTitle: "¡Nueva compra activada! 🎉",
    newPurchaseBody: "Tu nuevo paquete ya está disponible en tu cuenta <strong>{email}</strong>.",
  },
  fr: {
    subject: "🎉 Bienvenue chez Educly !",
    badge: "Accès Libéré",
    heroTitle: "Bienvenue chez Educly ! 🎉",
    heroSubtitle: "Vous avez fait le premier pas pour maîtriser l'Intelligence Artificielle et transformer votre carrière.",
    successTitle: "Compte actif et prêt !",
    successBody: "Votre compte a été créé avec <strong>{email}</strong>. Vous pouvez accéder et commencer dès maintenant.",
    sectionLabel: "CE QUE VOUS ALLEZ APPRENDRE",
    feature1: "ChatGPT, Claude et d'autres IAs",
    feature2: "Créer des images incroyables avec l'IA",
    feature3: "Automatiser les tâches quotidiennes",
    feature4: "Gagner de l'argent avec l'IA",
    cta: "Accéder à Mon Compte",
    ctaNote: "Bon apprentissage !",
    team: "Équipe Educly",
    supportQ: "Vous avez des questions ?",
    rights: "Tous droits réservés.",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    credentialsTitle: "Vos identifiants d'accès",
    credentialsEmail: "E-mail",
    credentialsPassword: "Mot de passe",
    credentialsNote: "Vous pouvez modifier votre mot de passe à tout moment dans l'application.",
    linkExpiry: "Ce lien est valide pendant 24 heures.",
    newPurchaseTitle: "Nouvel achat activé ! 🎉",
    newPurchaseBody: "Votre nouveau forfait est désormais disponible dans votre compte <strong>{email}</strong>.",
  },
  de: {
    subject: "🎉 Willkommen bei Educly!",
    badge: "Zugang Freigeschaltet",
    heroTitle: "Willkommen bei Educly! 🎉",
    heroSubtitle: "Sie haben den ersten Schritt gemacht, um KI zu meistern und Ihre Karriere zu transformieren.",
    successTitle: "Konto aktiv und bereit!",
    successBody: "Ihr Konto wurde mit <strong>{email}</strong> erstellt. Sie können jetzt sofort loslegen.",
    sectionLabel: "WAS SIE LERNEN WERDEN",
    feature1: "ChatGPT, Claude und andere KIs",
    feature2: "Erstaunliche Bilder mit KI erstellen",
    feature3: "Tägliche Aufgaben automatisieren",
    feature4: "Geld mit KI verdienen",
    cta: "Auf Mein Konto Zugreifen",
    ctaNote: "Viel Erfolg beim Lernen!",
    team: "Educly Team",
    supportQ: "Haben Sie Fragen? Kontaktieren Sie uns:",
    rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    credentialsTitle: "Ihre Zugangsdaten",
    credentialsEmail: "E-Mail",
    credentialsPassword: "Passwort",
    credentialsNote: "Sie können Ihr Passwort jederzeit in der App ändern.",
    linkExpiry: "Dieser Link ist 24 Stunden gültig.",
    newPurchaseTitle: "Neuer Kauf aktiviert! 🎉",
    newPurchaseBody: "Ihr neues Paket ist jetzt in Ihrem Konto <strong>{email}</strong> verfügbar.",
  },
  it: {
    subject: "🎉 Benvenuto su Educly!",
    badge: "Accesso Sbloccato",
    heroTitle: "Benvenuto su Educly! 🎉",
    heroSubtitle: "Hai fatto il primo passo per padroneggiare l'Intelligenza Artificiale e trasformare la tua carriera.",
    successTitle: "Account attivo e pronto!",
    successBody: "Il tuo account è stato creato con <strong>{email}</strong>. Puoi accedere e iniziare subito.",
    sectionLabel: "COSA IMPARERAI",
    feature1: "ChatGPT, Claude e altre IA",
    feature2: "Creare immagini incredibili con l'IA",
    feature3: "Automatizzare le attività quotidiane",
    feature4: "Guadagnare con l'IA",
    cta: "Accedi al Mio Account",
    ctaNote: "Buon apprendimento!",
    team: "Team Educly",
    supportQ: "Hai domande? Contattaci:",
    rights: "Tutti i diritti riservati.",
    privacy: "Politica sulla Privacy",
    terms: "Termini di Utilizzo",
    credentialsTitle: "Le tue credenziali di accesso",
    credentialsEmail: "E-mail",
    credentialsPassword: "Password",
    credentialsNote: "Puoi cambiare la password in qualsiasi momento nell'app.",
    linkExpiry: "Questo link è valido per 24 ore.",
    newPurchaseTitle: "Nuovo acquisto attivato! 🎉",
    newPurchaseBody: "Il tuo nuovo pacchetto è ora disponibile nel tuo account <strong>{email}</strong>.",
  },
  ru: {
    subject: "🎉 Добро пожаловать в Educly!",
    badge: "Доступ Открыт",
    heroTitle: "Добро пожаловать в Educly! 🎉",
    heroSubtitle: "Вы сделали первый шаг к освоению ИИ и преобразованию своей карьеры.",
    successTitle: "Аккаунт активен и готов!",
    successBody: "Ваш аккаунт создан с <strong>{email}</strong>. Вы можете начать прямо сейчас.",
    sectionLabel: "ЧТО ВЫ УЗНАЕТЕ",
    feature1: "ChatGPT, Claude и другие ИИ",
    feature2: "Создавать потрясающие изображения с ИИ",
    feature3: "Автоматизировать повседневные задачи",
    feature4: "Зарабатывать деньги с ИИ",
    cta: "Войти в Мой Аккаунт",
    ctaNote: "Успешного обучения!",
    team: "Команда Educly",
    supportQ: "Есть вопросы? Свяжитесь с нами:",
    rights: "Все права защищены.",
    privacy: "Политика Конфиденциальности",
    terms: "Условия Использования",
    credentialsTitle: "Ваши данные для входа",
    credentialsEmail: "E-mail",
    credentialsPassword: "Пароль",
    credentialsNote: "Вы можете изменить пароль в любое время в приложении.",
    linkExpiry: "Эта ссылка действительна 24 часа.",
    newPurchaseTitle: "Новая покупка активирована! 🎉",
    newPurchaseBody: "Ваш новый пакет теперь доступен в вашем аккаунте <strong>{email}</strong>.",
  },
};

function t(lang: string, key: string): string {
  const n = lang.toLowerCase().split("-")[0];
  return TRANSLATIONS[n]?.[key] || TRANSLATIONS["en"]?.[key] || "";
}

// mode: 'legacy' | 'magic_link' | 'magic_link_existing'
function getEmailHtml(params: {
  userName: string;
  userEmail: string;
  language: string;
  mode: string;
  magicLinkUrl?: string;
  generatedPassword?: string;
}): string {
  const { userName, userEmail, language, mode, magicLinkUrl, generatedPassword } = params;
  const lang = language.toLowerCase().split("-")[0];

  // CTA URL: magic link or legacy signup link
  const ctaUrl = mode === 'legacy'
    ? `https://educly.app/cadastro?email=${encodeURIComponent(userEmail)}&lang=${lang}`
    : (magicLinkUrl || `https://educly.app/auth?email=${encodeURIComponent(userEmail)}`);

  const isExisting = mode === 'magic_link_existing';
  const successTitle = isExisting ? t(lang, "newPurchaseTitle") : t(lang, "successTitle");
  const successBodyText = isExisting
    ? t(lang, "newPurchaseBody").replace("{email}", userEmail)
    : t(lang, "successBody").replace("{email}", userEmail);

  // Credentials block (only for new magic_link accounts with password)
  let credentialsBlock = '';
  if (mode === 'magic_link' && generatedPassword) {
    credentialsBlock = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f4ff;border-radius:12px;border:1px solid #c7d2fe;margin-bottom:28px;"><tr><td style="padding:18px 22px;"><p style="font-size:14px;font-weight:700;color:#1e3a8a;margin:0 0 12px;">🔐 ${t(lang,"credentialsTitle")}</p><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:4px 0;font-size:13px;color:#374151;"><strong>${t(lang,"credentialsEmail")}:</strong> ${userEmail}</td></tr><tr><td style="padding:4px 0;font-size:13px;color:#374151;"><strong>${t(lang,"credentialsPassword")}:</strong> <code style="background:#e0e7ff;padding:2px 8px;border-radius:4px;font-family:monospace;">${generatedPassword}</code></td></tr></table><p style="font-size:11px;color:#6b7280;margin:10px 0 0;">${t(lang,"credentialsNote")}</p></td></tr></table>`;
  }

  // Link expiry note for magic link modes
  const expiryNote = mode !== 'legacy' ? `<tr><td style="text-align:center;padding-top:8px;font-size:11px;color:#9ca3af;">${t(lang,"linkExpiry")}</td></tr>` : '';

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#0f0c29 0%,#1a1060 50%,#24243e 100%);"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:48px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;"><!-- HERO --><tr><td style="background:linear-gradient(145deg,#1e3a8a 0%,#1d4ed8 40%,#2563eb 100%);border-radius:20px 20px 0 0;padding:44px 40px 36px;text-align:center;"><img src="https://educly.app/logo-educly.png" width="140" height="46" alt="Educly" style="filter:brightness(0) invert(1);opacity:0.95;margin-bottom:28px;"/><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px;"><tr><td style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);border-radius:100px;padding:6px 16px;font-size:12px;font-weight:600;color:#bfdbfe;letter-spacing:0.5px;text-transform:uppercase;">✦ ${t(lang,"badge")}</td></tr></table><h1 style="font-size:32px;font-weight:800;color:#fff;line-height:1.2;margin:0 0 14px;">${t(lang,"heroTitle").replace("Educly!","Educly,")} ${userName}!</h1><p style="font-size:15px;color:#bfdbfe;line-height:1.7;max-width:420px;margin:0 auto;">${t(lang,"heroSubtitle")}</p></td></tr><!-- BODY --><tr><td style="background:#ffffff;padding:40px 40px 32px;"><!-- Success Box --><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:12px;border:1px solid #a7f3d0;margin-bottom:28px;"><tr><td style="padding:18px 22px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="width:28px;height:28px;background:#10b981;border-radius:50%;text-align:center;vertical-align:top;color:#fff;font-size:14px;font-weight:700;line-height:28px;padding-right:12px;">✓</td><td style="font-size:14px;color:#065f46;line-height:1.6;"><strong style="display:block;margin-bottom:2px;font-size:15px;">${successTitle}</strong>${successBodyText}</td></tr></table></td></tr></table>${credentialsBlock}<!-- Features --><p style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6366f1;margin:0 0 14px;">${t(lang,"sectionLabel")}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;"><tr><td width="50%" style="padding:0 6px 12px 0;vertical-align:top;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:10px;"><tr><td style="padding:14px 16px;font-size:13px;color:#374151;font-weight:500;line-height:1.4;"><span style="font-size:20px;margin-right:8px;">🤖</span>${t(lang,"feature1")}</td></tr></table></td><td width="50%" style="padding:0 0 12px 6px;vertical-align:top;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:10px;"><tr><td style="padding:14px 16px;font-size:13px;color:#374151;font-weight:500;line-height:1.4;"><span style="font-size:20px;margin-right:8px;">🎨</span>${t(lang,"feature2")}</td></tr></table></td></tr><tr><td width="50%" style="padding:0 6px 0 0;vertical-align:top;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:10px;"><tr><td style="padding:14px 16px;font-size:13px;color:#374151;font-weight:500;line-height:1.4;"><span style="font-size:20px;margin-right:8px;">⚡</span>${t(lang,"feature3")}</td></tr></table></td><td width="50%" style="padding:0 0 0 6px;vertical-align:top;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faff;border:1px solid #e0e7ff;border-radius:10px;"><tr><td style="padding:14px 16px;font-size:13px;color:#374151;font-weight:500;line-height:1.4;"><span style="font-size:20px;margin-right:8px;">💰</span>${t(lang,"feature4")}</td></tr></table></td></tr></table><!-- CTA --><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 24px;"><tr><td style="text-align:center;"><a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 100%);color:#fff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 44px;border-radius:12px;letter-spacing:0.3px;">${t(lang,"cta")}</a></td></tr>${expiryNote}<tr><td style="text-align:center;padding-top:10px;font-size:12px;color:#9ca3af;">${t(lang,"ctaNote")} &nbsp;·&nbsp; <strong>${t(lang,"team")}</strong></td></tr></table><!-- Support Block --><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border-radius:12px;border:1px solid #f0f0f0;margin-top:24px;"><tr><td style="padding:20px 24px;"><p style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#9ca3af;text-align:center;margin:0 0 14px;">Suporte / Soporte / Support</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#6b7280;font-weight:500;"><span style="font-size:18px;margin-right:8px;">🇧🇷</span>Ficou com dúvidas? <a href="mailto:contact@educly.app" style="color:#4f46e5;text-decoration:none;font-weight:600;background:#eef2ff;padding:4px 12px;border-radius:100px;">contact@educly.app</a></td></tr><tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#6b7280;font-weight:500;"><span style="font-size:18px;margin-right:8px;">🇪🇸</span>¿Tienes dudas? <a href="mailto:contact@educly.app" style="color:#4f46e5;text-decoration:none;font-weight:600;background:#eef2ff;padding:4px 12px;border-radius:100px;">contact@educly.app</a></td></tr><tr><td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:500;"><span style="font-size:18px;margin-right:8px;">🇫🇷</span>Vous avez des questions? <a href="mailto:contact@educly.app" style="color:#4f46e5;text-decoration:none;font-weight:600;background:#eef2ff;padding:4px 12px;border-radius:100px;">contact@educly.app</a></td></tr></table></td></tr></table></td></tr><!-- FOOTER --><tr><td style="background:#0f172a;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;"><p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 6px;">Educly</p><p style="font-size:12px;color:#475569;line-height:1.8;margin:0;">© 2025 Educly. ${t(lang,"rights")}<br/><a href="https://educly.app/politica-privacidade" style="color:#6366f1;text-decoration:none;font-weight:500;">${t(lang,"privacy")}</a> &nbsp;·&nbsp; <a href="https://educly.app/termos-uso" style="color:#6366f1;text-decoration:none;font-weight:500;">${t(lang,"terms")}</a></p></td></tr></table></td></tr></table></body></html>`;
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
  console.log(`[Resend] Email sent successfully to ${to}`);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const body = await req.json();
    const { email, userName, language } = body;
    // New fields for magic link mode
    const mode: string = body.mode || 'legacy'; // 'legacy' | 'magic_link' | 'magic_link_existing'
    const magicLinkUrl: string | undefined = body.magic_link_url;
    const generatedPassword: string | undefined = body.generated_password;

    if (!email || !userName) {
      return new Response(JSON.stringify({ error: "Missing required fields: email, userName" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[send-welcome-email] Request for ${email}, user: ${userName}, lang: ${language}, mode: ${mode}`);

    // Dedup: check email_type based on mode
    const emailType = mode === 'legacy' ? 'welcome' : 'magic_link';
    const dedupType = mode === 'magic_link_existing' ? null : emailType; // no dedup for existing user re-purchases

    if (dedupType) {
      const { data: existingLog } = await supabaseAdmin
        .from("email_logs")
        .select("id")
        .eq("recipient_email", email.toLowerCase().trim())
        .eq("email_type", dedupType)
        .maybeSingle();

      if (existingLog) {
        console.log(`[send-welcome-email] Already sent ${dedupType} to ${email}, skipping`);
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const normalizedLang = (language || "en").toLowerCase().split("-")[0];
    const subject = t(normalizedLang, "subject");
    const html = getEmailHtml({
      userName,
      userEmail: email,
      language: normalizedLang,
      mode,
      magicLinkUrl,
      generatedPassword,
    });

    // Create email log first for tracking pixel
    const { data: logEntry } = await supabaseAdmin
      .from("email_logs")
      .insert({
        recipient_email: email.toLowerCase().trim(),
        email_type: emailType,
        subject,
        status: "pending",
        metadata: { mode },
      })
      .select("id")
      .single();

    // Inject tracking pixel
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const trackingPixel = logEntry
      ? `<img src="${supabaseUrl}/functions/v1/track-email-open?id=${logEntry.id}" width="1" height="1" style="display:none" alt=""/>`
      : "";
    const htmlWithTracking = html.replace("</body>", `${trackingPixel}</body>`);

    await sendEmailViaSMTP(email, subject, htmlWithTracking);

    // Update log to sent
    if (logEntry) {
      await supabaseAdmin
        .from("email_logs")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", logEntry.id);
    }

    console.log(`[send-welcome-email] Email sent to ${email} (mode=${mode})`);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[send-welcome-email] Error:", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
