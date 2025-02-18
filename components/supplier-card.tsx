"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Battery, ChevronDown, ChevronUp } from "lucide-react"
import { useSettings } from "@/components/settings-provider"
import { LightningBoltIcon } from "@/components/lightning-bolt-icon"

interface SupplierProps {
  supplier: {
    id: number
    name: string
    logo: string
    state: string
    costPerKwh: number
    minKwhLimit: number
    totalCustomers: number
    averageRating: number
  }
  onCompare: (id: number) => void
  isCompared: boolean
}

export function SupplierCard({ supplier, onCompare, isCompared }: SupplierProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { highContrast, reducedMotion, fontSize } = useSettings()

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className={`${fontSize === "large" ? "text-lg" : fontSize === "larger" ? "text-xl" : "text-base"}`}
      whileHover={reducedMotion ? {} : { scale: 1.03 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 
        ${highContrast ? "border-2 border-black dark:border-white" : "border-none"} 
        bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900
        hover:shadow-2xl`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <motion.div
              className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-400 dark:border-green-600"
              whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
            >
              <Image src={supplier.logo || "/placeholder.svg"} alt={supplier.name} layout="fill" objectFit="cover" />
            </motion.div>
            <Badge
              variant={highContrast ? "outline" : "secondary"}
              className={`
              ${highContrast ? "border-2 border-black dark:border-white" : ""}
              bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100
              px-3 py-1 text-sm font-semibold
            `}
            >
              {supplier.state}
            </Badge>
          </div>
          <CardTitle
            className={`mt-4 text-2xl ${highContrast ? "text-black dark:text-white" : "text-green-700 dark:text-green-300"}`}
          >
            {supplier.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <LightningBoltIcon className="w-5 h-5 mr-2 text-yellow-400" />
                Cost per kWh:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                R$ {supplier.costPerKwh.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <Battery className="w-5 h-5 mr-2 text-blue-500" />
                Minimum kWh:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {supplier.minKwhLimit.toLocaleString()}
              </span>
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600 dark:text-gray-300">
                        <Users className="w-5 h-5 mr-2 text-indigo-500" />
                        Total Customers:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {supplier.totalCustomers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600 dark:text-gray-300">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        Rating:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {supplier.averageRating.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              {isExpanded ? (
                <>
                  Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  More <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button
              variant={isCompared ? "secondary" : "default"}
              size="sm"
              onClick={() => onCompare(supplier.id)}
              className={`${isCompared ? "bg-green-200 text-green-800" : "bg-green-600 text-white"} hover:bg-green-700 hover:text-white`}
            >
              {isCompared ? "Remove" : "Compare"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

