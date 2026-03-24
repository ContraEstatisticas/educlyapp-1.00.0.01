import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const normalizeTheme = (theme?: string | null): ResolvedTheme =>
  theme === "dark" ? "dark" : "light"

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined"
  const [theme, setTheme] = useState<ResolvedTheme>(() => {
    const storedTheme = isBrowser ? localStorage.getItem(storageKey) : null
    return normalizeTheme(storedTheme ?? defaultTheme)
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const root = window.document.documentElement
    const resolvedTheme = normalizeTheme(theme)

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      const normalizedTheme = normalizeTheme(theme)

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, normalizedTheme)
      }

      setTheme(normalizedTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
