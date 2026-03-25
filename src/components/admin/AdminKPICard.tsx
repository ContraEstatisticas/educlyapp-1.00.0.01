import { ReactNode } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AdminKPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  tooltip?: string;
  className?: string;
}

export const AdminKPICard = ({
  title,
  value,
  icon,
  description,
  color = "default",
  tooltip,
  className,
}: AdminKPICardProps) => {
  const colorConfig = {
    default: {
      bg: "bg-card",
      border: "border-border",
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground",
      valueColor: "text-foreground",
    },
    success: {
      bg: "bg-card",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      valueColor: "text-foreground",
    },
    warning: {
      bg: "bg-card",
      border: "border-amber-500/30",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      valueColor: "text-foreground",
    },
    danger: {
      bg: "bg-card",
      border: "border-red-500/30",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-600",
      valueColor: "text-foreground",
    },
    info: {
      bg: "bg-card",
      border: "border-blue-500/30",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      valueColor: "text-foreground",
    },
    purple: {
      bg: "bg-card",
      border: "border-purple-500/30",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      valueColor: "text-foreground",
    },
  };

  const config = colorConfig[color];

  return (
    <div
      className={cn(
        "group relative rounded-2xl border p-5 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01]",
        config.bg,
        config.border,
        className,
      )}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">{title}</span>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help flex-shrink-0 hover:text-muted-foreground transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs" side="top">
                    <p className="text-xs leading-relaxed">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <p
            className={cn(
              "text-3xl font-bold tracking-tight transition-transform group-hover:scale-[1.02]",
              config.valueColor,
            )}
          >
            {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
          </p>

          {description && <div className="text-xs text-muted-foreground/80 space-y-1">{description}</div>}
        </div>

        <div
          className={cn(
            "flex-shrink-0 p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110",
            config.iconBg,
            config.iconColor,
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
