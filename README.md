🎫 Support Ticket System (Cootrack)

A fully containerized Support Ticket Management System built with Django, React, and Docker, featuring AI-powered ticket classification using LLM integration.

🚀 Overview

This application enables teams to manage support tickets efficiently with automatic categorization and prioritization powered by Large Language Models (LLMs).

The system is designed with scalability, clean architecture, and production-ready practices in mind.

✨ Key Features
🧠 AI-Powered Classification

Automatically classifies tickets by:

Category: Billing, Technical, Account, General

Priority: Low, Medium, High, Critical

Uses OpenAI (configurable) for real-time intelligent suggestions

Graceful fallback if AI service is unavailable

📊 Dynamic Dashboard

Total Tickets

Open Tickets

Average Tickets per Day

Breakdown by Priority and Category

Database-level aggregation for performance

🗂 Ticket Management

Create, list, and update tickets

Search functionality

Filter by category, priority, and status

One-click status updates

🐳 Containerized Architecture

Fully Dockerized backend, frontend, and database

One-command startup using Docker Compose

Environment variable–based configuration

🛠️ Technology Stack
Layer	Technology
Backend	Django 5 + Django REST Framework
Database	PostgreSQL 15
Frontend	React (Vite)
AI/LLM	OpenAI GPT (configurable)
DevOps	Docker, Docker Compose
📦 Architecture

Backend API handles business logic and AI integration

PostgreSQL ensures data integrity with constraints

React Frontend consumes REST APIs

Docker Compose orchestrates services

⚙️ Setup & Installation
🔹 Prerequisites

Docker Desktop installed and running

Valid OpenAI API key

🔹 Environment Configuration

Create a .env file in the root directory:

OPENAI_API_KEY=your_api_key_here
POSTGRES_DB=cootrack
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres


⚠️ Never commit .env files to version control.

🔹 Run the Application
docker-compose up --build


Once running:

Frontend: http://localhost:3000

Backend API: http://localhost:8000/api/

Django Admin: http://localhost:8000/admin/

🧪 API Endpoints
Method	Endpoint	Description
POST	/api/tickets/	Create ticket
GET	/api/tickets/	List tickets (search & filter supported)
GET	/api/tickets/stats/	Aggregated dashboard statistics
POST	/api/tickets/classify/	AI classification
PATCH	/api/tickets/<id>/	Update ticket
🧠 Design Decisions
LLM Integration

Uses structured JSON prompts to ensure reliable parsing

Handles formatting inconsistencies (e.g., markdown-wrapped JSON)

Includes graceful degradation if API fails

Database Optimization

Aggregations performed using Django ORM (Count, Avg, annotate)

No Python loops for statistics

Ensures performance scalability

Frontend Architecture

Modular components:

TicketForm

TicketList

Dashboard

API abstraction layer (api.js)

Clean state management using React hooks

📁 Project Structure
├── Backend/
│   ├── tickets/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── ...
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── ...
│   └── Dockerfile
├── docker-compose.yml
└── README.md

🔐 Security Notes

API keys are managed via environment variables.

No secrets are stored in version control.

PostgreSQL credentials are configurable via .env.

📈 Scalability Considerations

Stateless backend containers

Database-driven aggregation

Clean separation between UI and API

Docker-ready for production deployment

👨‍💻 Author

Raghul Palanikumar