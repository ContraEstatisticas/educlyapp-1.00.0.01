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

const isoStartOfTodayUTC = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)).toISOString();
};

export function DailyMissionsModal({ open, onOpenChange }: DailyMissionsModalProps) {
  const { t } = useTranslation();
  const { addXP, isAddingXP } = useUserLevel();
  const [loading, setLoading] = useState(false);
  const [dayDone, setDayDone] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [streakDone, setStreakDone] = useState(false);
  const [claimed, setClaimed] = useState<{ [k: string]: boolean }>({});

  const todayIso = useMemo(() => isoStartOfTodayUTC(), []);
  const todayKey = useMemo(() => todayIso.split("T")[0], [todayIso]);

  useEffect(() => {
    const keys = ["mission_day", "mission_chat", "mission_streak"].reduce((acc, k) => {
      acc[k] = localStorage.getItem(`${k}_${todayKey}`) === "1";
      return acc;
    }, {} as any);
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
        .gte("created_at", todayIso);
      setChatDone((chatCount || 0) > 0);

      const todayDate = todayIso.split("T")[0];
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
      title: t("missions.dayCompleteTitle", "Concluir 1 dia da trilha"),
      desc: t("missions.dayCompleteDesc", "Finalize qualquer dia da sua trilha hoje"),
      done: dayDone,
      xp: XP_REWARDS.DAY_COMPLETE,
    },
    {
      id: "mission_chat",
      icon: MessageCircle,
      title: t("missions.chatTitle", "Enviar 1 mensagem na EDI"),
      desc: t("missions.chatDesc", "Converse com a assistente de IA hoje"),
      done: chatDone,
      xp: 20,
    },
    {
      id: "mission_streak",
      icon: Flame,
      title: t("missions.streakTitle", "Manter sua sequência diária"),
      desc: t("missions.streakDesc", "Registre atividade para manter sua streak"),
      done: streakDone,
      xp: 15,
    },
  ];

  const completedCount = missions.filter(m => m.done).length;
  const percent = Math.round((completedCount / missions.length) * 100);

  const headerTitle = t("missions.title", t("dashboard.missions.title", "Missões Diárias"));
  const headerSubtitle = t("missions.subtitle", t("dashboard.missions.subtitle", "Complete missões diárias para ganhar XP e recompensas exclusivas."));

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
                      {m.done ? t("missions.statusDone", "Concluída") : t("missions.statusPending", "Pendente")}
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
                      {canClaim ? `+${m.xp} XP` : claimedKey ? t("missions.claimed", "Resgatada") : t("missions.locked", "Bloqueada")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg">
              {t("common.close", "Fechar")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
