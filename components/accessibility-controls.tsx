"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, ZoomIn, ZoomOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AccessibilityControls() {
  const { theme, setTheme } = useTheme()
  const [zoom, setZoom] = useState(100)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.zoom = `${zoom}%`
    }
  }, [zoom])

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-[rgb(31,41,55)] rounded-lg">
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("light")}
                className="hover:bg-gray-100 dark:hover:bg-[rgb(41,51,65)] transition-colors"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
                <span className="sr-only">Tema claro</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tema claro</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("dark")}
                className="hover:bg-gray-100 dark:hover:bg-[rgb(41,51,65)] transition-colors"
              >
                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-500" />
                <span className="sr-only">Tema escuro</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tema escuro</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Zoom</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{zoom}%</span>
        </div>
        <Slider
          min={70}
          max={150}
          step={10}
          value={[zoom]}
          onValueChange={handleZoomChange}
          className="dark:bg-[rgb(41,51,65)]"
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.max(prev - 10, 70))}
            className="dark:bg-[rgb(41,51,65)] dark:text-gray-100"
          >
            <ZoomOut className="h-4 w-4 mr-1" /> Diminuir
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.min(prev + 10, 150))}
            className="dark:bg-[rgb(41,51,65)] dark:text-gray-100"
          >
            <ZoomIn className="h-4 w-4 mr-1" /> Aumentar
          </Button>
        </div>
      </div>
    </div>
  )
}

