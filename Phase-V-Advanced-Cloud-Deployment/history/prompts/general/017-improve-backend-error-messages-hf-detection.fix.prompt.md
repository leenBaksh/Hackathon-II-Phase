---
id: "017"
title: Improve backend error messages with Hugging Face detection
stage: fix
date: "2026-02-09"
surface: agent
model: kimi-k2.5-free
feature: error-handling
branch: main
user: user
command: ""
labels: ["enhancement", "error-handling", "ux", "huggingface"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/services/auth-service.ts
  - frontend/src/services/api-client.ts
tests:
  - Manual testing with HF Space down
---

## Prompt

User repeatedly showed backend connection error. Improved error handling to provide clearer, actionable messages when Hugging Face backend is down.

## Response snapshot

Enhanced error messages to detect Hugging Face errors and provide specific guidance:

Changes made:
- auth-service.ts: Added Hugging Face error detection for register() and login()
- api-client.ts: Added HF error detection for all API calls

Now shows:
- "Backend server is down. Please restart your Hugging Face Space or run the backend locally."

Instead of generic:
- "Server returned an invalid response. Please check if the backend is running."

## Outcome

- ✅ Impact: Users now get clear, actionable error messages when HF backend is down
- 🧪 Tests: Manual verification with HF Space in error state
- 📁 Files: 2 service files updated with improved error detection
- 🔁 Next prompts: Consider adding link to HF dashboard in error UI
- 🧠 Reflection: Error messages should be actionable and specific to the deployment platform

## Evaluation notes (flywheel)

- Failure modes observed: Generic error messages confused users about how to fix backend issues
- Graders run and results (PASS/FAIL): N/A - UX improvement
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add clickable link to restart HF Space directly from error message
