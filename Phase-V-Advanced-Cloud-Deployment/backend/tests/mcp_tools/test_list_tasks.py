import pytest
from unittest.mock import MagicMock, patch
from uuid import UUID, uuid4
from sqlmodel import Session
from src.models.task import Task
from src.mcp_tools.list_tasks import list_tasks  # This will be implemented later

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
def sample_tasks(mock_user_id):
    """Provides a list of sample tasks for a user."""
    return [
        Task(id=uuid4(), title="Task 1", user_id=mock_user_id, status="pending"),
        Task(id=uuid4(), title="Task 2", user_id=mock_user_id, status="pending"),
        Task(id=uuid4(), title="Completed Task", user_id=mock_user_id, status="completed"),
    ]

def test_list_tasks_active(mock_session, mock_user_id, sample_tasks):
    """Test that list_tasks returns active tasks for a user."""
    # Configure the mock session to return active tasks
    mock_session.exec.return_value.all.return_value = [
        task for task in sample_tasks if task.status == "pending"
    ]

    result = list_tasks(user_id=mock_user_id, session=mock_session)

    # Assert that the session's exec method was called with a select statement
    # We can't easily check the full query without a more complex mock, but we can check calls.
    mock_session.exec.assert_called_once()
    
    expected_output = (
        "Your active tasks:
"
        "- Task 1
"
        "- Task 2"
    )
    assert result == expected_output

def test_list_tasks_no_active_tasks(mock_session, mock_user_id):
    """Test that list_tasks handles no active tasks gracefully."""
    mock_session.exec.return_value.all.return_value = []

    result = list_tasks(user_id=mock_user_id, session=mock_session)
    assert result == "You have no active tasks."

def test_list_tasks_all_tasks(mock_session, mock_user_id, sample_tasks):
    """Test that list_tasks returns all tasks when requested."""
    # Configure the mock session to return all tasks
    mock_session.exec.return_value.all.return_value = sample_tasks
    
    result = list_tasks(user_id=mock_user_id, status="all", session=mock_session)

    expected_output = (
        "Your tasks:
"
        "- Task 1 (pending)
"
        "- Task 2 (pending)
"
        "- Completed Task (completed)"
    )
    assert result == expected_output

def test_list_tasks_completed(mock_session, mock_user_id, sample_tasks):
    """Test that list_tasks returns completed tasks when requested."""
    mock_session.exec.return_value.all.return_value = [
        task for task in sample_tasks if task.status == "completed"
    ]
    
    result = list_tasks(user_id=mock_user_id, status="completed", session=mock_session)

    expected_output = (
        "Your completed tasks:
"
        "- Completed Task"
    )
    assert result == expected_output

def test_list_tasks_db_error(mock_session, mock_user_id):
    """Test error handling when the database query fails."""
    mock_session.exec.side_effect = Exception("Database read failed")

    with pytest.raises(Exception, match="Database read failed"):
        list_tasks(user_id=mock_user_id, session=mock_session)
