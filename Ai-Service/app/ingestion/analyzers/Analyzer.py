from app.ingestion.analyzers.page_analysis import PageAnalysis


def analyze_page(page_number, text_length, image_count):

    has_text = text_length > 0

    has_images = image_count > 0

    needs_ocr = text_length < 50 and has_images


    return PageAnalysis(
        page_number=page_number,
        has_text=has_text,
        needs_ocr=needs_ocr,
        has_images=has_images,
        has_tables=False,
        text_length=text_length,
        image_count=image_count,
    )