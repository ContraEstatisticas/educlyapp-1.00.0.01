import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  FileText,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLevelRewards } from "@/hooks/useLevelRewards";
import { useProductAccess } from "@/hooks/useProductAccess";
import { useUserLevel } from "@/hooks/useUserLevel";
import {
  getFreelancerDiscountOfferCopy,
  hasFreelancerDiscountOffer,
  openFreelancerOffer,
} from "@/lib/freelancerDiscountOffer";
import {
  getLevelRewardPopupContent,
  type LevelRewardPopupContent,
} from "@/lib/levelRewardPopup";
import type { LevelRewardRow } from "@/lib/levelRewards";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const SUPPORTED_POPUP_REWARDS = [
  "newsletter_access",
  "ai_hub_day_pass",
  "prompt_guide_pdf",
  "ai_hub_bonus_limits",
] as const;

const iconByKey = {
  "briefcase": BriefcaseBusiness,
  "brain": Brain,
  "file-text": FileText,
  "mail": Mail,
  "sparkles": Sparkles,
} as const;

const getLocalSeenKey = (rewardId: string) => `educly-level-reward-popup-seen:${rewardId}`;

const hasSeenPopupLocally = (rewardId: string) => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getLocalSeenKey(rewardId)) === "1";
};

const markPopupSeenLocally = (rewardId: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getLocalSeenKey(rewardId), "1");
};

const sortRewards = (rewards: LevelRewardRow[]) =>
  [...rewards].sort((first, second) => {
    if (first.source_level !== second.source_level) {
      return first.source_level - second.source_level;
    }

    return new Date(first.granted_at).getTime() - new Date(second.granted_at).getTime();
  });

export const LevelRewardMilestonePopup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { currentLevel, isLoading: isLevelLoading, levelData } = useUserLevel();
  const { freelancer, ai_hub, isLoading: isAccessLoading } = useProductAccess();
  const { data: rewards = [], isLoading: isRewardsLoading } = useLevelRewards();
  const [dismissedRewardIds, setDismissedRewardIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncedRewardKey, setSyncedRewardKey] = useState<string | null>(null);

  const language = i18n.resolvedLanguage || i18n.language;
  const hasDiscountOffer = hasFreelancerDiscountOffer();
  const discountOfferCopy = getFreelancerDiscountOfferCopy(language);

  useEffect(() => {
    if (
      isLevelLoading ||
      isAccessLoading ||
      !levelData?.user_id ||
      currentLevel < 3
    ) {
      return;
    }

    const syncKey = `${levelData.user_id}:${currentLevel}:${freelancer}:${ai_hub}`;

    if (syncedRewardKey === syncKey) return;

    let cancelled = false;

    const syncRewards = async () => {
      const { data, error } = await supabase.rpc("apply_level_rewards", {
        p_current_level: currentLevel,
        p_user_id: levelData.user_id,
      });

      if (error) {
        console.error("Error syncing level rewards:", error);
        return;
      }

      if (cancelled) return;

      setSyncedRewardKey(syncKey);

      if (Array.isArray(data) && data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });
      }
    };

    void syncRewards();

    return () => {
      cancelled = true;
    };
  }, [
    ai_hub,
    currentLevel,
    freelancer,
    isAccessLoading,
    isLevelLoading,
    levelData?.user_id,
    queryClient,
    syncedRewardKey,
  ]);

  const activeReward = useMemo(() => {
    const sortedRewards = sortRewards(rewards).filter((reward) =>
      SUPPORTED_POPUP_REWARDS.includes(reward.reward_key),
    );

    return (
      sortedRewards.find((reward) => {
        const popupSeenAt =
          reward.metadata &&
          typeof reward.metadata.popup_seen_at === "string"
            ? reward.metadata.popup_seen_at
            : null;

        return (
          !popupSeenAt &&
          !hasSeenPopupLocally(reward.id) &&
          !dismissedRewardIds.includes(reward.id)
        );
      }) || null
    );
  }, [dismissedRewardIds, rewards]);

  const popupContent = useMemo<LevelRewardPopupContent | null>(() => {
    if (!activeReward) return null;
    return getLevelRewardPopupContent(activeReward, language);
  }, [activeReward, language]);

  const markSeen = async (reward: LevelRewardRow) => {
    markPopupSeenLocally(reward.id);
    setDismissedRewardIds((previous) =>
      previous.includes(reward.id) ? previous : [...previous, reward.id],
    );
    setIsSubmitting(true);

    try {
      await supabase.rpc("mark_level_reward_popup_seen" as never, {
        p_reward_key: reward.reward_key,
      } as unknown as never);
      queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });
    } catch (error) {
      console.error("Error marking level reward popup as seen:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrimaryAction = async () => {
    if (!activeReward || !popupContent) return;

    await markSeen(activeReward);

    if (popupContent.action === "freelancer_offer") {
      openFreelancerOffer(navigate);
      return;
    }

    if (popupContent.action === "open_ai_hub" || popupContent.action === "unlock_ai_hub") {
      navigate("/assistentes");
      return;
    }

    if (popupContent.action === "download_pdf") {
      const downloadUrl =
        typeof activeReward.metadata?.download_url === "string"
          ? activeReward.metadata.download_url
          : "/rewards/educly-ai-prompts-guide.pdf";
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (isRewardsLoading || !activeReward || !popupContent) return null;

  const Icon = iconByKey[popupContent.icon];
  const showDiscountNote =
    activeReward.reward_key === "newsletter_access" &&
    typeof activeReward.metadata?.status === "string" &&
    activeReward.metadata.status === "requires_freelancer" &&
    hasDiscountOffer;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          void markSeen(activeReward);
        }
      }}
    >
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-orange-500/10 to-transparent px-6 pb-6 pt-7">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative space-y-5">
            <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {popupContent.badge}
            </Badge>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>

              <DialogHeader className="space-y-2 text-left">
                <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
                  {popupContent.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                  {popupContent.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="space-y-2">
                {popupContent.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {showDiscountNote ? (
              <p className="text-sm font-semibold text-primary">
                {discountOfferCopy.note}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 flex-1 rounded-2xl"
                disabled={isSubmitting}
                onClick={() => void handlePrimaryAction()}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : popupContent.action === "dismiss" ? null : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {showDiscountNote ? discountOfferCopy.ctaLabel : popupContent.primaryLabel}
              </Button>

              {popupContent.secondaryLabel ? (
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl"
                  disabled={isSubmitting}
                  onClick={() => void markSeen(activeReward)}
                >
                  {popupContent.secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
