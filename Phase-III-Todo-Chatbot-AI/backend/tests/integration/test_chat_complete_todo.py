import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from uuid import UUID, uuid4

from main import app
from src.database import get_session
from src.models.user import User
from src.models.task import Task
from src.models.conversation import Conversation
from src.models.message import Message
from src.lib.jwt_utils import create_access_token

# Use an in-memory SQLite database for testing
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)

@pytest.fixture(name="session")
def session_fixture():
    drop_db_and_tables()
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
        email="test_complete@example.com",
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
def task_to_complete(session: Session, test_user: User):
    task = Task(title="Task to be completed", user_id=test_user.id, status="pending")
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def test_post_chat_message_completes_task(client: TestClient, session: Session, test_user: User, auth_token: str, task_to_complete: Task):
    message_content = f"Complete '{task_to_complete.title}'."
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = client.post(
        "/api/chat",
        json={"content": message_content},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()
    assert "response_content" in data
    assert f"Task '{task_to_complete.title}' marked as completed." in data["response_content"]

    # Verify task status in the database
    updated_task = session.get(Task, task_to_complete.id)
    assert updated_task is not None
    assert updated_task.status == "completed"

def test_post_chat_message_complete_non_existent_task(client: TestClient, session: Session, test_user: User, auth_token: str):
    message_content = "Complete 'Non-existent task'."
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = client.post(
        "/api/chat",
        json={"content": message_content},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()
    assert "response_content" in data
    assert "Task 'Non-existent task' not found." in data["response_content"]
