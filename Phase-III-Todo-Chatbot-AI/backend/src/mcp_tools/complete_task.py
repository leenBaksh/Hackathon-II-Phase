from uuid import UUID
from typing import Optional

from sqlmodel import Session, select
from ..dependencies.database import get_session
from ..models.task import Task

def complete_task(
    title: str,
    user_id: UUID,
    session: Session = None
) -> str:
    """
    Marks a todo item as completed for a given user.

    Args:
        title: The title of the todo item to complete.
        user_id: The UUID of the user who owns the task.
        session: An optional database session for dependency injection (primarily for testing).

    Returns:
        A string confirming the task was completed or not found.

    Raises:
        Exception: For database errors.
    """
    if session is None:
        for s in get_session():
            session = s
            break

    try:
        task = session.exec(
            select(Task).where(Task.title == title, Task.user_id == user_id)
        ).first()

        if not task:
            return f"Task '{title}' not found."
        
        if task.status == "completed":
            return f"Task '{title}' is already completed."

        task.status = "completed"
        session.add(task)
        session.commit()
        session.refresh(task)
        return f"Task '{title}' marked as completed."
    except Exception as e:
        session.rollback()
        raise Exception(f"Failed to complete task due to database error: {e}")
    finally:
        if session is not None and session is not get_session:
             session.close()
