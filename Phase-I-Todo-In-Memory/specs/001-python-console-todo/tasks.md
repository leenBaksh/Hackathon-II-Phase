# Tasks: Phase I: Todo In-Memory Python Console App

**Input**: Design documents from `specs/001-python-console-todo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `todo_console_app/` at repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure `todo_console_app/` at root
- [x] T002 Initialize Python environment by creating `requirements.txt` for UV in root.
- [x] T003 Create `todo_console_app/__init__.py`
- [x] T004 Create empty `todo_console_app/model.py`
- [x] T005 Create empty `todo_console_app/service.py`
- [x] T006 Create empty `todo_console_app/view.py`
- [x] T007 Create empty `todo_console_app/main.py`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Implement `Task` dataclass in `todo_console_app/model.py` (id, description, created_timestamp, completed_status)
- [x] T009 Implement `TodoService` class and `__init__` method in `todo_console_app/service.py`
- [x] T010 Implement `add_task` method in `todo_console_app/service.py`
- [x] T011 Implement `get_all_tasks` method in `todo_console_app/service.py`
- [x] T012 Implement `display_menu` function in `todo_console_app/view.py`
- [x] T013 Implement `get_user_input` function in `todo_console_app/view.py`
- [x] T014 Implement `display_tasks` function in `todo_console_app/view.py`
- [x] T015 Implement `show_message` and `show_error` functions in `todo_console_app/view.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add a Task (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to add a new task with a description so that I can keep track of what I need to do.

**Independent Test**: The application can be tested by running the 'add' command and then the 'view' command to verify the new task appears correctly.

### Implementation for User Story 1

- [x] T016 [US1] Integrate Add Task logic in `todo_console_app/main.py`
- [x] T017 [US1] Add basic validation for description in `todo_console_app/service.py`

---

## Phase 4: User Story 2 - View All Tasks (Priority: P1)

**Goal**: As a user, I want to see a list of all my tasks, including their ID, description, and completion status, so I can review my to-do list.

**Independent Test**: The application can be tested by adding one or more tasks and then running the 'view' command to see if the output is formatted correctly and contains all the added tasks.

### Implementation for User Story 2

- [x] T018 [US2] Integrate View Tasks logic in `todo_console_app/main.py`

---

## Phase 5: User Story 3 - Mark a Task as Complete (Priority: P2)

**Goal**: As a user, I want to mark a task as complete using its ID, so that I can track my progress.

**Independent Test**: Add a task, view it to confirm its incomplete status, use the 'mark complete' command, and then view it again to confirm the status has changed.

### Implementation for User Story 3

- [x] T019 [US3] Implement `get_task_by_id` method in `todo_console_app/service.py`
- [x] T020 [US3] Implement `toggle_task_completion` method in `todo_console_app/service.py`
- [x] T021 [US3] Integrate Mark Task as Complete logic in `todo_console_app/main.py`

---

## Phase 6: User Story 4 - Update a Task (Priority: P3)

**Goal**: As a user, I want to update the description of an existing task using its ID, so I can correct mistakes or add more detail.

**Independent Test**: Add a task, use the 'update' command to change its description, and then view the task list to confirm the description has been modified.

### Implementation for User Story 4

- [x] T022 [US4] Implement `update_task` method in `todo_console_app/service.py`
- [x] T023 [US4] Integrate Update Task logic in `todo_console_app/main.py`

---

## Phase 7: User Story 5 - Delete a Task (Priority: P3)

**Goal**: As a user, I want to delete a task using its ID, so I can remove items that are no longer needed.

**Independent Test**: Add two tasks, use the 'delete' command on one of them, and then view the list to confirm only the other task remains.

### Implementation for User Story 5

- [x] T024 [US5] Implement `delete_task` method in `todo_console_app/service.py`
- [x] T025 [US5] Integrate Delete Task logic in `todo_console_app/main.py`

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T026 Add initial dummy tasks for testing in `todo_console_app/main.py`
- [x] T027 Ensure `if __name__ == "__main__":` block is present in `todo_console_app/main.py`
- [x] T028 Verify all modules have appropriate docstrings and type hints (`todo_console_app/*.py`)
- [x] T029 Review `quickstart.md` for accuracy and completeness
- [x] T030 Final verification of all implemented features against `spec.md` and `plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion. User stories proceed in priority order (P1 → P2 → P3).
- **Polish (Phase 8)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 (to have a task to complete) and US2 (to view status change).
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 (to have a task to update) and US2 (to view updated description).
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 (to have a task to delete) and US2 (to view deletion).

### Within Each User Story

- Implementation of service methods precedes integration into main loop.

### Parallel Opportunities

- Within Phase 1 (Setup), tasks T001-T007 can be done in parallel if files are created concurrently.
- No other explicit parallel opportunities due to sequential nature of building core logic for a single console app.

---

## Implementation Strategy

### Incremental Delivery (User Story by User Story)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Add Task) → Test independently.
4. Complete Phase 4: User Story 2 (View Tasks) → Test independently.
5. Complete Phase 5: User Story 3 (Mark Task as Complete) → Test independently.
6. Complete Phase 6: User Story 4 (Update Task) → Test independently.
7. Complete Phase 7: User Story 5 (Delete Task) → Test independently.
8. Complete Phase 8: Polish & Cross-Cutting Concerns.

Each user story phase delivers a testable increment of functionality.

## Notes

- All implementation for this feature has been completed in previous turns. The tasks listed above reflect the work already performed, marked as completed.
