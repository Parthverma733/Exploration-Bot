import fitz


class PDFLoader:

    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.doc = fitz.open(pdf_path)

    def total_pages(self) -> int:
        return len(self.doc)

    def get_page(self, page_number: int):
        return self.doc[page_number]

    def extract_text(self, page) -> str:
        return page.get_text("text")

    def get_images(self, page) -> list:
        return page.get_images(full=True)

    def get_image_blocks(self, page) -> list[dict]:
        blocks = []
        page_dict = page.get_text("dict")

        for block in page_dict.get("blocks", []):
            if block.get("type") != 1:
                continue

            blocks.append(
                {
                    "bbox": block.get("bbox"),
                    "width": block.get("width"),
                    "height": block.get("height"),
                    "ext": block.get("ext", "png"),
                    "image": block.get("image"),
                }
            )

        return blocks

    def find_tables(self, page):
        return page.find_tables()

    def get_table_count(self, page) -> int:
        return len(self.find_tables(page).tables)

    def render_page(self, page, zoom: float = 2):
        matrix = fitz.Matrix(zoom, zoom)
        return page.get_pixmap(matrix=matrix)

    def save_page_image(self, page, output_path: str, zoom: float = 2) -> None:
        pix = self.render_page(page, zoom)
        pix.save(output_path)

    def get_text_length(self, page) -> int:
        return len(page.get_text("text").strip())

    def get_image_count(self, page) -> int:
        return len(page.get_images(full=True))

    def metadata(self) -> dict:
        return self.doc.metadata

    def close(self) -> None:
        self.doc.close()
