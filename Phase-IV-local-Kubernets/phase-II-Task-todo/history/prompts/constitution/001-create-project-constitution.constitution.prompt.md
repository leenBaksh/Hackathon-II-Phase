---
id: 001
title: Create Project Constitution
stage: constitution
date: 2026-02-05
surface: agent
model: claude-sonnet-4-5
feature: none
branch: 005-prod-polish
user: cvibe
command: /sp.constitution
labels: ["constitution", "governance", "principles", "security", "authentication"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - None
---

## Prompt

Project: Modern Multi-User Todo Web Application

Core principles:
- Secure by default (user data isolation, JWT verification)
- Full-stack coherence (frontend/backend/auth seamless integration)
- Production-readiness (environment variables, error handling)
- Spec-driven development (implement exactly to spec)

Key standards:
- All API endpoints must validate user ownership via JWT
- Database operations use SQLModel ORM with proper schemas
- Frontend components are responsive and accessible
- Code follows language/framework best practices

Constraints:
- Frontend: Next.js 16+ with App Router
- Backend: Python FastAPI
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT
- No manual coding; use Claude Code and Spec-Kit Plus

Success criteria:
- Full user isolation (users only see their own tasks)
- JWT tokens successfully secure all API calls
- All 5 Basic Level features functional via web UI
- Data persists correctly across sessions

## Response snapshot

Created comprehensive project constitution v1.0.0 for Multi-User Todo Web Application with seven core principles:

I. Secure by Default (NON-NEGOTIABLE) - User data isolation, JWT verification, password hashing, secrets management
II. Full-Stack Coherence - Technology stack adherence, seamless integration, no architectural drift
III. Spec-Driven Development (NON-NEGOTIABLE) - Mandatory workflow: spec → plan → tasks → implement
IV. Production-Readiness - Environment config, error handling, data persistence, observability
V. User Story Isolation & Independent Testing - Independent implementation, testing, and delivery
VI. Code Quality & Framework Best Practices - PEP 8, ESNext, type annotations, RESTful conventions
VII. Minimal Complexity & No Over-Engineering - YAGNI, pragmatic error handling, direct implementation

Technology Constraints section specifies:
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS, Better Auth components
- Backend: Python 3.11+, FastAPI, SQLModel, Pydantic validation
- Database: Neon Serverless PostgreSQL with connection pooling
- Authentication: Better Auth with JWT token issuance and verification

Development Workflow defines four phases:
- Phase 0: Specification (/sp.specify)
- Phase 1: Planning (/sp.plan with ADR suggestions)
- Phase 2: Task Breakdown (/sp.tasks organized by user story)
- Phase 3: Implementation (/sp.implement with specialized agents)
- Phase 4: Validation (test user stories independently)

Governance section establishes:
- Constitution authority over all practices
- Amendment process with semantic versioning
- Compliance review requirements
- ADR and PHR creation mandates

## Outcome

- ✅ Impact: Established foundational governance document defining security, architecture, and workflow principles for entire project
- 🧪 Tests: None (documentation artifact)
- 📁 Files: Created .specify/memory/constitution.md (v1.0.0)
- 🔁 Next prompts: Ready for /sp.specify to create feature specifications following these principles
- 🧠 Reflection: Constitution successfully captures user's security-first, spec-driven approach with clear constraints on technology stack and development workflow. All seven principles align with multi-user authentication requirements and Agentic Dev Stack methodology.

## Evaluation notes (flywheel)

- Failure modes observed: None (initial creation)
- Graders run and results (PASS/FAIL): Manual review - PASS (all placeholders filled, principles comprehensive)
- Prompt variant (if applicable): constitution-v1-multi-user-auth
- Next experiment (smallest change to try): Monitor if principle VII (minimal complexity) conflicts with principle I (security) in practice; may need MINOR version bump to clarify balance
