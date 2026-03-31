import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ChevronRight, Lightbulb, Sparkles, X } from "lucide-react";
import mascoteEdi from "@/assets/mascote-educly.png";
import { tUi } from "@/lib/supplementalUiTranslations";

export interface EdiGuidedHelpStep {
  id: string;
  title: string;
  description: string;
  actionLabel?: string;
}

interface EdiGuidedHelpProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  steps: EdiGuidedHelpStep[];
  onApplyStep?: (stepIndex: number, step: EdiGuidedHelpStep) => boolean | void | Promise<boolean | void>;
  onClose: () => void;
}

export const EdiGuidedHelp = ({
  isOpen,
  title,
  description,
  steps,
  onApplyStep,
  onClose,
}: EdiGuidedHelpProps) => {
  const { t, i18n } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentStepIndex(0);
    setIsApplying(false);
  }, [isOpen, steps.length]);

  if (!isOpen || steps.length === 0) {
    return null;
  }

  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleApply = async () => {
    if (isApplying) return;

    setIsApplying(true);

    try {
      const applyResult = await onApplyStep?.(currentStepIndex, currentStep);

      if (applyResult === false) {
        return;
      }

      if (isLastStep) {
        onClose();
        return;
      }

      setCurrentStepIndex((prev) => prev + 1);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center overflow-y-auto bg-black/75 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
      <div className="relative flex max-h-[calc(100dvh-0.75rem)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/15 bg-slate-950 text-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
          aria-label={tUi(t, i18n.language, "lesson.ediGuide.close")}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="min-h-0 overflow-y-auto p-5 sm:p-7">
          <div className="mb-5 flex items-start gap-3 pr-12 sm:gap-4 sm:pr-14">
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/95 p-3 shadow-lg shadow-cyan-500/20 sm:h-20 sm:w-20">
                <img src={mascoteEdi} alt="EDI" className="h-full w-full object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-lg sm:h-9 sm:w-9">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="min-w-0 pt-1">
              <div className="mb-2 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-xs sm:tracking-[0.24em]">
                <Lightbulb className="h-3.5 w-3.5" />
                <span className="truncate">EDI Assist</span>
              </div>
              <h3 className="text-lg font-bold leading-tight sm:text-xl">
                {title || tUi(t, i18n.language, "lesson.ediGuide.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {description || tUi(t, i18n.language, "lesson.ediGuide.description")}
              </p>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all",
                  index <= currentStepIndex ? "bg-cyan-400" : "bg-white/10"
                )}
              />
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
              {tUi(t, i18n.language, "lesson.ediGuide.stepCounter", {
                current: currentStepIndex + 1,
                total: steps.length,
              })}
            </p>
            <h4 className="mt-3 text-lg font-semibold leading-snug">{currentStep.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{currentStep.description}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-auto min-h-11 w-full min-w-0 whitespace-normal border-white/15 bg-white/5 px-4 py-3 text-center leading-snug text-white hover:bg-white/10 hover:text-white sm:flex-1"
            >
              {tUi(t, i18n.language, "lesson.ediGuide.later")}
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              disabled={isApplying}
              className="h-auto min-h-11 w-full min-w-0 whitespace-normal bg-cyan-400 px-4 py-3 text-center leading-snug text-slate-950 hover:bg-cyan-300 sm:flex-1"
            >
              <span className="min-w-0">
                {currentStep.actionLabel ||
                  (isLastStep
                    ? tUi(t, i18n.language, "lesson.ediGuide.finish")
                    : tUi(t, i18n.language, "lesson.ediGuide.next"))}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
