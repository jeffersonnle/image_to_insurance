from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import Optional

DATABASE_URL = "mysql+pymysql://root:@localhost:3306/hack"

# Create the engine and session
engine = create_engine(DATABASE_URL, connect_args={"charset": "utf8mb4"})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy Model (Database interaction)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    first_name = Column(String(30), nullable=False)
    middle_name = Column(String(30), nullable=True)
    last_name = Column(String(30), nullable=False)
    insurance_provider = Column(String(50), nullable=True)
    street_address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    zip_code = Column(String(20), nullable=False)
    age = Column(Integer, nullable=True)
    date_of_occurrence = Column(Date, nullable=False)
    job_occupation = Column(String(50), nullable=True)

# Pydantic Model (Data validation)
class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    insurance_provider: Optional[str] = None
    street_address: str
    city: str
    state: str
    zip_code: str
    age: Optional[int] = None
    date_of_occurrence: str  
    job_occupation: Optional[str] = None

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    insurance_provider: Optional[str] = None
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    age: Optional[int] = None
    date_of_occurrence: Optional[str] = None
    job_occupation: Optional[str] = None

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    username: str
    first_name: str
    middle_name: Optional[str]
    last_name: str
    insurance_provider: Optional[str]
    street_address: str
    city: str
    state: str
    zip_code: str
    age: int
    date_of_occurrence: str
    job_occupation: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class UserLogin(BaseModel):
    username: str
    password: str
class RefreshTokenRequest(BaseModel):
    refresh_token: str

