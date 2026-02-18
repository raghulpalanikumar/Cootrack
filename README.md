# Support Ticket System (Assessment Submission)

A fully containerized Support Ticket System built with Django (Backend), React (Frontend), and Docker. This system features an AI-powered classification engine that auto-suggests ticket categories and priorities using an LLM.

## 🚀 Quick Start (Evaluation)

As per the requirements, you can run the entire application with a single command:

```bash
# Ensure you have a .env file or set OPENAI_API_KEY in your shell
# Example .env content:
# OPENAI_API_KEY=sk-...

docker-compose up --build
```

Access the application at:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 🏗 Architecture & Design Decisions

### 1. LLM Integration (The Core Differentiator)
**Choice of LLM:** OpenAI GPT-3.5-Turbo / GPT-4
- **Why?** It offers the best balance of speed, cost, and instruction following capability for returning structured JSON data.
- **Implementation:** 
  - The `/api/tickets/classify/` endpoint sends a structured prompt to the LLM requesting a JSON response.
  - **Graceful Error Handling:** If the LLM API fails, times out, or returns invalid JSON, the system logs the error and returns default values (`general`/`low`) so the user can still proceed without interruption.
  - **Validation:** The returned category and priority are validated against the database choices to prevent invalid data injection.

### 2. Backend (Django + DRF)
- **Database-Level Constraints:** All fields (`title`, `description`, choices for `priority`/`category`) are enforced at the PostgreSQL level via Django models.
- **Efficient Stats Aggregation:** The stats endpoint uses Django ORM's `aggregate` and `annotate` functions (translating to SQL `COUNT`, `AVG`, `GROUP BY`) to perform calculations directly in the database. **No Python loops were used for aggregation**, ensuring O(1) performance relative to application memory.

### 3. Frontend (React)
- **Optimistic UI:** The Dashboard auto-refreshes every 5 seconds to provide near real-time updates.
- **Component Separation:** Clean separation between `TicketList`, `TicketForm`, and `Dashboard`.
- **User Experience:** The form automatically classifies the ticket when the user finishes typing the description (on blur), providing a seamless "magic" feel.

---

## 🛠 Technology Stack

- **Backend:** Django 5, Django REST Framework
- **Database:** PostgreSQL 15
- **Frontend:** React 18, Vite
- **Containerization:** Docker, Docker Compose
- **LLM:** OpenAI API (configurable via `OPENAI_API_KEY`)

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tickets/` | Create a new ticket (201 Created) |
| `GET` | `/api/tickets/` | List tickets (Newest first). Supports filters: `?category=`, `?priority=`, `?status=`, `?search=` |
| `PATCH` | `/api/tickets/<id>/` | Update ticket status or details |
| `GET` | `/api/tickets/stats/` | Get aggregated dashboard metrics |
| `POST` | `/api/tickets/classify/` | LLM Ticket Classification |

## 📝 Environment Variables

The `docker-compose.yml` is configured to pick up the following environment variables from your shell or a `.env` file:

- `OPENAI_API_KEY`: Required for LLM classification features.
- `GEMINI_API_KEY`: (Optional) Alternative LLM provider support.
- `POSTGRES_...`: Database credentials (pre-configured defaults in docker-compose for ease of running).

---

**Author:** Raghul Palanikumar