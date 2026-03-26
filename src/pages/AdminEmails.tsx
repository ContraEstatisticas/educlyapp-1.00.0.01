import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, RefreshCw, Mail, MailOpen, AlertTriangle, Clock, Send, Loader2, Search, ShieldCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailLog {
  id: string;
  recipient_email: string;
  email_type: string;
  subject: string;
  status: string;
  sent_at: string | null;
  opened_at: string | null;
  error_message: string | null;
  created_at: string;
}

interface EmailStats {
  total: number;
  sent: number;
  opened: number;
  failed: number;
  pending: number;
}

interface ResendEmail {
  id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
}

interface ResendSearchResponse {
  recipient: string;
  emails: ResendEmail[];
  limit: number;
  pages_scanned: number;
  truncated_reason: "limit" | "scan_limit" | null;
}

type ActiveTab = "resend" | "logs";

const AdminEmails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<ActiveTab>("resend");

  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [stats, setStats] = useState<EmailStats>({ total: 0, sent: 0, opened: 0, failed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [batchResult, setBatchResult] = useState<any>(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emailSearch, setEmailSearch] = useState("");

  const [resendRecipient, setResendRecipient] = useState("");
  const [resendRecipientCommitted, setResendRecipientCommitted] = useState("");
  const [resendData, setResendData] = useState<ResendSearchResponse | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from("email_logs")
        .select("id, recipient_email, email_type, subject, status, sent_at, opened_at, error_message, created_at")
        .order("created_at", { ascending: false })
        .limit(500);

      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (startDate) query = query.gte("created_at", startDate);
      if (endDate) query = query.lte("created_at", `${endDate}T23:59:59`);
      if (emailSearch.trim()) query = query.ilike("recipient_email", `%${emailSearch.trim()}%`);

      const { data, error } = await query;
      if (error) throw error;

      setLogs(data || []);

      const startFilter = startDate || undefined;
      const endFilter = endDate ? `${endDate}T23:59:59` : undefined;

      let totalQuery = supabase.from("email_logs").select("id", { count: "exact", head: true });
      if (startFilter) totalQuery = totalQuery.gte("created_at", startFilter);
      if (endFilter) totalQuery = totalQuery.lte("created_at", endFilter);
      const { count: totalCount = 0 } = await totalQuery;

      let sentQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).eq("status", "sent");
      if (startFilter) sentQuery = sentQuery.gte("created_at", startFilter);
      if (endFilter) sentQuery = sentQuery.lte("created_at", endFilter);
      const { count: sentCount = 0 } = await sentQuery;

      let openedQuery = supabase
        .from("email_logs")
        .select("id", { count: "exact", head: true })
        .or("status.eq.opened,opened_at.not.is.null");
      if (startFilter) openedQuery = openedQuery.gte("created_at", startFilter);
      if (endFilter) openedQuery = openedQuery.lte("created_at", endFilter);
      const { count: openedCount = 0 } = await openedQuery;

      let failedQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).or("status.eq.failed,status.eq.error");
      if (startFilter) failedQuery = failedQuery.gte("created_at", startFilter);
      if (endFilter) failedQuery = failedQuery.lte("created_at", endFilter);
      const { count: failedCount = 0 } = await failedQuery;

      let pendingLogsQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).eq("status", "pending");
      if (startFilter) pendingLogsQuery = pendingLogsQuery.gte("created_at", startFilter);
      if (endFilter) pendingLogsQuery = pendingLogsQuery.lte("created_at", endFilter);
      const { count: pendingLogsCount = 0 } = await pendingLogsQuery;

      const { count: pendingQueueCount = 0 } = await supabase
        .from("pending_thank_you_emails")
        .select("id", { count: "exact", head: true })
        .eq("sent", false);

      setStats({
        total: totalCount,
        sent: sentCount,
        opened: openedCount,
        failed: failedCount,
        pending: (pendingLogsCount || 0) + (pendingQueueCount || 0),
      });
    } catch (error) {
      console.error("Error fetching email logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResendData = async (recipientArg?: string) => {
    const normalizedRecipient = (recipientArg ?? resendRecipient).trim().toLowerCase();

    if (!normalizedRecipient) {
      setResendError("Informe o e-mail exato do destinatário para pesquisar na Resend.");
      setResendData(null);
      setResendRecipientCommitted("");
      return;
    }

    if (!normalizedRecipient.includes("@")) {
      setResendError("Informe um e-mail válido para pesquisar na Resend.");
      setResendData(null);
      setResendRecipientCommitted("");
      return;
    }

    setResendLoading(true);
    setResendError(null);
    setResendData(null);
    setResendRecipientCommitted(normalizedRecipient);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resend-dashboard?recipient=${encodeURIComponent(normalizedRecipient)}&limit=25`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let message = `HTTP ${response.status}`;
        try {
          const body = await response.json();
          message = body.error || message;
        } catch {
          // ignore invalid json
        }

        if (response.status === 404) {
          message = "Edge function 'resend-dashboard' não encontrada. Faça o deploy: supabase functions deploy resend-dashboard";
        }

        throw new Error(message);
      }

      const data: ResendSearchResponse = await response.json();
      setResendData(data);
    } catch (error: any) {
      console.error("Error fetching Resend data:", error);
      setResendError(error.message || "Erro desconhecido ao buscar dados da Resend.");
    } finally {
      setResendLoading(false);
    }
  };

  const clearResendSearch = () => {
    setResendRecipient("");
    setResendRecipientCommitted("");
    setResendData(null);
    setResendError(null);
  };

  const sendBatch = async () => {
    setSending(true);
    setBatchResult(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        toast({ title: "Sessão expirada", description: "Faça login novamente", variant: "destructive" });
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-pending-welcome-batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setBatchResult(result);
      toast({
        title: result.error ? "Erro no envio" : "Lote enviado!",
        description: result.error || `${result.sent} enviados, ${result.remaining} restantes`,
        variant: result.error ? "destructive" : "default",
      });
      fetchData();
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao enviar lote", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleRefresh = () => {
    if (activeTab === "logs") {
      fetchData();
      return;
    }

    if (resendRecipientCommitted) {
      fetchResendData(resendRecipientCommitted);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      sent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      opened: "bg-green-500/20 text-green-400 border-green-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
      error: "bg-red-500/20 text-red-400 border-red-500/30",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || "bg-muted text-muted-foreground border-border"}`}>
        {status}
      </span>
    );
  };

  const getResendEventBadge = (event: string) => {
    const styles: Record<string, string> = {
      sent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      opened: "bg-green-500/20 text-green-400 border-green-500/30",
      clicked: "bg-violet-500/20 text-violet-400 border-violet-500/30",
      bounced: "bg-red-500/20 text-red-400 border-red-500/30",
      complained: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      delivery_delayed: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };

    const labels: Record<string, string> = {
      sent: "Enviado",
      delivered: "Entregue",
      opened: "Aberto",
      clicked: "Clicado",
      bounced: "Bounce",
      complained: "Spam",
      delivery_delayed: "Atrasado",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[event] || "bg-muted text-muted-foreground border-border"}`}>
        {labels[event] || event}
      </span>
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openRate = stats.total > 0 ? ((stats.opened / (stats.sent + stats.opened)) * 100).toFixed(1) : "0";
  const resendEmails = resendData?.emails || [];
  const resendRefreshDisabled = activeTab === "resend" ? resendLoading || !resendRecipientCommitted : loading;

  useEffect(() => {
    fetchData();
  }, [statusFilter, startDate, endDate, emailSearch]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background safe-area-inset">
        <div className="sticky top-safe z-20 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/admin/analytics")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground tracking-tight">Monitoramento de Emails</h1>
                <p className="text-xs text-muted-foreground">Busca específica na Resend e logs locais</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={handleRefresh} disabled={resendRefreshDisabled}>
              <RefreshCw className={`h-3.5 w-3.5 ${loading || resendLoading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
          <div className="flex items-center gap-1 border-b border-border">
            <button
              onClick={() => setActiveTab("resend")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "resend" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Resend
              </span>
              {activeTab === "resend" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "logs" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Logs Locais
              </span>
              {activeTab === "logs" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
            </button>
          </div>

          {activeTab === "resend" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-foreground">Pesquisar destinatário na Resend</h2>
                  <p className="text-sm text-muted-foreground">
                    Informe um e-mail específico para listar os envios mais recentes feitos para esse destinatário.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={resendRecipient}
                      onChange={(event) => setResendRecipient(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !resendLoading) {
                          fetchResendData();
                        }
                      }}
                      placeholder="usuario@exemplo.com"
                      className="pl-9 pr-9"
                    />
                    {(resendRecipient || resendRecipientCommitted) && (
                      <button
                        onClick={clearResendSearch}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Limpar busca"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <Button onClick={() => fetchResendData()} disabled={resendLoading || !resendRecipient.trim()} className="gap-2">
                    {resendLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    Buscar na Resend
                  </Button>
                </div>

                {resendError && (
                  <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Não foi possível consultar a Resend</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{resendError}</p>
                    </div>
                  </div>
                )}

                {!resendLoading && !resendData && !resendError && (
                  <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      A busca da Resend agora é focada em um destinatário específico. Digite um e-mail para começar.
                    </p>
                  </div>
                )}
              </div>

              {(resendLoading || resendData) && (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {resendRecipientCommitted ? `Últimos envios para ${resendRecipientCommitted}` : "Resultados da busca"}
                      </p>
                      {resendData && (
                        <p className="text-xs text-muted-foreground">
                          {resendEmails.length} resultado(s) encontrados · {resendData.pages_scanned} página(s) consultadas
                        </p>
                      )}
                    </div>

                    {resendData?.truncated_reason && (
                      <p className="text-xs text-muted-foreground">
                        {resendData.truncated_reason === "limit"
                          ? `Mostrando os ${resendData.limit} envios mais recentes encontrados.`
                          : "A busca atingiu o limite de páginas da Resend; podem existir envios mais antigos fora desta janela."}
                      </p>
                    )}
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead className="text-[11px] font-semibold uppercase tracking-wider">De</TableHead>
                        <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Assunto</TableHead>
                        <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
                        <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Data</TableHead>
                        <TableHead className="text-[11px] font-semibold uppercase tracking-wider">ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resendLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-12">
                            <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                            <p className="text-xs text-muted-foreground mt-2">Consultando a Resend...</p>
                          </TableCell>
                        </TableRow>
                      ) : resendEmails.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-12 text-sm text-muted-foreground">
                            Nenhum envio recente foi encontrado para esse destinatário.
                          </TableCell>
                        </TableRow>
                      ) : (
                        resendEmails.map((email) => (
                          <TableRow key={email.id}>
                            <TableCell className="py-2.5">
                              <div className="space-y-1">
                                <p className="text-xs max-w-[220px] truncate">{email.from}</p>
                                <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[240px]">{email.to.join(", ")}</p>
                              </div>
                            </TableCell>
                            <TableCell className="py-2.5 text-xs max-w-[260px] truncate">{email.subject || "-"}</TableCell>
                            <TableCell className="py-2.5">{getResendEventBadge(email.last_event)}</TableCell>
                            <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(email.created_at)}</TableCell>
                            <TableCell className="py-2.5 font-mono text-[10px] text-muted-foreground" title={email.id}>
                              {email.id.slice(0, 8)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Total", value: stats.total, icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Enviados", value: stats.sent, icon: Send, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                  { label: "Abertos", value: stats.opened, icon: MailOpen, color: "text-green-400", bg: "bg-green-500/10", sub: openRate !== "0" ? `${openRate}%` : undefined },
                  { label: "Erros", value: stats.failed, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
                  { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-lg p-3.5 flex items-start gap-3">
                    <div className={`${item.bg} rounded-md p-1.5`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider leading-none mb-1">{item.label}</p>
                      <p className="text-xl font-semibold text-foreground leading-none">{loading ? "..." : item.value}</p>
                      {item.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub} taxa</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-md p-1.5">
                    <Send className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Envio em Lote</p>
                    <p className="text-[11px] text-muted-foreground">Welcome emails pendentes (15 por vez)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {batchResult && !batchResult.error && <span className="text-xs text-green-400">{batchResult.sent} enviados</span>}
                  <Button onClick={sendBatch} disabled={sending} size="sm" className="h-8 text-xs gap-1.5">
                    {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {sending ? "Enviando..." : "Enviar Lote"}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="sent">Enviados</SelectItem>
                    <SelectItem value="opened">Abertos</SelectItem>
                    <SelectItem value="failed">Falhas</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1 min-w-[180px] max-w-xs relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    value={emailSearch}
                    onChange={(event) => setEmailSearch(event.target.value)}
                    placeholder="Buscar por e-mail"
                    className="pl-9 pr-9 h-9 text-xs"
                  />
                  {emailSearch.trim() && (
                    <button
                      onClick={() => setEmailSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Limpar busca"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-[140px] h-9 text-xs" />
                <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="w-[140px] h-9 text-xs" />
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Email</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Tipo</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Assunto</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Enviado</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Aberto</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Erro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                          <p className="text-xs text-muted-foreground mt-2">Carregando...</p>
                        </TableCell>
                      </TableRow>
                    ) : logs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                          Nenhum registro encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="py-2.5 font-mono text-xs max-w-[220px] truncate">{log.recipient_email}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{log.email_type}</TableCell>
                          <TableCell className="py-2.5 text-xs max-w-[220px] truncate">{log.subject}</TableCell>
                          <TableCell className="py-2.5">{getStatusBadge(log.status)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(log.sent_at)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(log.opened_at)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-red-400/80 max-w-[180px] truncate">{log.error_message || "-"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <p className="text-[11px] text-muted-foreground">{logs.length} registros (limite: 500)</p>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminEmails;
