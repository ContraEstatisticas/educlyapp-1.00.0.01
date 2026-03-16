import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-debug-token",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "GET") return new Response("Method Not Allowed", { status: 405 });

  try {
    const tokenHeader = req.headers.get("x-debug-token") || "";
    const debugToken = Deno.env.get("DEBUG_TOKEN") || "";
    if (!debugToken || tokenHeader !== debugToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const url = new URL(req.url);
    const email = (url.searchParams.get("email") || "").toLowerCase().trim();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);

    if (!email) {
      return new Response(JSON.stringify({ error: "email is required" }), { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find user by email
    let userId: string | null = null;
    const perPage = 200;
    for (let page = 1; page <= 20; page++) {
      const { data: listData } = await supabase.auth.admin.listUsers({ page, perPage } as any);
      const match = listData?.users?.find((u: any) => (u.email || "").toLowerCase().trim() === email);
      if (match) {
        userId = match.id;
        break;
      }
      if (!listData?.users?.length || listData.users.length < perPage) break;
    }

    // Pull recent billing events for this email
    const { data: events, error: eventsError } = await supabase
      .from("billing_event_logs")
      .select("id, created_at, event_type, email, status, processed, error_message, payload")
      .ilike("email", email)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (eventsError) throw eventsError;

    // If user exists, fetch access tables
    let productAccess: any[] = [];
    let premiumAccess: any[] = [];
    if (userId) {
      const { data: upa } = await supabase
        .from("user_product_access")
        .select("product_id, product_type, is_active, granted_at, revoked_at, expires_at")
        .eq("user_id", userId)
        .order("granted_at", { ascending: false })
        .limit(200);
      productAccess = upa || [];

      const { data: uprem } = await supabase
        .from("user_premium_access")
        .select("is_premium, plan_type, purchased_at, plan_updated_at, expires_at")
        .eq("user_id", userId)
        .limit(1);
      premiumAccess = uprem || [];
    }

    return new Response(
      JSON.stringify({
        email,
        user_id: userId,
        events: (events || []).map((e: any) => ({
          id: e.id,
          created_at: e.created_at,
          event_type: e.event_type,
          status: e.status,
          processed: e.processed,
          error_message: e.error_message,
          // Peel common identifiers for quick inspection
          product_id:
            e.payload?.data?.product?.id ??
            e.payload?.oneoff?.product_id ??
            e.payload?.product_id ??
            e.payload?.subscription?.price_point?.features?.[0]?.ident ??
            null,
          has_email: !!(
            e.payload?.data?.buyer?.email ||
            e.payload?.data?.subscriber?.email ||
            e.payload?.customer?.email ||
            e.payload?.email
          ),
          source: e.payload?.source ?? null,
        })),
        product_access: productAccess,
        premium_access: premiumAccess?.[0] || null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[debug-billing] error:", err);
    return new Response(JSON.stringify({ error: err.message || "internal error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

