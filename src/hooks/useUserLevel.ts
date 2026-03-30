import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  getLevelRewardsCopy,
  getLevelTitle,
  getRewardTitleList,
  type LevelRewardKey,
  type LevelRewardRow,
} from "@/lib/levelRewards";
import { getNewsletterRequiresFreelancerDescription } from "@/lib/levelRewardMarketing";
import {
  dispatchLevelRewardsGrantedEvent,
  dispatchLevelUpEvent,
} from "@/lib/levelUpEvents";
import { dispatchProductAccessRefresh } from "@/lib/productAccessEvents";
import {
  getNewlySyncedRewards,
  mergeGrantedRewardsIntoCache,
  refreshLevelRewardsQuery,
} from "@/lib/levelRewardQueries";

const XP_PER_LEVEL = [
  0,
  250,
  700,
  1500,
  2800,
  4500,
  6800,
  9800,
  13500,
  18000,
  23500,
  30000,
  38000,
  47500,
  59000,
  73000,
  90000,
  110000,
  135000,
  165000,
];

export const XP_REWARDS = {
  LESSON_COMPLETE: 3,
  DAY_COMPLETE: 6,
  QUIZ_CORRECT: 1,
  STREAK_BONUS: 1,
  MODULE_COMPLETE: 15,
  AI_TRAIL_COMPLETE: 15,
  MEDAL_EARNED: 8,
  DAILY_LOGIN: 1,
  DAILY_MISSION_DAY: 2,
  DAILY_MISSION_CHAT: 1,
  DAILY_MISSION_STREAK: 1,
  ELITE_DAILY_DAY_MARATHON: 20,
  ELITE_DAILY_EDI_IMMERSION: 15,
  ELITE_DAILY_POWER_COMBO: 30,
  ELITE_JOURNEY_DAYS_3: 18,
  ELITE_JOURNEY_DAYS_7: 42,
  ELITE_JOURNEY_DAYS_14: 90,
  ELITE_JOURNEY_DAYS_28: 180,
  ELITE_JOURNEY_CHATS_15: 16,
  ELITE_JOURNEY_CHATS_50: 50,
  ELITE_JOURNEY_CHATS_120: 130,
  ELITE_JOURNEY_CHATS_250: 280,
  ELITE_JOURNEY_STREAK_7: 30,
  ELITE_JOURNEY_STREAK_14: 80,
  ELITE_JOURNEY_STREAK_30: 220,
  ELITE_JOURNEY_STREAK_45: 380,
  ELITE_JOURNEY_ACTIVE_DAYS_5: 28,
  ELITE_JOURNEY_ACTIVE_DAYS_12: 70,
  ELITE_JOURNEY_ACTIVE_DAYS_21: 160,
};

interface GrantedReward {
  metadata: Record<string, unknown> | null;
  reward_key: LevelRewardKey;
  source_level: number;
}

const getGrantedRewardsToastDescription = (
  grantedRewards: GrantedReward[],
  unlockedTitles: string[],
  language: string,
  rewardUnlockedPrefix: string,
) => {
  const newsletterPendingReward = grantedRewards.find(
    (reward) =>
      reward.reward_key === "newsletter_access" &&
      reward.metadata &&
      typeof reward.metadata.status === "string" &&
      reward.metadata.status === "requires_freelancer",
  );

  if (newsletterPendingReward) {
    return getNewsletterRequiresFreelancerDescription(language);
  }

  return `${rewardUnlockedPrefix}: ${unlockedTitles.join(", ")}.`;
};

export const calculateLevelFromXP = (totalXP: number) => {
  let level = 1;

  for (let index = 1; index < XP_PER_LEVEL.length; index += 1) {
    if (totalXP >= XP_PER_LEVEL[index]) {
      level = index + 1;
    } else {
      break;
    }
  }

  return Math.min(level, 20);
};

export const getXPForLevel = (level: number) => {
  return XP_PER_LEVEL[level - 1] || 0;
};

export const getXPForNextLevel = (level: number) => {
  if (level >= 20) return XP_PER_LEVEL[19];
  return XP_PER_LEVEL[level] || XP_PER_LEVEL[XP_PER_LEVEL.length - 1];
};

