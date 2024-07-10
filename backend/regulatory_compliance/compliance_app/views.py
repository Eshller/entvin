import io
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import yellow
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
import vertexai
from vertexai.preview.language_models import TextGenerationModel
import os
from vertexai.generative_models import (
    Content,
    FunctionDeclaration,
    GenerationConfig,
    GenerativeModel,
    Part,
    Tool,
)
# from utils.get_safety_config import safety_config


from google.generativeai.types import HarmCategory, HarmBlockThreshold
# from utils.get_safety_config import safety_config
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'static/entvincred.json'
vertexai.init(project='entvin', location="us-central1")

model = GenerativeModel(model_name="gemini-1.5-pro-preview-0409",system_instruction=["""You are a regulatory agency professional who is given a task to check if the given rule is implemented correctly. Otherwise give correct comments across the documents wherever necessary.


Format of the comment -
a. Reference: Reference text from the pdf (Only the exact text)
b. Comment: What needs to be corrected for the rule to be implemented
c. Rule implementation: Yes/No answer if the rule is implemented correctly
d. Reason: Specific reason for Yes/No answer	


Please share an exhaustive list of comments in table format. Do not comment on data omissions. Let's think step by step. Your life depends on it. Be conservative in giving comments. Be lenient.
"""])


def get_key_insights(key_text, explainer_text, addition_text):

    response = model.generate_content(
        [
            Part.from_text(
                key_text,
            ),
            f"""  
            Dossier text: {key_text}>
Rule for <3.2.P.1>: {explainer_text}
Rule context: {addition_text}

            """,
        ],
    )
    return str(response.candidates[0].content.parts[0])

@api_view(['POST'])
def upload_pdf(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded'}, status=400)

    pdf_file = request.FILES['file']

    # Extract explainer_text and rule_text fields dynamically
    explainer_texts = []
    rule_texts = []
    for key, value in request.data.items():
        if key.startswith('explainer_text_'):
            explainer_texts.append(value)
        elif key.startswith('rule_text_'):
            rule_texts.append(value)

    # To extract additional_prompt from request data
    additional_prompt = request.data.get('additional_prompt', 'default_prompt')

    # To extract all text from PDF
    text = extract_text_from_pdf(pdf_file)

    # Join the text from all pages into a single string for key insights extraction
    full_text = "\n".join(text)

    # Get key insights using the Gemini API
    insights = get_key_insights(full_text, ', '.join(explainer_texts), additional_prompt)

    # Highlight text in the PDF
    highlighted_pdf = highlight_text_in_pdf(pdf_file, text)

    # Save the highlighted PDF temporarily
    with open('temp_highlighted.pdf', 'wb') as f:
        f.write(highlighted_pdf.getvalue())

    return Response({
        'text': text,
        'insights': insights,
        'message': 'PDF processed successfully',
        'download_url': '/api/download-pdf/'
    })

def extract_text_from_pdf(pdf_file):
    all_text = []
    pdf_reader = PdfReader(pdf_file)
    
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text = page.extract_text()
        all_text.append(text)
    
    return all_text

def highlight_text_in_pdf(pdf_file, text):
    output = io.BytesIO()
    input_pdf = PdfReader(pdf_file)
    output_pdf = PdfWriter()

    for page_num in range(len(input_pdf.pages)):
        page = input_pdf.pages[page_num]
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        can.setFillColor(yellow)
        can.setFillAlpha(0.5)  # Set transparency

        page_text = text[page_num]
        words = page_text.split()
        
        # Get the page dimensions
        page_width = float(page.mediabox.width)
        page_height = float(page.mediabox.height)

        # Scale canvas to match PDF page size
        can.scale(page_width / letter[0], page_height / letter[1])

        for word in words:
            if word.strip():  # Only process non-empty words
                # Find word positions
                word_pos = page_text.lower().find(word.lower())
                while word_pos != -1:
                    # Estimate word position (this is a rough estimation)
                    x = 50  # Starting x position (adjust as needed)
                    y = page_height - (word_pos / len(page_text)) * page_height
                    
                    word_width = pdfmetrics.stringWidth(word, "Helvetica", 12)  # Adjust font and size as needed
                    can.rect(x, y, word_width, 12, fill=True, stroke=False)

                    word_pos = page_text.lower().find(word.lower(), word_pos + 1)

        can.save()
        packet.seek(0)
        new_pdf = PdfReader(packet)
        page.merge_page(new_pdf.pages[0])
        output_pdf.add_page(page)

    output_pdf.write(output)
    output.seek(0)
    return output

@api_view(['GET'])
def download_pdf(request):
    try:
        return FileResponse(open('temp_highlighted.pdf', 'rb'), content_type='application/pdf')
    except FileNotFoundError:
        return Response({'error': 'PDF not found'}, status=404)
