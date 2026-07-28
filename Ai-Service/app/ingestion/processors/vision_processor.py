import fitz

from app.ingestion.processors.processor import ProcessorResult


def _base_metadata(page_number: int, source: str) -> dict:
    return {
        "page_number": page_number,
        "source": source,
    }


def _format_bbox(bbox) -> list[float]:
    return [round(float(value), 2) for value in bbox]


def _nearby_text(page, bbox, margin: float = 24) -> str:
    expanded = fitz.Rect(bbox)
    expanded.x0 -= margin
    expanded.y0 -= margin
    expanded.x1 += margin
    expanded.y1 += margin

    snippets = []
    page_dict = page.get_text("dict")

    for block in page_dict.get("blocks", []):
        if block.get("type") != 0:
            continue

        block_rect = fitz.Rect(block["bbox"])
        if not block_rect.intersects(expanded):
            continue

        for line in block.get("lines", []):
            line_text = "".join(span.get("text", "") for span in line.get("spans", []))
            cleaned = line_text.strip()
            if cleaned:
                snippets.append(cleaned)

    return " ".join(snippets)


def process_images(loader, page, page_number: int, source: str) -> ProcessorResult:
    image_blocks = loader.get_image_blocks(page)
    sections: list[str] = []
    image_records: list[dict] = []

    for index, block in enumerate(image_blocks, start=1):
        bbox = block.get("bbox") or [0, 0, 0, 0]
        width = block.get("width")
        height = block.get("height")
        ext = block.get("ext", "png")
        context = _nearby_text(page, bbox)

        sections.append(
            "\n".join(
                [
                    f"[Image {index}]",
                    f"Dimensions: {width}x{height}px",
                    f"Format: {ext}",
                    f"Bounding box: {_format_bbox(bbox)}",
                    f"Nearby text: {context or 'None'}",
                ]
            )
        )

        image_records.append(
            {
                "index": index,
                "bbox": _format_bbox(bbox),
                "width": width,
                "height": height,
                "format": ext,
                "has_binary": block.get("image") is not None,
                "nearby_text": context,
            }
        )

    content = "\n\n".join(sections)

    return ProcessorResult(
        processor="vision",
        content=content,
        metadata={
            **_base_metadata(page_number, source),
            "content_type": "image_description",
            "image_count": len(image_blocks),
            "images": image_records,
        },
    )
