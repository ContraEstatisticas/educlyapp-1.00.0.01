import { type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MobileNav } from "@/components/MobileNav";
import { FloatingEdiChat } from "@/components/chat/FloatingEdiChat";
import { aiMasteryTrails } from "@/lib/aiMasteryTrails";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";
import { isAiTrailLive } from "@/lib/aiTrailContent";

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const BUBBLE_LAYOUT = [
  { top: "11%", left: "9%", tilt: "-6deg", duration: "8.8s", lift: "-6px", delay: "0s", size: "sm" as const },
  { top: "6%", left: "34%", tilt: "3deg", duration: "7.9s", lift: "-5px", delay: "0.15s", size: "md" as const },
  { top: "12%", left: "61%", tilt: "-4deg", duration: "9.1s", lift: "-6px", delay: "0.35s", size: "lg" as const },
  { top: "39%", left: "11%", tilt: "2deg", duration: "8.2s", lift: "-5px", delay: "0.2s", size: "md" as const },
  { top: "33%", left: "38%", tilt: "-3deg", duration: "8.7s", lift: "-5px", delay: "0.45s", size: "sm" as const },
  { top: "48%", left: "64%", tilt: "4deg", duration: "8.1s", lift: "-5px", delay: "0.25s", size: "md" as const },
  { top: "67%", left: "23%", tilt: "-2deg", duration: "9.4s", lift: "-6px", delay: "0.5s", size: "lg" as const },
  { top: "70%", left: "52%", tilt: "3deg", duration: "7.6s", lift: "-5px", delay: "0.4s", size: "sm" as const },
];

type BubblePosition = {
  top: number;
  left: number;
};

const AIToolTrailsHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { i18n, t } = useTranslation();
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [trailsPanelOpen, setTrailsPanelOpen] = useState(false);
  const [isDesktopBoardInteractive, setIsDesktopBoardInteractive] = useState(false);
  const [bubblePositions, setBubblePositions] = useState<BubblePosition[]>(
    () =>
      BUBBLE_LAYOUT.map((bubble) => ({
        top: Number.parseFloat(bubble.top),
        left: Number.parseFloat(bubble.left),
      })),
  );
  const [bubbleLayers, setBubbleLayers] = useState<number[]>(
    () => BUBBLE_LAYOUT.map((_, index) => index + 1),
  );
  const [draggingBubbleIndex, setDraggingBubbleIndex] = useState<number | null>(null);
  const [dropAnimatingBubbleIndex, setDropAnimatingBubbleIndex] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const layerCounterRef = useRef(BUBBLE_LAYOUT.length + 1);
  const dropTimeoutRef = useRef<number | null>(null);
  const suppressClickRef = useRef<{ index: number; until: number } | null>(null);
  const dragStateRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
    bubbleWidth: number;
    bubbleHeight: number;
    hasMoved: boolean;
    startClientX: number;
    startClientY: number;
  } | null>(null);

  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const aiTrailUi = getAiTrailUiCopy(currentLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktopState = () => {
      setIsDesktopBoardInteractive(mediaQuery.matches);
    };

    syncDesktopState();
    mediaQuery.addEventListener("change", syncDesktopState);
    return () => mediaQuery.removeEventListener("change", syncDesktopState);
  }, []);

  const bringBubbleToFront = useCallback((index: number) => {
    const nextLayer = layerCounterRef.current++;
    setBubbleLayers((previous) => {
      const next = [...previous];
      next[index] = nextLayer;
      return next;
    });
  }, []);

  const handleBubblePointerMove = useCallback((event: PointerEvent) => {
    const dragState = dragStateRef.current;
    const boardElement = boardRef.current;
    if (!dragState || !boardElement) return;

    const boardRect = boardElement.getBoundingClientRect();
    const pointerX = event.clientX - boardRect.left;
    const pointerY = event.clientY - boardRect.top;

    const nextLeftPx = pointerX - dragState.offsetX;
    const nextTopPx = pointerY - dragState.offsetY;
    const maxLeft = Math.max(0, boardRect.width - dragState.bubbleWidth);
    const maxTop = Math.max(0, boardRect.height - dragState.bubbleHeight);
    const clampedLeft = Math.min(Math.max(0, nextLeftPx), maxLeft);
    const clampedTop = Math.min(Math.max(0, nextTopPx), maxTop);

    const nextLeftPercent = (clampedLeft / boardRect.width) * 100;
    const nextTopPercent = (clampedTop / boardRect.height) * 100;

    if (
      !dragState.hasMoved &&
      (Math.abs(event.clientX - dragState.startClientX) > 4 ||
        Math.abs(event.clientY - dragState.startClientY) > 4)
    ) {
      dragState.hasMoved = true;
    }

    setBubblePositions((previous) => {
      const current = previous[dragState.index];
      if (
        Math.abs(current.left - nextLeftPercent) < 0.02 &&
        Math.abs(current.top - nextTopPercent) < 0.02
      ) {
        return previous;
      }

      const next = [...previous];
      next[dragState.index] = { top: nextTopPercent, left: nextLeftPercent };
      return next;
    });

    event.preventDefault();
  }, []);

  const handleBubblePointerUp = useCallback(() => {
    const dragState = dragStateRef.current;
    if (!dragState) return;

    window.removeEventListener("pointermove", handleBubblePointerMove);
    window.removeEventListener("pointerup", handleBubblePointerUp);
    window.removeEventListener("pointercancel", handleBubblePointerUp);

    dragStateRef.current = null;
    setDraggingBubbleIndex(null);

    if (dragState.hasMoved) {
      suppressClickRef.current = {
        index: dragState.index,
        until: Date.now() + 250,
      };
    }

    setDropAnimatingBubbleIndex(dragState.index);
    if (dropTimeoutRef.current) {
      window.clearTimeout(dropTimeoutRef.current);
    }

    dropTimeoutRef.current = window.setTimeout(() => {
      setDropAnimatingBubbleIndex(null);
    }, 420);
  }, [handleBubblePointerMove]);

  const handleBubblePointerDown = useCallback(
    (index: number, event: ReactPointerEvent<HTMLButtonElement>) => {
      if (!isDesktopBoardInteractive) return;
      if (event.button !== 0) return;

      const boardElement = boardRef.current;
      const targetElement = event.currentTarget;
      if (!boardElement || !targetElement) return;

      const boardRect = boardElement.getBoundingClientRect();
      const bubbleRect = targetElement.getBoundingClientRect();
      const offsetX = event.clientX - bubbleRect.left;
      const offsetY = event.clientY - bubbleRect.top;

      dragStateRef.current = {
        index,
        offsetX,
        offsetY,
        bubbleWidth: bubbleRect.width,
        bubbleHeight: bubbleRect.height,
        hasMoved: false,
        startClientX: event.clientX,
        startClientY: event.clientY,
      };

      bringBubbleToFront(index);
      setDropAnimatingBubbleIndex(null);
      setDraggingBubbleIndex(index);

      window.addEventListener("pointermove", handleBubblePointerMove, { passive: false });
      window.addEventListener("pointerup", handleBubblePointerUp);
      window.addEventListener("pointercancel", handleBubblePointerUp);

      event.preventDefault();
    },
    [bringBubbleToFront, handleBubblePointerMove, handleBubblePointerUp, isDesktopBoardInteractive],
  );

  const handleBubbleClick = (index: number, slug: string, event: ReactMouseEvent<HTMLButtonElement>) => {
    if (isDesktopBoardInteractive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const suppressClick = suppressClickRef.current;
    if (suppressClick && suppressClick.index === index && Date.now() <= suppressClick.until) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    handleTrailOpen(slug);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handleBubblePointerMove);
      window.removeEventListener("pointerup", handleBubblePointerUp);
      window.removeEventListener("pointercancel", handleBubblePointerUp);
      if (dropTimeoutRef.current) {
        window.clearTimeout(dropTimeoutRef.current);
      }
    };
  }, [handleBubblePointerMove, handleBubblePointerUp]);

  const liveTrailCount = useMemo(
    () => aiMasteryTrails.filter((trail) => isAiTrailLive(trail.slug)).length,
    [],
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: t("common.logout") });
    navigate("/auth");
  };

  const handleOpenEdiChat = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("toggle-edi-chat"));
  };

  const showComingSoonToast = () => {
    toast({
      title: aiTrailUi.toastTitle,
      description: aiTrailUi.toastDescription,
    });
  };

  const handleTrailOpen = (slug: string) => {
    setTrailsPanelOpen(false);

    if (isAiTrailLive(slug)) {
      navigate(`/trilhas-ia/${slug}`);
      return;
    }

    showComingSoonToast();
  };

  return (
    <main className="dashboard-texture min-h-screen bg-background text-foreground pl-safe pr-safe pb-mobile-nav md:pb-20">
      <style>{`
        @keyframes trailsHubCardIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .trails-hub-card {
          animation: trailsHubCardIn 0.42s ease-out both;
        }

        @keyframes techBubbleFloat {
          0%, 100% {
            transform: translateY(0) rotate(var(--bubble-tilt, 0deg));
          }
          50% {
            transform: translateY(var(--bubble-lift, -4px)) rotate(var(--bubble-tilt, 0deg));
          }
        }

        .tech-bubble {
          position: absolute;
          z-index: var(--bubble-z, 1);
          animation: techBubbleFloat var(--bubble-duration, 8s) ease-in-out infinite;
          animation-delay: var(--bubble-delay, 0s);
          transform-origin: center;
          will-change: transform;
          transition:
            transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 340ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 260ms ease,
            background-color 260ms ease;
        }

        .tech-bubble.is-draggable {
          cursor: grab;
          user-select: none;
          touch-action: none;
        }

        .tech-bubble.is-dragging,
        .tech-bubble.is-dragging:hover,
        .tech-bubble.is-dragging:focus-visible {
          z-index: 280 !important;
          cursor: grabbing;
          animation: none !important;
          transition: none !important;
          transform: translateY(-8px) scale(1.08) rotate(var(--bubble-tilt, 0deg));
          box-shadow: 0 18px 36px -20px rgba(15, 23, 42, 0.65);
        }

        .tech-bubble:not(.is-dragging):hover,
        .tech-bubble:not(.is-dragging):focus-visible {
          z-index: calc(var(--bubble-z, 1) + 24);
          animation-play-state: paused;
          transform: translateY(-6px) scale(1.06) rotate(var(--bubble-tilt, 0deg));
        }

        @keyframes techBubbleDrop {
          0% {
            transform: translateY(-10px) scale(1.08) rotate(var(--bubble-tilt, 0deg));
          }
          70% {
            transform: translateY(3px) scale(0.995) rotate(var(--bubble-tilt, 0deg));
          }
          100% {
            transform: translateY(0) scale(1) rotate(var(--bubble-tilt, 0deg));
          }
        }

        .tech-bubble.is-drop-animating {
          z-index: calc(var(--bubble-z, 1) + 26);
          animation: techBubbleDrop 420ms cubic-bezier(0.18, 0.78, 0.2, 1) both;
        }

        @keyframes trailsPanelIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .trails-panel-open {
          animation: trailsPanelIn 0.28s ease-out both;
        }
      `}</style>

      <div
        className={`sticky top-0 !z-[130] w-full border-b transition-all duration-300 pt-safe ${
          isNavbarScrolled
            ? "border-border/60 bg-background/55 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/45"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <DashboardHeader onLogout={handleLogout} onOpenEdiChat={handleOpenEdiChat} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6">
        <section className="mb-8 rounded-3xl border border-border bg-card/92 px-5 py-5 shadow-sm md:px-7 md:py-7">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:bg-primary/10">
                {aiTrailUi.hubBadge}
              </Badge>

              <h1 className="max-w-xl text-3xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
                {aiTrailUi.hubTitle}
              </h1>

              <p className="max-w-lg text-sm leading-relaxed text-slate-600 dark:text-muted-foreground md:text-base">
                {aiTrailUi.pageDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  {aiMasteryTrails.length} {aiTrailUi.hubTotalLabel.toLowerCase()}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  {liveTrailCount} {aiTrailUi.availableNow.toLowerCase()}
                </span>
              </div>
            </div>

            <div
              ref={boardRef}
              className="relative h-[222px] w-full overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-background/90 to-card/70 md:h-[238px] lg:h-[232px] lg:w-[92%] lg:max-w-[520px] lg:ml-auto"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(249,115,22,0.12),transparent_48%),radial-gradient(circle_at_83%_75%,rgba(59,130,246,0.10),transparent_48%)]" />

              {aiMasteryTrails.map((trail, index) => {
                const trailIsLive = isAiTrailLive(trail.slug);
                const bubble = BUBBLE_LAYOUT[index % BUBBLE_LAYOUT.length];
                const position = bubblePositions[index] || {
                  top: Number.parseFloat(bubble.top),
                  left: Number.parseFloat(bubble.left),
                };
                const isDragging = draggingBubbleIndex === index;
                const isDropAnimating = dropAnimatingBubbleIndex === index;
                const bubbleSizeClass =
                  bubble.size === "lg"
                    ? "h-[54px] px-[18px]"
                    : bubble.size === "md"
                      ? "h-[50px] px-4"
                      : "h-[46px] px-[14px]";

                return (
                  <button
                    key={trail.slug}
                    onPointerDown={(event) => handleBubblePointerDown(index, event)}
                    onClick={(event) => handleBubbleClick(index, trail.slug, event)}
                    className={`tech-bubble inline-flex items-center gap-2.5 rounded-full border bg-card/90 text-[14px] font-semibold text-slate-800 shadow-[0_10px_28px_-22px_rgba(15,23,42,0.95)] backdrop-blur-md transition-all duration-200 ${
                      trailIsLive
                        ? "border-border/80 hover:border-primary/40 hover:shadow-[0_14px_30px_-22px_rgba(249,115,22,0.45)] dark:text-slate-100"
                        : "border-slate-300/85 bg-slate-100/90 text-slate-500 hover:border-slate-400/75 hover:shadow-[0_14px_26px_-22px_rgba(100,116,139,0.55)] dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-400 dark:hover:border-slate-600/80"
                    } ${isDesktopBoardInteractive ? "is-draggable" : ""} ${isDragging ? "is-dragging" : ""} ${
                      isDropAnimating ? "is-drop-animating" : ""
                    } ${bubbleSizeClass}`}
                    style={{
                      top: `${position.top}%`,
                      left: `${position.left}%`,
                      ["--bubble-tilt" as string]: bubble.tilt,
                      ["--bubble-duration" as string]: bubble.duration,
                      ["--bubble-lift" as string]: bubble.lift,
                      ["--bubble-delay" as string]: bubble.delay,
                      ["--bubble-z" as string]: String(bubbleLayers[index] || index + 1),
                    }}
                  >
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70"
                      style={{ backgroundColor: trailIsLive ? `${trail.accent}1e` : "rgba(148,163,184,0.20)" }}
                    >
                      {trail.logo ? (
                        <img
                          src={trail.logo}
                          alt={trail.name}
                          className={`h-[18px] w-[18px] object-contain ${trailIsLive ? "" : "grayscale opacity-70"}`}
                        />
                      ) : (
                        <span className="text-[11px] font-black" style={{ color: trailIsLive ? trail.accent : "#64748b" }}>
                          {getInitials(trail.name)}
                        </span>
                      )}
                    </span>

                    <span className="max-w-[136px] truncate text-[14px]">{trail.name}</span>

                    <span
                      className={`h-3 w-3 rounded-full ${trailIsLive ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-500"}`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {aiTrailUi.hubCatalogLabel}
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white md:text-3xl">
                {aiTrailUi.hubCatalogTitle}
              </h2>
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {aiMasteryTrails.map((trail, index) => {
              const trailMeta = getAiTrailLocalizedMeta(trail.slug, currentLanguage);
              const trailIsLive = isAiTrailLive(trail.slug);

              return (
                <button
                  key={trail.slug}
                  onClick={() => handleTrailOpen(trail.slug)}
                  className={`trails-hub-card group relative h-full overflow-hidden rounded-2xl border bg-card/95 p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-28px_rgba(15,23,42,0.8)] ${
                    trailIsLive
                      ? "border-border hover:border-primary/25"
                      : "border-slate-300/75 bg-slate-50/80 dark:border-slate-700/65 dark:bg-slate-900/45"
                  }`}
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  {!trailIsLive && (
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-slate-300/85 dark:bg-slate-700/85" />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70"
                        style={{ backgroundColor: `${trail.accent}20` }}
                      >
                        {trail.logo ? (
                          <img src={trail.logo} alt={trail.name} className="h-6 w-6 object-contain" />
                        ) : (
                          <span className="text-xs font-black" style={{ color: trail.accent }}>
                            {getInitials(trail.name)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{trail.name}</h3>
                        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-muted-foreground">{trailMeta.category}</p>
                      </div>
                    </div>

                    {trailIsLive ? (
                      <span
                        className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
                        aria-label={aiTrailUi.availableNow}
                      />
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 rounded-full border border-slate-300/85 bg-slate-100/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/85 dark:text-slate-200"
                        aria-label={aiTrailUi.comingSoon}
                      >
                        <Lock className="h-3 w-3" />
                        {aiTrailUi.comingSoon}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                    {trailMeta.signature}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>{trail.modules.length} {aiTrailUi.modulesLabel.toLowerCase()}</span>
                    <span>{trail.lessonCount} {aiTrailUi.lessonsLabel.toLowerCase()}</span>
                  </div>

                  {!trailIsLive && (
                    <div className="mt-3 rounded-lg border border-slate-300/80 bg-slate-100/80 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/75 dark:text-slate-200">
                      {aiTrailUi.pageLockedTitle}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-end border-t border-border/70 pt-3">
                    <div
                      className={`inline-flex shrink-0 items-center gap-1 text-sm font-semibold ${trailIsLive ? "" : "text-slate-500 dark:text-slate-300"}`}
                      style={trailIsLive ? { color: trail.accent } : undefined}
                    >
                      {trailIsLive ? aiTrailUi.openTrail : aiTrailUi.comingSoon}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div
          className={`fixed right-3 z-[320] w-[min(94vw,430px)] transition-all duration-300 md:hidden ${
            trailsPanelOpen
              ? "trails-panel-open bottom-[calc(5.2rem+env(safe-area-inset-bottom,0px))] opacity-100"
              : "bottom-[calc(4.8rem+env(safe-area-inset-bottom,0px))] pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_44px_-28px_rgba(15,23,42,0.72)]">
            <span className="pointer-events-none absolute -bottom-1.5 right-[2.85rem] h-3 w-3 rotate-45 border-b border-r border-border bg-card" />

            <div className="flex items-center justify-between border-b border-border/70 px-3.5 py-2.5">
              <div>
                <p className="text-sm font-bold text-foreground">{aiTrailUi.hubBadge}</p>
                <p className="text-[11px] text-muted-foreground">{aiTrailUi.dashboardTitle}</p>
              </div>

              <button
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setTrailsPanelOpen(false)}
                aria-label={t("dashboard.nav_close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[48vh] space-y-2.5 overflow-y-auto p-3.5">
              {aiMasteryTrails.map((trail) => {
                const trailMeta = getAiTrailLocalizedMeta(trail.slug, currentLanguage);
                const trailIsLive = isAiTrailLive(trail.slug);

                return (
                  <button
                    key={trail.slug}
                    onClick={() => handleTrailOpen(trail.slug)}
                    className={`group w-full rounded-xl border p-2.5 text-left transition-all duration-200 active:scale-[0.995] ${
                      trailIsLive
                        ? "border-border bg-background/75"
                        : "border-slate-300/70 bg-slate-50/80 dark:border-slate-700/65 dark:bg-slate-900/50"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                          trailIsLive ? "border-primary/15 bg-primary/10" : "border-slate-300/70 bg-slate-200/70 dark:border-slate-700/70 dark:bg-slate-800/80"
                        }`}
                      >
                        {trail.logo ? (
                          <img
                            src={trail.logo}
                            alt={trail.name}
                            className={`h-6 w-6 object-contain ${trailIsLive ? "" : "grayscale opacity-70"}`}
                          />
                        ) : (
                          <span className={`text-xs font-black ${trailIsLive ? "text-primary" : "text-slate-500 dark:text-slate-300"}`}>
                            {getInitials(trail.name)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-bold text-foreground">{trail.name}</p>
                          {!trailIsLive && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-300/85 bg-slate-100/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/85 dark:text-slate-200">
                              <Lock className="h-2.5 w-2.5" />
                              {aiTrailUi.comingSoon}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{trailMeta.signature}</p>
                        <p className={`mt-1.5 text-[11px] font-semibold ${trailIsLive ? "text-primary" : "text-slate-600 dark:text-slate-300"}`}>
                          {trailIsLive ? aiTrailUi.openTrail : aiTrailUi.pageLockedTitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <FloatingEdiChat showLauncher={false} />

        <MobileNav
          onTrailsClick={() => setTrailsPanelOpen((prev) => !prev)}
          trailsOpen={trailsPanelOpen}
        />
      </div>
    </main>
  );
};

export default AIToolTrailsHub;
