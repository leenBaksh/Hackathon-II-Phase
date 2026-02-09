# Implementation Plan: Todo AI Chatbot

**Branch**: `002-todo-ai-chatbot` | **Date**: 2026-02-09 | **Spec**: spec.md
**Input**: Feature specification from `/specs/002-todo-ai-chatbot/spec.md`

## Summary

This feature introduces an AI-powered natural language interface for managing todo items. It involves setting up an MCP Server with specific tools, integrating OpenAI Agents for natural language understanding, creating a FastAPI chat endpoint, and developing a ChatKit-based frontend UI. The system will persist conversation and message data in a database and integrate seamlessly with existing authentication and task models.

## Technical Context

**Language/Version**: Python 3.x (FastAPI 0.104.1), JavaScript/TypeScript (Next.js 16.1.6, React 19.2.4, TypeScript 5.9.3)
**Primary Dependencies**: FastAPI, OpenAI Agents SDK, MCP SDK, Next.js, React, ChatKit React components, SQLModel.
**Storage**: PostgreSQL (via `psycopg2-binary` for backend), existing database from Phase II.
**Testing**: pytest (Python backend), Next.js testing utilities (e.g., React Testing Library, Jest for frontend).
**Target Platform**: Linux server (backend deployment), Web browsers (frontend).
**Project Type**: Web Application (Frontend + Backend).
**Performance Goals**:
- SC-001: 90% of user requests (add, list, complete, delete, update todo items) via chat processed and confirmed within 3 seconds.
- SC-003: Chat interface loads and is ready for interaction within 2 seconds for 99% of users.
- SC-005: FastAPI chat endpoint maintains a p95 latency of under 500ms under typical load.
**Constraints**:
- Use official MCP SDK for Python.
- OpenAI Agents SDK for agent implementation.
- ChatKit React components for frontend.
- Maintain user isolation (tools require `user_id`).
- Stateless architecture (all state in database).
- Coexist with existing REST API endpoints.
**Scale/Scope**: Manage todo items for authenticated users. Designed for a user base where 90% of requests are handled within 3 seconds (as per SC-001).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Core Principles:**
- **1. Natural language interface for task management**: Met. The feature directly implements a natural language chat interface for todo management.
- **2. Stateless architecture with persistent conversation storage**: Met. The plan explicitly states a stateless architecture with conversation state stored in the database.
- **3. Secure user isolation across all AI components**: Met. The plan specifies maintaining user isolation where tools require `user_id`.
- **4. Transparent tool execution (visible tool calls)**: Partially met. The current plan does not explicitly detail how tool calls will be made visible to the user, this needs to be addressed in the `research.md` and subsequent design. (NEEDS CLARIFICATION)
- **5. Integration with existing Todo system (Phase II)**: Met. The plan includes integrating with existing authentication and task models.

**Key Standards:**
- MCP server follows official SDK patterns: Met. Constraint explicitly states "Use official MCP SDK for Python".
- OpenAI Agents SDK for reliable tool calling: Met. Constraint explicitly states "OpenAI Agents SDK for AI agent logic".
- Database models for conversation state (Conversation, Message): Met. The plan includes creating these models.
- All operations filtered by authenticated user: Met. Constraint explicitly states "Maintain user isolation (tools require user_id)".
- Graceful error handling for AI/tool failures: Partially met. The plan mentions "Tool error handling (agent retry vs user feedback)" as a decision needing documentation, implying this needs further design. (NEEDS CLARIFICATION)

**Constraints:**
- Use MCP SDK for tool server: Met.
- OpenAI Agents SDK for AI agent logic: Met.
- ChatKit for frontend chat interface: Met.
- FastAPI backend with existing database: Met.
- Stateless request cycle (no server-side memory): Met.
- Must work alongside existing REST API: Met.

**Success Criteria:**
- Natural language commands successfully manage todos: Met. This is the core goal.
- MCP tools perform all CRUD operations: Met. The plan includes tools for add, list, complete, delete, update.
- Conversations persist across sessions: Met. Database persistence for conversation and messages.
- Agent correctly interprets user intent: Met. Addressed by OpenAI Agents SDK integration and natural language interface.
- Phase II features remain fully functional: Met. Integration approach states "Add to existing codebase, extend authentication and task models".

## Project Structure

### Documentation (this feature)

```text
specs/002-todo-ai-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

backend/
├── src/
│   ├── models/           # Existing models + new Conversation/Message models
│   ├── services/         # Potential new service for MCP/OpenAI integration
│   └── api/              # Existing API + new chat endpoint (POST /api/{user_id}/chat)
└── tests/                # Existing tests + new tests for chat endpoint and MCP tools

frontend/
├── src/
│   ├── components/       # Existing components + new ChatKit UI components
│   ├── pages/            # Existing pages + potential new chat page
│   └── services/         # Existing services + new service for chat API interaction
└── tests/                # Existing tests + new tests for chat UI

**Structure Decision**: The project will extend the existing `backend/` and `frontend/` directories, following the "Web application" structure. New models (`Conversation`, `Message`) will reside in `backend/src/models`. A new chat endpoint will be added to `backend/src/api`. New UI components will be added to `frontend/src/components` and a new page/route in `frontend/src/pages` if required for the chat interface.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Transparent tool execution not explicitly detailed | Enhances user trust and debugging; crucial for AI interactions | Not providing visibility would hinder user understanding and debugging capabilities. |
| Graceful error handling for AI/tool failures requires further design | Critical for robust user experience and system reliability; avoids abrupt failures | Ignoring this would lead to a poor user experience and difficult-to-diagnose issues. |
