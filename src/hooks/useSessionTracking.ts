import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_IDLE_TIMEOUT_MS = 30000;
const MIN_PING_GAP_MS = 5000;

const SESSION_USER_STORAGE_KEY = "educly:session-tracker:user-id";
const SESSION_ROW_STORAGE_KEY = "educly:session-tracker:session-id";
const SESSION_BROWSER_KEY_STORAGE = "educly:session-tracker:browser-key";

type PingOptions = {
  force?: boolean;
  pingAtMs?: number;
  useKeepalive?: boolean;
};

type FinishOptions = {
  clearPersisted?: boolean;
  endedAtMs?: number;
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
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStartingSessionRef = useRef(false);
  const isUpdatingRef = useRef(false);
  const hasStartedSessionRef = useRef(false);
  const lastDispatchedPingAtRef = useRef(0);
  const lastInteractionAtRef = useRef<number | null>(null);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const clearInactivityTimer = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
    };

    const clearPersistedSessionState = () => {
      if (!canUseSessionStorage()) return;

      sessionStorage.removeItem(SESSION_USER_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_ROW_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_BROWSER_KEY_STORAGE);
    };

    const resetSessionTracking = ({ clearPersisted = false }: { clearPersisted?: boolean } = {}) => {
      clearInactivityTimer();
      sessionIdRef.current = null;
      clientSessionKeyRef.current = null;
      hasStartedSessionRef.current = false;
      isStartingSessionRef.current = false;
      isUpdatingRef.current = false;
      lastDispatchedPingAtRef.current = 0;
      lastInteractionAtRef.current = null;

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
      rpcName: "ping_user_session" | "finish_user_session",
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

    const updateSessionPing = async ({
      force = false,
      pingAtMs,
      useKeepalive = false,
    }: PingOptions = {}) => {
      const currentSessionId = sessionIdRef.current;
      if (!currentSessionId) return;

      const now = pingAtMs ?? Date.now();
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
        const { error } = await supabase.rpc("ping_user_session", {
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

    const finishSession = async ({
      clearPersisted = false,
      endedAtMs,
      force = false,
      useKeepalive = false,
    }: FinishOptions = {}) => {
      const currentSessionId = sessionIdRef.current;
      if (!currentSessionId) return;

      const now = endedAtMs ?? Date.now();
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
          resetSessionTracking({ clearPersisted });
          return;
        }
      }

      if (isUpdatingRef.current) {
        resetSessionTracking({ clearPersisted });
        return;
      }

      isUpdatingRef.current = true;
      lastDispatchedPingAtRef.current = now;

      try {
        const { error } = await supabase.rpc("finish_user_session", {
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
        resetSessionTracking({ clearPersisted });
      }
    };

    const scheduleInactivityTimeout = (interactionAtMs: number) => {
      clearInactivityTimer();

      inactivityTimeoutRef.current = setTimeout(() => {
        const lastInteractionAt = lastInteractionAtRef.current;
        if (!sessionIdRef.current || lastInteractionAt == null) return;

        void finishSession({
          clearPersisted: true,
          endedAtMs: lastInteractionAt + SESSION_IDLE_TIMEOUT_MS,
          force: true,
        });
      }, SESSION_IDLE_TIMEOUT_MS);

      lastInteractionAtRef.current = interactionAtMs;
    };

    const startSession = async (startedAtMs: number) => {
      if (hasStartedSessionRef.current || isStartingSessionRef.current) return;

      isStartingSessionRef.current = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;
        if (!user) {
          setAccessToken(null);
          resetSessionTracking({ clearPersisted: true });
          return;
        }

        setAccessToken(session.access_token);

        const { clientSessionKey, existingSessionId } = getPersistedSessionState(user.id);
        const timestamp = new Date(startedAtMs).toISOString();

        const { data, error } = await supabase.rpc("start_or_resume_user_session", {
          p_client_session_key: clientSessionKey,
          p_existing_session_id: existingSessionId ?? undefined,
          p_started_at: timestamp,
        });

        if (error || !data) {
          console.error("Erro ao iniciar sessao:", error);
          return;
        }

        sessionIdRef.current = data;
        clientSessionKeyRef.current = clientSessionKey;
        hasStartedSessionRef.current = true;
        lastDispatchedPingAtRef.current = startedAtMs;
        persistSessionState(user.id, data, clientSessionKey);
      } catch (error) {
        console.error("Erro no rastreamento de sessao:", error);
      } finally {
        isStartingSessionRef.current = false;
      }
    };

    const registerInteraction = async () => {
      if (document.visibilityState !== "visible") return;

      const interactionAtMs = Date.now();
      scheduleInactivityTimeout(interactionAtMs);

      if (!sessionIdRef.current) {
        if (!hasStartedSessionRef.current && !isStartingSessionRef.current) {
          await startSession(interactionAtMs);
        }
        return;
      }

      await updateSessionPing({ pingAtMs: interactionAtMs });
    };

    const initializeAuthState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAccessToken(session?.access_token);

      if (!session?.user) {
        resetSessionTracking({ clearPersisted: true });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden" || !sessionIdRef.current) return;

      void finishSession({
        clearPersisted: true,
        endedAtMs: Date.now(),
        force: true,
        useKeepalive: true,
      });
    };

    const handleUserActivity = () => {
      void registerInteraction();
    };

    const handlePageHide = () => {
      if (!sessionIdRef.current) return;

      void finishSession({
        clearPersisted: true,
        endedAtMs: Date.now(),
        force: true,
        useKeepalive: true,
      });
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token);

      if (!session?.user) {
        resetSessionTracking({ clearPersisted: true });
      }
    });

    void initializeAuthState();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    window.addEventListener("pointerdown", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("scroll", handleUserActivity, { passive: true });

    return () => {
      clearInactivityTimer();
      authListener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      window.removeEventListener("pointerdown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);

      if (sessionIdRef.current) {
        void finishSession({
          clearPersisted: true,
          endedAtMs: Date.now(),
          force: true,
          useKeepalive: true,
        });
      }
    };
  }, []);
};
