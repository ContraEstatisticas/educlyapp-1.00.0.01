import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MobileNav } from "@/components/MobileNav";
import { WeeklyStreakBar } from "@/components/WeeklyStreakBar";
import { ProductOnboarding } from "@/components/onboarding";
import { useProductAccess } from "@/hooks/useProductAccess";
import { useTranslation } from "react-i18next";
import { TrailContentModal } from "@/components/dashboard/TrailContentModal";
import { DailyMissionsModal } from "@/components/dashboard/DailyMissionsModal";
import { FloatingEdiChat } from "@/components/chat/FloatingEdiChat";
import { Lock, LockOpen, Play, Target, Medal, Zap, Sparkles, ChevronRight, Brain, Code, Bookmark, RotateCcw, ArrowRight, Flame, Compass, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDailyLoginXP } from "@/hooks/useDailyLoginXP";
import { Badge } from "@/components/ui/badge";
import { aiMasteryTrails } from "@/lib/aiMasteryTrails";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";
import { isAiTrailLive } from "@/lib/aiTrailContent";

import mountainBackground from "../../assets/mountainBackground.png";
import mountainPerson from "../../assets/mountainPerson.png";
import corujaIA from "@/assets/IA.png";
import corujaFreelancerImg from "@/assets/coruja-freelancer.png";
import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import grokLogo from "@/assets/ai-logos/grok.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";
import ediLogo from "@/assets/edi-mascote.png";

const getTrailInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const CHALLENGE_28_DAYS_ID = "dfb76f1b-d272-4e4d-96b2-0bc4d3392489";

const getGreetingKeyByHour = (date: Date) => {
  const hour = date.getHours();

  if (hour < 12) return "dashboard.greetings.morning";
  if (hour < 18) return "dashboard.greetings.afternoon";
  return "dashboard.greetings.evening";
};

