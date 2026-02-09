import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from uuid import UUID, uuid4

from main import app
from src.database import get_session
from src.models.user import User # Assuming User model
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
        email="test@example.com",
        hashed_password="hashedpassword",
        is_active=True,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@pytest.fixture
def auth_token(test_user: User):
    # This assumes your create_access_token function takes a user ID
    token = create_access_token(data={"sub": str(test_user.id)})
    return token

def test_post_chat_message_creates_conversation_and_messages(client: TestClient, session: Session, test_user: User, auth_token: str):
    message_content = "Hello AI, add 'Buy groceries' to my list."
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = client.post(
        "/api/chat", # Note: endpoint is /api/chat now, not /api/{user_id}/chat
        json={"content": message_content},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()
    assert "conversation_id" in data
    assert "user_message_id" in data
    assert "ai_response_message_id" in data
    assert data["response_content"].startswith("Echo: " + message_content)

    # Verify conversation and messages in the database
    conversation = session.get(Conversation, UUID(data["conversation_id"]))
    assert conversation is not None
    assert conversation.user_id == test_user.id

    user_message = session.get(Message, UUID(data["user_message_id"]))
    assert user_message is not None
    assert user_message.conversation_id == conversation.id
    assert user_message.sender == "user"
    assert user_message.content == message_content

    ai_message = session.get(Message, UUID(data["ai_response_message_id"]))
    assert ai_message is not None
    assert ai_message.conversation_id == conversation.id
    assert ai_message.sender == "ai"
    assert ai_message.content == data["response_content"]

def test_post_chat_message_uses_existing_conversation(client: TestClient, session: Session, test_user: User, auth_token: str):
    # First message to create a conversation
    message_content_1 = "First message."
    headers = {"Authorization": f"Bearer {auth_token}"}
    client.post("/api/chat", json={"content": message_content_1}, headers=headers)

    # Second message
    message_content_2 = "Second message, continue conversation."
    response = client.post(
        "/api/chat",
        json={"content": message_content_2},
        headers=headers
    )

    assert response.status_code == 201
    data = response.json()

    # Verify that only one conversation exists for the user
    conversations = session.query(Conversation).filter(Conversation.user_id == test_user.id).all()
    assert len(conversations) == 1
    
    # Verify messages are linked to the same conversation
    all_messages = session.query(Message).filter(Message.conversation_id == conversations[0].id).all()
    assert len(all_messages) == 4 # 2 user messages + 2 AI responses
    assert all_messages[0].content == message_content_1
    assert all_messages[2].content == message_content_2

def test_post_chat_message_unauthenticated(client: TestClient):
    message_content = "Unauthorized message."
    response = client.post(
        "/api/chat",
        json={"content": message_content}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"
