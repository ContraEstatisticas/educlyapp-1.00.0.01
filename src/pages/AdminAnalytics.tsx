import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, RefreshCw, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminGuard } from "@/components/AdminGuard";
import { BulkGrantAccess } from "@/components/admin/BulkGrantAccess";
import { BillingEventsChart } from "@/components/admin/BillingEventsChart";
import { BillingLogsTable } from "@/components/admin/BillingLogsTable";
import { CancellationsTable } from "@/components/admin/CancellationsTable";
import { EmailLookup } from "@/components/admin/EmailLookup";
import { EngagementChart } from "@/components/admin/EngagementChart";
import { KPICards } from "@/components/admin/KPICards";
import { LTVRetentionChart } from "@/components/admin/LTVRetentionChart";
import { ManualAccessGrant } from "@/components/admin/ManualAccessGrant";
import { ManualAccountCreator } from "@/components/admin/ManualAccountCreator";
import { ManualMetricsForm } from "@/components/admin/ManualMetricsForm";
import { PremiumUsersTable } from "@/components/admin/PremiumUsersTable";
import { ProductDistributionChart } from "@/components/admin/ProductDistributionChart";
import { ResendAccessLink } from "@/components/admin/ResendAccessLink";
import { RevokeAccess } from "@/components/admin/RevokeAccess";
import { TopStreaksTable } from "@/components/admin/TopStreaksTable";
import { UserGrowthChart } from "@/components/admin/UserGrowthChart";
import {
  formatAdminAnalyticsError,
  useAdminMigrationReport,
} from "@/hooks/useAdminAnalyticsDashboard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  formatAdminDateTime,
  getAdminDayStartIso,
} from "@/lib/adminTimeZone";

interface WelcomeBatchInfo {
  error?: string;
  sent?: number;
  failed?: number;
  remaining?: number;
}

const AdminAnalyticsContent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sendingBatch, setSendingBatch] = useState(false);
  const [batchInfo, setBatchInfo] = useState<WelcomeBatchInfo | null>(null);

  const refreshAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["admin-analytics-dashboard"] });
    queryClient.invalidateQueries({ queryKey: ["admin-migration-report"] });
    queryClient.invalidateQueries({ queryKey: ["admin-manual-metrics"] });
  }, [queryClient]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <div className="sticky top-safe z-10 border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl">
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
                <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2.5 shadow-md">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Painel Administrativo</h1>
                  <p className="text-xs text-muted-foreground">Metricas e analises em tempo real</p>
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
                <RefreshCw className="mr-2 h-4 w-4" />
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
                      toast({
                        title: "Sessao expirada",
                        description: "Faca login novamente",
                        variant: "destructive",
                      });
                      return;
                    }

                    const response = await fetch(
                      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-pending-welcome-batch`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );

                    const result: WelcomeBatchInfo = await response.json();
                    setBatchInfo(result);

                    toast({
                      title: result.error ? "Erro no envio" : "Lote enviado",
                      description:
                        result.error ||
                        `${result.sent || 0} enviados, ${result.remaining || 0} restantes`,
                      variant: result.error ? "destructive" : "default",
                    });
                  } catch {
                    toast({
                      title: "Erro",
                      description: "Falha ao chamar a funcao",
                      variant: "destructive",
                    });
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

      <div className="container mx-auto space-y-8 px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <EmailLookup />
          <ResendAccessLink />
          <ManualAccountCreator />
        </div>

        <KPICards />

        {batchInfo && !batchInfo.error && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm">
            <p className="text-green-400">
              OK: {batchInfo.sent || 0} enviados | {batchInfo.failed || 0} falhas |{" "}
              {batchInfo.remaining || 0} restantes
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UserGrowthChart />
          <ProductDistributionChart />
          <BillingEventsChart />
          <LTVRetentionChart />
          <EngagementChart />
        </div>

        <Tabs defaultValue="billing" className="w-full">
          <TabsList className="grid h-12 w-full grid-cols-8 rounded-xl bg-muted/50 p-1">
            <TabsTrigger
              value="billing"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Billing Logs
            </TabsTrigger>
            <TabsTrigger
              value="cancellations"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Cancelamentos
            </TabsTrigger>
            <TabsTrigger
              value="streaks"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Top Streaks
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Premium
            </TabsTrigger>
            <TabsTrigger
              value="grant-access"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Liberar Acesso
            </TabsTrigger>
            <TabsTrigger
              value="bulk-grant"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Bulk Import
            </TabsTrigger>
            <TabsTrigger
              value="revoke"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Revogar
            </TabsTrigger>
            <TabsTrigger
              value="migration"
              className="rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Filtro de dados
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
            <TabsContent value="revoke" className="m-0">
              <RevokeAccess />
            </TabsContent>
            <TabsContent value="migration" className="m-0">
              <MigrationReport />
            </TabsContent>
          </div>
        </Tabs>

        <ManualMetricsForm />
      </div>
    </div>
  );
};

const MigrationReport = () => {
  const defaultStart = useMemo(() => "2026-01-16T00:00:00.000Z", []);
  const [startISO, setStartISO] = useState(defaultStart);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  useEffect(() => {
    setStartISO(getAdminDayStartIso(selectedDate));
  }, [selectedDate]);

  const { data, isLoading, error } = useAdminMigrationReport(startISO);
  const registeredList = data?.recentRegistered || [];
  const notRegisteredList = data?.recentNoSignup || [];

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-bold">Filtro de dados</h3>
          <p className="text-sm text-muted-foreground">Periodo: desde a data inicial ate hoje</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <label className="mb-2 block text-xs text-muted-foreground">Data inicial</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(value) => value && setSelectedDate(value)}
            className="rounded-md"
          />
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-foreground">Falha ao carregar o relatorio</p>
          <p className="mt-2 text-xs text-muted-foreground">{formatAdminAnalyticsError(error)}</p>
        </div>
      ) : isLoading ? (
        <div className="mt-6 text-sm text-muted-foreground">Carregando relatorio...</div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Contas criadas</div>
              <div className="mt-1 text-3xl font-bold">{data?.accountsCreated ?? "--"}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Usuarios com acesso</div>
              <div className="mt-1 text-3xl font-bold">{data?.purchasesTotal ?? "--"}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Compras com cadastro</div>
              <div className="mt-1 text-3xl font-bold">{data?.purchasesWithSignup ?? "--"}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Compras sem cadastro</div>
              <div className="mt-1 text-3xl font-bold">{data?.eventsWithoutSignup ?? "--"}</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 font-semibold">Ultimos com cadastro</div>
              <div className="space-y-2">
                {registeredList.map((row, index) => (
                  <div
                    key={`${row.email}-${index}`}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="truncate">{row.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatAdminDateTime(row.created_at, "pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                {registeredList.length === 0 && (
                  <div className="text-sm text-muted-foreground">Sem registros</div>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 font-semibold">Ultimos sem cadastro</div>
              <div className="space-y-2">
                {notRegisteredList.map((row, index) => (
                  <div
                    key={`${row.email}-${index}`}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="truncate">{row.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatAdminDateTime(row.created_at, "pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                {notRegisteredList.length === 0 && (
                  <div className="text-sm text-muted-foreground">Sem registros</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
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
