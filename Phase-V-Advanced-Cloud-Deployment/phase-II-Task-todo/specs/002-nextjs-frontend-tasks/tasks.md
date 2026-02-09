# Tasks: Next.js Frontend with UI & API Client

**Input**: Design documents from `/specs/002-nextjs-frontend-tasks/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification did not explicitly request the generation of test tasks. Therefore, this tasks list focuses solely on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize a new Next.js 16+ project with TypeScript and App Router in the `frontend` directory.
- [x] T002 Configure Tailwind CSS in the Next.js project.
- [x] T003 Create `frontend/src/app/(dashboard)` directory.
- [x] T004 Create `frontend/src/app/tasks` directory.
- [x] T005 Create `frontend/src/components` directory.
- [x] T006 Create `frontend/src/lib` directory.
- [x] T007 Create `frontend/src/services` directory.
- [x] T008 Create `frontend/src/types` directory.
- [x] T009 Create `frontend/styles` directory.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 Define TypeScript interfaces for Task (`Task`, `TaskCreate`, `TaskUpdate`, `ApiError`) in `frontend/src/types/api-types.ts` based on `api-types.ts` contract.
- [x] T011 Implement the custom fetch wrapper API client service in `frontend/src/services/api-client.ts`. This client should handle the `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_MOCKED_USER_ID`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Tasks Dashboard (Priority: P1) 🎯 MVP

**Goal**: Implement the dashboard page to display a list of tasks with loading and error states.

**Independent Test**: Navigate to the dashboard page, verify tasks fetched from the API are rendered correctly, and loading/error states are displayed as expected.

### Implementation for User Story 1

- [x] T012 [P] [US1] Create root layout component `frontend/src/app/layout.tsx`.
- [x] T013 [P] [US1] Create dashboard page component `frontend/src/app/(dashboard)/page.tsx`.
- [x] T014 [P] [US1] Create `TaskList` component in `frontend/src/components/TaskList.tsx`.
- [x] T015 [P] [US1] Create `TaskItem` component in `frontend/src/components/TaskItem.tsx`.
- [x] T016 [US1] Integrate `TaskList` and `TaskItem` into `frontend/src/app/(dashboard)/page.tsx` to display tasks fetched from the API.
- [x] T017 [US1] Implement loading states for task fetching in `frontend/src/components/Loading.tsx` and integrate into dashboard.
- [x] T018 [US1] Implement error handling and display error messages for API failures on the dashboard.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Create and Edit Tasks (Priority: P1)

**Goal**: Implement forms for creating new tasks and editing existing tasks, including client-side validation.

**Independent Test**: Navigate to create/edit forms, submit valid and invalid data, and verify the changes via API calls or by viewing the updated dashboard.

### Implementation for User Story 2

- [x] T019 [P] [US2] Create task creation page component in `frontend/src/app/tasks/create/page.tsx`.
- [x] T020 [P] [US2] Create task editing page component in `frontend/src/app/tasks/edit/[id]/page.tsx`.
- [x] T021 [P] [US2] Create `TaskForm` component in `frontend/src/components/TaskForm.tsx`.
- [x] T022 [US2] Implement client-side validation for `TaskForm` (title, description).
- [x] T023 [US2] Integrate `TaskForm` into task creation page `frontend/src/app/tasks/create/page.tsx`. Handle form submission, API call to create task, and redirect to dashboard.
- [x] T024 [US2] Integrate `TaskForm` into task editing page `frontend/src/app/tasks/edit/[id]/page.tsx`. Handle fetching task data, pre-filling form, form submission, API call to update task, and redirect to dashboard.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Task Details and Mark Complete/Delete (Priority: P2)

**Goal**: Implement a dedicated task detail page with options to mark a task as complete or delete it.

**Independent Test**: Navigate to a task's detail page, perform actions (mark complete, delete), and verify outcomes via API calls or dashboard view.

### Implementation for User Story 3

- [x] T025 [P] [US3] Create task detail page component in `frontend/src/app/tasks/[id]/page.tsx`.
- [x] T026 [P] [US3] Implement logic to fetch a single task by ID in `frontend/src/app/tasks/[id]/page.tsx`.
- [x] T027 [US3] Implement "Mark Complete" functionality in task detail page, including API call and UI update.
- [x] T028 [US3] Implement "Delete" functionality in task detail page, including API call, confirmation dialog, and redirect to dashboard.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T029 Apply responsive design principles using Tailwind CSS across all pages and components.
- [x] T030 Ensure type-safety for all API calls and UI components.
- [x] T031 Review and refactor state management using React hooks for optimal performance and readability.
- [x] T032 Run quickstart.md validation (manual test of setup and basic functionality).

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
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks (T003-T009) can run in parallel.
- Foundational tasks (T010-T011) are largely sequential, but T010 can be done while T011 is being structured.
- Once Foundational phase completes, User Story 1 (Phase 3) tasks T012-T015 (individual components/pages) can be parallel.
- Once Foundational phase completes, User Story 2 (Phase 4) tasks T019-T021 (individual components/pages) can be parallel.
- User Story 3 (Phase 5) tasks T025-T026 (task detail page logic) can be parallel.

---

## Parallel Example: User Story 1

```bash
# Example of parallel development for User Story 1 components
# Once T010 and T011 are complete, T012, T013, T014, T015 can be developed in parallel:
# - T012 [P] [US1] Create root layout component frontend/src/app/layout.tsx
# - T013 [P] [US1] Create dashboard page component frontend/src/app/(dashboard)/page.tsx
# - T014 [P] [US1] Create TaskList component in frontend/src/components/TaskList.tsx
# - T015 [P] [US1] Create TaskItem component in frontend/src/components/TaskItem.tsx
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
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
