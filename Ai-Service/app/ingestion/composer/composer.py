from app.ingestion.analyzers.page_analysis import PageAnalysis
from app.ingestion.composer.composed_page import ComposedPage
from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.processors.ocr_processor import process_ocr
from app.ingestion.processors.table_processor import process_tables
from app.ingestion.processors.text_processor import process_text
from app.ingestion.processors.vision_processor import process_images


class PageComposer:
    def __init__(
        self,
        loader: PDFLoader,
        page,
        analysis: PageAnalysis,
    ):
        self.loader = loader
        self.page = page
        self.analysis = analysis
        self.source = loader.pdf_path

    def compose(self) -> ComposedPage:
        results = []

        if self.analysis.needs_ocr:
            results.append(
                process_ocr(
                    self.page,
                    self.analysis.page_number,
                    self.source,
                )
            )
        elif self.analysis.has_text:
            results.append(
                process_text(
                    self.page,
                    self.analysis.page_number,
                    self.source,
                )
            )

        if self.analysis.has_images and not self.analysis.needs_ocr:
            results.append(
                process_images(
                    self.loader,
                    self.page,
                    self.analysis.page_number,
                    self.source,
                )
            )

        if self.analysis.has_tables:
            results.extend(
                process_tables(
                    self.page,
                    self.analysis.page_number,
                    self.source,
                )
            )

        return ComposedPage(
            page_number=self.analysis.page_number,
            analysis=self.analysis,
            results=results,
        )
