import { Brain, Briefcase, Home, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/assistentes", label: "Hub IA", icon: Brain },
  { to: "/freelancer", label: "Freelancer", icon: Briefcase },
  { to: "/profile", label: "Perfil", icon: User },
];

export const MobileNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 pb-safe pl-safe pr-safe shadow-[0_-12px_30px_-22px_rgba(15,23,42,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="mx-auto grid w-full max-w-md grid-cols-4 items-center gap-1 px-2 py-2">
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
    </nav>
  );
};
