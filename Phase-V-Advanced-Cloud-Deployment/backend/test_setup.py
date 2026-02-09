"""
Quick setup verification script.

Tests that all configurations are correct and imports work properly.
Run this before starting the application to catch configuration errors early.
"""

import sys


def test_imports():
    """Test that all required modules can be imported."""
    print("Testing imports...")
    try:
        import fastapi
        print("  FastAPI: OK")
        import sqlmodel
        print("  SQLModel: OK")
        import pydantic
        print("  Pydantic: OK")
        import psycopg2
        print("  psycopg2: OK")
        import dotenv
        print("  python-dotenv: OK")
        import uvicorn
        print("  uvicorn: OK")
        return True
    except ImportError as e:
        print(f"  Import error: {e}")
        return False


def test_config():
    """Test that configuration loads correctly."""
    print("\nTesting configuration...")
    try:
        from config import config
        print(f"  DATABASE_URL: {'Set' if config.database_url else 'Missing'}")
        print(f"  PORT: {config.port}")
        print(f"  ENVIRONMENT: {config.environment}")
        return True
    except Exception as e:
        print(f"  Configuration error: {e}")
        return False


def test_models():
    """Test that database models can be imported."""
    print("\nTesting models...")
    try:
        from models.user import User
        print("  User model: OK")
        from models.task import Task
        print("  Task model: OK")
        return True
    except Exception as e:
        print(f"  Model import error: {e}")
        return False


def test_database():
    """Test database connection setup."""
    print("\nTesting database connection...")
    try:
        from database import engine
        print("  Database engine: OK")
        return True
    except Exception as e:
        print(f"  Database error: {e}")
        print("\n  Note: This is expected if DATABASE_URL is not set in .env")
        return False


def test_app():
    """Test that FastAPI app can be created."""
    print("\nTesting FastAPI application...")
    try:
        from main import app
        print("  FastAPI app: OK")
        print(f"  App title: {app.title}")
        print(f"  App version: {app.version}")
        return True
    except Exception as e:
        print(f"  Application error: {e}")
        return False


def main():
    """Run all tests."""
    print("=" * 60)
    print("Backend Setup Verification")
    print("=" * 60)

    results = []
    results.append(("Imports", test_imports()))
    results.append(("Configuration", test_config()))
    results.append(("Models", test_models()))
    results.append(("Database", test_database()))
    results.append(("Application", test_app()))

    print("\n" + "=" * 60)
    print("Test Results Summary")
    print("=" * 60)

    all_passed = True
    for test_name, passed in results:
        status = "PASSED" if passed else "FAILED"
        print(f"  {test_name}: {status}")
        if not passed:
            all_passed = False

    print("=" * 60)

    if all_passed:
        print("\nAll tests passed! Backend is ready to run.")
        print("\nStart the server with:")
        print("  python main.py")
        print("\nOr:")
        print("  uvicorn main:app --reload")
        return 0
    else:
        print("\nSome tests failed. Please check the errors above.")
        print("\nCommon issues:")
        print("  - Missing .env file: Copy .env.example to .env")
        print("  - DATABASE_URL not set: Add your Neon PostgreSQL URL to .env")
        print("  - Missing dependencies: Run 'pip install -r requirements.txt'")
        return 1


if __name__ == "__main__":
    sys.exit(main())
