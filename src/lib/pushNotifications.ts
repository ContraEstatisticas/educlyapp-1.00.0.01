/**
 * Push Notification utilities for the Educly PWA.
 *
 * Uses the Web Push API (VAPID) to subscribe/unsubscribe users for native
 * push notifications delivered through the service worker.
 */
import { supabase } from "@/integrations/supabase/client";

// ----- VAPID public key (this is the PUBLIC key, safe to expose in client code) -----
// Replace this placeholder with your real VAPID public key generated via:
//   npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY =
  import.meta.env.VITE_VAPID_PUBLIC_KEY ??
  "BEl62iUYgUivxkv68gTVTH6aLHrGlWlXTTGqnFkLsBJPCPKnGV_WgpBijdPGsKVnlOG8H2CZrJqg9TBXE4V2xI";

const SERVICE_WORKER_TIMEOUT_MS = 8000;
const PUSH_OPERATION_TIMEOUT_MS = 10000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a base64-encoded VAPID key to a Uint8Array the Push API expects. */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return new Promise<T>((resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`[PushNotifications] Timed out while waiting for ${label}.`));
    }, timeoutMs);

    promise.then(
      (value) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(value);
      },
      (error) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        reject(error);
      },
    );
  });
}

/** Check whether the browser supports push notifications. */
export function isPushSupported(): boolean {
  return (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

/** Returns the active service-worker registration, or null. */
async function getSwRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;

  try {
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    if (existingRegistration) {
      return existingRegistration;
    }
  } catch (error) {
    console.warn("[PushNotifications] Failed to read existing service worker registration:", error);
  }

  try {
    return await withTimeout(
      navigator.serviceWorker.ready,
      SERVICE_WORKER_TIMEOUT_MS,
      "service worker readiness",
    );
  } catch (error) {
    console.warn("[PushNotifications] Service worker was not ready in time, trying manual registration:", error);
  }

  try {
    return await withTimeout(
      navigator.serviceWorker.register("/sw.js"),
      SERVICE_WORKER_TIMEOUT_MS,
      "service worker registration",
    );
  } catch (error) {
    console.error("[PushNotifications] Failed to register service worker for push notifications:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Subscribe / Unsubscribe
// ---------------------------------------------------------------------------

/**
 * Subscribe the current user to push notifications.
 *
 * 1. Requests Notification permission (if not already granted).
 * 2. Creates a PushSubscription via the service worker.
 * 3. Persists the subscription JSON in the `push_subscriptions` Supabase table.
 *
 * Returns the PushSubscription on success, or null when permission is denied /
 * unsupported.
 */
export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null;

  // 1. Request permission
  const permission =
    Notification.permission === "granted"
      ? "granted"
      : await withTimeout(
          Notification.requestPermission(),
          PUSH_OPERATION_TIMEOUT_MS,
          "notification permission",
        );
  if (permission !== "granted") return null;

  // 2. Get SW registration
  const registration = await getSwRegistration();
  if (!registration) return null;

  // 3. Subscribe
  try {
    const existingSubscription = await withTimeout(
      registration.pushManager.getSubscription(),
      PUSH_OPERATION_TIMEOUT_MS,
      "existing push subscription",
    );

    if (existingSubscription) {
      await saveSubscription(existingSubscription);
      return existingSubscription;
    }

    const subscription = await withTimeout(registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY).buffer as ArrayBuffer,
    }), PUSH_OPERATION_TIMEOUT_MS, "push subscription");

    // 4. Persist to Supabase
    await saveSubscription(subscription);

    return subscription;
  } catch (err) {
    console.error("[PushNotifications] Failed to subscribe:", err);
    return null;
  }
}

/**
 * Unsubscribe the current user from push notifications.
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  const registration = await getSwRegistration();
  if (!registration) return false;

  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return true; // already unsubscribed

  try {
    await subscription.unsubscribe();
    await removeSubscription(subscription);
    return true;
  } catch (err) {
    console.error("[PushNotifications] Failed to unsubscribe:", err);
    return false;
  }
}

/**
 * Returns the current PushSubscription if one exists.
 */
export async function getCurrentSubscription(): Promise<PushSubscription | null> {
  try {
    const registration = await getSwRegistration();
    if (!registration) return null;

    return await withTimeout(
      registration.pushManager.getSubscription(),
      PUSH_OPERATION_TIMEOUT_MS,
      "current push subscription",
    );
  } catch (error) {
    console.error("[PushNotifications] Failed to load current subscription:", error);
    return null;
  }
}

/**
 * Returns the current Notification permission state.
 */
export function getPermissionState(): NotificationPermission {
  if (!("Notification" in window)) return "denied";
  return Notification.permission;
}

// ---------------------------------------------------------------------------
// Supabase persistence
// ---------------------------------------------------------------------------

async function saveSubscription(subscription: PushSubscription): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const subJson = subscription.toJSON();

  // Upsert by endpoint to avoid duplicates
  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      user_id: user.id,
      endpoint: subJson.endpoint,
      p256dh: subJson.keys?.p256dh ?? "",
      auth: subJson.keys?.auth ?? "",
      subscription_json: JSON.stringify(subJson),
    },
    { onConflict: "endpoint" }
  );

  if (error) {
    console.error("[PushNotifications] Failed to persist subscription:", error);
  }
}

async function removeSubscription(subscription: PushSubscription): Promise<void> {
  const subJson = subscription.toJSON();

  const { error } = await supabase
    .from("push_subscriptions")
    .delete()
    .eq("endpoint", subJson.endpoint);

  if (error) {
    console.error("[PushNotifications] Failed to remove subscription:", error);
  }
}
