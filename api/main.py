from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import database 
from typing import List

#####configs#####
app = FastAPI()
origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],
)
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
#####configs end#####


#####test API#####
@app.get("/")
async def root():
    return {"message": "fast api is working fine for you"}
#####test API ends#####



#####user#####
@app.post("/users/", response_model=List[database.UserCreate])
def create_user(user: database.UserCreate, db: Session = Depends(get_db)):
    db_user = database.User(
        username=user.username,
        password=user.password,
        first_name=user.first_name,
        middle_name=user.middle_name,
        last_name=user.last_name,
        insurance_provider=user.insurance_provider,
        street_address=user.street_address,
        city=user.city,
        state=user.state,
        zip_code=user.zip_code,
        age=user.age,
        date_of_occurrence=user.date_of_occurrence,
        job_occupation=user.job_occupation,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[database.UserResponse])
def get_users(db: Session = Depends(get_db)):
    '''
    This function is for GET request all list of users without password information 

    Returns: 
        [
            {
                "id": 1,
                "username": "test_user",
                "first_name": "John",
                "middle_name": "M",
                "last_name": "Doe",
                "insurance_provider": "XYZ Insurance",
                "street_address": "123 Main St",
                "city": "New York",
                "state": "NY",
                "zip_code": "10001",
                "age": 30,
                "date_of_occurrence": "2024-02-08",
                "job_occupation": "Engineer"
            }
        ]
    '''
    users = db.query(database.User).all()
    for user in users:
        user.date_of_occurrence = user.date_of_occurrence.strftime("%Y-%m-%d")

    return users

@app.get("/users/{user_id}", response_model=database.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    '''
    This function is for GET request a specific user without password information 

    Parameter: 
        user_id (int): id of a user to look up 
    Returns: 
        [
            {
                "id": 1,
                "username": "test_user",
                "first_name": "John",
                "middle_name": "M",
                "last_name": "Doe",
                "insurance_provider": "XYZ Insurance",
                "street_address": "123 Main St",
                "city": "New York",
                "state": "NY",
                "zip_code": "10001",
                "age": 30,
                "date_of_occurrence": "2024-02-08",
                "job_occupation": "Engineer"
            }
        ]
    '''
    db_user = db.query(database.User).filter(database.User.id == user_id).first()
    if db_user is None:
        return {"error": "User not found"}
    db_user.date_of_occurrence = db_user.date_of_occurrence.strftime("%Y-%m-%d")
    return db_user

# #update a user
# @app.put("/users/{user_id}", response_model=List[database.UserUpdate])
# def update_user(user: database.UserUpdate, user_id: int, db: Session = Depends(get_db)):
#     db_user = db.query(database.User).filter(database.User.id == user_id).first()
#     if db_user is None:
#         return {"error": "User not found"}

#     for key, value in user.dict(exclude_unset=True).items():
#         setattr(db_user, key, value)

#     db.commit()
#     db.refresh(db_user)
#     return db_user
