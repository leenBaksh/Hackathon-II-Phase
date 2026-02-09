# Research for 003-jwt-auth-fastapi

## Backend JWT Library

- **Decision**: Use `python-jose` for JWT verification and creation in the FastAPI backend.
- **Rationale**: `python-jose` is a comprehensive JOSE suite that offers robust support for various JWT algorithms and standards, making it well-suited for FastAPI integration and broader cryptographic needs compared to `PyJWT`.
- **Alternatives Considered**: `PyJWT`: Rejected due to `python-jose`'s more extensive cryptographic features and alignment with modern security practices in the FastAPI ecosystem.

## JWT Token Payload Structure

- **Decision**: The JWT payload will include `user_id` (UUID) as the `sub` (subject) claim and an `exp` (expiration time) claim. No other sensitive user data will be directly included in the token.
- **Rationale**: Using the standard `sub` claim for user identification maintains JWT best practices. Limiting the payload to essential, non-sensitive data minimizes the risk of information leakage and keeps the token size small. Additional user details can be fetched from the database when needed by the authenticated `user_id`.

## JWT Token Expiry Duration

- **Decision**: JWT tokens will have an expiration time of 7 days (168 hours).
- **Rationale**: A 7-day expiration period strikes a balance between user convenience (reducing frequent re-logins) and security (limiting the window during which a compromised token could be exploited). This duration is a common practice for web applications without advanced session management.

## Error Handling for Expired/Invalid Tokens

- **Decision**: The backend will return a 401 Unauthorized HTTP status code with a descriptive error message for expired or invalid tokens. The frontend will detect this status and redirect the user to the login page for re-authentication.
- **Rationale**: Employing standard HTTP status codes (401) ensures clear communication of authentication failures. A consistent error response format aids frontend development by providing predictable error handling mechanisms, enhancing the user experience during session management.

## User ID Sourcing

- **Decision**: The authenticated `user_id` will be exclusively sourced from the validated JWT token on the backend. The `user_id` URL parameter for task-related routes will be removed, and the backend will enforce that all task operations are performed only on tasks belonging to the authenticated user.
- **Rationale**: This approach significantly improves security by preventing clients from arbitrarily specifying a `user_id` in the URL, thus mitigating unauthorized access or manipulation of other users' data. Trust is centralized in the securely verified JWT, aligning with a robust authentication model.
