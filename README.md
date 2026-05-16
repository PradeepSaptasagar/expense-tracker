# Expense Tracker — Full Stack Web Application

A full-stack expense tracking web application built with Django REST Framework (backend) and React.js (frontend), connected to a PostgreSQL database.

> Built to demonstrate end-to-end full-stack development skills using Python, Django, React, REST APIs, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Django, Django REST Framework |
| Frontend | React.js |
| Database | PostgreSQL |
| API | RESTful API |
| Version Control | Git, GitHub |

---

## Features

- Add, edit, and delete expenses
- Filter expenses by category and date range
- Real-time total calculation
- Category badges (Food, Transport, Shopping, Bills, Health, Other)
- REST API with full CRUD operations
- React frontend consuming Django API

---

## Project Structure

expense-tracker/
├── expense_tracker/         # Django backend
│   ├── expenses/
│   │   ├── models.py        # Expense data model
│   │   ├── serializers.py   # DRF serializers
│   │   ├── views.py         # API viewsets with filtering
│   │   └── migrations/
│   ├── expense_tracker/
│   │   ├── settings.py
│   │   └── urls.py          # API routing
│   └── manage.py
│
└── expense-frontend/        # React frontend
└── src/
├── App.js           # Main component with API integration
├── App.css          # Styling
└── index.js

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses/` | List all expenses |
| POST | `/api/expenses/` | Create a new expense |
| GET | `/api/expenses/{id}/` | Get single expense |
| PUT | `/api/expenses/{id}/` | Update an expense |
| DELETE | `/api/expenses/{id}/` | Delete an expense |

### Query Parameters (filtering)
- `?category=food` — filter by category
- `?date_from=2026-01-01` — filter from date
- `?date_to=2026-05-16` — filter to date

---

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js
- PostgreSQL

### Backend Setup

```bash
cd expense_tracker
pip install django djangorestframework django-cors-headers psycopg2-binary
```

Create PostgreSQL database:
```sql
CREATE DATABASE expense_db;
CREATE USER expense_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE expense_db TO expense_user;
```

Run migrations and start server:
```bash
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd expense-frontend
npm install
npm start
```

App runs at `http://localhost:3000` — backend API at `http://localhost:8000/api/`

---

## Author

**Pradeep Saptasagar**  
