
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Custom hook to use theme, ensuring it's client-side
export function useTheme() {
  const [mounted, setMounted] = React.useState(false)
  const themeContext = useNextTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return default or placeholder values until mounted to avoid hydration mismatch
    // For system theme, this might mean returning undefined for theme until client-side detection
    return {
      theme: props.defaultTheme === "system" ? undefined : props.defaultTheme, // or a sensible default
      setTheme: () => null, // no-op until mounted
      resolvedTheme: props.defaultTheme === "system" ? undefined : props.defaultTheme,
      // ... other properties from useNextTheme if needed, with placeholder values
    }
  }

  return themeContext;
}
