from app.ingestion.processors.processor import ProcessorResult


def _base_metadata(page_number: int, source: str) -> dict:
    return {
        "page_number": page_number,
        "source": source,
    }


def process_ocr(page, page_number: int, source: str, dpi: int = 300) -> ProcessorResult:
    metadata = {
        **_base_metadata(page_number, source),
        "content_type": "ocr_text",
        "dpi": dpi,
    }

    text = ""
    ocr_method = "pymupdf_tesseract"

    try:
        textpage = page.get_textpage_ocr(dpi=dpi, full=True)
        text = page.get_text("text", textpage=textpage).strip()
    except Exception as exc:
        ocr_method = "failed"
        metadata["ocr_error"] = str(exc)
        metadata["ocr_hint"] = (
            "Install Tesseract OCR and ensure it is on PATH for scanned pages."
        )

    metadata["ocr_method"] = ocr_method
    metadata["char_count"] = len(text)

    return ProcessorResult(
        processor="ocr",
        content=text,
        metadata=metadata,
    )
