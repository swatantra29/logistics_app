"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryTable } from "@/components/inventory-table"
import type { InventoryItem } from "@/types/inventory"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [supplierFilter, setSupplierFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch inventory data from the backend
    const fetchInventoryData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:5000/search")
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data")
        }
        const data = await response.json()
        setInventoryData(data)
        setFilteredData(data)
      } catch (error) {
        console.error("Error fetching inventory data:", error)
        setInventoryData([])
        setFilteredData([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchInventoryData()
  }, [])

  // Get unique categories, suppliers, and statuses for the filters
  const categories = [...new Set(inventoryData.map((item) => item.Category))]
  const suppliers = [...new Set(inventoryData.map((item) => item.Supplier?.SupplierName).filter(Boolean))]
  const statuses = [...new Set(inventoryData.map((item) => item.Shipment?.Status).filter(Boolean))]

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (searchTerm) params.append("item_name", searchTerm)
      if (categoryFilter) params.append("category", categoryFilter)
      if (supplierFilter) params.append("supplier_name", supplierFilter)
      if (statusFilter) params.append("status", statusFilter)

      // Fetch filtered results from backend
      const response = await fetch(`http://localhost:5000/search?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch search results")
      }

      const results = await response.json()
      setFilteredData(results)
    } catch (error) {
      console.error("Error searching inventory:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetFilters = async () => {
    setSearchTerm("")
    setCategoryFilter("")
    setSupplierFilter("")
    setStatusFilter("")
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/search")
      if (!response.ok) {
        throw new Error("Failed to fetch inventory data")
      }
      const data = await response.json()
      setFilteredData(data)
    } catch (error) {
      console.error("Error resetting filters:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Search Inventory</h1>
        <p className="text-muted-foreground">Find and filter items in your inventory database.</p>
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
                  placeholder="Search by name, lot number, or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Suppliers</SelectItem>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
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

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            {isLoading ? "Loading results..." : `Found ${filteredData.length} items matching your criteria`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <InventoryTable data={filteredData} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
