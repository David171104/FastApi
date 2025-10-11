from fastapi import APIRouter, HTTPException
from app.controllers.users.user_controller import *
from app.controllers.registerAndLogin.register_controller import *
from app.models.users.user_model import User
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

router = APIRouter()

registerController = RegisterController()

# STATIC FOLDER
# router.mount("/resources", StaticFiles(directory="app/resources"), name="resources")


# FILES ROUTES
# @router.get("/users/register")
# async def register_page():
#     return FileResponse("app/resources/html/register.html")

# @router.get("/users/login")
# async def login_page():
#     return FileResponse("app/resources/html/login.html")




#FUNCTIONAL ROUTES
@router.post("/users/create_user")
async def create_user(user: User):
    response = registerController.create_user(user)
    return response




 
