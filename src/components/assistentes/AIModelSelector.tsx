import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import grokLogo from "@/assets/ai-logos/grok.png";
import ediLogo from "@/assets/edi-mascote.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";

export interface AIModel {
  id: string;
  logoSrc: string;
  nameKey: string;
}

export const AI_MODELS: AIModel[] = [
  { id: "edi", logoSrc: ediLogo, nameKey: "assistants.edi.name" },
  { id: "nanobanana", logoSrc: nanobananaLogo, nameKey: "assistants.nanobanana.name" },
  { id: "chatgpt", logoSrc: chatgptLogo, nameKey: "assistants.chatgpt.name" },
  { id: "gemini", logoSrc: geminiLogo, nameKey: "assistants.gemini.name" },
  { id: "claude", logoSrc: claudeLogo, nameKey: "assistants.claude.name" },
  { id: "grok", logoSrc: grokLogo, nameKey: "assistants.grok.name" },
];

interface AIModelSelectorProps {
  activeModel: string;
  onSelect: (modelId: string) => void;
}

export const AIModelSelector = ({ activeModel, onSelect }: AIModelSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto pb-1 pr-1 pl-3 sm:pl-1 no-scrollbar">
      {AI_MODELS.map((model) => {
        const isActive = activeModel === model.id;
        const isNanoBanana = model.id === "nanobanana";

        return (
          <Tooltip key={model.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSelect(model.id)}
                className={cn(
                  "shrink-0 transition-all duration-200",
                  "hover:scale-[1.03] active:scale-95",
                  isNanoBanana
                    ? cn(
                        "h-11 rounded-2xl px-3 flex items-center gap-2.5 border",
                        isActive
                          ? "border-amber-300 bg-gradient-to-r from-amber-100 via-orange-50 to-white shadow-[0_10px_24px_-16px_rgba(251,146,60,0.95)]"
                          : "border-amber-100 bg-gradient-to-r from-amber-50 to-white hover:border-amber-200",
                      )
                    : cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center p-1.5",
                        isActive
                          ? "ring-2 ring-primary bg-primary/10 shadow-sm"
                          : "bg-muted/50 hover:bg-muted opacity-60 hover:opacity-100",
                      ),
                )}
              >
                <div className={cn(
                  "flex items-center justify-center overflow-hidden",
                  isNanoBanana
                    ? "h-8 w-8 rounded-xl bg-amber-500/10 p-1"
                    : "h-full w-full rounded-lg",
                )}>
                  <img
                    src={model.logoSrc}
                    alt={t(model.nameKey)}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {isNanoBanana && (
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {t(model.nameKey)}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-amber-700/80 mt-1">
                      {t("assistants.nanobanana.pillLabel")}
                    </p>
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {t(model.nameKey)}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
