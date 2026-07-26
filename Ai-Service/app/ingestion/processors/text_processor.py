from app.ingestion.processors.processor import ProcessorResult


def process_text(loader, page):

    text = loader.extract_text(page).strip()

    return ProcessorResult(
        processor="text",
        content=text
    )