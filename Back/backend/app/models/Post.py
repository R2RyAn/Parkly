from pydantic import BaseModel
from typing import List
from datetime import datetime

class Post(BaseModel):
    title: str
    owner_id: str
    description: str
    location: str
    price: float
    availability_start: datetime
    availability_end: datetime
    content: List[str]
