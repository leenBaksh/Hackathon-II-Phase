from typing import Generator

from fastapi import Depends
from sqlmodel import Session

# Import from src.database module
from ..database import get_session

def get_db_session() -> Generator[Session, None, None]:
    yield from get_session()

DBSession = Depends(get_db_session)
