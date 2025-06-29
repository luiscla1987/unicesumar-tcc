# Bakery App Backend

This is the backend API for the Bakery App, built with Django and Django REST Framework.

## Requirements

- Python 3.8+
- PostgreSQL

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bakery-app.git
cd bakery-app/backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a .env file in the backend directory with the following variables:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/bakery
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

## Running the Development Server

```bash
python manage.py runserver
```

The API will be available at http://localhost:8000/api/

## API Endpoints

- `/api/categories/` - List and create categories
- `/api/products/` - List and create products
- `/api/orders/` - List and create orders
  - `/api/orders/{id}/add_item/` - Add item to order
  - `/api/orders/{id}/remove_item/` - Remove item from order

## Authentication

The API uses session-based authentication. You need to be authenticated to access most endpoints except for listing products and categories. 