"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Zap } from "lucide-react"

interface SimulacaoConsumoProps {
  onSubmit: (consumo: number) => void
}

export function SimulacaoConsumo({ onSubmit }: SimulacaoConsumoProps) {
  const [consumo, setConsumo] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const consumoNum = Number(consumo)
    if (consumoNum > 0) {
      onSubmit(consumoNum)
    } else {
      toast({
        title: "Entrada Inválida",
        description: "Por favor, insira um número positivo para o consumo de energia.",
        variant: "destructive",
      })
    }
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
          htmlFor="consumo"
          className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center mb-2"
        >
          <Zap className="w-6 h-6 mr-2 text-yellow-400" />
          Simule seu consumo mensal (kWh)
        </Label>
        <Input
          id="consumo"
          type="number"
          placeholder="Digite seu consumo mensal"
          value={consumo}
          onChange={(e) => {
            const value = e.target.value
            if (value === "" || (Number(value) > 0 && !value.includes("."))) {
              setConsumo(value)
            }
          }}
          required
          min="1"
          step="1"
          className="mt-2 text-lg p-6 border-2 border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-500 rounded-lg"
        />
        {consumo !== "" && Number(consumo) <= 0 && (
          <p className="text-red-500 text-sm mt-1">Por favor, insira um número positivo.</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Simular
      </Button>
    </motion.form>
  )
}

