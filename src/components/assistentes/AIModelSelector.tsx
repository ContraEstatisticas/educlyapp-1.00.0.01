import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import grokLogo from "@/assets/ai-logos/grok.png";
import ediLogo from "@/assets/edi-mascote.png";

export interface AIModel {
  id: string;
  logoSrc: string;
  nameKey: string;
}

export const AI_MODELS: AIModel[] = [
  { id: "chatgpt", logoSrc: chatgptLogo, nameKey: "assistants.chatgpt.name" },
  { id: "gemini", logoSrc: geminiLogo, nameKey: "assistants.gemini.name" },
  { id: "claude", logoSrc: claudeLogo, nameKey: "assistants.claude.name" },
  { id: "grok", logoSrc: grokLogo, nameKey: "assistants.grok.name" },
  { id: "edi", logoSrc: ediLogo, nameKey: "assistants.edi.name" },
];

interface AIModelSelectorProps {
  activeModel: string;
  onSelect: (modelId: string) => void;
}

export const AIModelSelector = ({ activeModel, onSelect }: AIModelSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1.5">
      {AI_MODELS.map((model) => (
        <Tooltip key={model.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => onSelect(model.id)}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center p-1.5 transition-all duration-200",
                "hover:scale-110 active:scale-95",
                activeModel === model.id
                  ? "ring-2 ring-primary bg-primary/10 shadow-sm"
                  : "bg-muted/50 hover:bg-muted opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={model.logoSrc}
                alt={t(model.nameKey)}
                className="w-full h-full object-contain rounded-lg"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {t(model.nameKey)}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
