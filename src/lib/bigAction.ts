import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const BIG_ACTION_QUERY_KEY = ["big-action"] as const;
export const BIG_ACTION_TRAILS_PER_CYCLE = 4;
export const BIG_ACTION_PROGRESS_SOURCES = ["challenge_day", "specialized_module"] as const;

export const BIG_ACTION_AREA_SUGGESTIONS = [
  "Vendas",
  "Saude",
  "Educacao",
  "Juridico",
  "Marketing",
  "Financas",
  "Recursos Humanos",
  "Operacoes",
  "Atendimento",
  "Outro",
] as const;

export type BigActionRow = Database["public"]["Tables"]["user_big_actions"]["Row"];
export type BigActionStatus = BigActionRow["status"];
export type BigActionProgressSource = (typeof BIG_ACTION_PROGRESS_SOURCES)[number];

export interface GenerateBigActionResponse {
  action: BigActionRow;
  alreadyReady?: boolean;
  error?: string;
  success: boolean;
}

interface BigActionProfileSnapshot {
  big_action_challenge_day_baseline: number;
  big_action_specialized_module_baseline: number;
  preferred_language: string | null;
  professional_area: string | null;
}

export interface BigActionProgressCounter {
  baseline: number;
  completedCount: number;
  sinceBaseline: number;
  unlocked: boolean;
  untilUnlock: number;
}

export interface BigActionState {
  activeBigAction: BigActionRow | null;
  challengeDayProgress: BigActionProgressCounter;
  nextUnlockSource: BigActionProgressSource | null;
  preferredLanguage: string | null;
  professionalArea: string | null;
  specializedModuleProgress: BigActionProgressCounter;
  unlockedNow: boolean;
  userId: string;
}

const getAuthenticatedUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
};

const isDuplicateInsertError = (error: { code?: string; message?: string } | null) => {
  if (!error) return false;

  const message = error.message?.toLowerCase() || "";
  return error.code === "23505" || message.includes("duplicate");
};

const isBigActionProgressSource = (value: string | null | undefined): value is BigActionProgressSource =>
  Boolean(value && BIG_ACTION_PROGRESS_SOURCES.includes(value as BigActionProgressSource));

const buildProgressCounter = (completedCount: number, baseline: number): BigActionProgressCounter => {
  const sinceBaseline = Math.max(0, completedCount - baseline);

  return {
    baseline,
    completedCount,
    sinceBaseline,
    unlocked: sinceBaseline >= BIG_ACTION_TRAILS_PER_CYCLE,
    untilUnlock: Math.max(0, BIG_ACTION_TRAILS_PER_CYCLE - sinceBaseline),
  };
};

const getPreferredProgressSource = (
  challengeDayProgress: BigActionProgressCounter,
  specializedModuleProgress: BigActionProgressCounter,
) => {
  if (challengeDayProgress.unlocked && specializedModuleProgress.unlocked) {
    const challengeOverflow = challengeDayProgress.sinceBaseline - BIG_ACTION_TRAILS_PER_CYCLE;
    const specializedOverflow = specializedModuleProgress.sinceBaseline - BIG_ACTION_TRAILS_PER_CYCLE;

    if (challengeOverflow === specializedOverflow) {
      if (challengeDayProgress.sinceBaseline === specializedModuleProgress.sinceBaseline) {
        return "challenge_day" as const;
      }

      return challengeDayProgress.sinceBaseline > specializedModuleProgress.sinceBaseline
        ? "challenge_day"
        : "specialized_module";
    }

    return challengeOverflow > specializedOverflow ? "challenge_day" : "specialized_module";
  }

  if (challengeDayProgress.unlocked) return "challenge_day";
  if (specializedModuleProgress.unlocked) return "specialized_module";

  if (challengeDayProgress.untilUnlock === specializedModuleProgress.untilUnlock) {
    return "challenge_day";
  }

  return challengeDayProgress.untilUnlock < specializedModuleProgress.untilUnlock
    ? "challenge_day"
    : "specialized_module";
};

export const normalizeProfessionalArea = (value?: string | null) => {
  const normalizedValue = value?.trim() || "";
  return normalizedValue.length ? normalizedValue : null;
};

export const normalizeBigActionSteps = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((step) => {
      if (typeof step === "string") return step.trim();
      if (!step || typeof step !== "object") return "";

      const candidate =
        typeof (step as { text?: unknown }).text === "string"
          ? (step as { text: string }).text
          : typeof (step as { description?: unknown }).description === "string"
            ? (step as { description: string }).description
            : typeof (step as { title?: unknown }).title === "string"
              ? (step as { title: string }).title
              : "";

      return candidate.trim();
    })
    .filter(Boolean);
};

export const getBigActionSourceCopy = (source?: string | null) => {
  if (source === "challenge_day") {
    return {
      longLabel: "Unlocked by 4 completed days in the 28-day challenge",
      shortLabel: "4 challenge days",
    };
  }

  return {
    longLabel: "Unlocked by 4 completed modules in specialized trails",
    shortLabel: "4 specialized modules",
  };
};

