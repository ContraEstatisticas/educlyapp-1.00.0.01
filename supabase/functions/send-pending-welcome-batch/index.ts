import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BATCH_SIZE = 15;
const DELAY_BETWEEN_EMAILS_MS = 5000;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace('Bearer ', '');
    const { data: claims, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claims?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: isAdmin } = await anonClient.rpc('is_admin');
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin access required" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    console.log("[send-pending-welcome-batch] Starting batch...");

    // Get purchase event types
    const purchaseEventTypes = [
      'SETTLED', 'STARTING_TRIAL', 'SUBSCRIPTION_SETTLED',
      'SUBSCRIPTION_TRIAL_STARTED', 'GRANTED', 'CONVERTION',
      'RENEWING', 'RESUMING', 'RECOVERING', 'RECOVERING_AUTORENEW',
      'PURCHASE_COMPLETE', 'PURCHASE_APPROVED', 'PURCHASE_PROTEST', 'PURCHASE_DELAYED'
    ];

    // Find unprocessed billing events
    const { data: pendingEvents, error: pendingError } = await supabase
      .from('billing_event_logs')
      .select('id, email, payload, event_type')
      .in('status', ['pending', 'USER_NOT_FOUND'])
      .eq('processed', false)
      .order('created_at', { ascending: true })
      .limit(200);

    if (pendingError) throw new Error(`Failed to fetch pending events: ${pendingError.message}`);

    // Filter to purchase event types (case-insensitive) and deduplicate by email
    const filteredEvents = (pendingEvents || []).filter((e: any) =>
      purchaseEventTypes.some(t => t.toLowerCase() === (e.event_type || '').toLowerCase())
    );

    const emailMap = new Map<string, any>();
    for (const event of filteredEvents) {
      const email = (event.email || '').toLowerCase().trim().replace(/\.+$/, '');
      if (!email || emailMap.has(email)) continue;
      emailMap.set(email, event);
    }

    // Check which already got a welcome/magic_link email
    const allEmails = Array.from(emailMap.keys());
    if (allEmails.length === 0) {
      return new Response(JSON.stringify({ sent: 0, remaining: 0, message: "No pending emails" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: sentEmails } = await supabase
      .from('email_logs')
      .select('recipient_email')
      .in('email_type', ['welcome', 'magic_link'])
      .in('recipient_email', allEmails);

    const sentSet = new Set((sentEmails || []).map((e: any) => e.recipient_email.toLowerCase()));

    const pendingList = allEmails
      .filter(email => !sentSet.has(email))
      .slice(0, BATCH_SIZE)
      .map(email => ({ email, event: emailMap.get(email)! }));

    if (pendingList.length === 0) {
      return new Response(JSON.stringify({ sent: 0, remaining: 0, message: "All emails already sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: Array<{ email: string; success: boolean; account_created?: boolean; error?: string }> = [];
    let successCount = 0;

    for (const { email, event } of pendingList) {
      try {
        const buyerName = event.payload?.buyer_name
          || event.payload?.data?.buyer?.name
          || event.payload?.buyer?.name
          || event.payload?.subscriber?.name
          || email.split('@')[0];

        // Detect language from product or default to 'es'
        const productId = event.payload?.product_id || event.payload?.data?.product?.id || event.payload?.oneoff?.product_id;
        let language = 'es';
        if (productId) {
          const { data: prodDef } = await supabase
            .from('product_definitions')
            .select('language')
            .eq('product_id', productId)
            .maybeSingle();
          if (prodDef?.language) language = prodDef.language;
        }

        // Call auto-create-account to create account + token
        console.log(`[batch] Creating account for ${email}...`);
        const createRes = await fetch(`${supabaseUrl}/functions/v1/auto-create-account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ email, buyer_name: buyerName, language }),
        });

        const createData = await createRes.json();
        if (!createRes.ok && !createData.already_existed) {
          throw new Error(createData.error || `auto-create-account failed: ${createRes.status}`);
        }

        const accessToken = createData.access_token;
        const generatedPassword = createData.generated_password; // only for new accounts
        const mode = createData.already_existed ? 'magic_link_existing' : 'magic_link';

        // Call send-welcome-email
        console.log(`[batch] Sending welcome email to ${email} (mode=${mode})...`);
        const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            email,
            userName: buyerName,
            language,
            mode,
            access_token: accessToken,
            generated_password: generatedPassword,
          }),
        });

        const emailData = await emailRes.json();
        if (!emailRes.ok) {
          throw new Error(emailData.error || `send-welcome-email failed: ${emailRes.status}`);
        }

        results.push({ email, success: true, account_created: createData.account_created });
        successCount++;
        console.log(`[batch] ✓ ${email} (created=${createData.account_created})`);

      } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown";
        results.push({ email, success: false, error: msg });
        console.error(`[batch] ✗ ${email}:`, msg);
      }

      await delay(DELAY_BETWEEN_EMAILS_MS);
    }

    const remaining = allEmails.filter(e => !sentSet.has(e)).length - successCount;

    return new Response(JSON.stringify({
      sent: successCount,
      failed: pendingList.length - successCount,
      remaining: Math.max(0, remaining),
      results,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("[send-pending-welcome-batch] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
