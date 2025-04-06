# AI Portfolio Generator

Generate clean, professional PDF and web-based portfolios from simple form inputs.

This tool takes your personal data (name, intro, skills, links, etc.), summarizes and structures it using AI, then formats it into a styled PDF and a shareable web page.

## Features

- Form-based portfolio input
- PDF generation using Puppeteer (Headless Chrome)
- Web-based portfolio rendering with Tailwind CSS
- GPT integration for content enhancement (optional)

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: FastAPI (Python)  
- **PDF Rendering**: Node.js + Puppeteer  
- **Optional AI**: OpenAI API (GPT-4)

## Getting Started

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 2. Backend (API)

```bash
cd backend
conda create -n portfolio-api python=3.10 -y
conda activate portfolio-api  # or source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Puppeteer PDF Generator

```bash
cd backend/pdf-generator
npm install
# you'll need a Node script like generate-pdf.js (not yet included)
```

## To Do

- [ ] Connect frontend → backend PDF API  
- [ ] Add GPT-based content enhancement  
- [ ] Implement multiple portfolio templates  
- [ ] Save/load portfolio drafts from DB

## License

MIT
