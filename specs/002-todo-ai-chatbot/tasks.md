---

description: "Actionable, dependency-ordered tasks for the Todo AI Chatbot feature."
---

# Tasks: Todo AI Chatbot

**Input**: Design documents from `/specs/002-todo-ai-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: This task list includes test tasks as the feature specification implies independent testing for each user story via "Independent Test" and "Acceptance Scenarios".

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the Todo AI Chatbot feature.

- [ ] T001 Ensure Python 3.10+ and Node.js 18+ are installed per quickstart.md
- [ ] T002 Ensure Docker/PostgreSQL is running and accessible per quickstart.md
- [X] T003 Configure `backend/.env` with `DATABASE_URL` and `OPENAI_API_KEY` per quickstart.md
- [X] T004 Install backend dependencies: `pip install -r backend/requirements.txt`
- [X] T005 Install frontend dependencies: `npm install --prefix frontend`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented, including new database models and basic chat endpoint.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create `Conversation` SQLModel in `backend/src/models/conversation.py` as per data-model.md
- [X] T007 Create `Message` SQLModel in `backend/src/models/message.py` as per data-model.md
- [X] T008 Update `backend/main.py` to include new models in database initialization
- [X] T009 Implement a basic FastAPI chat endpoint `POST /api/{user_id}/chat` in `backend/src/api/chat.py` that stores incoming messages and returns a dummy AI response.
- [X] T010 Implement FastAPI dependency to authenticate user and extract `user_id` in `backend/src/dependencies/auth.py`
- [X] T011 [P] Create a basic chat UI component using ChatKit in `frontend/src/components/ChatInterface.tsx`
- [X] T012 [P] Create a new chat page (e.g., `/chat`) in `frontend/src/app/chat/page.tsx` to host the `ChatInterface`
- [X] T013 Implement frontend service in `frontend/src/services/chat.ts` to connect to `POST /api/{user_id}/chat`
- [X] T014 Integrate chat service with `ChatInterface` component for sending and receiving messages in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add a Todo Item via Chat (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to add new todo items using natural language commands in a chat interface so that I can quickly organize my tasks without navigating forms.

**Independent Test**: Can be fully tested by sending a chat message to create a todo and then verifying its existence through the standard task listing.

### Tests for User Story 1

- [X] T015 [P] [US1] Create a test for the `add_task` MCP tool in `backend/tests/mcp_tools/test_add_task.py` to ensure it correctly creates a task.
- [X] T016 [P] [US1] Create an integration test for `POST /api/{user_id}/chat` that simulates adding a todo and verifies database entry.

### Implementation for User Story 1

- [X] T017 [US1] Implement `add_task` MCP tool in `backend/src/mcp_tools/add_task.py`
- [X] T018 [US1] Integrate `add_task` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition
- [X] T019 [US1] Update `POST /api/{user_id}/chat` to use AI Agent for "add todo" intent and call `add_task` MCP tool
- [X] T020 [US1] Frontend: Display AI confirmation message for successful task addition in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - List Todo Items via Chat (Priority: P1)

**Goal**: As a user, I want to view my active todo items by asking the chatbot so that I can quickly get an overview of my pending tasks.

**Independent Test**: Can be fully tested by sending a chat message to list todos and verifying the response against the actual task list.

### Tests for User Story 2

- [X] T021 [P] [US2] Create a test for the `list_tasks` MCP tool in `backend/tests/mcp_tools/test_list_tasks.py` to ensure it returns correct tasks.
- [X] T022 [P] [US2] Create an integration test for `POST /api/{user_id}/chat` that simulates listing todos and verifies the AI's response content.

### Implementation for User Story 2

- [X] T023 [US2] Implement `list_tasks` MCP tool in `backend/src/mcp_tools/list_tasks.py`
- [X] T024 [US2] Integrate `list_tasks` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition
- [X] T025 [US2] Update `POST /api/{user_id}/chat` to use AI Agent for "list todos" intent and call `list_tasks` MCP tool
- [X] T026 [US2] Frontend: Display list of tasks returned by AI in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Complete a Todo Item via Chat (Priority: P2)

**Goal**: As a user, I want to mark a todo item as complete using a natural language command in the chat interface so that I can easily update the status of my tasks.

**Independent Test**: Can be fully tested by sending a chat message to complete a todo and then verifying its status in the task listing.

### Tests for User Story 3

- [X] T027 [P] [US3] Create a test for the `complete_task` MCP tool in `backend/tests/mcp_tools/test_complete_task.py` to ensure it correctly updates task status.
- [X] T028 [P] [US3] Create an integration test for `POST /api/{user_id}/chat` that simulates completing a todo and verifies the updated status.

### Implementation for User Story 3

- [X] T029 [US3] Implement `complete_task` MCP tool in `backend/src/mcp_tools/complete_task.py`
- [X] T030 [US3] Integrate `complete_task` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition
- [X] T031 [US3] Update `POST /api/{user_id}/chat` to use AI Agent for "complete todo" intent and call `complete_task` MCP tool
- [X] T032 [US3] Frontend: Display AI confirmation for task completion in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Delete a Todo Item via Chat (Priority: P2)

**Goal**: As a user, I want to remove a todo item using a natural language command in the chat interface so that I can clean up my task list.

**Independent Test**: Can be fully tested by sending a chat message to delete a todo and then verifying its absence from the task listing.

### Tests for User Story 4

- [X] T033 [P] [US4] Create a test for the `delete_task` MCP tool in `backend/tests/mcp_tools/test_delete_task.py` to ensure it correctly removes a task.
- [X] T034 [P] [US4] Create an integration test for `POST /api/{user_id}/chat` that simulates deleting a todo and verifies its removal.

### Implementation for User Story 4

- [X] T035 [US4] Implement `delete_task` MCP tool in `backend/src/mcp_tools/delete_task.py`
- [X] T036 [US4] Integrate `delete_task` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition
- [X] T037 [US4] Update `POST /api/{user_id}/chat` to use AI Agent for "delete todo" intent and call `delete_task` MCP tool
- [X] T038 [US4] Frontend: Display AI confirmation for task deletion in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Update a Todo Item via Chat (Priority: P3)

**Goal**: As a user, I want to modify an existing todo item using a natural language command in the chat interface so that I can adjust task details as needed.

**Independent Test**: Can be fully tested by sending a chat message to update a todo and then verifying the changes in the task listing.

### Tests for User Story 5

- [X] T039 [P] [US5] Create a test for the `update_task` MCP tool in `backend/tests/mcp_tools/test_update_task.py` to ensure it correctly modifies a task.
- [X] T040 [P] [US5] Create an integration test for `POST /api/{user_id}/chat` that simulates updating a todo and verifies the changes.

### Implementation for User Story 5

- [X] T041 [US5] Implement `update_task` MCP tool in `backend/src/mcp_tools/update_task.py`
- [X] T042 [US5] Integrate `update_task` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition
- [X] T043 [US5] Update `POST /api/{user_id}/chat` to use AI Agent for "update todo" intent and call `update_task` MCP tool
- [X] T044 [US5] Frontend: Display AI confirmation for task update in `frontend/src/components/ChatInterface.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, including decisions from `research.md`.

