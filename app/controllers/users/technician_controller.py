import mysql.connector
from fastapi import HTTPException, Request
from app.config.db_config import get_db_connection #Connection to BD
from app.models.users.user_model import User #Model
from app.models.login.user_login_model import UserLogin
from fastapi.encoders import jsonable_encoder #Serializable JSON structures
from fastapi.responses import JSONResponse
from werkzeug.security import *

class TechniccianController:
    def update_user(self, user_id: int, user: User):
        try:
            
            name = user.name
            last_name = user.last_name
            email = user.email
            document_number = user.document_number
            age = user.age

            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("""
                UPDATE users
                SET name = %s,
                    last_name = %s,
                    email = %s,
                    document_number = %s,
                    age = %s
                WHERE id = %s
            """, (name, last_name, email, document_number, age, user_id))

            conn.commit()

            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            return {"message": "Usuario actualizado correctamente"}

        except mysql.connector.Error as err:
            conn.rollback()
            raise HTTPException(status_code=500, detail=str(err))

        finally:
            conn.close()


    def get_services_by_technician(self, technician_id):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

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
                WHERE services.technician_id = %s
                ORDER BY services.request_date DESC, services.request_time DESC;
            """
            cursor.execute(query, (technician_id,))
            services = cursor.fetchall()
            
            return {"resultado": services}

        except Exception as e:
            print("Error al obtener los servicios del técnico:", e)
            raise HTTPException(status_code=500, detail="Error al obtener los servicios del técnico")
        finally:
            if conn:
                conn.close()
