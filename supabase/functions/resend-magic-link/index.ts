import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT_SECONDS = 60;

const TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    subject: '🔑 Seu novo link de acesso — Educly',
    heroTitle: 'Novo link de acesso',
    heroSubtitle: 'Clique no botão abaixo para entrar diretamente na sua conta Educly.',
    cta: 'Acessar',
    accessBelow: 'Acesse através do botão abaixo',
    copyLink: 'Ou acesse diretamente:',
    credentialsTitle: 'Sua conta',
    credentialsNote: 'Use sua senha cadastrada ou clique no botão acima para entrar direto.',
    credentialsEmail: 'Usuário',
    help: 'Ajuda',
    privacy: 'Privacidade',
    supportText: 'Precisa de ajuda? Entre em contato:',
  },
  en: {
    subject: '🔑 Your new access link — Educly',
    heroTitle: 'New access link',
    heroSubtitle: 'Click the button below to sign in directly to your Educly account.',
    cta: 'Sign In',
    accessBelow: 'Access through the button below',
    copyLink: 'Or access directly:',
    credentialsTitle: 'Your account',
    credentialsNote: 'Use your registered password or click the button above to sign in directly.',
    credentialsEmail: 'User',
    help: 'Help',
    privacy: 'Privacy',
    supportText: 'Need help? Get in touch:',
  },
  es: {
    subject: '🔑 Tu nuevo enlace de acceso — Educly',
    heroTitle: 'Nuevo enlace de acceso',
    heroSubtitle: 'Haz clic en el botón de abajo para entrar directamente a tu cuenta Educly.',
    cta: 'Acceder',
    accessBelow: 'Accede a través del botón de abajo',
    copyLink: 'O accede directamente:',
    credentialsTitle: 'Tu cuenta',
    credentialsNote: 'Usa tu contraseña registrada o haz clic en el botón de arriba para entrar directo.',
    credentialsEmail: 'Usuario',
    help: 'Ayuda',
    privacy: 'Privacidad',
    supportText: '¿Necesitas ayuda? Contáctanos:',
  },
  fr: {
    subject: '🔑 Votre nouveau lien d\'accès — Educly',
    heroTitle: 'Nouveau lien d\'accès',
    heroSubtitle: 'Cliquez sur le bouton ci-dessous pour accéder directement à votre compte Educly.',
    cta: 'Accéder',
    accessBelow: 'Accédez via le bouton ci-dessous',
    copyLink: 'Ou accédez directement :',
    credentialsTitle: 'Votre compte',
    credentialsNote: 'Utilisez votre mot de passe enregistré ou cliquez sur le bouton ci-dessus.',
    credentialsEmail: 'Utilisateur',
    help: 'Aide',
    privacy: 'Confidentialité',
    supportText: "Besoin d'aide ? Contactez-nous :",
  },
  de: {
    subject: '🔑 Ihr neuer Zugangslink — Educly',
    heroTitle: 'Neuer Zugangslink',
    heroSubtitle: 'Klicken Sie auf die Schaltfläche unten, um sich direkt bei Ihrem Educly-Konto anzumelden.',
    cta: 'Zugreifen',
    accessBelow: 'Zugang über den Button unten',
    copyLink: 'Oder greifen Sie direkt zu:',
    credentialsTitle: 'Ihr Konto',
    credentialsNote: 'Verwenden Sie Ihr registriertes Passwort oder klicken Sie oben auf die Schaltfläche.',
    credentialsEmail: 'Benutzer',
    help: 'Hilfe',
    privacy: 'Datenschutz',
    supportText: 'Brauchen Sie Hilfe? Kontaktieren Sie uns:',
  },
  it: {
    subject: '🔑 Il tuo nuovo link di accesso — Educly',
    heroTitle: 'Nuovo link di accesso',
    heroSubtitle: 'Clicca sul pulsante qui sotto per accedere direttamente al tuo account Educly.',
    cta: 'Accedi',
    accessBelow: 'Accedi tramite il pulsante qui sotto',
    copyLink: 'Oppure accedi direttamente:',
    credentialsTitle: 'Il tuo account',
    credentialsNote: 'Usa la tua password registrata o clicca sul pulsante sopra per accedere direttamente.',
    credentialsEmail: 'Utente',
    help: 'Aiuto',
    privacy: 'Privacy',
    supportText: 'Hai bisogno di aiuto? Contattaci:',
  },
  ru: {
    subject: '🔑 Ваша новая ссылка для входа — Educly',
    heroTitle: 'Новая ссылка для входа',
    heroSubtitle: 'Нажмите кнопку ниже, чтобы войти в свой аккаунт Educly.',
    cta: 'Войти',
    accessBelow: 'Войдите через кнопку ниже',
    copyLink: 'Или перейдите напрямую:',
    credentialsTitle: 'Ваш аккаунт',
    credentialsNote: 'Используйте зарегистрированный пароль или нажмите кнопку выше для входа.',
    credentialsEmail: 'Пользователь',
    help: 'Помощь',
    privacy: 'Конфиденциальность',
  },
};

