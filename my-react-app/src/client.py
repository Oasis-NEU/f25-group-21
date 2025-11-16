import os
import sys
from google import genai
from google.genai import types
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from typing import Any
from fastapi.middleware.cors import CORSMiddleware
from src.parsing import parse_pdf
sys.path.append("src.parsing.py")


load_dotenv("/Users/tiffanyuong/f25-group-21/my-react-app/src/key.env")

API_KEY = os.getenv("GEMINI_API_KEY")

# print("Loaded API key:", API_KEY)

client = genai.Client(api_key = API_KEY)

app= FastAPI()

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],    
)


def get_suggestions(parsed_resume: str) -> str| None:

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
        system_instruction="Give an ATS score out of 100 for this resume. " \
        "Provide suggestions for further improvement. Give a brief review. " \
        "If anything doesn't look like a resume, give no feedback and state t" \
        "hat it is not a resume."),

        contents = parsed_resume
    )
    return response.text

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)) -> dict[str, Any]:
    parsed_text = parse_pdf(file.file)

    suggestions = get_suggestions(parsed_text)

    return {"response": suggestions}