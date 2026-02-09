from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from ..database import get_session
from ..models.conversation import Conversation
from ..models.message import Message
from ..schemas.chat import ChatMessageRequest, ChatMessageResponse
from ..dependencies.auth import get_current_user_id
from ..services.ai_agent import AIAgent

# Create an API router for chat endpoints
chat_router = APIRouter()

# Initialize AIAgent globally (assuming OPENAI_API_KEY is set in environment)
openai_api_key = os.getenv("OPENAI_API_KEY", "").strip().strip('"').strip("'")
ai_agent = None

# Debug: Show if key exists (without exposing the actual key)
if openai_api_key:
    masked_key = openai_api_key[:10] + "..." + openai_api_key[-4:] if len(openai_api_key) > 20 else "[hidden]"
    print(f"[DEBUG] OPENAI_API_KEY found: {masked_key} (length: {len(openai_api_key)})")
else:
    print("[DEBUG] OPENAI_API_KEY is empty or not set")

if openai_api_key:
    try:
        from ..services.ai_agent import AIAgent
        ai_agent = AIAgent(openai_api_key=openai_api_key)
        print("[OK] AI Agent initialized successfully")
    except ImportError as e:
        print(f"[WARN] Failed to import AI Agent module: {e}")
        print("[INFO] Running in demo mode - AI features disabled")
    except ValueError as e:
        print(f"[WARN] Invalid AI Agent configuration: {e}")
        print("[INFO] Running in demo mode - AI features disabled")
else:
    print("[WARN] OPENAI_API_KEY not set - Running in demo mode")

async def process_demo_message(message_content: str) -> str:
    """Process message in demo mode when AI is not available."""
    message_lower = message_content.lower()
    
    if "hello" in message_lower or "hi" in message_lower:
        return "Hello! I'm AuraFlow AI (Demo Mode). I can help you manage your tasks. Try asking me to 'show my tasks' or 'create a new task'."
    elif "task" in message_lower and "create" in message_lower:
        return "I can help you create a new task! Please provide a title for your task."
    elif "show" in message_lower and "task" in message_lower:
        return "Here are your current tasks:\n\n**Today's Tasks**\n- Complete project proposal\n- Review team feedback\n- Update documentation\n\nYou have 3 tasks pending."
    elif "priority" in message_lower:
        return "Based on your deadlines:\n\n**High Priority**\n- Complete project proposal (Due today)\n\n**Medium Priority**\n- Review team feedback (Due tomorrow)\n\n**Low Priority**\n- Update documentation (Due this week)"
    elif "help" in message_lower:
        return "I can help you with:\n\n- Creating and managing tasks\n- Setting reminders and deadlines\n- Prioritizing your work\n- Tracking your progress\n\nWhat would you like to do?"
    elif "thank" in message_lower:
        return "You're welcome! I'm here to help you stay organized and productive."
    else:
        return f"I received your message: \"{message_content}\"\n\nI'm currently running in demo mode. To enable full AI capabilities, please set the OPENAI_API_KEY environment variable.\n\nTry asking me about your tasks or priorities!"

@chat_router.post("/chat", response_model=ChatMessageResponse, status_code=status.HTTP_201_CREATED)
async def post_chat_message(
    message_request: ChatMessageRequest,
    session: Session = Depends(get_session),
    current_user_id: UUID = Depends(get_current_user_id)
):
    conversation = session.query(Conversation).filter(Conversation.user_id == current_user_id).first()
    if not conversation:
        conversation = Conversation(user_id=current_user_id)
        session.add(conversation)
        session.commit()
        session.refresh(conversation)

    user_message = Message(
        conversation_id=conversation.id,
        sender="user",
        content=message_request.content,
        timestamp=datetime.utcnow()
    )
    session.add(user_message)
    session.commit()
    session.refresh(user_message)

    # Process message with AI Agent or demo mode
    if ai_agent:
        try:
            ai_response_content = await ai_agent.process_message(
                user_id=current_user_id,
                message_content=message_request.content,
                session=session
            )
        except Exception as e:
            print(f"AI Agent error: {e}")
            ai_response_content = await process_demo_message(message_request.content)
    else:
        ai_response_content = await process_demo_message(message_request.content)

    ai_message = Message(
        conversation_id=conversation.id,
        sender="ai",
        content=ai_response_content,
        timestamp=datetime.utcnow()
    )
    session.add(ai_message)
    session.commit()
    session.refresh(ai_message)

    return ChatMessageResponse(
        conversation_id=conversation.id,
        user_message_id=user_message.id,
        ai_response_message_id=ai_message.id,
        response_content=ai_response_content
    )
