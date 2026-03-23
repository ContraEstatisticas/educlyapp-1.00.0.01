import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// AI logos
import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import deepseekLogo from "@/assets/ai-logos/deepseek.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import copilotLogo from "@/assets/ai-logos/copilot.png";
import grokLogo from "@/assets/ai-logos/grok.png";
import perplexityLogo from "@/assets/ai-logos/perplexity.png";
import manusLogo from "@/assets/ai-logos/manus.png";
import lovableLogo from "@/assets/ai-logos/lovable.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";
import leonardoLogo from "@/assets/ai-logos/leonardo.png";
import midjourneyLogo from "@/assets/ai-logos/midjourney.png";
import captionsLogo from "@/assets/ai-logos/captions.png";
import elevenlabsLogo from "@/assets/ai-logos/elevenlabs.png";
import veoLogo from "@/assets/ai-logos/veo.png";

interface TrailContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AI_ITEMS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: chatgptLogo,
    color: "#10a37f",
  },
  {
    id: "claude",
    name: "Claude",
    logo: claudeLogo,
    color: "#8b5cf6",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    logo: deepseekLogo,
    color: "#1e3a8a",
  },
  {
    id: "gemini",
    name: "Gemini",
    logo: geminiLogo,
    color: "#4285f4",
  },
  {
    id: "copilot",
    name: "Copilot",
    logo: copilotLogo,
    color: "#0078d4",
  },
  {
    id: "grok",
    name: "Grok",
    logo: grokLogo,
    color: "#374151",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logo: perplexityLogo,
    color: "#1fb8cd",
  },
  {
    id: "manus",
    name: "Manus",
    logo: manusLogo,
    color: "#ff6b35",
  },
  {
    id: "lovable",
    name: "Lovable",
    logo: lovableLogo,
    color: "#6366f1",
  },
  {
    id: "nanobanana",
    name: "NanoBanana",
    logo: nanobananaLogo,
    color: "#f59e0b",
  },
  {
    id: "leonardo",
    name: "LeonardoAI",
    logo: leonardoLogo,
    color: "#7c3aed",
  },
  {
    id: "midjourney",
    name: "MidJourney",
    logo: midjourneyLogo,
    color: "#6b7280",
  },
  {
    id: "captions",
    name: "Captions",
    logo: captionsLogo,
    color: "#ec4899",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    logo: elevenlabsLogo,
    color: "#f97316",
  },
  {
    id: "veo",
    name: "VEO",
    logo: veoLogo,
    color: "#ea4335",
  },
];

export function TrailContentModal({ open, onOpenChange }: TrailContentModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            {t("trailModal.title")}
          </DialogTitle>
          <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
            {t("trailModal.subtitle")}
          </p>
        </DialogHeader>

        {/* Scrollable grid */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AI_ITEMS.map((ai) => (
              <div
                key={ai.id}
                className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Color accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: ai.color }}
                />

                {/* Logo + days row */}
                <div className="flex items-center justify-between mt-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                    style={{ backgroundColor: `${ai.color}18` }}
                  >
                    <img
                      src={ai.logo}
                      alt={ai.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {t(`trailModal.items.${ai.id}.days`)}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {ai.name}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] mt-0.5 px-1.5 py-0 h-4 border-0 rounded-md font-medium"
                    style={{ backgroundColor: `${ai.color}18`, color: ai.color }}
                  >
                    {t(`trailModal.items.${ai.id}.category`)}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground leading-snug">
                  {t(`trailModal.items.${ai.id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0 bg-muted/30">
          <p className="text-xs text-center text-muted-foreground">
            {t("trailModal.footer")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

