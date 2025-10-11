from fastapi import APIRouter, HTTPException
from app.controllers.registerAndLogin.login_controller import *
from app.models.login.user_login_model import UserLogin
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

router = APIRouter()

loginController = LoginController()

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
@router.post("/users/user_login")
async def login(user: UserLogin):
    response = loginController.login_user(user)
    return response