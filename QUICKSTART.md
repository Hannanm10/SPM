# Quick Start Guide - Document IP Analysis

## Setup (5 minutes)

### 1. Install Backend Dependencies
```bash
cd Backend
pip install -r requirements.txt
```

### 2. Configure API Key
Create or update `Backend/.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

### 3. Start Backend Server
```bash
cd Backend
python app.py
```
Server runs on: `http://localhost:5000`

### 4. Start Frontend (New Terminal)
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Usage

### Via Web Interface
1. Open `http://localhost:5173`
2. Click "Document Analysis" tab
3. Drag & drop a PDF or click to browse
4. Wait 5-15 seconds for analysis
5. Review IP analysis results

### Via API
```bash
curl -X POST http://localhost:5000/api/analyze-document-ip \
  -F "file=@your-document.pdf"
```

### Via Test Script
```bash
cd Backend
python test_ip_endpoint.py path/to/document.pdf
```

## What You Get

The analysis provides:
- **IP Classification** - Type of intellectual property
- **Patentability** - Whether content is patentable
- **Novelty Indicators** - Unique/innovative elements
- **Prior Art Concerns** - Existing similar work
- **Copyright Elements** - Copyrightable content
- **Trade Secrets** - Confidential information
- **Infringement Risks** - Potential IP violations
- **Recommendations** - Protection strategies
- **Compliance Issues** - Legal concerns
- **Risk Level** - Low, Medium, High, or Critical

## Requirements

- Python 3.8+
- Node.js 16+
- Google Gemini API key
- PDF files (max 10MB)

## Troubleshooting

**Backend won't start?**
- Check if port 5000 is available
- Verify all dependencies installed
- Check `.env` file exists with API key

**Frontend can't connect?**
- Ensure backend is running on port 5000
- Check CORS settings in `app.py`

**PDF extraction fails?**
- Ensure PDF is text-based (not scanned image)
- Check file size is under 10MB
- Verify file is not corrupted

**AI analysis fails?**
- Verify Gemini API key is valid
- Check API quota limits
- Review backend logs for errors

## Next Steps

- Read `Backend/API_DOCUMENTATION.md` for full API details
- Check `Backend/IP_ANALYSIS_FEATURE.md` for architecture
- Review `IMPLEMENTATION_SUMMARY.md` for technical details

## Support

Check backend logs for detailed error messages:
```bash
cd Backend
python app.py
# Logs appear in terminal
```
