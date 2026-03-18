import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserPlus,
  TrendingUp,
  Flame,
  Crown,
  AlertTriangle,
  RefreshCw,
  DollarSign,
  Package,
  Briefcase,
  Bot,
  CheckCircle2,
  UserX,
  Activity,
  Clock,
} from "lucide-react";
import { AdminKPICard } from "./AdminKPICard";
import { AdminSectionHeader } from "./AdminSectionHeader";
import {
  getAdminDateKey,
  getAdminDayEndIso,
  getAdminDayStartIso,
  getAdminDaysAgoStartIso,
  getAdminTodayKey,
} from "@/lib/adminTimeZone";

type BillingMetricEvent = {
  email: string;
  event_type: string;
  created_at: string | null;
  payload: Record<string, unknown> | null;
  status: string;
};

const normalizeBillingEmail = (email: string | null | undefined) =>
  (email || "").trim().replace(/\.+$/, "").toLowerCase();

const getBillingWebhookSource = (payload: Record<string, unknown> | null | undefined) =>
  typeof payload?._webhook_source === "string" ? payload._webhook_source.toLowerCase() : null;

const getBillingSubscription = (payload: Record<string, unknown> | null | undefined) =>
  (payload?.subscription as Record<string, unknown> | undefined) || undefined;

const getHotmartPurchase = (payload: Record<string, unknown> | null | undefined) => {
  const data = payload?.data as Record<string, unknown> | undefined;
  return (data?.purchase as Record<string, unknown> | undefined) || undefined;
};

const getFunnelfoxIteration = (payload: Record<string, unknown> | null | undefined) => {
  const iteration = getBillingSubscription(payload)?.iteration;
  return typeof iteration === "number"
    ? iteration
    : typeof iteration === "string"
      ? Number(iteration)
      : null;
};

const getHotmartRecurrenceNumber = (payload: Record<string, unknown> | null | undefined) => {
  const recurrenceNumber = getHotmartPurchase(payload)?.recurrence_number;
  return typeof recurrenceNumber === "number"
    ? recurrenceNumber
    : typeof recurrenceNumber === "string"
      ? Number(recurrenceNumber)
      : null;
};

const getHotmartTransactionId = (payload: Record<string, unknown> | null | undefined) => {
  const transactionId = getHotmartPurchase(payload)?.transaction;
  return typeof transactionId === "string" && transactionId.length > 0 ? transactionId : null;
};

const getHotmartApprovedDate = (payload: Record<string, unknown> | null | undefined) => {
  const approvedDate = getHotmartPurchase(payload)?.approved_date;
  return typeof approvedDate === "string" && approvedDate.length > 0 ? approvedDate : null;
};

const getHotmartOrderDate = (payload: Record<string, unknown> | null | undefined) => {
  const orderDate = getHotmartPurchase(payload)?.order_date;
  return typeof orderDate === "string" && orderDate.length > 0 ? orderDate : null;
};

const isBillingPaymentEvent = (eventType: string) => {
  const normalizedType = eventType.toUpperCase();
  return normalizedType.includes("SETTLED") ||
    normalizedType.includes("APPROVED") ||
    normalizedType.includes("COMPLETE");
};

const isManualBillingImport = (payload: Record<string, unknown> | null | undefined) =>
  getBillingWebhookSource(payload) === "manual_csv_import";

const isHotmartBillingEvent = (event: BillingMetricEvent) => {
  const payload = event.payload;
  const source = getBillingWebhookSource(payload);
  const purchase = getHotmartPurchase(payload);
  const normalizedType = event.event_type.toUpperCase();

  return !isManualBillingImport(payload) && (
    source === "hotmart" ||
    normalizedType.startsWith("PURCHASE_") ||
    !!purchase
  );
};

