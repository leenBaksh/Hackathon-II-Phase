from datetime import datetime, timezone
from typing import List, Optional
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel

def get_current_time():
    return datetime.now(timezone.utc)

class User(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    name: Optional[str] = Field(default=None, max_length=255)
    hashed_password: str = Field(nullable=False)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=get_current_time, nullable=False)
    updated_at: datetime = Field(default_factory=get_current_time, nullable=False)

    tasks: List["Task"] = Relationship(back_populates="owner")
