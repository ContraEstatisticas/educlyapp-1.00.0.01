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
    cta: 'Entrar na Minha Conta',
    copyLink: 'Ou copie e cole este link no navegador:',
    credentialsTitle: 'SUA CONTA',
    credentialsNote: 'Use sua senha cadastrada ou clique no botão acima para entrar direto.',
    credentialsEmail: 'E-mail',
    help: 'Ajuda',
    privacy: 'Privacidade',
  },
  en: {
    subject: '🔑 Your new access link — Educly',
    heroTitle: 'New access link',
    heroSubtitle: 'Click the button below to sign in directly to your Educly account.',
    cta: 'Sign In to My Account',
    copyLink: 'Or copy and paste this link in your browser:',
    credentialsTitle: 'YOUR ACCOUNT',
    credentialsNote: 'Use your registered password or click the button above to sign in directly.',
    credentialsEmail: 'Email',
    help: 'Help',
    privacy: 'Privacy',
  },
  es: {
    subject: '🔑 Tu nuevo enlace de acceso — Educly',
    heroTitle: 'Nuevo enlace de acceso',
    heroSubtitle: 'Haz clic en el botón de abajo para entrar directamente a tu cuenta Educly.',
    cta: 'Entrar a Mi Cuenta',
    copyLink: 'O copia y pega este enlace en tu navegador:',
    credentialsTitle: 'TU CUENTA',
    credentialsNote: 'Usa tu contraseña registrada o haz clic en el botón de arriba para entrar directo.',
    credentialsEmail: 'Correo',
    help: 'Ayuda',
    privacy: 'Privacidad',
  },
  fr: {
    subject: '🔑 Votre nouveau lien d\'accès — Educly',
    heroTitle: 'Nouveau lien d\'accès',
    heroSubtitle: 'Cliquez sur le bouton ci-dessous pour accéder directement à votre compte Educly.',
    cta: 'Accéder à Mon Compte',
    copyLink: 'Ou copiez et collez ce lien dans votre navigateur :',
    credentialsTitle: 'VOTRE COMPTE',
    credentialsNote: 'Utilisez votre mot de passe enregistré ou cliquez sur le bouton ci-dessus.',
    credentialsEmail: 'E-mail',
    help: 'Aide',
    privacy: 'Confidentialité',
  },
  de: {
    subject: '🔑 Ihr neuer Zugangslink — Educly',
    heroTitle: 'Neuer Zugangslink',
    heroSubtitle: 'Klicken Sie auf die Schaltfläche unten, um sich direkt bei Ihrem Educly-Konto anzumelden.',
    cta: 'Auf Mein Konto Zugreifen',
    copyLink: 'Oder kopieren Sie diesen Link und fügen Sie ihn in Ihren Browser ein:',
    credentialsTitle: 'IHR KONTO',
    credentialsNote: 'Verwenden Sie Ihr registriertes Passwort oder klicken Sie oben auf die Schaltfläche.',
    credentialsEmail: 'E-Mail',
    help: 'Hilfe',
    privacy: 'Datenschutz',
  },
  it: {
    subject: '🔑 Il tuo nuovo link di accesso — Educly',
    heroTitle: 'Nuovo link di accesso',
    heroSubtitle: 'Clicca sul pulsante qui sotto per accedere direttamente al tuo account Educly.',
    cta: 'Accedi al Mio Account',
    copyLink: 'Oppure copia e incolla questo link nel tuo browser:',
    credentialsTitle: 'IL TUO ACCOUNT',
    credentialsNote: 'Usa la tua password registrata o clicca sul pulsante sopra per accedere direttamente.',
    credentialsEmail: 'E-mail',
    help: 'Aiuto',
    privacy: 'Privacy',
  },
  ru: {
    subject: '🔑 Ваша новая ссылка для входа — Educly',
    heroTitle: 'Новая ссылка для входа',
    heroSubtitle: 'Нажмите кнопку ниже, чтобы войти в свой аккаунт Educly.',
    cta: 'Войти в Мой Аккаунт',
    copyLink: 'Или скопируйте и вставьте эту ссылку в браузер:',
    credentialsTitle: 'ВАШ АККАУНТ',
    credentialsNote: 'Используйте зарегистрированный пароль или нажмите кнопку выше для входа.',
    credentialsEmail: 'E-mail',
    help: 'Помощь',
    privacy: 'Конфиденциальность',
  },
};

function tr(lang: string, key: string): string {
  const n = lang.toLowerCase().split('-')[0];
  return TRANSLATIONS[n]?.[key] || TRANSLATIONS['en']?.[key] || '';
}

function getMagicLinkEmailHtml(accessUrl: string, email: string, lang: string): string {
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#07080f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#07080f;">
<tr><td style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;margin:0 auto;">

<!-- Card -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f1120;border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:40px 40px 36px;border-bottom:1px solid rgba(255,255,255,0.07);background:linear-gradient(135deg,rgba(79,110,247,0.12) 0%,transparent 60%);">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr>
    <td style="width:36px;height:36px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);border-radius:10px;text-align:center;vertical-align:middle;font-size:16px;">🎓</td>
    <td style="padding-left:10px;font-family:'Segoe UI',Tahoma,sans-serif;font-size:18px;font-weight:800;color:#e8eaf0;letter-spacing:-0.02em;">educly<span style="color:#f97316;">.</span></td>
  </tr></table>
  <h1 style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:28px;font-weight:800;color:#e8eaf0;line-height:1.15;letter-spacing:-0.03em;margin:0 0 10px;">${tr(lang,'heroTitle')}</h1>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:14px;color:#6b7280;line-height:1.6;margin:0;">${tr(lang,'heroSubtitle')}</p>
</td></tr>

<!-- Body -->
<tr><td style="padding:36px 40px 32px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;"><tr><td style="background:linear-gradient(135deg,#4f6ef7 0%,#6366f1 100%);border-radius:14px;text-align:center;">
    <a href="${accessUrl}" target="_blank" style="display:block;color:#ffffff;text-decoration:none;font-family:'Segoe UI',Tahoma,sans-serif;font-size:15px;font-weight:700;padding:17px 28px;letter-spacing:0.01em;">${tr(lang,'cta')} →</a>
  </td></tr></table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="height:1px;background:rgba(255,255,255,0.07);"></td>
  </tr></table>
</td></tr>

<!-- Account info -->
<tr><td style="padding:24px 40px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;">
    <tr><td style="padding:12px 16px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.07);">
      <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;margin:0;">${tr(lang,'credentialsTitle')}</p>
    </td></tr>
    <tr><td style="padding:13px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;font-weight:500;width:70px;">${tr(lang,'credentialsEmail')}</td>
        <td style="font-family:'Courier New',monospace;font-size:13px;color:#e8eaf0;text-align:right;">${email}</td>
      </tr></table>
    </td></tr>
  </table>
  <p style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;margin:10px 0 0;line-height:1.5;">${tr(lang,'credentialsNote')}</p>
</td></tr>

<!-- Spacer -->
<tr><td style="height:24px;"></td></tr>

<!-- Footer -->
<tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.07);">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;">© 2025 Educly</td>
    <td style="text-align:right;">
      <a href="mailto:contact@educly.app" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;">${tr(lang,'help')}</a>
      <span style="color:#6b7280;font-size:12px;padding:0 8px;">·</span>
      <a href="https://educly.app/politica-privacidade" style="font-family:'Segoe UI',Tahoma,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;">${tr(lang,'privacy')}</a>
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
