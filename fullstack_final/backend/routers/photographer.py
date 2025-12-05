from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Optional
from pydantic import BaseModel
from database import get_session
from models import User, PhotographerSlot
from schemas import SlotCreate

router = APIRouter(
    prefix="/photographer",
    tags=["photographer"]
)

# ------------------------
# GET ALL PHOTOGRAPHERS
# ------------------------
@router.get("/")
def get_photographers(session: Session = Depends(get_session)):
    return session.exec(select(User).where(User.role == "photographer")).all()

# ------------------------
# ADD SLOT
# ------------------------
@router.post("/{photographer_id}/slots")
def add_slot(photographer_id: int, data: SlotCreate, session: Session = Depends(get_session)):
    slot = PhotographerSlot(
        photographer_id=photographer_id,
        start_time=data.start_time,
        end_time=data.end_time
    )
    session.add(slot)
    session.commit()
    session.refresh(slot)
    return slot

# ------------------------
# GET SLOTS
# ------------------------
@router.get("/{photographer_id}/slots")
def get_slots(photographer_id: int, session: Session = Depends(get_session)):
    return session.exec(
        select(PhotographerSlot).where(PhotographerSlot.photographer_id == photographer_id)
    ).all()

# ------------------------
# PATCH /photographer/{photographer_id} 
# ------------------------
class PhotographerUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]

@router.patch("/{photographer_id}")
def update_photographer(photographer_id: int, update: PhotographerUpdate, session: Session = Depends(get_session)):
    photographer = session.get(User, photographer_id)
    if not photographer or photographer.role != "photographer":
        raise HTTPException(status_code=404, detail="Photographer not found")

    update_data = update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(photographer, key, value)

    session.add(photographer)
    session.commit()
    session.refresh(photographer)
    return photographer