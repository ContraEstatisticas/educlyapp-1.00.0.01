import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { X, CheckCircle2, XCircle, RotateCcw, Star } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { GradualTextDisplay, GradualTextDisplayRef } from "@/components/lesson/GradualTextDisplay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

import { useTranslatedLessonContent } from "@/hooks/useTranslatedLessonContent";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { useToast } from "@/hooks/use-toast";
import { tUi } from "@/lib/supplementalUiTranslations";
import { TrailChat } from "@/components/trail/TrailChat";
import { MilestoneUpsellModal, MILESTONE_DAYS } from "@/components/lesson/MilestoneUpsellModal";
import { useProductAccess } from "@/hooks/useProductAccess";
import { useFreelancerMedals } from "@/hooks/useFreelancerMedals";
import {
  DEFAULT_DAY1_EXPERIMENT_VARIANT,
  type Day1ExperimentVariant,
  isDay1ExperimentVariant,
  normalizeDay1ExperimentVariant,
} from "@/lib/day1Experiment";

// Interactive lesson components - lazy loaded for performance
// PromptTrainer removido
const WordSearch = lazy(() => import("@/components/lesson/WordSearch").then((m) => ({ default: m.WordSearch })));
const MatchWords = lazy(() => import("@/components/lesson/MatchWords").then((m) => ({ default: m.MatchWords })));
const FillBlanks = lazy(() => import("@/components/lesson/FillBlanks").then((m) => ({ default: m.FillBlanks })));
const FindPromptError = lazy(() => import("@/components/lesson/FindPromptError").then((m) => ({ default: m.FindPromptError })));
const SelectIncorrect = lazy(() => import("@/components/lesson/SelectIncorrect").then((m) => ({ default: m.SelectIncorrect })));
// REGISTRO DO LAZY LOAD ADICIONADO ABAIXO
const AppPromo = lazy(() => import("@/components/AppPromo").then((m) => ({ default: m.AppPromo })));
const GuilhermeDay1Journey = lazy(() =>
  import("@/components/lesson/GuilhermeDay1Journey").then((m) => ({ default: m.default }))
);

// Import Edi Motivation components
import { EdiMotivation, useEdiMotivation } from "@/components/lesson/EdiMotivation";
import { EdiGuidedHelp, EdiGuidedHelpStep } from "@/components/lesson/EdiGuidedHelp";

// Component registry for dynamic rendering - using any to allow flexible prop passing from JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComponent = (componentName: string): React.LazyExoticComponent<React.ComponentType<any>> | null => {
  switch (componentName) {
    // PromptTrainer removido
    // case "PromptTrainer":
    //   return PromptTrainer;
    case "WordSearch":
      return WordSearch;
    case "MatchWords":
      return MatchWords;
    case "FillBlanks":
      return FillBlanks;
    case "FindPromptError":
      return FindPromptError;
    case "SelectIncorrect":
      return SelectIncorrect;
    case "AppPromo": // CASO ADICIONADO PARA RECONHECER O COMPONENTE
      return AppPromo;
    case "GuilhermeDay1Journey":
      return GuilhermeDay1Journey;
    default:
      return null;
  }
};

// --- DEFINIÇÃO DOS TIPOS ---
type StepType = "text" | "quiz" | "practical" | "component";

interface LessonStep {
  type: StepType;
  title?: string;
  content?: string;
  image?: string;
  question?: string;
  options?: { text: string; isCorrect: boolean }[];
  explanation?: string;
  initialWords?: string[];
  correctOrder?: string[];
  componentName?: string;
  props?: Record<string, unknown>;
}

interface StepAnswerState {
  selectedOption: number | null;
  isAnswerChecked: boolean;
  isCorrect: boolean;
  userWords: string[];
  componentCompleted: boolean;
}

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

const removeFirstOccurrence = (items: string[], itemToRemove: string) => {
  const index = items.findIndex((item) => item === itemToRemove);
  if (index === -1) return items;

  return [...items.slice(0, index), ...items.slice(index + 1)];
};

// Clean white theme colors (Dashboard style)
const THEME = {
  // Primary (purple from design system)
  primary: "bg-primary",
  primaryHover: "hover:bg-primary/90",
  primaryRing: "ring-primary",
  text: "text-primary",
  border: "border-primary",
  lightBg: "bg-primary/10",
  // Success colors
  correct: "bg-success",
  incorrect: "bg-destructive",
  // UI colors - Clean white theme
  cardBg: "bg-card",
  cardBorder: "border-border",
  mutedText: "text-muted-foreground",
};

const cryingEdiAnimationSrc =
  "https://lottie.host/4cec2358-38d2-4bce-8aa7-5fe16d133111/UTv5lU5shS.lottie";

const celebratingEdiAnimationSrc =
  "https://lottie.host/c2f7d4b4-8381-48a4-afb5-e360e22379ad/esNgH7G90P.lottie";

const EXIT_DIALOG_UI = {
  pt: {
    title: "Tem certeza que deseja sair?",
    description: "Se voce sair agora, a licao do dia vai ficar incompleta e o EDI vai ficar tristinho.",
    stay: "Continuar licao",
    leave: "Sair mesmo assim",
    imageAlt: "Coruja EDI chorando",
  },
  en: {
    title: "Are you sure you want to leave?",
    description: "If you leave now, today's lesson will stay incomplete and EDI will be sad.",
    stay: "Keep studying",
    leave: "Leave anyway",
    imageAlt: "Crying EDI owl",
  },
  es: {
    title: "¿Seguro que quieres salir?",
    description: "Si sales ahora, la leccion del dia quedara incompleta y EDI se pondra triste.",
    stay: "Seguir estudiando",
    leave: "Salir de todos modos",
    imageAlt: "Buho EDI llorando",
  },
  fr: {
    title: "Voulez-vous vraiment quitter ?",
    description: "Si vous partez maintenant, la lecon du jour restera inachevee et EDI sera triste.",
    stay: "Continuer la lecon",
    leave: "Quitter quand meme",
    imageAlt: "Hibou EDI en train de pleurer",
  },
} as const;

