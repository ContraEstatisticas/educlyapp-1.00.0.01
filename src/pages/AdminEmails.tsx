import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, RefreshCw, Mail, MailOpen, AlertTriangle, Clock, Send, Loader2, Globe, CheckCircle2, XCircle, ShieldCheck, Search, ChevronDown, ChevronRight, X } from "lucide-react";
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

interface ResendDomain {
  id: string;
  name: string;
  status: string;
  created_at: string;
  region: string;
  records?: Array<{
    record: string;
    name: string;
    type: string;
    ttl: string;
    status: string;
    value: string;
    priority?: number;
  }>;
}

interface ResendStats {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  complained: number;
  delivery_delayed: number;
}

interface ResendData {
  emails: ResendEmail[];
  has_more: boolean;
  pages_scanned: number;
  stats: ResendStats | null;
  domains: ResendDomain[];
  emails_error: string | null;
  domains_error: string | null;
}

type ActiveTab = "resend" | "logs";

const AdminEmails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [stats, setStats] = useState<EmailStats>({ total: 0, sent: 0, opened: 0, failed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [batchResult, setBatchResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("resend");
  const [showDomains, setShowDomains] = useState(false);

  // Resend real data
  const [resendData, setResendData] = useState<ResendData | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSearch, setResendSearch] = useState("");
  const [resendSearchCommitted, setResendSearchCommitted] = useState("");
  const [resendPage, setResendPage] = useState(0);
  const [resendCursors, setResendCursors] = useState<string[]>([""]);
  const [resendDays, setResendDays] = useState(7);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [emailDetails, setEmailDetails] = useState<Record<string, { html?: string; text?: string; loading?: boolean; error?: string }>>({});

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emailSearch, setEmailSearch] = useState("");

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

      if (emailSearch.trim()) {
        query = query.ilike("recipient_email", `%${emailSearch.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      setLogs(data || []);

      // Real stats: aggregated counts with applied date filters
      const startFilter = startDate ? startDate : undefined;
      const endFilter = endDate ? `${endDate}T23:59:59` : undefined;

      // Total
      let totalQuery = supabase.from("email_logs").select("id", { count: "exact", head: true });
      if (startFilter) totalQuery = totalQuery.gte("created_at", startFilter);
      if (endFilter) totalQuery = totalQuery.lte("created_at", endFilter);
      const { count: totalCount = 0 } = await totalQuery;

      // Sent
      let sentQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).eq("status", "sent");
      if (startFilter) sentQuery = sentQuery.gte("created_at", startFilter);
      if (endFilter) sentQuery = sentQuery.lte("created_at", endFilter);
      const { count: sentCount = 0 } = await sentQuery;

      // Opened (status opened OR opened_at not null)
      let openedQuery = supabase
        .from("email_logs")
        .select("id", { count: "exact", head: true })
        .or("status.eq.opened,opened_at.not.is.null");
      if (startFilter) openedQuery = openedQuery.gte("created_at", startFilter);
      if (endFilter) openedQuery = openedQuery.lte("created_at", endFilter);
      const { count: openedCount = 0 } = await openedQuery;

      // Failed (failed OR error)
      let failedQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).or("status.eq.failed,status.eq.error");
      if (startFilter) failedQuery = failedQuery.gte("created_at", startFilter);
      if (endFilter) failedQuery = failedQuery.lte("created_at", endFilter);
      const { count: failedCount = 0 } = await failedQuery;

      // Pending (email_logs pending) + queue pending_thank_you_emails
      let pendingLogsQuery = supabase.from("email_logs").select("id", { count: "exact", head: true }).eq("status", "pending");
      if (startFilter) pendingLogsQuery = pendingLogsQuery.gte("created_at", startFilter);
      if (endFilter) pendingLogsQuery = pendingLogsQuery.lte("created_at", endFilter);
      const { count: pendingLogsCount = 0 } = await pendingLogsQuery;

      // pending_thank_you_emails queue (not filtered by date to reflect backlog)
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
    } catch (err) {
      console.error("Error fetching email logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResendData = async (cursor: string = "", searchQuery: string = "", days: number = resendDays) => {
    setResendLoading(true);
    setResendError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        setResendError("Sessão expirada. Faça login novamente.");
        return;
      }

      let url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resend-dashboard?limit=100&days=${days}`;
      if (cursor && !searchQuery) url += `&after=${cursor}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errMsg = `HTTP ${response.status}`;
        try {
          const err = await response.json();
          errMsg = err.error || errMsg;
        } catch {}
        if (response.status === 404) {
          errMsg = "Edge function 'resend-dashboard' não encontrada. Faça o deploy: supabase functions deploy resend-dashboard";
        }
        throw new Error(errMsg);
      }

      const data: ResendData = await response.json();
      setResendData(data);
    } catch (err: any) {
      console.error("Error fetching Resend data:", err);
      setResendError(err.message || "Erro desconhecido ao buscar dados do Resend");
    } finally {
      setResendLoading(false);
    }
  };

  const goResendNext = () => {
    if (resendSearchCommitted || !resendData?.has_more || resendData.emails.length === 0) return;
    const lastId = resendData.emails[resendData.emails.length - 1].id;
    const newPage = resendPage + 1;
    const newCursors = [...resendCursors];
    if (newCursors.length <= newPage) newCursors.push(lastId);
    setResendCursors(newCursors);
    setResendPage(newPage);
    fetchResendData(lastId);
  };

  const goResendPrev = () => {
    if (resendSearchCommitted || resendPage <= 0) return;
    const prevPage = resendPage - 1;
    setResendPage(prevPage);
    fetchResendData(resendCursors[prevPage] || "");
  };

  const goResendFirst = () => {
    setResendPage(0);
    setResendCursors([""]);
    fetchResendData("");
  };

  const handleResendSearch = () => {
    const q = resendSearch.trim();
    setResendSearchCommitted(q);
    setResendPage(0);
    setResendCursors([""]);
    fetchResendData("", q);
  };

  const clearResendSearch = () => {
    setResendSearch("");
    setResendSearchCommitted("");
    setResendPage(0);
    setResendCursors([""]);
    fetchResendData("");
  };

  const handleDaysChange = (newDays: number) => {
    setResendDays(newDays);
    setResendPage(0);
    setResendCursors([""]);
    setResendSearch("");
    setResendSearchCommitted("");
    fetchResendData("", "", newDays);
  };

  const toggleEmailDetail = async (id: string) => {
    if (expandedEmailId === id) {
      setExpandedEmailId(null);
      return;
    }
    setExpandedEmailId(id);
    if (emailDetails[id]?.html || emailDetails[id]?.text) return;
    setEmailDetails((prev) => ({ ...prev, [id]: { loading: true } }));
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) throw new Error("Sessão expirada");
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resend-dashboard?email_id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEmailDetails((prev) => ({
        ...prev,
        [id]: { html: data.html_body || data.html || "", text: data.text || "" },
      }));
    } catch (e: any) {
      setEmailDetails((prev) => ({ ...prev, [id]: { error: e.message } }));
    }
  };

  useEffect(() => {
    fetchResendData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [statusFilter, startDate, endDate, emailSearch]);

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
    } catch (err) {
      toast({ title: "Erro", description: "Falha ao enviar lote", variant: "destructive" });
    } finally {
      setSending(false);
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
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || "bg-muted text-muted-foreground border-border"}`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openRate = stats.total > 0 ? ((stats.opened / (stats.sent + stats.opened)) * 100).toFixed(1) : "0";

  // Resend data
  const resendEmails = resendData?.emails || [];
  const rs = resendData?.stats;
  const resendStats = {
    total: rs?.total || 0,
    delivered: rs?.delivered || 0,
    opened: (rs?.opened || 0) + (rs?.clicked || 0),
    bounced: rs?.bounced || 0,
    complained: rs?.complained || 0,
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
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[event] || "bg-muted text-muted-foreground border-border"}`}
      >
        {labels[event] || event}
      </span>
    );
  };

  const getDomainStatusBadge = (status: string) => {
    const isVerified = status === "verified";
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          isVerified
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        }`}
      >
        {isVerified ? "Verificado" : status}
      </span>
    );
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background safe-area-inset">
        {/* ── Header ── */}
        <div className="sticky top-safe z-20 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/admin/analytics")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground tracking-tight">Monitoramento de Emails</h1>
                <p className="text-xs text-muted-foreground">Resend API &middot; Logs locais</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => { fetchData(); fetchResendData(); }} disabled={loading || resendLoading}>
              <RefreshCw className={`h-3.5 w-3.5 ${(loading || resendLoading) ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">

          {/* ── Error Banner ── */}
          {resendError && (
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-400">Erro na API Resend</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{resendError}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => setResendError(null)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {/* ── Loading ── */}
          {resendLoading && !resendData && (
            <div className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Carregando dados do Resend...</p>
            </div>
          )}

          {/* ── Tabs ── */}
          <div className="flex items-center gap-1 border-b border-border">
            <button
              onClick={() => setActiveTab("resend")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "resend"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Resend API
              </span>
              {activeTab === "resend" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "logs"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Logs Locais
              </span>
              {activeTab === "logs" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>

          {/* ════════════════════ RESEND TAB ════════════════════ */}
          {activeTab === "resend" && (
            <div className="space-y-6">

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Total", value: resendStats.total, icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Entregues", value: resendStats.delivered, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Abertos", value: resendStats.opened, icon: MailOpen, color: "text-green-400", bg: "bg-green-500/10",
                    sub: resendStats.total > 0 ? `${((resendStats.opened / resendStats.total) * 100).toFixed(1)}%` : undefined },
                  { label: "Bounces", value: resendStats.bounced, icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
                  { label: "Spam", value: resendStats.complained, icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10" },
                ].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-lg p-3.5 flex items-start gap-3">
                    <div className={`${s.bg} rounded-md p-1.5`}>
                      <s.icon className={`h-4 w-4 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider leading-none mb-1">{s.label}</p>
                      <p className="text-xl font-semibold text-foreground leading-none">{resendLoading && !resendData ? "..." : s.value}</p>
                      {s.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub} taxa</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Period label */}
              <p className="text-xs text-muted-foreground -mt-3">
                Dados dos últimos <strong>{resendDays} dias</strong>
                {resendData?.pages_scanned ? ` (${resendData.pages_scanned} páginas varridas)` : ""}
              </p>

              {/* Domains (collapsible) */}
              {resendData?.domains && resendData.domains.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowDomains(!showDomains)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/50 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Globe className="h-4 w-4 text-violet-400" />
                      Domínios ({resendData.domains.length})
                      {resendData.domains.every(d => d.status === "verified") && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">Todos verificados</span>
                      )}
                    </span>
                    {showDomains ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {showDomains && (
                    <div className="border-t border-border p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {resendData.domains.map((domain) => (
                        <div key={domain.id} className="bg-muted/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-foreground">{domain.name}</span>
                            {getDomainStatusBadge(domain.status)}
                          </div>
                          <div className="flex gap-4 text-[11px] text-muted-foreground">
                            <span>Região: <span className="text-foreground">{domain.region || "—"}</span></span>
                            <span>Criado: <span className="text-foreground">{formatDate(domain.created_at)}</span></span>
                          </div>
                          {domain.records && domain.records.length > 0 && (
                            <div className="pt-2 space-y-1">
                              {domain.records.map((rec, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                                  {rec.status === "verified"
                                    ? <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                                    : <XCircle className="h-3 w-3 text-yellow-400 flex-shrink-0" />}
                                  <span className="text-muted-foreground font-mono">{rec.type}</span>
                                  <span className="text-foreground truncate max-w-[100px]" title={rec.name}>{rec.name}</span>
                                  <span className="text-muted-foreground/50">&rarr;</span>
                                  <span className="text-foreground/70 truncate max-w-[180px] font-mono" title={rec.value}>{rec.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Toolbar: period + search */}
              <div className="flex flex-wrap items-center gap-3">
                <Select value={String(resendDays)} onValueChange={(v) => handleDaysChange(Number(v))}>
                  <SelectTrigger className="w-[150px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1 min-w-[200px] max-w-md relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    value={resendSearch}
                    onChange={(e) => setResendSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleResendSearch()}
                    placeholder="Buscar email, assunto, ID... (Enter)"
                    className="pl-9 pr-9 h-9 text-xs"
                  />
                  {(resendSearch.trim() || resendSearchCommitted) && (
                    <button
                      onClick={resendSearchCommitted ? clearResendSearch : () => setResendSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {!resendSearchCommitted && (
                  <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5" onClick={handleResendSearch} disabled={resendLoading || !resendSearch.trim()}>
                    {resendLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
                    Buscar
                  </Button>
                )}

                {resendSearchCommitted && (
                  <span className="text-xs text-muted-foreground">
                    &ldquo;{resendSearchCommitted}&rdquo; &mdash; {resendEmails.length} resultado(s)
                  </span>
                )}
              </div>

              {/* Emails Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Para</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Assunto</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Data</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider w-[90px]">ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resendLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12">
                          <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                          <p className="text-xs text-muted-foreground mt-2">Carregando...</p>
                        </TableCell>
                      </TableRow>
                    ) : resendEmails.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                          {resendData?.emails_error
                            ? resendData.emails_error
                            : resendSearchCommitted
                              ? `Nenhum resultado para "${resendSearchCommitted}"`
                              : "Nenhum email encontrado"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      resendEmails.map((email) => {
                        const isExpanded = expandedEmailId === email.id;
                        const detail = emailDetails[email.id];
                        return (
                          <Fragment key={email.id}>
                            <TableRow
                              className="group cursor-pointer hover:bg-muted/40 transition-colors"
                              onClick={() => toggleEmailDetail(email.id)}
                            >
                              <TableCell className="py-2.5">
                                <div className="flex items-center gap-2">
                                  {isExpanded
                                    ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                    : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
                                  <div>
                                    <p className="font-mono text-xs truncate max-w-[240px]">{email.to?.join(", ")}</p>
                                    <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">de: {email.from}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="py-2.5 text-xs max-w-[220px] truncate">{email.subject}</TableCell>
                              <TableCell className="py-2.5">{getResendEventBadge(email.last_event)}</TableCell>
                              <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(email.created_at)}</TableCell>
                              <TableCell className="py-2.5 font-mono text-[10px] text-muted-foreground/60" title={email.id}>
                                {email.id.slice(0, 8)}
                              </TableCell>
                            </TableRow>
                            {isExpanded && (
                              <TableRow>
                                <TableCell colSpan={5} className="p-0 border-t-0">
                                  <div className="bg-muted/20 border-t border-b border-border px-6 py-4">
                                    {detail?.loading ? (
                                      <div className="flex items-center gap-2 py-4">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Carregando corpo do email...</span>
                                      </div>
                                    ) : detail?.error ? (
                                      <div className="flex items-center gap-2 py-2">
                                        <AlertTriangle className="h-4 w-4 text-red-400" />
                                        <span className="text-xs text-red-400">{detail.error}</span>
                                      </div>
                                    ) : detail?.html ? (
                                      <div className="space-y-2">
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Corpo do Email</p>
                                        <div className="bg-white rounded-lg border border-border overflow-hidden">
                                          <iframe
                                            srcDoc={detail.html}
                                            className="w-full border-0"
                                            style={{ minHeight: "300px", maxHeight: "600px" }}
                                            sandbox="allow-same-origin"
                                            title="Email body"
                                            onLoad={(e) => {
                                              const frame = e.target as HTMLIFrameElement;
                                              if (frame.contentDocument) {
                                                frame.style.height = Math.min(600, Math.max(300, frame.contentDocument.body.scrollHeight + 20)) + "px";
                                              }
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ) : detail?.text ? (
                                      <div className="space-y-2">
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Corpo do Email (texto)</p>
                                        <pre className="bg-card rounded-lg border border-border p-4 text-xs text-foreground whitespace-pre-wrap max-h-[400px] overflow-auto">
                                          {detail.text}
                                        </pre>
                                      </div>
                                    ) : (
                                      <p className="text-xs text-muted-foreground py-2">Nenhum conteúdo disponível para este email.</p>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {!resendSearchCommitted && (
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-muted-foreground">
                    {resendEmails.length} emails &middot; página {resendPage + 1}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {resendPage > 0 && (
                      <>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={goResendFirst} disabled={resendLoading}>
                          Primeira
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={goResendPrev} disabled={resendLoading}>
                          ← Anterior
                        </Button>
                      </>
                    )}
                    {resendData?.has_more && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={goResendNext} disabled={resendLoading}>
                        Próxima →
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════ LOGS TAB ════════════════════ */}
          {activeTab === "logs" && (
            <div className="space-y-6">

              {/* Local stats */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Total", value: stats.total, icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Enviados", value: stats.sent, icon: Send, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                  { label: "Abertos", value: stats.opened, icon: MailOpen, color: "text-green-400", bg: "bg-green-500/10", sub: openRate !== "0" ? `${openRate}%` : undefined },
                  { label: "Erros", value: stats.failed, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
                  { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                ].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-lg p-3.5 flex items-start gap-3">
                    <div className={`${s.bg} rounded-md p-1.5`}>
                      <s.icon className={`h-4 w-4 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider leading-none mb-1">{s.label}</p>
                      <p className="text-xl font-semibold text-foreground leading-none">{loading ? "..." : s.value}</p>
                      {s.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub} taxa</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Batch send (compact) */}
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
                  {batchResult && !batchResult.error && (
                    <span className="text-xs text-green-400">{batchResult.sent} enviados</span>
                  )}
                  <Button onClick={sendBatch} disabled={sending} size="sm" className="h-8 text-xs gap-1.5">
                    {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {sending ? "Enviando..." : "Enviar Lote"}
                  </Button>
                </div>
              </div>

              {/* Filters */}
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
                    onChange={(e) => setEmailSearch(e.target.value)}
                    placeholder="Buscar por e-mail"
                    className="pl-9 pr-9 h-9 text-xs"
                  />
                  {emailSearch.trim() && (
                    <button onClick={() => setEmailSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-[140px] h-9 text-xs" />
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-[140px] h-9 text-xs" />
              </div>

              {/* Table */}
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
                        <TableRow key={log.id} className="group">
                          <TableCell className="py-2.5 font-mono text-xs max-w-[200px] truncate">{log.recipient_email}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{log.email_type}</TableCell>
                          <TableCell className="py-2.5 text-xs max-w-[200px] truncate">{log.subject}</TableCell>
                          <TableCell className="py-2.5">{getStatusBadge(log.status)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(log.sent_at)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-muted-foreground">{formatDate(log.opened_at)}</TableCell>
                          <TableCell className="py-2.5 text-xs text-red-400/80 max-w-[150px] truncate">
                            {log.error_message || "—"}
                          </TableCell>
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