const getRenewalDedupKey = (event: BillingMetricEvent, todayKey: string) => {
  const payload = event.payload;
  const normalizedEmail = normalizeBillingEmail(event.email);
  const source = getBillingWebhookSource(payload);

  if (isHotmartBillingEvent(event)) {
    const transactionId = getHotmartTransactionId(payload);
    if (transactionId) return `hotmart:tx:${transactionId}`;

    const approvedDate = getHotmartApprovedDate(payload);
    if (approvedDate) return `hotmart:approved:${normalizedEmail}:${approvedDate}`;

    const orderDate = getHotmartOrderDate(payload);
    if (orderDate) return `hotmart:order:${normalizedEmail}:${orderDate}`;

    const recurrenceNumber = getHotmartRecurrenceNumber(payload);
    if (recurrenceNumber) return `hotmart:email-recurrence:${normalizedEmail}:${recurrenceNumber}:${todayKey}`;

    return `hotmart:email-day:${normalizedEmail}:${todayKey}`;
  }

  const subscriptionId = getBillingSubscription(payload)?.id;
  if (typeof subscriptionId === "string" && subscriptionId.length > 0) {
    return `${source || "billing"}:subscription:${subscriptionId}`;
  }

  const iteration = getFunnelfoxIteration(payload);
  if (iteration) {
    return `${source || "billing"}:email-iteration:${normalizedEmail}:${iteration}:${todayKey}`;
  }

  return `${source || "billing"}:email-event:${normalizedEmail}:${event.event_type}:${todayKey}`;
};