type ExitDialogLanguage = keyof typeof EXIT_DIALOG_UI;

const getExitDialogUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as ExitDialogLanguage | undefined;
  return EXIT_DIALOG_UI[base || "en"] || EXIT_DIALOG_UI.en;
};

const CORRECT_CELEBRATION_UI = {
  pt: {
    title: "EDI esta comemorando com voce!",
    message: "Voce esta indo muito bem. Continue assim!",
    imageAlt: "Coruja EDI comemorando com confetes",
  },
  en: {
    title: "EDI is celebrating with you!",
    message: "You're doing really well. Keep it up!",
    imageAlt: "EDI owl celebrating with confetti",
  },
  es: {
    title: "EDI esta celebrando contigo!",
    message: "Lo estas haciendo muy bien. Sigue asi!",
    imageAlt: "Buho EDI celebrando con confeti",
  },
  fr: {
    title: "EDI fete cela avec vous !",
    message: "Vous vous en sortez tres bien. Continuez ainsi !",
    imageAlt: "Hibou EDI celebrant avec des confettis",
  },
} as const;

type CorrectCelebrationLanguage = keyof typeof CORRECT_CELEBRATION_UI;

const getCorrectCelebrationUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as CorrectCelebrationLanguage | undefined;
  return CORRECT_CELEBRATION_UI[base || "en"] || CORRECT_CELEBRATION_UI.en;
};

const DAY1_FEEDBACK_UI = {
  pt: {
    title: "Como foi esse Dia 1?",
    description: "Sua resposta nos ajuda a comparar as versoes do conteudo e melhorar a trilha.",
    ratingLabel: "Quantas estrelas voce da para esse Dia 1?",
    opinionLabel: "Como esse conteudo foi util para voce e o que voce achou dele?",
    placeholder: "Escreva aqui sua opiniao sobre esse Dia 1.",
    submit: "Enviar feedback",
    ratingHelper: "Selecione de 1 a 5 estrelas para continuar.",
    opinionHelper: "Escreva sua opiniao para concluir o Dia 1.",
    successTitle: "Feedback salvo",
    successDescription: "Obrigado. Sua resposta ja foi registrada.",
    errorTitle: "Nao foi possivel salvar",
    errorDescription: "Tente novamente em alguns instantes.",
  },
  en: {
    title: "How was Day 1 for you?",
    description: "Your answer helps us compare content versions and improve the trail.",
    ratingLabel: "How many stars would you give this Day 1?",
    opinionLabel: "How was this content useful to you and what did you think of it?",
    placeholder: "Write your opinion about this Day 1 here.",
    submit: "Send feedback",
    ratingHelper: "Select 1 to 5 stars to continue.",
    opinionHelper: "Write your opinion to finish Day 1.",
    successTitle: "Feedback saved",
    successDescription: "Thanks. Your answer has been recorded.",
    errorTitle: "Could not save feedback",
    errorDescription: "Please try again in a moment.",
  },
  es: {
    title: "Como fue este Dia 1?",
    description: "Tu respuesta nos ayuda a comparar las versiones del contenido y mejorar la ruta.",
    ratingLabel: "Cuantas estrellas le das a este Dia 1?",
    opinionLabel: "Como te ayudo este contenido y que te parecio?",
    placeholder: "Escribe aqui tu opinion sobre este Dia 1.",
    submit: "Enviar feedback",
    ratingHelper: "Selecciona de 1 a 5 estrellas para continuar.",
    opinionHelper: "Escribe tu opinion para terminar el Dia 1.",
    successTitle: "Feedback guardado",
    successDescription: "Gracias. Tu respuesta ya fue registrada.",
    errorTitle: "No se pudo guardar",
    errorDescription: "Intentalo de nuevo en unos instantes.",
  },
  fr: {
    title: "Comment etait ce Jour 1 ?",
    description: "Votre reponse nous aide a comparer les versions du contenu et a ameliorer le parcours.",
    ratingLabel: "Combien d'etoiles donnez-vous a ce Jour 1 ?",
    opinionLabel: "En quoi ce contenu vous a-t-il aide et qu'en avez-vous pense ?",
    placeholder: "Ecrivez ici votre avis sur ce Jour 1.",
    submit: "Envoyer le feedback",
    ratingHelper: "Choisissez de 1 a 5 etoiles pour continuer.",
    opinionHelper: "Ecrivez votre avis pour terminer le Jour 1.",
    successTitle: "Feedback enregistre",
    successDescription: "Merci. Votre reponse a bien ete enregistree.",
    errorTitle: "Impossible d'enregistrer",
    errorDescription: "Reessayez dans quelques instants.",
  },
} as const;

type Day1FeedbackLanguage = keyof typeof DAY1_FEEDBACK_UI;

const getDay1FeedbackUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as Day1FeedbackLanguage | undefined;
  return DAY1_FEEDBACK_UI[base || "en"] || DAY1_FEEDBACK_UI.en;
};

