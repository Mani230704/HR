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
    // Return default or placeholder values until mounted to avoid hydration mismatch.
    // These values should match the structure returned by useNextTheme.
    return {
      theme: undefined, // `theme` can be undefined initially
      setTheme: () => null, // no-op until mounted
      resolvedTheme: undefined, // `resolvedTheme` can be undefined initially
      themes: [], // Default for themes array
      systemTheme: undefined, // `systemTheme` can be 'light', 'dark', or undefined
      forcedTheme: undefined, // `forcedTheme` if a theme is forced by the provider
    }
  }

  return themeContext;
}
