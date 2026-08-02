from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.exception_handler import catch_exception_middleware
from app.Routes.delete_doc import router as delete_router
from app.Routes.ingestion import router as ingest_router
from app.Routes.query import router as query_router
from app.Routes.semantic_search import router as semantic_search_router

app = FastAPI(title='Exploration Assistant API' , description="Api endpoints for RAG ChatBot")


#CORs setup

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],      # Allow all HTTP methods
    allow_headers=["*"],      # Allow all headers
)


# middleware exception handlers
app.middleware("http")(catch_exception_middleware)


# routers

app.include_router(delete_router)

app.include_router(ingest_router)

app.include_router(query_router)

app.include_router(semantic_search_router)