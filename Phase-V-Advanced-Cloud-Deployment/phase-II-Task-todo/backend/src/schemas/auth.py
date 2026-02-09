from typing import Optional
from uuid import UUID

from pydantic import EmailStr
from sqlmodel import SQLModel

class UserRegister(SQLModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserLogin(SQLModel):
    email: EmailStr
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(SQLModel):
    sub: Optional[UUID] = None # Subject (user ID)
    exp: Optional[int] = None # Expiration time
