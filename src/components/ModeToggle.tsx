import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
  className?: string
}

const THEME_SWITCH_DELAY_MS = 130
const WAVE_ANIMATION_DURATION_MS = 420
const CLEAR_WAVE_DELAY_MS = WAVE_ANIMATION_DURATION_MS + 80

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const switchTimeoutRef = useRef<number | null>(null)
  const clearWaveTimeoutRef = useRef<number | null>(null)
  const [waveState, setWaveState] = useState<{
    x: number
    y: number
    size: number
    nextThemeIsDark: boolean
  } | null>(null)

  const isDarkTheme =
    theme === "dark" ||
    ((theme as string) === "system" &&
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"))

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current)
      if (clearWaveTimeoutRef.current) window.clearTimeout(clearWaveTimeoutRef.current)
    }
  }, [])

  const handleThemeToggle = () => {
    const nextTheme = isDarkTheme ? "light" : "dark"

    if (typeof window === "undefined") {
      setTheme(nextTheme)
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme)
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) {
      setTheme(nextTheme)
      return
    }

    if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current)
    if (clearWaveTimeoutRef.current) window.clearTimeout(clearWaveTimeoutRef.current)

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const maxX = Math.max(centerX, window.innerWidth - centerX)
    const maxY = Math.max(centerY, window.innerHeight - centerY)
    const diameter = Math.sqrt(maxX * maxX + maxY * maxY) * 2

    setWaveState({
      x: centerX,
      y: centerY,
      size: diameter,
      nextThemeIsDark: nextTheme === "dark",
    })

    switchTimeoutRef.current = window.setTimeout(() => {
      setTheme(nextTheme)
    }, THEME_SWITCH_DELAY_MS)

    clearWaveTimeoutRef.current = window.setTimeout(() => {
      setWaveState(null)
    }, CLEAR_WAVE_DELAY_MS)
  }

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "relative h-10 w-10 rounded-xl border-border/80 bg-background/70 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/40 hover:bg-accent/50",
          className,
        )}
        onClick={handleThemeToggle}
      >
        <Sun
          className={cn(
            "absolute h-[1.15rem] w-[1.15rem] text-amber-500 transition-all duration-300",
            isDarkTheme ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
        />
        <Moon
          className={cn(
            "absolute h-[1.15rem] w-[1.15rem] text-indigo-500 transition-all duration-300",
            isDarkTheme ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
          )}
        />
        <span className="sr-only">Trocar tema</span>
      </Button>

      {waveState &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            aria-hidden
            className={cn(
              "theme-toggle-wave",
              waveState.nextThemeIsDark ? "theme-toggle-wave-dark" : "theme-toggle-wave-light",
            )}
            style={{
              ["--wave-x" as string]: `${waveState.x}px`,
              ["--wave-y" as string]: `${waveState.y}px`,
              ["--wave-size" as string]: `${waveState.size}px`,
              ["--wave-duration" as string]: `${WAVE_ANIMATION_DURATION_MS}ms`,
            }}
          />,
          document.body,
        )}
    </>
  )
}
