from datetime import timedelta
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from ..dependencies import DBSession
from ..lib.auth_utils import verify_password, get_password_hash
from ..lib.jwt_utils import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from ..models import User
from ..schemas import Token, UserLogin, UserRegister

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/health")
async def auth_health():
    return {"status": "ok", "service": "auth"}

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register_user(user_register: UserRegister, session: Session = DBSession):
    existing_user = session.exec(select(User).where(User.email == user_register.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists."
        )
    
    hashed_password = get_password_hash(user_register.password)
    user = User(email=user_register.email, name=user_register.name, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = DBSession
):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email address or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
