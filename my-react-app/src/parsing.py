
from typing import  BinaryIO
import PyPDF2

def parse_pdf(file: BinaryIO) -> str:
    # parses the pdf into one line 
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text


