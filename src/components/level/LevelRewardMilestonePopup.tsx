import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  LEVEL_REWARDS_GRANTED_EVENT,
  LEVEL_UP_EVENT,
  LEVEL_UP_POPUP_CLOSE_EVENT,
  LEVEL_UP_POPUP_OPEN_EVENT,
  type LevelRewardsGrantedEventDetail,
} from "@/lib/levelUpEvents";
import { dispatchProductAccessRefresh } from "@/lib/productAccessEvents";
import {
  getUnlockedRewardForMilestone,
  REWARD_MILESTONES,
  type LevelRewardRow,
} from "@/lib/levelRewards";
import {
  type GrantedLevelReward,
  getNewlySyncedRewards,
  mergeGrantedRewardsIntoCache,
  refreshLevelRewardsQuery,
} from "@/lib/levelRewardQueries";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

/* ── Milestone Tier Visual Config ────────────────────────────── */

interface MilestoneTierStyle {
  headerGradient: string;
  accentColor: string;
  glowColor: string;
  badgeGradient: string;
  iconBg: string;
  iconColor: string;
  emoji: string;
  superLabel: string;
  particleColors: string[];
  particleCount: number;
}

const MILESTONE_TIERS: Record<number, MilestoneTierStyle> = {
  3: {
    headerGradient: "from-amber-500/20 via-orange-500/12 to-yellow-400/5",
    accentColor: "text-amber-500",
    glowColor: "bg-amber-500/10",
    badgeGradient: "from-amber-500 to-orange-500",
    iconBg: "bg-gradient-to-br from-amber-500/15 to-orange-500/10",
    iconColor: "text-amber-500",
    emoji: "🎉",
    superLabel: "SUPER BÔNUS",
    particleColors: ["#f59e0b", "#f97316", "#fbbf24", "#eab308"],
    particleCount: 8,
  },
  5: {
    headerGradient: "from-violet-500/20 via-purple-500/12 to-fuchsia-400/5",
    accentColor: "text-violet-500",
    glowColor: "bg-violet-500/10",
    badgeGradient: "from-violet-500 to-fuchsia-500",
    iconBg: "bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10",
    iconColor: "text-violet-500",
    emoji: "🚀",
    superLabel: "SUPER BÔNUS",
    particleColors: ["#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
    particleCount: 12,
  },
  7: {
    headerGradient: "from-cyan-500/20 via-blue-500/12 to-indigo-400/5",
    accentColor: "text-cyan-500",
    glowColor: "bg-cyan-500/10",
    badgeGradient: "from-cyan-500 to-blue-500",
    iconBg: "bg-gradient-to-br from-cyan-500/15 to-blue-500/10",
    iconColor: "text-cyan-500",
    emoji: "⚡",
    superLabel: "MEGA BÔNUS",
    particleColors: ["#06b6d4", "#3b82f6", "#6366f1", "#22d3ee"],
    particleCount: 16,
  },
};

const getDefaultTier = (): MilestoneTierStyle => ({
  headerGradient: "from-primary/15 via-orange-500/10 to-transparent",
  accentColor: "text-primary",
  glowColor: "bg-primary/10",
  badgeGradient: "from-primary to-orange-500",
  iconBg: "bg-primary/10",
  iconColor: "text-primary",
  emoji: "🎁",
  superLabel: "BÔNUS",
  particleColors: ["#f97316", "#fb923c", "#fdba74"],
  particleCount: 6,
});

const getMilestoneTier = (sourceLevel: number): MilestoneTierStyle =>
  MILESTONE_TIERS[sourceLevel] || getDefaultTier();

/* ── Floating Particles Generator ──────────────────────────── */

const buildFloatingParticles = (count: number, colors: string[]) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: ((i * 43 + 17) % 100),
    y: ((i * 61 + 11) % 80) + 10,
    size: 3 + (i % 3) * 1.5,
    delay: (i * 0.15) % 2,
    duration: 2.5 + (i % 3) * 0.6,
  }));

/* ── Constants ──────────────────────────────────────────────── */

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

const getRewardSeenFingerprint = (reward: Pick<LevelRewardRow, "id" | "updated_at">) =>
  `${reward.id}:${reward.updated_at}`;

