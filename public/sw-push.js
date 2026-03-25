/**
 * Custom Service Worker additions for Educly PWA.
 *
 * This file is imported into the generated SW by vite-plugin-pwa (injectManifest mode).
 * It adds push notification handling on top of the Workbox precaching.
 *
 * NOTE: This is a plain JS file that runs in the Service Worker context (no DOM).
 */

// ---------- Push Event ----------
self.addEventListener("push", (event) => {
  /** @type {PushEvent} */
  const pushEvent = event;

  let payload = {
    title: "Educly",
    body: "Você tem uma nova notificação!",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    tag: "educly-notification",
    data: { url: "/dashboard" },
  };

  if (pushEvent.data) {
    try {
      const parsed = pushEvent.data.json();
      payload = { ...payload, ...parsed };
    } catch {
      try {
        payload.body = pushEvent.data.text();
      } catch {}
    }
  }

  const options = {
    body: payload.body,
    icon: payload.icon,
    badge: payload.badge,
    tag: payload.tag,
    data: payload.data,
    vibrate: [100, 50, 100],
    requireInteraction: false,
    actions: [
      {
        action: "open",
        title: "Abrir",
      },
      {
        action: "dismiss",
        title: "Fechar",
      },
    ],
  };

  pushEvent.waitUntil(self.registration.showNotification(payload.title, options));
});

// ---------- Notification Click ----------
self.addEventListener("notificationclick", (event) => {
  /** @type {NotificationEvent} */
  const notifEvent = event;

  notifEvent.notification.close();

  if (notifEvent.action === "dismiss") return;

  const targetUrl = notifEvent.notification.data?.url || "/dashboard";

  notifEvent.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus an existing window if possible
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open a new window
      return self.clients.openWindow(targetUrl);
    }),
  );
});

// ---------- Notification Close (analytics) ----------
self.addEventListener("notificationclose", (_event) => {
  // Optionally track notification dismissals here
});
