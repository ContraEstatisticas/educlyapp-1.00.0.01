import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, RotateCcw, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, shuffleArray } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { GradualTextDisplay, GradualTextDisplayRef } from "@/components/lesson/GradualTextDisplay";
import { EdiGuidedHelp, EdiGuidedHelpStep } from "@/components/lesson/EdiGuidedHelp";
import { aiMasteryTrailsBySlug } from "@/lib/aiMasteryTrails";
import { AiTrailLessonStep, getAiTrailContent, isAiTrailLive } from "@/lib/aiTrailContent";
import { getAiTrailUiCopy } from "@/lib/aiTrailI18n";
import { claimAiTrailCompletionXp } from "@/lib/aiTrailRewards";
import { useAiTrailProgress } from "@/hooks/useAiTrailProgress";
import { useUserLevel, XP_REWARDS } from "@/hooks/useUserLevel";
import { tUi } from "@/lib/supplementalUiTranslations";
import { TrailChat } from "@/components/trail/TrailChat";

const FillBlanks = lazy(() => import("@/components/lesson/FillBlanks").then((module) => ({ default: module.FillBlanks })));

type LessonStepType = "text" | "quiz" | "practical" | "fill_blanks";

interface LessonQuizOption {
  text: string;
  isCorrect: boolean;
}

interface TrailLessonStep {
  type: LessonStepType;
  title: string;
  content?: string;
  promptBox?: string;
  question?: string;
  options?: readonly LessonQuizOption[];
  fillBlanksOptions?: readonly string[];
  explanation?: string;
  initialWords?: readonly string[];
  correctOrder?: readonly string[];
  sentence?: string;
  answers?: readonly string[];
}

type StepAnswerState = {
  selectedOption: number | null;
  isAnswerChecked: boolean;
  isCorrect: boolean;
  userWords: string[];
  componentCompleted: boolean;
};

interface EdiAssistState {
  steps: EdiGuidedHelpStep[];
  title?: string;
  description?: string;
  kind: "quiz" | "practical";
}

const getDefaultStepAnswer = (): StepAnswerState => ({
  selectedOption: null,
  isAnswerChecked: false,
  isCorrect: false,
  userWords: [],
  componentCompleted: false,
});

const removeFirstOccurrence = (items: readonly string[], itemToRemove: string): string[] => {
  const index = items.findIndex((item) => item === itemToRemove);
  if (index === -1) return [...items];

  return [...items.slice(0, index), ...items.slice(index + 1)];
};

const LESSON_UI = {
  pt: {
    backToTrail: "Voltar para a trilha",
    textLead: "Continue para liberar a proxima camada do modulo.",
    promptLead: "Use este prompt como base de estudo e adaptacao.",
    practiceLead: "Monte a sequencia correta para consolidar o modulo.",
    finishTitle: "Modulo concluido",
    finishDescription: "Voce liberou o proximo passo da trilha.",
    returnToTrail: "Voltar para a trilha",
    lockedTitle: "Conclua o modulo anterior primeiro",
    lockedDescription: "A trilha segue a ordem dos modulos, como no desafio principal.",
    completeStep: "Etapa concluida",
    practicalPlaceholder: "Toque nas palavras abaixo para montar a sequencia.",
  },
  en: {
    backToTrail: "Back to trail",
    textLead: "Continue to unlock the next layer of this module.",
    promptLead: "Use this prompt as a study and adaptation base.",
    practiceLead: "Build the correct sequence to lock in the module.",
    finishTitle: "Module complete",
    finishDescription: "You unlocked the next step of the trail.",
    returnToTrail: "Back to trail",
    lockedTitle: "Finish the previous module first",
    lockedDescription: "This trail follows module order, just like the main challenge.",
    completeStep: "Step completed",
    practicalPlaceholder: "Tap the words below to build the sequence.",
  },
  es: {
    backToTrail: "Volver a la ruta",
    textLead: "Continua para desbloquear la siguiente capa del modulo.",
    promptLead: "Usa este prompt como base de estudio y adaptacion.",
    practiceLead: "Arma la secuencia correcta para fijar el modulo.",
    finishTitle: "Modulo completado",
    finishDescription: "Has desbloqueado el siguiente paso de la ruta.",
    returnToTrail: "Volver a la ruta",
    lockedTitle: "Completa primero el modulo anterior",
    lockedDescription: "La ruta sigue el orden de los modulos, igual que el desafio principal.",
    completeStep: "Paso completado",
    practicalPlaceholder: "Toca las palabras de abajo para armar la secuencia.",
  },
  fr: {
    backToTrail: "Retour au parcours",
    textLead: "Continue pour debloquer la prochaine couche du module.",
    promptLead: "Utilise ce prompt comme base d'etude et d'adaptation.",
    practiceLead: "Assemble la bonne sequence pour ancrer le module.",
    finishTitle: "Module termine",
    finishDescription: "Tu as debloque la suite du parcours.",
    returnToTrail: "Retour au parcours",
    lockedTitle: "Termine d'abord le module precedent",
    lockedDescription: "Ce parcours suit l'ordre des modules, comme le defi principal.",
    completeStep: "Etape terminee",
    practicalPlaceholder: "Appuie sur les mots ci-dessous pour composer la sequence.",
  },
} as const;

