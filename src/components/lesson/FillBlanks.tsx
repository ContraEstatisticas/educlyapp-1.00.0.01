import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { useTranslation } from "react-i18next";
import { Check, PenLine, RotateCcw, HelpCircle } from "lucide-react";
import { cn, shuffleArray } from "@/lib/utils";
import { EdiGuidedHelp, EdiGuidedHelpStep } from "./EdiGuidedHelp";
import { tUi } from "@/lib/supplementalUiTranslations";

interface FillBlanksProps {
  title: string;
  sentence: string;
  answers?: string[];
  correctAnswers?: string[];
  options: string[];
  explanation?: string;
  onComplete: () => void;
  ediHelpEnabled?: boolean;
}

export const FillBlanks = ({
  title,
  sentence,
  answers,
  correctAnswers,
  options,
  explanation,
  onComplete,
  ediHelpEnabled = false,
}: FillBlanksProps) => {
  const { t, i18n } = useTranslation();
  const { playCorrect, playIncorrect } = useQuizSounds();

  const normalizedSentence = sentence.replace(/\[BLANK\]/g, "___");
  const blanks = normalizedSentence.split("___");
  const actualAnswers = answers || correctAnswers || [];
  const numBlanks = blanks.length - 1;

  const optionItems = useMemo(
    () =>
      options.map((value, index) => ({
        id: `${value}-${index}`,
        value,
      })),
    [options]
  );

  const [filledAnswers, setFilledAnswers] = useState<(string | null)[]>(Array(numBlanks).fill(null));
  const [filledOptionIds, setFilledOptionIds] = useState<(string | null)[]>(Array(numBlanks).fill(null));
  const [usedOptions, setUsedOptions] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeBlank, setActiveBlank] = useState<number | null>(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isEdiHelpOpen, setIsEdiHelpOpen] = useState(false);

  const shuffledOptions = useMemo(() => shuffleArray([...optionItems]), [optionItems]);

  const moveToNextEmptyBlank = (answersState: (string | null)[], currentIndex: number) => {
    const nextEmpty = answersState.findIndex((answer, index) => index > currentIndex && answer === null);

    if (nextEmpty !== -1) {
      setActiveBlank(nextEmpty);
      return;
    }

    const firstEmpty = answersState.findIndex((answer) => answer === null);
    setActiveBlank(firstEmpty !== -1 ? firstEmpty : null);
  };

  const applyAnswerToBlank = (blankIndex: number, answer: string) => {
    const currentOptionId = filledOptionIds[blankIndex];
    const matchingOption = optionItems.find(
      (option) => option.value === answer && (!usedOptions.has(option.id) || option.id === currentOptionId)
    );

    if (!matchingOption) return false;

    const nextFilledAnswers = [...filledAnswers];
    const nextFilledOptionIds = [...filledOptionIds];
    const nextUsedOptions = new Set(usedOptions);

    if (currentOptionId && currentOptionId !== matchingOption.id) {
      nextUsedOptions.delete(currentOptionId);
    }

    nextFilledAnswers[blankIndex] = answer;
    nextFilledOptionIds[blankIndex] = matchingOption.id;
    nextUsedOptions.add(matchingOption.id);

    setFilledAnswers(nextFilledAnswers);
    setFilledOptionIds(nextFilledOptionIds);
    setUsedOptions(nextUsedOptions);
    moveToNextEmptyBlank(nextFilledAnswers, blankIndex);

    return true;
  };

  const handleOptionClick = (option: { id: string; value: string }) => {
    if (showResult || activeBlank === null || usedOptions.has(option.id)) return;

    const nextFilledAnswers = [...filledAnswers];
    const nextFilledOptionIds = [...filledOptionIds];

    if (nextFilledOptionIds[activeBlank]) {
      const nextUsedOptions = new Set(usedOptions);
      nextUsedOptions.delete(nextFilledOptionIds[activeBlank]!);
      setUsedOptions(nextUsedOptions);
    }

    nextFilledAnswers[activeBlank] = option.value;
    nextFilledOptionIds[activeBlank] = option.id;
    setFilledAnswers(nextFilledAnswers);
    setFilledOptionIds(nextFilledOptionIds);

    const nextUsedOptions = new Set(usedOptions);
    nextUsedOptions.add(option.id);
    setUsedOptions(nextUsedOptions);

    moveToNextEmptyBlank(nextFilledAnswers, activeBlank);
  };

  const handleBlankClick = (index: number) => {
    if (showResult) return;

    const currentAnswer = filledAnswers[index];
    if (currentAnswer) {
      const nextFilledAnswers = [...filledAnswers];
      const nextFilledOptionIds = [...filledOptionIds];
      nextFilledAnswers[index] = null;
      setFilledAnswers(nextFilledAnswers);

      const nextUsedOptions = new Set(usedOptions);
      if (nextFilledOptionIds[index]) {
        nextUsedOptions.delete(nextFilledOptionIds[index]!);
      }
      setUsedOptions(nextUsedOptions);
      nextFilledOptionIds[index] = null;
      setFilledOptionIds(nextFilledOptionIds);
    }

    setActiveBlank(index);
  };

  const handleCheck = () => {
    const allCorrect = filledAnswers.every((answer, index) => answer === actualAnswers[index]);

    setIsCorrect(allCorrect);
    setShowResult(true);

    if (allCorrect) {
      playCorrect();
      return;
    }

    playIncorrect();
    const nextWrongAttempts = wrongAttempts + 1;
    setWrongAttempts(nextWrongAttempts);

    if (ediHelpEnabled && nextWrongAttempts >= 3) {
      setIsEdiHelpOpen(true);
    }
  };

  const handleReset = () => {
    setFilledAnswers(Array(numBlanks).fill(null));
    setFilledOptionIds(Array(numBlanks).fill(null));
    setUsedOptions(new Set());
    setShowResult(false);
    setIsCorrect(false);
    setActiveBlank(0);
    setIsEdiHelpOpen(false);
  };

  const handleApplyEdiStep = async (stepIndex: number) => {
    const answer = actualAnswers[stepIndex];
    if (!answer) return;

    const applied = applyAnswerToBlank(stepIndex, answer);
    if (!applied) return;

    const isLastStep = stepIndex === actualAnswers.length - 1;
    if (isLastStep) {
      setIsCorrect(true);
      setShowResult(true);
      playCorrect();
    }
  };

  const allFilled = filledAnswers.every((answer) => answer !== null);

  const ediHelpSteps: EdiGuidedHelpStep[] = actualAnswers.map((answer, index) => ({
    id: `fill-blank-help-${index}`,
    title: tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.stepTitle", {
      index: index + 1,
    }),
    description: tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.stepDescription", {
      answer,
    }),
    actionLabel: tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.action"),
  }));

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
      <div className="flex items-center gap-2 mb-2">
        <PenLine className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {t("lesson.fillBlanks.instructions", "Complete a frase clicando nas palavras corretas!")}
      </p>

      <div className="p-4 bg-muted/30 rounded-lg mb-4">
        <p className="text-base sm:text-lg leading-relaxed">
          {blanks.map((part, index) => (
            <span key={index}>
              {part}
              {index < blanks.length - 1 && (
                <button
                  onClick={() => handleBlankClick(index)}
                  disabled={showResult}
                  className={cn(
                    "inline-flex items-center justify-center min-w-[80px] mx-1 px-3 py-1",
                    "rounded-lg border-2 border-dashed transition-all",
                    "text-sm font-medium",
                    showResult
                      ? filledAnswers[index] === actualAnswers[index]
                        ? "bg-success/20 border-success text-success"
                        : "bg-destructive/20 border-destructive text-destructive"
                      : activeBlank === index
                        ? "bg-primary/20 border-primary text-primary"
                        : filledAnswers[index]
                          ? "bg-muted border-border text-foreground hover:border-primary/50"
                          : "bg-muted/50 border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {filledAnswers[index] || "___"}
                </button>
              )}
            </span>
          ))}
        </p>
      </div>

      {!showResult && (
        <div className="flex flex-wrap gap-2 mb-4">
          {shuffledOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={usedOptions.has(option.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "border border-border",
                usedOptions.has(option.id)
                  ? "bg-muted/30 text-muted-foreground/50 cursor-not-allowed"
                  : "bg-card hover:bg-primary/10 hover:border-primary text-foreground"
              )}
            >
              {option.value}
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div className={cn("p-4 rounded-lg mb-4", isCorrect ? "bg-success/10" : "bg-destructive/10")}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <Check className="w-5 h-5 text-success mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-destructive mt-0.5" />
            )}
            <div>
              <p className={cn("font-medium", isCorrect ? "text-success" : "text-destructive")}>
                {isCorrect
                  ? t("lesson.quiz.excellent", "Excelente!")
                  : t("lesson.quiz.tryAgain", "Quase la!")}
              </p>
              {!isCorrect && (
                <>
                  <p className="text-sm text-muted-foreground mt-1">
                    {wrongAttempts >= 3
                      ? tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.summary")
                      : tUi(t, i18n.language, "lesson.fillBlanks.tryAgainHint")}
                  </p>
                  {explanation && (
                    <p className="text-sm text-muted-foreground/80 mt-1 italic">{explanation}</p>
                  )}
                </>
              )}
              {explanation && isCorrect && (
                <p className="text-sm text-muted-foreground mt-1">{explanation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {!showResult ? (
          <Button onClick={handleCheck} disabled={!allFilled} className="w-full h-12">
            <Check className="w-4 h-4 mr-2" />
            {t("lesson.quiz.checkAnswer", "Verificar Resposta")}
          </Button>
        ) : isCorrect ? (
          <Button onClick={onComplete} className="w-full h-12">
            <Check className="w-4 h-4 mr-2" />
            {t("common.continue")}
          </Button>
        ) : (
          <Button onClick={handleReset} className="w-full h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("lesson.quiz.tryAgainButton", "Tentar Novamente")}
          </Button>
        )}
      </div>

      <EdiGuidedHelp
        isOpen={isEdiHelpOpen}
        title={tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.modalTitle")}
        description={tUi(t, i18n.language, "lesson.ediGuide.fillBlanks.modalDescription")}
        steps={ediHelpSteps}
        onApplyStep={handleApplyEdiStep}
        onClose={() => setIsEdiHelpOpen(false)}
      />
    </div>
  );
};
