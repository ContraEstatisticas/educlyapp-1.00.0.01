import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, ff-webhook-signature, x-hotmart-hottok',
};

// === IN-MEMORY RATE LIMITER ===
const ipRequests = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_PER_SECOND = 10;
const RATE_WINDOW_MS = 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  
  // Cleanup old entries every ~100 checks to prevent memory leak
  if (ipRequests.size > 500) {
    for (const [key, val] of ipRequests) {
      if (now - val.timestamp > 10000) ipRequests.delete(key);
    }
  }
  
  if (entry && now - entry.timestamp < RATE_WINDOW_MS) {
    entry.count++;
    return entry.count <= RATE_LIMIT_PER_SECOND;
  }
  
  ipRequests.set(ip, { count: 1, timestamp: now });
  return true;
}

// Timing-safe comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  let result = 0;
  for (let i = 0; i < aBuf.length; i++) {
    result |= aBuf[i] ^ bBuf[i];
  }
  return result === 0;
}

// HMAC-SHA256 signature validation for Funnelfox
async function validateHmacSignature(body: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const computed = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
    return timingSafeEqual(computed, signature.toLowerCase());
  } catch {
    return false;
  }
}

function normalizeEmail(raw: string | undefined | null): string {
  return (raw || '').toLowerCase().trim().replace(/\.+$/, '');
}

async function findUserByEmail(
  supabase: any,
  normalizedEmail: string,
): Promise<{ id: string; email_confirmed_at?: string | null } | null> {
  const perPage = 200;

  for (let page = 1; page <= 20; page++) {
    const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage } as any);

    if (listError || !listData?.users?.length) {
      return null;
    }

    const match = listData.users.find(
      (u: { id: string; email?: string; email_confirmed_at?: string | null }) =>
        normalizeEmail(u.email) === normalizedEmail,
    );
    if (match) {
      return {
        id: match.id,
        email_confirmed_at: match.email_confirmed_at ?? null,
      };
    }

    if (listData.users.length < perPage) break;
  }

  return null;
}

