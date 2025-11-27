# ============================================================
#   API IoT ESP32 (WiFi) + MySQL — Versión Final
# ============================================================

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import datetime
import pytz

# ============================================================
#  CONFIGURACIÓN BASE DE DATOS
# ============================================================

DATABASE_URL = "mysql+mysqlconnector://root:@localhost/fastapi_bd"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ============================================================
#  MODELO SQLALCHEMY
# ============================================================

class Lectura(Base):
    __tablename__ = "lecturas"

    id = Column(Integer, primary_key=True, index=True)
    fecha_hora = Column(DateTime, nullable=False)
    temperatura = Column(Float, nullable=False)
    humedad = Column(Float, nullable=False)
    corriente = Column(Float, nullable=False)

Base.metadata.create_all(bind=engine)

# ============================================================
#  SCHEMAS Pydantic
# ============================================================

class LecturaIn(BaseModel):
    temperatura: float
    humedad: float
    corriente: float

class LecturaOut(LecturaIn):
    id: int
    fecha_hora: datetime.datetime
    
    class Config:
        orm_mode = True

# ============================================================
#  FASTAPI CONFIG
# ============================================================

app = FastAPI(
    title="API IoT ESP32 (WiFi)",
    description="Recepción de lecturas IoT en MySQL",
    version="3.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

COLOMBIA_TZ = pytz.timezone("America/Bogota")

# ============================================================
#  DATABASE DEPENDENCY
# ============================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============================================================
#  ENDPOINT PRINCIPAL
# ============================================================

@app.post("/lecturas", response_model=LecturaOut)
async def crear_lectura(
    lectura: LecturaIn,
    request: Request,
    db: Session = Depends(get_db)
):

    now = datetime.datetime.now(COLOMBIA_TZ)

    nueva = Lectura(
        fecha_hora=now,
        temperatura=lectura.temperatura,
        humedad=lectura.humedad,
        corriente=lectura.corriente
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    print(
        f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] "
        f"IP {request.client.host} → "
        f"T={lectura.temperatura}, H={lectura.humedad}, I={lectura.corriente}"
    )

    return nueva

# ============================================================
#  ENDPOINTS DE CONSULTA
# ============================================================

@app.get("/lecturas", response_model=List[LecturaOut])
def listar_lecturas(limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Lectura).order_by(Lectura.fecha_hora.desc()).limit(limit).all()

@app.get("/lecturas/ultima", response_model=LecturaOut)
def ultima_lectura(db: Session = Depends(get_db)):
    ultima = (
        db.query(Lectura)
        .order_by(Lectura.fecha_hora.desc())
        .first()
    )
    if not ultima:
        raise HTTPException(status_code=404, detail="No hay lecturas")
    return ultima
