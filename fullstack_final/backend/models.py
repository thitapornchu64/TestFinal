from sqlmodel import SQLModel, Field
from datetime import datetime

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str
    role: str = "user"   

class Package(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    price: int
    duration: int
    description: str | None = None

class Booking(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int
    photographer_id: int
    package_id: int
    date: datetime
    status: str = "pending"

class PhotographerSlot(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    photographer_id: int
    start_time: datetime
    end_time: datetime