export const useUserLevel = () => {
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const language = i18n.resolvedLanguage || i18n.language;
  const rewardCopy = getLevelRewardsCopy(language);

  const grantLevelRewards = useCallback(
    async (userId: string, currentLevel: number) => {
      if (currentLevel < 3) return [] as GrantedReward[];

      const cachedRewardsBeforeSync =
        queryClient.getQueryData<LevelRewardRow[]>(["user-level-rewards"]) || [];

      const { data, error } = await supabase.rpc("apply_level_rewards", {
        p_current_level: currentLevel,
        p_user_id: userId,
      });

      if (error) {
        console.error("Error applying level rewards:", error);
      }

      const grantedRewards = (data || []) as GrantedReward[];
      let hasAiHubDayPassReward = grantedRewards.some(
        (reward) => reward.reward_key === "ai_hub_day_pass",
      );

      if (grantedRewards.length > 0) {
        const mergedRewards = mergeGrantedRewardsIntoCache(queryClient, grantedRewards);
        dispatchLevelRewardsGrantedEvent({
          rewards: mergedRewards,
          source: "local",
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
              source: "local",
            });
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing level rewards after sync:", refreshError);
      }

      if (hasAiHubDayPassReward) {
        dispatchProductAccessRefresh();
      }

      return grantedRewards;
    },
    [queryClient],
  );

  const { data: levelData, isLoading } = useQuery({
    queryKey: ["user-level"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from("user_levels")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("user_levels")
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData;
      }

      return data;
    },
  });

  const addXPMutation = useMutation({
    mutationFn: async ({ amount, reason }: { amount: number; reason: string }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      const { data: currentData, error: fetchError } = await supabase
        .from("user_levels")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      let baseData = currentData;

      if (!baseData) {
        const { data: insertedData, error: insertError } = await supabase
          .from("user_levels")
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        baseData = insertedData;
      }

      if (!baseData) throw new Error("User level not found");

      const previousLevel = baseData.current_level || 1;
      const newTotalXP = (baseData.total_xp_earned || 0) + amount;
      const newLevel = calculateLevelFromXP(newTotalXP);
      const xpForCurrentLevel = getXPForLevel(newLevel);
      const currentXPInLevel = newTotalXP - xpForCurrentLevel;

      const { data, error } = await supabase
        .from("user_levels")
        .update({
          current_xp: currentXPInLevel,
          current_level: newLevel,
          total_xp_earned: newTotalXP,
        })
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      const grantedRewards = await grantLevelRewards(user.id, newLevel);

      return {
        data,
        grantedRewards,
        newLevel,
        previousLevel,
        reason,
        xpGained: amount,
      };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["user-level"] });

      toast({
        title: `+${result.xpGained} XP!`,
        description: result.reason,
        duration: 3000,
      });

      if (result.newLevel > result.previousLevel) {
        dispatchLevelUpEvent({
          level: result.newLevel,
          previousLevel: result.previousLevel,
          source: "local",
        });
      } else if (result.grantedRewards.length > 0) {
        const unlockedTitles = getRewardTitleList(
          result.grantedRewards.map((reward) => reward.reward_key),
          language,
        );

        toast({
          title: rewardCopy.rewardUnlockedTitle,
          description: getGrantedRewardsToastDescription(
            result.grantedRewards,
            unlockedTitles,
            language,
            rewardCopy.rewardUnlockedPrefix,
          ),
          duration: 5000,
        });
      }
    },
    onError: (error) => {
      console.error("Error adding XP:", error);
    },
  });

  const currentLevel = levelData?.current_level || 1;
  const totalXP = levelData?.total_xp_earned || 0;
  const xpForCurrentLevel = getXPForLevel(currentLevel);
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
  const currentXPInLevel = totalXP - xpForCurrentLevel;
  const progressPercent =
    currentLevel >= 20 ? 100 : Math.min((currentXPInLevel / xpNeededForNext) * 100, 100);

  return {
    addXP: (amount: number, reason: string) => addXPMutation.mutate({ amount, reason }),
    addXPAsync: (amount: number, reason: string) => addXPMutation.mutateAsync({ amount, reason }),
    currentLevel,
    currentXPInLevel,
    isAddingXP: addXPMutation.isPending,
    isLoading,
    levelData,
    levelTitle: getLevelTitle(currentLevel, i18n.resolvedLanguage || i18n.language),
    progressPercent,
    totalXP,
    xpNeededForNext,
  };
};
