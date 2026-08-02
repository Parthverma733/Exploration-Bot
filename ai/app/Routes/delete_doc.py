from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.vector_store.chroma import delete_document_chunks
from app.utils.logger import logger

router = APIRouter()


class DeleteDocumentRequest(BaseModel):
    document_id: int


@router.delete("/delete-document/")
def delete_document(request: DeleteDocumentRequest):
    try:
        delete_document_chunks(request.document_id)

        logger.info(
            f"Deleted all chunks for document {request.document_id}"
        )

        return {
            "success": True,
            "message": "Document chunks deleted successfully."
        }

    except Exception as e:
        logger.exception(e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )