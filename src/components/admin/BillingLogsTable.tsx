import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminDataTable } from "./AdminDataTable";
import { cn } from "@/lib/utils";
import { formatAdminDateTime } from "@/lib/adminTimeZone";
import {
  formatAdminAnalyticsError,
  useAdminAnalyticsDashboard,
} from "@/hooks/useAdminAnalyticsDashboard";

export const BillingLogsTable = () => {
  const { data, isLoading, error, refetch } = useAdminAnalyticsDashboard();
  const billingLogs = data?.tables.billingLogs || [];

  const getEventBadge = (eventType: string) => {
    const type = eventType.toUpperCase();
    const config: Record<string, { bg: string; text: string; label: string }> = {
      paid: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Pago" },
      trial: { bg: "bg-blue-100", text: "text-blue-700", label: "Trial" },
      chargeback: { bg: "bg-red-100", text: "text-red-700", label: "Chargeback" },
      refund: { bg: "bg-amber-100", text: "text-amber-700", label: "Reembolso" },
      granted: { bg: "bg-purple-100", text: "text-purple-700", label: "Upsell" },
    };

    let key = "default";
    if (type.includes("SETTLED") || type.includes("APPROVED") || type.includes("COMPLETE")) key = "paid";
    else if (type.includes("TRIAL")) key = "trial";
    else if (type.includes("CHARGEBACK") || type.includes("DISPUTE")) key = "chargeback";
    else if (type.includes("REFUND")) key = "refund";
    else if (type.includes("GRANTED")) key = "granted";

    if (key === "default") {
      return <Badge variant="outline" className="text-xs font-medium bg-white">{eventType}</Badge>;
    }

    const style = config[key];
    return (
      <Badge className={`${style.bg} ${style.text} hover:${style.bg} border-0 font-medium text-xs`}>
        {style.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string, processed: boolean | null) => {
    if (processed && status === "success") {
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-xs">✓ Processado</Badge>;
    }
    if (processed) {
      return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-0 text-xs">Processado</Badge>;
    }
    if (status === "USER_NOT_FOUND") {
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">Aguardando</Badge>;
    }
    if (status === "pending") {
      return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0 text-xs">Pendente</Badge>;
    }
    if (status === "error") {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 text-xs">Erro</Badge>;
    }
    if (status === "IGNORED") {
      return <Badge variant="outline" className="text-xs text-muted-foreground bg-white">Ignorado</Badge>;
    }
    return <Badge variant="outline" className="text-xs bg-white">{status}</Badge>;
  };

  const getSourceBadge = (payload: Record<string, unknown> | null) => {
    const source = payload?._webhook_source;
    if (source === "hotmart") {
      return <Badge variant="outline" className="text-xs border-orange-200 text-orange-600 bg-orange-50">Hotmart</Badge>;
    }
    if (source === "funnelfox") {
      return <Badge variant="outline" className="text-xs border-blue-200 text-blue-600 bg-blue-50">FF/Primer</Badge>;
    }
    return null;
  };

  const getProductInfo = (payload: Record<string, unknown> | null) => {
    const extractionInfo = payload?._extraction_info as Record<string, unknown> | undefined;
    const productId = extractionInfo?.product_id;

    if (typeof productId === "string" && productId.length > 0) {
      const type = productId === "7031196" || productId.includes("freelancer") ? "Freelancer" : "Base";
      return <span className="text-xs text-muted-foreground">{type}</span>;
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <AdminDataTable
        title="Eventos de Billing"
        emoji="📋"
        description="Últimos 30 eventos • Atualiza a cada 5 minutos"
        isLoading={isLoading}
        errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
        onRefresh={() => void refetch()}
        isEmpty={billingLogs.length === 0}
        emptyMessage="Nenhum evento de billing registrado"
      >
        <div className="overflow-x-auto -mx-5">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-5">Data</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fonte</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Evento</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produto</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pr-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className={cn(
                    "border-b border-border/30 hover:bg-muted/30",
                    !log.processed && log.status === "USER_NOT_FOUND" && "bg-amber-50/50",
                  )}
                >
                  <TableCell className="text-sm whitespace-nowrap py-3 pl-5">
                    {log.created_at
                      ? formatAdminDateTime(log.created_at, "pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-sm font-medium truncate max-w-[140px]" title={log.email}>
                    {log.email}
                  </TableCell>
                  <TableCell>{getSourceBadge(log.payload)}</TableCell>
                  <TableCell>{getEventBadge(log.event_type)}</TableCell>
                  <TableCell>{getProductInfo(log.payload)}</TableCell>
                  <TableCell className="pr-5">{getStatusBadge(log.status, log.processed)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AdminDataTable>
    </div>
  );
};
