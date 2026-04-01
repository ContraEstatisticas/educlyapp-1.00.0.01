import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowLeft, Check, Star, Trophy, Sparkles, Layers3, ArrowRight, Gamepad2, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AIToolPopup } from "@/components/challenge/AIToolPopup";
import { PhaserChallengeMap, type PhaserChallengeMapDay } from "@/components/challenge/PhaserChallengeMap";
import { AIToolSelector, aiToolsConfig, aiToolsOrder } from "@/components/lesson/AIToolSelector";
import { DaysProgressBar } from "@/components/lesson/DaysProgressBar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useTranslatedChallengeContent } from "@/hooks/useTranslatedChallengeContent";
import { useFreelancerMedals } from "@/hooks/useFreelancerMedals";
import confetti from "canvas-confetti";
import { ChallengeTutorial } from "@/components/onboarding";
import { tUi } from "@/lib/supplementalUiTranslations";
import { getAiTrailUiCopy } from "@/lib/aiTrailI18n";

interface GoldenTrophyCardProps {
  challengeName: string;
  completedCount: number;
  totalDays: number;
  t: TFunction;
  language: string;
}

const GoldenTrophyCard = ({ challengeName, completedCount, totalDays, t, language }: GoldenTrophyCardProps) => {
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

const GAME_MAP_UI = {
  pt: {
    badge: "Mapa game",
    title: "Explore a trilha em modo jogável",
    description: "O modo Phaser transforma os 28 dias em um tabuleiro vivo com avatar, rota e checkpoints clicáveis.",
    phaserMode: "Modo Phaser",
    classicMode: "Mapa clássico",
    betaBadge: "Beta",
    missionBadge: "Missão atual",
    openMission: "Abrir aula",
    loading: "Carregando mapa Phaser...",
    error: "Não foi possível iniciar o mapa Phaser neste navegador.",
    helper: "Use WASD ou as setas para andar. Pressione E ou Enter perto de um dia liberado, ou clique nele, para abrir a aula.",
    legendCompleted: "Concluído",
    legendCurrent: "Atual",
    legendUnlocked: "Liberado",
    legendLocked: "Bloqueado",
    approachPrompt: "Pare sobre um dia liberado para ver a aula.",
    pressPrompt: "Pressione E, Enter ou clique no botao.",
    viewLesson: "Ver aula",
    reviewLesson: "Rever aula",
    viewPrompt: "Quer ver esta aula?",
    reviewPrompt: "Quer rever esta aula?",
    dayLabel: "Dia",
    fullScreenOpen: "Abrir em tela cheia",
    fullScreenActive: "Modo Phaser aberto em tela cheia.",
    exitFullScreen: "Sair do modo Phaser",
  },
  en: {
    badge: "Game map",
    title: "Explore the trail as a playable board",
    description: "Phaser mode turns the 28-day challenge into a living board with an avatar, route, and clickable checkpoints.",
    phaserMode: "Phaser mode",
    classicMode: "Classic map",
    betaBadge: "Beta",
    missionBadge: "Current mission",
    openMission: "Open lesson",
    loading: "Loading Phaser map...",
    error: "The Phaser map could not start in this browser.",
    helper: "Use WASD or the arrow keys to move. Press E or Enter near an unlocked day, or click it, to open the lesson.",
    legendCompleted: "Completed",
    legendCurrent: "Current",
    legendUnlocked: "Unlocked",
    legendLocked: "Locked",
    approachPrompt: "Stand on an unlocked day to open the lesson.",
    pressPrompt: "Press E, Enter, or click the button.",
    viewLesson: "View lesson",
    reviewLesson: "Review lesson",
    viewPrompt: "Do you want to view this lesson?",
    reviewPrompt: "Do you want to review this lesson?",
    dayLabel: "Day",
    fullScreenOpen: "Open fullscreen",
    fullScreenActive: "Phaser mode is open in fullscreen.",
    exitFullScreen: "Exit Phaser mode",
  },
  es: {
    badge: "Mapa game",
    title: "Explora la ruta como un tablero jugable",
    description: "El modo Phaser convierte los 28 días en un tablero vivo con avatar, ruta y checkpoints interactivos.",
    phaserMode: "Modo Phaser",
    classicMode: "Mapa clásico",
    betaBadge: "Beta",
    missionBadge: "Misión actual",
    openMission: "Abrir lección",
    loading: "Cargando mapa Phaser...",
    error: "No se pudo iniciar el mapa Phaser en este navegador.",
    helper: "Usa WASD o las flechas para moverte. Presiona E o Enter cerca de un día desbloqueado, o haz clic en él, para abrir la lección.",
    legendCompleted: "Completado",
    legendCurrent: "Actual",
    legendUnlocked: "Disponible",
    legendLocked: "Bloqueado",
    approachPrompt: "Parate sobre un dia disponible para abrir la leccion.",
    pressPrompt: "Presiona E, Enter o haz clic en el boton.",
    viewLesson: "Ver leccion",
    reviewLesson: "Revisar leccion",
    viewPrompt: "Quieres ver esta leccion?",
    reviewPrompt: "Quieres revisar esta leccion?",
    dayLabel: "Dia",
    fullScreenOpen: "Abrir en pantalla completa",
    fullScreenActive: "El modo Phaser está abierto en pantalla completa.",
    exitFullScreen: "Salir del modo Phaser",
  },
  fr: {
    badge: "Carte game",
    title: "Explore le parcours comme un plateau jouable",
    description: "Le mode Phaser transforme les 28 jours en plateau vivant avec avatar, route et checkpoints cliquables.",
    phaserMode: "Mode Phaser",
    classicMode: "Carte classique",
    betaBadge: "Beta",
    missionBadge: "Mission actuelle",
    openMission: "Ouvrir la leçon",
    loading: "Chargement de la carte Phaser...",
    error: "Impossible de lancer la carte Phaser dans ce navigateur.",
    helper: "Utilisez WASD ou les flèches pour vous déplacer. Appuyez sur E ou Entrée près d'un jour débloqué, ou cliquez dessus, pour ouvrir la leçon.",
    legendCompleted: "Terminé",
    legendCurrent: "Actuel",
    legendUnlocked: "Débloqué",
    legendLocked: "Verrouillé",
    approachPrompt: "Placez-vous sur un jour debloque pour ouvrir la lecon.",
    pressPrompt: "Appuyez sur E, Entree ou cliquez sur le bouton.",
    viewLesson: "Voir la lecon",
    reviewLesson: "Revoir la lecon",
    viewPrompt: "Voulez-vous voir cette lecon ?",
    reviewPrompt: "Voulez-vous revoir cette lecon ?",
    dayLabel: "Jour",
    fullScreenOpen: "Ouvrir en plein écran",
    fullScreenActive: "Le mode Phaser est ouvert en plein écran.",
    exitFullScreen: "Quitter le mode Phaser",
  },
} as const;

type SupportedGameUiLanguage = keyof typeof GAME_MAP_UI;

const getGameMapUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as SupportedGameUiLanguage | undefined;
  return GAME_MAP_UI[base || "en"] || GAME_MAP_UI.en;
};

