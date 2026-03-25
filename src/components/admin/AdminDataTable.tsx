import { ReactNode } from "react";
import { Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AdminDataTableProps {
  title: string;
  emoji?: string;
  description?: string;
  tooltip?: string;
  children: ReactNode;
  isLoading?: boolean;
  errorMessage?: string;
  onRefresh?: () => void;
  className?: string;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export const AdminDataTable = ({
  title,
  emoji,
  description,
  tooltip,
  children,
  isLoading,
  errorMessage,
  onRefresh,
  className,
  emptyMessage = "Nenhum dado disponivel",
  isEmpty,
}: AdminDataTableProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm",
          className,
        )}
      >
        <div className="border-b border-border/30 p-5">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="p-5">
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm",
        "transition-all duration-300 hover:border-border/80 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-muted/30 to-transparent p-5">
        <div className="flex items-center gap-2">
          {emoji && <span className="text-lg">{emoji}</span>}
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground/60" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p className="text-xs">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>

        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="p-5">
        {errorMessage ? (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-foreground">Falha ao carregar os dados</p>
            <p className="mt-2 text-xs text-muted-foreground">{errorMessage}</p>
          </div>
        ) : isEmpty ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <Info className="h-8 w-8 opacity-50" />
            </div>
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
