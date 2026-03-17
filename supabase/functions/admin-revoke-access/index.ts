import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Validate caller is admin
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userError } = await userClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: isAdmin } = await userClient.rpc("is_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { email, products } = await req.json();
    if (!email || !Array.isArray(products) || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "email and products[] required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Find user by email
    const cleanEmail = email.trim().toLowerCase();
    let targetUserId: string | null = null;

    const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
    for (const u of usersData?.users || []) {
      if (u.email?.toLowerCase() === cleanEmail) {
        targetUserId = u.id;
        break;
      }
    }

    if (!targetUserId) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Revoke selected products
    let revokedCount = 0;
    for (const productType of products) {
      const { data: updated } = await admin
        .from("user_product_access")
        .update({ is_active: false, revoked_at: new Date().toISOString() })
        .eq("user_id", targetUserId)
        .eq("product_type", productType)
        .eq("is_active", true)
        .select();

      revokedCount += updated?.length || 0;
    }

    // Check remaining active non-base products
    const { data: remaining } = await admin
      .from("user_product_access")
      .select("product_type")
      .eq("user_id", targetUserId)
      .eq("is_active", true)
      .neq("product_type", "base");

    const hasNonBase = (remaining?.length || 0) > 0;

    if (!hasNonBase) {
      await admin
        .from("user_premium_access")
        .update({ is_premium: false, plan_updated_at: new Date().toISOString() })
        .eq("user_id", targetUserId);
    }

    // Log the revoke event
    await admin.from("billing_event_logs").insert({
      email: cleanEmail,
      event_type: "MANUAL_REVOKE",
      status: "success",
      user_id: targetUserId,
      processed: true,
      processed_at: new Date().toISOString(),
      payload: {
        revoked_products: products,
        revoked_by: userData.user.email,
        is_premium_after: hasNonBase,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        revoked_count: revokedCount,
        is_premium_after: hasNonBase,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
