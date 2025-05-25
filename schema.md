# Logistics Management Database Schema

## Supplier
| Column         | Data Type      | Key         |
|---------------|---------------|-------------|
| SupplierID    | INT            | PK          |
| SupplierName  | VARCHAR(255)   |             |
| ContactNumber | VARCHAR(50)    |             |
| Email         | VARCHAR(255)   |             |
| Address       | VARCHAR(255)   |             |

## LogisticsItem
| Column     | Data Type      | Key         |
|------------|---------------|-------------|
| ItemID     | INT           | PK          |
| ItemName   | VARCHAR(255)  |             |
| Quantity   | INT           |             |
| Unit       | VARCHAR(50)   |             |
| Category   | VARCHAR(100)  |             |
| SupplierID | INT           | FK → Supplier(SupplierID) |

## Shipment
| Column         | Data Type      | Key         |
|---------------|---------------|-------------|
| ShipmentID    | INT           | PK          |
| ItemID        | INT           | FK → LogisticsItem(ItemID) |
| SupplierID    | INT           | FK → Supplier(SupplierID)  |
| ShipmentDate  | DATE          |             |
| Status        | VARCHAR(50)   |             |
| Carrier       | VARCHAR(100)  |             |
| TrackingNumber| VARCHAR(100)  |             |
