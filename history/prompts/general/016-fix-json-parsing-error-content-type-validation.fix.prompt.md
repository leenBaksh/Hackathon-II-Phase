---
id: "016"
title: Fix JSON parsing error with content-type validation
stage: fix
date: "2026-02-09"
surface: agent
model: kimi-k2.5-free
feature: api-client
branch: main
user: user
command: ""
labels: ["bugfix", "api", "json", "error-handling"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/services/auth-service.ts
  - frontend/src/services/api-client.ts
  - frontend/src/services/chat.ts
  - frontend/src/services/chatbot-service.ts
tests:
  - Manual testing of API error scenarios
---

## Prompt

## Error Type
Console SyntaxError

## Error Message
Unexpected token 'Y', "Your space"... is not valid JSON

Next.js version: 16.1.6 (Turbopack)  solve it

## Response snapshot

Fixed the JSON parsing error by adding content-type validation to all API calls. The error occurred when:
1. Backend returns HTML error page (e.g., "Your space is running low" from hosting provider)
2. Frontend tries to parse it as JSON
3. JSON.parse() fails with SyntaxError

Changes made to all API service files:
- Added content-type header check before parsing JSON
- Returns user-friendly error message when server returns HTML instead of JSON
- Logs the actual response text for debugging

Files modified:
- auth-service.ts: register() and login() methods
- api-client.ts: callApi() function
- chat.ts: sendMessageToChatbot() function
- chatbot-service.ts: sendMessage() method

## Outcome

- ✅ Impact: API calls now gracefully handle non-JSON responses (HTML error pages)
- 🧪 Tests: Manual testing with backend offline to verify error handling
- 📁 Files: 4 service files updated with content-type validation
- 🔁 Next prompts: Monitor for any remaining API error edge cases
- 🧠 Reflection: Always validate content-type before calling response.json() to handle proxy errors, 404s, and hosting provider messages

## Evaluation notes (flywheel)

- Failure modes observed: Hosting provider returning HTML error page instead of JSON
- Graders run and results (PASS/FAIL): N/A - runtime error handling fix
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Consider adding retry logic for transient errors
