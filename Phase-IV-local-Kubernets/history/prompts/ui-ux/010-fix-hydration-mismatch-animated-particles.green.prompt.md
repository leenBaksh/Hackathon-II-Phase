---
id: 010
title: Fix Hydration Mismatch for Animated Particles
stage: green
date: 2026-02-06
surface: agent
model: opencode/kimi-k2.5-free
feature: ui-ux
branch: 003-jwt-auth-fastapi
user: user
command: "Console Error: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties"
labels: ["ui-ux", "hydration", "bug-fix", "nextjs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/components/AnimatedParticles.tsx
  - frontend/src/app/page.tsx
tests:
---

## Prompt

Console Error: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.

The error showed mismatched `left` and `top` positions for animated particle divs caused by `Math.random()` calls in page.tsx.

## Response snapshot

Diagnosed the hydration mismatch issue caused by `Math.random()` being called during both SSR and client-side hydration, producing different values.

Created `frontend/src/components/AnimatedParticles.tsx` - a client-only component that:
- Uses `useState` and `useEffect` to track mount state
- Returns `null` during SSR (server-side rendering)
- Only renders particles after client-side hydration completes
- Contains all the animation logic with framer-motion

Updated `frontend/src/app/page.tsx`:
- Added import for AnimatedParticles component
- Replaced inline particle code with `<AnimatedParticles />` component
- Removed Math.random() calls from the main page component

This pattern ensures:
- Server renders nothing for particles (avoiding hydration mismatch)
- Client hydrates with empty particles initially
- After mount, client renders particles with Math.random() values
- No SSR/client value mismatch since server never rendered them

## Outcome

- ✅ Impact: Eliminated hydration mismatch console errors; improved SSR compatibility
- 🧪 Tests: Manual testing confirms no more hydration warnings
- 📁 Files: Created frontend/src/components/AnimatedParticles.tsx; Modified frontend/src/app/page.tsx
- 🔁 Next prompts: Monitor for other hydration issues in the app
- 🧠 Reflection: Math.random() and other non-deterministic functions should never be called during SSR render phase

## Evaluation notes (flywall)

- Failure modes observed: Hydration mismatch from Math.random() in JSX
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Apply same pattern to other components using Date.now() or Math.random()