const Challenge = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { getChallengeName, getDayTitle } = useTranslatedChallengeContent();
  const { syncEarnableMedals } = useFreelancerMedals();
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);
  const gameMapUi = getGameMapUi(i18n.resolvedLanguage || i18n.language);

  const [selectedAITool, setSelectedAITool] = useState<string | null>(null);
  const [popupToolSlug, setPopupToolSlug] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<"phaser" | "classic">("phaser");
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
  const translatedDayMap = useMemo(
    () => (dayTranslations || {}) as Record<string, { title?: string; description?: string }>,
    [dayTranslations],
  );

  const challengeMapDays = useMemo<PhaserChallengeMapDay[]>(() => {
    if (!challengeDays || !slug) return [];

    return challengeDays.map((day) => {
      const toolSlug = day.ai_tools?.slug || "chatgpt";
      const isCompleted = completedDayIds.includes(day.id);
      const isCurrent = day.day_number === calculatedCurrentDay;
      const status: PhaserChallengeMapDay["status"] = isCompleted
        ? "completed"
        : isCurrent
          ? "current"
          : day.day_number < calculatedCurrentDay
            ? "unlocked"
            : "locked";

      return {
        id: day.id,
        dayNumber: day.day_number,
        title: translatedDayMap[day.id]?.title || getDayTitle(slug, day.day_number, toolSlug, day.title),
        toolSlug,
        toolName: aiToolsConfig[toolSlug]?.name || "AI",
        status,
      };
    });
  }, [calculatedCurrentDay, challengeDays, completedDayIds, getDayTitle, slug, translatedDayMap]);

  const activeMapDay = useMemo(() => {
    return (
      challengeMapDays.find((day) => day.status === "current") ||
      [...challengeMapDays].reverse().find((day) => day.status === "completed") ||
      challengeMapDays[0] ||
      null
    );
  }, [challengeMapDays]);

  const weekLabels = useMemo(() => {
    return Array.from({ length: Math.ceil(totalDays / 7) }, (_, index) => {
      const weekNum = index + 1;
      switch (weekNum) {
        case 1:
          return t("trail.week1", "Semana 1: Fundamentos");
        case 2:
          return t("trail.week2", "Semana 2: Tecnicas Basicas");
        case 3:
          return t("trail.week3", "Semana 3: Tecnicas Intermediarias");
        case 4:
          return t("trail.week4", "Semana 4: Aplicacao Profissional");
        default:
          return `${t("challenge.week", "Semana")} ${weekNum}`;
      }
    });
  }, [t, totalDays]);

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
  }, [challengeDays, loadingDays, calculatedCurrentDay]);

  useEffect(() => {
    if (!challengeDays) return;

    const syncKey = `${completedCount}:${challengeDays.length}`;
    if (medalSyncKeyRef.current === syncKey) return;
    medalSyncKeyRef.current = syncKey;

    void syncEarnableMedals().catch((error) => {
      console.error("Error syncing challenge medals:", error);
    });
  }, [challengeDays, completedCount, syncEarnableMedals]);

  useEffect(() => {
    if (mapMode !== "phaser" || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMapMode("classic");
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mapMode]);

  if (loadingChallenge || loadingDays) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  if (!challenge) return <div className="text-center p-8">{tUi(t, i18n.language, "challenge.notFound")}</div>;

  const svgHeight = (challengeDays?.length || 0) * ROW_HEIGHT + START_Y_OFFSET + 100;
  const routeProgressCount = activeMapDay?.dayNumber || 1;

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

      <div className="relative max-w-4xl mx-auto px-4 py-6">
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

            {/* Days Progress Bar */}
            <div id="days-progress-bar" className="mb-4">
              <DaysProgressBar
                days={challengeMapDays.map((day) => ({
                  dayNumber: day.dayNumber,
                  status: day.status,
                }))}
                currentDay={calculatedCurrentDay}
                onDayClick={(dayNum) => {
                  const day = challengeMapDays.find((item) => item.dayNumber === dayNum);
                  if (day) handleDayClick(day.id);
                }}
              />
            </div>

            <div className="mb-6 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
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

            <div className="mb-6 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                    <Gamepad2 className="h-3.5 w-3.5" />
                    {gameMapUi.badge}
                    <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] tracking-[0.12em] text-cyan-900 dark:bg-cyan-950/80 dark:text-cyan-100">
                      {gameMapUi.betaBadge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">{gameMapUi.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{gameMapUi.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={mapMode === "phaser" ? "default" : "outline"}
                    className="h-11 rounded-full px-5"
                    onClick={() => setMapMode("phaser")}
                  >
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    {gameMapUi.fullScreenOpen}
                  </Button>
                  <Button
                    type="button"
                    variant={mapMode === "classic" ? "default" : "outline"}
                    className="h-11 rounded-full px-5"
                    onClick={() => setMapMode("classic")}
                  >
                    <MapIcon className="mr-2 h-4 w-4" />
                    {gameMapUi.classicMode}
                  </Button>
                </div>
              </div>

              {activeMapDay ? (
                <div className="mt-5 rounded-2xl border border-border/70 bg-muted/35 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {gameMapUi.missionBadge}
                      </p>
                      <h4 className="mt-2 text-lg font-bold text-foreground">
                        {t("challenge.day")} {activeMapDay.dayNumber}: {activeMapDay.title}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">{activeMapDay.toolName}</p>
                    </div>

                    <Button
                      type="button"
                      className="h-11 rounded-xl px-5"
                      onClick={() => handleDayClick(activeMapDay.id)}
                      disabled={activeMapDay.status === "locked"}
                    >
                      {gameMapUi.openMission}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            {mapMode === "phaser" ? (
              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-sm text-muted-foreground shadow-sm">
                {gameMapUi.fullScreenActive}
              </div>
            ) : (
              <div className="relative flex justify-center w-full overflow-hidden">
                <div className="relative w-[400px] min-w-[400px]" style={{ height: `${svgHeight}px` }}>
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VIEWBOX_WIDTH} ${svgHeight}`}>
                    <path
                      d={challengeMapDays.map((_, index) => {
                        if (index === challengeMapDays.length - 1) return "";
                        const startY = START_Y_OFFSET + index * ROW_HEIGHT + 40;
                        const endY = START_Y_OFFSET + (index + 1) * ROW_HEIGHT + 40;
                        const isEven = index % 2 === 0;
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

                    {routeProgressCount > 1 ? (
                      <path
                        d={challengeMapDays.slice(0, routeProgressCount).map((_, index, items) => {
                          if (index === items.length - 1) return "";
                          const startY = START_Y_OFFSET + index * ROW_HEIGHT + 40;
                          const endY = START_Y_OFFSET + (index + 1) * ROW_HEIGHT + 40;
                          const isEven = index % 2 === 0;
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
                    ) : null}

                    {routeProgressCount > 1 ? (
                      <path
                        d={challengeMapDays.slice(0, routeProgressCount).map((_, index, items) => {
                          if (index === items.length - 1) return "";
                          const startY = START_Y_OFFSET + index * ROW_HEIGHT + 40;
                          const endY = START_Y_OFFSET + (index + 1) * ROW_HEIGHT + 40;
                          const isEven = index % 2 === 0;
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
                    ) : null}
                  </svg>

                  {challengeMapDays.map((day, index) => {
                    const isCompleted = day.status === "completed";
                    const isCurrent = day.status === "current";
                    const isLocked = day.status === "locked";
                    const isLeft = index % 2 === 0;

                    return (
                      <div
                        key={day.id}
                        ref={isCurrent ? currentDayRef : null}
                        className={cn("absolute w-28 flex flex-col items-center z-10", recentlyCompleted === day.id && "animate-completion-burst")}
                        style={{
                          top: `${START_Y_OFFSET + index * ROW_HEIGHT}px`,
                          left: "50%",
                          marginLeft: isLeft ? `-${OFFSET_X + 56}px` : `${OFFSET_X - 56}px`,
                        }}
                      >
                        {isCompleted ? (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-0.5 z-20">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 -mt-0.5" />
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          </div>
                        ) : null}

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
                            {isCompleted ? <Check className="w-6 h-6 stroke-[4]" /> : <span className="font-black text-lg">{day.dayNumber}</span>}
                          </div>
                        </button>

                        <div
                          className={cn(
                            "mt-3 w-32 text-center bg-card border border-border px-2 py-2 rounded-xl shadow-md transition-all",
                            isCurrent || isCompleted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                          )}
                        >
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            {t("challenge.day")} {day.dayNumber}
                          </p>
                          <p className="text-xs font-bold text-foreground leading-tight line-clamp-2">{day.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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

      {mapMode === "phaser" ? (
        <div className="fixed inset-0 z-[80] bg-[#020814] text-slate-100">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-md">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    <Gamepad2 className="h-3.5 w-3.5" />
                    {gameMapUi.badge}
                  </div>
                  <h3 className="mt-2 truncate text-xl font-bold text-white">{gameMapUi.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{gameMapUi.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeMapDay ? (
                    <Button
                      type="button"
                      className="h-11 rounded-full bg-cyan-500 px-5 text-slate-950 hover:bg-cyan-400"
                      onClick={() => handleDayClick(activeMapDay.id)}
                      disabled={activeMapDay.status === "locked"}
                    >
                      {t("challenge.day")} {activeMapDay.dayNumber}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setMapMode("classic")}
                  >
                    <MapIcon className="mr-2 h-4 w-4" />
                    {gameMapUi.exitFullScreen}
                  </Button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1">
              <PhaserChallengeMap
                fullScreen
                className="h-full"
                days={challengeMapDays}
                weekLabels={weekLabels}
                onDaySelect={handleDayClick}
                copy={{
                  loading: gameMapUi.loading,
                  error: gameMapUi.error,
                  helper: gameMapUi.helper,
                  legendCompleted: gameMapUi.legendCompleted,
                  legendCurrent: gameMapUi.legendCurrent,
                  legendUnlocked: gameMapUi.legendUnlocked,
                  legendLocked: gameMapUi.legendLocked,
                  approachPrompt: gameMapUi.approachPrompt,
                  pressPrompt: gameMapUi.pressPrompt,
                  viewLesson: gameMapUi.viewLesson,
                  reviewLesson: gameMapUi.reviewLesson,
                  viewPrompt: gameMapUi.viewPrompt,
                  reviewPrompt: gameMapUi.reviewPrompt,
                  dayLabel: gameMapUi.dayLabel,
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Challenge;
