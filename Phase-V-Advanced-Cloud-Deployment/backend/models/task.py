"""
Task SQLModel for todo items management.
Stores task information with user association.
"""

from datetime import date, datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    """
    Task model for todo items.

    Fields:
        id: Primary key, auto-incremented
        user_id: Foreign key reference to users table
        title: Task title/summary
        description: Optional detailed task description
        status: Task status (pending/in_progress/completed)
        due_date: Optional deadline for task completion
        created_at: Task creation timestamp
        updated_at: Last modification timestamp
    """
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(
        foreign_key="users.id",
        nullable=False,
        index=True,
        description="User who owns this task"
    )
    title: str = Field(
        max_length=200,
        nullable=False,
        description="Task title"
    )
    description: Optional[str] = Field(
        default=None,
        description="Detailed task description"
    )
    status: str = Field(
        max_length=50,
        nullable=False,
        description="Task status (pending/in_progress/completed)"
    )
    due_date: Optional[date] = Field(
        default=None,
        description="Task deadline"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Task creation timestamp"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Last modification timestamp"
    )
