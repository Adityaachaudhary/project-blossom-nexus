
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid
from enum import Enum
import os
import motor.motor_asyncio
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Freelance Project Marketplace API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.freelance_marketplace
projects_collection = db.projects


class ProjectStatus(str, Enum):
    OPEN = "OPEN"
    COMPLETED = "COMPLETED"


class ProjectBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=20)
    budget: int = Field(..., gt=0)
    tech_stack: List[str] = Field(..., min_items=1)


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    status: ProjectStatus


class ProjectInDB(ProjectBase):
    id: str
    status: ProjectStatus = ProjectStatus.OPEN
    created_at: datetime


class Project(ProjectInDB):
    pass


@app.get("/")
async def root():
    return {"message": "Welcome to the Freelance Project Marketplace API"}


@app.get("/projects", response_model=List[Project])
async def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    tech: Optional[str] = None,
    min_budget: Optional[int] = None,
    max_budget: Optional[int] = None,
    status: Optional[ProjectStatus] = None,
):
    """
    Get all projects with optional filtering and pagination
    """
    filter_query = {}
    
    # Apply filters if provided
    if tech:
        filter_query["tech_stack"] = {"$in": [tech]}
    if min_budget is not None:
        filter_query["budget"] = {"$gte": min_budget}
    if max_budget is not None:
        filter_query["budget"] = filter_query.get("budget", {}) | {"$lte": max_budget}
    if status:
        filter_query["status"] = status

    cursor = projects_collection.find(filter_query).skip(skip).limit(limit).sort("created_at", -1)
    projects = await cursor.to_list(length=limit)
    
    # Convert ObjectId to string for JSON serialization
    for project in projects:
        project["id"] = str(project["_id"])
        del project["_id"]
    
    return projects


@app.post("/projects", response_model=Project, status_code=201)
async def create_project(project: ProjectCreate):
    """
    Create a new project
    """
    project_dict = project.dict()
    project_dict["id"] = str(uuid.uuid4())
    project_dict["status"] = ProjectStatus.OPEN
    project_dict["created_at"] = datetime.now()
    
    result = await projects_collection.insert_one(project_dict)
    
    if result.inserted_id:
        return project_dict
    else:
        raise HTTPException(status_code=500, detail="Failed to create project")


@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """
    Get a specific project by ID
    """
    project = await projects_collection.find_one({"id": project_id})
    
    if project:
        project["id"] = str(project["_id"])
        del project["_id"]
        return project
    else:
        raise HTTPException(status_code=404, detail="Project not found")


@app.patch("/projects/{project_id}/status", response_model=Project)
async def update_project_status(project_id: str, project_update: ProjectUpdate):
    """
    Update a project's status (mark as completed)
    """
    project = await projects_collection.find_one({"id": project_id})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    result = await projects_collection.update_one(
        {"id": project_id},
        {"$set": {"status": project_update.status}}
    )
    
    if result.modified_count:
        updated_project = await projects_collection.find_one({"id": project_id})
        updated_project["id"] = str(updated_project["_id"])
        del updated_project["_id"]
        return updated_project
    else:
        raise HTTPException(status_code=500, detail="Failed to update project status")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
