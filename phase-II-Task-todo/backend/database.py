from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

DATABASE_URL = "sqlite:///./database.db"  # Use SQLite for simplicity

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session