"use client"

import { useState } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_FORNECEDORES, BUSCAR_FORNECEDORES } from "../queries"
import { useToast } from "@/components/ui/use-toast"

export interface Fornecedor {
  id: number
  nome: string
  logo: string
  estado: string
  custoKwh: number
  limiteMinKwh: number
  totalClientes: number
  avaliacaoMedia: number
  latitude: number
  longitude: number
}

export function useFornecedores() {
  const [fornecedoresComparados, setFornecedoresComparados] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const { toast } = useToast()

  const {
    data,
    loading: isLoading,
    error,
    refetch,
  } = useQuery(GET_FORNECEDORES, {
    variables: { page: currentPage, pageSize },
  })
  const [buscarFornecedores, { data: dataFiltrada, loading: isLoadingFiltrado, error: errorFiltrado }] =
    useLazyQuery(BUSCAR_FORNECEDORES)

  const handleComparar = (id: number) => {
    setFornecedoresComparados((prev) =>
      prev.includes(id) ? prev.filter((fornecedorId) => fornecedorId !== id) : [...prev, id].slice(-2),
    )
  }

  const handleBuscarFornecedores = (consumoMensal: number) => {
    buscarFornecedores({ variables: { consumoMensal } })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    refetch({ page: newPage, pageSize })
  }

  if (error || errorFiltrado) {
    toast({
      title: "Erro",
      description: "Não foi possível carregar os fornecedores. Por favor, tente novamente mais tarde.",
      variant: "destructive",
    })
  }

  return {
    fornecedores: dataFiltrada?.buscarFornecedores || data?.fornecedores.fornecedores || [],
    totalCount: data?.fornecedores.totalCount || 0,
    totalPages: data?.fornecedores.totalPages || 1,
    currentPage,
    pageSize,
    fornecedoresComparados,
    handleComparar,
    handleBuscarFornecedores,
    handlePageChange,
    isLoading: isLoading || isLoadingFiltrado,
    error: error || errorFiltrado ? (error || errorFiltrado).message : null,
  }
}

