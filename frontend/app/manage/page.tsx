"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddSupplierForm } from "@/components/add-supplier-form"
import { AddItemForm } from "@/components/add-item-form"
import { AddShipmentForm } from "@/components/add-shipment-form"

export default function ManagePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Data</h1>
        <p className="text-muted-foreground">Add new suppliers, items, and shipments to your database.</p>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Add Supplier</TabsTrigger>
          <TabsTrigger value="items">Add Item</TabsTrigger>
          <TabsTrigger value="shipments">Add Shipment</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Add New Supplier</CardTitle>
              <CardDescription>Register a new supplier in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <AddSupplierForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Add New Item</CardTitle>
              <CardDescription>Add a new logistics item to inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <AddItemForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Add New Shipment</CardTitle>
              <CardDescription>Create a new shipment record</CardDescription>
            </CardHeader>
            <CardContent>
              <AddShipmentForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
