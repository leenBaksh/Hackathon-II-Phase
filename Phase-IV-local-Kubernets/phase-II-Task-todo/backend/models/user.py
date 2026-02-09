"""
User SQLModel for authentication and user management.
Stores user credentials and metadata.
"""

from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    """
    User model for authentication.

    Fields:
        id: Primary key, auto-incremented
        email: User's email address (unique, indexed)
        password_hash: Hashed password for authentication
        created_at: Account creation timestamp
    """
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(
        max_length=255,
        unique=True,
        index=True,
        nullable=False,
        description="User's unique email address"
    )
    password_hash: str = Field(
        max_length=255,
        nullable=False,
        description="Bcrypt hashed password"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Account creation timestamp"
    )
