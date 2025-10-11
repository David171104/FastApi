import mysql.connector
from fastapi import HTTPException, Request
from app.config.db_config import get_db_connection #Connection to BD
from app.models.users.user_model import User #Model
from app.models.services.service_model import Service
from fastapi.encoders import jsonable_encoder #Serializable JSON structures
from fastapi.responses import JSONResponse
from werkzeug.security import *


class UserController:

    def update(self, user_id: int, user: User):
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

        
    def create_service(self, service: Service):   
        try:
            conn = get_db_connection()
            cursor = conn.cursor()


            cursor.execute(
                "INSERT INTO services (client_id,request_date,request_time,service_type,address) VALUES (%s, %s, %s, %s,%s)", 
                (   service.client_id, 
                    service.request_date,
                    service.request_time,
                    service.service_type,
                    service.address,
                )
            )

            conn.commit()
            conn.close()

            return JSONResponse(status_code=200, content={"message": "Servicio solicitado"})
        
        except mysql.connector.Error as err:
            conn.rollback()
            raise HTTPException(status_code=500, detail=str(err))
        finally:
            conn.close()

    def get_services(self, client_id: int):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Solo selecciona los servicios del cliente cuyo deleted_at sea NULL
            cursor.execute("""
                SELECT id, client_id, request_date, request_time, service_type, address, current_status, deleted_at
                FROM services
                WHERE client_id = %s AND deleted_at IS NULL
            """, (client_id,))

            result = cursor.fetchall()

            payload = []
            content = {}

            for data in result:
                content = {
                    'id': data[0],
                    'client_id': data[1],
                    'request_date': data[2],
                    'request_time': data[3],
                    'service_type': data[4],
                    'address': data[5],
                    'current_status': data[6],
                }
                payload.append(content)
                content = {}

            json_data = jsonable_encoder(payload)

            if result:
                return {"resultado": json_data}
            else:
                raise HTTPException(status_code=404, detail="No hay servicios registrados para este cliente")

        except mysql.connector.Error as err:
            raise HTTPException(status_code=500, detail=str(err))
        finally:
            conn.close()
