export interface Supplier {
  SupplierID: number;
  SupplierName: string;
  ContactNumber: string;
  Email: string;
  Address: string;
}

export interface Shipment {
  ShipmentID: number;
  ShipmentDate: string;
  Status: string;
  Carrier: string;
  TrackingNumber: string;
}

export interface InventoryItem {
  ItemID: number;
  ItemName: string;
  Quantity: number;
  Unit: string;
  Category: string;
  Supplier: Supplier;
  Shipment: Shipment;
}
