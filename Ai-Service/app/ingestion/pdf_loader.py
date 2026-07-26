import fitz


class PDFLoader:

    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.doc = fitz.open(pdf_path)

    def total_pages(self):
        return len(self.doc)

    def get_page(self, page_number):
        return self.doc[page_number]

    def extract_text(self, page):
        return page.get_text("text")

    def get_images(self, page):
        return page.get_images(full=True)

    def render_page(self, page, zoom=2):
        matrix = fitz.Matrix(zoom, zoom)
        return page.get_pixmap(matrix=matrix)

    def save_page_image(self, page, output_path, zoom=2):
        pix = self.render_page(page, zoom)
        pix.save(output_path)

    def get_text_length(self, page):
        return len(page.get_text("text").strip())

    def get_image_count(self, page):
        return len(page.get_images(full=True))

    def metadata(self):
        return self.doc.metadata

    def close(self):
        self.doc.close()