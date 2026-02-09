import pytest
from unittest.mock import MagicMock, patch
from uuid import UUID, uuid4
from sqlmodel import Session, select
from src.models.task import Task
from src.mcp_tools.update_task import update_task  # This will be implemented later

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
    return Task(id=uuid4(), title="Original task title", user_id=mock_user_id, status="pending", description="Original description")

def test_update_task_success_title_and_description(mock_session, mock_user_id, sample_task):
    """Test that update_task successfully updates a task's title and description."""
    mock_session.exec.return_value.first.return_value = sample_task

    new_title = "Updated task title"
    new_description = "Updated description text"
    result = update_task(
        old_title=sample_task.title,
        user_id=mock_user_id,
        new_title=new_title,
        new_description=new_description,
        session=mock_session
    )

    mock_session.exec.assert_called_once()
    assert sample_task.title == new_title
    assert sample_task.description == new_description
    mock_session.add.assert_called_once_with(sample_task)
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(sample_task)
    assert result == f"Task '{sample_task.title}' updated to '{new_title}'."

def test_update_task_success_only_title(mock_session, mock_user_id, sample_task):
    """Test that update_task successfully updates only a task's title."""
    mock_session.exec.return_value.first.return_value = sample_task

    new_title = "Only title updated"
    original_description = sample_task.description
    result = update_task(
        old_title=sample_task.title,
        user_id=mock_user_id,
        new_title=new_title,
        session=mock_session
    )

    mock_session.exec.assert_called_once()
    assert sample_task.title == new_title
    assert sample_task.description == original_description # Description should remain unchanged
    mock_session.add.assert_called_once_with(sample_task)
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(sample_task)
    assert result == f"Task '{sample_task.title}' updated to '{new_title}'."

def test_update_task_success_only_description(mock_session, mock_user_id, sample_task):
    """Test that update_task successfully updates only a task's description."""
    mock_session.exec.return_value.first.return_value = sample_task

    original_title = sample_task.title
    new_description = "New description only"
    result = update_task(
        old_title=sample_task.title,
        user_id=mock_user_id,
        new_description=new_description,
        session=mock_session
    )

    mock_session.exec.assert_called_once()
    assert sample_task.title == original_title # Title should remain unchanged
    assert sample_task.description == new_description
    mock_session.add.assert_called_once_with(sample_task)
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(sample_task)
    assert result == f"Task '{sample_task.title}' updated."

def test_update_task_not_found(mock_session, mock_user_id):
    """Test that update_task handles a non-existent task."""
    mock_session.exec.return_value.first.return_value = None

    result = update_task(old_title="Non-existent task", user_id=mock_user_id, new_title="New", session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.add.assert_not_called()
    mock_session.commit.assert_not_called()
    mock_session.refresh.assert_not_called()
    assert result == "Task 'Non-existent task' not found."

def test_update_task_no_changes(mock_session, mock_user_id, sample_task):
    """Test that update_task does nothing if no new title or description is provided."""
    mock_session.exec.return_value.first.return_value = sample_task

    result = update_task(old_title=sample_task.title, user_id=mock_user_id, session=mock_session)

    mock_session.exec.assert_called_once()
    mock_session.add.assert_not_called()
    mock_session.commit.assert_not_called()
    mock_session.refresh.assert_not_called()
    assert result == f"No updates provided for task '{sample_task.title}'."

def test_update_task_db_error(mock_session, mock_user_id, sample_task):
    """Test error handling when the database update fails."""
    mock_session.exec.return_value.first.return_value = sample_task
    mock_session.commit.side_effect = Exception("Database update failed")

    with pytest.raises(Exception, match="Database update failed"):
        update_task(old_title=sample_task.title, user_id=mock_user_id, new_title="New title", session=mock_session)
    mock_session.rollback.assert_called_once()
