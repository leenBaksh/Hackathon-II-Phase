# Docker Setup for TaskSync Application

This repository contains a full-stack application with a Next.js frontend and a FastAPI backend.

## Prerequisites

- Docker Desktop installed and running
- At least 1GB free disk space for the images

## Quick Start

### Using Docker Compose (Recommended)

1. **Build and start both services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:7860
   - Backend API Documentation: http://localhost:7860/docs

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop the services:**
   ```bash
   docker-compose down
   ```

### Individual Services

If you prefer to run services individually:

**Build images separately:**
```bash
# Build frontend
cd frontend
docker build -t frontend-app .

# Build backend
cd ../backend
docker build -t backend-app .
```

**Run individual containers:**
```bash
# Run backend
docker run -d -p 7860:7860 --name backend-app backend-app

# Run frontend (after backend is running)
docker run -d -p 3001:3000 --name frontend-app --depends-on backend-app frontend-app
```

## Service Configuration

- **Frontend (Next.js)**: Port 3000 internally, mapped to 3001 externally
- **Backend (FastAPI)**: Port 7860 internally and externally
- **Database**: SQLite file persisted in the project directory

## Troubleshooting

1. **Port already in use**: If you get a port binding error, make sure no other applications are using ports 3001 and 7860.

2. **Container won't start**: Check logs with `docker-compose logs <service-name>`

3. **Frontend can't connect to backend**: The containers are on the same network, so frontend should automatically connect to backend at `http://backend:7860`.

## Development Notes

- The frontend is built using Next.js with a multi-stage Dockerfile for optimized production builds
- The backend is built using FastAPI with support for PostgreSQL (defaults to SQLite for local development)
- Both services are configured with health checks and automatic restart policies