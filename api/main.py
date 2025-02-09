from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import database
from typing import List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from image_to_list.image_to_list.test import analyze_image

##### configs #####
app = FastAPI()
origins = [
    "http://localhost:5174",  
    "http://127.0.0.1:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],
)

# OAuth2PasswordBearer is used to retrieve the token from the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# JWT configurations
SECRET_KEY = "secret-key-for-jwt"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Access token will expire in 30 minutes

# Bcrypt password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database session dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
##### configs end #####

##### JWT Helper Functions #####
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    # Refresh token expires in 7 days
    expires_delta = timedelta(days=7)
    return create_access_token(data, expires_delta)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_timestamp = payload.get("exp")
        
        # Convert exp to datetime
        if exp_timestamp is not None:
            exp_datetime = datetime.utcfromtimestamp(exp_timestamp)
            if exp_datetime >= datetime.utcnow():
                return payload
        return None
    except JWTError:
        return None
##### JWT Helper Functions end #####


##### Test API #####
@app.get("/")
async def root():
    return {"message": "FastAPI is working fine for you"}
##### Test API ends #####

##### User API #####
@app.post("/users/", response_model=database.UserCreate)
def create_user(user: database.UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    db_user = database.User(
        username=user.username,
        password=hashed_password,
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
    users = db.query(database.User).all()
    for user in users:
        user.date_of_occurrence = user.date_of_occurrence.strftime("%Y-%m-%d")
    return users

@app.get("/users/{user_id}", response_model=database.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(database.User).filter(database.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.date_of_occurrence = db_user.date_of_occurrence.strftime("%Y-%m-%d")
    return db_user

# @app.get("/users/me", response_model=database.UserResponse)
# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     payload = decode_token(token)
#     if payload is None:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")

#     user_id = payload.get("user_id")
#     db_user = db.query(database.User).filter(database.User.id == user_id).first()

#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")

#     return db_user


##### Authentication API #####
@app.post("/token", response_model=database.Token)
def login_for_access_token(form_data: database.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(database.User).filter(database.User.username == form_data.username).first()
    if db_user is None or not verify_password(form_data.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    # Create access and refresh tokens
    access_token = create_access_token(data={"sub": db_user.username})
    refresh_token = create_refresh_token(data={"sub": db_user.username}) 
    
    # Return both access and refresh tokens
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,  # Adding refresh token
        "token_type": "bearer"
    }


@app.post("/token/refresh", response_model=database.Token)
def refresh_access_token(refresh_token_request: database.RefreshTokenRequest, db: Session = Depends(get_db)):
    # Decode the refresh token
    payload = decode_token(refresh_token_request.refresh_token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    # Create a new access token using the user identifier or username from the payload
    new_access_token = create_access_token(data={"sub": payload["sub"]})
    
    # Create a new refresh token
    new_refresh_token = create_refresh_token(data={"sub": payload["sub"]})

    return {
        "access_token": new_access_token, 
        "refresh_token": new_refresh_token,  # Return the new refresh token
        "token_type": "bearer"
    }
##### Authentication API ends #####



##### Upload #####
from fastapi import File, UploadFile, Query
from fastapi.responses import JSONResponse
from google.cloud import storage

storage_client = storage.Client()
bucket = storage_client.get_bucket('image_to_insurance_hacknyu')

@app.post("/upload/")
async def upload_image(
    image: UploadFile = File(...), 
    username: str = Query(..., description="The username to store the image under")
):
    image_data = await image.read()
    
    file_name = f"hack_images/{username}/{image.filename}"
    
    blob = bucket.blob(file_name)
    blob.upload_from_string(image_data, content_type=image.content_type)
    
    image_url = blob.public_url
    
    return JSONResponse(content={"message": "Image uploaded successfully!", "image_url": image_url})

@app.get("/images/")
def get_user_images(username: str = Query(..., description="The username to fetch images for")):
    # List all objects in the GCP bucket under the folder prefix 'hack_images/{username}/'
    prefix = f"hack_images/{username}/"
    blobs = bucket.list_blobs(prefix=prefix)

    image_urls = []
    
    # Iterate through the blobs and collect the public URLs
    for blob in blobs:
        image_urls.append(blob.public_url)
    
    if not image_urls:
        return JSONResponse(content={"message": "No images found for this user."}, status_code=404)

    return JSONResponse(content={"message": "Images fetched successfully!", "image_urls": image_urls})


##### Image Analysis API #####
@app.get("/analyze/")
def analyze(image_url: str):
    return analyze_image(image_url)
##### Image Analysis API Ends #####