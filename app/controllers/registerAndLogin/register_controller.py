import mysql.connector
from fastapi import HTTPException, Request
from app.config.db_config import get_db_connection #Connection to BD
from app.models.users.user_model import User #Model
from app.models.login.user_login_model import UserLogin
from fastapi.encoders import jsonable_encoder #Serializable JSON structures
from fastapi.responses import JSONResponse
from werkzeug.security import *


class RegisterController:
        

    def create_user(self, user: User):   
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            hashed_password = generate_password_hash(user.password, method='scrypt')

            cursor.execute(
                "INSERT INTO users (name,last_name,document_number,email,age,password,role_id,created_at,updated_at) VALUES (%s, %s, %s, %s, %s, %s ,%s,%s,%s)", 
                (   user.name, 
                    user.last_name,
                    user.document_number,
                    user.email,
                    user.age, 
                    hashed_password,
                    user.role_id, 
                    user.created_at, 
                    user.updated_at
                )
            )

            conn.commit()
            conn.close()

            return JSONResponse(status_code=200, content={"message": "Usuario creado"})
        
        except mysql.connector.Error as err:
            conn.rollback()
            raise HTTPException(status_code=500, detail=str(err))
        finally:
            conn.close()
