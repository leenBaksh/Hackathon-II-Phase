from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from .api import tasks_router, auth_router # Corrected import
from database import create_db_and_tables
from .dependencies.jwt_middleware import JWTReadyMiddleware # Corrected import

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(JWTReadyMiddleware)

app.include_router(tasks_router, prefix="/api")
app.include_router(auth_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()}
    )

@app.get("/")
async def root():
    return {"message": "FastAPI application initialized."}

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected"
    }
