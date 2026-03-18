import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useUserLevel, XP_REWARDS } from "@/hooks/useUserLevel";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  Flame,
  MessageCircle,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface DailyMissionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SupportedLocale = "en" | "pt" | "es" | "fr" | "de" | "it" | "ru" | "zh" | "ja" | "ko" | "ar" | "hi" | "tr" | "pl" | "nl";
type ClaimScope = "daily" | "lifetime";
type SectionTone = "base" | "eliteDaily" | "eliteJourney";

interface MissionCopy {
  title: string;
  subtitle: string;
  dayCompleteTitle: string;
  dayCompleteDesc: string;
  chatTitle: string;
  chatDesc: string;
  streakTitle: string;
  streakDesc: string;
  dailyEliteTitle: string;
  dailyEliteSubtitle: string;
  eliteStudyTitle: string;
  eliteStudyDesc: string;
  eliteChatTitle: string;
  eliteChatDesc: string;
  eliteComboTitle: string;
  eliteComboDesc: string;
  journeysTitle: string;
  journeysSubtitle: string;
  journeyDaysTitle: (count: number) => string;
  journeyDaysDesc: string;
  journeyChatsTitle: (count: number) => string;
  journeyChatsDesc: string;
  journeyStreakTitle: (count: number) => string;
  journeyStreakDesc: string;
  journeyActiveDaysTitle: (count: number) => string;
  journeyActiveDaysDesc: string;
  statusDone: string;
  statusPending: string;
  claimed: string;
  locked: string;
  close: string;
  keepGoing: string;
  readyToClaim: string;
  dailyTag: string;
  lifetimeTag: string;
}

interface MissionCard {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  done: boolean;
  progress: number;
  target: number;
  xp: number;
  claimScope: ClaimScope;
  progressText?: string;
  progressPercent?: number;
}

interface MissionClaimRow {
  mission_key: string;
  period_key: string;
}

interface CompletedDayRow {
  completed_at: string | null;
}

const EN_COPY: MissionCopy = {
  title: "Daily Missions",
  subtitle: "Short wins today, elite journeys over time.",
  dayCompleteTitle: "Complete 1 trail day",
  dayCompleteDesc: "Finish any day today.",
  chatTitle: "Send 1 message to EDI",
  chatDesc: "Open a real conversation today.",
  streakTitle: "Keep your streak alive",
  streakDesc: "Register activity today.",
  dailyEliteTitle: "Elite XP Today",
  dailyEliteSubtitle: "Hard daily combos with bigger payouts.",
  eliteStudyTitle: "Trail marathon",
  eliteStudyDesc: "Complete 2 days today.",
  eliteChatTitle: "EDI immersion",
  eliteChatDesc: "Send 5 messages today.",
  eliteComboTitle: "Power combo",
  eliteComboDesc: "Complete 2 days and send 5 EDI messages today.",
  journeysTitle: "Elite Journeys",
  journeysSubtitle: "These take days or weeks and can only be claimed once.",
  journeyDaysTitle: (count) => `Complete ${count} trail days`,
  journeyDaysDesc: "Long-term study volume.",
  journeyChatsTitle: (count) => `Send ${count} messages to EDI`,
  journeyChatsDesc: "Depth with the assistant over time.",
  journeyStreakTitle: (count) => `Reach a ${count}-day streak`,
  journeyStreakDesc: "Consistency over multiple days.",
  journeyActiveDaysTitle: (count) => `Study on ${count} different days`,
  journeyActiveDaysDesc: "Come back repeatedly, not just once.",
  statusDone: "Completed",
  statusPending: "Pending",
  claimed: "Claimed",
  locked: "Locked",
  close: "Close",
  keepGoing: "Keep going",
  readyToClaim: "Ready to claim",
  dailyTag: "Daily",
  lifetimeTag: "Journey",
};

