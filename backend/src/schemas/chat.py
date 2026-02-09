from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class ChatMessageRequest(BaseModel):
    content: str

class ChatMessageResponse(BaseModel):
    conversation_id: UUID
    user_message_id: UUID
    ai_response_message_id: UUID
    response_content: str
