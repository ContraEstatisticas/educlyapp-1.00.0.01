import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { AdminChartCard } from "./AdminChartCard";
import { getAdminProductCounts } from "@/lib/adminProductCounts";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

export const ProductDistributionChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["admin-product-distribution"],
    queryFn: async () => {
      const { baseUsers, freelancerUsers, aiHubUsers } = await getAdminProductCounts();

      return [
        { name: "Base", value: baseUsers, color: COLORS[0] },
        { name: "Freelancer", value: freelancerUsers, color: COLORS[1] },
        { name: "AI Hub", value: aiHubUsers, color: COLORS[2] },
      ].filter((item) => item.value > 0);
    },
    refetchInterval: 300000,
  });

  const total = chartData?.reduce((acc, item) => acc + item.value, 0) || 0;
  const isEmpty = !chartData || chartData.length === 0;

  return (
    <AdminChartCard
      title="Distribuição de Produtos"
      emoji="📊"
      tooltip="COUNT(DISTINCT user_id) por product_type em user_product_access para base, freelancer e ai_hub"
      isLoading={isLoading}
    >
      {isEmpty ? (
        <div className="h-[280px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <span className="text-2xl opacity-50">📊</span>
            </div>
            <p className="text-sm text-muted-foreground">Nenhum dado disponível</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;
                  return (
                    <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: data.color }}
                        />
                        <p className="font-semibold text-sm text-foreground">{data.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {data.value} usuários ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={40}
              formatter={(value: string) => (
                <span className="text-xs font-medium text-foreground">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </AdminChartCard>
  );
};
