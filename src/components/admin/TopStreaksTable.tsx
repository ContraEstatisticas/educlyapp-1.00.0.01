import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Flame, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminDataTable } from "./AdminDataTable";
import { formatAdminDate } from "@/lib/adminTimeZone";
import {
  formatAdminAnalyticsError,
  useAdminAnalyticsDashboard,
} from "@/hooks/useAdminAnalyticsDashboard";

export const TopStreaksTable = () => {
  const { data, isLoading, error, refetch } = useAdminAnalyticsDashboard();
  const [visibleCount, setVisibleCount] = useState(10);
  const topUsers = data?.tables.topStreaks || [];
  const visibleUsers = topUsers.slice(0, visibleCount);

  const getMedal = (index: number) => {
    if (index === 0) return <span className="text-lg">🥇</span>;
    if (index === 1) return <span className="text-lg">🥈</span>;
    if (index === 2) return <span className="text-lg">🥉</span>;
    return <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>;
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <AdminDataTable
      title="Top Streaks"
      emoji="🏆"
      isLoading={isLoading}
      errorMessage={error ? formatAdminAnalyticsError(error) : undefined}
      onRefresh={() => void refetch()}
      isEmpty={topUsers.length === 0}
      emptyMessage="Nenhum streak registrado"
    >
      <div className="overflow-x-auto -mx-5">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/50 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12 pl-5">#</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Atual</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Recorde</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pr-5">Última Atividade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user, index) => (
              <TableRow key={user.user_id} className="border-b border-border/30 hover:bg-muted/30">
                <TableCell className="py-3 pl-5">{getMedal(index)}</TableCell>
                <TableCell className="text-sm font-medium truncate max-w-[150px]">{user.full_name}</TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-500 hover:to-amber-500 border-0 font-bold shadow-sm">
                    <Flame className="h-3.5 w-3.5 mr-1" />
                    {user.current_streak}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-semibold bg-white">{user.longest_streak}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground pr-5">
                  {user.last_activity_date
                    ? formatAdminDate(user.last_activity_date, "pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {topUsers.length > visibleCount && (
        <div className="flex justify-center mt-6 pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadMore}
            className="text-xs font-semibold gap-2 px-6"
          >
            Carregar mais 10
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </AdminDataTable>
  );
};
