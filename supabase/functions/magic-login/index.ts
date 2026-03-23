import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple in-memory rate limit: max 10 requests per token per 60s
const tokenHits = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW = 60_000;
const RATE_MAX = 10;

function checkRate(token: string): boolean {
  const now = Date.now();
  if (tokenHits.size > 1000) {
    for (const [k, v] of tokenHits) {
      if (now - v.ts > RATE_WINDOW) tokenHits.delete(k);
    }
  }
  const entry = tokenHits.get(token);
  if (entry && now - entry.ts < RATE_WINDOW) {
    entry.count++;
    return entry.count <= RATE_MAX;
  }
  tokenHits.set(token, { count: 1, ts: now });
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    // Accept token from query param (GET) or body (POST)
    let rawToken: string | null = null;

    if (req.method === 'GET') {
      const url = new URL(req.url);
      rawToken = url.searchParams.get('token');
    } else if (req.method === 'POST') {
      const body = await req.json();
      rawToken = body.token;
    }

    // Sanitize: extract UUID from potentially corrupted token
    const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const token = rawToken ? (rawToken.match(UUID_REGEX)?.[0] || null) : null;

    if (rawToken && rawToken !== token) {
      console.log(`[magic-login] Sanitized token: "${rawToken?.substring(0, 80)}..." → "${token}"`);
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'token is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rate limit
    if (!checkRate(token)) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 1. Look up token
    const { data: tokenRow, error: tokenError } = await supabase
      .from('user_access_tokens')
      .select('user_id')
      .eq('token', token)
      .maybeSingle();

    if (tokenError || !tokenRow) {
      console.log(`[magic-login] Invalid token: ${token}`);
      return new Response(JSON.stringify({ error: 'invalid_token' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Get user email via admin API
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(tokenRow.user_id);

    if (userError || !userData?.user?.email) {
      console.error(`[magic-login] User not found for id: ${tokenRow.user_id}`, userError);
      return new Response(JSON.stringify({ error: 'user_not_found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const email = userData.user.email;

    // 3. Generate magic link OTP
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: 'https://educly.app/auth' },
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error(`[magic-login] Failed to generate magic link for ${email}:`, linkError);
      return new Response(JSON.stringify({ error: 'failed_to_generate_link' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 4. Extract OTP hashed_token from action_link and verify it server-side
    // The action_link looks like: https://PROJECT.supabase.co/auth/v1/verify?token=HASHED_TOKEN&type=magiclink&redirect_to=...
    const actionUrl = new URL(linkData.properties.action_link);
    const otpToken = actionUrl.searchParams.get('token');
    const otpType = actionUrl.searchParams.get('type') || 'magiclink';

    if (!otpToken) {
      console.error(`[magic-login] No token found in action_link for ${email}`);
      return new Response(JSON.stringify({ error: 'failed_to_extract_otp' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 5. Use the Supabase Auth REST API to verify the OTP and get session tokens
    // We call the verify endpoint directly to consume the OTP server-side
    const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({
        token_hash: otpToken,
        type: otpType,
      }),
    });

    if (!verifyResponse.ok) {
      const verifyError = await verifyResponse.text();
      console.error(`[magic-login] OTP verification failed for ${email}:`, verifyResponse.status, verifyError);
      return new Response(JSON.stringify({ error: 'otp_verification_failed' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sessionData = await verifyResponse.json();

    // The verify endpoint returns { access_token, refresh_token, ... }
    if (!sessionData.access_token || !sessionData.refresh_token) {
      console.error(`[magic-login] No session tokens in verify response for ${email}:`, JSON.stringify(sessionData).substring(0, 200));
      return new Response(JSON.stringify({ error: 'no_session_tokens' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[magic-login] Session tokens generated server-side for ${email}`);

    return new Response(JSON.stringify({
      access_token: sessionData.access_token,
      refresh_token: sessionData.refresh_token,
      expires_in: sessionData.expires_in,
      token_type: sessionData.token_type || 'bearer',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[magic-login] Error:', error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
