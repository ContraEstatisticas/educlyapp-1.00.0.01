import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowLeft, Check, Star, Trophy, Sparkles, Layers3, ArrowRight, ChevronRight, Map, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AIToolPopup } from "@/components/challenge/AIToolPopup";
import { AIToolSelector, aiToolsConfig, aiToolsOrder } from "@/components/lesson/AIToolSelector";
import { DaysProgressBar } from "@/components/lesson/DaysProgressBar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useTranslatedChallengeContent } from "@/hooks/useTranslatedChallengeContent";
import { useFreelancerMedals } from "@/hooks/useFreelancerMedals";
import confetti from "canvas-confetti";
import { ChallengeTutorial } from "@/components/onboarding";
import { tUi } from "@/lib/supplementalUiTranslations";
import { getAiTrailUiCopy } from "@/lib/aiTrailI18n";

const GoldenTrophyCard = ({ challengeName, completedCount, totalDays, t, language }: any) => {
  const progress = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:shadow-lg mb-6">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-success/5 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-primary/80 to-primary shadow-lg ring-4 ring-primary/10">
            <Trophy className="h-8 w-8 text-primary-foreground" />
          </div>
          {progress === 100 && <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-primary animate-pulse" />}
        </div>

        <div className="space-y-1">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {progress === 100
              ? tUi(t, language, "certificate.eliteCertificate")
              : tUi(t, language, "certificate.masterCertificate")}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {progress === 100
              ? tUi(t, language, "certificate.conquered")
              : tUi(t, language, "certificate.inProgress")}
          </h2>
          <p className="text-xs font-medium text-muted-foreground">{challengeName}</p>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {tUi(t, language, "certificate.daysCompleted", {
            completed: completedCount,
            total: totalDays,
            percent: progress,
          })}
        </p>
      </div>
    </div>
  );
};

const CHALLENGE_NAV_UI = {
  pt: {
    summaryBadge: "Resumo antes da aula",
    currentPointTitle: "Retome do ponto atual",
    currentPointDescription: "Leve o caminho visual de volta para o dia certo e siga sem procurar manualmente.",
    jumpToCurrentButton: "Voltar ao dia atual",
    miniMapTitle: "Mini-mapa da unidade",
    miniMapDescription: "Veja os dias do bloco atual desta IA e o que ja foi concluido.",
    nextStepLabel: "Proximo passo",
    currentBadge: "Agora",
    completedBadge: "Feito",
    readyBadge: "Disponivel",
    upcomingBadge: "Depois",
    unitLabel: "Bloco atual",
    toolLabel: "Ferramenta desta fase",
    dayLabel: "Dia",
  },
  en: {
    summaryBadge: "Summary before lesson",
    currentPointTitle: "Return to your current point",
    currentPointDescription: "Bring the visual path back to the right day and keep going without searching manually.",
    jumpToCurrentButton: "Back to current day",
    miniMapTitle: "Unit mini-map",
    miniMapDescription: "See the days inside the current AI block and what has already been completed.",
    nextStepLabel: "Next step",
    currentBadge: "Now",
    completedBadge: "Done",
    readyBadge: "Ready",
    upcomingBadge: "Later",
    unitLabel: "Current block",
    toolLabel: "Tool in this phase",
    dayLabel: "Day",
  },
  es: {
    summaryBadge: "Resumen antes de la leccion",
    currentPointTitle: "Retoma desde tu punto actual",
    currentPointDescription: "Lleva el camino visual de vuelta al dia correcto y sigue sin buscar manualmente.",
    jumpToCurrentButton: "Volver al dia actual",
    miniMapTitle: "Mini mapa de la unidad",
    miniMapDescription: "Mira los dias del bloque actual de esta IA y lo que ya se completo.",
    nextStepLabel: "Siguiente paso",
    currentBadge: "Ahora",
    completedBadge: "Hecho",
    readyBadge: "Disponible",
    upcomingBadge: "Despues",
    unitLabel: "Bloque actual",
    toolLabel: "Herramienta de esta fase",
    dayLabel: "Dia",
  },
  fr: {
    summaryBadge: "Resume avant la lecon",
    currentPointTitle: "Reprends a ton point actuel",
    currentPointDescription: "Ramene le parcours visuel au bon jour et continue sans chercher manuellement.",
    jumpToCurrentButton: "Revenir au jour actuel",
    miniMapTitle: "Mini-carte de l'unite",
    miniMapDescription: "Vois les jours du bloc IA actuel et ce qui est deja termine.",
    nextStepLabel: "Etape suivante",
    currentBadge: "Maintenant",
    completedBadge: "Termine",
    readyBadge: "Disponible",
    upcomingBadge: "Apres",
    unitLabel: "Bloc actuel",
    toolLabel: "Outil de cette phase",
    dayLabel: "Jour",
  },
} as const;

