---
id: 003
title: Fix ModuleNotFoundError in backend imports
stage: red
date: 2026-02-09
surface: agent
model: gemini-cli
feature: 002-todo-ai-chatbot
branch: 002-todo-ai-chatbot
user: current_user
command: Fix ModuleNotFoundError: No module named 'src.database' in backend/src/api/chat.py
labels: ["bug-fix", "import-error", "python-path"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/api/chat.py
  - backend/src/services/ai_agent.py
  - backend/src/main.py
tests:
  - (No new tests specifically for this bug, but existing integration tests will confirm functionality)
---

## Prompt

The user reported a `ModuleNotFoundError: No module named 'src.database'` during `uvicorn` startup, tracing back to `backend/src/api/chat.py`.

## Response snapshot

The `ModuleNotFoundError` was caused by incorrect absolute import paths when `uvicorn` is run from the `backend/` directory, treating `backend/src` as the primary package. The previous refactoring task (T049) had converted relative imports to absolute, which broke the runtime environment.

The fix involved reverting the following import paths to relative imports:
1.  **`backend/src/api/chat.py`**: Changed imports like `from src.database import get_session` to `from ...database import get_session` and similar changes for other `src.` imports.
2.  **`backend/src/services/ai_agent.py`**: Changed imports like `from src.mcp_tools.add_task import add_task` to `from ..mcp_tools.add_task import add_task` and `from src.database import get_session` to `from ...database import get_session`.
3.  **`backend/src/main.py`**: Changed `from database import create_db_and_tables` to `from ..database import create_db_and_tables` to correctly reference `backend/database.py`.

These changes ensure that the Python interpreter correctly resolves module paths within the application's package structure when `backend/src/main.py` is the entry point.

## Outcome

- ✅ Impact: The `ModuleNotFoundError` should be resolved, allowing the `uvicorn` server to start successfully.
- 🧪 Tests: No new dedicated tests were added for this specific bug fix. Existing integration tests would cover the successful import and functionality.
- 📁 Files: Modified `backend/src/api/chat.py`, `backend/src/services/ai_agent.py`, and `backend/src/main.py`.
- 🔁 Next prompts: The user should now be able to start the `uvicorn` server without the `ModuleNotFoundError`. They can then proceed with testing the implemented AI Chatbot feature.
- 🧠 Reflection: This highlights a common issue with Python import paths in complex projects, especially when the perceived package root changes based on how an application is launched (e.g., `uvicorn main:app` vs `uvicorn src.main:app`). It underscores the importance of thoroughly understanding the project's module structure and entry points.

## Evaluation notes (flywheel)

- Failure modes observed: Incorrect assumption about the Python package root when converting imports from relative to absolute.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add a more robust project-wide import validation step to catch such discrepancies early in the development cycle. Investigate if there's a standardized way to define the project root for Python imports.
