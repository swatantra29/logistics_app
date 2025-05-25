"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Supplier } from "@/types/database"

export function AddItemForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [formData, setFormData] = useState({
    ItemName: "",
    Quantity: "",
    Unit: "",
    Category: "",
    SupplierID: "",
  })

  useEffect(() => {
    // Fetch suppliers for the dropdown
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers")
        if (response.ok) {
          const data = await response.json()
          setSuppliers(data)
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error)
      }
    }

    fetchSuppliers()
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
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Quantity: Number.parseInt(formData.Quantity),
          SupplierID: Number.parseInt(formData.SupplierID),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item added successfully.",
        })

        // Reset form
        setFormData({
          ItemName: "",
          Quantity: "",
          Unit: "",
          Category: "",
          SupplierID: "",
        })
      } else {
        throw new Error("Failed to add item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
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
          <Label htmlFor="ItemName">Item Name</Label>
          <Input
            id="ItemName"
            name="ItemName"
            placeholder="Enter item name"
            value={formData.ItemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Category">Category</Label>
          <Input
            id="Category"
            name="Category"
            placeholder="Enter category"
            value={formData.Category}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="Quantity">Quantity</Label>
          <Input
            id="Quantity"
            name="Quantity"
            type="number"
            placeholder="Enter quantity"
            value={formData.Quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Unit">Unit</Label>
          <Input
            id="Unit"
            name="Unit"
            placeholder="e.g., pieces, kg, liters"
            value={formData.Unit}
            onChange={handleChange}
            required
          />
        </div>
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

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Item"}
      </Button>
    </form>
  )
}
