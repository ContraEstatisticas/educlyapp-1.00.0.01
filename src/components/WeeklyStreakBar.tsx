import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface WeeklyStreakBarProps {
  className?: string;
}

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getWeekDates = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const adjustedDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - adjustedDayIndex);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }

  return { dates, adjustedDayIndex };
};

export const WeeklyStreakBar = ({ className }: WeeklyStreakBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [revealedUntil, setRevealedUntil] = useState(-1);
  const [introFinished, setIntroFinished] = useState(false);
  const [burstIndex, setBurstIndex] = useState<number | null>(null);
  const introTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [weekCelebrationPhase, setWeekCelebrationPhase] = useState<"idle" | "border" | "message">("idle");
  const celebrationTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const { dates, adjustedDayIndex } = getWeekDates();
  const weekAnchor = toLocalDateString(dates[0]);

  useEffect(() => {
    setCurrentDayIndex(adjustedDayIndex);
  }, [adjustedDayIndex]);

  const updateStreakMutation = useMutation({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split("T")[0];
      const { data: existingStreak } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!existingStreak) {
        await supabase.from("user_streaks").insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        });
        return;
      }

      const lastActivity = existingStreak.last_activity_date;
      if (lastActivity === today) return;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      const newStreak = lastActivity === yesterdayStr ? existingStreak.current_streak + 1 : 1;
      const newLongest = Math.max(newStreak, existingStreak.longest_streak);

      await supabase
        .from("user_streaks")
        .update({
          current_streak: newStreak,
          longest_streak: newLongest,
          last_activity_date: today,
        })
        .eq("user_id", user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-streak"] });
    },
  });

  useEffect(() => {
    updateStreakMutation.mutate();
  }, []);

  const { data: weeklyActivity = [] } = useQuery({
    queryKey: ["weekly-activity-v9", weekAnchor],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [] as number[];

      const searchStart = new Date(dates[0]);
      searchStart.setDate(searchStart.getDate() - 7);
      const searchEnd = new Date(dates[6]);
      searchEnd.setDate(searchEnd.getDate() + 7);

      const { data: stepProgress } = await supabase
        .from("user_step_progress")
        .select("completed_at, created_at")
        .eq("user_id", user.id)
        .gte("completed_at", searchStart.toISOString())
        .lte("completed_at", searchEnd.toISOString());

      const { data: dayProgress } = await supabase
        .from("user_day_progress")
        .select("completed_at, created_at")
        .eq("user_id", user.id)
        .gte("completed_at", searchStart.toISOString())
        .lte("completed_at", searchEnd.toISOString());

      const { data: streak } = await supabase
        .from("user_streaks")
        .select("current_streak, last_activity_date")
        .eq("user_id", user.id)
        .maybeSingle();

      const activityDates = new Set<string>();
      const allActivity = [...(stepProgress || []), ...(dayProgress || [])];

      allActivity.forEach((item) => {
        const timestamp = item.completed_at || item.created_at;
        if (timestamp) {
          activityDates.add(toLocalDateString(new Date(timestamp)));
        }
      });

      if (streak && streak.last_activity_date && streak.current_streak > 0) {
        const [y, m, d] = streak.last_activity_date.split("-").map(Number);
        const cursorDate = new Date(y, m - 1, d);

        for (let i = 0; i < streak.current_streak; i += 1) {
          activityDates.add(toLocalDateString(cursorDate));
          cursorDate.setDate(cursorDate.getDate() - 1);
        }
      }

      const activitySet = new Set<number>();
      dates.forEach((targetDate, index) => {
        const targetDateString = toLocalDateString(targetDate);
        if (activityDates.has(targetDateString)) {
          activitySet.add(index);
        }
      });

      return Array.from(activitySet);
    },
  });

  const weekDays = useMemo(
    () => [
      { key: "mon", label: t("weeklyStreak.days.mon") },
      { key: "tue", label: t("weeklyStreak.days.tue") },
      { key: "wed", label: t("weeklyStreak.days.wed") },
      { key: "thu", label: t("weeklyStreak.days.thu") },
      { key: "fri", label: t("weeklyStreak.days.fri") },
      { key: "sat", label: t("weeklyStreak.days.sat") },
      { key: "sun", label: t("weeklyStreak.days.sun") },
    ],
    [t],
  );

  const completedByDay = useMemo(
    () => weekDays.map((_, index) => weeklyActivity.includes(index)),
    [weekDays, weeklyActivity],
  );
  const isWeekComplete = useMemo(
    () => completedByDay.length > 0 && completedByDay.every(Boolean),
    [completedByDay],
  );

  const activeRange = useMemo(() => {
    let end = -1;
    for (let i = currentDayIndex; i >= 0; i -= 1) {
      if (completedByDay[i]) {
        end = i;
        break;
      }
    }

    if (end === -1) return null;

    let start = end;
    while (start > 0 && completedByDay[start - 1]) {
      start -= 1;
    }

    return { start, end };
  }, [completedByDay, currentDayIndex]);

  const specialIndex = useMemo(() => {
    if (!activeRange) return null;
    if (currentDayIndex >= activeRange.start && currentDayIndex <= activeRange.end) {
      return currentDayIndex;
    }

    return activeRange.end;
  }, [activeRange, currentDayIndex]);

  const activeRangeStart = activeRange?.start ?? -1;
  const activeRangeEnd = activeRange?.end ?? -1;

  useEffect(() => {
    const clearIntroTimers = () => {
      introTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
      introTimeoutsRef.current = [];
    };

    clearIntroTimers();

    if (activeRangeStart === -1 || activeRangeEnd === -1) {
      setRevealedUntil(-1);
      setIntroFinished(true);
      setBurstIndex(null);
      return clearIntroTimers;
    }

    setIntroFinished(false);
    setRevealedUntil(activeRangeStart - 1);
    setBurstIndex(null);

    const initialDelay = 450;
    const stepDelay = 580;
    const start = activeRangeStart;
    const end = activeRangeEnd;

    for (let index = start; index <= end; index += 1) {
      const revealDelay = initialDelay + (index - start) * stepDelay;
      const revealTimer = setTimeout(() => {
        setRevealedUntil(index);
        setBurstIndex(index);

        const burstDuration = index === specialIndex ? 680 : 400;
        const burstClearTimer = setTimeout(() => {
          setBurstIndex((current) => (current === index ? null : current));
        }, burstDuration);
        introTimeoutsRef.current.push(burstClearTimer);
      }, revealDelay);

      introTimeoutsRef.current.push(revealTimer);
    }

    const finishTimer = setTimeout(() => {
      setIntroFinished(true);
      setBurstIndex(null);
    }, initialDelay + (end - start + 1) * stepDelay + 160);
    introTimeoutsRef.current.push(finishTimer);

    return clearIntroTimers;
  }, [activeRangeStart, activeRangeEnd, specialIndex, weekAnchor, location.key]);

  useEffect(() => {
    const clearCelebrationTimers = () => {
      celebrationTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
      celebrationTimeoutsRef.current = [];
    };

    clearCelebrationTimers();
    setWeekCelebrationPhase("idle");

    if (!introFinished || !isWeekComplete) {
      return clearCelebrationTimers;
    }

    setWeekCelebrationPhase("border");

    const borderDuration = 1650;
    const messageDuration = 2450;

    const messageTimer = setTimeout(() => {
      setWeekCelebrationPhase("message");
    }, borderDuration);

    const resetTimer = setTimeout(() => {
      setWeekCelebrationPhase("idle");
    }, borderDuration + messageDuration);

    celebrationTimeoutsRef.current.push(messageTimer, resetTimer);

    return clearCelebrationTimers;
  }, [introFinished, isWeekComplete, weekAnchor, location.key]);

  return (
    <div className={cn("weekly-counter-enter", className)}>
      <style>{`
        @keyframes weeklyCounterEnter {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes weeklyBorderLoading {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes weeklyCongratsAppear {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.94);
          }
          70% {
            opacity: 1;
            transform: translateY(1px) scale(1.03);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes weeklyRangeEndPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 16px -10px rgba(249,115,22,0.55);
          }
          50% {
            transform: scale(1.045);
            box-shadow: 0 10px 18px -9px rgba(249,115,22,0.72);
          }
        }

        @keyframes weeklyFillPop {
          0% {
            transform: scale(0.58) translateY(1px);
            filter: brightness(0.95);
          }
          52% {
            transform: scale(1.2) translateY(-1px);
          }
          74% {
            transform: scale(0.93) translateY(0);
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes weeklyBurstRing {
          0% {
            opacity: 0.44;
            transform: translate(-50%, -50%) scale(0.36);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.62);
          }
        }

        @keyframes weeklyBurstSpecial {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.32);
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.35);
          }
          55% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(1.28);
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0.12);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.88);
            box-shadow: 0 0 0 18px rgba(249, 115, 22, 0);
          }
        }

        @keyframes weeklyBurstRingOuter {
          0% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(0.24);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.95);
          }
        }

        @keyframes weeklyBurstCoreFlash {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
          28% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }

        @keyframes weeklyBurstSpark {
          0% {
            opacity: 0;
            transform: translateY(-1px) scaleY(0.3);
          }
          22% {
            opacity: 1;
            transform: translateY(-5px) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scaleY(0.2);
          }
        }

        @keyframes weeklyBurstSparkSpecial {
          0% {
            opacity: 0;
            transform: translateY(-1px) scaleY(0.28);
          }
          24% {
            opacity: 1;
            transform: translateY(-6px) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-27px) scaleY(0.18);
          }
        }

        .weekly-counter-enter {
          animation: weeklyCounterEnter 0.5s ease-out both;
        }

        .weekly-celebration-shell {
          position: relative;
          border-radius: 16px;
          padding: 2px;
        }

        .weekly-loading-ring {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: conic-gradient(
            from 0deg,
            rgba(249, 115, 22, 0.12),
            rgba(251, 146, 60, 0.78),
            rgba(249, 115, 22, 0.12)
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: 0;
          pointer-events: none;
        }

        .weekly-celebration-shell-loading .weekly-loading-ring {
          opacity: 1;
          animation: weeklyBorderLoading 1.35s linear infinite;
        }

        .weekly-congrats-slot {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 360ms ease, opacity 280ms ease;
        }

        .weekly-congrats-slot-visible {
          max-height: 56px;
          opacity: 1;
        }

        .weekly-congrats-chip {
          margin: 0 auto 8px;
          width: fit-content;
          border-radius: 9999px;
          border: 1px solid rgba(249, 115, 22, 0.28);
          background: linear-gradient(120deg, rgba(249, 115, 22, 0.14), rgba(251, 146, 60, 0.08));
          color: hsl(var(--primary));
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 8px 14px;
          animation: weeklyCongratsAppear 440ms cubic-bezier(0.2, 0.9, 0.2, 1.2) both;
        }

        .weekly-range-fill {
          background-image: linear-gradient(
            115deg,
            rgba(249, 115, 22, 0.86) 0%,
            rgba(251, 146, 60, 0.96) 50%,
            rgba(249, 115, 22, 0.86) 100%
          );
          background-size: 140% 100%;
        }

        .weekly-range-end-intro {
          animation: weeklyRangeEndPulse 2.2s ease-in-out infinite;
        }

        .weekly-range-end-static {
          box-shadow: 0 6px 14px -10px rgba(249,115,22,0.45);
        }

        .weekly-fill-pop {
          animation: weeklyFillPop 0.56s cubic-bezier(0.23, 0.86, 0.24, 1.2) both;
        }

        .weekly-burst-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          animation: weeklyBurstRing 0.54s ease-out forwards;
          pointer-events: none;
        }

        .weekly-burst-special {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          animation: weeklyBurstSpecial 0.78s ease-out forwards;
          pointer-events: none;
        }

        .weekly-burst-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .weekly-burst-ring-outer {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 46px;
          height: 46px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.38);
          animation: weeklyBurstRingOuter 0.74s ease-out forwards;
        }

        .weekly-burst-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0));
          animation: weeklyBurstCoreFlash 0.55s ease-out forwards;
        }

        .weekly-burst-spark {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }

        .weekly-burst-spark-line {
          display: block;
          width: 2px;
          height: 11px;
          border-radius: 9999px;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0));
          transform-origin: center bottom;
          animation: weeklyBurstSpark 0.62s ease-out forwards;
        }

        .weekly-burst-wrap-special .weekly-burst-ring-outer {
          width: 58px;
          height: 58px;
          border-color: rgba(255, 255, 255, 0.52);
          animation-duration: 0.88s;
        }

        .weekly-burst-wrap-special .weekly-burst-core {
          width: 22px;
          height: 22px;
          animation-duration: 0.68s;
        }

        .weekly-burst-wrap-special .weekly-burst-spark-line {
          width: 2.5px;
          height: 14px;
          animation-name: weeklyBurstSparkSpecial;
          animation-duration: 0.8s;
        }
      `}</style>

      <div
        className={cn(
          "weekly-celebration-shell mx-auto max-w-[560px]",
          weekCelebrationPhase === "border" && "weekly-celebration-shell-loading",
        )}
      >
        <span className="weekly-loading-ring" />

        <div className={cn("weekly-congrats-slot", weekCelebrationPhase === "message" && "weekly-congrats-slot-visible")}>
          <div className="weekly-congrats-chip">
            {t("weeklyStreak.weekCompleteCongrats", "Parabéns! Você completou a semana.")}
          </div>
        </div>

        <div className="grid grid-cols-7 text-center">
          {weekDays.map((day) => (
            <span
              key={day.key}
              className="text-xs sm:text-sm font-medium text-foreground/90"
            >
              {day.label}
            </span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 overflow-hidden rounded-full bg-muted/35">
          {weekDays.map((day, index) => {
            const inActiveRange = Boolean(activeRange && index >= activeRange.start && index <= activeRange.end);
            const isFilled = inActiveRange && (introFinished || index <= revealedUntil);
            const visibleRangeStart = activeRange?.start ?? -1;
            const visibleRangeEnd = activeRange
              ? introFinished
                ? activeRange.end
                : Math.max(activeRange.start - 1, Math.min(activeRange.end, revealedUntil))
              : -1;
            const isRangeStart = isFilled && index === visibleRangeStart;
            const isRangeEnd = isFilled && index === visibleRangeEnd;
            const isCurrentSpecial = specialIndex !== null && index === specialIndex;
            const hasBurst = burstIndex === index && isFilled;
            const dayNumber = dates[index]?.getDate();

            return (
              <div
                key={day.key}
                className={cn(
                  "relative flex h-9 items-center justify-center text-base font-semibold",
                  isFilled
                    ? "weekly-range-fill text-primary-foreground"
                    : "text-foreground/85",
                  isRangeStart && "rounded-l-full",
                  isRangeEnd && "rounded-r-full",
                  hasBurst && "weekly-fill-pop",
                )}
              >
                {isFilled ? (
                  isRangeEnd ? (
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground",
                        introFinished ? "weekly-range-end-static" : "weekly-range-end-intro",
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <Check className="h-3.5 w-3.5 text-primary-foreground/95" />
                  )
                ) : (
                  <span>{dayNumber}</span>
                )}

                {hasBurst && (
                  <span className={cn("weekly-burst-wrap", isCurrentSpecial && "weekly-burst-wrap-special")}>
                    <span className={isCurrentSpecial ? "weekly-burst-special" : "weekly-burst-ring"} />
                    <span className="weekly-burst-ring-outer" />
                    <span className="weekly-burst-core" />

                    {Array.from({ length: isCurrentSpecial ? 10 : 7 }).map((_, sparkIndex, array) => (
                      <span
                        key={`burst-spark-${index}-${sparkIndex}`}
                        className="weekly-burst-spark"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${(360 / array.length) * sparkIndex}deg)`,
                        }}
                      >
                        <span
                          className="weekly-burst-spark-line"
                          style={{ animationDelay: `${sparkIndex * 35}ms` }}
                        />
                      </span>
                    ))}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
