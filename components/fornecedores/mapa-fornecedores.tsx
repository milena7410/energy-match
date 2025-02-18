"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Fornecedor {
  id: number
  nome: string
  latitude: number
  longitude: number
  custoKwh: number
}

interface MapaFornecedoresProps {
  fornecedores: Fornecedor[]
}

function MarkerLayer({ fornecedores }: { fornecedores: Fornecedor[] }) {
  const map = useMap()

  useEffect(() => {
    const raioIcon = L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-yellow-500">
          <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
        </svg>
      `,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    })

    fornecedores.forEach((fornecedor) => {
      L.marker([fornecedor.latitude, fornecedor.longitude], { icon: raioIcon })
        .addTo(map)
        .bindTooltip(
          `
          <div class="text-gray-900">
            <h3 class="font-bold">${fornecedor.nome}</h3>
            <p>Custo por kWh: R$ ${fornecedor.custoKwh.toFixed(2)}</p>
          </div>
        `,
          {
            permanent: false,
            direction: "top",
            offset: [0, -32],
            className: "custom-tooltip",
          },
        )
    })

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })
    }
  }, [map, fornecedores])

  return null
}

export function MapaFornecedores({ fornecedores }: MapaFornecedoresProps) {
  const center = [-14.235, -51.9253] // Coordenadas aproximadas do centro do Brasil
  const zoom = 4

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <MapContainer center={center} zoom={zoom} style={{ height: "500px", width: "100%" }} className="rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerLayer fornecedores={fornecedores} />
      </MapContainer>
    </div>
  )
}

