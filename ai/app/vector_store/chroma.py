from langchain_chroma import Chroma
from langchain_core.documents import Document
from app.embedding.model import embedding_model

vector_store = Chroma(
    collection_name="collection_exploration",
    persist_directory="./chroma_db",
    embedding_function=embedding_model,
)


def add_documents(documents: list[Document]):
    vector_store.add_documents(
        documents=documents,
        ids=[doc.metadata["chunk_id"] for doc in documents],
    )


def search(query: str, user_id: int, k: int = 5):
    return vector_store.similarity_search(
        query=query,
        k=k,
        filter={
            "user_id": user_id,
        },
    )


def search_document(
    query: str,
    user_id: int,
    document_id: int,
    k: int = 5,
):
    return vector_store.similarity_search(
        query=query,
        k=k,
        filter={
            "user_id": user_id,
            "document_id": document_id,
        },
    )


def delete_chunks(chunk_ids: list[str]):
    vector_store.delete(ids=chunk_ids)


def delete_document_chunks(document_id: int):
    vector_store.delete(
        where={
            "document_id": document_id,
        }
    )


def get_document_chunks(document_id: int):
    return vector_store.get(
        where={
            "document_id": document_id,
        }
    )