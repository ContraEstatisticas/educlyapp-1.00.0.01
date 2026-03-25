import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bell, X, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "educly:push-prompt-dismissed-at";
const MIN_DAYS_BETWEEN_PROMPTS = 7;

/**
 * A non-intrusive, beautifully animated prompt that invites the user to enable
 * push notifications.  It only shows when:
 *  1. The user is logged in.
 *  2. Push is supported by the browser.
 *  3. The user hasn't already subscribed.
 *  4. The user hasn't dismissed the prompt in the last 7 days.
 *  5. The user has been on the app for at least 10 seconds (delay).
 */
export const PushNotificationPrompt = () => {
  const { t } = useTranslation();
  const { status, subscribe, loading, isSupported } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data?.user);
    });
  }, []);

  // Delay showing prompt by 10s for better UX
  useEffect(() => {
    if (!isSupported || !isLoggedIn) return;
    if (status !== "prompt" && status !== "unsubscribed") return;

    // Check cooldown
    try {
      const lastDismissed = localStorage.getItem(DISMISS_KEY);
      if (lastDismissed) {
        const elapsed = Date.now() - new Date(lastDismissed).getTime();
        if (elapsed < MIN_DAYS_BETWEEN_PROMPTS * 24 * 60 * 60 * 1000) return;
      }
    } catch {}

    const timer = setTimeout(() => setVisible(true), 10_000);
    return () => clearTimeout(timer);
  }, [status, isSupported, isLoggedIn]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    } catch {}
  };

  const handleAccept = async () => {
    await subscribe();
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    } catch {}
  };

  if (!visible || dismissed || status === "subscribed" || status === "denied" || status === "unsupported") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50",
        "bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600",
        "dark:from-violet-700 dark:via-indigo-700 dark:to-blue-700",
        "text-white rounded-2xl shadow-2xl",
        "border border-white/10",
        "animate-in slide-in-from-bottom-6 fade-in duration-500"
      )}
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative p-5">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={t("pushNotifications.dismiss", "Fechar")}
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-start gap-4">
          {/* Animated bell icon */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="p-3 bg-white/15 backdrop-blur-sm rounded-xl">
                <BellRing className="h-6 w-6 text-yellow-300 animate-bounce" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-xl bg-yellow-300/20 animate-ping" />
            </div>
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <h4 className="font-bold text-base leading-tight">
              {t("pushNotifications.title", "Não perca nenhuma novidade!")}
            </h4>
            <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
              {t(
                "pushNotifications.description",
                "Ative as notificações para receber lembretes de aula, conquistas e manter sua sequência!"
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="flex-1 text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
          >
            {t("pushNotifications.later", "Depois")}
          </Button>
          <Button
            onClick={handleAccept}
            disabled={loading}
            size="sm"
            className={cn(
              "flex-1 bg-white text-indigo-700 hover:bg-white/90 font-semibold",
              "shadow-lg shadow-black/20"
            )}
          >
            <Bell className="h-4 w-4 mr-1.5" />
            {loading
              ? t("pushNotifications.activating", "Ativando...")
              : t("pushNotifications.activate", "Ativar")}
          </Button>
        </div>
      </div>
    </div>
  );
};
