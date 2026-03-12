import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: "user_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Security: verify user was created recently (within last 10 minutes)
    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(user_id);

    if (userError || !user?.user) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const createdAt = new Date(user.user.created_at);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    if (createdAt < tenMinutesAgo) {
      return new Response(
        JSON.stringify({ error: "user too old for auto-confirm" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Security: verify purchase exists for this email
    const userEmail = user.user.email;
    if (userEmail) {
      const { data: hasPurchase } = await supabaseAdmin.rpc(
        "check_purchase_exists",
        { p_email: userEmail }
      );

      if (!hasPurchase) {
        return new Response(
          JSON.stringify({ error: "no purchase found for this email" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Confirm the email
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(user_id, {
        email_confirm: true,
      });

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ confirmed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
