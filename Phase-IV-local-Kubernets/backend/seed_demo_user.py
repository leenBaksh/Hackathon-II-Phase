"""
Script to seed the database with demo users for testing.
Run this to create demo user: python seed_demo_user.py
"""
import sys
import os

# Add backend to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from sqlmodel import Session, select
from src.models import User
from src.lib.auth_utils import get_password_hash
from database import engine, create_db_and_tables

def seed_demo_user():
    """Create demo user if it doesn't exist."""
    print("Creating demo user...")
    
    # Ensure tables exist
    create_db_and_tables()
    
    with Session(engine) as session:
        # Check if demo user exists
        demo_email = "demo@tasksync.com"
        existing_user = session.exec(select(User).where(User.email == demo_email)).first()
        
        if existing_user:
            print(f"Demo user already exists: {demo_email}")
            return
        
        # Create demo user
        demo_user = User(
            email=demo_email,
            name="Demo User",
            hashed_password=get_password_hash("demo123"),
            is_active=True
        )
        
        session.add(demo_user)
        session.commit()
        session.refresh(demo_user)
        
        print(f"[OK] Demo user created successfully!")
        print(f"  Email: {demo_email}")
        print(f"  Password: demo123")
        print(f"  User ID: {demo_user.id}")

if __name__ == "__main__":
    seed_demo_user()
