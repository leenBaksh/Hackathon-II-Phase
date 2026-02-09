import pytest
from unittest.mock import MagicMock, patch
from uuid import UUID, uuid4
from sqlmodel import Session, select
from src.models.task import Task
from src.mcp_tools.complete_task import complete_task  # This will be implemented later

@pytest.fixture
def mock_session():
    """Provides a mocked database session."""
    session = MagicMock(spec=Session)
    session.add.return_value = None
    session.commit.return_value = None
    session.refresh.return_value = None
    session.exec.return_value = MagicMock() # Mock the exec method
    yield session

@pytest.fixture
def mock_user_id():
    """Provides a dummy user ID."""
    return UUID("a1b2c3d4-e5f6-7890-1234-567890abcdef")

@pytest.fixture
def sample_task(mock_user_id):
    """Provides a sample task for a user."""
    return Task(id=uuid4(), title="Task to complete", user_id=mock_user_id, status="pending")

def test_complete_task_success(mock_session, mock_user_id, sample_task):
    """Test that complete_task successfully updates a task's status to 'completed'."""
    mock_session.exec.return_value.first.return_value = sample_task

    result = complete_task(title=sample_task.title, user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    assert sample_task.status == "completed"
    mock_session.add.assert_called_once_with(sample_task)
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(sample_task)
    assert result == f"Task '{sample_task.title}' marked as completed."

def test_complete_task_not_found(mock_session, mock_user_id):
    """Test that complete_task handles a non-existent task."""
    mock_session.exec.return_value.first.return_value = None

    result = complete_task(title="Non-existent task", user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.add.assert_not_called()
    mock_session.commit.assert_not_called()
    mock_session.refresh.assert_not_called()
    assert result == "Task 'Non-existent task' not found."

def test_complete_task_already_completed(mock_session, mock_user_id):
    """Test that complete_task handles a task that is already completed."""
    completed_task = Task(id=uuid4(), title="Already done", user_id=mock_user_id, status="completed")
    mock_session.exec.return_value.first.return_value = completed_task

    result = complete_task(title="Already done", user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.add.assert_not_called() # Should not add if status is already completed
    mock_session.commit.assert_not_called()
    mock_session.refresh.assert_not_called()
    assert result == "Task 'Already done' is already completed."

def test_complete_task_db_error(mock_session, mock_user_id, sample_task):
    """Test error handling when the database update fails."""
    mock_session.exec.return_value.first.return_value = sample_task
    mock_session.commit.side_effect = Exception("Database update failed")

    with pytest.raises(Exception, match="Database update failed"):
        complete_task(title=sample_task.title, user_id=mock_user_id, session=mock_session)
    mock_session.rollback.assert_called_once()
