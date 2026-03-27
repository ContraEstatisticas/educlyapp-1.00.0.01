import { supabase } from "@/integrations/supabase/client";
import { normalizeCompletedModules } from "@/lib/aiTrailProgress";

const AI_TRAIL_XP_ELIGIBLE_SLUGS = new Set(["claude", "lovable", "grok"]);

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

interface ClaimAiTrailCompletionXpParams {
  slug: string;
  totalModules: number;
  completedModules?: number[];
  xpAmount: number;
  reason: string;
  awardXP: (amount: number, reason: string) => Promise<unknown>;
}

export const isAiTrailXpEligible = (slug?: string | null) => Boolean(slug && AI_TRAIL_XP_ELIGIBLE_SLUGS.has(slug));

export const claimAiTrailCompletionXp = async ({
  slug,
  totalModules,
  completedModules,
  xpAmount,
  reason,
  awardXP,
}: ClaimAiTrailCompletionXpParams) => {
  if (!isAiTrailXpEligible(slug) || totalModules <= 0) return false;

  const userId = await getAuthenticatedUserId();
  if (!userId) return false;

  const normalizedModules = normalizeCompletedModules(completedModules || []);
  if (normalizedModules.length < totalModules) return false;

  const timestamp = new Date().toISOString();
  const { error } = await supabase
    .from("ai_trail_completion_rewards")
    .insert({
      user_id: userId,
      tool_slug: slug,
      xp_awarded: xpAmount,
      total_modules: totalModules,
      awarded_at: timestamp,
      created_at: timestamp,
      updated_at: timestamp,
    });

  if (error) {
    if (isDuplicateInsertError(error)) {
      return false;
    }

    throw error;
  }

  try {
    await awardXP(xpAmount, reason);
    return true;
  } catch (xpError) {
    const { error: rollbackError } = await supabase
      .from("ai_trail_completion_rewards")
      .delete()
      .eq("user_id", userId)
      .eq("tool_slug", slug);

    if (rollbackError) {
      console.error("Failed to rollback AI trail XP reservation:", rollbackError);
    }

    throw xpError;
  }
};
