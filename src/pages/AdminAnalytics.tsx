import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { AdminGuard } from "@/components/AdminGuard";
import { KPICards } from "@/components/admin/KPICards";
import { UserGrowthChart } from "@/components/admin/UserGrowthChart";
import { ProductDistributionChart } from "@/components/admin/ProductDistributionChart";
import { BillingEventsChart } from "@/components/admin/BillingEventsChart";
import { LTVRetentionChart } from "@/components/admin/LTVRetentionChart";
import { EngagementChart } from "@/components/admin/EngagementChart";
import { CancellationsTable } from "@/components/admin/CancellationsTable";
import { TopStreaksTable } from "@/components/admin/TopStreaksTable";
import { BillingLogsTable } from "@/components/admin/BillingLogsTable";
import { PremiumUsersTable } from "@/components/admin/PremiumUsersTable";
import { ManualMetricsForm } from "@/components/admin/ManualMetricsForm";
import { ManualAccessGrant } from "@/components/admin/ManualAccessGrant";
import { EmailLookup } from "@/components/admin/EmailLookup";
import { BulkGrantAccess } from "@/components/admin/BulkGrantAccess";

const AdminAnalyticsContent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sendingBatch, setSendingBatch] = useState(false);
  const [batchInfo, setBatchInfo] = useState<any>(null);

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-kpis"] });
    queryClient.invalidateQueries({ queryKey: ["admin-user-growth"] });
    queryClient.invalidateQueries({ queryKey: ["admin-product-distribution"] });
    queryClient.invalidateQueries({ queryKey: ["admin-billing-events-chart"] });
    queryClient.invalidateQueries({ queryKey: ["admin-ltv-retention"] });
    queryClient.invalidateQueries({ queryKey: ["admin-engagement-chart"] });
    queryClient.invalidateQueries({ queryKey: ["admin-cancellations"] });
    queryClient.invalidateQueries({ queryKey: ["admin-top-streaks"] });
    queryClient.invalidateQueries({ queryKey: ["admin-billing-logs"] });
    queryClient.invalidateQueries({ queryKey: ["admin-premium-users"] });
    queryClient.invalidateQueries({ queryKey: ["admin-manual-metrics"] });
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="rounded-xl hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-md">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    Painel Administrativo
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Métricas e análises em tempo real
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshAll}
                className="rounded-xl border-border/50 hover:bg-muted"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button
                size="sm"
                className="rounded-xl bg-primary hover:bg-primary/90"
                disabled={sendingBatch}
                onClick={async () => {
                  setSendingBatch(true);
                  setBatchInfo(null);
                  try {
                    const { data: sessionData } = await supabase.auth.getSession();
                    const token = sessionData?.session?.access_token;
                    if (!token) {
                      toast({ title: "Sessão expirada", description: "Faça login novamente", variant: "destructive" });
                      return;
                    }
                    const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-pending-welcome-batch`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    });
                    const result = await resp.json();
                    setBatchInfo(result);
                    toast({
                      title: result.error ? "Erro no envio" : "Lote enviado",
                      description: result.error || `${result.sent || 0} enviados, ${result.remaining || 0} restantes`,
                      variant: result.error ? "destructive" : "default",
                    });
                  } catch {
                    toast({ title: "Erro", description: "Falha ao chamar a função", variant: "destructive" });
                  } finally {
                    setSendingBatch(false);
                  }
                }}
              >
                {sendingBatch ? "Enviando..." : "Enviar Boas-vindas (Lote)"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Email Lookup + Resend Access */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmailLookup />
          <ResendAccessLink />
        </div>

        {/* KPI Cards */}
        <KPICards />
        {batchInfo && !batchInfo.error && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm">
            <p className="text-green-400">
              ✓ {batchInfo.sent || 0} enviados | {batchInfo.failed || 0} falhas | {batchInfo.remaining || 0} restantes
            </p>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserGrowthChart />
          <ProductDistributionChart />
          <BillingEventsChart />
          <LTVRetentionChart />
          <EngagementChart />
        </div>

        {/* Tables with Tabs */}
        <Tabs defaultValue="billing" className="w-full">
          <TabsList className="grid w-full grid-cols-7 h-12 p-1 bg-muted/50 rounded-xl">
            <TabsTrigger 
              value="billing" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              📋 Billing Logs
            </TabsTrigger>
            <TabsTrigger 
              value="cancellations" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              ⚠️ Cancelamentos
            </TabsTrigger>
            <TabsTrigger 
              value="streaks" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              🏆 Top Streaks
            </TabsTrigger>
            <TabsTrigger 
              value="premium" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              👑 Premium
            </TabsTrigger>
            <TabsTrigger 
              value="grant-access" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              🔓 Liberar Acesso
            </TabsTrigger>
            <TabsTrigger 
              value="bulk-grant" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              📦 Bulk Import
            </TabsTrigger>
            <TabsTrigger 
              value="migration" 
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              🧭 Filtro de dados
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="billing" className="m-0">
              <BillingLogsTable />
            </TabsContent>
            <TabsContent value="cancellations" className="m-0">
              <CancellationsTable />
            </TabsContent>
            <TabsContent value="streaks" className="m-0">
              <TopStreaksTable />
            </TabsContent>
            <TabsContent value="premium" className="m-0">
              <PremiumUsersTable />
            </TabsContent>
            <TabsContent value="grant-access" className="m-0">
              <ManualAccessGrant />
            </TabsContent>
            <TabsContent value="bulk-grant" className="m-0">
              <BulkGrantAccess />
            </TabsContent>
            <TabsContent value="migration" className="m-0">
              <MigrationReport />
            </TabsContent>
          </div>
        </Tabs>

        {/* Manual Metrics */}
        <ManualMetricsForm />
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  return (
    <AdminGuard>
      <AdminAnalyticsContent />
    </AdminGuard>
  );
};

export default AdminAnalytics;

const MigrationReport = () => {
  const defaultStart = useMemo(() => {
    return '2026-01-16T00:00:00.000Z';
  }, []);
  const [startISO, setStartISO] = useState(defaultStart);
  const actions = useMemo(() => ([
    'SETTLED','STARTING_TRIAL','SUBSCRIPTION_SETTLED','SUBSCRIPTION_TRIAL_STARTED','GRANTED',
    'CONVERTION','RENEWING','RESUMING','RECOVERING','RECOVERING_AUTORENEW',
    'PURCHASE_COMPLETE','PURCHASE_APPROVED','PURCHASE_PROTEST','PURCHASE_DELAYED'
  ]), []);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  useEffect(() => {
    const d = selectedDate;
    const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)).toISOString();
    setStartISO(iso);
  }, [selectedDate]);

  const { data: usersCount } = useQuery({
    queryKey: ['migration-users-premium', startISO],
    queryFn: async () => {
      const { count } = await supabase
        .from('billing_event_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startISO)
        .in('event_type', ['PURCHASE_COMPLETE', 'SETTLED', 'settled']);
      return count || 0;
    },
    refetchOnWindowFocus: false,
  });
  const { data: accountsCreated } = useQuery({
    queryKey: ['migration-accounts-created', startISO],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startISO);
      return count || 0;
    },
    refetchOnWindowFocus: false,
  });

  const { data: purchasesTotal } = useQuery({
    queryKey: ['migration-purchases-granted', startISO],
    queryFn: async () => {
      const { count } = await supabase
        .from('billing_event_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startISO)
        .in('event_type', ['PURCHASE_COMPLETE', 'SETTLED', 'settled']);
      return count || 0;
    },
    refetchOnWindowFocus: false,
  });

  const { data: eventsWithoutSignup } = useQuery({
    queryKey: ['migration-events-no-signup', startISO],
    queryFn: async () => {
      const { count } = await supabase
        .from('billing_event_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startISO)
        .in('event_type', ['PURCHASE_COMPLETE', 'SETTLED', 'settled'])
        .eq('status', 'USER_NOT_FOUND');
      return count || 0;
    },
    refetchOnWindowFocus: false,
  });

  const { data: recentRegistered } = useQuery({
    queryKey: ['migration-emails-registered', startISO],
    queryFn: async () => {
      const { data } = await supabase
        .from('billing_event_logs')
        .select('email,user_id,created_at,status')
        .gte('created_at', startISO)
        .in('event_type', ['PURCHASE_COMPLETE', 'SETTLED', 'settled'])
        .not('user_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);
      return data || [];
    },
    refetchOnWindowFocus: false,
  });

  const { data: recentNoSignup } = useQuery({
    queryKey: ['migration-emails-no-signup', startISO],
    queryFn: async () => {
      const { data } = await supabase
        .from('billing_event_logs')
        .select('email,user_id,created_at,status')
        .gte('created_at', startISO)
        .in('event_type', ['PURCHASE_COMPLETE', 'SETTLED', 'settled'])
        .eq('status', 'USER_NOT_FOUND')
        .order('created_at', { ascending: false })
        .limit(50);
      return data || [];
    },
    refetchOnWindowFocus: false,
  });

  const registeredList = useMemo(() => {
    return (recentRegistered || []);
  }, [recentRegistered]);

  const notRegisteredList = useMemo(() => {
    return (recentNoSignup || []);
  }, [recentNoSignup]);

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Filtro de dados</h3>
          <p className="text-sm text-muted-foreground">Período: desde a data inicial até hoje</p>
        </div>
        <div className="rounded-xl border border-border p-3 bg-card">
          <label className="text-xs text-muted-foreground block mb-2">Data inicial</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && setSelectedDate(d)}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">Contas criadas</div>
          <div className="text-3xl font-bold mt-1">{accountsCreated ?? '—'}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">Usuários com acesso</div>
          <div className="text-3xl font-bold mt-1">{purchasesTotal ?? '—'}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">Compras com cadastro</div>
          <div className="text-3xl font-bold mt-1">{usersCount ?? '—'}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">Compras sem cadastro</div>
          <div className="text-3xl font-bold mt-1">{eventsWithoutSignup ?? '—'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="font-semibold mb-2">Últimos com cadastro</div>
          <div className="space-y-2">
            {(registeredList || []).map((r: any, idx: number) => (
              <div key={idx} className="text-sm flex items-center justify-between">
                <span className="truncate">{r.email}</span>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
              </div>
            ))}
            {registeredList && registeredList.length === 0 && (
              <div className="text-sm text-muted-foreground">Sem registros</div>
            )}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="font-semibold mb-2">Últimos sem cadastro</div>
          <div className="space-y-2">
            {(notRegisteredList || []).map((r: any, idx: number) => (
              <div key={idx} className="text-sm flex items-center justify-between">
                <span className="truncate">{r.email}</span>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
              </div>
            ))}
            {notRegisteredList && notRegisteredList.length === 0 && (
              <div className="text-sm text-muted-foreground">Sem registros</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
