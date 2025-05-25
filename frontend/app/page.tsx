"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package2, Truck, Users, BarChart3 } from "lucide-react"
import type { Supplier, LogisticsItem, Shipment } from "@/types/database"
import { SuppliersTable } from "@/components/suppliers-table"
import { ItemsTable } from "@/components/items-table"
import { ShipmentsTable } from "@/components/shipments-table"

export default function Home() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [items, setItems] = useState<LogisticsItem[]>([])
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData()
  }, [])

  // Calculate summary statistics
  const totalSuppliers = suppliers.length
  const totalItems = items.reduce((sum, item) => sum + item.Quantity, 0)
  const totalShipments = shipments.length
  const pendingShipments = shipments.filter((s) => s.Status === "Pending" || s.Status === "In Transit").length

  // Get recent shipments (last 5)
  const recentShipments = [...shipments]
    .sort((a, b) => new Date(b.ShipmentDate).getTime() - new Date(a.ShipmentDate).getTime())
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your logistics management dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 animate-pulse bg-muted rounded"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{totalSuppliers}</div>
                <p className="text-xs text-muted-foreground">Active suppliers</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 animate-pulse bg-muted rounded"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground">Items in inventory</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 animate-pulse bg-muted rounded"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{totalShipments}</div>
                <p className="text-xs text-muted-foreground">All time shipments</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 animate-pulse bg-muted rounded"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{pendingShipments}</div>
                <p className="text-xs text-muted-foreground">Awaiting delivery</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Latest shipment activities</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ShipmentsTable data={recentShipments} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Manage your supplier network</CardDescription>
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
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logistics Items</CardTitle>
              <CardDescription>Inventory management</CardDescription>
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
        <TabsContent value="shipments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Shipments</CardTitle>
              <CardDescription>Track all shipment activities</CardDescription>
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
