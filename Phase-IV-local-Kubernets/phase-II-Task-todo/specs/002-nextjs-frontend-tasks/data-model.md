# Data Model for 002-nextjs-frontend-tasks

This document outlines the core data entities, their attributes, and expected types as consumed by the frontend, primarily mirroring the backend API's Task entity. This will inform TypeScript interfaces and client-side data handling.

## Entities

### ClientTask

- **Description**: Represents a single task item as received from or sent to the backend API. This directly mirrors the backend's Task model and the `TaskResponse` and `TaskCreate`/`TaskUpdate` schemas defined in the `openapi.yaml`.
- **Attributes**:
    - `id` (string, UUID format): Unique identifier for the task. (Optional for creation)
    - `user_id` (string, UUID format): Identifier for the user who owns the task.
    - `title` (string): A brief, descriptive title for the task. (Required, Max length: 255 characters)
    - `description` (string, optional): A detailed description of the task. (Max length: 1000 characters)
    - `completed` (boolean): Status indicating whether the task is completed or not. (Default: False)
    - `created_at` (string, ISO 8601 DateTime): Timestamp when the task was created.
    - `updated_at` (string, ISO 8601 DateTime): Timestamp when the task was last updated.

## Relationships

- **None directly managed by the frontend model**: Frontend primarily consumes and displays Task entities; relationships are managed by the backend.

## Validation Rules (Client-side)

- `title`: Required, must be a non-empty string, max 255 characters.
- `description`: Optional string, max 1000 characters.

## State Transitions (Client-side representation of Task)

- `completed` status can be toggled via UI interaction, which triggers an API call to update the backend state.
```