"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Favorito {
  id: number
  nome: string
}

export function Favoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([])

  useEffect(() => {
    // Carregar favoritos do localStorage
    const savedFavoritos = localStorage.getItem("favoritos")
    if (savedFavoritos) {
      setFavoritos(JSON.parse(savedFavoritos))
    }
  }, [])

  const toggleFavorito = (id: number, nome: string) => {
    setFavoritos((prevFavoritos) => {
      const novosFavoritos = prevFavoritos.some((fav) => fav.id === id)
        ? prevFavoritos.filter((fav) => fav.id !== id)
        : [...prevFavoritos, { id, nome }]

      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos))
      return novosFavoritos
    })
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Nenhum favorito adicionado.</p>
      ) : (
        <ul className="space-y-2">
          {favoritos.map((favorito) => (
            <li key={favorito.id} className="flex justify-between items-center">
              <span>{favorito.nome}</span>
              <Button variant="ghost" size="sm" onClick={() => toggleFavorito(favorito.id, favorito.nome)}>
                <Star className="w-4 h-4 fill-yellow-400" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

