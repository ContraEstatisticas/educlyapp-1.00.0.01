import { ArrowRight, BriefcaseBusiness, Loader2, Sparkles, TriangleAlert, WandSparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BigActionState } from "@/lib/bigAction";
import {
  getBigActionUiCopy,
  getLocalizedBigActionSourceCopy,
  getLocalizedProfessionalArea,
} from "@/lib/bigActionI18n";

interface BigActionBannerProps {
  bigAction: BigActionState | null;
  onOpen: () => void;
}

export const BigActionBanner = ({ bigAction, onOpen }: BigActionBannerProps) => {
  const { i18n } = useTranslation();
  const activeBigAction = bigAction?.activeBigAction;

  if (!activeBigAction) {
    return null;
  }

  const language = i18n.resolvedLanguage || i18n.language;
  const ui = getBigActionUiCopy(language);
  const statusCopy = ui.statusCopy[activeBigAction.status as keyof typeof ui.statusCopy];

  if (!statusCopy) {
    return null;
  }

  const isGenerating = activeBigAction.status === "pending_generation";
  const hasError = activeBigAction.status === "generation_error";
  const sourceCopy = getLocalizedBigActionSourceCopy(activeBigAction.progress_source, language);
  const professionalArea = getLocalizedProfessionalArea(activeBigAction.professional_area, language);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(255,255,255,0.96))] p-5 shadow-sm dark:bg-[linear-gradient(135deg,rgba(249,115,22,0.18),rgba(15,23,42,0.96))]">
      <div className="absolute -right-12 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <Badge className="border-0 bg-primary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary hover:bg-primary/12">
            {hasError ? <TriangleAlert className="mr-1.5 h-3.5 w-3.5" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
            {statusCopy.badge}
          </Badge>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            {statusCopy.title}
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {statusCopy.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {professionalArea ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" />
                {professionalArea}
              </span>
            ) : null}

            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground">
              <WandSparkles className="h-3.5 w-3.5 text-primary" />
              {sourceCopy.shortLabel}
            </span>
          </div>
        </div>

        <Button onClick={onOpen} className="h-12 px-6 text-sm font-semibold shadow-sm">
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
          {statusCopy.button}
        </Button>
      </div>
    </section>
  );
};
