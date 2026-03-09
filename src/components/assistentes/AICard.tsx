import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AICardProps {
  id: string;
  cardId?: string;
  logoSrc: string;
  gradient: { from: string; to: string };
  onClick: () => void;
  delay?: number;
  badge?: string;
}

const AI_TRANSLATIONS: Record<string, { nameKey: string; descKey: string }> = {
  chatgpt: { nameKey: "assistants.chatgpt.name", descKey: "assistants.chatgpt.description" },
  gemini: { nameKey: "assistants.gemini.name", descKey: "assistants.gemini.description" },
  nanobanana: { nameKey: "assistants.nanobanana.name", descKey: "assistants.nanobanana.description" },
  grok: { nameKey: "assistants.grok.name", descKey: "assistants.grok.description" },
  claude: { nameKey: "assistants.claude.name", descKey: "assistants.claude.description" },
  edi: { nameKey: "assistants.edi.name", descKey: "assistants.edi.description" },
};

export const AICard = ({ id, cardId, logoSrc, gradient, onClick, delay = 0, badge }: AICardProps) => {
  const { t } = useTranslation();
  const keys = AI_TRANSLATIONS[id] || AI_TRANSLATIONS.chatgpt;

  return (
    <div
      id={cardId}
      className={cn(
        "relative overflow-hidden rounded-xl p-5 cursor-pointer",
        "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        "animate-fade-in"
      )}
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        animationDelay: `${delay * 100}ms`,
      }}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full blur-2xl" />
      </div>

      <div className="relative flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 p-1.5">
          <img src={logoSrc} alt={t(keys.nameKey)} className="w-full h-full object-contain rounded-lg" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">
              {t(keys.nameKey)}
            </h3>
            {badge && (
              <Badge variant="secondary" className="bg-white/25 text-white border-0 text-[10px] px-1.5 py-0">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-white/80 text-sm line-clamp-2">
            {t(keys.descKey)}
          </p>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