export const KPICards = () => {
  const { toast } = useToast();
  const [errorRangeDays, setErrorRangeDays] = useState("7");

  const errorRangeValue = Number(errorRangeDays);
  const errorRangeLabel = `${errorRangeValue}d`;
  const COMPLETED_PROGRESS_PAGE_SIZE = 1000;

  // Função para exportar os dados do PRIMEIRO login para CSV
  const exportSessionsToCSV = async () => {
    try {
      const { data, error } = await supabase
        .from('user_session_details')
        .select('*');

      if (error) {
        console.error('Erro ao buscar dados para exportação:', error);
        toast({
          variant: "destructive",
          title: "Erro no relatório",
          description: "Verifique se a View foi criada no banco de dados."
        });
        return;
      }

      if (!data || data.length === 0) {
        toast({
          title: "Sem dados",
          description: "Nenhum dado de primeiro acesso foi registrado ainda."
        });
        return;
      }

      // Cabeçalho da planilha
      const headers = "Nome,Email,Data Primeiro Acesso,Fim da Primeira Sessao,Minutos Ativos na Estreia\n";

      const csvContent = data.map(row => {
        const nome = (row.nome || 'Sem nome').replace(/,/g, '');
        const email = row.email || 'N/A';
        const inicio = row.inicio || '';
        const ultimo = row.ultimo_sinal || '';
        const minutos = row.minutos_ativos || 0;
        return `${nome},${email},${inicio},${ultimo},${minutos}`;
      }).join("\n");

      const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `primeiro_acesso_educly_${getAdminTodayKey()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro inesperado na exportação:', err);
    }
  };

  // Fetch all KPI data
  const { data: kpis, isLoading } = useQuery({
    queryKey: ["admin-kpis", errorRangeDays],
    queryFn: async () => {
      const todayStartSaoPaulo = getAdminDayStartIso();
      const tomorrowStartSaoPaulo = getAdminDayEndIso();
      const sevenDaysAgoStartSaoPaulo = getAdminDaysAgoStartIso(7);
      const todayKey = getAdminTodayKey();
      const sevenDaysAgoKey = getAdminDateKey(sevenDaysAgoStartSaoPaulo);

      // Total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      // New users today
      const { count: newToday } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStartSaoPaulo)
        .lt("created_at", tomorrowStartSaoPaulo);

      // New users this week
      const { count: newWeek } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgoStartSaoPaulo)
        .lt("created_at", tomorrowStartSaoPaulo);

      // Streak stats
      const { data: streakData } = await supabase
        .from("user_streaks")
        .select("current_streak, longest_streak, last_activity_date");

      const activeStreaks = streakData?.filter((s) =>
        s.last_activity_date && s.last_activity_date >= sevenDaysAgoKey
      ) || [];

      const avgStreak = activeStreaks.length
        ? (activeStreaks.reduce((acc, s) => acc + s.current_streak, 0) / activeStreaks.length).toFixed(1)
        : 0;
      const maxStreak = streakData?.length
        ? Math.max(...streakData.map((s) => s.longest_streak))
        : 0;

      const usersWithCompletedDays = new Set<string>();
      const usersActiveInLast7Days = new Set<string>();
      let completedProgressFrom = 0;

      while (true) {
        const { data: completedProgressBatch, error: completedProgressError } = await supabase
          .from("user_day_progress")
          .select("user_id, completed_at")
          .eq("completed", true)
          .range(completedProgressFrom, completedProgressFrom + COMPLETED_PROGRESS_PAGE_SIZE - 1);

        if (completedProgressError) throw completedProgressError;

        completedProgressBatch?.forEach((row) => {
          if (row.user_id) {
            usersWithCompletedDays.add(row.user_id);

            if (
              row.completed_at &&
              row.completed_at >= sevenDaysAgoStartSaoPaulo &&
              row.completed_at < tomorrowStartSaoPaulo
            ) {
              usersActiveInLast7Days.add(row.user_id);
            }
          }
        });

        if (!completedProgressBatch || completedProgressBatch.length < COMPLETED_PROGRESS_PAGE_SIZE) {
          break;
        }

        completedProgressFrom += COMPLETED_PROGRESS_PAGE_SIZE;
      }

      // Users without any completed learning day
      const usersWithoutStreak = Math.max((totalUsers || 0) - usersWithCompletedDays.size, 0);

      // Activation rate (users who completed at least one day / total users)
      const activationRate = totalUsers && totalUsers > 0
        ? ((usersWithCompletedDays.size / totalUsers) * 100).toFixed(1)
        : 0;

      // Active users (7 dias) - users with at least one completed day in the last 7 days
      const activeUsers = usersActiveInLast7Days.size;

      // Premium users
      const { count: premiumUsers } = await supabase
        .from("user_premium_access")
        .select("user_id", { count: "exact", head: true })
        .in("plan_type", ["premium", "base"]);

      const { count: chargebacks } = await supabase
        .from("billing_event_logs")
        .select("id", { count: "exact", head: true })
        .ilike("event_type", "%chargeback%");

      // Billing events - include payload for iteration/recurrence detection
      const { data: billingEvents } = await supabase
        .from("billing_event_logs")
        .select("email, event_type, created_at, payload, status")
        .gte("created_at", sevenDaysAgoStartSaoPaulo);

      const refunds = billingEvents?.filter((e) =>
        e.event_type.toUpperCase().includes("REFUND")
      ).length || 0;


      const settled = billingEvents?.filter((e) =>
        isBillingPaymentEvent(e.event_type)
      ).length || 0;

      // Filter payment events for today
      const purchasesTodayData: BillingMetricEvent[] = (billingEvents?.filter((e) => {
        const eventDate = e.created_at ? getAdminDateKey(e.created_at) : null;
        return eventDate === todayKey && isBillingPaymentEvent(e.event_type);
      }) as BillingMetricEvent[]) || [];

      const todayHotmartEvents = purchasesTodayData.filter((event) => isHotmartBillingEvent(event));
      const todayHotmartRawEmails = Array.from(new Set(
        todayHotmartEvents
          .map((event) => event.email)
          .filter((email): email is string => typeof email === "string" && email.length > 0)
      ));

      let priorHotmartPaymentEmails = new Set<string>();

      if (todayHotmartRawEmails.length > 0) {
        const hotmartHistoryLookbackStart = getAdminDaysAgoStartIso(365);
        const { data: priorHotmartEvents } = await supabase
          .from("billing_event_logs")
          .select("email, event_type, created_at, payload, status")
          .in("email", todayHotmartRawEmails)
          .lt("created_at", todayStartSaoPaulo)
          .gte("created_at", hotmartHistoryLookbackStart);

        priorHotmartPaymentEmails = new Set(
          ((priorHotmartEvents as BillingMetricEvent[] | null) || [])
            .filter((event) => isHotmartBillingEvent(event) && isBillingPaymentEvent(event.event_type))
            .map((event) => normalizeBillingEmail(event.email))
            .filter(Boolean)
        );
      }

      const renewalKeys = new Set<string>();

      purchasesTodayData.forEach((event) => {
        const payload = event.payload;
        if (isManualBillingImport(payload)) return;

        const ffIteration = getFunnelfoxIteration(payload);
        if (ffIteration && ffIteration > 1) {
          renewalKeys.add(getRenewalDedupKey(event, todayKey));
          return;
        }

        if (!isHotmartBillingEvent(event)) return;

        const hotmartRecurrence = getHotmartRecurrenceNumber(payload);
        if (hotmartRecurrence && hotmartRecurrence > 1) {
          renewalKeys.add(getRenewalDedupKey(event, todayKey));
          return;
        }

        if (
          hotmartRecurrence == null &&
          priorHotmartPaymentEmails.has(normalizeBillingEmail(event.email))
        ) {
          renewalKeys.add(getRenewalDedupKey(event, todayKey));
        }
      });

      const renewalsTodayCount = renewalKeys.size;

      // Product access - count UNIQUE users per product type
      const { data: productAccess } = await supabase
        .from("user_product_access")
        .select("user_id, product_type")
        .eq("is_active", true);

      // Use Sets to count unique users per product type
      const baseUserIds = new Set(productAccess?.filter((p) => p.product_type === "base").map((p) => p.user_id));
      const freelancerUserIds = new Set(productAccess?.filter((p) => p.product_type === "freelancer").map((p) => p.user_id));
      const aiHubUserIds = new Set(productAccess?.filter((p) => p.product_type === "ai_hub").map((p) => p.user_id));

      const baseUsers = baseUserIds.size;
      const freelancerUsers = freelancerUserIds.size;
      const aiHubUsers = aiHubUserIds.size;

      // Total unique users with any product
      const allProductUserIds = new Set(productAccess?.map((p) => p.user_id));
      const totalProductUsers = allProductUserIds.size;

      // Completed days
      const { count: completedDays } = await supabase
        .from("user_day_progress")
        .select("id", { count: "exact", head: true })
        .eq("completed", true);

      // Retention rate
      const retention = totalUsers && activeUsers
        ? ((activeUsers / totalUsers) * 100).toFixed(1)
        : 0;

      // Average First Session Time (via RPC no banco)
      const { data: avgFirstSession } = await supabase
        .rpc('get_avg_first_session_minutes' as any);

      const avgSessionMinutes = avgFirstSession
        ? Number(avgFirstSession).toFixed(1)
        : 0;

      const errorRangeStart = getAdminDaysAgoStartIso(errorRangeValue);
      const errorsInRange = billingEvents?.filter((event) => {
        if (!event.created_at) return false;
        if (event.status !== "error") return false;
        return event.created_at >= errorRangeStart;
      }).length || 0;
      const avgErrorsPerDay = errorRangeValue > 0
        ? (errorsInRange / errorRangeValue).toFixed(2)
        : "0";

      return {
        totalUsers: totalUsers || 0,
        newToday: newToday || 0,
        newWeek: newWeek || 0,
        avgStreak,
        maxStreak,
        activeUsers,
        usersWithoutStreak,
        premiumUsers: premiumUsers || 0,
        chargebacks,
        refunds,

        settled,
        renewalsTodayCount,
        baseUsers,
        freelancerUsers,
        aiHubUsers,
        totalProductUsers,
        completedDays: completedDays || 0,
        retention,
        activationRate,
        avgSessionMinutes,
        errorsInRange,
        avgErrorsPerDay,
      };
    },
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/50 p-5">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Users Section */}
      <section>
        <AdminSectionHeader
          emoji="👥"
          title="Usuários"
          description="Métricas de aquisição e ativação"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Total de Usuários"
            value={kpis?.totalUsers || 0}
            icon={<Users className="h-5 w-5" />}
            description={`+${kpis?.newWeek || 0} esta semana`}
            tooltip="Total de perfis cadastrados na tabela 'profiles'"
          />
          <AdminKPICard
            title="Novos Hoje"
            value={kpis?.newToday || 0}
            icon={<UserPlus className="h-5 w-5" />}
            color="success"
            tooltip="Usuários com created_at dentro do dia atual em America/Sao_Paulo"
          />
          <AdminKPICard
            title="Sem Atividade"
            value={kpis?.usersWithoutStreak || 0}
            icon={<UserX className="h-5 w-5" />}
            description={`${((kpis?.usersWithoutStreak || 0) / (kpis?.totalUsers || 1) * 100).toFixed(0)}% dos usuários`}
            color={kpis?.usersWithoutStreak && kpis.usersWithoutStreak > 0 ? "warning" : "default"}
            tooltip="Usuários que criaram conta mas ainda não têm nenhum user_day_progress com completed=true"
          />
          <AdminKPICard
            title="Taxa de Ativação"
            value={`${kpis?.activationRate || 0}%`}
            icon={<Activity className="h-5 w-5" />}
            description="Fizeram pelo menos 1 atividade"
            tooltip="% de usuários com pelo menos um user_day_progress completed=true"
          />
        </div>
      </section>

      {/* Engagement Section */}
      <section>
        <AdminSectionHeader
          emoji="🔥"
          title="Engajamento"
          description="Streaks e atividade dos usuários"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Streak Médio"
            value={kpis?.avgStreak || 0}
            icon={<Flame className="h-5 w-5" />}
            description="dias consecutivos"
            tooltip="Média de current_streak dos usuários ativos nos últimos 7 dias em user_streaks"
          />
          <AdminKPICard
            title="Maior Streak"
            value={kpis?.maxStreak || 0}
            icon={<Flame className="h-5 w-5" />}
            color="success"
            tooltip="Valor máximo de longest_streak na tabela user_streaks"
          />
          <AdminKPICard
            title="Ativos (7 dias)"
            value={kpis?.activeUsers || 0}
            icon={<CheckCircle2 className="h-5 w-5" />}
            description={`${kpis?.retention}% retenção`}
            tooltip="Usuários com pelo menos um user_day_progress completed=true nos últimos 7 dias em America/Sao_Paulo. Retenção = ativos / total de usuários."
          />
          <div onClick={exportSessionsToCSV} className="cursor-pointer transition-transform active:scale-95">
            <AdminKPICard
              title="Tempo 1º Login"
              value={`${kpis?.avgSessionMinutes || 0} min`}
              icon={<Clock className="h-5 w-5" />}
              color="info"
              description="CSV de Novos Usuários"
              tooltip="Média real, em minutos, da primeira sessão registrada por usuário. Clique para baixar o relatório do primeiro acesso."
            />
          </div>
          <AdminKPICard
            title="Dias Completados"
            value={kpis?.completedDays || 0}
            icon={<TrendingUp className="h-5 w-5" />}
            description="total de lições concluídas"
            tooltip="Total de registros com completed=true em user_day_progress"
          />
        </div>
      </section>

      {/* Financial Section */}
      <section>
        <AdminSectionHeader
          emoji="💰"
          title="Financeiro"
          description="Receita e transações"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Usuários Premium"
            value={kpis?.premiumUsers || 0}
            icon={<Crown className="h-5 w-5" />}
            color="success"
            tooltip="Total de usuários em user_premium_access com plan_type igual a premium ou base"
          />
          <AdminKPICard
            title="Renovações Hoje"
            value={kpis?.renewalsTodayCount || 0}
            icon={<DollarSign className="h-5 w-5" />}
            description="Confirmadas + inferidas"
            color="info"
            tooltip="Renovacoes hoje: Funnelfox com iteration>1 e Hotmart com recurrence_number>1. Quando a Hotmart nao envia recurrence_number, o sistema infere renovacao pelo historico anterior do mesmo email e deduplica eventos repetidos."
          />
          <AdminKPICard
            title="Pagamentos"
            value={kpis?.settled || 0}
            icon={<DollarSign className="h-5 w-5" />}
            description="SETTLED/APPROVED/COMPLETE"
            color="success"
            tooltip="Eventos de billing_event_logs com SETTLED, PURCHASE_APPROVED, ou PURCHASE_COMPLETE"
          />
          <AdminKPICard
            title="Chargebacks"
            value={kpis?.chargebacks || 0}
            icon={<AlertTriangle className="h-5 w-5" />}
            color={kpis?.chargebacks && kpis.chargebacks > 0 ? "danger" : "default"}
            tooltip="Total historico de eventos em billing_event_logs com event_type contendo 'chargeback'"
          />
        </div>
      </section>

      {/* Product Section */}
      <section>
        <AdminSectionHeader
          emoji="📦"
          title="Produtos"
          description="Distribuição por tipo de produto (usuários únicos)"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Com Produto Ativo"
            value={kpis?.totalProductUsers || 0}
            icon={<Package className="h-5 w-5" />}
            description="usuários únicos"
            tooltip="Contagem de user_id únicos em user_product_access com is_active=true"
          />
          <AdminKPICard
            title="Base"
            value={kpis?.baseUsers || 0}
            icon={<Package className="h-5 w-5" />}
            color="success"
            tooltip="Usuários únicos com product_type='base' em user_product_access"
          />
          <AdminKPICard
            title="Freelancer"
            value={kpis?.freelancerUsers || 0}
            icon={<Briefcase className="h-5 w-5" />}
            color="info"
            tooltip="Usuários únicos com product_type='freelancer' em user_product_access"
          />
          <AdminKPICard
            title="AI Hub"
            value={kpis?.aiHubUsers || 0}
            icon={<Bot className="h-5 w-5" />}
            color="purple"
            tooltip="Usuários únicos com product_type='ai_hub' em user_product_access"
          />
        </div>
      </section>

      {/* Problems Section */}
      <section>
        <AdminSectionHeader
          emoji="⚠️"
          title="Problemas"
          description="Métricas de atenção"
          action={
            <Select value={errorRangeDays} onValueChange={setErrorRangeDays}>
              <SelectTrigger className="h-8 w-[130px] bg-white">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ultimos 1 dia</SelectItem>
                <SelectItem value="2">Ultimos 2 dias</SelectItem>
                <SelectItem value="3">Ultimos 3 dias</SelectItem>
                <SelectItem value="4">Ultimos 4 dias</SelectItem>
                <SelectItem value="5">Ultimos 5 dias</SelectItem>
                <SelectItem value="6">Ultimos 6 dias</SelectItem>
                <SelectItem value="7">Ultimos 7 dias</SelectItem>
                <SelectItem value="30">Ultimos 30 dias</SelectItem>
                <SelectItem value="60">Ultimos 60 dias</SelectItem>
                <SelectItem value="90">Ultimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Reembolsos"
            value={kpis?.refunds || 0}
            icon={<RefreshCw className="h-5 w-5" />}
            color={kpis?.refunds && kpis.refunds > 0 ? "warning" : "default"}
            tooltip="Eventos de billing_event_logs com event_type contendo 'refund'"
          />
          <AdminKPICard
            title="Logs de Erro (Cashrate)"
            value={kpis?.errorsInRange || 0}
            icon={<AlertTriangle className="h-5 w-5" />}
            color={kpis?.errorsInRange && kpis.errorsInRange > 0 ? "danger" : "default"}
            description={`Periodo: ${errorRangeLabel}`}
            tooltip="Total de eventos em billing_event_logs com status='error' no periodo selecionado"
          />
          <AdminKPICard
            title="Media de Erros"
            value={kpis?.avgErrorsPerDay || 0}
            icon={<Activity className="h-5 w-5" />}
            color={kpis?.avgErrorsPerDay && Number(kpis.avgErrorsPerDay) > 0 ? "warning" : "default"}
            description={`${errorRangeLabel} (erros/dia)`}
            tooltip="Media diaria de erros no periodo selecionado"
          />
        </div>
      </section>
    </div>
  );
};



