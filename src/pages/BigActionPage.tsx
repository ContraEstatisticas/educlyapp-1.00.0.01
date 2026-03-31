import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clipboard,
  Compass,
  Loader2,
  RefreshCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBigAction } from "@/hooks/useBigAction";
import {
  BIG_ACTION_AREA_SUGGESTIONS,
  BIG_ACTION_TRAILS_PER_CYCLE,
  normalizeBigActionSteps,
  normalizeProfessionalArea,
} from "@/lib/bigAction";
import {
  getBigActionUiCopy,
  getLocalizedBigActionSourceCopy,
  getLocalizedProfessionalArea,
} from "@/lib/bigActionI18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const OTHER_AREA_VALUE = "Outro";

const BigActionPage = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const {
    activeBigAction,
    completeBigAction,
    data: bigActionState,
    generateBigAction,
    isCompleting,
    isGenerating,
    isLoading,
    isSavingArea,
    saveProfessionalArea,
  } = useBigAction();

  const [selectedArea, setSelectedArea] = useState("");
  const [customArea, setCustomArea] = useState("");
  const [completedStepIndexes, setCompletedStepIndexes] = useState<number[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const activeBigActionId = activeBigAction?.id;
  const activeBigActionStatus = activeBigAction?.status;
  const language = i18n.resolvedLanguage || i18n.language;
  const ui = getBigActionUiCopy(language);
  const challengeDayProgress = bigActionState?.challengeDayProgress;
  const specializedModuleProgress = bigActionState?.specializedModuleProgress;
  const sourceCopy = getLocalizedBigActionSourceCopy(activeBigAction?.progress_source, language);
  const localizedProfessionalArea = getLocalizedProfessionalArea(bigActionState?.professionalArea, language);

  useEffect(() => {
    const savedArea = normalizeProfessionalArea(bigActionState?.professionalArea);

    if (!savedArea) return;

    if (BIG_ACTION_AREA_SUGGESTIONS.includes(savedArea as (typeof BIG_ACTION_AREA_SUGGESTIONS)[number])) {
      setSelectedArea(savedArea);
      setCustomArea("");
      return;
    }

    setSelectedArea(OTHER_AREA_VALUE);
    setCustomArea(savedArea);
  }, [bigActionState?.professionalArea]);

  useEffect(() => {
    if (!activeBigActionId) return;
    if (!bigActionState?.professionalArea) return;
    if (activeBigActionStatus !== "pending_generation") return;

    void generateBigAction(false).catch(() => {
      toast({
        title: ui.toasts.autoGenerateErrorTitle,
        description: ui.toasts.autoGenerateErrorDescription,
        variant: "destructive",
      });
    });
  }, [
    activeBigActionId,
    activeBigActionStatus,
    bigActionState?.professionalArea,
    generateBigAction,
    toast,
    ui.toasts.autoGenerateErrorDescription,
    ui.toasts.autoGenerateErrorTitle,
  ]);

  const steps = useMemo(() => normalizeBigActionSteps(activeBigAction?.steps), [activeBigAction?.steps]);
  const challengeProgressCount = Math.min(BIG_ACTION_TRAILS_PER_CYCLE, challengeDayProgress?.sinceBaseline || 0);
  const challengeProgressPercent = Math.round((challengeProgressCount / BIG_ACTION_TRAILS_PER_CYCLE) * 100);
  const specializedProgressCount = Math.min(BIG_ACTION_TRAILS_PER_CYCLE, specializedModuleProgress?.sinceBaseline || 0);
  const specializedProgressPercent = Math.round((specializedProgressCount / BIG_ACTION_TRAILS_PER_CYCLE) * 100);
  const totalSteps = steps.length;
  const completedStepsCount = completedStepIndexes.length;
  const currentStep = steps[currentStepIndex] || steps[0] || "";
  const currentStepCompleted = completedStepIndexes.includes(currentStepIndex);
  const allStepsCompleted = totalSteps > 0 && completedStepsCount === totalSteps;
  const stepProgressPercent = totalSteps ? Math.round((completedStepsCount / totalSteps) * 100) : 0;
  const formatUnit = (count: number, singular: string, plural: string) =>
    `${count} ${count === 1 ? singular : plural}`;
  const status = activeBigAction?.status;
  const isAwaitingArea = status === "needs_area";
  const isGeneratingState = status === "pending_generation";
  const hasGenerationError = status === "generation_error";
  const isReady = status === "ready";

  useEffect(() => {
    setCompletedStepIndexes([]);
    setCurrentStepIndex(0);
    setIsPromptExpanded(false);
  }, [activeBigActionId]);

  useEffect(() => {
    if (!totalSteps) {
      setCurrentStepIndex(0);
      return;
    }

    setCurrentStepIndex((currentIndex) => Math.min(currentIndex, totalSteps - 1));
    setCompletedStepIndexes((currentIndexes) => currentIndexes.filter((index) => index < totalSteps));
  }, [totalSteps]);

  const toggleStepCompletion = (index: number) => {
    const stepWasCompleted = completedStepIndexes.includes(index);

    setCompletedStepIndexes((currentIndexes) => {
      if (stepWasCompleted) {
        return currentIndexes.filter((currentIndex) => currentIndex !== index);
      }

      return [...currentIndexes, index].sort((firstIndex, secondIndex) => firstIndex - secondIndex);
    });

    if (!stepWasCompleted && index < totalSteps - 1) {
      setCurrentStepIndex(index + 1);
    }
  };

  const handleSaveArea = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resolvedArea = normalizeProfessionalArea(
      selectedArea === OTHER_AREA_VALUE ? customArea : selectedArea,
    );

    if (!resolvedArea) {
      toast({
        title: ui.active.saveAreaErrorTitle,
        description: ui.active.saveAreaErrorDescription,
        variant: "destructive",
      });
      return;
    }

    try {
      await saveProfessionalArea(resolvedArea);
      toast({
        title: ui.active.saveAreaTitle,
        description: ui.active.saveAreaDescription,
      });
    } catch {
      toast({
        title: ui.active.saveAreaErrorTitle,
        description: ui.active.saveAreaErrorDescription,
        variant: "destructive",
      });
    }
  };

  const handleRetry = async () => {
    try {
      await generateBigAction(true);
      toast({
        title: ui.active.regenerateTitle,
        description: ui.active.regenerateDescription,
      });
    } catch {
      toast({
        title: ui.toasts.autoGenerateErrorTitle,
        description: ui.toasts.autoGenerateErrorDescription,
        variant: "destructive",
      });
    }
  };

  const handleCopyPrompt = async () => {
    const prompt = activeBigAction?.ready_prompt?.trim();

    if (!prompt) {
      toast({
        title: ui.active.promptUnavailableTitle,
        description: ui.active.promptUnavailableDescription,
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: ui.active.promptCopiedTitle,
        description: ui.active.promptCopiedDescription,
      });
    } catch {
      toast({
        title: ui.active.copyPromptErrorTitle,
        description: ui.active.copyPromptErrorDescription,
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    if (!activeBigAction?.id) return;

    try {
      await completeBigAction(activeBigAction.id);
      toast({
        title: ui.active.completedTitle,
        description: ui.active.completedDescription,
      });
      navigate("/dashboard");
    } catch {
      toast({
        title: ui.active.completeErrorTitle,
        description: ui.active.completeErrorDescription,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-muted-foreground shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          {ui.loading}
        </div>
      </div>
    );
  }

  if (!activeBigAction) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="-ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {ui.active.backToDashboard}
            </Button>
          </div>

          <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="border-b border-border/70 px-6 py-6">
              <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {ui.noActive.badge}
              </Badge>
              <h1 className="mt-4 text-3xl font-bold text-foreground">
                {ui.noActive.notUnlockedTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {ui.noActive.description}
              </p>
            </div>

            <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-border bg-background/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {ui.noActive.challengeLabel}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {challengeProgressCount}/{BIG_ACTION_TRAILS_PER_CYCLE} {ui.units.challengeDayCompletedLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{challengeProgressPercent}%</p>
                    <p className="text-xs text-muted-foreground">{ui.noActive.unlockProgressLabel}</p>
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-orange-500 to-primary transition-all duration-500"
                    style={{ width: `${challengeProgressPercent}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {ui.noActive.totalCompletedChallengePrefix}{" "}
                  <span className="font-semibold text-foreground">{challengeDayProgress?.completedCount || 0}</span>{" "}
                  {formatUnit(
                    challengeDayProgress?.completedCount || 0,
                    ui.units.daySingular,
                    ui.units.dayPlural,
                  ).replace(/^\d+\s/, "")}.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-orange-500/5 to-transparent p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {ui.noActive.specializedLabel}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {specializedProgressCount}/{BIG_ACTION_TRAILS_PER_CYCLE} {ui.units.specializedCompletedLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{specializedProgressPercent}%</p>
                    <p className="text-xs text-muted-foreground">{ui.noActive.unlockProgressLabel}</p>
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-orange-500 to-primary transition-all duration-500"
                    style={{ width: `${specializedProgressPercent}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {ui.noActive.totalCompletedSpecializedPrefix}{" "}
                  <span className="font-semibold text-foreground">{specializedModuleProgress?.completedCount || 0}</span>{" "}
                  {formatUnit(
                    specializedModuleProgress?.completedCount || 0,
                    ui.units.moduleSingular,
                    ui.units.modulePlural,
                  ).replace(/^\d+\s/, "")}.
                </p>

                <Button onClick={() => navigate("/trilhas-ia")} className="mt-6 w-full">
                  <Compass className="mr-2 h-4 w-4" />
                  {ui.noActive.continueTrailsButton}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="-ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {ui.active.backToDashboard}
          </Button>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative border-b border-border/70 px-6 py-6">
            <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">
              <WandSparkles className="mr-1.5 h-3.5 w-3.5" />
              {ui.shared.unlockedBadge}
            </Badge>

            <h1 className="mt-4 text-3xl font-bold text-foreground">
              {isReady
                ? activeBigAction.title || ui.active.titleFallback
                : isAwaitingArea
                  ? ui.active.needsAreaTitle
                  : isGeneratingState
                    ? ui.active.generatingTitle
                    : ui.active.retryTitle}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              {isReady
                ? ui.statusCopy.ready.description
                : isAwaitingArea
                  ? ui.active.needsAreaDescription
                  : isGeneratingState
                    ? ui.active.generatingDescription
                    : ui.active.retryDescription}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {localizedProfessionalArea ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
                  <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" />
                  {localizedProfessionalArea}
                </span>
              ) : null}

              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {sourceCopy.longLabel}
              </span>
            </div>
          </div>

          <div className="relative px-6 py-6">
            {isAwaitingArea ? (
              <form onSubmit={handleSaveArea} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    {ui.active.areaQuestion}
                    <span className="mt-2 block text-sm font-normal leading-6 text-muted-foreground">
                      {ui.active.areaQuickSelectHint}
                    </span>
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {BIG_ACTION_AREA_SUGGESTIONS.map((area) => {
                      const isSelected = selectedArea === area;

                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setSelectedArea(area)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-border bg-background/60 hover:border-primary/30 hover:bg-background",
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-foreground">
                              {getLocalizedProfessionalArea(area, language)}
                            </span>
                            <span
                              className={cn(
                                "inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background text-muted-foreground",
                              )}
                            >
                              {isSelected ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedArea === OTHER_AREA_VALUE ? (
                  <div className="space-y-2">
                    <label htmlFor="big-action-area-custom" className="text-sm font-semibold text-foreground">
                      {ui.active.customAreaLabel}
                    </label>
                    <Input
                      id="big-action-area-custom"
                      value={customArea}
                      onChange={(event) => setCustomArea(event.target.value)}
                      placeholder={ui.active.customAreaPlaceholder}
                      maxLength={80}
                    />
                  </div>
                ) : null}

                <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
                  {ui.active.areaHint}
                </div>

                <Button type="submit" disabled={isSavingArea} className="h-12 px-6 text-sm font-semibold">
                  {isSavingArea ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {ui.active.saveAreaButton}
                </Button>
              </form>
            ) : null}

            {isGeneratingState ? (
              <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-orange-500/5 to-transparent p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {ui.active.generatingCardTitle}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {ui.active.generatingCardDescription}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {hasGenerationError ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
                  <p className="text-lg font-semibold text-foreground">{ui.active.regenerationErrorCardTitle}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {ui.active.regenerationErrorCardDescription}
                  </p>
                </div>

                <Button onClick={handleRetry} disabled={isGenerating} className="h-12 px-6 text-sm font-semibold">
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                  {ui.active.retryButton}
                </Button>
              </div>
            ) : null}

            {isReady ? (
              <div className="space-y-6">
                <section className="rounded-2xl border border-border bg-background/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {ui.active.whatToCreateLabel}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">
                    {activeBigAction.what_to_create || ui.active.whatToCreateFallback}
                  </p>
                </section>

                {steps.length ? (
                  <section className="rounded-2xl border border-border bg-background/80 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {ui.active.guidedStepsLabel}
                        </p>
                        <p className="mt-3 text-2xl font-bold text-foreground">
                          {ui.active.stepCounterLabel} {currentStepIndex + 1}/{steps.length}
                        </p>
                      </div>

                      <div className="w-full rounded-2xl border border-border/70 bg-card/90 p-4 lg:max-w-xs">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {ui.active.stepProgressLabel}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {completedStepsCount}/{steps.length}
                          </p>
                        </div>
                        <Progress className="mt-3 h-2" value={stepProgressPercent} />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {steps.map((_, index) => {
                        const isCurrentStep = index === currentStepIndex;
                        const isCompletedStep = completedStepIndexes.includes(index);

                        return (
                          <button
                            key={`${activeBigAction.id}-step-pill-${index}`}
                            type="button"
                            onClick={() => setCurrentStepIndex(index)}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all",
                              isCurrentStep
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : isCompletedStep
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                                isCurrentStep
                                  ? "bg-primary-foreground/15 text-primary-foreground"
                                  : isCompletedStep
                                    ? "bg-primary/15 text-primary"
                                    : "bg-muted text-foreground",
                              )}
                            >
                              {isCompletedStep ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                            </span>
                            {ui.active.stepCounterLabel} {index + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <button
                          type="button"
                          onClick={() => toggleStepCompletion(currentStepIndex)}
                          className={cn(
                            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all",
                            currentStepCompleted
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-primary",
                          )}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {ui.active.stepCounterLabel} {currentStepIndex + 1}
                          </p>
                          <p className="mt-3 text-base leading-7 text-foreground">
                            {currentStep}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStepIndex((currentIndex) => Math.max(0, currentIndex - 1))}
                          disabled={currentStepIndex === 0}
                          className="sm:flex-1"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          {ui.active.previousStepButton}
                        </Button>

                        <Button
                          type="button"
                          variant={currentStepCompleted ? "outline" : "default"}
                          onClick={() => toggleStepCompletion(currentStepIndex)}
                          className="sm:flex-1"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          {currentStepCompleted ? ui.active.stepRedoButton : ui.active.stepDoneButton}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStepIndex((currentIndex) => Math.min(steps.length - 1, currentIndex + 1))}
                          disabled={currentStepIndex === steps.length - 1}
                          className="sm:flex-1"
                        >
                          {ui.active.nextStepButton}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {allStepsCompleted ? (
                      <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground">
                        {ui.active.allStepsCompleted}
                      </div>
                    ) : null}
                  </section>
                ) : null}

                <Collapsible open={isPromptExpanded} onOpenChange={setIsPromptExpanded}>
                  <section className="rounded-2xl border border-border bg-background/80 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {ui.active.promptLabel}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {ui.active.promptDescription}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:self-start">
                        <Button variant="outline" onClick={handleCopyPrompt}>
                          <Clipboard className="mr-2 h-4 w-4" />
                          {ui.active.copyPromptButton}
                        </Button>

                        <CollapsibleTrigger asChild>
                          <Button variant="ghost">
                            <ChevronDown className={cn("mr-2 h-4 w-4 transition-transform", isPromptExpanded && "rotate-180")} />
                            {isPromptExpanded ? ui.active.promptHideButton : ui.active.promptShowButton}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>

                    <CollapsibleContent className="overflow-hidden">
                      <Textarea
                        className="mt-4 min-h-[220px] resize-none bg-card font-mono text-xs leading-6"
                        readOnly
                        value={activeBigAction.ready_prompt || ""}
                      />
                    </CollapsibleContent>
                  </section>
                </Collapsible>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleComplete} disabled={isCompleting} className="h-12 px-6 text-sm font-semibold">
                    {isCompleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                    {ui.active.completeButton}
                  </Button>

                  <Button variant="outline" onClick={() => navigate("/dashboard")} className="h-12 px-6 text-sm font-semibold">
                    {ui.active.dashboardButton}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BigActionPage;


