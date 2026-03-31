import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Award, CheckCircle2, ChevronRight, Lock, Loader2, Map, Play, RotateCcw, Sparkles, Target, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUserLevel, XP_REWARDS } from "@/hooks/useUserLevel";
import { aiMasteryTrailsBySlug } from "@/lib/aiMasteryTrails";
import { useTranslation } from "react-i18next";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";
import { getAiTrailContent, isAiTrailLive } from "@/lib/aiTrailContent";
import { claimAiTrailCompletionXp, isAiTrailXpEligible } from "@/lib/aiTrailRewards";
import { DaysProgressBar } from "@/components/lesson/DaysProgressBar";
import { cn } from "@/lib/utils";
import { useAiTrailProgress } from "@/hooks/useAiTrailProgress";


const PAGE_UI = {
  pt: {
    summaryBadge: "Mapa da trilha",
    summaryTitle: "Trilha ativa",
    summaryDescription: "Clique em um modulo para abrir a aula completa, em tela propria, como no desafio principal.",
    focusLabel: "Modulo atual",
    routeLabel: "Rota visual",
    jumpLabel: "Os modulos abrem em tela propria. O mapa abaixo so organiza a sequencia e o progresso.",
    lockedToastTitle: "Modulo bloqueado",
    lockedToastDescription: "Conclua o modulo anterior para liberar o proximo passo da trilha.",
    continueTitle: "Continue a trilha",
    continueDescription: "Abra o proximo modulo e siga a experiencia guiada passo a passo.",
    continueButton: "Abrir modulo",
    completedButton: "Revisar modulo",
    doneBadge: "Concluida",
    currentPointTitle: "Retome do ponto atual",
    currentPointDescription: "Recentralize o mapa no modulo onde voce parou e siga sem procurar manualmente.",
    jumpToCurrentButton: "Voltar ao modulo atual",
    summaryBeforeLesson: "Resumo antes da aula",
    summaryOutcomeLabel: "Voce vai sair com",
    miniMapTitle: "Mini-mapa da trilha",
    miniMapDescription: "Todos os modulos visiveis para voce retomar sem perder contexto.",
    currentBadge: "Agora",
    readyBadge: "Disponivel",
    upcomingBadge: "Bloqueado",
    fixedStepLabel: "Proximo passo",
  },
  en: {
    summaryBadge: "Trail map",
    summaryTitle: "Trail live",
    summaryDescription: "Click a module to open the full lesson on its own screen, just like the main challenge.",
    focusLabel: "Current module",
    routeLabel: "Visual route",
    jumpLabel: "Modules open on their own lesson screen. The map below only organizes sequence and progress.",
    lockedToastTitle: "Module locked",
    lockedToastDescription: "Finish the previous module to unlock the next step of the trail.",
    continueTitle: "Keep going",
    continueDescription: "Open the next module and continue the guided experience step by step.",
    continueButton: "Open module",
    completedButton: "Review module",
    doneBadge: "Completed",
    currentPointTitle: "Return to your current point",
    currentPointDescription: "Recenter the map on the module you paused and keep the guided path in view.",
    jumpToCurrentButton: "Back to current module",
    summaryBeforeLesson: "Summary before lesson",
    summaryOutcomeLabel: "You will leave with",
    miniMapTitle: "Trail mini-map",
    miniMapDescription: "Every module visible so you can resume without losing context.",
    currentBadge: "Now",
    readyBadge: "Ready",
    upcomingBadge: "Locked",
    fixedStepLabel: "Next step",
  },
  es: {
    summaryBadge: "Mapa de la ruta",
    summaryTitle: "Ruta activa",
    summaryDescription: "Haz clic en un modulo para abrir la leccion completa en su propia pantalla, igual que el desafio principal.",
    focusLabel: "Modulo actual",
    routeLabel: "Ruta visual",
    jumpLabel: "Los modulos se abren en su propia pantalla. El mapa solo organiza la secuencia y el progreso.",
    lockedToastTitle: "Modulo bloqueado",
    lockedToastDescription: "Completa el modulo anterior para desbloquear el siguiente paso de la ruta.",
    continueTitle: "Sigue la ruta",
    continueDescription: "Abre el siguiente modulo y continua la experiencia guiada paso a paso.",
    continueButton: "Abrir modulo",
    completedButton: "Revisar modulo",
    doneBadge: "Completada",
    currentPointTitle: "Retoma desde tu punto actual",
    currentPointDescription: "Recentra el mapa en el modulo donde te quedaste y sigue sin buscar manualmente.",
    jumpToCurrentButton: "Volver al modulo actual",
    summaryBeforeLesson: "Resumen antes de la leccion",
    summaryOutcomeLabel: "Vas a salir con",
    miniMapTitle: "Mini mapa de la ruta",
    miniMapDescription: "Todos los modulos visibles para que retomes sin perder el contexto.",
    currentBadge: "Ahora",
    readyBadge: "Disponible",
    upcomingBadge: "Bloqueado",
    fixedStepLabel: "Siguiente paso",
  },
  fr: {
    summaryBadge: "Carte du parcours",
    summaryTitle: "Parcours actif",
    summaryDescription: "Clique sur un module pour ouvrir la lecon complete sur son propre ecran, comme dans le defi principal.",
    focusLabel: "Module actuel",
    routeLabel: "Route visuelle",
    jumpLabel: "Les modules s'ouvrent sur leur propre ecran. La carte organise seulement la sequence et la progression.",
    lockedToastTitle: "Module verrouille",
    lockedToastDescription: "Termine le module precedent pour debloquer la suite du parcours.",
    continueTitle: "Continuer le parcours",
    continueDescription: "Ouvre le prochain module et poursuis l'experience guidee etape par etape.",
    continueButton: "Ouvrir le module",
    completedButton: "Revoir le module",
    doneBadge: "Termine",
    currentPointTitle: "Reprends a ton point actuel",
    currentPointDescription: "Recentre la carte sur le module ou tu t'es arrete et garde le parcours guide sous les yeux.",
    jumpToCurrentButton: "Revenir au module actuel",
    summaryBeforeLesson: "Resume avant la lecon",
    summaryOutcomeLabel: "Tu repars avec",
    miniMapTitle: "Mini-carte du parcours",
    miniMapDescription: "Tous les modules visibles pour reprendre sans perdre le contexte.",
    currentBadge: "Maintenant",
    readyBadge: "Disponible",
    upcomingBadge: "Verrouille",
    fixedStepLabel: "Etape suivante",
  },
} as const;

