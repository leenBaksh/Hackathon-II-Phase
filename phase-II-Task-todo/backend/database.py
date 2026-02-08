from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
import threading
import os
import time
import sqlite3

# Configure SQLite for better concurrent access
DATABASE_URL = "sqlite:///./database.db"

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

# Create a thread-local engine for better concurrent access
engine = create_engine(
    DATABASE_URL, 
    echo=False,  # Reduce log noise in production
    connect_args={
        "check_same_thread": False,
        "timeout": 30,  # 30 second timeout
    },
    pool_pre_ping=True,
    pool_recycle=3600,  # Recycle connections every hour
    pool_size=10,      # Connection pool size
    max_overflow=20,   # Maximum overflow connections
)

from sqlalchemy.exc import SQLAlchemyError

# Thread-local storage for sessions
_thread_local = threading.local()

def create_db_and_tables():
    """Create database tables with error handling."""
    try:
        # First configure SQLite settings
        configure_sqlite()
        
        # Then create tables
        SQLModel.metadata.create_all(engine)
        print("Database tables created successfully")
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