type SupportedLessonLanguage = keyof typeof LESSON_UI;

const getLessonUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as SupportedLessonLanguage | undefined;
  return LESSON_UI[base || "en"] || LESSON_UI.en;
};

const AIToolModuleLessonPage = () => {
  const navigate = useNavigate();
  const { toolSlug, moduleNumber } = useParams();
  const { t, i18n } = useTranslation();
  const { playContinue, playCorrect, playIncorrect } = useQuizSounds();
  const { addXPAsync } = useUserLevel();

  const language = i18n.resolvedLanguage || i18n.language;
  const lessonUi = getLessonUi(language);
  const aiTrailUi = getAiTrailUiCopy(language);
  const trail = useMemo(() => (toolSlug ? aiMasteryTrailsBySlug[toolSlug] : null), [toolSlug]);
  const trailContent = useMemo(() => (toolSlug ? getAiTrailContent(toolSlug, language) : null), [language, toolSlug]);
  const isLive = trail ? isAiTrailLive(trail.slug) : false;
  const moduleNumberAsInt = Number(moduleNumber);
  const moduleContent = useMemo(
    () => trailContent?.modules.find((module) => module.number === moduleNumberAsInt) || null,
    [moduleNumberAsInt, trailContent],
  );

  const lessonSteps = useMemo<TrailLessonStep[]>(() => {
    if (!moduleContent || !trailContent) return [];

    if (moduleContent.lessonSteps?.length) {
      return moduleContent.lessonSteps.map((step: AiTrailLessonStep): TrailLessonStep => {
        if (step.type === "quiz") {
          return {
            type: "quiz",
            title: step.title,
            question: step.question,
            explanation: step.explanation,
            options: step.options.map((option, index) => ({
              text: option,
              isCorrect: index === step.correctIndex,
            })),
          };
        }

        if (step.type === "fill_blanks") {
          return {
            type: "fill_blanks",
            title: step.title,
            question: step.instruction,
            sentence: step.sentence,
            answers: [...step.answers],
            fillBlanksOptions: [...step.options],
            explanation: step.explanation,
          };
        }

        return {
          type: "text",
          title: step.title,
          content: step.content,
          promptBox: step.promptBox,
        };
      });
    }

    return [
      {
        type: "text",
        title: `${trailContent.moduleLabel} ${moduleContent.number}`,
        content: `${moduleContent.intro}\n\n${lessonUi.textLead}`,
      },
      {
        type: "text",
        title: trailContent.keyPointsLabel,
        content: moduleContent.keyPoints.map((point, index) => `**${index + 1}.** ${point}`).join("\n\n"),
      },
      {
        type: "text",
        title: trailContent.promptLabel,
        content: lessonUi.promptLead,
        promptBox: moduleContent.promptExample,
      },
      {
        type: "practical",
        title: moduleContent.practice.title,
        question: `${moduleContent.practice.instruction}\n\n${lessonUi.practiceLead}`,
        explanation: moduleContent.practice.solution,
        initialWords: shuffleArray(moduleContent.practice.terms),
        correctOrder: [...moduleContent.practice.terms],
      },
      {
        type: "quiz",
        title: trailContent.quizLabel,
        question: moduleContent.quiz.question,
        explanation: moduleContent.quiz.explanation,
        options: moduleContent.quiz.options.map((option, index) => ({
          text: option,
          isCorrect: index === moduleContent.quiz.correctIndex,
        })),
      },
      {
        type: "text",
        title: trailContent.takeawayLabel,
        content: `${moduleContent.quiz.explanation}\n\n${moduleContent.takeaway}`,
      },
    ];
  }, [lessonUi.practiceLead, lessonUi.promptLead, lessonUi.textLead, moduleContent, trailContent]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepAnswers, setStepAnswers] = useState<Record<number, StepAnswerState>>({});
  const [availableWords, setAvailableWords] = useState<readonly string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [ediAssistState, setEdiAssistState] = useState<EdiAssistState | null>(null);

  const gradualTextRef = useRef<GradualTextDisplayRef>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalModules = trailContent?.modules.length || 0;
  const {
    completeModule,
    isModuleUnlocked,
    isLoading: isProgressLoading,
  } = useAiTrailProgress(toolSlug, totalModules);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [toolSlug, moduleNumber]);

  useEffect(() => {
    if (!toolSlug || !trail || !trailContent || !moduleContent || !isLive) {
      navigate(toolSlug ? `/trilhas-ia/${toolSlug}` : "/trilhas-ia", { replace: true });
      return;
    }

    if (isProgressLoading) return;

    if (!isModuleUnlocked(moduleNumberAsInt)) {
      navigate(`/trilhas-ia/${toolSlug}`, { replace: true });
    }
  }, [
    isLive,
    isModuleUnlocked,
    isProgressLoading,
    moduleContent,
    moduleNumberAsInt,
    navigate,
    toolSlug,
    trail,
    trailContent,
  ]);

  useEffect(() => {
    const step = lessonSteps[currentStepIndex];
    if (!step) return;

    setWrongAttempts(0);
    setEdiAssistState(null);

    if (step.type === "practical" && !stepAnswers[currentStepIndex]?.userWords?.length) {
      setAvailableWords(step.initialWords || []);
    }
  }, [currentStepIndex, lessonSteps, stepAnswers]);

  useEffect(() => {
    const currentElement = stepRefs.current[currentStepIndex];
    if (!currentElement) return;

    setTimeout(() => {
      currentElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  }, [currentStepIndex]);

  const currentStep = lessonSteps[currentStepIndex];
  const currentStepAnswer = stepAnswers[currentStepIndex] || getDefaultStepAnswer();
  const ediHelpEnabled =
    toolSlug === "midjourney" ||
    toolSlug === "gemini" ||
    toolSlug === "chatgpt" ||
    toolSlug === "gamma" ||
    toolSlug === "deepseek" ||
    toolSlug === "claude" ||
    toolSlug === "lovable" ||
    toolSlug === "grok";

  const setSelectedOption = (value: number | null) => {
    setStepAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: value,
        isAnswerChecked: prev[currentStepIndex]?.isAnswerChecked ?? false,
        isCorrect: prev[currentStepIndex]?.isCorrect ?? false,
        userWords: prev[currentStepIndex]?.userWords ?? [],
      },
    }));
  };

  const setIsAnswerChecked = (value: boolean) => {
    setStepAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: prev[currentStepIndex]?.selectedOption ?? null,
        isAnswerChecked: value,
        isCorrect: prev[currentStepIndex]?.isCorrect ?? false,
        userWords: prev[currentStepIndex]?.userWords ?? [],
      },
    }));
  };

  const setIsCorrect = (value: boolean) => {
    setStepAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: prev[currentStepIndex]?.selectedOption ?? null,
        isAnswerChecked: prev[currentStepIndex]?.isAnswerChecked ?? false,
        isCorrect: value,
        userWords: prev[currentStepIndex]?.userWords ?? [],
      },
    }));
  };

  const setUserWords = (value: string[] | ((previous: string[]) => string[])) => {
    setStepAnswers((prev) => {
      const current = prev[currentStepIndex];
      const currentWords = current?.userWords ?? [];
      const newWords = typeof value === "function" ? value(currentWords) : value;

      return {
        ...prev,
        [currentStepIndex]: {
          ...current,
          selectedOption: current?.selectedOption ?? null,
          isAnswerChecked: current?.isAnswerChecked ?? false,
          isCorrect: current?.isCorrect ?? false,
          userWords: newWords,
          componentCompleted: current?.componentCompleted ?? false,
        },
      };
    });
  };

  const toggleWord = (word: string, fromUser: boolean) => {
    if (currentStepAnswer.isAnswerChecked) return;

    if (fromUser) {
      setUserWords((previous) => previous.filter((item) => item !== word));
      setAvailableWords((previous) => [...previous, word]);
      return;
    }

    setAvailableWords((previous) => previous.filter((item) => item !== word));
    setUserWords((previous) => [...previous, word]);
  };

  const getEdiAssistForCurrentStep = (step: TrailLessonStep): EdiAssistState | null => {
    if (step.type === "quiz") {
      const correctIndex = step.options?.findIndex((option) => option.isCorrect) ?? -1;
      const correctOption = correctIndex >= 0 ? step.options?.[correctIndex] : null;

      if (!correctOption) return null;

      return {
        kind: "quiz",
        title: tUi(t, i18n.language, "lesson.ediGuide.quiz.modalTitle"),
        description: tUi(t, i18n.language, "lesson.ediGuide.quiz.modalDescription"),
        steps: [
          {
            id: `ai-trail-quiz-answer-${currentStepIndex}`,
            title: tUi(t, i18n.language, "lesson.ediGuide.quiz.stepTitle"),
            description: tUi(t, i18n.language, "lesson.ediGuide.quiz.stepDescription", {
              letter: String.fromCharCode(65 + correctIndex),
              answer: correctOption.text,
            }),
            actionLabel: tUi(t, i18n.language, "lesson.ediGuide.quiz.action"),
          },
        ],
      };
    }

    if (step.type === "practical" && step.correctOrder?.length) {
      return {
        kind: "practical",
        title: tUi(t, i18n.language, "lesson.ediGuide.practical.modalTitle"),
        description: tUi(t, i18n.language, "lesson.ediGuide.practical.modalDescription"),
        steps: step.correctOrder.map((word, index) => ({
          id: `ai-trail-practical-word-${currentStepIndex}-${index}`,
          title: tUi(t, i18n.language, "lesson.ediGuide.practical.stepTitle", {
            index: index + 1,
          }),
          description: tUi(t, i18n.language, "lesson.ediGuide.practical.stepDescription", {
            word,
          }),
          actionLabel: tUi(t, i18n.language, "lesson.ediGuide.practical.action"),
        })),
      };
    }

    return null;
  };

  const handleApplyCurrentEdiStep = async (guideStepIndex: number) => {
    const step = lessonSteps[currentStepIndex];

    if (!step || !ediAssistState) return;

    if (step.type === "quiz") {
      const correctIndex = step.options?.findIndex((option) => option.isCorrect) ?? -1;
      if (correctIndex === -1) return;

      setSelectedOption(correctIndex);
      setIsCorrect(true);
      setIsAnswerChecked(true);
      setWrongAttempts(0);
      playCorrect();
      return;
    }

    if (step.type === "practical" && step.correctOrder?.[guideStepIndex]) {
      // No primeiro passo, limpar userWords e restaurar availableWords
      if (guideStepIndex === 0) {
        setUserWords([]);
        setAvailableWords(step.initialWords || []);
      }

      const nextWord = step.correctOrder[guideStepIndex];

      setAvailableWords((prev) => removeFirstOccurrence(prev, nextWord));
      setUserWords((prev) => (prev.includes(nextWord) ? prev : [...prev, nextWord]));

      const isLastWord = guideStepIndex === step.correctOrder.length - 1;
      if (isLastWord) {
        setIsCorrect(true);
        setIsAnswerChecked(true);
        setWrongAttempts(0);
        playCorrect();
      }
    }
  };

  const handleVerify = () => {
    if (!currentStep) return;

    let correct = false;

    if (currentStep.type === "quiz") {
      correct = Boolean(currentStep.options?.[currentStepAnswer.selectedOption || 0]?.isCorrect);
    } else if (currentStep.type === "practical") {
      correct = currentStepAnswer.userWords.join(" ") === (currentStep.correctOrder || []).join(" ");
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      playCorrect();
      setEdiAssistState(null);
    } else {
      playIncorrect();
      const nextWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(nextWrongAttempts);

      if (ediHelpEnabled && nextWrongAttempts >= 3) {
        const assistState = getEdiAssistForCurrentStep(currentStep);

        if (assistState) {
          setEdiAssistState(assistState);
        }
      }
    }
  };

  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const finishLesson = async () => {
    if (!toolSlug || !moduleContent) return;

    const completedModules = await completeModule(moduleContent.number);

    try {
      await claimAiTrailCompletionXp({
        slug: toolSlug,
        totalModules,
        completedModules,
        xpAmount: XP_REWARDS.AI_TRAIL_COMPLETE,
        reason: `${aiTrailUi.xpRewardReason}: ${trail?.name || toolSlug}`,
        awardXP: addXPAsync,
      });
    } catch (error) {
      console.error("Failed to award AI trail completion XP:", error);
    }

    setShowPracticeModal(true);
  };

  const handleClosePractice = () => {
    setShowPracticeModal(false);
    navigate(`/trilhas-ia/${toolSlug}`, { replace: true });
  };

  const handleNext = async () => {
    if (!currentStep) return;

    if (currentStep.type === "fill_blanks" && !currentStepAnswer.componentCompleted) {
      return;
    }

    if ((currentStep.type === "quiz" || currentStep.type === "practical") && currentStepAnswer.isAnswerChecked && !currentStepAnswer.isCorrect) {
      setIsAnswerChecked(false);
      setSelectedOption(null);
      setEdiAssistState(null);

      if (currentStep.type === "practical") {
        setUserWords([]);
        setAvailableWords(currentStep.initialWords || []);
      }

      return;
    }

    if (currentStep.type === "text" && gradualTextRef.current) {
      const hadMoreParts = gradualTextRef.current.goToNextPart();
      if (hadMoreParts) return;
    }

    if (currentStepIndex >= lessonSteps.length - 1) {
      await finishLesson();
      return;
    }

    playContinue();
    setCurrentStepIndex((previous) => previous + 1);
  };

  if (isProgressLoading || !trail || !trailContent || !moduleContent || !currentStep || !isLive) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const progress = ((currentStepIndex + 1) / lessonSteps.length) * 100;
  const needsVerification =
    (currentStep.type === "quiz" || currentStep.type === "practical") &&
    !currentStepAnswer.isAnswerChecked;
  const moduleSummary = lessonSteps
    .map((s) => [s.title, s.question, s.content].filter(Boolean).join(": "))
    .join("\n");

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] flex items-center gap-3 bg-background border-b border-border">
        <button
          onClick={() => navigate(`/trilhas-ia/${trail.slug}`)}
          className="-ml-2 p-2.5 hover:bg-muted rounded-xl transition-all duration-200 group"
          type="button"
          aria-label={lessonUi.backToTrail}
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-700 ease-out rounded-full relative"
            style={{ width: `${progress}%`, backgroundColor: trail.accent }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />
          </div>
        </div>

        <span className="text-muted-foreground text-sm font-semibold min-w-[70px] text-right">
          {currentStepIndex + 1}/{lessonSteps.length}
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
      <div ref={containerRef} className="flex-1 overflow-y-auto flex justify-center bg-background scroll-smooth">
        <div className="w-full max-w-2xl px-6 py-8 pb-32 space-y-12">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-border/60 bg-card text-foreground"
            >
              {trailContent.moduleLabel} {moduleContent.number}/{totalModules}
            </Badge>
            <h1 className="text-3xl font-black leading-tight text-foreground">{moduleContent.title}</h1>
            <p className="text-sm leading-7 text-muted-foreground">{trail.summary}</p>
          </div>

          {lessonSteps.map((step, stepIndex) => {
            if (stepIndex > currentStepIndex) return null;

            const isCurrent = stepIndex === currentStepIndex;
            const stepAnswer = stepAnswers[stepIndex] || getDefaultStepAnswer();

            return (
              <div
                key={`${moduleContent.number}-${stepIndex}`}
                ref={(element) => {
                  stepRefs.current[stepIndex] = element;
                }}
                className={cn(
                  "transition-all duration-700 ease-out",
                  isCurrent ? "opacity-100" : "opacity-40 pointer-events-none",
                )}
              >
                <div className={cn("flex items-center gap-3 mb-6", isCurrent && "animate-fade-in")}>
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider",
                      step.type === "quiz"
                        ? "bg-blue-100 text-blue-700"
                      : step.type === "practical" || step.type === "fill_blanks"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {step.type === "practical" || step.type === "fill_blanks"
                      ? t("lesson.stepTypes.practical", "Pratica")
                      : step.type === "quiz"
                        ? t("lesson.stepTypes.quiz", "Quiz")
                        : t("lesson.stepTypes.learn", "Aprender")}
                  </div>

                  {!isCurrent && (stepAnswer.isCorrect || stepAnswer.componentCompleted) ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">{lessonUi.completeStep}</span>
                    </div>
                  ) : null}
                </div>

                <h2 className={cn("text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight", isCurrent && "animate-fade-in")}>
                  {step.title}
                </h2>

                {step.type === "text" ? (
                  <div className={cn("transition-all duration-700 ease-out", isCurrent && "animate-fade-in")}>
                    <GradualTextDisplay
                      ref={isCurrent ? gradualTextRef : undefined}
                      content={step.content || ""}
                      isActive={isCurrent}
                      afterContent={step.promptBox ? (
                        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
                          <p className="font-mono text-xs leading-6 text-foreground">{step.promptBox}</p>
                        </div>
                      ) : undefined}
                    />
                  </div>
                ) : null}

                {step.type === "practical" ? (
                  <div className={cn("space-y-6", isCurrent && "animate-fade-in")}>
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                      <p className="text-lg font-semibold text-foreground leading-relaxed">{step.question}</p>
                    </div>

                    <div
                      className={cn(
                        "min-h-[140px] p-5 rounded-2xl border-2 border-dashed flex flex-wrap gap-3 items-center transition-all duration-300",
                        stepAnswer.isAnswerChecked
                          ? stepAnswer.isCorrect
                            ? "border-success bg-success/10"
                            : "border-destructive bg-destructive/10"
                          : "border-border bg-muted/30",
                      )}
                    >
                      {(isCurrent ? currentStepAnswer.userWords : stepAnswer.userWords).length === 0 ? (
                        <span className="text-muted-foreground italic w-full text-center text-sm">
                          {lessonUi.practicalPlaceholder}
                        </span>
                      ) : null}

                      {(isCurrent ? currentStepAnswer.userWords : stepAnswer.userWords).map((word) => (
                        <button
                          key={`${word}-${stepIndex}`}
                          onClick={() => isCurrent && toggleWord(word, true)}
                          disabled={!isCurrent || stepAnswer.isAnswerChecked}
                          className="px-4 py-3 bg-primary text-primary-foreground shadow-sm rounded-xl font-semibold animate-in zoom-in-95 duration-200 hover:scale-105 transition-transform"
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    {isCurrent ? (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {availableWords.map((word) => (
                          <button
                            key={`${word}-available-${stepIndex}`}
                            onClick={() => toggleWord(word, false)}
                            disabled={stepAnswer.isAnswerChecked}
                            className="px-4 py-3 rounded-xl font-semibold transition-all active:scale-95 bg-muted text-foreground hover:bg-muted/80 border border-border shadow-sm"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {step.type === "fill_blanks" ? (
                  isCurrent ? (
                    <div className="animate-fade-in">
                      <Suspense
                        fallback={
                          <div className="flex items-center justify-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          </div>
                        }
                      >
                        <FillBlanks
                          title={step.title}
                          sentence={step.sentence || ""}
                          answers={step.answers || []}
                          options={step.fillBlanksOptions || []}
                          explanation={step.explanation}
                          ediHelpEnabled={ediHelpEnabled}
                          onComplete={() => {
                            setStepAnswers((prev) => ({
                              ...prev,
                              [currentStepIndex]: {
                                ...(prev[currentStepIndex] || getDefaultStepAnswer()),
                                componentCompleted: true,
                                isCorrect: true,
                                isAnswerChecked: true,
                              },
                            }));
                            playContinue();
                            setCurrentStepIndex((previous) => previous + 1);
                          }}
                        />
                      </Suspense>
                    </div>
                  ) : (
                    <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span className="text-sm">{t("lesson.stepCompleted", lessonUi.completeStep)}</span>
                      </div>
                    </div>
                  )
                ) : null}

                {step.type === "quiz" ? (
                  <div className={cn("space-y-3", isCurrent && "animate-fade-in")}>
                    <p className="text-lg font-semibold text-foreground mb-4 leading-relaxed">{step.question}</p>
                    {step.options?.map((option, index) => (
                      <button
                        key={`${option.text}-${index}`}
                        onClick={() => isCurrent && !stepAnswer.isAnswerChecked && setSelectedOption(index)}
                        disabled={!isCurrent || stepAnswer.isAnswerChecked}
                        className={cn(
                          "w-full p-5 rounded-2xl border text-left font-medium transition-all duration-200",
                          "bg-card border-border text-foreground",
                          isCurrent && !stepAnswer.isAnswerChecked && "hover:border-primary/50 hover:bg-muted/50",
                          stepAnswer.selectedOption === index && !stepAnswer.isAnswerChecked && "border-primary bg-primary/10 ring-2 ring-primary/20",
                          stepAnswer.isAnswerChecked && option.isCorrect && "border-success bg-success/10 text-success",
                          stepAnswer.isAnswerChecked &&
                            stepAnswer.selectedOption === index &&
                            !option.isCorrect &&
                            "border-destructive bg-destructive/10 text-destructive",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm border transition-all",
                              stepAnswer.selectedOption === index && !stepAnswer.isAnswerChecked
                                ? "border-primary bg-primary text-white"
                                : stepAnswer.isAnswerChecked && option.isCorrect
                                  ? "border-success bg-success text-white"
                                  : stepAnswer.isAnswerChecked && stepAnswer.selectedOption === index && !option.isCorrect
                                    ? "border-destructive bg-destructive text-white"
                                    : "border-border text-muted-foreground",
                            )}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1">{option.text}</span>
                          {stepAnswer.isAnswerChecked && option.isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-success" />
                          ) : null}
                          {stepAnswer.isAnswerChecked && stepAnswer.selectedOption === index && !option.isCorrect ? (
                            <XCircle className="w-6 h-6 text-destructive" />
                          ) : null}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}

                {isCurrent && stepAnswer.isAnswerChecked && (step.type === "quiz" || step.type === "practical") ? (
                  <div
                    className={cn(
                      "p-6 rounded-2xl border mt-8 animate-fade-in",
                      stepAnswer.isCorrect
                        ? "bg-success/10 border-success text-success"
                        : "bg-destructive/10 border-destructive text-destructive",
                    )}
                  >
                    <div className="font-bold text-xl mb-3 flex items-center gap-3">
                      {stepAnswer.isCorrect ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <span>{tUi(t, i18n.language, "lesson.quiz.excellent")}</span>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-white" />
                          </div>
                          <span>{tUi(t, i18n.language, "lesson.quiz.almostThere")}</span>
                        </>
                      )}
                    </div>

                    <p className="text-foreground/70 leading-relaxed text-base">
                      {stepAnswer.isCorrect
                        ? tUi(t, i18n.language, "lesson.quiz.masteredConcept")
                        : tUi(t, i18n.language, "lesson.quiz.reviewAndTryAgain")}
                    </p>

                    {!stepAnswer.isCorrect ? (
                      <>
                        <div className="mt-4 p-4 rounded-xl bg-orange-100 border border-orange-200">
                          <p className="text-orange-600 text-sm font-semibold mb-1">
                            {tUi(t, i18n.language, "lesson.quiz.hint")} {wrongAttempts}:
                          </p>
                          <p className="text-foreground/70 text-sm">
                            {wrongAttempts === 1
                              ? tUi(t, i18n.language, "lesson.quiz.hintReread")
                              : tUi(t, i18n.language, "lesson.quiz.hintReview")}
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center gap-2 text-destructive">
                            <RotateCcw className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {tUi(t, i18n.language, "lesson.quiz.getCorrectToContinue")}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      </div>

      <div className="px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] bg-card border-t border-border z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={needsVerification ? handleVerify : handleNext}
            hidden={currentStep.type === "fill_blanks"}
            disabled={
              (currentStep.type === "quiz" && !currentStepAnswer.isAnswerChecked && currentStepAnswer.selectedOption === null) ||
              (currentStep.type === "practical" && !currentStepAnswer.isAnswerChecked && currentStepAnswer.userWords.length === 0)
            }
            className={cn(
              "w-full h-14 text-base font-bold shadow-sm transition-all uppercase tracking-wide rounded-xl",
              currentStepAnswer.isAnswerChecked
                ? currentStepAnswer.isCorrect
                  ? "bg-success hover:bg-success/90 text-success-foreground"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted-foreground/30 disabled:text-muted-foreground disabled:border disabled:border-border",
            )}
          >
            {currentStepAnswer.isAnswerChecked
              ? currentStepAnswer.isCorrect
                ? currentStepIndex === lessonSteps.length - 1
                  ? lessonUi.returnToTrail
                  : `${t("common.continue", "Continuar")} ->`
                : t("lesson.tryAgain", "Tentar novamente")
              : needsVerification
                ? t("lesson.verify", "Verificar")
                : t("common.continue", "Continuar")}
          </Button>
        </div>
      </div>

      {ediHelpEnabled && ediAssistState ? (
        <EdiGuidedHelp
          isOpen
          title={ediAssistState.title}
          description={ediAssistState.description}
          steps={ediAssistState.steps}
          onApplyStep={handleApplyCurrentEdiStep}
          onClose={() => setEdiAssistState(null)}
        />
      ) : null}

      <TrailChat
        isOpen={showPracticeModal}
        onClose={handleClosePractice}
        toolContext={trail.name}
        accentColor={trail.accent}
        language={language}
        moduleSummary={moduleSummary}
      />
    </div>
  );
};

export default AIToolModuleLessonPage;
