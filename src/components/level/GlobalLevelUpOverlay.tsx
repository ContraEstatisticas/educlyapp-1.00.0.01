import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RealtimeChannel } from "@supabase/supabase-js";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { useSoundSettings } from "@/contexts/SoundSettingsContext";
import { supabase } from "@/integrations/supabase/client";
import medalSound from "@/assets/sounds/medal-earned.mp3";
import type { LevelRewardRow } from "@/lib/levelRewards";
import {
  dispatchLevelRewardsGrantedEvent,
  LEVEL_UP_EVENT,
  dispatchLevelUpPopupCloseEvent,
  dispatchLevelUpPopupOpenEvent,
  type LevelUpEventDetail,
} from "@/lib/levelUpEvents";
import { dispatchProductAccessRefresh } from "@/lib/productAccessEvents";
import {
  getNewlySyncedRewards,
  mergeGrantedRewardsIntoCache,
  refreshLevelRewardsQuery,
} from "@/lib/levelRewardQueries";

export const GlobalLevelUpOverlay = () => {
  const queryClient = useQueryClient();
  const { soundEnabled, volume } = useSoundSettings();
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [queuedLevels, setQueuedLevels] = useState<number[]>([]);
  const activeLevelRef = useRef<number | null>(null);
  const lastKnownLevelRef = useRef<number | null>(null);
  const currentUserIdRef = useRef<string | null>(null);

  const invalidateLevelQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["user-level"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-user-level"] });
  }, [queryClient]);

  const syncLevelRewards = useCallback(
    async (userId: string, currentLevel: number) => {
      const cachedRewardsBeforeSync =
        queryClient.getQueryData<LevelRewardRow[]>(["user-level-rewards"]) || [];

      const { data, error } = await supabase.rpc("apply_level_rewards", {
        p_current_level: currentLevel,
        p_user_id: userId,
      });

      if (error) {
        console.error("Error syncing level rewards after level update:", error);
      }

      const grantedRewards = Array.isArray(data) ? data : [];
      let hasAiHubDayPassReward = grantedRewards.some(
        (reward) => reward.reward_key === "ai_hub_day_pass",
      );

      if (grantedRewards.length > 0) {
        const mergedRewards = mergeGrantedRewardsIntoCache(queryClient, grantedRewards);
        dispatchLevelRewardsGrantedEvent({
          rewards: mergedRewards,
          source: "realtime",
        });
      }

      try {
        const refreshedRewards = await refreshLevelRewardsQuery(queryClient);

        if (grantedRewards.length === 0) {
          const newlyDetectedRewards = getNewlySyncedRewards(
            cachedRewardsBeforeSync,
            refreshedRewards,
            currentLevel,
          );

          if (newlyDetectedRewards.length > 0) {
            hasAiHubDayPassReward =
              hasAiHubDayPassReward ||
              newlyDetectedRewards.some((reward) => reward.reward_key === "ai_hub_day_pass");

            dispatchLevelRewardsGrantedEvent({
              rewards: newlyDetectedRewards,
              source: "realtime",
            });
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing level rewards after realtime sync:", refreshError);
      }

      if (hasAiHubDayPassReward) {
        dispatchProductAccessRefresh();
      }
    },
    [queryClient],
  );

  const handlePotentialLevelUp = useCallback(
    (detail: LevelUpEventDetail) => {
      if (!detail.level || Number.isNaN(detail.level)) return;

      const knownLevel =
        lastKnownLevelRef.current ??
        detail.previousLevel ??
        Math.max(detail.level - 1, 1);

      if (detail.level <= knownLevel) return;

      lastKnownLevelRef.current = detail.level;
      invalidateLevelQueries();
      queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });

      if (currentUserIdRef.current) {
        void syncLevelRewards(currentUserIdRef.current, detail.level);
      }

      setQueuedLevels((currentQueue) => {
        if (activeLevelRef.current === detail.level || currentQueue.includes(detail.level)) {
          return currentQueue;
        }

        return [...currentQueue, detail.level];
      });
    },
    [invalidateLevelQueries, queryClient, syncLevelRewards],
  );

  useEffect(() => {
    activeLevelRef.current = activeLevel;
  }, [activeLevel]);

  useEffect(() => {
    if (activeLevel !== null || queuedLevels.length === 0) return;

    const [nextLevel, ...rest] = queuedLevels;
    setActiveLevel(nextLevel);
    setQueuedLevels(rest);
  }, [activeLevel, queuedLevels]);

  useEffect(() => {
    if (activeLevel === null) {
      dispatchLevelUpPopupCloseEvent();
      return;
    }

    dispatchLevelUpPopupOpenEvent({ level: activeLevel });

    if (soundEnabled) {
      const audio = new Audio(medalSound);
      audio.volume = volume;
      void audio.play().catch(() => {
        // Ignore autoplay errors.
      });
    }

    return () => {
      dispatchLevelUpPopupCloseEvent();
    };
  }, [activeLevel, soundEnabled, volume]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isCancelled = false;
    let currentChannel: RealtimeChannel | null = null;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const resetState = () => {
      lastKnownLevelRef.current = null;
      activeLevelRef.current = null;
      currentUserIdRef.current = null;
      setActiveLevel(null);
      setQueuedLevels([]);
    };

    const pollCurrentLevel = async () => {
      if (!currentUserIdRef.current) return;
      if (typeof document !== "undefined" && document.hidden) return;

      const { data, error } = await supabase
        .from("user_levels")
        .select("current_level")
        .eq("user_id", currentUserIdRef.current)
        .maybeSingle();

      if (error) {
        console.error("Error polling current user level:", error);
        return;
      }

      if (isCancelled || !data) return;

      const currentLevel = data.current_level || 1;
      const knownLevel = lastKnownLevelRef.current;

      if (knownLevel === null) {
        lastKnownLevelRef.current = currentLevel;
        return;
      }

      if (currentLevel > knownLevel) {
        handlePotentialLevelUp({
          level: currentLevel,
          previousLevel: knownLevel,
          source: "realtime",
        });
        return;
      }

      if (currentLevel < knownLevel) {
        lastKnownLevelRef.current = currentLevel;
        invalidateLevelQueries();
      }
    };

    const subscribeToUserLevel = async (userId: string | null) => {
      if (currentChannel) {
        void supabase.removeChannel(currentChannel);
        currentChannel = null;
      }

      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }

      resetState();

      if (!userId) return;

      currentUserIdRef.current = userId;

      const { data, error } = await supabase
        .from("user_levels")
        .select("current_level")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error loading current user level:", error);
        return;
      }

      if (isCancelled) return;

      lastKnownLevelRef.current = data?.current_level || 1;

      currentChannel = supabase
        .channel(`level-up-overlay-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "user_levels",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            const level =
              typeof payload.new.current_level === "number"
                ? payload.new.current_level
                : Number(payload.new.current_level || 1);
            const previousLevel =
              typeof payload.old.current_level === "number"
                ? payload.old.current_level
                : Number(payload.old.current_level || level);

            handlePotentialLevelUp({
              level,
              previousLevel,
              source: "realtime",
            });
          },
        )
        .subscribe();

      pollTimer = setInterval(() => {
        void pollCurrentLevel();
      }, 2000);

      void pollCurrentLevel();
    };

    const handleLevelUpEvent = (event: Event) => {
      const detail = (event as CustomEvent<LevelUpEventDetail>).detail;
      if (!detail) return;

      handlePotentialLevelUp(detail);
    };

    void supabase.auth
      .getUser()
      .then(({ data: { user } }) => subscribeToUserLevel(user?.id ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void subscribeToUserLevel(session?.user?.id ?? null);
    });

    window.addEventListener(LEVEL_UP_EVENT, handleLevelUpEvent as EventListener);
    window.addEventListener("focus", pollCurrentLevel);

    return () => {
      isCancelled = true;
      subscription.unsubscribe();
      window.removeEventListener(LEVEL_UP_EVENT, handleLevelUpEvent as EventListener);
      window.removeEventListener("focus", pollCurrentLevel);

      if (currentChannel) {
        void supabase.removeChannel(currentChannel);
      }

      if (pollTimer) {
        clearInterval(pollTimer);
      }
    };
  }, [handlePotentialLevelUp, invalidateLevelQueries]);

  return (
    <LevelUpNotification
      level={activeLevel || 1}
      isVisible={activeLevel !== null}
      onClose={() => setActiveLevel(null)}
    />
  );
};
