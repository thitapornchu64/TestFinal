from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class BookingCreate(BaseModel):
    photographer_id: int
    package_id: int
    date: datetime

class SlotCreate(BaseModel):
    start_time: datetime
    end_time: datetime