type SupportedChallengeLanguage = keyof typeof CHALLENGE_NAV_UI;

const getChallengeNavUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as SupportedChallengeLanguage | undefined;
  return CHALLENGE_NAV_UI[base || "en"] || CHALLENGE_NAV_UI.en;
};

const Challenge = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { getChallengeName, getChallengeDescription, getDayTitle, getDayDescription } = useTranslatedChallengeContent();
  const { syncEarnableMedals } = useFreelancerMedals();
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);
  const challengeUi = getChallengeNavUi(i18n.resolvedLanguage || i18n.language);

  const [selectedAITool, setSelectedAITool] = useState<string | null>(null);
  const [popupToolSlug, setPopupToolSlug] = useState<string | null>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);
  const { data: challenge, isLoading: loadingChallenge } = useQuery({
    queryKey: ["challenge", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("challenges").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: challengeDays, isLoading: loadingDays } = useQuery({
    queryKey: ["challenge-days", challenge?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenge_days")
        .select("*, ai_tools(*)")
        .eq("challenge_id", challenge!.id)
        .order("day_number");
      if (error) throw error;
      return data;
    },
    enabled: !!challenge?.id,
  });

  const { data: userProgress } = useQuery({
    queryKey: ["user-challenge-progress", challenge?.id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !challenge) return null;
      const { data } = await supabase
        .from("user_challenge_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("challenge_id", challenge.id)
        .maybeSingle();
      return data;
    },
    enabled: !!challenge?.id,
  });

  const { data: dayTranslations } = useQuery({
    queryKey: ["challenge-day-translations", challenge?.id, i18n.language],
    queryFn: async () => {
      const lang = i18n.language.split("-")[0];
      if (lang === "pt" || !challengeDays?.length) return {};
      const dayIds = challengeDays.map((d) => d.id);
      const { data } = await supabase
        .from("challenge_day_translations")
        .select("challenge_day_id, title, description")
        .in("challenge_day_id", dayIds)
        .eq("language", lang);
      return Object.fromEntries((data || []).map((row) => [row.challenge_day_id, row]));
    },
    enabled: !!challengeDays?.length,
  });

  const { data: completedDaysData } = useQuery({
    queryKey: ["user-day-progress-full", challenge?.id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !challengeDays) return [];
      const dayIds = challengeDays.map((d) => d.id);
      const { data } = await supabase
        .from("user_day_progress")
        .select("challenge_day_id")
        .eq("user_id", user.id)
        .in("challenge_day_id", dayIds)
        .eq("completed", true);
      return data || [];
    },
    enabled: !!challengeDays?.length,
  });

  const completedDayIds = useMemo(() => completedDaysData?.map((d) => d.challenge_day_id) || [], [completedDaysData]);

  const calculatedCurrentDay = useMemo(() => {
    if (!challengeDays || !completedDayIds.length) return userProgress?.current_day || 1;
    const maxCompletedNumber = challengeDays.reduce((max, day) => {
      if (completedDayIds.includes(day.id)) return Math.max(max, day.day_number);
      return max;
    }, 0);
    return Math.max(maxCompletedNumber + 1, userProgress?.current_day || 1);
  }, [challengeDays, completedDayIds, userProgress]);

  const handleDayClick = async (dayId: string) => {
    // Refresh token before starting lesson to ensure 4h validity
    const { refreshSession } = await import("@/hooks/useRefreshSession");
    await refreshSession();
    navigate(`/aula/${dayId}`);
  };
  const completedCount = completedDayIds.length;
  const totalDays = challengeDays?.length || 28;

  const ROW_HEIGHT = 160;
  const START_Y_OFFSET = 60;
  const VIEWBOX_WIDTH = 400;
  const CENTER_X = VIEWBOX_WIDTH / 2;
  const OFFSET_X = 80;

  const prevCompletedCount = useRef(completedCount);
  const medalSyncKeyRef = useRef<string | null>(null);
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null);

  useEffect(() => {
    if (completedCount > prevCompletedCount.current && completedDayIds.length > 0) {
      const lastCompletedId = completedDayIds[completedDayIds.length - 1];
      setRecentlyCompleted(lastCompletedId);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.4 },
        colors: ["#22c55e", "#6366f1", "#fbbf24"],
      });
      setTimeout(() => setRecentlyCompleted(null), 2000);
    }
    prevCompletedCount.current = completedCount;
  }, [completedCount, completedDayIds]);

  useEffect(() => {
    if (!loadingDays && challengeDays && currentDayRef.current) {
      setTimeout(() => {
        currentDayRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }, [loadingDays, calculatedCurrentDay]);

  useEffect(() => {
    if (!challengeDays) return;

    const syncKey = `${completedCount}:${challengeDays.length}`;
    if (medalSyncKeyRef.current === syncKey) return;
    medalSyncKeyRef.current = syncKey;

    void syncEarnableMedals().catch((error) => {
      console.error("Error syncing challenge medals:", error);
    });
  }, [challengeDays, completedCount, syncEarnableMedals]);

  if (loadingChallenge || loadingDays) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  if (!challenge) return <div className="text-center p-8">{tUi(t, i18n.language, "challenge.notFound")}</div>;

  const challengeDescription = getChallengeDescription(challenge.slug, challenge.description || "");
  const svgHeight = (challengeDays?.length || 0) * ROW_HEIGHT + START_Y_OFFSET + 100;
  const allDaysCompleted = completedCount >= totalDays && totalDays > 0;
  const focusDayNumber = totalDays > 0
    ? allDaysCompleted
      ? totalDays
      : Math.min(calculatedCurrentDay, totalDays)
    : calculatedCurrentDay;
  const focusDay = challengeDays?.find((day) => day.day_number === focusDayNumber) || challengeDays?.[challengeDays.length - 1];
  const focusToolSlug = focusDay?.ai_tools?.slug || "chatgpt";
  const focusToolConfig = aiToolsConfig[focusToolSlug] || aiToolsConfig.chatgpt;
  const focusToolDays = challengeDays?.filter((day) => day.ai_tools?.slug === focusToolSlug) || [];
  const focusToolCompletedCount = focusToolDays.filter((day) => completedDayIds.includes(day.id)).length;
  const focusDayTitle = focusDay
    ? ((dayTranslations as any)?.[focusDay.id]?.title || getDayTitle(slug!, focusDay.day_number, focusToolSlug, focusDay.title))
    : getChallengeName(challenge.slug, challenge.name);
  const focusDayDescription = focusDay
    ? ((dayTranslations as any)?.[focusDay.id]?.description
      || getDayDescription(slug!, focusDay.day_number, focusToolSlug, focusDay.description || challengeDescription))
    : challengeDescription;

  const scrollToCurrentDay = () => {
    currentDayRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset relative">
      <ChallengeTutorial />
      <header className="sticky top-safe z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="hover:bg-primary/10">
              <ArrowLeft className="text-foreground" />
            </Button>
            <div>
              <h1 className="font-semibold text-sm sm:text-base truncate text-foreground">
                {getChallengeName(challenge.slug, challenge.name)}
              </h1>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{totalDays} {t("challenge.days")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-4xl mx-auto px-4 py-6 pb-[calc(12rem+env(safe-area-inset-bottom,0px))] md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="hidden lg:block">
            <div id="trophy-card" className="sticky top-20">
              <GoldenTrophyCard
                challengeName={getChallengeName(challenge.slug, challenge.name)}
                completedCount={completedCount}
                totalDays={totalDays}
                t={t}
                language={i18n.language}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:hidden">
              <GoldenTrophyCard
                challengeName={getChallengeName(challenge.slug, challenge.name)}
                completedCount={completedCount}
                totalDays={totalDays}
                t={t}
                language={i18n.language}
              />
            </div>

            {/* AI Tool Progress Cards */}
            <div id="challenge-tabs" className="mb-6">
              <AIToolSelector
                tools={aiToolsOrder
                  .filter((slug) => challengeDays?.some((d) => d.ai_tools?.slug === slug))
                  .map((slug) => {
                    const config = aiToolsConfig[slug];
                    const toolDays = challengeDays?.filter((d) => d.ai_tools?.slug === slug) || [];
                    const completedToolDays = toolDays.filter((d) => completedDayIds.includes(d.id)).length;
                    const progress = toolDays.length > 0 ? Math.round((completedToolDays / toolDays.length) * 100) : 0;
                    return { slug, name: config.name, progress };
                  })}
                selectedSlug={selectedAITool}
                onSelect={(slug) => {
                  setSelectedAITool(slug);
                  setPopupToolSlug(slug);
                }}
              />
            </div>

            <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <Target className="h-3.5 w-3.5" />
                    {challengeUi.summaryBadge}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">
                    {challengeUi.dayLabel} {focusDayNumber}: {focusDayTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {focusDayDescription || challengeDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {challengeUi.toolLabel}: {focusToolConfig.name}
                    </div>
                    <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {challengeUi.unitLabel}: {focusToolCompletedCount}/{focusToolDays.length}
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 md:w-auto">
                  <Button className="h-12 rounded-2xl px-6" onClick={() => focusDay && handleDayClick(focusDay.id)}>
                    {challengeUi.dayLabel} {focusDayNumber}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl border-border/70 px-6"
                    onClick={scrollToCurrentDay}
                  >
                    {challengeUi.jumpToCurrentButton}
                    <RotateCcw className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
                    <Map className="h-3.5 w-3.5" />
                    {challengeUi.miniMapTitle}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{challengeUi.miniMapDescription}</p>
                </div>

                <div className="rounded-2xl bg-muted/60 px-4 py-3 text-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {challengeUi.unitLabel}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{focusToolConfig.name}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {focusToolDays.map((day) => {
                  const isCompleted = completedDayIds.includes(day.id);
                  const isCurrent = !allDaysCompleted && day.day_number === focusDayNumber;
                  const isLocked = !allDaysCompleted && day.day_number > focusDayNumber;
                  const translatedTitle = (dayTranslations as any)?.[day.id]?.title || getDayTitle(slug!, day.day_number, focusToolSlug, day.title);
                  const translatedDescription = (dayTranslations as any)?.[day.id]?.description
                    || getDayDescription(slug!, day.day_number, focusToolSlug, day.description || challengeDescription);

                  const statusLabel = isCompleted
                    ? challengeUi.completedBadge
                    : isCurrent
                      ? challengeUi.currentBadge
                      : isLocked
                        ? challengeUi.upcomingBadge
                        : challengeUi.readyBadge;

                  return (
                    <button
                      key={`focus-unit-${day.id}`}
                      onClick={() => !isLocked && handleDayClick(day.id)}
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
                          {day.day_number}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            {challengeUi.dayLabel} {day.day_number}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-foreground line-clamp-1">{translatedTitle}</p>
                          <p className="mt-1 text-xs leading-6 text-muted-foreground line-clamp-2">
                            {translatedDescription}
                          </p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
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
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days Progress Bar */}
            <div id="days-progress-bar" className="mb-4">
              <DaysProgressBar
                days={challengeDays?.map((d) => {
                  const isCompleted = completedDayIds.includes(d.id);
                  const isCurrent = !allDaysCompleted && d.day_number === focusDayNumber;
                  const isUnlocked = d.day_number < focusDayNumber || allDaysCompleted;
                  const status: "completed" | "current" | "locked" | "unlocked" = isCompleted ? "completed" : isCurrent ? "current" : isUnlocked ? "unlocked" : "locked";
                  return { dayNumber: d.day_number, status };
                }) || []}
                currentDay={focusDayNumber}
                onDayClick={(dayNum) => {
                  const day = challengeDays?.find((d) => d.day_number === dayNum);
                  if (day) handleDayClick(day.id);
                }}
              />
            </div>

            {/* Zig-zag path */}
            <div className="relative flex justify-center w-full overflow-hidden">
              <div className="relative w-[400px] min-w-[400px]" style={{ height: `${svgHeight}px` }}>
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VIEWBOX_WIDTH} ${svgHeight}`}>
                  <path
                    d={challengeDays?.map((_, i) => {
                      if (i === challengeDays.length - 1) return "";
                      const startY = START_Y_OFFSET + i * ROW_HEIGHT + 40;
                      const endY = START_Y_OFFSET + (i + 1) * ROW_HEIGHT + 40;
                      const isEven = i % 2 === 0;
                      const startX = isEven ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X;
                      const endX = isEven ? CENTER_X + OFFSET_X : CENTER_X - OFFSET_X;
                      return `M ${startX} ${startY} C ${startX} ${startY + 80}, ${endX} ${endY - 80}, ${endX} ${endY}`;
                    }).join(" ")}
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.3"
                  />

                  {completedDayIds.length > 0 && (
                    <path
                      d={challengeDays?.slice(0, focusDayNumber).map((_, i) => {
                        if (i === (challengeDays?.slice(0, focusDayNumber).length || 0) - 1) return "";
                        const startY = START_Y_OFFSET + i * ROW_HEIGHT + 40;
                        const endY = START_Y_OFFSET + (i + 1) * ROW_HEIGHT + 40;
                        const isEven = i % 2 === 0;
                        const startX = isEven ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X;
                        const endX = isEven ? CENTER_X + OFFSET_X : CENTER_X - OFFSET_X;
                        return `M ${startX} ${startY} C ${startX} ${startY + 80}, ${endX} ${endY - 80}, ${endX} ${endY}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="1"
                    />
                  )}

                  {completedDayIds.length > 0 && (
                    <path
                      d={challengeDays?.slice(0, focusDayNumber).map((_, i) => {
                        if (i === (challengeDays?.slice(0, focusDayNumber).length || 0) - 1) return "";
                        const startY = START_Y_OFFSET + i * ROW_HEIGHT + 40;
                        const endY = START_Y_OFFSET + (i + 1) * ROW_HEIGHT + 40;
                        const isEven = i % 2 === 0;
                        const startX = isEven ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X;
                        const endX = isEven ? CENTER_X + OFFSET_X : CENTER_X - OFFSET_X;
                        return `M ${startX} ${startY} C ${startX} ${startY + 80}, ${endX} ${endY - 80}, ${endX} ${endY}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="10 20"
                      className="animate-led-flow drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                    />
                  )}
                </svg>

                {challengeDays?.map((day, index) => {
                  const toolSlug = day.ai_tools?.slug || "chatgpt";
                  const isCompleted = completedDayIds.includes(day.id);
                  const isCurrent = !allDaysCompleted && day.day_number === focusDayNumber;
                  const isFocus = day.day_number === focusDayNumber;
                  const isLocked = !allDaysCompleted && day.day_number > focusDayNumber;
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={day.id}
                      ref={isFocus ? currentDayRef : null}
                      className={cn("absolute w-28 flex flex-col items-center z-10", recentlyCompleted === day.id && "animate-completion-burst")}
                      style={{
                        top: `${START_Y_OFFSET + index * ROW_HEIGHT}px`,
                        left: "50%",
                        marginLeft: isLeft ? `-${OFFSET_X + 56}px` : `${OFFSET_X - 56}px`,
                      }}
                    >
                      {isCompleted && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-0.5 z-20">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400 -mt-0.5" />
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </div>
                      )}

                      <button
                        onClick={() => !isLocked && handleDayClick(day.id)}
                        disabled={isLocked}
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative border-4",
                          isLocked
                            ? "bg-muted border-border cursor-not-allowed opacity-50"
                            : isCompleted
                              ? "bg-[#22c55e] border-[#16a34a] text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                              : isCurrent
                                ? "bg-primary border-primary/80 text-primary-foreground shadow-lg ring-4 ring-primary/20"
                                : "bg-card border-border hover:border-primary/50"
                        )}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {isCompleted ? <Check className="w-6 h-6 stroke-[4]" /> : <span className="font-black text-lg">{day.day_number}</span>}
                        </div>
                      </button>

                      <div className={cn(
                        "mt-3 w-32 text-center bg-card border border-border px-2 py-2 rounded-xl shadow-md transition-all",
                        (isFocus || isCompleted) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      )}>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t("challenge.day")} {day.day_number}</p>
                        <p className="text-xs font-bold text-foreground leading-tight line-clamp-2">{(dayTranslations as any)?.[day.id]?.title || getDayTitle(slug!, day.day_number, toolSlug, day.title)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 mb-6 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <Layers3 className="h-3.5 w-3.5" />
                    {aiTrailUi.challengeEyebrow}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">
                    {aiTrailUi.challengeTitle}
                  </h3>
                </div>

                <Button className="h-12 rounded-xl px-6" onClick={() => navigate("/trilhas-ia")}>
                  {aiTrailUi.challengeButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AI Tool Popup */}
            <AIToolPopup
              toolSlug={popupToolSlug}
              challengeId={challenge?.id || null}
              overallProgress={totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0}
              progress={(() => {
                if (!popupToolSlug) return 0;
                const toolDays = challengeDays?.filter((d) => d.ai_tools?.slug === popupToolSlug) || [];
                const completedToolDays = toolDays.filter((d) => completedDayIds.includes(d.id)).length;
                return toolDays.length > 0 ? Math.round((completedToolDays / toolDays.length) * 100) : 0;
              })()}
              completedDays={(() => {
                if (!popupToolSlug) return 0;
                const toolDays = challengeDays?.filter((d) => d.ai_tools?.slug === popupToolSlug) || [];
                return toolDays.filter((d) => completedDayIds.includes(d.id)).length;
              })()}
              totalDays={(() => {
                if (!popupToolSlug) return 0;
                return challengeDays?.filter((d) => d.ai_tools?.slug === popupToolSlug).length || 0;
              })()}
              isOpen={!!popupToolSlug}
              onClose={() => setPopupToolSlug(null)}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.4rem+env(safe-area-inset-bottom,0px))] z-40 px-4 md:bottom-4">
        <div className="pointer-events-auto mx-auto max-w-4xl rounded-3xl border border-border bg-background/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {challengeUi.nextStepLabel}
              </p>
              <h3 className="mt-1 truncate text-base font-semibold text-foreground">
                {challengeUi.dayLabel} {focusDayNumber}: {focusDayTitle}
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {focusToolConfig.name} • {focusDayDescription || challengeDescription}
              </p>
            </div>

            <Button className="h-11 rounded-2xl px-5 text-sm font-semibold" onClick={() => focusDay && handleDayClick(focusDay.id)}>
              {challengeUi.dayLabel} {focusDayNumber}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
