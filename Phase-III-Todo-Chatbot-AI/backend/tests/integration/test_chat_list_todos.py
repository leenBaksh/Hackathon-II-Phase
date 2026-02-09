import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from uuid import UUID, uuid4

from main import app
from src.database import get_session
from src.models.user import User # Assuming User model
from src.models.task import Task
from src.models.conversation import Conversation
from src.models.message import Message
from src.lib.jwt_utils import create_access_token # Assuming this exists for token creation

# Use an in-memory SQLite database for testing
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)

@pytest.fixture(name="session")
def session_fixture():
    drop_db_and_tables() # Ensure a clean slate
    create_db_and_tables()
    with Session(engine) as session:
        yield session
        drop_db_and_tables()

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()

@pytest.fixture
def test_user(session: Session):
    user = User(
        id=uuid4(),
        email="test_list@example.com",
        hashed_password="hashedpassword",
        is_active=True,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@pytest.fixture
def auth_token(test_user: User):
    token = create_access_token(data={"sub": str(test_user.id)})
    return token

@pytest.fixture
def populated_tasks(session: Session, test_user: User):
    tasks = [
        Task(title="Buy groceries", user_id=test_user.id, status="pending"),
        Task(title="Call mom", user_id=test_user.id, status="pending"),
        Task(title="Finish report", user_id=test_user.id, status="completed"),
    ]
    for task in tasks:
        session.add(task)
    session.commit()
    for task in tasks:
        session.refresh(task)
    return tasks

def test_post_chat_message_lists_active_tasks(client: TestClient, session: Session, test_user: User, auth_token: str, populated_tasks):
    message_content = "List my active todos."
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = client.post(
        "/api/chat",
        json={"content": message_content},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()
    assert "response_content" in data
    assert "Your active tasks:" in data["response_content"]
    assert "- Buy groceries" in data["response_content"]
    assert "- Call mom" in data["response_content"]
    assert "- Finish report" not in data["response_content"] # Should not list completed

def test_post_chat_message_lists_no_active_tasks(client: TestClient, session: Session, test_user: User, auth_token: str):
    # Ensure no active tasks for this user
    for task in session.query(Task).filter(Task.user_id == test_user.id, Task.status == "pending").all():
        task.status = "completed"
        session.add(task)
    session.commit()

    message_content = "What are my todos?"
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = client.post(
        "/api/chat",
        json={"content": message_content},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()
    assert "response_content" in data
    assert "You have no active tasks." in data["response_content"]
