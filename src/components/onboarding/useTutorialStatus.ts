import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TutorialStatus {
  dashboard: boolean;
  challenge: boolean;
  freelancer: boolean;
  assistants: boolean;
  chat: boolean;
}

const hasLegacyTutorialCompletion = (userId: string, tutorialKey: keyof TutorialStatus) => {
  const sharedKeys = [
    `tutorial_${tutorialKey}`,
    "tutorial_dashboard",
    "tutorial_challenge",
    "tutorial_freelancer",
    "tutorial_assistants",
    "tutorial_chat",
  ];

  const perUserKeys = [
    `tutorial_onboarding_base_${userId}`,
    `tutorial_onboarding_freelancer_${userId}`,
    `tutorial_onboarding_aipack_${userId}`,
    `tutorial_onboarding_combo_${userId}`,
    `tutorial_${tutorialKey}_${userId}`,
  ];

  return [...sharedKeys, ...perUserKeys].some((key) => localStorage.getItem(key) === "true");
};

export const useTutorialStatus = (tutorialKey: keyof TutorialStatus) => {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>();

  const checkStatus = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserId(undefined);
        setIsLoading(false);
        setIsCompleted(true); // Don't show tutorial if not logged in
        return;
      }

      setUserId(user.id);

      // Use the database as the single source of truth for onboarding completion.
      const { data, error } = await supabase
        .from("user_onboarding")
        .select("tutorial_completed")
        .eq("user_id", user.id)
        .maybeSingle();

      console.log("[Tutorial] Checking status for", tutorialKey, "- DB result:", data, error);

      const legacyCompleted = hasLegacyTutorialCompletion(user.id, tutorialKey);

      // If no record exists, create one and show tutorial
      if (!data && !error) {
        console.log("[Tutorial] No record found - creating new onboarding record");
        if (legacyCompleted) {
          await supabase
            .from("user_onboarding")
            .upsert({
              user_id: user.id,
              tutorial_completed: true,
              completed_at: new Date().toISOString(),
            }, { onConflict: "user_id" });
          setIsCompleted(true);
        } else {
          await supabase
            .from("user_onboarding")
            .insert({ user_id: user.id, tutorial_completed: false });
          setIsCompleted(false);
        }
      } else {
        console.log("[Tutorial] Tutorial completion in DB:", data?.tutorial_completed);
        if (!data?.tutorial_completed && legacyCompleted) {
          await supabase
            .from("user_onboarding")
            .upsert({
              user_id: user.id,
              tutorial_completed: true,
              completed_at: new Date().toISOString(),
            }, { onConflict: "user_id" });
          setIsCompleted(true);
        } else {
          setIsCompleted(Boolean(data?.tutorial_completed));
        }
      }
    } catch (error) {
      console.error("Error checking tutorial status:", error);
      setIsCompleted(true);
    } finally {
      setIsLoading(false);
    }
  }, [tutorialKey]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const completeTutorial = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("user_onboarding")
        .upsert({
          user_id: user.id,
          tutorial_completed: true,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      localStorage.setItem(`tutorial_${tutorialKey}`, "true");
      setIsCompleted(true);
    } catch (error) {
      console.error("Error completing tutorial:", error);
    }
  }, [tutorialKey]);

  const shouldShowTutorial = !isLoading && isCompleted === false;

  return {
    shouldShowTutorial,
    isLoading,
    userId,
    isCompleted,
    completeTutorial,
  };
};
