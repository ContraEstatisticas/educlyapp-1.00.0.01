import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LevelRewardRow } from "@/lib/levelRewards";

export const useLevelRewards = () => {
  return useQuery({
    queryKey: ["user-level-rewards"],
    queryFn: async (): Promise<LevelRewardRow[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      const { data, error } = await supabase
        .from("user_level_rewards")
        .select("id, reward_key, source_level, granted_at, metadata")
        .eq("user_id", user.id)
        .order("source_level", { ascending: true })
        .order("granted_at", { ascending: true });

      if (error) throw error;

      return (data || []) as LevelRewardRow[];
    },
  });
};
