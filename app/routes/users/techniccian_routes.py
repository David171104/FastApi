from fastapi import APIRouter, Depends
from app.controllers.users.technician_controller import *
from app.models.users.user_model import User
from app.models.services.service_model import Service
from app.models.login.user_login_model import UserLogin
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.auth import verify_token 

router = APIRouter()

techniccianController = TechniccianController()



#FUNCTIONAL ROUTES
@router.get("/services/technician/{technician_id}")
def get_services_by_technician(technician_id: int, token_data: dict = Depends(verify_token)):
    response = techniccianController.get_services_by_technician(technician_id)
    return response  

