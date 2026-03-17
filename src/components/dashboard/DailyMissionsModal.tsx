import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useUserLevel, XP_REWARDS } from "@/hooks/useUserLevel";
import { useEffect, useMemo, useState } from "react";
import { Flame, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DailyMissionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SupportedLocale = "en" | "pt" | "es" | "fr" | "de" | "it" | "ru" | "zh" | "ja" | "ko" | "ar" | "hi" | "tr" | "pl" | "nl";

interface DailyMissionCopy {
  title: string;
  subtitle: string;
  dayCompleteTitle: string;
  dayCompleteDesc: string;
  chatTitle: string;
  chatDesc: string;
  streakTitle: string;
  streakDesc: string;
  statusDone: string;
  statusPending: string;
  claimed: string;
  locked: string;
  close: string;
}

const FALLBACK_COPY_BY_LANG: Record<SupportedLocale, DailyMissionCopy> = {
  en: {
    title: "Daily Missions",
    subtitle: "Complete daily missions to earn XP and exclusive rewards.",
    dayCompleteTitle: "Complete 1 trail day",
    dayCompleteDesc: "Finish any day of your trail today",
    chatTitle: "Send 1 message to EDI",
    chatDesc: "Talk to the AI assistant today",
    streakTitle: "Keep your daily streak",
    streakDesc: "Record activity to maintain your streak",
    statusDone: "Completed",
    statusPending: "Pending",
    claimed: "Claimed",
    locked: "Locked",
    close: "Close",
  },
  pt: {
    title: "Missões Diárias",
    subtitle: "Complete missões diárias para ganhar XP e recompensas exclusivas.",
    dayCompleteTitle: "Concluir 1 dia da trilha",
    dayCompleteDesc: "Finalize qualquer dia da sua trilha hoje",
    chatTitle: "Enviar 1 mensagem na EDI",
    chatDesc: "Converse com a assistente de IA hoje",
    streakTitle: "Manter sua sequência diária",
    streakDesc: "Registre atividade para manter sua sequência",
    statusDone: "Concluída",
    statusPending: "Pendente",
    claimed: "Resgatada",
    locked: "Bloqueada",
    close: "Fechar",
  },
  es: {
    title: "Misiones Diarias",
    subtitle: "Completa misiones diarias para ganar XP y recompensas exclusivas.",
    dayCompleteTitle: "Completar 1 día de la ruta",
    dayCompleteDesc: "Finaliza hoy cualquier día de tu ruta",
    chatTitle: "Enviar 1 mensaje a EDI",
    chatDesc: "Habla con la asistente de IA hoy",
    streakTitle: "Mantener tu racha diaria",
    streakDesc: "Registra actividad para mantener tu racha",
    statusDone: "Completada",
    statusPending: "Pendiente",
    claimed: "Canjeada",
    locked: "Bloqueada",
    close: "Cerrar",
  },
  fr: {
    title: "Missions Quotidiennes",
    subtitle: "Terminez des missions quotidiennes pour gagner de l'XP et des récompenses exclusives.",
    dayCompleteTitle: "Terminer 1 jour du parcours",
    dayCompleteDesc: "Terminez aujourd'hui n'importe quel jour de votre parcours",
    chatTitle: "Envoyer 1 message à EDI",
    chatDesc: "Parlez à l'assistante IA aujourd'hui",
    streakTitle: "Maintenir votre série quotidienne",
    streakDesc: "Enregistrez une activité pour maintenir votre série",
    statusDone: "Terminée",
    statusPending: "En attente",
    claimed: "Réclamée",
    locked: "Bloquée",
    close: "Fermer",
  },
  de: {
    title: "Tägliche Missionen",
    subtitle: "Schließe tägliche Missionen ab, um XP und exklusive Belohnungen zu erhalten.",
    dayCompleteTitle: "1 Kurstag abschließen",
    dayCompleteDesc: "Schließe heute einen beliebigen Tag deines Kurses ab",
    chatTitle: "1 Nachricht an EDI senden",
    chatDesc: "Sprich heute mit der KI-Assistentin",
    streakTitle: "Tägliche Serie halten",
    streakDesc: "Registriere Aktivität, um deine Serie zu halten",
    statusDone: "Abgeschlossen",
    statusPending: "Ausstehend",
    claimed: "Eingelöst",
    locked: "Gesperrt",
    close: "Schließen",
  },
  it: {
    title: "Missioni Giornaliere",
    subtitle: "Completa le missioni giornaliere per ottenere XP e ricompense esclusive.",
    dayCompleteTitle: "Completa 1 giorno del percorso",
    dayCompleteDesc: "Completa oggi qualsiasi giorno del tuo percorso",
    chatTitle: "Invia 1 messaggio a EDI",
    chatDesc: "Parla oggi con l'assistente IA",
    streakTitle: "Mantieni la tua serie giornaliera",
    streakDesc: "Registra attività per mantenere la tua serie",
    statusDone: "Completata",
    statusPending: "In sospeso",
    claimed: "Riscattata",
    locked: "Bloccata",
    close: "Chiudi",
  },
  ru: {
    title: "Ежедневные миссии",
    subtitle: "Выполняйте ежедневные миссии, чтобы получать XP и эксклюзивные награды.",
    dayCompleteTitle: "Завершить 1 день трека",
    dayCompleteDesc: "Завершите сегодня любой день вашего трека",
    chatTitle: "Отправить 1 сообщение в EDI",
    chatDesc: "Поговорите с ИИ-ассистентом сегодня",
    streakTitle: "Сохранить ежедневную серию",
    streakDesc: "Отмечайте активность, чтобы сохранять серию",
    statusDone: "Выполнено",
    statusPending: "В ожидании",
    claimed: "Получено",
    locked: "Заблокировано",
    close: "Закрыть",
  },
  zh: {
    title: "每日任务",
    subtitle: "完成每日任务以获得 XP 和专属奖励。",
    dayCompleteTitle: "完成学习路径的 1 天",
    dayCompleteDesc: "今天完成你学习路径中的任意一天",
    chatTitle: "向 EDI 发送 1 条消息",
    chatDesc: "今天与 AI 助手对话",
    streakTitle: "保持你的每日连续记录",
    streakDesc: "记录活动以保持连续记录",
    statusDone: "已完成",
    statusPending: "待完成",
    claimed: "已领取",
    locked: "已锁定",
    close: "关闭",
  },
  ja: {
    title: "デイリーミッション",
    subtitle: "デイリーミッションを完了してXPと限定報酬を獲得しましょう。",
    dayCompleteTitle: "学習パスの1日を完了",
    dayCompleteDesc: "今日、学習パスの任意の1日を完了する",
    chatTitle: "EDIに1件メッセージを送信",
    chatDesc: "今日はAIアシスタントと会話する",
    streakTitle: "毎日の連続記録を維持",
    streakDesc: "連続記録を維持するために活動を記録する",
    statusDone: "完了",
    statusPending: "保留中",
    claimed: "受け取り済み",
    locked: "ロック中",
    close: "閉じる",
  },
  ko: {
    title: "일일 미션",
    subtitle: "일일 미션을 완료하고 XP와 특별 보상을 받으세요.",
    dayCompleteTitle: "학습 경로 1일 완료",
    dayCompleteDesc: "오늘 학습 경로의 아무 하루나 완료하세요",
    chatTitle: "EDI에 메시지 1개 보내기",
    chatDesc: "오늘 AI 어시스턴트와 대화하세요",
    streakTitle: "일일 연속 기록 유지",
    streakDesc: "연속 기록 유지를 위해 활동을 기록하세요",
    statusDone: "완료",
    statusPending: "대기 중",
    claimed: "수령됨",
    locked: "잠김",
    close: "닫기",
  },
  ar: {
    title: "المهام اليومية",
    subtitle: "أكمل المهام اليومية لكسب XP ومكافآت حصرية.",
    dayCompleteTitle: "إكمال يوم واحد من المسار",
    dayCompleteDesc: "أكمل أي يوم من مسارك اليوم",
    chatTitle: "إرسال رسالة واحدة إلى EDI",
    chatDesc: "تحدث مع المساعدة الذكية اليوم",
    streakTitle: "الحفاظ على سلسلتك اليومية",
    streakDesc: "سجّل نشاطًا للحفاظ على السلسلة",
    statusDone: "مكتملة",
    statusPending: "قيد الانتظار",
    claimed: "تم الاستلام",
    locked: "مقفلة",
    close: "إغلاق",
  },
  hi: {
    title: "दैनिक मिशन",
    subtitle: "XP और विशेष रिवॉर्ड पाने के लिए दैनिक मिशन पूरे करें।",
    dayCompleteTitle: "पथ का 1 दिन पूरा करें",
    dayCompleteDesc: "आज अपने पथ का कोई भी एक दिन पूरा करें",
    chatTitle: "EDI को 1 संदेश भेजें",
    chatDesc: "आज AI सहायक से बात करें",
    streakTitle: "अपनी दैनिक स्ट्रीक बनाए रखें",
    streakDesc: "स्ट्रीक बनाए रखने के लिए गतिविधि दर्ज करें",
    statusDone: "पूर्ण",
    statusPending: "लंबित",
    claimed: "क्लेम किया गया",
    locked: "लॉक",
    close: "बंद करें",
  },
  tr: {
    title: "Günlük Görevler",
    subtitle: "XP ve özel ödüller kazanmak için günlük görevleri tamamlayın.",
    dayCompleteTitle: "Yolun 1 gününü tamamla",
    dayCompleteDesc: "Bugün yolundaki herhangi bir günü tamamla",
    chatTitle: "EDI'ye 1 mesaj gönder",
    chatDesc: "Bugün yapay zeka asistanı ile konuş",
    streakTitle: "Günlük serini koru",
    streakDesc: "Serini korumak için etkinlik kaydet",
    statusDone: "Tamamlandı",
    statusPending: "Beklemede",
    claimed: "Alındı",
    locked: "Kilitli",
    close: "Kapat",
  },
  pl: {
    title: "Codzienne misje",
    subtitle: "Ukończ codzienne misje, aby zdobywać XP i ekskluzywne nagrody.",
    dayCompleteTitle: "Ukończ 1 dzień ścieżki",
    dayCompleteDesc: "Ukończ dziś dowolny dzień swojej ścieżki",
    chatTitle: "Wyślij 1 wiadomość do EDI",
    chatDesc: "Porozmawiaj dziś z asystentką AI",
    streakTitle: "Utrzymaj codzienną serię",
    streakDesc: "Zarejestruj aktywność, aby utrzymać serię",
    statusDone: "Ukończona",
    statusPending: "Oczekuje",
    claimed: "Odebrana",
    locked: "Zablokowana",
    close: "Zamknij",
  },
  nl: {
    title: "Dagelijkse Missies",
    subtitle: "Voltooi dagelijkse missies om XP en exclusieve beloningen te verdienen.",
    dayCompleteTitle: "Voltooi 1 dag van het pad",
    dayCompleteDesc: "Rond vandaag een willekeurige dag van je pad af",
    chatTitle: "Stuur 1 bericht naar EDI",
    chatDesc: "Praat vandaag met de AI-assistent",
    streakTitle: "Behoud je dagelijkse reeks",
    streakDesc: "Registreer activiteit om je reeks te behouden",
    statusDone: "Voltooid",
    statusPending: "In afwachting",
    claimed: "Geclaimd",
    locked: "Vergrendeld",
    close: "Sluiten",
  },
};

const normalizeLocale = (language?: string): SupportedLocale => {
  const normalized = (language || "en").toLowerCase().split("-")[0] as SupportedLocale;
  return FALLBACK_COPY_BY_LANG[normalized] ? normalized : "en";
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

export function DailyMissionsModal({ open, onOpenChange }: DailyMissionsModalProps) {
  const { t, i18n } = useTranslation();
  const { addXP, isAddingXP } = useUserLevel();
  const [loading, setLoading] = useState(false);
  const [dayDone, setDayDone] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [streakDone, setStreakDone] = useState(false);
  const [claimed, setClaimed] = useState<{ [k: string]: boolean }>({});

  const locale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const copy = FALLBACK_COPY_BY_LANG[locale];
  const todayStart = useMemo(() => startOfTodayLocal(), []);
  const todayIso = useMemo(() => todayStart.toISOString(), [todayStart]);
  const todayKey = useMemo(() => toLocalDayKey(todayStart), [todayStart]);

  useEffect(() => {
    const keys = ["mission_day", "mission_chat", "mission_streak"].reduce((acc, k) => {
      acc[k] = localStorage.getItem(`${k}_${todayKey}`) === "1";
      return acc;
    }, {} as Record<string, boolean>);
    setClaimed(keys);
  }, [todayKey]);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDayDone(false);
        setChatDone(false);
        setStreakDone(false);
        setLoading(false);
        return;
      }
      const { count: dayCount = 0 } = await supabase
        .from("user_day_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true)
        .gte("completed_at", todayIso);
      setDayDone((dayCount || 0) > 0);

      const { count: chatCount = 0 } = await supabase
        .from("chat_messages")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("role", "user")
        .eq("ai_assistant_type", "edi")
        .gte("created_at", todayIso);
      setChatDone((chatCount || 0) > 0);

      const todayDate = todayKey;
      const { data: streak } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setStreakDone(Boolean(streak?.last_activity_date && streak.last_activity_date >= todayDate));
      setLoading(false);
    };
    if (open) fetchStatus();
  }, [open, todayIso]);

  const missions = [
    {
      id: "mission_day",
      icon: CheckCircle2,
      title: t("missions.dayCompleteTitle", { defaultValue: copy.dayCompleteTitle }),
      desc: t("missions.dayCompleteDesc", { defaultValue: copy.dayCompleteDesc }),
      done: dayDone,
      xp: XP_REWARDS.DAY_COMPLETE,
    },
    {
      id: "mission_chat",
      icon: MessageCircle,
      title: t("missions.chatTitle", { defaultValue: copy.chatTitle }),
      desc: t("missions.chatDesc", { defaultValue: copy.chatDesc }),
      done: chatDone,
      xp: 20,
    },
    {
      id: "mission_streak",
      icon: Flame,
      title: t("missions.streakTitle", { defaultValue: copy.streakTitle }),
      desc: t("missions.streakDesc", { defaultValue: copy.streakDesc }),
      done: streakDone,
      xp: 15,
    },
  ];

  const completedCount = missions.filter((m) => m.done).length;
  const percent = Math.round((completedCount / missions.length) * 100);

  const headerTitle = t("missions.title", {
    defaultValue: t("dashboard.missions.title", { defaultValue: copy.title }),
  });
  const headerSubtitle = t("missions.subtitle", {
    defaultValue: t("dashboard.missions.subtitle", { defaultValue: copy.subtitle }),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold">
            {headerTitle}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {headerSubtitle}
          </p>
        </DialogHeader>
        <div className="px-6 py-4 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {completedCount}/{missions.length}
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-600">
                <Sparkles className="w-3 h-3 mr-1" /> XP
              </Badge>
            </div>
            <div className="min-w-[160px]">
              <Progress value={percent} className="h-3" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {missions.map((m) => {
              const claimedKey = claimed[m.id];
              const canClaim = m.done && !claimedKey;
              const Icon = m.icon;
              return (
                <div key={m.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${m.done ? "text-emerald-500" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{m.title}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={m.done ? "default" : "outline"} className={m.done ? "bg-emerald-500 text-white" : ""}>
                      {m.done
                        ? t("missions.statusDone", { defaultValue: copy.statusDone })
                        : t("missions.statusPending", { defaultValue: copy.statusPending })}
                    </Badge>
                    <Button
                      disabled={!canClaim || loading || isAddingXP}
                      onClick={() => {
                        addXP(m.xp, `${m.title}`);
                        localStorage.setItem(`${m.id}_${todayKey}`, "1");
                        setClaimed({ ...claimed, [m.id]: true });
                      }}
                      className="rounded-lg"
                    >
                      {canClaim
                        ? `+${m.xp} XP`
                        : claimedKey
                          ? t("missions.claimed", { defaultValue: copy.claimed })
                          : t("missions.locked", { defaultValue: copy.locked })}
                    </Button>
                  </div>
                </div>
              );
            })}
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
