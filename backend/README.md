---
title: AuraFlow Backend
emoji: 🚀
short_description: FastAPI backend for AuraFlow Todo App
colorFrom: purple
colorTo: pink
sdk: docker
app_port: 7860
pinned: false
---

# AuraFlow Backend

FastAPI backend deployed on Hugging Face Spaces for the AuraFlow Todo Application.

## Health Check

- Root: `/`
- Health: `/health`
- API Health: `/api/health`
- Docs: `/docs`

## Environment Variables Required

- `DATABASE_URL` - Neon PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `PORT` - Set to 7860 for Hugging Face Spaces
