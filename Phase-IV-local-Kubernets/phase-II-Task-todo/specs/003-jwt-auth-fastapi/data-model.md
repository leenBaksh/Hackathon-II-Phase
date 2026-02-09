# Data Model for 003-jwt-auth-fastapi

This document outlines the extended data entities and structures required for JWT authentication, covering both frontend (as client-side types) and backend (as database models/schemas).

## Entities

### User

- **Description**: Represents a user in the system with authentication credentials. This model is fundamental for registration, login, and associating tasks with an authenticated user.
- **Attributes**:
    - `id` (string, UUID format): Unique identifier for the user. (Primary Key)
    - `email` (string): Unique email address of the user. (Required, Max length: 255 characters, Unique, Indexed)
    - `hashed_password` (string): Hashed password of the user. (Required)
    - `is_active` (boolean): Flag indicating if the user account is active. (Default: True)
    - `created_at` (string, ISO 8601 DateTime): Timestamp when the user was created.
    - `updated_at` (string, ISO 8601 DateTime): Timestamp when the user was last updated.
- **Relationships**:
    - `tasks`: One-to-Many relationship with `Task` entities. A user can own multiple tasks.

### Task (Updated)

- **Description**: Task model remains largely the same, but `user_id` will now primarily be linked to the authenticated `User` and managed via relationships, not directly from API path.
- **Attributes**: Same as before, but the `user_id` will implicitly come from the authenticated `User` context.

## Schemas / Types for Authentication Flows

### UserRegister

- **Description**: Data structure for user registration requests.
- **Attributes**:
    - `email` (string, Email format): User's email.
    - `password` (string): User's plaintext password.

### UserLogin

- **Description**: Data structure for user login requests.
- **Attributes**:
    - `email` (string, Email format): User's email.
    - `password` (string): User's plaintext password.

### Token

- **Description**: Represents the JWT token issued upon successful authentication.
- **Attributes**:
    - `access_token` (string): The actual JWT string.
    - `token_type` (string): Type of token (e.g., "bearer").

### TokenPayload

- **Description**: Represents the claims contained within the JWT token.
- **Attributes**:
    - `sub` (string, UUID format): Subject of the token, representing the `user_id`.
    - `exp` (integer, Unix timestamp): Expiration time of the token.

## Validation Rules

### User Registration/Login

- `email`: Must be a valid email format, unique during registration.
- `password`: Must meet minimum strength requirements (e.g., minimum 8 characters).

## State Transitions

### User Authentication Status

- **Unauthenticated** -> **Authenticated**: Upon successful login/registration, a valid JWT is issued and stored.
- **Authenticated** -> **Unauthenticated**: Upon logout, token is invalidated/removed.
- **Authenticated (Token Expired)** -> **Unauthenticated**: Token verification fails, requiring re-authentication.
