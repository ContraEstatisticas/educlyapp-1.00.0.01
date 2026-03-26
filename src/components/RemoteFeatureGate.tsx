import type { ReactNode } from "react";
import { Globe, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRemoteFeatureAccess } from "@/hooks/useRemoteFeatureAccess";

interface RemoteFeatureGateProps {
  children: ReactNode;
}

export const RemoteFeatureGate = ({ children }: RemoteFeatureGateProps) => {
  const navigate = useNavigate();
  const { isRestricted, notice, restriction } = useRemoteFeatureAccess();

  if (!isRestricted || !notice) {
    return <>{children}</>;
  }

  const Icon = restriction === "offline" ? WifiOff : Globe;

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:bg-primary/10">
            {notice.badge}
          </Badge>

          <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-black leading-tight text-foreground">
            {notice.title}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {notice.description}
          </p>

          <Button
            className="mt-6 h-12 w-full rounded-2xl"
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            {notice.backLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
