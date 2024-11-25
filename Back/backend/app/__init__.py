from fastapi import FastAPI
from .routes.PostRoutes import router as post_router
from .routes.UserRoutes import router as user_router

app = FastAPI()

# Include routers
app.include_router(post_router, prefix="/posts", tags=["Posts"])
app.include_router(user_router, prefix="/users", tags=["Users"])


