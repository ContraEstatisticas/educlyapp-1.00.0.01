const REMINDER_TRANSLATIONS = {
  pt: {
    subject: "Seu acesso ainda esta te esperando - Educly",
    heroTitle: "Seu acesso ainda esta te esperando.",
    heroSubtitle:
      "Percebemos que voce ainda nao entrou. Clique abaixo para acessar sua conta direto, sem precisar de senha.",
    cta: "Acessar",
    ctaNote: "Acesse com 1 clique",
    directLogin: "Entre diretamente aqui",
    manualLogin: "Ou entre com seus dados",
    manualAccessLink: "Acessar com seus dados",
    credentialsEmail: "Usuario",
    credentialsPassword: "Senha",
    credentialsChangeNote: "Voce pode alterar sua senha a qualquer momento dentro do app.",
    help: "Ajuda",
    privacy: "Privacidade",
    supportText: "Precisa de ajuda? Entre em contato:",
  },
  en: {
    subject: "Your access is still waiting - Educly",
    heroTitle: "Your access is still waiting for you.",
    heroSubtitle:
      "We noticed that you have not signed in yet. Click below to access your account instantly, no password needed.",
    cta: "Sign in",
    ctaNote: "Access with 1 click",
    directLogin: "Sign in directly here",
    manualLogin: "Or sign in with your credentials",
    manualAccessLink: "Sign in with your credentials",
    credentialsEmail: "User",
    credentialsPassword: "Password",
    credentialsChangeNote: "You can change your password anytime inside the app.",
    help: "Help",
    privacy: "Privacy",
    supportText: "Need help? Get in touch:",
  },
  es: {
    subject: "Tu acceso aun te esta esperando - Educly",
    heroTitle: "Tu acceso aun te esta esperando.",
    heroSubtitle:
      "Notamos que todavia no entraste. Haz clic abajo para acceder a tu cuenta directamente, sin necesidad de contrasena.",
    cta: "Acceder",
    ctaNote: "Accede con 1 clic",
    directLogin: "Inicia sesion directamente aqui",
    manualLogin: "O inicia sesion con tus datos",
    manualAccessLink: "Acceder con tus datos",
    credentialsEmail: "Usuario",
    credentialsPassword: "Contrasena",
    credentialsChangeNote: "Puedes cambiar tu contrasena en cualquier momento dentro de la app.",
    help: "Ayuda",
    privacy: "Privacidad",
    supportText: "Necesitas ayuda? Contactanos:",
  },
  fr: {
    subject: "Votre acces vous attend encore - Educly",
    heroTitle: "Votre acces vous attend encore.",
    heroSubtitle:
      "Nous avons remarque que vous ne vous etes pas encore connecte. Cliquez ci-dessous pour acceder directement a votre compte.",
    cta: "Acceder",
    ctaNote: "Accedez en 1 clic",
    directLogin: "Connectez-vous directement ici",
    manualLogin: "Ou connectez-vous avec vos identifiants",
    manualAccessLink: "Se connecter avec vos identifiants",
    credentialsEmail: "Utilisateur",
    credentialsPassword: "Mot de passe",
    credentialsChangeNote: "Vous pouvez modifier votre mot de passe a tout moment dans l'application.",
    help: "Aide",
    privacy: "Confidentialite",
    supportText: "Besoin d'aide? Contactez-nous:",
  },
  de: {
    subject: "Ihr Zugang wartet noch auf Sie - Educly",
    heroTitle: "Ihr Zugang wartet noch auf Sie.",
    heroSubtitle:
      "Wir haben gesehen, dass Sie sich noch nicht angemeldet haben. Klicken Sie unten, um direkt auf Ihr Konto zuzugreifen.",
    cta: "Zugreifen",
    ctaNote: "Zugriff mit 1 Klick",
    directLogin: "Melden Sie sich direkt hier an",
    manualLogin: "Oder melden Sie sich mit Ihren Daten an",
    manualAccessLink: "Mit Ihren Daten anmelden",
    credentialsEmail: "Benutzer",
    credentialsPassword: "Passwort",
    credentialsChangeNote: "Sie koennen Ihr Passwort jederzeit in der App aendern.",
    help: "Hilfe",
    privacy: "Datenschutz",
    supportText: "Brauchen Sie Hilfe? Kontaktieren Sie uns:",
  },
  it: {
    subject: "Il tuo accesso ti sta ancora aspettando - Educly",
    heroTitle: "Il tuo accesso ti sta ancora aspettando.",
    heroSubtitle:
      "Abbiamo notato che non sei ancora entrato. Clicca qui sotto per accedere direttamente al tuo account.",
    cta: "Accedi",
    ctaNote: "Accedi con 1 clic",
    directLogin: "Accedi direttamente qui",
    manualLogin: "Oppure accedi con i tuoi dati",
    manualAccessLink: "Accedi con i tuoi dati",
    credentialsEmail: "Utente",
    credentialsPassword: "Password",
    credentialsChangeNote: "Puoi cambiare la password in qualsiasi momento nell'app.",
    help: "Aiuto",
    privacy: "Privacy",
    supportText: "Hai bisogno di aiuto? Contattaci:",
  },
  ru: {
    subject: "Vash dostup vse eshche zhdet vas - Educly",
    heroTitle: "Vash dostup vse eshche zhdet vas.",
    heroSubtitle:
      "My zametili, chto vy eshche ne voshli. Nazhmite knopku nizhe, chtoby srazu otkryt akkaunt.",
    cta: "Voiti",
    ctaNote: "Voiti v 1 klik",
    directLogin: "Voiti pryamo zdes",
    manualLogin: "Ili voiti s vashimi dannymi",
    manualAccessLink: "Voiti s vashimi dannymi",
    credentialsEmail: "Polzovatel",
    credentialsPassword: "Parol",
    credentialsChangeNote: "Vy mozhete izmenit parol v lyuboi moment v prilozhenii.",
    help: "Pomoshch",
    privacy: "Privatnost",
    supportText: "Nuzhna pomoshch? Svyazhites s nami:",
  },
};