serve(async (req) => {
  // Reject non-POST immediately (bots, scanners)
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  // === RATE LIMITING: Check IP before ANY processing ===
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('x-real-ip') || 
                   'unknown';
  
  if (!checkRateLimit(clientIp)) {
    // Minimal response for bots — no CORS headers, no body
    return new Response(null, { status: 429 });
  }

  // === STEP 1: Check auth headers BEFORE reading body ===
  const hottok = req.headers.get('x-hotmart-hottok');
  const ffSignature = req.headers.get('ff-webhook-signature');

  // No recognized auth header — reject immediately WITHOUT reading body
  if (!hottok && !ffSignature) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Validate Hotmart via hottok header (no body needed)
  const HOTMART_HOTTOK = Deno.env.get('HOTMART_HOTTOK');
  if (hottok) {
    if (!HOTMART_HOTTOK || !timingSafeEqual(hottok, HOTMART_HOTTOK)) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // Now read body (only for authenticated requests)
  const rawBody = await req.text();

  // Validate Funnelfox/Primer via HMAC signature (needs body)
  if (!hottok && ffSignature) {
    const FF_TOKEN = Deno.env.get('FUNNELFOX_WEBHOOK_TOKEN');
    if (!FF_TOKEN || !(await validateHmacSignature(rawBody, ffSignature, FF_TOKEN))) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // === STEP 2: Auth passed — now initialize heavy resources ===
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  try {
    // Parse JSON from the already-read body
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.log('[primer-webhook] Invalid JSON payload, returning 200 to stop retries');
      return new Response(JSON.stringify({ error: 'Invalid JSON', ignored: true }), { status: 200, headers: corsHeaders });
    }

    const email = (
      payload.data?.buyer?.email ||
      payload.data?.subscriber?.email ||
      payload.customer?.email ||
      payload.email
    )?.toLowerCase().trim().replace(/\.+$/, '');

    if (!email) {
      console.log('[primer-webhook] No email found in payload, returning 200 to stop retries');
      return new Response(JSON.stringify({ error: 'No email found in payload', ignored: true }), { status: 200, headers: corsHeaders });
    }

    const buyerName = (
      payload.data?.buyer?.name ||
      payload.data?.subscriber?.name ||
      payload.customer?.name ||
      payload.name ||
      'Aluno'
    );

    const productId = (
      payload.data?.product?.id ||
      payload.oneoff?.product_id ||
      payload.product_id ||
      ''
    )?.toString();

    // Look up language and product_type from product_definitions
    let language = 'es';
    let productType = 'base';
    if (productId) {
      const { data: productDef } = await supabase
        .from('product_definitions')
        .select('language, product_type')
        .eq('product_id', productId)
        .maybeSingle();

      if (productDef?.language) language = productDef.language;
      if (productDef?.product_type) productType = productDef.product_type;
    }

    console.log(`[primer-webhook] Queuing: email=${email}, name=${buyerName}, product=${productId}, lang=${language}`);

    // Extract event_type from payload
    const rawEventType = (
      payload.data?.event_type ||
      payload.event_type ||
      payload.event ||
      'PURCHASE_COMPLETE'
    )?.toString();
    const eventType = rawEventType ? rawEventType.trim().toUpperCase().replace(/[.\s-]+/g, '_') : 'PURCHASE_COMPLETE';

    // ALWAYS insert billing_event_logs FIRST (before email dedup)
    const { error: billingError } = await supabase
      .from('billing_event_logs')
      .insert({
        email,
        event_type: eventType,
        payload,
        status: 'pending',
        processed: false,
      });

    if (billingError) {
      console.error(`[primer-webhook] Error inserting billing event:`, billingError);
    } else {
      console.log(`[primer-webhook] Billing event logged for ${email}, type=${eventType}`);
    }

    // Try to find existing user and process billing event in real-time
    const BILLING_ACTION_EVENTS = [
      // Acréscimo / Concessão
      'SETTLED', 'STARTING_TRIAL', 'SUBSCRIPTION_SETTLED',
      'SUBSCRIPTION_TRIAL_STARTED', 'GRANTED',
      'CONVERTION', 'RENEWING', 'RESUMING',
      'RECOVERING', 'RECOVERING_AUTORENEW',
      'PURCHASE_COMPLETE', 'PURCHASE_APPROVED',
      'PURCHASE_PROTEST', 'PURCHASE_DELAYED',
      
      // Decréscimo / Revogação
      'SUBSCRIPTION_CANCELLATION', 'PAUSING',
      'CANCELED', 'CANCELED_ADVANCED',
      'REFUNDED', 'REFUNDED_ADVANCED',
      'CHARGEBACK', 'CHARGEBACK_ADVANCED',
      'OVERDUE', 'EXPIRED'
    ];

    const AUTO_CONFIRM_EVENTS = [
      'SETTLED', 'STARTING_TRIAL', 'SUBSCRIPTION_SETTLED',
      'SUBSCRIPTION_TRIAL_STARTED', 'GRANTED',
      'CONVERTION', 'RENEWING', 'RESUMING',
      'RECOVERING', 'RECOVERING_AUTORENEW',
      'PURCHASE_COMPLETE', 'PURCHASE_APPROVED',
      'PURCHASE_PROTEST', 'PURCHASE_DELAYED',
    ];

    if (BILLING_ACTION_EVENTS.includes(eventType)) {
      try {
        const foundUser = await findUserByEmail(supabase, email);

        if (foundUser) {
          if (AUTO_CONFIRM_EVENTS.includes(eventType) && !foundUser.email_confirmed_at) {
            const { error: confirmError } = await supabase.auth.admin.updateUserById(foundUser.id, {
              email_confirm: true,
            });

            if (confirmError) {
              console.error('[primer-webhook] Failed to auto-confirm user after purchase:', confirmError);
            } else {
              console.log(`[primer-webhook] User auto-confirmed after purchase: ${foundUser.id}`);
            }
          }

          console.log(`[primer-webhook] User found: ${foundUser.id}, calling process_pending_billing_events`);
          const { error: rpcError } = await supabase.rpc('process_pending_billing_events', {
            p_user_id: foundUser.id,
            p_email: email,
          });

          if (rpcError) {
            console.error(`[primer-webhook] RPC error:`, rpcError);
          } else {
            console.log(`[primer-webhook] Billing correctly validated/revoked in real-time for ${email}`);
          }
        } else {
          console.log(`[primer-webhook] User not found for ${email}, will reconcile on signup`);
        }
      } catch (lookupErr) {
        console.error(`[primer-webhook] User lookup error:`, lookupErr);
      }
    }

    // === AUTO-CREATE ACCOUNT + MAGIC LINK (replaces legacy welcome email queue) ===
    // Check dedup: welcome OR magic_link already sent
    const { data: existingLog } = await supabase
      .from('email_logs')
      .select('id')
      .eq('recipient_email', email)
      .in('email_type', ['welcome', 'magic_link'])
      .limit(1);

    if (existingLog && existingLog.length > 0) {
      console.log(`[primer-webhook] Welcome/magic_link already sent to ${email}, skipping`);
      return new Response(JSON.stringify({ success: true, skipped: true, billing_logged: !billingError }), { headers: corsHeaders });
    }

    // Call auto-create-account
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    let autoCreateResult: any = null;
    let autoCreateFailed = false;

    try {
      const resp = await fetch(`${supabaseUrl}/functions/v1/auto-create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ email, buyer_name: buyerName, language }),
      });
      autoCreateResult = await resp.json();
      if (!resp.ok || autoCreateResult.error) {
        console.error('[primer-webhook] auto-create-account failed:', autoCreateResult);
        autoCreateFailed = true;
      }
    } catch (err) {
      console.error('[primer-webhook] auto-create-account fetch error:', err);
      autoCreateFailed = true;
    }

    if (autoCreateFailed && !autoCreateResult?.account_created) {
      // Failed BEFORE creating account → fall back to legacy signup queue
      console.log(`[primer-webhook] Falling back to legacy queue for ${email}`);
      await supabase.from('pending_thank_you_emails').insert({
        email,
        buyer_name: buyerName,
        product_id: productId || null,
        product_type: productType,
        language,
      });
      return new Response(JSON.stringify({ success: true, queued: true, legacy: true }), { headers: corsHeaders });
    }

    // Send magic link email
    const mode = autoCreateResult?.already_existed ? 'magic_link_existing' : 'magic_link';
    try {
      const resp = await fetch(`${supabaseUrl}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          email,
          userName: buyerName,
          language,
          mode,
          access_token: autoCreateResult?.access_token,
          generated_password: autoCreateResult?.generated_password,
        }),
      });
      if (!resp.ok) {
        console.error('[primer-webhook] send-welcome-email failed:', await resp.text());
        // Enqueue for retry (without password)
        await supabase.from('pending_thank_you_emails').insert({
          email, buyer_name: buyerName, product_id: productId || null,
          product_type: productType, language,
        });
      } else {
        console.log(`[primer-webhook] Magic link email sent to ${email}, mode: ${mode}`);
      }
    } catch (sendErr) {
      console.error('[primer-webhook] send-welcome-email fetch error:', sendErr);
      await supabase.from('pending_thank_you_emails').insert({
        email, buyer_name: buyerName, product_id: productId || null,
        product_type: productType, language,
      });
    }

    console.log(`[primer-webhook] Completed for ${email}`);
    return new Response(JSON.stringify({ success: true, magic_link: !autoCreateFailed }), { headers: corsHeaders });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[primer-webhook] Error:", error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: corsHeaders });
  }
});
