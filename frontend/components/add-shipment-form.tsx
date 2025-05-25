"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Supplier, LogisticsItem } from "@/types/database"

export function AddShipmentForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [items, setItems] = useState<LogisticsItem[]>([])
  const [formData, setFormData] = useState({
    ItemID: "",
    SupplierID: "",
    ShipmentDate: "",
    Status: "",
    Carrier: "",
    TrackingNumber: "",
  })

  useEffect(() => {
    // Fetch suppliers and items for the dropdowns
    const fetchData = async () => {
      try {
        const [suppliersRes, itemsRes] = await Promise.all([fetch("/api/suppliers"), fetch("/api/items")])

        if (suppliersRes.ok) {
          const suppliersData = await suppliersRes.json()
          setSuppliers(suppliersData)
        }

        if (itemsRes.ok) {
          const itemsData = await itemsRes.json()
          setItems(itemsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ItemID: Number.parseInt(formData.ItemID),
          SupplierID: Number.parseInt(formData.SupplierID),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Shipment added successfully.",
        })

        // Reset form
        setFormData({
          ItemID: "",
          SupplierID: "",
          ShipmentDate: "",
          Status: "",
          Carrier: "",
          TrackingNumber: "",
        })
      } else {
        throw new Error("Failed to add shipment")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add shipment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ItemID">Item</Label>
          <Select value={formData.ItemID} onValueChange={(value) => handleSelectChange("ItemID", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.ItemID} value={item.ItemID.toString()}>
                  {item.ItemName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="SupplierID">Supplier</Label>
          <Select value={formData.SupplierID} onValueChange={(value) => handleSelectChange("SupplierID", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.SupplierID} value={supplier.SupplierID.toString()}>
                  {supplier.SupplierName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ShipmentDate">Shipment Date</Label>
          <Input
            id="ShipmentDate"
            name="ShipmentDate"
            type="date"
            value={formData.ShipmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Status">Status</Label>
          <Select value={formData.Status} onValueChange={(value) => handleSelectChange("Status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="Carrier">Carrier</Label>
          <Input
            id="Carrier"
            name="Carrier"
            placeholder="Enter carrier name"
            value={formData.Carrier}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="TrackingNumber">Tracking Number</Label>
          <Input
            id="TrackingNumber"
            name="TrackingNumber"
            placeholder="Enter tracking number"
            value={formData.TrackingNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Shipment"}
      </Button>
    </form>
  )
}
