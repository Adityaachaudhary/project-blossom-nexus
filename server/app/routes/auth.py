
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..models.user import UserCreate, UserResponse, User, TokenData
from ..utils.security import verify_password, get_password_hash, create_access_token, decode_token
from ..database.mongodb import get_db
import uuid
from datetime import datetime, timedelta
from typing import Optional
import motor.motor_asyncio

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not found"}},
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


async def get_user_by_email(db: motor.motor_asyncio.AsyncIOMotorClient, email: str):
    """
    Get a user by email
    """
    user = await db.users.find_one({"email": email})
    return user


async def authenticate_user(db: motor.motor_asyncio.AsyncIOMotorClient, email: str, password: str):
    """
    Authenticate a user with email and password
    """
    user = await get_user_by_email(db, email)
    
    if not user:
        return False
    
    if not verify_password(password, user["hashed_password"]):
        return False
    
    return user


async def get_current_user(db: motor.motor_asyncio.AsyncIOMotorClient = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """
    Get the current authenticated user
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_token(token)
    if payload is None:
        raise credentials_exception
    
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    token_data = TokenData(email=email)
    user = await get_user_by_email(db, email=token_data.email)
    
    if user is None:
        raise credentials_exception
    
    return user


@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserCreate, db: motor.motor_asyncio.AsyncIOMotorClient = Depends(get_db)):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = await get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    
    user_db = {
        "id": user_id,
        "firstName": user_data.firstName,
        "lastName": user_data.lastName,
        "email": user_data.email,
        "hashed_password": hashed_password,
        "created_at": datetime.now()
    }
    
    # Insert user into database
    await db.users.insert_one(user_db)
    
    # Generate token
    token_data = {"sub": user_data.email}
    token = create_access_token(token_data)
    
    # Create response user (without password)
    user = {
        "id": user_id,
        "firstName": user_data.firstName,
        "lastName": user_data.lastName,
        "email": user_data.email,
        "created_at": user_db["created_at"]
    }
    
    return {"user": user, "token": token}


@router.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: motor.motor_asyncio.AsyncIOMotorClient = Depends(get_db)):
    """
    Authenticate user and return token
    """
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate token
    token_data = {"sub": user["email"]}
    token = create_access_token(token_data)
    
    # Create response user (without password)
    user_response = {
        "id": user["id"],
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "email": user["email"],
        "created_at": user["created_at"]
    }
    
    return {"user": user_response, "token": token}


@router.get("/me", response_model=User)
async def get_user_me(current_user: dict = Depends(get_current_user)):
    """
    Get current user's info
    """
    user = {
        "id": current_user["id"],
        "firstName": current_user["firstName"],
        "lastName": current_user["lastName"],
        "email": current_user["email"],
        "created_at": current_user["created_at"]
    }
    return user