const getLocalSeenKey = (reward: Pick<LevelRewardRow, "id" | "updated_at">) =>
  `educly-level-reward-popup-seen:${getRewardSeenFingerprint(reward)}`;

const hasSeenPopupLocally = (reward: Pick<LevelRewardRow, "id" | "updated_at">) => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getLocalSeenKey(reward)) === "1";
};

const markPopupSeenLocally = (reward: Pick<LevelRewardRow, "id" | "updated_at">) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getLocalSeenKey(reward), "1");
};

const sortRewards = (rewards: LevelRewardRow[]) =>
  [...rewards].sort((first, second) => {
    if (first.source_level !== second.source_level) {
      return first.source_level - second.source_level;
    }

    return new Date(first.granted_at).getTime() - new Date(second.granted_at).getTime();
  });

/* ── Component ──────────────────────────────────────────────── */

export const LevelRewardMilestonePopup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { currentLevel, isLoading: isLevelLoading, levelData } = useUserLevel();
  const { freelancer, ai_hub, isLoading: isAccessLoading } = useProductAccess();
  const { data: rewards = [], isLoading: isRewardsLoading } = useLevelRewards();
  const [dismissedRewardFingerprints, setDismissedRewardFingerprints] = useState<string[]>([]);
  const [queuedRewards, setQueuedRewards] = useState<LevelRewardRow[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSyncedRewardSignature, setLastSyncedRewardSignature] = useState<string | null>(null);
  const [isLevelUpPopupActive, setIsLevelUpPopupActive] = useState(false);
  const [pendingPostLevelUpSync, setPendingPostLevelUpSync] = useState(false);

  const language = i18n.resolvedLanguage || i18n.language;
  const hasDiscountOffer = hasFreelancerDiscountOffer();
  const discountOfferCopy = getFreelancerDiscountOfferCopy(language);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLevelUpRequested = () => {
      setIsLevelUpPopupActive(true);
      setPendingPostLevelUpSync(true);
    };

    const handleLevelUpPopupClosed = () => {
      setIsLevelUpPopupActive(false);
    };

    const handleRewardsGranted = (event: Event) => {
      const detail = (event as CustomEvent<LevelRewardsGrantedEventDetail>).detail;

      if (!detail?.rewards?.length) return;

      setQueuedRewards((currentQueue) => {
        const nextQueue = [...currentQueue];

        for (const reward of detail.rewards) {
          if (!SUPPORTED_POPUP_REWARDS.includes(reward.reward_key)) continue;

          const existingRewardIndex = nextQueue.findIndex(
            (queuedReward) =>
              queuedReward.source_level === reward.source_level &&
              queuedReward.reward_key === reward.reward_key,
          );

          if (existingRewardIndex >= 0) {
            nextQueue[existingRewardIndex] = reward;
            continue;
          }

          nextQueue.push(reward);
        }

        return sortRewards(nextQueue);
      });
    };

    window.addEventListener(LEVEL_UP_EVENT, handleLevelUpRequested);
    window.addEventListener(LEVEL_UP_POPUP_OPEN_EVENT, handleLevelUpRequested);
    window.addEventListener(LEVEL_UP_POPUP_CLOSE_EVENT, handleLevelUpPopupClosed);
    window.addEventListener(LEVEL_REWARDS_GRANTED_EVENT, handleRewardsGranted as EventListener);

    return () => {
      window.removeEventListener(LEVEL_UP_EVENT, handleLevelUpRequested);
      window.removeEventListener(LEVEL_UP_POPUP_OPEN_EVENT, handleLevelUpRequested);
      window.removeEventListener(LEVEL_UP_POPUP_CLOSE_EVENT, handleLevelUpPopupClosed);
      window.removeEventListener(LEVEL_REWARDS_GRANTED_EVENT, handleRewardsGranted as EventListener);
    };
  }, []);

  const rewardStateSignature = useMemo(
    () =>
      REWARD_MILESTONES.map((milestone) => {
        const reward = getUnlockedRewardForMilestone(rewards, milestone.level);
        const status =
          reward?.metadata && typeof reward.metadata.status === "string"
            ? reward.metadata.status
            : "none";

        return `${milestone.level}:${reward?.reward_key || "missing"}:${status}`;
      }).join("|"),
    [rewards],
  );

  const shouldSyncRewards = useMemo(() => {
    if (currentLevel < 3) return false;

    const missingReachedReward = REWARD_MILESTONES.some(
      (milestone) =>
        currentLevel >= milestone.level && !getUnlockedRewardForMilestone(rewards, milestone.level),
    );

    const pendingNewsletterReward = rewards.find(
      (reward) =>
        reward.reward_key === "newsletter_access" &&
        reward.metadata &&
        typeof reward.metadata.status === "string" &&
        reward.metadata.status === "requires_freelancer",
    );

    const pendingAiHubBonusReward = rewards.find(
      (reward) =>
        reward.reward_key === "ai_hub_bonus_limits" &&
        reward.metadata &&
        typeof reward.metadata.status === "string" &&
        reward.metadata.status === "requires_ai_hub",
    );

    return (
      missingReachedReward ||
      Boolean(freelancer && pendingNewsletterReward) ||
      Boolean(ai_hub && pendingAiHubBonusReward)
    );
  }, [ai_hub, currentLevel, freelancer, rewards]);

  useEffect(() => {
    if (
      isLevelLoading ||
      isAccessLoading ||
      !levelData?.user_id ||
      !shouldSyncRewards
    ) {
      return;
    }

    const syncKey = `${levelData.user_id}:${currentLevel}:${freelancer}:${ai_hub}:${rewardStateSignature}`;

    if (lastSyncedRewardSignature === syncKey) return;

    let cancelled = false;

    const syncRewards = async () => {
      const cachedRewardsBeforeSync = queryClient.getQueryData<LevelRewardRow[]>(["user-level-rewards"]) || [];

      const { data, error } = await supabase.rpc("apply_level_rewards", {
        p_current_level: currentLevel,
        p_user_id: levelData.user_id,
      });

      if (error) {
        console.error("Error syncing level rewards:", error);
      }

      if (cancelled) return;

      const grantedRewards = (Array.isArray(data) ? data : []) as GrantedLevelReward[];

      if (grantedRewards.length > 0) {
        const mergedRewards = mergeGrantedRewardsIntoCache(queryClient, grantedRewards);

        setQueuedRewards((currentQueue) =>
          sortRewards([
            ...currentQueue.filter(
              (queuedReward) =>
                !mergedRewards.some(
                  (newReward) =>
                    newReward.source_level === queuedReward.source_level &&
                    newReward.reward_key === queuedReward.reward_key,
                ),
            ),
            ...mergedRewards,
          ]),
        );
      }

      try {
        const refreshedRewards = await refreshLevelRewardsQuery(queryClient);
        setLastSyncedRewardSignature(syncKey);

        if (grantedRewards.length === 0) {
          const newlyDetectedRewards = getNewlySyncedRewards(
            cachedRewardsBeforeSync,
            refreshedRewards,
            currentLevel,
          );

          if (newlyDetectedRewards.length > 0) {
            setQueuedRewards((currentQueue) =>
              sortRewards([
                ...currentQueue.filter(
                  (queuedReward) =>
                    !newlyDetectedRewards.some(
                      (newReward) =>
                        newReward.source_level === queuedReward.source_level &&
                        newReward.reward_key === queuedReward.reward_key,
                    ),
                ),
                ...newlyDetectedRewards,
              ]),
            );
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing level rewards for popup:", refreshError);
      }

      if (grantedRewards.some((reward) => reward.reward_key === "ai_hub_day_pass")) {
        dispatchProductAccessRefresh();
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
    lastSyncedRewardSignature,
    levelData?.user_id,
    queryClient,
    rewardStateSignature,
    shouldSyncRewards,
  ]);

  useEffect(() => {
    if (isLevelUpPopupActive || !pendingPostLevelUpSync) return;

    setPendingPostLevelUpSync(false);
    setLastSyncedRewardSignature(null);
    queryClient.invalidateQueries({ queryKey: ["user-level"] });
    void refreshLevelRewardsQuery(queryClient);
  }, [isLevelUpPopupActive, pendingPostLevelUpSync, queryClient]);

  const activeReward = useMemo(() => {
    const queuedReward = sortRewards(queuedRewards).find(
      (reward) =>
        !hasSeenPopupLocally(reward) &&
        !dismissedRewardFingerprints.includes(getRewardSeenFingerprint(reward)),
    );

    if (queuedReward) return queuedReward;

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
          !hasSeenPopupLocally(reward) &&
          !dismissedRewardFingerprints.includes(getRewardSeenFingerprint(reward))
        );
      }) || null
    );
  }, [dismissedRewardFingerprints, queuedRewards, rewards]);

  const popupContent = useMemo<LevelRewardPopupContent | null>(() => {
    if (!activeReward) return null;
    return getLevelRewardPopupContent(activeReward, language);
  }, [activeReward, language]);

  const markSeen = async (reward: LevelRewardRow) => {
    const rewardFingerprint = getRewardSeenFingerprint(reward);

    markPopupSeenLocally(reward);
    setQueuedRewards((currentQueue) =>
      currentQueue.filter((queuedReward) => queuedReward.id !== reward.id),
    );
    setDismissedRewardFingerprints((previous) =>
      previous.includes(rewardFingerprint) ? previous : [...previous, rewardFingerprint],
    );
    setIsSubmitting(true);

    try {
      await supabase.rpc("mark_level_reward_popup_seen" as never, {
        p_reward_key: reward.reward_key,
      } as unknown as never);
      await refreshLevelRewardsQuery(queryClient);
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

  if ((isRewardsLoading && queuedRewards.length === 0) || isLevelUpPopupActive || !activeReward || !popupContent) {
    return null;
  }

  const Icon = iconByKey[popupContent.icon];
  const tier = getMilestoneTier(activeReward.source_level);
  const particles = buildFloatingParticles(tier.particleCount, tier.particleColors);

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
        <div className={`relative overflow-hidden bg-gradient-to-br ${tier.headerGradient} px-6 pb-6 pt-7`}>
          {/* Animated glow blob */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${tier.glowColor} blur-3xl`}
          />
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className={`absolute -left-8 -bottom-8 h-32 w-32 rounded-full ${tier.glowColor} blur-3xl`}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={`particle-${p.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0.3, 0.7, 0],
                scale: [0, 1, 0.6, 1, 0],
                y: [0, -12, -4, -18, -28],
              }}
              transition={{
                duration: p.duration,
                delay: 0.5 + p.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          ))}

          <div className="relative space-y-5">
            {/* Super Bônus badge with gradient and emoji */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{tier.emoji}</span>
              <Badge
                className="border-0 text-white font-bold tracking-wide px-3 py-1"
                style={{
                  background: `linear-gradient(135deg, ${tier.particleColors[0]}, ${tier.particleColors[tier.particleColors.length - 1]})`,
                }}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {tier.superLabel} — {popupContent.badge}
              </Badge>
            </motion.div>

            {/* Icon + Title + Description */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-start gap-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 12 }}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tier.iconBg} ${tier.iconColor} shrink-0`}
              >
                <Icon className="h-6 w-6" />
              </motion.div>

              <DialogHeader className="space-y-2 text-left">
                <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
                  {popupContent.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                  {popupContent.description}
                </DialogDescription>
              </DialogHeader>
            </motion.div>

            {/* Benefits card with animated entries */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-border/70 bg-background/70 backdrop-blur-sm p-4"
            >
              <div className="space-y-2.5">
                {popupContent.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.45 + index * 0.1, type: "spring", stiffness: 300 }}
                    >
                      <Sparkles className={`mt-0.5 h-4 w-4 shrink-0 ${tier.accentColor}`} />
                    </motion.div>
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discount note for freelancer */}
            {showDiscountNote ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`text-sm font-semibold ${tier.accentColor}`}
              >
                {discountOfferCopy.note}
              </motion.p>
            ) : null}

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                className="h-12 flex-1 rounded-2xl font-semibold text-base"
                disabled={isSubmitting}
                onClick={() => void handlePrimaryAction()}
                style={{
                  background: `linear-gradient(135deg, ${tier.particleColors[0]}, ${tier.particleColors[tier.particleColors.length > 2 ? 2 : tier.particleColors.length - 1]})`,
                }}
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
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
