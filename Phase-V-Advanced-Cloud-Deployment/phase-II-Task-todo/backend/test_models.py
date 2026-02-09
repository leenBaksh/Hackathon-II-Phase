"""
Test script to verify SQLModel models are correctly defined.
Run this to check model structure before database initialization.
"""

from datetime import date, datetime
from models.user import User
from models.task import Task


def test_user_model():
    """Test User model instantiation and field validation."""
    print("Testing User Model...")

    # Create a User instance without id (will be auto-assigned)
    user = User(
        email="test@example.com",
        password_hash="$2b$12$hashedpassword",
        created_at=datetime.utcnow()
    )

    print(f"  Email: {user.email}")
    print(f"  Password Hash: {user.password_hash[:20]}...")
    print(f"  Created At: {user.created_at}")
    print(f"  ID: {user.id}")
    print("  User model structure OK\n")


def test_task_model():
    """Test Task model instantiation and field validation."""
    print("Testing Task Model...")

    # Create a Task instance
    task = Task(
        user_id=1,
        title="Complete project documentation",
        description="Write comprehensive documentation for the API",
        status="pending",
        due_date=date(2026, 3, 1),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    print(f"  User ID: {task.user_id}")
    print(f"  Title: {task.title}")
    print(f"  Description: {task.description}")
    print(f"  Status: {task.status}")
    print(f"  Due Date: {task.due_date}")
    print(f"  Created At: {task.created_at}")
    print(f"  Updated At: {task.updated_at}")
    print(f"  ID: {task.id}")
    print("  Task model structure OK\n")


def test_model_relationships():
    """Test that models have correct table and field definitions."""
    print("Testing Model Definitions...")

    # Check User table name
    assert User.__tablename__ == "users", "User table name should be 'users'"
    print("  User table name: users ✓")

    # Check Task table name
    assert Task.__tablename__ == "tasks", "Task table name should be 'tasks'"
    print("  Task table name: tasks ✓")

    # Verify field types exist
    assert hasattr(User, 'email'), "User should have 'email' field"
    assert hasattr(User, 'password_hash'), "User should have 'password_hash' field"
    print("  User fields defined ✓")

    assert hasattr(Task, 'user_id'), "Task should have 'user_id' field"
    assert hasattr(Task, 'title'), "Task should have 'title' field"
    assert hasattr(Task, 'status'), "Task should have 'status' field"
    print("  Task fields defined ✓")

    print("  Model definitions OK\n")


if __name__ == "__main__":
    print("=" * 60)
    print("SQLModel Models Structure Test")
    print("=" * 60 + "\n")

    try:
        test_user_model()
        test_task_model()
        test_model_relationships()

        print("=" * 60)
        print("All model tests passed successfully!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Set up DATABASE_URL in .env file")
        print("2. Run init_db() to create tables in Neon PostgreSQL")
        print("3. Start implementing FastAPI endpoints")

    except Exception as e:
        print(f"\nError during testing: {str(e)}")
        print("Please check model definitions and fix any issues.")
        raise
