# Phase II Task Todo - Full Stack Web Application

## Project Overview

A modern multi-user web application for task management, transformed from a console application to a full-stack solution with persistent storage and authentication.

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16+ (App Router) |
| Backend | Python FastAPI |
| ORM | SQLModel |
| Database | Neon Serverless PostgreSQL |
| Authentication | Better Auth |
| Spec-Driven | Claude Code + Spec-Kit Plus |

## Features

- User authentication (signup/signin)
- Task management (create, read, update, delete)
- Multi-user support with data isolation
- RESTful API endpoints
- Responsive web interface
- Persistent storage in PostgreSQL

## Project Structure

```
phase-II-Task-todo/
├── backend/          # FastAPI backend services
├── frontend/         # Next.js frontend application
├── specs/            # Feature specifications and plans
└── history/          # Development history and ADRs
```

## Development Workflow

This project follows the Agentic Dev Stack workflow:
1. Write spec
2. Generate plan
3. Break into tasks
4. Implement via Claude Code

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Authentication

Better Auth is configured to issue JWT tokens for secure API communication:
1. User logs in → Better Auth creates session and issues JWT
2. Frontend includes JWT in Authorization header
3. Backend verifies token and filters data by user

## License

MIT