type SupportedPageLanguage = keyof typeof PAGE_UI;

const getPageUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as SupportedPageLanguage | undefined;
  return PAGE_UI[base || "en"] || PAGE_UI.en;
};

const TrailSummaryCard = ({
  trailName,
  totalModules,
  currentModuleNumber,
  focusLabel,
  summaryBadge,
  summaryTitle,
  summaryDescription,
  accent,
}: {
  trailName: string;
  totalModules: number;
  currentModuleNumber: number;
  focusLabel: string;
  summaryBadge: string;
  summaryTitle: string;
  summaryDescription: string;
  accent: string;
}) => {
  const focusProgress = totalModules > 0 ? Math.round((currentModuleNumber / totalModules) * 100) : 0;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:shadow-lg">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: `${accent}18` }} />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg ring-4 ring-primary/10"
            style={{ background: `linear-gradient(180deg, ${accent}, ${accent}cc)` }}
          >
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <Sparkles className="absolute -right-1 -top-1 h-5 w-5 animate-pulse" style={{ color: accent }} />
        </div>

        <div className="space-y-1">
          <span
            className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: `${accent}18`, color: accent }}
          >
            {summaryBadge}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{summaryTitle}</h2>
          <p className="text-xs font-medium text-muted-foreground">{trailName}</p>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${focusProgress}%`, background: `linear-gradient(90deg, ${accent}, ${accent}cc)` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {focusLabel}: {currentModuleNumber}/{totalModules}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{summaryDescription}</p>
      </div>
    </div>
  );
};

const AIToolTrailPage = () => {
  const navigate = useNavigate();
  const { toolSlug } = useParams();
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const { addXPAsync } = useUserLevel();

  const language = i18n.resolvedLanguage || i18n.language;
  const pageUi = getPageUi(language);
  const aiTrailUi = getAiTrailUiCopy(language);
  const trail = useMemo(() => (toolSlug ? aiMasteryTrailsBySlug[toolSlug] : null), [toolSlug]);
  const trailMeta = getAiTrailLocalizedMeta(toolSlug || "", language);
  const trailContent = useMemo(() => (toolSlug ? getAiTrailContent(toolSlug, language) : null), [language, toolSlug]);
  const isLive = trail ? isAiTrailLive(trail.slug) : false;
  const totalModules = trailContent?.modules.length || 0;
  const {
    completedModules,
    currentModuleNumber,
    isModuleUnlocked,
    isLoading: isProgressLoading,
  } = useAiTrailProgress(trail?.slug, totalModules);

  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const trailXpCheckedRef = useRef(false);
  const currentModuleRef = useRef<HTMLDivElement>(null);

  const allDone = completedModules.length >= totalModules && totalModules > 0;

  const scrollToCurrentModule = () => {
    currentModuleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    trailXpCheckedRef.current = false;
  }, [toolSlug]);

  useEffect(() => {
    if (!toolSlug || !trail || !allDone || trailXpCheckedRef.current || !isAiTrailXpEligible(toolSlug)) {
      return;
    }

    trailXpCheckedRef.current = true;

    void claimAiTrailCompletionXp({
      slug: toolSlug,
      totalModules,
      completedModules,
      xpAmount: XP_REWARDS.AI_TRAIL_COMPLETE,
      reason: `${aiTrailUi.xpRewardReason}: ${trail.name}`,
      awardXP: addXPAsync,
    }).catch((error) => {
      console.error("Failed to award AI trail completion XP:", error);
    });
  }, [addXPAsync, aiTrailUi.xpRewardReason, allDone, completedModules, toolSlug, totalModules, trail]);

  const {
    data: existingCertificate,
    isLoading: isCertificateLoading,
    refetch: refetchCert,
  } = useQuery({
    queryKey: ["trail-certificate", toolSlug],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("user_certificates")
        .select("id")
        .eq("user_id", user.id)
        .eq("tool_slug", toolSlug!)
        .eq("certificate_type", "trail_completion")
        .maybeSingle();
      return data;
    },
    enabled: allDone && !!toolSlug,
  });

  const handleGenerateTrailCertificate = async () => {
    if (!toolSlug || !allDone) return;
    setIsGeneratingCert(true);
    try {
      if (existingCertificate?.id) {
        navigate(`/certificado/${existingCertificate.id}`);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const fullName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";

      const { data: certId, error } = await supabase.rpc("generate_trail_certificate", {
        p_tool_slug: toolSlug,
        p_user_full_name: fullName,
      });

      if (error) {
        console.error("Trail certificate error:", error);
        toast({ title: aiTrailUi.certificateError, description: error.message, variant: "destructive" as const });
        return;
      }

      if (certId) {
        await refetchCert();
        navigate(`/certificado/${certId}`);
      } else {
        toast({ title: aiTrailUi.certificateError, description: aiTrailUi.certificateIncomplete, variant: "destructive" as const });
      }
    } catch (err) {
      console.error("Trail certificate error:", err);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [toolSlug]);

  useEffect(() => {
    if (!trail || !isLive || !trailContent) return;

    const timeout = window.setTimeout(() => {
      scrollToCurrentModule();
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [allDone, currentModuleNumber, isLive, toolSlug, trail, trailContent]);

  const handleOpenModule = (moduleNumber: number) => {
    if (!toolSlug || !trailContent) return;

    if (!isModuleUnlocked(moduleNumber)) {
      toast({
        title: pageUi.lockedToastTitle,
        description: pageUi.lockedToastDescription,
      });
      return;
    }

    navigate(`/trilhas-ia/${toolSlug}/modulo/${moduleNumber}`);
  };

  if (trail && isLive && trailContent && isProgressLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (trail && isLive && trailContent) {
    const allCompleted = completedModules.length >= totalModules;
    const focusModuleNumber = allCompleted ? totalModules : currentModuleNumber;
    const focusModule = trailContent.modules[focusModuleNumber - 1];
    const ROW_HEIGHT = 180;
    const START_Y_OFFSET = 60;
    const VIEWBOX_WIDTH = 400;
    const CENTER_X = VIEWBOX_WIDTH / 2;
    const OFFSET_X = 84;
    const svgHeight = totalModules * ROW_HEIGHT + START_Y_OFFSET + 80;
    const successColor = "hsl(var(--success))";
    const successGlowColor = "hsl(var(--success) / 0.28)";
    const baseRouteGlowColor = "hsl(var(--border) / 0.9)";
    const baseRouteColor = "hsl(var(--muted-foreground) / 0.38)";

    const buildRoutePath = (moduleCount: number) =>
      trailContent.modules
        .slice(0, moduleCount)
        .map((_, index, list) => {
          if (index === list.length - 1) return "";
          const startY = START_Y_OFFSET + index * ROW_HEIGHT + 40;
          const endY = START_Y_OFFSET + (index + 1) * ROW_HEIGHT + 40;
          const isEven = index % 2 === 0;
          const startX = isEven ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X;
          const endX = isEven ? CENTER_X + OFFSET_X : CENTER_X - OFFSET_X;
          return `M ${startX} ${startY} C ${startX} ${startY + 80}, ${endX} ${endY - 80}, ${endX} ${endY}`;
        })
        .join(" ");

    const fullRoutePath = buildRoutePath(totalModules);
    const completedRoutePath = focusModuleNumber > 1 ? buildRoutePath(focusModuleNumber) : "";

    const modulesWithStatus = trailContent.modules.map((module) => {
      const isCompleted = completedModules.includes(module.number);
      const isCurrent = !allCompleted && module.number === currentModuleNumber;
      const isUnlocked = isModuleUnlocked(module.number);

      return {
        ...module,
        status: isCompleted ? "completed" : isCurrent ? "current" : isUnlocked ? "unlocked" : "locked",
      } as const;
    });

    return (
      <div className="min-h-screen bg-background safe-area-inset relative">
        <header className="sticky top-safe z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="hover:bg-primary/10">
                <ArrowLeft className="text-foreground" />
              </Button>
              <div>
                <h1 className="font-semibold text-sm sm:text-base truncate text-foreground">{trail.name}</h1>
                <p className="text-xs text-muted-foreground">
                  {focusModuleNumber}/{totalModules} {trailContent.moduleLabel.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="relative max-w-4xl mx-auto px-4 py-6 pb-[calc(12rem+env(safe-area-inset-bottom,0px))] md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                <TrailSummaryCard
                  trailName={trail.name}
                  totalModules={totalModules}
                  currentModuleNumber={focusModuleNumber}
                  focusLabel={pageUi.focusLabel}
                  summaryBadge={pageUi.summaryBadge}
                  summaryTitle={pageUi.summaryTitle}
                  summaryDescription={pageUi.summaryDescription}
                  accent={trail.accent}
                />

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {pageUi.routeLabel}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-foreground">{pageUi.currentPointTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{pageUi.currentPointDescription}</p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full justify-between rounded-2xl border-border/70"
                    onClick={scrollToCurrentModule}
                  >
                    {pageUi.jumpToCurrentButton}
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:hidden space-y-6 mb-6">
                <TrailSummaryCard
                  trailName={trail.name}
                  totalModules={totalModules}
                  currentModuleNumber={focusModuleNumber}
                  focusLabel={pageUi.focusLabel}
                  summaryBadge={pageUi.summaryBadge}
                  summaryTitle={pageUi.summaryTitle}
                  summaryDescription={pageUi.summaryDescription}
                  accent={trail.accent}
                />

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {pageUi.routeLabel}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-foreground">{pageUi.currentPointTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{pageUi.currentPointDescription}</p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full justify-between rounded-2xl border-border/70"
                    onClick={scrollToCurrentModule}
                  >
                    {pageUi.jumpToCurrentButton}
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ backgroundColor: `${trail.accent}15`, color: trail.accent }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {pageUi.routeLabel}
                    </div>
                    <h3 className="mt-3 text-2xl font-bold text-foreground">{trail.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{pageUi.jumpLabel}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="border-0 bg-muted text-foreground">
                      {allCompleted ? pageUi.doneBadge : trailContent.statusBadge}
                    </Badge>
                    <Badge variant="outline" className="border-border/60 bg-background text-foreground">
                      {trailMeta.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {allDone ? (
                <div className="mb-6 rounded-3xl border border-success/25 bg-[linear-gradient(135deg,rgba(34,197,94,0.08),rgba(255,255,255,0))] p-5 shadow-sm">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-success">
                        <Award className="h-3.5 w-3.5" />
                        {aiTrailUi.doneBadge}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-foreground">{aiTrailUi.certificateTitle}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {aiTrailUi.certificateDescription}
                      </p>
                    </div>

                    <Button
                      onClick={handleGenerateTrailCertificate}
                      disabled={isGeneratingCert || isCertificateLoading}
                      className="h-12 px-6 text-sm font-semibold"
                    >
                      {isGeneratingCert || isCertificateLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Award className="mr-2 h-4 w-4" />
                      )}
                      {existingCertificate?.id
                        ? aiTrailUi.viewCertificate
                        : isGeneratingCert || isCertificateLoading
                          ? aiTrailUi.generatingCertificate
                          : aiTrailUi.generateCertificate}
                    </Button>
                  </div>
                </div>
              ) : null}

              <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ backgroundColor: `${trail.accent}15`, color: trail.accent }}
                    >
                      <Target className="h-3.5 w-3.5" />
                      {pageUi.summaryBeforeLesson}
                    </div>
                    <h3 className="mt-3 text-2xl font-bold text-foreground">
                      {trailContent.moduleLabel} {focusModuleNumber}: {focusModule?.title || trailContent.modules[focusModuleNumber - 1]?.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {focusModule?.summary || focusModule?.intro || pageUi.continueDescription}
                    </p>
                    {focusModule?.outcome ? (
                      <div className="mt-4 rounded-2xl bg-muted/60 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {pageUi.summaryOutcomeLabel}
                        </p>
                        <p className="mt-2 text-sm font-medium text-foreground">{focusModule.outcome}</p>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    onClick={() => handleOpenModule(focusModuleNumber)}
                    className="h-12 rounded-2xl px-6 text-sm font-semibold"
                    style={{ backgroundColor: trail.accent, color: "#ffffff" }}
                  >
                    {allCompleted ? pageUi.completedButton : pageUi.continueButton}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      <Map className="h-3.5 w-3.5" />
                      {pageUi.miniMapTitle}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{pageUi.miniMapDescription}</p>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-2xl border-border/70"
                    onClick={scrollToCurrentModule}
                  >
                    {pageUi.jumpToCurrentButton}
                    <RotateCcw className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {modulesWithStatus.map((module) => {
                    const isCurrent = module.status === "current";
                    const isCompleted = module.status === "completed";
                    const isLocked = module.status === "locked";

                    const statusLabel = isCompleted
                      ? pageUi.doneBadge
                      : isCurrent
                        ? pageUi.currentBadge
                        : isLocked
                          ? pageUi.upcomingBadge
                          : pageUi.readyBadge;

                    return (
                      <button
                        key={`mini-map-${module.number}`}
                        onClick={() => handleOpenModule(module.number)}
                        disabled={isLocked}
                        className={cn(
                          "flex items-start justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition-all",
                          isCurrent
                            ? "border-primary/40 bg-primary/5 shadow-sm"
                            : isCompleted
                              ? "border-green-500/30 bg-green-500/5"
                              : isLocked
                                ? "cursor-not-allowed border-border/60 bg-muted/30 opacity-70"
                                : "border-border hover:border-primary/30 hover:bg-accent/40"
                        )}
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <div
                            className={cn(
                              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold",
                              isCurrent
                                ? "border-primary/40 bg-primary text-primary-foreground"
                                : isCompleted
                                  ? "border-green-500/30 bg-green-500 text-white"
                                  : isLocked
                                    ? "border-border bg-card text-muted-foreground"
                                    : "border-border bg-card text-foreground"
                            )}
                          >
                            {module.number}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                              {trailContent.moduleLabel} {module.number}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground line-clamp-1">{module.title}</p>
                            <p className="mt-1 text-xs leading-6 text-muted-foreground line-clamp-2">
                              {module.summary || module.outcome || module.intro}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 border-0",
                            isCurrent
                              ? "bg-primary/10 text-primary"
                              : isCompleted
                                ? "bg-green-500/10 text-green-600"
                                : isLocked
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {statusLabel}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4">
                <DaysProgressBar
                  days={modulesWithStatus.map((module) => ({
                    dayNumber: module.number,
                    status: module.status,
                  }))}
                  currentDay={focusModuleNumber}
                  onDayClick={handleOpenModule}
                  labelPrefix="M"
                />
              </div>

              <div className="relative flex justify-center w-full overflow-hidden">
                <div className="relative w-[400px] min-w-[400px]" style={{ height: `${svgHeight}px` }}>
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VIEWBOX_WIDTH} ${svgHeight}`}>
                    <path
                      d={fullRoutePath}
                      fill="none"
                      stroke={baseRouteGlowColor}
                      strokeWidth="14"
                      strokeLinecap="round"
                      opacity="0.34"
                    />
                    <path
                      d={fullRoutePath}
                      fill="none"
                      stroke={baseRouteColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="1"
                    />

                    {completedRoutePath ? (
                      <>
                        <path
                          d={completedRoutePath}
                          fill="none"
                          stroke={successGlowColor}
                          strokeWidth="16"
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path
                          d={completedRoutePath}
                          fill="none"
                          stroke={successColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          opacity="1"
                        />
                      </>
                    ) : null}
                  </svg>

                  {modulesWithStatus.map((module, index) => {
                    const isLeft = index % 2 === 0;
                    const isCurrent = module.status === "current";
                    const isCompleted = module.status === "completed";
                    const isLocked = module.status === "locked";
                    const isFocus = module.number === focusModuleNumber;

                    return (
                      <div
                        key={module.number}
                        ref={isFocus ? currentModuleRef : null}
                        className="absolute w-36 flex flex-col items-center z-10"
                        style={{
                          top: `${START_Y_OFFSET + index * ROW_HEIGHT}px`,
                          left: "50%",
                          marginLeft: isLeft ? `-${OFFSET_X + 72}px` : `${OFFSET_X - 72}px`,
                        }}
                      >
                        <button
                          onClick={() => handleOpenModule(module.number)}
                          className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative border-4",
                            isCurrent
                              ? "text-white shadow-lg scale-110 ring-4 ring-primary/20"
                              : isCompleted
                                ? "text-white shadow-md ring-4 ring-green-500/15"
                                : isLocked
                                  ? "bg-card border-border text-muted-foreground cursor-not-allowed"
                                  : "bg-card border-border text-foreground hover:border-primary/40 hover:scale-105"
                          )}
                          style={
                            isCurrent
                              ? { backgroundColor: trail.accent, borderColor: trail.accent }
                              : isCompleted
                                ? { backgroundColor: successColor, borderColor: successColor }
                                : undefined
                          }
                        >
                          <div className="w-8 h-8 flex items-center justify-center">
                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isLocked ? <Lock className="h-5 w-5" /> : <span className="font-black text-lg">{module.number}</span>}
                          </div>
                        </button>

                        <button
                          onClick={() => handleOpenModule(module.number)}
                          className={cn(
                            "mt-3 w-36 text-center border px-3 py-3 rounded-xl shadow-md transition-all",
                            isCurrent
                              ? "bg-card border-primary/30 opacity-100"
                              : isCompleted
                                ? "bg-card border-green-500/30 shadow-[0_0_0_1px_rgba(34,197,94,0.08)]"
                                : isLocked
                                  ? "bg-card/70 border-border text-muted-foreground"
                                  : "bg-card border-border hover:border-primary/20"
                          )}
                        >
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            {trailContent.moduleLabel} {module.number}
                          </p>
                          <p className="mt-1 text-xs font-bold text-foreground leading-tight line-clamp-3">
                            {module.title}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.4rem+env(safe-area-inset-bottom,0px))] z-40 px-4 md:bottom-4">
          <div className="pointer-events-auto mx-auto max-w-4xl rounded-3xl border border-border bg-background/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {pageUi.fixedStepLabel}
                </p>
                <h3 className="mt-1 truncate text-base font-semibold text-foreground">
                  {trailContent.moduleLabel} {focusModuleNumber}: {focusModule?.title || trailContent.modules[focusModuleNumber - 1]?.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {focusModule?.outcome || focusModule?.summary || pageUi.continueDescription}
                </p>
              </div>

              <Button
                onClick={() => handleOpenModule(focusModuleNumber)}
                className="h-11 rounded-2xl px-5 text-sm font-semibold"
                style={{ backgroundColor: trail.accent, color: "#ffffff" }}
              >
                {allCompleted ? pageUi.completedButton : pageUi.continueButton}
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090f1d] text-white">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.14),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.10),_transparent_24%),linear-gradient(180deg,_#0f172a_0%,_#090f1d_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto flex min-h-screen max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {aiTrailUi.backToDashboard}
            </Button>

            <div className="space-y-5">
              <Badge className="border-0 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-orange-200 hover:bg-white/10">
                {aiTrailUi.comingSoon}
              </Badge>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  {trailMeta.category || aiTrailUi.pageCategoryFallback}
                </p>
                <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                  {trail?.name || aiTrailUi.pageCategoryFallback}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300">
                  {aiTrailUi.pageDescription}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.pageBuildTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{aiTrailUi.pageBuildDesc}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.pageLockedTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{aiTrailUi.pageLockedDesc}</p>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="h-12 rounded-full bg-orange-500 px-6 text-sm font-semibold text-white hover:bg-orange-400"
                >
                  {aiTrailUi.pageUnderstand}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AIToolTrailPage;
