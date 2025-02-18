"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Battery, Star } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LightningBoltIcon } from "@/components/lightning-bolt-icon"

interface CardFornecedorProps {
  fornecedor: {
    id: number
    nome: string
    logo: string
    estado: string
    custoKwh: number
    limiteMinKwh: number
    totalClientes: number
    avaliacaoMedia: number
  }
  onComparar: (id: number) => void
  isComparado: boolean
}

export function CardFornecedor({ fornecedor, onComparar, isComparado }: CardFornecedorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <motion.div
              className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-green-400 dark:border-green-600"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src={fornecedor.logo || "/placeholder.svg"}
                alt={`Logo de ${fornecedor.nome}`}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-3 py-1 text-sm font-semibold"
            >
              {fornecedor.estado}
            </Badge>
          </div>
          <CardTitle className="mt-4 text-xl md:text-2xl text-green-700 dark:text-green-300">
            {fornecedor.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <LightningBoltIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                Custo por kWh:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400 text-sm md:text-base">
                R$ {fornecedor.custoKwh.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <Battery className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500" />
                Limite Mínimo:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400 text-sm md:text-base">
                {fornecedor.limiteMinKwh.toLocaleString()} kWh
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-500" />
                Total de Clientes:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400 text-sm md:text-base">
                {fornecedor.totalClientes.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-500" />
                Avaliação Média:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400 text-sm md:text-base">
                {fornecedor.avaliacaoMedia.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isComparado ? "secondary" : "default"}
                    size="sm"
                    onClick={() => onComparar(fornecedor.id)}
                    className={`${
                      isComparado ? "bg-green-200 text-green-800" : "bg-green-600 text-white"
                    } hover:bg-green-700 hover:text-white w-full md:w-auto`}
                  >
                    {isComparado ? "Remover" : "Comparar"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isComparado ? "Remover da comparação" : "Adicionar à comparação"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

