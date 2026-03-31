import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { useTranslation } from "react-i18next";
import { Check, Link2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { EdiGuidedHelp, EdiGuidedHelpStep } from "./EdiGuidedHelp";
import { tUi } from "@/lib/supplementalUiTranslations";

interface MatchPair {
  left: string;
  right: string;
}

interface MatchWordsProps {
  title: string;
  description?: string;
  pairs: MatchPair[];
  onComplete: () => void;
  ediHelpEnabled?: boolean;
}

interface RopeConnection {
  leftId: string;
  rightId: string;
  isCorrect: boolean;
}

const seededShuffle = <T,>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  let currentSeed = seed;

  const seededRandom = () => {
    currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
    return currentSeed / 0x7fffffff;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const MatchWords = ({
  title,
  description,
  pairs,
  onComplete,
  ediHelpEnabled = false,
}: MatchWordsProps) => {
  const { t, i18n } = useTranslation();
  const { playCorrect, playIncorrect } = useQuizSounds();
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Map<string, string>>(new Map());
  const [wrongAttempt, setWrongAttempt] = useState<{ left: string; right: string } | null>(null);
  const [ropeConnections, setRopeConnections] = useState<RopeConnection[]>([]);
  const [wrongFeedback, setWrongFeedback] = useState<string | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isEdiHelpOpen, setIsEdiHelpOpen] = useState(false);
  const [ediHelpPairs, setEdiHelpPairs] = useState<MatchPair[]>([]);

  const [shuffledLeft, setShuffledLeft] = useState<string[]>(() =>
    seededShuffle([...pairs.map((pair) => pair.left)], shuffleSeed)
  );

  const [shuffledRight, setShuffledRight] = useState<string[]>(() => {
    const rightSeed = (shuffleSeed * 31337) ^ 0xDEADBEEF;
    const shuffled = seededShuffle([...pairs.map((pair) => pair.right)], rightSeed);
    const leftItems = seededShuffle([...pairs.map((pair) => pair.left)], shuffleSeed);

    for (let attempts = 0; attempts < 10; attempts++) {
      let hasAlignment = false;

      for (let i = 0; i < shuffled.length; i++) {
        const leftItem = leftItems[i];
        const rightItem = shuffled[i];
        const pair = pairs.find((currentPair) => currentPair.left === leftItem);

        if (pair && pair.right === rightItem) {
          hasAlignment = true;
          const swapIndex = (i + 1) % shuffled.length;
          [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
        }
      }

      if (!hasAlignment) break;
    }

    return shuffled;
  });

  const isCompleted = matchedPairs.size === pairs.length;

  const getRopePositions = useCallback(() => {
    if (!containerRef.current) return [];

    const positions: { x1: number; y1: number; x2: number; y2: number; isCorrect: boolean }[] = [];

    ropeConnections.forEach((connection) => {
      const leftEl = containerRef.current?.querySelector(`[data-left-id="${connection.leftId}"]`);
      const rightEl = containerRef.current?.querySelector(`[data-right-id="${connection.rightId}"]`);

      if (leftEl && rightEl) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        positions.push({
          x1: leftRect.right - containerRect.left,
          y1: leftRect.top + leftRect.height / 2 - containerRect.top,
          x2: rightRect.left - containerRect.left,
          y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          isCorrect: connection.isCorrect,
        });
      }
    });

    return positions;
  }, [ropeConnections]);

  const [ropePositions, setRopePositions] = useState<ReturnType<typeof getRopePositions>>([]);

  useEffect(() => {
    const updatePositions = () => {
      setRopePositions(getRopePositions());
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => window.removeEventListener("resize", updatePositions);
  }, [getRopePositions]);

  const handleLeftClick = (value: string) => {
    if (matchedPairs.has(value)) return;

    setSelectedLeft(value);
    setWrongAttempt(null);

    if (selectedRight) {
      checkMatch(value, selectedRight);
    }
  };

  const handleRightClick = (value: string) => {
    const isAlreadyMatched = Array.from(matchedPairs.values()).includes(value);
    if (isAlreadyMatched) return;

    setSelectedRight(value);
    setWrongAttempt(null);

    if (selectedLeft) {
      checkMatch(selectedLeft, value);
    }
  };

  const checkMatch = (left: string, right: string) => {
    const pair = pairs.find((currentPair) => currentPair.left === left);
    const isCorrect = pair && pair.right === right;

    const newConnection: RopeConnection = {
      leftId: left,
      rightId: right,
      isCorrect: !!isCorrect,
    };

    if (isCorrect) {
      playCorrect();
      const newMatched = new Map(matchedPairs);
      newMatched.set(left, right);
      setMatchedPairs(newMatched);
      setRopeConnections((prev) => [...prev, newConnection]);
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    playIncorrect();
    const nextWrongAttempts = wrongAttempts + 1;
    setWrongAttempts(nextWrongAttempts);
    setWrongAttempt({ left, right });
    setWrongFeedback(tUi(t, i18n.language, "lesson.matchWords.wrongHint"));

    if (ediHelpEnabled && nextWrongAttempts >= 3) {
      const remainingPairs = pairs.filter((currentPair) => !matchedPairs.has(currentPair.left));

      if (remainingPairs.length > 0) {
        setEdiHelpPairs(remainingPairs);
        setIsEdiHelpOpen(true);
      }
    }

    setRopeConnections((prev) => [...prev, newConnection]);

    setTimeout(() => {
      setRopeConnections((prev) => prev.filter((connection) => connection !== newConnection));
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongAttempt(null);
      setWrongFeedback(null);
    }, 1500);
  };

  const handleReset = () => {
    setMatchedPairs(new Map());
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongAttempt(null);
    setWrongFeedback(null);
    setRopeConnections([]);
    setIsEdiHelpOpen(false);
    setEdiHelpPairs([]);

    const newSeed = Date.now();
    setShuffleSeed(newSeed);

    const newLeft = seededShuffle([...pairs.map((pair) => pair.left)], newSeed);
    setShuffledLeft(newLeft);

    const rightSeed = (newSeed * 31337) ^ 0xDEADBEEF;
    const newRight = seededShuffle([...pairs.map((pair) => pair.right)], rightSeed);

    for (let attempts = 0; attempts < 10; attempts++) {
      let hasAlignment = false;

      for (let i = 0; i < newRight.length; i++) {
        const pair = pairs.find((currentPair) => currentPair.left === newLeft[i]);
        if (pair && pair.right === newRight[i]) {
          hasAlignment = true;
          const swapIndex = (i + 1) % newRight.length;
          [newRight[i], newRight[swapIndex]] = [newRight[swapIndex], newRight[i]];
        }
      }

      if (!hasAlignment) break;
    }

    setShuffledRight(newRight);
  };

  const isLeftMatched = (value: string) => matchedPairs.has(value);
  const isRightMatched = (value: string) => Array.from(matchedPairs.values()).includes(value);

  const ediHelpSteps: EdiGuidedHelpStep[] = ediHelpPairs.map((pair, index) => ({
    id: `match-help-${index}`,
    title: tUi(t, i18n.language, "lesson.ediGuide.match.stepTitle", {
      index: index + 1,
    }),
    description: tUi(t, i18n.language, "lesson.ediGuide.match.stepDescription", {
      left: pair.left,
      right: pair.right,
    }),
    actionLabel: tUi(t, i18n.language, "lesson.ediGuide.match.action"),
  }));

  const handleApplyEdiPair = async (stepIndex: number) => {
    const pair = ediHelpPairs[stepIndex];
    if (!pair) return;

    playCorrect();
    setWrongFeedback(null);
    setWrongAttempt(null);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs((prev) => {
      if (prev.has(pair.left)) return prev;
      const next = new Map(prev);
      next.set(pair.left, pair.right);
      return next;
    });
    setRopeConnections((prev) => {
      const alreadyConnected = prev.some(
        (connection) => connection.leftId === pair.left && connection.rightId === pair.right
      );

      if (alreadyConnected) return prev;

      return [...prev, { leftId: pair.left, rightId: pair.right, isCorrect: true }];
    });
  };

  return (
    <div data-testid="match-word-container" className="bg-card rounded-xl p-4 sm:p-6 border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

      <p className="text-sm text-muted-foreground mb-4">
        {tUi(t, i18n.language, "lesson.matchWords.instructions")}
      </p>

      <div ref={containerRef} className="relative grid grid-cols-2 gap-6 sm:gap-8">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: "visible" }}>
          {ropePositions.map((pos, idx) => (
            <g key={`${ropeConnections[idx]?.leftId ?? idx}-${ropeConnections[idx]?.rightId ?? idx}`}>
              <path
                d={`M ${pos.x1} ${pos.y1} Q ${(pos.x1 + pos.x2) / 2} ${(pos.y1 + pos.y2) / 2 + 15} ${pos.x2} ${pos.y2}`}
                fill="none"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="6"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <path
                d={`M ${pos.x1} ${pos.y1} Q ${(pos.x1 + pos.x2) / 2} ${(pos.y1 + pos.y2) / 2 + 12} ${pos.x2} ${pos.y2}`}
                fill="none"
                stroke={pos.isCorrect ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={pos.isCorrect ? "none" : "8 4"}
                className={cn("transition-all duration-300", !pos.isCorrect && "animate-pulse")}
              />
              {pos.isCorrect && (
                <>
                  <circle cx={pos.x1 + 5} cy={pos.y1} r="3" fill="hsl(var(--success))" />
                  <circle cx={pos.x2 - 5} cy={pos.y2} r="3" fill="hsl(var(--success))" />
                </>
              )}
            </g>
          ))}
        </svg>

        <div className="space-y-2 relative z-20 flex flex-col justify-center">
          {shuffledLeft.map((value) => (
            <button
              key={value}
              data-left-id={value}
              onClick={() => handleLeftClick(value)}
              disabled={isLeftMatched(value)}
              className={cn(
                "w-full p-3 rounded-lg text-sm font-medium text-left transition-all",
                "border-2 relative",
                isLeftMatched(value)
                  ? "bg-success/20 border-success text-success cursor-default"
                  : selectedLeft === value
                    ? "bg-primary/20 border-primary text-primary scale-105 shadow-lg"
                    : wrongAttempt?.left === value
                      ? "bg-destructive/20 border-destructive text-destructive animate-shake"
                      : "bg-muted/50 border-transparent hover:border-primary/50 hover:bg-muted text-foreground"
              )}
            >
              {value}
              <span
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all",
                  isLeftMatched(value)
                    ? "bg-success border-success"
                    : selectedLeft === value
                      ? "bg-primary border-primary animate-pulse"
                      : "bg-muted border-muted-foreground/30"
                )}
              />
            </button>
          ))}
        </div>

        <div className="space-y-2 relative z-20 flex flex-col justify-center">
          {shuffledRight.map((value) => (
            <button
              key={value}
              data-right-id={value}
              onClick={() => handleRightClick(value)}
              disabled={isRightMatched(value)}
              className={cn(
                "w-full p-3 rounded-lg text-sm font-medium text-left transition-all",
                "border-2 relative pl-6",
                isRightMatched(value)
                  ? "bg-success/20 border-success text-success cursor-default"
                  : selectedRight === value
                    ? "bg-primary/20 border-primary text-primary scale-105 shadow-lg"
                    : wrongAttempt?.right === value
                      ? "bg-destructive/20 border-destructive text-destructive animate-shake"
                      : "bg-muted/50 border-transparent hover:border-primary/50 hover:bg-muted text-foreground"
              )}
            >
              <span
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all",
                  isRightMatched(value)
                    ? "bg-success border-success"
                    : selectedRight === value
                      ? "bg-primary border-primary animate-pulse"
                      : "bg-muted border-muted-foreground/30"
                )}
              />
              {value}
            </button>
          ))}
        </div>
      </div>

      {wrongFeedback && (
        <div className="mt-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium text-center animate-in fade-in duration-200">
          {wrongFeedback}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {matchedPairs.size} / {pairs.length} {tUi(t, i18n.language, "lesson.matchWords.matched")}
        </span>

        <div className="h-2 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300"
            style={{ width: `${(matchedPairs.size / pairs.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {isCompleted ? (
          <Button onClick={onComplete} className="w-full h-12">
            <Check className="w-4 h-4 mr-2" />
            {t("common.continue")}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset} className="w-full h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            {tUi(t, i18n.language, "lesson.matchWords.reset")}
          </Button>
        )}
      </div>

      <EdiGuidedHelp
        isOpen={isEdiHelpOpen}
        title={tUi(t, i18n.language, "lesson.ediGuide.match.modalTitle")}
        description={tUi(t, i18n.language, "lesson.ediGuide.match.modalDescription")}
        steps={ediHelpSteps}
        onApplyStep={handleApplyEdiPair}
        onClose={() => setIsEdiHelpOpen(false)}
      />
    </div>
  );
};
