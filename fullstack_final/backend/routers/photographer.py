from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models import User, PhotographerSlot
from schemas import SlotCreate

router = APIRouter(prefix="/photographer")

@router.get("/")
def get_photographers(session: Session = Depends(get_session)):
    return session.exec(select(User).where(User.role == "photographer")).all()

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

@router.get("/{photographer_id}/slots")
def get_slots(photographer_id: int, session: Session = Depends(get_session)):
    return session.exec(
        select(PhotographerSlot).where(PhotographerSlot.photographer_id == photographer_id)
    ).all()