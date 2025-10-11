import mysql.connector
from fastapi import HTTPException, Request
from app.config.db_config import get_db_connection #Connection to BD
from app.models.users.user_model import User #Model
from app.models.login.user_login_model import UserLogin
from fastapi.encoders import jsonable_encoder #Serializable JSON structures
from fastapi.responses import JSONResponse
from werkzeug.security import *


class AdminController:
    
    def get_user(self, user_id: int):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            result = cursor.fetchone()
            payload = []
            content = {} 
            
            content={
                    'id':int(result[0]),
                    'name':result[1],
                    'last_name':result[2],
                    'document_number':result[3],
                    'email':result[4],
                    'age':result[5],
                    'role_id':result[6]
            }
            payload.append(content)
            
            json_data = jsonable_encoder(content)            
            if result:
               return  json_data
            else:
                raise HTTPException(status_code=404, detail="User not found")  
                
        except mysql.connector.Error as err:
            conn.rollback()
            raise HTTPException(status_code=404, detail=str(err))
        finally:
            conn.close()
       
    def get_all_users(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
            result = cursor.fetchall()
            payload = []
            content = {} 
            for data in result:
                content={
                    'id':data[0],
                    'name':data[1],
                    'last_name':data[2],
                    'email':data[3],
                    'document_number':data[4],
                    'age':data[5],
                    'role_id':data[7]
                }
                payload.append(content)
                content = {}
            json_data = jsonable_encoder(payload)        
            if result:
               return {"resultado": json_data}
            else:
                raise HTTPException(status_code=404, detail="Users not found")  
                
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            conn.close()


    def update_user(self, user_id: int, user: User):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            query = """
                UPDATE users
                SET 
                    name = %s,
                    last_name = %s,
                    email = %s,
                    age = %s,
                    role_id = %s
                WHERE id = %s
            """
            values = (
                user.name,
                user.last_name,
                user.email,
                user.age,
                user.role_id,
                user_id
            )

            cursor.execute(query, values)
            conn.commit()

            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            return {"message": " Usuario actualizado correctamente"}

        except mysql.connector.Error as err:
            if conn:
                conn.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la base de datos: {err}")

        finally:
            if conn:
                conn.close()


