# Logistics Management System

This is a web application for managing large-scale item storage and logistics. The system includes a backend built with Flask and MySQL, and a frontend built with React and TypeScript.

## Features
- **Backend**: Flask application with MySQL database integration.
  - API endpoints for searching items based on category, item name, lot number, and more.
- **Frontend**: React application with TypeScript.
  - Visually appealing design with centered elements.
  - Pages: Home, About, Contact, and Search.
- **Database**: MySQL database with the following schema:
  - `category`, `item_name`, `lot_no`, `stock_available`, `stock_sold`, `last_updated`.

## Project Structure
```
backend/
  app.py          # Main Flask application entry point
  config.py       # Configuration file for Flask and MySQL
  models/         # Database models and initialization
  routes/         # API routes
frontend/
  app/            # Main application pages
  components/     # Reusable UI components
  public/         # Static assets
  styles/         # Global styles
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   .\venv\Scripts\activate  # On Windows
   source venv/bin/activate   # On macOS/Linux
   ```
3. Install dependencies:
   ```bash
   pip install flask flask-mysqldb
   ```
4. Configure the MySQL database in `config.py`.
5. Run the Flask application:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   <npm install --legacy-peer-deps> //for version conflicts
   ```
3. Start the development server:
   ```bash
   npm start
   //OR
   npx next start
   //OR
   npx next dev
   ```

## Usage
- Access the application at `http://localhost:3000` for the frontend.
- The backend runs at `http://127.0.0.1:5000`.

## License
This project is licensed under the MIT License.
