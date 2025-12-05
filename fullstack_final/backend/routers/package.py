from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Optional
from database import get_session
from models import Package
from pydantic import BaseModel

router = APIRouter(
    prefix="/packages",
    tags=["packages"]
)

# -----------------------------------
# CREATE PACKAGE
# -----------------------------------
@router.post("/")
def create_package(package: Package, session: Session = Depends(get_session)):
    session.add(package)
    session.commit()
    session.refresh(package)
    return package

# -----------------------------------
# GET ALL PACKAGES
# -----------------------------------
@router.get("/")
def get_packages(session: Session = Depends(get_session)):
    return session.exec(select(Package)).all()

# -----------------------------------
# PATCH /packages/{id} -> UPDATE 
# -----------------------------------
class PackageUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    duration: Optional[str]

@router.patch("/{package_id}")
def update_package(package_id: int, update: PackageUpdate, session: Session = Depends(get_session)):
    package = session.get(Package, package_id)
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    update_data = update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(package, key, value)

    session.add(package)
    session.commit()
    session.refresh(package)
    return package