# Quickstart Guide for JWT Authentication Integration

This guide provides instructions on how to interact with the new JWT authentication endpoints and how to make authenticated requests.

## Prerequisites

- A running backend API with JWT authentication integrated.
- Frontend application with authentication UI and API client modifications.

## Backend Endpoints

### User Registration

- **Endpoint**: `POST /auth/register`
- **Description**: Creates a new user account.
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
- **Response (201 Created)**:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "token_type": "bearer"
    }
    ```

### User Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT access token.
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
- **Response (200 OK)**:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "token_type": "bearer"
    }
    ```

## Authenticated API Requests

To access protected task management endpoints, you must include the `access_token` obtained from login/registration in the `Authorization` header of your requests, prefixed with `Bearer`. The `user_id` is now inferred from the JWT.

**Example: Get All Tasks (Authenticated)**

- **Endpoint**: `GET /tasks`
- **Headers**:
    ```
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ```
- **Response (200 OK)**:
    ```json
    [
      {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "created_at": "2023-10-27T10:00:00Z",
        "updated_at": "2023-10-27T10:00:00Z"
      }
    ]
    ```

## Frontend Integration

The frontend provides UI for registration, login, and logout. Upon successful authentication, the JWT is stored (e.g., in session storage via NextAuth.js) and automatically attached to subsequent requests by the API client. Task-related pages are now protected, redirecting unauthenticated users to the login page.

## Environment Variables

Create `.env.local` in the `frontend` directory and `.env` in the `backend` directory.

### `frontend/.env.local`
```
NEXTAUTH_SECRET="YOUR_SECURE_RANDOM_STRING_FOR_NEXTAUTH"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000" # Ensure this points to your backend root, not /api
```

### `backend/.env`
```
BETTER_AUTH_SECRET="YOUR_SECURE_RANDOM_STRING_FOR_JWT_SIGNING"
DATABASE_URL="sqlite:///./database.db" # Or your PostgreSQL connection string
```

**Note**: Replace `YOUR_SECURE_RANDOM_STRING` with actual strong, random secrets.

## Further Reading

-   Refer to `specs/003-jwt-auth-fastapi/contracts/openapi.yaml` for a complete and detailed API specification.
-   Refer to `specs/003-jwt-auth-fastapi/contracts/api-types.ts` for frontend API type definitions.