import { useEffect, useState } from "react";
import { TutorialSpotlight, TutorialStep } from "./TutorialSpotlight";
import { useTutorialStatus } from "./useTutorialStatus";

const ASSISTANTS_STEPS: TutorialStep[] = [
  {
    id: "welcome",
    messageKey: "tutorial.assistants.welcome",
  },
  {
    id: "cards",
    messageKey: "tutorial.assistants.cards",
    targetId: "assistants-grid",
    mascotPosition: "bottom",
  },
  {
    id: "card-click",
    messageKey: "tutorial.assistants.cardClick",
    targetId: "assistant-card-0",
    mascotPosition: "right",
    allowClick: true,
  },
  {
    id: "finish",
    messageKey: "tutorial.assistants.finish",
  },
];

export const AssistantsTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { shouldShowTutorial, completeTutorial } = useTutorialStatus("assistants");

  useEffect(() => {
    if (!shouldShowTutorial) return;

    const timer = setTimeout(() => setShowTutorial(true), 500);
    return () => clearTimeout(timer);
  }, [shouldShowTutorial]);

  return (
    <TutorialSpotlight
      steps={ASSISTANTS_STEPS}
      storageKey="assistants"
      onComplete={() => {
        void completeTutorial();
        setShowTutorial(false);
      }}
      isVisible={showTutorial}
    />
  );
};
