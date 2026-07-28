from app.ingestion.analyzers.Analyzer import analyze_page
from app.ingestion.composer.composed_page import ComposedPage
from app.ingestion.composer.composer import PageComposer
from app.ingestion.pdf_loader import PDFLoader


def ingest_pdf(pdf_path: str) -> list[ComposedPage]:
    loader = PDFLoader(pdf_path)
    composed_pages: list[ComposedPage] = []

    try:
        for page_number in range(loader.total_pages()):
            page = loader.get_page(page_number)
            analysis = analyze_page(
                page_number=page_number,
                page=page,
                text_length=loader.get_text_length(page),
                image_count=loader.get_image_count(page),
            )
            composer = PageComposer(loader, page, analysis)
            composed_pages.append(composer.compose())
    finally:
        loader.close()

    return composed_pages
