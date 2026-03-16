import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    team: 'Equipe Educly',
  },
  en: {
    subject: '🔑 Your new access link — Educly',
    heroTitle: 'New access link',
    heroSubtitle: 'Click the button below to sign in directly to your Educly account.',
    cta: 'Sign In to My Account',
    team: 'Educly Team',
  },
  es: {
    subject: '🔑 Tu nuevo enlace de acceso — Educly',
    heroTitle: 'Nuevo enlace de acceso',
    heroSubtitle: 'Haz clic en el botón de abajo para entrar directamente a tu cuenta Educly.',
    cta: 'Entrar a Mi Cuenta',
    team: 'Equipo Educly',
  },
  fr: {
    subject: '🔑 Votre nouveau lien d\'accès — Educly',
    heroTitle: 'Nouveau lien d\'accès',
    heroSubtitle: 'Cliquez sur le bouton ci-dessous pour accéder directement à votre compte Educly.',
    cta: 'Accéder à Mon Compte',
    team: 'Équipe Educly',
  },
  de: {
    subject: '🔑 Ihr neuer Zugangslink — Educly',
    heroTitle: 'Neuer Zugangslink',
    heroSubtitle: 'Klicken Sie auf die Schaltfläche unten, um sich direkt bei Ihrem Educly-Konto anzumelden.',
    cta: 'Auf Mein Konto Zugreifen',
    team: 'Educly Team',
  },
  it: {
    subject: '🔑 Il tuo nuovo link di accesso — Educly',
    heroTitle: 'Nuovo link di accesso',
    heroSubtitle: 'Clicca sul pulsante qui sotto per accedere direttamente al tuo account Educly.',
    cta: 'Accedi al Mio Account',
    team: 'Team Educly',
  },
  ru: {
    subject: '🔑 Ваша новая ссылка для входа — Educly',
    heroTitle: 'Новая ссылка для входа',
    heroSubtitle: 'Нажмите кнопку ниже, чтобы войти в свой аккаунт Educly.',
    cta: 'Войти в Мой Аккаунт',
    team: 'Команда Educly',
  },
};

function tr(lang: string, key: string): string {
  const n = lang.toLowerCase().split('-')[0];
  return TRANSLATIONS[n]?.[key] || TRANSLATIONS['en']?.[key] || '';
}

function getMagicLinkEmailHtml(accessUrl: string, lang: string): string {
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#0f0c29 0%,#1a1060 50%,#24243e 100%);"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:48px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;"><tr><td style="background:linear-gradient(145deg,#1e3a8a 0%,#1d4ed8 40%,#2563eb 100%);border-radius:20px 20px 0 0;padding:44px 40px 36px;text-align:center;"><img src="https://educly.app/logo-educly.png" width="140" height="46" alt="Educly" style="filter:brightness(0) invert(1);opacity:0.95;margin-bottom:28px;"/><h1 style="font-size:28px;font-weight:800;color:#fff;line-height:1.2;margin:0 0 14px;">${tr(lang,'heroTitle')}</h1><p style="font-size:15px;color:#bfdbfe;line-height:1.7;max-width:420px;margin:0 auto;">${tr(lang,'heroSubtitle')}</p></td></tr><tr><td style="background:#ffffff;padding:40px 40px 32px;text-align:center;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 24px;"><tr><td style="text-align:center;"><a href="${accessUrl}" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 100%);color:#fff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 44px;border-radius:12px;">${tr(lang,'cta')}</a></td></tr></table></td></tr><tr><td style="background:#0f172a;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;"><p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 6px;">Educly</p><p style="font-size:12px;color:#475569;margin:0;">© 2025 Educly</p></td></tr></table></td></tr></table></body></html>`;
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

    // Rate limit: check if magic_link email sent in last 60s
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

    // Verify user exists
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

    // Get user's preferred language
    const { data: profile } = await supabase
      .from('profiles')
      .select('preferred_language')
      .eq('id', userId)
      .maybeSingle();
    const lang = (profile?.preferred_language || 'en').toLowerCase().split('-')[0];

    // Get or create permanent access token
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

    // Send email via Resend
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) throw new Error('RESEND_API_KEY not configured');

    const subject = tr(lang, 'subject');
    const html = getMagicLinkEmailHtml(accessUrl, lang);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Educly <noreply@educly.app>', to: [email], subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${res.status} - ${err}`);
    }

    // Log in email_logs
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
