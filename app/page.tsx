import { ListaFornecedores } from "@/components/fornecedores/lista-fornecedores"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Comparador de Fornecedores de Energia</h1>
        <ListaFornecedores />
      </div>
    </div>
  )
}

