import { useState } from "react";
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
import { getAdminTodayKey } from "@/lib/adminTimeZone";
import {
  formatAdminAnalyticsError,
  useAdminAnalyticsDashboard,
} from "@/hooks/useAdminAnalyticsDashboard";

export const KPICards = () => {
  const { toast } = useToast();
  const [errorRangeDays, setErrorRangeDays] = useState("7");

  const errorRangeValue = Number(errorRangeDays);
  const errorRangeLabel = `${errorRangeValue}d`;

  const { data: dashboard, isLoading, error } = useAdminAnalyticsDashboard(errorRangeValue);
  const kpis = dashboard?.kpis;

  const exportSessionsToCSV = async () => {
    try {
      const { data, error: exportError } = await supabase
        .from("user_session_details")
        .select("*");

      if (exportError) {
        console.error("Erro ao buscar dados para exportacao:", exportError);
        toast({
          variant: "destructive",
          title: "Erro no relatorio",
          description: "Verifique se a View foi criada no banco de dados.",
        });
        return;
      }

      if (!data || data.length === 0) {
        toast({
          title: "Sem dados",
          description: "Nenhum dado de primeiro acesso foi registrado ainda.",
        });
        return;
      }

      const headers = "Nome,Email,Data Primeiro Acesso,Fim da Primeira Sessao,Minutos Ativos na Estreia\n";
      const csvContent = data
        .map((row) => {
          const nome = String(row.nome || "Sem nome").replace(/,/g, "");
          const email = row.email || "N/A";
          const inicio = row.inicio || "";
          const ultimo = row.ultimo_sinal || "";
          const minutos = row.minutos_ativos || 0;
          return `${nome},${email},${inicio},${ultimo},${minutos}`;
        })
        .join("\n");

      const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `primeiro_acesso_educly_${getAdminTodayKey()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (unexpectedError) {
      console.error("Erro inesperado na exportacao:", unexpectedError);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-border/50 p-5">
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

  if (error || !kpis) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
        <h3 className="text-sm font-semibold text-foreground">Falha ao carregar as métricas</h3>
        <p className="text-sm text-muted-foreground mt-2">{formatAdminAnalyticsError(error)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <AdminSectionHeader
          emoji="👥"
          title="Usuários"
          description="Métricas de aquisição e ativação"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Total de Usuários"
            value={kpis.totalUsers}
            icon={<Users className="h-5 w-5" />}
            description={
              <>
                <p>+{kpis.newWeek} nos &uacute;ltimos 7 dias</p>
                <p>+{kpis.newCurrentWeek} na semana atual</p>
              </>
            }
            tooltip="Total de perfis cadastrados na tabela 'profiles'. Linhas extras: contas criadas nos ultimos 7 dias e na semana atual desde domingo em America/Sao_Paulo."
          />
          <AdminKPICard
            title="Novos Hoje"
            value={kpis.newToday}
            icon={<UserPlus className="h-5 w-5" />}
            color="success"
            tooltip="Usuários com created_at dentro do dia atual em America/Sao_Paulo"
          />
          <AdminKPICard
            title="Sem Atividade"
            value={kpis.usersWithoutStreak}
            icon={<UserX className="h-5 w-5" />}
            description={`${((kpis.usersWithoutStreak / Math.max(kpis.totalUsers, 1)) * 100).toFixed(0)}% dos usuários`}
            color={kpis.usersWithoutStreak > 0 ? "warning" : "default"}
            tooltip="Usuários que criaram conta mas ainda não têm nenhum user_day_progress com completed=true"
          />
          <AdminKPICard
            title="Taxa de Ativação"
            value={`${kpis.activationRate}%`}
            icon={<Activity className="h-5 w-5" />}
            description="Fizeram pelo menos 1 atividade"
            tooltip="% de usuários com pelo menos um user_day_progress completed=true"
          />
        </div>
      </section>

      <section>
        <AdminSectionHeader
          emoji="🔥"
          title="Engajamento"
          description="Streaks e atividade dos usuários"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Streak Médio"
            value={kpis.avgStreak}
            icon={<Flame className="h-5 w-5" />}
            description="dias consecutivos"
            tooltip="Média de current_streak dos usuários ativos nos últimos 7 dias em user_streaks"
          />
          <AdminKPICard
            title="Maior Streak"
            value={kpis.maxStreak}
            icon={<Flame className="h-5 w-5" />}
            color="success"
            tooltip="Valor máximo de longest_streak na tabela user_streaks"
          />
          <AdminKPICard
            title="Ativos (7 dias)"
            value={kpis.activeUsers}
            icon={<CheckCircle2 className="h-5 w-5" />}
            description={`${kpis.retention}% retenção`}
            tooltip="Usuários com pelo menos um user_day_progress completed=true nos últimos 7 dias em America/Sao_Paulo. Retenção = ativos / total de usuários."
          />
          <div onClick={exportSessionsToCSV} className="cursor-pointer transition-transform active:scale-95">
            <AdminKPICard
              title="Tempo 1º Login"
              value={`${kpis.avgSessionMinutes} min`}
              icon={<Clock className="h-5 w-5" />}
              color="info"
              description="CSV de Novos Usuários"
              tooltip="Média, em minutos, apenas do primeiro uso ativo de contas novas. Clique para baixar o relatório do primeiro acesso."
            />
          </div>
          <AdminKPICard
            title="Dias Completados"
            value={kpis.completedDays}
            icon={<TrendingUp className="h-5 w-5" />}
            description="total de lições concluídas"
            tooltip="Total de registros com completed=true em user_day_progress"
          />
        </div>
      </section>

      <section>
        <AdminSectionHeader
          emoji="💰"
          title="Financeiro"
          description="Receita e transações"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPICard
            title="Usuários Premium"
            value={kpis.premiumUsers}
            icon={<Crown className="h-5 w-5" />}
            color="success"
            tooltip="Total de usuários em user_premium_access com plan_type igual a premium ou base"
          />
          <AdminKPICard
            title="Renovações Hoje"
            value={kpis.renewalsTodayCount}
            icon={<DollarSign className="h-5 w-5" />}
            description="Confirmadas + inferidas"
            color="info"
            tooltip="Renovacoes hoje: Funnelfox com iteration>1 e Hotmart com recurrence_number>1. Quando a Hotmart nao envia recurrence_number, o sistema infere renovacao pelo historico anterior do mesmo email."
          />
          <AdminKPICard
            title="Pagamentos"
            value={kpis.settled}
            icon={<DollarSign className="h-5 w-5" />}
            description="Historico de eventos"
            color="success"
            tooltip="Total historico de eventos de pagamento em billing_event_logs. Conta SETTLED, PURCHASE_APPROVED e PURCHASE_COMPLETE. Nao representa compradores unicos."
          />
        </div>
      </section>

      <section>
        <AdminSectionHeader
          emoji="📦"
          title="Produtos"
          description="Distribuição por tipo de produto (usuários únicos)"
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <AdminKPICard
            title="Base"
            value={kpis.baseUsers}
            icon={<Package className="h-5 w-5" />}
            color="success"
            tooltip="COUNT(DISTINCT user_id) em user_product_access onde product_type='base'"
          />
          <AdminKPICard
            title="Freelancer"
            value={kpis.freelancerUsers}
            icon={<Briefcase className="h-5 w-5" />}
            color="info"
            tooltip="COUNT(DISTINCT user_id) em user_product_access onde product_type='freelancer'"
          />
          <AdminKPICard
            title="AI Hub"
            value={kpis.aiHubUsers}
            icon={<Bot className="h-5 w-5" />}
            color="purple"
            tooltip="COUNT(DISTINCT user_id) em user_product_access onde product_type='ai_hub'"
          />
        </div>
      </section>

      <section>
        <AdminSectionHeader
          emoji="⚠️"
          title="Problemas"
          description="Métricas de atenção"
          action={
            <Select value={errorRangeDays} onValueChange={setErrorRangeDays}>
              <SelectTrigger className="h-8 w-[130px] border-border/50 bg-card text-foreground shadow-sm hover:bg-card/80">
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
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          <AdminKPICard
            title="Reembolsos"
            value={kpis.refunds}
            icon={<RefreshCw className="h-5 w-5" />}
            color={kpis.refunds > 0 ? "warning" : "default"}
            description={`Periodo: ${errorRangeLabel}`}
            tooltip="Total de eventos em billing_event_logs com event_type contendo 'refund' no periodo selecionado"
          />
          <AdminKPICard
            title="Chargebacks"
            value={kpis.chargebacks}
            icon={<AlertTriangle className="h-5 w-5" />}
            color={kpis.chargebacks > 0 ? "danger" : "default"}
            description="Total historico"
            tooltip="Total historico de eventos em billing_event_logs com event_type contendo 'chargeback'"
          />
        </div>
      </section>
    </div>
  );
};
