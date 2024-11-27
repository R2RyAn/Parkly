from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from postgrest import APIError
from datetime import datetime
from typing import List

from backend.app.models.Post import Post
from backend.app.database import supabase

router = APIRouter()

# Best Practice: Define constants for table names for reusability and consistency
TABLE_NAME = "Post"

# POST Endpoint: Create a Post
@router.post("/")
async def create_post(post: Post):
    try:
        # Validate availability dates
        if post.availability_start >= post.availability_end:
            raise HTTPException(status_code=400, detail="Availability start must be before availability end.")

        # Convert the Post object into a JSON-serializable dict
        data = jsonable_encoder(post)

        # Insert post into the database
        response = supabase.table(TABLE_NAME).insert([data]).execute()
        return {"message": "Post created successfully", "data": response.data}
    except APIError as e:
        raise HTTPException(status_code=400, detail=f"Database error: {e.message}, Post: {data}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# GET Endpoint: Retrieve a Post by ID
@router.get("/{post_id}")
async def get_post_by_id(post_id: str):
    """
    Retrieves a post by its ID.
    """
    try:
        response = supabase.table(TABLE_NAME).select("*").eq("id", post_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Post with ID {post_id} not found.")
        return {"message": "Post retrieved successfully", "data": response.data[0]}
    except APIError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# GET Endpoint: Retrieve all Posts
@router.get("/")
async def get_all_posts():
    """
    Retrieves all posts in the database.
    """
    try:
        response = supabase.table(TABLE_NAME).select("*").execute()
        return {"message": "All posts retrieved successfully", "data": response.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# GET Endpoint: Retrieve Posts by Owner ID
@router.get("/owner/{owner_id}")
async def get_posts_by_owner(owner_id: str):
    """
    Retrieves all posts belonging to a specific owner by their ID.
    """
    try:
        response = supabase.table(TABLE_NAME).select("*").eq("owner_id", owner_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"No posts found for owner ID {owner_id}.")
        return {"message": "Posts retrieved successfully", "data": response.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# DELETE Endpoint: Delete a Post by ID
@router.get("/{post_id}")
async def get_post_by_id(post_id: str):
    try:
        response = supabase.table(TABLE_NAME).select("*").eq("id", post_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Post with ID {post_id} not found.")

        # Convert datetime fields to ISO 8601 strings
        post_data = response.data[0]
        post_data['availability_start'] = str(post_data['availability_start'])
        post_data['availability_end'] = str(post_data['availability_end'])

        return {"message": "Post retrieved successfully", "data": post_data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