function tr(lang: string, key: string): string {
  const n = lang.toLowerCase().split('-')[0];
  return TRANSLATIONS[n]?.[key] || TRANSLATIONS['en']?.[key] || '';
}

function getMagicLinkEmailHtml(accessUrl: string, email: string, lang: string): string {
  const authUrl = "https://educly.app/auth";

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<!-- Card -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:40px 40px 32px;border-bottom:1px solid #e5e7eb;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr>
    <td style="width:36px;height:36px;background:#1f2937;border-radius:10px;text-align:center;vertical-align:middle;font-size:16px;">🎓</td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#111827;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:26px;font-weight:800;color:#111827;line-height:1.2;letter-spacing:-0.02em;margin:0 0 8px;">${tr(lang,'heroTitle')}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${tr(lang,'heroSubtitle')}</p>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="height:1px;background:#e5e7eb;"></td>
  </tr></table>
</td></tr>

<!-- Account info -->
<tr><td style="padding:24px 40px 0;">
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:16px;font-weight:700;color:#111827;margin:0 0 14px;">${tr(lang,'credentialsTitle')}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding:0 0 14px;">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;font-weight:600;color:#f97316;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">${tr(lang,'credentialsEmail')}</p>
      <p style="font-family:'Courier New',monospace;font-size:15px;color:#111827;margin:0;">${email}</p>
    </td></tr>
  </table>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:4px 0 0;line-height:1.5;">${tr(lang,'credentialsNote')}</p>
</td></tr>

<!-- Body / CTA -->
<tr><td style="padding:28px 40px 32px;">
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#374151;margin:0 0 16px;">${tr(lang,'accessBelow')}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td style="background:#1f2937;border-radius:12px;text-align:center;">
    <a href="${accessUrl}" target="_blank" style="display:block;color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;font-size:15px;font-weight:700;padding:16px 28px;">${tr(lang,'cta')} →</a>
  </td></tr></table>
  <!-- Copy-paste link -->
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;color:#6b7280;margin:0 0 6px;line-height:1.4;">${tr(lang,'copyLink')}</p>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:13px;margin:0;word-break:break-all;line-height:1.4;"><a href="${authUrl}" target="_blank" style="color:#7c3aed;text-decoration:underline;">${authUrl}</a></p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#9ca3af;">© 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${tr(lang,'help')}</a>
      <span style="color:#9ca3af;font-size:12px;padding:0 8px;">·</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#7c3aed;text-decoration:none;">${tr(lang,'privacy')}</a>
    </td>
  </tr></table>
</td></tr>

</table>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  try {
    const { email: rawEmail } = await req.json();
    if (!rawEmail) {
      return new Response(JSON.stringify({ error: 'email is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const email = rawEmail.toLowerCase().trim().replace(/\.+$/, '');
    console.log(`[resend-magic-link] Request for: ${email}`);

    const cutoff = new Date(Date.now() - RATE_LIMIT_SECONDS * 1000).toISOString();
    const { data: recentLog } = await supabase
      .from('email_logs')
      .select('id')
      .eq('recipient_email', email)
      .eq('email_type', 'magic_link')
      .gte('created_at', cutoff)
      .maybeSingle();

    if (recentLog) {
      console.log(`[resend-magic-link] Rate limited for ${email}`);
      return new Response(JSON.stringify({ error: 'rate_limited', retry_after: RATE_LIMIT_SECONDS }), {
        status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let userId: string | null = null;
    const perPage = 1000;
    for (let page = 1; page <= 10; page++) {
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage } as any);
      if (listError || !listData?.users?.length) break;
      const match = listData.users.find(
        (u: { email?: string }) => (u.email || '').toLowerCase().trim() === email,
      );
      if (match) { userId = match.id; break; }
      if (listData.users.length < perPage) break;
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'user_not_found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('preferred_language')
      .eq('id', userId)
      .maybeSingle();
    const lang = (profile?.preferred_language || 'en').toLowerCase().split('-')[0];

    let accessToken: string | null = null;
    const { data: existingToken } = await supabase
      .from('user_access_tokens')
      .select('token')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingToken?.token) {
      accessToken = existingToken.token;
    } else {
      const { data: newToken, error: tokenError } = await supabase
        .from('user_access_tokens')
        .insert({ user_id: userId })
        .select('token')
        .single();

      if (tokenError) {
        console.error(`[resend-magic-link] Failed to create token:`, tokenError);
        return new Response(JSON.stringify({ error: 'failed_to_create_token' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      accessToken = newToken.token;
    }

    const accessUrl = `https://educly.app/magic-login?token=${accessToken}`;

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) throw new Error('RESEND_API_KEY not configured');

    const subject = tr(lang, 'subject');
    const html = getMagicLinkEmailHtml(accessUrl, email, lang);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Educly <noreply@educly.app>', to: [email], subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${res.status} - ${err}`);
    }

    await supabase.from('email_logs').insert({
      recipient_email: email,
      email_type: 'magic_link',
      subject,
      status: 'sent',
      sent_at: new Date().toISOString(),
      user_id: userId,
    });

    console.log(`[resend-magic-link] Permanent access link sent to ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[resend-magic-link] Error:', error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
