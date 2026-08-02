from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv

load_dotenv()


llm = ChatGroq(
    model="qwen/qwen3.6-27b",
    reasoning_format="hidden"
)

def generate_image_description(image_data,image_base64):  

    prompt = f"""
Analyze this image for a Retrieval-Augmented Generation (RAG) knowledge base.

Generate ONLY the final factual description. Do not include reasoning, analysis steps, uncertainty, or thoughts.

Image context:
Caption:
{image_data["caption"]}

footnotes:
{image_data["footnotes"]}

Requirements:

- Identify the image type and purpose.
- Describe all important visual elements.
- Mention objects, equipment, structures, diagrams, charts, labels, and technical details.
- Include relevant domain terminology.
- If the image relates to energy, geology, petroleum, mining, or engineering, highlight those concepts.
- Use OCR text if available.
- If text is unreadable or absent, do not invent text.
- Avoid describing the layout repeatedly.
- Avoid phrases like "I think", "maybe", "looks like", or "let me analyze".
- Write a concise but detailed technical description (300-800 words).

Output format:

DESCRIPTION:
<one technical paragraph>

Do not include:
- reasoning
- analysis
- bullet points
- <think> tags
- explanations
"""

    message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": prompt
        },
        {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{image_base64}"
            }
        }
    ]
    )
    response = llm.invoke([message])

    return response.content