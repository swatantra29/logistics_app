"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SuppliersTable } from "@/components/suppliers-table"
import { ItemsTable } from "@/components/items-table"
import { ShipmentsTable } from "@/components/shipments-table"
import type { Supplier, LogisticsItem, Shipment } from "@/types/database"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [items, setItems] = useState<LogisticsItem[]>([])
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [entityFilter, setEntityFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      const [suppliersRes, itemsRes, shipmentsRes] = await Promise.all([
        fetch("/api/suppliers"),
        fetch("/api/items"),
        fetch("/api/shipments"),
      ])

      if (suppliersRes.ok) {
        const suppliersData = await suppliersRes.json()
        setSuppliers(suppliersData)
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json()
        setItems(itemsData)
      }

      if (shipmentsRes.ok) {
        const shipmentsData = await shipmentsRes.json()
        setShipments(shipmentsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchAllData()
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("search", searchTerm)
      if (entityFilter !== "all") params.append("entity", entityFilter)

      const response = await fetch(`/api/search?${params.toString()}`)
      if (response.ok) {
        const results = await response.json()
        setSuppliers(results.suppliers || [])
        setItems(results.items || [])
        setShipments(results.shipments || [])
      }
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetFilters = () => {
    setSearchTerm("")
    setEntityFilter("all")
    fetchAllData()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">Search across suppliers, items, and shipments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>Use the filters below to narrow down your search results.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email, tracking number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="suppliers">Suppliers</SelectItem>
                  <SelectItem value="items">Items</SelectItem>
                  <SelectItem value="shipments">Shipments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch}>Search</Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Suppliers ({suppliers.length})</TabsTrigger>
          <TabsTrigger value="items">Items ({items.length})</TabsTrigger>
          <TabsTrigger value="shipments">Shipments ({shipments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Found {suppliers.length} suppliers</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <SuppliersTable data={suppliers} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>Found {items.length} items</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ItemsTable data={items} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Shipments</CardTitle>
              <CardDescription>Found {shipments.length} shipments</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ShipmentsTable data={shipments} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
