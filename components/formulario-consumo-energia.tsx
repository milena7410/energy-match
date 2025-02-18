"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap } from "lucide-react"

interface FormularioConsumoEnergiaProps {
  onSubmit: (consumo: number) => void
}

export function FormularioConsumoEnergia({ onSubmit }: FormularioConsumoEnergiaProps) {
  const [consumo, setConsumo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const consumoNum = Number(consumo)
    if (consumoNum > 0) {
      onSubmit(consumoNum)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-emerald-800 p-8 rounded-lg shadow-xl border border-emerald-100 dark:border-emerald-700"
      >
        <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4">Busca de Fornecedor</h2>
        <div>
          <Label
            htmlFor="consumo"
            className="text-xl font-semibold flex items-center text-emerald-700 dark:text-emerald-100"
          >
            <Zap className="w-6 h-6 mr-2 text-yellow-500" />
            Consumo Mensal de Energia (kWh)
          </Label>
          <Input
            id="consumo"
            type="number"
            placeholder="Digite seu consumo mensal (ex: 500)"
            value={consumo}
            onChange={(e) => setConsumo(e.target.value)}
            required
            min="1"
            step="1"
            className="mt-2 text-lg p-6 border-2 border-emerald-300 dark:border-emerald-600 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-lg shadow-sm"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <Zap className="w-5 h-5 mr-2" />
          Buscar Fornecedor
        </Button>
      </form>
    </motion.div>
  )
}

