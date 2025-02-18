"use client"

import { useState, useEffect } from "react"
import { SupplierCard } from "@/components/supplier-card"
import { SupplierComparison } from "@/components/supplier-comparison"
import { SupplierMap } from "@/components/supplier-map"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, List } from "lucide-react"

interface Supplier {
  id: number
  name: string
  logo: string
  state: string
  costPerKwh: number
  minKwhLimit: number
  totalCustomers: number
  averageRating: number
  latitude: number
  longitude: number
}

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [comparedSuppliers, setComparedSuppliers] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockSuppliers: Supplier[] = [
      {
        id: 1,
        name: "EcoEnergia Brasil",
        logo: "/placeholder.svg",
        state: "São Paulo",
        costPerKwh: 0.65,
        minKwhLimit: 5000,
        totalCustomers: 500000,
        averageRating: 4.5,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        id: 2,
        name: "Força Verde",
        logo: "/placeholder.svg",
        state: "Rio de Janeiro",
        costPerKwh: 0.68,
        minKwhLimit: 10000,
        totalCustomers: 750000,
        averageRating: 4.2,
        latitude: -22.9068,
        longitude: -43.1729,
      },
      {
        id: 3,
        name: "Energia Sustentável",
        logo: "/placeholder.svg",
        state: "Minas Gerais",
        costPerKwh: 0.62,
        minKwhLimit: 3000,
        totalCustomers: 300000,
        averageRating: 4.7,
        latitude: -19.9167,
        longitude: -43.9345,
      },
      {
        id: 4,
        name: "AmazonPower",
        logo: "/placeholder.svg",
        state: "Amazonas",
        costPerKwh: 0.7,
        minKwhLimit: 2000,
        totalCustomers: 200000,
        averageRating: 4.0,
        latitude: -3.119,
        longitude: -60.0217,
      },
      {
        id: 5,
        name: "Sul Energia",
        logo: "/placeholder.svg",
        state: "Rio Grande do Sul",
        costPerKwh: 0.63,
        minKwhLimit: 4000,
        totalCustomers: 400000,
        averageRating: 4.6,
        latitude: -30.0346,
        longitude: -51.2177,
      },
    ]
    setSuppliers(mockSuppliers)
  }, [])

  const handleCompare = (id: number) => {
    setComparedSuppliers((prev) =>
      prev.includes(id) ? prev.filter((supplierId) => supplierId !== id) : [...prev, id].slice(-2),
    )
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-end space-x-4">
        <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
          <List className="w-4 h-4 mr-2" />
          List View
        </Button>
        <Button variant={viewMode === "map" ? "default" : "outline"} onClick={() => setViewMode("map")}>
          <MapPin className="w-4 h-4 mr-2" />
          Map View
        </Button>
      </div>
      <AnimatePresence>
        {comparedSuppliers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SupplierComparison
              suppliers={suppliers.filter((s) => comparedSuppliers.includes(s.id))}
              onRemove={handleCompare}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {viewMode === "list" ? (
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {suppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onCompare={handleCompare}
              isCompared={comparedSuppliers.includes(supplier.id)}
            />
          ))}
        </motion.div>
      ) : (
        <SupplierMap suppliers={suppliers} />
      )}
    </div>
  )
}

