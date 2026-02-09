from uuid import UUID
from typing import Optional

from sqlmodel import Session, select
from src.database import get_session
from src.models.task import Task

def delete_task(
    title: str,
    user_id: UUID,
    session: Session = None
) -> str:
    """
    Deletes a todo item for a given user.

    Args:
        title: The title of the todo item to delete.
        user_id: The UUID of the user who owns the task.
        session: An optional database session for dependency injection (primarily for testing).

    Returns:
        A string confirming the task was deleted or not found.

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
        
        session.delete(task)
        session.commit()
        return f"Task '{title}' deleted successfully."
    except Exception as e:
        session.rollback()
        raise Exception(f"Failed to delete task due to database error: {e}")
    finally:
        if session is not None and session is not get_session:
             session.close()
