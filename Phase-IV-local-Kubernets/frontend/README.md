# Multi-User Todo Application - Frontend

A modern Next.js 15+ frontend application built with TypeScript and Tailwind CSS.

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth (to be integrated)
- **API Integration**: FastAPI backend

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
ENVIRONMENT=development
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
npm run start
```

## Project Structure

```
frontend/
├── app/                  # Next.js App Router directory
│   ├── chat/              # Chat feature page
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/          # Reusable UI components (e.g., ChatInterface)
├── hooks/               # Custom React hooks (e.g., useAuth)
├── services/            # Frontend service clients (e.g., chat service)
├── types/               # TypeScript type definitions (e.g., chat schemas)
├── public/              # Static assets
├── styles/              # Global styles
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── next.config.mjs      # Next.js configuration
└── .env.local.example   # Environment variables template
```

## Features

-   User authentication (signup/signin)
-   Create, read, update, delete todos via REST API
-   Mark todos as complete/incomplete via REST API
-   Filter todos by status via REST API
-   Responsive design for mobile and desktop
-   **AI-powered natural language interaction for todo management via chat interface.**

## AI Chatbot Interaction

The application now includes an AI-powered chat interface for managing your todo items.

1.  **Start Development Servers**: Ensure both the backend and frontend development servers are running (as per their respective `README.md` instructions).
2.  **Access Chat Page**: Navigate to the `/chat` route in your frontend application (e.g., `http://localhost:3000/chat`).
3.  **Authenticate**: Log in with an existing user account or register a new one. The chat functionality requires an authenticated user.
4.  **Interact**: Type natural language commands to manage your todos, for example:
    *   "Add 'Buy groceries' to my list."
    *   "What are my pending tasks?"
    *   "Complete 'Buy groceries'."
    *   "Delete 'Call mom'."
    *   "Change 'Read book' to 'Read a good book'."

The AI will interpret your commands, use the appropriate backend tools to manage your tasks, and respond with confirmations or clarifications.

## Development Guidelines

- Use TypeScript for all components
- Follow Next.js App Router conventions
- Use Server Components by default
- Add 'use client' only when needed
- Style with Tailwind CSS utility classes
- Ensure accessibility with ARIA attributes

## Next Steps

1- Start development server: `npm run dev`
2- Integrate Better Auth for authentication
3- Build todo management UI components
4- Connect to FastAPI backend
5- **Explore and enhance the AI Chatbot functionality.**
