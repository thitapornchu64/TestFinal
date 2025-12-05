from fastapi import FastAPI
from routers import auth, booking, photographer, package
from database import create_db_and_tables

app = FastAPI()

@app.on_event("startup")
def on_start():
    create_db_and_tables()

app.include_router(auth.router)
app.include_router(booking.router)
app.include_router(photographer.router)
app.include_router(package.router)