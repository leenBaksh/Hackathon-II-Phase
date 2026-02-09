from datetime import datetime, timezone
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, Relationship

from .user import User # Added import

def get_current_time():
    return datetime.now(timezone.utc)

class Task(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    title: str = Field(index=True, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=get_current_time, nullable=False)
    updated_at: datetime = Field(default_factory=get_current_time, nullable=False)

    user_id: Optional[UUID] = Field(default=None, foreign_key="user.id")
    owner: Optional[User] = Relationship(back_populates="tasks") # Changed "User" to User
