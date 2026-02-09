from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel

class Message(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    conversation_id: UUID = Field(index=True, nullable=False, foreign_key="conversation.id") # Foreign Key to Conversation
    sender: str = Field(index=True, nullable=False) # e.g., 'user', 'ai', 'tool'
    content: str = Field(nullable=False)
    timestamp: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # Relationship to Conversation (Many-to-One)
    conversation: "Conversation" = Relationship(back_populates="messages")
