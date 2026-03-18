import { useEffect, useState } from "react";
import { TutorialSpotlight, TutorialStep } from "./TutorialSpotlight";
import { useTutorialStatus } from "./useTutorialStatus";

const CHALLENGE_STEPS: TutorialStep[] = [
  {
    id: "welcome",
    messageKey: "tutorial.challenge.welcome",
  },
  {
    id: "trophy",
    messageKey: "tutorial.challenge.trophy",
    targetId: "trophy-card",
    mascotPosition: "right",
  },
  {
    id: "tools",
    messageKey: "tutorial.challenge.tabs",
    targetId: "challenge-tabs",
    mascotPosition: "bottom",
  },
  {
    id: "days-bar",
    messageKey: "tutorial.challenge.daysBar",
    targetId: "days-progress-bar",
    mascotPosition: "bottom",
  },
  {
    id: "day-card",
    messageKey: "tutorial.challenge.dayCard",
    targetId: "current-day-card",
    mascotPosition: "left",
    allowClick: true,
  },
  {
    id: "finish",
    messageKey: "tutorial.challenge.finish",
  },
];

export const ChallengeTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { shouldShowTutorial, completeTutorial } = useTutorialStatus("challenge");

  useEffect(() => {
    if (!shouldShowTutorial) return;

    const timer = setTimeout(() => setShowTutorial(true), 500);
    return () => clearTimeout(timer);
  }, [shouldShowTutorial]);

  return (
    <TutorialSpotlight
      steps={CHALLENGE_STEPS}
      storageKey="challenge"
      onComplete={() => {
        void completeTutorial();
        setShowTutorial(false);
      }}
      isVisible={showTutorial}
    />
  );
};
