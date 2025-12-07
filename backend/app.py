from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, DateTime, Text, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
import os
from typing import List, Optional
import uuid

# Database setup
DATABASE_URL = "sqlite:///./easit_app.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI app
app = FastAPI(title="Easit.ai Backend API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Models
class ConversationDB(Base):
    __tablename__ = "conversations"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    user_email = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MessageDB(Base):
    __tablename__ = "messages"
    
    id = Column(String, primary_key=True, index=True)
    conversation_id = Column(String, index=True)
    role = Column(String)  # 'user' or 'model'
    text = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

class UserDB(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    picture = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Pydantic Models
class MessageSchema(BaseModel):
    id: str
    role: str
    text: str
    timestamp: str
    
    class Config:
        from_attributes = True

class ConversationSchema(BaseModel):
    id: str
    title: str
    messages: List[MessageSchema] = []
    created_at: str
    
    class Config:
        from_attributes = True

class UserSchema(BaseModel):
    id: str
    name: str
    email: str
    picture: Optional[str] = None
    
    class Config:
        from_attributes = True

class CreateConversationRequest(BaseModel):
    title: str
    user_email: str

class CreateMessageRequest(BaseModel):
    conversation_id: str
    role: str
    text: str

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/")
async def root():
    return {"message": "Easit.ai Backend API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Conversation endpoints
@app.post("/api/conversations", response_model=ConversationSchema)
async def create_conversation(request: CreateConversationRequest, db: Session = Depends(get_db)):
    conversation_id = str(uuid.uuid4())
    db_conversation = ConversationDB(
        id=conversation_id,
        title=request.title,
        user_email=request.user_email
    )
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return {
        "id": db_conversation.id,
        "title": db_conversation.title,
        "created_at": db_conversation.created_at.isoformat(),
        "messages": []
    }

@app.get("/api/conversations")
async def get_conversations(email: str, db: Session = Depends(get_db)):
    conversations = db.query(ConversationDB).filter(ConversationDB.user_email == email).all()
    result = []
    for conv in conversations:
        messages = db.query(MessageDB).filter(MessageDB.conversation_id == conv.id).all()
        result.append({
            "id": conv.id,
            "title": conv.title,
            "created_at": conv.created_at.isoformat(),
            "messages": [
                {
                    "id": msg.id,
                    "role": msg.role,
                    "text": msg.text,
                    "timestamp": msg.timestamp.isoformat()
                } for msg in messages
            ]
        })
    return result

@app.get("/api/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    conversation = db.query(ConversationDB).filter(ConversationDB.id == conversation_id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    messages = db.query(MessageDB).filter(MessageDB.conversation_id == conversation_id).all()
    return {
        "id": conversation.id,
        "title": conversation.title,
        "created_at": conversation.created_at.isoformat(),
        "messages": [
            {
                "id": msg.id,
                "role": msg.role,
                "text": msg.text,
                "timestamp": msg.timestamp.isoformat()
            } for msg in messages
        ]
    }

# Message endpoints
@app.post("/api/messages")
async def create_message(request: CreateMessageRequest, db: Session = Depends(get_db)):
    message_id = str(uuid.uuid4())
    db_message = MessageDB(
        id=message_id,
        conversation_id=request.conversation_id,
        role=request.role,
        text=request.text
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return {
        "id": db_message.id,
        "role": db_message.role,
        "text": db_message.text,
        "timestamp": db_message.timestamp.isoformat()
    }

@app.get("/api/conversations/{conversation_id}/messages")
async def get_messages(conversation_id: str, db: Session = Depends(get_db)):
    messages = db.query(MessageDB).filter(MessageDB.conversation_id == conversation_id).all()
    return [
        {
            "id": msg.id,
            "role": msg.role,
            "text": msg.text,
            "timestamp": msg.timestamp.isoformat()
        } for msg in messages
    ]

# User endpoints
@app.post("/api/users")
async def create_user(user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if db_user:
        return {"id": db_user.id, "name": db_user.name, "email": db_user.email, "picture": db_user.picture}
    
    db_user = UserDB(
        id=user.id,
        name=user.name,
        email=user.email,
        picture=user.picture
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email, "picture": db_user.picture}

@app.get("/api/users/{email}", response_model=UserSchema)
async def get_user(email: str, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