const PT_COPY: MissionCopy = {
  title: "Missoes Diarias",
  subtitle: "Vitorias curtas hoje, jornadas elite ao longo do tempo.",
  dayCompleteTitle: "Concluir 1 dia da trilha",
  dayCompleteDesc: "Finalize qualquer dia hoje.",
  chatTitle: "Enviar 1 mensagem na EDI",
  chatDesc: "Abra uma conversa real hoje.",
  streakTitle: "Manter sua sequencia",
  streakDesc: "Registre atividade hoje.",
  dailyEliteTitle: "XP Elite de Hoje",
  dailyEliteSubtitle: "Combos diarios dificeis com recompensas maiores.",
  eliteStudyTitle: "Maratona da trilha",
  eliteStudyDesc: "Conclua 2 dias hoje.",
  eliteChatTitle: "Imersao com EDI",
  eliteChatDesc: "Envie 5 mensagens hoje.",
  eliteComboTitle: "Combo de potencia",
  eliteComboDesc: "Conclua 2 dias e envie 5 mensagens na EDI hoje.",
  journeysTitle: "Jornadas Elite",
  journeysSubtitle: "Essas levam dias ou semanas e so podem ser resgatadas uma vez.",
  journeyDaysTitle: (count) => `Concluir ${count} dias da trilha`,
  journeyDaysDesc: "Volume real de estudo no longo prazo.",
  journeyChatsTitle: (count) => `Enviar ${count} mensagens na EDI`,
  journeyChatsDesc: "Profundidade com a assistente ao longo do tempo.",
  journeyStreakTitle: (count) => `Alcancar streak de ${count} dias`,
  journeyStreakDesc: "Consistencia por varios dias.",
  journeyActiveDaysTitle: (count) => `Estudar em ${count} dias diferentes`,
  journeyActiveDaysDesc: "Voltar em varios dias, nao so em um sprint.",
  statusDone: "Concluida",
  statusPending: "Pendente",
  claimed: "Resgatada",
  locked: "Bloqueada",
  close: "Fechar",
  keepGoing: "Continue",
  readyToClaim: "Pronta para resgatar",
  dailyTag: "Diaria",
  lifetimeTag: "Jornada",
};

const ES_COPY: MissionCopy = {
  title: "Misiones Diarias",
  subtitle: "Victorias cortas hoy, jornadas elite a lo largo del tiempo.",
  dayCompleteTitle: "Completar 1 dia de la ruta",
  dayCompleteDesc: "Termina cualquier dia hoy.",
  chatTitle: "Enviar 1 mensaje a EDI",
  chatDesc: "Abre una conversacion real hoy.",
  streakTitle: "Mantener tu racha",
  streakDesc: "Registra actividad hoy.",
  dailyEliteTitle: "XP Elite de Hoy",
  dailyEliteSubtitle: "Combos diarios dificiles con mejores recompensas.",
  eliteStudyTitle: "Maraton de la ruta",
  eliteStudyDesc: "Completa 2 dias hoy.",
  eliteChatTitle: "Inmersion con EDI",
  eliteChatDesc: "Envia 5 mensajes hoy.",
  eliteComboTitle: "Combo potente",
  eliteComboDesc: "Completa 2 dias y envia 5 mensajes a EDI hoy.",
  journeysTitle: "Jornadas Elite",
  journeysSubtitle: "Estas tardan dias o semanas y solo se reclaman una vez.",
  journeyDaysTitle: (count) => `Completar ${count} dias de la ruta`,
  journeyDaysDesc: "Volumen real de estudio a largo plazo.",
  journeyChatsTitle: (count) => `Enviar ${count} mensajes a EDI`,
  journeyChatsDesc: "Profundidad con la asistente a lo largo del tiempo.",
  journeyStreakTitle: (count) => `Alcanzar racha de ${count} dias`,
  journeyStreakDesc: "Constancia durante varios dias.",
  journeyActiveDaysTitle: (count) => `Estudiar en ${count} dias distintos`,
  journeyActiveDaysDesc: "Volver en varios dias, no solo en un sprint.",
  statusDone: "Completada",
  statusPending: "Pendiente",
  claimed: "Reclamada",
  locked: "Bloqueada",
  close: "Cerrar",
  keepGoing: "Sigue",
  readyToClaim: "Lista para reclamar",
  dailyTag: "Diaria",
  lifetimeTag: "Jornada",
};

