import { useState, useEffect, useCallback } from "react";
import {
  isPushSupported,
  subscribeToPush,
  unsubscribeFromPush,
  getCurrentSubscription,
  getPermissionState,
} from "@/lib/pushNotifications";
import { supabase } from "@/integrations/supabase/client";

export type PushStatus =
  | "unsupported"    // Browser does not support Push API
  | "denied"         // User explicitly denied notifications
  | "prompt"         // User has not yet decided
  | "subscribed"     // Active subscription
  | "unsubscribed";  // Permission granted but no active subscription

export const usePushNotifications = () => {
  const [status, setStatus] = useState<PushStatus>("prompt");
  const [loading, setLoading] = useState(false);

  const resolveStatus = useCallback(async (): Promise<PushStatus> => {
    if (!isPushSupported()) {
      return "unsupported";
    }

    const perm = getPermissionState();
    if (perm === "denied") {
      return "denied";
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return "prompt";
    }

    const sub = await getCurrentSubscription();
    return sub ? "subscribed" : perm === "granted" ? "unsubscribed" : "prompt";
  }, []);

  // Derive initial status on mount
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const nextStatus = await resolveStatus();
      if (!cancelled) {
        setStatus(nextStatus);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [resolveStatus]);

  const subscribe = useCallback(async () => {
    setLoading(true);
    try {
      await subscribeToPush();
      const nextStatus = await resolveStatus();
      setStatus(nextStatus);
      return nextStatus;
    } finally {
      setLoading(false);
    }
  }, [resolveStatus]);

  const unsubscribe = useCallback(async () => {
    setLoading(true);
    try {
      await unsubscribeFromPush();
      const nextStatus = await resolveStatus();
      setStatus(nextStatus);
      return nextStatus;
    } finally {
      setLoading(false);
    }
  }, [resolveStatus]);

  return {
    status,
    loading,
    subscribe,
    unsubscribe,
    isSupported: isPushSupported(),
  };
};
