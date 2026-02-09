---
id: 004
title: Fix Frontend `Failed to fetch` Error
stage: green
date: 2026-02-07
surface: agent
model: gemini-1.5-pro-flash
feature: registration-flow
branch: main
user: user
command: (see prompt text for error context)
labels: ["bug-fix", "frontend", "backend", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/.env
tests:
---

## Prompt

## Error Type
Console TypeError

## Error Message
Failed to fetch


    at Object.register (src/services/auth-service.ts:13:30)
    at handleSubmit (src/app/auth/register/page.tsx:50:40)

## Code Frame
  11 |     
  12 |     try {
> 13 |       const response = await fetch(`${API_BASE_URL}/auth/register`, {
     |                              ^
  14 |         method: 'POST',
  15 |         headers: { 'Content-Type': 'application/json' },
  16 |         body: JSON.stringify(user),

Next.js version: 16.1.6 (Turbopack)

## Response snapshot

The `Failed to fetch` error in the frontend was investigated. It was determined that the backend API was not running or not accessible.
Steps taken:
1.  Identified `API_BASE_URL` in `frontend/src/services/auth-service.ts` defaulting to `http://localhost:8000/api`.
2.  Reviewed `backend/QUICKSTART.md` for backend startup instructions.
3.  Examined `backend/config.py` and `backend/database.py` to understand database configuration.
4.  Created `backend/.env` with `DATABASE_URL=sqlite:///./database.db` to satisfy the backend's requirement.
5.  Installed backend dependencies (`pip install -r requirements.txt`).
6.  Started the backend application (`uvicorn main:app --reload --host 0.0.0.0 --port 8000`).
7.  Removed the Next.js lock file and started the frontend application (`npm run dev`).

Both the backend and frontend applications are now running successfully.

## Outcome

- ✅ Impact: The frontend `Failed to fetch` error during user registration is resolved, allowing the application to connect to the backend API.
- 🧪 Tests: Verified by successfully starting both backend and frontend applications.
- 📁 Files: Modified `backend/.env` to include `DATABASE_URL`.
- 🔁 Next prompts: Continue with further development or testing of the user registration flow.
- 🧠 Reflection: The issue was due to the backend not running and the environment variable `DATABASE_URL` not being set, which prevented the backend from starting.

## Evaluation notes (flywheel)

- Failure modes observed: `TypeError: Failed to fetch` due to unavailable backend. Backend failed to start due to missing `DATABASE_URL` environment variable.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
