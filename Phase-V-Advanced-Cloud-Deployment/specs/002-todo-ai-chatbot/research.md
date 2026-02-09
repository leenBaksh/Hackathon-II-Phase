# Research: Todo AI Chatbot

**Date**: 2026-02-09
**Related Plan**: `plan.md`

## Research Tasks & Findings

### 1. Transparent Tool Execution (Visible Tool Calls)

**Issue**: The current plan does not explicitly detail how tool calls will be made visible to the user, this needs to be addressed in the `research.md` and subsequent design.

**Research Task**: Investigate best practices for exposing AI agent tool calls to the user in a chat interface.

**Decision**:
*   **Approach**: Implement a mechanism in the chat UI to display an interim message indicating that the AI is "thinking" or "performing an action," followed by a message showing the tool that was called and its (sanitized) parameters. After the tool execution, display the tool's result or a natural language summary of the result.
*   **Rationale**: Provides transparency, builds user trust, and aids in debugging. It also manages user expectations during potential delays in tool execution.
*   **Alternatives Considered**:
    *   **No visibility**: Rejected as it can lead to a black-box experience and user confusion.
    *   **Raw tool output**: Rejected as it might expose sensitive information or be too technical for end-users.

### 2. Graceful Error Handling for AI/Tool Failures

**Issue**: The plan mentions "Tool error handling (agent retry vs user feedback)" as a decision needing documentation, implying this needs further design.

**Research Task**: Define a strategy for handling errors originating from AI agent processing or MCP tool execution.

**Decision**:
*   **Approach**:
    1.  **Tool Execution Errors**: If an MCP tool call fails (e.g., validation error, database error), the AI agent should be notified of the failure and its details. The agent should then attempt to interpret the error and provide a user-friendly message, potentially asking for clarification or suggesting a rephrase. Log all tool errors.
    2.  **AI Interpretation Errors**: If the AI agent fails to interpret a user's command or select an appropriate tool, it should respond with a polite message indicating it didn't understand, and offer examples of commands it can handle.
    3.  **Retries**: Implement a limited retry mechanism (e.g., 1-2 retries with exponential backoff) for transient MCP tool errors before reporting failure to the user.
*   **Rationale**: Provides a robust and user-friendly experience, prevents abrupt system failures, and aids in system monitoring and debugging.
*   **Alternatives Considered**:
    *   **Direct error display**: Rejected as it can expose technical details to users and is not user-friendly.
    *   **Silent failure**: Rejected as it leads to a frustrating user experience and makes debugging difficult.

### 3. MCP Server Deployment (Standalone vs. Integrated with FastAPI)

**Issue**: How will the MCP server be deployed relative to the FastAPI application?

**Research Task**: Evaluate deployment strategies for the MCP server.

**Decision**:
*   **Approach**: Deploy the MCP server as a separate, standalone service. The FastAPI application will interact with the MCP server via its API (e.g., HTTP/RPC).
*   **Rationale**: Decouples the MCP service from the FastAPI application, allowing for independent scaling, deployment, and failure domains. This aligns with microservices best practices and improves maintainability. It also simplifies the integration of the FastAPI app with the OpenAI Agents SDK which will make calls to the MCP server.
*   **Alternatives Considered**:
    *   **Integrated within FastAPI**: Rejected. While simpler for initial setup, it couples concerns, complicates scaling, and can lead to resource contention.

### 4. Conversation Context Management (History Length, Retrieval Strategy)

**Issue**: How will conversation history be managed to provide context to the AI agent?

**Research Task**: Determine optimal strategies for storing and retrieving conversation context for the AI agent.

**Decision**:
*   **Approach**: Store all messages in the database, linked to a `Conversation` ID. For AI agent interaction, retrieve a limited number of recent messages (e.g., last 5-10 turns) from the database for the current `Conversation` and provide them to the OpenAI agent as context. The `user_id` will be used to ensure conversation history is isolated.
*   **Rationale**: Balances providing sufficient context to the AI with performance and token limits. Storing full history allows for future analytics and debugging, while sending a truncated history to the AI is efficient.
*   **Alternatives Considered**:
    *   **Send full history**: Rejected due to potential performance issues and exceeding AI model token limits for long conversations.
    *   **No history**: Rejected as it would result in a stateless AI that cannot maintain context, leading to a poor user experience.

### 5. Chat UI Integration (Separate Page vs. Modal Component)

**Issue**: How will the Chat UI be integrated into the existing frontend application?

**Research Task**: Decide on the integration approach for the Chat UI.

**Decision**:
*   **Approach**: Implement the chat interface as a dedicated page or route within the Next.js frontend (e.g., `/chat` or `/dashboard/chat`). This page will house the ChatKit components and handle communication with the FastAPI chat endpoint.
*   **Rationale**: Provides a clear and focused user experience for chat interactions. It avoids cluttering existing pages and simplifies routing and state management for the chat feature.
*   **Alternatives Considered**:
    *   **Modal/Sidebar component**: Rejected. While suitable for quick access, it can be less immersive for extended conversations and might complicate state management and routing within a larger application.
    *   **Embedding on existing pages**: Rejected. Risk of increased page complexity and potential conflicts with existing UI elements.
