import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WeeklyStreakBar } from "@/components/WeeklyStreakBar";
import mountainBackground from "../../../assets/mountainBackground.png";
import mountainPerson from "../../../assets/mountainPerson.png";
import { Bookmark, ChevronRight, Clock3, Flame, RotateCcw, Star, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type ShortcutKey =
  | "challenge"
  | "missions"
  | "medals"
  | "assistants"
  | "freelancer"
  | "trails"
  | "edi";

interface RecentActivityView {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  route: string | "challenge";
  Icon: LucideIcon;
}

interface ShortcutView {
  key: ShortcutKey;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
}

interface DashboardTodayHomeProps {
  greeting: string;
  isUserDisplayNameLoading: boolean;
  userDisplayName: string;
  animatedStreak: number;
  completedDaysCount: number;
  totalDays: number;
  normalizedProgress: number;
  estimatedMinutes: number;
  nextDayNumber: number;
  dailyGoalCompleted: boolean;
  isCompleted: boolean;
  bookmarkLabel: string;
  challengeTitle: string;
  recentActivities: RecentActivityView[];
  favoriteShortcuts: ShortcutView[];
  suggestedShortcuts: ShortcutView[];
  onResumeJourney: () => void;
  onOpenTrailContent: () => void;
  onOpenMissions: () => void;
  onRecentNavigate: (route: string | "challenge") => void;
  onShortcutAction: (key: ShortcutKey) => void;
  onToggleFavorite: (key: ShortcutKey) => void;
}

export const DashboardTodayHome = ({
  greeting,
  isUserDisplayNameLoading,
  userDisplayName,
  animatedStreak,
  completedDaysCount,
  totalDays,
  normalizedProgress,
  estimatedMinutes,
  nextDayNumber,
  dailyGoalCompleted,
  isCompleted,
  bookmarkLabel,
  challengeTitle,
  recentActivities,
  favoriteShortcuts,
  suggestedShortcuts,
  onResumeJourney,
  onOpenTrailContent,
  onOpenMissions,
  onRecentNavigate,
  onShortcutAction,
  onToggleFavorite,
}: DashboardTodayHomeProps) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-hero-merged relative z-10 mt-2 mb-8 rounded-3xl border border-border bg-card/90 px-5 py-5 shadow-sm md:mt-4 md:px-7 md:py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full md:max-w-[760px]">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/12">
                {t("dashboard.today.badge", { defaultValue: "Hoje" })}
              </Badge>
              <Badge variant="outline" className="rounded-full border-border/70 px-3 py-1 text-xs font-semibold text-foreground">
                <Flame className="mr-1.5 h-3.5 w-3.5 text-primary" />
                {animatedStreak} {animatedStreak === 1 ? t("challenge.day") : t("challenge.days")}
              </Badge>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
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

            <p className="max-w-3xl text-base text-slate-600 dark:text-muted-foreground">
              {t("dashboard.today.subtitle", {
                defaultValue: "Sua home agora prioriza o que importa hoje: retomar, bater a meta do dia e voltar rápido ao que você já usa.",
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-auto sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("dashboard.today.progressCard", { defaultValue: "Progresso" })}
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">{normalizedProgress}%</p>
              <p className="text-sm text-muted-foreground">
                {completedDaysCount}/{totalDays} {t("dashboard.days_label")}
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("dashboard.today.nextStepCard", { defaultValue: "Próximo passo" })}
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {isCompleted
                  ? t("dashboard.today.reviewLabel", { defaultValue: "Revisar" })
                  : t("dashboard.today.dayLabel", { defaultValue: "Dia {{day}}", day: nextDayNumber })}
              </p>
              <p className="text-sm text-muted-foreground">
                {estimatedMinutes} {t("dashboard.today.minutesShort", { defaultValue: "min" })}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/12 via-orange-500/10 to-transparent px-4 py-3 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                {t("dashboard.today.focusCard", { defaultValue: "Foco de hoje" })}
              </p>
              <p className="mt-2 text-base font-bold text-foreground">
                {dailyGoalCompleted
                  ? t("dashboard.today.goalComplete", { defaultValue: "Meta do dia concluída" })
                  : t("dashboard.today.goalPending", { defaultValue: "Concluir sua próxima sessão" })}
              </p>
              <p className="text-sm text-muted-foreground">
                {dailyGoalCompleted
                  ? t("dashboard.today.goalCompleteHint", { defaultValue: "Você já manteve sua sequência hoje." })
                  : t("dashboard.today.goalPendingHint", {
                      defaultValue: "Reserve {{minutes}} min e mantenha o ritmo.",
                      minutes: estimatedMinutes,
                    })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.9fr)]">
          <div id="active-challenge" className="rounded-[28px] border border-border/70 bg-background/70 p-4 shadow-sm md:p-5">
            <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-center">
              <button
                type="button"
                onClick={onResumeJourney}
                className="group/challenge-image relative overflow-visible rounded-2xl text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label={t("dashboard.continue_button")}
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/20 transition-all duration-300 group-hover/challenge-image:border-primary/30 group-hover/challenge-image:shadow-[0_20px_34px_-20px_rgba(249,115,22,0.5)]">
                  <img
                    src={mountainBackground}
                    className="h-44 w-full object-cover object-center transition-transform duration-500 ease-out group-hover/challenge-image:scale-[1.015] md:h-[220px] md:object-top lg:h-[240px]"
                    alt={challengeTitle}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent" />
                </div>

                <img
                  src={mountainPerson}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-0 -top-10 z-20 h-[calc(100%+2.5rem)] w-full rounded-2xl object-cover object-top drop-shadow-[0_16px_24px_rgba(15,23,42,0.52)] transition-transform duration-500 ease-out will-change-transform group-hover/challenge-image:-translate-y-0.5 lg:-top-12 lg:h-[calc(100%+3rem)]"
                />
              </button>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/12">
                    {t("dashboard.today.resumeBadge", { defaultValue: "Continuar de onde parei" })}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-border/70 px-3 py-1 text-xs font-semibold text-foreground">
                    {isCompleted
                      ? t("dashboard.today.reviewLabel", { defaultValue: "Revisar" })
                      : t("dashboard.today.dayLabel", { defaultValue: "Dia {{day}}", day: nextDayNumber })}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl dark:text-white">
                    {challengeTitle}
                  </h2>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-muted-foreground">
                    {isCompleted
                      ? t("dashboard.today.reviewHint", {
                          defaultValue: "Você concluiu a trilha principal. Agora vale revisar os pontos mais importantes ou revisitar conteúdos-chave.",
                        })
                      : t("dashboard.today.resumeHint", {
                          defaultValue: "Seu próximo passo está pronto. Volte exatamente para o ponto onde você parou e mantenha a sensação de avanço.",
                        })}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-muted-foreground/80">
                    <span>{t("dashboard.challenge_progress")}</span>
                    <span>{normalizedProgress}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-orange-500 to-primary transition-all duration-700 ease-out"
                      style={{ width: `${normalizedProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    className="h-11 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90"
                    onClick={onResumeJourney}
                  >
                    {bookmarkLabel}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-xl border-border/80 bg-background/75 px-5 font-semibold text-foreground hover:bg-background"
                    onClick={onOpenTrailContent}
                  >
                    {t("dashboard.view_content")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[28px] border border-border/70 bg-background/70 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t("dashboard.today.timeEstimate", { defaultValue: "Tempo estimado" })}
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-foreground">
                    {estimatedMinutes}
                    <span className="ml-1 text-lg font-semibold text-muted-foreground">
                      {t("dashboard.today.minutesShort", { defaultValue: "min" })}
                    </span>
                  </p>
                </div>

                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Clock3 className="h-6 w-6" />
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {isCompleted
                  ? t("dashboard.today.timeEstimateReviewHint", {
                      defaultValue: "Sessão curta ideal para revisar um ponto importante e consolidar o que você aprendeu.",
                    })
                  : t("dashboard.today.timeEstimateHint", {
                      defaultValue: "Estimativa para completar seu próximo passo sem pressa, mantendo ritmo e clareza.",
                    })}
              </p>
            </div>

            <div className="rounded-[28px] border border-border/70 bg-background/70 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t("dashboard.today.dailyGoal", { defaultValue: "Meta do dia" })}
                  </p>
                  <p className="mt-3 text-xl font-bold text-foreground">
                    {dailyGoalCompleted
                      ? t("dashboard.today.goalComplete", { defaultValue: "Meta do dia concluída" })
                      : t("dashboard.today.goalCardTitle", {
                          defaultValue: "Concluir {{target}}",
                          target: isCompleted
                            ? t("dashboard.today.reviewLabel", { defaultValue: "uma revisão" })
                            : t("dashboard.today.dayLabel", { defaultValue: "o Dia {{day}}", day: nextDayNumber }),
                        })}
                  </p>
                </div>

                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {dailyGoalCompleted
                  ? t("dashboard.today.goalCompleteHint", {
                      defaultValue: "Você já estudou hoje. Se quiser, aproveite para revisar ou explorar algo salvo.",
                    })
                  : t("dashboard.today.goalHint", {
                      defaultValue: "Uma sessão consistente hoje mantém sua sequência viva e reduz a sensação de acúmulo amanhã.",
                    })}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-xl border-border/80 bg-background/75 px-4 font-semibold text-foreground hover:bg-background"
                  onClick={onOpenMissions}
                >
                  {t("dashboard.missions.title")}
                </Button>

                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {animatedStreak} {t("dashboard.streak_in_sequence")}
                </span>
              </div>

              <div id="weekly-streak" className="mt-4 border-t border-border/70 pt-4">
                <WeeklyStreakBar />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-border/70 bg-background/70 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("dashboard.today.recentTitle", { defaultValue: "Recentes" })}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("dashboard.today.recentSubtitle", { defaultValue: "O que você tocou por último fica sempre à mão." })}
                </p>
              </div>

              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <RotateCcw className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => onRecentNavigate(activity.route)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <activity.Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">{activity.title}</span>
                      <span className="block truncate text-sm text-muted-foreground">{activity.subtitle}</span>
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{activity.meta}</span>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border/80 bg-card/50 px-4 py-5 text-sm text-muted-foreground">
                  {t("dashboard.today.recentEmpty", {
                    defaultValue: "Seus últimos avanços vão aparecer aqui assim que você concluir sua próxima sessão.",
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-background/70 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("dashboard.today.favoritesTitle", { defaultValue: "Favoritos" })}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("dashboard.today.favoritesSubtitle", { defaultValue: "Fixe os atalhos que você mais usa e deixe essa home com a sua cara." })}
                </p>
              </div>

              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Bookmark className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {favoriteShortcuts.length > 0 ? (
                favoriteShortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="relative rounded-2xl border border-border/70 bg-card/70 px-4 py-4 transition-all duration-200 hover:border-primary/25 hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => onShortcutAction(shortcut.key)}
                      className="flex w-full items-start gap-3 pr-10 text-left"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <shortcut.Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">{shortcut.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{shortcut.subtitle}</span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(shortcut.key)}
                      className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background text-primary transition-colors hover:bg-primary/10"
                      aria-label={t("dashboard.today.removeFavorite", { defaultValue: "Remover dos favoritos" })}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="sm:col-span-2 rounded-2xl border border-dashed border-border/80 bg-card/50 px-4 py-5 text-sm text-muted-foreground">
                  {t("dashboard.today.favoritesEmpty", {
                    defaultValue: "Você ainda não fixou nenhum atalho. Use as sugestões abaixo para montar sua aba Hoje.",
                  })}
                </div>
              )}
            </div>

            {suggestedShortcuts.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestedShortcuts.map((shortcut) => (
                  <button
                    key={shortcut.key}
                    type="button"
                    onClick={() => onToggleFavorite(shortcut.key)}
                    className="rounded-full border border-border/80 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    + {shortcut.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
