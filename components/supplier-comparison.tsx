"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface Supplier {
  id: number
  name: string
  costPerKwh: number
  minKwhLimit: number
  totalCustomers: number
  averageRating: number
}

interface SupplierComparisonProps {
  suppliers: Supplier[]
  onRemove: (id: number) => void
}

export function SupplierComparison({ suppliers, onRemove }: SupplierComparisonProps) {
  const data = suppliers.map((s) => ({
    name: s.name,
    "Cost per kWh": s.costPerKwh,
    "Minimum kWh": s.minKwhLimit,
    "Total Customers": s.totalCustomers,
    "Average Rating": s.averageRating,
  }))

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Supplier Comparison
          <Button variant="ghost" size="sm" onClick={() => suppliers.forEach((s) => onRemove(s.id))}>
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Cost per kWh" fill="#8884d8" />
              <Bar dataKey="Minimum kWh" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid gap-4 md:grid-cols-2">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{supplier.name}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => onRemove(supplier.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-1 text-sm">
                    <dt>Cost per kWh:</dt>
                    <dd className="font-medium">${supplier.costPerKwh.toFixed(2)}</dd>
                    <dt>Minimum kWh:</dt>
                    <dd className="font-medium">{supplier.minKwhLimit.toLocaleString()}</dd>
                    <dt>Total Customers:</dt>
                    <dd className="font-medium">{supplier.totalCustomers.toLocaleString()}</dd>
                    <dt>Average Rating:</dt>
                    <dd className="font-medium">{supplier.averageRating.toFixed(1)} / 5.0</dd>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

