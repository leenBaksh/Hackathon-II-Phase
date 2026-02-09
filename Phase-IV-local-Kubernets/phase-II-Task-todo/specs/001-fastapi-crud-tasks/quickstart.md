# Quickstart Guide for FastAPI Task Management API

This guide provides a quick overview of how to interact with the FastAPI Task Management API.

## Base URL

All endpoints are prefixed with `/api/{user_id}` where `{user_id}` is the unique identifier for the user.

## Authentication

Authentication is currently handled by a JWT-ready middleware skeleton. For initial development and testing, you might not need to provide an actual JWT token, but future versions will require it.

## Example: Creating a Task

To create a new task for a user, send a `POST` request to `/api/{user_id}/tasks` with the task details in the request body.

**Request:**

```http
POST /api/a1b2c3d4-e5f6-7890-1234-567890abcdef/tasks HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201 Created):**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z"
}
```

## Example: Getting All Tasks for a User

To retrieve all tasks for a user, send a `GET` request to `/api/{user_id}/tasks`.

**Request:**

```http
GET /api/a1b2c3d4-e5f6-7890-1234-567890abcdef/tasks HTTP/1.1
Host: localhost:8000
```

**Response (200 OK):**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2023-10-27T10:00:00Z",
    "updated_at": "2023-10-27T10:00:00Z"
  },
  {
    "id": "e381g2ff-7d65-5c12-3456-678901abcdef0",
    "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Walk the dog",
    "description": null,
    "completed": false,
    "created_at": "2023-10-27T11:00:00Z",
    "updated_at": "2023-10-27T11:00:00Z"
  }
]
```

## Further Reading

Refer to the `openapi.yaml` file located in the `contracts` directory for a complete and detailed specification of all available endpoints, request/response models, and error responses.