const COPY_BY_LANG: Record<SupportedLocale, MissionCopy> = {
  en: EN_COPY,
  pt: PT_COPY,
  es: ES_COPY,
  fr: EN_COPY,
  de: EN_COPY,
  it: EN_COPY,
  ru: EN_COPY,
  zh: EN_COPY,
  ja: EN_COPY,
  ko: EN_COPY,
  ar: EN_COPY,
  hi: EN_COPY,
  tr: EN_COPY,
  pl: EN_COPY,
  nl: EN_COPY,
};

const normalizeLocale = (language?: string): SupportedLocale => {
  const normalized = (language || "en").toLowerCase().split("-")[0] as SupportedLocale;
  return COPY_BY_LANG[normalized] ? normalized : "en";
};

const startOfTodayLocal = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const toLocalDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toLocalDayKeyFromIso = (value: string) => toLocalDayKey(new Date(value));

const clampProgress = (value: number, target: number) => Math.min(value, target);

const getMissionProgressText = (mission: MissionCard) => {
  if (mission.progressText) return mission.progressText;
  return `${clampProgress(mission.progress, mission.target)}/${mission.target}`;
};

const getMissionProgressPercent = (mission: MissionCard) => {
  if (typeof mission.progressPercent === "number") return mission.progressPercent;
  return Math.min((mission.progress / mission.target) * 100, 100);
};

