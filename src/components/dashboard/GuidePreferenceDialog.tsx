import { useEffect, useState } from "react";
import { ArrowRight, Bot, GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type GuideChoice = "robot" | "edi";

const robotGuideImage = new URL("../../../assets/robo_logo.png", import.meta.url).href;
const ediGuideImage = new URL("../../../assets/mascote-professor.png", import.meta.url).href;

interface GuidePreferenceDialogProps {
  open: boolean;
  userId: string;
  defaultGuide?: GuideChoice | null;
  onCompleted: (selectedGuide: GuideChoice) => void;
}

export const GuidePreferenceDialog = ({
  open,
  userId,
  defaultGuide,
  onCompleted,
}: GuidePreferenceDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedGuide, setSelectedGuide] = useState<GuideChoice | null>(defaultGuide || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelectedGuide(defaultGuide || null);
    setIsSaving(false);
  }, [defaultGuide, open]);

  const handleSave = async () => {
    if (!selectedGuide) return;

    setIsSaving(true);

    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("profiles")
        .update({
          preferred_guide: selectedGuide,
          guide_preference_completed: true,
          guide_preference_updated_at: now,
          updated_at: now,
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: t("guidePreference.successTitle", { defaultValue: "Preference saved" }),
        description: t("guidePreference.successDescription", {
          defaultValue: "Thanks! Your answer has been recorded successfully.",
        }),
      });

      onCompleted(selectedGuide);
    } catch (error) {
      console.error("[GuidePreferenceDialog] Failed to save guide preference:", error);
      toast({
        title: t("guidePreference.errorTitle", { defaultValue: "Could not save your answer" }),
        description: t("guidePreference.errorDescription", {
          defaultValue: "Please try again in a moment.",
        }),
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  const options: Array<{
    value: GuideChoice;
    name: string;
    description: string;
    image: string;
    icon: typeof Bot;
    accentClass: string;
    iconWrapClass: string;
    imageClassName: string;
  }> = [
    {
      value: "robot",
      name: t("guidePreference.robotName", { defaultValue: "Robot" }),
      description: t("guidePreference.robotDescription", {
        defaultValue: "A more futuristic, direct and technological guide.",
      }),
      image: robotGuideImage,
      icon: Bot,
      accentClass: "from-cyan-500/16 via-sky-500/10 to-background",
      iconWrapClass: "bg-cyan-500/12 text-cyan-600",
      imageClassName: "h-full w-full object-contain scale-[1.04]",
    },
    {
      value: "edi",
      name: t("guidePreference.ediName", { defaultValue: "EDI Owl" }),
      description: t("guidePreference.ediDescription", {
        defaultValue: "A warmer guide with a teacher vibe, ready to support the journey.",
      }),
      image: ediGuideImage,
      icon: GraduationCap,
      accentClass: "from-primary/18 via-orange-500/10 to-background",
      iconWrapClass: "bg-primary/12 text-primary",
      imageClassName: "h-full w-full object-contain scale-[1.08]",
    },
  ];

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-h-[calc(100dvh-1rem)] max-w-3xl overflow-hidden rounded-[2rem] border-border bg-card p-0 shadow-2xl sm:max-h-[calc(100dvh-2rem)] [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="relative flex max-h-[calc(100dvh-1rem)] flex-col overflow-hidden bg-gradient-to-br from-primary/12 via-background to-blue-500/10 sm:max-h-[calc(100dvh-2rem)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-cyan-500 to-primary" />

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-6 sm:px-6 md:px-8 md:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {t("guidePreference.badge", { defaultValue: "Quick poll" })}
            </div>

            <DialogHeader className="mt-5 space-y-3 text-left">
              <DialogTitle className="max-w-2xl text-2xl font-bold leading-tight text-foreground md:text-3xl">
                {t("guidePreference.title", { defaultValue: "Which guide would you prefer?" })}
              </DialogTitle>
              <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("guidePreference.description", {
                  defaultValue:
                    "We want to understand which guide style fits you best inside Educly.",
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground">
              {t("guidePreference.helper", {
                defaultValue:
                  "Your answer will be saved so we can analyze user preference and decide the future official guide of the platform.",
              })}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedGuide === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isSaving}
                    onClick={() => setSelectedGuide(option.value)}
                    className={`
                      group relative overflow-hidden rounded-[1.75rem] border p-4 text-left transition-all duration-200
                      ${
                        isSelected
                          ? "border-primary bg-primary/8 shadow-[0_16px_38px_rgba(249,115,22,0.16)]"
                          : "border-border/60 bg-background/75 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg"
                      }
                    `}
                  >
                    {isSelected ? (
                      <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground">
                        {t("guidePreference.selectedLabel", { defaultValue: "Selected" })}
                      </div>
                    ) : null}

                    <div
                      className={`rounded-[1.5rem] border border-border/50 bg-gradient-to-br ${option.accentClass} p-4`}
                    >
                      <div className="flex min-h-[230px] items-center justify-center rounded-[1.25rem] border border-border/50 bg-background/85 p-4">
                        <img
                          src={option.image}
                          alt={option.name}
                          className={option.imageClassName}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <div
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${option.iconWrapClass}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg font-bold text-foreground">{option.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border/60 bg-background/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur sm:p-6 sm:pb-6">
            <Button
              onClick={handleSave}
              disabled={isSaving || !selectedGuide}
              className="h-12 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
            >
              {isSaving
                ? t("guidePreference.savingButton", { defaultValue: "Saving..." })
                : t("guidePreference.confirmButton", { defaultValue: "Confirm choice" })}
              {!isSaving ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
