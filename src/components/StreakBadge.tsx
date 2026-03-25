import { Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  className?: string;
}

export const StreakBadge = ({ className }: StreakBadgeProps) => {
  const [showEntryAnimation, setShowEntryAnimation] = useState(false);

  const { data: streak } = useQuery({
    queryKey: ['user-streak'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_streaks')
        .select('current_streak, longest_streak')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  const currentStreak = streak?.current_streak || 0;

  useEffect(() => {
    if (currentStreak <= 0 || typeof window === "undefined") return;

    const storageKey = "educly-streak-entry-animation-seen";
    const alreadySeen = window.localStorage.getItem(storageKey) === "true";

    if (!alreadySeen) {
      setShowEntryAnimation(true);
      window.localStorage.setItem(storageKey, "true");

      const timeout = window.setTimeout(() => {
        setShowEntryAnimation(false);
      }, 1500);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [currentStreak]);

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-1.5 bg-streak/10 rounded-full border border-streak/15",
      className,
      showEntryAnimation && "streak-badge-entry",
    )}>
      <Flame 
        className={cn(
          "w-4 h-4 text-streak",
          currentStreak > 0 && !showEntryAnimation && "animate-streak-glow",
          showEntryAnimation && "animate-streak-entry",
        )}
        fill={currentStreak > 0 ? "hsl(var(--streak))" : "none"}
      />
      <span className="text-sm font-semibold text-streak">
        {currentStreak}
      </span>
    </div>
  );
};
