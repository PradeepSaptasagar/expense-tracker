# Expense Tracker

A full-stack personal finance web application built end-to-end — REST API backend in Django, React.js frontend, PostgreSQL database. Designed to demonstrate production-style full-stack development: clean API design, real database schema management, and a dynamic frontend consuming live data.

---

## What it does

Most expense apps are either too simple (spreadsheets) or too complex (full accounting software). This one hits the middle — a focused tool that lets you log, filter, and manage personal expenses in real time, with a clean category system and date-range filtering built into the API layer, not just the UI.

---

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Django, Django REST Framework |
| Frontend | React.js |
| Database | PostgreSQL |
| API | RESTful — full CRUD |
| Version control | Git, GitHub |

---

## Features

- Add, edit, and delete expenses via a dynamic React UI
- Filter by category (Food, Transport, Shopping, Bills, Health, Other) and date range
- Real-time total calculation — updates instantly on any change
- Category badges with visual distinction
- Server-side filtering via query parameters — not client-side hacks
- Full CRUD REST API with 5 endpoints

---

## API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses/` | List all expenses |
| POST | `/api/expenses/` | Create a new expense |
| GET | `/api/expenses/{id}/` | Retrieve a single expense |
| PUT | `/api/expenses/{id}/` | Update an expense |
| DELETE | `/api/expenses/{id}/` | Delete an expense |

### Query parameters (server-side filtering)

```
?category=food
?date_from=2026-01-01
?date_to=2026-05-31
?category=food&date_from=2026-01-01&date_to=2026-05-31
```

Filtering is handled in the Django viewset — the API returns only matching records, keeping the frontend lean.

---

## Project structure

```
expense-tracker/
├── expense_tracker/          # Django backend
│   ├── expenses/
│   │   ├── models.py         # Expense schema
│   │   ├── serializers.py    # DRF serializers
│   │   ├── views.py          # API viewsets with filtering logic
│   │   └── migrations/
│   ├── expense_tracker/
│   │   ├── settings.py
│   │   └── urls.py           # API routing
│   └── manage.py
│
└── expense-frontend/         # React frontend
    └── src/
        ├── App.js            # Main component — API integration & state
        ├── App.css
        └── index.js
```

---

## Running locally

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL

### 1. Clone the repo

```bash
git clone https://github.com/PradeepSaptasagar/expense-tracker.git
cd expense-tracker
```

### 2. Backend setup

```bash
cd expense_tracker
pip install django djangorestframework django-cors-headers psycopg2-binary
```

Create a `.env` file in `expense_tracker/` with your database credentials:

```
DB_NAME=expense_db
DB_USER=expense_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Set up the PostgreSQL database:

```sql
CREATE DATABASE expense_db;
CREATE USER expense_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE expense_db TO expense_user;
```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

API will be live at `http://localhost:8000/api/`

### 3. Frontend setup

```bash
cd expense-frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## What I built and learned

- Designed the full data lifecycle: schema → ORM migrations → serializers → API endpoints → React consumption
- Implemented server-side filtering in Django viewsets using query parameters — cleaner and more scalable than frontend filtering
- Managed CORS between Django backend and React frontend in a local dev environment
- Validated end-to-end API behaviour using Postman before wiring up the frontend
- Applied REST principles: consistent URL structure, correct HTTP verbs, appropriate status codes

---

## Author

**Pradeep Saptasagar**
