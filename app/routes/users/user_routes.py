from fastapi import APIRouter, Depends
from app.controllers.users.user_controller import *
from app.models.users.user_model import User
from app.models.login.user_login_model import UserLogin
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.auth import verify_token 

router = APIRouter()

userController = UserController()





#FUNCTIONAL ROUTES
@router.put("/users/update/{user_id}") 
async def update(user_id: int, user: User, token_data: dict = Depends(verify_token)):
    response = userController.update(user_id, user)
    return response

@router.post("/users/services/create")
async def create_service(service: Service, token_data: dict = Depends(verify_token)):
    response = userController.create_service(service)
    return response



@router.get("/users/services/list/{client_id}")
async def get_services(client_id: int, token_data: dict = Depends(verify_token)):
    response = userController.get_services(client_id)
    return response


 
