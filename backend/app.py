# -*- coding: utf-8 -*-
from flask import Flask
from routes import register_routes
from models import init_db

app = Flask(__name__)

# Initialize DB
init_db(app)

# Register routes
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
