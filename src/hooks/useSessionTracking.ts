import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_PING_INTERVAL_MS = 15000;
const FIRST_SESSION_PING_DELAY_MS = 5000;
const MIN_PING_GAP_MS = 5000;

const SESSION_USER_STORAGE_KEY = "educly:session-tracker:user-id";
const SESSION_ROW_STORAGE_KEY = "educly:session-tracker:session-id";
const SESSION_BROWSER_KEY_STORAGE = "educly:session-tracker:browser-key";

type PingOptions = {
  force?: boolean;
  useKeepalive?: boolean;
};

type FinishOptions = {
  force?: boolean;
  useKeepalive?: boolean;
};

const canUseSessionStorage = () =>
  typeof window !== "undefined" && typeof sessionStorage !== "undefined";

const createBrowserSessionKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `browser_session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const useSessionTracking = () => {
  const sessionIdRef = useRef<string | null>(null);
  const clientSessionKeyRef = useRef<string | null>(null);
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

    const clearPersistedSessionState = () => {
      if (!canUseSessionStorage()) return;

      sessionStorage.removeItem(SESSION_USER_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_ROW_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_BROWSER_KEY_STORAGE);
    };

    const resetSessionTracking = ({ clearPersisted = false }: { clearPersisted?: boolean } = {}) => {
      clearPingTimers();
      sessionIdRef.current = null;
      clientSessionKeyRef.current = null;
      hasStartedSessionRef.current = false;
      isUpdatingRef.current = false;
      lastDispatchedPingAtRef.current = 0;

      if (clearPersisted) {
        clearPersistedSessionState();
      }
    };

    const setAccessToken = (token: string | null | undefined) => {
      accessTokenRef.current = token ?? null;
    };

    const getPersistedSessionState = (userId: string) => {
      if (!canUseSessionStorage()) {
        return {
          clientSessionKey: createBrowserSessionKey(),
          existingSessionId: null,
        };
      }

      const storedUserId = sessionStorage.getItem(SESSION_USER_STORAGE_KEY);
      if (storedUserId && storedUserId !== userId) {
        clearPersistedSessionState();
      }

      let clientSessionKey = sessionStorage.getItem(SESSION_BROWSER_KEY_STORAGE);
      if (!clientSessionKey) {
        clientSessionKey = createBrowserSessionKey();
        sessionStorage.setItem(SESSION_BROWSER_KEY_STORAGE, clientSessionKey);
      }

      sessionStorage.setItem(SESSION_USER_STORAGE_KEY, userId);

      return {
        clientSessionKey,
        existingSessionId: sessionStorage.getItem(SESSION_ROW_STORAGE_KEY),
      };
    };

    const persistSessionState = (userId: string, sessionId: string, clientSessionKey: string) => {
      if (!canUseSessionStorage()) return;

      sessionStorage.setItem(SESSION_USER_STORAGE_KEY, userId);
      sessionStorage.setItem(SESSION_ROW_STORAGE_KEY, sessionId);
      sessionStorage.setItem(SESSION_BROWSER_KEY_STORAGE, clientSessionKey);
    };

    const canUseKeepaliveRequest = () => {
      return Boolean(
        sessionIdRef.current &&
          accessTokenRef.current &&
          supabaseUrl &&
          publishableKey,
      );
    };

    const dispatchKeepaliveRequest = (
      rpcName: string,
      payload: Record<string, unknown>,
    ) => {
      if (!canUseKeepaliveRequest() || !accessTokenRef.current) {
        return false;
      }

      try {
        void fetch(`${supabaseUrl}/rest/v1/rpc/${rpcName}`, {
          method: "POST",
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${accessTokenRef.current}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        });

        return true;
      } catch (error) {
        console.error(`Erro ao enviar keepalive da sessao (${rpcName}):`, error);
        return false;
      }
    };

    const updateSessionPing = async ({ force = false, useKeepalive = false }: PingOptions = {}) => {
      const currentSessionId = sessionIdRef.current;
      if (!currentSessionId) return;

      const now = Date.now();
      if (!force && now - lastDispatchedPingAtRef.current < MIN_PING_GAP_MS) {
        return;
      }

      const timestamp = new Date(now).toISOString();

      if (useKeepalive) {
        const keepaliveSent = dispatchKeepaliveRequest("ping_user_session", {
          p_session_id: currentSessionId,
          p_ping_at: timestamp,
        });

        if (keepaliveSent) {
          lastDispatchedPingAtRef.current = now;
          return;
        }
      }

      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;
      lastDispatchedPingAtRef.current = now;

      try {
        const { error } = await (supabase.rpc as any)("ping_user_session", {
          p_session_id: currentSessionId,
          p_ping_at: timestamp,
        });

        if (error) {
          console.error("Erro ao atualizar sessao:", error);
        }
      } catch (error) {
        console.error("Erro ao atualizar sessao:", error);
      } finally {
        isUpdatingRef.current = false;
      }
    };

    const finishSession = async ({ force = false, useKeepalive = false }: FinishOptions = {}) => {
      const currentSessionId = sessionIdRef.current;
      if (!currentSessionId) return;

      const now = Date.now();
      if (!force && now - lastDispatchedPingAtRef.current < MIN_PING_GAP_MS) {
        return;
      }

      const timestamp = new Date(now).toISOString();

      if (useKeepalive) {
        const keepaliveSent = dispatchKeepaliveRequest("finish_user_session", {
          p_session_id: currentSessionId,
          p_ended_at: timestamp,
        });

        if (keepaliveSent) {
          lastDispatchedPingAtRef.current = now;
          return;
        }
      }

      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;
      lastDispatchedPingAtRef.current = now;

      try {
        const { error } = await (supabase.rpc as any)("finish_user_session", {
          p_session_id: currentSessionId,
          p_ended_at: timestamp,
        });

        if (error) {
          console.error("Erro ao finalizar sessao:", error);
        }
      } catch (error) {
        console.error("Erro ao finalizar sessao:", error);
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

        const { clientSessionKey, existingSessionId } = getPersistedSessionState(user.id);
        const timestamp = new Date().toISOString();

        const { data, error } = await (supabase.rpc as any)(
          "start_or_resume_user_session",
          {
            p_client_session_key: clientSessionKey,
            p_started_at: timestamp,
            p_existing_session_id: existingSessionId,
          },
        );

        if (error || !data) {
          console.error("Erro ao iniciar sessao:", error);
          return;
        }

        sessionIdRef.current = data;
        clientSessionKeyRef.current = clientSessionKey;
        hasStartedSessionRef.current = true;
        lastDispatchedPingAtRef.current = Date.now();
        persistSessionState(user.id, data, clientSessionKey);
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
      void updateSessionPing({ force: true });
    };

    const handleUserActivity = () => {
      if (document.visibilityState !== "visible") return;
      void updateSessionPing();
    };

    const handlePageHide = () => {
      void finishSession({ force: true, useKeepalive: true });
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token);

      if (!session?.user) {
        resetSessionTracking({ clearPersisted: true });
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
        void finishSession({ force: true, useKeepalive: true });
      }
    };
  }, []);
};
