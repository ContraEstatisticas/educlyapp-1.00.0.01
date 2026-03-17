import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook para rastrear sessões de usuário.
 * Registra quando um usuário inicia uma sessão e mantém um ping periódico
 * para rastrear tempo ativo.
 */
export const useSessionTracking = () => {
  const sessionIdRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    const PING_INTERVAL_MS = 60000;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const updateSessionPing = async (useKeepalive = false) => {
      if (!sessionIdRef.current || isUpdatingRef.current) return;

      const timestamp = new Date().toISOString();
      isUpdatingRef.current = true;

      try {
        if (useKeepalive && supabaseUrl && publishableKey) {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.access_token) {
            await fetch(`${supabaseUrl}/rest/v1/user_sessions?id=eq.${sessionIdRef.current}`, {
              method: "PATCH",
              keepalive: true,
              headers: {
                "Content-Type": "application/json",
                apikey: publishableKey,
                Authorization: `Bearer ${session.access_token}`,
                Prefer: "return=minimal",
              },
              body: JSON.stringify({ last_ping_at: timestamp }),
            });
            return;
          }
        }

        await supabase
          .from("user_sessions")
          .update({ last_ping_at: timestamp })
          .eq("id", sessionIdRef.current);
      } catch (error) {
        console.error("Erro ao atualizar sessão:", error);
      } finally {
        isUpdatingRef.current = false;
      }
    };

    const startSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("user_sessions")
          .insert({
            user_id: user.id,
            started_at: new Date().toISOString(),
            last_ping_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (error || !data) {
          console.error("Erro ao iniciar sessão:", error);
          return;
        }

        sessionIdRef.current = data.id;

        // Ping a cada 1 minuto para manter o tempo de sessão mais fiel.
        intervalRef.current = setInterval(async () => {
          if (sessionIdRef.current && document.visibilityState === 'visible') {
            await updateSessionPing();
          }
        }, PING_INTERVAL_MS);
      } catch (error) {
        console.error("Erro no rastreamento de sessão:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (!sessionIdRef.current) return;

      if (document.visibilityState === "hidden") {
        void updateSessionPing(true);
      } else if (document.visibilityState === "visible") {
        void updateSessionPing();
      }
    };

    const handlePageHide = () => {
      if (!sessionIdRef.current) return;
      void updateSessionPing(true);
    };

    startSession();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);

      if (sessionIdRef.current) {
        void updateSessionPing(true);
      }
    };
  }, []);
};
