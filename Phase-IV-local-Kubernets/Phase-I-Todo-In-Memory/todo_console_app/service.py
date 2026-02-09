from typing import List, Optional
from .model import Task

class TodoService:
    def __init__(self):
        self._tasks: List[Task] = []

    def add_task(self, description: str) -> Task:
        if not description:
            raise ValueError("Description cannot be empty.")
        task = Task(description=description)
        self._tasks.append(task)
        return task

    def get_all_tasks(self) -> List[Task]:
        return self._tasks

    def get_task_by_id(self, task_id: str) -> Optional[Task]:
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(self, task_id: str, new_description: str) -> Optional[Task]:
        if not new_description:
            raise ValueError("New description cannot be empty.")
        task = self.get_task_by_id(task_id)
        if task:
            task.description = new_description
            return task
        return None

    def delete_task(self, task_id: str) -> bool:
        task = self.get_task_by_id(task_id)
        if task:
            self._tasks.remove(task)
            return True
        return False

    def toggle_task_completion(self, task_id: str) -> Optional[Task]:
        task = self.get_task_by_id(task_id)
        if task:
            task.completed_status = not task.completed_status
            return task
        return None
