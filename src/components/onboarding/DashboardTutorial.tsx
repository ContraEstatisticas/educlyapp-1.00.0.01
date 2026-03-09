import { useEffect, useState } from "react";
import { TutorialSpotlight, TutorialStep } from "./TutorialSpotlight";

const DASHBOARD_STEPS: TutorialStep[] = [
  {
    id: "welcome",
    messageKey: "tutorial.dashboard.welcome",
  },
  {
    id: "streak",
    messageKey: "tutorial.dashboard.streak",
    targetId: "weekly-streak",
    mascotPosition: "bottom",
  },
  {
    id: "active-challenge",
    messageKey: "tutorial.dashboard.activeChallenge",
    targetId: "active-challenge",
    mascotPosition: "bottom",
  },
  {
    id: "assistants",
    messageKey: "tutorial.dashboard.assistants",
    targetId: "card-0",
    mascotPosition: "left",
  },
  {
    id: "freelancer",
    messageKey: "tutorial.dashboard.freelancer",
    targetId: "card-1",
    mascotPosition: "left",
  },
  {
    id: "finish",
    messageKey: "tutorial.dashboard.finish",
  },
];

export const DashboardTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("tutorial_dashboard");
    if (hasSeen === "true") return;

    const timer = setTimeout(() => setShowTutorial(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TutorialSpotlight
      steps={DASHBOARD_STEPS}
      storageKey="dashboard"
      onComplete={() => setShowTutorial(false)}
      isVisible={showTutorial}
    />
  );
};
