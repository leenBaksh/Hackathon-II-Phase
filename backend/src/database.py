from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
import threading
import os
import time
import sqlite3
from .models.user import User # Ensure User model is imported
from .models.task import Task # Ensure Task model is imported
from .models.conversation import Conversation # New import for Conversation model
from .models.message import Message # New import for Message model

# Load database URL from environment or use SQLite as default
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./database.db")

# Check if using PostgreSQL
IS_POSTGRES = DATABASE_URL.startswith("postgresql")

def configure_sqlite():
    """Configure SQLite for optimal concurrent access."""
    # Connect directly to SQLite to set PRAGMA settings
    conn = sqlite3.connect("database.db", timeout=30)
    cursor = conn.cursor()
    
    # Enable WAL mode for better concurrent access
    cursor.execute("PRAGMA journal_mode = WAL")
    # Set longer timeout for concurrent operations
    cursor.execute("PRAGMA busy_timeout = 30000")
    # Optimize for concurrent reads
    cursor.execute("PRAGMA synchronous = NORMAL")
    # Increase cache size
    cursor.execute("PRAGMA cache_size = 10000")
    # Enable foreign key constraints
    cursor.execute("PRAGMA foreign_keys = ON")
    
    conn.commit()
    conn.close()

# Create engine with database-specific configuration
if IS_POSTGRES:
    # PostgreSQL configuration for Neon serverless
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        pool_pre_ping=True,
        pool_recycle=3600,
        pool_size=5,
        max_overflow=10,
        pool_timeout=30,
    )
else:
    # SQLite configuration
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        connect_args={
            "check_same_thread": False,
            "timeout": 30,
        },
        pool_pre_ping=True,
        pool_recycle=3600,
        pool_size=10,
        max_overflow=20,
    )

from sqlalchemy.exc import SQLAlchemyError

# Thread-local storage for sessions
_thread_local = threading.local()

def create_db_and_tables():
    """Create database tables with error handling."""
    try:
        # Configure SQLite settings only if using SQLite
        if not IS_POSTGRES:
            configure_sqlite()
        
        # Create tables
        SQLModel.metadata.create_all(engine)
        print(f"Database tables created successfully ({'PostgreSQL' if IS_POSTGRES else 'SQLite'})")
    except Exception as e:
        print(f"Error creating database tables: {e}")
        # Wait a moment and retry once
        time.sleep(1)
        try:
            SQLModel.metadata.create_all(engine)
            print("Database tables created successfully on retry")
        except Exception as retry_e:
            print(f"Failed to create database tables on retry: {retry_e}")
            raise

def get_session() -> Generator[Session, None, None]:
    """Get a database session with proper error handling and retry logic."""
    max_retries = 3
    retry_delay = 0.5  # seconds
    
    for attempt in range(max_retries):
        try:
            with Session(engine) as session:
                yield session
                break  # Success, exit retry loop
        except SQLAlchemyError as e:
            if "database is locked" in str(e).lower() and attempt < max_retries - 1:
                print(f"Database locked, retrying in {retry_delay}s (attempt {attempt + 1}/{max_retries})")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
                continue
            else:
                print(f"Database session error: {e}")
                if 'session' in locals():
                    session.rollback()
                raise
        finally:
            if hasattr(_thread_local, 'session'):
                delattr(_thread_local, 'session')

def get_session_sync() -> Session:
    """Get a synchronous session for non-async contexts."""
    if not hasattr(_thread_local, 'session'):
        _thread_local.session = Session(engine)
    return _thread_local.session