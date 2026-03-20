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
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-950 text-white shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label={tUi(t, i18n.language, "lesson.ediGuide.close")}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/95 p-3 shadow-lg shadow-cyan-500/20">
                <img src={mascoteEdi} alt="EDI" className="h-full w-full object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-lg">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="pt-1">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                <Lightbulb className="h-3.5 w-3.5" />
                EDI Assist
              </div>
              <h3 className="text-xl font-bold leading-tight">
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

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
              {tUi(t, i18n.language, "lesson.ediGuide.stepCounter", {
                current: currentStepIndex + 1,
                total: steps.length,
              })}
            </p>
            <h4 className="mt-3 text-lg font-semibold leading-snug">{currentStep.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{currentStep.description}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {tUi(t, i18n.language, "lesson.ediGuide.later")}
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              disabled={isApplying}
              className="flex-1 bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            >
              <span>
                {currentStep.actionLabel ||
                  (isLastStep
                    ? tUi(t, i18n.language, "lesson.ediGuide.finish")
                    : tUi(t, i18n.language, "lesson.ediGuide.next"))}
              </span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
