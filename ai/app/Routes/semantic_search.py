import json

from fastapi import APIRouter, Form
from fastapi.responses import JSONResponse

from app.vector_store.chroma import vector_store
from app.utils.logger import logger


router = APIRouter()


def parse_json_metadata(value, fallback):
    if value is None:
        return fallback

    if isinstance(value, (dict, list)):
        return value

    try:
        return json.loads(value)
    except (json.JSONDecodeError, TypeError):
        return fallback


@router.post("/semantic-search/")
async def semantic_search(
    query: str = Form(...),
    user_id: int = Form(...),
    document_id: int = Form(...),
    k: int = Form(5),
):
    try:
        logger.info(
            "Semantic search: user=%s document=%s query=%s",
            user_id,
            document_id,
            query,
        )

        results = vector_store.similarity_search_with_score(
            query=query,
            k=k,
            filter={
                "$and": [
                    {"user_id": {"$eq": user_id}},
                    {"document_id": {"$eq": document_id}},
                ]
            },
        )

        matches = []

        for document, score in results:
            metadata = document.metadata

            matches.append(
                {
                    "chunk_id": metadata.get("chunk_id"),
                    "document_id": metadata.get("document_id"),
                    "document_name": metadata.get("document_name"),
                    "type": metadata.get("type"),
                    "page_numbers": metadata.get("page_numbers", []),
                    "bbox": parse_json_metadata(
                        metadata.get("bbox"),
                        [],
                    ),
                    "caption": metadata.get("caption"),
                    "content": document.page_content,
                    "score": float(score),
                }
            )

        return {
            "success": True,
            "query": query,
            "count": len(matches),
            "results": matches,
        }

    except Exception as error:
        logger.exception("Semantic search failed")

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": str(error),
            },
        )