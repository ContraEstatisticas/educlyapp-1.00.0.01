import { LogOut, Shield, Mail, MessageCircle, Compass, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ModeToggle } from "@/components/ModeToggle";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiMasteryTrails } from "@/lib/aiMasteryTrails";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";
import { isAiTrailLive } from "@/lib/aiTrailContent";
import { getXPForLevel, getXPForNextLevel } from "@/hooks/useUserLevel";

interface DashboardHeaderProps {
  onLogout: () => void;
  onOpenEdiChat?: () => void;
}

export const DashboardHeader = ({ onLogout, onOpenEdiChat }: DashboardHeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      return {
        fullName: data?.full_name || user.email?.split("@")[0] || t("dashboard.student"),
        avatarUrl: data?.avatar_url,
      };
    },
  });

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data } = await supabase.rpc("is_admin");
      return !!data;
    },
  });

  const { data: userLevelData } = useQuery({
    queryKey: ["dashboard-user-level"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return {
          currentLevel: 1,
          currentXPInLevel: 0,
          xpNeededForNext: getXPForNextLevel(1) - getXPForLevel(1),
          progressPercent: 0,
        };
      }

      const { data } = await supabase
        .from("user_levels")
        .select("current_level, total_xp_earned")
        .eq("user_id", user.id)
        .maybeSingle();

      const currentLevel = data?.current_level || 1;
      const totalXP = data?.total_xp_earned || 0;
      const xpForCurrentLevel = getXPForLevel(currentLevel);
      const xpForNextLevel = getXPForNextLevel(currentLevel);
      const xpNeededForNext = Math.max(1, xpForNextLevel - xpForCurrentLevel);
      const rawCurrentXPInLevel = totalXP - xpForCurrentLevel;
      const currentXPInLevel = Math.max(0, Math.min(rawCurrentXPInLevel, xpNeededForNext));
      const progressPercent =
        currentLevel >= 20 ? 100 : Math.max(0, Math.min((currentXPInLevel / xpNeededForNext) * 100, 100));

      return {
        currentLevel,
        currentXPInLevel,
        xpNeededForNext,
        progressPercent,
      };
    },
  });

  const userName = profile?.fullName || t("dashboard.student");
  const userLevel = userLevelData?.currentLevel || 1;
  const userLevelProgress = userLevelData?.progressPercent || 0;
  const userLevelXPLabel = `${Math.round(userLevelData?.currentXPInLevel || 0)}/${Math.round(
    userLevelData?.xpNeededForNext || 1,
  )} XP`;
  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const standardControlClass =
    "h-10 rounded-xl border border-slate-300/90 dark:border-border/70 bg-card/70 backdrop-blur-sm hover:border-slate-400 dark:hover:border-primary/35 hover:bg-card";
  const standardIconControlClass = `${standardControlClass} w-10 p-0`;
  const isDashboardPage = location.pathname === "/dashboard";

  const handleBackNavigation = () => {
    const historyIndex =
      typeof window !== "undefined" && typeof window.history.state?.idx === "number"
        ? window.history.state.idx
        : 0;

    if (historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <header className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
      <div className="hidden md:flex md:items-center md:gap-3">
        {!isDashboardPage && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBackNavigation}
            className={`${standardControlClass} px-3 text-sm font-semibold text-foreground`}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {t("common.back")}
          </Button>
        )}

        <Button
          type="button"
          onClick={onOpenEdiChat}
          className="group h-10 rounded-full bg-gradient-to-r from-primary to-orange-500 px-4 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:from-primary/90 hover:to-orange-500/90"
        >
          <MessageCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {t("dashboard.nav_edi_button")}
          <span className="ml-2 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)] animate-pulse" />
        </Button>

        <div className="group relative !z-[240]">
          <button
            type="button"
            onClick={() => navigate("/trilhas-ia")}
            className={`${standardControlClass} flex items-center gap-2 px-3 transition-all`}
          >
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{t("dashboard.nav_trails_button")}</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[11px] font-semibold text-primary">
              {aiMasteryTrails.length}
            </span>
          </button>

          <div className="pointer-events-none absolute right-0 top-full !z-[260] w-[330px] pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            <div className="rounded-2xl border border-border/70 bg-popover/95 p-2 shadow-xl backdrop-blur-md">
              <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("dashboard.nav_trails_list_title")}
              </p>

              <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
                {aiMasteryTrails.map((trail) => {
                  const trailMeta = getAiTrailLocalizedMeta(trail.slug, currentLanguage);
                  const trailIsLive = isAiTrailLive(trail.slug);
                  const fallbackLogoLabel = trail.name.slice(0, 2).toUpperCase();

                  return (
                    <button
                      key={trail.slug}
                      type="button"
                      onClick={() => navigate(trailIsLive ? `/trilhas-ia/${trail.slug}` : "/trilhas-ia")}
                      className="flex w-full items-center gap-3 rounded-xl border border-transparent bg-transparent px-3 py-2 text-left transition-all hover:border-primary/20 hover:bg-muted/50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-card">
                        {trail.logo ? (
                          <img src={trail.logo} alt={trail.name} className="h-5 w-5 object-contain" />
                        ) : (
                          <span className="text-[11px] font-semibold text-muted-foreground">{fallbackLogoLabel}</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{trail.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{trailMeta.category || trail.category}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                            trailIsLive
                              ? "border-emerald-300/60 bg-emerald-100/70 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "border-orange-300/60 bg-orange-100/70 text-orange-700 dark:border-orange-500/50 dark:bg-orange-500/20 dark:text-orange-300"
                          }`}
                        >
                          {trailIsLive ? aiTrailUi.availableNow : aiTrailUi.comingSoon}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/80" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2.5 md:hidden">
        <button
          onClick={() => navigate("/profile")}
          className="group flex h-14 min-w-0 flex-[1.35] items-center gap-2.5 rounded-2xl border border-slate-300/90 dark:border-border/70 bg-card/70 pl-2 pr-2.5 py-1.5 shadow-sm transition-all hover:border-slate-400 dark:hover:border-primary/35 hover:bg-card"
        >
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={profile?.avatarUrl || `https://img.freepik.com/vetores-premium/ilustracao-sem-rosto-avatar_573563-12088.jpg?semt=ais_hybrid&w=740&q=80`} />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 text-left leading-tight">
            <p className="truncate text-[0.98rem] font-semibold text-foreground">
              {isProfileLoading ? (
                <span
                  className="name-loading-skeleton inline-block h-[0.9em] w-[8.6rem] align-[-0.06em]"
                  aria-label={t("dashboard.loading_user_name")}
                />
              ) : (
                userName
              )}
            </p>
            <div className="mt-0.5 flex items-center justify-between gap-1.5">
              <p className="text-[11px] text-muted-foreground">{t("dashboard.nav_level", { level: userLevel })}</p>
              <p className="truncate text-[10px] font-semibold text-muted-foreground/90">{userLevelXPLabel}</p>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-orange-500 transition-[width] duration-700 ease-out"
                style={{ width: `${userLevelProgress}%` }}
              />
            </div>
          </div>
        </button>

        <div className="flex h-14 w-[148px] shrink-0 items-center gap-1.5 rounded-2xl border border-slate-300/90 bg-card/70 px-1.5 py-2 shadow-sm dark:border-border/70">
          <LanguageSelector className="h-10 w-[70px] rounded-xl border border-slate-300/90 bg-card/70 px-1 dark:border-border/70" />
          <ModeToggle className="h-10 w-10 rounded-xl border border-slate-300/90 bg-card/70 dark:border-border/70" />
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            className="h-10 w-10 rounded-xl border border-slate-300/90 bg-card/70 text-muted-foreground hover:bg-accent/60 dark:border-border/70"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {isAdmin && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/admin/analytics")}
              className={standardIconControlClass}
              title="Admin Analytics"
            >
              <Shield className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/admin/emails")}
              className={standardIconControlClass}
              title="Admin Emails"
            >
              <Mail className="w-4 h-4 text-muted-foreground" />
            </Button>
          </>
        )}

        <ModeToggle className={standardIconControlClass} />
        <LanguageSelector className="h-10 rounded-xl border border-slate-300/90 dark:border-border/70 bg-card/70 px-3 sm:w-[152px]" />

        <button
          onClick={() => navigate("/profile")}
          className="group flex min-h-[52px] items-center gap-2 rounded-xl border border-slate-300/90 dark:border-border/70 bg-card/70 pl-1.5 pr-3 py-1.5 transition-all hover:border-slate-400 dark:hover:border-primary/35 hover:bg-card"
        >
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={profile?.avatarUrl || `https://img.freepik.com/vetores-premium/ilustracao-sem-rosto-avatar_573563-12088.jpg?semt=ais_hybrid&w=740&q=80`} />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 text-left leading-tight">
            <p className="text-sm font-semibold text-foreground truncate max-w-[130px]">
              {isProfileLoading ? (
                <span
                  className="name-loading-skeleton inline-block h-[0.9em] w-[7.4rem] align-[-0.06em]"
                  aria-label={t("dashboard.loading_user_name")}
                />
              ) : (
                userName
              )}
            </p>
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <p className="text-[11px] text-muted-foreground">{t("dashboard.nav_level", { level: userLevel })}</p>
              <p className="text-[10px] font-medium text-muted-foreground/90 truncate">{userLevelXPLabel}</p>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-orange-500 transition-[width] duration-700 ease-out"
                style={{ width: `${userLevelProgress}%` }}
              />
            </div>
          </div>
        </button>

        <Button variant="outline" size="icon" onClick={onLogout} className={standardIconControlClass}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <div className="md:hidden flex items-center gap-2">
        {!isDashboardPage && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleBackNavigation}
            className="h-11 w-11 shrink-0 rounded-full border border-slate-300/90 bg-card/75 dark:border-border/70"
            aria-label={t("common.back")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <Button
          type="button"
          onClick={onOpenEdiChat}
          className={`h-11 rounded-full bg-gradient-to-r from-primary to-orange-500 px-4 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:from-primary/90 hover:to-orange-500/90 ${
            isDashboardPage ? "w-full" : "flex-1"
          }`}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {t("dashboard.nav_edi_button")}
        </Button>
      </div>
    </header>
  );
};
