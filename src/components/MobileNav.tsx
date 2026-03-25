import { Brain, Briefcase, Compass, Home, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/assistentes", label: "Hub IA", icon: Brain },
  { to: "/freelancer", label: "Freelancer", icon: Briefcase },
  { to: "/profile", label: "Perfil", icon: User },
];

interface MobileNavProps {
  onTrailsClick?: () => void;
  trailsCount?: number;
  trailsOpen?: boolean;
}

export const MobileNav = ({ onTrailsClick, trailsCount = 0, trailsOpen = false }: MobileNavProps) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 pb-safe pl-safe pr-safe shadow-[0_-12px_30px_-22px_rgba(15,23,42,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="mx-auto w-full max-w-md px-2 pb-2 pt-2">
        {onTrailsClick && (
          <button
            type="button"
            onClick={onTrailsClick}
            className={cn(
              "flex h-11 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-bold transition-all duration-200",
              trailsOpen
                ? "border-primary/45 bg-primary text-primary-foreground shadow-[0_12px_24px_-16px_rgba(249,115,22,0.85)]"
                : "border-primary/35 bg-gradient-to-r from-primary to-orange-500 text-white shadow-[0_12px_24px_-18px_rgba(249,115,22,0.75)]",
            )}
            aria-label={t("dashboard.nav_trails_button")}
          >
            <Compass className="h-4 w-4" />
            <span>{t("dashboard.nav_trails_button")}</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-extrabold text-white">
              {trailsCount}
            </span>
          </button>
        )}

        <div className={cn("grid w-full grid-cols-4 items-center gap-1", onTrailsClick ? "mt-2" : "")}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex min-h-[50px] w-full flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-[11px] font-semibold text-muted-foreground transition-all duration-200"
                activeClassName={cn("bg-primary/12 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]")}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
