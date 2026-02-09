# Load environment variables first (before any other imports)
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api import tasks_router, auth_router, chat_router
from src.database import create_db_and_tables
from src.dependencies.jwt_middleware import JWTReadyMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.

    Initializes database tables on startup and performs cleanup on shutdown.
    """
    # Startup: Initialize database tables
    print("=" * 50)
    print("Starting AuraFlow Backend...")
    print("=" * 50)
    
    try:
        print("Initializing database tables...")
        create_db_and_tables()
        print("Database initialized successfully")
    except Exception as e:
        print(f"WARNING: Database initialization error: {e}")
        print("Application will continue but database features may not work")
    
    print("=" * 50)
    print("Server ready!")
    print("=" * 50)

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
# Get allowed origins from environment or use defaults
import os
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
if "*" in allowed_origins:
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add JWT middleware
app.add_middleware(JWTReadyMiddleware)

# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected"
    }

@app.get("/api/health")
async def api_health_check():
    return {
        "status": "ok",
        "api": "connected"
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

    # Get configuration from environment
    port = int(os.getenv("PORT", 8000))
    environment = os.getenv("ENVIRONMENT", "development")
    
    # Use 127.0.0.1 for local development, 0.0.0.0 for production/HF Spaces
    host = "127.0.0.1" if environment == "development" else "0.0.0.0"
    
    print(f"Starting server on http://{host}:{port}")
    print(f"Environment: {environment}")
    print(f"API Docs: http://{host}:{port}/docs")
    
    # Run the application
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=environment == "development",
    )
