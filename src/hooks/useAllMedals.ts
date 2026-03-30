import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Medal {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  color: string;
  tier: string;
  slug: string;
  order_index: number;
  unlock_condition: Record<string, unknown>;
  created_at: string;
}

interface UserMedal {
  medal_id: string;
  earned_at: string;
}

interface MedalWithStatus extends Medal {
  isEarned: boolean;
  earnedAt: string | null;
}

const freelancerMedalTypes = new Set([
  "modules_completed",
  "fast_module",
  "perfect_quiz",
  "early_lesson",
  "late_lesson",
]);

const trailMedalTypes = new Set([
  "streak",
  "trail_days_completed",
  "tool_completed",
]);

export const useAllMedals = () => {
  const queryClient = useQueryClient();

  const { data: medals = [], isLoading: loadingMedals } = useQuery({
    queryKey: ["all-medals-definitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("freelancer_medals")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as Medal[];
    },
  });

  const { data: userMedals = [], isLoading: loadingUserMedals, refetch } = useQuery({
    queryKey: ["user-all-medals"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      const { data, error } = await supabase
        .from("user_freelancer_medals")
        .select("medal_id, earned_at")
        .eq("user_id", user.id);

      if (error) throw error;
      return data as UserMedal[];
    },
  });

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;

      channel = supabase
        .channel(`medals-updates-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "user_freelancer_medals",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ["user-all-medals"] });
          },
        )
        .subscribe();
    });

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const getMedalsWithStatus = (): MedalWithStatus[] => {
    return medals.map((medal) => {
      const earnedRecord = userMedals.find((userMedal) => userMedal.medal_id === medal.id);

      return {
        ...medal,
        isEarned: !!earnedRecord,
        earnedAt: earnedRecord?.earned_at || null,
      };
    });
  };

  const getMedalsByCategory = () => {
    const allMedalsWithStatus = getMedalsWithStatus();

    const getConditionType = (medal: MedalWithStatus) => {
      const condition = medal.unlock_condition as Record<string, unknown>;
      return typeof condition?.type === "string" ? condition.type : null;
    };

    const freelancerMedals = allMedalsWithStatus.filter((medal) => {
      const conditionType = getConditionType(medal);
      return conditionType !== null && freelancerMedalTypes.has(conditionType);
    });

    const trailMedals = allMedalsWithStatus.filter((medal) => {
      const conditionType = getConditionType(medal);
      return conditionType !== null && trailMedalTypes.has(conditionType);
    });

    const categorizedIds = new Set([
      ...freelancerMedals.map((medal) => medal.id),
      ...trailMedals.map((medal) => medal.id),
    ]);

    const uncategorized = allMedalsWithStatus.filter((medal) => !categorizedIds.has(medal.id));

    return {
      freelancerMedals: [...freelancerMedals, ...uncategorized],
      trailMedals,
    };
  };

  return {
    getMedalsWithStatus,
    getMedalsByCategory,
    earnedCount: userMedals.length,
    totalCount: medals.length,
    isLoading: loadingMedals || loadingUserMedals,
    refetchMedals: refetch,
  };
};
