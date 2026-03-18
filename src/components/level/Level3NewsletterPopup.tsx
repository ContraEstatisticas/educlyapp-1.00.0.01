import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, BriefcaseBusiness, Loader2, Mail, Sparkles } from "lucide-react";
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
import { getNewsletterLevelPopupCopy } from "@/lib/levelRewardNewsletterPopup";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const getLocalSeenKey = (rewardId: string) => `educly-level-reward-popup-seen:${rewardId}`;

const hasSeenPopupLocally = (rewardId: string) => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getLocalSeenKey(rewardId)) === "1";
};

const markPopupSeenLocally = (rewardId: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getLocalSeenKey(rewardId), "1");
};

export const Level3NewsletterPopup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { data: rewards = [], isLoading } = useLevelRewards();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dismissedRewardId, setDismissedRewardId] = useState<string | null>(null);

  const reward = useMemo(
    () =>
      rewards.find(
        (entry) => entry.reward_key === "newsletter_access" && entry.source_level === 3,
      ),
    [rewards],
  );

  const popupSeenAt =
    reward?.metadata &&
    typeof reward.metadata === "object" &&
    typeof reward.metadata.popup_seen_at === "string"
      ? reward.metadata.popup_seen_at
      : null;

  const status =
    reward?.metadata &&
    typeof reward.metadata === "object" &&
    typeof reward.metadata.status === "string"
      ? reward.metadata.status
      : "active";

  const requiresFreelancer = status === "requires_freelancer";
  const localSeen = reward ? hasSeenPopupLocally(reward.id) : false;
  const popupCopy = getNewsletterLevelPopupCopy(i18n.resolvedLanguage || i18n.language);

  useEffect(() => {
    if (isLoading || !reward) return;

    if (!popupSeenAt && !localSeen && dismissedRewardId !== reward.id) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [dismissedRewardId, isLoading, localSeen, popupSeenAt, reward]);

  const markSeen = async () => {
    if (!reward) return;

    markPopupSeenLocally(reward.id);
    setDismissedRewardId(reward.id);
    setIsOpen(false);
    setIsSubmitting(true);

    try {
      await supabase.rpc("mark_level_reward_popup_seen" as any, {
        p_reward_key: reward.reward_key,
      });
      queryClient.invalidateQueries({ queryKey: ["user-level-rewards"] });
    } catch (error) {
      console.error("Error marking newsletter popup as seen:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrimaryAction = async () => {
    await markSeen();

    if (requiresFreelancer) {
      navigate("/freelancer");
    }
  };

  if (!reward) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && void markSeen()}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-orange-500/10 to-transparent px-6 pb-6 pt-7">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative space-y-5">
            <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {popupCopy.badge}
            </Badge>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {requiresFreelancer ? (
                  <BriefcaseBusiness className="h-6 w-6" />
                ) : (
                  <Mail className="h-6 w-6" />
                )}
              </div>

              <DialogHeader className="space-y-2 text-left">
                <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
                  {requiresFreelancer ? popupCopy.lockedTitle : popupCopy.activeTitle}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                  {requiresFreelancer
                    ? popupCopy.lockedDescription
                    : popupCopy.activeDescription}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 flex-1 rounded-2xl"
                disabled={isSubmitting}
                onClick={handlePrimaryAction}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : requiresFreelancer ? (
                  <ArrowRight className="mr-2 h-4 w-4" />
                ) : null}
                {requiresFreelancer ? popupCopy.lockedPrimaryButton : popupCopy.activeButton}
              </Button>

              {requiresFreelancer ? (
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl"
                  disabled={isSubmitting}
                  onClick={() => void markSeen()}
                >
                  {popupCopy.lockedSecondaryButton}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
