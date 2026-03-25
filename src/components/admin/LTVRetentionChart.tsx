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

export const LTVRetentionChart = () => {
  const { data, isLoading, error } = useAdminAnalyticsDashboard();
  const chartData = data?.charts.ltvRetention || [];
  const isEmpty = chartData.length === 0;

  return (
    <AdminChartCard
      title="LTV - Retenção por Mês"
      emoji="💎"
      tooltip="Usuários únicos que renovaram assinatura em cada mês. Quanto mais meses, maior o LTV."
      isLoading={isLoading}
      errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
    >
      {isEmpty ? (
        <div className="h-[280px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <span className="text-2xl opacity-50">💎</span>
            </div>
            <p className="text-sm text-muted-foreground">Nenhuma renovação registrada ainda</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Usuários aparecem aqui a partir da 1a renovação
            </p>
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
              dataKey="label"
              tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
              tickLine={false}
              axisLine={false}
              width={70}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const point = payload[0].payload as (typeof chartData)[number];
                  const previousPoint = chartData.find((item) => item.month === point.month - 1);
                  const retentionRate = previousPoint
                    ? Math.round((point.users / previousPoint.users) * 100)
                    : null;

                  return (
                    <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                      <p className="font-semibold text-sm text-foreground">{point.label}</p>
                      <p className="text-lg font-bold mt-1">{point.users} usuários</p>
                      {retentionRate !== null && (
                        <p className="text-xs text-muted-foreground mt-1.5">
                          {retentionRate}% de retenção vs mês anterior
                        </p>
                      )}
                      <p className="text-xs text-emerald-600 mt-1">
                        Renovaram {point.month - 1}x
                      </p>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Bar dataKey="users" radius={[0, 6, 6, 0]} barSize={24}>
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
