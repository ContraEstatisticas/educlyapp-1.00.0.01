import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_BASE = "https://api.resend.com";

async function resendGet(apiKey: string, path: string) {
  const res = await fetch(`${RESEND_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${path} ${res.status}: ${text}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Admin check ---
    const authHeader = req.headers.get("Authorization") || "";
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: isAdmin } = await supabaseAuth.rpc("is_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    // --- Parse params from query string ---
    const url = new URL(req.url);
    const emailId = url.searchParams.get("email_id") || "";

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // --- Single email detail mode (returns body/html) ---
    if (emailId) {
      try {
        const detail = await resendGet(apiKey, `/emails/${emailId}`);
        return new Response(JSON.stringify(detail), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 100);
    const after = url.searchParams.get("after") || "";
    const search = (url.searchParams.get("search") || "").trim().toLowerCase();
    const days = Math.max(1, Math.min(365, parseInt(url.searchParams.get("days") || "7")));

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffISO = cutoff.toISOString();

    async function resendGetSafe(key: string, path: string, retries = 3): Promise<any> {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          return await resendGet(key, path);
        } catch (e: any) {
          if (e.message?.includes("429") && attempt < retries) {
            await sleep(1500 * (attempt + 1));
            continue;
          }
          throw e;
        }
      }
    }

    function isWithinRange(createdAt: string): boolean {
      return createdAt >= cutoffISO;
    }

    // --- Fetch domains (skip during search to save rate limit) ---
    const domainDetails: any[] = [];
    let domainsError: string | null = null;
    if (!search) {
      try {
        const domains = await resendGetSafe(apiKey, "/domains");
        if (domains.data && Array.isArray(domains.data)) {
          for (const domain of domains.data) {
            await sleep(300);
            try {
              const detail = await resendGetSafe(apiKey, `/domains/${domain.id}`);
              domainDetails.push(detail);
            } catch {
              domainDetails.push(domain);
            }
          }
        }
      } catch (e: any) {
        domainsError = e.message;
      }
      await sleep(400);
    }

    // --- Fetch emails (filtered by date range) ---
    let emailsData: any[] = [];
    let hasMore = false;
    let emailsError: string | null = null;
    let pagesScanned = 0;
    const stats: Record<string, number> = {
      total: 0, sent: 0, delivered: 0, opened: 0,
      clicked: 0, bounced: 0, complained: 0, delivery_delayed: 0,
    };

    try {
      // Unified page scanner — works for search, initial load, and pagination
      const MAX_PAGES = 50;
      let cursor = after || "";
      let reachedCutoff = false;

      for (let page = 0; page < MAX_PAGES; page++) {
        if (page > 0) await sleep(350);
        let path = `/emails?limit=100`;
        if (cursor) path += `&after=${cursor}`;
        const result = await resendGetSafe(apiKey, path);
        pagesScanned++;
        const items = result.data || [];

        for (const item of items) {
          // Resend returns newest first — if we hit an email older than cutoff, stop
          if (!isWithinRange(item.created_at || "")) {
            reachedCutoff = true;
            break;
          }

          const ev = item.last_event || "";
          stats.total++;
          if (ev in stats) stats[ev]++;

          if (search) {
            const haystack = [
              item.from || "",
              (item.to || []).join(" "),
              item.subject || "",
              ev,
              item.id || "",
            ].join(" ").toLowerCase();
            if (haystack.includes(search)) {
              emailsData.push(item);
            }
          } else {
            emailsData.push(item);
          }
        }

        if (reachedCutoff || !result.has_more || items.length === 0) break;
        cursor = items[items.length - 1].id;
        if (search && emailsData.length >= 500) {
          hasMore = true;
          break;
        }
      }

      // For non-search mode: paginate the collected emails
      if (!search && !after) {
        hasMore = emailsData.length > limit;
        emailsData = emailsData.slice(0, limit);
      }
    } catch (e: any) {
      emailsError = e.message;
    }

    // --- Build response ---
    const response = {
      emails: emailsData,
      has_more: hasMore,
      pages_scanned: pagesScanned,
      days,
      stats: stats.total > 0 ? stats : null,
      domains: domainDetails,
      emails_error: emailsError,
      domains_error: domainsError,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[resend-dashboard] Error:", error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
