from dataclasses import dataclass


@dataclass
class PageAnalysis:
    page_number: int

    has_text: bool
    needs_ocr: bool

    has_images: bool
    has_tables: bool

    text_length: int
    image_count: int
    table_count: int
