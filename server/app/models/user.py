
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
import re


class UserBase(BaseModel):
    email: EmailStr = Field(..., description="User's email address")
    firstName: str = Field(..., min_length=2, max_length=50, description="User's first name")
    lastName: str = Field(..., min_length=2, max_length=50, description="User's last name")


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="User's password")
    
    @validator('password')
    def password_strength(cls, v):
        """Check for password strength"""
        # At least 8 chars, one letter, one number
        if not re.match(r'^(?=.*[A-Za-z])(?=.*\d).{8,}$', v):
            raise ValueError(
                'Password must be at least 8 characters with at least one letter and one number'
            )
        return v


class UserUpdate(BaseModel):
    firstName: Optional[str] = Field(None, min_length=2, max_length=50)
    lastName: Optional[str] = Field(None, min_length=2, max_length=50)
    email: Optional[EmailStr] = None


class UserInDB(UserBase):
    id: str
    created_at: datetime
    hashed_password: str


class User(UserBase):
    id: str
    created_at: datetime


class UserResponse(BaseModel):
    user: User
    token: str


class TokenData(BaseModel):
    email: str = None
    exp: int = None


class Token(BaseModel):
    access_token: str
    token_type: str
