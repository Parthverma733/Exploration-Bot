from pathlib import Path
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions
from transformers import AutoTokenizer
from docling.chunking import HybridChunker
from docling_core.transforms.chunker.tokenizer.huggingface import (
        HuggingFaceTokenizer,
    )
from langchain_core.documents import Document
import base64
from io import BytesIO
import uuid 

from app.LLM.Grok import generate_image_description
import json

EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

tokenizer = HuggingFaceTokenizer(
    tokenizer=AutoTokenizer.from_pretrained(EMBED_MODEL)
)

chunker = HybridChunker(
    tokenizer=tokenizer,
    max_tokens=450,
    merge_peers=True,
)

pipeline_options = PdfPipelineOptions()
pipeline_options.generate_page_images = True
pipeline_options.generate_picture_images = True

converter = DocumentConverter(
    format_options={
        "pdf": PdfFormatOption(
            pipeline_options=pipeline_options
        )
    }
)

def bbox_to_dict(prov):
    if prov is None:
        return None

    return {
        "left": prov.bbox.l,
        "top": prov.bbox.t,
        "right": prov.bbox.r,
        "bottom": prov.bbox.b,
    }


def image_to_base64(image):
    if image is None:
        return None

    buffer = BytesIO()
    image.save(buffer, format="PNG")

    return base64.b64encode(buffer.getvalue()).decode("utf-8")

def parse_pdf(pdf_path: str,user_id:str,document_id:str):
    """
    Parse a PDF using Docling and return:
        - text_documents  : list[Document]
        - table_documents : list[Document]
        - images          : list[dict]
    """
    
    result = converter.convert(pdf_path)
    doc = result.document

    text_documents = []
    table_documents = []
    images_documents = []

    

    

    # -----------------------------
    # TEXT
    # -----------------------------
    # -----------------------------
# TEXT (Hybrid Chunker)
# -----------------------------
    for chunk in chunker.chunk(doc):

        # contextualized chunk (recommended by Docling docs)
        chunk_text = chunker.contextualize(chunk)
        

        if not chunk_text.strip():
            continue

        # collect all pages covered by this chunk
        pages = set()
        bboxes = []

        for item in chunk.meta.doc_items:
            if not item.prov:
                continue

            prov = item.prov[0]

            pages.add(prov.page_no)

            bboxes.append(
                {
                    "left": prov.bbox.l,
                    "top": prov.bbox.t,
                    "right": prov.bbox.r,
                    "bottom": prov.bbox.b,
                }
            )

            metadata = {
                "user_id": user_id,
                "chunk_id": str(uuid.uuid4()),
                "document_id": document_id,
                "type": "text",

                "document_name": Path(pdf_path).name,
                "page_numbers": sorted(pages),

                "bbox": json.dumps(bboxes),

                "headings": chunk.meta.headings,
                "captions": json.dumps(getattr(chunk.meta, "captions", [])),
            }        

        text_documents.append(
            Document(
                page_content=chunk_text,
                metadata=metadata,
            )
        )

    # -----------------------------
    # TABLES
    # -----------------------------
    for table in doc.tables:

        markdown = table.export_to_markdown(doc)

        prov = table.prov[0] if table.prov else None

        metadata = {
            "user_id": user_id,
            "chunk_id": str(uuid.uuid4()),
            "document_id": document_id,
            "type": "table",

            "document_name": Path(pdf_path).name,
            "page_numbers": [prov.page_no] if prov else [],

            "bbox": json.dumps(bbox_to_dict(prov)),

            "caption": table.caption_text(doc),

            "rows": table.data.num_rows,
            "cols": table.data.num_cols,
        }

        table_documents.append(
            Document(
                page_content=markdown,
                metadata=metadata,
            )
        )

    # -----------------------------
    # IMAGES
    # -----------------------------
    for picture in doc.pictures:

        prov = picture.prov[0] if picture.prov else None

        image = picture.get_image(doc)
        image_base64 =image_to_base64(image)

        metadata = {
            "user_id": user_id,
            "chunk_id": str(uuid.uuid4()),
            "document_id": document_id,
            "type": "image",

            "document_name": Path(pdf_path).name,
            "page_numbers": [prov.page_no] if prov else [],

            "bbox": json.dumps(bbox_to_dict(prov)),

            "caption": picture.caption_text(doc),

            "width": image.width if image else None,
            "height": image.height if image else None,

            "footnotes": json.dumps(picture.footnotes),
        }
        
        try:
            description = generate_image_description(metadata,image_base64)
        except Exception as e:
            description = picture.caption_text(doc) or ""

        metadata["generated_description"] = description

        images_documents.append(
            Document(
                page_content=description,
                metadata=metadata,
            )
        )

    return text_documents, table_documents, images_documents


if __name__ == "__main__":

    pdf = "files/file5.pdf"

    user_id=""
    document_id=""

    text_docs, table_docs, images = parse_pdf(pdf,user_id,document_id)

    print(f"Text Documents : {len(text_docs)}")
    print(f"Tables         : {len(table_docs)}")
    print(f"Images         : {len(images)}")

    while True:
        type = int(input("\nEnter your type: \n"))

        if type == 1:
            idx = int(input("\nEnter your idx: "))
            print(text_docs[idx])
        elif type == 2:
            idx = int(input("\nEnter your idx: "))
            print(table_docs[idx])
        elif type == 3:
            idx = int(input("\nEnter your idx: "))
            print(images[idx])
        else:
            break