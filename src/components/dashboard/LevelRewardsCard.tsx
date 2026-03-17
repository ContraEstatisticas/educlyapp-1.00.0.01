import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Brain, FileText, Gift, Lock, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useProductAccess } from "@/hooks/useProductAccess";
import { useUserLevel } from "@/hooks/useUserLevel";
import { useLevelRewards } from "@/hooks/useLevelRewards";
import {
  formatRewardExpiry,
  getLevelRewardsCopy,
  getRewardDetails,
  getUnlockedRewardForMilestone,
  REWARD_MILESTONES,
  type LevelRewardKey,
} from "@/lib/levelRewards";
import {
  getNewsletterRequiresFreelancerCta,
  getNewsletterRequiresFreelancerDescription,
} from "@/lib/levelRewardMarketing";
import { useTranslation } from "react-i18next";

interface LevelRewardsCardProps {
  className?: string;
}

const iconByReward: Record<LevelRewardKey, typeof Mail> = {
  newsletter_access: Mail,
  ai_hub_day_pass: Brain,
  prompt_guide_pdf: FileText,
};

export const LevelRewardsCard = ({ className }: LevelRewardsCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { currentLevel, currentXPInLevel, progressPercent, totalXP, xpNeededForNext } = useUserLevel();
  const { data: rewards = [], isLoading } = useLevelRewards();
  const { freelancer } = useProductAccess();

  const copy = getLevelRewardsCopy(i18n.resolvedLanguage || i18n.language);
  const language = i18n.resolvedLanguage || i18n.language;

  const nextMilestone = useMemo(
    () => REWARD_MILESTONES.find((milestone) => currentLevel < milestone.level),
    [currentLevel],
  );

  useEffect(() => {
    const pendingNewsletterReward = rewards.find(
      (reward) =>
        reward.reward_key === "newsletter_access" &&
        reward.metadata &&
        typeof reward.metadata.status === "string" &&
        reward.metadata.status === "requires_freelancer",
    );

    if (!freelancer || !pendingNewsletterReward) return;

    let cancelled = false;

    const syncNewsletterReward = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase.rpc("apply_level_rewards", {
        p_current_level: 3,
        p_user_id: user.id,
      });

      if (error) {
        console.error("Error syncing newsletter reward:", error);
        return;
      }

      if (!cancelled && Array.isArray(data) && data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });
      }
    };

    void syncNewsletterReward();

    return () => {
      cancelled = true;
    };
  }, [freelancer, queryClient, rewards]);

  return (
    <Card className={cn("p-6 rounded-3xl bg-card border text-card-foreground", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Gift className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">{copy.sectionTitle}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {copy.levelLabel} {currentLevel}
              </h3>
              <p className="text-sm text-muted-foreground">
                {copy.sectionSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {copy.totalXpLabel}: {totalXP}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-muted-foreground">{copy.currentProgressLabel}</span>
            <span className="font-semibold text-foreground">
              {currentXPInLevel}/{xpNeededForNext} XP
            </span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          {nextMilestone ? (
            <p className="text-sm text-muted-foreground">
              {copy.nextRewardLabel}: <span className="font-semibold text-foreground">{copy.levelLabel} {nextMilestone.level}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">{copy.allRewardsUnlockedLabel}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {REWARD_MILESTONES.map((milestone) => {
            const unlockedReward = getUnlockedRewardForMilestone(rewards, milestone.level);
            const isUnlocked = Boolean(unlockedReward);
            const rewardKey = (unlockedReward?.reward_key || milestone.keys[0]) as LevelRewardKey;
            const rewardDetails = getRewardDetails(rewardKey, i18n.resolvedLanguage || i18n.language);
            const Icon = isUnlocked ? iconByReward[rewardKey] : Lock;
            const downloadUrl = typeof unlockedReward?.metadata?.download_url === "string"
              ? unlockedReward.metadata.download_url
              : "/rewards/educly-ai-prompts-guide.pdf";
            const expiryLabel = formatRewardExpiry(unlockedReward?.metadata?.expires_at, i18n.resolvedLanguage || i18n.language);
            const dayPassExpiresAt = typeof unlockedReward?.metadata?.expires_at === "string"
              ? new Date(unlockedReward.metadata.expires_at)
              : null;
            const isDayPassActive = Boolean(dayPassExpiresAt && dayPassExpiresAt.getTime() > Date.now());
            const rewardStatus =
              unlockedReward?.metadata && typeof unlockedReward.metadata.status === "string"
                ? unlockedReward.metadata.status
                : null;
            const newsletterRequiresFreelancer =
              isUnlocked &&
              rewardKey === "newsletter_access" &&
              (!freelancer || rewardStatus === "requires_freelancer");

            return (
              <div
                key={milestone.level}
                className={cn(
                  "rounded-2xl border p-4 transition-colors",
                  isUnlocked ? "border-primary/30 bg-primary/5" : "border-border/70 bg-muted/10",
                )}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      isUnlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {copy.levelLabel} {milestone.level}
                      </p>
                      <h4 className="text-base font-bold text-foreground">
                        {isUnlocked
                          ? rewardDetails.title
                          : milestone.level === 5
                            ? copy.level5LockedTitle
                            : rewardDetails.title}
                      </h4>
                    </div>
                  </div>

                  <Badge variant={isUnlocked ? "default" : "outline"} className={isUnlocked ? "bg-primary text-primary-foreground" : ""}>
                    {isUnlocked ? copy.unlockedLabel : copy.lockedLabel}
                  </Badge>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isUnlocked
                    ? rewardDetails.description
                    : milestone.level === 5
                      ? copy.level5LockedDescription
                      : rewardDetails.description}
                </p>

                {isUnlocked && rewardKey === "newsletter_access" && (
                  newsletterRequiresFreelancer ? (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-medium text-foreground">
                        {getNewsletterRequiresFreelancerDescription(language)}
                      </p>
                      <Button
                        onClick={() => navigate("/freelancer")}
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        {getNewsletterRequiresFreelancerCta(language)}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {copy.newsletterActiveLabel}
                    </p>
                  )
                )}

                {isUnlocked && rewardKey === "ai_hub_day_pass" && (
                  <div className="mt-4 space-y-3">
                    {expiryLabel && isDayPassActive && (
                      <p className="text-sm text-muted-foreground">
                        {copy.dayPassExpiresLabel}: <span className="font-medium text-foreground">{expiryLabel}</span>
                      </p>
                    )}
                    {isDayPassActive ? (
                      <Button onClick={() => navigate("/assistentes")} className="w-full rounded-xl">
                        {copy.openAiHubLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">
                        {copy.dayPassExpiredLabel}
                      </p>
                    )}
                  </div>
                )}

                {isUnlocked && rewardKey === "prompt_guide_pdf" && (
                  <div className="mt-4">
                    <Button asChild className="w-full rounded-xl">
                      <a href={downloadUrl} download>
                        {copy.downloadGuideLabel}
                        <Sparkles className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">{copy.loadingRewardsLabel}</p>
        )}
      </div>
    </Card>
  );
};
