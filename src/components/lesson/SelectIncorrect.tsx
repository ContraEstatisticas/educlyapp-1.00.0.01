import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lightbulb, ThumbsDown, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn, shuffleArray } from "@/lib/utils";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { tUi } from "@/lib/supplementalUiTranslations";

interface SelectIncorrectOption {
  text: string;
  isIncorrect: boolean;
  explanation?: string;
}

interface SelectIncorrectProps {
  question: string;
  options: SelectIncorrectOption[];
  requiredSelections?: number;
  successExplanation?: string;
  onComplete: () => void;
}

export const SelectIncorrect = ({
  question,
  options,
  requiredSelections,
  successExplanation,
  onComplete,
}: SelectIncorrectProps) => {
  const { t, i18n } = useTranslation();
  const { playCorrect, playIncorrect } = useQuizSounds();

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const shuffledOptions = useMemo(() => shuffleArray(options), [options]);

  const incorrectIndices = useMemo(
    () =>
      shuffledOptions
        .map((option, index) => (option.isIncorrect ? index : -1))
        .filter((index) => index !== -1),
    [shuffledOptions],
  );

  const totalIncorrect = incorrectIndices.length;
  const required = requiredSelections || totalIncorrect;

  const handleOptionClick = (index: number) => {
    if (isChecked && isCorrect) return;

    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index],
    );
    setIsChecked(false);
  };

  const handleCheck = () => {
    if (selectedIndices.length === 0) return;

    const allSelectionsAreIncorrect = selectedIndices.every(
      (index) => shuffledOptions[index].isIncorrect,
    );
    const hasEnoughSelections = selectedIndices.length >= required;
    const noExtraSelections = selectedIndices.length <= totalIncorrect;

    const correct = allSelectionsAreIncorrect && hasEnoughSelections && noExtraSelections;

    setIsCorrect(correct);
    setIsChecked(true);
    setAttempts((prev) => prev + 1);

    if (correct) {
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      onComplete();
      return;
    }

    setSelectedIndices([]);
    setIsChecked(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <ThumbsDown className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {tUi(t, i18n.language, "lesson.selectIncorrect.title")}
          </h3>
          <p className="text-muted-foreground">
            {required > 1
              ? tUi(t, i18n.language, "lesson.selectIncorrect.instructionPlural")
              : tUi(t, i18n.language, "lesson.selectIncorrect.instructionSingular")}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <p className="text-lg font-semibold text-foreground">{question}</p>
      </div>

      <div className="space-y-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedIndices.includes(index);
          const showCorrectHighlight = isChecked && option.isIncorrect;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={isChecked && isCorrect}
              className={cn(
                "w-full p-4 text-left rounded-xl border-2 transition-all duration-200",
                isSelected
                  ? isChecked
                    ? option.isIncorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-primary bg-primary/10"
                  : showCorrectHighlight && !isCorrect
                    ? "border-orange-400 bg-orange-50"
                    : "border-border bg-card hover:border-primary/50",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "font-medium",
                    isSelected
                      ? isChecked
                        ? option.isIncorrect
                          ? "text-green-700"
                          : "text-red-700"
                        : "text-primary"
                      : "text-foreground",
                  )}
                >
                  {option.text}
                </span>

                <div
                  className={cn(
                    "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    isSelected
                      ? isChecked
                        ? option.isIncorrect
                          ? "border-green-500 bg-green-500"
                          : "border-red-500 bg-red-500"
                        : "border-primary bg-primary"
                      : "border-border",
                  )}
                >
                  {isSelected ? (
                    isChecked ? (
                      option.isIncorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )
                  ) : null}
                </div>
              </div>

              {isChecked && isCorrect && option.isIncorrect && option.explanation ? (
                <p className="text-sm text-green-700 mt-2 pl-2 border-l-2 border-green-300">
                  {option.explanation}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>

      {!isChecked ? (
        <div className="text-center text-sm text-muted-foreground">
          {tUi(t, i18n.language, "lesson.selectIncorrect.selected")} {selectedIndices.length}/{required}
        </div>
      ) : null}

      {isChecked ? (
        <div
          className={cn(
            "rounded-2xl p-5 border animate-in fade-in slide-in-from-bottom-2 duration-300",
            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200",
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn("font-semibold", isCorrect ? "text-green-800" : "text-red-800")}>
                {isCorrect
                  ? tUi(t, i18n.language, "lesson.selectIncorrect.correct")
                  : tUi(t, i18n.language, "lesson.selectIncorrect.incorrect")}
              </p>

              {isCorrect && successExplanation ? (
                <p className="text-green-700 mt-2 text-sm">{successExplanation}</p>
              ) : null}

              {!isCorrect ? (
                <p className="text-red-700 mt-2 text-sm">
                  {selectedIndices.some((index) => !shuffledOptions[index].isIncorrect)
                    ? tUi(t, i18n.language, "lesson.selectIncorrect.hasCorrect")
                    : selectedIndices.length < required
                      ? tUi(t, i18n.language, "lesson.selectIncorrect.needMore", {
                          remaining: required - selectedIndices.length,
                        })
                      : tUi(t, i18n.language, "lesson.selectIncorrect.tooMany")}
                </p>
              ) : null}

              {!isCorrect && attempts >= 2 ? (
                <div className="mt-3 flex items-start gap-2 text-orange-700 bg-orange-50 rounded-xl p-3 border border-orange-200">
                  <Lightbulb className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{tUi(t, i18n.language, "lesson.selectIncorrect.hint")}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {!isChecked ? (
        <Button
          onClick={handleCheck}
          disabled={selectedIndices.length === 0}
          className="w-full h-14 text-lg font-semibold rounded-xl"
          size="lg"
        >
          {tUi(t, i18n.language, "lesson.checkAnswer")}
        </Button>
      ) : (
        <Button
          onClick={handleContinue}
          className={cn(
            "w-full h-14 text-lg font-semibold rounded-xl",
            isCorrect ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700",
          )}
          size="lg"
        >
          {isCorrect ? t("common.continue", "Continuar") : tUi(t, i18n.language, "lesson.tryAgain")}
        </Button>
      )}
    </div>
  );
};
