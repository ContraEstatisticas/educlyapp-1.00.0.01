import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMedalNotification } from "./useMedalNotification";

interface UnlockCondition {
  type: string;
  count?: number;
  hours?: number;
  hour?: number;
  tool?: string;
}

interface FreelancerMedal {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  color: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  unlock_condition: UnlockCondition;
  order_index: number;
}

interface UserMedal {
  id: string;
  user_id: string;
  medal_id: string;
  earned_at: string;
}

interface MedalProgressCheck {
  completedModules?: number;
  currentStreak?: number;
  completedWithinHours?: number | null;
  perfectQuizCount?: number;
  completedTrailDays?: number;
  completedTools?: Set<string>;
  completionTimestamps?: string[];
}

const toFreelancerMedal = (item: FreelancerMedal | Record<string, unknown>): FreelancerMedal => ({
  ...(item as FreelancerMedal),
  tier: (item as FreelancerMedal).tier as "bronze" | "silver" | "gold" | "platinum",
  unlock_condition: (item as FreelancerMedal).unlock_condition as unknown as UnlockCondition,
});

const getLocalHour = (timestamp: string | null | undefined) => {
  if (!timestamp) return null;

  const parsedDate = new Date(timestamp);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.getHours();
};

export const useFreelancerMedals = () => {
  const { showMedalNotification } = useMedalNotification();
  const queryClient = useQueryClient();

  // Fetch all medals
  const { data: allMedals, isLoading: medalsLoading } = useQuery({
    queryKey: ["freelancer-medals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("freelancer_medals")
        .select("*")
        .order("order_index");

      if (error) throw error;
      return (data || []).map((item) => toFreelancerMedal(item));
    },
  });

  // Fetch user's earned medals
  const { data: userMedals, isLoading: userMedalsLoading } = useQuery({
    queryKey: ["user-freelancer-medals"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("user_freelancer_medals")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data as UserMedal[];
    },
  });

  const getAllMedals = useCallback(async () => {
    if (allMedals?.length) {
      return allMedals;
    }

    const { data, error } = await supabase
      .from("freelancer_medals")
      .select("*")
      .order("order_index");

    if (error) throw error;
    return (data || []).map((item) => toFreelancerMedal(item));
  }, [allMedals]);

  const getUserEarnedMedalIds = useCallback(async (userId: string) => {
    if (userMedals) {
      return new Set(userMedals.map((medal) => medal.medal_id));
    }

    const { data, error } = await supabase
      .from("user_freelancer_medals")
      .select("medal_id")
      .eq("user_id", userId);

    if (error) throw error;
    return new Set((data || []).map((medal) => medal.medal_id));
  }, [userMedals]);

  // Award a medal to the user
  const awardMedal = useMutation({
    mutationFn: async (medalId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Check if already earned
      const { data: existing, error: existingError } = await supabase
        .from("user_freelancer_medals")
        .select("id")
        .eq("user_id", user.id)
        .eq("medal_id", medalId)
        .maybeSingle();

      if (existingError) throw existingError;

      if (existing) return null; // Already earned

      const { error } = await supabase.from("user_freelancer_medals").insert({
        user_id: user.id,
        medal_id: medalId,
      });

      if (error) throw error;
      return medalId;
    },
    onSuccess: (medalId) => {
      if (medalId) {
        queryClient.invalidateQueries({ queryKey: ["user-freelancer-medals"] });
        queryClient.invalidateQueries({ queryKey: ["user-all-medals"] });
        const medal = allMedals?.find((m) => m.id === medalId);
        if (medal) {
          showMedalNotification(medal.name, medal.description);
        }
      }
    },
  });

  // Check and award medals based on current progress
  const awardMedalBySlug = useCallback(
    async (slug: string) => {
      let medal = allMedals?.find((item) => item.slug === slug);

      if (!medal) {
        const { data, error } = await supabase
          .from("freelancer_medals")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;
        if (!data) return null;

        medal = toFreelancerMedal(data);
      }

      return awardMedal.mutateAsync(medal.id);
    },
    [allMedals, awardMedal],
  );

  const shouldAwardMedal = useCallback((medal: FreelancerMedal, progress: MedalProgressCheck) => {
    const completionTimestamps = progress.completionTimestamps || [];

    switch (medal.unlock_condition.type) {
      case "modules_completed":
        return (progress.completedModules || 0) >= (medal.unlock_condition.count || 0);
      case "streak":
        return (progress.currentStreak || 0) >= (medal.unlock_condition.count || 0);
      case "fast_module":
        return (
          progress.completedWithinHours !== null &&
          progress.completedWithinHours !== undefined &&
          progress.completedWithinHours <= (medal.unlock_condition.hours || 0)
        );
      case "perfect_quiz":
        return (progress.perfectQuizCount || 0) >= (medal.unlock_condition.count || 0);
      case "trail_days_completed":
        return (progress.completedTrailDays || 0) >= (medal.unlock_condition.count || 0);
      case "tool_completed":
        return Boolean(
          medal.unlock_condition.tool &&
          progress.completedTools?.has(medal.unlock_condition.tool),
        );
      case "early_lesson":
        return completionTimestamps.some((timestamp) => {
          const hour = getLocalHour(timestamp);
          return hour !== null && hour < (medal.unlock_condition.hour || 0);
        });
      case "late_lesson":
        return completionTimestamps.some((timestamp) => {
          const hour = getLocalHour(timestamp);
          return hour !== null && hour >= (medal.unlock_condition.hour || 0);
        });
      default:
        return false;
    }
  }, []);

  const awardEligibleMedals = useCallback(async (progress: MedalProgressCheck) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const medals = await getAllMedals();
    const earnedMedalIds = await getUserEarnedMedalIds(user.id);

    for (const medal of medals) {
      if (earnedMedalIds.has(medal.id)) continue;

      if (!shouldAwardMedal(medal, progress)) continue;

      const awardedMedalId = await awardMedal.mutateAsync(medal.id);
      if (awardedMedalId) {
        earnedMedalIds.add(awardedMedalId);
      }
    }
  }, [awardMedal, getAllMedals, getUserEarnedMedalIds, shouldAwardMedal]);

  const checkAndAwardMedals = useCallback(async ({
    completedModules = 0,
    currentStreak = 0,
    completedWithinHours = null,
    perfectQuizCount = 0,
    completedTrailDays = 0,
    completedTools = new Set<string>(),
    completionTimestamps = [],
  }: MedalProgressCheck) => {
    await awardEligibleMedals({
      completedModules,
      currentStreak,
      completedWithinHours,
      perfectQuizCount,
      completedTrailDays,
      completedTools,
      completionTimestamps,
    });
  }, [awardEligibleMedals]);

  const syncEarnableMedals = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const [completedModulesResult, streakResult, trailChallengesResult, toolsResult] = await Promise.all([
      supabase
        .from("freelancer_module_progress")
        .select("module_number, completed_at")
        .eq("user_id", user.id)
        .eq("completed", true),
      supabase
        .from("user_streaks")
        .select("current_streak")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("challenges")
        .select("id")
        .eq("challenge_type", "trail")
        .eq("duration_days", 28),
      supabase
        .from("ai_tools")
        .select("id, slug"),
    ]);

    if (completedModulesResult.error) throw completedModulesResult.error;
    if (streakResult.error) throw streakResult.error;
    if (trailChallengesResult.error) throw trailChallengesResult.error;
    if (toolsResult.error) throw toolsResult.error;

    const trailChallengeIds = (trailChallengesResult.data || []).map((challenge) => challenge.id);

    let challengeDays: Array<{ id: string; ai_tool_id: string | null }> = [];
    let completedTrailDays: Array<{ challenge_day_id: string; completed_at: string | null }> = [];

    if (trailChallengeIds.length > 0) {
      const challengeDaysResult = await supabase
        .from("challenge_days")
        .select("id, ai_tool_id")
        .in("challenge_id", trailChallengeIds);

      if (challengeDaysResult.error) throw challengeDaysResult.error;
      challengeDays = challengeDaysResult.data || [];

      const challengeDayIds = challengeDays.map((day) => day.id);

      if (challengeDayIds.length > 0) {
        const completedTrailDaysResult = await supabase
          .from("user_day_progress")
          .select("challenge_day_id, completed_at")
          .eq("user_id", user.id)
          .eq("completed", true)
          .in("challenge_day_id", challengeDayIds);

        if (completedTrailDaysResult.error) throw completedTrailDaysResult.error;
        completedTrailDays = completedTrailDaysResult.data || [];
      }
    }

    const toolIdToSlug = new Map(
      (toolsResult.data || []).map((tool) => [tool.id, tool.slug]),
    );
    const challengeDayToToolSlug = new Map<string, string>();
    const totalDaysByTool = new Map<string, number>();
    const completedDaysByTool = new Map<string, number>();

    challengeDays.forEach((day) => {
      if (!day.ai_tool_id) return;

      const slug = toolIdToSlug.get(day.ai_tool_id);
      if (!slug) return;

      challengeDayToToolSlug.set(day.id, slug);
      totalDaysByTool.set(slug, (totalDaysByTool.get(slug) || 0) + 1);
    });

    completedTrailDays.forEach((day) => {
      const slug = challengeDayToToolSlug.get(day.challenge_day_id);
      if (!slug) return;

      completedDaysByTool.set(slug, (completedDaysByTool.get(slug) || 0) + 1);
    });

    const completedTools = new Set<string>();

    totalDaysByTool.forEach((totalDays, slug) => {
      if (totalDays > 0 && (completedDaysByTool.get(slug) || 0) >= totalDays) {
        completedTools.add(slug);
      }
    });

    const completionTimestamps = [
      ...(completedModulesResult.data || []).map((row) => row.completed_at).filter(Boolean),
      ...completedTrailDays.map((row) => row.completed_at).filter(Boolean),
    ] as string[];

    await awardEligibleMedals({
      completedModules: completedModulesResult.data?.length || 0,
      currentStreak: streakResult.data?.current_streak || 0,
      completedTrailDays: completedTrailDays.length,
      completedTools,
      completionTimestamps,
    });
  }, [awardEligibleMedals]);

  // Get medal with earned status
  const getMedalsWithStatus = () => {
    if (!allMedals) return [];

    return allMedals.map((medal) => {
      const earned = userMedals?.find((um) => um.medal_id === medal.id);
      return {
        ...medal,
        isEarned: !!earned,
        earnedAt: earned?.earned_at,
      };
    });
  };

  return {
    allMedals,
    userMedals,
    isLoading: medalsLoading || userMedalsLoading,
    awardMedal: awardMedal.mutate,
    awardMedalBySlug,
    checkAndAwardMedals,
    syncEarnableMedals,
    getMedalsWithStatus,
    earnedCount: userMedals?.length || 0,
    totalCount: allMedals?.length || 0,
  };
};
