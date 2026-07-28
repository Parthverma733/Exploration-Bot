from app.ingestion.processors.processor import ProcessorResult


def _base_metadata(page_number: int, source: str) -> dict:
    return {
        "page_number": page_number,
        "source": source,
    }


def process_text(page, page_number: int, source: str) -> ProcessorResult:
    text = page.get_text("text").strip()

    return ProcessorResult(
        processor="text",
        content=text,
        metadata={
            **_base_metadata(page_number, source),
            "content_type": "embedded_text",
            "char_count": len(text),
        },
    )
