import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_PING_INTERVAL_MS = 15000;
const FIRST_SESSION_PING_DELAY_MS = 5000;
const MIN_PING_GAP_MS = 5000;

type PingOptions = {
  force?: boolean;
  useKeepalive?: boolean;
};

export const useSessionTracking = () => {
  const sessionIdRef = useRef<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstPingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUpdatingRef = useRef(false);
  const hasStartedSessionRef = useRef(false);
  const lastDispatchedPingAtRef = useRef(0);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const clearPingTimers = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (firstPingTimeoutRef.current) {
        clearTimeout(firstPingTimeoutRef.current);
        firstPingTimeoutRef.current = null;
      }
    };

    const setAccessToken = (token: string | null | undefined) => {
      accessTokenRef.current = token ?? null;
    };

    const canUseKeepaliveRequest = () => {
      return Boolean(
        sessionIdRef.current &&
        accessTokenRef.current &&
        supabaseUrl &&
        publishableKey,
      );
    };

    const dispatchKeepalivePing = (timestamp: string) => {
      if (!canUseKeepaliveRequest() || !sessionIdRef.current || !accessTokenRef.current) {
        return false;
      }

      try {
        void fetch(`${supabaseUrl}/rest/v1/user_sessions?id=eq.${sessionIdRef.current}`, {
          method: "PATCH",
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${accessTokenRef.current}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ last_ping_at: timestamp }),
        });
        return true;
      } catch (error) {
        console.error("Erro ao enviar keepalive da sessao:", error);
        return false;
      }
    };

    const updateSessionPing = async ({ force = false, useKeepalive = false }: PingOptions = {}) => {
      if (!sessionIdRef.current) return;

      const now = Date.now();
      if (!force && now - lastDispatchedPingAtRef.current < MIN_PING_GAP_MS) {
        return;
      }

      const timestamp = new Date(now).toISOString();

      if (useKeepalive) {
        const keepaliveSent = dispatchKeepalivePing(timestamp);
        if (keepaliveSent) {
          lastDispatchedPingAtRef.current = now;
          return;
        }
      }

      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;
      lastDispatchedPingAtRef.current = now;

      try {
        const { error } = await supabase
          .from("user_sessions")
          .update({ last_ping_at: timestamp })
          .eq("id", sessionIdRef.current);

        if (error) {
          console.error("Erro ao atualizar sessao:", error);
        }
      } catch (error) {
        console.error("Erro ao atualizar sessao:", error);
      } finally {
        isUpdatingRef.current = false;
      }
    };

    const scheduleSessionPings = () => {
      clearPingTimers();

      firstPingTimeoutRef.current = setTimeout(() => {
        if (document.visibilityState === "visible") {
          void updateSessionPing({ force: true });
        }
      }, FIRST_SESSION_PING_DELAY_MS);

      intervalRef.current = setInterval(() => {
        if (document.visibilityState === "visible") {
          void updateSessionPing();
        }
      }, SESSION_PING_INTERVAL_MS);
    };

    const startSession = async () => {
      if (hasStartedSessionRef.current) return;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;
        if (!user) {
          setAccessToken(null);
          return;
        }

        setAccessToken(session.access_token);

        const timestamp = new Date().toISOString();
        const { data, error } = await supabase
          .from("user_sessions")
          .insert({
            user_id: user.id,
            started_at: timestamp,
            last_ping_at: timestamp,
          })
          .select("id")
          .single();

        if (error || !data) {
          console.error("Erro ao iniciar sessao:", error);
          return;
        }

        sessionIdRef.current = data.id;
        hasStartedSessionRef.current = true;
        lastDispatchedPingAtRef.current = Date.now();
        scheduleSessionPings();
      } catch (error) {
        console.error("Erro no rastreamento de sessao:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (!sessionIdRef.current) return;

      if (document.visibilityState === "hidden") {
        void updateSessionPing({ force: true, useKeepalive: true });
        return;
      }

      void updateSessionPing({ force: true });
    };

    const handleWindowFocus = () => {
      if (document.visibilityState !== "visible") return;
      void updateSessionPing();
    };

    const handleUserActivity = () => {
      if (document.visibilityState !== "visible") return;
      void updateSessionPing();
    };

    const handlePageHide = () => {
      void updateSessionPing({ force: true, useKeepalive: true });
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token);

      if (!session?.user) {
        clearPingTimers();
        sessionIdRef.current = null;
        hasStartedSessionRef.current = false;
        lastDispatchedPingAtRef.current = 0;
        return;
      }

      if (!sessionIdRef.current && !hasStartedSessionRef.current) {
        void startSession();
      }
    });

    void startSession();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    window.addEventListener("pointerdown", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("scroll", handleUserActivity, { passive: true });

    return () => {
      clearPingTimers();
      authListener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      window.removeEventListener("pointerdown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);

      if (sessionIdRef.current) {
        void updateSessionPing({ force: true, useKeepalive: true });
      }
    };
  }, []);
};
