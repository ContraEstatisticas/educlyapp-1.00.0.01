import { useEffect, useState, useMemo } from "react";
import { TutorialSpotlight, TutorialStep } from "./TutorialSpotlight";
import { useProductAccess, ProductType } from "@/hooks/useProductAccess";
import { useTutorialStatus } from "./useTutorialStatus";

// Base: 4 steps (simple intro)
const BASE_STEPS: TutorialStep[] = [
    { id: "welcome-base", messageKey: "tutorial.onboarding.base.welcome" },
    { id: "streak", messageKey: "tutorial.onboarding.base.streak", targetId: "weekly-streak", mascotPosition: "bottom" },
    { id: "active-challenge", messageKey: "tutorial.onboarding.base.challenge", targetId: "active-challenge", mascotPosition: "bottom" },
    { id: "finish-base", messageKey: "tutorial.onboarding.base.finish" },
];

// Freelancer: 6 steps (+ freelancer card + medals)
const FREELANCER_STEPS: TutorialStep[] = [
    { id: "welcome-freelancer", messageKey: "tutorial.onboarding.freelancer.welcome" },
    { id: "streak", messageKey: "tutorial.onboarding.freelancer.streak", targetId: "weekly-streak", mascotPosition: "bottom" },
    { id: "active-challenge", messageKey: "tutorial.onboarding.freelancer.challenge", targetId: "active-challenge", mascotPosition: "bottom" },
    { id: "freelancer-highlight", messageKey: "tutorial.onboarding.freelancer.freelancerCard", targetId: "card-1", mascotPosition: "left" },
    { id: "medals-highlight", messageKey: "tutorial.onboarding.freelancer.medals", targetId: "card-3", mascotPosition: "left" },
    { id: "finish-freelancer", messageKey: "tutorial.onboarding.freelancer.finish" },
];

// AI Pack: 6 steps (+ assistants card + edi chat)
const AI_PACK_STEPS: TutorialStep[] = [
    { id: "welcome-aipack", messageKey: "tutorial.onboarding.aipack.welcome" },
    { id: "streak", messageKey: "tutorial.onboarding.aipack.streak", targetId: "weekly-streak", mascotPosition: "bottom" },
    { id: "active-challenge", messageKey: "tutorial.onboarding.aipack.challenge", targetId: "active-challenge", mascotPosition: "bottom" },
    { id: "assistants-highlight", messageKey: "tutorial.onboarding.aipack.assistantsCard", targetId: "card-0", mascotPosition: "left" },
    { id: "edi-chat", messageKey: "tutorial.onboarding.aipack.ediChat", targetId: "edi-chat-button", mascotPosition: "left" },
    { id: "finish-aipack", messageKey: "tutorial.onboarding.aipack.finish" },
];

// Combo: 8 steps (all features)
const COMBO_STEPS: TutorialStep[] = [
    { id: "welcome-combo", messageKey: "tutorial.onboarding.combo.welcome" },
    { id: "streak", messageKey: "tutorial.onboarding.combo.streak", targetId: "weekly-streak", mascotPosition: "bottom" },
    { id: "active-challenge", messageKey: "tutorial.onboarding.combo.challenge", targetId: "active-challenge", mascotPosition: "bottom" },
    { id: "assistants-highlight", messageKey: "tutorial.onboarding.combo.assistantsCard", targetId: "card-0", mascotPosition: "left" },
    { id: "freelancer-highlight", messageKey: "tutorial.onboarding.combo.freelancerCard", targetId: "card-1", mascotPosition: "left" },
    { id: "edi-chat", messageKey: "tutorial.onboarding.combo.ediChat", targetId: "edi-chat-button", mascotPosition: "left" },
    { id: "medals-highlight", messageKey: "tutorial.onboarding.combo.medals", targetId: "card-3", mascotPosition: "left" },
    { id: "finish-combo", messageKey: "tutorial.onboarding.combo.finish" },
];

type ProductTier = "base" | "freelancer" | "aipack" | "combo";

function getProductTier(access: { base: boolean; freelancer: boolean; ai_hub: boolean }): ProductTier {
    if (access.freelancer && access.ai_hub) return "combo";
    if (access.freelancer) return "freelancer";
    if (access.ai_hub) return "aipack";
    return "base";
}

function getStepsForTier(tier: ProductTier): TutorialStep[] {
    switch (tier) {
        case "combo": return COMBO_STEPS;
        case "freelancer": return FREELANCER_STEPS;
        case "aipack": return AI_PACK_STEPS;
        default: return BASE_STEPS;
    }
}

export const ProductOnboarding = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const productAccess = useProductAccess();
    const { shouldShowTutorial, isLoading: onboardingLoading, userId, completeTutorial } = useTutorialStatus("dashboard");

    const productTier = useMemo(() => {
        if (productAccess.isLoading) return null;
        return getProductTier(productAccess);
    }, [productAccess]);

    const steps = useMemo(() => {
        if (!productTier) return [];
        return getStepsForTier(productTier);
    }, [productTier]);

    const storageKey = `onboarding_${productTier}`;

    useEffect(() => {
        if (productAccess.isLoading || onboardingLoading || !productTier || !userId || !shouldShowTutorial) return;

        const timer = setTimeout(() => setShowTutorial(true), 800);
        return () => clearTimeout(timer);
    }, [productAccess.isLoading, onboardingLoading, productTier, userId, shouldShowTutorial]);

    if (productAccess.isLoading || onboardingLoading || !productTier || !userId || steps.length === 0) {
        return null;
    }

    return (
        <TutorialSpotlight
            steps={steps}
            storageKey={storageKey}
            userId={userId}
            variant={productTier}
            onComplete={() => {
                void completeTutorial();
                setShowTutorial(false);
            }}
            isVisible={showTutorial}
        />
    );
};
