import { useEffect, useState } from "react";
import { ArrowRight, Bot, BrainCircuit, Rocket, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { AiExperienceLevel } from "@/lib/aiExperienceLevel";

interface AiExperienceLevelDialogProps {
  open: boolean;
  userId: string;
  defaultLevel?: AiExperienceLevel | null;
  onCompleted: (selectedLevel: AiExperienceLevel) => void;
}

export const AiExperienceLevelDialog = ({
  open,
  userId,
  defaultLevel,
  onCompleted,
}: AiExperienceLevelDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedLevel, setSelectedLevel] = useState<AiExperienceLevel | null>(defaultLevel || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelectedLevel(defaultLevel || null);
    setIsSaving(false);
  }, [defaultLevel, open]);

  const handleSave = async () => {
    if (!selectedLevel) return;

    setIsSaving(true);

    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("profiles")
        .update({
          ai_experience_level: selectedLevel,
          ai_experience_level_updated_at: now,
          updated_at: now,
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: t("aiExperienceLevel.successTitle", { defaultValue: "Resposta salva" }),
        description: t("aiExperienceLevel.successDescription", {
          defaultValue: "Obrigado! Seu nível de familiaridade com IA foi registrado.",
        }),
      });

      onCompleted(selectedLevel);
    } catch (error) {
      console.error("[AiExperienceLevelDialog] Failed to save AI experience level:", error);
      toast({
        title: t("aiExperienceLevel.errorTitle", { defaultValue: "Nao foi possivel salvar" }),
        description: t("aiExperienceLevel.errorDescription", {
          defaultValue: "Tente novamente em alguns instantes.",
        }),
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  const options: Array<{
    value: AiExperienceLevel;
    title: string;
    description: string;
    icon: typeof Bot;
    accentClass: string;
    iconWrapClass: string;
  }> = [
    {
      value: "none",
      title: t("aiExperienceLevel.noneTitle", { defaultValue: "Nao sei nada de IA" }),
      description: t("aiExperienceLevel.noneDescription", {
        defaultValue: "Estou comecando agora e ainda nao tive contato pratico com ferramentas de IA.",
      }),
      icon: Bot,
      accentClass: "from-slate-500/14 via-background to-background",
      iconWrapClass: "bg-slate-500/12 text-slate-700 dark:text-slate-200",
    },
    {
      value: "some",
      title: t("aiExperienceLevel.someTitle", {
        defaultValue: "Ja usei ChatGPT ou outra IA algumas vezes",
      }),
      description: t("aiExperienceLevel.someDescription", {
        defaultValue: "Ja fiz testes e pedidos simples, mas ainda estou descobrindo como usar melhor.",
      }),
      icon: Sparkles,
      accentClass: "from-sky-500/16 via-background to-background",
      iconWrapClass: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    },
    {
      value: "intermediate",
      title: t("aiExperienceLevel.intermediateTitle", { defaultValue: "Intermediario" }),
      description: t("aiExperienceLevel.intermediateDescription", {
        defaultValue: "Uso IA com frequencia para estudar, trabalhar ou acelerar tarefas do dia a dia.",
      }),
      icon: BrainCircuit,
      accentClass: "from-primary/18 via-background to-background",
      iconWrapClass: "bg-primary/12 text-primary",
    },
    {
      value: "advanced",
      title: t("aiExperienceLevel.advancedTitle", { defaultValue: "Avancado" }),
      description: t("aiExperienceLevel.advancedDescription", {
        defaultValue: "Ja domino ferramentas, tecnicas de prompting e fluxos mais estrategicos com IA.",
      }),
      icon: Rocket,
      accentClass: "from-emerald-500/16 via-background to-background",
      iconWrapClass: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    },
  ];

  const renderInnerContent = (
    TitleComponent: typeof DialogTitle | typeof DrawerTitle,
    DescriptionComponent: typeof DialogDescription | typeof DrawerDescription,
  ) => (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-primary/12 via-background to-sky-500/10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-sky-500 to-primary" />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-4 sm:px-6 md:px-8 md:pt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t("aiExperienceLevel.badge", { defaultValue: "Pergunta rapida" })}
        </div>

        <div className="mt-5 space-y-3 text-left">
          <TitleComponent className="max-w-2xl text-2xl font-bold leading-tight text-foreground md:text-3xl">
            {t("aiExperienceLevel.title", { defaultValue: "Qual o seu nivel de familiaridade com IA?" })}
          </TitleComponent>
          <DescriptionComponent className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("aiExperienceLevel.description", {
              defaultValue:
                "Queremos entender melhor cada aluno para adaptar a experiencia da plataforma e analisar o perfil da nossa comunidade.",
            })}
          </DescriptionComponent>
        </div>

        <div className="mt-5 rounded-2xl border border-border/60 bg-background/75 p-4 text-sm leading-relaxed text-muted-foreground">
          {t("aiExperienceLevel.helper", {
            defaultValue: "Essa resposta e obrigatoria para continuar e leva apenas alguns segundos.",
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedLevel === option.value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={isSaving}
                onClick={() => setSelectedLevel(option.value)}
                className={`group relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/8 shadow-[0_16px_38px_rgba(249,115,22,0.16)]"
                    : "border-border/60 bg-background/75 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg"
                }`}
              >
                {isSelected ? (
                  <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary-foreground">
                    {t("aiExperienceLevel.selectedLabel", { defaultValue: "Selecionado" })}
                  </div>
                ) : null}

                <div className={`rounded-[1.35rem] border border-border/50 bg-gradient-to-br ${option.accentClass} p-5`}>
                  <div className="flex min-h-[180px] flex-col justify-between rounded-[1.15rem] border border-border/50 bg-background/85 p-5">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${option.iconWrapClass}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="mt-6">
                      <p className="text-lg font-bold text-foreground">{option.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
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
          disabled={isSaving || !selectedLevel}
          className="h-12 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
        >
          {isSaving
            ? t("aiExperienceLevel.savingButton", { defaultValue: "Salvando..." })
            : t("aiExperienceLevel.confirmButton", { defaultValue: "Continuar" })}
          {!isSaving ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} dismissible={false} handleOnly shouldScaleBackground={false}>
        <DrawerContent className="max-h-[92dvh] rounded-t-[2rem] border-border bg-card p-0 focus:outline-none">
          {renderInnerContent(DrawerTitle, DrawerDescription)}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-h-[calc(100dvh-1rem)] max-w-3xl overflow-hidden rounded-[2rem] border-border bg-card p-0 shadow-2xl sm:max-h-[calc(100dvh-2rem)] [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)]">
          {renderInnerContent(DialogTitle, DialogDescription)}
        </div>
      </DialogContent>
    </Dialog>
  );
};
