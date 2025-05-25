# Logistics Management System

A full-stack web application for managing logistics inventory, suppliers, and shipments. Built with Flask (Python) for the backend, MySQL for the database, and Next.js (React) for the frontend.

## Features
- Manage inventory items, suppliers, and shipments
- Search and filter items by name, supplier, or status
- RESTful API endpoints for CRUD operations
- Modern, responsive frontend UI

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Flask (Python), Flask-MySQL
- **Database:** MySQL

## Database Schema
- **Supplier**: Stores supplier details
- **LogisticsItem**: Stores inventory items
- **Shipment**: Stores shipment records

See `schema.md` and `er-diagram.mmd` for details.

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd dbms_project
```

### 2. Set Up the MySQL Database
- Install MySQL and create a database (e.g., `logistics_db`).
- Import your schema:
  ```sh
  mysql -u <user> -p logistics_db < schema.sql
  ```
- (Optional) Populate with sample data using `backend/populate_sample_data.py` or manual SQL inserts.

### 3. Configure Backend
- Edit `backend/config.py` with your MySQL credentials.
- Install dependencies:
  ```sh
  pip install -r requirements.txt
  ```
- Run the backend server:
  ```sh
  cd backend
  python app.py
  ```

### 4. Configure Frontend
- Edit API URLs in frontend if needed (default proxy is set for local dev).
- Install dependencies:
  ```sh
  cd ../frontend
  pnpm install
  ```
- Run the frontend dev server:
  ```sh
  pnpm dev
  ```

### 5. Access the Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Usage
- Add, view, and manage suppliers, items, and shipments from the web UI.
- Use the search functionality to filter inventory.
- All data is stored in the MySQL database.

## License

This project is licensed under the [MIT License](LICENSE).
