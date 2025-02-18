"use client"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LightningBoltIcon } from "@/components/lightning-bolt-icon"

interface Supplier {
  id: number
  name: string
  state: string
  costPerKwh: number
  latitude: number
  longitude: number
}

interface SupplierMapProps {
  suppliers: Supplier[]
}

const geoUrl = "/brazil-states.json"

export function SupplierMap({ suppliers }: SupplierMapProps) {
  return (
    <TooltipProvider>
      <div className="relative w-full h-[600px] bg-blue-50 dark:bg-blue-900 rounded-lg overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 900,
            center: [-55, -15],
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#d1fae5"
                  stroke="#047857"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#a7f3d0", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {suppliers.map((supplier) => (
            <Tooltip key={supplier.id}>
              <TooltipTrigger>
                <Marker coordinates={[supplier.longitude, supplier.latitude]}>
                  <motion.g whileHover={{ scale: 1.2 }}>
                    <LightningBoltIcon width={24} height={24} className="text-yellow-400" />
                  </motion.g>
                </Marker>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {supplier.name} - R$ {supplier.costPerKwh.toFixed(2)}/kWh
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </ComposableMap>
      </div>
    </TooltipProvider>
  )
}

