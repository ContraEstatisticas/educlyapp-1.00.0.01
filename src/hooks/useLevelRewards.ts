import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { LevelRewardRow } from "@/lib/levelRewards";
import { fetchCurrentUserLevelRewards } from "@/lib/levelRewardQueries";

export const useLevelRewards = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let currentChannel: RealtimeChannel | null = null;

    const subscribeToRewardUpdates = async (userId: string | null) => {
      if (currentChannel) {
        void supabase.removeChannel(currentChannel);
        currentChannel = null;
      }

      if (!userId) return;

      currentChannel = supabase
        .channel(`user-level-rewards-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "user_level_rewards",
            filter: `user_id=eq.${userId}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });
          },
        )
        .subscribe();
    };

    void supabase.auth
      .getUser()
      .then(({ data: { user } }) => subscribeToRewardUpdates(user?.id ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void subscribeToRewardUpdates(session?.user?.id ?? null);
    });

    return () => {
      subscription.unsubscribe();

      if (currentChannel) {
        void supabase.removeChannel(currentChannel);
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["user-level-rewards"],
    queryFn: async (): Promise<LevelRewardRow[]> => fetchCurrentUserLevelRewards(),
  });
};
