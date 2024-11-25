from fastapi import APIRouter, HTTPException
from postgrest import APIError

from backend.app.models.User import User
from backend.app.database import supabase

router = APIRouter()

# POST Endpoint: Create a User
@router.post("/")
async def create_user(user: User):
    try:
        response = supabase.table("User").insert(user.dict()).execute()
        return {"message": "User created successfully", "data": response.data}
    except APIError as e:
        raise HTTPException(status_code=400, detail=e.message+ user.json())

# GET Endpoint: Retrieve a User by ID



@router.get("/{user_id}")
async def get_user_by_id(user_id: int):
    try:
        response = supabase.table("User").select("*").eq("id", user_id).execute()
        if not response.data:
            # Raise HTTPException directly for a missing user
            raise HTTPException
        return {"message": "User retrieved successfully", "data": response.data}
    except Exception as e:
        # Handle unexpected exceptions
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")




# GET Endpoint: Retrieve all Users
@router.get("/")
async def get_all_users():
    try:
        response = supabase.table("User").select("*").execute()
        return {"message": "All users retrieved successfully", "data": response.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e.message}")

