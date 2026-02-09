from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel

class Conversation(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(index=True, nullable=False) # Foreign Key to User
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Relationship to Message (One-to-Many)
    messages: list["Message"] = Relationship(back_populates="conversation")

    # Relationship to User (Many-to-One) - assuming User model exists
    # user: "User" = Relationship(back_populates="conversations") # Uncomment if User model has back_populates to conversations
