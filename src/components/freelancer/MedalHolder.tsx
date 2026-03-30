import { useTranslation } from "react-i18next";
import { useFreelancerMedals } from "@/hooks/useFreelancerMedals";
import { cn } from "@/lib/utils";
import {
  normalizeContentLanguage,
  type AppContentLanguage,
} from "@/lib/contentLanguage";
import {
  Footprints,
  Compass,
  Target,
  Crown,
  Flame,
  Zap,
  Rocket,
  Timer,
  CheckCircle,
  Medal,
  Lock,
  Calendar,
  Trophy,
  MessageSquare,
  Bot,
  Sparkles,
  Sunrise,
  Moon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Compass,
  Target,
  Crown,
  Flame,
  Zap,
  Rocket,
  Timer,
  CheckCircle,
  Calendar,
  Trophy,
  MessageSquare,
  Bot,
  Sparkles,
  Sunrise,
  Moon,
};

const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-300 dark:border-emerald-700",
    icon: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-400/50",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-300 dark:border-blue-700",
    icon: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-400/50",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-300 dark:border-purple-700",
    icon: "text-purple-600 dark:text-purple-400",
    glow: "shadow-purple-400/50",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-300 dark:border-amber-700",
    icon: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-400/50",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-300 dark:border-orange-700",
    icon: "text-orange-600 dark:text-orange-400",
    glow: "shadow-orange-400/50",
  },
  yellow: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    border: "border-yellow-300 dark:border-yellow-700",
    icon: "text-yellow-600 dark:text-yellow-400",
    glow: "shadow-yellow-400/50",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-300 dark:border-red-700",
    icon: "text-red-600 dark:text-red-400",
    glow: "shadow-red-400/50",
  },
  cyan: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "border-cyan-300 dark:border-cyan-700",
    icon: "text-cyan-600 dark:text-cyan-400",
    glow: "shadow-cyan-400/50",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    border: "border-green-300 dark:border-green-700",
    icon: "text-green-600 dark:text-green-400",
    glow: "shadow-green-400/50",
  },
};

const tierBorder: Record<string, string> = {
  bronze: "ring-2 ring-amber-600/50",
  silver: "ring-2 ring-slate-400/50",
  gold: "ring-2 ring-yellow-500/50",
  platinum: "ring-2 ring-purple-500/50 ring-offset-2 ring-offset-background",
};

const medalHolderCopy: Record<
  AppContentLanguage,
  {
    title: string;
    subtitle: string;
    earnedOn: string;
    locked: string;
  }
> = {
  pt: { title: "Porta Medalhas", subtitle: "{{earned}} de {{total}} conquistadas", earnedOn: "Conquistada em", locked: "Bloqueada" },
  en: { title: "Medal Holder", subtitle: "{{earned}} of {{total}} earned", earnedOn: "Earned on", locked: "Locked" },
  es: { title: "Porta medallas", subtitle: "{{earned}} de {{total}} ganadas", earnedOn: "Obtenida el", locked: "Bloqueada" },
  fr: { title: "Porte-medailles", subtitle: "{{earned}} sur {{total}} obtenues", earnedOn: "Obtenue le", locked: "Verrouillee" },
  de: { title: "Medaillenhalter", subtitle: "{{earned}} von {{total}} verdient", earnedOn: "Verdient am", locked: "Gesperrt" },
  it: { title: "Porta medaglie", subtitle: "{{earned}} su {{total}} ottenute", earnedOn: "Ottenuta il", locked: "Bloccata" },
  ru: { title: "Витрина медалей", subtitle: "{{earned}} из {{total}} получено", earnedOn: "Получена", locked: "Заблокирована" },
  zh: { title: "奖牌陈列", subtitle: "已获得 {{earned}} / {{total}}", earnedOn: "获得于", locked: "已锁定" },
  ja: { title: "メダルホルダー", subtitle: "{{total}} 個中 {{earned}} 個獲得", earnedOn: "獲得日", locked: "ロック中" },
  ko: { title: "메달 보관함", subtitle: "{{total}}개 중 {{earned}}개 획득", earnedOn: "획득일", locked: "잠김" },
  ar: { title: "حافظة الميداليات", subtitle: "تم الحصول على {{earned}} من {{total}}", earnedOn: "تم الحصول عليها في", locked: "مقفلة" },
  hi: { title: "मेडल होल्डर", subtitle: "{{total}} में से {{earned}} प्राप्त", earnedOn: "प्राप्ति तिथि", locked: "लॉक" },
  tr: { title: "Madalya standi", subtitle: "{{total}} madalyadan {{earned}} kazanildi", earnedOn: "Kazanilma tarihi", locked: "Kilitli" },
  pl: { title: "Gablotka medali", subtitle: "{{earned}} z {{total}} zdobytych", earnedOn: "Zdobyto", locked: "Zablokowana" },
  nl: { title: "Medaillerek", subtitle: "{{earned}} van {{total}} behaald", earnedOn: "Behaald op", locked: "Vergrendeld" },
};

const interpolate = (template: string, values?: Record<string, string | number>) => {
  if (!values) return template;

  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined || value === null ? "" : String(value);
  });
};

export const MedalHolder = () => {
  const { i18n } = useTranslation();
  const { getMedalsWithStatus, isLoading, earnedCount, totalCount } = useFreelancerMedals();

  const medals = getMedalsWithStatus();
  const locale = normalizeContentLanguage(i18n.language);
  const copy = medalHolderCopy[locale];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-4" />
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-14 h-14 rounded-full bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Medal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{copy.title}</h3>
            <p className="text-sm text-muted-foreground">
              {interpolate(copy.subtitle, { earned: earnedCount, total: totalCount })}
            </p>
          </div>
        </div>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="flex flex-wrap justify-center gap-3">
          {medals.map((medal) => {
            const IconComponent = iconMap[medal.icon_name] || Medal;
            const colors = colorMap[medal.color] || colorMap.amber;

            return (
              <Tooltip key={medal.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                      "border-2",
                      medal.isEarned
                        ? cn(
                            colors.bg,
                            colors.border,
                            tierBorder[medal.tier],
                            "shadow-lg",
                            colors.glow,
                            "hover:scale-110 cursor-pointer"
                          )
                        : "bg-slate-200/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 opacity-40 cursor-default"
                    )}
                  >
                    {medal.isEarned ? (
                      <IconComponent className={cn("w-6 h-6", colors.icon)} />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}

                    {medal.isEarned && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className={cn(
                    "max-w-xs",
                    medal.isEarned ? "bg-background border-border" : "bg-muted border-border"
                  )}
                >
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{medal.name}</p>
                    <p className="text-sm text-muted-foreground">{medal.description}</p>
                    {medal.isEarned && medal.earnedAt && (
                      <p className="text-xs text-success mt-1">
                        ✓ {copy.earnedOn} {new Date(medal.earnedAt).toLocaleDateString(i18n.language)}
                      </p>
                    )}
                    {!medal.isEarned && (
                      <p className="text-xs text-muted-foreground mt-1 italic">{copy.locked}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};
