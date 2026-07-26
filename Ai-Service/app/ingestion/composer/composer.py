from app.ingestion.processors.text_processor import process_text
from app.ingestion.processors.ocr_processor import process_ocr
from app.ingestion.processors.vision_processor import process_images
from app.ingestion.analyzers.page_analysis import PageAnalysis
class composer:
    def __init__(self, page: PageAnalysis):
        self.page = page
        self.pageResult = list


    def composePage(self):
        if self.page.has_text:
            self.pageResult.append(process_text())

        if self.page.has_images:
            if self.page.needs_ocr:
                self.pageResult.append(process_ocr())

        

