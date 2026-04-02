import { useState, useEffect, useCallback } from "react";
import { X, Sparkles, Flame, Trophy, Target, Zap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import mascoteEdi from "@/assets/mascote-educly.png";

interface EdiMotivationProps {
  type: "almost_done" | "halfway" | "great_job" | "keep_going" | "final_stretch" | "encouragement";
  message?: string;
  onClose?: () => void;
  autoCloseSeconds?: number;
  position?: "center" | "bottom-right" | "bottom-left";
}

const motivationConfig = {
  almost_done: {
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
  },
  halfway: {
    icon: Target,
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
  },
  great_job: {
    icon: Sparkles,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
  },
  keep_going: {
    icon: Flame,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
  },
  final_stretch: {
    icon: Zap,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
  },
  encouragement: {
    icon: Heart,
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
  },
} as const;

export const EdiMotivation = ({
  type,
  message,
  onClose,
  autoCloseSeconds = 5,
  position = "center",
}: EdiMotivationProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const config = motivationConfig[type];
  const Icon = config.icon;

  const defaultMessages: Record<EdiMotivationProps["type"], string> = {
    almost_done: t("lesson.ediMotivation.almostDone", "Falta pouco! Você está quase lá!"),
    halfway: t("lesson.ediMotivation.halfway", "Metade concluída! Continue assim!"),
    great_job: t("lesson.ediMotivation.greatJob", "Excelente trabalho! Você está arrasando!"),
    keep_going: t("lesson.ediMotivation.keepGoing", "Não desista agora! Você consegue!"),
    final_stretch: t("lesson.ediMotivation.finalStretch", "Reta final! Mais um pouquinho!"),
    encouragement: t("lesson.ediMotivation.encouragement", "Eu acredito em você! Vamos juntos!"),
  };

  const displayMessage = message || defaultMessages[type];

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    window.setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (autoCloseSeconds <= 0) return;

    const timer = window.setTimeout(() => {
      handleClose();
    }, autoCloseSeconds * 1000);

    return () => window.clearTimeout(timer);
  }, [autoCloseSeconds, handleClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 animate-in fade-in duration-300",
        isAnimatingOut && "animate-out fade-out duration-300",
        position === "center" && "inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm",
        position === "bottom-right" && "bottom-6 right-6",
        position === "bottom-left" && "bottom-6 left-6"
      )}
      onClick={position === "center" ? handleClose : undefined}
    >
      <div
        className={cn(
          "relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border-2 shadow-xl",
          config.bgColor,
          config.borderColor,
          "animate-in zoom-in-95 slide-in-from-bottom-4 duration-500",
          isAnimatingOut && "animate-out zoom-out-95 slide-out-to-bottom-4"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cn("h-2 bg-gradient-to-r", config.color)} />

        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 transition-colors hover:bg-black/10"
          type="button"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-start gap-4 p-5">
          <div className="relative shrink-0">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-white shadow-lg">
              <img src={mascoteEdi} alt="EDI" className="h-full w-full object-contain" />
            </div>
            <div
              className={cn(
                "absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br shadow-md",
                config.color
              )}
            >
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="flex-1 pt-1">
            <p className="text-lg font-bold leading-snug text-foreground">{displayMessage}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              — EDI, {t("lesson.ediMotivation.yourAssistant", "seu assistente")}
            </p>
          </div>
        </div>

        <div className="absolute left-4 top-4 opacity-20">
          <Sparkles className="h-5 w-5 animate-pulse text-primary" />
        </div>
      </div>
    </div>
  );
};

export const useEdiMotivation = (
  currentStep: number,
  totalSteps: number,
  dayNumber: number = 1,
  enabled: boolean = true
) => {
  const { t } = useTranslation();
  const [shownTypes, setShownTypes] = useState<Set<string>>(new Set());
  const [activeMotivation, setActiveMotivation] = useState<{
    type: EdiMotivationProps["type"];
    show: boolean;
    customMessage?: string;
  } | null>(null);

  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  const getRandomPhrase = useCallback(
    (type: "almostDone" | "halfway" | "finalStretch"): string => {
      const phrases = t(`lesson.ediMotivation.phrases.${type}`, { returnObjects: true });

      if (Array.isArray(phrases) && phrases.length > 0) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
      }

      const fallbackPhrases: Record<string, string[]> = {
        almostDone: [
          "Não desista, continue!",
          "Você está indo muito bem!",
          "Falta pouquinho, você consegue!",
          "Você está arrasando!",
          "Continue firme!",
        ],
        halfway: [
          "Você está mandando bem!",
          "Excelente progresso!",
          "Você é demais!",
          "Continue assim!",
          "Ótimo trabalho até aqui!",
        ],
        finalStretch: [
          "O final está próximo!",
          "Você já chegou tão longe!",
          "Última etapa, vai com tudo!",
          "Finalize com chave de ouro!",
          "Quase na linha de chegada!",
        ],
      };

      const fallback = fallbackPhrases[type] || [];
      const randomIndex = Math.floor(Math.random() * fallback.length);
      return fallback[randomIndex] || "";
    },
    [t]
  );

  const generateCustomMessage = useCallback(
    (type: EdiMotivationProps["type"]): string => {
      const phraseType =
        type === "almost_done" ? "almostDone" : type === "final_stretch" ? "finalStretch" : "halfway";

      const phrase = getRandomPhrase(phraseType);

      const templateKey =
        type === "almost_done" ? "almostDoneDay" : type === "final_stretch" ? "finalStretchDay" : "halfwayDay";

      return t(`lesson.ediMotivation.${templateKey}`, {
        day: dayNumber,
        phrase,
        defaultValue: `Dia ${dayNumber}! ${phrase}`,
      });
    },
    [dayNumber, getRandomPhrase, t]
  );

  useEffect(() => {
    if (!enabled) {
      setActiveMotivation(null);
      return;
    }

    if (progress >= 45 && progress < 55 && !shownTypes.has("halfway")) {
      setShownTypes((prev) => new Set([...prev, "halfway"]));
      setActiveMotivation({
        type: "halfway",
        show: true,
        customMessage: generateCustomMessage("halfway"),
      });
      return;
    }

    if (progress >= 75 && progress < 85 && !shownTypes.has("almost_done")) {
      setShownTypes((prev) => new Set([...prev, "almost_done"]));
      setActiveMotivation({
        type: "almost_done",
        show: true,
        customMessage: generateCustomMessage("almost_done"),
      });
      return;
    }

    if (progress >= 90 && progress < 100 && !shownTypes.has("final_stretch")) {
      setShownTypes((prev) => new Set([...prev, "final_stretch"]));
      setActiveMotivation({
        type: "final_stretch",
        show: true,
        customMessage: generateCustomMessage("final_stretch"),
      });
    }
  }, [enabled, generateCustomMessage, progress, shownTypes]);

  const closeMotivation = () => {
    setActiveMotivation(null);
  };

  const triggerMotivation = (type: EdiMotivationProps["type"]) => {
    setActiveMotivation({
      type,
      show: true,
      customMessage: generateCustomMessage(type),
    });
  };

  return {
    activeMotivation,
    closeMotivation,
    triggerMotivation,
    progress,
  };
};
