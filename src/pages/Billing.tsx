import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  History,
  ExternalLink,
  MessageSquare,
  BadgeCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "@/components/MobileNav";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface BillingHistory {
  id: string;
  event_type: string;
  status: string;
  created_at: string;
  email: string;
  processed_at?: string;
  error_message?: string;
}

interface ProductAccess {
  product_id: string;
  product_type: string;
  is_active: boolean;
  granted_at: string;
  expires_at: string | null;
}

const BILLING_HISTORY_PAGE_SIZE = 20;

const Billing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [historyPage, setHistoryPage] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        navigate("/auth");
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    setHistoryPage(0);
  }, [userId]);

  const { data: billingHistoryData, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["billing-history", userId, historyPage],
    queryFn: async () => {
      if (!userId) {
        return { rows: [] as BillingHistory[], hasMore: false };
      }

      const from = historyPage * BILLING_HISTORY_PAGE_SIZE;
      const to = from + BILLING_HISTORY_PAGE_SIZE;
      const { data, error } = await supabase
        .from("billing_event_logs")
        .select("id, event_type, status, created_at, email, processed_at, error_message")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      const rows = (data || []) as BillingHistory[];

      return {
        rows: rows.slice(0, BILLING_HISTORY_PAGE_SIZE),
        hasMore: rows.length > BILLING_HISTORY_PAGE_SIZE,
      };
    },
    enabled: !!userId,
  });

  const billingHistory = billingHistoryData?.rows || [];
  const hasMoreBillingHistory = billingHistoryData?.hasMore || false;

  const { data: activeProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["active-products", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("user_product_access")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true);

      if (error) throw error;
      return data as ProductAccess[];
    },
    enabled: !!userId,
  });

  const handleManagePaddle = () => {
    toast({
      title: t("profile.manageSubscription"),
      description: "Redirecionando para o portal de pagamento...",
    });
    // Paddle doesn't have a single "customer portal" URL without a specific session or customer ID.
    // Usually, we provide a mailto or a link to a portal if we have the customer ID.
    // For now, let's provide a helpful message or use a known pattern if applicable.
    window.location.href = "mailto:contact@educly.app?subject=Gerenciar Assinatura";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-20">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full hover:bg-white/20 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-blue-500" />
              {t("profile.manageSubscription")}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {t("profile.paymentStatement")}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Active Subscription Card */}
          <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-500" />
                    Plano Atual
                  </CardTitle>
                  <CardDescription>
                    Detalhes da sua assinatura ativa
                  </CardDescription>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingProducts ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : activeProducts && activeProducts.length > 0 ? (
                <div className="space-y-4">
                  {activeProducts.map((product) => (
                    <div
                      key={product.product_id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                          {product.product_type}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ID: {product.product_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          Desde: {new Date(product.granted_at).toLocaleDateString()}
                        </p>
                        {product.expires_at && (
                          <p className="text-xs text-amber-500 font-medium">
                            Expira em: {new Date(product.expires_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    {t("profile.noPaymentsDesc")}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => navigate("/plan")}
                    className="text-blue-500 mt-2"
                  >
                    {t("profile.viewPlans")}
                  </Button>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleManagePaddle}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Gerenciar na Paddle
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/contato")}
                  className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Falar com Suporte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing History Card */}
          <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-500" />
                Histórico de Cobrança
              </CardTitle>
              <CardDescription>
                Registro de todas as suas transações e alterações de plano
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : billingHistory && billingHistory.length > 0 ? (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                          <th className="py-3 font-semibold text-slate-500">Data</th>
                          <th className="py-3 font-semibold text-slate-500">Evento</th>
                          <th className="py-3 font-semibold text-slate-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {billingHistory.map((event) => (
                          <tr key={event.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-4 text-slate-600 dark:text-slate-400">
                              {new Date(event.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                              <span className="font-medium text-slate-900 dark:text-white capitalize">
                                {event.event_type.replace(/_/g, " ")}
                              </span>
                            </td>
                            <td className="py-4">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "capitalize",
                                  event.status === "processed" || event.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : event.status === "failed" || event.status === "error"
                                    ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                )}
                              >
                                {event.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {billingHistory.length} eventos nesta pagina · pagina {historyPage + 1}
                    </p>
                    <div className="flex items-center gap-2">
                      {historyPage > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setHistoryPage((page) => Math.max(0, page - 1))}
                        >
                          ← Anterior
                        </Button>
                      )}
                      {hasMoreBillingHistory && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setHistoryPage((page) => page + 1)}
                        >
                          Próxima →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    Nenhuma transação encontrada.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Info */}
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-slate-500 font-medium">
              Pagamentos processados de forma segura pela Paddle.
            </span>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Billing;
