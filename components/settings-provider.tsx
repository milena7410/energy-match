"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type FontSize = "normal" | "large" | "larger"

interface SettingsContextType {
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  fontSize: FontSize
  setFontSize: (value: FontSize) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState<FontSize>("normal")

  useEffect(() => {
    // Load settings from localStorage
    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    const savedReducedMotion = localStorage.getItem("reducedMotion") === "true"
    const savedFontSize = (localStorage.getItem("fontSize") as FontSize) || "normal"

    setHighContrast(savedHighContrast)
    setReducedMotion(savedReducedMotion)
    setFontSize(savedFontSize)
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("highContrast", highContrast.toString())
    localStorage.setItem("reducedMotion", reducedMotion.toString())
    localStorage.setItem("fontSize", fontSize)
  }, [highContrast, reducedMotion, fontSize])

  return (
    <SettingsContext.Provider
      value={{
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

