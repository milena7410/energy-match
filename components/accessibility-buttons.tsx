"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, ZoomIn, ZoomOut } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function AccessibilityButtons() {
  const { theme, setTheme } = useTheme()
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    document.body.style.zoom = `${zoom}%`
  }, [zoom])

  const increaseZoom = () => setZoom((prev) => Math.min(prev + 10, 150))
  const decreaseZoom = () => setZoom((prev) => Math.max(prev - 10, 70))

  return (
    <div className="flex space-x-2">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme("light")}
          aria-label="Tema claro"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme("dark")}
          aria-label="Tema escuro"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={increaseZoom}
          aria-label="Aumentar zoom"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ZoomIn className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseZoom}
          aria-label="Diminuir zoom"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ZoomOut className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </motion.div>
    </div>
  )
}

