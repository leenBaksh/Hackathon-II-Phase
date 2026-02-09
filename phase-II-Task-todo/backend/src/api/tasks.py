from datetime import datetime, timezone
from typing import List
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, status
from sqlmodel import Session, select

from ..dependencies import DBSession, get_current_user # Import get_current_user
from ..models import Task, User
from ..schemas import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"]) # Changed prefix to /tasks

@router.get("/", response_model=List[TaskResponse])
async def read_tasks(
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    tasks = session.exec(select(Task).where(Task.user_id == current_user.id)).all()
    return tasks


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_create: TaskCreate,
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    db_task = Task.from_orm(task_create)
    db_task.user_id = current_user.id
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=TaskResponse)
async def read_single_task(
    task_id: UUID = Path(..., description="The ID of the task"),
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or access denied.")
    return task


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or access denied.")
    
    task_data = task_update.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)
    
    task.updated_at = datetime.now(timezone.utc)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: UUID = Path(..., description="The ID of the task"),
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or access denied.")
    
    session.delete(task)
    session.commit()
    return


@router.patch("/{task_id}/complete", response_model=TaskResponse)
async def complete_task(
    task_id: UUID = Path(..., description="The ID of the task"),
    session: Session = DBSession,
    current_user: User = Depends(get_current_user)
):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or access denied.")
    
    task.completed = True
    task.updated_at = datetime.now(timezone.utc) # Update timestamp
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

