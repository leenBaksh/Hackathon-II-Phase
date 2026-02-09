"""
Database initialization script for Multi-User Todo application.

This script initializes the database by creating all required tables.
Run this once before starting the application.

Usage:
    python init_database.py
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from database import create_db_and_tables, engine
from models import User, Task


async def main():
    """Initialize the database and verify connection."""
    print("=" * 60)
    print("Multi-User Todo Application - Database Initialization")
    print("=" * 60)
    print()

    # Create tables
    print("Step 1: Creating database tables...")
    try:
        create_db_and_tables()
        print("✓ Database tables created successfully!")
        print()

        # Display created tables
        print("Created tables:")
        print(f"  - {User.__tablename__} (User model)")
        print(f"  - {Task.__tablename__} (Task model)")
        print()

        # Display User table schema
        print("User table schema:")
        print("  - id: INTEGER (PRIMARY KEY, AUTO INCREMENT)")
        print("  - email: VARCHAR(255) (UNIQUE, INDEXED)")
        print("  - password_hash: VARCHAR(255)")
        print("  - created_at: TIMESTAMP")
        print()

        # Display Task table schema
        print("Task table schema:")
        print("  - id: INTEGER (PRIMARY KEY, AUTO INCREMENT)")
        print("  - user_id: INTEGER (FOREIGN KEY -> users.id, INDEXED)")
        print("  - title: VARCHAR(200)")
        print("  - description: TEXT (NULLABLE)")
        print("  - status: VARCHAR(50)")
        print("  - due_date: DATE (NULLABLE)")
        print("  - created_at: TIMESTAMP")
        print("  - updated_at: TIMESTAMP")
        print()

        print("=" * 60)
        print("Database initialization complete!")
        print("=" * 60)
        print()
        print("Next steps:")
        print("1. Run FastAPI application: uvicorn main:app --reload")
        print("2. Access API docs: http://localhost:8000/docs")
        print("3. Test authentication endpoints")
        print("4. Create tasks via API")

    except Exception as e:
        print(f"❌ Failed to create tables: {str(e)}")
        print("Please check your database configuration and try again.")
        sys.exit(1)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
