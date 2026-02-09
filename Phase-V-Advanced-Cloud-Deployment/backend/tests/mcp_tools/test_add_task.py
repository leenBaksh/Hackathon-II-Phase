import pytest
from unittest.mock import MagicMock, patch
from uuid import UUID
from sqlmodel import Session
from src.models.task import Task
from src.mcp_tools.add_task import add_task  # This will be implemented later

# Assuming a simple Task model for testing purposes
# In a real scenario, you'd use the actual Task model
class MockTask:
    def __init__(self, title: str, user_id: UUID, description: str = None, status: str = "pending"):
        self.title = title
        self.user_id = user_id
        self.description = description
        self.status = status
        self.id = UUID("00000000-0000-0000-0000-000000000001") # Dummy ID

    def __eq__(self, other):
        return isinstance(other, MockTask) and 
               self.title == other.title and 
               self.user_id == other.user_id and 
               self.description == other.description and 
               self.status == other.status

@pytest.fixture
def mock_session():
    """Provides a mocked database session."""
    session = MagicMock(spec=Session)
    session.add.return_value = None
    session.commit.return_value = None
    session.refresh.return_value = None
    yield session

@pytest.fixture
def mock_user_id():
    """Provides a dummy user ID."""
    return UUID("a1b2c3d4-e5f6-7890-1234-567890abcdef")

def test_add_task_success(mock_session, mock_user_id):
    """Test that add_task successfully creates and adds a task."""
    title = "Buy groceries"
    description = "Milk, eggs, bread"

    # Expected task object that would be added
    expected_task = MockTask(title=title, user_id=mock_user_id, description=description)

    # Call the add_task function
    result = add_task(title=title, user_id=mock_user_id, description=description, session=mock_session)

    # Assert that a Task object was created and added to the session
    mock_session.add.assert_called_once()
    added_task = mock_session.add.call_args[0][0]
    assert isinstance(added_task, Task) # Verify it's an actual Task instance
    assert added_task.title == title
    assert added_task.user_id == mock_user_id
    assert added_task.description == description
    assert added_task.status == "pending"

    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(added_task) # Should refresh the added task
    assert result == f"Task '{title}' added successfully."

def test_add_task_no_description(mock_session, mock_user_id):
    """Test that add_task works without a description."""
    title = "Read a book"

    result = add_task(title=title, user_id=mock_user_id, session=mock_session)

    mock_session.add.assert_called_once()
    added_task = mock_session.add.call_args[0][0]
    assert isinstance(added_task, Task)
    assert added_task.title == title
    assert added_task.user_id == mock_user_id
    assert added_task.description is None
    assert added_task.status == "pending"

    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(added_task)
    assert result == f"Task '{title}' added successfully."

def test_add_task_empty_title(mock_session, mock_user_id):
    """Test that add_task handles an empty title (should raise an error or return a specific message)."""
    with pytest.raises(ValueError, match="Task title cannot be empty."): # Assuming the tool will validate
        add_task(title="", user_id=mock_user_id, session=mock_session)
    mock_session.add.assert_not_called()
    mock_session.commit.assert_not_called()
    mock_session.refresh.assert_not_called()

def test_add_task_db_error(mock_session, mock_user_id):
    """Test error handling when the database session fails."""
    mock_session.commit.side_effect = Exception("Database write failed")
    title = "Test DB error"

    with pytest.raises(Exception, match="Database write failed"):
        add_task(title=title, user_id=mock_user_id, session=mock_session)
    mock_session.rollback.assert_called_once() # Should rollback on commit failure