const DayLesson = () => {
  const { t, i18n } = useTranslation();
  const { dayId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { playCorrect, playIncorrect, playContinue } = useQuizSounds();
  const { ai_hub: hasAiHub } = useProductAccess();
  const { syncEarnableMedals } = useFreelancerMedals();

  // Estados da Lição
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [lessonSteps, setLessonSteps] = useState<LessonStep[]>([]);
  const [dayInfo, setDayInfo] = useState<{ dayNumber: number; title: string; challengeId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [isCompletingDay, setIsCompletingDay] = useState(false);
  const [pendingMilestoneDay, setPendingMilestoneDay] = useState<number | null>(null);
  const [showMilestoneUpsell, setShowMilestoneUpsell] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDay1FeedbackDialog, setShowDay1FeedbackDialog] = useState(false);
  const [isSavingDay1Feedback, setIsSavingDay1Feedback] = useState(false);
  const [day1Variant, setDay1Variant] = useState<Day1ExperimentVariant>(DEFAULT_DAY1_EXPERIMENT_VARIANT);
  const [existingDay1Feedback, setExistingDay1Feedback] = useState<{
    starRating: number;
    opinionText: string;
  } | null>(null);
  const [day1FeedbackRating, setDay1FeedbackRating] = useState(0);
  const [day1FeedbackOpinion, setDay1FeedbackOpinion] = useState("");

  // Estados de Quiz/Prática - armazena respostas por step para permitir scroll
  const [stepAnswers, setStepAnswers] = useState<Record<number, StepAnswerState>>({});
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [ediAssistState, setEdiAssistState] = useState<EdiAssistState | null>(null);

  // Edi Motivation system - shows motivational messages at progress milestones
  const { activeMotivation, closeMotivation } = useEdiMotivation(
    currentStepIndex + 1, 
    lessonSteps.length,
    dayInfo?.dayNumber || 1
  );

  // Refs para scroll suave
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref para controlar texto gradual
  const gradualTextRef = useRef<GradualTextDisplayRef>(null);

  // Getters para o step atual (compatibilidade com lógica existente)
  const currentStepAnswer = stepAnswers[currentStepIndex] || getDefaultStepAnswer();
  const selectedOption = currentStepAnswer.selectedOption;
  const isAnswerChecked = currentStepAnswer.isAnswerChecked;
  const isCorrect = currentStepAnswer.isCorrect;
  const userWords = currentStepAnswer.userWords;
  const componentCompleted = currentStepAnswer.componentCompleted;
  
  // AvailableWords precisa ser gerenciado separadamente
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Funções helper para atualizar stepAnswers de forma compatível
  const setSelectedOption = (value: number | null) => {
    setStepAnswers(prev => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: value,
        isAnswerChecked: prev[currentStepIndex]?.isAnswerChecked ?? false,
        isCorrect: prev[currentStepIndex]?.isCorrect ?? false,
        userWords: prev[currentStepIndex]?.userWords ?? [],
        componentCompleted: prev[currentStepIndex]?.componentCompleted ?? false,
      }
    }));
  };

  const setIsAnswerChecked = (value: boolean) => {
    setStepAnswers(prev => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: prev[currentStepIndex]?.selectedOption ?? null,
        isAnswerChecked: value,
        isCorrect: prev[currentStepIndex]?.isCorrect ?? false,
        userWords: prev[currentStepIndex]?.userWords ?? [],
        componentCompleted: prev[currentStepIndex]?.componentCompleted ?? false,
      }
    }));
  };

  const setIsCorrect = (value: boolean) => {
    setStepAnswers(prev => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: prev[currentStepIndex]?.selectedOption ?? null,
        isAnswerChecked: prev[currentStepIndex]?.isAnswerChecked ?? false,
        isCorrect: value,
        userWords: prev[currentStepIndex]?.userWords ?? [],
        componentCompleted: prev[currentStepIndex]?.componentCompleted ?? false,
      }
    }));
  };

  const setUserWords = (value: string[] | ((prev: string[]) => string[])) => {
    setStepAnswers(prev => {
      const current = prev[currentStepIndex];
      const currentWords = current?.userWords ?? [];
      const newWords = typeof value === 'function' ? value(currentWords) : value;
      return {
        ...prev,
        [currentStepIndex]: {
          ...current,
          selectedOption: current?.selectedOption ?? null,
          isAnswerChecked: current?.isAnswerChecked ?? false,
          isCorrect: current?.isCorrect ?? false,
          userWords: newWords,
          componentCompleted: current?.componentCompleted ?? false,
        }
      };
    });
  };


  // Hook for translated lesson content
  const { getLessonContent, currentLanguage, contentLanguage, isLoading: isTranslationLoading } = useTranslatedLessonContent();
  const previewDay1VariantParam = searchParams.get("preview_day1_variant") ?? searchParams.get("preview_variant");
  const previewDay1Variant =
    previewDay1VariantParam && isDay1ExperimentVariant(previewDay1VariantParam)
      ? normalizeDay1ExperimentVariant(previewDay1VariantParam)
      : null;
  const isDay1PreviewMode = Boolean(dayInfo?.dayNumber === 1 && previewDay1Variant);

  // Carregar Conteúdo - wait for translations to be ready AND content language to match
  useEffect(() => {
    // Don't load content until translations are ready and content language matches
    if (isTranslationLoading) return;
    if (contentLanguage && contentLanguage !== currentLanguage) {
      console.log(`⏳ Aguardando conteúdo: atual=${contentLanguage}, esperado=${currentLanguage}`);
      return;
    }

    const fetchDayContent = async () => {
      setIsLoading(true);
      if (!dayId) return;
      try {
        // Refresh token on lesson entry for 4h validity
        const { refreshSession } = await import("@/hooks/useRefreshSession");
        await refreshSession();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data: dayData } = await supabase
          .from("challenge_days")
          .select("day_number, title, challenge_id")
          .eq("id", dayId)
          .single();
        if (dayData) {
          let resolvedDay1Variant = DEFAULT_DAY1_EXPERIMENT_VARIANT;
          let savedDay1Feedback: { starRating: number; opinionText: string } | null = null;

          if (dayData.day_number === 1) {
            if (user) {
              const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("challenge_day1_variant")
                .eq("id", user.id)
                .maybeSingle();

              if (profileError) {
                console.error("[DayLesson] Failed to load Day 1 variant:", profileError);
              }

              resolvedDay1Variant = normalizeDay1ExperimentVariant(profile?.challenge_day1_variant);
            }

            if (previewDay1Variant) {
              resolvedDay1Variant = previewDay1Variant;
            }

            if (user && !previewDay1Variant) {
              const { data: feedback, error: feedbackError } = await supabase
                .from("challenge_day_feedback")
                .select("star_rating, opinion_text")
                .eq("user_id", user.id)
                .eq("challenge_day_id", dayId)
                .eq("day_variant", resolvedDay1Variant)
                .maybeSingle();

              if (feedbackError) {
                console.error("[DayLesson] Failed to load Day 1 feedback:", feedbackError);
              }

              if (feedback) {
                savedDay1Feedback = {
                  starRating: feedback.star_rating,
                  opinionText: feedback.opinion_text,
                };
              }
            }
          }

          setDayInfo({ dayNumber: dayData.day_number, title: dayData.title, challengeId: dayData.challenge_id });
          setDay1Variant(resolvedDay1Variant);
          setExistingDay1Feedback(savedDay1Feedback);
          setDay1FeedbackRating(savedDay1Feedback?.starRating ?? 0);
          setDay1FeedbackOpinion(savedDay1Feedback?.opinionText ?? "");
          setShowDay1FeedbackDialog(false);
          setIsSavingDay1Feedback(false);
          setCurrentStepIndex(0);
          setStepAnswers({});
          setWrongAttempts(0);
          setAvailableWords([]);
          setEdiAssistState(null);
          // Always use translated content from JSON files - no hardcoded fallback
          const translatedSteps = getLessonContent(dayData.day_number, resolvedDay1Variant);
          console.log(`📚 Day ${dayData.day_number} - Carregando ${translatedSteps.length} steps para idioma: ${contentLanguage}`);
          setLessonSteps(translatedSteps);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDayContent();
  }, [dayId, currentLanguage, contentLanguage, getLessonContent, isTranslationLoading, previewDay1Variant]);

  // Inicializar estados do step atual (não resetar - apenas inicializar se não existir)
  useEffect(() => {
    const step = lessonSteps[currentStepIndex];
    if (step) {
      // Apenas reseta wrongAttempts para o step atual
      setWrongAttempts(0);
      setEdiAssistState(null);

      // Inicializa availableWords para prática se for um novo step
      if (step.type === "practical") {
        setAvailableWords(step.initialWords || []);
      }

    }
  }, [currentStepIndex, lessonSteps]);


  // Scroll suave para o step atual quando muda
  useEffect(() => {
    if (stepRefs.current[currentStepIndex]) {
      // Delay para animação suave após renderização
      setTimeout(() => {
        stepRefs.current[currentStepIndex]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 150);
    }
  }, [currentStepIndex]);

  const openPostLessonFlow = () => {
    setIsCompletingDay(false);

    if (
      dayInfo &&
      (MILESTONE_DAYS as readonly number[]).includes(dayInfo.dayNumber) &&
      !hasAiHub
    ) {
      setPendingMilestoneDay(dayInfo.dayNumber);
    }

    setShowPracticeModal(true);
  };

  const handleSaveDay1Feedback = async () => {
    const feedbackUi = getDay1FeedbackUi(i18n.resolvedLanguage || i18n.language);
    const trimmedOpinion = day1FeedbackOpinion.trim();

    if (!dayInfo || !dayId || dayInfo.dayNumber !== 1) {
      setShowDay1FeedbackDialog(false);
      openPostLessonFlow();
      return;
    }

    if (day1FeedbackRating < 1 || day1FeedbackRating > 5) {
      toast({
        title: feedbackUi.errorTitle,
        description: feedbackUi.ratingHelper,
        variant: "destructive",
      });
      return;
    }

    if (!trimmedOpinion) {
      toast({
        title: feedbackUi.errorTitle,
        description: feedbackUi.opinionHelper,
        variant: "destructive",
      });
      return;
    }

    setIsSavingDay1Feedback(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      const now = new Date().toISOString();
      const { error } = await supabase
        .from("challenge_day_feedback")
        .upsert({
          user_id: user.id,
          challenge_id: dayInfo.challengeId,
          challenge_day_id: dayId,
          challenge_day_number: dayInfo.dayNumber,
          day_variant: day1Variant,
          star_rating: day1FeedbackRating,
          opinion_text: trimmedOpinion,
          updated_at: now,
        }, {
          onConflict: "user_id,challenge_day_id,day_variant",
        });

      if (error) {
        throw error;
      }

      setExistingDay1Feedback({
        starRating: day1FeedbackRating,
        opinionText: trimmedOpinion,
      });
      setDay1FeedbackOpinion(trimmedOpinion);
      setShowDay1FeedbackDialog(false);
      toast({
        title: feedbackUi.successTitle,
        description: feedbackUi.successDescription,
      });

      openPostLessonFlow();
    } catch (error) {
      console.error("[DayLesson] Failed to save Day 1 feedback:", error);
      toast({
        title: feedbackUi.errorTitle,
        description: feedbackUi.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSavingDay1Feedback(false);
    }
  };


  // --- CALLBACK PARA COMPONENTES INTERATIVOS ---
  const handleComponentComplete = () => {
    // Marca o componente como completo
    setStepAnswers(prev => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedOption: prev[currentStepIndex]?.selectedOption ?? null,
        isAnswerChecked: true,
        isCorrect: true,
        userWords: prev[currentStepIndex]?.userWords ?? [],
        componentCompleted: true
      }
    }));
    // Avança para próximo step (bypass do check assíncrono)
    handleNext(true);
  };

  // --- LÓGICA DE NAVEGAÇÃO ---
  const handleNext = async (fromComponentComplete?: boolean) => {
    if (isCompletingDay) {
      return;
    }

    const step = lessonSteps[currentStepIndex];

    // BLOQUEIO: Não permite avançar se errou em quiz ou prática - deve tentar de novo
    if ((step.type === "quiz" || step.type === "practical") && isAnswerChecked && !isCorrect) {
      // Reseta para tentar novamente
      setIsAnswerChecked(false);
      setSelectedOption(null);
      if (step.type === "practical") {
        setUserWords([]);
        setAvailableWords(step.initialWords || []);
      }
      return;
    }

    // BLOQUEIO: Componentes interativos devem ser completados via callback (AppPromo ignorado para permitir avanço pelo botão principal)
    if (step.type === "component" && step.componentName !== "AppPromo" && step.componentName && getComponent(step.componentName) && !componentCompleted && !fromComponentComplete) {
      // Não permite pular componentes interativos
      return;
    }

    // Para steps de texto: primeiro mostra próxima parte, só avança quando acabar
    if (step.type === "text" && gradualTextRef.current) {
      const hadMoreParts = gradualTextRef.current.goToNextPart();
      if (hadMoreParts) {
        // Ainda tem partes - não avança para próximo step
        return;
      }
    }

    if (currentStepIndex >= lessonSteps.length - 1) {
      setIsCompletingDay(true);

      try {
        if (isDay1PreviewMode) {
          setIsCompletingDay(false);
          toast({
            title: "Pré-visualização finalizada",
            description: "Nada foi salvo porque você está vendo a trilha em modo de teste.",
          });
          navigate("/dashboard");
          return;
        }

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && dayId && dayInfo) {
          // Save day progress
          await supabase.from("user_day_progress").upsert({
            user_id: user.id,
            challenge_day_id: dayId,
            completed: true,
            completed_at: new Date().toISOString(),
          }, { onConflict: 'user_id,challenge_day_id' });

          // Ensure challenge progress record exists (upsert), then update current_day
          const nextDayNumber = dayInfo.dayNumber + 1;
          await supabase.from("user_challenge_progress").upsert({
            user_id: user.id,
            challenge_id: dayInfo.challengeId,
            current_day: nextDayNumber,
            is_active: true,
          }, { onConflict: 'user_id,challenge_id' });

          if (dayInfo.dayNumber === 5) {
            try {
              const { data: sessionData } = await supabase.auth.getSession();
              const token = sessionData?.session?.access_token;
              if (token) {
                await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-upsell-day5`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    language: i18n.resolvedLanguage || i18n.language,
                  }),
                });
              }
            } catch (upsellError) {
              console.error("Error sending day 5 upsell:", upsellError);
            }
          }

          try {
            await syncEarnableMedals();
          } catch (medalError) {
            console.error("Error syncing medals after day completion:", medalError);
          }
        }

        if (dayInfo?.dayNumber === 1 && !existingDay1Feedback) {
          setIsCompletingDay(false);
          setShowDay1FeedbackDialog(true);
          return;
        }

        openPostLessonFlow();
      } catch (error) {
        setIsCompletingDay(false);
        console.error("Error saving progress:", error);
        navigate("/dashboard");
      }
      return;
    }
    
    // Toca som de continuar ao avançar
    playContinue();
    
    // Avança para próximo step e faz scroll suave
    setCurrentStepIndex((prev) => prev + 1);
  };

  const getEdiAssistForCurrentStep = (step: LessonStep): EdiAssistState | null => {
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
            id: `quiz-answer-${currentStepIndex}`,
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
          id: `practical-word-${currentStepIndex}-${index}`,
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
    const step = lessonSteps[currentStepIndex];
    let correct = false;

    if (step.type === "quiz") {
      correct = step.options![selectedOption!].isCorrect;
    } else if (step.type === "practical") {
      correct = userWords.join(" ") === step.correctOrder?.join(" ");
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    // Tocar som de acerto ou erro
    if (correct) {
      playCorrect();
    } else {
      playIncorrect();
      const nextWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(nextWrongAttempts);

      const shouldOfferEdiHelp = nextWrongAttempts >= 3;

      if (shouldOfferEdiHelp) {
        const assistState = getEdiAssistForCurrentStep(step);

        if (assistState) {
          setEdiAssistState(assistState);
        }
      }
    }
  };

  // Previne context menu (botão direito) para evitar pular questões
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const toggleWord = (word: string, fromUser: boolean) => {
    if (isAnswerChecked) return;
    if (fromUser) {
      setUserWords((prev) => prev.filter((w) => w !== word));
      setAvailableWords((prev) => [...prev, word]);
    } else {
      setAvailableWords((prev) => prev.filter((w) => w !== word));
      setUserWords((prev) => [...prev, word]);
    }
  };

  if (isLoading || isTranslationLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  const currentStep = lessonSteps[currentStepIndex];
  if (!currentStep)
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  const progress = ((currentStepIndex + 1) / (lessonSteps.length || 1)) * 100;
  const exitDialogUi = getExitDialogUi(i18n.resolvedLanguage || i18n.language);
  const correctCelebrationUi = getCorrectCelebrationUi(i18n.resolvedLanguage || i18n.language);
  const day1FeedbackUi = getDay1FeedbackUi(i18n.resolvedLanguage || i18n.language);
  const isGuilhermeJourneyStep =
    currentStep.type === "component" && currentStep.componentName === "GuilhermeDay1Journey";
  const useWideGuilhermeLayout = day1Variant === "guilherme" && isGuilhermeJourneyStep;
  const lessonContentWidthClass = useWideGuilhermeLayout
    ? "max-w-2xl md:max-w-[1280px] xl:max-w-[1560px] 2xl:max-w-[1680px] md:px-8 xl:px-10"
    : "max-w-2xl";
  const lessonBannerWidthClass = useWideGuilhermeLayout
    ? "max-w-2xl md:max-w-[1280px] xl:max-w-[1560px] 2xl:max-w-[1680px]"
    : "max-w-2xl";
  const canExitWithoutConfirmation =
    isCompletingDay || showPracticeModal || showMilestoneUpsell;

  // Só pede verificação se for Quiz ou Prática. Chat avança direto.
  const needsVerification = (currentStep.type === "quiz" || currentStep.type === "practical") && !isAnswerChecked;
  const moduleSummary = lessonSteps
    .map((s) => [s.title, s.question, s.content, typeof s.props?.summary === "string" ? s.props.summary : undefined].filter(Boolean).join(": "))
    .join("\n");

  const handleCloseLesson = () => {
    navigate("/dashboard");
  };

  const handleAttemptCloseLesson = () => {
    if (canExitWithoutConfirmation) {
      handleCloseLesson();
      return;
    }

    setShowExitDialog(true);
  };

  const handleEnableGuilhermePreview = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("preview_day1_variant", "guilherme");
    setSearchParams(nextParams);
  };

  const handleDisableDay1Preview = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("preview_day1_variant");
    nextParams.delete("preview_variant");
    setSearchParams(nextParams);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col" onContextMenu={handleContextMenu}>
      {/* HEADER - Clean white style */}
      <div className="px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] flex items-center gap-3 bg-background border-b border-border">
        <button
          onClick={handleAttemptCloseLesson}
          className="-ml-2 p-2.5 hover:bg-muted rounded-xl transition-all duration-200 group"
          type="button"
          aria-label="Fechar"
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        {/* Progress bar - clean style */}
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-700 ease-out rounded-full bg-primary relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />
          </div>
        </div>
        {/* Step counter */}
        <span className="text-muted-foreground text-sm font-semibold min-w-[50px] text-right">
          {currentStepIndex + 1}/{lessonSteps.length}
        </span>
      </div>

      {/* MAIN CONTENT AREA - Scroll contínuo suave */}
      {dayInfo?.dayNumber === 1 && (
        <div
          className={cn(
            "border-b px-4 py-3",
            isDay1PreviewMode ? "border-amber-200 bg-amber-50/80" : "border-sky-200 bg-sky-50/80"
          )}
        >
          <div className={cn(
            "mx-auto flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
            lessonBannerWidthClass
          )}>
            <div>
              <p
                className={cn(
                  "text-xs font-black uppercase tracking-[0.28em]",
                  isDay1PreviewMode ? "text-amber-700" : "text-sky-700"
                )}
              >
                Botao provisorio
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {isDay1PreviewMode
                  ? "Voce esta visualizando a versao Guilherme sem tag. Nada sera salvo nesse modo."
                  : "Quer ver a versao Guilherme sem trocar a tag do usuario? Use o preview provisorio abaixo."}
              </p>
            </div>

            {isDay1PreviewMode ? (
              <Button
                type="button"
                variant="outline"
                className="shrink-0 border-amber-300 bg-white text-amber-800 hover:bg-amber-100"
                onClick={handleDisableDay1Preview}
              >
                Voltar para a versao normal
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="shrink-0 border-sky-300 bg-white text-sky-800 hover:bg-sky-100"
                onClick={handleEnableGuilhermePreview}
              >
                Visualizar versao Guilherme
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
      <div ref={containerRef} className="flex-1 overflow-y-auto flex justify-center bg-background scroll-smooth">
        <div className={cn("w-full px-6 py-8 pb-32 space-y-12", lessonContentWidthClass)}>
          {/* Renderiza todos os steps até o atual */}
          {lessonSteps.map((step, stepIndex) => {
            // Só renderiza steps até o atual
            if (stepIndex > currentStepIndex) return null;
            
            const isCurrent = stepIndex === currentStepIndex;
            const stepAnswer = stepAnswers[stepIndex] || getDefaultStepAnswer();
            
              return (
                <div
                  key={stepIndex}
                  ref={el => { stepRefs.current[stepIndex] = el; }}
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isCurrent 
                      ? "opacity-100" 
                      : "opacity-40 pointer-events-none"
                  )}
                >
                {/* Step type badge */}
                <div className={cn(
                  "flex items-center gap-3 mb-6",
                  isCurrent && "animate-fade-in"
                )}>
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider",
                      step.type === "quiz"
                        ? "bg-blue-100 text-blue-600"
                        : step.type === "practical"
                          ? "bg-orange-100 text-orange-600"
                          : step.type === "component"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-primary/10 text-primary",
                    )}
                  >
                    {step.type === "practical"
                      ? t("lesson.stepTypes.practical")
                      : step.type === "component"
                        ? t("lesson.stepTypes.simulator")
                        : step.type === "quiz"
                          ? t("lesson.stepTypes.quiz")
                          : t("lesson.stepTypes.learn")}
                  </div>
                  {/* Indicador de completo para steps anteriores */}
                  {!isCurrent && stepAnswer.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                </div>

                {/* TITLE */}
                {step.title && (
                  <h1 className={cn(
                    "text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight",
                    isCurrent && "animate-fade-in"
                  )}>
                    {step.title}
                  </h1>
                )}

                {/* === TYPE: TEXT CONTENT (GRADUAL DISPLAY) === */}
                {step.type === "text" && (
                  <div className={cn(
                    "transition-all duration-700 ease-out",
                    isCurrent && "animate-fade-in"
                  )}>
                    <GradualTextDisplay
                      ref={isCurrent ? gradualTextRef : undefined}
                      content={step.content || ""}
                      isActive={isCurrent}
                      afterContent={step.image ? (
                        <div className="mt-4 rounded-xl overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title || ""}
                            className="w-full h-auto object-cover rounded-xl"
                          />
                        </div>
                      ) : undefined}
                    />
                  </div>
                )}

                {/* === TYPE: COMPONENT (DYNAMIC OR CHAT) === */}
                {step.type === "component" && isCurrent && (
                  <div className="animate-fade-in">
                    {step.componentName && getComponent(step.componentName) ? (
                      <Suspense
                        fallback={
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        }
                      >
                        {(() => {
                          const DynamicComponent = getComponent(step.componentName!);
                          if (!DynamicComponent) return null;
                          const componentProps = step.props || {};
                          return (
                            <DynamicComponent
                              {...componentProps}
                              onComplete={handleComponentComplete}
                              ediHelpEnabled
                            />
                          );
                        })()}
                      </Suspense>
                    ) : (
                      /* Componente não reconhecido - auto-skip */
                      <div className="bg-muted rounded-2xl p-6 text-center">
                        <p className="text-muted-foreground text-sm">
                          {t("lesson.componentUnavailable", "Componente não disponível")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Component não-atual (já completo) - mostra resumo */}
                {step.type === "component" && !isCurrent && (
                  <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm">{t("lesson.stepCompleted", "Etapa concluída")}</span>
                    </div>
                  </div>
                )}

                {/* === TYPE: PRACTICAL EXERCISE === */}
                {step.type === "practical" && (
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
                      {(isCurrent ? userWords : stepAnswer.userWords).length === 0 && (
                        <span className="text-muted-foreground italic w-full text-center text-sm">
                          {t("lesson.practical.instructions", "Clique nas palavras para montar o prompt correto:")}
                        </span>
                      )}
                      {(isCurrent ? userWords : stepAnswer.userWords).map((word, i) => (
                        <button
                          key={i}
                          onClick={() => isCurrent && toggleWord(word, true)}
                          disabled={!isCurrent || stepAnswer.isAnswerChecked}
                          className="px-4 py-3 bg-primary text-primary-foreground shadow-sm rounded-xl font-semibold animate-in zoom-in-95 duration-200 hover:scale-105 transition-transform"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                    {isCurrent && (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {availableWords.map((word, i) => (
                          <button
                            key={i}
                            onClick={() => toggleWord(word, false)}
                            disabled={stepAnswer.isAnswerChecked}
                            className="px-4 py-3 rounded-xl font-semibold transition-all active:scale-95 bg-muted text-foreground hover:bg-muted/80 border border-border shadow-sm"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* === TYPE: QUIZ === */}
                {step.type === "quiz" && (
                  <div className={cn("space-y-3", isCurrent && "animate-fade-in")}>
                    {/* Quiz question text */}
                    {step.question && (
                      <p className="text-lg font-semibold text-foreground mb-4 leading-relaxed">{step.question}</p>
                    )}
                    {/* Quiz image (shown below question, above options) */}
                    {step.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title || ""}
                          className="w-full h-auto object-cover rounded-xl"
                        />
                      </div>
                    )}
                    {step.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => isCurrent && !stepAnswer.isAnswerChecked && setSelectedOption(idx)}
                        disabled={!isCurrent || stepAnswer.isAnswerChecked}
                        style={isCurrent ? { animationDelay: `${idx * 100}ms` } : undefined}
                        className={cn(
                          "w-full p-5 rounded-2xl border text-left font-medium transition-all duration-200",
                          isCurrent && "animate-in fade-in slide-in-from-bottom-2",
                          "bg-card border-border text-foreground",
                          isCurrent && !stepAnswer.isAnswerChecked && "hover:border-primary/50 hover:bg-muted/50",
                          stepAnswer.selectedOption === idx && !stepAnswer.isAnswerChecked && "border-primary bg-primary/10 ring-2 ring-primary/20",
                          stepAnswer.isAnswerChecked && option.isCorrect && "border-success bg-success/10 text-success",
                          stepAnswer.isAnswerChecked &&
                            stepAnswer.selectedOption === idx &&
                            !option.isCorrect &&
                            "border-destructive bg-destructive/10 text-destructive",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm border transition-all",
                              stepAnswer.selectedOption === idx && !stepAnswer.isAnswerChecked
                                ? "border-primary bg-primary text-white"
                                : stepAnswer.isAnswerChecked && option.isCorrect
                                  ? "border-success bg-success text-white"
                                  : stepAnswer.isAnswerChecked && stepAnswer.selectedOption === idx && !option.isCorrect
                                    ? "border-destructive bg-destructive text-white"
                                    : "border-border text-muted-foreground",
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="flex-1">{option.text}</span>
                          {stepAnswer.isAnswerChecked && option.isCorrect && <CheckCircle2 className="w-6 h-6 text-success" />}
                          {stepAnswer.isAnswerChecked && stepAnswer.selectedOption === idx && !option.isCorrect && (
                            <XCircle className="w-6 h-6 text-destructive" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* FEEDBACK PANEL - apenas para step atual */}
                {isCurrent && stepAnswer.isAnswerChecked && (step.type === "quiz" || step.type === "practical") && (
                  <div
                    className={cn(
                      "p-6 rounded-2xl border mt-8 animate-fade-in",
                      stepAnswer.isCorrect
                        ? "bg-success/10 border-success text-success"
                        : "bg-destructive/10 border-destructive text-destructive",
                    )}
                  >
                    {stepAnswer.isCorrect && (
                      <div
                        className="mb-6 overflow-hidden rounded-[28px] border border-success/30 bg-gradient-to-br from-success/20 via-background/95 to-primary/10 shadow-[0_20px_45px_rgba(34,197,94,0.16)]"
                        role="img"
                        aria-label={correctCelebrationUi.imageAlt}
                      >
                        <div className="grid gap-5 p-5 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
                          <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-[24px] border border-success/25 bg-card/80 p-3 shadow-inner md:h-[240px] md:w-[240px]">
                            <div className="absolute inset-x-6 bottom-5 h-12 rounded-full bg-success/20 blur-2xl" />
                            <DotLottieReact
                              src={celebratingEdiAnimationSrc}
                              loop
                              autoplay
                              className="relative z-10 h-full w-full"
                            />
                          </div>

                          <div className="flex flex-col items-center text-center md:items-start md:text-left">
                            <div className="inline-flex items-center rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-success">
                              EDI
                            </div>
                            <h3 className="mt-3 text-2xl font-black leading-tight text-foreground md:text-[2rem]">
                              {correctCelebrationUi.title}
                            </h3>
                            <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-foreground/75 md:text-lg">
                              {correctCelebrationUi.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="font-bold text-xl mb-3 flex items-center gap-3">
                      {stepAnswer.isCorrect ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <span>{tUi(t, i18n.language, "lesson.quiz.excellent")} 🎉</span>
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
                    {!stepAnswer.isCorrect && (
                      <>
                        <div className="mt-4 p-4 rounded-xl bg-orange-100 border border-orange-200">
                          <p className="text-orange-600 text-sm font-semibold mb-1">
                            {tUi(t, i18n.language, "lesson.quiz.hint")} {wrongAttempts}:
                          </p>
                          <p className="text-foreground/70 text-sm">
                            {wrongAttempts === 1
                              ? step.type === "quiz"
                                ? tUi(t, i18n.language, "lesson.quiz.hintReread")
                                : tUi(t, i18n.language, "lesson.quiz.hintOrder")
                              : tUi(t, i18n.language, "lesson.quiz.hintReview")}
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center gap-2 text-destructive">
                            <RotateCcw className="w-4 h-4" />
                            <span className="text-sm font-semibold">{tUi(t, i18n.language, "lesson.quiz.getCorrectToContinue")}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Espaçamento sutil entre blocos */}
              </div>
            );
          })}

        </div>
      </div>

      </div>

      {/* BOTTOM ACTION BAR - BOTÃO PRINCIPAL ATUALIZADO PARA PERMITIR APPPROMO */}
      {(!(currentStep.type === "component" && currentStep.componentName !== "AppPromo" && currentStep.componentName && getComponent(currentStep.componentName) && !componentCompleted)) && (
        <div className="px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] bg-card border-t border-border z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={needsVerification ? handleVerify : () => handleNext()}
              disabled={
                isCompletingDay ||
                // Quiz: must select an option before verifying
                (currentStep.type === "quiz" && !isAnswerChecked && selectedOption === null) ||
                // Practical: must have words arranged before verifying  
                (currentStep.type === "practical" && !isAnswerChecked && userWords.length === 0)
              }
              className={cn(
                "w-full h-14 text-base font-bold shadow-sm transition-all uppercase tracking-wide rounded-xl",
                isAnswerChecked
                  ? isCorrect
                    ? "bg-success hover:bg-success/90 text-success-foreground"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted-foreground/30 disabled:text-muted-foreground disabled:border disabled:border-border",
              )}
            >
              {isCompletingDay
                ? t("lesson.loading", "Carregando...")
                : isAnswerChecked
                ? isCorrect
                  ? currentStepIndex === lessonSteps.length - 1
                    ? `🎓 ${t("lesson.continue")}`
                    : `${t("lesson.continue")} →`
                  : `↺ ${t("lesson.tryAgain")}`
                : needsVerification
                  ? t("lesson.verify")
                  : t("lesson.continue")}
            </Button>
          </div>
        </div>
      )}
      {ediAssistState && (
        <EdiGuidedHelp
          isOpen={Boolean(ediAssistState)}
          title={ediAssistState.title}
          description={ediAssistState.description}
          steps={ediAssistState.steps}
          onApplyStep={handleApplyCurrentEdiStep}
          onClose={() => setEdiAssistState(null)}
        />
      )}
      {/* Edi Motivation Popup - Shows motivational messages at progress milestones */}
      {activeMotivation?.show && (
        <EdiMotivation
          type={activeMotivation.type}
          message={activeMotivation.customMessage}
          onClose={closeMotivation}
          autoCloseSeconds={5}
          position="center"
        />
      )}

      {/* Milestone Upsell CTA - Shows AFTER TrailChat closes on days 5, 10, 15, 20, 25, 28 */}
      {showMilestoneUpsell && pendingMilestoneDay && (
        <MilestoneUpsellModal
          dayNumber={pendingMilestoneDay}
          isOpen={showMilestoneUpsell}
          onClose={() => {
            setShowMilestoneUpsell(false);
            setPendingMilestoneDay(null);
            navigate("/dashboard");
          }}
        />
      )}

      <Dialog open={showDay1FeedbackDialog}>
        <DialogContent
          className="max-w-lg overflow-hidden rounded-3xl border-border bg-card p-0"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <div className="bg-gradient-to-b from-primary/8 via-background to-background p-6">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-2xl font-bold text-foreground">
                {day1FeedbackUi.title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {day1FeedbackUi.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {day1FeedbackUi.ratingLabel}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value <= day1FeedbackRating;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDay1FeedbackRating(value)}
                        className={cn(
                          "rounded-full border p-3 transition-all",
                          isActive
                            ? "border-amber-300 bg-amber-50 text-amber-500"
                            : "border-border bg-card text-muted-foreground hover:border-amber-200 hover:text-amber-400"
                        )}
                        aria-label={`${value} estrela${value > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={cn("h-6 w-6", isActive && "fill-current")}
                        />
                      </button>
                    );
                  })}
                </div>
                {day1FeedbackRating === 0 ? (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {day1FeedbackUi.ratingHelper}
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {day1FeedbackUi.opinionLabel}
                </p>
                <Textarea
                  value={day1FeedbackOpinion}
                  onChange={(event) => setDay1FeedbackOpinion(event.target.value)}
                  placeholder={day1FeedbackUi.placeholder}
                  className="mt-4 min-h-[140px] resize-none"
                  maxLength={1200}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{day1FeedbackUi.opinionHelper}</span>
                  <span>{day1FeedbackOpinion.trim().length}/1200</span>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex-col gap-3 sm:flex-col">
              <Button
                type="button"
                className="h-12 w-full rounded-xl font-semibold"
                disabled={isSavingDay1Feedback}
                onClick={handleSaveDay1Feedback}
              >
                {isSavingDay1Feedback ? t("lesson.loading", "Carregando...") : day1FeedbackUi.submit}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <TrailChat
        isOpen={showPracticeModal}
        onClose={() => {
          setShowPracticeModal(false);
          // If there's a pending milestone, show the upsell modal instead of navigating
          if (pendingMilestoneDay) {
            setShowMilestoneUpsell(true);
          } else {
            navigate("/dashboard");
          }
        }}
        toolContext="Desafio 28 Dias"
        accentColor="#6366f1"
        language={i18n.language}
        moduleSummary={moduleSummary}
      />

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0">
          <div className="bg-gradient-to-b from-primary/8 via-background to-background p-6">
            <div
              className="mx-auto mb-5 flex max-w-[220px] justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/30"
              role="img"
              aria-label={exitDialogUi.imageAlt}
            >
              <DotLottieReact
                src={cryingEdiAnimationSrc}
                loop
                autoplay
                className="h-auto w-full"
              />
            </div>

            <DialogHeader className="space-y-3 text-center">
              <DialogTitle className="text-2xl font-bold text-foreground">
                {exitDialogUi.title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {exitDialogUi.description}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-6 flex-col gap-3 sm:flex-col">
              <Button
                type="button"
                className="h-12 w-full rounded-xl font-semibold"
                onClick={() => setShowExitDialog(false)}
              >
                {exitDialogUi.stay}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl font-semibold"
                onClick={handleCloseLesson}
              >
                {exitDialogUi.leave}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DayLesson;
