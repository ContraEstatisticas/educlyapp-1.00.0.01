import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLevelRewardsCopy, getLevelTitle } from "@/lib/levelRewards";
import {
  getLevelUpTheme,
  getMotivationalPhrase,
  getTierIndex,
} from "@/lib/levelUpThemes";

/* ── helpers ──────────────────────────────────────────────────── */

/** Generate deterministic-ish random positions for floating particles */
const buildParticles = (count: number, colors: string[]) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    // Distribute around the popup (0-100% horizontal, 0-100% vertical)
    x: ((i * 37 + 13) % 100),
    y: ((i * 53 + 7) % 100),
    size: 3 + (i % 4) * 1.5,
    delay: (i * 0.12) % 1.5,
    duration: 2 + (i % 3) * 0.8,
  }));

/** Generate confetti pieces for tier 3-4 */
const buildConfetti = (count: number, colors: string[]) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: 50 + (Math.sin(i * 1.7) * 45),
    delay: i * 0.06,
    rotation: i * 37,
    size: 4 + (i % 3) * 2,
  }));

/* ── component ────────────────────────────────────────────────── */

interface LevelUpNotificationProps {
  level: number;
  isVisible: boolean;
  onClose: () => void;
}

export const LevelUpNotification = ({
  level,
  isVisible,
  onClose,
}: LevelUpNotificationProps) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const copy = getLevelRewardsCopy(lang);
  const theme = getLevelUpTheme(level);
  const tier = getTierIndex(level);

  // Memoize the motivational phrase so it doesn't change on re-render
  const motivationalPhrase = useMemo(
    () => getMotivationalPhrase(level, lang),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, lang, isVisible],
  );

  const particles = useMemo(
    () => buildParticles(theme.particleCount, theme.particleColors),
    [theme.particleCount, theme.particleColors],
  );

  const confetti = useMemo(
    () => (theme.showConfetti ? buildConfetti(20, theme.particleColors) : []),
    [theme.showConfetti, theme.particleColors],
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, theme.autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, theme.autoCloseDuration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: -120 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="fixed left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 5rem)" }}
        >
          {/* ── Pulse ring (tier 2+) ─────────────────────── */}
          {theme.showPulseRing && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: [0.8, 1.6, 2.2], opacity: [0.6, 0.2, 0] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: theme.borderGradient,
                filter: "blur(8px)",
              }}
            />
          )}

          {/* ── Outer gradient border ────────────────────── */}
          <div
            className={`relative p-[2px] rounded-2xl level-up-border ${theme.tierClass}`}
            style={{
              background: theme.borderGradient,
              boxShadow: theme.boxShadow,
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background pointer-events-auto"
              aria-label={t("common.close", "Close")}
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Card body ──────────────────────────────── */}
            <div
              className="bg-background rounded-xl px-8 py-6 sm:px-10 sm:py-8 text-center relative overflow-hidden min-w-[280px] sm:min-w-[340px]"
            >
              {/* Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: theme.glowGradient }}
              />

              {/* ── Floating particles ──────────────────── */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.4, 0.8, 0],
                    scale: [0, 1, 0.7, 1, 0],
                    y: [0, -15, -5, -20, -30],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: 0.3 + p.delay,
                    ease: "easeInOut",
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                  }}
                />
              ))}

              {/* ── Confetti burst (tier 3-4) ──────────── */}
              {confetti.map((c) => (
                <motion.div
                  key={`confetti-${c.id}`}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0, 1.2, 0.8],
                    x: (c.x - 50) * 3,
                    y: [-20, -80 - c.id * 3],
                    rotate: c.rotation + 360,
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 0.2 + c.delay,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  style={{
                    width: c.size,
                    height: c.size * 0.4,
                    backgroundColor: c.color,
                    borderRadius: 1,
                  }}
                />
              ))}

              {/* ── Content ──────────────────────────────── */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                {/* Tier badge with emojis */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="text-xl"
                  >
                    {theme.emojis[0]}
                  </motion.span>

                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{
                      backgroundImage: theme.numberGradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {copy.levelUpBannerLabel}
                  </span>

                  <motion.span
                    initial={{ scale: 0, rotate: 30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="text-xl"
                  >
                    {theme.emojis[1]}
                  </motion.span>
                </div>

                {/* Level number – progressively more dramatic */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.35,
                    type: "spring",
                    stiffness: tier >= 3 ? 120 : 150,
                    damping: tier >= 3 ? 8 : 12,
                  }}
                  className={`font-black bg-clip-text text-transparent ${
                    tier >= 4
                      ? "text-7xl sm:text-8xl"
                      : tier >= 3
                        ? "text-6xl sm:text-7xl"
                        : "text-5xl sm:text-6xl"
                  }`}
                  style={{
                    backgroundImage: theme.numberGradient,
                    // Tier 3-4 get an animated shimmer overlay
                    ...(tier >= 3 && {
                      backgroundSize: "200% 100%",
                      animation: "levelUpShimmer 2.5s ease-in-out infinite",
                    }),
                  }}
                >
                  {level}
                </motion.div>

                {/* Level title */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-lg font-bold text-foreground mt-2"
                >
                  {getLevelTitle(level, lang)}
                </motion.p>

                {/* Motivational phrase (progressive!) */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className={`mt-2 max-w-[280px] mx-auto leading-relaxed ${
                    tier >= 3
                      ? "text-sm font-semibold"
                      : "text-sm text-muted-foreground"
                  }`}
                  style={
                    tier >= 3
                      ? {
                          backgroundImage: theme.numberGradient,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : undefined
                  }
                >
                  {motivationalPhrase}
                </motion.p>

                {/* Tier 4: extra flair — crown animation */}
                {tier >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    className="mt-3 text-2xl"
                  >
                    🏆
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
