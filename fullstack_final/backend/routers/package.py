from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models import Package

router = APIRouter(prefix="/packages")

@router.post("/")
def create_package(package: Package, session: Session = Depends(get_session)):
    session.add(package)
    session.commit()
    session.refresh(package)
    return package

@router.get("/")
def get_packages(session: Session = Depends(get_session)):
    return session.exec(select(Package)).all()