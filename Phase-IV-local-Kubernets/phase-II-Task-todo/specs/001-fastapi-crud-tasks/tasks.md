# Tasks: FastAPI Backend with Core CRUD

**Input**: Design documents from `/specs/001-fastapi-crud-tasks/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification did not explicitly request the generation of test tasks. Therefore, this tasks list focuses solely on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `backend/tests/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `backend/src` directory.
- [x] T002 Create `backend/src/models` directory.
- [x] T003 Create `backend/src/schemas` directory.
- [x] T004 Create `backend/src/api` directory.
- [x] T005 Create `backend/src/dependencies` directory.
- [x] T006 Initialize the FastAPI application in `backend/src/main.py`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Define SQLModel `User` and `Task` models in `backend/src/models/user.py` and `backend/src/models/task.py` based on `data-model.md`.
- [x] T008 Implement database connection and session management in `backend/database.py`.
- [x] T009 Define Pydantic schemas for `TaskCreate`, `TaskUpdate`, `TaskResponse` in `backend/src/schemas/task.py` based on `openapi.yaml` and `data-model.md`.
- [x] T010 Implement the database session dependency injection in `backend/src/dependencies/database.py`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Manage User Tasks (Priority: P1) 🎯 MVP

**Goal**: Implement all CRUD operations for user tasks.

**Independent Test**: API calls to all CRUD endpoints for a specific user should successfully create, retrieve, update, and delete tasks, and mark tasks as complete, observing correct task management.

### Implementation for User Story 1

- [x] T011 [P] [US1] Create FastAPI router for tasks in `backend/src/api/tasks.py`.
- [x] T012 [P] [US1] Implement GET all tasks endpoint (`/api/{user_id}/tasks`) in `backend/src/api/tasks.py`.
- [x] T013 [P] [US1] Implement POST create task endpoint (`/api/{user_id}/tasks`) in `backend/src/api/tasks.py`.
- [x] T014 [P] [US1] Implement GET single task endpoint (`/api/{user_id}/tasks/{task_id}`) in `backend/src/api/tasks.py`.
- [x] T015 [P] [US1] Implement PUT update task endpoint (`/api/{user_id}/tasks/{task_id}`) in `backend/src/api/tasks.py`.
- [x] T016 [P] [US1] Implement DELETE task endpoint (`/api/{user_id}/tasks/{task_id}`) in `backend/src/api/tasks.py`.
- [x] T017 [P] [US1] Implement PATCH complete task endpoint (`/api/{user_id}/tasks/{task_id}/complete`) in `backend/src/api/tasks.py`.
- [x] T018 [US1] Register the task router with the main FastAPI application in `backend/src/main.py`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Handle Invalid Requests (Priority: P2)

**Goal**: Ensure the API provides clear error messages and appropriate status codes for invalid requests.

**Independent Test**: Sending various invalid requests (e.g., non-existent task, malformed data, invalid user_id) should consistently return appropriate HTTP error responses (400, 404).

### Implementation for User Story 2

- [x] T019 [P] [US2] Implement global exception handlers for 404 Not Found and 400 Bad Request in `backend/src/main.py` or a dedicated error handling module (e.g., `backend/src/dependencies/errors.py`).
- [x] T020 [US2] Ensure all API endpoints correctly raise `HTTPException` for 404 (resource not found) and 400 (invalid user_id or task_id format).

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T021 Implement JWT-ready middleware skeleton in `backend/src/dependencies/jwt_middleware.py`.
- [x] T022 Integrate the JWT middleware skeleton into the FastAPI application in `backend/src/main.py`.
- [x] T023 Review all endpoints for URL parameter validation (e.g., `user_id`, `task_id` formats).
- [x] T024 Ensure comprehensive request/response models are used across all endpoints.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks (T001-T005) can run in parallel.
- Foundational tasks (T007-T010) are sequential, but parts of T007 (User vs Task model definition) could be done in parallel with careful coordination.
- Once Foundational phase completes, User Story 1 (Phase 3) can start. Within Phase 3, tasks T011-T017 (endpoint implementations) can be worked on in parallel.
- Once Foundational phase completes, User Story 2 (Phase 4) can start. Within Phase 4, tasks T019 (exception handlers) can be done in parallel with T020 (endpoint review).
- The Final Phase tasks can be addressed once core stories are complete.

---

## Parallel Example: User Story 1

```bash
# Example of parallel model creation (if models were separate files initially, now they are combined in T007)
# T011, T012, T013, T014, T015, T016, T017 can be done in parallel once T007-T010 are complete
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
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
