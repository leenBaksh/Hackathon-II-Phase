from uuid import UUID
from typing import Optional

from sqlmodel import Session, select
from src.database import get_session
from src.models.task import Task

def update_task(
    old_title: str,
    user_id: UUID,
    new_title: Optional[str] = None,
    new_description: Optional[str] = None,
    session: Session = None
) -> str:
    """
    Updates an existing todo item for a given user.

    Args:
        old_title: The current title of the todo item to update.
        user_id: The UUID of the user who owns the task.
        new_title: The new title for the todo item (optional).
        new_description: The new description for the todo item (optional).
        session: An optional database session for dependency injection (primarily for testing).

    Returns:
        A string confirming the task was updated, not found, or no changes were provided.

    Raises:
        Exception: For database errors.
    """
    if session is None:
        for s in get_session():
            session = s
            break

    try:
        task = session.exec(
            select(Task).where(Task.title == old_title, Task.user_id == user_id)
        ).first()

        if not task:
            return f"Task '{old_title}' not found."
        
        if not new_title and not new_description:
            return f"No updates provided for task '{old_title}'."

        if new_title:
            task.title = new_title
        if new_description:
            task.description = new_description
        
        session.add(task)
        session.commit()
        session.refresh(task)

        if new_title and new_description:
            return f"Task '{old_title}' updated to '{new_title}' with new description."
        elif new_title:
            return f"Task '{old_title}' updated to '{new_title}'."
        elif new_description:
            return f"Task '{old_title}' updated."
        
    except Exception as e:
        session.rollback()
        raise Exception(f"Failed to update task due to database error: {e}")
    finally:
        if session is not None and session is not get_session:
             session.close()
