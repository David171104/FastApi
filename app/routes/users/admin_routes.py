from fastapi import APIRouter, Depends
from app.controllers.admin.admin_controller import *
from app.models.users.user_model import User
from app.models.login.user_login_model import UserLogin
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.auth import verify_token 

router = APIRouter()

adminController = AdminController()


#FUNCTIONAL ROUTES
@router.get("/users/get_user/{user_id}",response_model=User)
async def get_user(user_id: int,  token_data: dict = Depends(verify_token)):
    response = adminController.get_user(user_id)
    return response

@router.get("/users/get_users/")
async def get_users(token_data: dict = Depends(verify_token)):
    response = adminController.get_all_users()
    return response

@router.put("/users/update_user/{user_id}") 
async def update_user(user_id: int, user: User, token_data: dict = Depends(verify_token)):
    response = adminController.update_user(user_id, user)
    return response


 
