"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CRIAR_FORNECEDOR } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

export default function NovoFornecedor() {
  const [nome, setNome] = useState("")
  const [estado, setEstado] = useState("")
  const [custoKwh, setCustoKwh] = useState("")
  const [limiteMinKwh, setLimiteMinKwh] = useState("")
  const [totalClientes, setTotalClientes] = useState("")
  const [avaliacaoMedia, setAvaliacaoMedia] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const { toast } = useToast()

  const [criarFornecedor, { loading }] = useMutation(CRIAR_FORNECEDOR)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await criarFornecedor({
        variables: {
          nome,
          logo: logo ? URL.createObjectURL(logo) : "/placeholder.svg",
          estado,
          custoKwh: Number.parseFloat(custoKwh),
          limiteMinKwh: Number.parseInt(limiteMinKwh),
          totalClientes: Number.parseInt(totalClientes),
          avaliacaoMedia: Number.parseFloat(avaliacaoMedia),
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        },
      })

      toast({
        title: "Fornecedor Cadastrado",
        description: "O novo fornecedor foi cadastrado com sucesso!",
      })

      // Limpar formulário
      setNome("")
      setEstado("")
      setCustoKwh("")
      setLimiteMinKwh("")
      setTotalClientes("")
      setAvaliacaoMedia("")
      setLatitude("")
      setLongitude("")
      setLogo(null)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o fornecedor. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Cadastro de Novo Fornecedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <Label htmlFor="nome" className="text-green-800">
            Nome do Fornecedor
          </Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="bg-green-50" />
        </div>
        <div>
          <Label htmlFor="estado" className="text-green-800">
            Estado
          </Label>
          <Input
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="custoKwh" className="text-green-800">
            Custo por kWh (R$)
          </Label>
          <Input
            id="custoKwh"
            type="number"
            step="0.01"
            value={custoKwh}
            onChange={(e) => setCustoKwh(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="limiteMinKwh" className="text-green-800">
            Limite Mínimo kWh
          </Label>
          <Input
            id="limiteMinKwh"
            type="number"
            value={limiteMinKwh}
            onChange={(e) => setLimiteMinKwh(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="totalClientes" className="text-green-800">
            Total de Clientes
          </Label>
          <Input
            id="totalClientes"
            type="number"
            value={totalClientes}
            onChange={(e) => setTotalClientes(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="avaliacaoMedia" className="text-green-800">
            Avaliação Média
          </Label>
          <Input
            id="avaliacaoMedia"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={avaliacaoMedia}
            onChange={(e) => setAvaliacaoMedia(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="latitude" className="text-green-800">
            Latitude
          </Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="longitude" className="text-green-800">
            Longitude
          </Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="bg-green-50"
          />
        </div>
        <div>
          <Label htmlFor="logo" className="text-green-800">
            Logo do Fornecedor
          </Label>
          <div className="mt-1 flex items-center">
            <label
              htmlFor="logo"
              className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span>Escolher arquivo</span>
            </label>
            <input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
            <span className="ml-3 text-sm text-green-600">{logo ? logo.name : "Nenhum arquivo selecionado"}</span>
          </div>
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Fornecedor"}
        </Button>
      </form>
    </div>
  )
}

