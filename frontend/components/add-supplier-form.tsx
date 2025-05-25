"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function AddSupplierForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    SupplierName: "",
    ContactNumber: "",
    Email: "",
    Address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newSupplier = await response.json()
        toast({
          title: "Success",
          description: "Supplier added successfully.",
        })

        // Reset form
        setFormData({
          SupplierName: "",
          ContactNumber: "",
          Email: "",
          Address: "",
        })
      } else {
        throw new Error("Failed to add supplier")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add supplier. Please try again.",
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
          <Label htmlFor="SupplierName">Supplier Name</Label>
          <Input
            id="SupplierName"
            name="SupplierName"
            placeholder="Enter supplier name"
            value={formData.SupplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ContactNumber">Contact Number</Label>
          <Input
            id="ContactNumber"
            name="ContactNumber"
            placeholder="Enter contact number"
            value={formData.ContactNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="Email">Email</Label>
        <Input
          id="Email"
          name="Email"
          type="email"
          placeholder="Enter email address"
          value={formData.Email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="Address">Address</Label>
        <Textarea
          id="Address"
          name="Address"
          placeholder="Enter supplier address"
          value={formData.Address}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Supplier"}
      </Button>
    </form>
  )
}
