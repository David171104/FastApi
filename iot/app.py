# app_wifi.py
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from zoneinfo import ZoneInfo
import datetime


# ============================================================
#  CONFIGURACIÓN BASE DE DATOS
# ============================================================

# Ajusta usuario/clave/host si es necesario
# Formato: mysql+mysqlconnector://USUARIO:CLAVE@HOST/BD
DATABASE_URL = "mysql+mysqlconnector://root:@localhost/fastapi_bd"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ============================================================
#  MODELO SQLALCHEMY (TABLA lecturas)
#  (MISMA TABLA QUE YA USA TU POWER BI)
# ============================================================

class Lectura(Base):
    __tablename__ = "lecturas"

    id = Column(Integer, primary_key=True, index=True)
    fecha_hora = Column(DateTime(timezone=True), nullable=False)
    temperatura = Column(Float, nullable=False)
    humedad = Column(Float, nullable=False)


# Crea la tabla si no existe
Base.metadata.create_all(bind=engine)


# ============================================================
#  SCHEMAS Pydantic (lo que entra / sale por la API)
# ============================================================

class LecturaIn(BaseModel):
    temperatura: float = Field(..., description="Temperatura en °C")
    humedad: float = Field(..., description="Humedad relativa %")


class LecturaOut(LecturaIn):
    id: int
    fecha_hora: datetime.datetime

    class Config:
        orm_mode = True


# ============================================================
#  INSTANCIA FASTAPI
# ============================================================

app = FastAPI(
    title="API IoT ESP32 (WiFi)",
    version="2.0.0",
    description=(
        "API que recibe lecturas de temperatura y humedad desde el ESP32 "
        "por WiFi y las guarda en MySQL para ser consumidas por Power BI."
    ),
)

# CORS: por si luego quieres consumir desde un front propio
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # puedes restringir luego
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
#  DEPENDENCIAS
# ============================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


COLOMBIA_TZ = ZoneInfo("America/Bogota")


# ============================================================
#  ENDPOINTS
# ============================================================

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "API IoT ESP32 WiFi funcionando",
        "docs": "/docs",
    }


@app.get("/health")
def healthcheck(db: Session = Depends(get_db)):
    """
    Endpoint sencillo para probar que la API y la BD responden.
    """
    # Intentar contar registros para verificar conexión a la BD
    try:
        total = db.query(Lectura).count()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en BD: {e}")
    return {"status": "ok", "lecturas_totales": total}


@app.post("/lecturas", response_model=LecturaOut)
def crear_lectura(
    lectura: LecturaIn,
    request: Request,
    db: Session = Depends(get_db),
):
    """
    Recibe lecturas del ESP32 por WiFi.

    BODY esperado (JSON):
    {
        "temperatura": 30.5,
        "humedad": 72.3
    }
    """
    now_colombia = datetime.datetime.now(tz=COLOMBIA_TZ)

    nueva = Lectura(
        fecha_hora=now_colombia,
        temperatura=lectura.temperatura,
        humedad=lectura.humedad,
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    # Log rápido en consola
    client_ip = request.client.host
    print(
        f"[{now_colombia.isoformat()}] "
        f"IP {client_ip} -> T={lectura.temperatura}°C, H={lectura.humedad}%"
    )

    return nueva


@app.get("/lecturas", response_model=List[LecturaOut])
def listar_lecturas(
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Devuelve las últimas lecturas (máx 'limit').
    De más reciente a más antigua.
    """
    lecturas = (
        db.query(Lectura)
        .order_by(Lectura.fecha_hora.desc())
        .limit(limit)
        .all()
    )
    return lecturas


@app.get("/lecturas/ultima", response_model=LecturaOut)
def ultima_lectura(db: Session = Depends(get_db)):
    """
    Devuelve la última lectura registrada.
    Ideal para probar desde el navegador.
    """
    ultima = (
        db.query(Lectura)
        .order_by(Lectura.fecha_hora.desc())
        .first()
    )
    if not ultima:
        raise HTTPException(status_code=404, detail="No hay lecturas registradas")
    return ultima


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)