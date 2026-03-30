import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LevelRewardKey, LevelRewardRow } from "@/lib/levelRewards";

export interface GrantedLevelReward {
  metadata: Record<string, unknown> | null;
  reward_key: LevelRewardKey;
  source_level: number;
}

const getRewardIdentity = (reward: Pick<LevelRewardRow, "reward_key" | "source_level" | "updated_at">) =>
  `${reward.source_level}:${reward.reward_key}:${reward.updated_at}`;

const sortRewards = (rewards: LevelRewardRow[]) =>
  [...rewards].sort((first, second) => {
    if (first.source_level !== second.source_level) {
      return first.source_level - second.source_level;
    }

    return new Date(first.granted_at).getTime() - new Date(second.granted_at).getTime();
  });

export const mergeGrantedRewardsIntoCache = (
  queryClient: QueryClient,
  grantedRewards: GrantedLevelReward[],
) => {
  if (grantedRewards.length === 0) return [] as LevelRewardRow[];

  const issuedAt = new Date().toISOString();
  const mergedRows = grantedRewards.map((reward) => ({
    id: `granted:${reward.source_level}:${reward.reward_key}:${issuedAt}`,
    reward_key: reward.reward_key,
    source_level: reward.source_level,
    granted_at: issuedAt,
    updated_at: issuedAt,
    metadata: reward.metadata,
  })) satisfies LevelRewardRow[];

  queryClient.setQueryData<LevelRewardRow[]>(["user-level-rewards"], (currentRewards) => {
    const safeCurrentRewards = Array.isArray(currentRewards) ? currentRewards : [];
    const nextRewards = safeCurrentRewards.filter(
      (existingReward) =>
        !mergedRows.some((newReward) => newReward.source_level === existingReward.source_level),
    );

    return sortRewards([...nextRewards, ...mergedRows]);
  });

  return mergedRows;
};

export const fetchCurrentUserLevelRewards = async (): Promise<LevelRewardRow[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("user_level_rewards")
    .select("id, reward_key, source_level, granted_at, updated_at, metadata")
    .eq("user_id", user.id)
    .order("source_level", { ascending: true })
    .order("granted_at", { ascending: true });

  if (error) throw error;

  return (data || []) as LevelRewardRow[];
};

export const refreshLevelRewardsQuery = async (queryClient: QueryClient) => {
  const rewards = await fetchCurrentUserLevelRewards();
  queryClient.setQueryData(["user-level-rewards"], rewards);
  return rewards;
};

export const getNewlySyncedRewards = (
  previousRewards: LevelRewardRow[],
  refreshedRewards: LevelRewardRow[],
  maxLevel?: number,
) => {
  const knownRewards = new Set(previousRewards.map(getRewardIdentity));

  return refreshedRewards.filter((reward) => {
    if (typeof maxLevel === "number" && reward.source_level > maxLevel) {
      return false;
    }

    return !knownRewards.has(getRewardIdentity(reward));
  });
};
