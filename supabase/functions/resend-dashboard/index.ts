import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_BASE = "https://api.resend.com";
const RESEND_PAGE_SIZE = 100;
const DEFAULT_RESULT_LIMIT = 25;
const MAX_RESULT_LIMIT = 100;
const MAX_PAGES_TO_SCAN = 50;

type ResendEmail = {
  id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
};

async function resendGet(apiKey: string, path: string) {
  const response = await fetch(`${RESEND_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend ${path} ${response.status}: ${body}`);
  }

  return response.json();
}

function normalizeEmail(value: string) {
  const trimmed = value.trim().toLowerCase();
  const bracketMatch = trimmed.match(/<([^>]+)>/);
  return (bracketMatch?.[1] || trimmed).trim();
}

function isValidEmail(value: string) {
  return value.includes("@");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    const apiKey = Deno.env.get("RESEND_API_KEY") as string;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const url = new URL(req.url);
    const recipient = normalizeEmail(url.searchParams.get("recipient") || "");
    const limit = Math.min(
      Math.max(parseInt(url.searchParams.get("limit") || String(DEFAULT_RESULT_LIMIT), 10), 1),
      MAX_RESULT_LIMIT
    );

    if (!recipient) {
      return new Response(JSON.stringify({ error: "recipient is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidEmail(recipient)) {
      return new Response(JSON.stringify({ error: "recipient must be a valid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    async function resendGetSafe(path: string, retries = 3): Promise<any> {
      for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
          return await resendGet(apiKey, path);
        } catch (error: any) {
          if (error.message?.includes("429") && attempt < retries) {
            await sleep(1500 * (attempt + 1));
            continue;
          }
          throw error;
        }
      }

      throw new Error("Failed to fetch from Resend");
    }

    const emails: ResendEmail[] = [];
    let pagesScanned = 0;
    let cursor = "";
    let truncatedReason: "limit" | "scan_limit" | null = null;

    for (let page = 0; page < MAX_PAGES_TO_SCAN; page += 1) {
      if (page > 0) {
        await sleep(300);
      }

      let path = `/emails?limit=${RESEND_PAGE_SIZE}`;
      if (cursor) {
        path += `&after=${cursor}`;
      }

      const result = await resendGetSafe(path);
      const items = Array.isArray(result.data) ? result.data : [];
      const hasMore = Boolean(result.has_more);

      pagesScanned += 1;

      if (items.length === 0) {
        break;
      }

      for (const item of items) {
        const recipients = Array.isArray(item.to) ? item.to.map((value: string) => normalizeEmail(value)) : [];
        if (recipients.includes(recipient)) {
          emails.push({
            id: item.id,
            from: item.from,
            to: item.to || [],
            subject: item.subject,
            created_at: item.created_at,
            last_event: item.last_event,
          });
        }

        if (emails.length >= limit) {
          truncatedReason = "limit";
          break;
        }
      }

      if (emails.length >= limit) {
        break;
      }

      if (!hasMore) {
        break;
      }

      cursor = items[items.length - 1]?.id || "";
      if (!cursor) {
        break;
      }

      if (page === MAX_PAGES_TO_SCAN - 1) {
        truncatedReason = "scan_limit";
      }
    }

    return new Response(
      JSON.stringify({
        recipient,
        emails,
        limit,
        pages_scanned: pagesScanned,
        truncated_reason: truncatedReason,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[resend-dashboard] Error:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
