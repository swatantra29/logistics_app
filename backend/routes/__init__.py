from flask import Blueprint, request, jsonify
from models import mysql

# Create a blueprint for routes
main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Welcome to the Logistics Management System!"

# Search items by category, item name, or lot number
@main.route('/search', methods=['GET'])
def search_items():
    item_name = request.args.get('item_name')
    supplier_name = request.args.get('supplier_name')
    status = request.args.get('status')
    query = '''
        SELECT li.ItemID, li.ItemName, li.Quantity, li.Unit, li.Category,
               s.SupplierID, s.SupplierName, s.ContactNumber, s.Email, s.Address,
               sh.ShipmentID, sh.ShipmentDate, sh.Status, sh.Carrier, sh.TrackingNumber
        FROM LogisticsItem li
        LEFT JOIN Supplier s ON li.SupplierID = s.SupplierID
        LEFT JOIN Shipment sh ON li.ItemID = sh.ItemID
        WHERE 1=1
    '''
    params = []
    if item_name:
        query += ' AND li.ItemName LIKE %s'
        params.append(f"%{item_name}%")
    if supplier_name:
        query += ' AND s.SupplierName LIKE %s'
        params.append(f"%{supplier_name}%")
    if status:
        query += ' AND sh.Status = %s'
        params.append(status)
    cursor = mysql.connection.cursor()
    cursor.execute(query, params)
    results = cursor.fetchall()
    cursor.close()
    items = []
    for row in results:
        items.append({
            'ItemID': row[0],
            'ItemName': row[1],
            'Quantity': row[2],
            'Unit': row[3],
            'Category': row[4],
            'Supplier': {
                'SupplierID': row[5],
                'SupplierName': row[6],
                'ContactNumber': row[7],
                'Email': row[8],
                'Address': row[9]
            },
            'Shipment': {
                'ShipmentID': row[10],
                'ShipmentDate': row[11],
                'Status': row[12],
                'Carrier': row[13],
                'TrackingNumber': row[14]
            }
        })
    return jsonify(items)

def register_routes(app):
    app.register_blueprint(main)