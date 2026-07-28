import sys
from pathlib import Path

from app.ingestion.pipeline import ingest_pdf


def run(pdf_path: str) -> None:
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    composed_pages = ingest_pdf(str(path))

    print(f"Ingested {len(composed_pages)} pages from {path.name}\n")

    for composed in composed_pages:
        analysis = composed.analysis
        print(
            f"Page {analysis.page_number}: "
            f"text={analysis.has_text}, "
            f"ocr={analysis.needs_ocr}, "
            f"images={analysis.image_count}, "
            f"tables={analysis.table_count}, "
            f"results={len(composed.results)}"
        )

        for result in composed.results:
            preview = result.content[:120].replace("\n", " ")
            if len(result.content) > 120:
                preview += "..."
            print(f"  [{result.processor}] {preview}")

        langchain_dicts = composed.to_langchain_dicts()
        print(f"  LangChain-ready document parts: {len(langchain_dicts)}")
        print()


if __name__ == "__main__":
    default_pdf = (
        Path(__file__).resolve().parents[2]
        / "sample2.pdf"
    )
    pdf_arg = sys.argv[1] if len(sys.argv) > 1 else str(default_pdf)
    run(pdf_arg)
