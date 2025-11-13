from fastapi import APIRouter, Depends,Request
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

@router.post("/users/admin-create_user")
async def create_user(user: User, token_data: dict = Depends(verify_token)):
    return adminController.create_user(user)

@router.put("/users/update_user/{user_id}") 
async def update_user(user_id: int, user: User, token_data: dict = Depends(verify_token)):
    response = adminController.update_user(user_id, user)
    return response

@router.delete("/users/delete/{user_id}")
async def delete_user(user_id: int, token_data: dict = Depends(verify_token)):
    return adminController.delete_user(user_id)
 

@router.get("/users/services/all")
async def get_users(token_data: dict = Depends(verify_token)):
    response = adminController.get_all_services()
    return response


@router.get("/users/technicians/all")
def get_all_technicians(token_data: dict = Depends(verify_token)):
    response = adminController.get_all_technicians()
    return response



@router.put("/users/services/{service_id}/assign")
async def assign_technician(service_id: int, request: Request, token_data: dict = Depends(verify_token)):
    try:
        data = await request.json() 
        technician_id = data.get("technician_id")

        if not technician_id:
            raise HTTPException(status_code=400, detail="El ID del técnico es obligatorio.")

        return adminController.assign_technician(service_id, technician_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))