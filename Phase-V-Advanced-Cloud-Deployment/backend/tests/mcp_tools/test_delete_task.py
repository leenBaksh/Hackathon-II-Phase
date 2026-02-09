import pytest
from unittest.mock import MagicMock, patch
from uuid import UUID, uuid4
from sqlmodel import Session, select
from src.models.task import Task
from src.mcp_tools.delete_task import delete_task  # This will be implemented later

@pytest.fixture
def mock_session():
    """Provides a mocked database session."""
    session = MagicMock(spec=Session)
    session.add.return_value = None
    session.commit.return_value = None
    session.refresh.return_value = None
    session.exec.return_value = MagicMock() # Mock the exec method
    session.delete.return_value = None
    yield session

@pytest.fixture
def mock_user_id():
    """Provides a dummy user ID."""
    return UUID("a1b2c3d4-e5f6-7890-1234-567890abcdef")

@pytest.fixture
def sample_task(mock_user_id):
    """Provides a sample task for a user."""
    return Task(id=uuid4(), title="Task to delete", user_id=mock_user_id, status="pending")

def test_delete_task_success(mock_session, mock_user_id, sample_task):
    """Test that delete_task successfully deletes a task."""
    mock_session.exec.return_value.first.return_value = sample_task

    result = delete_task(title=sample_task.title, user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.delete.assert_called_once_with(sample_task)
    mock_session.commit.assert_called_once()
    assert result == f"Task '{sample_task.title}' deleted successfully."

def test_delete_task_not_found(mock_session, mock_user_id):
    """Test that delete_task handles a non-existent task."""
    mock_session.exec.return_value.first.return_value = None

    result = delete_task(title="Non-existent task", user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.delete.assert_not_called()
    mock_session.commit.assert_not_called()
    assert result == "Task 'Non-existent task' not found."

def test_delete_task_db_error(mock_session, mock_user_id, sample_task):
    """Test error handling when the database delete fails."""
    mock_session.exec.return_value.first.return_value = sample_task
    mock_session.commit.side_effect = Exception("Database delete failed")

    with pytest.raises(Exception, match="Database delete failed"):
        delete_task(title=sample_task.title, user_id=mock_user_id, session=mock_session)
    mock_session.rollback.assert_called_once()
