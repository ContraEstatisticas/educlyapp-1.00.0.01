import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminChartCard } from "./AdminChartCard";
import {
  formatAdminAnalyticsError,
  useAdminAnalyticsDashboard,
} from "@/hooks/useAdminAnalyticsDashboard";

export const EngagementChart = () => {
  const { data, isLoading, error } = useAdminAnalyticsDashboard();
  const chartData = data?.charts.engagement || [];

  return (
    <AdminChartCard
      title="Distribuição de Streaks"
      emoji="🔥"
      isLoading={isLoading}
      errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={35}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const point = payload[0].payload as (typeof chartData)[number];

                return (
                  <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                    <p className="font-semibold text-sm text-foreground">{point.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{point.value} usuários</p>
                  </div>
                );
              }

              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </AdminChartCard>
  );
};