- [X] T045 Implement transparent tool execution display in `frontend/src/components/ChatInterface.tsx` as per research.md
- [X] T046 Implement graceful error handling for AI/tool failures in `backend/src/api/chat.py` and `frontend/src/components/ChatInterface.tsx` as per research.md
- [X] T047 Refine conversation context management (history length, retrieval) in `backend/src/services/ai_agent.py` as per research.md
- [X] T048 Update documentation (e.g., `backend/README.md`, `frontend/README.md`)
- [X] T049 Code cleanup and refactoring across backend and frontend
- [X] T050 Run quickstart.md validation to ensure setup instructions are accurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints/tools
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T005) can be verified in parallel.
- Tasks T011 and T012 (frontend UI setup) in Foundational Phase can run in parallel with T006-T010 (backend setup).
- All tests for a user story marked [P] can run in parallel.
- Tasks T015-T016 (US1 tests) can run in parallel.
- Tasks T021-T022 (US2 tests) can run in parallel.
- Tasks T027-T028 (US3 tests) can run in parallel.
- Tasks T033-T034 (US4 tests) can run in parallel.
- Tasks T039-T040 (US5 tests) can run in parallel.
- Different user stories can be worked on in parallel by different team members once the Foundational phase is complete.

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "T015 [P] [US1] Create a test for the `add_task` MCP tool in `backend/tests/mcp_tools/test_add_task.py` to ensure it correctly creates a task."
Task: "T016 [P] [US1] Create an integration test for `POST /api/{user_id}/chat` that simulates adding a todo and verifies database entry."

# Launch implementation for User Story 1 (conceptually in parallel after tests):
Task: "T017 [US1] Implement `add_task` MCP tool in `backend/src/mcp_tools/add_task.py`"
Task: "T018 [US1] Integrate `add_task` tool with OpenAI Agents SDK in `backend/src/services/ai_agent.py` for intent recognition"
Task: "T019 [US1] Update `POST /api/{user_id}/chat` to use AI Agent for "add todo" intent and call `add_task` MCP tool"
Task: "T020 [US1] Frontend: Display AI confirmation message for successful task addition in `frontend/src/components/ChatInterface.tsx`"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 & 2
   - Developer B: User Story 3 & 4
   - Developer C: User Story 5 & Polish
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
