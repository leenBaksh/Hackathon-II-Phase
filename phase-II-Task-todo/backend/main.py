from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api import tasks_router, auth_router
from database import create_db_and_tables
from src.dependencies.jwt_middleware import JWTReadyMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.

    Initializes database tables on startup and performs cleanup on shutdown.
    """
    # Startup: Initialize database tables
    print("Initializing database tables...")
    create_db_and_tables()
    print("Database initialized successfully")

    yield

    # Shutdown: Cleanup resources
    print("Shutting down application...")


# Initialize FastAPI application
app = FastAPI(
    title="Todo Task Management API",
    description="RESTful API for managing todo tasks with user authentication",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add JWT middleware
app.add_middleware(JWTReadyMiddleware)

# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")


@app.get("/health")
async def health_check():
    """
    Health check endpoint.

    Returns basic health status.
    """
    return {
        "status": "ok",
        "database": "connected"
    }


@app.get("/")
async def root():
    """
    Root endpoint.

    Returns basic API information.
    """
    return {
        "message": "Todo Task Management API",
        "version": "1.0.0",
        "documentation": "/docs",
        "health_check": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    import os

    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