export const getActiveBigAction = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_big_actions")
    .select("*")
    .eq("user_id", userId)
    .is("completed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getBigActionProfileSnapshot = async (userId: string): Promise<BigActionProfileSnapshot> => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "professional_area, preferred_language, big_action_challenge_day_baseline, big_action_specialized_module_baseline",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return {
    big_action_challenge_day_baseline: data?.big_action_challenge_day_baseline || 0,
    big_action_specialized_module_baseline: data?.big_action_specialized_module_baseline || 0,
    preferred_language: data?.preferred_language || null,
    professional_area: normalizeProfessionalArea(data?.professional_area),
  };
};

export const updateProfessionalArea = async (userId: string, value: string) => {
  const professionalArea = normalizeProfessionalArea(value);

  if (!professionalArea) {
    throw new Error("Professional area is required before continuing.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      professional_area: professionalArea,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
  return professionalArea;
};

export const countCompletedChallengeDays = async (userId: string) => {
  const { count, error } = await supabase
    .from("user_day_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("completed", true);

  if (error) throw error;
  return count || 0;
};

export const countCompletedSpecializedModules = async (userId: string) => {
  const { count, error } = await supabase
    .from("ai_trail_module_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;
  return count || 0;
};

export const generateActiveBigAction = async ({
  force = false,
  language,
}: {
  force?: boolean;
  language?: string | null;
}) => {
  const { data, error } = await supabase.functions.invoke<GenerateBigActionResponse>(
    "generate-big-action",
    {
      body: {
        force,
        language,
      },
    },
  );

  if (error) throw error;
  if (!data?.success || !data.action) {
    throw new Error(data?.error || "Unable to generate the Big Action.");
  }

  return data;
};

export const completeBigAction = async (actionId: string) => {
  const { data, error } = await supabase.rpc("complete_user_big_action", {
    p_action_id: actionId,
  });

  if (error) throw error;
  return data;
};

export const ensureBigActionAvailability = async (userId?: string): Promise<BigActionState | null> => {
  const resolvedUserId = userId || (await getAuthenticatedUserId());
  if (!resolvedUserId) return null;

  const [profile, completedChallengeDays, completedSpecializedModules] = await Promise.all([
    getBigActionProfileSnapshot(resolvedUserId),
    countCompletedChallengeDays(resolvedUserId),
    countCompletedSpecializedModules(resolvedUserId),
  ]);

  const professionalArea = normalizeProfessionalArea(profile.professional_area);
  const challengeDayProgress = buildProgressCounter(
    completedChallengeDays,
    profile.big_action_challenge_day_baseline || 0,
  );
  const specializedModuleProgress = buildProgressCounter(
    completedSpecializedModules,
    profile.big_action_specialized_module_baseline || 0,
  );

  let activeBigAction = await getActiveBigAction(resolvedUserId);
  let unlockedNow = false;

  if (activeBigAction && professionalArea && activeBigAction.status === "needs_area") {
    const { data, error } = await supabase
      .from("user_big_actions")
      .update({
        professional_area: professionalArea,
        error_message: null,
        status: "pending_generation",
      })
      .eq("id", activeBigAction.id)
      .eq("user_id", resolvedUserId)
      .select("*")
      .single();

    if (error) throw error;
    activeBigAction = data;
  }

  if (!activeBigAction) {
    const progressSource = getPreferredProgressSource(challengeDayProgress, specializedModuleProgress);
    const selectedProgress =
      progressSource === "challenge_day" ? challengeDayProgress : specializedModuleProgress;

    if (selectedProgress.unlocked) {
      const { data, error } = await supabase
        .from("user_big_actions")
        .insert({
          user_id: resolvedUserId,
          completed_trail_count_snapshot: selectedProgress.completedCount,
          progress_source: progressSource,
          professional_area: professionalArea,
          status: professionalArea ? "pending_generation" : "needs_area",
          unlock_at_trail_count: selectedProgress.baseline + BIG_ACTION_TRAILS_PER_CYCLE,
        })
        .select("*")
        .single();

      if (error) {
        if (!isDuplicateInsertError(error)) {
          throw error;
        }

        activeBigAction = await getActiveBigAction(resolvedUserId);
      } else {
        activeBigAction = data;
        unlockedNow = true;
      }
    }
  }

  const nextUnlockSource = activeBigAction
    ? isBigActionProgressSource(activeBigAction.progress_source)
      ? activeBigAction.progress_source
      : null
    : getPreferredProgressSource(challengeDayProgress, specializedModuleProgress);

  return {
    activeBigAction,
    challengeDayProgress,
    nextUnlockSource,
    preferredLanguage: profile.preferred_language,
    professionalArea,
    specializedModuleProgress,
    unlockedNow,
    userId: resolvedUserId,
  };
};
