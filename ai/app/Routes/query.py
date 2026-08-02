from fastapi import APIRouter, Form
from app.vector_store.chroma import vector_store
from app.LLM.Mistral import get_llm_chain
from fastapi.responses import JSONResponse
from app.utils.logger import logger

router = APIRouter()

def query_chain(chain,user_input:str):
    try:
        logger.debug(f"Running chain for input: {user_input}")
        result=chain({"query":user_input})
        seen = set()
        sources = []

        for doc in result["source_documents"]:
            source = {
                "document_name": doc.metadata.get("document_name"),
                "page_numbers": doc.metadata.get("page_numbers"),
                "type": doc.metadata.get("type"),
                "caption": doc.metadata.get("caption"),
            }

        key = (
            source["document_name"],
            tuple(source["page_numbers"] or []),
            source["type"],
            source["caption"],
        )

        if key not in seen:
            seen.add(key)
            sources.append(source)

        response={
            "response":result["result"],
            "sources":sources,
        }

        logger.debug(f"Chain response:{response}")
        return response
    except Exception as e:
        logger.exception("Error on query chain")
        raise



@router.post("/ask/")
async def ask(question: str = Form(...),user_id: int = Form(...)):
    try:
        logger.info(f"User Query: {question}")

        retriever = vector_store.as_retriever(
           search_kwargs={
            "k": 5,
            "filter": {
                "user_id": user_id
                }
            }
        )

        chain = get_llm_chain(retriever)

        result = query_chain(chain, question)

        logger.info("Query processed successfully.")

        return result
    except Exception as e:
        logger.exception("Error processing question.")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )



        
