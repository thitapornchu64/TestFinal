from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Booking, PhotographerSlot
from schemas import BookingCreate

router = APIRouter(prefix="/booking")

@router.post("/")
def create_booking(data: BookingCreate, session: Session = Depends(get_session)):
    slots = session.exec(
        select(PhotographerSlot).where(
            PhotographerSlot.photographer_id == data.photographer_id
        )
    ).all()

    valid = False
    for slot in slots:
        if slot.start_time <= data.date <= slot.end_time:
            valid = True

    if not valid:
        raise HTTPException(status_code=400, detail="Selected time is not available")

    booking = Booking(
        user_id=1,  # simplified
        photographer_id=data.photographer_id,
        package_id=data.package_id,
        date=data.date
    )

    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking

@router.get("/")
def get_bookings(session: Session = Depends(get_session)):
    return session.exec(select(Booking)).all()