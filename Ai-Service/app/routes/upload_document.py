from app.ingestion.pdf_loader import PDFLoader
from app.ingestion.analyzers.Analyzer import analyze_page

def function():

    loader = PDFLoader(
        r"C:\Users\pv830\OneDrive\Desktop\ongc main\Exploration-Bot\sample2.pdf"
    )


    for page_number in range(loader.total_pages()):

        page = loader.get_page(page_number)

        text_len = loader.get_text_length(page)

        img_cnt = loader.get_image_count(page)

        analysis_page = analyze_page(
            page_number,
            text_len,
            img_cnt
        )

        print(analysis_page)

    loader.close()


function()