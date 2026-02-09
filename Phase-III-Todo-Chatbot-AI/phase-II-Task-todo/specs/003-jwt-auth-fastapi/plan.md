# Implementation Plan: JWT Authentication Integration (Frontend & Backend)

**Branch**: `003-jwt-auth-fastapi` | **Date**: 2026-02-06 | **Spec**: [specs/003-jwt-auth-fastapi/spec.md](specs/003-jwt-auth-fastapi/spec.md)
**Input**: Feature specification from `/specs/003-jwt-auth-fastapi/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the end-to-end implementation of JWT authentication, securing all API calls and ensuring user isolation. This involves integrating a "Better Auth" solution with a JWT plugin on the Next.js frontend, modifying the frontend API client to attach JWTs, and implementing backend JWT verification middleware in FastAPI. Backend task routes will be updated to use the authenticated user ID from the token.

## Technical Context

**Language/Version**:
  - Frontend: TypeScript, Next.js 16+, React 18+
  - Backend: Python 3.9+, FastAPI, SQLModel
**Primary Dependencies**:
  - Frontend: Next.js, React, `better-auth` (with JWT plugin), Tailwind CSS
  - Backend: FastAPI, SQLModel, `python-jose` (or `PyJWT` - decision below)
**Storage**:
  - Frontend: Browser storage (e.g., local storage or cookies via `better-auth`) for JWT.
  - Backend: PostgreSQL (or compatible SQL database) for user data.
**Testing**:
  - Frontend: Jest / React Testing Library (for unit/integration), Playwright (for E2E).
  - Backend: pytest.
**Target Platform**: Web browsers (desktop, tablet, mobile) for frontend; Linux server (containerized) for backend.
**Project Type**: Full-stack application (frontend + backend).
**Performance Goals**:
  - Authentication operations (login, registration) complete within 500ms.
  - Protected API calls maintain existing performance goals (p95 < 200ms).
**Constraints**:
  - Use Next.js 16+ App Router structure.
  - Implement all CRUD operations via API client (now with JWT).
  - Responsive design for mobile/desktop.
  - Type-safe API calls and components.
  - No authentication UI/logic yet (use mock `user_id`). (This will be removed and replaced by real auth).
  - Better Auth configured for JWT issuance.
  - FastAPI verifies JWT using PyJWT or python-jose.
  - All endpoints secure: require valid JWT, filter by authenticated user.
  - Shared secret via environment variables.
  - Token expiry and proper error responses.
**Scale/Scope**: Supports multi-user task management with secure authentication. Scalability is designed to leverage existing backend infrastructure.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/003-jwt-auth-fastapi/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/           # User model additions
│   ├── schemas/          # Auth-related schemas (UserCreate, UserLogin, Token)
│   ├── api/              # Auth router (register, login), modified task router
│   ├── dependencies/     # JWT verification dependency, current user dependency
│   └── main.py           # Integrate auth router, middleware
└── database.py

frontend/
├── src/
│   ├── app/
│   │   ├── auth/           # Login, Register, Logout pages
│   │   ├── (dashboard)/
│   │   └── layout.tsx
│   ├── components/         # Auth forms, user status display
│   ├── lib/
│   ├── services/           # Modified API client, new auth service
│   └── types/              # Auth-related TypeScript interfaces
```

**Structure Decision**: Extending existing `backend/` and `frontend/src/` structures to accommodate authentication-specific models, schemas, API routes, dependencies, and UI components/pages.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
