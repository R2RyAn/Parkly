from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    full_name: str
    profile_pic: str
    role: str
    status: str
    phone_number: str