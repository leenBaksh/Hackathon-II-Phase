# Data Model for 001-fastapi-crud-tasks

This document outlines the core data entities, their attributes, relationships, and validation rules, based on the feature specification. These models will form the basis for SQLModel definitions and Pydantic schemas.

## Entities

### User

- **Description**: Represents a user in the system. Tasks are associated with a user.
- **Attributes**:
    - `id` (UUID or Integer): Unique identifier for the user. (Primary Key)
    - **Note**: The `user_id` is currently assumed to be external and primarily used as a foreign key/identifier for task ownership rather than a full internal User model management.

### Task

- **Description**: Represents a single task item belonging to a user.
- **Attributes**:
    - `id` (UUID or Integer): Unique identifier for the task. (Primary Key)
    - `user_id` (UUID or Integer): Foreign key linking the task to a specific user. (Required)
    - `title` (String): A brief, descriptive title for the task. (Required, Max length: 255 characters)
    - `description` (String, Optional): A detailed description of the task. (Max length: 1000 characters)
    - `completed` (Boolean): Status indicating whether the task is completed or not. (Default: False)
    - `created_at` (DateTime): Timestamp when the task was created. (Auto-generated)
    - `updated_at` (DateTime): Timestamp when the task was last updated. (Auto-generated)

## Relationships

- **User to Task**: One-to-Many. A User can have multiple Tasks, but each Task belongs to exactly one User.

## Validation Rules (derived from FR-007)

### Task Creation/Update

- `title`: Must be a non-empty string, maximum 255 characters.
- `description`: Must be a string, maximum 1000 characters (optional).
- `completed`: Must be a boolean (for update/patch operations).
- `user_id`: Must be a valid UUID or Integer, and correspond to an existing user (as per assumptions). This will be validated as a URL parameter.

## State Transitions

### Task `completed` status

- `False` -> `True`: Via PATCH `/api/{user_id}/tasks/{task_id}/complete` endpoint.
- `True` -> `False`: Possible via PUT `/api/{user_id}/tasks/{task_id}` (if `completed` field is provided and set to false) or a future PATCH endpoint. For this spec, primary transition is `False` to `True` via `/complete`.
