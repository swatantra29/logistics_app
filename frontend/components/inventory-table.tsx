"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"

interface InventoryTableProps {
  data: InventoryItem[]
}

export function InventoryTable({ data }: InventoryTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getStockStatus = (available: number) => {
    if (available <= 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (available < 10) return { label: "Low Stock", variant: "warning" as const }
    return { label: "In Stock", variant: "success" as const }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Shipment Status</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Tracking #</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.ItemID}>
                <TableCell className="font-medium">{item.ItemID}</TableCell>
                <TableCell>{item.ItemName}</TableCell>
                <TableCell>{item.Category}</TableCell>
                <TableCell>{item.Unit}</TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>{item.Supplier?.SupplierName || "-"}</TableCell>
                <TableCell>{item.Shipment?.Status || "-"}</TableCell>
                <TableCell>{item.Shipment?.Carrier || "-"}</TableCell>
                <TableCell>{item.Shipment?.TrackingNumber || "-"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
