from fastapi import FastAPI
from .routes.PostRoutes import router as post_router
from .routes.UserRoutes import router as user_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to the URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(post_router, prefix="/posts", tags=["Posts"])
app.include_router(user_router, prefix="/users", tags=["Users"])


