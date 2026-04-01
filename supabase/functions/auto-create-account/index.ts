import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateSecurePassword(): string {
  const digits = new Uint8Array(9);
  crypto.getRandomValues(digits);
  const numPart = Array.from(digits, b => (b % 10).toString()).join('');
  const suffix = crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0 ? 'x' : 'k';
  return numPart + suffix;
}

function normalizeEmail(raw: string): string {
  return raw.toLowerCase().trim().replace(/\.+$/, '');
}

function normalizeDay1Variant(raw: unknown): 'atual' | 'guilherme' | 'sidney' {
  if (typeof raw !== 'string') return 'atual';
  const normalized = raw.trim().toLowerCase();
  if (normalized === 'guilherme' || normalized === 'sidney') return normalized;
  return 'atual';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  try {
    const { email: rawEmail, buyer_name, language, day1_variant, challenge_day1_variant } = await req.json();
    if (!rawEmail) {
      return new Response(JSON.stringify({ error: 'email is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const email = normalizeEmail(rawEmail);
    const normalizedBuyerName = typeof buyer_name === 'string' ? buyer_name.trim() : '';
    const usedFallbackName = normalizedBuyerName.length === 0;
    const name = normalizedBuyerName || 'Aluno';
    const lang = (language || 'es').toLowerCase().split('-')[0];
    const rawDay1Variant = day1_variant ?? challenge_day1_variant;
    const hasExplicitDay1Variant = typeof rawDay1Variant === 'string' && rawDay1Variant.trim().length > 0;
    const resolvedDay1Variant = normalizeDay1Variant(rawDay1Variant);
    const redirectTo = 'https://educly.app/auth';

    console.log(
      `[auto-create-account] Processing: email=${email}, name=${name}, lang=${lang}, day1_variant=${hasExplicitDay1Variant ? resolvedDay1Variant : 'default'}`
    );

    // 1. Check if user already exists
    let existingUserId: string | null = null;
    const perPage = 1000;
    for (let page = 1; page <= 10; page++) {
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage } as any);
      if (listError || !listData?.users?.length) break;
      const match = listData.users.find(
        (u: { email?: string }) => normalizeEmail(u.email || '') === email,
      );
      if (match) { existingUserId = match.id; break; }
      if (listData.users.length < perPage) break;
    }

    let userId: string;
    let accountCreated = false;
    let generatedPassword: string | null = null;

    if (existingUserId) {
      // User already exists — just generate magic link
      userId = existingUserId;
      console.log(`[auto-create-account] User already exists: ${userId}`);

      if (hasExplicitDay1Variant) {
        await supabase
          .from('profiles')
          .update({ challenge_day1_variant: resolvedDay1Variant })
          .eq('id', userId);
      }
    } else {
      // 2. Create account with random password
      generatedPassword = generateSecurePassword();
      const userMetadata: Record<string, string> = {
        full_name: name,
      };

      if (hasExplicitDay1Variant) {
        userMetadata.challenge_day1_variant = resolvedDay1Variant;
      }

      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: userMetadata,
      });

      if (createError) {
        console.error(`[auto-create-account] Failed to create user:`, createError);
        return new Response(JSON.stringify({
          error: createError.message,
          account_created: false,
          already_existed: false,
        }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      userId = createData.user.id;
      accountCreated = true;
      console.log(`[auto-create-account] User created: ${userId}`);

      // Update profile with language and whether the name already came from the buyer data
      const profileUpdates: Record<string, string | boolean> = {
        preferred_language: lang,
        name_confirmation_completed: !usedFallbackName,
      };

      if (hasExplicitDay1Variant) {
        profileUpdates.challenge_day1_variant = resolvedDay1Variant;
      }

      await supabase.from('profiles').update(profileUpdates).eq('id', userId);
    }

    // 3. Process pending billing events
    try {
      const { error: rpcError } = await supabase.rpc('process_pending_billing_events', {
        p_user_id: userId,
        p_email: email,
      });
      if (rpcError) {
        console.error(`[auto-create-account] RPC billing error (non-blocking):`, rpcError);
      } else {
        console.log(`[auto-create-account] Billing processed for ${email}`);
      }
    } catch (billingErr) {
      console.error(`[auto-create-account] Billing exception (non-blocking):`, billingErr);
    }

    // 4. Generate or fetch permanent access token
    let accessToken: string | null = null;
    try {
      // Try to get existing token first
      const { data: existingToken } = await supabase
        .from('user_access_tokens')
        .select('token')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingToken?.token) {
        accessToken = existingToken.token;
        console.log(`[auto-create-account] Existing permanent token found for ${userId}`);
      } else {
        // Create new permanent token
        const { data: newToken, error: tokenError } = await supabase
          .from('user_access_tokens')
          .insert({ user_id: userId })
          .select('token')
          .single();

        if (tokenError) {
          console.error(`[auto-create-account] Token creation error:`, tokenError);
        } else {
          accessToken = newToken.token;
          console.log(`[auto-create-account] Permanent token created for ${userId}`);
        }
      }
    } catch (tokenErr) {
      console.error(`[auto-create-account] Token exception (non-blocking):`, tokenErr);
    }

    return new Response(JSON.stringify({
      user_id: userId,
      access_token: accessToken, // permanent UUID token
      generated_password: generatedPassword, // only present for new accounts, never persisted
      account_created: accountCreated,
      already_existed: !!existingUserId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[auto-create-account] Error:', error);
    return new Response(JSON.stringify({ error: msg, account_created: false }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
