
# Support Ticket System

A comprehensive, containerized Support Ticket System built with **Django**, **React**, and **Docker**. It features automatic ticket categorization and prioritization using **LLM (OpenAI/Gemini)** integration.

## 🚀 Features

-   **Smart Ticket Submission**: 
    -   Real-time AI classification of tickets based on description.
    -   Auto-suggests **Category** (Billing, Technical, Account, General) and **Priority** (Low, Medium, High, Critical).
-   **Dynamic Dashboard**:
    -   View live statistics: Total tickets, Open tickets, Average tickets/day.
    -   Visual breakdowns by Priority and Category.
-   **Ticket Management**:
    -   List view with filtering (Category, Priority, Status) and Search.
    -   One-click status updates (e.g., Open -> In Progress).
-   **Robust Architecture**:
    -   Fully containerized with Docker Compose.
    -   Database-level validation and aggregation.

## 🛠️ Technology Stack

-   **Backend**: Django 5.0, Django REST Framework (DRF)
-   **Database**: PostgreSQL 15
-   **Frontend**: React 19 (Vite), CSS Modules
-   **AI/LLM**: OpenAI GPT-3.5 Turbo (Configurable)
-   **DevOps**: Docker, Docker Compose

## 📋 Setup & Layout

### Prerequisites
-   Docker Desktop installed and running.

### Quick Start
The entire application can be spun up with a single command. The OpenAI API Key is pre-configured in `docker-compose.yml`.

1.  **Clone/Unzip** the project.
2.  **Run Docker Compose**:
    ```bash
    docker-compose up --build
    ```
3.  **Access the Application**:
    -   **Frontend (App)**: [http://localhost:3000](http://localhost:3000)
    -   **Backend (API)**: [http://localhost:8000/api/](http://localhost:8000/api/)
    -   **Django Admin**: [http://localhost:8000/admin/](http://localhost:8000/admin/)

## 🧠 Design Decisions & Evaluation Criteria

### 1. LLM Integration
*   **Choice**: **OpenAI GPT-3.5-turbo**.
*   **Why**: Selected for its speed, cost-effectiveness, and high reliability in producing valid JSON outputs, which is critical for parsing the category and priority.
*   **Implementation**: 
    -   Implemented in `Backend/tickets/views.py`.
    -   Uses a robust prompt to enforce JSON structure.
    -   Includes fallback logic and markdown parsing (removes ```json blocks) to ensure the API never breaks even if the LLM adds formatting.
    -   **Graceful Degradation**: If the API fails, the form remains usable, simply defaulting to "General" and "Low".

### 2. Data Modeling
*   **Database Constraints**: Fields like `max_length` and `choices` are defined in `models.py`.
*   **Validation**: Django enforces these at the database level ensuring data integrity before it ever reaches the application logic.

### 3. Query Logic (Performance)
*   **No Python Loops**: Stats aggregation is performed entirely in the database using Django ORM's `aggregate`, `annotate`, `Count`, and `Avg`.
*   **Efficiency**: This ensures that calculating stats for 100,000 tickets is as fast as for 10, relying on PostgreSQL's optimized query engine rather than iterating objects in Python.

### 4. Code Quality & React Structure
*   **Component Modularity**: Frontend is split into `TicketForm`, `TicketList`, and `Dashboard`.
*   **Hooks**: Uses `useState` and `useEffect` for clean state management.
*   **Service Layer**: All API calls are abstracted in `api.js`, keeping components clean.

## 🧪 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/tickets/` | Create a new ticket |
| `GET` | `/api/tickets/` | List tickets (supports `?search=`, `?category=`, etc.) |
| `GET` | `/api/tickets/stats/` | Get aggregated statistics |
| `POST` | `/api/tickets/classify/` | AI Classification of description |
| `PATCH` | `/api/tickets/<id>/` | Update ticket status |

## 📁 Project Structure

```
├── Backend/
│   ├── tickets/          # Django App
│   │   ├── models.py     # Database Schema
│   │   ├── views.py      # Logic & LLM Integration
│   │   └── ...
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React Components
│   │   ├── api.js        # API Utilities
│   │   └── ...
│   └── Dockerfile
└── docker-compose.yml    # Orchestration
```
"# Cootrack" 
