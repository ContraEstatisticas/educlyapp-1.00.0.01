import {
  LineChart,
  Line,
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

export const UserGrowthChart = () => {
  const { data, isLoading, error } = useAdminAnalyticsDashboard();
  const chartData = data?.charts.userGrowth || [];

  return (
    <AdminChartCard
      title="Crescimento de Usuários (30 dias)"
      emoji="📈"
      isLoading={isLoading}
      errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorNovos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={35}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                    <p className="font-semibold text-sm text-foreground">{label}</p>
                    <p className="text-sm mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
                      Novos: <span className="font-semibold">{payload[0].value}</span>
                    </p>
                  </div>
                );
              }

              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="novos"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 6,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AdminChartCard>
  );
};
