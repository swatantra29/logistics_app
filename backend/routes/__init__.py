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

# --- SUPPLIERS ENDPOINTS ---
@main.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT SupplierID, SupplierName, ContactNumber, Email, Address FROM Supplier')
    suppliers = [
        {
            'SupplierID': row[0],
            'SupplierName': row[1],
            'ContactNumber': row[2],
            'Email': row[3],
            'Address': row[4],
        }
        for row in cursor.fetchall()
    ]
    cursor.close()
    return jsonify(suppliers)

@main.route('/api/suppliers', methods=['POST'])
def add_supplier():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute(
        'INSERT INTO Supplier (SupplierName, ContactNumber, Email, Address) VALUES (%s, %s, %s, %s)',
        (data['SupplierName'], data['ContactNumber'], data['Email'], data['Address'])
    )
    mysql.connection.commit()
    supplier_id = cursor.lastrowid
    cursor.close()
    return jsonify({ 'SupplierID': supplier_id, **data }), 201

# --- ITEMS ENDPOINTS ---
@main.route('/api/items', methods=['GET'])
def get_items():
    cursor = mysql.connection.cursor()
    cursor.execute('''
        SELECT li.ItemID, li.ItemName, li.Quantity, li.Unit, li.Category, li.SupplierID, s.SupplierName
        FROM LogisticsItem li
        LEFT JOIN Supplier s ON li.SupplierID = s.SupplierID
    ''')
    items = [
        {
            'ItemID': row[0],
            'ItemName': row[1],
            'Quantity': row[2],
            'Unit': row[3],
            'Category': row[4],
            'SupplierID': row[5],
            'SupplierName': row[6],
        }
        for row in cursor.fetchall()
    ]
    cursor.close()
    return jsonify(items)

@main.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute(
        'INSERT INTO LogisticsItem (ItemName, Quantity, Unit, Category, SupplierID) VALUES (%s, %s, %s, %s, %s)',
        (data['ItemName'], data['Quantity'], data['Unit'], data['Category'], data['SupplierID'])
    )
    mysql.connection.commit()
    item_id = cursor.lastrowid
    cursor.close()
    return jsonify({ 'ItemID': item_id, **data }), 201

# --- SHIPMENTS ENDPOINTS ---
@main.route('/api/shipments', methods=['GET'])
def get_shipments():
    cursor = mysql.connection.cursor()
    cursor.execute('''
        SELECT sh.ShipmentID, sh.ItemID, sh.SupplierID, sh.ShipmentDate, sh.Status, sh.Carrier, sh.TrackingNumber,
               li.ItemName, s.SupplierName
        FROM Shipment sh
        LEFT JOIN LogisticsItem li ON sh.ItemID = li.ItemID
        LEFT JOIN Supplier s ON sh.SupplierID = s.SupplierID
    ''')
    shipments = [
        {
            'ShipmentID': row[0],
            'ItemID': row[1],
            'SupplierID': row[2],
            'ShipmentDate': row[3].isoformat() if row[3] else None,
            'Status': row[4],
            'Carrier': row[5],
            'TrackingNumber': row[6],
            'ItemName': row[7],
            'SupplierName': row[8],
        }
        for row in cursor.fetchall()
    ]
    cursor.close()
    return jsonify(shipments)

@main.route('/api/shipments', methods=['POST'])
def add_shipment():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute(
        'INSERT INTO Shipment (ItemID, SupplierID, ShipmentDate, Status, Carrier, TrackingNumber) VALUES (%s, %s, %s, %s, %s, %s)',
        (data['ItemID'], data['SupplierID'], data['ShipmentDate'], data['Status'], data['Carrier'], data['TrackingNumber'])
    )
    mysql.connection.commit()
    shipment_id = cursor.lastrowid
    cursor.close()
    return jsonify({ 'ShipmentID': shipment_id, **data }), 201

def register_routes(app):
    app.register_blueprint(main)