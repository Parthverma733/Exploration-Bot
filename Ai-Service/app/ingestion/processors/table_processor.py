from app.ingestion.processors.processor import ProcessorResult


def _base_metadata(page_number: int, source: str) -> dict:
    return {
        "page_number": page_number,
        "source": source,
    }


def _clean_cell(value) -> str:
    if value is None:
        return ""
    return str(value).replace("\n", " ").strip()


def _rows_to_markdown(rows: list[list]) -> str:
    if not rows:
        return ""

    normalized = [[_clean_cell(cell) for cell in row] for row in rows]
    column_count = max(len(row) for row in normalized)
    padded = [row + [""] * (column_count - len(row)) for row in normalized]

    header = padded[0]
    separator = ["---"] * column_count
    body = padded[1:] if len(padded) > 1 else []

    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(separator) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in body)

    return "\n".join(lines)


def process_tables(page, page_number: int, source: str) -> list[ProcessorResult]:
    tables = page.find_tables().tables
    results: list[ProcessorResult] = []

    for index, table in enumerate(tables, start=1):
        rows = table.extract()
        markdown = _rows_to_markdown(rows)

        results.append(
            ProcessorResult(
                processor="table",
                content=markdown,
                metadata={
                    **_base_metadata(page_number, source),
                    "content_type": "table",
                    "table_index": index,
                    "row_count": len(rows),
                    "column_count": max((len(row) for row in rows), default=0),
                    "bbox": [round(float(value), 2) for value in table.bbox],
                },
            )
        )

    return results