export const normalizeWelcomeReminderLanguage = (language, fallback = "en") => {
  if (typeof language !== "string" || language.trim().length === 0) {
    return fallback;
  }

  const normalized = language.trim().toLowerCase().split("-")[0];
  return REMINDER_TRANSLATIONS[normalized] ? normalized : fallback;
};

const tr = (language, key) => {
  const normalized = normalizeWelcomeReminderLanguage(language);
  return REMINDER_TRANSLATIONS[normalized]?.[key] || REMINDER_TRANSLATIONS.en[key] || "";
};

export const getWelcomeReminderSubject = (language) => tr(language, "subject");

export const renderWelcomeReminderEmail = ({
  userEmail,
  language,
  accessUrl,
  generatedPassword,
}) => {
  const lang = normalizeWelcomeReminderLanguage(language);
  const authUrl = "https://educly.app/auth";
  const ctaUrl = accessUrl || `https://educly.app/auth?email=${encodeURIComponent(userEmail)}`;
  const showCredentials = typeof generatedPassword === "string" && generatedPassword.length > 0;

  const manualBlock = showCredentials
    ? `
    <tr><td style="padding:0 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="height:1px;background:#e5e7eb;"></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:28px 40px 0;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">${tr(lang, "manualLogin")}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${tr(lang, "credentialsEmail")}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${userEmail}</p>
        </td></tr>
        <tr><td style="padding:0 0 14px;">
          <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${tr(lang, "credentialsPassword")}</p>
          <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${generatedPassword}</p>
        </td></tr>
      </table>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:4px 0 16px;line-height:1.5;">${tr(lang, "credentialsChangeNote")}</p>
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 8px;">${tr(lang, "manualAccessLink")}: <a href="${authUrl}" target="_blank" style="color:#7c3aed;font-weight:600;text-decoration:underline;">${authUrl}</a></p>
    </td></tr>`
    : "";

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

<tr><td style="padding:40px 40px 32px;border-bottom:1px solid #e5e7eb;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr>
    <td style="width:36px;height:36px;vertical-align:middle;"><img src="https://educly.app/images/corujaLogo.svg" width="36" height="36" alt="Educly" style="display:block;border:0;" /></td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#111827;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:26px;font-weight:800;color:#111827;line-height:1.2;letter-spacing:-0.02em;margin:0 0 8px;">${tr(lang, "heroTitle")}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${tr(lang, "heroSubtitle")}</p>
</td></tr>

<tr><td style="padding:28px 40px 24px;">
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px;">${tr(lang, "directLogin")}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#1f2937;border-radius:12px;text-align:center;">
    <a href="${ctaUrl}" target="_blank" style="display:block;color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;padding:16px 28px;">
      <span style="font-size:15px;font-weight:700;">${tr(lang, "ctaNote")}</span><br/>
      <span style="font-size:13px;font-weight:400;opacity:0.85;">${tr(lang, "cta")} -></span>
    </a>
  </td></tr></table>
</td></tr>

${manualBlock}

<tr><td style="padding:20px 40px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border-radius:10px;">
    <tr><td style="padding:16px 20px;text-align:center;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 4px;">${tr(lang, "supportText")}</p>
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;font-weight:600;color:#7c3aed;text-decoration:underline;">contact@educly.app</a>
    </td></tr>
  </table>
</td></tr>

<tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#9ca3af;">&copy; 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${tr(lang, "help")}</a>
      <span style="color:#9ca3af;font-size:12px;padding:0 8px;">&middot;</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${tr(lang, "privacy")}</a>
    </td>
  </tr></table>
</td></tr>

</table>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
};
