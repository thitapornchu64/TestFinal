from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import User
from schemas import UserCreate, UserLogin

router = APIRouter(prefix="/auth")

@router.post("/register")
def register(data: UserCreate, session: Session = Depends(get_session)):
    user_exists = session.exec(select(User).where(User.email == data.email)).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already used")

    user = User(
        name=data.name,
        email=data.email,
        password=data.password
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"message": "Registered", "user": user}

@router.post("/login")
def login(data: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.email == data.email, User.password == data.password)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login success", "user": user}
