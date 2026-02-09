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
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── next.config.mjs      # Next.js configuration
└── .env.local.example   # Environment variables template
```

## Features (To Be Implemented)

- User authentication (signup/signin)
- Create, read, update, delete todos
- Mark todos as complete/incomplete
- Filter todos by status
- Responsive design for mobile and desktop

## Development Guidelines

- Use TypeScript for all components
- Follow Next.js App Router conventions
- Use Server Components by default
- Add 'use client' only when needed
- Style with Tailwind CSS utility classes
- Ensure accessibility with ARIA attributes

## Next Steps

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Integrate Better Auth for authentication
4. Build todo management UI components
5. Connect to FastAPI backend
