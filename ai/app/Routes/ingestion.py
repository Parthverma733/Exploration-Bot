from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import tempfile
import requests
import os

from app.parser.chunking import parse_pdf
from app.vector_store.chroma import add_documents
from app.utils.logger import logger

router = APIRouter()


class IngestionRequest(BaseModel):
    file_url: str
    user_id: int
    document_id: int


@router.post("/ingest/")
async def ingest_document(request: IngestionRequest):
    temp_pdf = None

    try:
        # Download PDF from ImageKit
        response = requests.get(request.file_url, timeout=120)
        response.raise_for_status()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
            temp.write(response.content)
            temp_pdf = temp.name

        # Parse document
        text_docs, table_docs, image_docs = parse_pdf(
            temp_pdf,
            request.user_id,
            request.document_id,
        )

        # Combine all chunks
        all_documents = text_docs + table_docs + image_docs

        # Store in Chroma
        add_documents(all_documents)

        logger.info(
            f"Document {request.document_id} indexed successfully."
        )

        return {
            "success": True,
            "chunks": len(all_documents),
        }

    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_pdf and os.path.exists(temp_pdf):
            os.remove(temp_pdf)


