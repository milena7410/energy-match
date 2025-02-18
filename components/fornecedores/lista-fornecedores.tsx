"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CardFornecedor } from "@/components/fornecedores/card-fornecedor"
import { ComparacaoFornecedores } from "@/components/fornecedores/comparacao-fornecedores"
import { MapaFornecedores } from "@/components/fornecedores/mapa-fornecedores"
import { Button } from "@/components/ui/button"
import { MapPin, List, ChevronLeft, ChevronRight } from "lucide-react"
import { useFornecedores } from "@/lib/hooks/use-fornecedores"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { SimulacaoConsumo } from "@/components/simulacao-consumo"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrdenacaoTipo = "custoKwh" | "limiteMinKwh" | "totalClientes" | "avaliacaoMedia"
type ModoVisualizacao = "lista" | "cards" | "mapa"

export function ListaFornecedores() {
  const {
    fornecedores,
    fornecedoresComparados,
    handleComparar,
    isLoading,
    error,
    handleBuscarFornecedores,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    handlePageChange,
  } = useFornecedores()
  const [modoVisualizacao, setModoVisualizacao] = useState<ModoVisualizacao>("cards")
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<{
    fornecedor: (typeof fornecedores)[0]
    custoMensal: number
    economiaEstimada: number
  } | null>(null)
  const [ordenacao, setOrdenacao] = useState<OrdenacaoTipo>("custoKwh")

  const buscarFornecedor = (consumo: number) => {
    handleBuscarFornecedores(consumo)
    if (fornecedores.length > 0) {
      const fornecedorMaisBarato = fornecedores.reduce((prev, current) =>
        prev.custoKwh < current.custoKwh ? prev : current,
      )
      const custoMensal = consumo * fornecedorMaisBarato.custoKwh
      const custoMedioMercado = fornecedores.reduce((sum, f) => sum + f.custoKwh, 0) / fornecedores.length
      const economiaEstimada = (custoMedioMercado - fornecedorMaisBarato.custoKwh) * consumo

      setFornecedorSelecionado({
        fornecedor: fornecedorMaisBarato,
        custoMensal,
        economiaEstimada,
      })
    }
  }

  const fornecedoresOrdenados = [...fornecedores].sort((a, b) => {
    switch (ordenacao) {
      case "custoKwh":
        return a.custoKwh - b.custoKwh
      case "limiteMinKwh":
        return a.limiteMinKwh - b.limiteMinKwh
      case "totalClientes":
        return b.totalClientes - a.totalClientes
      case "avaliacaoMedia":
        return b.avaliacaoMedia - a.avaliacaoMedia
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      <SimulacaoConsumo onSubmit={buscarFornecedor} />

      {fornecedorSelecionado && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Resultado da Busca</h3>
          <p className="mb-2 dark:text-gray-200">
            <span className="font-semibold">Fornecedor Recomendado:</span> {fornecedorSelecionado.fornecedor.nome}
          </p>
          <p className="mb-2 dark:text-gray-200">
            <span className="font-semibold">Custo Mensal Estimado:</span> R${" "}
            {fornecedorSelecionado.custoMensal.toFixed(2)}
          </p>
          <p className="mb-2 dark:text-gray-200">
            <span className="font-semibold">Economia Estimada:</span> R${" "}
            {fornecedorSelecionado.economiaEstimada.toFixed(2)}
          </p>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Button
            variant={modoVisualizacao === "lista" ? "default" : "outline"}
            onClick={() => setModoVisualizacao("lista")}
            className={`${
              modoVisualizacao === "lista" ? "bg-green-600 text-white" : "text-green-600 border-green-600"
            } hover:bg-green-700 hover:text-white dark:hover:bg-green-800 transition-all duration-300`}
          >
            <List className="w-4 h-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={modoVisualizacao === "cards" ? "default" : "outline"}
            onClick={() => setModoVisualizacao("cards")}
            className={`${
              modoVisualizacao === "cards" ? "bg-green-600 text-white" : "text-green-600 border-green-600"
            } hover:bg-green-700 hover:text-white dark:hover:bg-green-800 transition-all duration-300`}
          >
            <List className="w-4 h-4 mr-2" />
            Cards
          </Button>
          <Button
            variant={modoVisualizacao === "mapa" ? "default" : "outline"}
            onClick={() => setModoVisualizacao("mapa")}
            className={`${
              modoVisualizacao === "mapa" ? "bg-green-600 text-white" : "text-green-600 border-green-600"
            } hover:bg-green-700 hover:text-white dark:hover:bg-green-800 transition-all duration-300`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Mapa
          </Button>
        </div>
        <Select value={ordenacao} onValueChange={(value) => setOrdenacao(value as OrdenacaoTipo)}>
          <SelectTrigger className="w-[200px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custoKwh">Menor Custo por kWh</SelectItem>
            <SelectItem value="limiteMinKwh">Menor Limite Mínimo kWh</SelectItem>
            <SelectItem value="totalClientes">Maior Número de Clientes</SelectItem>
            <SelectItem value="avaliacaoMedia">Melhor Avaliação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          {fornecedoresComparados && fornecedoresComparados.length > 0 && (
            <ComparacaoFornecedores
              fornecedores={fornecedores.filter((f) => fornecedoresComparados?.includes(f.id))}
              onRemover={handleComparar}
            />
          )}

          <AnimatePresence mode="wait">
            {modoVisualizacao === "lista" && (
              <motion.div
                key="lista"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {fornecedoresOrdenados.map((fornecedor) => (
                    <CardFornecedor
                      key={fornecedor.id}
                      fornecedor={fornecedor}
                      onComparar={handleComparar}
                      isComparado={fornecedoresComparados?.includes(fornecedor.id) || false}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {modoVisualizacao === "cards" && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {fornecedoresOrdenados.map((fornecedor) => (
                  <CardFornecedor
                    key={fornecedor.id}
                    fornecedor={fornecedor}
                    onComparar={handleComparar}
                    isComparado={fornecedoresComparados?.includes(fornecedor.id) || false}
                  />
                ))}
                /> ))}
              </motion.div>
            )}

            {modoVisualizacao === "mapa" && (
              <motion.div
                key="mapa"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MapaFornecedores fornecedores={fornecedores} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <span className="text-gray-700 dark:text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Total de fornecedores: {totalCount}</p>
        </>
      )}
    </div>
  )
}

