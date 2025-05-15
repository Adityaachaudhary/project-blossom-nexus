
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import motor.motor_asyncio
from passlib.context import CryptContext

# Load environment variables
load_dotenv()

app = FastAPI(
    title="FreelanceHub API",
    description="Backend API for FreelanceHub platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data for projects
projects = [
    {
        "id": "1",
        "title": "Build a Responsive E-commerce Website",
        "description": "Looking for a skilled developer to build a responsive e-commerce website with product listings, shopping cart, and payment integration.",
        "budget": 2500,
        "deadline": "2025-06-15",
        "skills": ["React", "Node.js", "MongoDB"],
        "status": "open",
        "client": {
            "id": "101",
            "name": "Tech Solutions Inc."
        },
        "created_at": "2025-05-01"
    },
    {
        "id": "2",
        "title": "Logo Design for Tech Startup",
        "description": "Need a modern, clean logo design for our tech startup that specializes in AI solutions.",
        "budget": 500,
        "deadline": "2025-05-30",
        "skills": ["Logo Design", "Branding", "Adobe Illustrator"],
        "status": "open",
        "client": {
            "id": "102",
            "name": "AI Innovations"
        },
        "created_at": "2025-05-05"
    },
    {
        "id": "3",
        "title": "Mobile App Development - Fitness Tracker",
        "description": "We're looking to develop a fitness tracking mobile app for both iOS and Android platforms with features like workout logs, progress tracking, and social sharing.",
        "budget": 3500,
        "deadline": "2025-07-20",
        "skills": ["React Native", "Firebase", "UI/UX Design"],
        "status": "open",
        "client": {
            "id": "103",
            "name": "FitLife Solutions"
        },
        "created_at": "2025-05-10"
    }
]

@app.get("/")
def read_root():
    return {"message": "Welcome to FreelanceHub API"}

@app.get("/api/projects")
def get_projects():
    return {"projects": projects}

@app.get("/api/projects/{project_id}")
def get_project(project_id: str):
    project = next((p for p in projects if p["id"] == project_id), None)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# Run with: uvicorn main:app --reload
