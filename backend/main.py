from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import FileResponse
import subprocess
import uuid
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중엔 * 허용 (실서비스 땐 특정 도메인으로 제한)
    allow_credentials=True,
    allow_methods=["*"],  # 여기서 OPTIONS 포함됨
    allow_headers=["*"],
)

class PortfolioData(BaseModel):
    name: str
    intro: str
    skills: str

@app.post("/generate-pdf")
async def generate_pdf(data: PortfolioData):
    html_content = f"""
    <html>
    <head>
      <meta charset='UTF-8'>
      <style>
        body {{ font-family: sans-serif; padding: 40px; }}
        .card {{ border: 1px solid #ccc; padding: 20px; border-radius: 8px; }}
      </style>
    </head>
    <body>
      <div class='card'>
        <h1>{data.name}</h1>
        <p>{data.intro}</p>
        <p><strong>Skills:</strong> {data.skills}</p>
      </div>
    </body>
    </html>
    """

    os.makedirs("temp", exist_ok=True)
    file_id = str(uuid.uuid4())
    html_path = f"temp/{file_id}.html"
    pdf_path = f"temp/{file_id}.pdf"

    with open(html_path, "w") as f:
        f.write(html_content)

    # Puppeteer PDF 생성 실행
    subprocess.run(["node", "pdf-generator/generate-pdf.js", html_path, pdf_path], check=True)

    return FileResponse(pdf_path, media_type="application/pdf", filename="portfolio.pdf")
