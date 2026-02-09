# Tasks: JWT Authentication Integration (Frontend & Backend)

**Input**: Design documents from `/specs/003-jwt-auth-fastapi/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification did not explicitly request the generation of test tasks. Therefore, this tasks list focuses solely on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Ensure `python-jose` is installed in the backend environment.
- [x] T002 Configure `better-auth` for Next.js in the `frontend` project (conceptual task, may involve `npm install` and setup files).
- [x] T003 Update `frontend/package.json` with necessary `better-auth` dependencies.
- [x] T004 Create `frontend/src/app/auth` directory for authentication pages.
- [x] T005 Add `BETTER_AUTH_SECRET` to `.env.local` in both frontend and backend directories.

---

## Phase 2: Foundational (Blocking Prerequisites - Backend)

**Purpose**: Core backend authentication mechanisms

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create `backend/src/lib` directory.
- [x] T007 Update `backend/src/models/user.py` to include `email`, `hashed_password` fields, and `is_active`, `created_at`, `updated_at` timestamps.
- [x] T008 Define authentication schemas (`UserRegister`, `UserLogin`, `Token`) in `backend/src/schemas/auth.py`.
- [x] T009 Implement password hashing utility in `backend/src/lib/auth_utils.py`.
- [x] T010 Implement JWT creation/verification utility in `backend/src/lib/jwt_utils.py`.
- [x] T011 Implement JWT verification dependency in `backend/src/dependencies/auth.py`. This dependency should extract `user_id` from the JWT.
- [x] T012 Create authentication router in `backend/src/api/auth.py` for `/auth/register` and `/auth/login` endpoints.
- [x] T013 Register authentication router with the main FastAPI application in `backend/src/main.py`.

**Checkpoint**: Foundational backend ready

---

## Phase 3: Foundational (Blocking Prerequisites - Frontend)

**Purpose**: Core frontend authentication mechanisms

**⚠️ CRITICAL**: Frontend user story work can begin after this phase.

- [x] T014 Update `frontend/src/types/api-types.ts` to include authentication-related interfaces (`UserRegister`, `UserLogin`, `Token`).
- [x] T015 Implement an authentication service (`frontend/src/services/auth-service.ts`) to handle user registration, login, logout, and token management.
- [x] T016 Modify `frontend/src/services/api-client.ts` to automatically attach the JWT token from storage to all outgoing authenticated requests.
- [x] T017 Create a provider component for managing global authentication state in `frontend/src/app/auth-provider.tsx`.
- [x] T018 Wrap `frontend/src/app/layout.tsx` with the `auth-provider.tsx` to make auth context available globally.

**Checkpoint**: Foundational frontend ready

---

## Phase 4: User Story 1 - User Registration (Priority: P1) 🎯 MVP

**Goal**: Allow new users to register an account.

**Independent Test**: Successfully register a new user, automatically log in, and redirect to the dashboard.

### Implementation for User Story 1

- [x] T019 [P] [US1] Create registration page component `frontend/src/app/auth/register/page.tsx`.
- [x] T020 [US1] Implement registration form within `frontend/src/app/auth/register/page.tsx`, using `auth-service` for API call and redirecting upon success.

**Checkpoint**: User Registration is functional

---

## Phase 5: User Story 2 - User Login & Logout (Priority: P1)

**Goal**: Enable registered users to log in and log out securely.

**Independent Test**: Successfully log in with valid credentials, access protected content, and log out.

### Implementation for User Story 2

- [x] T021 [P] [US2] Create login page component `frontend/src/app/auth/login/page.tsx`.
- [x] T022 [US2] Implement login form within `frontend/src/app/auth/login/page.tsx`, using `auth-service` for API call and redirecting upon success.
- [x] T023 [P] [US2] Implement logout functionality (e.g., a button in the layout or dashboard) using `auth-service`.
- [x] T024 [US2] Update `frontend/src/app/layout.tsx` to conditionally render navigation/user status based on authentication state.

**Checkpoint**: User Login and Logout are functional

---

## Phase 6: User Story 3 - Secure Task Management (Priority: P2)

**Goal**: Ensure task management operations are secured by JWT authentication and enforce user isolation.

**Independent Test**: Perform CRUD operations with an authenticated user, and verify attempts to access/modify other users' tasks fail.

### Implementation for User Story 3

- [x] T025 Update `backend/src/api/tasks.py` to remove `user_id` path parameter from all task management endpoints.
- [x] T026 Modify backend task management routes (`backend/src/api/tasks.py`) to use the authenticated `user_id` from the JWT dependency for filtering and authorization.
- [x] T027 Update `frontend/src/app/(dashboard)/page.tsx` to remove the mock `user_id` and rely on authentication context.
- [x] T028 Update `frontend/src/app/tasks/create/page.tsx` to remove the mock `user_id` and rely on authentication context.
- [x] T029 Update `frontend/src/app/tasks/edit/[id]/page.tsx` to remove the mock `user_id` and rely on authentication context.
- [x] T030 Update `frontend/src/app/tasks/[id]/page.tsx` to remove the mock `user_id` and rely on authentication context.
- [x] T031 Implement route protection on the frontend (e.g., using middleware or wrappers) to restrict access to task-related pages for unauthenticated users.

**Checkpoint**: Secure Task Management is functional

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 Update `quickstart.md` for both frontend and backend to reflect authentication setup and usage.
- [x] T033 Review and update error messages and UI feedback for authentication failures and unauthorized access.
- [x] T034 Ensure shared `BETTER_AUTH_SECRET` is configured correctly in `.env` files for both frontend and backend.
- [x] T035 Remove any remaining mock `user_id` usages in `frontend/src/services/api-client.ts` and related components.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Backend - Phase 2)**: Depends on Setup completion - BLOCKS all user stories and Foundational Frontend.
- **Foundational (Frontend - Phase 3)**: Depends on Foundational Backend completion - BLOCKS all user stories.
- **User Stories (Phase 4+)**: All depend on Foundational Frontend completion.
  - User stories can then proceed in parallel (if staffed).
  - Or sequentially in priority order (P1 → P2 → P3).
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational Frontend (Phase 3).
- **User Story 2 (P1)**: Can start after Foundational Frontend (Phase 3).
- **User Story 3 (P2)**: Can start after Foundational Frontend (Phase 3) and requires User Story 1 and 2 to be at least partially functional for testing.

### Within Each User Story

- Frontend pages/components depend on related services.
- Frontend pages/components depend on authentication state being available.

### Parallel Opportunities

- **Phase 1**: T001-T004 can be done in parallel (conceptual tasks or package installs). T005 is manual.
- **Phase 2 (Foundational Backend)**: T006, T007, T008, T009, T010, T011, T012 are highly interdependent and mostly sequential. Some file creations (like `backend/src/lib` directories) can be done in parallel.
- **Phase 3 (Foundational Frontend)**: T014, T015, T016, T017, T018 can be implemented with some parallelization once T013 is done.
- **Phase 4 (US1)**: T019 and T020 are sequential.
- **Phase 5 (US2)**: T021 and T022 are sequential. T023 and T024 can be implemented in parallel once authentication is working.
- **Phase 6 (US3)**: T025, T026, T031 are backend/frontend modifications that can be done in parallel. T027-T030 are frontend mock `user_id` removal.

---

## Parallel Example: Foundational Backend

```bash
# While implementing user model (T006), authentication schemas (T007) and password hashing utility (T009) can be defined in parallel.
# T006 [P] Update backend/src/models/user.py to include email, hashed_password fields, and is_active, created_at, updated_at timestamps.
# T007 [P] Define authentication schemas (UserRegister, UserLogin, Token) in backend/src/schemas/auth.py.
# T009 [P] Implement password hashing utility in backend/src/lib/auth_utils.py.
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (Backend)
3. Complete Phase 3: Foundational (Frontend)
4. Complete Phase 4: User Story 1 (User Registration)
5. Complete Phase 5: User Story 2 (User Login & Logout)
6. **STOP and VALIDATE**: Test registration, login, logout, and access to protected resources.
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational (Backend) + Foundational (Frontend) → Core auth ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational Backend together.
2. Team completes Foundational Frontend together.
3. Once Foundational phases are done:
   - Developer A: User Story 1 (Registration)
   - Developer B: User Story 2 (Login & Logout)
   - Developer C: User Story 3 (Secure Task Management)
4. Stories complete and integrate independently.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
