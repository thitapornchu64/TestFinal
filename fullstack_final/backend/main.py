from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, booking, photographer, package
from database import create_db_and_tables

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}

@app.on_event("startup")
def on_start():
    create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(auth.router)
app.include_router(booking.router)
app.include_router(photographer.router)
app.include_router(package.router)