import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, MessageSquare, Sparkles } from "lucide-react";

import { getPromptLibraryUiCopy } from "@/components/assistentes/promptLibraryData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ediLogo from "@/assets/edi-mascote.png";

interface AISidebarProps {
  activeSection: "chat" | "library";
  onSectionChange: (section: "chat" | "library") => void;
  usageToday: number;
  imagesUsed: number;
  messageLimit: number;
  imageLimit: number;
}

export const AISidebar = ({
  activeSection,
  onSectionChange,
  usageToday,
  imagesUsed,
  messageLimit,
  imageLimit,
}: AISidebarProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const promptLibraryUiCopy = getPromptLibraryUiCopy(i18n.resolvedLanguage || i18n.language);

  return (
    <div className="w-[220px] h-full flex flex-col border-r border-border bg-card/50">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="font-bold text-foreground text-sm">
            {t("assistants.title")}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            {t("assistants.sidebar.specialistLabel")}
          </p>

          <button
            onClick={() => onSectionChange("chat")}
            className={cn(
              "w-full rounded-2xl border p-3 text-left transition-all",
              activeSection === "chat"
                ? "border-primary/30 bg-primary/10 shadow-sm"
                : "border-border bg-card hover:border-primary/20 hover:bg-muted/50",
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 p-1.5">
                <img src={ediLogo} alt="EDI" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">EDI</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {t("assistants.edi.description")}
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="space-y-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            {t("assistants.sidebar.resourcesLabel")}
          </p>

          <button
            onClick={() => onSectionChange("library")}
            className={cn(
              "w-full rounded-2xl border p-3 text-left transition-all",
              activeSection === "library"
                ? "border-orange-300/70 bg-gradient-to-br from-orange-100 via-amber-50 to-white shadow-[0_16px_34px_-24px_rgba(251,146,60,0.95)]"
                : "border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:border-orange-200 hover:shadow-[0_12px_30px_-24px_rgba(251,146,60,0.85)]",
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {promptLibraryUiCopy.librarySectionTitle}
                  </span>
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-600">
                    Pro
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {promptLibraryUiCopy.librarySectionDescription}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3" />
              {t("assistants.rateLimit.counter")}
            </span>
            <span className="font-medium text-foreground">
              {Math.round((usageToday / Math.max(messageLimit, 1)) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min((usageToday / messageLimit) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span className="inline-flex items-center gap-1.5">
              <Image className="w-3 h-3" />
              {t("assistants.sidebar.imagesLabel")}
            </span>
            <span className="font-medium text-foreground">
              {Math.round((imagesUsed / Math.max(imageLimit, 1)) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${Math.min((imagesUsed / imageLimit) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
