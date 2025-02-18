"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Zap } from "lucide-react"

export function EnergyConsumptionForm() {
  const [consumption, setConsumption] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (Number.parseFloat(consumption) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a positive number for energy consumption.",
        variant: "destructive",
      })
      return
    }
    // TODO: Implement API call to backend
    console.log("Submitted consumption:", consumption)
    toast({
      title: "Consumption Reported",
      description: `Your monthly consumption of ${consumption} kWh has been reported.`,
    })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Label
          htmlFor="consumption"
          className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center mb-2"
        >
          <Zap className="w-6 h-6 mr-2 text-yellow-400" />
          Monthly Energy Consumption (kWh)
        </Label>
        <Input
          id="consumption"
          type="number"
          placeholder="Enter your monthly consumption"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          required
          min="0"
          step="0.01"
          className="mt-2 text-lg p-6 border-2 border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-500 rounded-lg"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        <Zap className="w-6 h-6 mr-2" />
        Report Consumption
      </Button>
    </motion.form>
  )
}

