export interface Supplier {
  SupplierID: number
  SupplierName: string
  ContactNumber: string
  Email: string
  Address: string
}

export interface LogisticsItem {
  ItemID: number
  ItemName: string
  Quantity: number
  Unit: string
  Category: string
  SupplierID: number
  // Joined data
  SupplierName?: string
}

export interface Shipment {
  ShipmentID: number
  ItemID: number
  SupplierID: number
  ShipmentDate: string
  Status: string
  Carrier: string
  TrackingNumber: string
  // Joined data
  ItemName?: string
  SupplierName?: string
}

export type EntityType = "suppliers" | "items" | "shipments"
