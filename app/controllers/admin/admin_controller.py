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
            cursor.execute("SELECT * FROM users WHERE deleted_at IS NULL ORDER BY id ASC")
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


    def create_user(self, user:User):
        if not user.name or user.name.strip() == "":
            raise HTTPException(status_code=400, detail="El nombre del usuario es obligatorio.")
        if not user.last_name or user.last_name.strip() == "":
            raise HTTPException(status_code=400, detail="El apellido del usuario es obligatorio.")
        if not user.email or user.email.strip() == "":
            raise HTTPException(status_code=400, detail="El email del usuario es obligatorio.")
        if not user.document_number:
            raise HTTPException(status_code=400, detail="El número de documento es obligatorio.")
        if not user.age:
            raise HTTPException(status_code=400, detail="La edad es obligatoria.")
        if not user.role_id:
            raise HTTPException(status_code=400, detail="Debe asignar un rol al usuario.")
        

        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)


            cursor.execute("SELECT id FROM users WHERE email = %s AND deleted_at IS NULL", (user.email,))
            existing_user = cursor.fetchone()
            if existing_user:
                raise HTTPException(status_code=400, detail="Ya existe un usuario con ese correo electrónico.")


            cursor.execute("""
                INSERT INTO users (name, last_name, email, document_number, age, role_id, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (
                user.name,
                user.last_name,
                user.email,
                user.document_number,
                user.age,
                user.role_id
            ))

            conn.commit()

            return {"message": f"Usuario '{user.name} {user.last_name}' creado correctamente."}

        except mysql.connector.Error as e:
            raise HTTPException(status_code=500, detail=f"Error al crear usuario: {e}")

        finally:
            if conn:
                cursor.close()
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


    def delete_user(self, user_id: int):
   
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()


            cursor.execute("SELECT id FROM users WHERE id = %s AND deleted_at IS NULL", (user_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Usuario no encontrado o ya eliminado.")

            cursor.execute("""
                UPDATE users
                SET deleted_at = NOW()
                WHERE id = %s
            """, (user_id,))
            conn.commit()

            return {"message": "Usuario eliminado correctamente."}

        except mysql.connector.Error as e:
            raise HTTPException(status_code=500, detail=f"Error al eliminar usuario: {e}")

        finally:
            if conn:
                cursor.close()
                conn.close()

    def get_all_services(self):
    
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            query = """
                SELECT 
                services.id,
                services.client_id,
                services.technician_id,
                services.request_date,
                services.request_time,
                services.service_type,
                services.address,
                services.current_status,
                CONCAT(users.name, ' ', users.last_name) AS client_name,
                CONCAT(users_technician.name, ' ', users_technician.last_name) AS technician_name
                FROM services
                LEFT JOIN users ON services.client_id = users.id
                LEFT JOIN users AS users_technician ON services.technician_id = users_technician.id
                ORDER BY services.request_date DESC, services.request_time DESC;

            """
            cursor.execute(query)
            services = cursor.fetchall()
            return {"resultado": services}

        except Exception as e:
            print("Error al obtener los servicios:", e)
            raise HTTPException(status_code=500, detail="Error al obtener los servicios")
        finally:
            if conn:
                conn.close()


    def get_all_technicians(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, last_name, email, document_number, age, role_id
                FROM users
                WHERE role_id = 2 AND deleted_at IS NULL
                ORDER BY id ASC
            """)
            result = cursor.fetchall()

            payload = []
            for data in result:
                payload.append({
                    'id': data[0],
                    'name': data[1],
                    'last_name': data[2],
                    'email': data[3],
                    'document_number': data[4],
                    'age': data[5],
                    'role_id': data[6],
                })

            if not payload:
                raise HTTPException(status_code=404, detail="No technicians found")

            return {"resultado": jsonable_encoder(payload)}

        except mysql.connector.Error as err:
            raise HTTPException(status_code=500, detail=str(err))
        finally:
            conn.close()

