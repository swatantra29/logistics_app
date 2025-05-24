from flask_mysqldb import MySQL

mysql = MySQL()

def init_db(app):
    app.config.from_object('config.Config')
    mysql.init_app(app)
    with app.app_context():
        create_tables()

def create_tables():
    with mysql.connection.cursor() as cursor:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Supplier (
                SupplierID INT AUTO_INCREMENT PRIMARY KEY,
                SupplierName VARCHAR(255) NOT NULL,
                ContactNumber VARCHAR(50),
                Email VARCHAR(255),
                Address VARCHAR(255)
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS LogisticsItem (
                ItemID INT AUTO_INCREMENT PRIMARY KEY,
                ItemName VARCHAR(255) NOT NULL,
                Quantity INT,
                Unit VARCHAR(50),
                Category VARCHAR(100),
                SupplierID INT,
                FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Shipment (
                ShipmentID INT AUTO_INCREMENT PRIMARY KEY,
                ItemID INT,
                SupplierID INT,
                ShipmentDate DATE,
                Status VARCHAR(50),
                Carrier VARCHAR(100),
                TrackingNumber VARCHAR(100),
                FOREIGN KEY (ItemID) REFERENCES LogisticsItem(ItemID),
                FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
            )
        ''')
        mysql.connection.commit()