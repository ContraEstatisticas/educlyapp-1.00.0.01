import { useEffect, useState } from "react";
import { TutorialSpotlight, TutorialStep } from "./TutorialSpotlight";
import { useTutorialStatus } from "./useTutorialStatus";

const FREELANCER_STEPS: TutorialStep[] = [
  {
    id: "welcome",
    messageKey: "tutorial.freelancer.welcome",
  },
  {
    id: "modules",
    messageKey: "tutorial.freelancer.modules",
    targetId: "freelancer-modules",
    mascotPosition: "bottom",
  },
  {
    id: "module-click",
    messageKey: "tutorial.freelancer.moduleClick",
    targetId: "freelancer-module-1",
    mascotPosition: "right",
    allowClick: true,
  },
  {
    id: "finish",
    messageKey: "tutorial.freelancer.finish",
  },
];

export const FreelancerTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { shouldShowTutorial, completeTutorial } = useTutorialStatus("freelancer");

  useEffect(() => {
    if (!shouldShowTutorial) return;

    const timer = setTimeout(() => setShowTutorial(true), 500);
    return () => clearTimeout(timer);
  }, [shouldShowTutorial]);

  return (
    <TutorialSpotlight
      steps={FREELANCER_STEPS}
      storageKey="freelancer"
      onComplete={() => {
        void completeTutorial();
        setShowTutorial(false);
      }}
      isVisible={showTutorial}
    />
  );
};
