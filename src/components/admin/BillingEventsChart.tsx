import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AdminChartCard } from "./AdminChartCard";
import {
  formatAdminAnalyticsError,
  useAdminAnalyticsDashboard,
} from "@/hooks/useAdminAnalyticsDashboard";

export const BillingEventsChart = () => {
  const { data, isLoading, error } = useAdminAnalyticsDashboard();
  const chartData = data?.charts.billingEvents || [];
  const isEmpty = chartData.length === 0;

  return (
    <AdminChartCard
      title="Eventos de Billing"
      emoji="💳"
      tooltip="Contagem de eventos em billing_event_logs agrupados por categoria: Pagamentos, Trials, Chargebacks, Reembolsos e Concessoes."
      isLoading={isLoading}
      errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
    >
      {isEmpty ? (
        <div className="h-[280px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <span className="text-2xl opacity-50">💳</span>
            </div>
            <p className="text-sm text-muted-foreground">Nenhum evento de billing registrado</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const point = payload[0].payload as (typeof chartData)[number];

                  return (
                    <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                      <p className="font-semibold text-sm text-foreground">{point.name}</p>
                      <p className="text-lg font-bold mt-1">{point.value} eventos</p>
                      <p className="text-xs text-muted-foreground mt-1.5 max-w-[200px]">
                        {point.description}
                      </p>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </AdminChartCard>
  );
};
