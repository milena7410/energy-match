"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { motion } from "framer-motion"

export function ZoomToggle() {
  const [zoom, setZoom] = useState(100)

  const toggleZoom = () => {
    const newZoom = zoom === 100 ? 120 : 100
    setZoom(newZoom)
    document.body.style.zoom = `${newZoom}%`
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleZoom}>
      <motion.div initial={false} animate={{ scale: zoom === 100 ? 1 : 1.2 }} transition={{ duration: 0.3 }}>
        {zoom === 100 ? <ZoomIn className="h-[1.2rem] w-[1.2rem]" /> : <ZoomOut className="h-[1.2rem] w-[1.2rem]" />}
      </motion.div>
      <span className="sr-only">Alternar zoom</span>
    </Button>
  )
}

