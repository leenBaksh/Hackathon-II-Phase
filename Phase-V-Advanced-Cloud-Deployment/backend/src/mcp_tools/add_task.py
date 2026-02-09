from uuid import UUID
from typing import Optional

from sqlmodel import Session
from ..dependencies.database import get_session
from ..models.task import Task

def add_task(
    title: str,
    user_id: UUID,
    description: Optional[str] = None,
    session: Session = None # Allow session to be passed for testing, or get new one
) -> str:
    """
    Adds a new todo item for a given user.

    Args:
        title: The title of the todo item.
        user_id: The UUID of the user who owns the task.
        description: An optional detailed description of the todo item.
        session: An optional database session for dependency injection (primarily for testing).

    Returns:
        A string confirming the task was added.

    Raises:
        ValueError: If the title is empty.
        Exception: For database errors.
    """
    if not title:
        raise ValueError("Task title cannot be empty.")

    if session is None:
        # Get a new session if not provided (for production use)
        # Note: In a real FastAPI app, this would typically be a Depends(get_session)
        # However, for an MCP tool directly called, we manage the session here.
        for s in get_session(): # get_session is a generator
            session = s
            break

    try:
        new_task = Task(
            title=title,
            user_id=user_id,
            description=description,
            status="pending" # Default status
        )
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return f"Task '{title}' added successfully."
    except Exception as e:
        session.rollback()
        raise Exception(f"Failed to add task due to database error: {e}")
    finally:
        # Close the session if it was opened here
        if session is not None and session is not get_session: # Avoid closing if injected by FastAPI Depends
             session.close()