export function DailyMissionsModal({ open, onOpenChange }: DailyMissionsModalProps) {
  const { t, i18n } = useTranslation();
  const { addXPAsync, isAddingXP } = useUserLevel();
  const [loading, setLoading] = useState(false);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [dayCount, setDayCount] = useState(0);
  const [dayDone, setDayDone] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [chatDone, setChatDone] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [streakDone, setStreakDone] = useState(false);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalDaysCompleted, setTotalDaysCompleted] = useState(0);
  const [totalChatMessages, setTotalChatMessages] = useState(0);
  const [activeStudyDays, setActiveStudyDays] = useState(0);
  const [dailyClaims, setDailyClaims] = useState<Record<string, boolean>>({});
  const [journeyClaims, setJourneyClaims] = useState<Record<string, boolean>>({});

  const locale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const copy = COPY_BY_LANG[locale];
  const todayStart = useMemo(() => startOfTodayLocal(), []);
  const todayIso = useMemo(() => todayStart.toISOString(), [todayStart]);
  const todayKey = useMemo(() => toLocalDayKey(todayStart), [todayStart]);

  const fetchStatus = useCallback(async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setDayCount(0);
      setDayDone(false);
      setChatCount(0);
      setChatDone(false);
      setStreakCount(0);
      setStreakDone(false);
      setLongestStreak(0);
      setTotalDaysCompleted(0);
      setTotalChatMessages(0);
      setActiveStudyDays(0);
      setDailyClaims({});
      setJourneyClaims({});
      setLoading(false);
      return;
    }

    const [
      { count: todayDayCount = 0 },
      { count: overallDayCount = 0 },
      { data: completedRows = [] },
      { count: todayChatCount = 0 },
      { count: overallChatCount = 0 },
      { data: streak },
      { data: claimRows = [] },
    ] = await Promise.all([
      supabase
        .from("user_day_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true)
        .gte("completed_at", todayIso),
      supabase
        .from("user_day_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true),
      supabase
        .from("user_day_progress")
        .select("completed_at")
        .eq("user_id", user.id)
        .eq("completed", true),
      supabase
        .from("chat_messages")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("role", "user")
        .eq("ai_assistant_type", "edi")
        .gte("created_at", todayIso),
      supabase
        .from("chat_messages")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("role", "user")
        .eq("ai_assistant_type", "edi"),
      supabase.from("user_streaks").select("current_streak, longest_streak, last_activity_date").eq("user_id", user.id).maybeSingle(),
      supabase
        .from("user_xp_mission_claims" as any)
        .select("mission_key, period_key")
        .eq("user_id", user.id)
        .in("period_key", [todayKey, "lifetime"]),
    ]);

    const activeDays = new Set(
      ((completedRows as CompletedDayRow[]) || [])
        .map((row) => row.completed_at)
        .filter((value): value is string => Boolean(value))
        .map((value) => toLocalDayKeyFromIso(value)),
    ).size;

    const nextDailyClaims: Record<string, boolean> = {};
    const nextJourneyClaims: Record<string, boolean> = {};

    ((claimRows as MissionClaimRow[]) || []).forEach((row) => {
      if (row.period_key === todayKey) {
        nextDailyClaims[row.mission_key] = true;
      }
      if (row.period_key === "lifetime") {
        nextJourneyClaims[row.mission_key] = true;
      }
    });

    setDayCount(todayDayCount || 0);
    setDayDone((todayDayCount || 0) > 0);
    setChatCount(todayChatCount || 0);
    setChatDone((todayChatCount || 0) > 0);
    setStreakCount(streak?.current_streak || 0);
    setLongestStreak(streak?.longest_streak || 0);
    setStreakDone(Boolean(streak?.last_activity_date && streak.last_activity_date >= todayKey));
    setTotalDaysCompleted(overallDayCount || 0);
    setTotalChatMessages(overallChatCount || 0);
    setActiveStudyDays(activeDays);
    setDailyClaims(nextDailyClaims);
    setJourneyClaims(nextJourneyClaims);
    setLoading(false);
  }, [todayIso, todayKey]);

  useEffect(() => {
    if (open) {
      void fetchStatus();
    }
  }, [fetchStatus, open]);

  const missions = useMemo<MissionCard[]>(
    () => [
      {
        id: "mission_day",
        icon: CheckCircle2,
        title: t("missions.dayCompleteTitle", { defaultValue: copy.dayCompleteTitle }),
        desc: t("missions.dayCompleteDesc", { defaultValue: copy.dayCompleteDesc }),
        done: dayDone,
        progress: dayDone ? 1 : 0,
        target: 1,
        xp: XP_REWARDS.DAILY_MISSION_DAY,
        claimScope: "daily",
      },
      {
        id: "mission_chat",
        icon: MessageCircle,
        title: t("missions.chatTitle", { defaultValue: copy.chatTitle }),
        desc: t("missions.chatDesc", { defaultValue: copy.chatDesc }),
        done: chatDone,
        progress: chatDone ? 1 : 0,
        target: 1,
        xp: XP_REWARDS.DAILY_MISSION_CHAT,
        claimScope: "daily",
      },
      {
        id: "mission_streak",
        icon: Flame,
        title: t("missions.streakTitle", { defaultValue: copy.streakTitle }),
        desc: t("missions.streakDesc", { defaultValue: copy.streakDesc }),
        done: streakDone,
        progress: streakDone ? 1 : 0,
        target: 1,
        xp: XP_REWARDS.DAILY_MISSION_STREAK,
        claimScope: "daily",
      },
    ],
    [chatDone, copy.chatDesc, copy.chatTitle, copy.dayCompleteDesc, copy.dayCompleteTitle, copy.streakDesc, copy.streakTitle, dayDone, streakDone, t],
  );

  const eliteDailyMissions = useMemo<MissionCard[]>(() => {
    const comboGoals = (dayCount >= 2 ? 1 : 0) + (chatCount >= 5 ? 1 : 0);
    return [
      {
        id: "mission_elite_study",
        icon: Target,
        title: copy.eliteStudyTitle,
        desc: copy.eliteStudyDesc,
        done: dayCount >= 2,
        progress: dayCount,
        target: 2,
        xp: XP_REWARDS.ELITE_DAILY_DAY_MARATHON,
        claimScope: "daily",
      },
      {
        id: "mission_elite_chat",
        icon: MessageCircle,
        title: copy.eliteChatTitle,
        desc: copy.eliteChatDesc,
        done: chatCount >= 5,
        progress: chatCount,
        target: 5,
        xp: XP_REWARDS.ELITE_DAILY_EDI_IMMERSION,
        claimScope: "daily",
      },
      {
        id: "mission_elite_combo",
        icon: Sparkles,
        title: copy.eliteComboTitle,
        desc: copy.eliteComboDesc,
        done: comboGoals === 2,
        progress: comboGoals,
        target: 2,
        progressText: `${comboGoals}/2`,
        progressPercent: (comboGoals / 2) * 100,
        xp: XP_REWARDS.ELITE_DAILY_POWER_COMBO,
        claimScope: "daily",
      },
    ];
  }, [chatCount, copy.eliteChatDesc, copy.eliteChatTitle, copy.eliteComboDesc, copy.eliteComboTitle, copy.eliteStudyDesc, copy.eliteStudyTitle, dayCount]);

  const eliteJourneyMissions = useMemo<MissionCard[]>(
    () => [
      {
        id: "journey_days_3",
        icon: Calendar,
        title: copy.journeyDaysTitle(3),
        desc: copy.journeyDaysDesc,
        done: totalDaysCompleted >= 3,
        progress: totalDaysCompleted,
        target: 3,
        xp: XP_REWARDS.ELITE_JOURNEY_DAYS_3,
        claimScope: "lifetime",
      },
      {
        id: "journey_days_7",
        icon: Calendar,
        title: copy.journeyDaysTitle(7),
        desc: copy.journeyDaysDesc,
        done: totalDaysCompleted >= 7,
        progress: totalDaysCompleted,
        target: 7,
        xp: XP_REWARDS.ELITE_JOURNEY_DAYS_7,
        claimScope: "lifetime",
      },
      {
        id: "journey_days_14",
        icon: Calendar,
        title: copy.journeyDaysTitle(14),
        desc: copy.journeyDaysDesc,
        done: totalDaysCompleted >= 14,
        progress: totalDaysCompleted,
        target: 14,
        xp: XP_REWARDS.ELITE_JOURNEY_DAYS_14,
        claimScope: "lifetime",
      },
      {
        id: "journey_days_28",
        icon: Calendar,
        title: copy.journeyDaysTitle(28),
        desc: copy.journeyDaysDesc,
        done: totalDaysCompleted >= 28,
        progress: totalDaysCompleted,
        target: 28,
        xp: XP_REWARDS.ELITE_JOURNEY_DAYS_28,
        claimScope: "lifetime",
      },
      {
        id: "journey_chats_15",
        icon: MessageCircle,
        title: copy.journeyChatsTitle(15),
        desc: copy.journeyChatsDesc,
        done: totalChatMessages >= 15,
        progress: totalChatMessages,
        target: 15,
        xp: XP_REWARDS.ELITE_JOURNEY_CHATS_15,
        claimScope: "lifetime",
      },
      {
        id: "journey_chats_50",
        icon: MessageCircle,
        title: copy.journeyChatsTitle(50),
        desc: copy.journeyChatsDesc,
        done: totalChatMessages >= 50,
        progress: totalChatMessages,
        target: 50,
        xp: XP_REWARDS.ELITE_JOURNEY_CHATS_50,
        claimScope: "lifetime",
      },
      {
        id: "journey_chats_120",
        icon: MessageCircle,
        title: copy.journeyChatsTitle(120),
        desc: copy.journeyChatsDesc,
        done: totalChatMessages >= 120,
        progress: totalChatMessages,
        target: 120,
        xp: XP_REWARDS.ELITE_JOURNEY_CHATS_120,
        claimScope: "lifetime",
      },
      {
        id: "journey_chats_250",
        icon: MessageCircle,
        title: copy.journeyChatsTitle(250),
        desc: copy.journeyChatsDesc,
        done: totalChatMessages >= 250,
        progress: totalChatMessages,
        target: 250,
        xp: XP_REWARDS.ELITE_JOURNEY_CHATS_250,
        claimScope: "lifetime",
      },
      {
        id: "journey_streak_7",
        icon: Flame,
        title: copy.journeyStreakTitle(7),
        desc: copy.journeyStreakDesc,
        done: longestStreak >= 7,
        progress: longestStreak,
        target: 7,
        xp: XP_REWARDS.ELITE_JOURNEY_STREAK_7,
        claimScope: "lifetime",
      },
      {
        id: "journey_streak_14",
        icon: Trophy,
        title: copy.journeyStreakTitle(14),
        desc: copy.journeyStreakDesc,
        done: longestStreak >= 14,
        progress: longestStreak,
        target: 14,
        xp: XP_REWARDS.ELITE_JOURNEY_STREAK_14,
        claimScope: "lifetime",
      },
      {
        id: "journey_streak_30",
        icon: Trophy,
        title: copy.journeyStreakTitle(30),
        desc: copy.journeyStreakDesc,
        done: longestStreak >= 30,
        progress: longestStreak,
        target: 30,
        xp: XP_REWARDS.ELITE_JOURNEY_STREAK_30,
        claimScope: "lifetime",
      },
      {
        id: "journey_streak_45",
        icon: Award,
        title: copy.journeyStreakTitle(45),
        desc: copy.journeyStreakDesc,
        done: longestStreak >= 45,
        progress: longestStreak,
        target: 45,
        xp: XP_REWARDS.ELITE_JOURNEY_STREAK_45,
        claimScope: "lifetime",
      },
      {
        id: "journey_active_days_5",
        icon: Target,
        title: copy.journeyActiveDaysTitle(5),
        desc: copy.journeyActiveDaysDesc,
        done: activeStudyDays >= 5,
        progress: activeStudyDays,
        target: 5,
        xp: XP_REWARDS.ELITE_JOURNEY_ACTIVE_DAYS_5,
        claimScope: "lifetime",
      },
      {
        id: "journey_active_days_12",
        icon: Target,
        title: copy.journeyActiveDaysTitle(12),
        desc: copy.journeyActiveDaysDesc,
        done: activeStudyDays >= 12,
        progress: activeStudyDays,
        target: 12,
        xp: XP_REWARDS.ELITE_JOURNEY_ACTIVE_DAYS_12,
        claimScope: "lifetime",
      },
      {
        id: "journey_active_days_21",
        icon: Target,
        title: copy.journeyActiveDaysTitle(21),
        desc: copy.journeyActiveDaysDesc,
        done: activeStudyDays >= 21,
        progress: activeStudyDays,
        target: 21,
        xp: XP_REWARDS.ELITE_JOURNEY_ACTIVE_DAYS_21,
        claimScope: "lifetime",
      },
    ],
    [activeStudyDays, copy, longestStreak, totalChatMessages, totalDaysCompleted],
  );

  const completedCount = missions.filter((mission) => mission.done).length;
  const eliteCompletedCount = eliteDailyMissions.filter((mission) => mission.done).length;
  const journeyCompletedCount = eliteJourneyMissions.filter((mission) => mission.done).length;
  const percent = Math.round((completedCount / missions.length) * 100);

  const claimMission = useCallback(
    async (mission: MissionCard) => {
      const alreadyClaimed = mission.claimScope === "daily" ? dailyClaims[mission.id] : journeyClaims[mission.id];
      if (alreadyClaimed || !mission.done) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const periodKey = mission.claimScope === "daily" ? todayKey : "lifetime";
      const missionGroup = mission.claimScope === "daily" ? "elite_daily" : "elite_journey";

      setClaimingId(mission.id);

      const { error: insertError } = await supabase.from("user_xp_mission_claims" as any).insert({
        user_id: user.id,
        mission_key: mission.id,
        mission_group: missionGroup,
        period_key: periodKey,
        metadata: {
          xp: mission.xp,
          title: mission.title,
          progress: mission.progress,
          target: mission.target,
        },
      });

      if (insertError) {
        if ((insertError as { code?: string }).code === "23505") {
          if (mission.claimScope === "daily") {
            setDailyClaims((prev) => ({ ...prev, [mission.id]: true }));
          } else {
            setJourneyClaims((prev) => ({ ...prev, [mission.id]: true }));
          }
        } else {
          console.error("Error claiming XP mission:", insertError);
        }
        setClaimingId(null);
        return;
      }

      try {
        await addXPAsync(mission.xp, mission.title);

        if (mission.claimScope === "daily") {
          setDailyClaims((prev) => ({ ...prev, [mission.id]: true }));
        } else {
          setJourneyClaims((prev) => ({ ...prev, [mission.id]: true }));
        }
      } catch (error) {
        console.error("Error adding XP for mission:", error);
        await supabase
          .from("user_xp_mission_claims" as any)
          .delete()
          .eq("user_id", user.id)
          .eq("mission_key", mission.id)
          .eq("period_key", periodKey);
      } finally {
        setClaimingId(null);
      }
    },
    [addXPAsync, dailyClaims, journeyClaims, todayKey],
  );

  const renderMissionCard = (mission: MissionCard, tone: SectionTone) => {
    const isClaimed = tone === "eliteJourney" ? journeyClaims[mission.id] : dailyClaims[mission.id];
    const canClaim = mission.done && !isClaimed;
    const Icon = mission.icon;

    const toneClasses =
      tone === "eliteJourney"
        ? {
            wrapper: "border-violet-500/15 bg-card/90",
            badge: mission.done ? "bg-violet-500 text-white" : "border-violet-500/20 text-violet-300",
            icon: mission.done ? "text-violet-400" : "text-slate-400",
            iconBg: "bg-violet-500/10",
            button: "bg-violet-500 text-white hover:bg-violet-600",
          }
        : tone === "eliteDaily"
          ? {
              wrapper: "border-amber-500/15 bg-card/90",
              badge: mission.done ? "bg-amber-500 text-white" : "border-amber-500/20 text-amber-300",
              icon: mission.done ? "text-amber-400" : "text-slate-400",
              iconBg: "bg-amber-500/10",
              button: "bg-amber-500 text-white hover:bg-amber-600",
            }
          : {
              wrapper: "border-border bg-card",
              badge: mission.done ? "bg-emerald-500 text-white" : "border-border text-muted-foreground",
              icon: mission.done ? "text-emerald-500" : "text-slate-400",
              iconBg: "bg-slate-100 dark:bg-slate-800",
              button: "",
            };

    return (
      <div key={mission.id} className={`rounded-xl border p-4 ${toneClasses.wrapper}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses.iconBg}`}>
              <Icon className={`h-5 w-5 ${toneClasses.icon}`} />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold leading-tight">{mission.title}</div>
              <div className="text-xs text-muted-foreground">{mission.desc}</div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={toneClasses.badge}>
              {mission.claimScope === "daily" ? copy.dailyTag : copy.lifetimeTag}
            </Badge>
            <Badge variant="outline" className="border-border/70 text-foreground">
              {getMissionProgressText(mission)}
            </Badge>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Progress value={getMissionProgressPercent(mission)} className="h-2" />

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              {mission.done ? copy.readyToClaim : copy.keepGoing}
            </span>

            <Button
              disabled={!canClaim || loading || isAddingXP || claimingId === mission.id}
              onClick={() => void claimMission(mission)}
              className={`rounded-lg ${toneClasses.button}`}
            >
              {canClaim
                ? `+${mission.xp} XP`
                : isClaimed
                  ? copy.claimed
                  : copy.locked}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const headerTitle = t("missions.title", {
    defaultValue: t("dashboard.missions.title", { defaultValue: copy.title }),
  });
  const headerSubtitle = t("missions.subtitle", {
    defaultValue: t("dashboard.missions.subtitle", { defaultValue: copy.subtitle }),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 pb-4 pt-6">
          <DialogTitle className="text-xl font-bold">{headerTitle}</DialogTitle>
          <p className="text-sm text-muted-foreground">{headerSubtitle}</p>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary">
                {completedCount}/{missions.length}
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-600">
                <Sparkles className="mr-1 h-3 w-3" /> XP
              </Badge>
            </div>
            <div className="min-w-[160px]">
              <Progress value={percent} className="h-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {missions.map((mission) => renderMissionCard(mission, "base"))}
          </div>

          <div className="space-y-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{copy.dailyEliteTitle}</p>
                <p className="text-xs text-muted-foreground">{copy.dailyEliteSubtitle}</p>
              </div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                {eliteCompletedCount}/{eliteDailyMissions.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {eliteDailyMissions.map((mission) => renderMissionCard(mission, "eliteDaily"))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{copy.journeysTitle}</p>
                <p className="text-xs text-muted-foreground">{copy.journeysSubtitle}</p>
              </div>
              <Badge variant="outline" className="border-violet-500/30 text-violet-300">
                {journeyCompletedCount}/{eliteJourneyMissions.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {eliteJourneyMissions.map((mission) => renderMissionCard(mission, "eliteJourney"))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg">
              {t("common.close", { defaultValue: t("lesson.close", { defaultValue: copy.close }) })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
