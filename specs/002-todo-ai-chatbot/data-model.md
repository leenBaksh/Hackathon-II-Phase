# Data Model: Todo AI Chatbot

**Date**: 2026-02-09
**Related Plan**: `plan.md`
**Related Spec**: `spec.md`

## Key Entities

This section defines the new and existing entities relevant to the Todo AI Chatbot feature, including their attributes, relationships, and validation rules.

### 1. Conversation

Represents a continuous chat session between a user and the AI.

*   **Attributes**:
    *   `conversation_id` (Primary Key, UUID): Unique identifier for the conversation.
    *   `user_id` (Foreign Key, UUID): Links to the authenticated user who owns this conversation. Ensures user isolation.
    *   `created_at` (Timestamp, UTC): Timestamp when the conversation was initiated.
    *   `updated_at` (Timestamp, UTC): Timestamp of the last message in the conversation, or last update.

*   **Relationships**:
    *   Has many `Message`s (One-to-Many).
    *   Belongs to one `User` (Many-to-One).

*   **Validation Rules**:
    *   `conversation_id` must be unique.
    *   `user_id` must reference an existing user.
    *   `created_at` and `updated_at` are automatically managed timestamps.

### 2. Message

Represents a single message within a conversation, either from the user or the AI.

*   **Attributes**:
    *   `message_id` (Primary Key, UUID): Unique identifier for the message.
    *   `conversation_id` (Foreign Key, UUID): Links to the `Conversation` this message belongs to.
    *   `sender` (String, Enum: 'user', 'ai', 'tool'): Indicates who sent the message. 'tool' can be used for transparent tool execution messages.
    *   `content` (Text): The actual text content of the message.
    *   `timestamp` (Timestamp, UTC): The exact time the message was sent.

*   **Relationships**:
    *   Belongs to one `Conversation` (Many-to-One).

*   **Validation Rules**:
    *   `message_id` must be unique.
    *   `conversation_id` must reference an existing conversation.
    *   `sender` must be one of 'user', 'ai', or 'tool'.
    *   `content` cannot be empty.
    *   `timestamp` is automatically managed.

### 3. Todo Item (Existing Entity)

This existing entity from Phase II will be managed by the AI chatbot. The AI agent will interact with the CRUD operations for this entity.

*   **Attributes**:
    *   `task_id` (Primary Key, UUID): Unique identifier for the todo item.
    *   `user_id` (Foreign Key, UUID): Links to the authenticated user who owns this task. Crucial for user isolation.
    *   `title` (String): The brief description of the todo item.
    *   `description` (Text, Optional): More detailed notes about the task.
    *   `status` (String, Enum: 'pending', 'completed', 'deleted'): Current state of the task.
    *   `due_date` (Date, Optional): The date by which the task should be completed.

*   **Relationships**:
    *   Belongs to one `User` (Many-to-One).

*   **Validation Rules**:
    *   `task_id` must be unique.
    *   `user_id` must reference an existing user.
    *   `title` cannot be empty.
    *   `status` must be one of 'pending', 'completed', or 'deleted'.

## Relationships Diagram (Conceptual)

```mermaid
erDiagram
    User ||--o{ Conversation : "has"
    Conversation ||--o{ Message : "contains"
    User ||--o{ Todo_Item : "manages"

    User {
        UUID user_id PK
        ... other user attributes
    }

    Conversation {
        UUID conversation_id PK
        UUID user_id FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    Message {
        UUID message_id PK
        UUID conversation_id FK
        VARCHAR sender
        TEXT content
        TIMESTAMP timestamp
    }

    Todo_Item {
        UUID task_id PK
        UUID user_id FK
        VARCHAR title
        TEXT description
        VARCHAR status
        DATE due_date
    }
```