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

  // Derive initial status on mount
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!isPushSupported()) {
        setStatus("unsupported");
        return;
      }

      const perm = getPermissionState();
      if (perm === "denied") {
        setStatus("denied");
        return;
      }

      // Only check subscription when user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStatus("prompt");
        return;
      }

      const sub = await getCurrentSubscription();
      if (!cancelled) {
        setStatus(sub ? "subscribed" : perm === "granted" ? "unsubscribed" : "prompt");
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const subscribe = useCallback(async () => {
    setLoading(true);
    try {
      const sub = await subscribeToPush();
      setStatus(sub ? "subscribed" : getPermissionState() === "denied" ? "denied" : "prompt");
    } finally {
      setLoading(false);
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    setLoading(true);
    try {
      await unsubscribeFromPush();
      setStatus("unsubscribed");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    status,
    loading,
    subscribe,
    unsubscribe,
    isSupported: isPushSupported(),
  };
};
