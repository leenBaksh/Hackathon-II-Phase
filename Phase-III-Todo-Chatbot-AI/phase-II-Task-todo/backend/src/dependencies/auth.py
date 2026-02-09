from typing import Optional
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select

from database import get_session # Corrected import for database.py
from ..lib.jwt_utils import verify_access_token # Corrected import
from ..models import User # Corrected import

# OAuth2PasswordBearer will handle extracting the token from the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login") # tokenUrl should point to your login endpoint

def get_current_user(
    session: Session = Depends(get_session),
    token: str = Depends(oauth2_scheme)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unable to validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    user_id = verify_access_token(token, credentials_exception)
    
    user = session.exec(select(User).where(User.id == user_id)).first()
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This account is currently inactive.")
    
    return user
