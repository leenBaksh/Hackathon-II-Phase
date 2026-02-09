---
id: "015"
title: Fix login redirect blink race condition
stage: fix
date: "2026-02-09"
surface: agent
model: kimi-k2.5-free
feature: authentication
branch: main
user: user
command: ""
labels: ["bugfix", "auth", "race-condition", "redirect"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/app/auth/login/page.tsx
  - frontend/src/app/tasks/page.tsx
tests:
  - Manual testing of login flow
---

## Prompt

when i click on sign in button tasks page whould be blink

## Response snapshot

Fixed the race condition causing the tasks page to "blink" when clicking sign in. The issue was:

1. Login succeeds → immediately redirects to /tasks
2. Tasks page checks session → session is still null → redirects back to login
3. This created a redirect loop/blink

Changes made:
- Added 100ms delay after login before redirect to allow session state to propagate
- Fixed session check to handle error case and use router.replace() for cleaner redirects
- Added 500ms delay in tasks page before redirecting unauthenticated users to avoid race conditions
- Fixed login result check to properly detect errors from authService

## Outcome

- ✅ Impact: Fixed authentication redirect race condition that caused page blinking/flashing
- 🧪 Tests: Manual testing of login flow
- 📁 Files: Modified login page and tasks page to handle session state transitions properly
- 🔁 Next prompts: Monitor for any remaining edge cases in auth flow
- 🧠 Reflection: Race conditions between auth state updates and redirects are common in React apps. Better Auth's useSession() hook needs time to re-fetch after login.

## Evaluation notes (flywheel)

- Failure modes observed: Race condition between login completion and session state propagation
- Graders run and results (PASS/FAIL): N/A - runtime behavior fix
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Consider using Better Auth's onSuccess callback for cleaner redirect handling
