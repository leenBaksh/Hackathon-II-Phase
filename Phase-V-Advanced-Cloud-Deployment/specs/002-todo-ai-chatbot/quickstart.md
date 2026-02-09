# Quickstart: Todo AI Chatbot

**Date**: 2026-02-09
**Related Plan**: `plan.md`
**Related Spec**: `spec.md`

## Overview

This guide provides instructions to quickly set up and run the Todo AI Chatbot feature. This feature adds a natural language chat interface to manage todo items, leveraging an MCP server, OpenAI Agents, a FastAPI backend, and a Next.js frontend with ChatKit UI.

## Prerequisites

Before proceeding, ensure you have the following installed:

*   **Python 3.10+**: For the FastAPI backend and MCP server.
*   **Node.js 18+ & npm/yarn**: For the Next.js frontend.
*   **Docker / PostgreSQL**: A running PostgreSQL database instance accessible by the backend for persistent storage.
*   **Git**: For cloning the repository.
*   **OpenAI API Key**: Required for the OpenAI Agents SDK. Set this as an environment variable (`OPENAI_API_KEY`).

## Setup Instructions

### 1. Clone the Repository

If you haven't already, clone the project repository:

```bash
git clone <repository_url>
cd <repository_name> # e.g., Phase-III-Todo-Chatbot-AI
```

### 2. Backend Setup (FastAPI & MCP Server)

Navigate to the `backend/` directory, set up the environment, and start the servers.

```bash
cd backend
```

**a. Environment Variables**

Create a `.env` file in the `backend/` directory with the following content. Replace placeholders with your actual database credentials and OpenAI API Key.

```dotenv
DATABASE_URL="postgresql://user:password@host:port/database_name"
OPENAI_API_KEY="your_openai_api_key_here"
```

**b. Install Dependencies**

```bash
pip install -r requirements.txt
```

**c. Run Database Migrations (if necessary)**

Ensure your database is up-to-date. This project uses SQLModel, so database creation/migration might be handled automatically on first run or require specific commands if `alembic` is used. For initial setup, `init_database.py` might be relevant.

```bash
# Example (if an init script exists)
# python init_database.py
```

**d. Start FastAPI Server**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The FastAPI server will be accessible at `http://localhost:8000`.

**e. Start MCP Server**

The MCP server needs to be run separately. This will likely involve a dedicated script or command. (Details to be provided during implementation).
For now, assume a command similar to:

```bash
# Placeholder: Actual command depends on MCP SDK setup
python -m mcp_server.run --tools-dir ./tools # Example
```
*Note*: The MCP server must be running for the AI agent to access the todo management tools.

### 3. Frontend Setup (Next.js)

Open a new terminal, navigate to the `frontend/` directory, and start the development server.

```bash
cd ../frontend
```

**a. Install Dependencies**

```bash
npm install # or yarn install
```

**b. Start Development Server**

```bash
npm run dev # or yarn dev
```
The Next.js frontend will be accessible at `http://localhost:3000`.

## Interaction

1.  Open your web browser and navigate to `http://localhost:3000`.
2.  Log in with an existing user account or create a new one (assuming authentication is already set up).
3.  Navigate to the chat interface (e.g., `/chat` route or a dedicated section).
4.  Start typing natural language commands to manage your todo items, such as:
    *   "Add 'Buy groceries' to my todo list."
    *   "List my tasks."
    *   "Complete 'Buy groceries'."
    *   "Change 'Buy milk' to 'Buy organic milk'."
    *   "Delete 'Call John'."

The chatbot will respond, confirming actions or asking for clarification.