const MOCK_ACTIVE_SESSION = {
  current_day: 1,
  challenges: {
    id: "1",
    name: "Desafio Iniciante de IA",
    slug: "chatgpt",
    description: "Aprenda tudo sobre as 15 principais IAs do mercado...",
    duration_days: 28
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const productAccess = useProductAccess();
  const [trailModalOpen, setTrailModalOpen] = useState(false);
  const [missionsOpen, setMissionsOpen] = useState(false);
  const [trailsPanelOpen, setTrailsPanelOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);
  const greeting = t(getGreetingKeyByHour(new Date()));

  useDailyLoginXP();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: t("common.logout") });
    navigate("/auth");
  };

  const handleOpenEdiChat = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("toggle-edi-chat"));
  };

  const handleSpecializedTrailClick = (slug: string) => {
    if (isAiTrailLive(slug)) {
      navigate(`/trilhas-ia/${slug}`);
      setTrailsPanelOpen(false);
      return;
    }

    toast({
      title: aiTrailUi.toastTitle,
      description: aiTrailUi.toastDescription,
    });
  };

  const { data: completedDaysCount = 0 } = useQuery({
    queryKey: ["completed-days-count", CHALLENGE_28_DAYS_ID],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;
      const { data: challengeDays } = await supabase.from("challenge_days").select("id").eq("challenge_id", CHALLENGE_28_DAYS_ID);
      if (!challengeDays || challengeDays.length === 0) return 0;
      const dayIds = challengeDays.map((d) => d.id);
      const { count } = await supabase.from("user_day_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", true).in("challenge_day_id", dayIds);
      return count || 0;
    }
  });

  const { data: userDisplayName, isLoading: isUserDisplayNameLoading } = useQuery({
    queryKey: ["dashboard-welcome-user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return t("dashboard.student");

      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      return data?.full_name || user.email?.split("@")[0] || t("dashboard.student");
    }
  });

  const { data: streakData } = useQuery({
    queryKey: ["dashboard-user-streak-card"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { current_streak: 0, longest_streak: 0 };
      }

      const { data } = await supabase
        .from("user_streaks")
        .select("current_streak, longest_streak")
        .eq("user_id", user.id)
        .maybeSingle();

      return data || { current_streak: 0, longest_streak: 0 };
    }
  });

  const activeChallenge = MOCK_ACTIVE_SESSION.challenges;
  const totalDays = 28;
  const hasProgress = completedDaysCount > 0;
  const isCompleted = completedDaysCount >= totalDays;
  const progressPercentage = Math.round(completedDaysCount / totalDays * 100);
  const currentStreak = streakData?.current_streak || 0;
  const [animatedStreak, setAnimatedStreak] = useState(0);
  const normalizedProgress = Math.min(100, Math.max(0, progressPercentage));
  const progressRadius = 34;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressOffset = progressCircumference - (normalizedProgress / 100) * progressCircumference;

  useEffect(() => {
    const target = Math.max(0, currentStreak);
    setAnimatedStreak(0);

    if (target === 0) return;

    const duration = 1100;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedStreak(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentStreak]);

  const bookmarkLabel = isCompleted
    ? t("challenge.review")
    : hasProgress
      ? t("common.continue")
      : t("challenge.start");
  const handleContinueChallenge = () => navigate(`/desafio/${activeChallenge.slug}`);

  // --- CORREÇÃO DE SEGURANÇA AQUI ---
  // Verifica se o retorno é realmente um array antes de tentar usar.
  // Se o JSON não tiver carregado, usa um array vazio [] para não quebrar a tela.
  const getFeaturesArray = (key: string) => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };

  const featuredCards = [
    {
      img: corujaIA,
      title: t("dashboard.featured.assistants.title"),
      subtitle: t("dashboard.featured.assistants.subtitle"),
      link: "/assistentes",
      gradient: "from-violet-500/20 to-purple-500/10",
      icon: Brain,
      stats: t("dashboard.featured.assistants.stats"),
      buttonText: t("dashboard.featured.assistants.button"),
      features: getFeaturesArray("dashboard.featured.assistants.features"),
      productType: "ai_hub" as const
    },
    {
      img: corujaFreelancerImg,
      title: t("dashboard.featured.freelancer.title"),
      subtitle: t("dashboard.featured.freelancer.subtitle"),
      link: "/freelancer",
      gradient: "from-emerald-500/20 to-teal-500/10",
      icon: Code,
      stats: t("dashboard.featured.freelancer.stats"),
      buttonText: t("dashboard.featured.freelancer.button"),
      features: getFeaturesArray("dashboard.featured.freelancer.features"),
      productType: "freelancer" as const
    }];

  return (
    <main className="dashboard-texture min-h-screen bg-background text-foreground pl-safe pr-safe pb-mobile-nav md:pb-20">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .shimmer-effect {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.1) 50%, 
            transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes productCardEnter {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes productLockPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.2);
          }
          55% {
            transform: scale(1.06);
            box-shadow: 0 0 0 12px rgba(249, 115, 22, 0);
          }
        }

        .product-showcase-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.75rem;
          border: 1px solid hsl(var(--border));
          background: linear-gradient(155deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.95) 100%);
          box-shadow: 0 24px 42px -36px rgba(15, 23, 42, 0.58);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          animation: productCardEnter 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .product-showcase-card:hover {
          transform: translateY(-5px);
          border-color: hsl(var(--primary) / 0.36);
          box-shadow: 0 30px 58px -36px rgba(15, 23, 42, 0.7);
        }

        .product-showcase-card::after {
          content: "";
          position: absolute;
          inset: -18% 40% auto -42%;
          height: 120%;
          transform: rotate(18deg);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.34) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.28s ease;
          pointer-events: none;
        }

        .product-showcase-card:hover::after {
          opacity: 0.58;
        }

        .dark .product-showcase-card::after {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.16) 50%,
            transparent 100%
          );
        }

        .product-lock-pulse {
          animation: productLockPulse 2.6s ease-in-out infinite;
        }

        .name-loading-skeleton {
          display: inline-block;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2) 0%,
            rgba(148, 163, 184, 0.45) 50%,
            rgba(148, 163, 184, 0.2) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.35s ease-in-out infinite;
        }

        .dark .name-loading-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.22) 0%,
            rgba(148, 163, 184, 0.4) 50%,
            rgba(148, 163, 184, 0.22) 100%
          );
        }

        @keyframes mergedHeroCardEnter {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dashboard-hero-merged {
          animation: mergedHeroCardEnter 0.62s cubic-bezier(0.2, 0.82, 0.2, 1) both;
        }

        @keyframes heroOrbFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes heroOrbRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes heroOrbPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.22);
          }
          60% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
        }

        .hero-decorative-orb {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 9999px;
          border: 1px solid rgba(249, 115, 22, 0.28);
          background: radial-gradient(circle at 35% 35%, rgba(251, 146, 60, 0.3), rgba(249, 115, 22, 0.08));
          animation: heroOrbFloat 3.2s ease-in-out infinite;
        }

        .hero-decorative-orb::before {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          border: 1px dashed rgba(249, 115, 22, 0.22);
          animation: heroOrbRotate 8.5s linear infinite;
        }

        .hero-decorative-orb::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          animation: heroOrbPulse 2.3s ease-out infinite;
        }

        .hero-decorative-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--primary));
        }

        @keyframes trailsFabPulse {
          0%, 100% {
            box-shadow: 0 10px 22px -14px rgba(249, 115, 22, 0.5);
          }
          50% {
            box-shadow: 0 14px 28px -14px rgba(249, 115, 22, 0.72);
          }
        }

        @keyframes trailsFabFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes trailsPanelIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .trails-fab-focus {
          animation: trailsFabPulse 2.8s ease-in-out infinite, trailsFabFloat 3.1s ease-in-out infinite;
        }

        .trails-panel-open {
          animation: trailsPanelIn 0.28s ease-out both;
        }
      `}</style>

      <ProductOnboarding />
      <div
        className={`sticky top-0 !z-[130] w-full border-b transition-all duration-300 pt-safe ${
          isNavbarScrolled
            ? "border-border/60 bg-background/55 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/45"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <DashboardHeader onLogout={handleLogout} onOpenEdiChat={handleOpenEdiChat} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 pt-4 !z-auto">

        {/* Welcome Banner */}
        <div className="dashboard-hero-merged relative z-10 mt-2 mb-8 rounded-3xl border border-border bg-card/90 px-5 py-5 shadow-sm md:mt-4 md:px-7 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-[680px]">
              <h1 className="mb-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {greeting},{" "}
                {isUserDisplayNameLoading ? (
                  <span
                    className="name-loading-skeleton h-[0.9em] w-[9.2rem] align-[-0.08em] md:w-[12rem]"
                    aria-label={t("dashboard.loading_user_name")}
                  />
                ) : (
                  userDisplayName || t("dashboard.student")
                )}
                .
              </h1>
              <p className="text-slate-600 dark:text-muted-foreground">
                {t("dashboard.hero_subtitle_prefix")}{" "}
                <span className="inline-block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_8px_rgba(249,115,22,0.28)]">
                  Educly
                </span>
                {t("dashboard.hero_subtitle_suffix")}
              </p>

              <div className="mt-4 flex items-center gap-3" aria-hidden>
                <div className="hero-decorative-orb">
                  <span className="hero-decorative-icon">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>
                <div className="h-px w-16 bg-gradient-to-r from-primary/45 to-transparent" />
              </div>
            </div>

            <div className="w-full min-w-[210px] rounded-[24px] border border-primary/25 bg-gradient-to-br from-primary/15 via-orange-500/10 to-primary/5 px-4 py-5 shadow-[0_18px_32px_-26px_rgba(249,115,22,0.55)] sm:w-[240px]">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative mb-3">
                  <span className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse" />
                  <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
                    <Flame className="h-8 w-8 text-primary fill-current animate-streak-glow" />
                  </span>
                </div>

                <div className="flex items-end justify-center gap-2">
                  <span className="text-6xl font-extrabold leading-none text-primary">{animatedStreak}</span>
                  <span className="pb-2 text-lg font-semibold text-primary/85">
                    {animatedStreak === 1 ? t("challenge.day") : t("challenge.days")}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-primary/80">
                  {t("dashboard.streak_in_sequence")}
                </p>
              </div>
            </div>
          </div>

          <div id="weekly-streak" className="mt-6 border-t border-border/70 pt-4">
            <WeeklyStreakBar />
          </div>
        </div>

        <div className="relative z-20 space-y-10 mt-14 md:mt-20 lg:mt-[10px] mb-[3px]">
          {/* CARD PRINCIPAL */}
          <div id="active-challenge" className="relative z-20 overflow-visible rounded-3xl border border-border bg-card/95 p-4 shadow-sm md:p-6">
            <div className="grid gap-7 lg:grid-cols-[300px_1fr_190px] lg:items-center lg:gap-10">
              <button
                type="button"
                onClick={handleContinueChallenge}
                className="group/challenge-image relative overflow-visible rounded-2xl text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label={t("dashboard.continue_button")}
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/20 transition-all duration-300 group-hover/challenge-image:border-primary/30 group-hover/challenge-image:shadow-[0_20px_34px_-20px_rgba(249,115,22,0.5)]">
                  <img
                    src={mountainBackground}
                    className="h-44 w-full object-cover object-center transition-transform duration-500 ease-out group-hover/challenge-image:scale-[1.015] md:h-[200px] md:object-top lg:object-center"
                    alt={t("challenges.iniciante-ia.name")}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),inset_0_-24px_34px_rgba(15,23,42,0.34)] dark:shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14),inset_0_-28px_38px_rgba(2,6,23,0.58)]" />
                </div>

                <img
                  src={mountainPerson}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-0 -top-12 z-20 h-[calc(100%+3rem)] w-full rounded-2xl object-cover object-top drop-shadow-[0_16px_24px_rgba(15,23,42,0.52)] transition-transform duration-500 ease-out will-change-transform group-hover/challenge-image:-translate-y-0.5 md:top-0 md:h-full md:object-top lg:-top-14 lg:h-[calc(100%+3.6rem)] lg:object-center"
                />
              </button>

              <div className="space-y-4 lg:pr-2">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {t("challenges.iniciante-ia.name")}
                </h3>

                <p className="max-w-2xl text-slate-600 dark:text-muted-foreground text-base leading-relaxed">
                  {t("challenges.iniciante-ia.description")}
                </p>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {completedDaysCount}/{totalDays} {t("dashboard.days_label")}
                  </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-muted-foreground/80">
                    {t("dashboard.challenge_progress")}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-primary/[0.03] p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-24 w-24">
                    <svg
                      className="h-24 w-24 -rotate-90"
                      viewBox="0 0 88 88"
                      aria-label={t("dashboard.challenge_progress")}
                    >
                      <circle
                        cx="44"
                        cy="44"
                        r={progressRadius}
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="44"
                        cy="44"
                        r={progressRadius}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${progressCircumference} ${progressCircumference}`}
                        strokeDashoffset={progressOffset}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
                      {normalizedProgress}%
                    </span>
                  </div>

                  <Button
                    className="mt-3 h-10 w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={handleContinueChallenge}
                  >
                    {bookmarkLabel}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 h-10 w-full rounded-xl border-border/80 bg-background/75 font-semibold text-foreground hover:bg-background"
                    onClick={() => setTrailModalOpen(true)}
                  >
                    {t("dashboard.view_content")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section id="dashboard-quick-cards" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button
              className="group rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              onClick={() => setMissionsOpen(true)}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t("dashboard.missions.title")}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-muted-foreground">
                    {t("dashboard.missions.quickSubtitle", "Tarefas de hoje em um clique")}
                  </p>
                </div>
              </div>
            </button>

            <button
              className="group rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              onClick={() => navigate("/medalhas")}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Medal className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t("dashboard.medals.title")}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-muted-foreground">
                    {t("dashboard.medals.quickSubtitle", "Seu progresso e conquistas")}
                  </p>
                </div>
              </div>
            </button>

            <button
              className="group rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              onClick={() => navigate("/trilhas-ia")}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t("dashboard.specialty_trails.title", "Trilhas de especialidades")}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-muted-foreground">
                    {t("dashboard.specialty_trails.quickSubtitle", "Explore trilhas por especialidade")}
                  </p>
                </div>
              </div>
            </button>
          </section>

          {/* GRID DE CARDS DESTAQUE */}
          <div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {featuredCards.map((card, index) => {
                const hasCardAccess = productAccess.hasAccess(card.productType);
                const isAccessLoading = productAccess.isLoading;
                const isAIPack = card.productType === "ai_hub";
                const aiLogos = [chatgptLogo, geminiLogo, claudeLogo, grokLogo, nanobananaLogo, ediLogo];
                const visibleFeatures = Array.isArray(card.features) ? card.features.slice(0, 3) : [];
                const statusLabel = hasCardAccess
                  ? t("dashboard.card_status.active", "Ativo")
                  : t("dashboard.card_status.locked", "Bloqueado");

                return (
                  <div id={`card-${index}`} key={index} className="h-full">
                    <button
                      type="button"
                      onClick={() => navigate(card.link)}
                      className={`product-showcase-card group flex h-full w-full flex-col p-6 text-left ${
                        !hasCardAccess ? "border-primary/25" : ""
                      }`}
                      style={{ animationDelay: `${index * 85}ms` }}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 ${
                          isAIPack
                            ? "bg-[radial-gradient(circle_at_10%_12%,rgba(139,92,246,0.2),transparent_44%),radial-gradient(circle_at_96%_84%,rgba(168,85,247,0.16),transparent_40%)]"
                            : "bg-[radial-gradient(circle_at_10%_12%,rgba(16,185,129,0.2),transparent_44%),radial-gradient(circle_at_96%_84%,rgba(20,184,166,0.16),transparent_40%)]"
                        }`}
                      />

                      <div className="relative z-10 mb-5 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
                              isAIPack
                                ? "border-violet-200/70 bg-violet-50/80 dark:border-violet-500/40 dark:bg-violet-500/15"
                                : "border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-emerald-500/15"
                            }`}
                          >
                            <img src={card.img} className="h-10 w-10 object-contain" alt={card.title} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                              {t(`dashboard.premium_labels.${card.productType}`)}
                            </p>
                            <h3 className="mt-1 truncate text-2xl font-bold text-slate-900 dark:text-white">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] ${
                            hasCardAccess
                              ? "border-emerald-300/70 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/15 dark:text-emerald-300"
                              : "border-orange-300/70 bg-orange-50 text-orange-700 dark:border-orange-500/50 dark:bg-orange-500/15 dark:text-orange-300"
                          }`}
                        >
                          {hasCardAccess ? <LockOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                          {statusLabel}
                        </span>
                      </div>

                      <p className="relative z-10 mb-5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                        {card.subtitle}
                      </p>

                      {isAIPack ? (
                        <div className="relative z-10 mb-5 space-y-3">
                          <div className="grid grid-cols-6 gap-2">
                            {aiLogos.map((logo, idx) => (
                              <div
                                key={idx}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 p-1.5"
                              >
                                <img src={logo} alt="" className="h-full w-full rounded-md object-contain" />
                              </div>
                            ))}
                          </div>
                          <p className="text-sm font-medium text-violet-700 dark:text-violet-300">{card.stats}</p>
                        </div>
                      ) : (
                        <div className="relative z-10 mb-5 space-y-2">
                          {visibleFeatures.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/65 px-3 py-2"
                            >
                              <Zap className="h-3.5 w-3.5 text-primary" />
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="relative z-10 mt-auto flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <card.icon className="h-4 w-4 text-primary" />
                          <span>{card.stats}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${hasCardAccess ? "text-foreground" : "text-primary"}`}>
                          {hasCardAccess
                            ? t("common.continue", "Continuar")
                            : t("dashboard.unlock_to_access", "Desbloqueie para acessar")}
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>

                      {!isAccessLoading && !hasCardAccess && (
                        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[inherit] bg-background/62 px-8 text-center backdrop-blur-[2.5px]">
                          <div
                            className={`product-lock-pulse mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                              isAIPack
                                ? "border-violet-300/75 bg-violet-100/85 dark:border-violet-500/55 dark:bg-violet-500/20"
                                : "border-emerald-300/75 bg-emerald-100/85 dark:border-emerald-500/55 dark:bg-emerald-500/20"
                            }`}
                          >
                            <Lock className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-base font-bold text-foreground">
                            {t("dashboard.unlock_to_access", "Desbloqueie para acessar")}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t("dashboard.unlock_hint", "Clique no card para ver os planos e adquirir")}
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {trailsPanelOpen && (
          <button
            aria-label={t("dashboard.nav_close_trails_panel")}
            className="fixed inset-0 z-[310] hidden bg-black/25 backdrop-blur-[1px] md:block"
            onClick={() => setTrailsPanelOpen(false)}
          />
        )}

        <div
          className={`fixed right-4 z-[320] hidden w-[min(92vw,460px)] transition-all duration-300 md:right-6 ${
            trailsPanelOpen
              ? "trails-panel-open bottom-[6.25rem] opacity-100"
              : "bottom-[5.8rem] pointer-events-none translate-y-3 opacity-0"
          } md:block`}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_28px_56px_-34px_rgba(15,23,42,0.6)]">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div>
                <p className="text-sm font-bold text-foreground">{t("dashboard.nav_trails_button")}</p>
                <p className="text-xs text-muted-foreground">{aiTrailUi.dashboardTitle}</p>
              </div>

              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setTrailsPanelOpen(false)}
                aria-label={t("dashboard.nav_close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[58vh] space-y-3 overflow-y-auto p-4">
              {aiMasteryTrails.map((trail) => {
                const trailMeta = getAiTrailLocalizedMeta(trail.slug, i18n.resolvedLanguage || i18n.language);
                const trailIsLive = isAiTrailLive(trail.slug);

                return (
                  <button
                    key={trail.slug}
                    onClick={() => handleSpecializedTrailClick(trail.slug)}
                    className="group w-full rounded-2xl border border-border bg-background/70 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                        {trail.logo ? (
                          <img src={trail.logo} alt={trail.name} className="h-7 w-7 object-contain" />
                        ) : (
                          <span className="text-sm font-black text-primary">{getTrailInitials(trail.name)}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-bold text-foreground">{trail.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{trailMeta.signature}</p>
                        <p className="mt-2 text-xs font-semibold text-primary">
                          {trailIsLive ? aiTrailUi.openTrail : aiTrailUi.comingSoon}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`fixed right-3 z-[320] w-[min(94vw,430px)] transition-all duration-300 md:hidden ${
            trailsPanelOpen
              ? "trails-panel-open bottom-[calc(5.2rem+env(safe-area-inset-bottom,0px))] opacity-100"
              : "bottom-[calc(4.8rem+env(safe-area-inset-bottom,0px))] pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_44px_-28px_rgba(15,23,42,0.72)]">
            <span className="pointer-events-none absolute -bottom-1.5 right-[2.85rem] h-3 w-3 rotate-45 border-b border-r border-border bg-card" />

            <div className="flex items-center justify-between border-b border-border/70 px-3.5 py-2.5">
              <div>
                <p className="text-sm font-bold text-foreground">Trilhas</p>
                <p className="text-[11px] text-muted-foreground">{aiTrailUi.dashboardTitle}</p>
              </div>

              <button
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setTrailsPanelOpen(false)}
                aria-label={t("dashboard.nav_close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[48vh] space-y-2.5 overflow-y-auto p-3.5">
              {aiMasteryTrails.map((trail) => {
                const trailMeta = getAiTrailLocalizedMeta(trail.slug, i18n.resolvedLanguage || i18n.language);
                const trailIsLive = isAiTrailLive(trail.slug);

                return (
                  <button
                    key={trail.slug}
                    onClick={() => handleSpecializedTrailClick(trail.slug)}
                    className="group w-full rounded-xl border border-border bg-background/75 p-2.5 text-left transition-all duration-200 active:scale-[0.995]"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10">
                        {trail.logo ? (
                          <img src={trail.logo} alt={trail.name} className="h-6 w-6 object-contain" />
                        ) : (
                          <span className="text-xs font-black text-primary">{getTrailInitials(trail.name)}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-bold text-foreground">{trail.name}</p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{trailMeta.signature}</p>
                        <p className="mt-1.5 text-[11px] font-semibold text-primary">
                          {trailIsLive ? aiTrailUi.openTrail : aiTrailUi.comingSoon}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <FloatingEdiChat showLauncher={false} />

        <MobileNav
          onTrailsClick={() => setTrailsPanelOpen((prev) => !prev)}
          trailsOpen={trailsPanelOpen}
        />
      </div>

      <TrailContentModal open={trailModalOpen} onOpenChange={setTrailModalOpen} />
      <DailyMissionsModal open={missionsOpen} onOpenChange={setMissionsOpen} />
    </main>);

};

export default Dashboard;
