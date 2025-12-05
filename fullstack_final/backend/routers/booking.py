from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Booking, PhotographerSlot
from schemas import BookingCreate

router = APIRouter(
    prefix="/booking",
    tags=["booking"]
)

# -----------------------------------
# CREATE BOOKING
# -----------------------------------
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

# -----------------------------------
# GET ALL BOOKINGS
# -----------------------------------
@router.get("/")
def get_bookings(session: Session = Depends(get_session)):
    return session.exec(select(Booking)).all()

# ------------------------
# PATCH /booking/{id}/cancel
# ------------------------
@router.patch("/{booking_id}/cancel")
def cancel_booking(booking_id: int, session: Session = Depends(get_session)):
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking.status == "canceled":
        raise HTTPException(status_code=400, detail="Booking already canceled")

    booking.status = "canceled"
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return {"message": f"Booking with id {booking_id} canceled successfully", "booking": booking}