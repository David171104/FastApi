from fastapi import FastAPI
from app.routes.registerAndLogin.register_routes import router as register_router
from app.routes.registerAndLogin.login_routes import router as login_router
from app.routes.users.user_routes import router as user_router
from app.routes.users.admin_routes import router as admin_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Montar recursos estáticos
app.mount("/resources", StaticFiles(directory="app/resources"), name="resources")

origins = [
    "http://localhost",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register_router)
app.include_router(login_router)
app.include_router(user_router)
app.include_router(admin_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)