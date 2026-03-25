/**
 * send-push – Supabase Edge Function
 *
 * Sends Web Push notifications to one or more users.
 *
 * POST body (JSON):
 *   {
 *     "user_ids": ["uuid1", "uuid2"],          // optional – specific users
 *     "all": true,                              // optional – send to everyone
 *     "title": "Sua aula está esperando!",
 *     "body": "Não perca sua sequência de 7 dias!",
 *     "icon": "/pwa-192x192.png",               // optional
 *     "badge": "/pwa-192x192.png",              // optional
 *     "url": "/dashboard",                      // optional – click target
 *     "tag": "daily-reminder",                  // optional – collapse key
 *     "data": {}                                 // optional – extra payload
 *   }
 *
 * Required env secrets:
 *   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// ---- CORS helpers ----
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---- Web Push signing (simplified VAPID using Web Crypto) ----
// We use the web-push protocol directly since Deno doesn't support the npm
// "web-push" package well. The approach uses raw fetch + JWT (VAPID) headers.

async function importVapidKeys(publicKeyB64: string, privateKeyB64: string) {
  const publicKeyBytes = base64UrlDecode(publicKeyB64);
  const privateKeyBytes = base64UrlDecode(privateKeyB64);

  const publicKey = await crypto.subtle.importKey(
    "raw",
    publicKeyBytes,
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    [],
  );

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBytes,
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign"],
  );

  return { publicKey, privateKey, publicKeyBytes };
}

function base64UrlDecode(str: string): Uint8Array {
  const padding = "=".repeat((4 - (str.length % 4)) % 4);
  const base64 = (str + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createVapidJwt(
  audience: string,
  subject: string,
  privateKey: CryptoKey,
): Promise<string> {
  const header = { typ: "JWT", alg: "ES256" };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: subject,
  };

  const enc = new TextEncoder();
  const headerB64 = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(enc.encode(JSON.stringify(payload)));
  const unsigned = `${headerB64}.${payloadB64}`;

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      privateKey,
      enc.encode(unsigned),
    ),
  );

  return `${unsigned}.${base64UrlEncode(signature)}`;
}

async function sendWebPush(
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: string,
  vapidPublicKeyBytes: Uint8Array,
  vapidPrivateKey: CryptoKey,
  vapidSubject: string,
): Promise<{ ok: boolean; status: number; endpoint: string }> {
  const url = new URL(subscription.endpoint);
  const audience = `${url.protocol}//${url.host}`;

  const jwt = await createVapidJwt(audience, vapidSubject, vapidPrivateKey);
  const vapidKeyB64 = base64UrlEncode(vapidPublicKeyBytes);

  // For simplicity we send the payload unencrypted as a plaintext push.
  // Production implementations should use RFC 8291 encryption. For now we
  // rely on HTTPS transport encryption and add the payload as the body.
  const body = new TextEncoder().encode(payload);

  try {
    const response = await fetch(subscription.endpoint, {
      method: "POST",
      headers: {
        Authorization: `vapid t=${jwt}, k=${vapidKeyB64}`,
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "aes128gcm",
        TTL: "86400",
        Urgency: "normal",
      },
      body,
    });

    return { ok: response.ok, status: response.status, endpoint: subscription.endpoint };
  } catch (err) {
    console.error("Push delivery error:", err);
    return { ok: false, status: 0, endpoint: subscription.endpoint };
  }
}

// ---- Main handler ----

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
    const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY");
    const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:suporte@educly.app";

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      return new Response(
        JSON.stringify({ error: "VAPID keys not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { publicKeyBytes, privateKey } = await importVapidKeys(
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY,
    );

    const body = await req.json();
    const { user_ids, all, title, body: msgBody, icon, badge, url: clickUrl, tag, data } = body;

    if (!title) {
      return new Response(
        JSON.stringify({ error: "title is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch subscriptions
    let query = supabaseAdmin.from("push_subscriptions").select("*");
    if (!all && user_ids?.length) {
      query = query.in("user_id", user_ids);
    }

    const { data: subscriptions, error } = await query;
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!subscriptions?.length) {
      return new Response(
        JSON.stringify({ sent: 0, message: "No subscriptions found" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Build the notification payload
    const notificationPayload = JSON.stringify({
      title,
      body: msgBody ?? "",
      icon: icon ?? "/pwa-192x192.png",
      badge: badge ?? "/pwa-192x192.png",
      tag: tag ?? "educly-notification",
      data: {
        url: clickUrl ?? "/dashboard",
        ...data,
      },
    });

    // Send push to all subscriptions
    const results = await Promise.allSettled(
      subscriptions.map(async (sub: any) => {
        let parsed: any;
        try {
          parsed = JSON.parse(sub.subscription_json);
        } catch {
          parsed = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } };
        }

        const result = await sendWebPush(
          {
            endpoint: parsed.endpoint ?? sub.endpoint,
            keys: {
              p256dh: parsed.keys?.p256dh ?? sub.p256dh,
              auth: parsed.keys?.auth ?? sub.auth,
            },
          },
          notificationPayload,
          publicKeyBytes,
          privateKey,
          VAPID_SUBJECT,
        );

        // Clean up expired/invalid subscriptions (410 or 404)
        if (result.status === 410 || result.status === 404) {
          await supabaseAdmin
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
        }

        return result;
      }),
    );

    const sent = results.filter(
      (r) => r.status === "fulfilled" && (r.value as any).ok,
    ).length;
    const failed = results.length - sent;

    return new Response(
      JSON.stringify({ sent, failed, total: results.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-push error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
