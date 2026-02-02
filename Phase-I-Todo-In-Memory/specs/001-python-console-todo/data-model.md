# Data Model: Phase I: Todo In-Memory Python Console App

This document defines the core data entities for the feature.

## Entity: Task

Represents a single to-do item in the application.

### Attributes

| Attribute           | Type      | Description                                                 | Constraints    |
|---------------------|-----------|-------------------------------------------------------------|----------------|
| `id`                | `str`     | A unique identifier for the task (UUID).                    | Not Null, Unique |
| `description`       | `str`     | The text content of the task.                               | Not Null, Not Empty |
| `created_timestamp` | `datetime`| The timestamp when the task was created.                    | Not Null       |
| `completed_status`  | `bool`    | The completion status of the task. Defaults to `False`.     | Not Null       |

### State Transitions

- A `Task` is created with `completed_status` as `False`.
- The `completed_status` can be toggled between `True` and `False`.
- The `description` can be updated.
- Once created, the `id` and `created_timestamp` are immutable.
