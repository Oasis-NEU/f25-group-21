from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key= api_key)

def getSuggestions(parsedResume: str) -> str | None:

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
        system_instruction="Give an ATS score out of 100 for this resume based on the job description. Provide suggestions for further imrpovement."),

        contents= parsedResume
    )
    return response.text



