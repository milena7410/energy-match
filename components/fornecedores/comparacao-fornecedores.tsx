"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ComparacaoFornecedoresProps {
  fornecedores: {
    id: number
    nome: string
    custoKwh: number
    limiteMinKwh: number
    totalClientes: number
    avaliacaoMedia: number
  }[]
  onRemover: (id: number) => void
}

export function ComparacaoFornecedores({ fornecedores, onRemover }: ComparacaoFornecedoresProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[rgb(31,41,55)] text-gray-900 dark:text-gray-100 shadow-lg rounded-lg overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-[rgb(41,51,65)]">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Custo por kWh</TableHead>
            <TableHead className="font-semibold">Limite Mínimo kWh</TableHead>
            <TableHead className="font-semibold">Total de Clientes</TableHead>
            <TableHead className="font-semibold">Avaliação Média</TableHead>
            <TableHead className="font-semibold">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fornecedores.map((fornecedor) => (
            <TableRow key={fornecedor.id} className="hover:bg-gray-50 dark:hover:bg-[rgb(41,51,65)] transition-colors">
              <TableCell className="font-medium">{fornecedor.nome}</TableCell>
              <TableCell>R$ {fornecedor.custoKwh.toFixed(2)}</TableCell>
              <TableCell>{fornecedor.limiteMinKwh.toLocaleString()}</TableCell>
              <TableCell>{fornecedor.totalClientes.toLocaleString()}</TableCell>
              <TableCell>{fornecedor.avaliacaoMedia.toFixed(1)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onRemover(fornecedor.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

