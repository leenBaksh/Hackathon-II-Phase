# Data Model: Production-Grade Kubernetes Deployment with Dapr & Kafka

**Branch**: `001-prod-k8s-dapr-kafka` | **Date**: 2026-02-09 | **Plan**: [specs/001-prod-k8s-dapr-kafka/plan.md](specs/001-prod-k8s-dapr-kafka/plan.md)
**Spec**: [specs/001-prod-k8s-dapr-kafka/spec.md](specs/001-prod-k8s-dapr-kafka/spec.md)

## Key Entities

### 1. Task

Represents a single To-Do item in the system.

**Attributes**:
-   `id`: Unique identifier for the task (UUID)
-   `user_id`: Identifier of the user who owns the task (UUID)
-   `description`: Textual description of the task (String, required)
-   `due_date`: Optional date and time when the task is due (Timestamp)
-   `completion_status`: Current status of the task (Enum: `pending`, `completed`, `overdue`, etc.)
-   `priority`: Importance level of the task (Enum: `low`, `medium`, `high`, `urgent`)
-   `tags`: A list of labels associated with the task (Array of Strings)
-   `recurrence_rules`: JSON object defining how a task recurs (e.g., `{"frequency": "daily", "interval": 1, "until": "YYYY-MM-DD"}` or `{"cron": "0 0 * * *"}`)
-   `reminders`: A list of timestamps for when reminders should be triggered (Array of Timestamps)
-   `created_at`: Timestamp when the task was created (Timestamp)
-   `updated_at`: Timestamp when the task was last updated (Timestamp)

**Relationships**:
-   Owned by a `User` (via `user_id`)

**Validation Rules (from Functional Requirements)**:
-   `FR-005`: Must support recurring tasks, reminders, priorities, and tags.

### 2. TaskEvent

Represents a significant action or change related to a `Task`. These events are streamed via Kafka.

**Attributes**:
-   `id`: Unique identifier for the event (UUID)
-   `task_id`: Identifier of the task related to this event (UUID)
-   `user_id`: Identifier of the user associated with the task (UUID)
-   `event_type`: Type of action (Enum: `task_created`, `task_updated`, `task_deleted`, `task_completed`, `task_reminder_triggered`, `task_recurrence_generated`, etc.)
-   `payload`: JSON object containing details specific to the `event_type` (e.g., for `task_updated`, it might contain `{"old_value": ..., "new_value": ...}`).
-   `timestamp`: Timestamp when the event occurred (Timestamp)

**Relationships**:
-   Associated with a `Task` (via `task_id`)
-   Associated with a `User` (via `user_id`)

**Validation Rules (from Functional Requirements)**:
-   `FR-003`: Must integrate with Kafka for streaming.
-   `FR-004`: Consumed by event handlers.

### 3. Notification

Represents a user notification generated in response to a `TaskEvent`, typically a reminder or a status update.

**Attributes**:
-   `id`: Unique identifier for the notification (UUID)
-   `user_id`: The target user for the notification (UUID)
-   `task_id`: Optional, ID of the task that triggered the notification (UUID)
-   `message`: The content of the notification (String)
-   `notification_type`: (Enum: `reminder`, `status_update`, `system_alert`)
-   `delivery_status`: (Enum: `pending`, `sent`, `failed`, `read`)
-   `timestamp`: Timestamp when the notification was generated (Timestamp)

**Relationships**:
-   Associated with a `User` (via `user_id`)
-   Optionally associated with a `Task` (via `task_id`)

### 4. AuditLog

Represents an entry in an audit trail for significant task operations or system events.

**Attributes**:
-   `id`: Unique identifier for the audit log entry (UUID)
-   `user_id`: Optional, ID of the user who performed the action (UUID)
-   `entity_type`: Type of entity affected (Enum: `task`, `user`, `system`)
-   `entity_id`: ID of the entity affected (UUID)
-   `action`: Description of the action performed (String, e.g., `create`, `update`, `delete`, `login`)
-   `details`: JSON object with additional context about the action (e.g., IP address, old/new values)
-   `timestamp`: Timestamp of the audit event (Timestamp)

**Validation Rules (from Functional Requirements)**:
-   `FR-004`: Must have a consumer for audit logging.
