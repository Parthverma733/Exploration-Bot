from app.ingestion.analyzers.page_analysis import PageAnalysis


def analyze_page(page_number: int, page, text_length: int, image_count: int) -> PageAnalysis:
    has_text = text_length > 0
    has_images = image_count > 0
    table_count = len(page.find_tables().tables)
    has_tables = table_count > 0

    # Scanned or image-heavy pages with little embedded text need OCR.
    needs_ocr = text_length < 50 and (has_images or text_length == 0)

    return PageAnalysis(
        page_number=page_number,
        has_text=has_text,
        needs_ocr=needs_ocr,
        has_images=has_images,
        has_tables=has_tables,
        text_length=text_length,
        image_count=image_count,
        table_count=table_count,
    )
