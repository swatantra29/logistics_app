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
import type { LogisticsItem } from "@/types/database"

interface ItemsTableProps {
  data: LogisticsItem[]
}

export function ItemsTable({ data }: ItemsTableProps) {
  const getQuantityStatus = (quantity: number) => {
    if (quantity <= 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (quantity < 10) return { label: "Low Stock", variant: "warning" as const }
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
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No items found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => {
              const status = getQuantityStatus(item.Quantity)
              return (
                <TableRow key={item.ItemID}>
                  <TableCell className="font-medium">{item.ItemID}</TableCell>
                  <TableCell>{item.ItemName}</TableCell>
                  <TableCell>{item.Category}</TableCell>
                  <TableCell className="text-right">{item.Quantity}</TableCell>
                  <TableCell>{item.Unit}</TableCell>
                  <TableCell>{item.SupplierName || `Supplier ${item.SupplierID}`}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit item
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
