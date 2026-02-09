from uuid import UUID
from typing import Optional

from sqlmodel import Session, select
from ..dependencies.database import get_session
from ..models.task import Task

def list_tasks(
    user_id: UUID,
    status: Optional[str] = "pending", # Can be "pending", "completed", or "all"
    session: Session = None
) -> str:
    """
    Lists todo items for a given user based on their status.

    Args:
        user_id: The UUID of the user who owns the tasks.
        status: The status of tasks to list ("pending", "completed", "all"). Defaults to "pending".
        session: An optional database session for dependency injection (primarily for testing).

    Returns:
        A string containing the list of tasks or a message indicating no tasks.

    Raises:
        ValueError: If an invalid status is provided.
        Exception: For database errors.
    """
    if status not in ["pending", "completed", "all"]:
        raise ValueError("Invalid status. Must be 'pending', 'completed', or 'all'.")

    if session is None:
        for s in get_session():
            session = s
            break

    try:
        query = select(Task).where(Task.user_id == user_id)
        if status != "all":
            query = query.where(Task.status == status)
        
        tasks = session.exec(query).all()

        if not tasks:
            if status == "pending":
                return "You have no active tasks."
            elif status == "completed":
                return "You have no completed tasks."
            else:
                return "You have no tasks."

        task_list_str = ""
        if status == "pending":
            task_list_str += "Your active tasks:\n"
            for task in tasks:
                task_list_str += f"- {task.title}\n"
        elif status == "completed":
            task_list_str += "Your completed tasks:\n"
            for task in tasks:
                task_list_str += f"- {task.title}\n"
        else: # status == "all"
            task_list_str += "Your tasks:\n"
            for task in tasks:
                task_list_str += f"- {task.title} ({task.status})\n"
        
        return task_list_str.strip()
    except Exception as e:
        session.rollback() # Ensure rollback on error
        raise Exception(f"Failed to list tasks due to database error: {e}")
    finally:
        if session is not None and session is not get_session:
            session.close()
